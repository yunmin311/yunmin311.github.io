"use strict";(()=>{var qi=Object.defineProperty;var Ji=(t,e,i)=>e in t?qi(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var F=(t,e,i)=>Ji(t,typeof e!="symbol"?e+"":e,i);async function je(t,e){let i=matchMedia("(hover:hover) and (pointer:fine)"),r=matchMedia("(prefers-reduced-motion:reduce)"),s=matchMedia("(prefers-reduced-transparency:reduce)"),n=matchMedia("(forced-colors:active)"),o=(await Promise.all(e.map(async _=>{let U=new Image;return U.src=_,await U.decode(),U}))).map((_,U)=>{if(!U)return _;let L=document.createElement("canvas");L.width=_.width,L.height=_.height;let I=L.getContext("2d");I.drawImage(_,0,0),I.globalCompositeOperation="destination-in";let T=I.createLinearGradient(0,0,0,_.height*.16);return T.addColorStop(0,"#0000"),T.addColorStop(1,"#000"),I.fillStyle=T,I.fillRect(0,0,L.width,L.height),L}),l=document.createElement("canvas"),h=document.createElement("canvas");l.className="cloud-flow-canvas",l.setAttribute("aria-hidden","true"),t.append(l),t.classList.add("is-flowing");let c=document.createElement("canvas");c.className="cloud-sand-lens",c.setAttribute("aria-hidden","true"),t.append(c);let u=c.getContext("2d",{willReadFrequently:!0}),d=document.createElement("canvas"),p=0,g=0,x=l.getContext("2d",{alpha:!1,willReadFrequently:!0}),f=h.getContext("2d",{alpha:!1,willReadFrequently:!0}),m=0,y=!1,A=0,v=0,E=scrollY,B=scrollY,R=null,Q=0,M=[],w=-1,b=0,C=null,D=!0,S=()=>r.matches||document.body.classList.contains("motion-off"),P=()=>D&&!document.hidden&&!s.matches&&!n.matches,ne=()=>P()&&i.matches&&!S(),k=()=>S()?0:Math.max(0,Math.min(1,E/Math.max(1,document.documentElement.scrollHeight-innerHeight)));function be(_){if(_===w)return;let U=h.width/innerWidth,L=h.height/innerHeight,I=Math.max(innerHeight*1.65,innerWidth*1.5),T=I*.84,z=I+2*T,V=_*(z-innerHeight),J=I*2/3;f.imageSmoothingEnabled=!1,f.fillStyle="#cfdfeb",f.fillRect(0,0,h.width,h.height);for(let j=0;j<3;j++)f.drawImage(o[j],(innerWidth-J)*.5*U,(T*j-V)*L,J*U,I*L);w=_,C=null,b++}function X(){let _=k(),U=_!==w;be(_),x.imageSmoothingEnabled=!1,U&&x.drawImage(h,0,0);let L=performance.now(),I=l.width/innerWidth,T=l.height/innerHeight;M=M.filter(V=>L-V.time<600);let z=1;if(!S()&&M.length){let V={l:l.width,t:l.height,r:0,b:0};for(let G of M)V.l=Math.min(V.l,(G.x-84)*I),V.r=Math.max(V.r,(G.x+84)*I),V.t=Math.min(V.t,(G.y-84)*T),V.b=Math.max(V.b,(G.y+84)*T);p=Math.max(0,Math.floor(V.l/z)*z),g=Math.max(0,Math.floor(V.t/z)*z);let J=Math.min(l.width,Math.ceil(V.r/z)*z),j=Math.min(l.height,Math.ceil(V.b/z)*z);c.width=Math.max(1,J-p),c.height=Math.max(1,j-g),c.style.cssText="display:block;left:"+p/I+"px;top:"+g/T+"px;width:"+c.width/I+"px;height:"+c.height/T+"px",u.imageSmoothingEnabled=!1,C||(C=new Uint32Array(f.getImageData(0,0,h.width,h.height).data.buffer));let Je=u.createImageData(c.width,c.height),Oi=new Uint32Array(Je.data.buffer);for(let G=g;G<j;G+=z)for(let ae=p;ae<J;ae+=z){let le=0,he=0,Gi=(ae+.5)/I,Wi=(G+.5)/T;for(let ce of M){let Re=Math.hypot(Gi-ce.x,Wi-ce.y)/84;if(Re>=1)continue;let Ke=(L-ce.time)/600,Ze=(1-Re)*(1-Re)*(1-Ke)*(1-Ke);le+=ce.dx*Ze,he+=ce.dy*Ze}if(le=Math.max(-14,Math.min(14,le)),he=Math.max(-14,Math.min(14,he)),Math.abs(le)+Math.abs(he)<.12)continue;let ki=Math.min(z,l.width-ae),Yi=Math.min(z,l.height-G),Hi=Math.max(0,Math.min(h.width-ki,ae-le*I)),Xi=Math.max(0,Math.min(h.height-Yi,G-he*T));Oi[(G-g)*c.width+ae-p]=C[Math.round(Xi)*h.width+Math.round(Hi)]}u.putImageData(Je,0,0)}else c.style.display="none";A++}function N(){cancelAnimationFrame(m),m=0,y=!1,M=[],R=null,E=B=scrollY,P()&&X()}function q(){l.width=h.width=Math.ceil(innerWidth/1.5),l.height=h.height=Math.ceil(innerHeight/1.5),w=-1,N()}function W(){if(m=0,!P()){N();return}y=!0,S()?E=B:E+=(B-E)*.2,Math.abs(B-E)<.1&&(E=B),S()&&(M=[]),X(),M.length||Math.abs(B-E)>.1?m=requestAnimationFrame(W):y=!1}function Z(){!m&&P()&&(m=requestAnimationFrame(W))}document.addEventListener("pointermove",_=>{if(!ne()||_.pointerType==="touch")return;let U=performance.now();if(R&&Math.hypot(_.clientX-R.x,_.clientY-R.y)<240){let L=Math.max(12,Math.min(64,U-Q)),I=Math.max(-7,Math.min(7,(_.clientX-R.x)/L*8)),T=Math.max(-7,Math.min(7,(_.clientY-R.y)/L*8));Math.abs(I)+Math.abs(T)>.05&&(M.push({x:_.clientX,y:_.clientY,dx:I,dy:T,time:U}),M.length>6&&M.shift(),v++,Z())}R={x:_.clientX,y:_.clientY},Q=U},{passive:!0}),addEventListener("scroll",()=>{B=scrollY,S()?N():Z()},{passive:!0}),addEventListener("resize",q),document.documentElement.addEventListener("pointerleave",()=>{R=null}),addEventListener("blur",N),document.addEventListener("visibilitychange",()=>document.hidden?N():q()),addEventListener("pagehide",()=>{N(),D=!1});for(let _ of[i,r,s,n])_.addEventListener("change",N);return document.querySelector(".reduce").addEventListener("click",N),q(),{stop:N,stats:()=>({mode:"canvas-inverse-sampling",backend:"software-webgl-fallback",renderSize:[l.width,l.height],active:y,emissions:v,allowed:ne(),frames:A,scroll:E,progress:k(),sceneIndex:Math.min(2,Math.floor(k()*3)),sources:3,mirrored:!1,looped:!1,maxDisplacement:14,reduced:S(),baseBuilds:b,localPatch:[c.width,c.height]}),signature:()=>{X(),d.width=l.width,d.height=l.height;let _=d.getContext("2d",{willReadFrequently:!0});_.drawImage(l,0,0),M.length&&_.drawImage(c,p,g);let U=_.getImageData(0,0,l.width,l.height).data,L=2166136261;for(let I=0;I<U.length;I+=16)L=Math.imul(L^U[I],16777619);return L>>>0}}}function $(t){let e=t[0],i=t[1],r=t[2];return Math.sqrt(e*e+i*i+r*r)}function ge(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function $e(t,e,i,r){return t[0]=e,t[1]=i,t[2]=r,t}function Ce(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t}function Te(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t}function et(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t[2]=e[2]*i[2],t}function tt(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t[2]=e[2]/i[2],t}function xe(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t}function it(t,e){let i=e[0]-t[0],r=e[1]-t[1],s=e[2]-t[2];return Math.sqrt(i*i+r*r+s*s)}function rt(t,e){let i=e[0]-t[0],r=e[1]-t[1],s=e[2]-t[2];return i*i+r*r+s*s}function _e(t){let e=t[0],i=t[1],r=t[2];return e*e+i*i+r*r}function st(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t}function nt(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t}function me(t,e){let i=e[0],r=e[1],s=e[2],n=i*i+r*r+s*s;return n>0&&(n=1/Math.sqrt(n)),t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t}function Ue(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function Ie(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[0],o=i[1],l=i[2];return t[0]=s*l-n*o,t[1]=n*a-r*l,t[2]=r*o-s*a,t}function at(t,e,i,r){let s=e[0],n=e[1],a=e[2];return t[0]=s+r*(i[0]-s),t[1]=n+r*(i[1]-n),t[2]=a+r*(i[2]-a),t}function ot(t,e,i,r,s){let n=Math.exp(-r*s),a=e[0],o=e[1],l=e[2];return t[0]=i[0]+(a-i[0])*n,t[1]=i[1]+(o-i[1])*n,t[2]=i[2]+(l-i[2])*n,t}function lt(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[3]*r+i[7]*s+i[11]*n+i[15];return a=a||1,t[0]=(i[0]*r+i[4]*s+i[8]*n+i[12])/a,t[1]=(i[1]*r+i[5]*s+i[9]*n+i[13])/a,t[2]=(i[2]*r+i[6]*s+i[10]*n+i[14])/a,t}function ht(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[3]*r+i[7]*s+i[11]*n+i[15];return a=a||1,t[0]=(i[0]*r+i[4]*s+i[8]*n)/a,t[1]=(i[1]*r+i[5]*s+i[9]*n)/a,t[2]=(i[2]*r+i[6]*s+i[10]*n)/a,t}function ct(t,e,i){let r=e[0],s=e[1],n=e[2];return t[0]=r*i[0]+s*i[3]+n*i[6],t[1]=r*i[1]+s*i[4]+n*i[7],t[2]=r*i[2]+s*i[5]+n*i[8],t}function ft(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[0],o=i[1],l=i[2],h=i[3],c=o*n-l*s,u=l*r-a*n,d=a*s-o*r,p=o*d-l*u,g=l*c-a*d,x=a*u-o*c,f=h*2;return c*=f,u*=f,d*=f,p*=2,g*=2,x*=2,t[0]=r+c+p,t[1]=s+u+g,t[2]=n+d+x,t}var ut=(function(){let t=[0,0,0],e=[0,0,0];return function(i,r){ge(t,i),ge(e,r),me(t,t),me(e,e);let s=Ue(t,e);return s>1?0:s<-1?Math.PI:Math.acos(s)}})();function dt(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}var O=class t extends Array{constructor(e=0,i=e,r=e){return super(e,i,r),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this[0]=e}set y(e){this[1]=e}set z(e){this[2]=e}set(e,i=e,r=e){return e.length?this.copy(e):($e(this,e,i,r),this)}copy(e){return ge(this,e),this}add(e,i){return i?Ce(this,e,i):Ce(this,this,e),this}sub(e,i){return i?Te(this,e,i):Te(this,this,e),this}multiply(e){return e.length?et(this,this,e):xe(this,this,e),this}divide(e){return e.length?tt(this,this,e):xe(this,this,1/e),this}inverse(e=this){return nt(this,e),this}len(){return $(this)}distance(e){return e?it(this,e):$(this)}squaredLen(){return _e(this)}squaredDistance(e){return e?rt(this,e):_e(this)}negate(e=this){return st(this,e),this}cross(e,i){return i?Ie(this,e,i):Ie(this,this,e),this}scale(e){return xe(this,this,e),this}normalize(){return me(this,this),this}dot(e){return Ue(this,e)}equals(e){return dt(this,e)}applyMatrix3(e){return ct(this,this,e),this}applyMatrix4(e){return lt(this,this,e),this}scaleRotateMatrix4(e){return ht(this,this,e),this}applyQuaternion(e){return ft(this,this,e),this}angle(e){return ut(this,e)}lerp(e,i){return at(this,this,e,i),this}smoothLerp(e,i,r){return ot(this,this,e,i,r),this}clone(){return new t(this[0],this[1],this[2])}fromArray(e,i=0){return this[0]=e[i],this[1]=e[i+1],this[2]=e[i+2],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e}transformDirection(e){let i=this[0],r=this[1],s=this[2];return this[0]=e[0]*i+e[4]*r+e[8]*s,this[1]=e[1]*i+e[5]*r+e[9]*s,this[2]=e[2]*i+e[6]*r+e[10]*s,this.normalize()}};var gt=new O,Ki=1,Zi=1,mt=!1,Ae=class{constructor(e,i={}){e.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=e,this.attributes=i,this.id=Ki++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state;for(let r in i)this.addAttribute(r,i[r])}addAttribute(e,i){if(this.attributes[e]=i,i.id=Zi++,i.size=i.size||1,i.type=i.type||(i.data.constructor===Float32Array?this.gl.FLOAT:i.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),i.target=e==="index"?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,i.normalized=i.normalized||!1,i.stride=i.stride||0,i.offset=i.offset||0,i.count=i.count||(i.stride?i.data.byteLength/i.stride:i.data.length/i.size),i.divisor=i.instanced||0,i.needsUpdate=!1,i.usage=i.usage||this.gl.STATIC_DRAW,i.buffer||this.updateAttribute(i),i.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==i.count*i.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,i.count*i.divisor);this.instancedCount=i.count*i.divisor}else e==="index"?this.drawRange.count=i.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,i.count))}updateAttribute(e){let i=!e.buffer;i&&(e.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==e.buffer&&(this.gl.bindBuffer(e.target,e.buffer),this.glState.boundBuffer=e.buffer),i?this.gl.bufferData(e.target,e.data,e.usage):this.gl.bufferSubData(e.target,0,e.data),e.needsUpdate=!1}setIndex(e){this.addAttribute("index",e)}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}setInstancedCount(e){this.instancedCount=e}createVAO(e){this.VAOs[e.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),this.bindAttributes(e)}bindAttributes(e){e.attributeLocations.forEach((i,{name:r,type:s})=>{if(!this.attributes[r]){console.warn(`active attribute ${r} not being supplied`);return}let n=this.attributes[r];this.gl.bindBuffer(n.target,n.buffer),this.glState.boundBuffer=n.buffer;let a=1;s===35674&&(a=2),s===35675&&(a=3),s===35676&&(a=4);let o=n.size/a,l=a===1?0:a*a*4,h=a===1?0:a*4;for(let c=0;c<a;c++)this.gl.vertexAttribPointer(i+c,o,n.type,n.normalized,n.stride+l,n.offset+c*h),this.gl.enableVertexAttribArray(i+c),this.gl.renderer.vertexAttribDivisor(i+c,n.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:e,mode:i=this.gl.TRIANGLES}){this.gl.renderer.currentGeometry!==`${this.id}_${e.attributeOrder}`&&(this.VAOs[e.attributeOrder]||this.createVAO(e),this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${e.attributeOrder}`),e.attributeLocations.forEach((s,{name:n})=>{let a=this.attributes[n];a.needsUpdate&&this.updateAttribute(a)});let r=2;this.attributes.index?.type===this.gl.UNSIGNED_INT&&(r=4),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*r,this.instancedCount):this.gl.renderer.drawArraysInstanced(i,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*r):this.gl.drawArrays(i,this.drawRange.start,this.drawRange.count)}getPosition(){let e=this.attributes.position;if(e.data)return e;if(!mt)return console.warn("No position buffer data found to compute bounds"),mt=!0}computeBoundingBox(e){e||(e=this.getPosition());let i=e.data,r=e.size;this.bounds||(this.bounds={min:new O,max:new O,center:new O,scale:new O,radius:1/0});let s=this.bounds.min,n=this.bounds.max,a=this.bounds.center,o=this.bounds.scale;s.set(1/0),n.set(-1/0);for(let l=0,h=i.length;l<h;l+=r){let c=i[l],u=i[l+1],d=i[l+2];s.x=Math.min(c,s.x),s.y=Math.min(u,s.y),s.z=Math.min(d,s.z),n.x=Math.max(c,n.x),n.y=Math.max(u,n.y),n.z=Math.max(d,n.z)}o.sub(n,s),a.add(s,n).divide(2)}computeBoundingSphere(e){e||(e=this.getPosition());let i=e.data,r=e.size;this.bounds||this.computeBoundingBox(e);let s=0;for(let n=0,a=i.length;n<a;n+=r)gt.fromArray(i,n),s=Math.max(s,this.bounds.center.squaredDistance(gt));this.bounds.radius=Math.sqrt(s)}remove(){for(let e in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[e]),delete this.VAOs[e];for(let e in this.attributes)this.gl.deleteBuffer(this.attributes[e].buffer),delete this.attributes[e]}};var ji=1,xt={},ee=class{constructor(e,{vertex:i,fragment:r,uniforms:s={},transparent:n=!1,cullFace:a=e.BACK,frontFace:o=e.CCW,depthTest:l=!0,depthWrite:h=!0,depthFunc:c=e.LEQUAL}={}){e.canvas||console.error("gl not passed as first argument to Program"),this.gl=e,this.uniforms=s,this.id=ji++,i||console.warn("vertex shader not supplied"),r||console.warn("fragment shader not supplied"),this.transparent=n,this.cullFace=a,this.frontFace=o,this.depthTest=l,this.depthWrite=h,this.depthFunc=c,this.blendFunc={},this.blendEquation={},this.stencilFunc={},this.stencilOp={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)),this.vertexShader=e.createShader(e.VERTEX_SHADER),this.fragmentShader=e.createShader(e.FRAGMENT_SHADER),this.program=e.createProgram(),e.attachShader(this.program,this.vertexShader),e.attachShader(this.program,this.fragmentShader),this.setShaders({vertex:i,fragment:r})}setShaders({vertex:e,fragment:i}){if(e&&(this.gl.shaderSource(this.vertexShader,e),this.gl.compileShader(this.vertexShader),this.gl.getShaderInfoLog(this.vertexShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.vertexShader)}
Vertex Shader
${At(e)}`)),i&&(this.gl.shaderSource(this.fragmentShader,i),this.gl.compileShader(this.fragmentShader),this.gl.getShaderInfoLog(this.fragmentShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.fragmentShader)}
Fragment Shader
${At(i)}`)),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS))return console.warn(this.gl.getProgramInfoLog(this.program));this.uniformLocations=new Map;let r=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS);for(let a=0;a<r;a++){let o=this.gl.getActiveUniform(this.program,a);this.uniformLocations.set(o,this.gl.getUniformLocation(this.program,o.name));let l=o.name.match(/(\w+)/g);o.uniformName=l[0],o.nameComponents=l.slice(1)}this.attributeLocations=new Map;let s=[],n=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){let o=this.gl.getActiveAttrib(this.program,a),l=this.gl.getAttribLocation(this.program,o.name);l!==-1&&(s[l]=o.name,this.attributeLocations.set(o,l))}this.attributeOrder=s.join("")}setBlendFunc(e,i,r,s){this.blendFunc.src=e,this.blendFunc.dst=i,this.blendFunc.srcAlpha=r,this.blendFunc.dstAlpha=s,e&&(this.transparent=!0)}setBlendEquation(e,i){this.blendEquation.modeRGB=e,this.blendEquation.modeAlpha=i}setStencilFunc(e,i,r){this.stencilRef=i,this.stencilFunc.func=e,this.stencilFunc.ref=i,this.stencilFunc.mask=r}setStencilOp(e,i,r){this.stencilOp.stencilFail=e,this.stencilOp.depthFail=i,this.stencilOp.depthPass=r}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha),this.stencilFunc.func||this.stencilOp.stencilFail?this.gl.renderer.enable(this.gl.STENCIL_TEST):this.gl.renderer.disable(this.gl.STENCIL_TEST),this.gl.renderer.setStencilFunc(this.stencilFunc.func,this.stencilFunc.ref,this.stencilFunc.mask),this.gl.renderer.setStencilOp(this.stencilOp.stencilFail,this.stencilOp.depthFail,this.stencilOp.depthPass)}use({flipFaces:e=!1}={}){let i=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((s,n)=>{let a=this.uniforms[n.uniformName];for(let o of n.nameComponents){if(!a)break;if(o in a)a=a[o];else{if(Array.isArray(a.value))break;a=void 0;break}}if(!a)return Et(`Active uniform ${n.name} has not been supplied`);if(a&&a.value===void 0)return Et(`${n.name} uniform is missing a value parameter`);if(a.value.texture)return i=i+1,a.value.update(i),De(this.gl,n.type,s,i);if(a.value.length&&a.value[0].texture){let o=[];return a.value.forEach(l=>{i=i+1,l.update(i),o.push(i)}),De(this.gl,n.type,s,o)}De(this.gl,n.type,s,a.value)}),this.applyState(),e&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}};function De(t,e,i,r){r=r.length?$i(r):r;let s=t.renderer.state.uniformLocations.get(i);if(r.length)if(s===void 0||s.length!==r.length)t.renderer.state.uniformLocations.set(i,r.slice(0));else{if(er(s,r))return;s.set?s.set(r):tr(s,r),t.renderer.state.uniformLocations.set(i,s)}else{if(s===r)return;t.renderer.state.uniformLocations.set(i,r)}switch(e){case 5126:return r.length?t.uniform1fv(i,r):t.uniform1f(i,r);case 35664:return t.uniform2fv(i,r);case 35665:return t.uniform3fv(i,r);case 35666:return t.uniform4fv(i,r);case 35670:case 5124:case 35678:case 36306:case 35680:case 36289:return r.length?t.uniform1iv(i,r):t.uniform1i(i,r);case 35671:case 35667:return t.uniform2iv(i,r);case 35672:case 35668:return t.uniform3iv(i,r);case 35673:case 35669:return t.uniform4iv(i,r);case 35674:return t.uniformMatrix2fv(i,!1,r);case 35675:return t.uniformMatrix3fv(i,!1,r);case 35676:return t.uniformMatrix4fv(i,!1,r)}}function At(t){let e=t.split(`
`);for(let i=0;i<e.length;i++)e[i]=i+1+": "+e[i];return e.join(`
`)}function $i(t){let e=t.length,i=t[0].length;if(i===void 0)return t;let r=e*i,s=xt[r];s||(xt[r]=s=new Float32Array(r));for(let n=0;n<e;n++)s.set(t[n],n*i);return s}function er(t,e){if(t.length!==e.length)return!1;for(let i=0,r=t.length;i<r;i++)if(t[i]!==e[i])return!1;return!0}function tr(t,e){for(let i=0,r=t.length;i<r;i++)t[i]=e[i]}var Qe=0;function Et(t){Qe>100||(console.warn(t),Qe++,Qe>100&&console.warn("More than 100 program warnings - stopping logs."))}var Ve=new O,ir=1,fe=class{constructor({canvas:e=document.createElement("canvas"),width:i=300,height:r=150,dpr:s=1,alpha:n=!1,depth:a=!0,stencil:o=!1,antialias:l=!1,premultipliedAlpha:h=!1,preserveDrawingBuffer:c=!1,powerPreference:u="default",autoClear:d=!0,webgl:p=2}={}){let g={alpha:n,depth:a,stencil:o,antialias:l,premultipliedAlpha:h,preserveDrawingBuffer:c,powerPreference:u};this.dpr=s,this.alpha=n,this.color=!0,this.depth=a,this.stencil=o,this.premultipliedAlpha=h,this.autoClear=d,this.id=ir++,p===2&&(this.gl=e.getContext("webgl2",g)),this.isWebgl2=!!this.gl,this.gl||(this.gl=e.getContext("webgl",g)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(i,r),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=!1,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LEQUAL,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(e,i){this.width=e,this.height=i,this.gl.canvas.width=e*this.dpr,this.gl.canvas.height=i*this.dpr,this.gl.canvas.style&&Object.assign(this.gl.canvas.style,{width:e+"px",height:i+"px"})}setViewport(e,i,r=0,s=0){this.state.viewport.width===e&&this.state.viewport.height===i||(this.state.viewport.width=e,this.state.viewport.height=i,this.state.viewport.x=r,this.state.viewport.y=s,this.gl.viewport(r,s,e,i))}setScissor(e,i,r=0,s=0){this.gl.scissor(r,s,e,i)}enable(e){this.state[e]!==!0&&(this.gl.enable(e),this.state[e]=!0)}disable(e){this.state[e]!==!1&&(this.gl.disable(e),this.state[e]=!1)}setBlendFunc(e,i,r,s){this.state.blendFunc.src===e&&this.state.blendFunc.dst===i&&this.state.blendFunc.srcAlpha===r&&this.state.blendFunc.dstAlpha===s||(this.state.blendFunc.src=e,this.state.blendFunc.dst=i,this.state.blendFunc.srcAlpha=r,this.state.blendFunc.dstAlpha=s,r!==void 0?this.gl.blendFuncSeparate(e,i,r,s):this.gl.blendFunc(e,i))}setBlendEquation(e,i){e=e||this.gl.FUNC_ADD,!(this.state.blendEquation.modeRGB===e&&this.state.blendEquation.modeAlpha===i)&&(this.state.blendEquation.modeRGB=e,this.state.blendEquation.modeAlpha=i,i!==void 0?this.gl.blendEquationSeparate(e,i):this.gl.blendEquation(e))}setCullFace(e){this.state.cullFace!==e&&(this.state.cullFace=e,this.gl.cullFace(e))}setFrontFace(e){this.state.frontFace!==e&&(this.state.frontFace=e,this.gl.frontFace(e))}setDepthMask(e){this.state.depthMask!==e&&(this.state.depthMask=e,this.gl.depthMask(e))}setDepthFunc(e){this.state.depthFunc!==e&&(this.state.depthFunc=e,this.gl.depthFunc(e))}setStencilMask(e){this.state.stencilMask!==e&&(this.state.stencilMask=e,this.gl.stencilMask(e))}setStencilFunc(e,i,r){this.state.stencilFunc===e&&this.state.stencilRef===i&&this.state.stencilFuncMask===r||(this.state.stencilFunc=e||this.gl.ALWAYS,this.state.stencilRef=i||0,this.state.stencilFuncMask=r||0,this.gl.stencilFunc(e||this.gl.ALWAYS,i||0,r||0))}setStencilOp(e,i,r){this.state.stencilFail===e&&this.state.stencilDepthFail===i&&this.state.stencilDepthPass===r||(this.state.stencilFail=e,this.state.stencilDepthFail=i,this.state.stencilDepthPass=r,this.gl.stencilOp(e,i,r))}activeTexture(e){this.state.activeTextureUnit!==e&&(this.state.activeTextureUnit=e,this.gl.activeTexture(this.gl.TEXTURE0+e))}bindFramebuffer({target:e=this.gl.FRAMEBUFFER,buffer:i=null}={}){this.state.framebuffer!==i&&(this.state.framebuffer=i,this.gl.bindFramebuffer(e,i))}getExtension(e,i,r){return i&&this.gl[i]?this.gl[i].bind(this.gl):(this.extensions[e]||(this.extensions[e]=this.gl.getExtension(e)),i?this.extensions[e]?this.extensions[e][r].bind(this.extensions[e]):null:this.extensions[e])}sortOpaque(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.program.id!==i.program.id?e.program.id-i.program.id:e.zDepth!==i.zDepth?e.zDepth-i.zDepth:i.id-e.id}sortTransparent(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.zDepth!==i.zDepth?i.zDepth-e.zDepth:i.id-e.id}sortUI(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.program.id!==i.program.id?e.program.id-i.program.id:i.id-e.id}getRenderList({scene:e,camera:i,frustumCull:r,sort:s}){let n=[];if(i&&r&&i.updateFrustum(),e.traverse(a=>{if(!a.visible)return!0;a.draw&&(r&&a.frustumCulled&&i&&!i.frustumIntersectsMesh(a)||n.push(a))}),s){let a=[],o=[],l=[];n.forEach(h=>{h.program.transparent?h.program.depthTest?o.push(h):l.push(h):a.push(h),h.zDepth=0,!(h.renderOrder!==0||!h.program.depthTest||!i)&&(h.worldMatrix.getTranslation(Ve),Ve.applyMatrix4(i.projectionViewMatrix),h.zDepth=Ve.z)}),a.sort(this.sortOpaque),o.sort(this.sortTransparent),l.sort(this.sortUI),n=a.concat(o,l)}return n}render({scene:e,camera:i,target:r=null,update:s=!0,sort:n=!0,frustumCull:a=!0,clear:o}){r===null?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(r),this.setViewport(r.width,r.height)),(o||this.autoClear&&o!==!1)&&(this.depth&&(!r||r.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),(this.stencil||!r||r.stencil)&&(this.enable(this.gl.STENCIL_TEST),this.setStencilMask(255)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),s&&e.updateMatrixWorld(),i&&i.updateMatrixWorld(),this.getRenderList({scene:e,camera:i,frustumCull:a,sort:n}).forEach(h=>{h.draw({camera:i})})}};function vt(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function wt(t,e,i,r,s){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t}function Bt(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i*i+r*r+s*s+n*n;return a>0&&(a=1/Math.sqrt(a)),t[0]=i*a,t[1]=r*a,t[2]=s*a,t[3]=n*a,t}function yt(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]}function Mt(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function Ft(t,e,i){i=i*.5;let r=Math.sin(i);return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=Math.cos(i),t}function ze(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=i[0],l=i[1],h=i[2],c=i[3];return t[0]=r*c+a*o+s*h-n*l,t[1]=s*c+a*l+n*o-r*h,t[2]=n*c+a*h+r*l-s*o,t[3]=a*c-r*o-s*l-n*h,t}function St(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],o=Math.sin(i),l=Math.cos(i);return t[0]=r*l+a*o,t[1]=s*l+n*o,t[2]=n*l-s*o,t[3]=a*l-r*o,t}function bt(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],o=Math.sin(i),l=Math.cos(i);return t[0]=r*l-n*o,t[1]=s*l+a*o,t[2]=n*l+r*o,t[3]=a*l-s*o,t}function Rt(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],o=Math.sin(i),l=Math.cos(i);return t[0]=r*l+s*o,t[1]=s*l-r*o,t[2]=n*l+a*o,t[3]=a*l-n*o,t}function Ct(t,e,i,r){let s=e[0],n=e[1],a=e[2],o=e[3],l=i[0],h=i[1],c=i[2],u=i[3],d,p,g,x,f;return p=s*l+n*h+a*c+o*u,p<0&&(p=-p,l=-l,h=-h,c=-c,u=-u),1-p>1e-6?(d=Math.acos(p),g=Math.sin(d),x=Math.sin((1-r)*d)/g,f=Math.sin(r*d)/g):(x=1-r,f=r),t[0]=x*s+f*l,t[1]=x*n+f*h,t[2]=x*a+f*c,t[3]=x*o+f*u,t}function Tt(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i*i+r*r+s*s+n*n,o=a?1/a:0;return t[0]=-i*o,t[1]=-r*o,t[2]=-s*o,t[3]=n*o,t}function _t(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],t}function Ut(t,e){let i=e[0]+e[4]+e[8],r;if(i>0)r=Math.sqrt(i+1),t[3]=.5*r,r=.5/r,t[0]=(e[5]-e[7])*r,t[1]=(e[6]-e[2])*r,t[2]=(e[1]-e[3])*r;else{let s=0;e[4]>e[0]&&(s=1),e[8]>e[s*3+s]&&(s=2);let n=(s+1)%3,a=(s+2)%3;r=Math.sqrt(e[s*3+s]-e[n*3+n]-e[a*3+a]+1),t[s]=.5*r,r=.5/r,t[3]=(e[n*3+a]-e[a*3+n])*r,t[n]=(e[n*3+s]+e[s*3+n])*r,t[a]=(e[a*3+s]+e[s*3+a])*r}return t}function It(t,e,i="YXZ"){let r=Math.sin(e[0]*.5),s=Math.cos(e[0]*.5),n=Math.sin(e[1]*.5),a=Math.cos(e[1]*.5),o=Math.sin(e[2]*.5),l=Math.cos(e[2]*.5);return i==="XYZ"?(t[0]=r*a*l+s*n*o,t[1]=s*n*l-r*a*o,t[2]=s*a*o+r*n*l,t[3]=s*a*l-r*n*o):i==="YXZ"?(t[0]=r*a*l+s*n*o,t[1]=s*n*l-r*a*o,t[2]=s*a*o-r*n*l,t[3]=s*a*l+r*n*o):i==="ZXY"?(t[0]=r*a*l-s*n*o,t[1]=s*n*l+r*a*o,t[2]=s*a*o+r*n*l,t[3]=s*a*l-r*n*o):i==="ZYX"?(t[0]=r*a*l-s*n*o,t[1]=s*n*l+r*a*o,t[2]=s*a*o-r*n*l,t[3]=s*a*l+r*n*o):i==="YZX"?(t[0]=r*a*l+s*n*o,t[1]=s*n*l+r*a*o,t[2]=s*a*o-r*n*l,t[3]=s*a*l-r*n*o):i==="XZY"&&(t[0]=r*a*l-s*n*o,t[1]=s*n*l-r*a*o,t[2]=s*a*o+r*n*l,t[3]=s*a*l+r*n*o),t}var Dt=vt,Qt=wt;var Vt=yt;var zt=Bt;var Ee=class extends Array{constructor(e=0,i=0,r=0,s=1){super(e,i,r,s),this.onChange=()=>{},this._target=this;let n=["0","1","2","3"];return new Proxy(this,{set(a,o){let l=Reflect.set(...arguments);return l&&n.includes(o)&&a.onChange(),l}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(e){this._target[0]=e,this.onChange()}set y(e){this._target[1]=e,this.onChange()}set z(e){this._target[2]=e,this.onChange()}set w(e){this._target[3]=e,this.onChange()}identity(){return Mt(this._target),this.onChange(),this}set(e,i,r,s){return e.length?this.copy(e):(Qt(this._target,e,i,r,s),this.onChange(),this)}rotateX(e){return St(this._target,this._target,e),this.onChange(),this}rotateY(e){return bt(this._target,this._target,e),this.onChange(),this}rotateZ(e){return Rt(this._target,this._target,e),this.onChange(),this}inverse(e=this._target){return Tt(this._target,e),this.onChange(),this}conjugate(e=this._target){return _t(this._target,e),this.onChange(),this}copy(e){return Dt(this._target,e),this.onChange(),this}normalize(e=this._target){return zt(this._target,e),this.onChange(),this}multiply(e,i){return i?ze(this._target,e,i):ze(this._target,this._target,e),this.onChange(),this}dot(e){return Vt(this._target,e)}fromMatrix3(e){return Ut(this._target,e),this.onChange(),this}fromEuler(e,i){return It(this._target,e,e.order),i||this.onChange(),this}fromAxisAngle(e,i){return Ft(this._target,e,i),this.onChange(),this}slerp(e,i){return Ct(this._target,this._target,e,i),this.onChange(),this}fromArray(e,i=0){return this._target[0]=e[i],this._target[1]=e[i+1],this._target[2]=e[i+2],this._target[3]=e[i+3],this.onChange(),this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e[i+3]=this[3],e}};var nr=1e-6;function Lt(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function Pt(t,e,i,r,s,n,a,o,l,h,c,u,d,p,g,x,f){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t[4]=n,t[5]=a,t[6]=o,t[7]=l,t[8]=h,t[9]=c,t[10]=u,t[11]=d,t[12]=p,t[13]=g,t[14]=x,t[15]=f,t}function Nt(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Ot(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],h=e[7],c=e[8],u=e[9],d=e[10],p=e[11],g=e[12],x=e[13],f=e[14],m=e[15],y=i*o-r*a,A=i*l-s*a,v=i*h-n*a,E=r*l-s*o,B=r*h-n*o,R=s*h-n*l,Q=c*x-u*g,M=c*f-d*g,w=c*m-p*g,b=u*f-d*x,C=u*m-p*x,D=d*m-p*f,S=y*D-A*C+v*b+E*w-B*M+R*Q;return S?(S=1/S,t[0]=(o*D-l*C+h*b)*S,t[1]=(s*C-r*D-n*b)*S,t[2]=(x*R-f*B+m*E)*S,t[3]=(d*B-u*R-p*E)*S,t[4]=(l*w-a*D-h*M)*S,t[5]=(i*D-s*w+n*M)*S,t[6]=(f*v-g*R-m*A)*S,t[7]=(c*R-d*v+p*A)*S,t[8]=(a*C-o*w+h*Q)*S,t[9]=(r*w-i*C-n*Q)*S,t[10]=(g*B-x*v+m*y)*S,t[11]=(u*v-c*B-p*y)*S,t[12]=(o*M-a*b-l*Q)*S,t[13]=(i*b-r*M+s*Q)*S,t[14]=(x*A-g*E-f*y)*S,t[15]=(c*E-u*A+d*y)*S,t):null}function Le(t){let e=t[0],i=t[1],r=t[2],s=t[3],n=t[4],a=t[5],o=t[6],l=t[7],h=t[8],c=t[9],u=t[10],d=t[11],p=t[12],g=t[13],x=t[14],f=t[15],m=e*a-i*n,y=e*o-r*n,A=e*l-s*n,v=i*o-r*a,E=i*l-s*a,B=r*l-s*o,R=h*g-c*p,Q=h*x-u*p,M=h*f-d*p,w=c*x-u*g,b=c*f-d*g,C=u*f-d*x;return m*C-y*b+A*w+v*M-E*Q+B*R}function Pe(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],h=e[6],c=e[7],u=e[8],d=e[9],p=e[10],g=e[11],x=e[12],f=e[13],m=e[14],y=e[15],A=i[0],v=i[1],E=i[2],B=i[3];return t[0]=A*r+v*o+E*u+B*x,t[1]=A*s+v*l+E*d+B*f,t[2]=A*n+v*h+E*p+B*m,t[3]=A*a+v*c+E*g+B*y,A=i[4],v=i[5],E=i[6],B=i[7],t[4]=A*r+v*o+E*u+B*x,t[5]=A*s+v*l+E*d+B*f,t[6]=A*n+v*h+E*p+B*m,t[7]=A*a+v*c+E*g+B*y,A=i[8],v=i[9],E=i[10],B=i[11],t[8]=A*r+v*o+E*u+B*x,t[9]=A*s+v*l+E*d+B*f,t[10]=A*n+v*h+E*p+B*m,t[11]=A*a+v*c+E*g+B*y,A=i[12],v=i[13],E=i[14],B=i[15],t[12]=A*r+v*o+E*u+B*x,t[13]=A*s+v*l+E*d+B*f,t[14]=A*n+v*h+E*p+B*m,t[15]=A*a+v*c+E*g+B*y,t}function Gt(t,e,i){let r=i[0],s=i[1],n=i[2],a,o,l,h,c,u,d,p,g,x,f,m;return e===t?(t[12]=e[0]*r+e[4]*s+e[8]*n+e[12],t[13]=e[1]*r+e[5]*s+e[9]*n+e[13],t[14]=e[2]*r+e[6]*s+e[10]*n+e[14],t[15]=e[3]*r+e[7]*s+e[11]*n+e[15]):(a=e[0],o=e[1],l=e[2],h=e[3],c=e[4],u=e[5],d=e[6],p=e[7],g=e[8],x=e[9],f=e[10],m=e[11],t[0]=a,t[1]=o,t[2]=l,t[3]=h,t[4]=c,t[5]=u,t[6]=d,t[7]=p,t[8]=g,t[9]=x,t[10]=f,t[11]=m,t[12]=a*r+c*s+g*n+e[12],t[13]=o*r+u*s+x*n+e[13],t[14]=l*r+d*s+f*n+e[14],t[15]=h*r+p*s+m*n+e[15]),t}function Wt(t,e,i){let r=i[0],s=i[1],n=i[2];return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t[4]=e[4]*s,t[5]=e[5]*s,t[6]=e[6]*s,t[7]=e[7]*s,t[8]=e[8]*n,t[9]=e[9]*n,t[10]=e[10]*n,t[11]=e[11]*n,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function kt(t,e,i,r){let s=r[0],n=r[1],a=r[2],o=Math.hypot(s,n,a),l,h,c,u,d,p,g,x,f,m,y,A,v,E,B,R,Q,M,w,b,C,D,S,P;return Math.abs(o)<nr?null:(o=1/o,s*=o,n*=o,a*=o,l=Math.sin(i),h=Math.cos(i),c=1-h,u=e[0],d=e[1],p=e[2],g=e[3],x=e[4],f=e[5],m=e[6],y=e[7],A=e[8],v=e[9],E=e[10],B=e[11],R=s*s*c+h,Q=n*s*c+a*l,M=a*s*c-n*l,w=s*n*c-a*l,b=n*n*c+h,C=a*n*c+s*l,D=s*a*c+n*l,S=n*a*c-s*l,P=a*a*c+h,t[0]=u*R+x*Q+A*M,t[1]=d*R+f*Q+v*M,t[2]=p*R+m*Q+E*M,t[3]=g*R+y*Q+B*M,t[4]=u*w+x*b+A*C,t[5]=d*w+f*b+v*C,t[6]=p*w+m*b+E*C,t[7]=g*w+y*b+B*C,t[8]=u*D+x*S+A*P,t[9]=d*D+f*S+v*P,t[10]=p*D+m*S+E*P,t[11]=g*D+y*S+B*P,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t)}function Yt(t,e){return t[0]=e[12],t[1]=e[13],t[2]=e[14],t}function Ne(t,e){let i=e[0],r=e[1],s=e[2],n=e[4],a=e[5],o=e[6],l=e[8],h=e[9],c=e[10];return t[0]=Math.hypot(i,r,s),t[1]=Math.hypot(n,a,o),t[2]=Math.hypot(l,h,c),t}function Ht(t){let e=t[0],i=t[1],r=t[2],s=t[4],n=t[5],a=t[6],o=t[8],l=t[9],h=t[10],c=e*e+i*i+r*r,u=s*s+n*n+a*a,d=o*o+l*l+h*h;return Math.sqrt(Math.max(c,u,d))}var Oe=(function(){let t=[1,1,1];return function(e,i){let r=t;Ne(r,i);let s=1/r[0],n=1/r[1],a=1/r[2],o=i[0]*s,l=i[1]*n,h=i[2]*a,c=i[4]*s,u=i[5]*n,d=i[6]*a,p=i[8]*s,g=i[9]*n,x=i[10]*a,f=o+u+x,m=0;return f>0?(m=Math.sqrt(f+1)*2,e[3]=.25*m,e[0]=(d-g)/m,e[1]=(p-h)/m,e[2]=(l-c)/m):o>u&&o>x?(m=Math.sqrt(1+o-u-x)*2,e[3]=(d-g)/m,e[0]=.25*m,e[1]=(l+c)/m,e[2]=(p+h)/m):u>x?(m=Math.sqrt(1+u-o-x)*2,e[3]=(p-h)/m,e[0]=(l+c)/m,e[1]=.25*m,e[2]=(d+g)/m):(m=Math.sqrt(1+x-o-u)*2,e[3]=(l-c)/m,e[0]=(p+h)/m,e[1]=(d+g)/m,e[2]=.25*m),e}})();function Xt(t,e,i,r){let s=$([t[0],t[1],t[2]]),n=$([t[4],t[5],t[6]]),a=$([t[8],t[9],t[10]]);Le(t)<0&&(s=-s),i[0]=t[12],i[1]=t[13],i[2]=t[14];let l=t.slice(),h=1/s,c=1/n,u=1/a;l[0]*=h,l[1]*=h,l[2]*=h,l[4]*=c,l[5]*=c,l[6]*=c,l[8]*=u,l[9]*=u,l[10]*=u,Oe(e,l),r[0]=s,r[1]=n,r[2]=a}function qt(t,e,i,r){let s=t,n=e[0],a=e[1],o=e[2],l=e[3],h=n+n,c=a+a,u=o+o,d=n*h,p=n*c,g=n*u,x=a*c,f=a*u,m=o*u,y=l*h,A=l*c,v=l*u,E=r[0],B=r[1],R=r[2];return s[0]=(1-(x+m))*E,s[1]=(p+v)*E,s[2]=(g-A)*E,s[3]=0,s[4]=(p-v)*B,s[5]=(1-(d+m))*B,s[6]=(f+y)*B,s[7]=0,s[8]=(g+A)*R,s[9]=(f-y)*R,s[10]=(1-(d+x))*R,s[11]=0,s[12]=i[0],s[13]=i[1],s[14]=i[2],s[15]=1,s}function Jt(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i+i,o=r+r,l=s+s,h=i*a,c=r*a,u=r*o,d=s*a,p=s*o,g=s*l,x=n*a,f=n*o,m=n*l;return t[0]=1-u-g,t[1]=c+m,t[2]=d-f,t[3]=0,t[4]=c-m,t[5]=1-h-g,t[6]=p+x,t[7]=0,t[8]=d+f,t[9]=p-x,t[10]=1-h-u,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Kt(t,e,i,r,s){let n=1/Math.tan(e/2),a=1/(r-s);return t[0]=n/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(s+r)*a,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*s*r*a,t[15]=0,t}function Zt(t,e,i,r,s,n,a){let o=1/(e-i),l=1/(r-s),h=1/(n-a);return t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*l,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*h,t[11]=0,t[12]=(e+i)*o,t[13]=(s+r)*l,t[14]=(a+n)*h,t[15]=1,t}function jt(t,e,i,r){let s=e[0],n=e[1],a=e[2],o=r[0],l=r[1],h=r[2],c=s-i[0],u=n-i[1],d=a-i[2],p=c*c+u*u+d*d;p===0?d=1:(p=1/Math.sqrt(p),c*=p,u*=p,d*=p);let g=l*d-h*u,x=h*c-o*d,f=o*u-l*c;return p=g*g+x*x+f*f,p===0&&(h?o+=1e-6:l?h+=1e-6:l+=1e-6,g=l*d-h*u,x=h*c-o*d,f=o*u-l*c,p=g*g+x*x+f*f),p=1/Math.sqrt(p),g*=p,x*=p,f*=p,t[0]=g,t[1]=x,t[2]=f,t[3]=0,t[4]=u*f-d*x,t[5]=d*g-c*f,t[6]=c*x-u*g,t[7]=0,t[8]=c,t[9]=u,t[10]=d,t[11]=0,t[12]=s,t[13]=n,t[14]=a,t[15]=1,t}function Ge(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t[3]=e[3]+i[3],t[4]=e[4]+i[4],t[5]=e[5]+i[5],t[6]=e[6]+i[6],t[7]=e[7]+i[7],t[8]=e[8]+i[8],t[9]=e[9]+i[9],t[10]=e[10]+i[10],t[11]=e[11]+i[11],t[12]=e[12]+i[12],t[13]=e[13]+i[13],t[14]=e[14]+i[14],t[15]=e[15]+i[15],t}function We(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t[3]=e[3]-i[3],t[4]=e[4]-i[4],t[5]=e[5]-i[5],t[6]=e[6]-i[6],t[7]=e[7]-i[7],t[8]=e[8]-i[8],t[9]=e[9]-i[9],t[10]=e[10]-i[10],t[11]=e[11]-i[11],t[12]=e[12]-i[12],t[13]=e[13]-i[13],t[14]=e[14]-i[14],t[15]=e[15]-i[15],t}function $t(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t[3]=e[3]*i,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*i,t[9]=e[9]*i,t[10]=e[10]*i,t[11]=e[11]*i,t[12]=e[12]*i,t[13]=e[13]*i,t[14]=e[14]*i,t[15]=e[15]*i,t}var Y=class extends Array{constructor(e=1,i=0,r=0,s=0,n=0,a=1,o=0,l=0,h=0,c=0,u=1,d=0,p=0,g=0,x=0,f=1){return super(e,i,r,s,n,a,o,l,h,c,u,d,p,g,x,f),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(e){this[12]=e}set y(e){this[13]=e}set z(e){this[14]=e}set w(e){this[15]=e}set(e,i,r,s,n,a,o,l,h,c,u,d,p,g,x,f){return e.length?this.copy(e):(Pt(this,e,i,r,s,n,a,o,l,h,c,u,d,p,g,x,f),this)}translate(e,i=this){return Gt(this,i,e),this}rotate(e,i,r=this){return kt(this,r,e,i),this}scale(e,i=this){return Wt(this,i,typeof e=="number"?[e,e,e]:e),this}add(e,i){return i?Ge(this,e,i):Ge(this,this,e),this}sub(e,i){return i?We(this,e,i):We(this,this,e),this}multiply(e,i){return e.length?i?Pe(this,e,i):Pe(this,this,e):$t(this,this,e),this}identity(){return Nt(this),this}copy(e){return Lt(this,e),this}fromPerspective({fov:e,aspect:i,near:r,far:s}={}){return Kt(this,e,i,r,s),this}fromOrthogonal({left:e,right:i,bottom:r,top:s,near:n,far:a}){return Zt(this,e,i,r,s,n,a),this}fromQuaternion(e){return Jt(this,e),this}setPosition(e){return this.x=e[0],this.y=e[1],this.z=e[2],this}inverse(e=this){return Ot(this,e),this}compose(e,i,r){return qt(this,e,i,r),this}decompose(e,i,r){return Xt(this,e,i,r),this}getRotation(e){return Oe(e,this),this}getTranslation(e){return Yt(e,this),this}getScaling(e){return Ne(e,this),this}getMaxScaleOnAxis(){return Ht(this)}lookAt(e,i,r){return jt(this,e,i,r),this}determinant(){return Le(this)}fromArray(e,i=0){return this[0]=e[i],this[1]=e[i+1],this[2]=e[i+2],this[3]=e[i+3],this[4]=e[i+4],this[5]=e[i+5],this[6]=e[i+6],this[7]=e[i+7],this[8]=e[i+8],this[9]=e[i+9],this[10]=e[i+10],this[11]=e[i+11],this[12]=e[i+12],this[13]=e[i+13],this[14]=e[i+14],this[15]=e[i+15],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e[i+3]=this[3],e[i+4]=this[4],e[i+5]=this[5],e[i+6]=this[6],e[i+7]=this[7],e[i+8]=this[8],e[i+9]=this[9],e[i+10]=this[10],e[i+11]=this[11],e[i+12]=this[12],e[i+13]=this[13],e[i+14]=this[14],e[i+15]=this[15],e}};function ei(t,e,i="YXZ"){return i==="XYZ"?(t[1]=Math.asin(Math.min(Math.max(e[8],-1),1)),Math.abs(e[8])<.99999?(t[0]=Math.atan2(-e[9],e[10]),t[2]=Math.atan2(-e[4],e[0])):(t[0]=Math.atan2(e[6],e[5]),t[2]=0)):i==="YXZ"?(t[0]=Math.asin(-Math.min(Math.max(e[9],-1),1)),Math.abs(e[9])<.99999?(t[1]=Math.atan2(e[8],e[10]),t[2]=Math.atan2(e[1],e[5])):(t[1]=Math.atan2(-e[2],e[0]),t[2]=0)):i==="ZXY"?(t[0]=Math.asin(Math.min(Math.max(e[6],-1),1)),Math.abs(e[6])<.99999?(t[1]=Math.atan2(-e[2],e[10]),t[2]=Math.atan2(-e[4],e[5])):(t[1]=0,t[2]=Math.atan2(e[1],e[0]))):i==="ZYX"?(t[1]=Math.asin(-Math.min(Math.max(e[2],-1),1)),Math.abs(e[2])<.99999?(t[0]=Math.atan2(e[6],e[10]),t[2]=Math.atan2(e[1],e[0])):(t[0]=0,t[2]=Math.atan2(-e[4],e[5]))):i==="YZX"?(t[2]=Math.asin(Math.min(Math.max(e[1],-1),1)),Math.abs(e[1])<.99999?(t[0]=Math.atan2(-e[9],e[5]),t[1]=Math.atan2(-e[2],e[0])):(t[0]=0,t[1]=Math.atan2(e[8],e[10]))):i==="XZY"&&(t[2]=Math.asin(-Math.min(Math.max(e[4],-1),1)),Math.abs(e[4])<.99999?(t[0]=Math.atan2(e[6],e[5]),t[1]=Math.atan2(e[8],e[0])):(t[0]=Math.atan2(-e[9],e[10]),t[1]=0)),t}var ti=new Y,ve=class extends Array{constructor(e=0,i=e,r=e,s="YXZ"){super(e,i,r),this.order=s,this.onChange=()=>{},this._target=this;let n=["0","1","2"];return new Proxy(this,{set(a,o){let l=Reflect.set(...arguments);return l&&n.includes(o)&&a.onChange(),l}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this._target[0]=e,this.onChange()}set y(e){this._target[1]=e,this.onChange()}set z(e){this._target[2]=e,this.onChange()}set(e,i=e,r=e){return e.length?this.copy(e):(this._target[0]=e,this._target[1]=i,this._target[2]=r,this.onChange(),this)}copy(e){return this._target[0]=e[0],this._target[1]=e[1],this._target[2]=e[2],this.onChange(),this}reorder(e){return this._target.order=e,this.onChange(),this}fromRotationMatrix(e,i=this.order){return ei(this._target,e,i),this.onChange(),this}fromQuaternion(e,i=this.order,r){return ti.fromQuaternion(e),this._target.fromRotationMatrix(ti,i),r||this.onChange(),this}fromArray(e,i=0){return this._target[0]=e[i],this._target[1]=e[i+1],this._target[2]=e[i+2],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e}};var we=class{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new Y,this.worldMatrix=new Y,this.matrixAutoUpdate=!0,this.worldMatrixNeedsUpdate=!1,this.position=new O,this.quaternion=new Ee,this.scale=new O(1),this.rotation=new ve,this.up=new O(0,1,0),this.rotation._target.onChange=()=>this.quaternion.fromEuler(this.rotation,!0),this.quaternion._target.onChange=()=>this.rotation.fromQuaternion(this.quaternion,void 0,!0)}setParent(e,i=!0){this.parent&&e!==this.parent&&this.parent.removeChild(this,!1),this.parent=e,i&&e&&e.addChild(this,!1)}addChild(e,i=!0){~this.children.indexOf(e)||this.children.push(e),i&&e.setParent(this,!1)}removeChild(e,i=!0){~this.children.indexOf(e)&&this.children.splice(this.children.indexOf(e),1),i&&e.setParent(null,!1)}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||e)&&(this.parent===null?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,e=!0);for(let i=0,r=this.children.length;i<r;i++)this.children[i].updateMatrixWorld(e)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(e){if(!e(this))for(let i=0,r=this.children.length;i<r;i++)this.children[i].traverse(e)}decompose(){this.matrix.decompose(this.quaternion._target,this.position,this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(e,i=!1){i?this.matrix.lookAt(this.position,e,this.up):this.matrix.lookAt(e,this.position,this.up),this.matrix.getRotation(this.quaternion._target),this.rotation.fromQuaternion(this.quaternion)}};function ii(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[4],t[4]=e[5],t[5]=e[6],t[6]=e[8],t[7]=e[9],t[8]=e[10],t}function ri(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i+i,o=r+r,l=s+s,h=i*a,c=r*a,u=r*o,d=s*a,p=s*o,g=s*l,x=n*a,f=n*o,m=n*l;return t[0]=1-u-g,t[3]=c-m,t[6]=d+f,t[1]=c+m,t[4]=1-h-g,t[7]=p-x,t[2]=d-f,t[5]=p+x,t[8]=1-h-u,t}function si(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function ni(t,e,i,r,s,n,a,o,l,h){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t[4]=n,t[5]=a,t[6]=o,t[7]=l,t[8]=h,t}function ai(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function oi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],h=e[7],c=e[8],u=c*a-o*h,d=-c*n+o*l,p=h*n-a*l,g=i*u+r*d+s*p;return g?(g=1/g,t[0]=u*g,t[1]=(-c*r+s*h)*g,t[2]=(o*r-s*a)*g,t[3]=d*g,t[4]=(c*i-s*l)*g,t[5]=(-o*i+s*n)*g,t[6]=p*g,t[7]=(-h*i+r*l)*g,t[8]=(a*i-r*n)*g,t):null}function ke(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],h=e[6],c=e[7],u=e[8],d=i[0],p=i[1],g=i[2],x=i[3],f=i[4],m=i[5],y=i[6],A=i[7],v=i[8];return t[0]=d*r+p*a+g*h,t[1]=d*s+p*o+g*c,t[2]=d*n+p*l+g*u,t[3]=x*r+f*a+m*h,t[4]=x*s+f*o+m*c,t[5]=x*n+f*l+m*u,t[6]=y*r+A*a+v*h,t[7]=y*s+A*o+v*c,t[8]=y*n+A*l+v*u,t}function li(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],h=e[6],c=e[7],u=e[8],d=i[0],p=i[1];return t[0]=r,t[1]=s,t[2]=n,t[3]=a,t[4]=o,t[5]=l,t[6]=d*r+p*a+h,t[7]=d*s+p*o+c,t[8]=d*n+p*l+u,t}function hi(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],h=e[6],c=e[7],u=e[8],d=Math.sin(i),p=Math.cos(i);return t[0]=p*r+d*a,t[1]=p*s+d*o,t[2]=p*n+d*l,t[3]=p*a-d*r,t[4]=p*o-d*s,t[5]=p*l-d*n,t[6]=h,t[7]=c,t[8]=u,t}function ci(t,e,i){let r=i[0],s=i[1];return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=s*e[3],t[4]=s*e[4],t[5]=s*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function fi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],h=e[7],c=e[8],u=e[9],d=e[10],p=e[11],g=e[12],x=e[13],f=e[14],m=e[15],y=i*o-r*a,A=i*l-s*a,v=i*h-n*a,E=r*l-s*o,B=r*h-n*o,R=s*h-n*l,Q=c*x-u*g,M=c*f-d*g,w=c*m-p*g,b=u*f-d*x,C=u*m-p*x,D=d*m-p*f,S=y*D-A*C+v*b+E*w-B*M+R*Q;return S?(S=1/S,t[0]=(o*D-l*C+h*b)*S,t[1]=(l*w-a*D-h*M)*S,t[2]=(a*C-o*w+h*Q)*S,t[3]=(s*C-r*D-n*b)*S,t[4]=(i*D-s*w+n*M)*S,t[5]=(r*w-i*C-n*Q)*S,t[6]=(x*R-f*B+m*E)*S,t[7]=(f*v-g*R-m*A)*S,t[8]=(g*B-x*v+m*y)*S,t):null}var Be=class extends Array{constructor(e=1,i=0,r=0,s=0,n=1,a=0,o=0,l=0,h=1){return super(e,i,r,s,n,a,o,l,h),this}set(e,i,r,s,n,a,o,l,h){return e.length?this.copy(e):(ni(this,e,i,r,s,n,a,o,l,h),this)}translate(e,i=this){return li(this,i,e),this}rotate(e,i=this){return hi(this,i,e),this}scale(e,i=this){return ci(this,i,e),this}multiply(e,i){return i?ke(this,e,i):ke(this,this,e),this}identity(){return ai(this),this}copy(e){return si(this,e),this}fromMatrix4(e){return ii(this,e),this}fromQuaternion(e){return ri(this,e),this}fromBasis(e,i,r){return this.set(e[0],e[1],e[2],i[0],i[1],i[2],r[0],r[1],r[2]),this}inverse(e=this){return oi(this,e),this}getNormalMatrix(e){return fi(this,e),this}};var hr=0,te=class extends we{constructor(e,{geometry:i,program:r,mode:s=e.TRIANGLES,frustumCulled:n=!0,renderOrder:a=0}={}){super(),e.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=e,this.id=hr++,this.geometry=i,this.program=r,this.mode=s,this.frustumCulled=n,this.renderOrder=a,this.modelViewMatrix=new Y,this.normalMatrix=new Be,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),this}onAfterRender(e){return this.afterRenderCallbacks.push(e),this}draw({camera:e}={}){e&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=e.projectionMatrix,this.program.uniforms.cameraPosition.value=e.worldPosition,this.program.uniforms.viewMatrix.value=e.viewMatrix,this.modelViewMatrix.multiply(e.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix),this.beforeRenderCallbacks.forEach(r=>r&&r({mesh:this,camera:e}));let i=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:i}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(r=>r&&r({mesh:this,camera:e}))}};var ui=new Uint8Array(4);function di(t){return(t&t-1)===0}var cr=1,K=class{constructor(e,{image:i,target:r=e.TEXTURE_2D,type:s=e.UNSIGNED_BYTE,format:n=e.RGBA,internalFormat:a=n,wrapS:o=e.CLAMP_TO_EDGE,wrapT:l=e.CLAMP_TO_EDGE,wrapR:h=e.CLAMP_TO_EDGE,generateMipmaps:c=r===(e.TEXTURE_2D||e.TEXTURE_CUBE_MAP),minFilter:u=c?e.NEAREST_MIPMAP_LINEAR:e.LINEAR,magFilter:d=e.LINEAR,premultiplyAlpha:p=!1,unpackAlignment:g=4,flipY:x=r==(e.TEXTURE_2D||e.TEXTURE_3D),anisotropy:f=0,level:m=0,width:y,height:A=y,length:v=1}={}){this.gl=e,this.id=cr++,this.image=i,this.target=r,this.type=s,this.format=n,this.internalFormat=a,this.minFilter=u,this.magFilter=d,this.wrapS=o,this.wrapT=l,this.wrapR=h,this.generateMipmaps=c,this.premultiplyAlpha=p,this.unpackAlignment=g,this.flipY=x,this.anisotropy=Math.min(f,this.gl.renderer.parameters.maxAnisotropy),this.level=m,this.width=y,this.height=A,this.length=v,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}bind(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}update(e=0){let i=!(this.image===this.store.image&&!this.needsUpdate);if((i||this.glState.textureUnits[e]!==this.id)&&(this.gl.renderer.activeTexture(e),this.bind()),!!i){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.wrapR!==this.state.wrapR&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_R,this.wrapR),this.state.wrapR=this.wrapR),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(let r=0;r<6;r++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+r,this.level,this.internalFormat,this.format,this.type,this.image[r]);else if(ArrayBuffer.isView(this.image))this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image):(this.target===this.gl.TEXTURE_2D_ARRAY||this.target===this.gl.TEXTURE_3D)&&this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(let r=0;r<this.image.length;r++)this.gl.compressedTexImage2D(this.target,r,this.internalFormat,this.image[r].width,this.image[r].height,0,this.image[r].data);else this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);this.generateMipmaps&&(!this.gl.renderer.isWebgl2&&(!di(this.image.width)||!di(this.image.height))?(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR):this.gl.generateMipmap(this.target)),this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(let r=0;r<6;r++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,ui);else this.width?this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,ui);this.store.image=this.image}}};var ue=class{constructor(e,{width:i=e.canvas.width,height:r=e.canvas.height,target:s=e.FRAMEBUFFER,color:n=1,depth:a=!0,stencil:o=!1,depthTexture:l=!1,wrapS:h=e.CLAMP_TO_EDGE,wrapT:c=e.CLAMP_TO_EDGE,wrapR:u=e.CLAMP_TO_EDGE,minFilter:d=e.LINEAR,magFilter:p=d,type:g=e.UNSIGNED_BYTE,format:x=e.RGBA,internalFormat:f=x,unpackAlignment:m,premultiplyAlpha:y}={}){this.gl=e,this.width=i,this.height=r,this.depth=a,this.stencil=o,this.buffer=this.gl.createFramebuffer(),this.target=s,this.gl.renderer.bindFramebuffer(this),this.textures=[];let A=[];for(let v=0;v<n;v++)this.textures.push(new K(e,{width:i,height:r,wrapS:h,wrapT:c,wrapR:u,minFilter:d,magFilter:p,type:g,format:x,internalFormat:f,unpackAlignment:m,premultiplyAlpha:y,flipY:!1,generateMipmaps:!1})),this.textures[v].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+v,this.gl.TEXTURE_2D,this.textures[v].texture,0),A.push(this.gl.COLOR_ATTACHMENT0+v);A.length>1&&this.gl.renderer.drawBuffers(A),this.texture=this.textures[0],l&&(this.gl.renderer.isWebgl2||this.gl.renderer.getExtension("WEBGL_depth_texture"))?(this.depthTexture=new K(e,{width:i,height:r,minFilter:this.gl.NEAREST,magFilter:this.gl.NEAREST,format:this.stencil?this.gl.DEPTH_STENCIL:this.gl.DEPTH_COMPONENT,internalFormat:e.renderer.isWebgl2?this.stencil?this.gl.DEPTH24_STENCIL8:this.gl.DEPTH_COMPONENT16:this.gl.DEPTH_COMPONENT,type:this.stencil?this.gl.UNSIGNED_INT_24_8:this.gl.UNSIGNED_INT}),this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.stencil?this.gl.DEPTH_STENCIL_ATTACHMENT:this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(a&&!o&&(this.depthBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,this.depthBuffer)),o&&!a&&(this.stencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.stencilBuffer)),a&&o&&(this.depthStencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.depthStencilBuffer))),this.gl.renderer.bindFramebuffer({target:this.target})}setSize(e,i){if(!(this.width===e&&this.height===i)){this.width=e,this.height=i,this.gl.renderer.bindFramebuffer(this);for(let r=0;r<this.textures.length;r++)this.textures[r].width=e,this.textures[r].height=i,this.textures[r].needsUpdate=!0,this.textures[r].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+r,this.gl.TEXTURE_2D,this.textures[r].texture,0);this.depthTexture?(this.depthTexture.width=e,this.depthTexture.height=i,this.depthTexture.needsUpdate=!0,this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(this.depthBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,i)),this.stencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,e,i)),this.depthStencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,e,i))),this.gl.renderer.bindFramebuffer({target:this.target})}}};function pi(t,e){return t[0]=e[0],t[1]=e[1],t}function gi(t,e,i){return t[0]=e,t[1]=i,t}function Ye(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t}function He(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t}function mi(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t}function xi(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t}function ye(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t}function Ai(t,e){var i=e[0]-t[0],r=e[1]-t[1];return Math.sqrt(i*i+r*r)}function Ei(t,e){var i=e[0]-t[0],r=e[1]-t[1];return i*i+r*r}function Xe(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)}function vi(t){var e=t[0],i=t[1];return e*e+i*i}function wi(t,e){return t[0]=-e[0],t[1]=-e[1],t}function Bi(t,e){return t[0]=1/e[0],t[1]=1/e[1],t}function yi(t,e){var i=e[0],r=e[1],s=i*i+r*r;return s>0&&(s=1/Math.sqrt(s)),t[0]=e[0]*s,t[1]=e[1]*s,t}function Mi(t,e){return t[0]*e[0]+t[1]*e[1]}function qe(t,e){return t[0]*e[1]-t[1]*e[0]}function Fi(t,e,i,r){var s=e[0],n=e[1];return t[0]=s+r*(i[0]-s),t[1]=n+r*(i[1]-n),t}function Si(t,e,i,r,s){let n=Math.exp(-r*s),a=e[0],o=e[1];return t[0]=i[0]+(a-i[0])*n,t[1]=i[1]+(o-i[1])*n,t}function bi(t,e,i){var r=e[0],s=e[1];return t[0]=i[0]*r+i[3]*s+i[6],t[1]=i[1]*r+i[4]*s+i[7],t}function Ri(t,e,i){let r=e[0],s=e[1];return t[0]=i[0]*r+i[4]*s+i[12],t[1]=i[1]*r+i[5]*s+i[13],t}function Ci(t,e){return t[0]===e[0]&&t[1]===e[1]}var H=class t extends Array{constructor(e=0,i=e){return super(e,i),this}get x(){return this[0]}get y(){return this[1]}set x(e){this[0]=e}set y(e){this[1]=e}set(e,i=e){return e.length?this.copy(e):(gi(this,e,i),this)}copy(e){return pi(this,e),this}add(e,i){return i?Ye(this,e,i):Ye(this,this,e),this}sub(e,i){return i?He(this,e,i):He(this,this,e),this}multiply(e){return e.length?mi(this,this,e):ye(this,this,e),this}divide(e){return e.length?xi(this,this,e):ye(this,this,1/e),this}inverse(e=this){return Bi(this,e),this}len(){return Xe(this)}distance(e){return e?Ai(this,e):Xe(this)}squaredLen(){return this.squaredDistance()}squaredDistance(e){return e?Ei(this,e):vi(this)}negate(e=this){return wi(this,e),this}cross(e,i){return i?qe(e,i):qe(this,e)}scale(e){return ye(this,this,e),this}normalize(){return yi(this,this),this}dot(e){return Mi(this,e)}equals(e){return Ci(this,e)}applyMatrix3(e){return bi(this,this,e),this}applyMatrix4(e){return Ri(this,this,e),this}lerp(e,i){return Fi(this,this,e,i),this}smoothLerp(e,i,r){return Si(this,this,e,i,r),this}clone(){return new t(this[0],this[1])}fromArray(e,i=0){return this[0]=e[i],this[1]=e[i+1],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e}};var ie=class extends Ae{constructor(e,{attributes:i={}}={}){Object.assign(i,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(e,i)}};var de=class{constructor(e,{size:i=128,falloff:r=.3,alpha:s=1,dissipation:n=.98,type:a}={}){let o=this;this.gl=e,this.uniform={value:null},this.mask={read:null,write:null,swap:()=>{let c=o.mask.read;o.mask.read=o.mask.write,o.mask.write=c,o.uniform.value=o.mask.read.texture}},l(),this.aspect=1,this.mouse=new H,this.velocity=new H,this.mesh=h();function l(){a||(a=e.HALF_FLOAT||e.renderer.extensions.OES_texture_half_float.HALF_FLOAT_OES);let c=e.renderer.isWebgl2||e.renderer.extensions[`OES_texture_${a===e.FLOAT?"":"half_"}float_linear`]?e.LINEAR:e.NEAREST,u={width:i,height:i,type:a,format:e.RGBA,internalFormat:e.renderer.isWebgl2?a===e.FLOAT?e.RGBA32F:e.RGBA16F:e.RGBA,minFilter:c,depth:!1};o.mask.read=new ue(e,u),o.mask.write=new ue(e,u),o.mask.swap()}function h(){return new te(e,{geometry:new ie(e),program:new ee(e,{vertex:ur,fragment:dr,uniforms:{tMap:o.uniform,uFalloff:{value:r*.5},uAlpha:{value:s},uDissipation:{value:n},uAspect:{value:1},uMouse:{value:o.mouse},uVelocity:{value:o.velocity}},depthTest:!1})})}}update(){this.mesh.program.uniforms.uAspect.value=this.aspect,this.gl.renderer.render({scene:this.mesh,target:this.mask.write,clear:!1}),this.mask.swap()}},ur=`
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`,dr=`
    precision highp float;

    uniform sampler2D tMap;

    uniform float uFalloff;
    uniform float uAlpha;
    uniform float uDissipation;
    
    uniform float uAspect;
    uniform vec2 uMouse;
    uniform vec2 uVelocity;

    varying vec2 vUv;

    void main() {
        vec4 color = texture2D(tMap, vUv) * uDissipation;

        vec2 cursor = vUv - uMouse;
        cursor.x *= uAspect;

        vec3 stamp = vec3(uVelocity * vec2(1, -1), 1.0 - pow(1.0 - min(1.0, length(uVelocity)), 3.0));
        float falloff = smoothstep(uFalloff, 0.0, length(cursor)) * uAlpha;

        color.rgb = mix(color.rgb, stamp, vec3(falloff));

        gl_FragColor = color;
    }
`;var pr="attribute vec2 uv;attribute vec2 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}",gr=`precision highp float;
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
}`;async function Ti(t,e){let i=matchMedia("(hover:hover) and (pointer:fine)"),r=matchMedia("(prefers-reduced-motion:reduce)"),s=matchMedia("(prefers-reduced-transparency:reduce)"),n=matchMedia("(forced-colors:active)"),a,o,l,h,c,u=0,d=0,p=0,g=!1,x=scrollY,f=scrollY,m=null,y=0,A=0,v=!1,E=new H,B=()=>r.matches||document.body.classList.contains("motion-off"),R=()=>!document.hidden&&!s.matches&&!n.matches&&!v,Q=()=>R()&&i.matches&&!B();try{let X=function(){for(let T of[l.mask.read,l.mask.write])a.bindFramebuffer(T),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT);a.bindFramebuffer()},q=function(){return Math.max(0,Math.min(1,x/Math.max(1,document.documentElement.scrollHeight-innerHeight)))},W=function(){h.uniforms.uProgress.value=B()?0:q(),h.uniforms.uForce.value=B()?0:1,a.render({scene:c}),d++},Z=function(){a.setSize(Math.ceil(innerWidth/1.5),Math.ceil(innerHeight/1.5)),h.uniforms.uSize.value.set(innerWidth,innerHeight),l.aspect=innerWidth/innerHeight,m=null,X(),A=0,x=f=scrollY,W()},_=function(){E.set(0),l.velocity.set(0),l.mouse.set(-1),A=0,m=null,X()},U=function(){cancelAnimationFrame(u),u=0,g=!1,_(),x=f=scrollY,R()&&W()},L=function(){if(u=0,!R()){U();return}if(g=!0,performance.now()-y>65&&E.set(0),B()){x=f,_(),W(),g=!1;return}x+=(f-x)*.18,Math.abs(f-x)<.1&&(x=f),l.velocity.lerp(E,.25),E.multiply(.72),A=Math.max(A*.9,l.velocity.len()),l.update(),W(),A>.001||l.velocity.len()>.001||Math.abs(f-x)>.1?u=requestAnimationFrame(L):(_(),W(),g=!1)},I=function(){!u&&R()&&(u=requestAnimationFrame(L))};var M=X,w=q,b=W,C=Z,D=_,S=U,P=L,ne=I;if(a=new fe({dpr:1,alpha:!1,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1}),o=a.gl,!o)throw new Error("Cloud WebGL unavailable");let k=o.getExtension("WEBGL_debug_renderer_info"),be=k?o.getParameter(k.UNMASKED_RENDERER_WEBGL):"";if(!window.PAPER_FORCE_WEBGL&&/SwiftShader|llvmpipe|softpipe|software rasterizer/i.test(be))return o.getExtension("WEBGL_lose_context")?.loseContext(),await je(t,e);o.getExtension("EXT_color_buffer_float"),l=new de(o,{size:64,falloff:.32,alpha:.4,dissipation:.9}),X();let N=[];for(let T of e){let z=new K(o,{minFilter:o.NEAREST,magFilter:o.NEAREST,generateMipmaps:!1,flipY:!1}),V=new Image;V.src=T,await V.decode(),z.image=V,N.push(z)}return h=new ee(o,{vertex:pr,fragment:gr,depthTest:!1,depthWrite:!1,uniforms:{tCloudA:{value:N[0]},tCloudB:{value:N[1]},tCloudC:{value:N[2]},tFlow:l.uniform,uSize:{value:new H(innerWidth,innerHeight)},uProgress:{value:0},uForce:{value:1}}}),c=new te(o,{geometry:new ie(o),program:h}),o.canvas.className="cloud-flow-canvas",o.canvas.setAttribute("aria-hidden","true"),t.append(o.canvas),t.classList.add("is-flowing"),document.addEventListener("pointermove",T=>{if(!Q()||T.pointerType==="touch")return;let z=performance.now();if(l.mouse.set(T.clientX/innerWidth,1-T.clientY/innerHeight),m&&Math.hypot(T.clientX-m.x,T.clientY-m.y)<240){let V=Math.min(64,Math.max(12,z-y));E.set((T.clientX-m.x)/V*.3,(T.clientY-m.y)/V*.3);let J=E.len();J>.65&&E.multiply(.65/J),A=Math.max(.06,E.len()),p++,I()}m={x:T.clientX,y:T.clientY},y=z},{passive:!0}),window.addEventListener("scroll",()=>{f=scrollY,I()},{passive:!0}),window.addEventListener("resize",()=>{U(),Z()}),document.documentElement.addEventListener("pointerleave",()=>{m=null,E.set(0),I()}),document.addEventListener("visibilitychange",()=>{document.hidden?U():(Z(),I())}),window.addEventListener("blur",U),window.addEventListener("pagehide",U),r.addEventListener("change",U),i.addEventListener("change",U),s.addEventListener("change",U),n.addEventListener("change",U),document.querySelector(".reduce").addEventListener("click",U),o.canvas.addEventListener("webglcontextlost",T=>{T.preventDefault(),v=!0,cancelAnimationFrame(u),u=0,g=!1,t.classList.remove("is-flowing")}),o.canvas.addEventListener("webglcontextrestored",()=>{t.classList.remove("is-flowing")}),Z(),{stop:U,stats:()=>({mode:"ogl-flowmap",renderSize:[o.drawingBufferWidth,o.drawingBufferHeight],flowSize:64,active:g,emissions:p,allowed:Q(),frames:d,scroll:x,progress:B()?0:q(),sceneIndex:Math.min(2,Math.floor(q()*3)),sources:3,mirrored:!1,looped:!1,maxDisplacement:14,reduced:B(),contextLost:v}),signature:()=>{W();let T=new Uint8Array(o.drawingBufferWidth*o.drawingBufferHeight*4);o.readPixels(0,0,o.drawingBufferWidth,o.drawingBufferHeight,o.RGBA,o.UNSIGNED_BYTE,T);let z=2166136261;for(let V=0;V<T.length;V+=16)z=Math.imul(z^T[V],16777619);return z>>>0}}}catch(k){return console.warn("Cloud flow fallback:",k.message),t.classList.remove("is-flowing"),{stop:()=>{},stats:()=>({mode:"static-fallback",active:!1,error:k.message})}}}var _i=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`;var Ui=1920*1080*4,re=class{constructor(e,i,r,s,n=0,a=0,o=2,l=Ui,h=[]){F(this,"parentElement");F(this,"canvasElement");F(this,"gl");F(this,"program",null);F(this,"uniformLocations",{});F(this,"fragmentShader");F(this,"rafId",null);F(this,"lastRenderTime",0);F(this,"currentFrame",0);F(this,"speed",0);F(this,"currentSpeed",0);F(this,"providedUniforms");F(this,"mipmaps",[]);F(this,"hasBeenDisposed",!1);F(this,"resolutionChanged",!0);F(this,"textures",new Map);F(this,"minPixelRatio");F(this,"maxPixelCount");F(this,"isSafari",Ar());F(this,"uniformCache",{});F(this,"textureUnitMap",new Map);F(this,"ownerDocument");F(this,"initProgram",()=>{let e=mr(this.gl,_i,this.fragmentShader);e&&(this.program=e)});F(this,"setupPositionAttribute",()=>{let e=this.gl.getAttribLocation(this.program,"a_position"),i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i);let r=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(r),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)});F(this,"setupUniforms",()=>{let e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([i,r])=>{if(e[i]=this.gl.getUniformLocation(this.program,i),r instanceof HTMLImageElement){let s=`${i}AspectRatio`;e[s]=this.gl.getUniformLocation(this.program,s)}}),this.uniformLocations=e});F(this,"renderScale",1);F(this,"parentWidth",0);F(this,"parentHeight",0);F(this,"parentDevicePixelWidth",0);F(this,"parentDevicePixelHeight",0);F(this,"devicePixelsSupported",!1);F(this,"intersectionObserver",null);F(this,"isInViewport",!0);F(this,"resizeObserver",null);F(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let i=e.devicePixelContentBoxSize?.[0];i!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=i.inlineSize,this.parentDevicePixelHeight=i.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});F(this,"setupIntersectionObserver",()=>{let e=this.ownerDocument.defaultView;e?.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([i])=>{this.isInViewport=i?.isIntersecting??!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))});F(this,"handleVisualViewportChange",()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()});F(this,"handleResize",()=>{let e=0,i=0,r=Math.max(1,window.devicePixelRatio),s=visualViewport?.scale??1;if(this.devicePixelsSupported){let c=Math.max(1,this.minPixelRatio/r);e=this.parentDevicePixelWidth*c*s,i=this.parentDevicePixelHeight*c*s}else{let c=Math.max(r,this.minPixelRatio)*s;if(this.isSafari){let u=Er(this.ownerDocument);c*=Math.max(1,u)}e=Math.round(this.parentWidth)*c,i=Math.round(this.parentHeight)*c}let n=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*i),a=Math.min(1,n),o=Math.round(e*a),l=Math.round(i*a),h=o/Math.round(this.parentWidth);(this.canvasElement.width!==o||this.canvasElement.height!==l||this.renderScale!==h)&&(this.renderScale=h,this.canvasElement.width=o,this.canvasElement.height=l,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});F(this,"render",e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}let i=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=i*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});F(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});F(this,"setTextureUniform",(e,i)=>{if(!i.complete||i.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let r=this.textures.get(e);r&&this.gl.deleteTexture(r),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let s=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+s);let n=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,n),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||n===null){console.error("Paper Shaders: WebGL error when uploading texture:",a);return}this.textures.set(e,n);let o=this.uniformLocations[e];if(o){this.gl.uniform1i(o,s);let l=`${e}AspectRatio`,h=this.uniformLocations[l];if(h){let c=i.naturalWidth/i.naturalHeight;this.gl.uniform1f(h,c)}}});F(this,"areUniformValuesEqual",(e,i)=>e===i?!0:Array.isArray(e)&&Array.isArray(i)&&e.length===i.length?e.every((r,s)=>this.areUniformValuesEqual(r,i[s])):!1);F(this,"setUniformValues",e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([i,r])=>{let s=r;if(r instanceof HTMLImageElement&&(s=`${r.src.slice(0,200)}|${r.naturalWidth}x${r.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[i],s))return;this.uniformCache[i]=s;let n=this.uniformLocations[i];if(!n){console.warn(`Uniform location for ${i} not found`);return}if(r instanceof HTMLImageElement)this.setTextureUniform(i,r);else if(Array.isArray(r)){let a=null,o=null;if(r[0]!==void 0&&Array.isArray(r[0])){let l=r[0].length;if(r.every(h=>h.length===l))a=r.flat(),o=l;else{console.warn(`All child arrays must be the same length for ${i}`);return}}else a=r,o=a.length;switch(o){case 2:this.gl.uniform2fv(n,a);break;case 3:this.gl.uniform3fv(n,a);break;case 4:this.gl.uniform4fv(n,a);break;case 9:this.gl.uniformMatrix3fv(n,!1,a);break;case 16:this.gl.uniformMatrix4fv(n,!1,a);break;default:console.warn(`Unsupported uniform array length: ${o}`)}}else typeof r=="number"?this.gl.uniform1f(n,r):typeof r=="boolean"?this.gl.uniform1i(n,r?1:0):console.warn(`Unsupported uniform type for ${i}: ${typeof r}`)})});F(this,"getCurrentFrame",()=>this.currentFrame);F(this,"setFrame",e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())});F(this,"setSpeed",(e=1)=>{this.speed=e,this.updateCurrentSpeed()});F(this,"updateCurrentSpeed",()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)});F(this,"setCurrentSpeed",e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});F(this,"setMaxPixelCount",(e=Ui)=>{this.maxPixelCount=e,this.handleResize()});F(this,"setMinPixelRatio",(e=2)=>{this.minPixelRatio=e,this.handleResize()});F(this,"setUniforms",e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())});F(this,"handleDocumentVisibilityChange",()=>{this.updateCurrentSpeed()});F(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null),visualViewport?.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if(e?.nodeType===1)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){let d=this.ownerDocument.createElement("style");d.innerHTML=xr,d.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(d)}let c=this.ownerDocument.createElement("canvas");this.canvasElement=c,this.parentElement.prepend(c),this.fragmentShader=i,this.providedUniforms=r,this.mipmaps=h,this.currentFrame=a,this.minPixelRatio=o,this.maxPixelCount=l;let u=c.getContext("webgl2",s);if(!u)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=u,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener("resize",this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(n),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}};function Ii(t,e,i){let r=t.createShader(e);return r?(t.shaderSource(r,i),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)):null}function mr(t,e,i){let r=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT),s=r?r.precision:null;s&&s<23&&(e=e.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),i=i.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let n=Ii(t,t.VERTEX_SHADER,e),a=Ii(t,t.FRAGMENT_SHADER,i);if(!n||!a)return null;let o=t.createProgram();return o?(t.attachShader(o,n),t.attachShader(o,a),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)?(t.detachShader(o,n),t.detachShader(o,a),t.deleteShader(n),t.deleteShader(a),o):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(o)),t.deleteProgram(o),t.deleteShader(n),t.deleteShader(a),null)):null}var xr=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function Ar(){let t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}function Er(t){let e=visualViewport?.scale??1,i=visualViewport?.width??window.innerWidth,r=window.innerWidth-t.documentElement.clientWidth,s=e*i+r,n=outerWidth/s,a=Math.round(100*n);return a%5===0?a/100:a===33?1/3:a===67?2/3:a===133?4/3:n}var Me=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,Di=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,Qi=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,Vi=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`;var zi=`
  float randomR(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).r;
  }
`;var Li=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`;var Pi={maxColorCount:7},bs=`#version 300 es
precision lowp float;

uniform mediump float u_time;
uniform mediump vec2 u_resolution;
uniform mediump float u_pixelRatio;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Pi.maxColorCount}];
uniform float u_colorsCount;
uniform float u_softness;
uniform float u_intensity;
uniform float u_noise;
uniform float u_shape;

uniform mediump float u_worldWidth;
uniform mediump float u_worldHeight;
uniform mediump float u_fit;

uniform mediump float u_scale;
uniform mediump float u_rotation;
uniform mediump float u_offsetX;
uniform mediump float u_offsetY;

in vec2 v_objectUV;
in vec2 v_patternUV;
in vec2 v_objectBoxSize;
in vec2 v_patternBoxSize;

out vec4 fragColor;

${Me}
${Li}
${Di}
${zi}

float valueNoiseR(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = randomR(i);
  float b = randomR(i + vec2(1.0, 0.0));
  float c = randomR(i + vec2(0.0, 1.0));
  float d = randomR(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}
vec4 fbmR(vec2 n0, vec2 n1, vec2 n2, vec2 n3) {
  float amplitude = 0.2;
  vec4 total = vec4(0.);
  for (int i = 0; i < 3; i++) {
    n0 = rotate(n0, 0.3);
    n1 = rotate(n1, 0.3);
    n2 = rotate(n2, 0.3);
    n3 = rotate(n3, 0.3);
    total.x += valueNoiseR(n0) * amplitude;
    total.y += valueNoiseR(n1) * amplitude;
    total.z += valueNoiseR(n2) * amplitude;
    total.z += valueNoiseR(n3) * amplitude;
    n0 *= 1.99;
    n1 *= 1.99;
    n2 *= 1.99;
    n3 *= 1.99;
    amplitude *= 0.6;
  }
  return total;
}

${Qi}

vec2 truchet(vec2 uv, float idx){
  idx = fract(((idx - .5) * 2.));
  if (idx > 0.75) {
    uv = vec2(1.0) - uv;
  } else if (idx > 0.5) {
    uv = vec2(1.0 - uv.x, uv.y);
  } else if (idx > 0.25) {
    uv = 1.0 - vec2(1.0 - uv.x, uv.y);
  }
  return uv;
}

void main() {

  const float firstFrameOffset = 7.;
  float t = .1 * (u_time + firstFrameOffset);

  vec2 shape_uv = vec2(0.);
  vec2 grain_uv = vec2(0.);

  float r = u_rotation * PI / 180.;
  float cr = cos(r);
  float sr = sin(r);
  mat2 graphicRotation = mat2(cr, sr, -sr, cr);
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  if (u_shape > 3.5) {
    shape_uv = v_objectUV;
    grain_uv = shape_uv;

    // apply inverse transform to grain_uv so it respects the originXY
    grain_uv = transpose(graphicRotation) * grain_uv;
    grain_uv *= u_scale;
    grain_uv -= graphicOffset;
    grain_uv *= v_objectBoxSize;
    grain_uv *= .7;
  } else {
    shape_uv = .5 * v_patternUV;
    grain_uv = 100. * v_patternUV;

    // apply inverse transform to grain_uv so it respects the originXY
    grain_uv = transpose(graphicRotation) * grain_uv;
    grain_uv *= u_scale;
    if (u_fit > 0.) {
      vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
      givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
      float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
      vec2 patternBoxGivenSize = vec2(
      (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
      (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
      );
      patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;
      float patternBoxNoFitBoxWidth = patternBoxRatio * min(patternBoxGivenSize.x / patternBoxRatio, patternBoxGivenSize.y);
      grain_uv /= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
    }
    vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;
    grain_uv -= graphicOffset / patternBoxScale;
    grain_uv *= 1.6;
  }


  float shape = 0.;

  if (u_shape < 1.5) {
    // Sine wave

    float wave = cos(.5 * shape_uv.x - 4. * t) * sin(1.5 * shape_uv.x + 2. * t) * (.75 + .25 * cos(6. * t));
    shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);

  } else if (u_shape < 2.5) {
    // Grid (dots)

    float stripeIdx = floor(2. * shape_uv.x / TWO_PI);
    float rand = hash11(stripeIdx * 100.);
    rand = sign(rand - .5) * pow(4. * abs(rand), .3);
    shape = sin(shape_uv.x) * cos(shape_uv.y - 5. * rand * t);
    shape = pow(abs(shape), 4.);

  } else if (u_shape < 3.5) {
    // Truchet pattern

    float n2 = valueNoiseR(shape_uv * .4 - 3.75 * t);
    shape_uv.x += 10.;
    shape_uv *= .6;

    vec2 tile = truchet(fract(shape_uv), randomR(floor(shape_uv)));

    float distance1 = length(tile);
    float distance2 = length(tile - vec2(1.));

    n2 -= .5;
    n2 *= .1;
    shape = smoothstep(.2, .55, distance1 + n2) * (1. - smoothstep(.45, .8, distance1 - n2));
    shape += smoothstep(.2, .55, distance2 + n2) * (1. - smoothstep(.45, .8, distance2 - n2));

    shape = pow(shape, 1.5);

  } else if (u_shape < 4.5) {
    // Corners

    shape_uv *= .6;
    vec2 outer = vec2(.5);

    vec2 bl = smoothstep(vec2(0.), outer, shape_uv + vec2(.1 + .1 * sin(3. * t), .2 - .1 * sin(5.25 * t)));
    vec2 tr = smoothstep(vec2(0.), outer, 1. - shape_uv);
    shape = 1. - bl.x * bl.y * tr.x * tr.y;

    shape_uv = -shape_uv;
    bl = smoothstep(vec2(0.), outer, shape_uv + vec2(.1 + .1 * sin(3. * t), .2 - .1 * cos(5.25 * t)));
    tr = smoothstep(vec2(0.), outer, 1. - shape_uv);
    shape -= bl.x * bl.y * tr.x * tr.y;

    shape = 1. - smoothstep(0., 1., shape);

  } else if (u_shape < 5.5) {
    // Ripple

    shape_uv *= 2.;
    float dist = length(.4 * shape_uv);
    float waves = sin(pow(dist, 1.2) * 5. - 3. * t) * .5 + .5;
    shape = waves;

  } else if (u_shape < 6.5) {
    // Blob

    t *= 2.;

    vec2 f1_traj = .25 * vec2(1.3 * sin(t), .2 + 1.3 * cos(.6 * t + 4.));
    vec2 f2_traj = .2 * vec2(1.2 * sin(-t), 1.3 * sin(1.6 * t));
    vec2 f3_traj = .25 * vec2(1.7 * cos(-.6 * t), cos(-1.6 * t));
    vec2 f4_traj = .3 * vec2(1.4 * cos(.8 * t), 1.2 * sin(-.6 * t - 3.));

    shape = .5 * pow(1. - clamp(0., 1., length(shape_uv + f1_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f2_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f3_traj)), 5.);
    shape += .5 * pow(1. - clamp(0., 1., length(shape_uv + f4_traj)), 5.);

    shape = smoothstep(.0, .9, shape);
    float edge = smoothstep(.25, .3, shape);
    shape = mix(.0, shape, edge);

  } else {
    // Sphere

    shape_uv *= 2.;
    float d = 1. - pow(length(shape_uv), 2.);
    vec3 pos = vec3(shape_uv, sqrt(max(d, 0.)));
    vec3 lightPos = normalize(vec3(cos(1.5 * t), .8, sin(1.25 * t)));
    shape = .5 + .5 * dot(lightPos, pos);
    shape *= step(0., d);
  }

  float baseNoise = snoise(grain_uv * .5);
  vec4 fbmVals = fbmR(
  .002 * grain_uv + 10.,
  .003 * grain_uv,
  .001 * grain_uv,
  rotate(.4 * grain_uv, 2.)
  );
  float grainDist = baseNoise * snoise(grain_uv * .2) - fbmVals.x - fbmVals.y;
  float rawNoise = .75 * baseNoise - fbmVals.w - fbmVals.z;
  float noise = clamp(rawNoise, 0., 1.);

  shape += u_intensity * 2. / u_colorsCount * (grainDist + .5);
  shape += u_noise * 10. / u_colorsCount * noise;

  float aa = fwidth(shape);

  shape = clamp(shape - .5 / u_colorsCount, 0., 1.);
  float totalShape = smoothstep(0., u_softness + 2. * aa, clamp(shape * u_colorsCount, 0., 1.));
  float mixer = shape * (u_colorsCount - 1.);

  int cntStop = int(u_colorsCount) - 1;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  for (int i = 1; i < ${Pi.maxColorCount}; i++) {
    if (i > cntStop) break;

    float localT = clamp(mixer - float(i - 1), 0., 1.);
    localT = smoothstep(.5 - .5 * u_softness - aa, .5 + .5 * u_softness + aa, localT);

    vec4 c = u_colors[i];
    c.rgb *= c.a;
    gradient = mix(gradient, c, localT);
  }

  vec3 color = gradient.rgb * totalShape;
  float opacity = gradient.a * totalShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  fragColor = vec4(color, opacity);
}
`;var pe=`#version 300 es
precision mediump float;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_fit;

uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

uniform vec4 u_colorFront;
uniform vec4 u_colorBack;
uniform vec4 u_colorHighlight;

uniform sampler2D u_image;
uniform float u_imageAspectRatio;

uniform float u_type;
uniform float u_pxSize;
uniform bool u_originalColors;
uniform bool u_inverted;
uniform float u_colorSteps;

out vec4 fragColor;


${Vi}
${Me}

float getUvFrame(vec2 uv, vec2 pad) {
  float aa = 0.0001;

  float left   = smoothstep(-pad.x, -pad.x + aa, uv.x);
  float right  = smoothstep(1.0 + pad.x, 1.0 + pad.x - aa, uv.x);
  float bottom = smoothstep(-pad.y, -pad.y + aa, uv.y);
  float top    = smoothstep(1.0 + pad.y, 1.0 + pad.y - aa, uv.y);

  return left * right * bottom * top;
}

vec2 getImageUV(vec2 uv) {
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  float r = u_rotation * PI / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  vec2 imageUV = uv;
  imageUV *= imageBoxScale;
  imageUV += boxOrigin * (imageBoxScale - 1.);
  imageUV += graphicOffset;
  imageUV /= u_scale;
  imageUV.x *= u_imageAspectRatio;
  imageUV = graphicRotation * imageUV;
  imageUV.x /= u_imageAspectRatio;

  imageUV += .5;
  imageUV.y = 1. - imageUV.y;

  return imageUV;
}

const int bayer2x2[4] = int[4](0, 2, 3, 1);
const int bayer4x4[16] = int[16](
0, 8, 2, 10,
12, 4, 14, 6,
3, 11, 1, 9,
15, 7, 13, 5
);

const int bayer8x8[64] = int[64](
0, 32, 8, 40, 2, 34, 10, 42,
48, 16, 56, 24, 50, 18, 58, 26,
12, 44, 4, 36, 14, 46, 6, 38,
60, 28, 52, 20, 62, 30, 54, 22,
3, 35, 11, 43, 1, 33, 9, 41,
51, 19, 59, 27, 49, 17, 57, 25,
15, 47, 7, 39, 13, 45, 5, 37,
63, 31, 55, 23, 61, 29, 53, 21
);

float getBayerValue(vec2 uv, int size) {
  ivec2 pos = ivec2(fract(uv / float(size)) * float(size));
  int index = pos.y * size + pos.x;

  if (size == 2) {
    return float(bayer2x2[index]) / 4.0;
  } else if (size == 4) {
    return float(bayer4x4[index]) / 16.0;
  } else if (size == 8) {
    return float(bayer8x8[index]) / 64.0;
  }
  return 0.0;
}


void main() {

  float pxSize = u_pxSize * u_pixelRatio;
  vec2 pxSizeUV = gl_FragCoord.xy - .5 * u_resolution;
  pxSizeUV /= pxSize;
  vec2 canvasPixelizedUV = (floor(pxSizeUV) + .5) * pxSize;
  vec2 normalizedUV = canvasPixelizedUV / u_resolution;

  vec2 imageUV = getImageUV(normalizedUV);
  vec2 ditheringNoiseUV = canvasPixelizedUV;
  vec4 image = texture(u_image, imageUV);
  float frame = getUvFrame(imageUV, pxSize / u_resolution);

  int type = int(floor(u_type));
  float dithering = 0.0;

  float lum = dot(vec3(.2126, .7152, .0722), image.rgb);
  lum = u_inverted ? (1. - lum) : lum;

  switch (type) {
    case 1: {
      dithering = step(hash21(ditheringNoiseUV), lum);
    } break;
    case 2:
    dithering = getBayerValue(pxSizeUV, 2);
    break;
    case 3:
    dithering = getBayerValue(pxSizeUV, 4);
    break;
    default :
    dithering = getBayerValue(pxSizeUV, 8);
    break;
  }

  float colorSteps = max(floor(u_colorSteps), 1.);
  vec3 color = vec3(0.0);
  float opacity = 1.;

  dithering -= .5;
  float brightness = clamp(lum + dithering / colorSteps, 0.0, 1.0);
  brightness = mix(0.0, brightness, frame);
  brightness = mix(0.0, brightness, image.a);
  float quantLum = floor(brightness * colorSteps + 0.5) / colorSteps;
  quantLum = mix(0.0, quantLum, frame);

  if (u_originalColors == true) {
    vec3 normColor = image.rgb / max(lum, 0.001);
    color = normColor * quantLum;

    float quantAlpha = floor(image.a * colorSteps + 0.5) / colorSteps;
    opacity = mix(quantLum, 1., quantAlpha);
  } else {
    vec3 fgColor = u_colorFront.rgb * u_colorFront.a;
    float fgOpacity = u_colorFront.a;
    vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
    float bgOpacity = u_colorBack.a;
    vec3 hlColor = u_colorHighlight.rgb * u_colorHighlight.a;
    float hlOpacity = u_colorHighlight.a;

    fgColor = mix(fgColor, hlColor, step(1.02 - .02 * u_colorSteps, brightness));
    fgOpacity = mix(fgOpacity, hlOpacity, step(1.02 - .02 * u_colorSteps, brightness));

    color = fgColor * quantLum;
    opacity = fgOpacity * quantLum;
    color += bgColor * (1.0 - opacity);
    opacity += bgOpacity * (1.0 - opacity);
  }

  fragColor = vec4(color, opacity);
}
`;function se(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:oe;if(typeof t!="string")return oe;let e,i,r,s=1;if(t.startsWith("#"))[e,i,r,s]=vr(t);else if(t.startsWith("rgb")){let n=wr(t);if(n===null)return oe;[e,i,r,s]=n}else if(t.startsWith("hsl")){let n=Br(t);if(n===null)return oe;[e,i,r,s]=yr(n)}else return console.error("Unsupported color format",t),oe;return[Fe(e,0,1),Fe(i,0,1),Fe(r,0,1),Fe(s,0,1)]}function vr(t){if(t=t.replace(/^#/,""),(t.length===3||t.length===4)&&(t=t.split("").map(n=>n+n).join("")),t.length===6&&(t=t+"ff"),!/^[0-9a-f]{8}$/i.test(t))return console.warn("Invalid hex color"),oe;let e=parseInt(t.slice(0,2),16)/255,i=parseInt(t.slice(2,4),16)/255,r=parseInt(t.slice(4,6),16)/255,s=parseInt(t.slice(6,8),16)/255;return[e,i,r,s]}function wr(t){let e=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0")/255,parseInt(e[2]??"0")/255,parseInt(e[3]??"0")/255,e[4]===void 0?1:parseFloat(e[4])]:null}function Br(t){let e=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0"),parseInt(e[2]??"0"),parseInt(e[3]??"0"),e[4]===void 0?1:parseFloat(e[4])]:null}function yr(t){let[e,i,r,s]=t,n=e/360,a=i/100,o=r/100,l,h,c;if(i===0)l=h=c=o;else{let u=(g,x,f)=>(f<0&&(f+=1),f>1&&(f-=1),f<.16666666666666666?g+(x-g)*6*f:f<.5?x:f<.6666666666666666?g+(x-g)*(.6666666666666666-f)*6:g),d=o<.5?o*(1+a):o+a-o*a,p=2*o-d;l=u(p,d,n+1/3),h=u(p,d,n),c=u(p,d,n-1/3)}return[l,h,c,s]}var Fe=(t,e,i)=>Math.min(Math.max(t,e),i),oe=[.5,.5,.5,1];var Ni={u_originX:.5,u_originY:.5,u_worldWidth:0,u_worldHeight:0,u_fit:2,u_scale:1,u_rotation:0,u_offsetX:0,u_offsetY:0},Se=()=>new Promise(t=>requestAnimationFrame(()=>requestAnimationFrame(t)));(async()=>{let t={background:!1,tile:!1,photos:0,model:!1,cloud:!1,errors:[],scrollUpdates:0,materialWrites:0};window.paperPrint={stats:()=>({...t})};try{let p=function(){document.querySelectorAll(".atlas-photo").forEach(f=>{let m=Object.keys(a).find(A=>f.classList.contains(A));if(!m||f.dataset.print===m)return;f.querySelector(".print-photo")?.remove(),f.style.position="relative";let y=document.createElement("div");y.className="print-photo",y.style.cssText='background-image:url("'+o[m]+'");background-size:cover;background-position:center;opacity:.92',f.append(y),f.dataset.print=m,t.photos++})};var e=p;t.background=!0;let r=window.PAPER_GENERATED_ASSETS;if(r){let R=function(){let M=[...Array.from(document.querySelectorAll(".folio-sheet,.media-spread,.notebook-spread,.research-spread,.next-shelf"),(w,b)=>[w,w.dataset.material||(b%2?"sand-sage":"sand-blue")]),...Array.from(document.querySelectorAll(".book-pages,.context-workbench,.bench-inspector"),w=>[w,"sand-blue"]),...Array.from(document.querySelectorAll(".repo-folder,.writing-list button,.next-grid button"),(w,b)=>[w,w.dataset.material||(b%2?"sand-sage":"sand-blue")]),...Array.from(document.querySelectorAll(".work-image"),(w,b)=>[w,b?"mineral-study":"terrace-study"]),...[...document.querySelectorAll(".record-art")].map(w=>[w,"podcast-legacy"]),...[...document.querySelectorAll(".design-art")].map(w=>[w,"sand-blue"]),...[...document.querySelectorAll(".learning-paper")].map(w=>[w,"pond-study"]),...Array.from(document.querySelectorAll(".asset-object"),(w,b)=>[w,w.dataset.materialKey||(w.dataset.assetType==="color"?"sand-blue":w.dataset.assetType==="paper"?"sand-sage":"sand-blue")])];for(let[w,b]of M){w.classList.add("pixel-plane"),w.matches(".book-pages,.context-workbench,.bench-inspector,.repo-folder,.writing-list button,.next-grid button")&&w.classList.add("sand-surface"),w.dataset.material=b;let C=w.querySelector(":scope>.pixel-window");C||(C=document.createElement("div"),C.className="pixel-window",C.setAttribute("aria-hidden","true"),w.append(C)),C.dataset.material!==b&&(t.materialWrites++,C.dataset.material=b,C.style.backgroundImage='url("'+m[b]+'")');let D=w.querySelector(":scope>.sand-sample");D&&D.dataset.material!==b&&(t.materialWrites++,D.dataset.material=b,D.style.backgroundImage='url("'+m[b]+'")')}};var i=R;let f=window.PAPER_MATERIAL_CACHE,m={...f?.processed||{}},y={...f?.sizes||{}};t.cached=!!f,t.shaderPasses=0;async function A(M){if(m[M])return;t.shaderPasses++;let w=new Image;w.src=r[M],await w.decode(),y[M]=[w.width,w.height];let b=M.startsWith("cloud-"),C=M.startsWith("sand-"),D=b?960:C?900:600,S=b?1440:M==="podcast-legacy"?240:C?600:400,P=document.createElement("div");P.className="print-tile-source",P.style.width=D+"px",P.style.height=S+"px",document.body.append(P);let ne=new re(P,pe,{...Ni,u_image:w,u_colorFront:se("#729bb7"),u_colorBack:se("#e0eaf2"),u_colorHighlight:se("#f5f0e8"),u_pxSize:b?1.5:C?1:2,u_colorSteps:b?12:24,u_originalColors:!0,u_inverted:!1,u_type:1},{alpha:!1,preserveDrawingBuffer:!0},0,0,1,D*S);await Se(),m[M]=ne.canvasElement.toDataURL("image/png"),ne.dispose(),P.remove()}for(let M of Object.keys(r))await A(M);let v=["cloud-01","cloud-02","cloud-03"],E=document.createElement("div");E.className="cloud-sky",E.setAttribute("aria-hidden","true"),E.style.backgroundImage='url("'+m["cloud-01"]+'")',document.body.prepend(E),t.cloud=!0;let B=await Ti(E,v.map(M=>m[M]));R();let Q=!1;new MutationObserver(M=>{Q||!M.some(w=>[...w.addedNodes,...w.removedNodes].some(b=>b.nodeType===1))||(Q=!0,requestAnimationFrame(()=>{Q=!1,R()}))}).observe(document.body,{childList:!0,subtree:!0}),window.paperCloud={...B,stats:()=>({ready:!0,sourceKeys:v,sourceSizes:v.map(M=>y[M]),grid:[640,960],generated:Object.keys(m).length-1,planes:document.querySelectorAll(".pixel-window").length,legacyUses:[...document.querySelectorAll('[data-material="podcast-legacy"]')].map(M=>M.className),...B.stats()})},window.paperMaterialPreview=m,window.paperMaterialBake={processed:m,sizes:y},window.paperGenerated={stats:()=>({sources:Object.keys(m),sizes:y,placements:[...document.querySelectorAll(".pixel-plane")].map(M=>({class:M.className,material:M.dataset.material}))})}}let s=window.PAPER_PRINT_CACHE,n=f=>({...Ni,u_image:f,u_colorFront:se("#406887"),u_colorBack:se("#dee6e9"),u_colorHighlight:se("#f0e6d5"),u_pxSize:1,u_colorSteps:7,u_originalColors:!0,u_inverted:!1,u_type:1}),a={"photo-city":[0,0],"photo-ocean":[1,0],"photo-forest":[3,0],"photo-mountain":[1,1]},o=s?.images||{},l=s?.tile;if(!l){let f=document.createElement("canvas");f.width=192,f.height=192;let m=f.getContext("2d");m.fillStyle="#e0e8ef",m.fillRect(0,0,192,192);let y=new Image;y.src=f.toDataURL(),await y.decode();let A=document.createElement("div");A.className="print-tile-source",A.setAttribute("aria-hidden","true"),document.body.append(A);let v=new re(A,pe,n(y),{alpha:!1,preserveDrawingBuffer:!0},0,0,1,36864);await Se(),l=v.canvasElement.toDataURL("image/png"),v.dispose(),A.remove()}document.documentElement.style.setProperty("--print-grain",'url("'+l+'")'),t.tile=!0;let h=document.querySelector(".atlas-photo"),u=getComputedStyle(h).backgroundImage.match(/^url\(["']?(.*?)["']?\)$/)?.[1];if(!u)return;let d=new Image;if(d.src=u,await d.decode(),!s)for(let[f,[m,y]]of Object.entries(a)){let A=document.createElement("canvas");A.width=600,A.height=400,A.getContext("2d").drawImage(d,m*d.width/4,y*d.height/6,d.width/4,d.height/6,0,0,600,400);let v=new Image;v.src=A.toDataURL("image/png"),await v.decode();let E=document.createElement("div");E.className="print-tile-source",E.style.width="600px",E.style.height="400px",document.body.append(E);let B=new re(E,pe,{...n(v),u_pxSize:1.3,u_colorSteps:5},{alpha:!1,preserveDrawingBuffer:!0},0,0,1,600*400);await Se(),o[f]=B.canvasElement.toDataURL("image/jpeg",.92),B.dispose(),E.remove()}p();let g=!1;new MutationObserver(()=>{g||(g=!0,requestAnimationFrame(()=>{g=!1,p()}))}).observe(document.body,{childList:!0,subtree:!0});let x=s?.atlas;if(!x){let f=document.createElement("div");f.className="print-tile-source",f.style.width="1024px",f.style.height="1024px",document.body.append(f);let m=new re(f,pe,n(d),{alpha:!1,preserveDrawingBuffer:!0},0,0,1,1024*1024);await Se(),x=m.canvasElement.toDataURL("image/jpeg",.95),m.dispose(),f.remove()}window.PAPER_PRINT_BAKED={tile:l,images:o,atlas:x},window.setPaperPrintTexture&&(await window.setPaperPrintTexture(x),t.model=!0)}catch(r){t.errors.push(r.message),console.warn("Print material fallback:",r.message)}})();})();
