// Integration test for CLI: generate-readme_ai
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

const testFile = 'tests/tmp.reqt.json';
const outFile = 'README_AI.reqt.json';
const sample = [
  { title: 'A', readme: 'foo', readme_ai: true },
  { title: 'B', readme: 'bar', readme_ai: false },
  { title: 'C', readme: 'baz' }
];

fs.writeFileSync(testFile, JSON.stringify(sample, null, 2));

process.env.REQT_CURRENT_FILE = testFile;

const cli = path.resolve('bin/index.js');
const args = ['generate-readme_ai'];

const child = spawn('node', [cli, ...args], { stdio: 'inherit' });

child.on('exit', code => {
  let pass = false;
  if (fs.existsSync(outFile)) {
    const out = JSON.parse(fs.readFileSync(outFile, 'utf8'));
    pass = Array.isArray(out) && out.length === 3 && out[1].title === 'A' && out[2].title === 'C';
    fs.unlinkSync(outFile);
  }
  fs.unlinkSync(testFile);
  console.log('CLI generate-readme_ai integration test:', pass ? 'PASS' : 'FAIL');
  process.exit(pass ? 0 : 1);
});
