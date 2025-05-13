import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

let cachedData     = null;
let cachedFilePath = null;

/**
 * Finds the root directory of the project by locating the nearest package.json file.
 * Starts at process.cwd(), so root is where the user ran `fhr`, not where this module lives.
 */
async function findProjectRoot(start = process.cwd()) {
  let dir = start;
  while (true) {
    const maybePkg = path.join(dir, 'package.json');
    try {
      await fs.access(maybePkg);
      return dir;
    } catch {
      const parent = path.dirname(dir);
      if (parent === dir) {
        throw new Error('package.json not found');
      }
      dir = parent;
    }
  }
}

/**
 * Finds the .fhr.json file by looking only in the project root.
 */
async function findFhrFile() {
  if (cachedFilePath) return cachedFilePath;

  const root = await findProjectRoot();    // starts at process.cwd()

  // Look for any *.fhr.json file in the root folder
  const files = await fs.readdir(root);
  const fhrFile = files.find(f => f.endsWith('.fhr.json'));
  if (!fhrFile) {
    console.warn(
      '❌ No .fhr.json file found in project root.\n' +
      '    Run `npx fhr init "<Name>"` to create one.'
    );
    return null;
  }

  cachedFilePath = path.join(root, fhrFile);
  return cachedFilePath;
}


export async function loadData() {
  const filePath = await findFhrFile();
  if (!filePath) {
    throw new Error('No .fhr.json file found in your project.');
  }
  const raw = await fs.readFile(filePath, 'utf-8');
  cachedData     = JSON.parse(raw);
  cachedFilePath = filePath;
  return cachedData;
}

export function getData() {
  if (!cachedData) throw new Error('Data not loaded. Call loadData() first.');
  return cachedData;
}

export function setData(newData) {
  cachedData = newData;
}

export async function saveData() {
  if (!cachedData || !cachedFilePath) {
    throw new Error('No data or file path to save.');
  }
  const json = JSON.stringify(cachedData, null, 2);
  await fs.writeFile(cachedFilePath, json, 'utf-8');
}

export async function refreshData() {
  return await loadData();
}
