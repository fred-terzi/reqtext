#!/usr/bin/env node

import mainLoop from "../src/main.js";
import mdToReqt from '../src/commands/mdToReqtHandler.js';

const cmd = process.argv[2];

if (cmd === 'mdreqt') {
    (async () => {
        await mdToReqt();
        process.exit(0);
    })();
    // Do not call mainLoop or print help menu
} else {
    mainLoop();
}