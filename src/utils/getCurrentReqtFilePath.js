import fs from 'fs/promises';
import path from 'path';

export async function getCurrentReqtFilePath() {
    const configPath = path.join(process.cwd(), '.reqt', 'config.reqt.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf-8'));
    // Use sotPath instead of filepath
    return path.resolve(process.cwd(), config.sotPath);
}