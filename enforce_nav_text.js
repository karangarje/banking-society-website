const fs = require('fs');
const path = require('path');

function replaceTextSizes(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  // Replace responsive text classes and specific text sizes with text-base
  const textClasses = [
    'text-xs', 'text-sm', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl',
    'text-\\[10px\\]', '2xl:text-base', '2xl:text-xs', 'sm:text-xs', 'xs:text-sm', 'sm:text-base', 'sm:text-lg'
  ];

  textClasses.forEach(cls => {
    // We use a regex that matches the class followed by space or quote or backtick
    // to avoid matching partial strings like "text-small" if it existed.
    const re = new RegExp(`\\b${cls}\\b`, 'g');
    content = content.replace(re, 'text-base');
  });
  
  // Clean up duplicate text-base classes that might have been created
  content = content.replace(/(text-base\s+)+text-base/g, 'text-base');
  content = content.replace(/text-base\s+text-base/g, 'text-base');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated sizes in: ${filePath}`);
  }
}

const filesToUpdate = [
  path.join(__dirname, 'components/layout/Header.tsx'),
  path.join(__dirname, 'components/layout/MegaMenu.tsx')
];

filesToUpdate.forEach(file => {
  if (fs.existsSync(file)) {
    replaceTextSizes(file);
  }
});
