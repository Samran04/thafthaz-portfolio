const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', '..', '..', '..', '..', 'Downloads', 'New folder', 'thafthaz-portfolio', 'folder1.html');
const content = fs.readFileSync(filePath, 'utf8');

// Find occurrences of MRK03662
let idx = content.indexOf('MRK03662');
while (idx !== -1) {
  console.log('--- FOUND MRK03662 at', idx);
  console.log(content.substring(Math.max(0, idx - 200), idx + 200));
  idx = content.indexOf('MRK03662', idx + 1);
}
