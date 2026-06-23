const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Fix button gradients (Primary Button)
  content = content.replace(/bg-gradient-to-r from-\[[^\]]+\] to-\[[^\]]+\]/g, 'bg-[#AD002E]');
  content = content.replace(/bg-gradient-to-br from-\[[^\]]+\] to-\[[^\]]+\]/g, 'bg-[#AD002E]');
  content = content.replace(/hover:from-\[[^\]]+\] hover:to-\[[^\]]+\]/g, 'hover:bg-[#AD002E]/90');

  // Specific rogue hex colors (maroons, dark grays, etc.)
  const rogueMaroons = ['#B3003C', '#8A0030', '#92002f', '#850024', '#5a0b0b'];
  rogueMaroons.forEach(hex => {
    const re = new RegExp(hex, 'gi');
    content = content.replace(re, '#AD002E');
  });

  // Convert any arbitrary border to border-[#AD002E]
  // if it's already a white or black border, it should probably be #AD002E or a variation
  content = content.replace(/border-white(\/\d+)?/g, 'border-[#AD002E]/20');

  // Enforce Primary Button styling (heuristic: button with text-white)
  // bg-[#AD002E] text-white font-bold
  
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
