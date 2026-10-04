const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs'),assert=require('node:assert/strict');
const sharp=require('sharp');
async function identicalNeighbours(path){
 const {data,info}=await sharp(path).extract({left:1160,top:200,width:240,height:240}).removeAlpha().raw().toBuffer({resolveWithObject:true});
 let equal=0,total=0;
 for(let y=0;y<info.height;y++)for(let x=1;x<info.width;x++){
  const i=(y*info.width+x)*info.channels;total++;
  if(data[i]===data[i-info.channels]&&data[i+1]===data[i-info.channels+1]&&data[i+2]===data[i-info.channels+2])equal++;
 }
 return equal/total;
}
(async()=>{
 const b=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
 const baseline=process.env.PAPER_GRAIN_BASELINE==='1',results=[];
 const out=process.env.PAPER_GRAIN_OUT||'/tmp/paper-grain';fs.mkdirSync(out,{recursive:true});
 try{
  for(const backend of ['canvas','webgl']){
   const context=await b.newContext({viewport:{width:390,height:844},deviceScaleFactor:backend==='canvas'?3:1.25,reducedMotion:'no-preference'});
   const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
   if(backend==='webgl')await page.addInitScript(()=>window.PAPER_FORCE_WEBGL=true);
   await page.goto((process.env.PAPER_BASE_URL||'http://127.0.0.1:8800')+'/zh/');
   await page.waitForFunction(()=>window.paperCloud?.stats().loadedSources===3);
   for(const width of [390,960,961,1440,1920,1921,2560,3840]){
    await page.setViewportSize({width,height:844});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(160);
    const data=await page.evaluate(()=>({cloud:paperCloud.stats(),signature:paperCloud.signature(),overflow:document.documentElement.scrollWidth>innerWidth+1}));
    results.push({backend,width,...data});
    if([390,2560].includes(width)&&backend==='canvas'){
     const image=await page.evaluate(()=>document.querySelector('.cloud-flow-canvas').toDataURL());
     fs.writeFileSync(`${out}/${baseline?'before':'after'}-${width}.png`,Buffer.from(image.split(',')[1],'base64'));
    }
    assert.equal(data.overflow,false);
   }
   assert.deepEqual(errors,[]);await context.close();
  }
  fs.writeFileSync(`${out}/${baseline?'before':'after'}.json`,JSON.stringify(results,null,2));
  if(!baseline){
   assert.ok(results.every(r=>r.cloud.cellCSS===1),'Cloud sampling must remain one CSS pixel at every width');
   const old=fs.existsSync(`${out}/before.json`)?JSON.parse(fs.readFileSync(`${out}/before.json`)):null;
   if(old)for(const backend of ['canvas','webgl'])assert.equal(results.find(r=>r.width===390&&r.backend===backend).signature,old.find(r=>r.width===390&&r.backend===backend).signature,'Phone cloud image must stay unchanged');
   const before=fs.existsSync(`${out}/before-2560.png`)?await identicalNeighbours(`${out}/before-2560.png`):null,after=await identicalNeighbours(`${out}/after-2560.png`);
   assert.ok(before===null?after<.45:after<before*.6,'Actual cloud pixels must lose large repeated colour blocks, not only change diagnostics');
   fs.writeFileSync(`${out}/pixel-evidence.json`,JSON.stringify({before,after},null,2));
  }
  console.log('PASS',results.map(r=>({backend:r.backend,width:r.width,cell:r.cloud.cellCSS,mode:r.cloud.mode})));
 }finally{await b.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
