// Simple Node.js test for getReadmeItems (no Jest, no frameworks)
import { getReadmeItems } from '../src/services/getReadmeItems.js';
import fs from 'fs/promises';
import path from 'path';

(async () => {
  const testFile = path.join(path.dirname(new URL(import.meta.url).pathname), 'test.reqt.json');
  const sampleData = [
    { title: 'A', readme: 'foo' },
    { title: 'B', readme: 'exclude' },
    { title: 'C', readme: 'bar' },
    { title: 'D', readme: ' Exclude ' },
    { title: 'E', readme: '' },
    { title: 'F' },
  ];
  await fs.writeFile(testFile, JSON.stringify(sampleData, null, 2), 'utf8');
  try {
    const items = await getReadmeItems(testFile);
    console.log(items)
    const titles = items.map(i => i.title);
    const pass =
      titles.includes('A') &&
      titles.includes('C') &&
      titles.includes('E') &&
      titles.includes('F') &&
      !titles.includes('B') &&
      !titles.includes('D');
    if (pass) {
      console.log('getReadmeItems: PASS');
    } else {
      console.error('getReadmeItems: FAIL');
      console.error('Output:', titles);
      process.exit(1);
    }
  } finally {
    await fs.unlink(testFile);
  }
})();
