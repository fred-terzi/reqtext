import fs from 'fs/promises';
import path from 'path';
import { getCurrentReqtFilePath } from '../utils/getCurrentReqtFilePath.js';

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
    updates[reqt_id] = {
      requirement: getField('Req', 'Requirement'),
      acceptance: getField('Accept', 'Acceptance'),
      details: getField('Det', 'Details'),
      // Make extracted table values uneditable from markdown
    //   status,
    //   test_exists,
    //   test_passed,
    };
  }
  return updates;
}

/**
 * Update a reqt JSON array with data parsed from a Markdown file.
 * @param {string} jsonPath Path to the reqt JSON file
 * @param {string} mdPath Path to the Markdown file
 * @returns {Promise<Array>} The updated JSON array
 */
async function updateReqtFromMarkdown(jsonPath, mdPath) {
  const md = await fs.readFile(mdPath, 'utf8');
  const json = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
  const updates = parseReqtBlocks(md);
  for (const item of json) {
    const update = updates[item.reqt_ID];
    if (update) {
      Object.assign(item, update);
    }
  }
  return json;
}

// CLI entry point for direct execution
// Only run this block if this file is run directly, not when imported
if (import.meta.url === `file://${process.argv[1]}`) {
  if (process.argv.length > 2 && process.argv[2].endsWith('.md')) {
    (async () => {
      const jsonPath = await getCurrentReqtFilePath();
      const mdPath = process.argv[2];
      await updateReqtFromMarkdown(jsonPath, mdPath);
    })();
  } else {
    console.error('No markdown file provided. Usage: node markdownUpdateReqt.js <file.md>');
    process.exit(1);
  }
}

export default updateReqtFromMarkdown;
