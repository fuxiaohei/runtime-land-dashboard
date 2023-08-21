const fs = require('fs');
const path = require('path');

// get args and check it contains 'self-host'
const args = process.argv.slice(2);
let is_clerk_js = false;
if (args.length > 0 && args.includes('clerk-js')) {
    is_clerk_js = true;
}

const packageJsonPath = path.join(__dirname, 'package.json');
const jsFilePath = path.join(__dirname, 'src/config.js');
// const shortCommitHash = execSync('git rev-parse --short HEAD').toString().trim();
const currentDate = new Date().toISOString().replace(/T/, ' ').substr(0, 16);
// Read package.json
const packageJson = require(packageJsonPath);

// Update JavaScript content
let updatedContent = `export const version = '${packageJson.version}';`;
// updatedContent += `\nexport const commitHash = '${shortCommitHash}';`;
updatedContent += `\nexport const buildDate = '${currentDate} UTC';`;
if (is_clerk_js) {
    updatedContent += `\nexport const isClerkJs = true;`;
} else {
    updatedContent += `\nexport const isClerkJs = false;`;
}

// Write updated content back to the JavaScript file
fs.writeFile(jsFilePath, updatedContent, 'utf8', (writeErr) => {
    if (writeErr) {
        throw writeErr;
    } else {
        console.log(`VERSION: ${packageJson.version} ${currentDate} UTC`);
        console.log('CLERK_JS: ', is_clerk_js);
    }
});
