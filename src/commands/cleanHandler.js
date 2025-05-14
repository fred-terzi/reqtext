// Handler for the 'clean' command: ensures all items in the .reqt.json file have valid reqt_ID
// This module is now pure: it only receives and returns data, no file I/O
import fhr from '@terzitech/flathier';

/**
 * Cleans a reqt file: loads items, ensures each has a valid reqt_ID, and saves if changed.
 * @param {string} filePath - Path to the reqt JSON file
 * @returns {Promise<{changed: boolean, items: array}>}
 */
async function cleanHandler() {
  // Load items from file
  const items = await fhr.loadData();
  let changed = false;
  const updatedItems = items.map(item => {
    let updated = { ...item };
    if (!updated.reqt_ID || typeof updated.reqt_ID !== 'string' || updated.reqt_ID === 'GENERATE_WITH_CLEAN') {
      updated.reqt_ID = fhr.generateUniqueId();
      changed = true;
    }
    return updated;
  });
  if (changed) {
    await fhr.saveData(updatedItems);
  }

}

export default cleanHandler;
