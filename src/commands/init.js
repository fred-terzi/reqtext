/**
 * Initializes a new ReqText project.
 *
 * This function implements the logic described in the Mermaid flowchart:
 *
 *   1. User runs: npx reqt init <project name>
 *   2. Checks if arguments are provided. If not, shows usage and exits. (A -> B -> C)
 *   3. Joins arguments into a project name string. (B -> D)
 *   4. Checks for existing .reqt.json files in the current directory. (D -> E)
 *   5. If files exist, prompts the user to confirm creating/switching to a new file. (E -> F)
 *      - If declined, aborts. (F -> G)
 *      - If confirmed, continues. (F -> H)
 *   6. If no files exist, continues. (E -> H)
 *   7. Calls fhr.init with the project name and type 'reqt'. (H -> I)
 *   8. Handles success or error. (I -> J/K)
 *
 * This ensures only one .reqt.json file per folder and provides user interaction for safe project initialization.
 *
 * @param {...string} args - The project name and any additional arguments.
 * @returns {Promise<void>} Resolves when initialization is complete or aborted.
 */
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
        await fhr.init(argString, 'reqt');
        // 

    }
    catch (error) {
        console.error('Initialization failed:', error);
    }
}