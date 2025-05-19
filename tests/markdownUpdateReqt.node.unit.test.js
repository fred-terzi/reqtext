import { parseReqtBlocks } from '../src/reqtParsers/markdownUpdateReqt.js';

const sampleMarkdown = `
<!-- reqt_id: 1 --start-->
<!-- reqt_Req_field--> **Requirement:** This is a requirement. 
<!-- reqt_Accept_field--> **Acceptance:** This is acceptance criteria. 
<!-- reqt_Det_field--> **Details:** Some details here. 
<table><tr><td>Open</td><td>Yes</td><td>No</td></tr></table>
<!-- reqt_id: 1 --end-->

<!-- reqt_id: 2 --start-->
<!-- reqt_Req_field--> **Requirement:** Another requirement. 
<!-- reqt_Accept_field--> **Acceptance:** More acceptance. 
<!-- reqt_Det_field--> **Details:** More details. 
<table><tr><td>Closed</td><td>No</td><td>Yes</td></tr></table>
<!-- reqt_id: 2 --end-->
`;

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function testParseReqtBlocks() {
  const result = parseReqtBlocks(sampleMarkdown);
  const expected = {
    '1': {
      requirement: 'This is a requirement.',
      acceptance: 'This is acceptance criteria.',
      details: 'Some details here.',
      status: 'Open',
      test_exists: 'Yes',
      test_passed: 'No',
    },
    '2': {
      requirement: 'Another requirement.',
      acceptance: 'More acceptance.',
      details: 'More details.',
      status: 'Closed',
      test_exists: 'No',
      test_passed: 'Yes',
    },
  };
  if (deepEqual(result, expected)) {
    console.log('parseReqtBlocks test passed');
  } else {
    console.error('parseReqtBlocks test failed');
    console.error('Expected:', expected);
    console.error('Received:', result);
    process.exit(1);
  }
}

testParseReqtBlocks();
