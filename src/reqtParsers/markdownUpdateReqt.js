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
    // Extract table values (Status, Test Exists, Test Passed) from the markdown table (skip header and separator)
    const tableRowMatch = block.match(/\| Status \| Test Exists \| Test Passed \|[\r\n]+\|[-| ]+\|[\r\n]+\| ([^|]+) \| ([^|]+) \| ([^|]+) \|/);
    const [status, test_exists, test_passed] = tableRowMatch ? tableRowMatch.slice(1).map(s => s.trim()) : [undefined, undefined, undefined];
    // Extract fields by comment marker and label
    const getField = (field, label) => {
      // Match the field marker, the label, and capture everything until the next field marker or end of block
      const regex = new RegExp(`<!-- reqt_${field}_field-->\\s*\\*\\*${label}:\\*\\*\\s*([\\s\\S]*?)(?=<!-- reqt_|<!-- reqt_id:|$)`, 'i');
      const m = block.match(regex);
      return m ? m[1].trim() : undefined;
    };
    const requirement = getField('Req', 'Requirement');
    const acceptance = getField('Accept', 'Acceptance');
    const details = getField('Det', 'Details');
    updates[reqt_id] = {
      requirement,
      acceptance,
      details,
      status,
      test_exists,
      test_passed,
    };
  }
  return updates;
}

export default async function markdownToReqt() {
  // Get the .json file path from getCurrentReqtFilePath
  const reqtJsonPath = await getCurrentReqtFilePath();
  // Convert to .md file path in the project root
  const mdFileName = path.basename(reqtJsonPath).replace(/\.json$/, '.md');
  const mdFilePath = path.join(process.cwd(), mdFileName);
  console.log('mdFilePath', mdFilePath);
  // 1. Read the Markdown file
  const md = await fs.readFile(mdFilePath, 'utf-8');
  // 2. Parse the Markdown
  const updates = parseReqtBlocks(md);

  // 3. Determine the JSON file path (same as reqtJsonPath)
  const jsonFilePath = reqtJsonPath;

  // 4. Read the existing JSON file
  let jsonData = {};
  let originalWasArray = false;
  try {
    const jsonRaw = await fs.readFile(jsonFilePath, 'utf-8');
    const parsed = JSON.parse(jsonRaw);
    if (Array.isArray(parsed)) {
      // Convert array to object keyed by reqt_ID
      jsonData = {};
      for (const item of parsed) {
        if (item.reqt_ID) jsonData[item.reqt_ID] = item;
      }
      originalWasArray = true;
    } else {
      jsonData = parsed;
    }
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
  let outputJson;
  if (originalWasArray) {
    // Convert back to array
    outputJson = Object.values(jsonData);
  } else {
    outputJson = jsonData;
  }
  await fs.writeFile(jsonFilePath, JSON.stringify(outputJson, null, 2), 'utf-8');
  console.log('Updated JSON written to', jsonFilePath);
}