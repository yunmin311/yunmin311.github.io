const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
 try{
  for(const observer of [true,false]){
   const page=await browser.newPage({viewport:{width:1440,height:900}}),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   if(!observer)await page.addInitScript(()=>{window.IntersectionObserver=undefined;});
   await page.goto((process.env.PAPER_BASE_URL||'http://127.0.0.1:8800')+'/zh/');
   await page.waitForFunction(()=>window.paperPrint?.stats().model&&window.paperCloud?.stats().loadedSources===3);
   const sample=await page.evaluate(()=>{
    const nodes=[...document.querySelectorAll('.sand-sample[data-texture-url]')];
    const item=nodes.find(el=>el.getBoundingClientRect().top>innerHeight+700);
    if(!item)return null;
    item.dataset.qaMaterial='target';return {top:item.getBoundingClientRect().top,background:item.style.backgroundImage,url:item.dataset.textureUrl};
   });
   assert.ok(sample,'A real below-fold material sample must exist');
   if(observer)assert.equal(sample.background,'','Below-fold sample must not fetch eagerly');
   else assert.ok(sample.background.includes(sample.url),'Older browsers must display materials without IntersectionObserver');
   await page.locator('[data-qa-material="target"]').scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>{const el=document.querySelector('[data-qa-material="target"]');return el.style.backgroundImage.includes(el.dataset.textureUrl);});
   assert.deepEqual(await page.evaluate(()=>paperPrint.stats().errors),[]);
   assert.deepEqual(errors,[]);console.log('PASS material loading',observer?'lazy':'compatibility fallback');
   await page.close();
  }
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
