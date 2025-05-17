import fhr from "@terzitech/flathier";
import { getData, setData } from '../services/dataHandler.js';
import { getItemTemplate } from '../services/itemTemplateService.js';

export default async function addItemHandler (...args) {
    try {
        // Load the data using the new dataHandler
        const data = await getData();
        if (!data || !Array.isArray(data) || data.length === 0) {
            process.stdout.write("❌ No project data loaded.\nRun 'npx reqt init <project name>'\n");
            process.exit(1);
        }
        // Join all arguments into a single string
        let argString = args.join(" ");
        if (argString === "") {
            process.stdout.write("No arguments provided. Using default 'new item'.\n");
            argString = "New Item";
        }
        // Get the item template
        const template = await getItemTemplate();
        // Generate a unique ID using flathier
        const reqt_ID = await fhr.generateUniqueId();
        // Create a new item from the template, with a unique ID and the provided title
        const newItem = {
            ...template,
            reqt_ID,
            title: argString
        };
        // Use fhr.addObject to insert the new item
        const lastItemOutline = data[data.length - 1]?.outline || '1';
        const updatedData = await fhr.addObject(data, lastItemOutline, newItem);
        await setData(updatedData);
        process.stdout.write(`✅ Added item: ${argString}\n`);
    } catch (err) {
        if (err.message && err.message.includes('Template file not found')) {
            process.stdout.write('Template file not found. Please run: npx reqt init <project name>\n');
            process.exit(1);
        } else {
            throw err;
        }
    }
}