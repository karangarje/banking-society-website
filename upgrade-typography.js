const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    if (isDirectory) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') {
        walkDir(dirPath, callback);
      }
    } else {
      if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
        callback(dirPath);
      }
    }
  });
}

const sizeMapping = {
  'text-[9px]': 'text-xs',
  'text-[10px]': 'text-sm',
  'text-xs': 'text-sm',
  'text-sm': 'text-base',
  'text-base': 'text-lg',
  'text-lg': 'text-xl',
  'text-xl': 'text-2xl',
  'text-2xl': 'text-3xl',
  'text-3xl': 'text-4xl',
  'text-4xl': 'text-5xl',
  'text-5xl': 'text-6xl',
  'text-6xl': 'text-7xl',
};

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content;

  const classRegex = /(^|[\s"'`:<])(text-\[9px\]|text-\[10px\]|text-xs|text-sm|text-base|text-lg|text-xl|text-2xl|text-3xl|text-4xl|text-5xl|text-6xl)(?=$|[\s"'`;>])/g;
  
  newContent = content.replace(classRegex, (match, p1, p2) => {
    return p1 + (sizeMapping[p2] || p2);
  });

  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated: ${filePath}`);
  }
}

['app', 'components'].forEach(dir => {
  if (fs.existsSync(dir)) {
    walkDir(dir, processFile);
  }
});
console.log('Typography update complete.');
