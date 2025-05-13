/**
 * Utility: flattens a tree back to an array, recalculating outline & hier
 * @param {Array} roots - The root nodes of the tree
 * @returns {Array} Flattened array with updated hier and outline
 */
export default function flattenTree(roots) {
    const result = [];
    function recurse(arr, prefix = []) {
        arr.forEach((n, idx) => {
            const segment = prefix.length === 0 ? idx : idx + 1;
            const newOutline = [...prefix, segment].join('.');
            const updatedNode = { ...n };
            updatedNode.hier = prefix.length; // Update 'hier' property
            updatedNode.outline = newOutline; // Update 'outline' property
            delete updatedNode.children; // Remove children field altogether
            result.push(updatedNode);
            if (n.children.length) recurse(n.children, [...prefix, segment]);
        });
    }
    recurse(roots);
    return result;
}