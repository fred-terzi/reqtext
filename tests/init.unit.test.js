import fs from 'fs/promises';
import path from 'path';
import init from '../src/commands/init.js';

// Helper to clean up test files
async function cleanFiles(baseName) {
    const files = [
        `${baseName}.reqt.json`,
        `${baseName}.template.json`
    ];
    for (const file of files) {
        try { await fs.unlink(file); } catch {}
    }
}

async function testInitCreatesFields() {
    const testName = 'testproject';
    await cleanFiles(testName);
    // Mock promptFn to always confirm
    const promptFn = async () => ({ switch: true });
    await init(testName, promptFn);
    const reqtFile = path.join('.reqt', `${testName}.reqt.json`);
    let exists = false;
    try { await fs.access(reqtFile); exists = true; } catch {}
    if (!exists) {
        console.error('FAIL: .reqt.json file not created');
        return;
    }
    const data = JSON.parse(await fs.readFile(reqtFile, 'utf-8'));
    // Accept both camelCase and snake_case for test fields
    let allFields = data.every(item =>
        ('test_passed' in item)
    );
    if (allFields) {
        console.log('PASS: All items have test_passed field');
    } else {
        console.error('FAIL: Not all items have required fields');
        console.error('Actual item fields:', data.map(i => Object.keys(i)));
    }
    await cleanFiles(testName);
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
    try { await fs.unlink(configPath); } catch {}
    try { await fs.unlink(templatePath); } catch {}
    try { await fs.unlink(sotPath); } catch {}
    try { await fs.rmdir(reqtDir, { recursive: true }); } catch {}
    // Mock prompt to always confirm overwrite
    const mockPrompt = async () => ({ overwrite: true });
    await init(testName, mockPrompt);
    let passed = true;
    let exists = false;
    try { await fs.access(reqtDir); exists = true; } catch {}
    if (!exists) {
        console.error('.reqt directory not created');
        passed = false;
    }
    exists = false;
    try { await fs.access(configPath); exists = true; } catch {}
    if (!exists) {
        console.error('config.reqt.json not created');
        passed = false;
    } else {
        const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
        if (config.projectTitle !== testName) {
            console.error('projectTitle not set correctly in config');
            passed = false;
        }
        if (config.sotPath !== `./.reqt/${sotFileName}`) {
            console.error('sotPath not set correctly in config');
            passed = false;
        }
    }
    exists = false;
    try { await fs.access(templatePath); exists = true; } catch {}
    if (!exists) {
        console.error('itemTemplate.reqt.json not created');
        passed = false;
    }
    exists = false;
    try { await fs.access(sotPath); exists = true; } catch {}
    if (!exists) {
        console.error('SoT file not created');
        passed = false;
    } else {
        const sot = JSON.parse(await fs.readFile(sotPath, 'utf8'));
        // Expect the SoT file to contain a single project item with correct fields
        if (!Array.isArray(sot) || sot.length !== 1) {
            console.error('SoT file does not contain a single project item');
            passed = false;
        } else {
            const item = sot[0];
            if (!item.title || !item.reqt_ID) {
                console.error('Project item missing title or reqt_ID');
                passed = false;
            }
            if (item.status !== 'PLANNED') {
                console.error('Project item status is not PLANNED');
                passed = false;
            }
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

// Test: README_AI.reqt.json copy logic removed
async function testReadmeAICopyRemoved() {
    const testName = 'TestProjectAI';
    const cwd = process.cwd();
    const reqtDir = path.join(cwd, '.reqt');
    const destReadmeAI = path.join(reqtDir, 'README_AI.reqt.json');
    // Ensure .reqt and dest file are removed
    try { await fs.rm(reqtDir, { recursive: true, force: true }); } catch {}
    // Place a README_AI.reqt.json in project root
    const templateContent = '[{"meta":"test"}]';
    await fs.writeFile(path.join(cwd, 'README_AI.reqt.json'), templateContent);
    // Run init
    const mockPrompt = async () => ({ overwrite: true });
    await init(testName, mockPrompt);
    // Should NOT copy README_AI.reqt.json to .reqt
    let exists = false;
    try { await fs.access(destReadmeAI); exists = true; } catch {}
    if (exists) {
        console.error('FAIL: README_AI.reqt.json should NOT be copied to .reqt');
        process.exit(1);
    }
    // Cleanup
    try { await fs.rm(reqtDir, { recursive: true, force: true }); } catch {}
    try { await fs.unlink(path.join(cwd, 'README_AI.reqt.json')); } catch {}
    console.log('PASS: README_AI.reqt.json is not copied to .reqt (copy logic removed)');
}

(async () => {
    await testInitCreatesFields();
    await testInitCreatesAllFiles();
    await testReadmeAICopyRemoved();
})();
