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
import reqtToMarkdown from './reqtParsers/reqtToMarkdown.mjs';
import markdownToReqt from './reqtParsers/markdownUpdateReqt.js';

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
  version: versionCommand,

  // Help command
  help: help,

  init: async (...args) => {
    await init(...args);
  },

  editor: async (...args) => {
    await reqtEditor(...args);
  },
  
  // Add item commands
  add_item: async (...args) => {
    await addItemHandler(...args);
  },

  // Add After commands
  add_after: async (...args) => {
    await addAfterHandler(...args);
  },

  // Delete commands
  delete: async (...args) => {
    await deleteHandler(...args);
  },

  // Make Children commands
  make_children: async (...args) => {
    await makeChildrenHandler(...args);
  },

  // Make Sibling commands
  make_sibling: async (...args) => {
    await makeSiblingHandler(...args);
  },

  // Edit Title command
  edit_title: async (...args) => {
    await editTitleHandler(...args);
  },

  // Clean command
  clean: async () => {
    await cleanHandler();
  },

  // Set Status command
  set_status: async (...args) => {
    await setStatusHandler(...args);
  },

  // Test Exists command
  test_exists: async (...args) => {
    await testExistsHandler(...args);
  },

  // Helper to check if a markdown file exists, given a file name or project context
  getExistingMarkdownFile: async (mdFileArg) => {
    const fs = await import('fs/promises');
    let fileToCheck = mdFileArg;
    if (!fileToCheck) {
      try {
        const reqtJsonPath = await import('./utils/getCurrentReqtFilePath.js').then(m => m.getCurrentReqtFilePath());
        const jsonText = await fs.readFile(reqtJsonPath, 'utf8');
        const reqts = JSON.parse(jsonText);
        const rootTitle = reqts[0]?.title || 'output';
        const safeTitle = rootTitle.replace(/[^a-zA-Z0-9-_]/g, '_');
        fileToCheck = `./${safeTitle}.reqt.md`;
      } catch (e) {
        // fallback: let reqtToMarkdown handle it
        return undefined;
      }
    }
    try {
      await fs.access(fileToCheck);
      return fileToCheck;
    } catch (e) {
      return undefined;
    }
  },

  // Out MD command
  // If a <project name>.reqt.md exists, prompt to overwrite
  // If not, create a new one
  out_md: async (...args) => {
    let outFile = args[0];
    const fileToCheck = await commandMap.getExistingMarkdownFile(outFile);
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
  in_md: async (...args) => {
    // Support: reqt in-md [--keep|-k] [mdFile]
    let keep = false;
    let mdFile = undefined;
    for (const arg of args) {
      if (arg === '--keep' || arg === '-k') keep = true;
      else if (arg.endsWith('.md')) mdFile = arg;
    }
    const fileToCheck = await commandMap.getExistingMarkdownFile(mdFile);
    if (!fileToCheck) {
      console.log('No reqt.md file was found to import.');
      return;
    }
    let shouldWrite = true;
    if (fileToCheck) {
      const { Confirm } = Enquirer;
      const prompt = new Confirm({
        name: 'overwrite',
        message: `Overwrite the source of truth reqt.json with the current changes in the markdown from '${fileToCheck}'?`,
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

};

// Command aliases map
const aliasMap = {
  '-a': 'add_item',
  '-aa': 'add_after',
  '-d': 'delete',
  '-mc': 'make_children',
  '-ms': 'make_sibling',
  '-et': 'edit_title',
  '--version': 'version',
  '-v': 'version',
  '--help': 'help',
  '-h': 'help',
  '-ss': 'set_status',
  '-te': 'test_exists',
  'out-md': 'out_md',
  'in-md': 'in_md',
  '-omd': 'out_md',
  '-imd': 'in_md',
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