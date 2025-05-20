import fs from 'fs/promises';
import path from 'path';
import addAfterHandler from '../src/commands/addAfterHandler.js';
import init from '../src/commands/init.js';

async function cleanFiles(baseName) {
    const reqtFile = path.join('.reqt', `${baseName}.reqt.json`);
    try { await fs.unlink(reqtFile); } catch {}
}

async function testAddAfterHandler() {
    const testName = 'addaftertest';
    await cleanFiles(testName);
    // Mock promptFn to always confirm for init
    const promptFn = async () => ({ switch: true });
    await init(testName, promptFn);
    const reqtFile = path.join('.reqt', `${testName}.reqt.json`);
    // Add an item after the root (outline '0')
    const newItemTitle = 'After Root Item';
    await addAfterHandler('0', newItemTitle);
    const data = JSON.parse(await fs.readFile(reqtFile, 'utf-8'));
    console.log('Initial data:', JSON.stringify(data, null, 2));
    const found = data.some(item => item.title === newItemTitle);
    if (found) {
        console.log('PASS: addAfterHandler added the new item after outline 0');
    } else {
        console.error('FAIL: addAfterHandler did not add the new item');
        console.error('Current items:', data.map(i => i.title));
    }
    await cleanFiles(testName);
}

(async () => {
    await testAddAfterHandler();
})();
