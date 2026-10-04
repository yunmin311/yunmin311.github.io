const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const fs=require('node:fs');
(async()=>{
  const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
  const results=[];
  for(let run=1;run<=3;run++)for(const [name,port] of run%2?[['baseline',8801],['experiment',8800]]:[['experiment',8800],['baseline',8801]]){
    const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'no-preference'});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const cdp=await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled',{cacheDisabled:true});
    await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:80,downloadThroughput:512000,uploadThroughput:128000});
    await page.addInitScript(()=>{
      window.speed={tasks:[]};
      new PerformanceObserver(list=>speed.tasks.push(...list.getEntries().map(e=>({start:e.startTime,duration:e.duration})))).observe({entryTypes:['longtask']});
      const timer=setInterval(()=>{
        if(window.paperProduction&&!speed.controls)speed.controls=performance.now();
        if(window.paperModelMotion?.stats().ready&&!speed.model)speed.model=performance.now();
        const cloud=window.paperCloud?.stats();
        if(cloud?.ready&&!speed.firstCloud)speed.firstCloud=performance.now();
        // The approved baseline becomes ready only after all three images load.
        if(cloud?.ready&&(cloud.loadedSources===3||cloud.loadedSources===undefined)&&!speed.allClouds)speed.allClouds=performance.now();
        if(speed.controls&&speed.model&&speed.allClouds)clearInterval(timer);
      },20);
    });
    await page.goto(`http://127.0.0.1:${port}/zh/`,{waitUntil:'domcontentloaded'});
    await page.waitForFunction(()=>speed.allClouds&&speed.model&&speed.controls,null,{timeout:90000});
    const data=await page.evaluate(()=>({...speed,paint:performance.getEntriesByType('paint').map(e=>({name:e.name,time:e.startTime})),transferred:performance.getEntriesByType('resource').reduce((s,r)=>s+r.transferSize,0)}));
    if(name==='experiment')data.language=await page.evaluate(async()=>{
      const origin=performance.timeOrigin,model=paperModelMotion;
      const start=performance.now();document.querySelector('.language').click();
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      return {milliseconds:performance.now()-start,lang:paperProduction.stats().lang,sameDocument:origin===performance.timeOrigin,sameModel:model===paperModelMotion};
    });
    results.push({name,run,...data,errors});console.log(JSON.stringify(results.at(-1)));
    await context.close();
  }
  await browser.close();
  if(results.some(r=>r.errors.length||r.language&&(!r.language.sameDocument||r.language.lang!=='en')))throw Error('Functional verification failed');
  fs.writeFileSync(process.env.PAPER_SPEED_RESULT||'/tmp/paper-speed-repeated.json',JSON.stringify({conditions:{runs:3,latencyMs:80,downloadBytesPerSecond:512000,cache:'disabled',viewport:'1440x900',renderer:'Chromium software GPU',server:'local Python static server without gzip'},results},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
