// Handler for the edit_title command in reqtext
import fhr from '@terzitech/flathier';

export default async function editTitleHandler(outlineNumber, ...titleParts) {
  if (!outlineNumber || titleParts.length === 0) {
    console.error('Usage: edit_title <outlineNumber> <newTitle>');
    return;
  }
  const newTitle = titleParts.join(' ');
  try {
    // Load data using flathier API
    const data = await fhr.loadData();
    // Edit the title
    fhr.editTitle(data, outlineNumber, newTitle);
    // Save the updated data
    await fhr.saveData(data);
    console.log(`Title for outline ${outlineNumber} updated to: ${newTitle}`);
  } catch (err) {
    console.error('Error editing title:', err.message);
  }
}
