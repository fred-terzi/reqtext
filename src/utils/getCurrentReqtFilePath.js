import fs from 'fs/promises';
import path from 'path';

async function findRootReqtDir() {
    const rootDir = process.cwd();
    const reqtDir = path.join(rootDir, '.reqt');
    try {
        const stat = await fs.stat(reqtDir);
        if (!stat.isDirectory()) {
            throw new Error('No .reqt project folder found in this directory. Please run `npx reqt init <project name>` to create one.');
        }
        return reqtDir;
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('No .reqt project folder found in this directory. Please run `npx reqt init <project name>` to create one.');
        } else {
            throw err;
        }
    }
}

export async function getCurrentReqtFilePath() {
    const reqtDir = await findRootReqtDir();
    const configPath = path.join(reqtDir, 'config.reqt.json');
    try {
        const configRaw = await fs.readFile(configPath, 'utf-8');
        const config = JSON.parse(configRaw);
        if (!config.sotPath) {
            throw new Error('Missing "sotPath" in config.reqt.json');
        }
        return path.resolve(process.cwd(), config.sotPath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            throw new Error('No config.reqt.json found in .reqt folder. Please run `npx reqt init <project name>` to create one.');
        } else if (err instanceof SyntaxError) {
            throw new Error('config.reqt.json is not valid JSON.');
        } else {
            throw err;
        }
    }
}