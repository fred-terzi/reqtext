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


let data = [];


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
};

export default async function mainLoop() {
  const [, , command, ...args] = process.argv;
  const canonicalCommand = aliasMap[command] || command;
  const cmd = commandMap[canonicalCommand];
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