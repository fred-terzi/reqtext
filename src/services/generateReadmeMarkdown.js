// Markdown generation for README from filtered reqt items
// Usage: import { generateReadmeMarkdown } from './generateReadmeMarkdown.js'

/**
 * Generate Markdown for README from reqt items.
 * - Uses item.title as header (heading level based on item.hier)
 * - Includes item.readme as content
 * - Omits outline numbers
 * - Skips items with empty or undefined readme
 * @param {Array} items - Filtered reqt items
 * @param {Object} [options] - Optional: { meta, projectTitle }
 * @returns {string} Markdown string
 */
export function generateReadmeMarkdown(items, options = {}) {
  const { meta } = options;
  let md = '';
  if (items.length > 0 && items[0].title) {
    md += `# ${items[0].title}\n\n`;
  }
  items.forEach((item, idx) => {
    if (!item.readme || item.readme.trim() === '' || item.readme.trim().toLowerCase() === 'undefined') return;
    if (idx === 0) {
      // For the first item, just output the readme content (no heading)
      md += `${item.readme.trim()}\n\n`;
    } else {
      // If outline is not '0', add one more hashtag to the heading
      let level = Math.max(1, Number(item.hier) + 1) || 2;
      if (String(item.outline) !== '0') level += 1;
      md += `${'#'.repeat(level)} ${item.title}\n\n`;
      md += `${item.readme.trim()}\n\n`;
    }
  });
  if (meta) {
    // Make ReqText and version number bold in the meta string
    const metaBold = meta.replace(/(ReqText v)([\w\.-]+)/, (_, a, b) => `**${a}${b}**`);
    md += `---\n${metaBold}\n`;
  }
  return md.trim() + '\n';
}

// Example usage (for test/dev):
// import { getReadmeItems } from './getReadmeItems.js';
// (async () => {
//   const items = await getReadmeItems('./.reqt/ReqText.reqt.json');
//   const md = generateReadmeMarkdown(items, { projectTitle: 'ReqText' });
//   console.log(md);
// })();
