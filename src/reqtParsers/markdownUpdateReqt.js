import { getCurrentReqtFilePath } from '../utils/getCurrentReqtFilePath.js';
import { getExistingMarkdownFile } from '../utils/getExistingMarkdownFile.js';
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
      // More robust: allow flexible whitespace and case-insensitive label matching
      // Stop at the first HTML comment (<!--) after the field label, to avoid capturing tables or other sections
      const regex = new RegExp(`<!-- reqt_${field}_field-->\\s*\\*\\*${label.replace(/ /g, '\\s*')}\\s*:\\*\\*\\s*([\\s\\S]*?)(?=<!--|$)`, 'i');
      const m = block.match(regex);
      return m ? m[1].trim() : undefined;
    };
    const stripTrailingComment = val => {
      if (!val) return val;
      // Remove trailing HTML comments (and any whitespace before/after)
      return val.replace(/\n?<!--.*?-->/gs, '').trim();
    };
    const requirement = stripTrailingComment(getField('Req', 'Requirement'));
    const acceptance = stripTrailingComment(getField('Accept', 'Acceptance'));
    const details = stripTrailingComment(getField('Det', 'Details'));
    const readme = stripTrailingComment(getField('README', 'README'));
    const readme_ai = stripTrailingComment(getField('README_AI', 'README_AI'));
    // Extract the title field (only the first line after the marker)
    const rawTitle = getField('title', 'Title');
    const title = rawTitle ? rawTitle.split('\n')[0].trim() : undefined;
    updates[reqt_id] = {
      title,
      requirement,
      acceptance,
      details,
      status,
      test_exists,
      test_passed,
      readme,
      readme_ai,
    };
  }
  return updates;
}

export default async function markdownToReqt(mdFilePathArg, keep = false) {
  // Get the .json file path from getCurrentReqtFilePath
  const reqtJsonPath = await getCurrentReqtFilePath();
  // Prefer <project>.reqt.md in the project root if it exists (via util)
  const existingMdFile = getExistingMarkdownFile();
  let mdFilePath;
  if (existingMdFile) {
    mdFilePath = existingMdFile;
  } else {
    // Fallback to old logic if no project .reqt.md exists
    const mdFileName = path.basename(reqtJsonPath).replace(/\.json$/, '.md');
    mdFilePath = mdFilePathArg || path.join(process.cwd(), mdFileName);
  }
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
  let isFirst = true;
  for (const [reqt_id, fields] of Object.entries(updates)) {
    // Only overwrite fields that are defined in the Markdown
    const filteredFields = Object.fromEntries(
      Object.entries(fields).filter(([k, v]) => {
        // Prevent changing the title of the first item
        if (isFirst && k === 'title') return false;
        return v !== undefined;
      })
    );
    jsonData[reqt_id] = {
      ...jsonData[reqt_id],
      ...filteredFields,
    };
    isFirst = false;
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

  // 7. Delete the markdown file by default (unless keep is true)
  if (!keep) {
    try {
      await fs.unlink(mdFilePath);
      console.log('Deleted markdown file:', mdFilePath);
    } catch (err) {
      if (err.code !== 'ENOENT') throw err;
    }
  }
}