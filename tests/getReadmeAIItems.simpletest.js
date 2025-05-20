// Simple unit test for getReadmeAIItems
import getReadmeAIItems from '../src/services/getReadmeAIItems.js';

function testGetReadmeAIItems() {
  const input = [
    { title: 'A', readme: 'foo', readme_ai: 'AI details' },
    { title: 'B', readme: 'bar', readme_ai: 'exclude' },
    { title: 'C', readme: 'baz' },
    { title: 'D', readme: 'qux', readme_ai: '  Exclude  ' },
    { title: 'E', readme: 'no ai', readme_ai: 'AI E' },
    { title: 'F', readme: 'missing ai' },
    { readme: 'no title', readme_ai: 'AI only' },
    { title: 'G', readme_ai: 'AI G' },
    { title: 'H', readme: 'should be included', readme_ai: undefined },
    { title: 'I', readme: 'should be included', readme_ai: 42 }
  ];
  const expected = [
    { title: 'A', readme: 'foo', readme_ai: 'AI details' },
    { title: 'C', readme: 'baz', readme_ai: '' },
    { title: 'E', readme: 'no ai', readme_ai: 'AI E' },
    { title: 'F', readme: 'missing ai', readme_ai: '' },
    { title: '', readme: 'no title', readme_ai: 'AI only' },
    { title: 'G', readme: '', readme_ai: 'AI G' },
    { title: 'H', readme: 'should be included', readme_ai: '' },
    { title: 'I', readme: 'should be included', readme_ai: '' }
  ];
  const result = getReadmeAIItems(input);
  const pass = JSON.stringify(result) === JSON.stringify(expected);
  console.log('getReadmeAIItems simple test:', pass ? 'PASS' : 'FAIL');
  if (!pass) {
    console.log('Expected:', expected);
    console.log('Got:', result);
  }
}

testGetReadmeAIItems();
