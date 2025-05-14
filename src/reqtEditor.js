import fhr from '@terzitech/flathier';
import addAfterHandler from './commands/addAfterHandler.js';
import enquirerPkg from 'enquirer';
const { Input, Confirm } = enquirerPkg;

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

// Utility: Calculate window for scrolling
function calculateWindow(selectedIndex, totalItems, windowHeight) {
    if (totalItems <= windowHeight) {
        return { start: 0, end: totalItems };
    }
    let half = Math.floor(windowHeight / 2);
    let start = Math.max(0, selectedIndex - half);
    let end = start + windowHeight;
    if (end > totalItems) {
        end = totalItems;
        start = Math.max(0, end - windowHeight);
    }
    return { start, end };
}

// Utility: Render tree
// Implements diff-based rendering for minimal flicker
let lastRenderedLines = [];
async function renderTree(data, selectedIndex = 0, forceFullClear = false) {
    const { height, width } = getConsoleSize();
    process.stdout.write('\x1b[?25l'); // Hide cursor at start of render
    if (forceFullClear) {
        process.stdout.write('\x1b[3J\x1b[2J\x1b[H'); // Clear scrollback, screen, and move cursor to top-left
    }
    const tree = await fhr.createAsciiTree(data, ['title', 'status']);
    let lines = Array.isArray(tree) ? tree.map(line => line.slice(0, width)) : [tree.slice(0, width)];
    // Calculate window for scrolling
    const windowHeight = height - 1; // Reserve last line for menu
    const totalItems = lines.length;
    const { start, end } = calculateWindow(selectedIndex, totalItems, windowHeight);
    const visibleLines = lines.slice(start, end);
    // Highlight the selected item (relative to window)
    const relSelected = selectedIndex - start;
    for (let i = 0; i < visibleLines.length; i++) {
        if (i === relSelected) {
            visibleLines[i] = '\x1b[7m' + visibleLines[i] + '\x1b[0m';
        }
    }
    // Pad lines to fill the screen (except last line for menu)
    while (visibleLines.length < windowHeight) {
        visibleLines.push('');
    }
    // Prepare menu line
    let menu = "↑↓: nav | →: child | ←: sibling | k: up | j: down | a: add | d: delete | r: reload | q: quit";
    if (menu.length > width) menu = menu.slice(0, width);
    // Diff and update only changed lines
    for (let i = 0; i < visibleLines.length; i++) {
        const prev = lastRenderedLines[i] || '';
        const curr = visibleLines[i];
        if (forceFullClear || prev !== curr) {
            process.stdout.write(`\x1b[${i + 1};1H`); // Move to line
            process.stdout.write('\x1b[2K'); // Clear line
            process.stdout.write(curr);
        }
    }
    // Clear any extra lines from previous render
    for (let i = visibleLines.length; i < lastRenderedLines.length; i++) {
        process.stdout.write(`\x1b[${i + 1};1H`);
        process.stdout.write('\x1b[2K');
    }
    // Always update menu line
    process.stdout.write(`\x1b[${height};1H`);
    process.stdout.write('\x1b[2K');
    process.stdout.write(`\x1b[7m${menu}\x1b[0m`);
    // Move cursor to bottom right (after menu)
    process.stdout.write(`\x1b[${height};${width}H`);
    // Save last rendered lines
    lastRenderedLines = visibleLines.slice();
}

