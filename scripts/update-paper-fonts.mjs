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
for(const[name,family]of[['display','Averia Sans Libre:wght@400'],['body','LXGW WenKai TC:wght@400']]){const css=(await fetch('https://fonts.googleapis.com/css2?'+new URLSearchParams({family,text:glyphs,display:'block'}))).toString(),urls=[...css.matchAll(/url\(([^)]+)\)/g)].map(m=>m[1]);if(urls.length!==1)throw Error('Expected one provider font: '+name);const data=await fetch(urls[0]);if(data.subarray(0,4).toString()!=='wOF2')throw Error('Invalid web font');await fs.writeFile(path.join(assets,name+'.woff2'),data);await fs.writeFile(path.join(assets,name+'-source.txt'),css+'\n'+urls[0]);console.log(name,data.length,'bytes');}
await fs.writeFile(path.join(assets,'glyphs.txt'),glyphs);console.log(glyphs.length,'covered glyphs');
