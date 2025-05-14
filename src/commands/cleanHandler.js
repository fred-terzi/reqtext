// Handler for the 'clean' command: ensures all items in the .reqt.json file have valid reqt_ID and proj_ID
import fs from 'fs';
import path from 'path';

function generateReqtId() {
  // ISO timestamp + random hex
  return new Date().toISOString() + '-' + Math.random().toString(16).slice(2, 10);
}

function getNextProjId(items) {
  // Find the highest proj_ID and increment
  let maxId = 0;
  items.forEach(item => {
    if (typeof item.proj_ID === 'number' && item.proj_ID > maxId) {
      maxId = item.proj_ID;
    }
  });
  return maxId + 1;
}

function cleanReqtFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8');
  let items = JSON.parse(data);
  let nextProjId = getNextProjId(items);
  let changed = false;

  items = items.map(item => {
    let updated = { ...item };
    // Clean if reqt_ID is missing, not a string, or set to 'GENERATE_WITH_CLEAN'
    if (!updated.reqt_ID || typeof updated.reqt_ID !== 'string' || updated.reqt_ID === 'GENERATE_WITH_CLEAN') {
      updated.reqt_ID = generateReqtId();
      changed = true;
    }
    if (typeof updated.proj_ID !== 'number') {
      updated.proj_ID = nextProjId++;
      changed = true;
    }
    return updated;
  });

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2) + '\n');
    console.log('Cleaned reqt file and updated missing IDs.');
  } else {
    console.log('No changes needed. All IDs are valid.');
  }
}

export default cleanReqtFile;
