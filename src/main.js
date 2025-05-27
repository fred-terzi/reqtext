import help from './commands/help.js';
import getVersion from './utils/getVersion.js';
import addItemHandler from './commands/addItemHandler.js';
import addAfterHandler from './commands/addAfterHandler.js';
import init from './commands/init.js';
import deleteHandler from './commands/deleteHandler.js';
import makeChildrenHandler from './commands/makeChildrenHandler.js';
import makeSiblingHandler from './commands/makeSiblingHandler.js';
import editTitleHandler from './commands/editTitleHandler.js';
import reqtEditor from './reqtEditor.js';
import cleanHandler from './commands/cleanHandler.js';
import setStatusHandler from './commands/setStatusHandler.js';
import testExistsHandler from './commands/testExistsHandler.js';
import testPassedHandler from './commands/testPassedHandler.js';
import reqtToMarkdown from './reqtParsers/reqtToMarkdown.mjs';
import markdownToReqt from './reqtParsers/markdownUpdateReqt.js';
import { getExistingMarkdownFile } from './utils/getExistingMarkdownFile.js';

import Enquirer from 'enquirer';

async function versionCommand() {
  // Get the version from package.json using es modules
  const version = await getVersion();
  if (version) {
    console.log(`Version: ${version}`);
  } else {
    console.log('Version not found');
  }
}

const commandMap = {
  // Version command
  'version': versionCommand,

  // Help command
  'help': help,

  'init': async (...args) => {
    await init(...args);
  },

  'editor': async (...args) => {
    await reqtEditor(...args);
  },

  // Add item commands
  'add-item': async (...args) => {
    await addItemHandler(...args);
  },

  // Add After commands
  'add-after': async (...args) => {
    await addAfterHandler(...args);
  },

  // Delete commands
  'delete': async (...args) => {
    await deleteHandler(...args);
  },

  // Make Children commands
  'make-children': async (...args) => {
    await makeChildrenHandler(...args);
  },

  // Make Sibling commands
  'make-sibling': async (...args) => {
    await makeSiblingHandler(...args);
  },

  // Edit Title command
  'edit-title': async (...args) => {
    await editTitleHandler(...args);
  },

  // Clean command
  'clean': async () => {
    await cleanHandler();
  },

  // Set Status command
  'set-status': async (...args) => {
    await setStatusHandler(...args);
  },

  // Test Exists command
  'test-exists': async (...args) => {
    await testExistsHandler(...args);
  },

  // Test Passed command
  'test-passed': async (...args) => {
    await testPassedHandler(...args);
  },

  // Out MD command
  'out-md': async (...args) => {
    const fileToCheck = await getExistingMarkdownFile();
    let shouldWrite = true;
    if (fileToCheck) {
      const { Confirm } = Enquirer;
      const prompt = new Confirm({
        name: 'overwrite',
        message: `The markdown file '${fileToCheck}' already exists. Overwrite?`,
        initial: false
      });
      shouldWrite = await prompt.run();
      if (!shouldWrite) {
        console.log('Aborted: Markdown file was not overwritten.');
        return;
      }
    }
    await reqtToMarkdown(args[0]);
  },

  // In MD command
  'in-md': async (...args) => {
    // Support: reqt in-md [--keep|-k] [mdFile]
    let keep = false;
    let mdFile = undefined;
    for (const arg of args) {
      if (arg === '--keep' || arg === '-k') keep = true;
      else if (arg.endsWith('.md')) mdFile = arg;
    }
    const fileToCheck = await getExistingMarkdownFile();
    if (!fileToCheck) {
      console.log('No reqt.md file was found to import.');
      return;
    }
    let shouldWrite = true;
    if (fileToCheck) {
      const { Confirm } = Enquirer;
      const prompt = new Confirm({
        name: 'overwrite',
        message: `Check in changes to the SoT? Any conflicts will be overwritten. \n Use 'reqt diff' to check for diffs.`,
        initial: false
      });
      shouldWrite = await prompt.run();
      if (!shouldWrite) {
        console.log('Aborted: reqt.json was not updated.');
        return;
      }
    }
    await markdownToReqt(mdFile, keep);
  },

  // diff command
  'diff': async (...args) => {
    // Import the diff checker
    const { checkReqtMdDiff } = await import('./services/reqtmdDiff.js');
    // Use getData from dataHandler.js for SoT
    const { getData } = await import('./services/dataHandler.js');
    let data = await getData();
    // Optionally accept a markdown file path as an argument
    let mdPath = args.find(arg => arg.endsWith('.md'));
    await checkReqtMdDiff({ data, mdPath });
  },

  // Generate README command
  'generate-readme': async () => {
    const { getReadmeItems } = await import('./services/getReadmeItems.js');
    const { generateReadmeMarkdown } = await import('./services/generateReadmeMarkdown.js');
    const { getCurrentReqtFilePath } = await import('./utils/getCurrentReqtFilePath.js');
    const fs = (await import('fs/promises')).default;
    const path = (await import('path')).default;
    let jsonPath;
    try {
      jsonPath = await getCurrentReqtFilePath();
    } catch (err) {
      console.error('Error: ' + err.message);
      process.exit(1);
    }
    const outPath = path.resolve('README.md');
    let projectTitle = 'ReqText';
    let meta = '';
    try {
      const items = await getReadmeItems(jsonPath);
      if (items[0] && items[0].title) projectTitle = items[0].title;
      // Optionally, add meta info (date, version, repo link)
      let version = '';
      try {
        const vmod = await import('./utils/getVersion.js');
        version = typeof vmod.default === 'function' ? await vmod.default() : (vmod.getVersion ? await vmod.getVersion() : '');
      } catch {}
      meta = `Generated by ReqText v${version || 'unknown'} on ${new Date().toISOString()}\n\n[ReqText Github Repo](https://github.com/fred-terzi/reqtext)`;
      const md = generateReadmeMarkdown(items, { projectTitle, meta });
      await fs.writeFile(outPath, md, 'utf8');
      console.log(`README.md generated successfully.`);
    } catch (err) {
      console.error('Error generating README.md:', err.message);
      process.exit(1);
    }
  },

  // Add to CLI: generate-readme_ai and -grmai
  'generate-readme_ai': async () => {
    const { getCurrentReqtFilePath } = await import('./utils/getCurrentReqtFilePath.js');
    const fs = (await import('fs/promises')).default;
    const path = (await import('path')).default;

    // Allow override via REQT_SOT_PATH env var for testing/flexibility
    let reqtFilePath = process.env.REQT_SOT_PATH;
    if (!reqtFilePath) {
      reqtFilePath = await getCurrentReqtFilePath();
    }
    if (!reqtFilePath) {
      console.error('Could not find a .reqt.json file in this project.');
      process.exit(1);
    }
    let reqtArray;
    try {
      reqtArray = JSON.parse(await fs.readFile(reqtFilePath, 'utf8'));
    } catch (e) {
      console.error('Error reading or parsing .reqt.json:', e.message);
      process.exit(1);
    }
    const generateReadmeAIJson = (await import('./services/generateReadmeAIJson.js')).default;
    const aiJson = await generateReadmeAIJson(reqtArray);
    const outPath = path.resolve(process.cwd(), 'README_AI.reqt.json');
    await fs.writeFile(outPath, JSON.stringify(aiJson, null, 2), 'utf8');
    console.log(`README_AI.reqt.json generated at ${outPath}`);
    process.exit(0);
  },
};

