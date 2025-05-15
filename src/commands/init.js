import fhr from '@terzitech/flathier';
import fs from 'fs';
import enquirer from 'enquirer';
const { prompt } = enquirer;

export default async function init(...args) {
    // If no arguments are provided, show a a usage message
    if (args.length === 0) {
        console.log("Usage: npx reqt init <project name>");
        return;
    }
    // Join all arguments into a single string
    const argString = args.join('_');
    // Check for existing .reqt.json files in the current directory
    const cwd = process.cwd();
    const files = fs.readdirSync(cwd);
    const reqtFiles = files.filter(f => f.endsWith('.reqt.json'));
    let shouldContinue = true;
    if (reqtFiles.length > 0) {
        // Warn if any .reqt.json file exists, not just the target name
        const message = reqtFiles.length === 1
            ? `A ReqText project file ('${reqtFiles[0]}') already exists. Do you want to create and switch to '${argString}.reqt.json'?`
            : `ReqText project files (${reqtFiles.join(', ')}) already exist. Do you want to create and switch to '${argString}.reqt.json'?`;
        const response = await prompt({
            type: 'confirm',
            name: 'switch',
            message,
            initial: false
        });
        shouldContinue = response.switch;
        if (!shouldContinue) {
            console.log('Aborted. No changes made.');
            return;
        }
    }
    // use fhr.init with the argString
    try {
        await fhr.init(argString, 'reqt', 'reqt');
    }
    catch (error) {
        console.error('Initialization failed:', error);
    }
}