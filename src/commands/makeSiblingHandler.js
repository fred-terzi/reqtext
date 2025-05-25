import fhr from "flathier";
import { getData, setData } from '../services/dataHandler.js';

export default async function makeSiblingHandler(...args) {
    // Load the data using the new data handler
    const data = await getData();

    // Check if data is loaded
    if (!data || !Array.isArray(data) || data.length === 0) {
        // In TUI/editor context, do nothing if no data
        return;
    }
    // Require at least one argument: outline_number
    if (args.length < 1) {
        // Do nothing if no argument
        return;
    }
    const outlineNumber = args[0];
    if (!outlineNumber || typeof outlineNumber !== 'string') {
        // Do nothing if invalid outline number
        return;
    }

    // Promote the item with the specified outline number
    const updatedData = await fhr.promote(data, outlineNumber);
    if (!updatedData || updatedData === data) {
        // Do nothing if promotion is not possible
        return;
    }
    // Save the updated data using the new data handler
    await setData(updatedData);
    console.log(`✅ Made item (and its children) with outline #${outlineNumber} a sibling of the previous item.`);
}
