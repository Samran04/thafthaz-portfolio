const fs = require('fs');

let content = fs.readFileSync('folder1.html', 'utf8');

// Decode hex escapes: \\x5b -> [ , \\x22 -> " , etc.
content = content.replace(/\\x([a-fA-F0-9]{2})/g, (match, hex) => {
  return String.fromCharCode(parseInt(hex, 16));
});

// Now that it is decoded, let's look for standard patterns:
// ["1LNg4PiKhLws5vB8dNIOiqcMomFTW0-VW",["1VgV36C-mvYnv_HfH75nlShi8cdX2JXB6"],"MRK03662.jpg"
const regex = /"([1][a-zA-Z0-9_-]{32})",\s*\[\s*"([a-zA-Z0-9_-]{33})"\s*\]\s*,\s*"([^"]+?\.(jpg|jpeg|gif|png|webp))"/gi;

let match;
const results = [];
while ((match = regex.exec(content)) !== null) {
  results.push({ id: match[1], folderId: match[2], filename: match[3] });
}

console.log('Decoded Regex Results:');
console.log(results);
