!function t(e,i,n){function s(r,o){if(!i[r]){if(!e[r]){var l="function"==typeof require&&require;if(!o&&l)return l(r,!0);if(a)return a(r,!0);var h=new Error("Cannot find module '"+r+"'");throw h.code="MODULE_NOT_FOUND",h}var c=i[r]={exports:{}};e[r][0].call(c.exports,function(t){var i=e[r][1][t];return s(i?i:t)},c,c.exports,t,e,i,n)}return i[r].exports}for(var a="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r]);return s}({1:[function(t,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var a=function(t,e,i){for(var n=!0;n;){var s=t,a=e,r=i;n=!1,null===s&&(s=Function.prototype);var o=Object.getOwnPropertyDescriptor(s,a);if(void 0!==o){if("value"in o)return o.value;var l=o.get;return void 0===l?void 0:l.call(r)}var h=Object.getPrototypeOf(s);if(null===h)return void 0;t=h,e=a,i=r,n=!0,o=h=void 0}},r=t("./islider_core.js"),o=i(r),l=t("./plugins/islider_button.js"),h=i(l),c=t("./plugins/islider_dot.js"),d=i(c),u=t("./plugins/islider_zoom.js"),f=i(u),p=function(t){function e(){n(this,e);for(var t=arguments.length,i=Array(t),s=0;t>s;s++)i[s]=arguments[s];a(Object.getPrototypeOf(e.prototype),"constructor",this).apply(this,i);var r=this.startHandler,o=this.endHandler,l=this.moveHandler;this.regPlugin("button",h["default"]),this.regPlugin("dot",d["default"]),this.regPlugin("zoompic",function(t){f["default"].initZoom({currentScale:t.currentScale||1,zoomFactor:t.zoomFactor||2,extendFunction:{startHandlerOriginal:r,endHandlerOriginal:o,moveHandlerOriginal:l}})}),this.fire("initialize"),this._renderWrapper(),this._initPlugins(),this._bindHandler(),this.extend({startHandler:f["default"].startHandler,moveHandler:f["default"].moveHandler,endHandler:f["default"].endHandler})}return s(e,t),e}(o["default"]);e.exports=p},{"./islider_core.js":2,"./plugins/islider_button.js":4,"./plugins/islider_dot.js":5,"./plugins/islider_zoom.js":6}],2:[function(t,e){(function(i){"use strict";function n(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}function a(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){return e.indexOf(t)>-1}function o(t){return"[object Array]"===Object.prototype.toString.call(t)}function l(t,e){return t.className.match(new RegExp("(\\s|^)"+e+"(\\s|$)"))}function h(t,e){l(t,e)||(t.className+=" "+e)}function c(t,e){l(t,e)&&(t.className=t.className.replace(RegExp("(\\s|^)"+e+"(\\s|$)"),""))}function d(t){if(/<\/?[^>]*>/g.test(t))return!1;var e="^(((https|http|ftp|rtsp|mms):)?//)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})?(:[0-9]{1,4})?([^?#]+)?(\\?[^#]+)?(#.+)?$";return new RegExp(e).test(t)}var u=function(t,e,i){for(var n=!0;n;){var s=t,a=e,r=i;n=!1,null===s&&(s=Function.prototype);var o=Object.getOwnPropertyDescriptor(s,a);if(void 0!==o){if("value"in o)return o.value;var l=o.get;return void 0===l?void 0:l.call(r)}var h=Object.getPrototypeOf(s);if(null===h)return void 0;t=h,e=a,i=r,n=!0,o=h=void 0}},f=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),p=t("./plugins/islider_animate.js"),v=n(p),y=function(){function t(){a(this,t);var e=Array.prototype.slice.call(arguments,0,3);if(!e.length)throw new Error("Parameters required!");var i=e.pop();switch(e.length){case 2:i.data=i.data||e[1];case 1:i.dom=i.dom||e[0]}if(!i.dom)throw new Error("Container can not be empty!");if(!i.data||!i.data.length)throw new Error("Data must be an array and must have more than one element!");this.EVENTS="initialize slide slideStart slideEnd slideChange slideChanged slideRestore slideRestored reloadData destroy".split(" "),this.EASING=["linear ease ease-in ease-out ease-in-out".split(" "),/cubic-bezier\(([^\d]*(\d+.?\d*)[^\,]*\,?){4}\)/],this.FIX_PAGE_TAGS="SELECT INPUT TEXTAREA BUTTON LABEL".split(" "),this.plugins={},this._opts=i,i=e=null,this._transitionEndEvent()}return f(t,[{key:"EMPTY_FUNCTION",value:function(){}},{key:"extend",value:function e(){var t=void 0,e=void 0,i=arguments;switch(i.length){case 0:return;case 1:t=this,e=i[0];break;case 2:t=i[0],e=i[1]}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n])}},{key:"regPlugin",value:function(t,e){this.plugins[t]=this.plugins[t]||e}},{key:"_transitionEndEvent",value:function(){var t=void 0;return function(){if(t)return t;var e=document.createElement("fakeElement"),i={transition:"transitionend",OTransition:"oTransitionEnd",MozTransition:"transitionend",WebkitTransition:"webkitTransitionEnd"};for(var n in i)if(i.hasOwnProperty(n)&&void 0!==e.style[n])return t=i[n]}}}]),t}(),g=function(t){function e(){a(this,e);for(var t=arguments.length,i=Array(t),n=0;t>n;n++)i[n]=arguments[n];u(Object.getPrototypeOf(e.prototype),"constructor",this).apply(this,i),this._setting()}return s(e,t),f(e,[{key:"_setting",value:function(){this.opposite=!1,this._plugins=this.plugins,this._animateFuncs=this._animateFuncs,this.holding=!1,this.locking=!1,this._LSN={};var t=this._opts;this.wrap=t.dom,this.data=t.data,this.isVertical=t.isVertical||!1,this.isOverspread=t.isOverspread||!1,this.duration=t.duration||2e3,this.initIndex=t.initIndex>0&&t.initIndex<t.data.length-1?t.initIndex:0,this.fixPage=t.fixPage||!0,this.slideIndex=this.slideIndex||this.initIndex||0,this.axis=this.isVertical?"Y":"X",this.reverseAxis="Y"===this.axis?"X":"Y",this.width=this.wrap.clientWidth,this.height=this.wrap.clientHeight,this.ratio=this.height/this.width,this.scale=this.isVertical?this.height:this.width,this.offset=this.offset||{X:0,Y:0},this.isLooping=this.data.length>1&&t.isLooping?!0:!1,this.isAutoplay=this.data.length>1&&t.isAutoplay?!0:!1,"card"===t.animateType&&this.isVertical&&(this.isOverspread=!0),this.log=t.isDebug?function(){i.console.log.apply(i.console,arguments)}:this.EMPTY_FUNCTION,this._setUpDamping(),this._animateFuncs={"default":function(t,e,i,n,s){t.style.webkitTransform="translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)"}},this.extend(this._animateFuncs,v["default"]),this._animateFunc=this._animateFuncs[t.animateType in this._animateFuncs?t.animateType:"default"],this.animateTime=null!=t.animateTime&&t.animateTime>-1?t.animateTime:300,this.animateEasing=r(t.animateEasing,this.EASING[0])||this.EASING[1].test(t.animateEasing)?t.animateEasing:"ease",this.inAnimate=0,this.deviceEvents=function(){var t=!!("ontouchstart"in i||i.DocumentTouch&&document instanceof i.DocumentTouch);return{hasTouch:t,startEvt:t?"touchstart":"mousedown",moveEvt:t?"touchmove":"mousemove",endEvt:t?"touchend":"mouseup"}}(),this.events={},this.on("slide",t.onslide),this.on("slideStart",t.onslidestart),this.on("slideEnd",t.onslideend),this.on("slideChange",t.onslidechange),this.on("slideChanged",t.onslidechanged),this.on("slideRestore",t.onsliderestore),this.on("slideRestored",t.onsliderestored),this.pluginConfig=function(){if(!o(t.plugins))return{};var e=function(){var e={};return t.plugins.forEach(function(t){o(t)?e[t[0]]=t.slice(1):"string"==typeof t&&(e[t]=[])}),{v:e}}();return"object"==typeof e?e.v:void 0}(),this.isAutoplay&&this.play()}},{key:"_initPlugins",value:function(){var t=this.pluginConfig,e=this._plugins;for(var i in t)t.hasOwnProperty(i)&&e.hasOwnProperty(i)&&(this.log("[INIT PLUGIN]:",i,e[i]),e[i]&&"function"==typeof e[i]&&typeof e[i].apply&&e[i].apply(this,t[i]))}},{key:"_setUpDamping",value:function(){var t=this.scale>>1,e=t>>1,i=e>>2;this._damping=function(n){var s=Math.abs(n),a=void 0;return a=t>s?s>>1:t+e>s?e+(s-t>>2):e+i+(s-t-e>>3),n>0?a:-a}}},{key:"_itemType",value:function(t){if(isNaN(t)||(t=this.data[t]),t.hasOwnProperty("type"))return t.type;var e=t.content,i=void 0;return i=null==e?"empty":Boolean(e.nodeName)&&Boolean(e.nodeType)?"node":"string"==typeof e?d(e)?"pic":"html":"unknown",t.type=i,i}},{key:"_renderItem",value:function(t,e){var i=void 0,n=this.data.length,s=function(){var e=' src="'+i.content+'"';e+=i.height/i.width>this.ratio?' height="'+t.clientHeight+'"':' width="'+t.clientWidth+'"',this.isOverspread&&(t.style.background="url("+i.content+") no-repeat 50% 50%/cover",e+=' style="display:block;opacity:0;height:100%;width:100%;"'),t.innerHTML="<img"+e+" />"}.bind(this);if(t.innerHTML="",t.style.background="",this.isLooping||null!=this.data[e]){e=(n+e)%n,i=this.data[e];var a=this._itemType(i);switch(this.log("[Render ITEM]:",a,e,i),t.className="islider-"+a,a){case"pic":i.height&&i.width?s():!function(){var t=new Image;t.src=i.content,t.onload=function(){i.height=t.height,i.width=t.width,i.loaded=1,s()}}();break;case"dom":case"html":t.innerHTML=i.content;break;case"node":case"element":if(11===i.content.nodeType){var r=document.createElement("div");r.appendChild(i.content),i.content=r}t.appendChild(i.content)}}}},{key:"_renderIntermediateScene",value:function(){null!=this._intermediateScene&&(this._renderItem.apply(this,this._intermediateScene),this._intermediateScene=null)}},{key:"_changedStyles",value:function(){var t=["islider-prev","islider-active","islider-next"];this.els.forEach(function(e,i){c(e,"("+t.join("|")+")"),h(e,t[i])})}},{key:"_renderWrapper",value:function(){this.outer&&(this.outer.innerHTML="");var t=this.outer||document.createElement("ul");t.className="islider-outer",this.els=[];for(var e=0;3>e;e++){var n=document.createElement("li");this.els.push(n),this._animateFunc(n,this.axis,this.scale,e,0),!this.isVertical||"rotate"!==this._opts.animateType&&"flip"!==this._opts.animateType?this._renderItem(n,e-1+this.slideIndex):this._renderItem(n,1-e+this.slideIndex),t.appendChild(n)}this._changedStyles(),i.setTimeout(function(){this._preloadImg(this.slideIndex)}.bind(this),200),this.outer||(this.outer=t,this.wrap.appendChild(t))}},{key:"_preloadImg",value:function(t){var e=this;this.data.length>3&&!function(){var i=e.data,n=i.length,s=e,a=function(t){var e=i[t];"pic"!==s._itemType(e)||e.loaded||!function(){var t=new Image;t.src=e.content,t.onload=function(){e.width=t.width,e.height=t.height},e.loaded=1}()};a((t+2)%n),a((t-2+n)%n)}()}},{key:"_watchTransitionEnd",value:function(t,e){function n(){o&&i.clearTimeout(o),a.inAnimate--,a.log("Event:","watchTransitionEnd::stuck::release",a.inAnimate),0===a.inAnimate&&("slideChanged"===e&&a._changedStyles(),a.fire.apply(a,r),a._renderIntermediateScene()),s()}function s(){a.els.forEach(function(t){t.removeEventListener(a._transitionEndEvent(),n)}),a.isAnimating=!1}var a=this,r=Array.prototype.slice.call(arguments,1),o=void 0;this.log("Event:","watchTransitionEnd::stuck::pile",this.inAnimate),t>0&&a.els.forEach(function(t){t.addEventListener(a._transitionEndEvent(),n)}),o=i.setTimeout(n,t),a.inAnimate++}},{key:"_bindHandler",value:function(){var t=this.outer,e=this.deviceEvents;e.hasTouch||(t.style.cursor="pointer",t.ondragstart=function(t){return t?!1:!0}),t.addEventListener(e.startEvt,this),t.addEventListener(e.moveEvt,this),t.addEventListener(e.endEvt,this),i.addEventListener("orientationchange",this),i.addEventListener("resize",this),i.addEventListener("focus",this,!1),i.addEventListener("blur",this,!1)}},{key:"handleEvent",value:function(t){var e=this.deviceEvents;switch(t.type){case"mousedown":if(0!==t.button||1!==t.buttons)break;case"touchstart":this.startHandler(t);break;case e.moveEvt:this.moveHandler(t);break;case e.endEvt:case"touchcancel":this.endHandler(t);break;case"orientationchange":this.orientationchangeHandler();break;case"focus":this.isAutoplay&&this.play();break;case"blur":this.pause();break;case"resize":this.resizeHandler()}}},{key:"startHandler",value:function(t){if(this.fixPage&&this.FIX_PAGE_TAGS.indexOf(t.target.tagName)<0&&t.preventDefault(),!this.holding&&!this.locking){var e=this.deviceEvents;this.isMoving=!0,this.pause(),this.log("Event: start"),this.fire("slideStart",t,this),this.startTime=(new Date).getTime(),this.startX=e.hasTouch?t.targetTouches[0].pageX:t.pageX,this.startY=e.hasTouch?t.targetTouches[0].pageY:t.pageY}}},{key:"moveHandler",value:function(t){if(this.isMoving){this.log("Event: moving");var e=this.deviceEvents,i=this.data.length,n=this.axis,s=this.reverseAxis,a={X:e.hasTouch?t.targetTouches[0].pageX-this.startX:t.pageX-this.startX,Y:e.hasTouch?t.targetTouches[0].pageY-this.startY:t.pageY-this.startY};if(this.offset=a,Math.abs(a[n])-Math.abs(a[s])>10){t.preventDefault(),this.fire("slide",t,this),this.isLooping||(a[n]>0&&0===this.slideIndex||a[n]<0&&this.slideIndex===i-1)&&(a[n]=this._damping(a[n]));for(var r=0;3>r;r++){var o=this.els[r];o.style.webkitTransition="all 0s",this._animateFunc(o,n,this.scale,r,a[n])}}}}},{key:"endHandler",value:function(t){if(this.isMoving){this.log("Event: end"),this.isMoving=!1;var e=this.offset,n=this.axis,s=this.scale/2,a=(new Date).getTime();s=a-this.startTime>300?s:14;var r=Math.abs(e[n]),o=Math.abs(e[this.reverseAxis]),l=function h(t){if("A"===t.tagName){if(t.href)return i.location.href=t.href,!1}else{if("islider-pic"!==t.className)return!1;h(t.parentNode)}};this.log(s,e[n],r,o,this),e[n]>=s&&r>o?(this.opposite=!0,this.slideTo(this.slideIndex-1)):e[n]<-s&&r>o?(this.opposite=!1,this.slideTo(this.slideIndex+1)):this.slideTo(this.slideIndex),Math.abs(this.offset.X)<10&&Math.abs(this.offset.Y)<10&&(this.tapEvt=document.createEvent("Event"),this.tapEvt.initEvent("tap",!0,!0),this.fixPage&&t.target&&l(t.target),t.target.dispatchEvent(this.tapEvt)||t.preventDefault()),this.offset.X=this.offset.Y=0,this.isAutoplay&&this.play(),this.fire("slideEnd",t,this)}}},{key:"orientationchangeHandler",value:function(){i.setTimeout(function(){this.reset(),this.log("Event: orientationchange")}.bind(this),100)}},{key:"resizeHandler",value:function(){(this.height!==this.wrap.clientHeight||this.width!==this.wrap.clientWidth)&&(this._LSN.resize&&i.clearTimeout(this._LSN.resize),this._LSN.resize=i.setTimeout(function(){this.reset(),this.log("Event: resize"),this._LSN.resize&&i.clearTimeout(this._LSN.resize)}.bind(this),500))}},{key:"slideTo",value:function(t,e){if(!this.locking){this.unhold();var n=this.animateTime,s=this._opts.animateType,a=this._animateFunc,r=this.data,o=this.els,l=t,h=t-this.slideIndex,c=this.offset,d=void 0;"object"==typeof e&&(e.animateTime>-1&&(n=e.animateTime),"string"==typeof e.animateType&&e.animateType in this._animateFuncs&&(s=e.animateType,a=this._animateFuncs[s]));var u=Math.abs(c[this.axis])/this.scale*n;Math.abs(h)>1&&this._renderItem(h>0?this.els[2]:this.els[0],l),this._preloadImg(l),r[l]?this.slideIndex=l:this.isLooping?this.slideIndex=h>0?0:r.length-1:h=0,this.log("Index:"+this.slideIndex);var f=void 0,p=void 0,v=void 0;0===h?d="slideRestore":((this.isVertical&&("rotate"===s||"flip"===s))^h>0?(o.push(o.shift()),f=o[2],p=o[0],v=1):(o.unshift(o.pop()),f=o[0],p=o[2],v=-1),1===Math.abs(h)?(this._renderIntermediateScene(),this._renderItem(f,l+h)):Math.abs(h)>1&&(this._renderItem(f,l+v),this._intermediateScene=[p,l-v]),f.style.webkitTransition="none",f.style.visibility="hidden",i.setTimeout(function(){f.style.visibility="visible"},200),u=n-u,d="slideChange"),this.fire(d,this.slideIndex,o[1],this),this._watchTransitionEnd(u,d+"d",this.slideIndex,o[1],this);for(var y=0;3>y;y++)o[y]!==f&&(o[y].style.webkitTransition="all "+u/1e3+"s "+this.animateEasing),this.opposite?a.call(this,o[y],this.axis,this.scale,y,0,!0):a.call(this,o[y],this.axis,this.scale,y,0,!1);this.isAutoplay&&!this.isLooping&&this.slideIndex===r.length-1&&this.pause()}}},{key:"slideNext",value:function(){this.slideTo.apply(this,[this.slideIndex+1].concat(Array.prototype.slice.call(arguments)))}},{key:"slidePrev",value:function(){this.slideTo.apply(this,[this.slideIndex-1].concat(Array.prototype.slice.call(arguments)))}},{key:"bind",value:function(t,e,n){function s(t){for(var s=i.event?i.event:t,a=s.target,r=document.querySelectorAll(e),o=0;o<r.length;o++)if(a===r[o]){n.call(a);break}}this.wrap.addEventListener(t,s,!1)}},{key:"delegate",value:function(t,e,n){function s(t){for(var s=i.event?i.event:t,a=s.target,r=document.querySelectorAll(e),o=0;o<r.length;o++)if(a===r[o]){n.call(a);break}}this.wrap.addEventListener(t,s,!1)}},{key:"unbind",value:function(){}},{key:"unDelegate",value:function(){}},{key:"destroy",value:function(){var t=this.outer,e=this.deviceEvents;this.fire("destroy"),t.removeEventListener(e.startEvt,this),t.removeEventListener(e.moveEvt,this),t.removeEventListener(e.endEvt,this),i.removeEventListener("orientationchange",this),i.removeEventListener("focus",this),i.removeEventListener("blur",this),this._LSN.forEach(function(t){t&&i.clearTimeout(t)}),this.wrap.innerHTML=""}},{key:"on",value:function(t,e){r(t,this.EVENTS)&&"function"==typeof e&&(t in this.events?this.events[t]:this.events[t]=[]).push(e)}},{key:"off",value:function(t,e){if(t in this.events){var i=this.events[t],n=i.indexOf(e);n>-1&&delete i[n]}}},{key:"fire",value:function(t){if(this.log("[EVENT FIRE]:",t,arguments),t in this.events)for(var e=this.events[t],i=0;i<e.length;i++)"function"==typeof e[i]&&e[i].apply&&e[i].apply(this,Array.prototype.slice.call(arguments,1))}},{key:"reset",value:function(){this.pause(),this._setting(),this._renderWrapper(),this.isAutoplay&&this.play()}},{key:"loadData",value:function(t,e){this.pause(),this.slideIndex=e||0,this.data=t,this._renderWrapper(),this.fire("reloadData"),this.isAutoplay&&this.play()}},{key:"play",value:function n(){function n(){t._LSN.autoPlay=setTimeout(function(){t.slideNext(),n()},t.duration)}var t=this;this._LSN.autoPlay&&i.clearTimeout(this._LSN.autoPlay),n()}},{key:"pause",value:function(){this._LSN.autoPlay&&clearTimeout(this._LSN.autoPlay)}},{key:"hold",value:function(){this.holding=!0}},{key:"unhold",value:function(){this.holding=!1,this.unlock()}},{key:"lock",value:function(){this.hold(),this.locking=!0}},{key:"unlock",value:function(){this.locking=!1}}]),e}(y);e.exports=g}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./plugins/islider_animate.js":3}],3:[function(t,e){"use strict";var i={rotate:function(t,e,i,n,s){var a="X"===e?"Y":"X",r=Math.abs(s),o=window.getComputedStyle(this.wrap.parentNode,null).backgroundColor;this.isVertical&&(s=-s),this.wrap.style.webkitPerspective=4*i,t.style.zIndex=1===n?i-r:s>0?(1-n)*r:(n-1)*r,t.style.cssText+="-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; background-color:"+o+"; position:absolute;",t.style.webkitTransform="rotate"+a+"("+90*(s/i+n-1)+"deg) translateZ("+.888*i/2+"px) scale(0.888)"},flip:function(t,e,i,n,s){var a="X"===e?"Y":"X",r=window.getComputedStyle(this.wrap.parentNode,null).backgroundColor;this.isVertical&&(s=-s),this.wrap.style.webkitPerspective=4*i,t.style.visibility=s>0?n>1?"hidden":"visible":1>n?"hidden":"visible",t.style.cssText+="position:absolute; -webkit-backface-visibility:hidden; background-color:"+r+";",t.style.webkitTransform="translateZ("+i/2+"px) rotate"+a+"("+180*(s/i+n-1)+"deg) scale(0.875)"},depth:function(t,e,i,n,s){var a=.18*(4-Math.abs(n-1));this.wrap.style.webkitPerspective=4*i,t.style.zIndex=1===n?100:s>0?1-n:n-1,t.style.webkitTransform="scale("+a+", "+a+") translateZ(0) translate"+e+"("+(s+1.3*i*(n-1))+"px)"},flow:function(t,e,i,n,s){var a=Math.abs(s),r="X"===e?"Y":"X",o="X"===e?1:-1,l=Math.abs(s/i);this.wrap.style.webkitPerspective=4*i,t.style.zIndex=1===n?i-a:s>0?(1-n)*a:(n-1)*a,t.style.webkitTransform="scale(0.7, 0.7) translateZ("+(150*l-150)*Math.abs(n-1)+"px)translate"+e+"("+(s+i*(n-1))+"px)rotate"+r+"("+o*(30-30*l)*(1-n)+"deg)"},card:function(t,e,i,n,s){var a=Math.abs(s);1===n?(t.style.zIndex=i-a,t.cur=1):t.style.zIndex=s>0?(1-n)*a*1e3:(n-1)*a*1e3,t.cur&&t.cur!==n&&setTimeout(function(){t.cur=null},300);var r=t.cur?1-.2*Math.abs(n-1)-Math.abs(.2*s/i).toFixed(6):1;t.style.webkitTransform="scale("+r+", "+r+") translateZ(0) translate"+e+"("+((1+.2*Math.abs(n-1))*s+i*(n-1))+"px)"},fade:function(t,e,i,n,s){t.style.visibility=s>0?n>1?"hidden":"visible":1>n?"hidden":"visible",s=Math.abs(s),t.style.opacity=1===n?1-s/i:s/i},yrks:function(t,e,i,n,s,a){function r(){t.style.visibility=1>n?"hidden":"visible",1===n?(t.cur=1,t.style.opacity=1+s/i):t.style.opacity=-s/i}function o(){t.style.visibility=n>1?"hidden":"visible",1===n?(t.cur=1,t.style.opacity=1-s/i):t.style.opacity=s/i}t.cur=2,s>0?o():a?o():r();var l=1===t.cur?1:2;t.style.webkitTransform="scale("+l+", "+l+") translateZ(0)"},zxfd:function(t,e,i,n,s,a){function r(){1==n?(t.cur=1,t.style.visibility="visible",t.style.zIndex=i-l):1>n?(t.cur=1,t.style.visibility="visible",t.style.zIndex=(n-1)*l*1e3):(t.style.visibility="hidden",t.style.zIndex=(n-1)*l*1e3)}function o(){1==n?(t.cur=1,t.style.visibility="visible",t.style.zIndex=i-l):n>1?(t.cur=1,t.style.visibility="hidden",t.style.zIndex=(1-n)*l*1e3):(t.style.visibility="hidden",t.style.zIndex=(1-n)*l*1e3)}var l=Math.abs(s);t.cur=.1,s>0?o():a?o():r();var h=1===t.cur?1:.1;t.style.webkitTransform="scale("+h+", "+h+") translateZ(0)"},jyxs:function(t,e,i,n,s,a){function r(){t.style.visibility=1>n?"hidden":"visible",1===n?(t.style.opacity=1-s/i,t.style.zIndex=i-l):(t.style.opacity=-s/i,t.style.zIndex=(n-1)*l*1e3)}function o(){t.style.visibility=n>1?"hidden":"visible",1===n?(t.style.opacity=1+s/i,t.style.zIndex=i-l):1>n?(t.style.opacity=s/i,t.style.zIndex=(1-n)*l*1e3):(t.style.opacity=1-s/i,t.style.zIndex=(1-n)*l*1e3)}var l=Math.abs(s);s>0?o():a?(o(),t.style.webkitTransform=1==n?"translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)":n>1?"translateZ(0) translate"+e+"(0px)":"translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)"):(r(),t.style.webkitTransform=1>n?"translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)":"translateZ(0) translate"+e+"(0px)")},phyc:function(t,e,i,n,s,a){function r(){t.style.visibility=1>n?"hidden":"visible",t.style.zIndex=1===n?i-l:(n-1)*l*1e3}function o(){t.style.visibility=n>1?"hidden":"visible",1===n?t.style.zIndex=i-l:1>n&&(t.style.zIndex=(1-n)*l*1e3,t.style.zIndex=(1-n)*l*1e3)}var l=Math.abs(s);s>0?(o(),1>n&&(t.style.webkitTransform="translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)")):a?(o(),t.style.webkitTransform=1==n?"translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)":1>n?"translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)":"translateZ(0) translate"+e+"(0px)"):(r(),t.style.webkitTransform=1==n?"translateZ(0) translate"+e+"(0px)":n>1?"translateZ(0) translate"+e+"("+(s+i*(n-1))+"px)":"translateZ(0) translate"+e+"(0px)")},sxhd:function(t,e,i,n,s){var a=Math.abs(s);1===n?(t.style.zIndex=i-a,t.cur=1):t.style.zIndex=s>0?(1-n)*a*1e3:(n-1)*a*1e3,t.cur&&t.cur!==n&&setTimeout(function(){t.cur=null},300);var r=t.cur?1-.8*Math.abs(n-1)-Math.abs(.8*s/i).toFixed(6):1;t.style.webkitTransform="scale("+r+", "+r+") translateZ(0) translate"+e+"("+((1+.2*Math.abs(n-1))*s+i*(n-1))+"px)"},kpfy:function(t,e,i,n,s,a){function r(){t.style.visibility=1>n?"hidden":"visible",t.style.zIndex=1===n?i-l:(n-1)*l*1e3,t.style.cssText+="-webkit-backface-visibility:hidden;-webkit-transform-style:preserve-3d;  position:absolute;"+d}function o(){t.style.visibility=n>1?"hidden":"visible",1===n?t.style.zIndex=i-l:1>n&&(t.style.zIndex=(1-n)*l*1e3,t.style.zIndex=(1-n)*l*1e3),t.style.cssText+="-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d;  position:absolute;"+u}var l=Math.abs(s),h=void 0,c=void 0,d=void 0,u=void 0;"X"===e?(h="Y",c=1,d="-webkit-transform-origin: right 50% 0px;",u="-webkit-transform-origin: left 50% 0px;"):(h="X",c=-1,d="-webkit-transform-origin: 50% bottom 0px;",u="-webkit-transform-origin: 50% top 0px;"),this.wrap.style.webkitPerspective=4*i,s>0?(o(),1>n&&(t.style.webkitTransform="rotate"+h+"("+90*c*(s/i+n-1)+"deg)")):a?(o(),t.style.webkitTransform=1==n?"rotate"+h+"(0deg) ":1>n?"rotate"+h+"("+90*c*(s/i+n-1)+"deg)":"rotate"+h+"(0deg) "):(r(),t.style.webkitTransform=1==n?"rotate"+h+"(0deg) ":n>1?"rotate"+h+"("+90*c*(s/i+n-1)+"deg)":"rotate"+h+"(0deg) ")}};e.exports=i},{}],4:[function(t,e){"use strict";function i(){var t=this;if(console.log(t),!t.isVertical)for(var e=[],i=[],n=0;2>n;n++)e[n]=document.createElement("div"),e[n].className="islider-btn-outer",i[n]=document.createElement("div"),i[n].className="islider-btn-inner",0===n?(e[n].className+=" left",e[n].dir=-1):(e[n].className+=" right",e[n].dir=1),e[n].addEventListener("click",function(){var e=parseInt(this.getAttribute("dir"),10);t.slideTo(t.slideIndex+e)}),e[n].appendChild(i[n]),t.wrap.appendChild(e[n],t.wrap.nextSibling)}e.exports=i},{}],5:[function(t,e){"use strict";function i(){var t=this;t.isVertical||!function(){var e=t.data,i=[],n=document.createElement("ul");n.className="islider-dot-wrap";var s=function(){for(var s=document.createDocumentFragment(),a=0;a<e.length;a++)i[a]=document.createElement("li"),i[a].className="islider-dot",i[a].setAttribute("index",a),a===t.slideIndex&&(i[a].className+=" active"),i[a].onclick=function(){t.slideTo(parseInt(this.getAttribute("index"),10))},s.appendChild(i[a]);n.innerHTML="",n.appendChild(s)};s(),t.wrap.parentNode.appendChild(n),t.on("slideChange",function(){if(!t.isVertical)for(var n=0;n<e.length;n++)i[n].className="islider-dot",n===this.slideIndex&&(i[n].className+=" active")}),t.on("reloadData",function(){e=this.data,i=[],s()})}()}e.exports=i},{}],6:[function(t,e){(function(t){"use strict";function i(t,e,i,n){return"translate"+(X?"3d(":"(")+t+"px,"+e+(X?"px,"+i+"px)":"px)")+"scale("+n+")"}function n(t,e){var i,n;return i=t.left-e.left,n=t.top-e.top,Math.sqrt(i*i+n*n)}function s(t,e){return t+"px "+e+"px"}function a(t){return Array.prototype.slice.call(t).map(function(t){return{left:t.pageX,top:t.pageY}})}function r(t,e){var i=n(t[0],t[1]),s=n(e[0],e[1]);return s/i}function o(e){var i={translateX:0,translateY:0,translateZ:0,scaleX:1,scaleY:1,offsetX:0,offsetY:0},n=0,s=0;if(!t.getComputedStyle||!e)return i;var a,r,o=t.getComputedStyle(e);a=o.webkitTransform||o.mozTransform,r=o.webkitTransformOrigin||o.mozTransformOrigin;var l=r.match(/(.*)px\s+(.*)px/);if(l.length>1&&(n=l[1]-0,s=l[2]-0),"none"==a)return i;var h=a.match(/^matrix3d\((.+)\)$/),c=a.match(/^matrix\((.+)\)$/);if(h){var d=h[1].split(", ");i={translateX:d[12]-0,translateY:d[13]-0,translateZ:d[14]-0,offsetX:n-0,offsetY:s-0,scaleX:d[0]-0,scaleY:d[5]-0,scaleZ:d[10]-0}}else if(c){var d=c[1].split(", ");i={translateX:d[4]-0,translateY:d[5]-0,offsetX:n-0,offsetY:s-0,scaleX:d[0]-0,scaleY:d[3]-0}}return i}function l(t,e){return{x:(t.x+e.x)/2,y:(t.y+e.y)/2}}function h(t){x=t.currentScale,T=t.zoomFactor,N=t.extendFunction}function c(t){N.startHandlerOriginal.call(this,t);var e=this.els[1].querySelector("img:first-child"),i=this.deviceEvents;if(i.hasTouch&&null!==e){M=!0;var n=o(e);k=a(t.targetTouches),E=n.translateX-0,_=n.translateY-0,x=n.scaleX,w=e;var r=y(e);if(2==t.targetTouches.length){I=null;var h=t.touches,c=l({x:h[0].pageX,y:h[0].pageY},{x:h[1].pageX,y:h[1].pageY});e.style.webkitTransformOrigin=s(c.x-r.left,c.y-r.top)}else if(1===t.targetTouches.length){var d=(new Date).getTime();z=0,300>d-I&&(t.preventDefault(),z=3),I=d}}}function d(t){if(M){var e=0,i=w,n=this.deviceEvents;if(n.hasTouch&&(2===t.targetTouches.length?(i.style.webkitTransitionDuration="0",t.preventDefault(),f(t),e=2):1===t.targetTouches.length&&x>1&&(i.style.webkitTransitionDuration="0",t.preventDefault(),v.call(this,t),e=1),z=e,e>0))return}N.moveHandlerOriginal.call(this,t)}function u(t){console.log(e);var e=e||2,n=w,a=y(n);x=1==x?e:1,n.style.webkitTransform=i(0,0,0,x),1!=x&&(n.style.webkitTransformOrigin=s(t.touches[0].pageX-a.left,t.touches[0].pageY-a.top))}function f(t){var e=a(t.targetTouches),n=r(k,e),s=w;n=O>x*n?O:x*n,s.style.webkitTransform=i(0,0,0,n)}function p(t){if(M){var e=0;if(2===z?(b(t),e=2):1==z?(b(t),e=1):3===z&&(u(t),b(t),M=!1),e>0)return}N.endHandlerOriginal.call(this,t)}function v(t){var e=w,n=this.deviceEvents,s={X:n.hasTouch?t.targetTouches[0].pageX-this.startX:t.pageX-this.startX,Y:n.hasTouch?t.targetTouches[0].pageY-this.startY:t.pageY-this.startY},a={x:E+s.X-0,y:_+s.Y-0};e.style.webkitTransform=i(a.x,a.y,0,x)}function y(t){var e={left:0,top:0};do e.top+=t.offsetTop||0,e.left+=t.offsetLeft||0,t=t.offsetParent;while(t);return e}function g(t,e,i){var n,s,a=y(t);S={start:{left:a.left,top:a.top},end:{left:a.left+t.clientWidth,top:a.top+t.clientHeight}};var r=1==i?"left":"top";return n=S.start[r],s=S.end[r],e>=n&&s>=e}function m(t,e){var i=0,n=g(t,e.start.left,1),s=g(t,e.end.left,1),a=g(t,e.start.top,0),r=g(t,e.end.top,0);return n!=s&&a!=r?i=n&&r?1:n&&a?2:s&&r?3:4:n==s?!a&&r?i=5:!r&&a&&(i=6):a==r?!n&&s?i=7:n&&!s&&(i=8):a==r==n==s&&(i=9),i}function b(){if(1!=x){var t,e,n,s,a,r,l,h,c,d,u=w;switch(n=o(u),c=u.parentNode,s=u.clientWidth*n.scaleX,a=u.clientHeight*n.scaleX,r=y(u),l={left:(1-n.scaleX)*n.offsetX+r.left+n.translateX,top:(1-n.scaleX)*n.offsetY+r.top+n.translateY},h={left:l.left+s,top:l.top+a},t=l.left,e=l.top,d=m(c,{start:l,end:h})){case 1:t=S.start.left,e=S.end.top-a;break;case 2:t=S.start.left,e=S.start.top;break;case 3:t=S.end.left-s,e=S.end.top-a;break;case 4:t=S.end.left-s,e=S.start.top;break;case 5:e=S.end.top-a;break;case 6:e=S.start.top;break;case 7:t=S.end.left-s;break;case 8:t=S.start.left}s<c.clientWidth&&(t=r.left-(n.scaleX-1)*u.clientWidth/2),a<c.clientHeight&&(e=r.top-(n.scaleX-1)*u.clientHeight/2),u.style.webkitTransitionDuration="100ms",u.style.webkitTransform=i(n.translateX+t-l.left,n.translateY+e-l.top,0,n.scaleX)}}var x,T,w,k,E,_,I,z,N={},X="WebKitCSSMatrix"in t&&"m11"in new WebKitCSSMatrix,O=.5,S={},M=!1;e.exports={startHandler:c,moveHandler:d,endHandler:p,initZoom:h}}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}]},{},[1]);