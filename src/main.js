import readline from 'node:readline';
import help from './commands/help.js';
import getVersion from './utils/getVersion.js';
import addItemHandler from './commands/addItemHandler.js';
import addAfterHandler from './commands/addAfter.Handler.js';
import init from './commands/init.js';
import deleteHandler from './commands/deleteHandler.js';
import makeChildrenHandler from './commands/makeChildrenHandler.js';
import makeSiblingHandler from './commands/makeSiblingHandler.js';

import fhr from '@terzitech/flathier';

let data = [];

async function promptUser(question) {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

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
  '--version': versionCommand,
  '-v': versionCommand,

  // Help command
  help: help,
  '--help': help,
  '-h': help,

  init: async (...args) => {
  await init(...args);
  },
  
  // Add item commands
  add_item: async (...args) => {
    await addItemHandler(...args);
  },
  '-a': async (...args) => {
    await addItemHandler(...args);
  },

  // Add After commands
  add_after: async (...args) => {
    await addAfterHandler(...args);
  },
  '-aa': async (...args) => {
    await addAfterHandler(...args);
  },

  // Delete commands
  delete: async (...args) => {
    await deleteHandler(...args);
  },
  '-d': async (...args) => {
    await deleteHandler(...args);
  },

  // Make Children commands
  make_children: async (...args) => {
    await makeChildrenHandler(...args);
  },
  '-mc': async (...args) => {
    await makeChildrenHandler(...args);
  },

  // Make Sibling commands
  make_sibling: async (...args) => {
    await makeSiblingHandler(...args);
  },
  '-ms': async (...args) => {
    await makeSiblingHandler(...args);
  },

};

export default async function mainLoop() {
  const [, , command, ...args] = process.argv;
  const cmd = commandMap[command];
  if (cmd) {
    if (cmd.constructor.name === 'AsyncFunction') {
      await cmd(...args);
    } else {
      cmd(...args);
    }
  } else {
    help();
  }
}