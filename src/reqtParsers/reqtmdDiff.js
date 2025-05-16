import fs from 'fs/promises';
import path from 'path';
import { getCurrentReqtFilePath } from '../utils/getCurrentReqtFilePath.js';
import { parseReqtBlocks } from './markdownUpdateReqt.js';

async function main() {
  // Get JSON file path from config
  const jsonPath = getCurrentReqtFilePath();
  // Derive Markdown file path from JSON file name (strip .json and .reqt, add .reqt.md, in project root)
  let base = path.basename(jsonPath);
  base = base.replace(/(\.reqt)?\.json$/, '');
  const mdPath = path.resolve(process.cwd(), base + '.reqt.md');
  // Read files
  const md = await fs.readFile(mdPath, 'utf8');
  const json = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  // Parse Markdown fields
  const mdFields = parseReqtBlocks(md);
  // Compare and print diffs
  let foundDiff = false;
  for (const item of json) {
    const mdItem = mdFields[item.reqt_ID];
    if (!mdItem) continue;
    for (const field of ['requirement', 'acceptance', 'details']) {
      const jsonVal = (item[field] || '').trim();
      const mdVal = (mdItem[field] || '').trim();
      if (jsonVal !== mdVal) {
        foundDiff = true;
        console.log(`${item.outline}: ${item.title}:\nfield: ${field}`);
        console.log('--- JSON ---');
        console.log(jsonVal);
        console.log('--- MD ---');
        console.log(mdVal);
        console.log('============');
      }
    }
  }
  if (!foundDiff) {
    console.log('No diffs found between JSON and Markdown editable fields.');
  } else {
    console.log('Diffs found. JSON was NOT updated.');
  }
}

main();
