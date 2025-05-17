import fs from 'fs/promises';
import path from 'path';

// Helper to get the item template path from config
async function getTemplatePath() {
    const configPath = path.resolve(process.cwd(), '.reqt', 'config.reqt.json');
    const config = JSON.parse(await fs.readFile(configPath, 'utf8'));
    return path.resolve(process.cwd(), config.templatePath);
}

// Get the item template from the JSON file
export async function getItemTemplate() {
    const templatePath = await getTemplatePath();
    const template = JSON.parse(await fs.readFile(templatePath, 'utf8'));
    return template;
}