// Utility: Filter printable input and ignore ANSI escape codes
function filterPrintable(input) {
    // Ignore ANSI escape sequences (arrow keys, etc.)
    if (/^\u001b\[[A-D]$/.test(input)) return '';
    // Only allow printable ASCII characters
    if (/^[\x20-\x7E]$/.test(input)) return input;
    // Ignore everything else (control chars, etc.)
    return '';
}

// Utility: Handle keypress
const keyMap = {
    'q': async (state) => {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\x1b[?1049l'); // Exit alternate screen buffer
        process.stdout.write('\x1b[?25h'); // Show cursor
        process.stdout.write('\x1Bc'); // Clear console on exit
        process.stdout.write('\nExiting ReqText Editor.\n');
        process.exit(0);
    },
    '\u0003': async (state) => { // Ctrl+C
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\x1b[?1049l'); // Exit alternate screen buffer
        process.stdout.write('\x1b[?25h'); // Show cursor
        process.stdout.write('\x1Bc'); // Clear console on exit
        process.stdout.write('\nExiting ReqText Editor.\n');
        process.exit(0);
    },
    'r': async (state) => {
        state.data = await loadReqtData();
        await renderTree(state.data, state.selectedIndex, true);
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
            await renderTree(state.data, state.selectedIndex, true);
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
            await renderTree(state.data, state.selectedIndex, true);
        } else {
            process.stdout.write(`\n⚠️  Could not promote item with outline #${selectedItem.outline}. It may already be at the root or not exist.\n`);
            await renderTree(state.data, state.selectedIndex, true);
        }
    },
    'a': async (state) => {
        // Use the addAfterHandler to add after the currently selected outline
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        // Move cursor to line above menu and clear it
        const { height } = getConsoleSize();
        process.stdout.write(`\x1b[${height - 1};1H`);
        process.stdout.write('\x1b[2K');
        // Use enquirer for prompt
        const prompt = new Input({
            message: 'Enter new item title:',
            initial: ''
        });
        try {
            const title = (await prompt.run()).trim() || 'New Item';
            await addAfterHandler(selectedItem.outline, title);
            state.data = await loadReqtData();
            // Set selectedIndex to the new item's index (after the current)
            state.selectedIndex = Math.min(state.selectedIndex + 1, state.data.length - 1);
            await renderTree(state.data, state.selectedIndex, true);
        } catch (err) {
            // If prompt is cancelled, just re-render
            await renderTree(state.data, state.selectedIndex, true);
        }
    },
    'd': async (state) => {
        // Delete the currently selected item
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        // Move cursor to line above menu and clear it
        const { height } = getConsoleSize();
        process.stdout.write(`\x1b[${height - 1};1H`);
        process.stdout.write('\x1b[2K');
        // Use enquirer for confirmation
        const prompt = new Confirm({
            message: `Delete item: '${selectedItem.title}'?`,
            initial: false
        });
        try {
            const confirm = await prompt.run();
            if (confirm) {
                state.data.splice(state.selectedIndex, 1);
                await fhr.saveData(state.data);
                if (state.selectedIndex >= state.data.length) {
                    state.selectedIndex = Math.max(0, state.data.length - 1);
                }
            }
            await renderTree(state.data, state.selectedIndex, true);
        } catch (err) {
            // If prompt is cancelled, just re-render
            await renderTree(state.data, state.selectedIndex, true);
        }
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
            await renderTree(state.data, state.selectedIndex, true);
        } else {
            await renderTree(state.data, state.selectedIndex, true);
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
            await renderTree(state.data, state.selectedIndex, true);
        } else {
            await renderTree(state.data, state.selectedIndex, true);
        }
    },
    'e': async (state) => {
        // Edit the title of the currently selected item
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        // Move cursor to line above menu and clear it
        const { height } = getConsoleSize();
        process.stdout.write(`\x1b[${height - 1};1H`);
        process.stdout.write('\x1b[2K');
        const prompt = new Input({
            message: `Edit title for '${selectedItem.title}':`,
            initial: selectedItem.title
        });
        try {
            const newTitle = (await prompt.run()).trim();
            if (newTitle && newTitle !== selectedItem.title) {
                selectedItem.title = newTitle; // Directly update the title
                await fhr.saveData(state.data);
            }
            await renderTree(state.data, state.selectedIndex, true);
        } catch (err) {
            // If prompt is cancelled, just re-render
            await renderTree(state.data, state.selectedIndex, true);
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
    // Enter alternate screen buffer
    process.stdout.write('\x1b[?1049h');
    const state = { data: await loadReqtData(), selectedIndex: 0 };
    let firstRender = true;
    await renderTree(state.data, state.selectedIndex, firstRender);
    firstRender = false;

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // Handler function reference for removal/restoration
    let keyHandler = async (key) => {
        await handleKeypress(key, state);
    };

    process.stdin.on('data', keyHandler);

    // Patch enquirer prompts to temporarily remove the key handler
    const patchPrompt = (fn) => async (...args) => {
        process.stdin.removeListener('data', keyHandler);
        process.stdout.write('\x1b[?25h'); // Show cursor for prompt
        try {
            await fn(...args);
        } finally {
            process.stdout.write('\x1b[?25l'); // Hide cursor after prompt
            process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdin.on('data', keyHandler);
        }
    };

    // Patch the 'a' and 'd' handlers to use the patchPrompt wrapper
    keyMap['a'] = patchPrompt(keyMap['a']);
    keyMap['d'] = patchPrompt(keyMap['d']);
    keyMap['e'] = patchPrompt(keyMap['e']);
}