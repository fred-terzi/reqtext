import fs from 'fs/promises';
import path from 'path';
import { getCurrentReqtFilePath } from '../utils/getCurrentReqtFilePath.js';

/**
 * Parse a Markdown file for reqt blocks and extract fields.
 * @param {string} md Markdown file contents
 * @returns {Object} Map of reqt_id to extracted fields
 */
function parseReqtBlocks(md) {
  const blockRegex = /<!-- reqt_id: (.*?) --start-->([\s\S]*?)<!-- reqt_id: \1 --end-->/g;
  const updates = {};
  let match;
  while ((match = blockRegex.exec(md)) !== null) {
    const reqt_id = match[1];
    const block = match[2];
    // Extract table values (Status, Test Exists, Test Passed) from HTML table
    const tableMatch = block.match(/<td>(.*?)<\/td><td>(.*?)<\/td><td>(.*?)<\/td>/);
    const [status, test_exists, test_passed] = tableMatch ? tableMatch.slice(1) : [undefined, undefined, undefined];
    // Extract fields by comment marker
    const getField = (field, label) => {
      const regex = new RegExp(`<!-- reqt_${field}_field-->\\s*\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=<!--|$)`, 'i');
      const m = block.match(regex);
      return m ? m[1].trim() : undefined;
    };
    updates[reqt_id] = {
      requirement: getField('Req', 'Requirement'),
      acceptance: getField('Accept', 'Acceptance'),
      details: getField('Det', 'Details'),
      status,
      test_exists,
      test_passed,
    };
  }
  return updates;
}

async function main() {
  // Get JSON file path from config
  const jsonPath = getCurrentReqtFilePath();
  // Derive Markdown file path from JSON file name (replace .json with .md, keep same base name, but in project root)
  const mdPath = path.resolve(
    process.cwd(),
    path.basename(jsonPath, path.extname(jsonPath)) + '.md'
  );
  // Read files
  const md = await fs.readFile(mdPath, 'utf8');
  const json = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  // Parse and update
  const updates = parseReqtBlocks(md);
  for (const item of json) {
    const update = updates[item.reqt_ID];
    if (update) {
      Object.assign(item, update);
    }
  }
  await fs.writeFile(jsonPath, JSON.stringify(json, null, 2), 'utf8');
  console.log('JSON updated from Markdown!');
}

main();
