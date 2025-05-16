import fs from 'fs/promises';
import path from 'path';
import { parseReqtBlocks } from './markdownUpdateReqt.js';

/**
 * Checks for diffs between the three main editable fields in a data array (in-memory) and the Markdown file.
 * @param {Object[]} data - The in-memory data array of reqt objects.
 * @param {string} [mdPath] - Optional path to the Markdown file. If not provided, uses the default for the current project.
 * @returns {Promise<boolean>} - Returns true if diffs are found, false otherwise.
 */
export async function checkReqtMdDiff({ data, mdPath } = {}) {
  if (!data || !Array.isArray(data)) throw new Error('Must provide in-memory data array as `data`');
  // If no mdPath provided, try to infer from current config
  if (!mdPath) {
    const { getCurrentReqtFilePath } = await import('../utils/getCurrentReqtFilePath.js');
    let jsonPath = getCurrentReqtFilePath();
    let base = path.basename(jsonPath);
    base = base.replace(/(\.reqt)?\.json$/, '');
    mdPath = path.resolve(process.cwd(), base + '.reqt.md');
  }
  const md = await fs.readFile(mdPath, 'utf8');
  const mdFields = parseReqtBlocks(md);
  let foundDiff = false;
  for (const item of data) {
    const mdItem = mdFields[item.reqt_ID];
    if (!mdItem) continue;
    for (const field of ['requirement', 'acceptance', 'details']) {
      const dataVal = (item[field] || '').trim();
      const mdVal = (mdItem[field] || '').trim();
      if (dataVal !== mdVal) {
        foundDiff = true;
        console.log(`\nDiffs in: ${item.outline} - ${item.title}:`);
        console.log('============');
        console.log(`Field: ${field}\n`);
        console.log('\n--- DATA ---');
        console.log(dataVal);
        console.log('\n--- MD ---');
        console.log(mdVal);
      }
    }
  }
  if (!foundDiff) {
    console.log('No diffs found between DATA and Markdown editable fields.');
  } else {
    console.log('Diffs found. DATA was NOT updated.');
  }
  return foundDiff;
}

// If run directly, fallback to old behavior (load data from disk)
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    const { getCurrentReqtFilePath } = await import('../utils/getCurrentReqtFilePath.js');
    let jsonPath = getCurrentReqtFilePath();
    const data = JSON.parse(await fs.readFile(jsonPath, 'utf8'));
    await checkReqtMdDiff({ data });
  })();
}
