const fs = require('fs');
const path = require('path');

const mdPath = path.join('d:\\new website\\single-core-labs-website', 'R.MD');
const content = fs.readFileSync(mdPath, 'utf-8');

const lines = content.split('\n');
let jsx = `export default function MedicalImagingAIContent() {\n  return (\n    <>\n`;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i].trim();
  if (!line) continue;
  
  // Escape curly braces and angle brackets for JSX
  line = line.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/{/g, '&#123;').replace(/}/g, '&#125;');

  if (line === 'RESEARCH PAPER' || line.startsWith('Akshita Singh') || line.startsWith('May 2025')) {
     continue;
  }
  if (line.startsWith('Medical Imaging in the Age')) {
     jsx += `      <p className="blog-prose-lead"><strong>${line}</strong></p>\n`;
     continue;
  }
  
  if (line === 'ABSTRACT') {
    jsx += `      <h2>Abstract</h2>\n`;
    continue;
  }
  
  if (/^\d+\.\s/.test(line)) {
    jsx += `      <h2>${line}</h2>\n`;
    continue;
  }
  
  if (/^\d+\.\d+\s/.test(line)) {
    jsx += `      <h3>${line}</h3>\n`;
    continue;
  }

  if (line.startsWith('Spotlight:')) {
    jsx += `      <h3>${line}</h3>\n`;
    continue;
  }

  if (line.startsWith('Table 1.')) {
    jsx += `      <p><em>${line}</em></p>\n`;
    continue;
  }

  if (line.startsWith('[')) {
     jsx += `      <p className="blog-prose-footnote">${line}</p>\n`;
     continue;
  }
  
  jsx += `      <p>${line}</p>\n`;
}

jsx += `    </>\n  )\n}\n`;

fs.writeFileSync(path.join('d:\\new website\\single-core-labs-website\\src\\content\\blog', 'medical-imaging-ai.jsx'), jsx);
console.log('Done!');
