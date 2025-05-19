import { getCurrentReqtFilePath } from '../utils/getCurrentReqtFilePath.js';
import fs from 'fs/promises';
import path from 'path';

/**
 * Parse a Markdown file for reqt blocks and extract fields.
 * @param {string} md Markdown file contents
 * @returns {Object} Map of reqt_id to extracted fields
 */
// Export parseReqtBlocks for reuse in reqtmdDiff.js
export function parseReqtBlocks(md) {
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
    let details = getField('Det', 'Details');
    if (details) {
      details = details.replace(/<table[\s\S]*?<\/table>/gi, '').trim();
    }
    updates[reqt_id] = {
      requirement: getField('Req', 'Requirement'),
      acceptance: getField('Accept', 'Acceptance'),
      details,
      status,
      test_exists,
      test_passed,
    };
  }
  return updates;
}

export default async function markdownToReqt() {
  const mdFilePath = await getCurrentReqtFilePath();
  console.log('mdFilePath', mdFilePath);
  // 1. Read the Markdown file
  const md = await fs.readFile(mdFilePath, 'utf-8');
  // 2. Parse the Markdown
  const updates = parseReqtBlocks(md);

  // 3. Determine the JSON file path (same basename, .json extension, in reqtStore)
  const jsonFileName = path.basename(mdFilePath).replace(/\.md$/, '.json');
  const jsonFilePath = path.join(path.dirname(path.dirname(mdFilePath)), 'reqtStore', jsonFileName);

  // 4. Read the existing JSON file
  let jsonData = {};
  try {
    const jsonRaw = await fs.readFile(jsonFilePath, 'utf-8');
    jsonData = JSON.parse(jsonRaw);
  } catch (err) {
    if (err.code !== 'ENOENT') throw err; // Only ignore file-not-found
  }

  // 5. Update the JSON data with the parsed updates
  for (const [reqt_id, fields] of Object.entries(updates)) {
    jsonData[reqt_id] = {
      ...jsonData[reqt_id],
      ...fields,
    };
  }

  // 6. Write the updated JSON back to disk
  await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log('Updated JSON written to', jsonFilePath);
}