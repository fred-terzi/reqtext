import readline from 'node:readline';

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

async function helloCommand() {
  const name = await promptUser('What is your name? ');
  console.log(`Hello, ${name}!`);
}

function versionCommand() {
  console.log('reqtext version 1.0.0');
}

export default async function mainLoop() {
  const [, , command, ...args] = process.argv;
  switch (command) {
    case 'hello':
      await helloCommand();
      break;
    case 'version':
      versionCommand();
      break;
    default:
      console.log('Usage: reqtext <command>');
      console.log('Commands:');
      console.log('  hello     Greet the user (prompts for name)');
      console.log('  version   Show version');
      break;
  }
}