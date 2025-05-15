# Code Review: customExtStore.json Handling in flathier

**Date:** 2025-05-15

## Assessment

The flathier library currently has an inconsistency in how it reads and writes the `customExtStore.json` file. The file is sometimes written as an object (correct), but in some environments or legacy projects, it may exist as an array (e.g., `[ { "customExt": ".fhr" } ]`).

### Problem
- The code expects and writes an object: `{ "customExt": "reqt" }`.
- If the file is an array, updates may not work as intended, and the extension may not be set or read correctly.
- This causes downstream issues where the wrong extension/folder is used (e.g., `.fhr` instead of `.reqt`).

### Recommendation
- **Standardize**: Always read and write `customExtStore.json` as an object.
- **Migration**: Add logic to detect if the file is an array, extract the value, and rewrite as an object.
- **Backward Compatibility**: On read, if an array is found, migrate it to an object and continue.

### Example Migration Logic
```js
if (Array.isArray(parsed)) {
    if (parsed.length && parsed[0].customExt) {
        customExt = parsed[0].customExt;
        // Rewrite as object for future use
        await fs.writeFile(customExtStorePath, JSON.stringify({ customExt }, null, 2));
    }
} else if (parsed && typeof parsed === 'object' && parsed.customExt) {
    customExt = parsed.customExt;
}
```

### Action Items
- Update all code that reads/writes `customExtStore.json` to use this logic.
- Test with both array and object formats to ensure smooth migration.

---

**Summary:**
This change will make flathier more robust and prevent extension/folder bugs for all users and downstream tools like ReqText.
