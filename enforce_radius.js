const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Enforce Border Radius (ignoring rounded-full which is used for circles/avatars)
  // We'll replace rounded-sm, rounded-md, rounded-xl, rounded-2xl, rounded-3xl with rounded-lg
  // to ensure a single consistent border radius for all cards, buttons, and inputs.
  content = content.replace(/rounded-sm/g, 'rounded-lg');
  content = content.replace(/rounded-md/g, 'rounded-lg');
  content = content.replace(/rounded-xl/g, 'rounded-lg');
  content = content.replace(/rounded-2xl/g, 'rounded-lg');
  content = content.replace(/rounded-3xl/g, 'rounded-lg');
  content = content.replace(/rounded\b(?!\-)/g, 'rounded-lg');

  // Enforce Shadows
  // Standardize shadow to shadow-md or a custom shadow, let's use shadow-md
  content = content.replace(/shadow-sm/g, 'shadow-md');
  content = content.replace(/shadow-lg/g, 'shadow-md');
  content = content.replace(/shadow-xl/g, 'shadow-md');
  content = content.replace(/shadow-2xl/g, 'shadow-md');
  content = content.replace(/shadow\b(?!\-)/g, 'shadow-md');

  // Forms: identical styling for inputs
  // focus:border-[#AD002E] is already there from previous steps,
  // let's ensure focus:ring-[#AD002E]/20
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function traverseDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (!['node_modules', '.next', '.git'].includes(file)) {
        traverseDir(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      replaceInFile(fullPath);
    }
  }
}

traverseDir(path.join(__dirname, 'app'));
traverseDir(path.join(__dirname, 'components'));