// Command aliases map
const aliasMap = {
  '-a': 'add-item',
  '-aa': 'add-after',
  '-d': 'delete',
  '-mc': 'make-children',
  '-ms': 'make-sibling',
  '-et': 'edit-title',
  '--version': 'version',
  '-v': 'version',
  '--help': 'help',
  '-h': 'help',
  '-ss': 'set-status',
  '-te': 'test-exists',
  '-tp': 'test-passed',
  'out-md': 'out-md',
  'in-md': 'in-md',
  '-omd': 'out-md',
  '-imd': 'in-md',
  '-c': 'clean',
  '-grm': 'generate-readme',
  '-grmai': 'generate-readme_ai',
};

export default async function mainLoop() {
  const [, , command, ...args] = process.argv;
  const canonicalCommand = aliasMap[command] || command;
  const cmd = commandMap[canonicalCommand];
  try {
    if (cmd) {
      if (cmd.constructor.name === 'AsyncFunction') {
        await cmd(...args);
      } else {
        cmd(...args);
      }
    } else {
      help();
    }
  } catch (e) {
    if ((e.code && e.code === 'ENOENT') ||
        (typeof e.message === 'string' && /no \.reqt project/i.test(e.message))) {
      console.error('❌ No .reqt project found. Run `reqt init <project name>` to create one.');
      process.exit(2);
    } else {
      console.error('💥 Unexpected error:', e);
      process.exit(1);
    }
  }
}