const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace primary accent color
  content = content.replace(/#F36B21/g, '#AD002E');
  content = content.replace(/rgba\(243,107,33/g, 'rgba(173,0,46');
  content = content.replace(/rgba\(243, 107, 33/g, 'rgba(173, 0, 46');
  
  // Replace dark backgrounds with white/light gray
  content = content.replace(/#0B0B0F/gi, '#FFFFFF');
  content = content.replace(/#FFFFFF/gi, '#FDFDFD');
  content = content.replace(/#FFFFFF/gi, '#F9F9F9');
  content = content.replace(/#1A1A24/gi, '#F0F0F0');
  
  // Replace text colors that were white/gray on dark bg with dark gray on white bg
  // Be careful with white text since it might be on a #AD002E background (buttons)
  // Let's replace text-white with something else if it's not on primary background? 
  // Actually, wait, replacing text-white blindly is dangerous.
  
  // Replace orange tailwind classes
  content = content.replace(/text-orange-500/g, 'text-[#AD002E]');
  content = content.replace(/border-orange-500/g, 'border-[#AD002E]');
  content = content.replace(/bg-orange-500/g, 'bg-[#AD002E]');
  content = content.replace(/hover:text-orange-500/g, 'hover:text-[#AD002E]');
  
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
