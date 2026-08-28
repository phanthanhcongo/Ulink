const fs = require('fs');
const path = require('path');
const https = require('https');

const dirPath = path.join(__dirname, '..', 'public', 'images', 'partners-certifications');

// Create directory if not exists
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// 1. URLs of vector SVGs to download
const svgDownloads = {
  samsung: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
  canon: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Canon_logo.svg',
  panasonic: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Panasonic_logo.svg',
  ibm: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
  'coca-cola': 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Coca-Cola_logo.svg',
  vinfast: 'https://upload.wikimedia.org/wikipedia/commons/4/43/VinFast_logo_%28simple_variant%29.svg',
  lg: 'https://upload.wikimedia.org/wikipedia/commons/8/82/LG_logo.svg',
  amkor: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Amkor_Technology_logo.svg',
  '3m': 'https://upload.wikimedia.org/wikipedia/commons/b/b5/3M_logo.svg',
  byd: 'https://upload.wikimedia.org/wikipedia/commons/0/07/BYD_logo_2022.svg',
  vinamilk: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Vinamilk_new_logo.svg'
};

// 2. Local files to wrap as base64 inside SVG
const wrapFiles = [
  { name: 'traphaco', width: 212, height: 138 },
  { name: 'iso-9001-2015', width: 500, height: 250 },
  { name: 'sgs', width: 500, height: 250 },
  { name: 'rohs', width: 500, height: 250 },
  { name: 'msds', width: 500, height: 250 }
];

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        // Follow redirect
        downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: status code ${res.statusCode}`));
        return;
      }
      const fileStream = fs.createWriteStream(destPath);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Successfully downloaded: ${path.basename(destPath)}`);
        resolve();
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  // Download vector SVGs
  for (const [name, url] of Object.entries(svgDownloads)) {
    const dest = path.join(dirPath, `${name}.svg`);
    try {
      await downloadFile(url, dest);
    } catch (err) {
      console.error(`Error downloading SVG for ${name}, will fallback to webp wrapping:`, err.message);
      // fallback to wrapping
      wrapFiles.push({ name, width: 212, height: 138 });
    }
  }

  // Wrap remaining webp files into SVG
  for (const file of wrapFiles) {
    const webpPath = path.join(dirPath, `${file.name}.webp`);
    const svgPath = path.join(dirPath, `${file.name}.svg`);

    if (fs.existsSync(webpPath)) {
      try {
        const buffer = fs.readFileSync(webpPath);
        const base64 = buffer.toString('base64');
        const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${file.width}" height="${file.height}" viewBox="0 0 ${file.width} ${file.height}">
  <image width="100%" height="100%" href="data:image/webp;base64,${base64}"/>
</svg>`;
        fs.writeFileSync(svgPath, svgContent);
        console.log(`Successfully created SVG wrapper: ${file.name}.svg`);
      } catch (err) {
        console.error(`Error wrapping ${file.name}.webp:`, err.message);
      }
    } else {
      console.warn(`Source WebP not found for wrapping: ${file.name}.webp`);
    }
  }

  console.log('Conversion complete!');
}

run();
