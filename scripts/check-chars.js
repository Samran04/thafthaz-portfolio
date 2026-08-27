const fs = require('fs');
const content = fs.readFileSync('folder1.html', 'utf8');

// Let's find the occurrence around 313090
const idx = 313090;
const surrounding = content.substring(idx - 10, idx + 100);
console.log('Surrounding string at 313090:', surrounding);
console.log('Char codes:');
for (let i = 0; i < surrounding.length; i++) {
  console.log(`${surrounding[i]}: ${surrounding.charCodeAt(i)}`);
}
