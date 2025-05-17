// Handler for the edit_title command in reqtext
import { getData, setData } from '../services/dataHandler.js';

export default async function editTitleHandler(outlineNumber, ...titleParts) {
  if (!outlineNumber || titleParts.length === 0) {
    console.error('Usage: edit_title <outlineNumber> <newTitle>');
    return;
  }
  const newTitle = titleParts.join(' ');
  try {
    // Load data using the new data handler
    const data = await getData();
    if (!Array.isArray(data)) {
      throw new Error('Loaded data is not an array');
    }
    // Find the item by outline number
    const idx = data.findIndex(item => item.outline === outlineNumber);
    if (idx === -1) {
      throw new Error(`No item found with outline number: ${outlineNumber}`);
    }
    data[idx].title = newTitle;
    await setData(data);
    console.log(`Title for outline ${outlineNumber} updated to: ${newTitle}`);
  } catch (err) {
    console.error('Error editing title:', err.message);
  }
}
