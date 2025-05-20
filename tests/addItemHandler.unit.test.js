import fs from 'fs/promises';
import path from 'path';
import addItemHandler from '../src/commands/addItemHandler.js';
import init from '../src/commands/init.js';
import { execSync } from 'child_process';

async function cleanFiles(baseName) {
    const reqtFile = path.join('.reqt', `${baseName}.reqt.json`);
    try { await fs.unlink(reqtFile); } catch {}
}

async function testAddItemHandler() {
    // Clean .reqt directory using the shell script
    try {
        execSync('bash tests/clean_reqt.sh');
    } catch (e) {
        // Ignore errors if .reqt does not exist
    }
    const testName = 'additemtest';
    // Mock promptFn to always confirm for init
    const promptFn = async () => ({ switch: true });
    await init(testName, promptFn);
    // Find the actual SOT file created by init
    const reqtDir = path.join('.', '.reqt');
    let files = [];
    try { files = await fs.readdir(reqtDir); } catch {}
    const reqtFile = files.find(f => f.endsWith(`${testName}.reqt.json`));
    if (!reqtFile) {
        console.error('FAIL: No SOT file found for testName:', testName);
        console.error('Files in .reqt:', files);
        return;
    }
    const reqtFilePath = path.join(reqtDir, reqtFile);
    // Add a new item
    const newItemTitle = 'Unit Test Item';
    process.chdir(path.resolve('.'));
    await addItemHandler(newItemTitle);
    const data = JSON.parse(await fs.readFile(reqtFilePath, 'utf-8'));
    const found = data[data.length - 1] && data[data.length - 1].title === newItemTitle;
    if (found) {
        console.log('PASS: addItemHandler added the new item as the last item');
    } else {
        console.error('FAIL: addItemHandler did not add the new item as the last item');
        console.error('Current items:', data.map(i => i.title));
    }
    // Clean up after test
    try {
        execSync('bash tests/clean_reqt.sh');
    } catch (e) {}
}

(async () => {
    await testAddItemHandler();
})();
