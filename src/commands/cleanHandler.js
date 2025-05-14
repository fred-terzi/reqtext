// Handler for the 'clean' command: ensures all items in the .reqt.json file have valid reqt_ID
// This module is now pure: it only receives and returns data, no file I/O
import fhr from '@terzitech/flathier';

/**
 * Cleans an array of reqt items, ensuring each has a valid reqt_ID.
 * Returns { items: updatedItems, changed: boolean }
 */
function cleanReqtItems(items) {
  let changed = false;
  const updatedItems = items.map(item => {
    let updated = { ...item };
    if (!updated.reqt_ID || typeof updated.reqt_ID !== 'string' || updated.reqt_ID === 'GENERATE_WITH_CLEAN') {
      updated.reqt_ID = fhr.generateUniqueId();
      changed = true;
    }
    return updated;
  });
  return { items: updatedItems, changed };
}

export default cleanReqtItems;
