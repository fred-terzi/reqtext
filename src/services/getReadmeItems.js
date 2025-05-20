// Utility to extract and filter items for README generation from .reqt.json
import fs from 'fs/promises';

/**
 * Load and filter reqt items for README generation.
 * Excludes items where readme === 'exclude'.
 * @param {string} jsonPath - Path to .reqt.json
 * @returns {Promise<Array>} Filtered reqt items
 */
export async function getReadmeItems(jsonPath) {
  const raw = await fs.readFile(jsonPath, 'utf8');
  const data = JSON.parse(raw);
  // Support both array and object forms
  const items = Array.isArray(data) ? data : Object.values(data);
  // Exclude items where readme === 'exclude'
  return items.filter(item => (item.readme || '').trim().toLowerCase() !== 'exclude');
}

// Example usage (for test/dev):
// (async () => {
//   const items = await getReadmeItems('./.reqt/ReqText.reqt.json');
//   console.log(items.map(i => i.title));
// })();
