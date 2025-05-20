// reqtToMarkdown.mjs
// Node.js ES module script to convert reqt JSON to Markdown blocks per Markdown_Syntax_Design.reqt.md
import fs from 'fs/promises';
import { getCurrentReqtFilePath } from '../utils/getCurrentReqtFilePath.js';

/**
 * Convert a hierarchy number to Markdown heading hashes.
 * @param {number|string} hier
 * @param {number|string} outline
 * @returns {string}
 */
function hierToMarkdownHeader(hier, outline) {
  const n = Number(hier);
  // If outline is 0, use one hashtag, else n+2
  if (String(outline) === '0') return '#';
  return '#'.repeat(n + 2);
}

/**
 * Generate a Markdown block from a single requirement object.
 * @param {object} reqt
 * @returns {string}
 */
// Rename the inner function to avoid redeclaration
function reqtToMarkdownBlock(reqt) {
  return `<!-- reqt_id: ${reqt.reqt_ID} --start-->

${hierToMarkdownHeader(reqt.hier, reqt.outline)} ${reqt.outline}: ${reqt.title}

<!-- reqt Table Non-Editable-->
| Status | Test Exists | Test Passed |
|--------|-------------|-------------|
| ${reqt.status} | ${reqt.test_exists} | ${reqt.test_passed} |
<!-- reqt Table Non-Editable-->

<!-- reqt_Req_field-->
**Requirement:**

 ${reqt.requirement}

<!-- reqt_Accept_field-->
**Acceptance:**

 ${reqt.acceptance}

<!-- reqt_Det_field-->
**Details:**

 ${reqt.details}

<!-- reqt_README_field-->

 ${reqt.readme}

<!-- reqt_id: ${reqt.reqt_ID} --end-->`;
}

/**
 * Exported async function to convert reqt JSON to Markdown.
 * @param {string} [inputFile] - Optional path to the input .reqt.json file
 */
export default async function reqtToMarkdown(inputFile) {
  let jsonFile = inputFile;
  if (!jsonFile) {
    jsonFile = await getCurrentReqtFilePath(); // Let errors propagate for user-friendly output
  }
  const jsonText = await fs.readFile(jsonFile, 'utf8');
  const reqts = JSON.parse(jsonText);

  const markdownBlocks = reqts.map(reqtToMarkdownBlock).join('\n\n');

  // Save to file named after the root item's title (first item's title), with .reqt.md extension
  const rootTitle = reqts[0]?.title || 'output';
  // Sanitize filename: remove/replace problematic characters
  const safeTitle = rootTitle.replace(/[^a-zA-Z0-9-_]/g, '_');
  const outPath = `./${safeTitle}.reqt.md`;
  await fs.writeFile(outPath, markdownBlocks, 'utf8');
  console.log(`Markdown saved to ${outPath}`);
}

// If this script is run directly as a CLI command, allow aliases for out-md and -omd
if (import.meta.url === `file://${process.argv[1]}`) {
  const arg = process.argv[2];
  reqtToMarkdown(arg).catch(e => {
    // Robustly detect missing project config (ENOENT or message)
    if ((e.code && e.code === 'ENOENT') ||
        (typeof e.message === 'string' && /no \.reqt project/i.test(e.message))) {
      // Print only the error message, no stack trace
      console.error(`\x1b[31mError:\x1b[0m ${e.message}`);
      process.exit(2);
    } else {
      // Unexpected error: print full error (with stack)
      console.error(e);
      process.exit(1);
    }
  });
}
