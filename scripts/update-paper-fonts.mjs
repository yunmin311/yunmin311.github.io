// Download provider-built web fonts; do not locally subset or change reserved names.
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..'),assets=path.join(root,'public/assets/paper');
async function collect(dir){let text='';for(const file of await fs.readdir(dir,{withFileTypes:true})){if(['vendor','assets'].includes(file.name))continue;const target=path.join(dir,file.name);if(file.isDirectory())text+=await collect(target);else if(/\.(astro|md|ts|js|json)$/.test(file.name))text+=await fs.readFile(target,'utf8');}return text;}
const corpus=await collect(path.join(root,'src'));
const glyphs=[...new Set(corpus.match(/[\u4e00-\u9fff]/g)||[])].sort().join('')+Array.from({length:95},(_,i)=>String.fromCharCode(i+32)).join('')+'、。·…，：—“”';
const run=promisify(execFile),fetch=async url=>(await run('curl',['-fsSL','--retry','2','--max-time','40','-A','Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/130.0.0.0 Safari/537.36',url],{encoding:'buffer',maxBuffer:4*1024*1024})).stdout;
const pending=[];
for(const[name,family]of[['display','Averia Sans Libre:wght@400'],['body','LXGW WenKai TC:wght@400']]){
 let requestText=glyphs;
 let css=(await fetch('https://fonts.googleapis.com/css2?'+new URLSearchParams({family,text:requestText,display:'block'}))).toString();
 let urls=[...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]);
 let outputName=name,extraCSS='';
 if(name==='body'&&urls.length>1){
  // A long text request can return the entire provider font. Keep the accepted
  // base untouched, and ask the provider only for missing glyphs. Never subset locally.
  const baseCSS=await fs.readFile(path.join(assets,'body-source.txt'),'utf8');
  const ranges=[...baseCSS.matchAll(/U\+([0-9a-f]+)(?:-([0-9a-f]+))?/gi)].map(m=>[parseInt(m[1],16),parseInt(m[2]||m[1],16)]);
  if(!ranges.length)throw Error('Cannot prove base font coverage');
  requestText=[...glyphs].filter(c=>!ranges.some(([lo,hi])=>c.codePointAt(0)>=lo&&c.codePointAt(0)<=hi)).join('');
  if(!requestText)continue;
  css=(await fetch('https://fonts.googleapis.com/css2?'+new URLSearchParams({family,text:requestText,display:'block'}))).toString();
  urls=[...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]);outputName='body-extra';
  extraCSS='@font-face{font-family:Body;src:url(/assets/paper/body-extra.woff2) format("woff2");font-weight:400;font-display:swap;unicode-range:'+Array.from(requestText,c=>'U+'+c.codePointAt(0).toString(16)).join(',')+'}';
 }
 if(urls.length!==1)throw Error('Expected one provider font: '+outputName);
 const data=await fetch(urls[0]);if(data.subarray(0,4).toString()!=='wOF2')throw Error('Invalid web font');
 pending.push([outputName+'.woff2',data],[outputName+'-source.txt',css+'\n'+urls[0]]);
 if(name==='body')pending.push(['body-extra.css',extraCSS]);
 console.log(outputName,data.length,'bytes');
}
// Commit downloaded files only after every provider response has been verified.
for(const[name,data]of pending)await fs.writeFile(path.join(assets,name),data);
await fs.writeFile(path.join(assets,'glyphs.txt'),glyphs);console.log(glyphs.length,'covered glyphs');
