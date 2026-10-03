import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
// These files are immutable on the CDN. Bump the directory version if inputs or settings change.
const output = path.join(root, "public/assets/optimized/v1");
await mkdir(output, { recursive: true });

const images = [
  ["hero-1.jpg", "hero-960.webp", 960, 82],
  ["hero-1.jpg", "hero-1920.webp", 1920, 85],
  ["masterplan-4096.webp", "masterplan-base.webp", 1024, 76],
  ["masterplan-4096.webp", "masterplan-mobile.webp", 2048, 82],
  ["masterplan-4096.webp", "masterplan-desktop.webp", 4096, 84],
  ["masterplan-poster-desktop.webp", "plan-poster-desktop.webp", 1600, 78],
  ["masterplan-poster-mobile.webp", "plan-poster-mobile.webp", 780, 78],
];

for (const [source, name, width, quality] of images) {
  const result = await sharp(path.join(root, "public/assets/photo", source))
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 6 })
    .toFile(path.join(output, name));
  console.log(`${name}: ${Math.round(result.size / 1024)} KB`);
}
