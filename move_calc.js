const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');

const regex = /(\s*\{\/\* 5\. Interactive Financial Tools.*?<\/section>\n)/s;
const match = content.match(regex);

if (match) {
    const calcBlock = match[1];
    let newContent = content.replace(regex, '');
    
    // Insert after HeroSlider
    const insertRegex = /(<HeroSlider \/>\n)/;
    newContent = newContent.replace(insertRegex, '$1' + calcBlock);
    
    fs.writeFileSync('app/page.tsx', newContent);
    console.log("Moved successfully.");
} else {
    console.log("Could not find the calculator block.");
}
