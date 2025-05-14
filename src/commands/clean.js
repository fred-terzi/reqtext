// Entry point for the 'clean' command
import cleanReqtFile from './cleanHandler.js';

export default async function cleanHandler(...args) {
  // Default to README_AI.reqt.json if no file is specified
  const filePath = args[0] || 'README_AI.reqt.json';
  cleanReqtFile(filePath);
}
