// Simple unit test for generateReadmeAIJson
import generateReadmeAIJson from '../src/services/generateReadmeAIJson.js';

async function testGenerateReadmeAIJson() {
  const input = [
    { title: 'A', readme: 'foo', readme_ai: true },
    { title: 'B', readme: 'bar', readme_ai: false },
    { title: 'C', readme: 'baz' },
    { title: 'D', readme: 'qux', readme_ai: true }
  ];
  const result = await generateReadmeAIJson(input);
  const [meta, ...items] = result;
  const metaOk = meta && typeof meta.generated_on === 'string' && meta.generated_on.length > 0 && typeof meta.generated_by === 'string' && meta.generated_by.includes('ReqText');
  const itemsOk = Array.isArray(items) && items.length === 3 && items[0].title === 'A' && items[1].title === 'C' && items[2].title === 'D';
  const pass = metaOk && itemsOk;
  console.log('generateReadmeAIJson simple test:', pass ? 'PASS' : 'FAIL');
  if (!pass) {
    console.log('Meta:', meta);
    console.log('Items:', items);
  }
}

testGenerateReadmeAIJson();
