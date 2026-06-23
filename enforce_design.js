const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  const colors = [
    'blue', 'green', 'yellow', 'red', 'orange', 'purple', 'indigo', 
    'pink', 'teal', 'cyan', 'emerald', 'amber', 'rose', 'fuchsia', 
    'violet', 'sky', 'lime'
  ];

  colors.forEach(color => {
    // text colors -> text-[#AD002E]
    const textRegex = new RegExp(`text-${color}-[0-9]+`, 'g');
    content = content.replace(textRegex, 'text-[#AD002E]');
    
    // bg colors -> bg-[#AD002E] or bg-white based on usage, but let's just make dark backgrounds #AD002E and light backgrounds #AD002E/5
    const bgDarkRegex = new RegExp(`bg-${color}-(500|600|700|800|900)`, 'g');
    content = content.replace(bgDarkRegex, 'bg-[#AD002E]');
    
    const bgLightRegex = new RegExp(`bg-${color}-(50|100|200|300|400)`, 'g');
    content = content.replace(bgLightRegex, 'bg-[#AD002E]/5');

    // border colors -> border-[#AD002E]
    const borderRegex = new RegExp(`border-${color}-[0-9]+`, 'g');
    content = content.replace(borderRegex, 'border-[#AD002E]');

    // hover and focus states
    const hoverTextRegex = new RegExp(`hover:text-${color}-[0-9]+`, 'g');
    content = content.replace(hoverTextRegex, 'hover:text-[#AD002E]');

    const hoverBgRegex = new RegExp(`hover:bg-${color}-[0-9]+`, 'g');
    content = content.replace(hoverBgRegex, 'hover:bg-[#AD002E]');
  });

  // some specific overrides from the grep
  content = content.replace(/text-red-500/g, 'text-[#AD002E]');
  content = content.replace(/bg-red-700/g, 'bg-[#AD002E]');
  content = content.replace(/bg-red-600/g, 'bg-[#AD002E]');
  content = content.replace(/border-red-500/g, 'border-[#AD002E]');
  content = content.replace(/text-red-200/g, 'text-[#AD002E]/50');

  // Let's also enforce Typography weights:
  // "Use font weights strategically: Bold (700-800), SemiBold (600), Regular (400-500)"
  // So remove font-light, font-thin, font-black, font-extrabold. Replace with font-bold or font-normal
  content = content.replace(/font-light/g, 'font-normal');
  content = content.replace(/font-thin/g, 'font-normal');
  content = content.replace(/font-black/g, 'font-bold');
  content = content.replace(/font-extrabold/g, 'font-bold');
  content = content.replace(/font-medium/g, 'font-normal'); // 500 is regular

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
