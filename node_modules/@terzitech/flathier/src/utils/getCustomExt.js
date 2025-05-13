import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

// Helper to get customExt from customExtStore.json
export default async function getCustomExt() {
  // Try resolving relative to this file
  let customExtStorePath = path.join(__dirname, '../fhrTemplates/customExtStore.json');
  let triedPaths = [customExtStorePath];

  // If not found, try from process.cwd() (project root)
  try {
    await fs.access(customExtStorePath);
  } catch {
    customExtStorePath = path.resolve(process.cwd(), 'node_modules/@terzitech/flathier/src/fhrTemplates/customExtStore.json');
    triedPaths.push(customExtStorePath);
  }

  try {
    const storeData = await fs.readFile(customExtStorePath, 'utf-8');
    const storeArray = JSON.parse(storeData);
    if (Array.isArray(storeArray) && storeArray.length > 0 && storeArray[0].customExt) {
      return storeArray[0].customExt;
    }
  } catch (err) {
    console.error('[getCustomExt] Failed to read customExtStore.json. Tried paths:', triedPaths, '\nError:', err.message);
    // fallback to default
  }
  return 'fhr'; // fallback default
}