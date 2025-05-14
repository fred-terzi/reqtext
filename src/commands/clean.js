// Entry point for the 'clean' command
import cleanReqtFile from './cleanHandler.js';
import fs from 'fs';

export default async function cleanHandler(...args) {
  let filePath = args[0];
  if (!filePath) {
    // Try to read .reqt/config.reqt.json for the project file path
    try {
      const config = JSON.parse(fs.readFileSync('.reqt/config.reqt.json', 'utf8'));
      if (config && config.filepath) {
        filePath = config.filepath;
      } else {
        filePath = 'README_AI.reqt.json'; // fallback
      }
    } catch (e) {
      filePath = 'README_AI.reqt.json'; // fallback
    }
  }
  cleanReqtFile(filePath);
}
