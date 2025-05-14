// Script to test the cleanReqtItems function
import fhr from '@terzitech/flathier';
import cleanReqtItems from '../src/commands/cleanHandler.js';

async function testClean() {
  // Load data from a test file (using flathier's loadData)
  const filePath = './test-clean-project.reqt.json';
  const items = await fhr.loadData(filePath);

  // Intentionally corrupt some reqt_IDs for testing
  if (items.length > 0) {
    items[0].reqt_ID = undefined;
    if (items[1]) items[1].reqt_ID = 'GENERATE_WITH_CLEAN';
  }

  // Run the clean function
  const { items: cleanedItems, changed } = cleanReqtItems(items);

  // Save if changed
  if (changed) {
    await fhr.saveData(filePath, cleanedItems);
    console.log('Cleaned and saved updated items.');
  } else {
    console.log('No cleaning needed.');
  }

  // Output the cleaned items for inspection
  console.log(JSON.stringify(cleanedItems, null, 2));
}

testClean().catch(console.error);
