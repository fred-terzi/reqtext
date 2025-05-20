import { generateReadmeMarkdown } from '../src/services/generateReadmeMarkdown.js';

function testGenerateReadmeMarkdown() {
  const items = [
    { title: 'Root', hier: 0, readme: 'Root content' },
    { title: 'Child', hier: 1, readme: 'Child content' },
    { title: 'Skip', hier: 2, readme: 'exclude' },
    { title: 'Empty', hier: 1, readme: '' },
    { title: 'Undefined', hier: 1, readme: undefined },
    { title: 'UndefinedStr', hier: 1, readme: 'undefined' },
  ];
  // Filter as in real usage
  const filtered = items.filter(
    i => i.readme && i.readme.trim() !== '' && i.readme.trim().toLowerCase() !== 'exclude' && i.readme.trim().toLowerCase() !== 'undefined'
  );
  const md = generateReadmeMarkdown(filtered, { projectTitle: 'TestProject', meta: 'Meta section' });
  console.log('--- Generated Markdown ---\n' + md + '\n--------------------------');
  const hasRoot = md.includes('# TestProject') && md.includes('Root content');
  const hasChild = md.includes('## Child') && md.includes('Child content');
  const hasMeta = md.includes('Meta section');
  const skips = !md.includes('Skip') && !md.includes('Empty') && !md.includes('Undefined') && !md.includes('UndefinedStr');
  if (hasRoot && hasChild && hasMeta && skips) {
    console.log('generateReadmeMarkdown: PASS');
  } else {
    console.error('generateReadmeMarkdown: FAIL');
    process.exit(1);
  }
}

testGenerateReadmeMarkdown();
