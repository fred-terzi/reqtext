import fs from 'fs/promises';
import path from 'path';
import updateReqtFromMarkdown, { parseReqtBlocks } from '../src/reqtParsers/markdownUpdateReqt.js';

// Node.js test runner (no Jest)
if (require.main === module) {
  (async () => {
    const assert = (cond, msg) => { if (!cond) throw new Error(msg); };
    // Test parseReqtBlocks
    const mdSample = `\n<!-- reqt_id: 123 --start-->\n<table><tr><td>IN PROGRESS</td><td>YES</td><td>NO</td></tr></table>\n<!-- reqt_Req_field--> **Requirement:** This is a requirement.\n<!-- reqt_Accept_field--> **Acceptance:** This is acceptance.\n<!-- reqt_Det_field--> **Details:** These are details.\n<!-- reqt_id: 123 --end-->\n`;
    const result = parseReqtBlocks(mdSample);
    assert(result['123'].requirement === 'This is a requirement.', 'Requirement field mismatch');
    assert(result['123'].acceptance === 'This is acceptance.', 'Acceptance field mismatch');
    assert(result['123'].details === 'These are details.', 'Details field mismatch');
    assert(result['123'].status === 'IN PROGRESS', 'Status field mismatch');
    assert(result['123'].test_exists === 'YES', 'Test Exists field mismatch');
    assert(result['123'].test_passed === 'NO', 'Test Passed field mismatch');

    // Test updateReqtFromMarkdown
    const fs = await import('fs/promises');
    const path = await import('path');
    const tmp = (name) => path.join(process.cwd(), 'tests', name);
    const jsonSample = [
      { reqt_ID: '123', requirement: '', acceptance: '', details: '', status: '', test_exists: '', test_passed: '' },
      { reqt_ID: '456', requirement: 'untouched', acceptance: 'untouched', details: 'untouched', status: 'untouched', test_exists: 'untouched', test_passed: 'untouched' }
    ];
    const mdPath = tmp('test.md');
    const jsonPath = tmp('test.json');
    await fs.writeFile(mdPath, mdSample, 'utf8');
    await fs.writeFile(jsonPath, JSON.stringify(jsonSample), 'utf8');
    const updated = await updateReqtFromMarkdown(jsonPath, mdPath);
    assert(updated[0].requirement === 'This is a requirement.', 'updateReqtFromMarkdown: requirement mismatch');
    assert(updated[0].acceptance === 'This is acceptance.', 'updateReqtFromMarkdown: acceptance mismatch');
    assert(updated[0].details === 'These are details.', 'updateReqtFromMarkdown: details mismatch');
    assert(updated[0].status === 'IN PROGRESS', 'updateReqtFromMarkdown: status mismatch');
    assert(updated[0].test_exists === 'YES', 'updateReqtFromMarkdown: test_exists mismatch');
    assert(updated[0].test_passed === 'NO', 'updateReqtFromMarkdown: test_passed mismatch');
    assert(updated[1].requirement === 'untouched', 'updateReqtFromMarkdown: untouched item changed');
    await fs.unlink(mdPath);
    await fs.unlink(jsonPath);
    console.log('All markdownUpdateReqt tests passed.');
  })();
}

const tmp = (name) => path.join(process.cwd(), 'tests', name);

describe('markdownUpdateReqt', () => {
  const mdSample = `
<!-- reqt_id: 123 --start-->
<table><tr><td>IN PROGRESS</td><td>YES</td><td>NO</td></tr></table>
<!-- reqt_Req_field--> **Requirement:** This is a requirement.
<!-- reqt_Accept_field--> **Acceptance:** This is acceptance.
<!-- reqt_Det_field--> **Details:** These are details.
<!-- reqt_id: 123 --end-->
`;
  const jsonSample = [
    { reqt_ID: '123', requirement: '', acceptance: '', details: '', status: '', test_exists: '', test_passed: '' },
    { reqt_ID: '456', requirement: 'untouched', acceptance: 'untouched', details: 'untouched', status: 'untouched', test_exists: 'untouched', test_passed: 'untouched' }
  ];
  const mdPath = tmp('test.md');
  const jsonPath = tmp('test.json');

  beforeAll(async () => {
    await fs.writeFile(mdPath, mdSample, 'utf8');
    await fs.writeFile(jsonPath, JSON.stringify(jsonSample), 'utf8');
  });

  afterAll(async () => {
    await fs.unlink(mdPath);
    await fs.unlink(jsonPath);
  });

  it('parseReqtBlocks extracts fields from markdown', () => {
    const result = parseReqtBlocks(mdSample);
    expect(result['123']).toEqual({
      requirement: 'This is a requirement.',
      acceptance: 'This is acceptance.',
      details: 'These are details.',
      status: 'IN PROGRESS',
      test_exists: 'YES',
      test_passed: 'NO',
    });
  });

  it('updateReqtFromMarkdown updates JSON array with markdown fields', async () => {
    const updated = await updateReqtFromMarkdown(jsonPath, mdPath);
    expect(updated[0]).toMatchObject({
      reqt_ID: '123',
      requirement: 'This is a requirement.',
      acceptance: 'This is acceptance.',
      details: 'These are details.',
      status: 'IN PROGRESS',
      test_exists: 'YES',
      test_passed: 'NO',
    });
    // untouched item should remain unchanged
    expect(updated[1]).toMatchObject({
      reqt_ID: '456',
      requirement: 'untouched',
      acceptance: 'untouched',
      details: 'untouched',
      status: 'untouched',
      test_exists: 'untouched',
      test_passed: 'untouched',
    });
  });
});
