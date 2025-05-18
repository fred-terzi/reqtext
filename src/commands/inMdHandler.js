import fs from 'fs/promises';
import path from 'path';
import { getCurrentReqtFilePath } from '../utils/getCurrentReqtFilePath.js';
import updateReqtFromMarkdown from '../reqtParsers/markdownUpdateReqt.js';

/**
 * Handler for 'reqt in-md' or 'reqt -imd' command.
 * @param {Object} options - CLI options (e.g., { keep: boolean, mdFile: string })
 */
export async function inMdHandler(options = {}) {
  const mdFile = options.mdFile || 'ReqText.reqt.md';
  const keepMd = options.keep || options.k || false;

  // Get the path to the source-of-truth .reqt.json file
  const reqtFilePath = await getCurrentReqtFilePath();

  // Update .reqt.json from markdown
  let updatedCount = 0;
  try {
    // updateReqtFromMarkdown expects (jsonPath, mdPath)
    const updated = await updateReqtFromMarkdown(reqtFilePath, mdFile);
    updatedCount = Array.isArray(updated) ? updated.filter(x => x).length : 0;
    // Write updated JSON back to file
    const fs = await import('fs/promises');
    await fs.writeFile(reqtFilePath, JSON.stringify(updated, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to update .reqt.json from markdown:', err.message);
    process.exit(1);
  }

  // Delete markdown file unless --keep or -k is specified
  if (!keepMd) {
    try {
      await fs.unlink(mdFile);
    } catch (err) {
      console.warn(`Could not delete markdown file: ${mdFile}`);
    }
  }

  console.log(`Imported ${updatedCount} requirement(s) from ${mdFile} into ${reqtFilePath}.`);
  if (!keepMd) {
    console.log(`Deleted markdown file: ${mdFile}`);
  }
}
