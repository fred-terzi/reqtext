import fhr from "@terzitech/flathier";

export default async function addAfterHandler(...args) {
    // Load the data
    const data = await fhr.loadData();
    // Check if data is loaded
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("❌ No project data loaded.\n Run 'npx reqt init <project name>'");
        process.exit(1);
    }
    // Require at least two arguments: outline_number and item_name
    if (args.length < 2) {
        console.error("Usage: reqtext add_after <outline_number> <item_name>");
        process.exit(1);
    }
    // Outline numbers may be strings (e.g., '2.1'), so treat as string
    const outlineNumber = args[0];
    if (!outlineNumber || typeof outlineNumber !== 'string') {
        console.error("❌ Invalid outline number. Must be a non-empty string.");
        process.exit(1);
    }
    const itemName = args.slice(1).join(" ") || "New Item";

    // Insert the new item after the specified outline number
    const updatedData = await fhr.addObject(data, outlineNumber, itemName);
    if (!updatedData) {
        // addObject prints its own warning if outline not found
        process.exit(1);
    }
    // Save the updated data
    await fhr.saveData(updatedData);
    console.log(`✅ Added item '${itemName}' after outline #${outlineNumber}`);
}
