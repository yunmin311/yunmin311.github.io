import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {build,transform} from 'esbuild';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const source=path.join(root,'src/scripts/paper'),styles=path.join(root,'src/styles/paper'),output=path.join(root,'public/assets/paper');
const read=(base,file)=>fs.readFile(path.join(base,file),'utf8');await fs.mkdir(output,{recursive:true});await import('./compress-paper-experiment.mjs');
for(const [entry,out] of [['scene.js','scene.js'],['print.js','print.js'],['page-chrome.js','page-chrome.js']])await build({entryPoints:[path.join(source,entry)],bundle:true,minify:true,format:'iife',target:'es2020',outfile:path.join(output,out)});
// Keep the music study silent and network-free until the visitor presses play.
const sound=await fs.readFile(path.join(output,'59bf62d8c803ef34.wav'));
await fs.writeFile(path.join(output,'music-study.json'),JSON.stringify({mime:'audio/wav',base64:sound.toString('base64')}));
let css=await read(styles,'shell.css');
for(const [key,file] of [['EXTRA_CSS','exhibition.css'],['FOLIO_CSS','folio.css'],['CONTROL_CSS','controls.css'],['REFINED_CSS','refined.css'],['PLAYER_CSS','vendor/plyr.css'],['GALLERY_CSS','vendor/photoswipe.css']])css=css.replace('__'+key+'__',await read(styles,file));
css=css.replace('__DEPTH_CSS__',(await Promise.all(['vendor/tippy.css','vendor/tippy-shift-away.css','depth.css','experience.css','personal.css','scroll-controls.css','production.css'].map(f=>read(styles,f)))).join('\n'));
const manifest=JSON.parse(await read(output,'manifest.json'));css=css.replaceAll('__ATLAS_URL__',manifest.atlas);
if(/__[A-Z_]+__/.test(css))throw Error('Unresolved style asset');await fs.writeFile(path.join(output,'theme.css'),(await transform(css,{loader:'css',minify:true,target:'es2020'})).code);
let liquid=(await read(source,'vendor/liquid-glass.js')).replace(/export\s*\{[^}]+\};?/g,'');liquid='(function(){'+liquid+';window.PaperGlass={createLiquidGlass,isChromium};})();';
const runtime=[await read(source,'compatibility.js'),await read(source,'vendor/markdown-it.min.js'),await read(source,'vendor/motion.js'),...await Promise.all(['ui.js','music-source.js','exhibition.js','folio.js','controls.js','refined.js'].map(f=>read(source,f))), 'window.PAPER_PLAYER_ICONS='+JSON.stringify(await read(source,'vendor/plyr-icons.svg'))+';',...await Promise.all(['vendor/plyr.js','vendor/gallery.bundle.js','vendor/gsap.min.js','vendor/ScrollTrigger.min.js'].map(f=>read(source,f))),liquid,...await Promise.all(['vendor/popper.min.js','vendor/tippy-bundle.umd.min.js','depth.js','vendor/confetti.js'].map(f=>read(source,f))),...await Promise.all(['experience.js','personal.js','scroll-controls.js','production-bindings.js'].map(f=>read(source,f)))].join('\n;\n');
// Compress the concatenated script without bundling or changing its global hook scope.
await fs.writeFile(path.join(output,'runtime.js'),(await transform(runtime,{loader:'js',minify:true,target:'es2020',legalComments:'inline'})).code);await fs.copyFile(path.join(source,'bootstrap.js'),path.join(output,'home.js'));
for(const [name,file] of [['three','LICENSE'],['esbuild','LICENSE.md']])await fs.copyFile(path.join(root,'node_modules',name,file),path.join(output,'LICENSES',name+'-LICENSE.txt'));
const licenses={};for(const name of await fs.readdir(path.join(output,'LICENSES')))licenses[name]=await read(path.join(output,'LICENSES'),name);await fs.writeFile(path.join(output,'licenses.json'),JSON.stringify(licenses));
console.log('Paper site: local assets, theme and runtime built.');
