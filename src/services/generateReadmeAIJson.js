// generateReadmeAIJson.js
// Service to generate the README_AI.reqt.json structure
import getReadmeAIItems from './getReadmeAIItems.js';
import getVersion from '../utils/getVersion.js';

/**
 * Generates the README_AI JSON structure with metadata and filtered items.
 * @param {Array} reqtArray - Array of requirement items from .reqt.json
 * @returns {Object[]} Array with metadata object followed by filtered items
 */
export default async function generateReadmeAIJson(reqtArray) {
  const version = await getVersion();
  const meta = {
    generated_on: new Date().toISOString(),
    generated_by: `ReqText v${version} (https://github.com/fred-terzi/reqtext)`
  };
  const items = getReadmeAIItems(reqtArray);
  return [meta, ...items];
}
