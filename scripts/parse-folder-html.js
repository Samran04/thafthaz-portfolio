const fs = require('fs');
const path = require('path');

const content = fs.readFileSync('folder1.html', 'utf8');

// Google Drive embeds data in a JSON structure where file ID is followed by file name.
// A common structure is: ["<ID>", "<name>", ...] or ["<ID>", null, null, "<name>", ...]
// Let's do a regex search for any 33-character ID followed within 200 characters by a filename ending in jpg/jpeg/png
const idRegex = /([a-zA-Z0-9_-]{33})/g;
let match;
const found = [];

// Find all 33-character IDs and check their context
const matches = [];
const regex = /"([a-zA-Z0-9_-]{33})"/g;
while ((match = regex.exec(content)) !== null) {
  const id = match[1];
  if (id.startsWith('1')) {
    // Find the nearest filename after this ID
    const substr = content.substring(match.index, match.index + 500);
    const fileMatch = substr.match(/"([^"]+?\.(jpg|jpeg|png|webp))"/i);
    if (fileMatch) {
      matches.push({ id, filename: fileMatch[1] });
    }
  }
}

console.log('Mapped files:');
console.log(matches);
