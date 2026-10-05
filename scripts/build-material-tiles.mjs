// Reuse the approved sand raster; only a 48px wrap boundary is blended.
// No resize or new artwork. All repeated edges match, including the corners.
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const dir=path.resolve(import.meta.dirname,'../public/assets/paper');
const original=JSON.parse(await fs.readFile(path.join(dir,'material-cache.json'),'utf8'));
const compressed=JSON.parse(await fs.readFile(path.join(dir,'material-experiment.json'),'utf8'));
original.surfaceTiles={};compressed.surfaceTiles={};
for(const key of ['sand-blue','sand-sage']){
 const file=path.join(dir,path.basename(original.processed[key]));
 const {data,info}=await sharp(file).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const {width,height,channels}=info;if(width!==900||height!==600)throw Error('Unexpected sand raster resolution');
 const wrap=(input,horizontal)=>{const output=Buffer.from(input),span=horizontal?width:height;
  for(let y=0;y<height;y++)for(let x=0;x<width;x++){
   const pos=horizontal?x:y,d=Math.min(pos,span-1-pos);if(d>=48)continue;
   const opposite=horizontal?(y*width+width-1-x)*channels:((height-1-y)*width+x)*channels;
   const offset=(y*width+x)*channels,t=.5*(1-d/48);
   for(let c=0;c<3;c++)output[offset+c]=Math.round(input[offset+c]*(1-t)+input[opposite+c]*t);
  }return output;
 };
 const tile=wrap(wrap(data,true),false),name=key+'-surface-v1';
 await sharp(tile,{raw:{width,height,channels}}).png().toFile(path.join(dir,name+'.png'));
 await sharp(tile,{raw:{width,height,channels}}).webp({lossless:true,effort:6}).toFile(path.join(dir,name+'.lossless.webp'));
 const decoded=await sharp(path.join(dir,name+'.lossless.webp')).ensureAlpha().raw().toBuffer();if(!tile.equals(decoded))throw Error('Tile lossless verification failed');
 for(let y=0;y<height;y++)for(let c=0;c<3;c++)if(tile[(y*width)*channels+c]!==tile[(y*width+width-1)*channels+c])throw Error('Horizontal seam');
 for(let x=0;x<width;x++)for(let c=0;c<3;c++)if(tile[x*channels+c]!==tile[((height-1)*width+x)*channels+c])throw Error('Vertical seam');
 original.surfaceTiles[key]='/assets/paper/'+name+'.png';compressed.surfaceTiles[key]='/assets/paper/'+name+'.lossless.webp';
}
await fs.writeFile(path.join(dir,'material-cache.json'),JSON.stringify(original));
await fs.writeFile(path.join(dir,'material-experiment.json'),JSON.stringify(compressed));
console.log('Sand surface tiles: 900x600, matching wrap edges, verified lossless WebP.');
