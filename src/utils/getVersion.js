import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function getVersion() {
    const packageJsonPath = path.resolve(__dirname, '../../package.json');
    try {
        const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
        return packageJson.version || 'Version not found';
    } catch (error) {
        console.error('Error reading package.json:', error.message);
        return 'Error retrieving version';
    }
}

export default getVersion;