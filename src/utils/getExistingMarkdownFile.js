// Utility to check if a markdown file exists, given a file name or project context
export default async function getExistingMarkdownFile(mdFileArg) {
  const fs = await import('fs/promises');
  let fileToCheck = mdFileArg;
  if (!fileToCheck) {
    try {
      const reqtJsonPath = await import('../utils/getCurrentReqtFilePath.js').then(m => m.getCurrentReqtFilePath());
      const jsonText = await fs.readFile(reqtJsonPath, 'utf8');
      const reqts = JSON.parse(jsonText);
      const rootTitle = reqts[0]?.title || 'output';
      const safeTitle = rootTitle.replace(/[^a-zA-Z0-9-_]/g, '_');
      fileToCheck = `./${safeTitle}.reqt.md`;
    } catch (e) {
      // fallback: let reqtToMarkdown handle it
      return undefined;
    }
  }
  try {
    await fs.access(fileToCheck);
    return fileToCheck;
  } catch (e) {
    return undefined;
  }
}
