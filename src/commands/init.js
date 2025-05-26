/**
 * @param {...string} args - The project name and any additional arguments.
 * @returns {Promise<void>} Resolves when initialization is complete or aborted.
 */
import fs from 'fs/promises';
import enquirer from 'enquirer';
import path from 'path';
import fhr from "flathier";
import { fileURLToPath } from 'url';

const { prompt } = enquirer;

export default async function init(...args) {
    let promptFn = prompt;
    if (args.length && typeof args[args.length - 1] === 'function') {
        promptFn = args.pop();
    }
    if (args.length === 0) {
        console.log("Usage: npx reqt init <project name>");
        return;
    }
    const argString = args.join('_');
    const cwd = process.cwd();
    const reqtDir = path.join(cwd, '.reqt');
    const configPath = path.join(reqtDir, 'config.reqt.json');
    const templatePath = path.join(reqtDir, 'itemTemplate.reqt.json');
    // Use all arguments joined as the project title (preserve spaces)
    const projectTitle = args.join(' ');
    // Sanitize project file name: replace spaces with underscores
    const safeTitle = projectTitle.replace(/ /g, '_');
    const sotFileName = `${safeTitle}.reqt.json`;
    const sotPath = path.join(reqtDir, sotFileName);

    // Always resolve README_AI.reqt.json from the reqt package root
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const srcReadmeAI = path.join(__dirname, '../../README_AI.reqt.json');
    const destReadmeAI = path.join(reqtDir, 'README_AI.reqt.json');
    let shouldCopyReadmeAI = true;
    let promptOverwriteReadmeAI = false;
    let srcReadmeAIExists = false;
    let destReadmeAIExists = false;
    try {
        await fs.access(srcReadmeAI);
        srcReadmeAIExists = true;
        try {
            await fs.access(destReadmeAI);
            destReadmeAIExists = true;
        } catch {}
    } catch {
        srcReadmeAIExists = false;
    }
    if (srcReadmeAIExists && destReadmeAIExists) {
        const response = await promptFn({
            type: 'confirm',
            name: 'overwriteReadmeAI',
            message: 'README_AI.reqt.json already exists in .reqt. Overwrite?',
            initial: false
        });
        promptOverwriteReadmeAI = response.overwriteReadmeAI;
    } else if (srcReadmeAIExists) {
        promptOverwriteReadmeAI = true;
    }

    // Check for existing .reqt directory and prompt before overwriting anything inside
    let dirExists = false;
    try {
        await fs.access(reqtDir);
        dirExists = true;
    } catch {}
    if (dirExists) {
        const response = await promptFn({
            type: 'confirm',
            name: 'overwrite',
            message: '⚠️ .reqt directory already exists. Overwrite all reqt project files in this folder?',
            initial: false
        });
        if (!response.overwrite) {
            console.log('❌ Aborted. No changes made.');
            return;
        } else {
            await fs.rm(reqtDir, { recursive: true, force: true });
            await fs.mkdir(reqtDir);
            console.log('✅ Overwrote .reqt directory and all contents.');
        }
    } else {
        await fs.mkdir(reqtDir);
        console.log(`✅ Created .reqt directory in ${cwd}`);
    }

    // Write config.reqt.json
    const config = {
        projectTitle: projectTitle,
        sotPath: `./.reqt/${sotFileName}`,
        templatePath: './.reqt/itemTemplate.reqt.json'
    };
    await fs.writeFile(configPath, JSON.stringify(config, null, 2));
    console.log('✅ Created config.reqt.json');

    // Write itemTemplate.reqt.json (basic template)
    const itemTemplate = {
        reqt_ID: "reqt_ID",
        hier: 0,
        outline: "OUTLINE",
        title: "TITLE",
        details: "DETAILS",
        requirement: "REQUIREMENT",
        acceptance: "ACCEPTANCE",
        readme: "README",
        status: "NEW",
        readme_ai: "exclude",
        test_exists: false,
        test_passed: false
    };
    await fs.writeFile(templatePath, JSON.stringify(itemTemplate, null, 2));
    console.log('✅ Created itemTemplate.reqt.json');

    // Insert itemTemplate into the sot file for the project item
    const sotTemplate = {
        reqt_ID: await fhr.generateUniqueId(),
        hier: 0,
        outline: "0",
        title: safeTitle,
        details: "DETAILS",
        requirement: "REQUIREMENT",
        acceptance: "ACCEPTANCE",
        readme: "README",
        status: "NEW",
        readme_ai: "exclude",
        test_exists: false,
        test_passed: false
    };

    // Write ProjectSOT.reqt.json (array with project item)
    await fs.writeFile(sotPath, JSON.stringify([sotTemplate], null, 2));
    console.log(`✅ Created ${sotFileName}`);

    // After .reqt is created, always copy README_AI.reqt.json if it exists
    try {
        await fs.access(srcReadmeAI);
        await fs.copyFile(srcReadmeAI, destReadmeAI);
        console.log('✅ Copied README_AI.reqt.json to .reqt');
    } catch {}

    console.log('✅ ReqText project initialized successfully in .reqt');
}