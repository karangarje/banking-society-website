const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      if (f !== 'node_modules' && f !== '.next' && f !== '.git') walkDir(dirPath, callback);
    } else if (dirPath.endsWith('.tsx') || dirPath.endsWith('.ts')) {
      callback(dirPath);
    }
  });
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let newContent = content
    .replace(/text-\[11px\]/g, 'text-sm')
    .replace(/text-\[12px\]/g, 'text-sm')
    .replace(/text-\[13px\]/g, 'text-base');
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent);
    console.log(`Updated: ${filePath}`);
  }
}

['app', 'components'].forEach(dir => fs.existsSync(dir) && walkDir(dir, processFile));
console.log('Pixel text sizes updated.');
