// reqtToMDHandler.js
// Handler for converting .reqt JSON to Markdown as specified in project requirements.

import fs from 'fs';
import path from 'path';
import { getCurrentReqtFilePath } from '../utils/getCurrentReqtFilePath.js';

function reqtToMD() {
    // 1. Get reqt file path from utility
    const reqtFilePath = getCurrentReqtFilePath();
    // 2. Read the .reqt file
    const reqtData = JSON.parse(fs.readFileSync(reqtFilePath, 'utf-8'));
    const reqtName = path.basename(reqtFilePath, path.extname(reqtFilePath));
    const mdFilePath = path.join(path.dirname(reqtFilePath), `${reqtName}.md`);

    // 3. Build Markdown content
    let mdContent = '';
    for (const item of reqtData) {
        // Markdown comment with reqt_id
        mdContent += `<!-- reqt_id: ${item.reqt_ID} -->\n`;
        // Header level logic per requirements
        let header = '';
        if ((item.hier === 0 || item.hier === '0') && (item.outline === 0 || item.outline === '0')) {
            header = '#'; // Project root
        } else if (item.hier === 0 || item.hier === '0') {
            header = '##'; // Other hier=0
        } else {
            header = '###'; // All other hier levels
        }
        // Outline number and title
        mdContent += `${header} ${item.outline}: ${item.title}\n`;
        // Status bolded
        if (item.status) mdContent += `**Status:** ${item.status}\n\n`;
        // Description
        if (item.description) mdContent += `${item.description}\n`;
        mdContent += '\n';
    }
    // 4. Write to .md file
    fs.writeFileSync(mdFilePath, mdContent, 'utf-8');
    console.log(`Markdown file created: ${mdFilePath}`);
}

export default reqtToMD;
