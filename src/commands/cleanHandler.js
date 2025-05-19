import { getData, setData } from '../services/dataHandler.js';

import fhr from '@terzitech/flathier';

/**
 * Uses the flathier library's custom extension and unique ID logic.
 * @returns {Promise<void>}
 */
async function cleanHandler() {
  // Load items from SoT using dataHandler
  let items = await getData();
  // Recalculate outlines as a fail save
  items = await fhr.computeOutlines(items);
  let changed = false;
  // Use hardcoded extension for reqtext
  const ext = 'reqt_ID';

  const updatedItems = await Promise.all(items.map(async item => {
    let updated = { ...item };

    // Ensure reqt_ID field exists and is valid
    if (!('reqt_ID' in updated) || !updated.reqt_ID || typeof updated.reqt_ID !== 'string' || updated.reqt_ID === 'GENERATE_WITH_CLEAN' || updated.reqt_ID === 'PLACEHOLDER') {
      updated.reqt_ID = await fhr.generateUniqueId();
      changed = true;
    }
    // Find all keys that match the ext _ID pattern
    for (const key of Object.keys(updated)) {
      const keyUpper = key.toUpperCase();
      if (
        (keyUpper === ext || keyUpper.endsWith(`_${ext}`)) &&
        (!updated[key] || typeof updated[key] !== 'string' || updated[key] === 'GENERATE_WITH_CLEAN' || updated[key] === 'PLACEHOLDER')
      ) {
        updated[key] = await fhr.generateUniqueId();
        changed = true;
      }
    }
    return updated;
  }));
  if (changed) {
    await setData(updatedItems); // Save updated items using dataHandler
    console.log(`\u2705 Clean complete: All items have valid ${ext}_ID fields.`); // ✅
  } else {
    console.log(`\u2705 Clean complete: No changes were necessary. All items already have valid ${ext}_ID fields.`); // ✅
  }
}

export default cleanHandler;
