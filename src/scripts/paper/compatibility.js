// Feature detection for older embedded browsers. No touch disturbance is added.
if(!HTMLImageElement.prototype.decode)HTMLImageElement.prototype.decode=function(){return new Promise((resolve,reject)=>{if(this.complete)return this.naturalWidth?resolve():reject(Error('Image unavailable'));this.addEventListener('load',resolve,{once:true});this.addEventListener('error',reject,{once:true});});};
if(!String.prototype.replaceAll)String.prototype.replaceAll=function(search,value){return typeof search==='string'?this.split(search).join(value):this.replace(search,value);};
