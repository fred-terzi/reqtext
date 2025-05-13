import fhr from "@terzitech/flathier";

export default async function makeSiblingHandler(...args) {
    // Load the data
    const data = await fhr.loadData();

    // Check if data is loaded
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("❌ No project data loaded.\n Run 'npx reqt init <project name>'");
        process.exit(1);
    }
    // Require at least one argument: outline_number
    if (args.length < 1) {
        console.error("Usage: reqtext make_sibling <outline_number>");
        process.exit(1);
    }
    const outlineNumber = args[0];
    if (!outlineNumber || typeof outlineNumber !== 'string') {
        console.error("❌ Invalid outline number. Must be a non-empty string.");
        process.exit(1);
    }

    // Promote the item with the specified outline number
    const updatedData = fhr.promote(data, outlineNumber);
    if (!updatedData || updatedData === data) {
        // promote returns unchanged data if promotion is not possible
        console.error(`⚠️  Could not promote item with outline #${outlineNumber}. It may already be at the root or not exist.`);
        process.exit(1);
    }
    // Update in-memory cache before saving
    fhr.setData(updatedData);
    await fhr.saveData(updatedData);
    console.log(`✅ Made item (and its children) with outline #${outlineNumber} a sibling of the previous item.`);
}
