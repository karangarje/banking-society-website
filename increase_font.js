const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'components/layout/Header.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(/text-\[16px\]/g, 'text-[18px]');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated font size to 18px for desktop nav');
