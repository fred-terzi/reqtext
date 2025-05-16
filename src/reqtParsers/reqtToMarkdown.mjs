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
function reqtToMarkdown(reqt) {
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
 * Main function: reads JSON file, outputs Markdown.
 */
async function main() {
  let jsonFile = process.argv[2];
  if (!jsonFile) {
    try {
      jsonFile = getCurrentReqtFilePath();
    } catch (e) {
      console.error('Usage: node reqtToMarkdown.mjs <input.json>');
      process.exit(1);
    }
  }
  const jsonText = await fs.readFile(jsonFile, 'utf8');
  const reqts = JSON.parse(jsonText);

  const markdownBlocks = reqts.map(reqtToMarkdown).join('\n\n');

  // Save to file named after the root item's title (first item's title)
  const rootTitle = reqts[0]?.title || 'output';
  // Sanitize filename: remove/replace problematic characters
  const safeTitle = rootTitle.replace(/[^a-zA-Z0-9-_]/g, '_');
  const outPath = `${safeTitle}.md`;
  await fs.writeFile(outPath, markdownBlocks, 'utf8');
  console.log(`Markdown saved to ${outPath}`);
}

main();
