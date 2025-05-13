// Core functions
import init from '../src/commands/init.js';
import addObject from '../src/core/addObject.js';
import deleteObject from '../src/core/deleteObject.js';
import demote from '../src/core/demote.js';
import promote from '../src/core/promote.js';
import moveDown from '../src/core/moveDown.js';
import moveUp from '../src/core/moveUp.js';
import createAsciiTree from '../src/core/asciiTree.js';

// Data handling functions
import { loadData, saveData, setData  } from '../src/dataHandler.js';

// Utility functions
import getLastItemOutline from '../src/utils/getLastItemOutline.js';
import getLastTemplateObject from '../src/utils/getItemTemplate.js';

const flathier = {
  init,
  loadData,
  saveData,
  addObject,
  getLastItemOutline,
  getLastTemplateObject,
  deleteObject,
  demote,
  promote,
  moveDown,
  moveUp,
  createAsciiTree,
  setData
};

export default flathier;

