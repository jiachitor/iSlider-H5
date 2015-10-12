!function t(e,i,s){function a(r,o){if(!i[r]){if(!e[r]){var h="function"==typeof require&&require;if(!o&&h)return h(r,!0);if(n)return n(r,!0);var l=new Error("Cannot find module '"+r+"'");throw l.code="MODULE_NOT_FOUND",l}var d=i[r]={exports:{}};e[r][0].call(d.exports,function(t){var i=e[r][1][t];return a(i?i:t)},d,d.exports,t,e,i,s)}return i[r].exports}for(var n="function"==typeof require&&require,r=0;r<s.length;r++)a(s[r]);return a}({1:[function(t,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function a(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var n=function(t,e,i){for(var s=!0;s;){var a=t,n=e,r=i;o=l=h=void 0,s=!1,null===a&&(a=Function.prototype);var o=Object.getOwnPropertyDescriptor(a,n);if(void 0!==o){if("value"in o)return o.value;var h=o.get;return void 0===h?void 0:h.call(r)}var l=Object.getPrototypeOf(a);if(null===l)return void 0;t=l,e=n,i=r,s=!0}},r=t("./islider_core.js"),o=i(r),h=t("./plugins/islider_animate.js"),l=i(h),d=t("./plugins/islider_button.js"),c=i(d),u=t("./plugins/islider_dot.js"),f=i(u),p=function(t){function e(){s(this,e);for(var t=arguments.length,i=Array(t),a=0;t>a;a++)i[a]=arguments[a];n(Object.getPrototypeOf(e.prototype),"constructor",this).apply(this,i),this.extend(l["default"],this._animateFuncs),this.extend(c["default"],this),this.extend(f["default"],this)}return a(e,t),e}(o["default"]);e.exports=p},{"./islider_core.js":2,"./plugins/islider_animate.js":3,"./plugins/islider_button.js":4,"./plugins/islider_dot.js":5}],2:[function(t,e){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var a=function(){function t(t,e){for(var i=0;i<e.length;i++){var s=e[i];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}return function(e,i,s){return i&&t(e.prototype,i),s&&t(e,s),e}}(),n=t("./plugins/islider_zoom.js"),r=i(n),o=function(){function t(e){if(s(this,t),!e.dom)throw new Error("dom element can not be empty!");if(!e.data||!e.data.length)throw new Error("data must be an array and must have more than one element!");this.extend(r["default"],this),this._opts=e,this._setting(),this._renderHTML(),this._bindHandler()}return a(t,[{key:"_setting",value:function(){var t=this._opts;this.wrap=t.dom,this.data=t.data,this.type=t.type||"pic",this.isVertical=t.isVertical||!1,this.isOverspread=t.isOverspread||!1,this.duration=t.duration||2e3,this.initIndex=t.initIndex||0,this.fixPage=void 0===t.fixPage?!0:t.fixPage,(this.initIndex>this.data.length-1||this.initIndex<0)&&(this.initIndex=0),this.slideIndex=this.slideIndex||this.initIndex||0,this.axis=this.isVertical?"Y":"X",this.reverseAxis="Y"===this.axis?"X":"Y",this.width=this.wrap.clientWidth,this.height=this.wrap.clientHeight,this.ratio=this.height/this.width,this.scale=t.isVertical?this.height:this.width,this.onslide=t.onslide,this.onslidestart=t.onslidestart,this.onslideend=t.onslideend,this.onslidechange=t.onslidechange,this.isLoading=t.isLoading,this.offset=this.offset||{X:0,Y:0},this.useZoom=t.useZoom||!1,this.data.length<2?(this.isLooping=!1,this.isAutoPlay=!1):(this.isLooping=t.isLooping||!1,this.isAutoplay=t.isAutoplay||!1),"card"===t.animateType&&this.isVertical&&(this.isOverspread=!0),this.isAutoplay&&this.play(),this.useZoom&&this._initZoom(t),this.log=t.isDebug?function(t){window.console.log(t)}:function(){},this._setUpDamping(),this._setPlayWhenFocus(),this._animateFuncs={"default":function(t,e,i,s,a){t.style.webkitTransform="translateZ(0) translate"+e+"("+(a+i*(s-1))+"px)"}},this._animateFunc=t.animateType in this._animateFuncs?this._animateFuncs[t.animateType]:this._animateFuncs["default"]}},{key:"_setPlayWhenFocus",value:function(){window.addEventListener("focus",this,!1),window.addEventListener("blur",this,!1)}},{key:"_setUpDamping",value:function(){var t=this.scale>>1,e=t>>1,i=e>>2;this._damping=function(s){var a=Math.abs(s),n=void 0;return n=t>a?a>>1:t+e>a?e+(a-t>>2):e+i+(a-t-e>>3),s>0?n:-n}}},{key:"_renderItem",value:function(t,e){var i=void 0,s=void 0,a=this.data.length,n=this,r=function(){s=i.height/i.width>n.ratio?'<img height="'+n.height+'" src="'+i.content+'">':'<img width="'+n.width+'" src="'+i.content+'">',t.innerHTML=s};return i=this.isLooping?0>e?this.data[a+e]:e>a-1?this.data[e-a]:this.data[e]:this.data[e]||{empty:!0},i.empty?(t.innerHTML="",void(t.style.background="")):void("pic"===this.type?this.isOverspread?(t.style.background="url("+i.content+") 50% 50% no-repeat",t.style.backgroundSize="cover"):i.height&i.width?r():!function(){var t=new Image;t.src=i.content,t.onload=function(){i.height=t.height,i.width=t.width,r()}}():"dom"===this.type&&(t.innerHTML=i.content))}},{key:"_renderHTML",value:function(){this.outer&&(this.outer.innerHTML="");var t=this.outer||document.createElement("ul");if(t.className="islider-outer",t.style.cssText="height:"+this.height+"px;width:"+this.width+"px;margin:0;padding:0;list-style:none;","pic"===this.type&&!this.loader&&this.isLoading){var e=document.createElement("div");e.className="islider-loader",this.loader=e,this.wrap.appendChild(e)}this.els=[];for(var i=0;3>i;i++){var s=document.createElement("li");s.className="dom"===this.type?"islider-dom":"islider-pic",s.style.cssText="height:"+this.height+"px;width:"+this.width+"px;",this.els.push(s),this._animateFunc(s,this.axis,this.scale,i,0),!this.isVertical||"rotate"!==this._opts.animateType&&"flip"!==this._opts.animateType?this._renderItem(s,i-1+this.slideIndex):this._renderItem(s,1-i+this.slideIndex),t.appendChild(s)}this._initLoadImg(),this.outer||(this.outer=t,this.wrap.appendChild(t))}},{key:"_preloadImg",value:function(t){var e=this.data.length,i=t,s=this,a=function(t){t>-1&&!s.data[t].loaded&&!function(){var e=new Image;e.src=s.data[t].content,e.onload=function(){s.data[t].width=e.width,s.data[t].height=e.height},s.data[t].loaded=1}()};if("dom"!==s.type&&e>3){var n=i+2>e-1?(i+2)%e:i+2,r=0>i-2?e-2+i:i-2;a(n),a(r)}}},{key:"_initLoadImg",value:function(){var t=this.data,e=t.length,i=this.slideIndex,s=this;if("dom"!==this.type&&e>3){var a=i+2>e?(i+1)%e:i+1,n=0>i-1?e-1+i:i-1;t[i].loaded=1,t[a].loaded=1,s.isLooping&&(t[n].loaded=1),setTimeout(function(){s._preloadImg(i)},200)}}},{key:"slideTo",value:function(t){var e=this.data,i=this.els,s=t,a=t-this.slideIndex;if(Math.abs(a)>1){var n=a>0?this.els[2]:this.els[0];this._renderItem(n,s)}this._preloadImg(s),e[s]?this.slideIndex=s:this.isLooping?this.slideIndex=a>0?0:e.length-1:(this.slideIndex=this.slideIndex,a=0),this.log("pic idx:"+this.slideIndex);var r=void 0;!this.isVertical||"rotate"!==this._opts.animateType&&"flip"!==this._opts.animateType?a>0?(r=i.shift(),i.push(r)):0>a&&(r=i.pop(),i.unshift(r)):a>0?(r=i.pop(),i.unshift(r)):0>a&&(r=i.shift(),i.push(r)),0!==a&&(Math.abs(a)>1?(this._renderItem(i[0],s-1),this._renderItem(i[2],s+1)):1===Math.abs(a)&&this._renderItem(r,s+a),r.style.webkitTransition="none",r.style.visibility="hidden",setTimeout(function(){r.style.visibility="visible"},200),this.onslidechange&&this.onslidechange(this.slideIndex),this.dotchange&&this.dotchange());for(var o=0;3>o;o++)i[o]!==r&&(i[o].style.webkitTransition="all .3s ease"),this._animateFunc(i[o],this.axis,this.scale,o,0);this.isAutoplay&&!this.isLooping&&this.slideIndex===e.length-1&&this.pause()}},{key:"_device",value:function(){var t=!!("ontouchstart"in window||window.DocumentTouch&&document instanceof window.DocumentTouch),e=t?"touchstart":"mousedown",i=t?"touchmove":"mousemove",s=t?"touchend":"mouseup";return{hasTouch:t,startEvt:e,moveEvt:i,endEvt:s}}},{key:"_bindHandler",value:function(){var t=this.outer,e=this._device();e.hasTouch||(t.style.cursor="pointer",t.ondragstart=function(t){return t?!1:!0}),t.addEventListener(e.startEvt,this),t.addEventListener(e.moveEvt,this),t.addEventListener(e.endEvt,this),window.addEventListener("orientationchange",this)}},{key:"bind",value:function(t,e,i){function s(t){for(var s=window.event?window.event:t,a=s.target,n=document.querySelectorAll(e),r=0;r<n.length;r++)if(a===n[r]){i.call(a);break}}this.wrap.addEventListener(t,s,!1)}},{key:"delegate",value:function(t,e,i){function s(t){for(var s=window.event?window.event:t,a=s.target,n=document.querySelectorAll(e),r=0;r<n.length;r++)if(a===n[r]){i.call(a);break}}this.wrap.addEventListener(t,s,!1)}},{key:"destroy",value:function(){var t=this.outer,e=this._device();t.removeEventListener(e.startEvt,this),t.removeEventListener(e.moveEvt,this),t.removeEventListener(e.endEvt,this),window.removeEventListener("orientationchange",this),window.removeEventListener("focus",this),window.removeEventListener("blur",this),this.wrap.innerHTML=""}},{key:"handleEvent",value:function(t){var e=this._device();switch(t.type){case e.startEvt:this.startHandler(t);break;case e.moveEvt:this.moveHandler(t);break;case e.endEvt:this.endHandler(t);break;case"touchcancel":this.endHandler(t);break;case"orientationchange":this.orientationchangeHandler();break;case"focus":this.isAutoplay&&this.play();break;case"blur":this.pause()}}},{key:"startHandler",value:function(t){if(this.fixPage){var e=t.target;"SELECT"!==e.tagName&&"INPUT"!==e.tagName&&"TEXTAREA"!==e.tagName&&t.preventDefault()}var i=this._device();this.isMoving=!0,this.pause(),this.onslidestart&&this.onslidestart(),this.log("Event: beforeslide"),this.startTime=(new Date).getTime(),this.startX=i.hasTouch?t.targetTouches[0].pageX:t.pageX,this.startY=i.hasTouch?t.targetTouches[0].pageY:t.pageY,this._startHandler&&this._startHandler(t)}},{key:"moveHandler",value:function(t){if(this.isMoving){var e=this._device(),i=this.data.length,s=this.axis,a=this.reverseAxis,n={X:e.hasTouch?t.targetTouches[0].pageX-this.startX:t.pageX-this.startX,Y:e.hasTouch?t.targetTouches[0].pageY-this.startY:t.pageY-this.startY},r=this._moveHandler?this._moveHandler(t):!1;if(!r&&Math.abs(n[s])-Math.abs(n[a])>10){t.preventDefault(),this.onslide&&this.onslide(n[s]),this.log("Event: onslide"),this.isLooping||(n[s]>0&&0===this.slideIndex||n[s]<0&&this.slideIndex===i-1)&&(n[s]=this._damping(n[s]));for(var o=0;3>o;o++){var h=this.els[o];h.style.webkitTransition="all 0s",this._animateFunc(h,s,this.scale,o,n[s])}}this.offset=n}}},{key:"endHandler",value:function(t){this.isMoving=!1;var e=this.offset,i=this.axis,s=this.scale/2,a=(new Date).getTime();s=a-this.startTime>300?s:14;var n=this._endHandler?this._endHandler(t):!1,r=Math.abs(e[i]),o=Math.abs(e[this.reverseAxis]),h=function l(t){if("A"===t.tagName){if(t.href)return window.location.href=t.href,!1}else{if("islider-dom"===t.className)return!1;l(t.parentNode)}};!n&&e[i]>=s&&r>o?this.slideTo(this.slideIndex-1):!n&&e[i]<-s&&r>o?this.slideTo(this.slideIndex+1):n||this.slideTo(this.slideIndex),Math.abs(this.offset.X)<10&&Math.abs(this.offset.Y)<10&&(this.tapEvt=document.createEvent("Event"),this.tapEvt.initEvent("tap",!0,!0),this.fixPage&&"dom"===this.type&&h(t.target),t.target.dispatchEvent(this.tapEvt)||t.preventDefault()),this.offset.X=this.offset.Y=0,this.isAutoplay&&this.play(),this.onslideend&&this.onslideend(this.slideIndex),this.log("Event: afterslide")}},{key:"orientationchangeHandler",value:function(){var t=this;setTimeout(function(){t.reset(),t.log("Event: orientationchange")},100)}},{key:"reset",value:function(){this.pause(),this._setting(),this._renderHTML(),this.isAutoplay&&this.play()}},{key:"loadData",value:function(t,e){this.pause(),this.slideIndex=e||0,this.data=t,this._renderHTML(),this.isAutoplay&&this.play()}},{key:"play",value:function(){var t=this,e=this.duration;clearInterval(this.autoPlayTimer),this.autoPlayTimer=setInterval(function(){t.slideTo(t.slideIndex+1)},e)}},{key:"pause",value:function(){clearInterval(this.autoPlayTimer)}},{key:"extend",value:function(t,e){e||(e=this),Object.keys(t).forEach(function(i){Object.defineProperty(e,i,Object.getOwnPropertyDescriptor(t,i))})}}]),t}();e.exports=o},{"./plugins/islider_zoom.js":6}],3:[function(t,e){"use strict";var i={rotate:function(t,e,i,s,a){var n="X"===e?"Y":"X",r=Math.abs(a),o=window.getComputedStyle(this.wrap.parentNode,null).backgroundColor;this.isVertical&&(a=-a),this.wrap.style.webkitPerspective=4*i,t.style.zIndex=1===s?i-r:a>0?(1-s)*r:(s-1)*r,t.style.cssText+="-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; background-color:"+o+"; position:absolute;",t.style.webkitTransform="rotate"+n+"("+90*(a/i+s-1)+"deg) translateZ("+.888*i/2+"px) scale(0.888)"},flip:function(t,e,i,s,a){var n="X"===e?"Y":"X",r=window.getComputedStyle(this.wrap.parentNode,null).backgroundColor;this.isVertical&&(a=-a),this.wrap.style.webkitPerspective=4*i,t.style.visibility=a>0?s>1?"hidden":"visible":1>s?"hidden":"visible",t.style.cssText+="position:absolute; -webkit-backface-visibility:hidden; background-color:"+r+";",t.style.webkitTransform="translateZ("+i/2+"px) rotate"+n+"("+180*(a/i+s-1)+"deg) scale(0.875)"},depth:function(t,e,i,s,a){var n=.18*(4-Math.abs(s-1));this.wrap.style.webkitPerspective=4*i,t.style.zIndex=1===s?100:a>0?1-s:s-1,t.style.webkitTransform="scale("+n+", "+n+") translateZ(0) translate"+e+"("+(a+1.3*i*(s-1))+"px)"},flow:function(t,e,i,s,a){var n=Math.abs(a),r="X"===e?"Y":"X",o="X"===e?1:-1,h=Math.abs(a/i);this.wrap.style.webkitPerspective=4*i,t.style.zIndex=1===s?i-n:a>0?(1-s)*n:(s-1)*n,t.style.webkitTransform="scale(0.7, 0.7) translateZ("+(150*h-150)*Math.abs(s-1)+"px)translate"+e+"("+(a+i*(s-1))+"px)rotate"+r+"("+o*(30-30*h)*(1-s)+"deg)"},card:function(t,e,i,s,a){var n=Math.abs(a);1===s?(t.style.zIndex=i-n,t.cur=1):t.style.zIndex=a>0?(1-s)*n*1e3:(s-1)*n*1e3,t.cur&&t.cur!==s&&setTimeout(function(){t.cur=null},300);var r=t.cur?1-.2*Math.abs(s-1)-Math.abs(.2*a/i).toFixed(6):1;t.style.webkitTransform="scale("+r+", "+r+") translateZ(0) translate"+e+"("+((1+.2*Math.abs(s-1))*a+i*(s-1))+"px)"}};e.exports=i},{}],4:[function(t,e){"use strict";function i(){var t=this;this.isVertical||!function(){for(var e=[],i=[],s=t,a=0;2>a;a++)e[a]=document.createElement("div"),e[a].className="islider-btn-outer",i[a]=document.createElement("div"),i[a].className="islider-btn-inner",0===a?(e[a].className+=" left",e[a].dir=-1):(e[a].className+=" right",e[a].dir=1),e[a].addEventListener("click",function(){var t=parseInt(this.getAttribute("dir"),10);s.slideTo(s.slideIndex+t)}),e[a].appendChild(i[a]),t.wrap.appendChild(e[a],t.wrap.nextSibling)}()}e.exports={addBtn:i}},{}],5:[function(t,e){"use strict";function i(){var t=this;this.isVertical||!function(){var e=t,i=t.data,s=[],a=document.createElement("ul");a.className="islider-dot-wrap";for(var n=document.createDocumentFragment(),r=0;r<i.length;r++)s[r]=document.createElement("li"),s[r].className="islider-dot",s[r].setAttribute("index",r),r===t.slideIndex&&(s[r].className+=" active"),s[r].addEventListener("click",function(){var t=parseInt(this.getAttribute("index"),10);e.slideTo(t)}),n.appendChild(s[r]);a.appendChild(n),t.wrap.parentNode.appendChild(a),t.dotchange=function(){for(var t=0;t<i.length;t++)s[t].className="islider-dot",t===this.slideIndex&&(s[t].className+=" active")}}()}e.exports={addDot:i}},{}],6:[function(t,e){"use strict";function i(t,e,i,s){return"translate"+(b?"3d(":"(")+t+"px,"+e+(b?"px,"+i+"px)":"px)")+"scale("+s+")"}function s(t,e){var i=void 0,s=void 0;return i=t.left-e.left,s=t.top-e.top,Math.sqrt(i*i+s*s)}function a(t,e){return t+"px "+e+"px"}function n(t){return Array.prototype.slice.call(t).map(function(t){return{left:t.pageX,top:t.pageY}})}function r(t,e){var i=s(t[0],t[1]),a=s(e[0],e[1]);return a/i}function o(t){var e={translateX:0,translateY:0,translateZ:0,scaleX:1,scaleY:1,offsetX:0,offsetY:0},i=0,s=0;if(!window.getComputedStyle||!t)return e;var a=window.getComputedStyle(t),n=void 0,r=void 0;n=a.webkitTransform||a.mozTransform,r=a.webkitTransformOrigin||a.mozTransformOrigin;var o=r.match(/(.*)px\s+(.*)px/);if(o.length>1&&(i=o[1]-0,s=o[2]-0),"none"==n)return e;var h=n.match(/^matrix3d\((.+)\)$/),l=n.match(/^matrix\((.+)\)$/);if(h){var d=h[1].split(", ");e={translateX:d[12]-0,translateY:d[13]-0,translateZ:d[14]-0,offsetX:i-0,offsetY:s-0,scaleX:d[0]-0,scaleY:d[5]-0,scaleZ:d[10]-0}}else if(l){var d=l[1].split(", ");e={translateX:d[4]-0,translateY:d[5]-0,offsetX:i-0,offsetY:s-0,scaleX:d[0]-0,scaleY:d[3]-0}}return e}function h(t,e){return{x:(t.x+e.x)/2,y:(t.y+e.y)/2}}function l(t){this.currentScale=1,this.zoomFactor=t.zoomFactor||2}function d(t){if(this.useZoom){var e=this.els[1].querySelector("img"),i=o(e);this.startTouches=n(t.targetTouches),this._startX=i.translateX-0,this._startY=i.translateY-0,this.currentScale=i.scaleX,this.zoomNode=e;var s=g(e);if(2==t.targetTouches.length){console.log("gesture"),this.lastTouchStart=null;var r=t.touches,l=h({x:r[0].pageX,y:r[0].pageY},{x:r[1].pageX,y:r[1].pageY});e.style.webkitTransformOrigin=a(l.x-s.left,l.y-s.top)}else if(1===t.targetTouches.length){var d=(new Date).getTime();this.gesture=0,d-this.lastTouchStart<300&&(t.preventDefault(),this.gesture=3),this.lastTouchStart=d}}}function c(t){var e=0,i=this.zoomNode,s=this._device();return s.hasTouch?(2===t.targetTouches.length&&this.useZoom?(i.style.webkitTransitionDuration="0",t.preventDefault(),this._scaleImage(t),e=2):1==t.targetTouches.length&&this.useZoom&&this.currentScale>1&&(i.style.webkitTransitionDuration="0",t.preventDefault(),this._moveImage(t),e=1),this.gesture=e,e):void 0}function u(t){var e=this.zoomFactor||2,s=this.zoomNode,n=g(s);this.currentScale=1==this.currentScale?e:1,s.style.webkitTransform=i(0,0,0,this.currentScale),1!=this.currentScale&&(s.style.webkitTransformOrigin=a(t.touches[0].pageX-n.left,t.touches[0].pageY-n.top))}function f(t){var e=n(t.targetTouches),s=r(this.startTouches,e);t.scale=t.scale||s;var a=this.zoomNode;s=this.currentScale*t.scale<x?x:this.currentScale*t.scale,a.style.webkitTransform=i(0,0,0,s)}function p(t){var e=0;return 2===this.gesture?(this._resetImage(t),e=2):1==this.gesture?(this._resetImage(t),e=1):3===this.gesture&&(this._handleDoubleTap(t),this._resetImage(t)),e}function v(t){var e=this.zoomNode,s=this._device(),a={X:s.hasTouch?t.targetTouches[0].pageX-this.startX:t.pageX-this.startX,Y:s.hasTouch?t.targetTouches[0].pageY-this.startY:t.pageY-this.startY};this.moveOffset={x:this._startX+a.X-0,y:this._startY+a.Y-0},e.style.webkitTransform=i(this.moveOffset.x,this.moveOffset.y,0,this.currentScale)}function g(t){var e={left:0,top:0};do e.top+=t.offsetTop||0,e.left+=t.offsetLeft||0,t=t.offsetParent;while(t);return e}function m(t,e,i){var s=void 0,a=void 0,n=g(t);T={start:{left:n.left,top:n.top},end:{left:n.left+t.clientWidth,top:n.top+t.clientHeight}};var r=1==i?"left":"top";return s=T.start[r],a=T.end[r],e>=s&&a>=e}function y(t,e){var i=0,s=m(t,e.start.left,1),a=m(t,e.end.left,1),n=m(t,e.start.top,0),r=m(t,e.end.top,0);return s!=a&&n!=r?i=s&&r?1:s&&n?2:a&&r?3:4:s==a?!n&&r?i=5:!r&&n&&(i=6):n==r?!s&&a?i=7:s&&!a&&(i=8):n==r==s==a&&(i=9),i}function w(){if(1!=this.currentScale){var t=this.zoomNode,e=void 0,s=void 0,a=void 0,n=void 0,r=void 0,h=void 0,l=void 0,d=void 0,c=void 0,u=void 0;switch(a=o(t),c=t.parentNode,n=t.clientWidth*a.scaleX,r=t.clientHeight*a.scaleX,h=g(t),l={left:(1-a.scaleX)*a.offsetX+h.left+a.translateX,top:(1-a.scaleX)*a.offsetY+h.top+a.translateY},d={left:l.left+n,top:l.top+r},e=l.left,s=l.top,u=y(c,{start:l,end:d})){case 1:e=T.start.left,s=T.end.top-r;break;case 2:e=T.start.left,s=T.start.top;break;case 3:e=T.end.left-n,s=T.end.top-r;break;case 4:e=T.end.left-n,s=T.start.top;break;case 5:s=T.end.top-r;break;case 6:s=T.start.top;break;case 7:e=T.end.left-n;break;case 8:e=T.start.left}n<c.clientWidth&&(e=h.left-(a.scaleX-1)*t.clientWidth/2),r<c.clientHeight&&(s=h.top-(a.scaleX-1)*t.clientHeight/2),t.style.webkitTransitionDuration="100ms",t.style.webkitTransform=i(a.translateX+e-l.left,a.translateY+s-l.top,0,a.scaleX)}}var b="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,x=.5,T={};e.exports={_initZoom:l,_scaleImage:f,_moveImage:v,_resetImage:w,_handleDoubleTap:u,_moveHandler:c,_endHandler:p,_startHandler:d}},{}]},{},[1]);