import fs from 'fs/promises';
import path from 'path';


// Helper to get the SoT file path from config
async function getSoTPath() {
    const configPath = path.resolve(process.cwd(), '.reqt', 'config.reqt.json');
    let config;
    try {
        config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('NO_CONFIG_REQT');
        }
        throw err;
    }
    return path.resolve(process.cwd(), config.sotPath);
}

// Get the data from the SoT JSON and return it in memory
export async function getData() {
    let sotPath;
    try {
        sotPath = await getSoTPath();
    } catch (err) {
        if (err.message === 'NO_CONFIG_REQT') {
            throw err;
        }
        throw err;
    }
    try {
        const data = JSON.parse(await fs.readFile(sotPath, 'utf8'));
        return data;
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('NO_SOT_FILE');
        }
        throw err;
    }
}

// Receive new data (array) and update the SoT JSON
export async function setData(newData) {
    const sotPath = await getSoTPath();
    await fs.writeFile(sotPath, JSON.stringify(newData, null, 2), 'utf8');
}
