!function(t){var e={};function i(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,i),o.l=!0,o.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)i.d(n,o,function(e){return t[e]}.bind(null,o));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}([function(t,e){t.exports=THREE},function(t,e){t.exports=PIXI},function(t,e,i){"use strict";i.r(e);var n,o=i(0),r=i(1),a=function(){function t(t,e){this._items=t,this._loop=e}return Object.defineProperty(t.prototype,"length",{get:function(){return this._items.length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"items",{get:function(){return this._items},enumerable:!0,configurable:!0}),t}(),s=(n=function(t,e){return(n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),u=function(t){function e(e,i){var n=t.call(this,e,i)||this;return n._index=0,n}return s(e,t),e.prototype.next=function(){if(0===this._items.length)return{done:!0,value:null};if(this._index>=this._items.length){if(!this._loop)return{done:!0,value:null};this._index=this._index%this._items.length}return{done:!1,value:this._items[this._index++]}},e}(a),l=function(){var t=function(e,i){return(t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(e,i)};return function(e,i){function n(){this.constructor=e}t(e,i),e.prototype=null===i?Object.create(i):(n.prototype=i.prototype,new n)}}(),h=function(t){function e(e,i,n){var o=t.call(this,e,i)||this;return o._pool=[],o._unique=n,o._counter=0,o}return l(e,t),e.prototype.next=function(){return 0===this._items.length?{done:!0,value:null}:!this._loop&&(this._counter++,this._counter>this._items.length)?{done:!0,value:null}:{done:!1,value:this._items[this.getRandomIndex()]}},e.prototype.getRandomIndex=function(){return this._unique?(0===this._pool.length&&this.resetPool(),this._pool.pop()):Math.floor(Math.random()*this._items.length)},e.prototype.resetPool=function(){this._pool=Array.from(Array(this._items.length),(function(t,e){return e}));for(var t=this._pool.length-1;t>0;t--){var e=Math.floor(Math.random()*(t+1)),i=this._pool[t];this._pool[t]=this._pool[e],this._pool[e]=i}},e}(a),p=function(){function t(t){this._asset=t,this._model=this._asset.model,this._basicItr=this.makeMotionIterator(this._asset.source.motions.basic),this._clickItr=this.makeMotionIterator(this._asset.source.motions.click),this.setup()}return Object.defineProperty(t.prototype,"model",{get:function(){return this._model},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"motionFinished",{get:function(){var t=this._model.animator.getLayer("motion");return t&&t.currentTime>=t.currentAnimation.duration},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"motionLayer",{get:function(){return this._model.animator.getLayer("motion")},enumerable:!0,configurable:!0}),t.prototype.doMotion=function(t){if(this.motionLayer){var e=t.next();e.done||null===e.value||(this.motionLayer.stop(),this.motionLayer.play(this._asset.motions[e.value]))}},t.prototype.playBasic=function(){this.doMotion(this._basicItr)},t.prototype.playClick=function(){this.doMotion(this._clickItr)},t.prototype.setup=function(){this._model.pos_x=this._asset.source.x,this._model.pos_y=this._asset.source.y;var t=LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE;this._model.animator.addLayer("motion",t,1),this.playBasic()},t.prototype.makeMotionIterator=function(t){switch(t.order||"random"){case"order":return new u(t.values,!0);case"unique-random":return new h(t.values,!0,!0);case"random":default:return new h(t.values,!0,!1)}},t}();var c;!function(t){t.JSON="json"}(c||(c={}));var d,f={xhrType:c.JSON},m=function(){function t(){}return t.prototype.load=function(t){var e=this;return new Promise((function(i,n){e.pixiLoad([{name:"src",url:t}],(function(o,r){var a=e.getResult(r,"src",n);if(a){var s=a.data;s?Promise.all(s.models.map((function(i){return e.loadModel(i,t)}))).then(i).catch(n):n(new Error("Could not parse src ["+t+"]."))}}),n)}))},t.prototype.pixiLoad=function(t,e,i){for(var n=new PIXI.Loader,o=0,r=t;o<r.length;o++){var a=r[o];n.add(a.name,a.url,f)}n.load((function(t,n){try{e(t,n)}catch(t){i(t)}}))},t.prototype.getResult=function(t,e,i){var n=t[e];return n?n.error?(i(n.error),null):n:(i(new Error("Could not load ["+e+"].")),null)},t.prototype.loadModel=function(t,e){var i=this;return new Promise((function(n,o){if(t.assets)try{var r=Object.keys(t.assets).map((function(e){return{name:e,url:t.assets[e]}}));i.pixiLoad(r,(function(i,r){var a=LIVE2DCUBISMFRAMEWORK.Animation,s=Object.keys(r).filter((function(t){return t.startsWith("motion")})).reduce((function(t,e){var i=r[e];return i&&(t[e]=a.fromMotion3Json(i.data)),t}),{});(new LIVE2DCUBISMPIXI.ModelBuilder).buildFromModel3Json(i,r.model3,(function(i){if(null!=i)try{n({model:i,motions:s,source:t,url:e})}catch(t){o(t)}else o(new Error("model not found."))}))}),o)}catch(t){o(t)}else o(new Error("Could not load assets. [assets] not found in JSON."))}))},t}(),_="l2d",g={_marker:null,_mesh:null,_models:[],_orientationchanged:!1,_pixiapp:null,multiple:!0,schema:{src:{type:"asset"},textureWidth:{type:"int",default:512},textureHeight:{type:"int",default:512}},loadState:{initialized:!1,assetLoading:{finished:!1,error:null}},_initPixiApp:function(){this._pixiapp=new r.Application({width:0,height:0,transparent:!0});var t=new o.Texture(this._pixiapp.view);t.premultiplyAlpha=!0;var e=new o.MeshStandardMaterial({});e.map=t,e.metalness=0,e.premultipliedAlpha=!0,e.transparent=!0;var i=this.el;if(!i)throw new Error("Element [el] not found.");if(this._mesh=i.getObject3D("mesh"),!this._mesh)throw new Error("Mesh [mesh] not found.");this._mesh.material=e},init:function(){var t=this,e=this.el;if(!e)throw new Error("Element [el] not found.");this._marker=e.parentNode,this._mesh=this._mesh,this._models=this._models||[],this._orientationchanged=this._orientationchanged||!1,this._pixiapp=this._pixiapp,this._initPixiApp();var i=void 0===window.ontouchstart?"click":"touchstart";window.addEventListener(i,(function(){for(var e=0,i=t._models;e<i.length;e++){i[e].playClick()}})),window.addEventListener("orientationchange",(function(){t._pixiapp&&(t._pixiapp.stage.renderable=!1),t._orientationchanged=!0})),e.object3D.front=new o.Object3D,e.object3D.front.position.set(0,0,-1),e.object3D.add(e.object3D.front),this.loadState=this.loadState,this.loadState.initialized=!0},_setTextureSize:function(){if(this._mesh&&this.data&&this._pixiapp){var t=this.data.textureWidth,e=this.data.textureHeight;this._pixiapp.view.width=t,this._pixiapp.view.height=e,this._pixiapp.renderer.resize(t,e);for(var i=0,n=this._models;i<n.length;i++){var o=n[i];o.model.position=new r.Point(t*o.model.pos_x,e*o.model.pos_y),o.model.scale=new r.Point(.5*t,.5*e),o.model.masks.resize(this._pixiapp.view.width,this._pixiapp.view.height)}this._mesh.material.map.needsUpdate=!0}},_updateAsset:function(t){var e=this;t&&this.data&&t.src==this.data.src||this.data&&(this.loadState.assetLoading.finished=!1,this.loadState.assetLoading.error=null,(new m).load(this.data.src).then((function(t){if(e.loadState.assetLoading.finished=!0,e.data)if(e._models=t.map((function(t){return new p(t)})),e._initPixiApp(),e._pixiapp)try{!function(t,e){for(var i=0,n=t;i<n.length;i++){var o=n[i];e.stage.addChild(o.model),e.stage.addChild(o.model.masks)}e.stage.renderable=!1,e.ticker.add((function(i){for(var n=0,o=t;n<o.length;n++){var r=o[n];r.model.update(i),r.model.masks.update(e.renderer)}}))}(e._models,e._pixiapp),e._setTextureSize()}catch(t){e.loadState.assetLoading.error=t}else e.loadState.assetLoading.error=new Error("Pixiapp [pixiapp] not found.");else e.loadState.assetLoading.error=new Error("Could not find data.src.")})).catch((function(t){e.loadState.assetLoading.error=t})))},update:function(t){this._setTextureSize(),this._updateAsset(t)},tick:function(){if(this._marker)if(this._marker.object3D.visible){if(!this._pixiapp)return;this._orientationchanged||(this._pixiapp.stage.renderable=!0),this._mesh&&(this._mesh.material.map.needsUpdate=!0);for(var t=0,e=this._models;t<e.length;t++){var i=e[t];i.motionFinished&&i.playBasic()}}else this._pixiapp&&(this._pixiapp.stage.renderable=!1),this._orientationchanged=!1}},y=AFRAME.utils.extendDeep,v=AFRAME.primitives.getMeshMixin(),x="a-"+_,w=y({},v,{defaultComponents:(d={geometry:{primitive:"plane",width:5,height:5},material:{color:"#000"},position:{x:0,y:0,z:0},rotation:{x:-90,y:0,z:0}},d[_]={},d),mappings:{width:"geometry.width",height:"geometry.height",color:"material.color",textureWidth:_+".textureWidth",textureHeight:_+".textureHeight",src:_+".src"}}),b=function(){return(b=Object.assign||function(t){for(var e,i=1,n=arguments.length;i<n;i++)for(var o in e=arguments[i])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t}).apply(this,arguments)};function A(t){return Array.from(t.querySelectorAll(x)).map((function(t){return function(t){var e=t.components;if(!e)return null;var i=e[_];return i||null}(t)})).filter((function(t){return null!=t}))}function O(t){var e="[A-L2D ERROR] "+t.message;console.log(e),console.log(t),alert("[A-L2D] エラーが発生しました。\n"+e)}var E={timeout:1e4,showAlert:!0};(new(function(){function t(t){this._registerError=null,this._opt=b(b({},E),t||{})}return Object.defineProperty(t.prototype,"registerError",{get:function(){return this._registerError},enumerable:!0,configurable:!0}),t.prototype.doInit=function(){try{AFRAME.registerComponent(_,g),AFRAME.registerPrimitive(x,w)}catch(t){this._registerError=t,this._opt.showAlert&&O(t)}},t.prototype.init=function(){this._opt.showAlert?this.initAsync().then():this.doInit()},t.prototype.initAsync=function(){var t=this;return this.doInit(),new Promise((function(e,i){var n=t._opt.timeout/100,o=function(){try{var r=A(document);if(!(r.length>0&&r.reduce((function(t,e){return t&&e.loadState.assetLoading.finished}),!0))){if(--n<0){var a=new Error("Timeout. ("+t._opt.timeout+" msec)");t._opt.showAlert&&O(a),i(a)}else window.setTimeout(o,100);return}if(t._opt.showAlert)!function(t){0!=t.length&&(1!=t.length?O(new Error(t.length+"個のエラーが発生しました。\n"+t[0].message)):O(t[0]))}(r.map((function(t){return t.loadState.assetLoading.error})).filter((function(t){return null!=t})));e(r)}catch(t){i(t)}};o()}))},t}())).init()}]);