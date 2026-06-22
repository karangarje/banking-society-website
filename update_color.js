const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace hex colors
  content = content.replace(/#2596be/gi, '#AD002E');
  content = content.replace(/#1d7899/gi, '#850024'); // hover variant
  
  // Replace rgba values
  content = content.replace(/rgba\(37,150,190/g, 'rgba(173,0,46');
  content = content.replace(/rgba\(37, 150, 190/g, 'rgba(173, 0, 46');
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function traverseDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        traverseDir(fullPath);
      }
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.js') || fullPath.endsWith('.json')) {
      if (fullPath !== __filename) {
        replaceInFile(fullPath);
      }
    }
  }
}

traverseDir(__dirname);
