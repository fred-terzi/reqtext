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

// Additional test for new init logic (projectTitle as SoT file, config, template)
async function testInitCreatesAllFiles() {
    const testName = 'TestProject';
    const cwd = process.cwd();
    const reqtDir = path.join(cwd, '.reqt');
    const configPath = path.join(reqtDir, 'config.reqt.json');
    const templatePath = path.join(reqtDir, 'itemTemplate.reqt.json');
    const sotFileName = `${testName}.reqt.json`;
    const sotPath = path.join(reqtDir, sotFileName);

    // Clean up before test
    if (fs.existsSync(configPath)) fs.unlinkSync(configPath);
    if (fs.existsSync(templatePath)) fs.unlinkSync(templatePath);
    if (fs.existsSync(sotPath)) fs.unlinkSync(sotPath);
    if (fs.existsSync(reqtDir)) fs.rmdirSync(reqtDir, { recursive: true });

    // Mock prompt to always confirm overwrite
    const mockPrompt = async () => ({ overwrite: true });
    await init(testName, mockPrompt);

    let passed = true;
    if (!fs.existsSync(reqtDir)) {
        console.error('.reqt directory not created');
        passed = false;
    }
    if (!fs.existsSync(configPath)) {
        console.error('config.reqt.json not created');
        passed = false;
    } else {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        if (config.projectTitle !== testName) {
            console.error('projectTitle not set correctly in config');
            passed = false;
        }
        if (config.sotPath !== `./.reqt/${sotFileName}`) {
            console.error('sotPath not set correctly in config');
            passed = false;
        }
    }
    if (!fs.existsSync(templatePath)) {
        console.error('itemTemplate.reqt.json not created');
        passed = false;
    }
    if (!fs.existsSync(sotPath)) {
        console.error('SoT file not created');
        passed = false;
    } else {
        const sot = JSON.parse(fs.readFileSync(sotPath, 'utf8'));
        if (!Array.isArray(sot) || sot.length !== 0) {
            console.error('SoT file is not an empty array');
            passed = false;
        }
    }
    // No cleanup after test
    if (passed) {
        console.log('PASS: init creates all required files and sets config fields correctly');
    } else {
        console.error('FAIL: init did not create all required files or set config fields');
        process.exit(1);
    }
}

(async () => {
    await testInitCreatesFields();
    await testInitCreatesAllFiles();
})();
