import fhr from '@terzitech/flathier';

// Utility: Load data
async function loadReqtData() {
    const data = await fhr.loadData();
    if (!data) {
        process.stdout.write('No reqt file found.\nRun npx reqt init <project name>.\n');
        process.exit(1);
    }
    return data;
}

// Utility: Get console size
function getConsoleSize() {
    const width = process.stdout.columns || 80;
    const height = process.stdout.rows || 24;
    return { width, height };
}

// Utility: Render tree
async function renderTree(data, selectedIndex = 0) {
    process.stdout.write('\x1Bc'); // Clear console
    const { height } = getConsoleSize();
    const tree = await fhr.createAsciiTree(data, ['title', 'status']);
    let linesPrinted = 0;
    if (Array.isArray(tree)) {
        tree.forEach((line, idx) => {
            const { width } = getConsoleSize();
            const displayLine = line.slice(0, width);
            if (idx === selectedIndex) {
                process.stdout.write('\x1b[7m' + displayLine + '\x1b[0m');
            } else {
                process.stdout.write(displayLine);
            }
            linesPrinted++;
        });
    } else {
        const { width } = getConsoleSize();
        process.stdout.write(tree.slice(0, width));
        linesPrinted = 1;
    }
    // Fill blank lines if needed so menu is always at the bottom
    // Move cursor to last row and print menu (inverted)
    const menu = "↑↓: nav | r: reload | q: quit";
    process.stdout.write(`\x1b[${height};1H\x1b[7m${menu}\x1b[0m`);
}

// Utility: Handle keypress
const keyMap = {
    'q': async (state) => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\x1Bc'); // Clear console on exit
        process.stdout.write('\nExiting editor.\n');
        process.exit(0);
    },
    '\u0003': async (state) => { // Ctrl+C
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\x1Bc'); // Clear console on exit
        process.stdout.write('\nExiting editor.\n');
        process.exit(0);
    },
    'r': async (state) => {
        state.data = await loadReqtData();
        await renderTree(state.data, state.selectedIndex);
    },
    'up': async (state) => {
        state.selectedIndex = Math.max(0, state.selectedIndex - 1);
        await renderTree(state.data, state.selectedIndex);
    },
    'down': async (state) => {
        // Count lines in tree
        const tree = await fhr.createAsciiTree(state.data, ['title', 'status']);
        const maxIdx = Array.isArray(tree) ? tree.length - 1 : 0;
        state.selectedIndex = Math.min(maxIdx, state.selectedIndex + 1);
        await renderTree(state.data, state.selectedIndex);
    }
    // Add more key handlers here as needed
};

async function handleKeypress(key, state) {
    // Arrow key codes
    if (key === '\u001b[A') return await keyMap['up'](state); // Up arrow
    if (key === '\u001b[B') return await keyMap['down'](state); // Down arrow
    if (keyMap[key]) {
        await keyMap[key](state);
    } else {
        // Add more key handling here
        // For now, ignore other keys
    }
}

export default async function reqtEditor() {
    const state = { data: await loadReqtData(), selectedIndex: 0 };
    await renderTree(state.data, state.selectedIndex);

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', async (key) => {
        await handleKeypress(key, state);
    });
}