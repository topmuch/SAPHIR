// Télécharge les images sélectionnées et les redimensionne pour le web
import sharp from "sharp";
import { mkdirSync, writeFileSync } from "fs";
import { join } from "path";

const PUBLIC_DIR = "/home/z/my-project/public/images";
mkdirSync(PUBLIC_DIR, { recursive: true });

const images = [
  // [url, nom de fichier final, largeur max]
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/19d28d39af8f.jpg", "hero.jpg", 1920],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/bf5bc6ae9d1e.jpg", "service-renovation.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/155553c3cdf9.jpg", "service-bathroom.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/72a0338f2045.jpg", "service-kitchen.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/abdc7f28dedf.jpg", "service-paint.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/0df7e711091d.jpg", "service-roof.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6f251d47e80c.jpg", "service-extension.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/a150349c5116.jpg", "gallery-house.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/2ffd23028c5f.jpg", "gallery-kitchen.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/e35cacb1ed89.jpg", "gallery-bathroom.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/6164fe842639.jpg", "gallery-living.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/f153d72b813c.jpg", "gallery-roof.jpg", 1200],
  ["https://z-cdn.chatglm.cn/image-search-mcp/images-ppt/b9453f2fe981.jpg", "gallery-works.jpg", 1200],
];

for (const [url, name, maxWidth] of images) {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log(`ÉCHEC ${name}: HTTP ${res.status}`);
      continue;
    }
    const buffer = Buffer.from(await res.arrayBuffer());
    const outPath = join(PUBLIC_DIR, name);
    await sharp(buffer).resize({ width: maxWidth, withoutEnlargement: true }).jpeg({ quality: 82 }).toFile(outPath);
    const meta = await sharp(outPath).metadata();
    console.log(`OK ${name} (${meta.width}x${meta.height})`);
  } catch (e) {
    console.log(`ERREUR ${name}: ${e.message}`);
  }
}
console.log("Terminé.");
