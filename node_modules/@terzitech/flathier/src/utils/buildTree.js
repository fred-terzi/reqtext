/**
 * Utility: builds a tree structure and index map from flat items
 */
export default function buildTree(items) {
    const nodes = items.map(i => ({ ...i, children: [] }));
    const nodeMap = {};
    nodes.forEach(n => { nodeMap[n.outline] = n; });
    const roots = [];
    nodes.forEach(n => {
      const parts = n.outline.split('.');
      if (parts.length === 1) roots.push(n);
      else nodeMap[parts.slice(0, -1).join('.')].children.push(n);
    });
    return { roots, nodeMap };
  }