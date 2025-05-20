// Simple unit test for generateReadmeAIJson
import generateReadmeAIJson from '../src/services/generateReadmeAIJson.js';

async function testGenerateReadmeAIJson() {
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
  const result = await generateReadmeAIJson(input);
  const [meta, ...items] = result;
  const metaOk = meta && typeof meta.generated_on === 'string' && meta.generated_on.length > 0 && typeof meta.generated_by === 'string' && meta.generated_by.includes('ReqText');
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
  const itemsOk = JSON.stringify(items) === JSON.stringify(expected);
  const pass = metaOk && itemsOk;
  console.log('generateReadmeAIJson simple test:', pass ? 'PASS' : 'FAIL');
  if (!pass) {
    console.log('Meta:', meta);
    console.log('Expected items:', expected);
    console.log('Got items:', items);
  }
}

testGenerateReadmeAIJson();
