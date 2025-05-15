#!/usr/bin/env node

import mainLoop from "../src/main.js";
import mdToReqt from '../src/commands/mdToReqtHandler.js';

const cmd = process.argv[2];

if (cmd === 'mdreqt') {
    mdToReqt();
    process.exit(0);
}

mainLoop();