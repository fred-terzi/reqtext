// Handler for the set-status command in reqtext
import { getData, setData } from '../services/dataHandler.js';

export default async function setStatusHandler(outlineNumber, ...statusParts) {
  if (!outlineNumber || statusParts.length === 0) {
    console.error('Usage: set-status <outlineNumber> <newStatus>');
    return;
  }
  const newStatus = statusParts.join(' ');
  try {
    const data = await getData();
    if (!Array.isArray(data)) {
      throw new Error('Loaded data is not an array');
    }
    const idx = data.findIndex(item => item.outline === outlineNumber);
    if (idx === -1) {
      throw new Error(`No item found with outline number: ${outlineNumber}`);
    }
    data[idx].status = newStatus;
    await setData(data);
    console.log(`Status for outline ${outlineNumber} updated to: ${newStatus}`);
  } catch (err) {
    console.error('Error setting status:', err.message);
  }
}
