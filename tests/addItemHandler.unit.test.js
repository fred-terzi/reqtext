import fs from 'fs';
import path from 'path';
import addItemHandler from '../src/commands/addItemHandler.js';
import init from '../src/commands/init.js';

function cleanFiles(baseName) {
    const reqtFile = path.join('.reqt', `${baseName}.reqt.json`);
    if (fs.existsSync(reqtFile)) fs.unlinkSync(reqtFile);
}

async function testAddItemHandler() {
    const testName = 'additemtest';
    cleanFiles(testName);
    // Mock promptFn to always confirm for init
    const promptFn = async () => ({ switch: true });
    await init(testName, promptFn);
    // Change working file to our test file
    const reqtFile = path.join('.reqt', `${testName}.reqt.json`);
    // Overwrite config to point to our test file if needed
    // Add a new item
    const newItemTitle = 'Unit Test Item';
    process.chdir(path.resolve('.'));
    await addItemHandler(newItemTitle);
    const data = JSON.parse(fs.readFileSync(reqtFile, 'utf-8'));
    const found = data.some(item => item.title === newItemTitle);
    if (found) {
        console.log('PASS: addItemHandler added the new item');
    } else {
        console.error('FAIL: addItemHandler did not add the new item');
        console.error('Current items:', data.map(i => i.title));
    }
    cleanFiles(testName);
}

(async () => {
    await testAddItemHandler();
})();
