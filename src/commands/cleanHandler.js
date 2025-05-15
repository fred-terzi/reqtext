// Handler for the 'clean' command: ensures all items in the .reqt.json file have valid reqt_ID
// This module is now pure: it only receives and returns data, no file I/O
import fhr from '@terzitech/flathier';

/**
 * Uses the flathier library's custom extension and unique ID logic.
 * @returns {Promise<void>}
 */
async function cleanHandler() {
  // Load items from file
  const items = await fhr.loadData();
  let changed = false;
  // Use hardcoded extension for reqtext
  const customExt = 'reqt';
  const extId = `${customExt}_ID`;
  const extIdUpper = extId.toUpperCase();

  const updatedItems = await Promise.all(items.map(async item => {
    let updated = { ...item };
    // Find all keys that match the customExt _ID pattern
    for (const key of Object.keys(updated)) {
      const keyUpper = key.toUpperCase();
      if (
        (keyUpper === extIdUpper || keyUpper.endsWith(`_${extIdUpper}`)) &&
        (!updated[key] || typeof updated[key] !== 'string' || updated[key] === 'GENERATE_WITH_CLEAN' || updated[key] === 'PLACEHOLDER')
      ) {
        updated[key] = await fhr.generateUniqueId();
        changed = true;
      }
    }
    return updated;
  }));
  if (changed) {
    fhr.setData(updatedItems); // Set the updated items as cachedData
    await fhr.saveData();
    console.log(`\u2705 Clean complete: All items have valid ${customExt}_ID fields.`); // ✅
  } else {
    console.log(`\u2705 Clean complete: No changes were necessary. All items already have valid ${customExt}_ID fields.`); // ✅
  }
}

export default cleanHandler;
