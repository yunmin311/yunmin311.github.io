// Regression: adding content must not enlarge the sand raster or its grains.
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict'),fs=require('node:fs');
const base=process.env.PAPER_BASE_URL||'http://127.0.0.1:8800';
const out=process.env.PAPER_QA_OUTPUT||'/tmp/material-scale-qa';fs.mkdirSync(out,{recursive:true});
(async()=>{const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});const results=[];try{
for(const width of [390,1440,1920])for(const deviceScaleFactor of [1,2]){
 const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor,reducedMotion:'reduce'}),page=await context.newPage();
 await page.goto(base+'/zh/');await page.waitForFunction(()=>document.body.dataset.paperReady==='true'&&document.querySelector('#repos>.pixel-window'));
 const measure=()=>page.evaluate(()=>[...document.querySelectorAll('.pixel-window[data-material="sand-blue"],.pixel-window[data-material="sand-sage"]')].map(el=>({size:getComputedStyle(el).backgroundSize,repeat:getComputedStyle(el).backgroundRepeat,height:el.clientHeight,material:el.dataset.material})));
 const before=await measure();assert.ok(before.length>10);for(const row of before){assert.equal(row.size,'900px 600px');assert.equal(row.repeat,'repeat');}
 await page.evaluate(()=>{for(const id of ['works','repos']){const host=document.getElementById(id);const box=document.createElement('div');box.dataset.qaContent='true';for(let i=0;i<50;i++){const p=document.createElement('p');p.textContent='Additional content for texture scale regression '+i;box.append(p);}host.append(box);}});
 await page.waitForTimeout(100);const after=await measure();assert.ok(after.some((row,i)=>row.height>before[i].height));for(const row of after){assert.equal(row.size,'900px 600px');assert.equal(row.repeat,'repeat');}
 await page.locator('#repos').scrollIntoViewIfNeeded();await page.waitForFunction(()=>getComputedStyle(document.querySelector('#repos>.pixel-window')).backgroundImage!=='none');
 const raster=await page.evaluate(async()=>{const el=document.querySelector('#repos>.pixel-window'),img=new Image();img.src=el.dataset.textureUrl;await img.decode();const canvas=document.createElement('canvas');canvas.width=img.naturalWidth;canvas.height=img.naturalHeight;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);const bytes=ctx.getImageData(0,0,canvas.width,canvas.height).data;for(let y=0;y<canvas.height;y++)for(let c=0;c<3;c++)if(bytes[y*canvas.width*4+c]!==bytes[(y*canvas.width+canvas.width-1)*4+c])throw Error('Visible horizontal tile seam');for(let x=0;x<canvas.width;x++)for(let c=0;c<3;c++)if(bytes[x*4+c]!==bytes[((canvas.height-1)*canvas.width+x)*4+c])throw Error('Visible vertical tile seam');return [img.naturalWidth,img.naturalHeight];});assert.deepEqual(raster,[900,600]);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false);
 if(deviceScaleFactor===1&&width===1440)await page.screenshot({path:out+'/long-repos.png'});
 await page.goto(base+'/zh/works/gitlineage/');const reading=await page.locator('.page-reading-layer').evaluate(el=>getComputedStyle(el,'::before').backgroundSize);assert.equal(reading,'900px 600px');
 results.push({width,deviceScaleFactor,planes:after.length,rasterCSS:'900x600',sourceRaster:raster,contentGrowth:true,reading,matchingEdges:true,noOverflow:true});await context.close();
}
fs.writeFileSync(out+'/results.json',JSON.stringify({passed:true,results},null,2));console.log('PASS sand scale: six viewport/DPR combinations, growing Home modules and reading pages');
}finally{await browser.close();}})();
