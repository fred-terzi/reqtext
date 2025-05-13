
/**
 * Builds an ASCII-art tree with proper connectors, treating the first top-level item as the main root.
 * @param {Array<{ outline: string, title: string }>} items - Items with 'outline' and 'title'
 * @returns {Array<Array<string>>} The ASCII art tree as an array of rows
 */
export default async function createAsciiTree(items, fieldsToInclude) {

    const byOutline = Object.fromEntries(items.map(i => [i.outline, i]));

    const sortedOutlines = items
      .map(i => i.outline)
      .sort((a, b) => {
        const as = a.split('.').map(Number);
        const bs = b.split('.').map(Number);
        for (let i = 0; i < Math.max(as.length, bs.length); i++) {
          const av = as[i] || 0;
          const bv = bs[i] || 0;
          if (av !== bv) return av - bv;
        }
        return 0;
      });

    const children = {};
    for (const outline of sortedOutlines) {
      const parts = outline.split('.');
      if (parts.length > 1) {
        const parent = parts.slice(0, -1).join('.');
        (children[parent] = children[parent] || []).push(outline);
      }
    }

    const topLevels = sortedOutlines.filter(o => !o.includes('.'));
    if (topLevels.length === 0) return [];

    const mainRoot = topLevels[0];
    for (let i = 1; i < topLevels.length; i++) {
      (children[mainRoot] = children[mainRoot] || []).push(topLevels[i]);
    }

    const roots = [mainRoot];
    const treeArray = []; // Array to store the rows

    /**
     * Recursively process each node and add its data to the array
     * @param {string} outline - The outline key
     * @param {string[]} prefixParts - Array of prefix segments for each depth
     * @param {boolean} isLast - Whether this node is the last of its siblings
     */
    function recurse(outline, prefixParts, isLast) {
      const branchSymbol = prefixParts.length === 0 ? '    ' : (isLast ? '└── ' : '├── ');
      const prefix = prefixParts.length === 0 ? '' : prefixParts.join('');
      const node = byOutline[outline];

      // Ensure no leading spaces before the prefix art
      const formattedOutline = outline;
      const formattedTitle = fieldsToInclude.map(field => node[field] || '').join(' - ');
      treeArray.push(`${prefix}${branchSymbol}${formattedOutline}: ${formattedTitle}\n`);

      const kids = children[outline] || [];
      kids.forEach((child, idx) => {
        const lastChild = idx === kids.length - 1;
        const nextPrefix = prefixParts.concat(isLast ? '    ' : '│   ');
        recurse(child, nextPrefix, lastChild);
      });
    }

    recurse(roots[0], [], true);
    return treeArray;
}
