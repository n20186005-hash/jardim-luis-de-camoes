// Compress public/gallery JPEGs in place: longest edge 1920, mozjpeg quality 80.
// Applies EXIF orientation automatically (sharp .rotate()).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const galleryDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'gallery'
);

const files = fs
  .readdirSync(galleryDir)
  .filter((f) => /\.jpe?g$/i.test(f))
  .sort();

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const full = path.join(galleryDir, file);
  const before = fs.statSync(full).size;
  const tmp = full + '.tmp.jpg';

  try {
    const meta = await sharp(full).metadata();
    const width = meta.width ?? 0;
    const height = meta.height ?? 0;

    await sharp(full)
      .rotate() // apply EXIF orientation
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(tmp);

    fs.unlinkSync(full);
    fs.renameSync(tmp, full);

    const after = fs.statSync(full).size;
    totalBefore += before;
    totalAfter += after;
    const pct = before > 0 ? Math.round((1 - after / before) * 1000) / 10 : 0;
    console.log(
      `${file}  ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB  (-${pct}%)  ${width}x${height} -> ${meta.width && width > 1920 ? 1920 : width}x${height > 1920 ? 1920 : height}`
    );
  } catch (err) {
    console.log(`${file} SKIPPED: ${err.message}`);
    if (fs.existsSync(tmp)) fs.unlinkSync(tmp);
  }
}

console.log(
  `TOTAL: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(totalAfter / 1024 / 1024).toFixed(2)}MB (-${(Math.round((1 - totalAfter / totalBefore) * 1000) / 10).toFixed(1)}%)`
);
