import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import getCustomExt from './getCustomExt.js'; // Helper to get customExt from customExtStore.json

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Reads the last object from the .fhr/template.fhr.json file.
 * @returns {Promise<Object|null>} The last object in the template, or null if it doesn't exist.
 */
export default async function getLastTemplateObject() {
    try {
        // get the custom extension
        const customExt = await getCustomExt();
        // Resolve the path to the template file
        const templatePath = path.resolve(process.cwd(), `.${customExt}/template.${customExt}.json`);

        // Check if the template file exists
        try {
            await fs.access(templatePath);
        } catch (err) {
            throw new Error(`Template file not found: ${templatePath}`);
        }

        // Read and parse the template file
        const fileContent = await fs.readFile(templatePath, 'utf-8');
        const templateData = JSON.parse(fileContent);

        // Return the last object if it exists
        return templateData[templateData.length - 1] || null;
    } catch (error) {
        throw error;
    }
}