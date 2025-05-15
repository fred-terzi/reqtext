import fs from 'fs';
import path from 'path';
import init from '../src/commands/init.js';

const reqtDir = path.join(process.cwd(), '.reqt');
const testFile = path.join(process.cwd(), '.reqt', 'testproject_reqt.reqt.json');

global.assert = (cond, msg) => { if (!cond) throw new Error(msg); };

async function runTest(title, fn) {
  try {
    await fn();
    console.log(`PASS: ${title}`);
  } catch (e) {
    console.error(`FAIL: ${title}\n  ${e.message}`);
  }
}

// Test 1: should create a new reqt project file when none exists
runTest('should create a new reqt project file when none exists', async () => {
  if (fs.existsSync(testFile)) fs.unlinkSync(testFile);
  await init('testproject_reqt');
  assert(fs.existsSync(testFile), 'Project file was not created');
  const data = JSON.parse(fs.readFileSync(testFile, 'utf-8'));
  assert(Array.isArray(data), 'Project file does not contain an array');
});

// Test 2: should not overwrite existing reqt project file without confirmation
runTest('should not overwrite existing reqt project file without confirmation', async () => {
  if (!fs.existsSync(reqtDir)) fs.mkdirSync(reqtDir);
  fs.writeFileSync(testFile, '[]');
  // Patch prompt to simulate user declining using ES module dynamic import
  const enquirer = await import('enquirer');
  const origPrompt = enquirer.prompt;
  enquirer.prompt = async () => ({ switch: false });
  await init('testproject_reqt');
  enquirer.prompt = origPrompt;
  const data = fs.readFileSync(testFile, 'utf-8');
  assert(data === '[]', 'Project file was overwritten');
});
