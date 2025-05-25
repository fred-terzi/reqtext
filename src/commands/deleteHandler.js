import fhr from "flathier";
import { getData, setData } from '../services/dataHandler.js';

export default async function deleteHandler(...args) {
    // Load the data using the new data handler
    const data = await getData();
    // Check if data is loaded
    if (!data || !Array.isArray(data) || data.length === 0) {
        console.error("❌ No project data loaded.\n Run 'npx reqt init <project name>'");
        process.exit(1);
    }
    // Require at least one argument: outline_number or unique_id
    if (args.length < 1) {
        console.error("Usage: reqtext delete <outline_number>");
        process.exit(1);
    }
    // Outline numbers may be strings (e.g., '2.1'), so treat as string
    const outlineNumber = args[0];
    if (!outlineNumber || typeof outlineNumber !== 'string') {
        console.error("❌ Invalid outline number. Must be a non-empty string.");
        process.exit(1);
    }
    console.log(`Deleting item with outline ${outlineNumber}...`);
    // Delete the item with the specified outline number
    const updatedData = await fhr.deleteObject(data, outlineNumber);
    if (!updatedData) {
        // deleteObject should print its own warning if outline not found
        process.exit(1);
    }
    // Save the updated data using the new data handler
    await setData(updatedData);
    console.log(`✅ Deleted item with outline #${outlineNumber}`);
}
