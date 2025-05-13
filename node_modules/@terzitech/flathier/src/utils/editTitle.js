/**
 * Edits the title of an object in the data array by outline number.
 * @param {Array} data - The array of objects to modify.
 * @param {string} outlineNumber - The outline number of the item to edit.
 * @param {string} newTitle - The new title to set.
 * @returns {Array} - The modified array with the updated title.
 * @throws {Error} - Throws an error if the item is not found.
 */
export default function editTitle(data, outlineNumber, newTitle) {
  const index = data.findIndex(item => item.outline === outlineNumber);
  if (index === -1) {
    throw new Error(`No item found with outline number: ${outlineNumber}`);
  }
  data[index].title = newTitle;
  return data;
}