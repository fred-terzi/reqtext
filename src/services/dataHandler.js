import fs from 'fs/promises';
import path from 'path';


// Helper to get the SoT file path from config
async function getSoTPath() {
    const configPath = path.resolve(process.cwd(), '.reqt', 'config.reqt.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    return path.resolve(process.cwd(), config.sotPath);
}

// Get the data from the SoT JSON and return it in memory
export async function getData() {
    const sotPath = await getSoTPath();
    const data = JSON.parse(await fs.readFile(sotPath, 'utf8'));
    return data;
}

// Receive new data (array) and update the SoT JSON
export async function setData(newData) {
    const sotPath = await getSoTPath();
    await fs.writeFile(sotPath, JSON.stringify(newData, null, 2), 'utf8');
}
