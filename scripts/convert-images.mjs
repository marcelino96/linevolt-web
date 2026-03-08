import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "../public");

function getFiles(dir) {
  const files = [];
  fs.readdirSync(dir).forEach((f) => {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) files.push(...getFiles(full));
    else if (/\.(jpg|jpeg|png)$/i.test(f)) files.push(full);
  });
  return files;
}

const images = getFiles(publicDir);
console.log(`Converting ${images.length} images...`);

await Promise.all(
  images.map(async (f) => {
    const webp = f.replace(/\.(jpg|jpeg|png)$/i, ".webp");
    const avif = f.replace(/\.(jpg|jpeg|png)$/i, ".avif");
    await sharp(f).webp({ quality: 85 }).toFile(webp);
    await sharp(f).avif({ quality: 80 }).toFile(avif);
    const origKb = Math.round(fs.statSync(f).size / 1024);
    const webpKb = Math.round(fs.statSync(webp).size / 1024);
    console.log(`✅ ${path.basename(f)} → ${path.basename(webp)} (${origKb}kb → ${webpKb}kb)`);
  })
);

console.log("All images converted!");
