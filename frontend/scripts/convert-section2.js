const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const dirPath = path.join(__dirname, '..', 'public', 'images', 'home', 'section2');

async function run() {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (ext === '.png' || ext === '.webp' || ext === '.jpg' || ext === '.jpeg') {
        const filePath = path.join(dirPath, file);
        try {
          const metadata = await sharp(filePath).metadata();
          const width = metadata.width;
          const height = metadata.height;
          
          if (!width || !height) {
            console.warn(`Could not get dimensions for ${file}, skipping.`);
            continue;
          }
          
          const buffer = fs.readFileSync(filePath);
          const base64 = buffer.toString('base64');
          
          let mimeType;
          if (ext === '.png') mimeType = 'image/png';
          else if (ext === '.webp') mimeType = 'image/webp';
          else mimeType = 'image/jpeg';
          
          const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <image width="100%" height="100%" href="data:${mimeType};base64,${base64}"/>
</svg>`;
          
          const outputName = file.replace(ext, '.svg');
          const outputPath = path.join(dirPath, outputName);
          fs.writeFileSync(outputPath, svgContent);
          console.log(`Converted ${file} (${width}x${height}) to ${outputName}`);
        } catch (err) {
          console.error(`Error processing ${file}:`, err.message);
        }
      }
    }
  } else {
    console.error("Directory not found: " + dirPath);
  }
}

run();
