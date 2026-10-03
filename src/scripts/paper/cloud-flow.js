// OGL 1.0.11 Flowmap is used unchanged. This adapter bounds its force and renders the site's cloud art.
import {mountCloudCanvas} from './cloud-canvas.js';
import {Renderer,Texture,Program,Mesh,Triangle,Flowmap,Vec2} from 'ogl';
const vertex=`attribute vec2 uv;attribute vec2 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}`;
const fragment=`precision highp float;
uniform sampler2D tCloudA;uniform sampler2D tCloudB;uniform sampler2D tCloudC;uniform sampler2D tFlow;uniform vec2 uSize;uniform float uProgress;uniform float uForce;varying vec2 vUv;
vec2 sceneUV(vec2 pixel,float span,float worldY,float start){
 float width=span*2./3.;vec2 uv=vec2((pixel.x-.5*uSize.x)/width+.5,(worldY-start)/span);
 uv=clamp(uv,vec2(.002),vec2(.998));return (floor(uv*vec2(640.,960.))+.5)/vec2(640.,960.);
}
void main(){
 vec2 pixel=vec2(vUv.x,1.-vUv.y)*uSize;pixel=(floor(pixel)+.5);vec3 flow=texture2D(tFlow,vUv).rgb;
 pixel-=clamp(flow.xy*uForce*36.,vec2(-14.),vec2(14.));
 float span=max(uSize.y*1.65,uSize.x*1.5),overlap=span*.16,stepSize=span-overlap;
 float total=span+stepSize*2.;float worldY=pixel.y+uProgress*(total-uSize.y);
 vec3 result;
 if(worldY<stepSize){result=texture2D(tCloudA,sceneUV(pixel,span,worldY,0.)).rgb;}
 else if(worldY<span){result=mix(texture2D(tCloudA,sceneUV(pixel,span,worldY,0.)).rgb,texture2D(tCloudB,sceneUV(pixel,span,worldY,stepSize)).rgb,smoothstep(stepSize,span,worldY));}
 else if(worldY<stepSize*2.){result=texture2D(tCloudB,sceneUV(pixel,span,worldY,stepSize)).rgb;}
 else if(worldY<stepSize*2.+overlap){result=mix(texture2D(tCloudB,sceneUV(pixel,span,worldY,stepSize)).rgb,texture2D(tCloudC,sceneUV(pixel,span,worldY,stepSize*2.)).rgb,smoothstep(stepSize*2.,stepSize*2.+overlap,worldY));}
 else{result=texture2D(tCloudC,sceneUV(pixel,span,worldY,stepSize*2.)).rgb;}
 result=mix(result,result*.975,clamp(flow.z,0.,1.)*.3*uForce);gl_FragColor=vec4(result,1.);
}`;
export async function mountCloudFlow(host,urls){
 const fine=matchMedia('(hover:hover) and (pointer:fine)'),reduce=matchMedia('(prefers-reduced-motion:reduce)'),transparent=matchMedia('(prefers-reduced-transparency:reduce)'),forced=matchMedia('(forced-colors:active)');
 let renderer,gl,flow,program,mesh,raf=0,frames=0,emissions=0,running=false,scroll=scrollY,targetScroll=scrollY,last=null,lastTime=0,energy=0,lost=false;const velocity=new Vec2();
 const reduced=()=>reduce.matches||document.body.classList.contains('motion-off');
 const visible=()=>!document.hidden&&!transparent.matches&&!forced.matches&&!lost;
 const allowed=()=>visible()&&fine.matches&&!reduced();
 try{
 renderer=new Renderer({dpr:1,alpha:false,antialias:false,depth:false,stencil:false,preserveDrawingBuffer:false});gl=renderer.gl;if(!gl)throw new Error('Cloud WebGL unavailable');
 const debug=gl.getExtension('WEBGL_debug_renderer_info'),device=debug?gl.getParameter(debug.UNMASKED_RENDERER_WEBGL):'';if(!window.PAPER_FORCE_WEBGL&&/SwiftShader|llvmpipe|softpipe|software rasterizer/i.test(device)){gl.getExtension('WEBGL_lose_context')?.loseContext();return await mountCloudCanvas(host,urls);}
 gl.getExtension('EXT_color_buffer_float');flow=new Flowmap(gl,{size:64,falloff:.32,alpha:.40,dissipation:.90});
 // A zero field is the exact resting state; random initial stamps are never emitted.
 function clear(){for(const t of [flow.mask.read,flow.mask.write]){renderer.bindFramebuffer(t);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);}renderer.bindFramebuffer();}
 clear();const textures=[];for(const url of urls){const texture=new Texture(gl,{minFilter:gl.NEAREST,magFilter:gl.NEAREST,generateMipmaps:false,flipY:false});const img=new Image();img.src=url;await img.decode();texture.image=img;textures.push(texture);}
 program=new Program(gl,{vertex,fragment,depthTest:false,depthWrite:false,uniforms:{tCloudA:{value:textures[0]},tCloudB:{value:textures[1]},tCloudC:{value:textures[2]},tFlow:flow.uniform,uSize:{value:new Vec2(innerWidth,innerHeight)},uProgress:{value:0},uForce:{value:1}}});mesh=new Mesh(gl,{geometry:new Triangle(gl),program});
 gl.canvas.className='cloud-flow-canvas';gl.canvas.setAttribute('aria-hidden','true');host.append(gl.canvas);host.classList.add('is-flowing');
 function progress(){return Math.max(0,Math.min(1,scroll/Math.max(1,document.documentElement.scrollHeight-innerHeight)));}
 function draw(){program.uniforms.uProgress.value=reduced()?0:progress();program.uniforms.uForce.value=reduced()?0:1;renderer.render({scene:mesh});frames++;}
 function resize(){renderer.setSize(Math.ceil(innerWidth/1.5),Math.ceil(innerHeight/1.5));program.uniforms.uSize.value.set(innerWidth,innerHeight);flow.aspect=innerWidth/innerHeight;last=null;clear();energy=0;scroll=targetScroll=scrollY;draw();}
 function resetField(){velocity.set(0);flow.velocity.set(0);flow.mouse.set(-1);energy=0;last=null;clear();}
 function stop(){cancelAnimationFrame(raf);raf=0;running=false;resetField();scroll=targetScroll=scrollY;if(visible())draw();}
 function frame(){raf=0;if(!visible()){stop();return;}running=true;
  const now=performance.now();if(now-lastTime>65)velocity.set(0);
  if(reduced()){scroll=targetScroll;resetField();draw();running=false;return;}
  scroll+=(targetScroll-scroll)*.18;if(Math.abs(targetScroll-scroll)<.1)scroll=targetScroll;
  flow.velocity.lerp(velocity,.25);velocity.multiply(.72);energy=Math.max(energy*.90,flow.velocity.len());flow.update();draw();
  if(energy>.001||flow.velocity.len()>.001||Math.abs(targetScroll-scroll)>.1){raf=requestAnimationFrame(frame);}else{resetField();draw();running=false;}
 }
 function wake(){if(!raf&&visible())raf=requestAnimationFrame(frame);}
 document.addEventListener('pointermove',e=>{if(!allowed()||e.pointerType==='touch')return;const now=performance.now();flow.mouse.set(e.clientX/innerWidth,1-e.clientY/innerHeight);if(last&&Math.hypot(e.clientX-last.x,e.clientY-last.y)<240){const dt=Math.min(64,Math.max(12,now-lastTime));velocity.set((e.clientX-last.x)/dt*.30,(e.clientY-last.y)/dt*.30);const l=velocity.len();if(l>.65)velocity.multiply(.65/l);energy=Math.max(.06,velocity.len());emissions++;wake();}last={x:e.clientX,y:e.clientY};lastTime=now;},{passive:true});
 window.addEventListener('scroll',()=>{targetScroll=scrollY;wake();},{passive:true});window.addEventListener('resize',()=>{stop();resize();});
 document.documentElement.addEventListener('pointerleave',()=>{last=null;velocity.set(0);wake();});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();else{resize();wake();}});window.addEventListener('blur',stop);window.addEventListener('pagehide',stop);
 reduce.addEventListener('change',stop);fine.addEventListener('change',stop);transparent.addEventListener('change',stop);forced.addEventListener('change',stop);document.querySelector('.reduce').addEventListener('click',stop);
 gl.canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();lost=true;cancelAnimationFrame(raf);raf=0;running=false;host.classList.remove('is-flowing');});
 gl.canvas.addEventListener('webglcontextrestored',()=>{host.classList.remove('is-flowing');});
 resize();
 return {stop,stats:()=>({mode:'ogl-flowmap',renderSize:[gl.drawingBufferWidth,gl.drawingBufferHeight],flowSize:64,active:running,emissions,allowed:allowed(),frames,scroll,progress:reduced()?0:progress(),sceneIndex:Math.min(2,Math.floor(progress()*3)),sources:3,mirrored:false,looped:false,maxDisplacement:14,reduced:reduced(),contextLost:lost}),signature:()=>{draw();const bytes=new Uint8Array(gl.drawingBufferWidth*gl.drawingBufferHeight*4);gl.readPixels(0,0,gl.drawingBufferWidth,gl.drawingBufferHeight,gl.RGBA,gl.UNSIGNED_BYTE,bytes);let hash=2166136261;for(let i=0;i<bytes.length;i+=16)hash=Math.imul(hash^bytes[i],16777619);return hash>>>0;}};
 }catch(e){console.warn('Cloud flow fallback:',e.message);host.classList.remove('is-flowing');return{stop:()=>{},stats:()=>({mode:'static-fallback',active:false,error:e.message})};}
}
