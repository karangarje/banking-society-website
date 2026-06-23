const fs = require('fs');
const path = require('path');

function fixNav(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace invalid text-text-main and text-text-muted
  content = content.replace(/text-text-main/g, 'text-[#AD002E]');
  content = content.replace(/text-text-muted/g, 'text-[#AD002E]/70');

  // Replace text-base font-semibold with text-base font-bold to match buttons
  content = content.replace(/text-base font-semibold/g, 'text-base font-bold');

  // Let's also ensure the portal button and language selector are exactly text-base font-bold
  // (They should already be text-base font-bold since enforce_nav_text.js replaced their text-sm)

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated nav styling in: ${filePath}`);
  }
}

const files = [
  path.join(__dirname, 'components/layout/Header.tsx'),
  path.join(__dirname, 'components/layout/MegaMenu.tsx')
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    fixNav(file);
  }
});
