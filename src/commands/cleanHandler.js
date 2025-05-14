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
  const updatedItems = await Promise.all(items.map(async item => {
    let updated = { ...item };
    if (!updated.reqt_ID || typeof updated.reqt_ID !== 'string' || updated.reqt_ID === 'GENERATE_WITH_CLEAN') {
      updated.reqt_ID = await fhr.generateUniqueId();
      changed = true;
    }
    return updated;
  }));
  if (changed) {
    fhr.setData(updatedItems); // Set the updated items as cachedData
    await fhr.saveData();
    console.log('Clean complete: All items have valid reqt_IDs.');
  } else {
    console.log('Clean complete: No changes were necessary. All items already have valid reqt_IDs.');
  }

}

export default cleanHandler;
