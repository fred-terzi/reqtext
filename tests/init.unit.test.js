import fs from 'fs';
import path from 'path';
import init from '../src/commands/init.js';

// Helper to clean up test files
function cleanFiles(baseName) {
    const files = [
        `${baseName}.reqt.json`,
        `${baseName}.template.json`
    ];
    for (const file of files) {
        if (fs.existsSync(file)) fs.unlinkSync(file);
    }
}

async function testInitCreatesFields() {
    const testName = 'testproject';
    cleanFiles(testName);
    // Mock promptFn to always confirm
    const promptFn = async () => ({ switch: true });
    await init(testName, promptFn);
    const reqtFile = path.join('.reqt', `${testName}.reqt.json`);
    if (!fs.existsSync(reqtFile)) {
        console.error('FAIL: .reqt.json file not created');
        return;
    }
    const data = JSON.parse(fs.readFileSync(reqtFile, 'utf-8'));
    // Accept both camelCase and snake_case for test fields
    let allFields = data.every(item =>
        ('Test Exists' in item || 'test_exists' in item) &&
        ('Test Passed' in item || 'test_passed' in item)
    );
    if (allFields) {
        console.log('PASS: All items have test_exists and test_passed fields (or camelCase variants)');
    } else {
        console.error('FAIL: Not all items have required fields');
        console.error('Actual item fields:', data.map(i => Object.keys(i)));
    }
    cleanFiles(testName);
}

(async () => {
    await testInitCreatesFields();
})();
