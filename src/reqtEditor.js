import fhr from '@terzitech/flathier';
import addAfterHandler from './commands/addAfterHandler.js';
import enquirerPkg from 'enquirer';
import { getData, setData } from './services/dataHandler.js';
import editTitleHandler from './commands/editTitleHandler.js';
import deleteHandler from './commands/deleteHandler.js';
import makeChildrenHandler from './commands/makeChildrenHandler.js';
import makeSiblingHandler from './commands/makeSiblingHandler.js';
const { Input, Confirm } = enquirerPkg;

// Utility: Load data
async function loadReqtData() {
    try {
        const data = await getData();
        return data;
    } catch (err) {
        if (err.message === 'NO_CONFIG_REQT' || err.message === 'NO_SOT_FILE') {
            // Just throw a special error, don't print or exit here
            err.friendly = true;
            throw err;
        } else {
            throw err;
        }
    }
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
        process.stdout.write('\x1b[2J\x1b[H'); // Only clear visible screen, not scrollback
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
    let menu = "↑↓: nav | a: add | e: quick edit | →: Demote | ←: Promote | k: item up | j: item down | d: delete | r: reload | q: quit";
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
        console.log('Exiting ReqText Editor'); // Print message in main buffer with extra newlines
        process.exit(0);
    },
    '\u0003': async (state) => { // Ctrl+C
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\x1b[?1049l'); // Exit alternate screen buffer
        process.stdout.write('\x1b[?25h'); // Show cursor
        console.log('Exiting ReqText Editor'); // Print message in main buffer with extra newlines
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
        // Demote (make child)
        if (state.selectedIndex <= 0) return;
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        await makeChildrenHandler(selectedItem.outline);
        state.data = await loadReqtData();
        await renderTree(state.data, state.selectedIndex, true);
    },
    '\u001b[D': async (state) => { // Left arrow key
        // Promote (make sibling)
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        await makeSiblingHandler(selectedItem.outline);
        state.data = await loadReqtData();
        // After promotion, move selection to the promoted item by reqt_ID
        const newIdx = state.data.findIndex(item => item.reqt_ID === selectedItem.reqt_ID);
        if (newIdx !== -1) {
            state.selectedIndex = newIdx;
        }
        await renderTree(state.data, state.selectedIndex, true);
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
        const { height } = getConsoleSize();
        process.stdout.write(`\x1b[${height - 1};1H`);
        process.stdout.write('\x1b[2K');
        const prompt = new Confirm({
            message: `Delete item: '${selectedItem.title}'?`,
            initial: false
        });
        try {
            const confirm = await prompt.run();
            if (confirm) {
                await deleteHandler(selectedItem.outline);
                state.data = await loadReqtData();
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
        // Move up (demote sibling logic not implemented in CLI, fallback to flathier for now)
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        const updatedData = await fhr.moveUp(state.data, selectedItem.outline);
        if (updatedData && updatedData !== state.data) {
            await setData(updatedData);
            state.data = await loadReqtData();
            state.selectedIndex = Math.max(0, state.selectedIndex - 1);
            await renderTree(state.data, state.selectedIndex, true);
        } else {
            await renderTree(state.data, state.selectedIndex, true);
        }
    },
    'j': async (state) => {
        // Move down (demote sibling logic not implemented in CLI, fallback to flathier for now)
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        const updatedData = await fhr.moveDown(state.data, selectedItem.outline);
        if (updatedData && updatedData !== state.data) {
            await setData(updatedData);
            state.data = await loadReqtData();
            state.selectedIndex = Math.min(state.data.length - 1, state.selectedIndex + 1);
            await renderTree(state.data, state.selectedIndex, true);
        } else {
            await renderTree(state.data, state.selectedIndex, true);
        }
    },
    'e': async (state) => {
        // Item Editor: edit only title, status, test_exists, test_passed for the selected item
        const selectedItem = state.data[state.selectedIndex];
        if (!selectedItem) return;
        const editableFields = [
            { key: 'title', label: 'Title', type: 'input' },
            { key: 'status', label: 'Status', type: 'input' },
            { key: 'test_exists', label: 'Test Exists (true/false)', type: 'boolean' },
            { key: 'test_passed', label: 'Test Passed (true/false)', type: 'boolean' }
        ];
        let quit = false;
        let fieldIdx = 0;
        const { height, width } = getConsoleSize();
        // Helper to render the item editor menu
        function renderItemEditorMenu() {
            process.stdout.write(`\x1b[${height};1H`);
            process.stdout.write('\x1b[2K');
            let menu = '[return: save] [esc: skip] [q: quit]';
            if (menu.length > width) menu = menu.slice(0, width);
            process.stdout.write(`\x1b[7m${menu}\x1b[0m`);
            process.stdout.write('\n'); // Newline after menu options
            process.stdout.write('\n'); // Newline before the message
            let msg = 'To edit requirement, acceptance, or details: use the markdown edit workflow.';
            if (msg.length > width) msg = msg.slice(0, width);
            process.stdout.write(msg);
            process.stdout.write('\n');
        }
        // Helper to prompt for a field
        async function promptField(field) {
            // Clear the screen before each prompt
            process.stdout.write('\x1b[2J\x1b[H');
            renderItemEditorMenu();
            let value = selectedItem[field.key];
            if (field.type === 'boolean') {
                value = value === true ? 'true' : value === false ? 'false' : '';
            }
            const prompt = new Input({
                message: `Edit ${field.label}:`,
                initial: value !== undefined && value !== null ? String(value) : ''
            });
            // Patch key handling for esc/q
            let skip = false;
            let quitEditor = false;
            prompt.on('keypress', (char, key) => {
                if (key && key.name === 'escape') {
                    skip = true;
                    prompt.cancel();
                } else if (key && key.name === 'q') {
                    quitEditor = true;
                    prompt.cancel();
                }
            });
            try {
                const result = await prompt.run();
                if (quitEditor) {
                    quit = true;
                    return null;
                }
                if (skip) return null;
                if (field.type === 'boolean') {
                    if (result.trim().toLowerCase() === 'true') return true;
                    if (result.trim().toLowerCase() === 'false') return false;
                    return null;
                }
                return result;
            } catch {
                if (quitEditor) quit = true;
                return null;
            }
        }
        // Edit fields in sequence
        while (fieldIdx < editableFields.length && !quit) {
            const field = editableFields[fieldIdx];
            const newValue = await promptField(field);
            if (quit) break;
            if (newValue !== null && newValue !== undefined && newValue !== selectedItem[field.key]) {
                selectedItem[field.key] = newValue;
                await setData(state.data);
            }
            fieldIdx++;
        }
        // Restore main menu and re-render tree
        await renderTree(state.data, state.selectedIndex, true);
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
    // Enter alternate screen buffer FIRST
    process.stdout.write('\x1b[?1049h');

    // --- Clean up resize handler and restore terminal on exit ---
    // Define cleanup BEFORE any try/catch that might use it
    let resizeTimeout = null;
    const resizeHandler = () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderTree(state?.data, state?.selectedIndex, true);
        }, 50);
    };
    const cleanup = () => {
        process.stdout.write('\x1b[?1049l'); // Exit alternate screen buffer
        process.stdout.write('\x1b[?25h');   // Show cursor
        process.stdout.off('resize', resizeHandler);
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\n'); // Ensure prompt is on a new line
    };
    process.on('exit', cleanup);
    process.on('SIGINT', () => { cleanup(); process.exit(0); });
    process.on('SIGTERM', () => { cleanup(); process.exit(0); });

    let state;
    try {
        state = { data: await loadReqtData(), selectedIndex: 0 };
    } catch (err) {
        process.stdin.setRawMode(false);
        process.stdin.pause();
        process.stdout.write('\x1b[?1049l'); // Exit alternate screen buffer
        process.stdout.write('\x1b[?25h'); // Show cursor
        console.log('⚠️  No ReqText project found. Usage: npx reqt init <project name>'); // Print message in main buffer with extra newlines
        process.exit(0);
        
    }
    let firstRender = true;
    await renderTree(state.data, state.selectedIndex, firstRender);
    firstRender = false;

    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    // --- Clean up resize handler and restore terminal on exit ---
    // (Moved cleanup definition above for use in error path)
    // const cleanup = () => {
    //     process.stdout.write('\x1b[?1049l'); // Exit alternate screen buffer
    //     process.stdout.write('\x1b[?25h');   // Show cursor
    //     process.stdout.off('resize', resizeHandler);
    //     process.stdin.setRawMode(false);
    //     process.stdin.pause();
    // };

    // Handler function reference for removal/restoration
    let keyHandler = async (key) => {
        await handleKeypress(key, state);
    };

    process.stdin.on('data', keyHandler);

    // --- Add resize handler ---
    // Debounce to avoid excessive rerenders
    // let resizeTimeout = null;
    // const resizeHandler = () => {
    //     if (resizeTimeout) clearTimeout(resizeTimeout);
    //     resizeTimeout = setTimeout(() => {
    //         renderTree(state.data, state.selectedIndex, true);
    //     }, 50);
    // };
    // process.stdout.on('resize', resizeHandler);

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

    // --- Ensure cleanup is called before any process.exit() in keyMap ---
    // Patch keyMap quit/exit handlers to call cleanup first
    const originalQ = keyMap['q'];
    keyMap['q'] = async (state) => { cleanup(); await originalQ(state); };
    const originalCtrlC = keyMap['\u0003'];
    keyMap['\u0003'] = async (state) => { cleanup(); await originalCtrlC(state); };
}