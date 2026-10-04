import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=path.resolve(import.meta.dirname,'..'), dir=path.join(root,'public/assets/paper');
const cache=JSON.parse(await fs.readFile(path.join(dir,'material-cache.json'),'utf8'));
const measurements=[];
for(const [key,url] of Object.entries(cache.processed)){
 const source=path.join(root,'public',url), dest=source.replace(/\.png$/,'.lossless.webp');
 if(dest===source)continue;
 await sharp(source).webp({lossless:true,effort:6}).toFile(dest);
 const [a,b]=await Promise.all([fs.stat(source),fs.stat(dest)]);
 // Verify decoded pixel equality, not just that the encoder calls itself lossless.
 const original=await sharp(source).ensureAlpha().raw().toBuffer(), decoded=await sharp(dest).ensureAlpha().raw().toBuffer();
 if(!original.equals(decoded))throw Error('Pixel mismatch: '+key);
 cache.processed[key]=url.replace(/\.png$/,'.lossless.webp');
 measurements.push({key,original:a.size,compressed:b.size,pixelIdentical:true});
}
await fs.writeFile(path.join(dir,'material-experiment.json'),JSON.stringify(cache));
await fs.mkdir(path.join(root,'docs/verification'),{recursive:true});
await fs.writeFile(path.join(root,'docs/verification/compression-experiment.json'),JSON.stringify(measurements,null,2));
console.log(measurements);
