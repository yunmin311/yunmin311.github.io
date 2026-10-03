import {createRequire} from 'node:module';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const {chromium} = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || 'playwright');
const origin = process.env.PAPER_BASE_URL || 'http://localhost:8800';
const browser = await chromium.launch({executablePath:process.env.CHROMIUM_PATH || undefined,args:['--no-sandbox']});
const results = [];
try {
  for (const lang of ['zh','en']) {
    const page = await browser.newPage({reducedMotion:'reduce'});
    const media = [], studyRequests = [], errors = [];
    page.on('request', request => {
      if (/\.(bin|wav)(\?|$)/.test(request.url())) media.push(request.url());
      if (request.url().endsWith('/music-study.json')) studyRequests.push(request.url());
    });
    page.on('pageerror', error => errors.push(error.message));
    await page.route(/\.(bin|wav)(\?|$)/, route => route.abort());
    await page.goto(origin + '/' + lang + '/');
    await page.waitForFunction(() => window.paperProduction && paperModelMotion.stats().ready);
    assert.deepEqual(media, []);
    assert.equal(await page.locator('.loading').isVisible(), false);
    assert.equal(await page.locator('audio').getAttribute('src'), null);
    assert.deepEqual(studyRequests, []);
    await page.locator('.music-toggle').click();
    await page.waitForFunction(() => paperMusic.stats().phase === 'open');
    assert.deepEqual(studyRequests, []);
    await page.locator('.music-panel [data-plyr="play"]').first().click();
    await page.waitForFunction(() => paperMusic.stats().playing);
    assert.equal(studyRequests.length, 1);
    assert.ok((await page.locator('audio').getAttribute('src')).startsWith('blob:'));
    await page.locator('.music-panel .sound-position').focus();
    await page.keyboard.press('End');
    await page.keyboard.press('ArrowLeft');
    await page.waitForFunction(() => document.querySelector('audio').currentTime >= 16);
    await page.locator('.music-close').click();
    await page.waitForFunction(() => paperMusic.stats().phase === 'closed');
    assert.ok(await page.evaluate(() => paperMusic.stats().playing && paperMusic.stats().audioElements === 1));
    await page.locator('.music-toggle').click();
    await page.waitForFunction(() => paperMusic.stats().phase === 'open');
    await page.locator('.music-panel [data-plyr="play"]').first().click();
    await page.waitForFunction(() => !paperMusic.stats().playing);
    await page.locator('.music-panel [data-plyr="play"]').first().click();
    await page.waitForFunction(() => paperMusic.stats().playing);
    assert.equal(studyRequests.length, 1);
    assert.deepEqual(media, []);
    assert.deepEqual(errors, []);
    results.push({lang,pass:true,model:true,automaticAudioRequests:0,studyRequests:studyRequests.length,interceptableMediaRequests:media.length,errors});
    console.log('PASS', lang, 'blocked .bin/.wav, silent load/open, play/seek/pause/resume');
    await page.close();
  }
  const out = process.env.PAPER_QA_OUT || '/tmp/paper-formal';
  await fs.mkdir(out,{recursive:true});
  await fs.writeFile(out+'/media.json',JSON.stringify({origin,results},null,2));
} finally { await browser.close(); }
