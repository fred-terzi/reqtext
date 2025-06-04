import fs from 'fs/promises';
import path from 'path';
import { parseReqtBlocks } from '../reqtParsers/markdownUpdateReqt.js';
import { getData } from './dataHandler.js';
import { getExistingMarkdownFile } from '../utils/getExistingMarkdownFile.js';

/**
 * Checks for diffs between the three main editable fields in a data array (in-memory) and the Markdown file.
 * @param {Object[]} [data] - The in-memory data array of reqt objects. If not provided, loads from SoT using getData().
 * @param {string} [mdPath] - Optional path to the Markdown file. If not provided, uses the default for the current project.
 * @returns {Promise<boolean>} - Returns true if diffs are found, false otherwise.
 */
export async function checkReqtMdDiff({ data, mdPath } = {}) {
  if (!data) {
    data = await getData();
  }
  if (!Array.isArray(data)) throw new Error('Must provide in-memory data array as `data`');
  // If no mdPath provided, try to infer from current config
  if (!mdPath) {
    mdPath = getExistingMarkdownFile();
    if (!mdPath) {
      console.log('No reqt.md currently checked out.');
      return false;
    }
  }
  const md = await fs.readFile(mdPath, 'utf8');
  const mdFields = parseReqtBlocks(md);
  let foundDiff = false;
  for (const item of data) {
    const mdItem = mdFields[item.reqt_ID];
    if (!mdItem) continue;
    for (const field of ['description', 'acceptance', 'readme']) {
      const dataVal = (item[field] || '').trim();
      const mdVal = (mdItem[field] || '').trim();
      if (dataVal !== mdVal) {
        foundDiff = true;
        console.log(`\nDiffs in:\n${item.outline} - ${item.title}:`);
        console.log('============');
        console.log(`Field: ${field}`);
        console.log('\n--- DATA ---');
        console.log(dataVal);
        console.log('\n--- MD ---');
        console.log(mdVal);
      }
    }
  }
  if (!foundDiff) {
    console.log('\nNo diffs found between DATA and Markdown editable fields.');
  } else {
    console.log('\nDifferences found between DATA and Markdown editable fields.');
  }
  return foundDiff;
}

// If run directly, fallback to old behavior (load data from disk)
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const data = await getData();
    await checkReqtMdDiff({ data });
  })();
}
