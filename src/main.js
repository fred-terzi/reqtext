import readline from 'readline';
import process from 'process';

readline.emitKeypressEvents(process.stdin);
if (process.stdin.isTTY) {
  process.stdin.setRawMode(true);
}

export default async function mainLoop() {
  console.log('Press any key. Press Ctrl+C or q to exit.');

  const keyMap = {
    'q': () => {
      console.log('Exiting...');
      process.exit();
    },
    // Add more key handlers here, e.g.:
    'a': () => { console.log('You pressed A!'); },
  };

  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit();
    }
    if (keyMap[key.name]) {
      keyMap[key.name]();
    } else {
      console.log(`You pressed: ${str}`);
    }
  });
}