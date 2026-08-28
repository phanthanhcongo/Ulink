const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'public', 'images', 'home', 'section2');

if (fs.existsSync(dirPath)) {
  const files = fs.readdirSync(dirPath);
  files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.webp') {
      const filePath = path.join(dirPath, file);
      const buffer = fs.readFileSync(filePath);
      const base64 = buffer.toString('base64');
      const mimeType = ext === '.png' ? 'image/png' : 'image/webp';
      
      const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
  <image width="100%" height="100%" href="data:${mimeType};base64,${base64}"/>
</svg>`;
      
      const outputName = file.replace(ext, '.svg');
      const outputPath = path.join(dirPath, outputName);
      fs.writeFileSync(outputPath, svgContent);
      console.log(`Converted ${file} to ${outputName}`);
    }
  });
} else {
  console.error("Directory not found: " + dirPath);
}
