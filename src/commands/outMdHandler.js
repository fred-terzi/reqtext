import { fileURLToPath } from 'url';
import path from 'path';
import reqtToMarkdown from '../reqtParsers/reqtToMarkdown.mjs';

// Use provided arg as input file, else let reqtToMarkdown handle default
let inputFile = process.argv[2];
await reqtToMarkdown(inputFile);
