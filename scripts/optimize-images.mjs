// Compresses every photo in /raw-images into responsive WebP files in /public/images.
// Usage: npm run images
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = path.resolve('raw-images')
const OUT = path.resolve('public/images')
const WIDTHS = [640, 1280, 1920]
const EXT = /\.(jpe?g|png|webp|avif|heic)$/i

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => EXT.test(f))

if (!files.length) {
  console.log('No images found in /raw-images. Add photos named like hero.jpg, gallery-01.jpg, coach-1.jpg …')
  process.exit(0)
}

for (const file of files) {
  const name = path.parse(file).name.toLowerCase()
  for (const w of WIDTHS) {
    await sharp(path.join(SRC, file))
      .rotate()
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 72 })
      .toFile(path.join(OUT, `${name}-${w}.webp`))
  }
  console.log(`✓ ${file} → ${name}-{${WIDTHS.join(',')}}.webp`)
}
