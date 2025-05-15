import fs from 'fs';
import path from 'path';

export function getCurrentReqtFilePath() {
    const configPath = path.join(process.cwd(), '.reqt', 'config.reqt.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    return path.resolve(process.cwd(), config.filepath);
}