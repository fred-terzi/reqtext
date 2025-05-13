import fhr from '@terzitech/flathier';
import addAfterHandler from './commands/addAfterHandler.js';

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
    let menu = "↑↓: nav | →: child | ←: sibling | k: up | j: down | a: add | d: delete | r: reload | q: quit";
    const { width } = getConsoleSize();
    if (menu.length > width) {
        menu = menu.slice(0, width);
    }
    process.stdout.write(`\x1b[${height};1H\x1b[7m${menu}\x1b[0m`);
}

// Utility: Handle keypress
const keyMap = {
    'q': async (state) => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\x1Bc'); // Clear console on exit
        process.stdout.write('\nExiting ReqText Editor.\n');
        process.exit(0);
    },
    '\u0003': async (state) => { // Ctrl+C
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\x1Bc'); // Clear console on exit
        process.stdout.write('\nExiting ReqText Editor.\n');
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
    },
    '\u001b[C': async (state) => { // Right arrow key
        // Make the currently selected item a child of the one above it using flathier.demote
        if (state.selectedIndex <= 0) return; // Can't demote the first item
        const selectedItem = state.data[state.selectedIndex];
        const aboveItem = state.data[state.selectedIndex - 1];
        if (!selectedItem || !aboveItem) return;
        // Use flathier.demote
        const updatedData = await fhr.demote(state.data, selectedItem.outline);
        if (updatedData) {
            state.data = updatedData;
            await fhr.setData(updatedData); // Save the updated data array
            await fhr.saveData(updatedData); // Save the updated data array
            await renderTree(state.data, state.selectedIndex);
        }
    },
    '\u001b[D': async (state) => { // Left arrow key
        // Make the currently selected item a sibling (promote) using flathier.promote
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        const updatedData = await fhr.promote(state.data, selectedItem.outline);
        if (updatedData && updatedData !== state.data) {
            state.data = updatedData;
            await fhr.setData(updatedData);
            await fhr.saveData(updatedData);
            // After promotion, keep the same index if possible
            await renderTree(state.data, state.selectedIndex);
        } else {
            process.stdout.write(`\n⚠️  Could not promote item with outline #${selectedItem.outline}. It may already be at the root or not exist.\n`);
            await renderTree(state.data, state.selectedIndex);
        }
    },
    'a': async (state) => {
        // Use the addAfterHandler to add after the currently selected outline
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        // Prompt for a new title (simple, synchronous prompt)
        process.stdout.write('\nEnter new item title: ');
        process.stdin.setRawMode(false);
        process.stdin.once('data', async (input) => {
            const title = input.toString().trim() || 'New Item';
            process.stdin.setRawMode(true);
            await addAfterHandler(selectedItem.outline, title);
            state.data = await loadReqtData();
            await renderTree(state.data, state.selectedIndex + 1);
        });
    },
    'd': async (state) => {
        // Delete the currently selected item
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        // Confirm deletion (optional, can be removed for instant delete)
        process.stdout.write(`\nDelete item: '${selectedItem.title}'? (y/n): `);
        process.stdin.setRawMode(false);
        process.stdin.once('data', async (input) => {
            const confirm = input.toString().trim().toLowerCase();
            process.stdin.setRawMode(true);
            if (confirm === 'y') {
                // Remove the item from data
                state.data.splice(state.selectedIndex, 1);
                // Save updated data
                await fhr.saveData(state.data);
                // Adjust selection: only decrement if out of bounds
                if (state.selectedIndex >= state.data.length) {
                    state.selectedIndex = Math.max(0, state.data.length - 1);
                }
                await renderTree(state.data, state.selectedIndex);
            } else {
                await renderTree(state.data, state.selectedIndex);
            }
        });
    },
    'k': async (state) => {
        // Move the currently selected item up using flathier.moveUp
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        const updatedData = await fhr.moveUp(state.data, selectedItem.outline);
        if (updatedData && updatedData !== state.data) {
            state.data = updatedData;
            await fhr.setData(updatedData);
            await fhr.saveData(updatedData);
            // Move selection up if possible
            state.selectedIndex = Math.max(0, state.selectedIndex - 1);
            await renderTree(state.data, state.selectedIndex);
        } else {
            await renderTree(state.data, state.selectedIndex);
        }
    },
    'j': async (state) => {
        // Move the currently selected item down using flathier.moveDown
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        const updatedData = await fhr.moveDown(state.data, selectedItem.outline);
        if (updatedData && updatedData !== state.data) {
            state.data = updatedData;
            await fhr.setData(updatedData);
            await fhr.saveData(updatedData);
            // Move selection down if possible
            state.selectedIndex = Math.min(state.data.length - 1, state.selectedIndex + 1);
            await renderTree(state.data, state.selectedIndex);
        } else {
            await renderTree(state.data, state.selectedIndex);
        }
    }
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