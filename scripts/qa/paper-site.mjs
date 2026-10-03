import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const require=createRequire(import.meta.url),{chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const origin=process.env.PAPER_BASE_URL||'http://localhost:8800',out=process.env.PAPER_QA_OUT||'/tmp/paper-formal';
await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
const results=[],errors=[],failed=[];
const record=(name,data)=>{results.push({name,pass:true,data});console.log('PASS',name)};
async function home(lang,width,motion='reduce'){
 const p=await browser.newPage({viewport:{width,height:800},reducedMotion:motion});p.on('pageerror',e=>errors.push(e.message));p.on('response',r=>{if(r.status()>=400)failed.push([r.status(),r.url()])});
 await p.goto(origin+'/'+lang+'/');await p.waitForFunction(()=>window.paperProduction&&window.paperModelMotion?.stats().ready&&window.paperCloud?.stats().ready);
 const stats=await p.evaluate(()=>({production:paperProduction.stats(),print:paperPrint.stats(),overflow:document.documentElement.scrollWidth-innerWidth,name:getComputedStyle(document.querySelector('h1')).fontSize,scroll:paperScroll.stats(),ticks:[...document.querySelectorAll('.ruler-tick')].map(e=>({top:e.getBoundingClientRect().top,opacity:getComputedStyle(e).opacity}))}));
 assert.equal(stats.overflow,0);assert.equal(stats.production.posts,lang==='zh'?2:0);assert.equal(stats.production.projects,lang==='zh'?6:0);assert.equal(stats.name,width>1000?'76px':width>560?'64px':'54px');assert.equal(stats.print.shaderPasses,0);assert.deepEqual(stats.print.errors,[]);
 await p.evaluate(()=>selectPaper(0));await p.waitForFunction(()=>paperReader.stats().phase==='open');
 if(width===1440){for(const next of [1,2]){await p.waitForTimeout(950);const box=await p.locator('.stage').boundingBox();await p.mouse.click(box.x+box.width*.51,box.y+box.height*.095);await p.waitForFunction(next=>paperReader.stats().index===next,next);}}
 await p.locator('.photo-slider').focus();await p.keyboard.press('Home');await p.waitForFunction(()=>paperReader.stats().index===0);await p.keyboard.press('End');await p.waitForFunction(()=>paperReader.stats().index===2);
 await p.locator('.photo-slider').focus();await p.keyboard.press('ArrowLeft');await p.waitForFunction(()=>paperReader.stats().index===1);
 if(lang==='zh'){
  await p.locator('.reader-list button').first().click();await p.waitForFunction(()=>paperScroll.stats().scope==='panel');await p.locator('.reading-detail .route-link').focus();await p.keyboard.press('Tab');assert.ok(await p.evaluate(()=>document.activeElement.matches('.ruler-slider')));await p.locator('.ruler-slider').focus();await p.keyboard.press('End');assert.ok(await p.evaluate(()=>paperScroll.stats().top>=paperScroll.stats().max-1));assert.ok(await p.locator('.ruler-tick').last().evaluate(e=>e.classList.contains('current')));await p.keyboard.press('Home');assert.ok(await p.evaluate(()=>paperScroll.stats().top<1));assert.equal(await p.locator('.reading-detail .route-link').count(),1);
 }
 await p.keyboard.press('Escape');await p.waitForFunction(()=>paperReader.stats().phase==='closed');
 await p.locator('.ruler-slider').focus();await p.keyboard.press('End');await p.waitForFunction(()=>scrollY>1000);await p.waitForTimeout(motion==='reduce'?100:900);assert.ok(await p.evaluate(()=>document.getElementById('about').getBoundingClientRect().top<innerHeight));
 await p.locator('.reduce').scrollIntoViewIfNeeded();assert.ok(await p.locator('.reduce').isVisible());await p.locator('.reduce').click();assert.ok(await p.evaluate(()=>document.body.classList.contains('motion-off')));await p.locator('.reduce').click();
 await p.evaluate(()=>goChapter(0,true));await p.waitForTimeout(150);
 await p.locator('.music-toggle').click();await p.waitForFunction(()=>paperMusic.stats().phase==='open');
 await p.locator('.music-panel [data-plyr="play"]').first().click();await p.waitForFunction(()=>paperMusic.stats().playing);
 await p.locator('.music-close').click();await p.waitForFunction(()=>paperMusic.stats().phase==='closed');assert.ok(await p.evaluate(()=>paperMusic.stats().playing&&paperMusic.stats().audioElements===1));
 await p.evaluate(()=>selectPaper(1));await p.waitForFunction(()=>paperReader.stats().phase==='open');assert.ok(await p.evaluate(()=>paperMusic.stats().playing));await p.keyboard.press('Escape');await p.waitForFunction(()=>paperReader.stats().phase==='closed');
 if(motion==='no-preference'){
  await p.evaluate(()=>{selectPaper(0);selectPaper(2);close();selectPaper(1)});await p.waitForFunction(()=>paperReader.stats().phase==='open'&&paperReader.stats().index===1&&!paperModelMotion.stats().moving);await p.keyboard.press('Escape');await p.waitForFunction(()=>paperReader.stats().phase==='closed');
  const before=await p.evaluate(()=>paperClicks.stats().count);await p.mouse.click(300,170);assert.ok(await p.evaluate(()=>paperClicks.stats().count)>before);
  const emitted=await p.evaluate(()=>paperCloud.stats().emissions);await p.mouse.move(310,200);await p.mouse.move(430,245,{steps:8});assert.ok(await p.evaluate(()=>paperCloud.stats().emissions)>emitted);
 }
 await p.screenshot({path:path.join(out,`home-${lang}-${width}.png`)});record(`home ${lang} ${width} ${motion}`,stats);await p.close();
}
try{
 await home('zh',1440,'no-preference');await home('zh',768);await home('zh',375);await home('en',1440);await home('en',375);
 const p=await browser.newPage({viewport:{width:375,height:800},reducedMotion:'reduce'});p.on('pageerror',e=>errors.push(e.message));
 for(const route of ['/zh/blog/building-personal-website/','/zh/blog/vibe-coding-heatmap/','/zh/projects/','/zh/projects/camera-transfer/','/en/projects/','/zh/works/','/zh/works/poster-series/','/zh/works/zh-only-sample/','/en/works/','/zh/about/','/en/about/','/zh/learning/','/en/repos/']){
  const response=await p.goto(origin+route);assert.equal(response.status(),200);await p.waitForFunction(()=>window.paperScroll);assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth-innerWidth),0,route+' overflow');
  const data=await p.evaluate(()=>({scroll:paperScroll.stats(),title:document.title,tracking:getComputedStyle(document.querySelector('h1')).letterSpacing,lang:document.documentElement.lang}));assert.equal(data.tracking,'normal');
  if(route.includes('building-personal')){await p.locator('.ruler-slider').focus();await p.keyboard.press('End');assert.ok(await p.evaluate(()=>paperScroll.stats().top>=paperScroll.stats().max-1));assert.ok(await p.locator('.ruler-tick').last().evaluate(e=>e.classList.contains('current')));await p.keyboard.press('Home');assert.ok(await p.evaluate(()=>paperScroll.stats().top<1));assert.ok(await p.locator('.table-viewport').count());await p.screenshot({path:path.join(out,'article-phone.png')});}
  if(route==='/zh/works/zh-only-sample/')assert.equal(await p.locator('.subpage-language').getAttribute('href'),'/en/');
  record('page '+route,data);
 }
 await p.close();
 const f=await browser.newPage();await f.route('**/assets/paper/manifest.json',route=>route.abort());await f.goto(origin+'/zh/');await f.waitForSelector('body.paper-fallback');assert.equal(await f.locator('.paper-fallback-links a:visible').count(),4);await f.locator('.paper-fallback-links a').nth(1).click();await f.waitForURL('**/zh/blog/');record('asset failure retains real content navigation',{});await f.close();
 assert.deepEqual(errors,[]);assert.deepEqual(failed,[]);record('no browser exceptions or missing assets',{errors,failed});
 await fs.writeFile(path.join(out,'acceptance.json'),JSON.stringify({origin,results,errors,failed},null,2));
}finally{await browser.close()}
