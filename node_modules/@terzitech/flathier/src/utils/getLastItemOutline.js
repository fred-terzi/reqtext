/**
 * @function getLastItemOutline
 * @description Gets the outline number of the last item in the data array.
 * @param {Array<Object>} data - The flat-array representation of your tree.
 * @returns {string | null} - The outline number of the last item or null if the array is empty.
 */
export default function getLastItemOutline(data) {
  if (data.length === 0) {
    return null;
  }
  const lastItem = data[data.length - 1];
  return lastItem.outline || null;
}