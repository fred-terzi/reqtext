import fs from 'fs/promises';
import path from 'path';

export async function getCurrentReqtFilePath() {
    const configPath = path.join(process.cwd(), '.reqt', 'config.reqt.json');
    try {
        const configRaw = await fs.readFile(configPath, 'utf-8');
        const config = JSON.parse(configRaw);
        if (!config.sotPath) {
            throw new Error('Missing "sotPath" in config.reqt.json');
        }
        return path.resolve(process.cwd(), config.sotPath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('No .reqt project found in this directory. Please run `npx reqt init <project name>` to create one.');
        } else if (err instanceof SyntaxError) {
            throw new Error('config.reqt.json is not valid JSON.');
        } else {
            throw err;
        }
    }
}