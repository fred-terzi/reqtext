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

  // // Out MD command
  // 'out-md': async (...args) => {
  //   const fileToCheck = await getExistingMarkdownFile();
  //   let shouldWrite = true;
  //   if (fileToCheck) {
  //     const { Confirm } = Enquirer;
  //     const prompt = new Confirm({
  //       name: 'overwrite',
  //       message: `The markdown file '${fileToCheck}' already exists. Overwrite?`,
  //       initial: false
  //     });
  //     shouldWrite = await prompt.run();
  //     if (!shouldWrite) {
  //       console.log('Aborted: Markdown file was not overwritten.');
  //       return;
  //     }
  //   }
  //   await reqtToMarkdown(args[0]);
  // },

  // // In MD command
  // 'in-md': async (...args) => {
  //   // Support: reqt in-md [--keep|-k] [mdFile]
  //   let keep = false;
  //   let mdFile = undefined;
  //   for (const arg of args) {
  //     if (arg === '--keep' || arg === '-k') keep = true;
  //     else if (arg.endsWith('.md')) mdFile = arg;
  //   }
  //   const fileToCheck = await getExistingMarkdownFile();
  //   if (!fileToCheck) {
  //     console.log('No reqt.md file was found to import.');
  //     return;
  //   }
  //   let shouldWrite = true;
  //   if (fileToCheck) {
  //     const { Confirm } = Enquirer;
  //     const prompt = new Confirm({
  //       name: 'overwrite',
  //       message: `Check in changes to the SoT? Any conflicts will be overwritten. \n Use 'reqt diff' to check for diffs.`,
  //       initial: false
  //     });
  //     shouldWrite = await prompt.run();
  //     if (!shouldWrite) {
  //       console.log('Aborted: reqt.json was not updated.');
  //       return;
  //     }
  //   }
  //   await markdownToReqt(mdFile, keep);
  // },

  // // diff command
  // 'diff': async (...args) => {
  //   // Import the diff checker
  //   const { checkReqtMdDiff } = await import('./services/reqtmdDiff.js');
  //   // Use getData from dataHandler.js for SoT
  //   const { getData } = await import('./services/dataHandler.js');
  //   let data = await getData();
  //   // Optionally accept a markdown file path as an argument
  //   let mdPath = args.find(arg => arg.endsWith('.md'));
  //   await checkReqtMdDiff({ data, mdPath });
  // },

  // Generate README command
  'generate-readme': async () => {
    const { getData } = await import('./services/dataHandler.js');
    const { generateReadmeMarkdown } = await import('./services/generateReadmeMarkdown.js');
    const getReadmeItems = (await import('./services/getReadmeItems.js')).default;
    const fs = (await import('fs/promises')).default;
    const path = (await import('path')).default;
    let projectTitle = 'ReqText';
    let meta = '';
    try {
      let items = await getData();
      // Exclude items where readme is 'exclude' (case-insensitive, trimmed)
      items = items.filter(item => !(typeof item.readme === 'string' && item.readme.trim().toLowerCase() === 'exclude'));
      if (items[0] && items[0].title) projectTitle = items[0].title;
      // Optionally, add meta info (date, version, repo link)
      let version = '';
      try {
        const vmod = await import('./utils/getVersion.js');
        version = typeof vmod.default === 'function' ? await vmod.default() : (vmod.getVersion ? await vmod.getVersion() : '');
      } catch {}
      meta = `README.md generated by ReqText v${version || 'unknown'} on ${new Date().toISOString()}\n\n[ReqText GitHub Issues for Support](https://github.com/fred-terzi/reqtext/issues)`;
      const md = generateReadmeMarkdown(items, { projectTitle, meta });
      const outPath = path.resolve('README.md');
      await fs.writeFile(outPath, md, 'utf8');
      console.log(`README.md generated successfully.`);
    } catch (err) {
      console.error('Error generating README.md:', err.message);
      process.exit(1);
    }
  }
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
  '-c': 'clean',
  '-grm': 'generate-readme'
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