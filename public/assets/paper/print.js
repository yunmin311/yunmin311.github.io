"use strict";(()=>{var ji=Object.defineProperty;var $i=(t,e,i)=>e in t?ji(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var y=(t,e,i)=>$i(t,typeof e!="symbol"?e+"":e,i);async function ve(t,e){let i=matchMedia("(hover:hover) and (pointer:fine)"),r=matchMedia("(prefers-reduced-motion:reduce)"),s=matchMedia("(prefers-reduced-transparency:reduce)"),n=matchMedia("(forced-colors:active)"),a=async _=>{let Q=new Image;Q.src=_;try{await Q.decode()}catch(D){if(!_.endsWith(".lossless.webp"))throw D;Q.src=_.replace(".lossless.webp",".png"),await Q.decode()}return Q},o=[await a(e[0])],l=[];function c(_,Q){let D=document.createElement("canvas");D.width=960,D.height=1440;let U=D.getContext("2d");if(U.imageSmoothingEnabled=!1,U.drawImage(_,0,0,960,1440),Q){U.globalCompositeOperation="destination-in";let P=U.createLinearGradient(0,0,0,1440*.16);P.addColorStop(0,"#0000"),P.addColorStop(1,"#000"),U.fillStyle=P,U.fillRect(0,0,960,1440)}return D}l[0]=c(o[0],0);let h=document.createElement("canvas"),f=document.createElement("canvas");h.className="cloud-flow-canvas",h.setAttribute("aria-hidden","true"),t.append(h),t.classList.add("is-flowing");let p=document.createElement("canvas");p.className="cloud-sand-lens",p.setAttribute("aria-hidden","true"),t.append(p);let u=p.getContext("2d",{willReadFrequently:!0}),d=document.createElement("canvas"),g=0,m=0,x=h.getContext("2d",{alpha:!1,willReadFrequently:!0}),B=f.getContext("2d",{alpha:!1,willReadFrequently:!0}),E=0,v=!1,F=0,b=0,T=scrollY,w=scrollY,A=null,M=0,C=[],I=-1,V=0,S=null,G=!0,Z=()=>r.matches||document.body.classList.contains("motion-off"),fe=()=>G&&!document.hidden&&!s.matches&&!n.matches,Ie=()=>fe()&&i.matches&&!Z(),Y=innerHeight,oe=innerWidth,j=()=>Z()?0:Math.max(0,Math.min(1,T/Math.max(1,document.documentElement.scrollHeight-Y)));function $(_){if(_===I)return;let Q=f.width/innerWidth,D=f.height/innerHeight,U=Math.max(1,Math.ceil(innerWidth/960)),P=1440*U,z=P*.84,R=P+2*z,L=Math.round(_*(R-Y)/U)*U,N=960*U;B.imageSmoothingEnabled=!1,B.fillStyle="#cfdfeb",B.fillRect(0,0,f.width,f.height);for(let k=0;k<3;k++)l[k]&&B.drawImage(l[k],(innerWidth-N)*.5*Q,(z*k-L)*D,N*Q,P*D);I=_,S=null,V++}function le(){let _=j(),Q=_!==I;$(_),x.imageSmoothingEnabled=!1,Q&&x.drawImage(f,0,0);let D=performance.now(),U=h.width/innerWidth,P=h.height/innerHeight;C=C.filter(R=>D-R.time<600);let z=1;if(!Z()&&C.length){let R={l:h.width,t:h.height,r:0,b:0};for(let H of C)R.l=Math.min(R.l,(H.x-84)*U),R.r=Math.max(R.r,(H.x+84)*U),R.t=Math.min(R.t,(H.y-84)*P),R.b=Math.max(R.b,(H.y+84)*P);g=Math.max(0,Math.floor(R.l/z)*z),m=Math.max(0,Math.floor(R.t/z)*z);let L=Math.min(h.width,Math.ceil(R.r/z)*z),N=Math.min(h.height,Math.ceil(R.b/z)*z);p.width=Math.max(1,L-g),p.height=Math.max(1,N-m),p.style.cssText="display:block;left:"+g/U+"px;top:"+m/P+"px;width:"+p.width/U+"px;height:"+p.height/P+"px",u.imageSmoothingEnabled=!1,S||(S=new Uint32Array(B.getImageData(0,0,f.width,f.height).data.buffer));let k=u.createImageData(p.width,p.height),Hi=new Uint32Array(k.data.buffer);for(let H=m;H<N;H+=z)for(let he=g;he<L;he+=z){let de=0,pe=0,Yi=(he+.5)/U,Xi=(H+.5)/P;for(let ge of C){let De=Math.hypot(Yi-ge.x,Xi-ge.y)/84;if(De>=1)continue;let tt=(D-ge.time)/600,it=(1-De)*(1-De)*(1-tt)*(1-tt);de+=ge.dx*it,pe+=ge.dy*it}if(de=Math.max(-14,Math.min(14,de)),pe=Math.max(-14,Math.min(14,pe)),Math.abs(de)+Math.abs(pe)<.12)continue;let qi=Math.min(z,h.width-he),Ji=Math.min(z,h.height-H),Ki=Math.max(0,Math.min(f.width-qi,he-de*U)),Zi=Math.max(0,Math.min(f.height-Ji,H-pe*P));Hi[(H-m)*p.width+he-g]=S[Math.round(Zi)*f.width+Math.round(Ki)]}u.putImageData(k,0,0)}else p.style.display="none";F++}function W(){cancelAnimationFrame(E),E=0,v=!1,C=[],A=null,T=w=scrollY,fe()&&le()}function X(){oe!==innerWidth&&(oe=innerWidth,Y=innerHeight),h.width=f.width=Math.round(innerWidth),h.height=f.height=Math.round(innerHeight),I=-1,W()}function ue(){if(E=0,!fe()){W();return}v=!0,Z()?T=w:T+=(w-T)*.2,Math.abs(w-T)<.1&&(T=w),Z()&&(C=[]),le(),C.length||Math.abs(w-T)>.1?E=requestAnimationFrame(ue):v=!1}function q(){!E&&fe()&&(E=requestAnimationFrame(ue))}document.addEventListener("pointermove",_=>{if(!Ie()||_.pointerType==="touch")return;let Q=performance.now();if(A&&Math.hypot(_.clientX-A.x,_.clientY-A.y)<240){let D=Math.max(12,Math.min(64,Q-M)),U=Math.max(-7,Math.min(7,(_.clientX-A.x)/D*8)),P=Math.max(-7,Math.min(7,(_.clientY-A.y)/D*8));Math.abs(U)+Math.abs(P)>.05&&(C.push({x:_.clientX,y:_.clientY,dx:U,dy:P,time:Q}),C.length>6&&C.shift(),b++,q())}A={x:_.clientX,y:_.clientY},M=Q},{passive:!0}),addEventListener("scroll",()=>{w=scrollY,Z()?W():q()},{passive:!0}),addEventListener("resize",()=>{f.width!==Math.round(innerWidth)?X():h.height!==Math.round(innerHeight)&&(h.height=f.height=Math.round(innerHeight),I=-1,q())}),document.documentElement.addEventListener("pointerleave",()=>{A=null}),addEventListener("blur",W),document.addEventListener("visibilitychange",()=>document.hidden?W():X()),addEventListener("pagehide",()=>{W(),G=!1});for(let _ of[i,r,s,n])_.addEventListener("change",W);return document.querySelector(".reduce").addEventListener("click",W),X(),e.slice(1).forEach((_,Q)=>a(_).then(D=>{G&&(o[Q+1]=D,l[Q+1]=c(D,Q+1),I=-1,q())}).catch(D=>console.warn("Cloud layer unavailable:",D.message))),{stop:W,stats:()=>({mode:"canvas-inverse-sampling",loadedSources:l.filter(Boolean).length,cellCSS:Math.max(1,Math.ceil(innerWidth/960)),worldHeight:Y,backend:"software-webgl-fallback",renderSize:[h.width,h.height],active:v,emissions:b,allowed:Ie(),frames:F,scroll:T,progress:j(),sceneIndex:Math.min(2,Math.floor(j()*3)),sources:3,mirrored:!1,looped:!1,maxDisplacement:14,reduced:Z(),baseBuilds:V,localPatch:[p.width,p.height]}),signature:()=>{le(),d.width=h.width,d.height=h.height;let _=d.getContext("2d",{willReadFrequently:!0});_.drawImage(h,0,0),C.length&&_.drawImage(p,g,m);let Q=_.getImageData(0,0,h.width,h.height).data,D=2166136261;for(let U=0;U<Q.length;U+=16)D=Math.imul(D^Q[U],16777619);return D>>>0}}}function te(t){let e=t[0],i=t[1],r=t[2];return Math.sqrt(e*e+i*i+r*r)}function we(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t}function rt(t,e,i,r){return t[0]=e,t[1]=i,t[2]=r,t}function Qe(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t}function Ve(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t}function st(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t[2]=e[2]*i[2],t}function nt(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t[2]=e[2]/i[2],t}function ye(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t}function at(t,e){let i=e[0]-t[0],r=e[1]-t[1],s=e[2]-t[2];return Math.sqrt(i*i+r*r+s*s)}function ot(t,e){let i=e[0]-t[0],r=e[1]-t[1],s=e[2]-t[2];return i*i+r*r+s*s}function ze(t){let e=t[0],i=t[1],r=t[2];return e*e+i*i+r*r}function lt(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t}function ht(t,e){return t[0]=1/e[0],t[1]=1/e[1],t[2]=1/e[2],t}function Be(t,e){let i=e[0],r=e[1],s=e[2],n=i*i+r*r+s*s;return n>0&&(n=1/Math.sqrt(n)),t[0]=e[0]*n,t[1]=e[1]*n,t[2]=e[2]*n,t}function Le(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]}function Pe(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[0],o=i[1],l=i[2];return t[0]=s*l-n*o,t[1]=n*a-r*l,t[2]=r*o-s*a,t}function ct(t,e,i,r){let s=e[0],n=e[1],a=e[2];return t[0]=s+r*(i[0]-s),t[1]=n+r*(i[1]-n),t[2]=a+r*(i[2]-a),t}function ft(t,e,i,r,s){let n=Math.exp(-r*s),a=e[0],o=e[1],l=e[2];return t[0]=i[0]+(a-i[0])*n,t[1]=i[1]+(o-i[1])*n,t[2]=i[2]+(l-i[2])*n,t}function ut(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[3]*r+i[7]*s+i[11]*n+i[15];return a=a||1,t[0]=(i[0]*r+i[4]*s+i[8]*n+i[12])/a,t[1]=(i[1]*r+i[5]*s+i[9]*n+i[13])/a,t[2]=(i[2]*r+i[6]*s+i[10]*n+i[14])/a,t}function dt(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[3]*r+i[7]*s+i[11]*n+i[15];return a=a||1,t[0]=(i[0]*r+i[4]*s+i[8]*n)/a,t[1]=(i[1]*r+i[5]*s+i[9]*n)/a,t[2]=(i[2]*r+i[6]*s+i[10]*n)/a,t}function pt(t,e,i){let r=e[0],s=e[1],n=e[2];return t[0]=r*i[0]+s*i[3]+n*i[6],t[1]=r*i[1]+s*i[4]+n*i[7],t[2]=r*i[2]+s*i[5]+n*i[8],t}function gt(t,e,i){let r=e[0],s=e[1],n=e[2],a=i[0],o=i[1],l=i[2],c=i[3],h=o*n-l*s,f=l*r-a*n,p=a*s-o*r,u=o*p-l*f,d=l*h-a*p,g=a*f-o*h,m=c*2;return h*=m,f*=m,p*=m,u*=2,d*=2,g*=2,t[0]=r+h+u,t[1]=s+f+d,t[2]=n+p+g,t}var mt=(function(){let t=[0,0,0],e=[0,0,0];return function(i,r){we(t,i),we(e,r),Be(t,t),Be(e,e);let s=Le(t,e);return s>1?0:s<-1?Math.PI:Math.acos(s)}})();function xt(t,e){return t[0]===e[0]&&t[1]===e[1]&&t[2]===e[2]}var O=class t extends Array{constructor(e=0,i=e,r=e){return super(e,i,r),this}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this[0]=e}set y(e){this[1]=e}set z(e){this[2]=e}set(e,i=e,r=e){return e.length?this.copy(e):(rt(this,e,i,r),this)}copy(e){return we(this,e),this}add(e,i){return i?Qe(this,e,i):Qe(this,this,e),this}sub(e,i){return i?Ve(this,e,i):Ve(this,this,e),this}multiply(e){return e.length?st(this,this,e):ye(this,this,e),this}divide(e){return e.length?nt(this,this,e):ye(this,this,1/e),this}inverse(e=this){return ht(this,e),this}len(){return te(this)}distance(e){return e?at(this,e):te(this)}squaredLen(){return ze(this)}squaredDistance(e){return e?ot(this,e):ze(this)}negate(e=this){return lt(this,e),this}cross(e,i){return i?Pe(this,e,i):Pe(this,this,e),this}scale(e){return ye(this,this,e),this}normalize(){return Be(this,this),this}dot(e){return Le(this,e)}equals(e){return xt(this,e)}applyMatrix3(e){return pt(this,this,e),this}applyMatrix4(e){return ut(this,this,e),this}scaleRotateMatrix4(e){return dt(this,this,e),this}applyQuaternion(e){return gt(this,this,e),this}angle(e){return mt(this,e)}lerp(e,i){return ct(this,this,e,i),this}smoothLerp(e,i,r){return ft(this,this,e,i,r),this}clone(){return new t(this[0],this[1],this[2])}fromArray(e,i=0){return this[0]=e[i],this[1]=e[i+1],this[2]=e[i+2],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e}transformDirection(e){let i=this[0],r=this[1],s=this[2];return this[0]=e[0]*i+e[4]*r+e[8]*s,this[1]=e[1]*i+e[5]*r+e[9]*s,this[2]=e[2]*i+e[6]*r+e[10]*s,this.normalize()}};var Et=new O,er=1,tr=1,vt=!1,Me=class{constructor(e,i={}){e.canvas||console.error("gl not passed as first argument to Geometry"),this.gl=e,this.attributes=i,this.id=er++,this.VAOs={},this.drawRange={start:0,count:0},this.instancedCount=0,this.gl.renderer.bindVertexArray(null),this.gl.renderer.currentGeometry=null,this.glState=this.gl.renderer.state;for(let r in i)this.addAttribute(r,i[r])}addAttribute(e,i){if(this.attributes[e]=i,i.id=tr++,i.size=i.size||1,i.type=i.type||(i.data.constructor===Float32Array?this.gl.FLOAT:i.data.constructor===Uint16Array?this.gl.UNSIGNED_SHORT:this.gl.UNSIGNED_INT),i.target=e==="index"?this.gl.ELEMENT_ARRAY_BUFFER:this.gl.ARRAY_BUFFER,i.normalized=i.normalized||!1,i.stride=i.stride||0,i.offset=i.offset||0,i.count=i.count||(i.stride?i.data.byteLength/i.stride:i.data.length/i.size),i.divisor=i.instanced||0,i.needsUpdate=!1,i.usage=i.usage||this.gl.STATIC_DRAW,i.buffer||this.updateAttribute(i),i.divisor){if(this.isInstanced=!0,this.instancedCount&&this.instancedCount!==i.count*i.divisor)return console.warn("geometry has multiple instanced buffers of different length"),this.instancedCount=Math.min(this.instancedCount,i.count*i.divisor);this.instancedCount=i.count*i.divisor}else e==="index"?this.drawRange.count=i.count:this.attributes.index||(this.drawRange.count=Math.max(this.drawRange.count,i.count))}updateAttribute(e){let i=!e.buffer;i&&(e.buffer=this.gl.createBuffer()),this.glState.boundBuffer!==e.buffer&&(this.gl.bindBuffer(e.target,e.buffer),this.glState.boundBuffer=e.buffer),i?this.gl.bufferData(e.target,e.data,e.usage):this.gl.bufferSubData(e.target,0,e.data),e.needsUpdate=!1}setIndex(e){this.addAttribute("index",e)}setDrawRange(e,i){this.drawRange.start=e,this.drawRange.count=i}setInstancedCount(e){this.instancedCount=e}createVAO(e){this.VAOs[e.attributeOrder]=this.gl.renderer.createVertexArray(),this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),this.bindAttributes(e)}bindAttributes(e){e.attributeLocations.forEach((i,{name:r,type:s})=>{if(!this.attributes[r]){console.warn(`active attribute ${r} not being supplied`);return}let n=this.attributes[r];this.gl.bindBuffer(n.target,n.buffer),this.glState.boundBuffer=n.buffer;let a=1;s===35674&&(a=2),s===35675&&(a=3),s===35676&&(a=4);let o=n.size/a,l=a===1?0:a*a*4,c=a===1?0:a*4;for(let h=0;h<a;h++)this.gl.vertexAttribPointer(i+h,o,n.type,n.normalized,n.stride+l,n.offset+h*c),this.gl.enableVertexAttribArray(i+h),this.gl.renderer.vertexAttribDivisor(i+h,n.divisor)}),this.attributes.index&&this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,this.attributes.index.buffer)}draw({program:e,mode:i=this.gl.TRIANGLES}){this.gl.renderer.currentGeometry!==`${this.id}_${e.attributeOrder}`&&(this.VAOs[e.attributeOrder]||this.createVAO(e),this.gl.renderer.bindVertexArray(this.VAOs[e.attributeOrder]),this.gl.renderer.currentGeometry=`${this.id}_${e.attributeOrder}`),e.attributeLocations.forEach((s,{name:n})=>{let a=this.attributes[n];a.needsUpdate&&this.updateAttribute(a)});let r=2;this.attributes.index?.type===this.gl.UNSIGNED_INT&&(r=4),this.isInstanced?this.attributes.index?this.gl.renderer.drawElementsInstanced(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*r,this.instancedCount):this.gl.renderer.drawArraysInstanced(i,this.drawRange.start,this.drawRange.count,this.instancedCount):this.attributes.index?this.gl.drawElements(i,this.drawRange.count,this.attributes.index.type,this.attributes.index.offset+this.drawRange.start*r):this.gl.drawArrays(i,this.drawRange.start,this.drawRange.count)}getPosition(){let e=this.attributes.position;if(e.data)return e;if(!vt)return console.warn("No position buffer data found to compute bounds"),vt=!0}computeBoundingBox(e){e||(e=this.getPosition());let i=e.data,r=e.size;this.bounds||(this.bounds={min:new O,max:new O,center:new O,scale:new O,radius:1/0});let s=this.bounds.min,n=this.bounds.max,a=this.bounds.center,o=this.bounds.scale;s.set(1/0),n.set(-1/0);for(let l=0,c=i.length;l<c;l+=r){let h=i[l],f=i[l+1],p=i[l+2];s.x=Math.min(h,s.x),s.y=Math.min(f,s.y),s.z=Math.min(p,s.z),n.x=Math.max(h,n.x),n.y=Math.max(f,n.y),n.z=Math.max(p,n.z)}o.sub(n,s),a.add(s,n).divide(2)}computeBoundingSphere(e){e||(e=this.getPosition());let i=e.data,r=e.size;this.bounds||this.computeBoundingBox(e);let s=0;for(let n=0,a=i.length;n<a;n+=r)Et.fromArray(i,n),s=Math.max(s,this.bounds.center.squaredDistance(Et));this.bounds.radius=Math.sqrt(s)}remove(){for(let e in this.VAOs)this.gl.renderer.deleteVertexArray(this.VAOs[e]),delete this.VAOs[e];for(let e in this.attributes)this.gl.deleteBuffer(this.attributes[e].buffer),delete this.attributes[e]}};var ir=1,wt={},ie=class{constructor(e,{vertex:i,fragment:r,uniforms:s={},transparent:n=!1,cullFace:a=e.BACK,frontFace:o=e.CCW,depthTest:l=!0,depthWrite:c=!0,depthFunc:h=e.LEQUAL}={}){e.canvas||console.error("gl not passed as first argument to Program"),this.gl=e,this.uniforms=s,this.id=ir++,i||console.warn("vertex shader not supplied"),r||console.warn("fragment shader not supplied"),this.transparent=n,this.cullFace=a,this.frontFace=o,this.depthTest=l,this.depthWrite=c,this.depthFunc=h,this.blendFunc={},this.blendEquation={},this.stencilFunc={},this.stencilOp={},this.transparent&&!this.blendFunc.src&&(this.gl.renderer.premultipliedAlpha?this.setBlendFunc(this.gl.ONE,this.gl.ONE_MINUS_SRC_ALPHA):this.setBlendFunc(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA)),this.vertexShader=e.createShader(e.VERTEX_SHADER),this.fragmentShader=e.createShader(e.FRAGMENT_SHADER),this.program=e.createProgram(),e.attachShader(this.program,this.vertexShader),e.attachShader(this.program,this.fragmentShader),this.setShaders({vertex:i,fragment:r})}setShaders({vertex:e,fragment:i}){if(e&&(this.gl.shaderSource(this.vertexShader,e),this.gl.compileShader(this.vertexShader),this.gl.getShaderInfoLog(this.vertexShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.vertexShader)}
Vertex Shader
${Bt(e)}`)),i&&(this.gl.shaderSource(this.fragmentShader,i),this.gl.compileShader(this.fragmentShader),this.gl.getShaderInfoLog(this.fragmentShader)!==""&&console.warn(`${this.gl.getShaderInfoLog(this.fragmentShader)}
Fragment Shader
${Bt(i)}`)),this.gl.linkProgram(this.program),!this.gl.getProgramParameter(this.program,this.gl.LINK_STATUS))return console.warn(this.gl.getProgramInfoLog(this.program));this.uniformLocations=new Map;let r=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_UNIFORMS);for(let a=0;a<r;a++){let o=this.gl.getActiveUniform(this.program,a);this.uniformLocations.set(o,this.gl.getUniformLocation(this.program,o.name));let l=o.name.match(/(\w+)/g);o.uniformName=l[0],o.nameComponents=l.slice(1)}this.attributeLocations=new Map;let s=[],n=this.gl.getProgramParameter(this.program,this.gl.ACTIVE_ATTRIBUTES);for(let a=0;a<n;a++){let o=this.gl.getActiveAttrib(this.program,a),l=this.gl.getAttribLocation(this.program,o.name);l!==-1&&(s[l]=o.name,this.attributeLocations.set(o,l))}this.attributeOrder=s.join("")}setBlendFunc(e,i,r,s){this.blendFunc.src=e,this.blendFunc.dst=i,this.blendFunc.srcAlpha=r,this.blendFunc.dstAlpha=s,e&&(this.transparent=!0)}setBlendEquation(e,i){this.blendEquation.modeRGB=e,this.blendEquation.modeAlpha=i}setStencilFunc(e,i,r){this.stencilRef=i,this.stencilFunc.func=e,this.stencilFunc.ref=i,this.stencilFunc.mask=r}setStencilOp(e,i,r){this.stencilOp.stencilFail=e,this.stencilOp.depthFail=i,this.stencilOp.depthPass=r}applyState(){this.depthTest?this.gl.renderer.enable(this.gl.DEPTH_TEST):this.gl.renderer.disable(this.gl.DEPTH_TEST),this.cullFace?this.gl.renderer.enable(this.gl.CULL_FACE):this.gl.renderer.disable(this.gl.CULL_FACE),this.blendFunc.src?this.gl.renderer.enable(this.gl.BLEND):this.gl.renderer.disable(this.gl.BLEND),this.cullFace&&this.gl.renderer.setCullFace(this.cullFace),this.gl.renderer.setFrontFace(this.frontFace),this.gl.renderer.setDepthMask(this.depthWrite),this.gl.renderer.setDepthFunc(this.depthFunc),this.blendFunc.src&&this.gl.renderer.setBlendFunc(this.blendFunc.src,this.blendFunc.dst,this.blendFunc.srcAlpha,this.blendFunc.dstAlpha),this.gl.renderer.setBlendEquation(this.blendEquation.modeRGB,this.blendEquation.modeAlpha),this.stencilFunc.func||this.stencilOp.stencilFail?this.gl.renderer.enable(this.gl.STENCIL_TEST):this.gl.renderer.disable(this.gl.STENCIL_TEST),this.gl.renderer.setStencilFunc(this.stencilFunc.func,this.stencilFunc.ref,this.stencilFunc.mask),this.gl.renderer.setStencilOp(this.stencilOp.stencilFail,this.stencilOp.depthFail,this.stencilOp.depthPass)}use({flipFaces:e=!1}={}){let i=-1;this.gl.renderer.state.currentProgram===this.id||(this.gl.useProgram(this.program),this.gl.renderer.state.currentProgram=this.id),this.uniformLocations.forEach((s,n)=>{let a=this.uniforms[n.uniformName];for(let o of n.nameComponents){if(!a)break;if(o in a)a=a[o];else{if(Array.isArray(a.value))break;a=void 0;break}}if(!a)return yt(`Active uniform ${n.name} has not been supplied`);if(a&&a.value===void 0)return yt(`${n.name} uniform is missing a value parameter`);if(a.value.texture)return i=i+1,a.value.update(i),Ne(this.gl,n.type,s,i);if(a.value.length&&a.value[0].texture){let o=[];return a.value.forEach(l=>{i=i+1,l.update(i),o.push(i)}),Ne(this.gl,n.type,s,o)}Ne(this.gl,n.type,s,a.value)}),this.applyState(),e&&this.gl.renderer.setFrontFace(this.frontFace===this.gl.CCW?this.gl.CW:this.gl.CCW)}remove(){this.gl.deleteProgram(this.program)}};function Ne(t,e,i,r){r=r.length?rr(r):r;let s=t.renderer.state.uniformLocations.get(i);if(r.length)if(s===void 0||s.length!==r.length)t.renderer.state.uniformLocations.set(i,r.slice(0));else{if(sr(s,r))return;s.set?s.set(r):nr(s,r),t.renderer.state.uniformLocations.set(i,s)}else{if(s===r)return;t.renderer.state.uniformLocations.set(i,r)}switch(e){case 5126:return r.length?t.uniform1fv(i,r):t.uniform1f(i,r);case 35664:return t.uniform2fv(i,r);case 35665:return t.uniform3fv(i,r);case 35666:return t.uniform4fv(i,r);case 35670:case 5124:case 35678:case 36306:case 35680:case 36289:return r.length?t.uniform1iv(i,r):t.uniform1i(i,r);case 35671:case 35667:return t.uniform2iv(i,r);case 35672:case 35668:return t.uniform3iv(i,r);case 35673:case 35669:return t.uniform4iv(i,r);case 35674:return t.uniformMatrix2fv(i,!1,r);case 35675:return t.uniformMatrix3fv(i,!1,r);case 35676:return t.uniformMatrix4fv(i,!1,r)}}function Bt(t){let e=t.split(`
`);for(let i=0;i<e.length;i++)e[i]=i+1+": "+e[i];return e.join(`
`)}function rr(t){let e=t.length,i=t[0].length;if(i===void 0)return t;let r=e*i,s=wt[r];s||(wt[r]=s=new Float32Array(r));for(let n=0;n<e;n++)s.set(t[n],n*i);return s}function sr(t,e){if(t.length!==e.length)return!1;for(let i=0,r=t.length;i<r;i++)if(t[i]!==e[i])return!1;return!0}function nr(t,e){for(let i=0,r=t.length;i<r;i++)t[i]=e[i]}var Oe=0;function yt(t){Oe>100||(console.warn(t),Oe++,Oe>100&&console.warn("More than 100 program warnings - stopping logs."))}var Ge=new O,ar=1,me=class{constructor({canvas:e=document.createElement("canvas"),width:i=300,height:r=150,dpr:s=1,alpha:n=!1,depth:a=!0,stencil:o=!1,antialias:l=!1,premultipliedAlpha:c=!1,preserveDrawingBuffer:h=!1,powerPreference:f="default",autoClear:p=!0,webgl:u=2}={}){let d={alpha:n,depth:a,stencil:o,antialias:l,premultipliedAlpha:c,preserveDrawingBuffer:h,powerPreference:f};this.dpr=s,this.alpha=n,this.color=!0,this.depth=a,this.stencil=o,this.premultipliedAlpha=c,this.autoClear=p,this.id=ar++,u===2&&(this.gl=e.getContext("webgl2",d)),this.isWebgl2=!!this.gl,this.gl||(this.gl=e.getContext("webgl",d)),this.gl||console.error("unable to create webgl context"),this.gl.renderer=this,this.setSize(i,r),this.state={},this.state.blendFunc={src:this.gl.ONE,dst:this.gl.ZERO},this.state.blendEquation={modeRGB:this.gl.FUNC_ADD},this.state.cullFace=!1,this.state.frontFace=this.gl.CCW,this.state.depthMask=!0,this.state.depthFunc=this.gl.LEQUAL,this.state.premultiplyAlpha=!1,this.state.flipY=!1,this.state.unpackAlignment=4,this.state.framebuffer=null,this.state.viewport={x:0,y:0,width:null,height:null},this.state.textureUnits=[],this.state.activeTextureUnit=0,this.state.boundBuffer=null,this.state.uniformLocations=new Map,this.state.currentProgram=null,this.extensions={},this.isWebgl2?(this.getExtension("EXT_color_buffer_float"),this.getExtension("OES_texture_float_linear")):(this.getExtension("OES_texture_float"),this.getExtension("OES_texture_float_linear"),this.getExtension("OES_texture_half_float"),this.getExtension("OES_texture_half_float_linear"),this.getExtension("OES_element_index_uint"),this.getExtension("OES_standard_derivatives"),this.getExtension("EXT_sRGB"),this.getExtension("WEBGL_depth_texture"),this.getExtension("WEBGL_draw_buffers")),this.getExtension("WEBGL_compressed_texture_astc"),this.getExtension("EXT_texture_compression_bptc"),this.getExtension("WEBGL_compressed_texture_s3tc"),this.getExtension("WEBGL_compressed_texture_etc1"),this.getExtension("WEBGL_compressed_texture_pvrtc"),this.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc"),this.vertexAttribDivisor=this.getExtension("ANGLE_instanced_arrays","vertexAttribDivisor","vertexAttribDivisorANGLE"),this.drawArraysInstanced=this.getExtension("ANGLE_instanced_arrays","drawArraysInstanced","drawArraysInstancedANGLE"),this.drawElementsInstanced=this.getExtension("ANGLE_instanced_arrays","drawElementsInstanced","drawElementsInstancedANGLE"),this.createVertexArray=this.getExtension("OES_vertex_array_object","createVertexArray","createVertexArrayOES"),this.bindVertexArray=this.getExtension("OES_vertex_array_object","bindVertexArray","bindVertexArrayOES"),this.deleteVertexArray=this.getExtension("OES_vertex_array_object","deleteVertexArray","deleteVertexArrayOES"),this.drawBuffers=this.getExtension("WEBGL_draw_buffers","drawBuffers","drawBuffersWEBGL"),this.parameters={},this.parameters.maxTextureUnits=this.gl.getParameter(this.gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS),this.parameters.maxAnisotropy=this.getExtension("EXT_texture_filter_anisotropic")?this.gl.getParameter(this.getExtension("EXT_texture_filter_anisotropic").MAX_TEXTURE_MAX_ANISOTROPY_EXT):0}setSize(e,i){this.width=e,this.height=i,this.gl.canvas.width=e*this.dpr,this.gl.canvas.height=i*this.dpr,this.gl.canvas.style&&Object.assign(this.gl.canvas.style,{width:e+"px",height:i+"px"})}setViewport(e,i,r=0,s=0){this.state.viewport.width===e&&this.state.viewport.height===i||(this.state.viewport.width=e,this.state.viewport.height=i,this.state.viewport.x=r,this.state.viewport.y=s,this.gl.viewport(r,s,e,i))}setScissor(e,i,r=0,s=0){this.gl.scissor(r,s,e,i)}enable(e){this.state[e]!==!0&&(this.gl.enable(e),this.state[e]=!0)}disable(e){this.state[e]!==!1&&(this.gl.disable(e),this.state[e]=!1)}setBlendFunc(e,i,r,s){this.state.blendFunc.src===e&&this.state.blendFunc.dst===i&&this.state.blendFunc.srcAlpha===r&&this.state.blendFunc.dstAlpha===s||(this.state.blendFunc.src=e,this.state.blendFunc.dst=i,this.state.blendFunc.srcAlpha=r,this.state.blendFunc.dstAlpha=s,r!==void 0?this.gl.blendFuncSeparate(e,i,r,s):this.gl.blendFunc(e,i))}setBlendEquation(e,i){e=e||this.gl.FUNC_ADD,!(this.state.blendEquation.modeRGB===e&&this.state.blendEquation.modeAlpha===i)&&(this.state.blendEquation.modeRGB=e,this.state.blendEquation.modeAlpha=i,i!==void 0?this.gl.blendEquationSeparate(e,i):this.gl.blendEquation(e))}setCullFace(e){this.state.cullFace!==e&&(this.state.cullFace=e,this.gl.cullFace(e))}setFrontFace(e){this.state.frontFace!==e&&(this.state.frontFace=e,this.gl.frontFace(e))}setDepthMask(e){this.state.depthMask!==e&&(this.state.depthMask=e,this.gl.depthMask(e))}setDepthFunc(e){this.state.depthFunc!==e&&(this.state.depthFunc=e,this.gl.depthFunc(e))}setStencilMask(e){this.state.stencilMask!==e&&(this.state.stencilMask=e,this.gl.stencilMask(e))}setStencilFunc(e,i,r){this.state.stencilFunc===e&&this.state.stencilRef===i&&this.state.stencilFuncMask===r||(this.state.stencilFunc=e||this.gl.ALWAYS,this.state.stencilRef=i||0,this.state.stencilFuncMask=r||0,this.gl.stencilFunc(e||this.gl.ALWAYS,i||0,r||0))}setStencilOp(e,i,r){this.state.stencilFail===e&&this.state.stencilDepthFail===i&&this.state.stencilDepthPass===r||(this.state.stencilFail=e,this.state.stencilDepthFail=i,this.state.stencilDepthPass=r,this.gl.stencilOp(e,i,r))}activeTexture(e){this.state.activeTextureUnit!==e&&(this.state.activeTextureUnit=e,this.gl.activeTexture(this.gl.TEXTURE0+e))}bindFramebuffer({target:e=this.gl.FRAMEBUFFER,buffer:i=null}={}){this.state.framebuffer!==i&&(this.state.framebuffer=i,this.gl.bindFramebuffer(e,i))}getExtension(e,i,r){return i&&this.gl[i]?this.gl[i].bind(this.gl):(this.extensions[e]||(this.extensions[e]=this.gl.getExtension(e)),i?this.extensions[e]?this.extensions[e][r].bind(this.extensions[e]):null:this.extensions[e])}sortOpaque(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.program.id!==i.program.id?e.program.id-i.program.id:e.zDepth!==i.zDepth?e.zDepth-i.zDepth:i.id-e.id}sortTransparent(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.zDepth!==i.zDepth?i.zDepth-e.zDepth:i.id-e.id}sortUI(e,i){return e.renderOrder!==i.renderOrder?e.renderOrder-i.renderOrder:e.program.id!==i.program.id?e.program.id-i.program.id:i.id-e.id}getRenderList({scene:e,camera:i,frustumCull:r,sort:s}){let n=[];if(i&&r&&i.updateFrustum(),e.traverse(a=>{if(!a.visible)return!0;a.draw&&(r&&a.frustumCulled&&i&&!i.frustumIntersectsMesh(a)||n.push(a))}),s){let a=[],o=[],l=[];n.forEach(c=>{c.program.transparent?c.program.depthTest?o.push(c):l.push(c):a.push(c),c.zDepth=0,!(c.renderOrder!==0||!c.program.depthTest||!i)&&(c.worldMatrix.getTranslation(Ge),Ge.applyMatrix4(i.projectionViewMatrix),c.zDepth=Ge.z)}),a.sort(this.sortOpaque),o.sort(this.sortTransparent),l.sort(this.sortUI),n=a.concat(o,l)}return n}render({scene:e,camera:i,target:r=null,update:s=!0,sort:n=!0,frustumCull:a=!0,clear:o}){r===null?(this.bindFramebuffer(),this.setViewport(this.width*this.dpr,this.height*this.dpr)):(this.bindFramebuffer(r),this.setViewport(r.width,r.height)),(o||this.autoClear&&o!==!1)&&(this.depth&&(!r||r.depth)&&(this.enable(this.gl.DEPTH_TEST),this.setDepthMask(!0)),(this.stencil||!r||r.stencil)&&(this.enable(this.gl.STENCIL_TEST),this.setStencilMask(255)),this.gl.clear((this.color?this.gl.COLOR_BUFFER_BIT:0)|(this.depth?this.gl.DEPTH_BUFFER_BIT:0)|(this.stencil?this.gl.STENCIL_BUFFER_BIT:0))),s&&e.updateMatrixWorld(),i&&i.updateMatrixWorld(),this.getRenderList({scene:e,camera:i,frustumCull:a,sort:n}).forEach(c=>{c.draw({camera:i})})}};function Mt(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t}function Ft(t,e,i,r,s){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t}function St(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i*i+r*r+s*s+n*n;return a>0&&(a=1/Math.sqrt(a)),t[0]=i*a,t[1]=r*a,t[2]=s*a,t[3]=n*a,t}function bt(t,e){return t[0]*e[0]+t[1]*e[1]+t[2]*e[2]+t[3]*e[3]}function Rt(t){return t[0]=0,t[1]=0,t[2]=0,t[3]=1,t}function Ct(t,e,i){i=i*.5;let r=Math.sin(i);return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=Math.cos(i),t}function We(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=i[0],l=i[1],c=i[2],h=i[3];return t[0]=r*h+a*o+s*c-n*l,t[1]=s*h+a*l+n*o-r*c,t[2]=n*h+a*c+r*l-s*o,t[3]=a*h-r*o-s*l-n*c,t}function Tt(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],o=Math.sin(i),l=Math.cos(i);return t[0]=r*l+a*o,t[1]=s*l+n*o,t[2]=n*l-s*o,t[3]=a*l-r*o,t}function _t(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],o=Math.sin(i),l=Math.cos(i);return t[0]=r*l-n*o,t[1]=s*l+a*o,t[2]=n*l+r*o,t[3]=a*l-s*o,t}function Ut(t,e,i){i*=.5;let r=e[0],s=e[1],n=e[2],a=e[3],o=Math.sin(i),l=Math.cos(i);return t[0]=r*l+s*o,t[1]=s*l-r*o,t[2]=n*l+a*o,t[3]=a*l-n*o,t}function It(t,e,i,r){let s=e[0],n=e[1],a=e[2],o=e[3],l=i[0],c=i[1],h=i[2],f=i[3],p,u,d,g,m;return u=s*l+n*c+a*h+o*f,u<0&&(u=-u,l=-l,c=-c,h=-h,f=-f),1-u>1e-6?(p=Math.acos(u),d=Math.sin(p),g=Math.sin((1-r)*p)/d,m=Math.sin(r*p)/d):(g=1-r,m=r),t[0]=g*s+m*l,t[1]=g*n+m*c,t[2]=g*a+m*h,t[3]=g*o+m*f,t}function Dt(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i*i+r*r+s*s+n*n,o=a?1/a:0;return t[0]=-i*o,t[1]=-r*o,t[2]=-s*o,t[3]=n*o,t}function Qt(t,e){return t[0]=-e[0],t[1]=-e[1],t[2]=-e[2],t[3]=e[3],t}function Vt(t,e){let i=e[0]+e[4]+e[8],r;if(i>0)r=Math.sqrt(i+1),t[3]=.5*r,r=.5/r,t[0]=(e[5]-e[7])*r,t[1]=(e[6]-e[2])*r,t[2]=(e[1]-e[3])*r;else{let s=0;e[4]>e[0]&&(s=1),e[8]>e[s*3+s]&&(s=2);let n=(s+1)%3,a=(s+2)%3;r=Math.sqrt(e[s*3+s]-e[n*3+n]-e[a*3+a]+1),t[s]=.5*r,r=.5/r,t[3]=(e[n*3+a]-e[a*3+n])*r,t[n]=(e[n*3+s]+e[s*3+n])*r,t[a]=(e[a*3+s]+e[s*3+a])*r}return t}function zt(t,e,i="YXZ"){let r=Math.sin(e[0]*.5),s=Math.cos(e[0]*.5),n=Math.sin(e[1]*.5),a=Math.cos(e[1]*.5),o=Math.sin(e[2]*.5),l=Math.cos(e[2]*.5);return i==="XYZ"?(t[0]=r*a*l+s*n*o,t[1]=s*n*l-r*a*o,t[2]=s*a*o+r*n*l,t[3]=s*a*l-r*n*o):i==="YXZ"?(t[0]=r*a*l+s*n*o,t[1]=s*n*l-r*a*o,t[2]=s*a*o-r*n*l,t[3]=s*a*l+r*n*o):i==="ZXY"?(t[0]=r*a*l-s*n*o,t[1]=s*n*l+r*a*o,t[2]=s*a*o+r*n*l,t[3]=s*a*l-r*n*o):i==="ZYX"?(t[0]=r*a*l-s*n*o,t[1]=s*n*l+r*a*o,t[2]=s*a*o-r*n*l,t[3]=s*a*l+r*n*o):i==="YZX"?(t[0]=r*a*l+s*n*o,t[1]=s*n*l+r*a*o,t[2]=s*a*o-r*n*l,t[3]=s*a*l-r*n*o):i==="XZY"&&(t[0]=r*a*l-s*n*o,t[1]=s*n*l-r*a*o,t[2]=s*a*o+r*n*l,t[3]=s*a*l+r*n*o),t}var Lt=Mt,Pt=Ft;var Nt=bt;var Ot=St;var Fe=class extends Array{constructor(e=0,i=0,r=0,s=1){super(e,i,r,s),this.onChange=()=>{},this._target=this;let n=["0","1","2","3"];return new Proxy(this,{set(a,o){let l=Reflect.set(...arguments);return l&&n.includes(o)&&a.onChange(),l}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}get w(){return this[3]}set x(e){this._target[0]=e,this.onChange()}set y(e){this._target[1]=e,this.onChange()}set z(e){this._target[2]=e,this.onChange()}set w(e){this._target[3]=e,this.onChange()}identity(){return Rt(this._target),this.onChange(),this}set(e,i,r,s){return e.length?this.copy(e):(Pt(this._target,e,i,r,s),this.onChange(),this)}rotateX(e){return Tt(this._target,this._target,e),this.onChange(),this}rotateY(e){return _t(this._target,this._target,e),this.onChange(),this}rotateZ(e){return Ut(this._target,this._target,e),this.onChange(),this}inverse(e=this._target){return Dt(this._target,e),this.onChange(),this}conjugate(e=this._target){return Qt(this._target,e),this.onChange(),this}copy(e){return Lt(this._target,e),this.onChange(),this}normalize(e=this._target){return Ot(this._target,e),this.onChange(),this}multiply(e,i){return i?We(this._target,e,i):We(this._target,this._target,e),this.onChange(),this}dot(e){return Nt(this._target,e)}fromMatrix3(e){return Vt(this._target,e),this.onChange(),this}fromEuler(e,i){return zt(this._target,e,e.order),i||this.onChange(),this}fromAxisAngle(e,i){return Ct(this._target,e,i),this.onChange(),this}slerp(e,i){return It(this._target,this._target,e,i),this.onChange(),this}fromArray(e,i=0){return this._target[0]=e[i],this._target[1]=e[i+1],this._target[2]=e[i+2],this._target[3]=e[i+3],this.onChange(),this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e[i+3]=this[3],e}};var hr=1e-6;function Gt(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t[9]=e[9],t[10]=e[10],t[11]=e[11],t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function Wt(t,e,i,r,s,n,a,o,l,c,h,f,p,u,d,g,m){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t[4]=n,t[5]=a,t[6]=o,t[7]=l,t[8]=c,t[9]=h,t[10]=f,t[11]=p,t[12]=u,t[13]=d,t[14]=g,t[15]=m,t}function kt(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=1,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=1,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function Ht(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],p=e[10],u=e[11],d=e[12],g=e[13],m=e[14],x=e[15],B=i*o-r*a,E=i*l-s*a,v=i*c-n*a,F=r*l-s*o,b=r*c-n*o,T=s*c-n*l,w=h*g-f*d,A=h*m-p*d,M=h*x-u*d,C=f*m-p*g,I=f*x-u*g,V=p*x-u*m,S=B*V-E*I+v*C+F*M-b*A+T*w;return S?(S=1/S,t[0]=(o*V-l*I+c*C)*S,t[1]=(s*I-r*V-n*C)*S,t[2]=(g*T-m*b+x*F)*S,t[3]=(p*b-f*T-u*F)*S,t[4]=(l*M-a*V-c*A)*S,t[5]=(i*V-s*M+n*A)*S,t[6]=(m*v-d*T-x*E)*S,t[7]=(h*T-p*v+u*E)*S,t[8]=(a*I-o*M+c*w)*S,t[9]=(r*M-i*I-n*w)*S,t[10]=(d*b-g*v+x*B)*S,t[11]=(f*v-h*b-u*B)*S,t[12]=(o*A-a*C-l*w)*S,t[13]=(i*C-r*A+s*w)*S,t[14]=(g*E-d*F-m*B)*S,t[15]=(h*F-f*E+p*B)*S,t):null}function ke(t){let e=t[0],i=t[1],r=t[2],s=t[3],n=t[4],a=t[5],o=t[6],l=t[7],c=t[8],h=t[9],f=t[10],p=t[11],u=t[12],d=t[13],g=t[14],m=t[15],x=e*a-i*n,B=e*o-r*n,E=e*l-s*n,v=i*o-r*a,F=i*l-s*a,b=r*l-s*o,T=c*d-h*u,w=c*g-f*u,A=c*m-p*u,M=h*g-f*d,C=h*m-p*d,I=f*m-p*g;return x*I-B*C+E*M+v*A-F*w+b*T}function He(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],c=e[6],h=e[7],f=e[8],p=e[9],u=e[10],d=e[11],g=e[12],m=e[13],x=e[14],B=e[15],E=i[0],v=i[1],F=i[2],b=i[3];return t[0]=E*r+v*o+F*f+b*g,t[1]=E*s+v*l+F*p+b*m,t[2]=E*n+v*c+F*u+b*x,t[3]=E*a+v*h+F*d+b*B,E=i[4],v=i[5],F=i[6],b=i[7],t[4]=E*r+v*o+F*f+b*g,t[5]=E*s+v*l+F*p+b*m,t[6]=E*n+v*c+F*u+b*x,t[7]=E*a+v*h+F*d+b*B,E=i[8],v=i[9],F=i[10],b=i[11],t[8]=E*r+v*o+F*f+b*g,t[9]=E*s+v*l+F*p+b*m,t[10]=E*n+v*c+F*u+b*x,t[11]=E*a+v*h+F*d+b*B,E=i[12],v=i[13],F=i[14],b=i[15],t[12]=E*r+v*o+F*f+b*g,t[13]=E*s+v*l+F*p+b*m,t[14]=E*n+v*c+F*u+b*x,t[15]=E*a+v*h+F*d+b*B,t}function Yt(t,e,i){let r=i[0],s=i[1],n=i[2],a,o,l,c,h,f,p,u,d,g,m,x;return e===t?(t[12]=e[0]*r+e[4]*s+e[8]*n+e[12],t[13]=e[1]*r+e[5]*s+e[9]*n+e[13],t[14]=e[2]*r+e[6]*s+e[10]*n+e[14],t[15]=e[3]*r+e[7]*s+e[11]*n+e[15]):(a=e[0],o=e[1],l=e[2],c=e[3],h=e[4],f=e[5],p=e[6],u=e[7],d=e[8],g=e[9],m=e[10],x=e[11],t[0]=a,t[1]=o,t[2]=l,t[3]=c,t[4]=h,t[5]=f,t[6]=p,t[7]=u,t[8]=d,t[9]=g,t[10]=m,t[11]=x,t[12]=a*r+h*s+d*n+e[12],t[13]=o*r+f*s+g*n+e[13],t[14]=l*r+p*s+m*n+e[14],t[15]=c*r+u*s+x*n+e[15]),t}function Xt(t,e,i){let r=i[0],s=i[1],n=i[2];return t[0]=e[0]*r,t[1]=e[1]*r,t[2]=e[2]*r,t[3]=e[3]*r,t[4]=e[4]*s,t[5]=e[5]*s,t[6]=e[6]*s,t[7]=e[7]*s,t[8]=e[8]*n,t[9]=e[9]*n,t[10]=e[10]*n,t[11]=e[11]*n,t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15],t}function qt(t,e,i,r){let s=r[0],n=r[1],a=r[2],o=Math.hypot(s,n,a),l,c,h,f,p,u,d,g,m,x,B,E,v,F,b,T,w,A,M,C,I,V,S,G;return Math.abs(o)<hr?null:(o=1/o,s*=o,n*=o,a*=o,l=Math.sin(i),c=Math.cos(i),h=1-c,f=e[0],p=e[1],u=e[2],d=e[3],g=e[4],m=e[5],x=e[6],B=e[7],E=e[8],v=e[9],F=e[10],b=e[11],T=s*s*h+c,w=n*s*h+a*l,A=a*s*h-n*l,M=s*n*h-a*l,C=n*n*h+c,I=a*n*h+s*l,V=s*a*h+n*l,S=n*a*h-s*l,G=a*a*h+c,t[0]=f*T+g*w+E*A,t[1]=p*T+m*w+v*A,t[2]=u*T+x*w+F*A,t[3]=d*T+B*w+b*A,t[4]=f*M+g*C+E*I,t[5]=p*M+m*C+v*I,t[6]=u*M+x*C+F*I,t[7]=d*M+B*C+b*I,t[8]=f*V+g*S+E*G,t[9]=p*V+m*S+v*G,t[10]=u*V+x*S+F*G,t[11]=d*V+B*S+b*G,e!==t&&(t[12]=e[12],t[13]=e[13],t[14]=e[14],t[15]=e[15]),t)}function Jt(t,e){return t[0]=e[12],t[1]=e[13],t[2]=e[14],t}function Ye(t,e){let i=e[0],r=e[1],s=e[2],n=e[4],a=e[5],o=e[6],l=e[8],c=e[9],h=e[10];return t[0]=Math.hypot(i,r,s),t[1]=Math.hypot(n,a,o),t[2]=Math.hypot(l,c,h),t}function Kt(t){let e=t[0],i=t[1],r=t[2],s=t[4],n=t[5],a=t[6],o=t[8],l=t[9],c=t[10],h=e*e+i*i+r*r,f=s*s+n*n+a*a,p=o*o+l*l+c*c;return Math.sqrt(Math.max(h,f,p))}var Xe=(function(){let t=[1,1,1];return function(e,i){let r=t;Ye(r,i);let s=1/r[0],n=1/r[1],a=1/r[2],o=i[0]*s,l=i[1]*n,c=i[2]*a,h=i[4]*s,f=i[5]*n,p=i[6]*a,u=i[8]*s,d=i[9]*n,g=i[10]*a,m=o+f+g,x=0;return m>0?(x=Math.sqrt(m+1)*2,e[3]=.25*x,e[0]=(p-d)/x,e[1]=(u-c)/x,e[2]=(l-h)/x):o>f&&o>g?(x=Math.sqrt(1+o-f-g)*2,e[3]=(p-d)/x,e[0]=.25*x,e[1]=(l+h)/x,e[2]=(u+c)/x):f>g?(x=Math.sqrt(1+f-o-g)*2,e[3]=(u-c)/x,e[0]=(l+h)/x,e[1]=.25*x,e[2]=(p+d)/x):(x=Math.sqrt(1+g-o-f)*2,e[3]=(l-h)/x,e[0]=(u+c)/x,e[1]=(p+d)/x,e[2]=.25*x),e}})();function Zt(t,e,i,r){let s=te([t[0],t[1],t[2]]),n=te([t[4],t[5],t[6]]),a=te([t[8],t[9],t[10]]);ke(t)<0&&(s=-s),i[0]=t[12],i[1]=t[13],i[2]=t[14];let l=t.slice(),c=1/s,h=1/n,f=1/a;l[0]*=c,l[1]*=c,l[2]*=c,l[4]*=h,l[5]*=h,l[6]*=h,l[8]*=f,l[9]*=f,l[10]*=f,Xe(e,l),r[0]=s,r[1]=n,r[2]=a}function jt(t,e,i,r){let s=t,n=e[0],a=e[1],o=e[2],l=e[3],c=n+n,h=a+a,f=o+o,p=n*c,u=n*h,d=n*f,g=a*h,m=a*f,x=o*f,B=l*c,E=l*h,v=l*f,F=r[0],b=r[1],T=r[2];return s[0]=(1-(g+x))*F,s[1]=(u+v)*F,s[2]=(d-E)*F,s[3]=0,s[4]=(u-v)*b,s[5]=(1-(p+x))*b,s[6]=(m+B)*b,s[7]=0,s[8]=(d+E)*T,s[9]=(m-B)*T,s[10]=(1-(p+g))*T,s[11]=0,s[12]=i[0],s[13]=i[1],s[14]=i[2],s[15]=1,s}function $t(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i+i,o=r+r,l=s+s,c=i*a,h=r*a,f=r*o,p=s*a,u=s*o,d=s*l,g=n*a,m=n*o,x=n*l;return t[0]=1-f-d,t[1]=h+x,t[2]=p-m,t[3]=0,t[4]=h-x,t[5]=1-c-d,t[6]=u+g,t[7]=0,t[8]=p+m,t[9]=u-g,t[10]=1-c-f,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,t}function ei(t,e,i,r,s){let n=1/Math.tan(e/2),a=1/(r-s);return t[0]=n/i,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=n,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=(s+r)*a,t[11]=-1,t[12]=0,t[13]=0,t[14]=2*s*r*a,t[15]=0,t}function ti(t,e,i,r,s,n,a){let o=1/(e-i),l=1/(r-s),c=1/(n-a);return t[0]=-2*o,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=-2*l,t[6]=0,t[7]=0,t[8]=0,t[9]=0,t[10]=2*c,t[11]=0,t[12]=(e+i)*o,t[13]=(s+r)*l,t[14]=(a+n)*c,t[15]=1,t}function ii(t,e,i,r){let s=e[0],n=e[1],a=e[2],o=r[0],l=r[1],c=r[2],h=s-i[0],f=n-i[1],p=a-i[2],u=h*h+f*f+p*p;u===0?p=1:(u=1/Math.sqrt(u),h*=u,f*=u,p*=u);let d=l*p-c*f,g=c*h-o*p,m=o*f-l*h;return u=d*d+g*g+m*m,u===0&&(c?o+=1e-6:l?c+=1e-6:l+=1e-6,d=l*p-c*f,g=c*h-o*p,m=o*f-l*h,u=d*d+g*g+m*m),u=1/Math.sqrt(u),d*=u,g*=u,m*=u,t[0]=d,t[1]=g,t[2]=m,t[3]=0,t[4]=f*m-p*g,t[5]=p*d-h*m,t[6]=h*g-f*d,t[7]=0,t[8]=h,t[9]=f,t[10]=p,t[11]=0,t[12]=s,t[13]=n,t[14]=a,t[15]=1,t}function qe(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t[2]=e[2]+i[2],t[3]=e[3]+i[3],t[4]=e[4]+i[4],t[5]=e[5]+i[5],t[6]=e[6]+i[6],t[7]=e[7]+i[7],t[8]=e[8]+i[8],t[9]=e[9]+i[9],t[10]=e[10]+i[10],t[11]=e[11]+i[11],t[12]=e[12]+i[12],t[13]=e[13]+i[13],t[14]=e[14]+i[14],t[15]=e[15]+i[15],t}function Je(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t[2]=e[2]-i[2],t[3]=e[3]-i[3],t[4]=e[4]-i[4],t[5]=e[5]-i[5],t[6]=e[6]-i[6],t[7]=e[7]-i[7],t[8]=e[8]-i[8],t[9]=e[9]-i[9],t[10]=e[10]-i[10],t[11]=e[11]-i[11],t[12]=e[12]-i[12],t[13]=e[13]-i[13],t[14]=e[14]-i[14],t[15]=e[15]-i[15],t}function ri(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t[2]=e[2]*i,t[3]=e[3]*i,t[4]=e[4]*i,t[5]=e[5]*i,t[6]=e[6]*i,t[7]=e[7]*i,t[8]=e[8]*i,t[9]=e[9]*i,t[10]=e[10]*i,t[11]=e[11]*i,t[12]=e[12]*i,t[13]=e[13]*i,t[14]=e[14]*i,t[15]=e[15]*i,t}var J=class extends Array{constructor(e=1,i=0,r=0,s=0,n=0,a=1,o=0,l=0,c=0,h=0,f=1,p=0,u=0,d=0,g=0,m=1){return super(e,i,r,s,n,a,o,l,c,h,f,p,u,d,g,m),this}get x(){return this[12]}get y(){return this[13]}get z(){return this[14]}get w(){return this[15]}set x(e){this[12]=e}set y(e){this[13]=e}set z(e){this[14]=e}set w(e){this[15]=e}set(e,i,r,s,n,a,o,l,c,h,f,p,u,d,g,m){return e.length?this.copy(e):(Wt(this,e,i,r,s,n,a,o,l,c,h,f,p,u,d,g,m),this)}translate(e,i=this){return Yt(this,i,e),this}rotate(e,i,r=this){return qt(this,r,e,i),this}scale(e,i=this){return Xt(this,i,typeof e=="number"?[e,e,e]:e),this}add(e,i){return i?qe(this,e,i):qe(this,this,e),this}sub(e,i){return i?Je(this,e,i):Je(this,this,e),this}multiply(e,i){return e.length?i?He(this,e,i):He(this,this,e):ri(this,this,e),this}identity(){return kt(this),this}copy(e){return Gt(this,e),this}fromPerspective({fov:e,aspect:i,near:r,far:s}={}){return ei(this,e,i,r,s),this}fromOrthogonal({left:e,right:i,bottom:r,top:s,near:n,far:a}){return ti(this,e,i,r,s,n,a),this}fromQuaternion(e){return $t(this,e),this}setPosition(e){return this.x=e[0],this.y=e[1],this.z=e[2],this}inverse(e=this){return Ht(this,e),this}compose(e,i,r){return jt(this,e,i,r),this}decompose(e,i,r){return Zt(this,e,i,r),this}getRotation(e){return Xe(e,this),this}getTranslation(e){return Jt(e,this),this}getScaling(e){return Ye(e,this),this}getMaxScaleOnAxis(){return Kt(this)}lookAt(e,i,r){return ii(this,e,i,r),this}determinant(){return ke(this)}fromArray(e,i=0){return this[0]=e[i],this[1]=e[i+1],this[2]=e[i+2],this[3]=e[i+3],this[4]=e[i+4],this[5]=e[i+5],this[6]=e[i+6],this[7]=e[i+7],this[8]=e[i+8],this[9]=e[i+9],this[10]=e[i+10],this[11]=e[i+11],this[12]=e[i+12],this[13]=e[i+13],this[14]=e[i+14],this[15]=e[i+15],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e[i+3]=this[3],e[i+4]=this[4],e[i+5]=this[5],e[i+6]=this[6],e[i+7]=this[7],e[i+8]=this[8],e[i+9]=this[9],e[i+10]=this[10],e[i+11]=this[11],e[i+12]=this[12],e[i+13]=this[13],e[i+14]=this[14],e[i+15]=this[15],e}};function si(t,e,i="YXZ"){return i==="XYZ"?(t[1]=Math.asin(Math.min(Math.max(e[8],-1),1)),Math.abs(e[8])<.99999?(t[0]=Math.atan2(-e[9],e[10]),t[2]=Math.atan2(-e[4],e[0])):(t[0]=Math.atan2(e[6],e[5]),t[2]=0)):i==="YXZ"?(t[0]=Math.asin(-Math.min(Math.max(e[9],-1),1)),Math.abs(e[9])<.99999?(t[1]=Math.atan2(e[8],e[10]),t[2]=Math.atan2(e[1],e[5])):(t[1]=Math.atan2(-e[2],e[0]),t[2]=0)):i==="ZXY"?(t[0]=Math.asin(Math.min(Math.max(e[6],-1),1)),Math.abs(e[6])<.99999?(t[1]=Math.atan2(-e[2],e[10]),t[2]=Math.atan2(-e[4],e[5])):(t[1]=0,t[2]=Math.atan2(e[1],e[0]))):i==="ZYX"?(t[1]=Math.asin(-Math.min(Math.max(e[2],-1),1)),Math.abs(e[2])<.99999?(t[0]=Math.atan2(e[6],e[10]),t[2]=Math.atan2(e[1],e[0])):(t[0]=0,t[2]=Math.atan2(-e[4],e[5]))):i==="YZX"?(t[2]=Math.asin(Math.min(Math.max(e[1],-1),1)),Math.abs(e[1])<.99999?(t[0]=Math.atan2(-e[9],e[5]),t[1]=Math.atan2(-e[2],e[0])):(t[0]=0,t[1]=Math.atan2(e[8],e[10]))):i==="XZY"&&(t[2]=Math.asin(-Math.min(Math.max(e[4],-1),1)),Math.abs(e[4])<.99999?(t[0]=Math.atan2(e[6],e[5]),t[1]=Math.atan2(e[8],e[0])):(t[0]=Math.atan2(-e[9],e[10]),t[1]=0)),t}var ni=new J,Se=class extends Array{constructor(e=0,i=e,r=e,s="YXZ"){super(e,i,r),this.order=s,this.onChange=()=>{},this._target=this;let n=["0","1","2"];return new Proxy(this,{set(a,o){let l=Reflect.set(...arguments);return l&&n.includes(o)&&a.onChange(),l}})}get x(){return this[0]}get y(){return this[1]}get z(){return this[2]}set x(e){this._target[0]=e,this.onChange()}set y(e){this._target[1]=e,this.onChange()}set z(e){this._target[2]=e,this.onChange()}set(e,i=e,r=e){return e.length?this.copy(e):(this._target[0]=e,this._target[1]=i,this._target[2]=r,this.onChange(),this)}copy(e){return this._target[0]=e[0],this._target[1]=e[1],this._target[2]=e[2],this.onChange(),this}reorder(e){return this._target.order=e,this.onChange(),this}fromRotationMatrix(e,i=this.order){return si(this._target,e,i),this.onChange(),this}fromQuaternion(e,i=this.order,r){return ni.fromQuaternion(e),this._target.fromRotationMatrix(ni,i),r||this.onChange(),this}fromArray(e,i=0){return this._target[0]=e[i],this._target[1]=e[i+1],this._target[2]=e[i+2],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e[i+2]=this[2],e}};var be=class{constructor(){this.parent=null,this.children=[],this.visible=!0,this.matrix=new J,this.worldMatrix=new J,this.matrixAutoUpdate=!0,this.worldMatrixNeedsUpdate=!1,this.position=new O,this.quaternion=new Fe,this.scale=new O(1),this.rotation=new Se,this.up=new O(0,1,0),this.rotation._target.onChange=()=>this.quaternion.fromEuler(this.rotation,!0),this.quaternion._target.onChange=()=>this.rotation.fromQuaternion(this.quaternion,void 0,!0)}setParent(e,i=!0){this.parent&&e!==this.parent&&this.parent.removeChild(this,!1),this.parent=e,i&&e&&e.addChild(this,!1)}addChild(e,i=!0){~this.children.indexOf(e)||this.children.push(e),i&&e.setParent(this,!1)}removeChild(e,i=!0){~this.children.indexOf(e)&&this.children.splice(this.children.indexOf(e),1),i&&e.setParent(null,!1)}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.worldMatrixNeedsUpdate||e)&&(this.parent===null?this.worldMatrix.copy(this.matrix):this.worldMatrix.multiply(this.parent.worldMatrix,this.matrix),this.worldMatrixNeedsUpdate=!1,e=!0);for(let i=0,r=this.children.length;i<r;i++)this.children[i].updateMatrixWorld(e)}updateMatrix(){this.matrix.compose(this.quaternion,this.position,this.scale),this.worldMatrixNeedsUpdate=!0}traverse(e){if(!e(this))for(let i=0,r=this.children.length;i<r;i++)this.children[i].traverse(e)}decompose(){this.matrix.decompose(this.quaternion._target,this.position,this.scale),this.rotation.fromQuaternion(this.quaternion)}lookAt(e,i=!1){i?this.matrix.lookAt(this.position,e,this.up):this.matrix.lookAt(e,this.position,this.up),this.matrix.getRotation(this.quaternion._target),this.rotation.fromQuaternion(this.quaternion)}};function ai(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[4],t[4]=e[5],t[5]=e[6],t[6]=e[8],t[7]=e[9],t[8]=e[10],t}function oi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=i+i,o=r+r,l=s+s,c=i*a,h=r*a,f=r*o,p=s*a,u=s*o,d=s*l,g=n*a,m=n*o,x=n*l;return t[0]=1-f-d,t[3]=h-x,t[6]=p+m,t[1]=h+x,t[4]=1-c-d,t[7]=u-g,t[2]=p-m,t[5]=u+g,t[8]=1-c-f,t}function li(t,e){return t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],t[4]=e[4],t[5]=e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function hi(t,e,i,r,s,n,a,o,l,c){return t[0]=e,t[1]=i,t[2]=r,t[3]=s,t[4]=n,t[5]=a,t[6]=o,t[7]=l,t[8]=c,t}function ci(t){return t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1,t}function fi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=h*a-o*c,p=-h*n+o*l,u=c*n-a*l,d=i*f+r*p+s*u;return d?(d=1/d,t[0]=f*d,t[1]=(-h*r+s*c)*d,t[2]=(o*r-s*a)*d,t[3]=p*d,t[4]=(h*i-s*l)*d,t[5]=(-o*i+s*n)*d,t[6]=u*d,t[7]=(-c*i+r*l)*d,t[8]=(a*i-r*n)*d,t):null}function Ke(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],c=e[6],h=e[7],f=e[8],p=i[0],u=i[1],d=i[2],g=i[3],m=i[4],x=i[5],B=i[6],E=i[7],v=i[8];return t[0]=p*r+u*a+d*c,t[1]=p*s+u*o+d*h,t[2]=p*n+u*l+d*f,t[3]=g*r+m*a+x*c,t[4]=g*s+m*o+x*h,t[5]=g*n+m*l+x*f,t[6]=B*r+E*a+v*c,t[7]=B*s+E*o+v*h,t[8]=B*n+E*l+v*f,t}function ui(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],c=e[6],h=e[7],f=e[8],p=i[0],u=i[1];return t[0]=r,t[1]=s,t[2]=n,t[3]=a,t[4]=o,t[5]=l,t[6]=p*r+u*a+c,t[7]=p*s+u*o+h,t[8]=p*n+u*l+f,t}function di(t,e,i){let r=e[0],s=e[1],n=e[2],a=e[3],o=e[4],l=e[5],c=e[6],h=e[7],f=e[8],p=Math.sin(i),u=Math.cos(i);return t[0]=u*r+p*a,t[1]=u*s+p*o,t[2]=u*n+p*l,t[3]=u*a-p*r,t[4]=u*o-p*s,t[5]=u*l-p*n,t[6]=c,t[7]=h,t[8]=f,t}function pi(t,e,i){let r=i[0],s=i[1];return t[0]=r*e[0],t[1]=r*e[1],t[2]=r*e[2],t[3]=s*e[3],t[4]=s*e[4],t[5]=s*e[5],t[6]=e[6],t[7]=e[7],t[8]=e[8],t}function gi(t,e){let i=e[0],r=e[1],s=e[2],n=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],f=e[9],p=e[10],u=e[11],d=e[12],g=e[13],m=e[14],x=e[15],B=i*o-r*a,E=i*l-s*a,v=i*c-n*a,F=r*l-s*o,b=r*c-n*o,T=s*c-n*l,w=h*g-f*d,A=h*m-p*d,M=h*x-u*d,C=f*m-p*g,I=f*x-u*g,V=p*x-u*m,S=B*V-E*I+v*C+F*M-b*A+T*w;return S?(S=1/S,t[0]=(o*V-l*I+c*C)*S,t[1]=(l*M-a*V-c*A)*S,t[2]=(a*I-o*M+c*w)*S,t[3]=(s*I-r*V-n*C)*S,t[4]=(i*V-s*M+n*A)*S,t[5]=(r*M-i*I-n*w)*S,t[6]=(g*T-m*b+x*F)*S,t[7]=(m*v-d*T-x*E)*S,t[8]=(d*b-g*v+x*B)*S,t):null}var Re=class extends Array{constructor(e=1,i=0,r=0,s=0,n=1,a=0,o=0,l=0,c=1){return super(e,i,r,s,n,a,o,l,c),this}set(e,i,r,s,n,a,o,l,c){return e.length?this.copy(e):(hi(this,e,i,r,s,n,a,o,l,c),this)}translate(e,i=this){return ui(this,i,e),this}rotate(e,i=this){return di(this,i,e),this}scale(e,i=this){return pi(this,i,e),this}multiply(e,i){return i?Ke(this,e,i):Ke(this,this,e),this}identity(){return ci(this),this}copy(e){return li(this,e),this}fromMatrix4(e){return ai(this,e),this}fromQuaternion(e){return oi(this,e),this}fromBasis(e,i,r){return this.set(e[0],e[1],e[2],i[0],i[1],i[2],r[0],r[1],r[2]),this}inverse(e=this){return fi(this,e),this}getNormalMatrix(e){return gi(this,e),this}};var dr=0,re=class extends be{constructor(e,{geometry:i,program:r,mode:s=e.TRIANGLES,frustumCulled:n=!0,renderOrder:a=0}={}){super(),e.canvas||console.error("gl not passed as first argument to Mesh"),this.gl=e,this.id=dr++,this.geometry=i,this.program=r,this.mode=s,this.frustumCulled=n,this.renderOrder=a,this.modelViewMatrix=new J,this.normalMatrix=new Re,this.beforeRenderCallbacks=[],this.afterRenderCallbacks=[]}onBeforeRender(e){return this.beforeRenderCallbacks.push(e),this}onAfterRender(e){return this.afterRenderCallbacks.push(e),this}draw({camera:e}={}){e&&(this.program.uniforms.modelMatrix||Object.assign(this.program.uniforms,{modelMatrix:{value:null},viewMatrix:{value:null},modelViewMatrix:{value:null},normalMatrix:{value:null},projectionMatrix:{value:null},cameraPosition:{value:null}}),this.program.uniforms.projectionMatrix.value=e.projectionMatrix,this.program.uniforms.cameraPosition.value=e.worldPosition,this.program.uniforms.viewMatrix.value=e.viewMatrix,this.modelViewMatrix.multiply(e.viewMatrix,this.worldMatrix),this.normalMatrix.getNormalMatrix(this.modelViewMatrix),this.program.uniforms.modelMatrix.value=this.worldMatrix,this.program.uniforms.modelViewMatrix.value=this.modelViewMatrix,this.program.uniforms.normalMatrix.value=this.normalMatrix),this.beforeRenderCallbacks.forEach(r=>r&&r({mesh:this,camera:e}));let i=this.program.cullFace&&this.worldMatrix.determinant()<0;this.program.use({flipFaces:i}),this.geometry.draw({mode:this.mode,program:this.program}),this.afterRenderCallbacks.forEach(r=>r&&r({mesh:this,camera:e}))}};var mi=new Uint8Array(4);function xi(t){return(t&t-1)===0}var pr=1,ee=class{constructor(e,{image:i,target:r=e.TEXTURE_2D,type:s=e.UNSIGNED_BYTE,format:n=e.RGBA,internalFormat:a=n,wrapS:o=e.CLAMP_TO_EDGE,wrapT:l=e.CLAMP_TO_EDGE,wrapR:c=e.CLAMP_TO_EDGE,generateMipmaps:h=r===(e.TEXTURE_2D||e.TEXTURE_CUBE_MAP),minFilter:f=h?e.NEAREST_MIPMAP_LINEAR:e.LINEAR,magFilter:p=e.LINEAR,premultiplyAlpha:u=!1,unpackAlignment:d=4,flipY:g=r==(e.TEXTURE_2D||e.TEXTURE_3D),anisotropy:m=0,level:x=0,width:B,height:E=B,length:v=1}={}){this.gl=e,this.id=pr++,this.image=i,this.target=r,this.type=s,this.format=n,this.internalFormat=a,this.minFilter=f,this.magFilter=p,this.wrapS=o,this.wrapT=l,this.wrapR=c,this.generateMipmaps=h,this.premultiplyAlpha=u,this.unpackAlignment=d,this.flipY=g,this.anisotropy=Math.min(m,this.gl.renderer.parameters.maxAnisotropy),this.level=x,this.width=B,this.height=E,this.length=v,this.texture=this.gl.createTexture(),this.store={image:null},this.glState=this.gl.renderer.state,this.state={},this.state.minFilter=this.gl.NEAREST_MIPMAP_LINEAR,this.state.magFilter=this.gl.LINEAR,this.state.wrapS=this.gl.REPEAT,this.state.wrapT=this.gl.REPEAT,this.state.anisotropy=0}bind(){this.glState.textureUnits[this.glState.activeTextureUnit]!==this.id&&(this.gl.bindTexture(this.target,this.texture),this.glState.textureUnits[this.glState.activeTextureUnit]=this.id)}update(e=0){let i=!(this.image===this.store.image&&!this.needsUpdate);if((i||this.glState.textureUnits[e]!==this.id)&&(this.gl.renderer.activeTexture(e),this.bind()),!!i){if(this.needsUpdate=!1,this.flipY!==this.glState.flipY&&(this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL,this.flipY),this.glState.flipY=this.flipY),this.premultiplyAlpha!==this.glState.premultiplyAlpha&&(this.gl.pixelStorei(this.gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,this.premultiplyAlpha),this.glState.premultiplyAlpha=this.premultiplyAlpha),this.unpackAlignment!==this.glState.unpackAlignment&&(this.gl.pixelStorei(this.gl.UNPACK_ALIGNMENT,this.unpackAlignment),this.glState.unpackAlignment=this.unpackAlignment),this.minFilter!==this.state.minFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MIN_FILTER,this.minFilter),this.state.minFilter=this.minFilter),this.magFilter!==this.state.magFilter&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_MAG_FILTER,this.magFilter),this.state.magFilter=this.magFilter),this.wrapS!==this.state.wrapS&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_S,this.wrapS),this.state.wrapS=this.wrapS),this.wrapT!==this.state.wrapT&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_T,this.wrapT),this.state.wrapT=this.wrapT),this.wrapR!==this.state.wrapR&&(this.gl.texParameteri(this.target,this.gl.TEXTURE_WRAP_R,this.wrapR),this.state.wrapR=this.wrapR),this.anisotropy&&this.anisotropy!==this.state.anisotropy&&(this.gl.texParameterf(this.target,this.gl.renderer.getExtension("EXT_texture_filter_anisotropic").TEXTURE_MAX_ANISOTROPY_EXT,this.anisotropy),this.state.anisotropy=this.anisotropy),this.image){if(this.image.width&&(this.width=this.image.width,this.height=this.image.height),this.target===this.gl.TEXTURE_CUBE_MAP)for(let r=0;r<6;r++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+r,this.level,this.internalFormat,this.format,this.type,this.image[r]);else if(ArrayBuffer.isView(this.image))this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,this.image):(this.target===this.gl.TEXTURE_2D_ARRAY||this.target===this.gl.TEXTURE_3D)&&this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);else if(this.image.isCompressedTexture)for(let r=0;r<this.image.length;r++)this.gl.compressedTexImage2D(this.target,r,this.internalFormat,this.image[r].width,this.image[r].height,0,this.image[r].data);else this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.format,this.type,this.image):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,this.image);this.generateMipmaps&&(!this.gl.renderer.isWebgl2&&(!xi(this.image.width)||!xi(this.image.height))?(this.generateMipmaps=!1,this.wrapS=this.wrapT=this.gl.CLAMP_TO_EDGE,this.minFilter=this.gl.LINEAR):this.gl.generateMipmap(this.target)),this.onUpdate&&this.onUpdate()}else if(this.target===this.gl.TEXTURE_CUBE_MAP)for(let r=0;r<6;r++)this.gl.texImage2D(this.gl.TEXTURE_CUBE_MAP_POSITIVE_X+r,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,mi);else this.width?this.target===this.gl.TEXTURE_2D?this.gl.texImage2D(this.target,this.level,this.internalFormat,this.width,this.height,0,this.format,this.type,null):this.gl.texImage3D(this.target,this.level,this.internalFormat,this.width,this.height,this.length,0,this.format,this.type,null):this.gl.texImage2D(this.target,0,this.gl.RGBA,1,1,0,this.gl.RGBA,this.gl.UNSIGNED_BYTE,mi);this.store.image=this.image}}};var xe=class{constructor(e,{width:i=e.canvas.width,height:r=e.canvas.height,target:s=e.FRAMEBUFFER,color:n=1,depth:a=!0,stencil:o=!1,depthTexture:l=!1,wrapS:c=e.CLAMP_TO_EDGE,wrapT:h=e.CLAMP_TO_EDGE,wrapR:f=e.CLAMP_TO_EDGE,minFilter:p=e.LINEAR,magFilter:u=p,type:d=e.UNSIGNED_BYTE,format:g=e.RGBA,internalFormat:m=g,unpackAlignment:x,premultiplyAlpha:B}={}){this.gl=e,this.width=i,this.height=r,this.depth=a,this.stencil=o,this.buffer=this.gl.createFramebuffer(),this.target=s,this.gl.renderer.bindFramebuffer(this),this.textures=[];let E=[];for(let v=0;v<n;v++)this.textures.push(new ee(e,{width:i,height:r,wrapS:c,wrapT:h,wrapR:f,minFilter:p,magFilter:u,type:d,format:g,internalFormat:m,unpackAlignment:x,premultiplyAlpha:B,flipY:!1,generateMipmaps:!1})),this.textures[v].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+v,this.gl.TEXTURE_2D,this.textures[v].texture,0),E.push(this.gl.COLOR_ATTACHMENT0+v);E.length>1&&this.gl.renderer.drawBuffers(E),this.texture=this.textures[0],l&&(this.gl.renderer.isWebgl2||this.gl.renderer.getExtension("WEBGL_depth_texture"))?(this.depthTexture=new ee(e,{width:i,height:r,minFilter:this.gl.NEAREST,magFilter:this.gl.NEAREST,format:this.stencil?this.gl.DEPTH_STENCIL:this.gl.DEPTH_COMPONENT,internalFormat:e.renderer.isWebgl2?this.stencil?this.gl.DEPTH24_STENCIL8:this.gl.DEPTH_COMPONENT16:this.gl.DEPTH_COMPONENT,type:this.stencil?this.gl.UNSIGNED_INT_24_8:this.gl.UNSIGNED_INT}),this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.stencil?this.gl.DEPTH_STENCIL_ATTACHMENT:this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(a&&!o&&(this.depthBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,this.depthBuffer)),o&&!a&&(this.stencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.stencilBuffer)),a&&o&&(this.depthStencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,i,r),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.depthStencilBuffer))),this.gl.renderer.bindFramebuffer({target:this.target})}setSize(e,i){if(!(this.width===e&&this.height===i)){this.width=e,this.height=i,this.gl.renderer.bindFramebuffer(this);for(let r=0;r<this.textures.length;r++)this.textures[r].width=e,this.textures[r].height=i,this.textures[r].needsUpdate=!0,this.textures[r].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+r,this.gl.TEXTURE_2D,this.textures[r].texture,0);this.depthTexture?(this.depthTexture.width=e,this.depthTexture.height=i,this.depthTexture.needsUpdate=!0,this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(this.depthBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,e,i)),this.stencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,e,i)),this.depthStencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,e,i))),this.gl.renderer.bindFramebuffer({target:this.target})}}};function Ai(t,e){return t[0]=e[0],t[1]=e[1],t}function Ei(t,e,i){return t[0]=e,t[1]=i,t}function Ze(t,e,i){return t[0]=e[0]+i[0],t[1]=e[1]+i[1],t}function je(t,e,i){return t[0]=e[0]-i[0],t[1]=e[1]-i[1],t}function vi(t,e,i){return t[0]=e[0]*i[0],t[1]=e[1]*i[1],t}function wi(t,e,i){return t[0]=e[0]/i[0],t[1]=e[1]/i[1],t}function Ce(t,e,i){return t[0]=e[0]*i,t[1]=e[1]*i,t}function Bi(t,e){var i=e[0]-t[0],r=e[1]-t[1];return Math.sqrt(i*i+r*r)}function yi(t,e){var i=e[0]-t[0],r=e[1]-t[1];return i*i+r*r}function $e(t){var e=t[0],i=t[1];return Math.sqrt(e*e+i*i)}function Mi(t){var e=t[0],i=t[1];return e*e+i*i}function Fi(t,e){return t[0]=-e[0],t[1]=-e[1],t}function Si(t,e){return t[0]=1/e[0],t[1]=1/e[1],t}function bi(t,e){var i=e[0],r=e[1],s=i*i+r*r;return s>0&&(s=1/Math.sqrt(s)),t[0]=e[0]*s,t[1]=e[1]*s,t}function Ri(t,e){return t[0]*e[0]+t[1]*e[1]}function et(t,e){return t[0]*e[1]-t[1]*e[0]}function Ci(t,e,i,r){var s=e[0],n=e[1];return t[0]=s+r*(i[0]-s),t[1]=n+r*(i[1]-n),t}function Ti(t,e,i,r,s){let n=Math.exp(-r*s),a=e[0],o=e[1];return t[0]=i[0]+(a-i[0])*n,t[1]=i[1]+(o-i[1])*n,t}function _i(t,e,i){var r=e[0],s=e[1];return t[0]=i[0]*r+i[3]*s+i[6],t[1]=i[1]*r+i[4]*s+i[7],t}function Ui(t,e,i){let r=e[0],s=e[1];return t[0]=i[0]*r+i[4]*s+i[12],t[1]=i[1]*r+i[5]*s+i[13],t}function Ii(t,e){return t[0]===e[0]&&t[1]===e[1]}var K=class t extends Array{constructor(e=0,i=e){return super(e,i),this}get x(){return this[0]}get y(){return this[1]}set x(e){this[0]=e}set y(e){this[1]=e}set(e,i=e){return e.length?this.copy(e):(Ei(this,e,i),this)}copy(e){return Ai(this,e),this}add(e,i){return i?Ze(this,e,i):Ze(this,this,e),this}sub(e,i){return i?je(this,e,i):je(this,this,e),this}multiply(e){return e.length?vi(this,this,e):Ce(this,this,e),this}divide(e){return e.length?wi(this,this,e):Ce(this,this,1/e),this}inverse(e=this){return Si(this,e),this}len(){return $e(this)}distance(e){return e?Bi(this,e):$e(this)}squaredLen(){return this.squaredDistance()}squaredDistance(e){return e?yi(this,e):Mi(this)}negate(e=this){return Fi(this,e),this}cross(e,i){return i?et(e,i):et(this,e)}scale(e){return Ce(this,this,e),this}normalize(){return bi(this,this),this}dot(e){return Ri(this,e)}equals(e){return Ii(this,e)}applyMatrix3(e){return _i(this,this,e),this}applyMatrix4(e){return Ui(this,this,e),this}lerp(e,i){return Ci(this,this,e,i),this}smoothLerp(e,i,r){return Ti(this,this,e,i,r),this}clone(){return new t(this[0],this[1])}fromArray(e,i=0){return this[0]=e[i],this[1]=e[i+1],this}toArray(e=[],i=0){return e[i]=this[0],e[i+1]=this[1],e}};var se=class extends Me{constructor(e,{attributes:i={}}={}){Object.assign(i,{position:{size:2,data:new Float32Array([-1,-1,3,-1,-1,3])},uv:{size:2,data:new Float32Array([0,0,2,0,0,2])}}),super(e,i)}};var Ae=class{constructor(e,{size:i=128,falloff:r=.3,alpha:s=1,dissipation:n=.98,type:a}={}){let o=this;this.gl=e,this.uniform={value:null},this.mask={read:null,write:null,swap:()=>{let h=o.mask.read;o.mask.read=o.mask.write,o.mask.write=h,o.uniform.value=o.mask.read.texture}},l(),this.aspect=1,this.mouse=new K,this.velocity=new K,this.mesh=c();function l(){a||(a=e.HALF_FLOAT||e.renderer.extensions.OES_texture_half_float.HALF_FLOAT_OES);let h=e.renderer.isWebgl2||e.renderer.extensions[`OES_texture_${a===e.FLOAT?"":"half_"}float_linear`]?e.LINEAR:e.NEAREST,f={width:i,height:i,type:a,format:e.RGBA,internalFormat:e.renderer.isWebgl2?a===e.FLOAT?e.RGBA32F:e.RGBA16F:e.RGBA,minFilter:h,depth:!1};o.mask.read=new xe(e,f),o.mask.write=new xe(e,f),o.mask.swap()}function c(){return new re(e,{geometry:new se(e),program:new ie(e,{vertex:mr,fragment:xr,uniforms:{tMap:o.uniform,uFalloff:{value:r*.5},uAlpha:{value:s},uDissipation:{value:n},uAspect:{value:1},uMouse:{value:o.mouse},uVelocity:{value:o.velocity}},depthTest:!1})})}}update(){this.mesh.program.uniforms.uAspect.value=this.aspect,this.gl.renderer.render({scene:this.mesh,target:this.mask.write,clear:!1}),this.mask.swap()}},mr=`
    attribute vec2 uv;
    attribute vec2 position;

    varying vec2 vUv;

    void main() {
        vUv = uv;
        gl_Position = vec4(position, 0, 1);
    }
`,xr=`
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
`;var Ar="attribute vec2 uv;attribute vec2 position;varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position,0.,1.);}",Er=`precision highp float;
uniform sampler2D tCloudA;uniform sampler2D tCloudB;uniform sampler2D tCloudC;uniform sampler2D tFlow;uniform vec2 uSize;uniform float uProgress;uniform float uWorldHeight;uniform float uForce;varying vec2 vUv;
vec2 sceneUV(vec2 pixel,float span,float worldY,float start){
 float width=span*2./3.;vec2 uv=vec2((pixel.x-.5*uSize.x)/width+.5,(worldY-start)/span);
 uv=clamp(uv,vec2(.002),vec2(.998));return (floor(uv*vec2(960.,1440.))+.5)/vec2(960.,1440.);
}
void main(){
 vec2 pixel=vec2(vUv.x,1.-vUv.y)*uSize;pixel=(floor(pixel)+.5);vec3 flow=texture2D(tFlow,vUv).rgb;
 pixel-=clamp(flow.xy*uForce*36.,vec2(-14.),vec2(14.));
 float cell=max(1.,ceil(uSize.x/960.));float span=1440.*cell,overlap=span*.16,stepSize=span-overlap;
 float total=span+stepSize*2.;float worldY=pixel.y+floor(uProgress*(total-uWorldHeight)/cell+.5)*cell;
 vec3 result;
 if(worldY<stepSize){result=texture2D(tCloudA,sceneUV(pixel,span,worldY,0.)).rgb;}
 else if(worldY<span){result=mix(texture2D(tCloudA,sceneUV(pixel,span,worldY,0.)).rgb,texture2D(tCloudB,sceneUV(pixel,span,worldY,stepSize)).rgb,smoothstep(stepSize,span,worldY));}
 else if(worldY<stepSize*2.){result=texture2D(tCloudB,sceneUV(pixel,span,worldY,stepSize)).rgb;}
 else if(worldY<stepSize*2.+overlap){result=mix(texture2D(tCloudB,sceneUV(pixel,span,worldY,stepSize)).rgb,texture2D(tCloudC,sceneUV(pixel,span,worldY,stepSize*2.)).rgb,smoothstep(stepSize*2.,stepSize*2.+overlap,worldY));}
 else{result=texture2D(tCloudC,sceneUV(pixel,span,worldY,stepSize*2.)).rgb;}
 result=mix(result,result*.975,clamp(flow.z,0.,1.)*.3*uForce);gl_FragColor=vec4(result,1.);
}`;async function Di(t,e){let i=matchMedia("(hover:hover) and (pointer:fine)"),r=matchMedia("(prefers-reduced-motion:reduce)"),s=matchMedia("(prefers-reduced-transparency:reduce)"),n=matchMedia("(forced-colors:active)"),a,o,l,c,h,f=0,p=0,u=0,d=!1,g=scrollY,m=scrollY,x=null,B=0,E=0,v=!1,F=innerHeight,b=innerWidth,T=new K,w=()=>r.matches||document.body.classList.contains("motion-off"),A=()=>!document.hidden&&!s.matches&&!n.matches&&!v,M=()=>A()&&i.matches&&!w();try{let j=function(){for(let R of[l.mask.read,l.mask.write])a.bindFramebuffer(R),o.clearColor(0,0,0,0),o.clear(o.COLOR_BUFFER_BIT);a.bindFramebuffer()},q=function(){return Math.max(0,Math.min(1,g/Math.max(1,document.documentElement.scrollHeight-F)))},_=function(){c.uniforms.uProgress.value=w()?0:q(),c.uniforms.uForce.value=w()?0:1,a.render({scene:h}),p++},Q=function(){b!==innerWidth&&(b=innerWidth,F=innerHeight),c.uniforms.uWorldHeight.value=F,a.setSize(Math.round(innerWidth),Math.round(innerHeight)),c.uniforms.uSize.value.set(innerWidth,innerHeight),l.aspect=innerWidth/innerHeight,x=null,j(),E=0,g=m=scrollY,_()},D=function(){T.set(0),l.velocity.set(0),l.mouse.set(-1),E=0,x=null,j()},U=function(){cancelAnimationFrame(f),f=0,d=!1,D(),g=m=scrollY,A()&&_()},P=function(){if(f=0,!A()){U();return}if(d=!0,performance.now()-B>65&&T.set(0),w()){g=m,D(),_(),d=!1;return}g+=(m-g)*.18,Math.abs(m-g)<.1&&(g=m),l.velocity.lerp(T,.25),T.multiply(.72),E=Math.max(E*.9,l.velocity.len()),l.update(),_(),E>.001||l.velocity.len()>.001||Math.abs(m-g)>.1?f=requestAnimationFrame(P):(D(),_(),d=!1)},z=function(){!f&&A()&&(f=requestAnimationFrame(P))};var C=j,I=q,V=_,S=Q,G=D,Z=U,fe=P,Ie=z;if(a=new me({dpr:1,alpha:!1,antialias:!1,depth:!1,stencil:!1,preserveDrawingBuffer:!1}),o=a.gl,!o)throw new Error("Cloud WebGL unavailable");let Y=o.getExtension("WEBGL_debug_renderer_info"),oe=Y?o.getParameter(Y.UNMASKED_RENDERER_WEBGL):"";if(!window.PAPER_FORCE_WEBGL&&/SwiftShader|llvmpipe|softpipe|software rasterizer/i.test(oe))return o.getExtension("WEBGL_lose_context")?.loseContext(),await ve(t,e);o.getExtension("EXT_color_buffer_float"),l=new Ae(o,{size:64,falloff:.32,alpha:.4,dissipation:.9}),j();let $=[],le=async R=>{let L=new Image;L.src=R;try{await L.decode()}catch(N){if(!R.endsWith(".lossless.webp"))throw N;L.src=R.replace(".lossless.webp",".png"),await L.decode()}return L},W=await le(e[0]),X=document.createElement("canvas");X.width=X.height=1;let ue=X.getContext("2d");ue.fillStyle="#cfdfeb",ue.fillRect(0,0,1,1);for(let R=0;R<3;R++){let L=new ee(o,{minFilter:o.NEAREST,magFilter:o.NEAREST,generateMipmaps:!1,flipY:!1});L.image=R===0?W:X,$.push(L)}return c=new ie(o,{vertex:Ar,fragment:Er,depthTest:!1,depthWrite:!1,uniforms:{tCloudA:{value:$[0]},tCloudB:{value:$[1]},tCloudC:{value:$[2]},tFlow:l.uniform,uSize:{value:new K(innerWidth,innerHeight)},uProgress:{value:0},uWorldHeight:{value:F},uForce:{value:1}}}),h=new re(o,{geometry:new se(o),program:c}),o.canvas.className="cloud-flow-canvas",o.canvas.setAttribute("aria-hidden","true"),t.append(o.canvas),t.classList.add("is-flowing"),document.addEventListener("pointermove",R=>{if(!M()||R.pointerType==="touch")return;let L=performance.now();if(l.mouse.set(R.clientX/innerWidth,1-R.clientY/innerHeight),x&&Math.hypot(R.clientX-x.x,R.clientY-x.y)<240){let N=Math.min(64,Math.max(12,L-B));T.set((R.clientX-x.x)/N*.3,(R.clientY-x.y)/N*.3);let k=T.len();k>.65&&T.multiply(.65/k),E=Math.max(.06,T.len()),u++,z()}x={x:R.clientX,y:R.clientY},B=L},{passive:!0}),window.addEventListener("scroll",()=>{m=scrollY,z()},{passive:!0}),window.addEventListener("resize",()=>{U(),Q()}),document.documentElement.addEventListener("pointerleave",()=>{x=null,T.set(0),z()}),document.addEventListener("visibilitychange",()=>{document.hidden?U():(Q(),z())}),window.addEventListener("blur",U),window.addEventListener("pagehide",U),r.addEventListener("change",U),i.addEventListener("change",U),s.addEventListener("change",U),n.addEventListener("change",U),document.querySelector(".reduce").addEventListener("click",U),o.canvas.addEventListener("webglcontextlost",R=>{R.preventDefault(),v=!0,cancelAnimationFrame(f),f=0,d=!1,t.classList.remove("is-flowing")}),o.canvas.addEventListener("webglcontextrestored",()=>{o.canvas.remove(),ve(t,e).catch(()=>t.classList.remove("is-flowing"))}),Q(),e.slice(1).forEach((R,L)=>le(R).then(N=>{$[L+1].image=N,z()}).catch(N=>console.warn("Cloud layer unavailable:",N.message))),{stop:U,stats:()=>({mode:"ogl-flowmap",loadedSources:$.filter(R=>R.image!==X).length,cellCSS:Math.max(1,Math.ceil(innerWidth/960)),worldHeight:F,renderSize:[o.drawingBufferWidth,o.drawingBufferHeight],flowSize:64,active:d,emissions:u,allowed:M(),frames:p,scroll:g,progress:w()?0:q(),sceneIndex:Math.min(2,Math.floor(q()*3)),sources:3,mirrored:!1,looped:!1,maxDisplacement:14,reduced:w(),contextLost:v}),signature:()=>{_();let R=new Uint8Array(o.drawingBufferWidth*o.drawingBufferHeight*4);o.readPixels(0,0,o.drawingBufferWidth,o.drawingBufferHeight,o.RGBA,o.UNSIGNED_BYTE,R);let L=2166136261;for(let N=0;N<R.length;N+=16)L=Math.imul(L^R[N],16777619);return L>>>0}}}catch(Y){console.warn("Cloud flow fallback:",Y.message),t.classList.remove("is-flowing");try{return await ve(t,e)}catch(oe){return{stop:()=>{},stats:()=>({mode:"static-fallback",active:!1,error:oe.message})}}}}var Qi=`#version 300 es
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
}`;var Vi=1920*1080*4,ne=class{constructor(e,i,r,s,n=0,a=0,o=2,l=Vi,c=[]){y(this,"parentElement");y(this,"canvasElement");y(this,"gl");y(this,"program",null);y(this,"uniformLocations",{});y(this,"fragmentShader");y(this,"rafId",null);y(this,"lastRenderTime",0);y(this,"currentFrame",0);y(this,"speed",0);y(this,"currentSpeed",0);y(this,"providedUniforms");y(this,"mipmaps",[]);y(this,"hasBeenDisposed",!1);y(this,"resolutionChanged",!0);y(this,"textures",new Map);y(this,"minPixelRatio");y(this,"maxPixelCount");y(this,"isSafari",Br());y(this,"uniformCache",{});y(this,"textureUnitMap",new Map);y(this,"ownerDocument");y(this,"initProgram",()=>{let e=vr(this.gl,Qi,this.fragmentShader);e&&(this.program=e)});y(this,"setupPositionAttribute",()=>{let e=this.gl.getAttribLocation(this.program,"a_position"),i=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,i);let r=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(r),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)});y(this,"setupUniforms",()=>{let e={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution")};Object.entries(this.providedUniforms).forEach(([i,r])=>{if(e[i]=this.gl.getUniformLocation(this.program,i),r instanceof HTMLImageElement){let s=`${i}AspectRatio`;e[s]=this.gl.getUniformLocation(this.program,s)}}),this.uniformLocations=e});y(this,"renderScale",1);y(this,"parentWidth",0);y(this,"parentHeight",0);y(this,"parentDevicePixelWidth",0);y(this,"parentDevicePixelHeight",0);y(this,"devicePixelsSupported",!1);y(this,"intersectionObserver",null);y(this,"isInViewport",!0);y(this,"resizeObserver",null);y(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let i=e.devicePixelContentBoxSize?.[0];i!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=i.inlineSize,this.parentDevicePixelHeight=i.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)});y(this,"setupIntersectionObserver",()=>{let e=this.ownerDocument.defaultView;e?.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([i])=>{this.isInViewport=i?.isIntersecting??!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))});y(this,"handleVisualViewportChange",()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()});y(this,"handleResize",()=>{let e=0,i=0,r=Math.max(1,window.devicePixelRatio),s=visualViewport?.scale??1;if(this.devicePixelsSupported){let h=Math.max(1,this.minPixelRatio/r);e=this.parentDevicePixelWidth*h*s,i=this.parentDevicePixelHeight*h*s}else{let h=Math.max(r,this.minPixelRatio)*s;if(this.isSafari){let f=yr(this.ownerDocument);h*=Math.max(1,f)}e=Math.round(this.parentWidth)*h,i=Math.round(this.parentHeight)*h}let n=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*i),a=Math.min(1,n),o=Math.round(e*a),l=Math.round(i*a),c=o/Math.round(this.parentWidth);(this.canvasElement.width!==o||this.canvasElement.height!==l||this.renderScale!==c)&&(this.renderScale=c,this.canvasElement.width=o,this.canvasElement.height=l,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))});y(this,"render",e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn("Tried to render before program or gl was initialized");return}let i=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=i*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed!==0?this.requestRender():this.rafId=null});y(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)});y(this,"setTextureUniform",(e,i)=>{if(!i.complete||i.naturalWidth===0)throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let r=this.textures.get(e);r&&this.gl.deleteTexture(r),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let s=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+s);let n=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,n),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,i),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||n===null){console.error("Paper Shaders: WebGL error when uploading texture:",a);return}this.textures.set(e,n);let o=this.uniformLocations[e];if(o){this.gl.uniform1i(o,s);let l=`${e}AspectRatio`,c=this.uniformLocations[l];if(c){let h=i.naturalWidth/i.naturalHeight;this.gl.uniform1f(c,h)}}});y(this,"areUniformValuesEqual",(e,i)=>e===i?!0:Array.isArray(e)&&Array.isArray(i)&&e.length===i.length?e.every((r,s)=>this.areUniformValuesEqual(r,i[s])):!1);y(this,"setUniformValues",e=>{this.gl.useProgram(this.program),Object.entries(e).forEach(([i,r])=>{let s=r;if(r instanceof HTMLImageElement&&(s=`${r.src.slice(0,200)}|${r.naturalWidth}x${r.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[i],s))return;this.uniformCache[i]=s;let n=this.uniformLocations[i];if(!n){console.warn(`Uniform location for ${i} not found`);return}if(r instanceof HTMLImageElement)this.setTextureUniform(i,r);else if(Array.isArray(r)){let a=null,o=null;if(r[0]!==void 0&&Array.isArray(r[0])){let l=r[0].length;if(r.every(c=>c.length===l))a=r.flat(),o=l;else{console.warn(`All child arrays must be the same length for ${i}`);return}}else a=r,o=a.length;switch(o){case 2:this.gl.uniform2fv(n,a);break;case 3:this.gl.uniform3fv(n,a);break;case 4:this.gl.uniform4fv(n,a);break;case 9:this.gl.uniformMatrix3fv(n,!1,a);break;case 16:this.gl.uniformMatrix4fv(n,!1,a);break;default:console.warn(`Unsupported uniform array length: ${o}`)}}else typeof r=="number"?this.gl.uniform1f(n,r):typeof r=="boolean"?this.gl.uniform1i(n,r?1:0):console.warn(`Unsupported uniform type for ${i}: ${typeof r}`)})});y(this,"getCurrentFrame",()=>this.currentFrame);y(this,"setFrame",e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.render(performance.now())});y(this,"setSpeed",(e=1)=>{this.speed=e,this.updateCurrentSpeed()});y(this,"updateCurrentSpeed",()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)});y(this,"setCurrentSpeed",e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)});y(this,"setMaxPixelCount",(e=Vi)=>{this.maxPixelCount=e,this.handleResize()});y(this,"setMinPixelRatio",(e=2)=>{this.minPixelRatio=e,this.handleResize()});y(this,"setUniforms",e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.render(performance.now())});y(this,"handleDocumentVisibilityChange",()=>{this.updateCurrentSpeed()});y(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.intersectionObserver&&(this.intersectionObserver.disconnect(),this.intersectionObserver=null),visualViewport?.removeEventListener("resize",this.handleVisualViewportChange),this.ownerDocument.removeEventListener("visibilitychange",this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount});if(e?.nodeType===1)this.parentElement=e;else throw new Error("Paper Shaders: parent element must be an HTMLElement");if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector("style[data-paper-shader]")){let p=this.ownerDocument.createElement("style");p.innerHTML=wr,p.setAttribute("data-paper-shader",""),this.ownerDocument.head.prepend(p)}let h=this.ownerDocument.createElement("canvas");this.canvasElement=h,this.parentElement.prepend(h),this.fragmentShader=i,this.providedUniforms=r,this.mipmaps=c,this.currentFrame=a,this.minPixelRatio=o,this.maxPixelCount=l;let f=h.getContext("webgl2",s);if(!f)throw new Error("Paper Shaders: WebGL is not supported in this browser");this.gl=f,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener("resize",this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(n),this.parentElement.setAttribute("data-paper-shader",""),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener("visibilitychange",this.handleDocumentVisibilityChange)}};function zi(t,e,i){let r=t.createShader(e);return r?(t.shaderSource(r,i),t.compileShader(r),t.getShaderParameter(r,t.COMPILE_STATUS)?r:(console.error("An error occurred compiling the shaders: "+t.getShaderInfoLog(r)),t.deleteShader(r),null)):null}function vr(t,e,i){let r=t.getShaderPrecisionFormat(t.FRAGMENT_SHADER,t.MEDIUM_FLOAT),s=r?r.precision:null;s&&s<23&&(e=e.replace(/precision\s+(lowp|mediump)\s+float;/g,"precision highp float;"),i=i.replace(/precision\s+(lowp|mediump)\s+float/g,"precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,"$1 highp $3"));let n=zi(t,t.VERTEX_SHADER,e),a=zi(t,t.FRAGMENT_SHADER,i);if(!n||!a)return null;let o=t.createProgram();return o?(t.attachShader(o,n),t.attachShader(o,a),t.linkProgram(o),t.getProgramParameter(o,t.LINK_STATUS)?(t.detachShader(o,n),t.detachShader(o,a),t.deleteShader(n),t.deleteShader(a),o):(console.error("Unable to initialize the shader program: "+t.getProgramInfoLog(o)),t.deleteProgram(o),t.deleteShader(n),t.deleteShader(a),null)):null}var wr=`@layer paper-shaders {
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
}`;function Br(){let t=navigator.userAgent.toLowerCase();return t.includes("safari")&&!t.includes("chrome")&&!t.includes("android")}function yr(t){let e=visualViewport?.scale??1,i=visualViewport?.width??window.innerWidth,r=window.innerWidth-t.documentElement.clientWidth,s=e*i+r,n=outerWidth/s,a=Math.round(100*n);return a%5===0?a/100:a===33?1/3:a===67?2/3:a===133?4/3:n}var Te=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,Li=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,Pi=`
  float hash11(float p) {
    p = fract(p * 0.3183099) + 0.1;
    p *= p + 19.19;
    return fract(p * p);
  }
`,Ni=`
  float hash21(vec2 p) {
    p = fract(p * vec2(0.3183099, 0.3678794)) + 0.1;
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
`;var Oi=`
  float randomR(vec2 p) {
    vec2 uv = floor(p) / 100. + .5;
    return texture(u_noiseTexture, fract(uv)).r;
  }
`;var Gi=`
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
`;var Wi={maxColorCount:7},_s=`#version 300 es
precision lowp float;

uniform mediump float u_time;
uniform mediump vec2 u_resolution;
uniform mediump float u_pixelRatio;

uniform sampler2D u_noiseTexture;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${Wi.maxColorCount}];
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

${Te}
${Gi}
${Li}
${Oi}

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

${Pi}

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
  for (int i = 1; i < ${Wi.maxColorCount}; i++) {
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
`;var Ee=`#version 300 es
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


${Ni}
${Te}

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
`;function ae(t){if(Array.isArray(t))return t.length===4?t:t.length===3?[...t,1]:ce;if(typeof t!="string")return ce;let e,i,r,s=1;if(t.startsWith("#"))[e,i,r,s]=Mr(t);else if(t.startsWith("rgb")){let n=Fr(t);if(n===null)return ce;[e,i,r,s]=n}else if(t.startsWith("hsl")){let n=Sr(t);if(n===null)return ce;[e,i,r,s]=br(n)}else return console.error("Unsupported color format",t),ce;return[_e(e,0,1),_e(i,0,1),_e(r,0,1),_e(s,0,1)]}function Mr(t){if(t=t.replace(/^#/,""),(t.length===3||t.length===4)&&(t=t.split("").map(n=>n+n).join("")),t.length===6&&(t=t+"ff"),!/^[0-9a-f]{8}$/i.test(t))return console.warn("Invalid hex color"),ce;let e=parseInt(t.slice(0,2),16)/255,i=parseInt(t.slice(2,4),16)/255,r=parseInt(t.slice(4,6),16)/255,s=parseInt(t.slice(6,8),16)/255;return[e,i,r,s]}function Fr(t){let e=t.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0")/255,parseInt(e[2]??"0")/255,parseInt(e[3]??"0")/255,e[4]===void 0?1:parseFloat(e[4])]:null}function Sr(t){let e=t.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return e?[parseInt(e[1]??"0"),parseInt(e[2]??"0"),parseInt(e[3]??"0"),e[4]===void 0?1:parseFloat(e[4])]:null}function br(t){let[e,i,r,s]=t,n=e/360,a=i/100,o=r/100,l,c,h;if(i===0)l=c=h=o;else{let f=(d,g,m)=>(m<0&&(m+=1),m>1&&(m-=1),m<.16666666666666666?d+(g-d)*6*m:m<.5?g:m<.6666666666666666?d+(g-d)*(.6666666666666666-m)*6:d),p=o<.5?o*(1+a):o+a-o*a,u=2*o-p;l=f(u,p,n+1/3),c=f(u,p,n),h=f(u,p,n-1/3)}return[l,c,h,s]}var _e=(t,e,i)=>Math.min(Math.max(t,e),i),ce=[.5,.5,.5,1];var ki={u_originX:.5,u_originY:.5,u_worldWidth:0,u_worldHeight:0,u_fit:2,u_scale:1,u_rotation:0,u_offsetX:0,u_offsetY:0},Ue=()=>new Promise(t=>requestAnimationFrame(()=>requestAnimationFrame(t)));(async()=>{let t={background:!1,tile:!1,photos:0,model:!1,cloud:!1,errors:[],scrollUpdates:0,materialWrites:0};window.paperPrint={stats:()=>({...t})};try{let h=function(){document.querySelectorAll(".atlas-photo").forEach(u=>{let d=Object.keys(a).find(m=>u.classList.contains(m));if(!d||u.dataset.print===d)return;u.querySelector(".print-photo")?.remove(),u.style.position="relative";let g=document.createElement("div");g.className="print-photo",g.style.cssText='background-image:url("'+o[d]+'");background-size:cover;background-position:center;opacity:.92',u.append(g),u.dataset.print=d,t.photos++})};var e=h;t.background=!0;let r=window.PAPER_GENERATED_ASSETS;if(r){let F=function(){let w=[...Array.from(document.querySelectorAll(".folio-sheet,.media-spread,.notebook-spread,.research-spread,.next-shelf"),(A,M)=>[A,A.dataset.material||(M%2?"sand-sage":"sand-blue")]),...Array.from(document.querySelectorAll(".book-pages,.context-workbench,.bench-inspector"),A=>[A,"sand-blue"]),...Array.from(document.querySelectorAll(".repo-folder,.writing-list button,.next-grid button"),(A,M)=>[A,A.dataset.material||(M%2?"sand-sage":"sand-blue")]),...Array.from(document.querySelectorAll(".work-image"),(A,M)=>[A,M?"mineral-study":"terrace-study"]),...[...document.querySelectorAll(".record-art")].map(A=>[A,"podcast-legacy"]),...[...document.querySelectorAll(".design-art")].map(A=>[A,"sand-blue"]),...[...document.querySelectorAll(".learning-paper")].map(A=>[A,"pond-study"]),...Array.from(document.querySelectorAll(".asset-object"),(A,M)=>[A,A.dataset.materialKey||(A.dataset.assetType==="color"?"sand-blue":A.dataset.assetType==="paper"?"sand-sage":"sand-blue")])];for(let[A,M]of w){A.classList.add("pixel-plane"),A.matches(".book-pages,.context-workbench,.bench-inspector,.repo-folder,.writing-list button,.next-grid button")&&A.classList.add("sand-surface"),A.dataset.material=M;let C=A.querySelector(":scope>.pixel-window");C||(C=document.createElement("div"),C.className="pixel-window",C.setAttribute("aria-hidden","true"),A.append(C)),C.dataset.material!==M&&(t.materialWrites++,C.dataset.material=M,C.dataset.textureUrl=d[M],v?v.observe(C):C.style.backgroundImage='url("'+d[M]+'")');let I=A.querySelector(":scope>.sand-sample");I&&I.dataset.material!==M&&(t.materialWrites++,I.dataset.material=M,I.dataset.textureUrl=d[M],v?v.observe(I):I.style.backgroundImage='url("'+d[M]+'")')}};var i=F;let u=window.PAPER_MATERIAL_CACHE,d={...u?.processed||{}},g={...u?.sizes||{}};t.cached=!!u,t.shaderPasses=0;async function m(w){if(d[w])return;t.shaderPasses++;let A=new Image;A.src=r[w],await A.decode(),g[w]=[A.width,A.height];let M=w.startsWith("cloud-"),C=w.startsWith("sand-"),I=M?960:C?900:600,V=M?1440:w==="podcast-legacy"?240:C?600:400,S=document.createElement("div");S.className="print-tile-source",S.style.width=I+"px",S.style.height=V+"px",document.body.append(S);let G=new ne(S,Ee,{...ki,u_image:A,u_colorFront:ae("#729bb7"),u_colorBack:ae("#e0eaf2"),u_colorHighlight:ae("#f5f0e8"),u_pxSize:M?1.5:C?1:2,u_colorSteps:M?12:24,u_originalColors:!0,u_inverted:!1,u_type:1},{alpha:!1,preserveDrawingBuffer:!0},0,0,1,I*V);await Ue(),d[w]=G.canvasElement.toDataURL("image/png"),G.dispose(),S.remove()}for(let w of Object.keys(r))d[w]||(d[w]=r[w],g[w]=[1024,1536]);let x=["cloud-01","cloud-02","cloud-03"],B=document.createElement("div");B.className="cloud-sky",B.setAttribute("aria-hidden","true"),B.style.backgroundImage='url("'+d["cloud-01"]+'")',document.body.prepend(B),t.cloud=!0;let E=Di(B,x.map(w=>d[w])),v=typeof IntersectionObserver=="function"?new IntersectionObserver(w=>{for(let A of w){if(!A.isIntersecting)continue;let M=A.target;M.style.backgroundImage='url("'+M.dataset.textureUrl+'")',v.unobserve(M)}},{rootMargin:"600px"}):null;F();let b=!1;new MutationObserver(w=>{b||!w.some(A=>[...A.addedNodes,...A.removedNodes].some(M=>M.nodeType===1))||(b=!0,requestAnimationFrame(()=>{b=!1,F()}))}).observe(document.body,{childList:!0,subtree:!0});let T=await E;window.paperCloud={...T,stats:()=>({ready:!0,sourceKeys:x,sourceSizes:x.map(w=>g[w]),grid:[960,1440],generated:Object.keys(d).length-1,planes:document.querySelectorAll(".pixel-window").length,legacyUses:[...document.querySelectorAll('[data-material="podcast-legacy"]')].map(w=>w.className),...T.stats()})},window.paperMaterialPreview=d,window.paperMaterialBake={processed:d,sizes:g},window.paperGenerated={stats:()=>({sources:Object.keys(d),sizes:g,placements:[...document.querySelectorAll(".pixel-plane")].map(w=>({class:w.className,material:w.dataset.material}))})}}let s=window.PAPER_PRINT_CACHE,n=u=>({...ki,u_image:u,u_colorFront:ae("#406887"),u_colorBack:ae("#dee6e9"),u_colorHighlight:ae("#f0e6d5"),u_pxSize:1,u_colorSteps:7,u_originalColors:!0,u_inverted:!1,u_type:1}),a={"photo-city":[0,0],"photo-ocean":[1,0],"photo-forest":[3,0],"photo-mountain":[1,1]},o=s?.images||{},l=s?.tile;if(!l){let u=document.createElement("canvas");u.width=192,u.height=192;let d=u.getContext("2d");d.fillStyle="#e0e8ef",d.fillRect(0,0,192,192);let g=new Image;g.src=u.toDataURL(),await g.decode();let m=document.createElement("div");m.className="print-tile-source",m.setAttribute("aria-hidden","true"),document.body.append(m);let x=new ne(m,Ee,n(g),{alpha:!1,preserveDrawingBuffer:!0},0,0,1,36864);await Ue(),l=x.canvasElement.toDataURL("image/png"),x.dispose(),m.remove()}document.documentElement.style.setProperty("--print-grain",'url("'+l+'")'),t.tile=!0;let c;if(!s?.atlas||!s?.images){let u=document.querySelector(".atlas-photo"),g=getComputedStyle(u).backgroundImage.match(/^url\(["']?(.*?)["']?\)$/)?.[1];if(!g)return;c=new Image,c.src=g,await c.decode()}if(!s)for(let[u,[d,g]]of Object.entries(a)){let m=document.createElement("canvas");m.width=600,m.height=400,m.getContext("2d").drawImage(c,d*c.width/4,g*c.height/6,c.width/4,c.height/6,0,0,600,400);let x=new Image;x.src=m.toDataURL("image/png"),await x.decode();let B=document.createElement("div");B.className="print-tile-source",B.style.width="600px",B.style.height="400px",document.body.append(B);let E=new ne(B,Ee,{...n(x),u_pxSize:1.3,u_colorSteps:5},{alpha:!1,preserveDrawingBuffer:!0},0,0,1,600*400);await Ue(),o[u]=E.canvasElement.toDataURL("image/jpeg",.92),E.dispose(),B.remove()}h();let f=!1;new MutationObserver(()=>{f||(f=!0,requestAnimationFrame(()=>{f=!1,h()}))}).observe(document.body,{childList:!0,subtree:!0});let p=s?.atlas;if(!p){let u=document.createElement("div");u.className="print-tile-source",u.style.width="1024px",u.style.height="1024px",document.body.append(u);let d=new ne(u,Ee,n(c),{alpha:!1,preserveDrawingBuffer:!0},0,0,1,1024*1024);await Ue(),p=d.canvasElement.toDataURL("image/jpeg",.95),d.dispose(),u.remove()}window.PAPER_PRINT_BAKED={tile:l,images:o,atlas:p},window.paperApplyPrintedModel=async()=>{window.setPaperPrintTexture&&(await window.setPaperPrintTexture(p),t.model=!0)},await window.paperApplyPrintedModel()}catch(r){t.errors.push(r.message),console.warn("Print material fallback:",r.message)}})();})();
