import fs from 'fs/promises';
import path from 'path';
import { getReqtsFromMarkdown } from '../reqtParsers/markdownUpdateReqt.js';
import { generateMarkdownFromData } from '../reqtParsers/reqtToMarkdown.mjs';


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

// Get the data from the Markdown (master), update JSON, and return in memory
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
    // Derive markdown file path from SoT path, but always put .md in project root
    const projectRoot = path.dirname(path.dirname(sotPath)); // one level up from .reqt
    const mdFileName = path.basename(sotPath).replace(/\.json$/, '.md');
    const mdFilePath = path.join(projectRoot, mdFileName);
    let data;
    try {
        data = await getReqtsFromMarkdown(mdFilePath, sotPath);
        // Overwrite JSON with parsed data from markdown
        await fs.writeFile(sotPath, JSON.stringify(data, null, 2), 'utf8');
        return data;
    } catch (err) {
        // Fallback to JSON if markdown missing
        try {
            const jsonData = JSON.parse(await fs.readFile(sotPath, 'utf8'));
            return jsonData;
        } catch (jsonErr) {
            if (jsonErr.code === 'ENOENT') {
                throw new Error('NO_SOT_FILE');
            }
            throw jsonErr;
        }
    }
}

// Receive new data (array) and update both the SoT JSON and Markdown
export async function setData(newData) {
    const sotPath = await getSoTPath();
    await fs.writeFile(sotPath, JSON.stringify(newData, null, 2), 'utf8');
    // Derive markdown file path from SoT path, but always put .md in project root
    const projectRoot = path.dirname(path.dirname(sotPath));
    const mdFileName = path.basename(sotPath).replace(/\.json$/, '.md');
    const mdFilePath = path.join(projectRoot, mdFileName);
    let mdContent = generateMarkdownFromData(newData);
    // If generateMarkdownFromData returns a Promise, await it
    if (mdContent instanceof Promise) {
        mdContent = await mdContent;
    }
    await fs.writeFile(mdFilePath, mdContent, 'utf8');
}
