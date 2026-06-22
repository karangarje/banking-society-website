const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace light gray text with text-text-muted or text-gray-600
  content = content.replace(/text-gray-200/g, 'text-gray-700');
  content = content.replace(/text-gray-300/g, 'text-gray-600');
  content = content.replace(/text-gray-400/g, 'text-text-muted');
  
  // Replace text-white where it shouldn't be (unless it's in a primary button)
  // To avoid breaking buttons, we'll only replace specific known patterns
  content = content.replace(/className="text-4xl sm:text-6xl font-black text-white/g, 'className="text-4xl sm:text-6xl font-black text-text-main');
  content = content.replace(/font-extrabold text-white/g, 'font-extrabold text-text-main');
  content = content.replace(/font-bold text-white max-w-md/g, 'font-bold text-text-main max-w-md');
  
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
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
      if (fullPath !== __filename) {
        replaceInFile(fullPath);
      }
    }
  }
}

traverseDir(__dirname);
