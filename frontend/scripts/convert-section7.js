const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, '..', 'public', 'images', 'home', 'section7');

const files = [
  'image (5).png',
  'image (6).png',
  'image (7).png',
  'image (8).png'
];

files.forEach(file => {
  const filePath = path.join(dirPath, file);
  if (fs.existsSync(filePath)) {
    const buffer = fs.readFileSync(filePath);
    const base64 = buffer.toString('base64');
    
    // We wrap the png base64 in SVG. Since it is SVG, it will render correctly.
    // 800x500 is a standard landscape dimension for case study banners.
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
  <image width="100%" height="100%" href="data:image/png;base64,${base64}"/>
</svg>`;
    
    const outputName = file.replace('.png', '.svg');
    const outputPath = path.join(dirPath, outputName);
    fs.writeFileSync(outputPath, svgContent);
    console.log(`Converted ${file} to ${outputName}`);
  } else {
    console.warn(`File not found: ${file}`);
  }
});
