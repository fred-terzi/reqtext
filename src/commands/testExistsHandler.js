// Handler for the test-exists command in reqtext
import { getData, setData } from '../services/dataHandler.js';

export default async function testExistsHandler(outlineNumber, boolValue) {
  if (!outlineNumber || typeof boolValue === 'undefined') {
    console.error('Usage: test-exists <outlineNumber> <true/false>');
    return;
  }
  const normalized = String(boolValue).toLowerCase();
  let newValue;
  if (normalized === 'true') newValue = true;
  else if (normalized === 'false') newValue = false;
  else {
    console.error('Second argument must be true or false');
    return;
  }
  try {
    const data = await getData();
    if (!Array.isArray(data)) {
      throw new Error('Loaded data is not an array');
    }
    const idx = data.findIndex(item => item.outline === outlineNumber);
    if (idx === -1) {
      throw new Error(`No item found with outline number: ${outlineNumber}`);
    }
    data[idx].test_exists = newValue;
    await setData(data);
    console.log(`test_exists for outline ${outlineNumber} updated to: ${newValue}`);
  } catch (err) {
    console.error('Error setting test_exists:', err.message);
  }
}
