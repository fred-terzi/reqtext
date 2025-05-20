// getReadmeAIItems.js
// Service to filter and extract items for README_AI generation from .reqt.json

/**
 * Filters and extracts items for README_AI generation.
 * Excludes items where readme_ai is 'exclude' (case-insensitive, trimmed).
 * For included items, outputs both readme and readme_ai fields (readme_ai as string, empty if not present or not a string).
 * @param {Array} reqtArray - Array of requirement items from .reqt.json
 * @returns {Array} Array of { title, readme } objects for README_AI
 */
export default function getReadmeAIItems(reqtArray) {
  if (!Array.isArray(reqtArray)) return [];
  return reqtArray
    .filter(item => {
      // Exclude if readme_ai is exactly 'exclude' (case-insensitive, trimmed)
      if (typeof item.readme_ai === 'string' && item.readme_ai.trim().toLowerCase() === 'exclude') return false;
      return true;
    })
    .map(item => ({
      title: item.title || '',
      readme: item.readme || '',
      readme_ai: item.readme_ai && typeof item.readme_ai === 'string' ? item.readme_ai : ''
    }));
}
