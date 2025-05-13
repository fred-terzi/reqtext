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

// Utility: Render tree
async function renderTree(data) {
    process.stdout.write('\x1Bc'); // Clear console
    const tree = await fhr.createAsciiTree(data, ['title']);
    if (Array.isArray(tree)) {
        tree.forEach(line => process.stdout.write(line));
    } else {
        process.stdout.write(tree);
    }
    process.stdout.write('\n[Press q to quit, r to reload]\n');
}

// Utility: Handle keypress
const keyMap = {
    'q': async (state) => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\nExiting editor.\n');
        process.exit(0);
    },
    '\u0003': async (state) => { // Ctrl+C
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\nExiting editor.\n');
        process.exit(0);
    },
    'r': async (state) => {
        state.data = await loadReqtData();
        await renderTree(state.data);
    }
    // Add more key handlers here as needed
};

async function handleKeypress(key, state) {
    if (keyMap[key]) {
        await keyMap[key](state);
    } else {
        // Add more key handling here
        // For now, ignore other keys
    }
}

export default async function reqtEditor() {
    const state = { data: await loadReqtData() };
    await renderTree(state.data);

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', async (key) => {
        await handleKeypress(key, state);
    });
}