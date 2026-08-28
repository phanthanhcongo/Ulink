const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const logoPath = path.join(__dirname, '..', 'public', 'images', 'logo', 'Main Logo-04.png');
const imagePath = path.join(__dirname, '..', 'public', 'images', 'home', 'section2', 'cate_04.png');

async function run() {
  try {
    if (!fs.existsSync(logoPath)) {
      console.error("Logo file not found: " + logoPath);
      return;
    }
    if (!fs.existsSync(imagePath)) {
      console.error("Target image not found: " + imagePath);
      return;
    }

    // Resize logo to width 180px with auto height
    const logoResized = await sharp(logoPath)
      .resize({ width: 180 })
      .toBuffer();

    // Composite logo on top-left of the image (24px padding)
    const tmpPath = imagePath + '.tmp.png';
    await sharp(imagePath)
      .composite([
        {
          input: logoResized,
          top: 24,
          left: 24
        }
      ])
      .toFile(tmpPath);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }
    fs.renameSync(tmpPath, imagePath);
    console.log("Success: Added logo to cate_04.png");
  } catch (err) {
    console.error("Error adding logo:", err.message);
  }
}

run();
