var AL2DLIB=function(t){var e={};function r(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=t,r.c=e,r.d=function(t,e,o){r.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},r.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(r.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)r.d(o,i,function(e){return t[e]}.bind(null,i));return o},r.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(e,"a",e),e},r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},r.p="",r(r.s=2)}([function(t,e,r){"use strict";var o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var r in t)Object.hasOwnProperty.call(t,r)&&(e[r]=t[r]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var i=o(r(3)),n=o(r(4)),a=r(5),s=r(8);e.COMPONENT_NAME="l2d",e.L2D_COMPONENT={_marker:null,_mesh:null,_models:[],_orientationchanged:!1,_pixiapp:null,multiple:!0,schema:{src:{type:"asset"},textureWidth:{type:"int",default:512},textureHeight:{type:"int",default:512}},loadState:{initialized:!1,assetLoading:{finished:!1,error:null}},_initPixiApp:function(){this._pixiapp=new n.Application({width:0,height:0,transparent:!0});var t=new i.Texture(this._pixiapp.view);t.premultiplyAlpha=!0;var e=new i.MeshStandardMaterial({});e.map=t,e.metalness=0,e.premultipliedAlpha=!0,e.transparent=!0;var r=this.el;if(!r)throw new Error("Element [el] not found.");if(this._mesh=r.getObject3D("mesh"),!this._mesh)throw new Error("Mesh [mesh] not found.");this._mesh.material=e},init:function(){var t=this,e=this.el;if(!e)throw new Error("Element [el] not found.");this._marker=e.parentNode,this._mesh=this._mesh,this._models=this._models||[],this._orientationchanged=this._orientationchanged||!1,this._pixiapp=this._pixiapp,this._initPixiApp();var r=void 0===window.ontouchstart?"click":"touchstart";window.addEventListener(r,(function(){for(var e=0,r=t._models;e<r.length;e++){r[e].playClick()}})),window.addEventListener("orientationchange",(function(){t._pixiapp&&(t._pixiapp.stage.renderable=!1),t._orientationchanged=!0})),e.object3D.front=new i.Object3D,e.object3D.front.position.set(0,0,-1),e.object3D.add(e.object3D.front),this.loadState=this.loadState,this.loadState.initialized=!0},_setTextureSize:function(){if(this._mesh&&this.data&&this._pixiapp){var t=this.data.textureWidth,e=this.data.textureHeight;this._pixiapp.view.width=t,this._pixiapp.view.height=e,this._pixiapp.renderer.resize(t,e);for(var r=0,o=this._models;r<o.length;r++){var i=o[r];i.model.position=new n.Point(t*i.model.pos_x,e*i.model.pos_y),i.model.scale=new n.Point(.5*t,.5*e),i.model.masks.resize(this._pixiapp.view.width,this._pixiapp.view.height)}this._mesh.material.map.needsUpdate=!0}},_updateAsset:function(t){var e=this;t&&this.data&&t.src==this.data.src||this.data&&(this.loadState.assetLoading.finished=!1,this.loadState.assetLoading.error=null,(new s.AssetLoader).load(this.data.src).then((function(t){if(e.loadState.assetLoading.finished=!0,e.data)if(e._models=t.map((function(t){return new a.Model(t)})),e._initPixiApp(),e._pixiapp)try{a.appendModels(e._models,e._pixiapp),e._setTextureSize()}catch(t){e.loadState.assetLoading.error=t}else e.loadState.assetLoading.error=new Error("Pixiapp [pixiapp] not found.");else e.loadState.assetLoading.error=new Error("Could not find data.src.")})).catch((function(t){e.loadState.assetLoading.error=t})))},update:function(t){this._setTextureSize(),this._updateAsset(t)},tick:function(){if(this._marker)if(this._marker.object3D.visible){if(!this._pixiapp)return;this._orientationchanged||(this._pixiapp.stage.renderable=!0),this._mesh&&(this._mesh.material.map.needsUpdate=!0);for(var t=0,e=this._models;t<e.length;t++){var r=e[t];r.motionFinished&&r.playBasic()}}else this._pixiapp&&(this._pixiapp.stage.renderable=!1),this._orientationchanged=!1}}},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e){this._items=t,this._loop=e}return Object.defineProperty(t.prototype,"length",{get:function(){return this._items.length},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"items",{get:function(){return this._items},enumerable:!0,configurable:!0}),t}();e.MotionIteratorBase=o},function(t,e,r){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,r=1,o=arguments.length;r<o;r++)for(var i in e=arguments[r])Object.prototype.hasOwnProperty.call(e,i)&&(t[i]=e[i]);return t}).apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=r(9);function a(t){var e=t.components;if(!e)return null;var r=e[i.COMPONENT_NAME];return r||null}function s(t){return Array.from(t.querySelectorAll(n.PRIMITIVE_NAME)).map((function(t){return a(t)})).filter((function(t){return null!=t}))}function u(){AFRAME.registerComponent(i.COMPONENT_NAME,i.L2D_COMPONENT),AFRAME.registerPrimitive(n.PRIMITIVE_NAME,n.L2D_PRIMITIVE)}function l(t){var e="[A-L2D ERROR] "+t.message;console.log(e),console.log(t),alert("[A-L2D] エラーが発生しました。\n"+e)}e.getComponent=a,e.getComponents=s,e.register=u;var p={timeout:1e4,showAlert:!0},d=function(){function t(t){this._registerError=null,this._opt=o(o({},p),t||{})}return Object.defineProperty(t.prototype,"registerError",{get:function(){return this._registerError},enumerable:!0,configurable:!0}),t.prototype.doInit=function(){try{u()}catch(t){this._registerError=t,this._opt.showAlert&&l(t)}},t.prototype.init=function(){this._opt.showAlert?this.initAsync().then():this.doInit()},t.prototype.initAsync=function(){var t=this;return this.doInit(),new Promise((function(e,r){var o=t._opt.timeout/100,i=function(){try{for(var n=s(document),a=0,u=n;a<u.length;a++){if(!u[a].loadState.assetLoading.finished){if(--o<0){var p=new Error("Timeout for asset loading.");return t._opt.showAlert&&l(p),void r(p)}return void window.setTimeout(i,100)}}if(l)!function(t){0!=t.length&&(1!=t.length?l(new Error(t.length+"個のエラーが発生しました。\n"+t[0].message)):l(t[0]))}(n.map((function(t){return t.loadState.assetLoading.error})).filter((function(t){return null!=t})));e(n)}catch(t){r(t)}};i()}))},t}();e.AL2D=d},function(t,e){t.exports=THREE},function(t,e){t.exports=PIXI},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r(6),i=r(7),n=function(){function t(t){this._asset=t,this._model=this._asset.model,this._basicItr=this.makeMotionIterator(this._asset.source.motions.basic),this._clickItr=this.makeMotionIterator(this._asset.source.motions.click),this.setup()}return Object.defineProperty(t.prototype,"model",{get:function(){return this._model},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"motionFinished",{get:function(){var t=this._model.animator.getLayer("motion");return t&&t.currentTime>=t.currentAnimation.duration},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"motionLayer",{get:function(){return this._model.animator.getLayer("motion")},enumerable:!0,configurable:!0}),t.prototype.doMotion=function(t){if(this.motionLayer){var e=t.next();e.done||null===e.value||(this.motionLayer.stop(),this.motionLayer.play(this._asset.motions[e.value]))}},t.prototype.playBasic=function(){this.doMotion(this._basicItr)},t.prototype.playClick=function(){this.doMotion(this._clickItr)},t.prototype.setup=function(){this._model.pos_x=this._asset.source.x,this._model.pos_y=this._asset.source.y;var t=LIVE2DCUBISMFRAMEWORK.BuiltinAnimationBlenders.OVERRIDE;this._model.animator.addLayer("motion",t,1),this.playBasic()},t.prototype.makeMotionIterator=function(t){switch(t.order||"random"){case"order":return new o.OrderIterator(t.values,!0);case"unique-random":return new i.RandomIterator(t.values,!0,!0);case"random":default:return new i.RandomIterator(t.values,!0,!1)}},t}();e.Model=n,e.appendModels=function(t,e){for(var r=0,o=t;r<o.length;r++){var i=o[r];e.stage.addChild(i.model),e.stage.addChild(i.model.masks)}e.stage.renderable=!1,e.ticker.add((function(r){for(var o=0,i=t;o<i.length;o++){var n=i[o];n.model.update(r),n.model.masks.update(e.renderer)}}))}},function(t,e,r){"use strict";var o,i=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){function e(e,r){var o=t.call(this,e,r)||this;return o._index=0,o}return i(e,t),e.prototype.next=function(){if(0===this._items.length)return{done:!0,value:null};if(this._index>=this._items.length){if(!this._loop)return{done:!0,value:null};this._index=this._index%this._items.length}return{done:!1,value:this._items[this._index++]}},e}(r(1).MotionIteratorBase);e.OrderIterator=n},function(t,e,r){"use strict";var o,i=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r])})(t,e)},function(t,e){function r(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var n=function(t){function e(e,r,o){var i=t.call(this,e,r)||this;return i._pool=[],i._unique=o,i._counter=0,i}return i(e,t),e.prototype.next=function(){return 0===this._items.length?{done:!0,value:null}:!this._loop&&(this._counter++,this._counter>this._items.length)?{done:!0,value:null}:{done:!1,value:this._items[this.getRandomIndex()]}},e.prototype.getRandomIndex=function(){return this._unique?(0===this._pool.length&&this.resetPool(),this._pool.pop()):Math.floor(Math.random()*this._items.length)},e.prototype.resetPool=function(){this._pool=Array.from(Array(this._items.length),(function(t,e){return e}));for(var t=this._pool.length-1;t>0;t--){var e=Math.floor(Math.random()*(t+1)),r=this._pool[t];this._pool[t]=this._pool[e],this._pool[e]=r}},e}(r(1).MotionIteratorBase);e.RandomIterator=n},function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o;!function(t){t.JSON="json"}(o||(o={}));var i={xhrType:o.JSON},n=function(){function t(){}return t.prototype.load=function(t){var e=this;return new Promise((function(r,o){e.pixiLoad([{name:"src",url:t}],(function(i,n){var a=e.getResult(n,"src",o);if(a){var s=a.data;s?Promise.all(s.models.map((function(r){return e.loadModel(r,t)}))).then(r).catch(o):o(new Error("Could not parse src ["+t+"]."))}}),o)}))},t.prototype.pixiLoad=function(t,e,r){for(var o=new PIXI.Loader,n=0,a=t;n<a.length;n++){var s=a[n];o.add(s.name,s.url,i)}o.load((function(t,o){try{e(t,o)}catch(t){r(t)}}))},t.prototype.getResult=function(t,e,r){var o=t[e];return o?o.error?(r(o.error),null):o:(r(new Error("Could not load ["+e+"].")),null)},t.prototype.loadModel=function(t,e){var r=this;return new Promise((function(o,i){if(t.assets)try{var n=Object.keys(t.assets).map((function(e){return{name:e,url:t.assets[e]}}));r.pixiLoad(n,(function(r,n){var a=LIVE2DCUBISMFRAMEWORK.Animation,s=Object.keys(n).filter((function(t){return t.startsWith("motion")})).reduce((function(t,e){var r=n[e];return r&&(t[e]=a.fromMotion3Json(r.data)),t}),{});(new LIVE2DCUBISMPIXI.ModelBuilder).buildFromModel3Json(r,n.model3,(function(r){if(null!=r)try{o({model:r,motions:s,source:t,url:e})}catch(t){i(t)}else i(new Error("model not found."))}))}),i)}catch(t){i(t)}else i(new Error("Could not load assets. [assets] not found in JSON."))}))},t}();e.AssetLoader=n},function(t,e,r){"use strict";var o;Object.defineProperty(e,"__esModule",{value:!0});var i=r(0),n=AFRAME.utils.extendDeep,a=AFRAME.primitives.getMeshMixin();e.PRIMITIVE_NAME="a-"+i.COMPONENT_NAME,e.L2D_PRIMITIVE=n({},a,{defaultComponents:(o={geometry:{primitive:"plane",width:5,height:5},material:{color:"#000"},position:{x:0,y:0,z:0},rotation:{x:-90,y:0,z:0}},o[i.COMPONENT_NAME]={},o),mappings:{width:"geometry.width",height:"geometry.height",color:"material.color",textureWidth:i.COMPONENT_NAME+".textureWidth",textureHeight:i.COMPONENT_NAME+".textureHeight",src:i.COMPONENT_NAME+".src"}})}]);