/**
 * Utility to check if a <project name>.reqt.md file exists in the root directory.
 *
 * Uses the getCurrentReqtFilePath function to determine the project name,
 * then checks for the existence of a file with the .reqt.md extension
 * (instead of .reqt.json) in the root.
 */

import fs from "fs";
import path from "path";

/**
 * Checks if a <project name>.reqt.md file exists in the root directory.
 * @returns {string|null} The path to the Markdown file if it exists, otherwise null.
 */
export function getExistingMarkdownFile() {
  // Read config.reqt.json without import assertion
  const configPath = path.join(process.cwd(), ".reqt", "config.reqt.json");
  let projectName = "";
  try {
    const configRaw = fs.readFileSync(configPath, "utf-8");
    const config = JSON.parse(configRaw);
    projectName = config.projectTitle;
  } catch (e) {
    return null;
  }
  const mdFilePath = path.join(process.cwd(), `${projectName}.reqt.md`);
  return fs.existsSync(mdFilePath) ? mdFilePath : null;
}

