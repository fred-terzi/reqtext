// src/commands/deleteObject.js

import computeOutlines from '../utils/computeOutlines.js';


/**
 * Deletes the object with the given outline number, updates the selection,
 * and recomputes outlines for the remaining items.
 *
 * @param {Array<Object>} data - The flat-array representation of your tree.
 * @param {string} outlineNumber - The outline number of the item to delete.
 * @returns {{ data: Array<Object>, selectedIndex: number|null } | void}
 */
export default function deleteObject(data, outlineNumber) {

  // Find the index of the object with the given outline number
  const selectedIndex = data.findIndex(item => item.outline === outlineNumber);

  if (selectedIndex === -1) {
    console.error(
      `⚠️  No item found with outline number: ${outlineNumber}. Please provide a valid outline number.`
    );
    return;
  }

  // Remove the selected item
  data.splice(selectedIndex, 1);

  // Recompute outlines for the entire data array
  computeOutlines(data);

  return data ;
}
