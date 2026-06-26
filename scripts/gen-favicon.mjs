// Regenerates the site favicon + Apple touch icon from public/logomark.svg.
// Run after the logo changes:  node scripts/gen-favicon.mjs
//
// Next.js App Router serves app/favicon.ico at /favicon.ico and injects the
// <link rel="icon"> tag automatically, so no markup changes are needed.
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public/logomark.svg"));

// Render the (non-square) logomark onto a transparent square canvas at each
// icon size the .ico should carry.
const SIZES = [16, 32, 48];

async function renderPng(size) {
  return sharp(svg, { density: 512 })
    .resize(size, size, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();
}

// Build a PNG-payload .ico (supported by every browser since IE11/Vista).
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(images.length, 4); // image count

  const dir = Buffer.alloc(16 * images.length);
  let offset = header.length + dir.length;
  const entries = images.map((img, i) => {
    const base = i * 16;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, base + 0); // width
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, base + 1); // height
    dir.writeUInt8(0, base + 2); // palette
    dir.writeUInt8(0, base + 3); // reserved
    dir.writeUInt16LE(1, base + 4); // color planes
    dir.writeUInt16LE(32, base + 6); // bits per pixel
    dir.writeUInt32LE(img.data.length, base + 8); // size of image data
    dir.writeUInt32LE(offset, base + 12); // offset of image data
    offset += img.data.length;
    return img.data;
  });

  return Buffer.concat([header, dir, ...entries]);
}

const pngs = await Promise.all(
  SIZES.map(async (size) => ({ size, data: await renderPng(size) })),
);
writeFileSync(join(root, "app/favicon.ico"), buildIco(pngs));

// Apple touch icon (iOS home-screen) — solid brand background, no transparency.
const apple = await sharp(svg, { density: 512 })
  .resize(160, 160, { fit: "contain", background: { r: 13, g: 13, b: 23, alpha: 1 } })
  .extend({ top: 10, bottom: 10, left: 10, right: 10, background: { r: 13, g: 13, b: 23, alpha: 1 } })
  .png()
  .toBuffer();
writeFileSync(join(root, "app/apple-icon.png"), apple);

console.log(`Wrote app/favicon.ico (${SIZES.join("/")}) and app/apple-icon.png`);
