import fhr from "@terzitech/flathier";
import { getData, setData } from '../services/dataHandler.js';
import { getItemTemplate } from '../services/itemTemplateService.js';

export default async function addAfterHandler(...args) {
    try {
        // Load the data using the new dataHandler
        const data = await getData();
        // Check if data is loaded
        if (!data || !Array.isArray(data) || data.length === 0) {
            console.error("❌ No project data loaded.\n Run 'npx reqt init <project name>'");
            process.exit(1);
        }
        // Require at least the outline_number
        if (args.length < 1) {
            console.error("Usage: reqtext add_after <outline_number> <item_name>");
            process.exit(1);
        }
        // Outline numbers may be strings (e.g., '2.1'), so treat as string
        const outlineNumber = args[0];
        if (!outlineNumber || typeof outlineNumber !== 'string') {
            console.error("❌ Invalid outline number. Must be a non-empty string.");
            process.exit(1);
        }
        let itemName = args.slice(1).join(" ");
        function stripAnsi(str) {
            return str.replace(/\x1B\[[0-9;]*[A-Za-z]/g, '');
        }
        if (!itemName) {
            // Custom TTY handler for item name input (only allows a-z, A-Z, 0-9)
            if (process.stdin.isTTY) process.stdin.setRawMode(true);
            process.stdin.resume();
            process.stdout.write('Enter item name: ');
            itemName = await new Promise(resolve => {
                let input = '';
                let ansiBuffer = '';
                function onData(chunk) {
                    const str = chunk.toString('utf8');
                    // Handle Enter (\r or \n)
                    if (str === '\r' || str === '\n') {
                        process.stdin.off('data', onData);
                        process.stdin.setRawMode(false);
                        process.stdout.write('\n');
                        resolve(input.length ? input : 'New Item');
                        return;
                    }
                    // Handle Backspace (\x7f)
                    if (str === '\x7f' || str === '\b') {
                        if (input.length > 0) {
                            input = input.slice(0, -1);
                            process.stdout.write('\b \b');
                        }
                        return;
                    }
                    // Buffer ANSI escape sequences and ignore them
                    if (str.startsWith('\x1B')) {
                        ansiBuffer += str;
                        // If buffer matches a full ANSI sequence, clear it
                        if (/^\x1B\[[0-9;]*[A-Za-z]$/.test(ansiBuffer)) {
                            ansiBuffer = '';
                        }
                        return;
                    } else if (ansiBuffer.length > 0) {
                        // If we get a non-escape char after starting an ANSI sequence, reset buffer
                        ansiBuffer = '';
                    }
                    // Only allow a-z, A-Z, 0-9
                    if (/^[a-zA-Z0-9]$/.test(str)) {
                        input += str;
                        process.stdout.write(str);
                    }
                }
                process.stdin.on('data', onData);
            });
        } else {
            itemName = stripAnsi(itemName);
        }
        // Build the new item from the template
        const template = await getItemTemplate();
        const reqt_ID = await fhr.generateUniqueId();
        const newItem = {
            ...template,
            reqt_ID,
            title: itemName
        };
        // Insert the new item after the specified outline number
        const updatedData = await fhr.addObject(data, outlineNumber, newItem);
        if (!updatedData) {
            // addObject prints its own warning if outline not found
            process.exit(1);
        }
        // Save the updated data using the new dataHandler
        await setData(updatedData);
        console.log(`✅ Added item '${itemName}' after outline #${outlineNumber}`);
    } catch (err) {
        if (err.message && err.message.includes('Template file not found')) {
            process.stdout.write('Template file not found. Please run: npx reqt init <project name>\n');
            process.exit(1);
        } else {
            throw err;
        }
    }
}
