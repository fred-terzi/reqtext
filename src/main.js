import readline from 'node:readline';
import help from './commands/help.js';

function promptUser(question) {
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


function versionCommand() {
  console.log('reqtext version 1.0.0');
}

const commandMap = {
  version: versionCommand,
  '--version': versionCommand,
  '-v': versionCommand,
  help: help
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
    console.log('Usage: reqtext <command>');
    console.log('Commands:');
    console.log('  hello     Greet the user (prompts for name)');
    console.log('  version   Show version');
  }
}