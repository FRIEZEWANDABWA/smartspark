const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function optimizeImages() {
  const imageDir = 'public/images';
  const extensions = ['.jpg', '.jpeg', '.png'];
  
  function getAllImages(dir) {
    let images = [];
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
      const fullPath = path.join(dir, item);
      if (fs.statSync(fullPath).isDirectory()) {
        images = images.concat(getAllImages(fullPath));
      } else if (extensions.includes(path.extname(item).toLowerCase())) {
        images.push(fullPath);
      }
    }
    return images;
  }
  
  const images = getAllImages(imageDir);
  
  for (const imagePath of images) {
    const outputPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    
    if (!fs.existsSync(outputPath)) {
      await sharp(imagePath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`Optimized: ${imagePath} -> ${outputPath}`);
    }
  }
}

optimizeImages().catch(console.error);