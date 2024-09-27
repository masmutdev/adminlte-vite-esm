import { promises as fs } from 'fs'; // Use promises API for async file handling
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import JavaScriptObfuscator from 'javascript-obfuscator';

// Get the current directory of the script
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const inputDir = join(__dirname, '../dist'); // Assuming dist is one level up from src
const outputDir = join(__dirname, '../dist-obfuscated'); // Change output directory if needed

// Create output directory if it doesn't exist
await fs.mkdir(outputDir, { recursive: true });

// Function to obfuscate files
const obfuscateFiles = async (dir) => {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const fullPath = join(dir, file);
    const stat = await fs.stat(fullPath);

    if (stat.isDirectory()) {
      await obfuscateFiles(fullPath); // Recurse into subdirectories
    } else if (file.endsWith('.js')) {
      const code = await fs.readFile(fullPath, 'utf8');
      const obfuscatedCode = JavaScriptObfuscator.obfuscate(code, {
        compact: true,
        controlFlowFlattening: true,
      }).getObfuscatedCode();

      await fs.writeFile(join(outputDir, file), obfuscatedCode);
    }
  }
};

// Run the obfuscation
await obfuscateFiles(inputDir);
console.log('JavaScript files have been obfuscated.');
