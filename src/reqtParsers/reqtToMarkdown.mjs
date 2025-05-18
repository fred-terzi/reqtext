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
<table border="1" cellspacing="0" cellpadding="4">
  <tr>
    <th>Status</th><th>Test Exists</th><th>Test Passed</th>
  </tr>
  <tr>
    <td>${reqt.status}</td><td>${reqt.test_exists}</td><td>${reqt.test_passed}</td>
  </tr>
</table>
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
<!-- reqt_id: ${reqt.reqt_ID} --end-->`;
}

/**
 * Exported async function to convert reqt JSON to Markdown.
 * @param {string} [inputFile] - Optional path to the input .reqt.json file
 */
export default async function reqtToMarkdown(inputFile) {
  let jsonFile = inputFile;
  if (!jsonFile) {
    try {
      jsonFile = await getCurrentReqtFilePath();
    } catch (e) {
      throw new Error('Could not determine requirements file.');
    }
  }
  const jsonText = await fs.readFile(jsonFile, 'utf8');
  const reqts = JSON.parse(jsonText);

  const markdownBlocks = reqts.map(reqtToMarkdownBlock).join('\n\n');

  // Save to file named after the root item's title (first item's title), with .reqt.md extension
  const rootTitle = reqts[0]?.title || 'output';
  // Sanitize filename: remove/replace problematic characters
  const safeTitle = rootTitle.replace(/[^a-zA-Z0-9-_]/g, '_');
  const outPath = `${safeTitle}.reqt.md`;
  await fs.writeFile(outPath, markdownBlocks, 'utf8');
  console.log(`Markdown saved to ${outPath}`);
}

// If this script is run directly as a CLI command, allow aliases for out-md and -omd
if (import.meta.url === `file://${process.argv[1]}`) {
  // Support: node src/reqtParsers/reqtToMarkdown.mjs <input.json>
  // or: reqt out-md, reqt -omd (via bin/index.js or main.js command router)
  const arg = process.argv[2];
  reqtToMarkdown(arg).catch(e => {
    console.error(e.message || e);
    process.exit(1);
  });
}
