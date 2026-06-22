const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;
  
  // Replace dark backgrounds that were missed
  content = content.replace(/#0b0b10/gi, '#FFFFFF');
  content = content.replace(/#0f0f14/gi, '#FFFFFF');
  content = content.replace(/#12121A/gi, '#FFFFFF');
  content = content.replace(/#14141c/gi, '#FFFFFF');
  
  // Fix text-white on elements that hover or don't have primary background
  content = content.replace(/isDark \? "text-white" : "text-\[#333333\]"/g, '"text-text-main"');
  content = content.replace(/isDark \? "text-white" : "text-gray-900"/g, '"text-text-main"');
  content = content.replace(/isDark \? "text-white" : "text-gray-700"/g, '"text-text-main"');
  content = content.replace(/isDark \? "text-white"/g, 'false ? "text-white"');
  
  // Replace remaining isDark references that set white text unnecessarily
  content = content.replace(/text-text-muted hover:text-white/g, 'text-gray-600 hover:text-[#AD002E]');
  
  // Replace some explicit white borders that should be primary or subtle
  content = content.replace(/border-white\/10/g, 'border-[#AD002E]/20');
  
  // Any stray text-white that is NOT inside a button or badge?
  // It's safer to let them be unless they're unreadable. But wait!
  // If `ContactFormMarathi.tsx` had `bg-[#0f0f14] text-white`, it's now `bg-[#FFFFFF] text-white` which is invisible!
  // So we must fix `bg-[#FFFFFF] text-white`
  content = content.replace(/bg-\[#FFFFFF\] text-white/g, 'bg-[#FFFFFF] text-text-main');
  
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
