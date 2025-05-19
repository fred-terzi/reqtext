import assert from 'assert';
import fs from 'fs/promises';
import path from 'path';
import { getCurrentReqtFilePath } from '../src/utils/getCurrentReqtFilePath.js';

const mockConfigDir = path.join(process.cwd(), '.reqt');
const mockConfigPath = path.join(mockConfigDir, 'config.reqt.json');

async function runTests() {
    // Save original fs.readFile
    const originalReadFile = fs.readFile;

    // Helper to mock fs.readFile
    function mockReadFile(impl) {
        fs.readFile = impl;
    }

    // Helper to restore fs.readFile
    function restoreReadFile() {
        fs.readFile = originalReadFile;
    }

    // Test 1: returns resolved sotPath from config
    try {
        mockReadFile(async (filePath, encoding) => {
            assert.strictEqual(filePath, mockConfigPath);
            assert.strictEqual(encoding, 'utf-8');
            return JSON.stringify({ sotPath: '.reqt/test_markdown.reqt.json' });
        });
        const result = await getCurrentReqtFilePath();
        console.log('DEBUG: Test 1 result:', result); // Debug print
        assert.strictEqual(result, path.resolve(process.cwd(), '.reqt/test_markdown.reqt.json'));
        console.log('Test 1 passed: returns resolved sotPath from config');
    } catch (e) {
        console.error('Test 1 failed:', e);
    } finally {
        restoreReadFile();
    }

    // Test 2: throws error if config file does not exist
    try {
        mockReadFile(async () => {
            const err = new Error('File not found');
            err.code = 'ENOENT';
            throw err;
        });
        let threw = false;
        try {
            await getCurrentReqtFilePath();
        } catch (e) {
            threw = true;
            assert(e.message.includes('No config.reqt.json found in .reqt folder'));
        }
        assert(threw);
        console.log('Test 2 passed: throws error if config file does not exist');
    } catch (e) {
        console.error('Test 2 failed:', e);
    } finally {
        restoreReadFile();
    }

    // Test 3: throws error if config is invalid JSON
    try {
        mockReadFile(async () => 'not-json');
        let threw = false;
        try {
            await getCurrentReqtFilePath();
        } catch (e) {
            threw = true;
            assert(e.message.includes('config.reqt.json is not valid JSON'));
        }
        assert(threw);
        console.log('Test 3 passed: throws error if config is invalid JSON');
    } catch (e) {
        console.error('Test 3 failed:', e);
    } finally {
        restoreReadFile();
    }

    // Test 4: throws error if sotPath is missing
    try {
        mockReadFile(async () => JSON.stringify({ notSotPath: 'foo' }));
        let threw = false;
        try {
            await getCurrentReqtFilePath();
        } catch (e) {
            threw = true;
            assert(e.message.includes('Missing "sotPath" in config.reqt.json'));
        }
        assert(threw);
        console.log('Test 4 passed: throws error if sotPath is missing');
    } catch (e) {
        console.error('Test 4 failed:', e);
    } finally {
        restoreReadFile();
    }
}

runTests();
