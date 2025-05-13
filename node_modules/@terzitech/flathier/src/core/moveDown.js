import computeOutlines from "../utils/computeOutlines.js";

/**
 * Moves the selected item and all its children down one position among its siblings.
 * Updates the order of objects in the JSON without recalculating outline numbers.
 * 
 * @param {Array<Object>} items - Array of nodes, each with unique_id, title, hier, and outline properties.
 * @param {string} outlineToMove - The outline string of the node to move (e.g., "2.1").
 * @returns {Array<Object>} The updated array with the moved item.
 */
export default function moveDown(items, outlineToMove) {
    // Get the unique_id of the item to move
    const itemToMove = items.find(i => i.outline === outlineToMove);
    // Build node objects with children
    const nodeMap = {};
    const nodes = items.map(i => ({ ...i, children: [] }));
    nodes.forEach(n => (nodeMap[n.outline] = n));
    const roots = [];
    nodes.forEach(n => {
      const parts = n.outline.split('.');
      if (parts.length === 1) roots.push(n);
      else {
        const parent = nodeMap[parts.slice(0, -1).join('.')];
        parent.children.push(n);
      }
    });

    // Helper to find and swap within parent's children array
    function swapInParent(targetOutline) {
      const parts = targetOutline.split('.');
      const parentArr = parts.length === 1 ? roots : nodeMap[parts.slice(0, -1).join('.')].children;
      const idx = parentArr.findIndex(n => n.outline === targetOutline);
      if (idx < 0 || idx === parentArr.length - 1) return false;
      [parentArr[idx], parentArr[idx + 1]] = [parentArr[idx + 1], parentArr[idx]];
      return true;
    }

    // Attempt swap
    if (!swapInParent(outlineToMove)) return items;

    // Flatten tree back into an array without recalculating outlines
    const newItems = [];
    function flatten(arr) {
      arr.forEach(n => {
        newItems.push({ ...n, hier: n.hier, outline: n.outline }); // Use spread operator to retain all fields and update only hier and outline
        if (n.children.length) flatten(n.children);
      });
    }

    flatten(roots);

    // Delete the children property from each item
    newItems.forEach(item => {
      delete item.children;
    });
    const updateData = computeOutlines(newItems);
    return updateData;
}
