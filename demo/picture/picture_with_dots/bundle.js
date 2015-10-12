(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _srcIsliderJs = require('../../../src/islider.js');

var _srcIsliderJs2 = _interopRequireDefault(_srcIsliderJs);

var list = [{ content: "../imgs/long/1.jpg" }, { content: "../imgs/long/2.jpg" }, { content: "../imgs/long/3.jpg" }, { content: "../imgs/long/4.jpg" }, { content: "../imgs/long/5.jpg" }, { content: "../imgs/long/6.jpg" }, { content: "../imgs/long/7.jpg" }, { content: "../imgs/long/8.jpg" }, { content: "../imgs/long/9.jpg" }];

var opts = {
    type: 'pic',
    data: list,
    dom: document.getElementById("iSlider-wrapper"),
    animateType: 'rotate',
    isLooping: true
};

var islider = new _srcIsliderJs2["default"](opts);

islider.addDot();

},{"../../../src/islider.js":2}],2:[function(require,module,exports){
'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _islider_coreJs = require('./islider_core.js');

var _islider_coreJs2 = _interopRequireDefault(_islider_coreJs);

var _pluginsIslider_buttonJs = require('./plugins/islider_button.js');

var _pluginsIslider_buttonJs2 = _interopRequireDefault(_pluginsIslider_buttonJs);

var _pluginsIslider_dotJs = require('./plugins/islider_dot.js');

var _pluginsIslider_dotJs2 = _interopRequireDefault(_pluginsIslider_dotJs);

var iSlider = (function (_iSliderCore) {
    _inherits(iSlider, _iSliderCore);

    function iSlider() {
        _classCallCheck(this, iSlider);

        for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
            opts[_key] = arguments[_key];
        }

        //直接调用父类构造器进行初始化
        _get(Object.getPrototypeOf(iSlider.prototype), 'constructor', this).apply(this, opts);
        console.log(this._animateFuncs);
        this.extend(_pluginsIslider_buttonJs2['default'], this);
        this.extend(_pluginsIslider_dotJs2['default'], this);
    }

    return iSlider;
})(_islider_coreJs2['default']);

module.exports = iSlider;

},{"./islider_core.js":3,"./plugins/islider_button.js":5,"./plugins/islider_dot.js":6}],3:[function(require,module,exports){
/**
 * @file   iSlider, a simple, efficent mobile slider solution
 *
 * @author BEFE
 * Contact qbaty.qi@gmail.com
 *
 * LICENSE
 * https://github.com/BE-FE/iSlider/blob/master/LICENSE
 */

/**
 * @constructor
 * @param {Object}      opts                参数集
 * @param {Element}     opts.dom            外层元素        Outer wrapper
 * @param {Object}      opts.data           数据列表        Content data
 */
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _pluginsIslider_animateJs = require('./plugins/islider_animate.js');

var _pluginsIslider_animateJs2 = _interopRequireDefault(_pluginsIslider_animateJs);

var _pluginsIslider_zoomJs = require('./plugins/islider_zoom.js');

var _pluginsIslider_zoomJs2 = _interopRequireDefault(_pluginsIslider_zoomJs);

var iSliderCore = (function () {
    //ES6中新型构造器

    function iSliderCore(opts) {
        _classCallCheck(this, iSliderCore);

        if (!opts.dom) {
            throw new Error('dom element can not be empty!');
        }

        if (!opts.data || !opts.data.length) {
            throw new Error('data must be an array and must have more than one element!');
        }

        this.extend(_pluginsIslider_zoomJs2['default'], this);

        this._opts = opts;
        this._setting();
        this._renderHTML();
        this._bindHandler();
    }

    //实例方法

    _createClass(iSliderCore, [{
        key: '_setting',
        value: function _setting() {
            var opts = this._opts;

            // dom element wrapping content
            this.wrap = opts.dom;
            // your data
            this.data = opts.data;
            // default type
            this.type = opts.type || 'pic';
            // default slide direction
            this.isVertical = opts.isVertical || false;
            // Overspread mode
            this.isOverspread = opts.isOverspread || false;
            // Play time gap
            this.duration = opts.duration || 2000;
            // start from initIndex or 0
            this.initIndex = opts.initIndex || 0;
            // touchstart prevent default to fixPage
            if (opts.fixPage === undefined) {
                this.fixPage = true;
            } else {
                this.fixPage = opts.fixPage;
            }

            if (this.initIndex > this.data.length - 1 || this.initIndex < 0) {
                this.initIndex = 0;
            }
            this.slideIndex = this.slideIndex || this.initIndex || 0;

            this.axis = this.isVertical ? 'Y' : 'X';
            this.reverseAxis = this.axis === 'Y' ? 'X' : 'Y';

            this.width = this.wrap.clientWidth;
            this.height = this.wrap.clientHeight;
            this.ratio = this.height / this.width;
            this.scale = opts.isVertical ? this.height : this.width;

            // Callback function when your finger is moving
            this.onslide = opts.onslide;
            // Callback function when your finger touch the screen
            this.onslidestart = opts.onslidestart;
            // Callback function when the finger move out of the screen
            this.onslideend = opts.onslideend;
            // Callback function when the finger move out of the screen
            this.onslidechange = opts.onslidechange;

            this.isLoading = opts.isLoading;

            this.offset = this.offset || { X: 0, Y: 0 };
            this.useZoom = opts.useZoom || false;
            // looping logic adjust
            if (this.data.length < 2) {
                this.isLooping = false;
                this.isAutoPlay = false;
            } else {
                this.isLooping = opts.isLooping || false;
                this.isAutoplay = opts.isAutoplay || false;
            }

            // little trick set, when you chooce tear & vertical same time
            // iSlider overspread mode will be set true autometicly
            if (opts.animateType === 'card' && this.isVertical) {
                this.isOverspread = true;
            }

            // Autoplay mode
            if (this.isAutoplay) {
                this.play();
            }

            if (this.useZoom) {
                this._initZoom(opts);
            }

            // debug mode
            this.log = opts.isDebug ? function (str) {
                window.console.log(str);
            } : function () {};
            // set Damping function
            this._setUpDamping();
            // stop autoplay when window blur
            this._setPlayWhenFocus();

            /**
             * animation parmas:
             *
             * @param {Element}      dom             图片的外层<li>容器       Img wrapper
             * @param {String}       axis            动画方向                animate direction
             * @param {Number}       scale           容器宽度                Outer wrapper
             * @param {Number}       i               <li>容器index          Img wrapper's index
             * @param {Number}       offset          滑动距离                move distance
             */
            this._animateFuncs = {
                'default': function _default(dom, axis, scale, i, offset) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }
            };

            this.extend(_pluginsIslider_animateJs2['default'], this._animateFuncs);

            // set animate Function
            this._animateFunc = opts.animateType in this._animateFuncs ? this._animateFuncs[opts.animateType] : this._animateFuncs['default'];
        }

        // fixed bug for android device
    }, {
        key: '_setPlayWhenFocus',
        value: function _setPlayWhenFocus() {
            window.addEventListener('focus', this, false);
            window.addEventListener('blur', this, false);
        }

        /**
         *  enable damping when slider meet the edge
         */
    }, {
        key: '_setUpDamping',
        value: function _setUpDamping() {
            var oneIn2 = this.scale >> 1;
            var oneIn4 = oneIn2 >> 1;
            var oneIn16 = oneIn4 >> 2;

            this._damping = function (distance) {
                var dis = Math.abs(distance);
                var result = undefined;

                if (dis < oneIn2) {
                    result = dis >> 1;
                } else if (dis < oneIn2 + oneIn4) {
                    result = oneIn4 + (dis - oneIn2 >> 2);
                } else {
                    result = oneIn4 + oneIn16 + (dis - oneIn2 - oneIn4 >> 3);
                }

                return distance > 0 ? result : -result;
            };
        }

        /**
         * render single item html by idx
         * @param {element} el ..
         * @param {number}  i  ..
         */
    }, {
        key: '_renderItem',
        value: function _renderItem(el, i) {
            var item = undefined;
            var html = undefined;
            var len = this.data.length;
            var self = this;

            var insertImg = function insertImg() {
                html = item.height / item.width > self.ratio ? '<img height="' + self.height + '" src="' + item.content + '">' : '<img width="' + self.width + '" src="' + item.content + '">';
                el.innerHTML = html;
            };

            // get the right item of data
            if (!this.isLooping) {
                item = this.data[i] || { empty: true };
            } else {
                if (i < 0) {
                    item = this.data[len + i];
                } else if (i > len - 1) {
                    item = this.data[i - len];
                } else {
                    item = this.data[i];
                }
            }

            if (item.empty) {
                el.innerHTML = '';
                el.style.background = '';
                return;
            }

            if (this.type === 'pic') {
                if (!this.isOverspread) {
                    if (item.height & item.width) {
                        insertImg();
                    } else {
                        (function () {
                            var currentImg = new Image();
                            currentImg.src = item.content;
                            currentImg.onload = function () {
                                item.height = currentImg.height;
                                item.width = currentImg.width;
                                insertImg();
                            };
                        })();
                    }
                } else {
                    el.style.background = 'url(' + item.content + ') 50% 50% no-repeat';
                    el.style.backgroundSize = 'cover';
                }
            } else if (this.type === 'dom') {
                el.innerHTML = item.content;
            }
        }

        /**
         * render list html
         */
    }, {
        key: '_renderHTML',
        value: function _renderHTML() {
            this.outer && (this.outer.innerHTML = '');
            // initail ul element
            var outer = this.outer || document.createElement('ul');
            outer.className = 'islider-outer';
            outer.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;margin:0;padding:0;list-style:none;';

            //loading
            if (this.type === 'pic' && !this.loader && this.isLoading) {
                var loader = document.createElement('div');
                loader.className = 'islider-loader';
                this.loader = loader;
                this.wrap.appendChild(loader);
            }

            // storage li elements, only store 3 elements to reduce memory usage
            this.els = [];
            for (var i = 0; i < 3; i++) {
                var li = document.createElement('li');
                li.className = this.type === 'dom' ? 'islider-dom' : 'islider-pic';
                li.style.cssText = 'height:' + this.height + 'px;width:' + this.width + 'px;';
                this.els.push(li);

                // prepare style animation
                this._animateFunc(li, this.axis, this.scale, i, 0);
                if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
                    this._renderItem(li, 1 - i + this.slideIndex);
                } else {
                    this._renderItem(li, i - 1 + this.slideIndex);
                }
                outer.appendChild(li);
            }

            this._initLoadImg();
            // append ul to div#canvas
            if (!this.outer) {
                this.outer = outer;
                this.wrap.appendChild(outer);
            }
        }

        /**
         *  preload img when slideChange
         *  @param {number} dataIndex means which image will be load
         */
    }, {
        key: '_preloadImg',
        value: function _preloadImg(dataIndex) {
            var len = this.data.length;
            var idx = dataIndex;
            var self = this;
            var loadImg = function loadImg(index) {
                if (index > -1 && !self.data[index].loaded) {
                    (function () {
                        var preloadImg = new Image();
                        preloadImg.src = self.data[index].content;
                        preloadImg.onload = function () {
                            self.data[index].width = preloadImg.width;
                            self.data[index].height = preloadImg.height;
                        };
                        self.data[index].loaded = 1;
                    })();
                }
            };

            if (self.type !== 'dom' && len > 3) {
                var nextIndex = idx + 2 > len - 1 ? (idx + 2) % len : idx + 2;
                var prevIndex = idx - 2 < 0 ? len - 2 + idx : idx - 2;
                loadImg(nextIndex);
                loadImg(prevIndex);
            }
        }
    }, {
        key: '_initLoadImg',

        /**
         *  load extra imgs when renderHTML
         */
        value: function _initLoadImg() {
            var data = this.data;
            var len = data.length;
            var idx = this.slideIndex;
            var self = this;

            if (this.type !== 'dom' && len > 3) {
                var nextIndex = idx + 2 > len ? (idx + 1) % len : idx + 1;
                var prevIndex = idx - 1 < 0 ? len - 1 + idx : idx - 1;
                data[idx].loaded = 1;
                data[nextIndex].loaded = 1;
                if (self.isLooping) {
                    data[prevIndex].loaded = 1;
                }

                setTimeout(function () {
                    self._preloadImg(idx);
                }, 200);
            }
        }

        /**
         *  slide logical, goto data index
         *  @param {number} dataIndex the goto index
         */
    }, {
        key: 'slideTo',
        value: function slideTo(dataIndex) {
            var data = this.data;
            var els = this.els;
            var idx = dataIndex;
            var n = dataIndex - this.slideIndex;

            if (Math.abs(n) > 1) {
                var nextEls = n > 0 ? this.els[2] : this.els[0];
                this._renderItem(nextEls, idx);
            }

            // preload when slide
            this._preloadImg(idx);

            // get right item of data
            if (data[idx]) {
                this.slideIndex = idx;
            } else {
                if (this.isLooping) {
                    this.slideIndex = n > 0 ? 0 : data.length - 1;
                } else {
                    this.slideIndex = this.slideIndex;
                    n = 0;
                }
            }

            this.log('pic idx:' + this.slideIndex);

            // keep the right order of items
            var sEle = undefined;
            if (this.isVertical && (this._opts.animateType === 'rotate' || this._opts.animateType === 'flip')) {
                if (n > 0) {
                    sEle = els.pop();
                    els.unshift(sEle);
                } else if (n < 0) {
                    sEle = els.shift();
                    els.push(sEle);
                }
            } else {
                if (n > 0) {
                    sEle = els.shift();
                    els.push(sEle);
                } else if (n < 0) {
                    sEle = els.pop();
                    els.unshift(sEle);
                }
            }

            // slidechange should render new item
            // and change new item style to fit animation
            if (n !== 0) {
                if (Math.abs(n) > 1) {
                    this._renderItem(els[0], idx - 1);
                    this._renderItem(els[2], idx + 1);
                } else if (Math.abs(n) === 1) {
                    this._renderItem(sEle, idx + n);
                }
                sEle.style.webkitTransition = 'none';
                sEle.style.visibility = 'hidden';

                setTimeout(function () {
                    sEle.style.visibility = 'visible';
                }, 200);

                this.onslidechange && this.onslidechange(this.slideIndex);
                this.dotchange && this.dotchange();
            }

            // do the trick animation
            for (var i = 0; i < 3; i++) {
                if (els[i] !== sEle) {
                    els[i].style.webkitTransition = 'all .3s ease';
                }
                this._animateFunc(els[i], this.axis, this.scale, i, 0);
            }

            // stop playing when meet the end of data
            if (this.isAutoplay && !this.isLooping && this.slideIndex === data.length - 1) {
                this.pause();
            }
        }

        /**
         *  judge the device
         *  @return {Object} {}
         */
    }, {
        key: '_device',
        value: function _device() {
            var hasTouch = !!('ontouchstart' in window || window.DocumentTouch && document instanceof window.DocumentTouch);
            var startEvt = hasTouch ? 'touchstart' : 'mousedown';
            var moveEvt = hasTouch ? 'touchmove' : 'mousemove';
            var endEvt = hasTouch ? 'touchend' : 'mouseup';
            return {
                hasTouch: hasTouch,
                startEvt: startEvt,
                moveEvt: moveEvt,
                endEvt: endEvt
            };
        }

        /**
         * bind all event handler, when on PC, disable drag event。
         */
    }, {
        key: '_bindHandler',
        value: function _bindHandler() {
            var outer = this.outer;
            var device = this._device();
            if (!device.hasTouch) {
                outer.style.cursor = 'pointer';
                outer.ondragstart = function (evt) {
                    if (evt) {
                        return false;
                    }
                    return true;
                };
            }
            outer.addEventListener(device.startEvt, this);
            outer.addEventListener(device.moveEvt, this);
            outer.addEventListener(device.endEvt, this);
            window.addEventListener('orientationchange', this);
        }

        /**
         *  simple event delegate method
         *  @param {string}   evtType   event name
         *  @param {string}   selector  the simple css selector like jQuery
         *  @param {Function} callback  event callback
         */
    }, {
        key: 'bind',
        value: function bind(evtType, selector, callback) {
            function handle(e) {
                var evt = window.event ? window.event : e;
                var target = evt.target;
                var eleArr = document.querySelectorAll(selector);
                for (var i = 0; i < eleArr.length; i++) {
                    if (target === eleArr[i]) {
                        callback.call(target);
                        break;
                    }
                }
            }

            this.wrap.addEventListener(evtType, handle, false);
        }
    }, {
        key: 'delegate',
        value: function delegate(evtType, selector, callback) {
            function handle(e) {
                var evt = window.event ? window.event : e;
                var target = evt.target;
                var eleArr = document.querySelectorAll(selector);
                for (var i = 0; i < eleArr.length; i++) {
                    if (target === eleArr[i]) {
                        callback.call(target);
                        break;
                    }
                }
            }

            this.wrap.addEventListener(evtType, handle, false);
        }

        /**
         *  removeEventListener to release the memory
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            var outer = this.outer;
            var device = this._device();

            outer.removeEventListener(device.startEvt, this);
            outer.removeEventListener(device.moveEvt, this);
            outer.removeEventListener(device.endEvt, this);
            window.removeEventListener('orientationchange', this);
            window.removeEventListener('focus', this);
            window.removeEventListener('blur', this);
            this.wrap.innerHTML = '';
        }

        /**
         *  uniformity admin event
         *  @param {Object}   evt   event obj
         */
    }, {
        key: 'handleEvent',
        value: function handleEvent(evt) {
            var device = this._device();
            switch (evt.type) {
                case device.startEvt:
                    this.startHandler(evt);
                    break;
                case device.moveEvt:
                    this.moveHandler(evt);
                    break;
                case device.endEvt:
                    this.endHandler(evt);
                    break;
                case 'touchcancel':
                    this.endHandler(evt);
                    break;
                case 'orientationchange':
                    this.orientationchangeHandler();
                    break;
                case 'focus':
                    this.isAutoplay && this.play();
                    break;
                case 'blur':
                    this.pause();
                    break;
            }
        }

        /**
         *  touchstart callback
         *  @param {Object}   evt   event obj
         */
    }, {
        key: 'startHandler',
        value: function startHandler(evt) {
            if (this.fixPage) {
                var target = evt.target;
                if (target.tagName !== 'SELECT' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                    evt.preventDefault();
                }
            }
            var device = this._device();
            this.isMoving = true;
            this.pause();
            this.onslidestart && this.onslidestart();
            this.log('Event: beforeslide');

            this.startTime = new Date().getTime();
            this.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
            this.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
            this._startHandler && this._startHandler(evt);
        }

        /**
         *  touchmove callback
         *  @param {Object}   evt   event obj
         */
    }, {
        key: 'moveHandler',
        value: function moveHandler(evt) {
            if (this.isMoving) {
                var device = this._device();
                var len = this.data.length;
                var axis = this.axis;
                var reverseAxis = this.reverseAxis;
                var offset = {
                    X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
                    Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
                };

                var res = this._moveHandler ? this._moveHandler(evt) : false;
                if (!res && Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {
                    evt.preventDefault();

                    this.onslide && this.onslide(offset[axis]);
                    this.log('Event: onslide');

                    if (!this.isLooping) {
                        if (offset[axis] > 0 && this.slideIndex === 0 || offset[axis] < 0 && this.slideIndex === len - 1) {
                            offset[axis] = this._damping(offset[axis]);
                        }
                    }

                    for (var i = 0; i < 3; i++) {
                        var item = this.els[i];
                        item.style.webkitTransition = 'all 0s';
                        this._animateFunc(item, axis, this.scale, i, offset[axis]);
                    }
                }

                this.offset = offset;
            }
        }

        /**
         *  touchend callback
         *  @param {Object}   evt   event obj
         */
    }, {
        key: 'endHandler',
        value: function endHandler(evt) {
            this.isMoving = false;
            var offset = this.offset;
            var axis = this.axis;
            var boundary = this.scale / 2;
            var endTime = new Date().getTime();

            // a quick slide time must under 300ms
            // a quick slide should also slide at least 14 px
            boundary = endTime - this.startTime > 300 ? boundary : 14;
            var res = this._endHandler ? this._endHandler(evt) : false;
            var absOffset = Math.abs(offset[axis]);
            var absReverseOffset = Math.abs(offset[this.reverseAxis]);

            var getLink = function getLink(el) {
                if (el.tagName === 'A') {
                    if (el.href) {
                        window.location.href = el.href;
                        return false;
                    }
                } else if (el.className === 'islider-dom') {
                    return false;
                } else {
                    getLink(el.parentNode);
                }
            };

            if (!res && offset[axis] >= boundary && absReverseOffset < absOffset) {
                this.slideTo(this.slideIndex - 1);
            } else if (!res && offset[axis] < -boundary && absReverseOffset < absOffset) {
                this.slideTo(this.slideIndex + 1);
            } else if (!res) {
                this.slideTo(this.slideIndex);
            }

            // create tap event if offset < 10
            if (Math.abs(this.offset.X) < 10 && Math.abs(this.offset.Y) < 10) {
                this.tapEvt = document.createEvent('Event');
                this.tapEvt.initEvent('tap', true, true);
                if (this.fixPage && this.type === 'dom') {
                    getLink(evt.target);
                }
                if (!evt.target.dispatchEvent(this.tapEvt)) {
                    evt.preventDefault();
                }
            }

            this.offset.X = this.offset.Y = 0;
            this.isAutoplay && this.play();
            this.onslideend && this.onslideend(this.slideIndex);
            this.log('Event: afterslide');
        }

        /**
         *  orientationchange callback
         */
    }, {
        key: 'orientationchangeHandler',
        value: function orientationchangeHandler() {
            var self = this;
            setTimeout(function () {
                self.reset();
                self.log('Event: orientationchange');
            }, 100);
        }

        /**
         * reset & rerender
         */
    }, {
        key: 'reset',
        value: function reset() {
            this.pause();
            this._setting();
            this._renderHTML();
            this.isAutoplay && this.play();
        }

        /**
         * reload Data & render
         */
    }, {
        key: 'loadData',
        value: function loadData(data, initIndex) {
            this.pause();
            this.slideIndex = initIndex || 0;
            this.data = data;
            this._renderHTML();
            this.isAutoplay && this.play();
        }

        /**
         * enable autoplay
         */
    }, {
        key: 'play',
        value: function play() {
            var self = this;
            var duration = this.duration;
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = setInterval(function () {
                self.slideTo(self.slideIndex + 1);
            }, duration);
        }

        /**
         * pause autoplay
         */
    }, {
        key: 'pause',
        value: function pause() {
            clearInterval(this.autoPlayTimer);
        }

        /**
         * plugin extend
         * @param {Object} plugin need to be set up
         * @param {Object} main iSlider prototype
         */
    }, {
        key: 'extend',
        value: function extend(plugin, main) {
            if (!main) {
                main = this;
            }
            Object.keys(plugin).forEach(function (property) {
                Object.defineProperty(main, property, Object.getOwnPropertyDescriptor(plugin, property));
            });
        }
    }]);

    return iSliderCore;
})();

module.exports = iSliderCore;

},{"./plugins/islider_animate.js":4,"./plugins/islider_zoom.js":7}],4:[function(require,module,exports){
/*
 * @file   Animation Library
 * @author xieyu33333
 */

'use strict';

var extendAnimation = {
    'rotate': function rotate(dom, axis, scale, i, offset) {
        var rotateDirect = axis === 'X' ? 'Y' : 'X';
        var absoluteOffset = Math.abs(offset);
        var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;

        if (this.isVertical) {
            offset = -offset;
        }

        this.wrap.style.webkitPerspective = scale * 4;

        if (i === 1) {
            dom.style.zIndex = scale - absoluteOffset;
        } else {
            dom.style.zIndex = offset > 0 ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
        }

        dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; ' + 'background-color:' + bdColor + '; position:absolute;';
        dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + 90 * (offset / scale + i - 1) + 'deg) translateZ(' + 0.888 * scale / 2 + 'px) scale(0.888)';
    },

    'flip': function flip(dom, axis, scale, i, offset) {
        var rotateDirect = axis === 'X' ? 'Y' : 'X';
        var bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;
        if (this.isVertical) {
            offset = -offset;
        }
        this.wrap.style.webkitPerspective = scale * 4;

        if (offset > 0) {
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
        } else {
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
        }

        dom.style.cssText += 'position:absolute; -webkit-backface-visibility:hidden; background-color:' + bdColor + ';';
        dom.style.webkitTransform = 'translateZ(' + scale / 2 + 'px) rotate' + rotateDirect + '(' + 180 * (offset / scale + i - 1) + 'deg) scale(0.875)';
    },

    'depth': function depth(dom, axis, scale, i, offset) {
        var zoomScale = (4 - Math.abs(i - 1)) * 0.18;
        this.wrap.style.webkitPerspective = scale * 4;
        dom.style.zIndex = i === 1 ? 100 : offset > 0 ? 1 - i : i - 1;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis + '(' + (offset + 1.3 * scale * (i - 1)) + 'px)';
    },

    'flow': function flow(dom, axis, scale, i, offset) {
        var absoluteOffset = Math.abs(offset);
        var rotateDirect = axis === 'X' ? 'Y' : 'X';
        var directAmend = axis === 'X' ? 1 : -1;
        var offsetRatio = Math.abs(offset / scale);

        this.wrap.style.webkitPerspective = scale * 4;

        if (i === 1) {
            dom.style.zIndex = scale - absoluteOffset;
        } else {
            dom.style.zIndex = offset > 0 ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
        }

        dom.style.webkitTransform = 'scale(0.7, 0.7) translateZ(' + (offsetRatio * 150 - 150) * Math.abs(i - 1) + 'px)' + 'translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)' + 'rotate' + rotateDirect + '(' + directAmend * (30 - offsetRatio * 30) * (1 - i) + 'deg)';
    },

    'card': function card(dom, axis, scale, i, offset) {
        var absoluteOffset = Math.abs(offset);

        if (i === 1) {
            dom.style.zIndex = scale - absoluteOffset;
            dom.cur = 1;
        } else {
            dom.style.zIndex = offset > 0 ? (1 - i) * absoluteOffset * 1000 : (i - 1) * absoluteOffset * 1000;
        }

        if (dom.cur && dom.cur !== i) {
            setTimeout(function () {
                dom.cur = null;
            }, 300);
        }

        var zoomScale = dom.cur ? 1 - 0.2 * Math.abs(i - 1) - Math.abs(0.2 * offset / scale).toFixed(6) : 1;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis + '(' + ((1 + Math.abs(i - 1) * 0.2) * offset + scale * (i - 1)) + 'px)';
    }
};

module.exports = extendAnimation;

},{}],5:[function(require,module,exports){
/*
 * @file   To create right&left botton on iSlider
 * @author xieyu33333
 */

'use strict';

function addBtn() {
    var _this = this;

    if (!this.isVertical) {
        (function () {
            var btnOuter = [];
            var btnInner = [];
            var self = _this;
            for (var i = 0; i < 2; i++) {
                btnOuter[i] = document.createElement('div');
                btnOuter[i].className = 'islider-btn-outer';
                btnInner[i] = document.createElement('div');
                btnInner[i].className = 'islider-btn-inner';

                if (i === 0) {
                    btnOuter[i].className += ' left';
                    btnOuter[i].dir = -1;
                } else {
                    btnOuter[i].className += ' right';
                    btnOuter[i].dir = 1;
                }

                btnOuter[i].addEventListener('click', function () {
                    var dir = parseInt(this.getAttribute('dir'), 10);
                    self.slideTo(self.slideIndex + dir);
                });

                btnOuter[i].appendChild(btnInner[i]);
                _this.wrap.appendChild(btnOuter[i], _this.wrap.nextSibling);
            }
        })();
    }
}

module.exports = { addBtn: addBtn };

},{}],6:[function(require,module,exports){
/*
 * @file   To create dots index on iSlider
 * @author xieyu33333
 */

'use strict';

function addDot() {
    var _this = this;

    if (!this.isVertical) {
        (function () {
            var self = _this;
            var data = _this.data;
            var dots = [];
            var dotWrap = document.createElement('ul');
            dotWrap.className = 'islider-dot-wrap';
            var fregment = document.createDocumentFragment();
            for (var i = 0; i < data.length; i++) {
                dots[i] = document.createElement('li');
                dots[i].className = 'islider-dot';
                dots[i].setAttribute('index', i);
                if (i === _this.slideIndex) {
                    dots[i].className += ' active';
                }
                dots[i].addEventListener('click', function () {
                    var index = parseInt(this.getAttribute('index'), 10);
                    self.slideTo(index);
                });
                fregment.appendChild(dots[i]);
            }
            dotWrap.appendChild(fregment);
            _this.wrap.parentNode.appendChild(dotWrap);

            _this.dotchange = function () {
                for (var i = 0; i < data.length; i++) {
                    dots[i].className = 'islider-dot';
                    if (i === this.slideIndex) {
                        dots[i].className += ' active';
                    }
                }
            };
        })();
    }
}

module.exports = { addDot: addDot };

},{}],7:[function(require,module,exports){
/**
 * Created by liuhui01 on 2015/1/7.
 */

'use strict';

var has3d = 'WebKitCSSMatrix' in window && 'm11' in new WebKitCSSMatrix();
var minScale = 1 / 2;
var viewScope = {};

function generateTranslate(x, y, z, scale) {
    return "translate" + (has3d ? "3d(" : "(") + x + "px," + y + (has3d ? "px," + z + "px)" : "px)") + "scale(" + scale + ")";
}
function getDistance(a, b) {
    var x = undefined,
        y = undefined;
    x = a.left - b.left;
    y = a.top - b.top;
    return Math.sqrt(x * x + y * y);
}
function generateTransformOrigin(x, y) {
    return x + "px " + y + "px";
}
function getTouches(touches) {
    return Array.prototype.slice.call(touches).map(function (touch) {
        return {
            left: touch.pageX,
            top: touch.pageY
        };
    });
}
function calculateScale(start, end) {
    var startDistance = getDistance(start[0], start[1]);
    var endDistance = getDistance(end[0], end[1]);
    return endDistance / startDistance;
}

function getComputedTranslate(obj) {
    var result = {
        translateX: 0,
        translateY: 0,
        translateZ: 0,
        scaleX: 1,
        scaleY: 1,
        offsetX: 0,
        offsetY: 0
    };
    var offsetX = 0,
        offsetY = 0;
    if (!window.getComputedStyle || !obj) return result;
    var style = window.getComputedStyle(obj),
        transform = undefined,
        origin = undefined;
    transform = style.webkitTransform || style.mozTransform;
    origin = style.webkitTransformOrigin || style.mozTransformOrigin;
    var par = origin.match(/(.*)px\s+(.*)px/);
    if (par.length > 1) {
        offsetX = par[1] - 0;
        offsetY = par[2] - 0;
    }
    if (transform == "none") return result;
    var mat3d = transform.match(/^matrix3d\((.+)\)$/);
    var mat2d = transform.match(/^matrix\((.+)\)$/);
    if (mat3d) {
        var str = mat3d[1].split(', ');
        result = {
            translateX: str[12] - 0,
            translateY: str[13] - 0,
            translateZ: str[14] - 0,
            offsetX: offsetX - 0,
            offsetY: offsetY - 0,
            scaleX: str[0] - 0,
            scaleY: str[5] - 0,
            scaleZ: str[10] - 0
        };
    } else if (mat2d) {
        var str = mat2d[1].split(', ');
        result = {
            translateX: str[4] - 0,
            translateY: str[5] - 0,
            offsetX: offsetX - 0,
            offsetY: offsetY - 0,
            scaleX: str[0] - 0,
            scaleY: str[3] - 0
        };
    }
    return result;
}

function getCenter(a, b) {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    };
}

//初始化缩放参数等
function initZoom(opts) {
    this.currentScale = 1;
    this.zoomFactor = opts.zoomFactor || 2;
}

function startHandler(evt) {
    if (this.useZoom) {
        var node = this.els[1].querySelector('img');
        var transform = getComputedTranslate(node);
        this.startTouches = getTouches(evt.targetTouches);
        this._startX = transform.translateX - 0;
        this._startY = transform.translateY - 0;
        this.currentScale = transform.scaleX;
        this.zoomNode = node;
        var pos = getPosition(node);
        if (evt.targetTouches.length == 2) {
            console.log("gesture");
            this.lastTouchStart = null;
            var touches = evt.touches;
            var touchCenter = getCenter({
                x: touches[0].pageX,
                y: touches[0].pageY
            }, {
                x: touches[1].pageX,
                y: touches[1].pageY
            });
            node.style.webkitTransformOrigin = generateTransformOrigin(touchCenter.x - pos.left, touchCenter.y - pos.top);
        } else if (evt.targetTouches.length === 1) {
            var time = new Date().getTime();
            this.gesture = 0;
            if (time - this.lastTouchStart < 300) {
                evt.preventDefault();
                this.gesture = 3;
            }
            this.lastTouchStart = time;
        }
    }
}

function moveHandler(evt) {
    var result = 0,
        node = this.zoomNode;
    var device = this._device();
    if (device.hasTouch) {
        if (evt.targetTouches.length === 2 && this.useZoom) {
            node.style.webkitTransitionDuration = "0";
            evt.preventDefault();
            this._scaleImage(evt);
            result = 2;
        } else if (evt.targetTouches.length == 1 && this.useZoom && this.currentScale > 1) {
            node.style.webkitTransitionDuration = "0";
            evt.preventDefault();
            this._moveImage(evt);
            result = 1;
        }
        this.gesture = result;
        return result;
    }
}

function handleDoubleTap(evt) {
    var zoomFactor = this.zoomFactor || 2;
    var node = this.zoomNode;
    var pos = getPosition(node);
    this.currentScale = this.currentScale == 1 ? zoomFactor : 1;
    node.style.webkitTransform = generateTranslate(0, 0, 0, this.currentScale);
    if (this.currentScale != 1) node.style.webkitTransformOrigin = generateTransformOrigin(evt.touches[0].pageX - pos.left, evt.touches[0].pageY - pos.top);
}

//缩放图片
function scaleImage(evt) {
    var moveTouces = getTouches(evt.targetTouches);
    var scale = calculateScale(this.startTouches, moveTouces);
    evt.scale = evt.scale || scale;
    var node = this.zoomNode;
    scale = this.currentScale * evt.scale < minScale ? minScale : this.currentScale * evt.scale;
    node.style.webkitTransform = generateTranslate(0, 0, 0, scale);
}

function endHandler(evt) {
    var result = 0;
    if (this.gesture === 2) {
        //双手指 todo
        this._resetImage(evt);
        result = 2;
    } else if (this.gesture == 1) {
        //放大拖拽 todo
        this._resetImage(evt);
        result = 1;
    } else if (this.gesture === 3) {
        //双击
        this._handleDoubleTap(evt);
        this._resetImage(evt);
    }

    return result;
}

//拖拽图片
function moveImage(evt) {
    var node = this.zoomNode;
    var device = this._device();
    var offset = {
        X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
        Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
    };
    this.moveOffset = {
        x: this._startX + offset.X - 0,
        y: this._startY + offset.Y - 0
    };
    node.style.webkitTransform = generateTranslate(this.moveOffset.x, this.moveOffset.y, 0, this.currentScale);
}

function getPosition(element) {
    var pos = { "left": 0, "top": 0 };
    do {
        pos.top += element.offsetTop || 0;
        pos.left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);
    return pos;
}

function valueInViewScope(node, value, tag) {
    var min = undefined,
        max = undefined;
    var pos = getPosition(node);
    viewScope = {
        start: { left: pos.left, top: pos.top },
        end: { left: pos.left + node.clientWidth, top: pos.top + node.clientHeight }
    };
    var str = tag == 1 ? "left" : "top";
    min = viewScope.start[str];
    max = viewScope.end[str];
    return value >= min && value <= max;
}

function overFlow(node, obj1) {
    var result = 0;
    var isX1In = valueInViewScope(node, obj1.start.left, 1);
    var isX2In = valueInViewScope(node, obj1.end.left, 1);
    var isY1In = valueInViewScope(node, obj1.start.top, 0);
    var isY2In = valueInViewScope(node, obj1.end.top, 0);
    if (isX1In != isX2In && isY1In != isY2In) {
        if (isX1In && isY2In) {
            result = 1;
        } else if (isX1In && isY1In) {
            result = 2;
        } else if (isX2In && isY2In) {
            result = 3;
        } else {
            result = 4;
        }
    } else if (isX1In == isX2In) {
        if (!isY1In && isY2In) {
            result = 5;
        } else if (!isY2In && isY1In) {
            result = 6;
        }
    } else if (isY1In == isY2In) {
        if (!isX1In && isX2In) {
            result = 7;
        } else if (isX1In && !isX2In) {
            result = 8;
        }
    } else if (isY1In == isY2In == isX1In == isX2In) {
        result = 9;
    }
    return result;
}

function resetImage(evt) {
    if (this.currentScale == 1) return;
    var node = this.zoomNode,
        left = undefined,
        top = undefined,
        trans = undefined,
        w = undefined,
        h = undefined,
        pos = undefined,
        start = undefined,
        end = undefined,
        parent = undefined,
        flowTag = undefined;
    trans = getComputedTranslate(node);
    parent = node.parentNode;
    w = node.clientWidth * trans.scaleX;
    h = node.clientHeight * trans.scaleX;
    pos = getPosition(node);
    start = {
        left: (1 - trans.scaleX) * trans.offsetX + pos.left + trans.translateX,
        top: (1 - trans.scaleX) * trans.offsetY + pos.top + trans.translateY
    };
    end = {
        left: start.left + w,
        top: start.top + h
    };
    left = start.left;
    top = start.top;

    flowTag = overFlow(parent, { start: start, end: end });
    switch (flowTag) {
        case 1:
            left = viewScope.start.left;
            top = viewScope.end.top - h;
            break;
        case 2:
            left = viewScope.start.left;
            top = viewScope.start.top;
            break;
        case 3:
            left = viewScope.end.left - w;
            top = viewScope.end.top - h;
            break;
        case 4:
            left = viewScope.end.left - w;
            top = viewScope.start.top;
            break;
        case 5:
            top = viewScope.end.top - h;
            break;
        case 6:
            top = viewScope.start.top;
            break;
        case 7:
            left = viewScope.end.left - w;
            break;
        case 8:
            left = viewScope.start.left;
            break;
    }
    if (w < parent.clientWidth) {
        left = pos.left - (trans.scaleX - 1) * node.clientWidth / 2;
    }
    if (h < parent.clientHeight) {
        top = pos.top - (trans.scaleX - 1) * node.clientHeight / 2;
    }
    node.style.webkitTransitionDuration = "100ms";
    node.style.webkitTransform = generateTranslate(trans.translateX + left - start.left, trans.translateY + top - start.top, 0, trans.scaleX);
}

module.exports = {
    _initZoom: initZoom,
    _scaleImage: scaleImage,
    _moveImage: moveImage,
    _resetImage: resetImage,
    _handleDoubleTap: handleDoubleTap,
    _moveHandler: moveHandler,
    _endHandler: endHandler,
    _startHandler: startHandler
};

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvZGVtby9waWN0dXJlL3BpY3R1cmVfd2l0aF9kb3RzL21haW4uanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL2lzbGlkZXIuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL2lzbGlkZXJfY29yZS5qcyIsImQ6L2pvYkRldmVsb3BtZW50L1Byb2plY3QvaVNsaWRlci1INS9zcmMvcGx1Z2lucy9pc2xpZGVyX2FuaW1hdGUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl9idXR0b24uanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl9kb3QuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl96b29tLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs0QkNBb0IseUJBQXlCOzs7O0FBRTdDLElBQUksSUFBSSxHQUFHLENBQ1AsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0IsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0IsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0IsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0IsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0IsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0IsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0IsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUMsRUFDL0IsRUFBQyxPQUFP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QUFDLENBQUEsR0FBSSxJQUFJLENBQUM7QUFDN0MsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUM5QyxXQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxBQUFDLENBQUMsS0FBSyxDQUFDLEdBQUksR0FBRyxHQUFHLEFBQUMsTUFBTSxHQUFHLENBQUMsR0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFLLENBQUMsR0FBRyxDQUFDLEFBQUMsQ0FBQztBQUN0RSxXQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxTQUFTLEdBQUcsMkJBQTJCLEdBQzNGLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxHQUFHLEtBQUssQ0FBQztLQUMvRDs7QUFFRCxVQUFNLEVBQUUsY0FBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQzNDLFlBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsWUFBSSxZQUFZLEdBQUcsQUFBQyxJQUFJLEtBQUssR0FBRyxHQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDOUMsWUFBSSxXQUFXLEdBQUcsQUFBQyxJQUFJLEtBQUssR0FBRyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxQyxZQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQzs7QUFFM0MsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzs7QUFFOUMsWUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1QsZUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQztTQUM3QyxNQUFNO0FBQ0gsZUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQUFBQyxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLENBQUM7U0FDekY7O0FBRUQsV0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsNkJBQTZCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQSxHQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FDekcsV0FBVyxHQUFHLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxHQUM3RCxRQUFRLEdBQUcsWUFBWSxHQUFHLEdBQUcsR0FBRyxXQUFXLElBQUksRUFBRSxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUEsQUFBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxHQUFHLE1BQU0sQ0FBQztLQUNsRzs7QUFFRCxVQUFNLEVBQUUsY0FBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQzNDLFlBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O0FBRXRDLFlBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNULGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUM7QUFDMUMsZUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDZixNQUFNO0FBQ0gsZUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQUFBQyxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FB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QUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTdJOztBQUVMLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDYixhQUFTLEVBQUUsUUFBUTtBQUNuQixlQUFXLEVBQUUsVUFBVTtBQUN2QixjQUFVLEVBQUUsU0FBUztBQUNyQixlQUFXLEVBQUUsVUFBVTtBQUN2QixvQkFBZ0IsRUFBRSxlQUFlO0FBQ2pDLGdCQUFZLEVBQUUsV0FBVztBQUN6QixlQUFXLEVBQUUsVUFBVTtBQUN2QixpQkFBYSxFQUFFLFlBQVk7Q0FDOUIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgaVNsaWRlciBmcm9tICcuLi8uLi8uLi9zcmMvaXNsaWRlci5qcyc7XG5cbmxldCBsaXN0ID0gW1xuICAgIHtjb250ZW50OiBcIi4uL2ltZ3MvbG9uZy8xLmpwZ1wifSxcbiAgICB7Y29udGVudDogXCIuLi9pbWdzL2xvbmcvMi5qcGdcIn0sXG4gICAge2NvbnRlbnQ6IFwiLi4vaW1ncy9sb25nLzMuanBnXCJ9LFxuICAgIHtjb250ZW50OiBcIi4uL2ltZ3MvbG9uZy80LmpwZ1wifSxcbiAgICB7Y29udGVudDogXCIuLi9pbWdzL2xvbmcvNS5qcGdcIn0sXG4gICAge2NvbnRlbnQ6IFwiLi4vaW1ncy9sb25nLzYuanBnXCJ9LFxuICAgIHtjb250ZW50OiBcIi4uL2ltZ3MvbG9uZy83LmpwZ1wifSxcbiAgICB7Y29udGVudDogXCIuLi9pbWdzL2xvbmcvOC5qcGdcIn0sXG4gICAge2NvbnRlbnQ6IFwiLi4vaW1ncy9sb25nLzkuanBnXCJ9LFxuXTtcblxubGV0IG9wdHMgPSB7XG4gICAgdHlwZTogJ3BpYycsXG4gICAgZGF0YTogbGlzdCxcbiAgICBkb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaVNsaWRlci13cmFwcGVyXCIpLFxuICAgIGFuaW1hdGVUeXBlOiAncm90YXRlJyxcbiAgICBpc0xvb3Bpbmc6IHRydWUsXG59O1xuXG5sZXRcdGlzbGlkZXIgPSBuZXcgaVNsaWRlcihvcHRzKTtcblxuaXNsaWRlci5hZGREb3QoKTtcblxuXG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaVNsaWRlckNvcmUgZnJvbSAnLi9pc2xpZGVyX2NvcmUuanMnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl9idXR0b24uanMnO1xuaW1wb3J0IERvdCBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl9kb3QuanMnO1xuXG5jbGFzcyBpU2xpZGVyIGV4dGVuZHMgaVNsaWRlckNvcmUge1xuICAgIGNvbnN0cnVjdG9yKC4uLm9wdHMpIHtcbiAgICAgICAgLy/nm7TmjqXosIPnlKjniLbnsbvmnoTpgKDlmajov5vooYzliJ3lp4vljJZcbiAgICAgICAgc3VwZXIoLi4ub3B0cyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2FuaW1hdGVGdW5jcylcbiAgICAgICAgdGhpcy5leHRlbmQoQnV0dG9uLCB0aGlzKTtcbiAgICAgICAgdGhpcy5leHRlbmQoRG90LCB0aGlzKTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaVNsaWRlcjtcbiIsIi8qKlxuICogQGZpbGUgICBpU2xpZGVyLCBhIHNpbXBsZSwgZWZmaWNlbnQgbW9iaWxlIHNsaWRlciBzb2x1dGlvblxuICpcbiAqIEBhdXRob3IgQkVGRVxuICogQ29udGFjdCBxYmF0eS5xaUBnbWFpbC5jb21cbiAqXG4gKiBMSUNFTlNFXG4gKiBodHRwczovL2dpdGh1Yi5jb20vQkUtRkUvaVNsaWRlci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdHMgICAgICAgICAgICAgICAg5Y+C5pWw6ZuGXG4gKiBAcGFyYW0ge0VsZW1lbnR9ICAgICBvcHRzLmRvbSAgICAgICAgICAgIOWkluWxguWFg+e0oCAgICAgICAgT3V0ZXIgd3JhcHBlclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0cy5kYXRhICAgICAgICAgICDmlbDmja7liJfooaggICAgICAgIENvbnRlbnQgZGF0YVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBbmltYXRpb24gZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfYW5pbWF0ZS5qcyc7XG5pbXBvcnQgWm9vbSBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl96b29tLmpzJztcblxuY2xhc3MgaVNsaWRlckNvcmUge1xuICAgIC8vRVM25Lit5paw5Z6L5p6E6YCg5ZmoXG4gICAgY29uc3RydWN0b3Iob3B0cykge1xuICAgICAgICBpZiAoIW9wdHMuZG9tKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RvbSBlbGVtZW50IGNhbiBub3QgYmUgZW1wdHkhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdHMuZGF0YSB8fCAhb3B0cy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkYXRhIG11c3QgYmUgYW4gYXJyYXkgYW5kIG11c3QgaGF2ZSBtb3JlIHRoYW4gb25lIGVsZW1lbnQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4dGVuZChab29tLCB0aGlzKTtcblxuICAgICAgICB0aGlzLl9vcHRzID0gb3B0cztcbiAgICAgICAgdGhpcy5fc2V0dGluZygpO1xuICAgICAgICB0aGlzLl9yZW5kZXJIVE1MKCk7XG4gICAgICAgIHRoaXMuX2JpbmRIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgLy/lrp7kvovmlrnms5VcbiAgICBfc2V0dGluZygpIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLl9vcHRzO1xuXG4gICAgICAgIC8vIGRvbSBlbGVtZW50IHdyYXBwaW5nIGNvbnRlbnRcbiAgICAgICAgdGhpcy53cmFwID0gb3B0cy5kb207XG4gICAgICAgIC8vIHlvdXIgZGF0YVxuICAgICAgICB0aGlzLmRhdGEgPSBvcHRzLmRhdGE7XG4gICAgICAgIC8vIGRlZmF1bHQgdHlwZVxuICAgICAgICB0aGlzLnR5cGUgPSBvcHRzLnR5cGUgfHwgJ3BpYyc7XG4gICAgICAgIC8vIGRlZmF1bHQgc2xpZGUgZGlyZWN0aW9uXG4gICAgICAgIHRoaXMuaXNWZXJ0aWNhbCA9IG9wdHMuaXNWZXJ0aWNhbCB8fCBmYWxzZTtcbiAgICAgICAgLy8gT3ZlcnNwcmVhZCBtb2RlXG4gICAgICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gb3B0cy5pc092ZXJzcHJlYWQgfHwgZmFsc2U7XG4gICAgICAgIC8vIFBsYXkgdGltZSBnYXBcbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgMjAwMDtcbiAgICAgICAgLy8gc3RhcnQgZnJvbSBpbml0SW5kZXggb3IgMFxuICAgICAgICB0aGlzLmluaXRJbmRleCA9IG9wdHMuaW5pdEluZGV4IHx8IDA7XG4gICAgICAgIC8vIHRvdWNoc3RhcnQgcHJldmVudCBkZWZhdWx0IHRvIGZpeFBhZ2VcbiAgICAgICAgaWYgKG9wdHMuZml4UGFnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmZpeFBhZ2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5maXhQYWdlID0gb3B0cy5maXhQYWdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5pdEluZGV4ID4gdGhpcy5kYXRhLmxlbmd0aCAtIDEgfHwgdGhpcy5pbml0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICB0aGlzLmluaXRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4IHx8IHRoaXMuaW5pdEluZGV4IHx8IDA7XG5cbiAgICAgICAgdGhpcy5heGlzID0gdGhpcy5pc1ZlcnRpY2FsID8gJ1knIDogJ1gnO1xuICAgICAgICB0aGlzLnJldmVyc2VBeGlzID0gdGhpcy5heGlzID09PSAnWScgPyAnWCcgOiAnWSc7XG5cbiAgICAgICAgdGhpcy53aWR0aCA9IHRoaXMud3JhcC5jbGllbnRXaWR0aDtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0O1xuICAgICAgICB0aGlzLnJhdGlvID0gdGhpcy5oZWlnaHQgLyB0aGlzLndpZHRoO1xuICAgICAgICB0aGlzLnNjYWxlID0gb3B0cy5pc1ZlcnRpY2FsID8gdGhpcy5oZWlnaHQgOiB0aGlzLndpZHRoO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgaXMgbW92aW5nXG4gICAgICAgIHRoaXMub25zbGlkZSA9IG9wdHMub25zbGlkZTtcbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB5b3VyIGZpbmdlciB0b3VjaCB0aGUgc2NyZWVuXG4gICAgICAgIHRoaXMub25zbGlkZXN0YXJ0ID0gb3B0cy5vbnNsaWRlc3RhcnQ7XG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGZpbmdlciBtb3ZlIG91dCBvZiB0aGUgc2NyZWVuXG4gICAgICAgIHRoaXMub25zbGlkZWVuZCA9IG9wdHMub25zbGlkZWVuZDtcbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgZmluZ2VyIG1vdmUgb3V0IG9mIHRoZSBzY3JlZW5cbiAgICAgICAgdGhpcy5vbnNsaWRlY2hhbmdlID0gb3B0cy5vbnNsaWRlY2hhbmdlO1xuXG4gICAgICAgIHRoaXMuaXNMb2FkaW5nID0gb3B0cy5pc0xvYWRpbmc7XG5cbiAgICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLm9mZnNldCB8fCB7WDogMCwgWTogMH07XG4gICAgICAgIHRoaXMudXNlWm9vbSA9IG9wdHMudXNlWm9vbSB8fCBmYWxzZTtcbiAgICAgICAgLy8gbG9vcGluZyBsb2dpYyBhZGp1c3RcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9vcGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0F1dG9QbGF5ID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmlzTG9vcGluZyA9IG9wdHMuaXNMb29waW5nIHx8IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5pc0F1dG9wbGF5ID0gb3B0cy5pc0F1dG9wbGF5IHx8IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbGl0dGxlIHRyaWNrIHNldCwgd2hlbiB5b3UgY2hvb2NlIHRlYXIgJiB2ZXJ0aWNhbCBzYW1lIHRpbWVcbiAgICAgICAgLy8gaVNsaWRlciBvdmVyc3ByZWFkIG1vZGUgd2lsbCBiZSBzZXQgdHJ1ZSBhdXRvbWV0aWNseVxuICAgICAgICBpZiAob3B0cy5hbmltYXRlVHlwZSA9PT0gJ2NhcmQnICYmIHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5pc092ZXJzcHJlYWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXV0b3BsYXkgbW9kZVxuICAgICAgICBpZiAodGhpcy5pc0F1dG9wbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnVzZVpvb20pIHtcbiAgICAgICAgICAgIHRoaXMuX2luaXRab29tKG9wdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZGVidWcgbW9kZVxuICAgICAgICB0aGlzLmxvZyA9IG9wdHMuaXNEZWJ1ZyA/IGZ1bmN0aW9uIChzdHIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhzdHIpO1xuICAgICAgICB9IDogZnVuY3Rpb24gKCkge1xuICAgICAgICB9O1xuICAgICAgICAvLyBzZXQgRGFtcGluZyBmdW5jdGlvblxuICAgICAgICB0aGlzLl9zZXRVcERhbXBpbmcoKTtcbiAgICAgICAgLy8gc3RvcCBhdXRvcGxheSB3aGVuIHdpbmRvdyBibHVyXG4gICAgICAgIHRoaXMuX3NldFBsYXlXaGVuRm9jdXMoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW5pbWF0aW9uIHBhcm1hczpcbiAgICAgICAgICpcbiAgICAgICAgICogQHBhcmFtIHtFbGVtZW50fSAgICAgIGRvbSAgICAgICAgICAgICDlm77niYfnmoTlpJblsYI8bGk+5a655ZmoICAgICAgIEltZyB3cmFwcGVyXG4gICAgICAgICAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICBheGlzICAgICAgICAgICAg5Yqo55S75pa55ZCRICAgICAgICAgICAgICAgIGFuaW1hdGUgZGlyZWN0aW9uXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICBzY2FsZSAgICAgICAgICAg5a655Zmo5a695bqmICAgICAgICAgICAgICAgIE91dGVyIHdyYXBwZXJcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIGkgICAgICAgICAgICAgICA8bGk+5a655ZmoaW5kZXggICAgICAgICAgSW1nIHdyYXBwZXIncyBpbmRleFxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgb2Zmc2V0ICAgICAgICAgIOa7keWKqOi3neemuyAgICAgICAgICAgICAgICBtb3ZlIGRpc3RhbmNlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hbmltYXRlRnVuY3MgPSB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZXh0ZW5kKEFuaW1hdGlvbiwgdGhpcy5fYW5pbWF0ZUZ1bmNzKTtcblxuICAgICAgICAvLyBzZXQgYW5pbWF0ZSBGdW5jdGlvblxuICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyA9IChvcHRzLmFuaW1hdGVUeXBlIGluIHRoaXMuX2FuaW1hdGVGdW5jcylcbiAgICAgICAgICAgID8gdGhpcy5fYW5pbWF0ZUZ1bmNzW29wdHMuYW5pbWF0ZVR5cGVdXG4gICAgICAgICAgICA6IHRoaXMuX2FuaW1hdGVGdW5jc1snZGVmYXVsdCddO1xuICAgIH1cblxuICAgIC8vIGZpeGVkIGJ1ZyBmb3IgYW5kcm9pZCBkZXZpY2VcbiAgICBfc2V0UGxheVdoZW5Gb2N1cygpIHtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcywgZmFsc2UpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgZW5hYmxlIGRhbXBpbmcgd2hlbiBzbGlkZXIgbWVldCB0aGUgZWRnZVxuICAgICAqL1xuICAgIF9zZXRVcERhbXBpbmcoKSB7XG4gICAgICAgIGxldCBvbmVJbjIgPSB0aGlzLnNjYWxlID4+IDE7XG4gICAgICAgIGxldCBvbmVJbjQgPSBvbmVJbjIgPj4gMTtcbiAgICAgICAgbGV0IG9uZUluMTYgPSBvbmVJbjQgPj4gMjtcblxuICAgICAgICB0aGlzLl9kYW1waW5nID0gZnVuY3Rpb24gKGRpc3RhbmNlKSB7XG4gICAgICAgICAgICBsZXQgZGlzID0gTWF0aC5hYnMoZGlzdGFuY2UpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgaWYgKGRpcyA8IG9uZUluMikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRpcyA+PiAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkaXMgPCBvbmVJbjIgKyBvbmVJbjQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvbmVJbjQgKyAoKGRpcyAtIG9uZUluMikgPj4gMik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArIG9uZUluMTYgKyAoKGRpcyAtIG9uZUluMiAtIG9uZUluNCkgPj4gMyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSA+IDAgPyByZXN1bHQgOiAtcmVzdWx0O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBzaW5nbGUgaXRlbSBodG1sIGJ5IGlkeFxuICAgICAqIEBwYXJhbSB7ZWxlbWVudH0gZWwgLi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gIGkgIC4uXG4gICAgICovXG4gICAgX3JlbmRlckl0ZW0oZWwsIGkpIHtcbiAgICAgICAgbGV0IGl0ZW07XG4gICAgICAgIGxldCBodG1sO1xuICAgICAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGxldCBpbnNlcnRJbWcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBodG1sID0gaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gc2VsZi5yYXRpb1xuICAgICAgICAgICAgICAgID8gJzxpbWcgaGVpZ2h0PVwiJyArIHNlbGYuaGVpZ2h0ICsgJ1wiIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCI+J1xuICAgICAgICAgICAgICAgIDogJzxpbWcgd2lkdGg9XCInICsgc2VsZi53aWR0aCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPic7XG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGdldCB0aGUgcmlnaHQgaXRlbSBvZiBkYXRhXG4gICAgICAgIGlmICghdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbaV0gfHwge2VtcHR5OiB0cnVlfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChpIDwgMCkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbbGVuICsgaV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiBsZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtpIC0gbGVuXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpdGVtLmVtcHR5KSB7XG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAnJztcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwaWMnKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNPdmVyc3ByZWFkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGVpZ2h0ICYgaXRlbS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW1nLnNyYyA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhlaWdodCA9IGN1cnJlbnRJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS53aWR0aCA9IGN1cnJlbnRJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBpdGVtLmNvbnRlbnQgKyAnKSA1MCUgNTAlIG5vLXJlcGVhdCc7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZFNpemUgPSAnY292ZXInO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudHlwZSA9PT0gJ2RvbScpIHtcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBsaXN0IGh0bWxcbiAgICAgKi9cbiAgICBfcmVuZGVySFRNTCgpIHtcbiAgICAgICAgdGhpcy5vdXRlciAmJiAodGhpcy5vdXRlci5pbm5lckhUTUwgPSAnJyk7XG4gICAgICAgIC8vIGluaXRhaWwgdWwgZWxlbWVudFxuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIG91dGVyLmNsYXNzTmFtZSA9ICdpc2xpZGVyLW91dGVyJztcbiAgICAgICAgb3V0ZXIuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0ICsgJ3B4O3dpZHRoOicgKyB0aGlzLndpZHRoXG4gICAgICAgICAgICArICdweDttYXJnaW46MDtwYWRkaW5nOjA7bGlzdC1zdHlsZTpub25lOyc7XG5cbiAgICAgICAgLy9sb2FkaW5nXG4gICAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdwaWMnICYmICF0aGlzLmxvYWRlciAmJiB0aGlzLmlzTG9hZGluZykge1xuICAgICAgICAgICAgbGV0IGxvYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgbG9hZGVyLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWxvYWRlcic7XG4gICAgICAgICAgICB0aGlzLmxvYWRlciA9IGxvYWRlcjtcbiAgICAgICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZChsb2FkZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcmFnZSBsaSBlbGVtZW50cywgb25seSBzdG9yZSAzIGVsZW1lbnRzIHRvIHJlZHVjZSBtZW1vcnkgdXNhZ2VcbiAgICAgICAgdGhpcy5lbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBsaS5jbGFzc05hbWUgPSB0aGlzLnR5cGUgPT09ICdkb20nID8gJ2lzbGlkZXItZG9tJyA6ICdpc2xpZGVyLXBpYyc7XG4gICAgICAgICAgICBsaS5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDonICsgdGhpcy5oZWlnaHQgKyAncHg7d2lkdGg6JyArIHRoaXMud2lkdGggKyAncHg7JztcbiAgICAgICAgICAgIHRoaXMuZWxzLnB1c2gobGkpO1xuXG4gICAgICAgICAgICAvLyBwcmVwYXJlIHN0eWxlIGFuaW1hdGlvblxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMobGksIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsICYmICh0aGlzLl9vcHRzLmFuaW1hdGVUeXBlID09PSAncm90YXRlJyB8fCB0aGlzLl9vcHRzLmFuaW1hdGVUeXBlID09PSAnZmxpcCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShsaSwgMSAtIGkgKyB0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGxpLCBpIC0gMSArIHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXRlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLl9pbml0TG9hZEltZygpO1xuICAgICAgICAvLyBhcHBlbmQgdWwgdG8gZGl2I2NhbnZhc1xuICAgICAgICBpZiAoIXRoaXMub3V0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIgPSBvdXRlcjtcbiAgICAgICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgcHJlbG9hZCBpbWcgd2hlbiBzbGlkZUNoYW5nZVxuICAgICAqICBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4IG1lYW5zIHdoaWNoIGltYWdlIHdpbGwgYmUgbG9hZFxuICAgICAqL1xuICAgIF9wcmVsb2FkSW1nKGRhdGFJbmRleCkge1xuICAgICAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IGlkeCA9IGRhdGFJbmRleDtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgbG9hZEltZyA9IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEgJiYgIXNlbGYuZGF0YVtpbmRleF0ubG9hZGVkKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZWxvYWRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBwcmVsb2FkSW1nLnNyYyA9IHNlbGYuZGF0YVtpbmRleF0uY29udGVudDtcbiAgICAgICAgICAgICAgICBwcmVsb2FkSW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhW2luZGV4XS53aWR0aCA9IHByZWxvYWRJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YVtpbmRleF0uaGVpZ2h0ID0gcHJlbG9hZEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBzZWxmLmRhdGFbaW5kZXhdLmxvYWRlZCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKHNlbGYudHlwZSAhPT0gJ2RvbScgJiYgbGVuID4gMykge1xuICAgICAgICAgICAgbGV0IG5leHRJbmRleCA9IChpZHggKyAyID4gbGVuIC0gMSkgPyAoKGlkeCArIDIpICUgbGVuKSA6IChpZHggKyAyKTtcbiAgICAgICAgICAgIGxldCBwcmV2SW5kZXggPSAoaWR4IC0gMiA8IDApID8gKGxlbiAtIDIgKyBpZHgpIDogKGlkeCAtIDIpO1xuICAgICAgICAgICAgbG9hZEltZyhuZXh0SW5kZXgpO1xuICAgICAgICAgICAgbG9hZEltZyhwcmV2SW5kZXgpO1xuICAgICAgICB9XG4gICAgfVxuXG47XG5cbiAgICAvKipcbiAgICAgKiAgbG9hZCBleHRyYSBpbWdzIHdoZW4gcmVuZGVySFRNTFxuICAgICAqL1xuICAgIF9pbml0TG9hZEltZygpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGxldCBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IGlkeCA9IHRoaXMuc2xpZGVJbmRleDtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT09ICdkb20nICYmIGxlbiA+IDMpIHtcbiAgICAgICAgICAgIGxldCBuZXh0SW5kZXggPSAoaWR4ICsgMiA+IGxlbikgPyAoKGlkeCArIDEpICUgbGVuKSA6IChpZHggKyAxKTtcbiAgICAgICAgICAgIGxldCBwcmV2SW5kZXggPSAoaWR4IC0gMSA8IDApID8gKGxlbiAtIDEgKyBpZHgpIDogKGlkeCAtIDEpO1xuICAgICAgICAgICAgZGF0YVtpZHhdLmxvYWRlZCA9IDE7XG4gICAgICAgICAgICBkYXRhW25leHRJbmRleF0ubG9hZGVkID0gMTtcbiAgICAgICAgICAgIGlmIChzZWxmLmlzTG9vcGluZykge1xuICAgICAgICAgICAgICAgIGRhdGFbcHJldkluZGV4XS5sb2FkZWQgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9wcmVsb2FkSW1nKGlkeCk7XG4gICAgICAgICAgICB9LCAyMDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHNsaWRlIGxvZ2ljYWwsIGdvdG8gZGF0YSBpbmRleFxuICAgICAqICBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4IHRoZSBnb3RvIGluZGV4XG4gICAgICovXG4gICAgc2xpZGVUbyhkYXRhSW5kZXgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGxldCBlbHMgPSB0aGlzLmVscztcbiAgICAgICAgbGV0IGlkeCA9IGRhdGFJbmRleDtcbiAgICAgICAgbGV0IG4gPSBkYXRhSW5kZXggLSB0aGlzLnNsaWRlSW5kZXg7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKG4pID4gMSkge1xuICAgICAgICAgICAgbGV0IG5leHRFbHMgPSBuID4gMCA/IHRoaXMuZWxzWzJdIDogdGhpcy5lbHNbMF07XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKG5leHRFbHMsIGlkeCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmVsb2FkIHdoZW4gc2xpZGVcbiAgICAgICAgdGhpcy5fcHJlbG9hZEltZyhpZHgpO1xuXG4gICAgICAgIC8vIGdldCByaWdodCBpdGVtIG9mIGRhdGFcbiAgICAgICAgaWYgKGRhdGFbaWR4XSkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gaWR4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gbiA+IDAgPyAwIDogZGF0YS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSB0aGlzLnNsaWRlSW5kZXg7XG4gICAgICAgICAgICAgICAgbiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZygncGljIGlkeDonICsgdGhpcy5zbGlkZUluZGV4KTtcblxuICAgICAgICAvLyBrZWVwIHRoZSByaWdodCBvcmRlciBvZiBpdGVtc1xuICAgICAgICBsZXQgc0VsZTtcbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCAmJiAodGhpcy5fb3B0cy5hbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgdGhpcy5fb3B0cy5hbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSkge1xuICAgICAgICAgICAgaWYgKG4gPiAwKSB7XG4gICAgICAgICAgICAgICAgc0VsZSA9IGVscy5wb3AoKTtcbiAgICAgICAgICAgICAgICBlbHMudW5zaGlmdChzRWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA8IDApIHtcbiAgICAgICAgICAgICAgICBzRWxlID0gZWxzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgZWxzLnB1c2goc0VsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAobiA+IDApIHtcbiAgICAgICAgICAgICAgICBzRWxlID0gZWxzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgZWxzLnB1c2goc0VsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPCAwKSB7XG4gICAgICAgICAgICAgICAgc0VsZSA9IGVscy5wb3AoKTtcbiAgICAgICAgICAgICAgICBlbHMudW5zaGlmdChzRWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNsaWRlY2hhbmdlIHNob3VsZCByZW5kZXIgbmV3IGl0ZW1cbiAgICAgICAgLy8gYW5kIGNoYW5nZSBuZXcgaXRlbSBzdHlsZSB0byBmaXQgYW5pbWF0aW9uXG4gICAgICAgIGlmIChuICE9PSAwKSB7XG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShlbHNbMF0sIGlkeCAtIDEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0oZWxzWzJdLCBpZHggKyAxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMobikgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKHNFbGUsIGlkeCArIG4pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc0VsZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgc0VsZS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNFbGUuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgICAgIHRoaXMub25zbGlkZWNoYW5nZSAmJiB0aGlzLm9uc2xpZGVjaGFuZ2UodGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuZG90Y2hhbmdlICYmIHRoaXMuZG90Y2hhbmdlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkbyB0aGUgdHJpY2sgYW5pbWF0aW9uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZWxzW2ldICE9PSBzRWxlKSB7XG4gICAgICAgICAgICAgICAgZWxzW2ldLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIC4zcyBlYXNlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGVsc1tpXSwgdGhpcy5heGlzLCB0aGlzLnNjYWxlLCBpLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3AgcGxheWluZyB3aGVuIG1lZXQgdGhlIGVuZCBvZiBkYXRhXG4gICAgICAgIGlmICh0aGlzLmlzQXV0b3BsYXkgJiYgIXRoaXMuaXNMb29waW5nICYmIHRoaXMuc2xpZGVJbmRleCA9PT0gZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAganVkZ2UgdGhlIGRldmljZVxuICAgICAqICBAcmV0dXJuIHtPYmplY3R9IHt9XG4gICAgICovXG4gICAgX2RldmljZSgpIHtcbiAgICAgICAgbGV0IGhhc1RvdWNoID0gISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdylcbiAgICAgICAgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCk7XG4gICAgICAgIGxldCBzdGFydEV2dCA9IGhhc1RvdWNoID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZG93bic7XG4gICAgICAgIGxldCBtb3ZlRXZ0ID0gaGFzVG91Y2ggPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnO1xuICAgICAgICBsZXQgZW5kRXZ0ID0gaGFzVG91Y2ggPyAndG91Y2hlbmQnIDogJ21vdXNldXAnO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFzVG91Y2g6IGhhc1RvdWNoLFxuICAgICAgICAgICAgc3RhcnRFdnQ6IHN0YXJ0RXZ0LFxuICAgICAgICAgICAgbW92ZUV2dDogbW92ZUV2dCxcbiAgICAgICAgICAgIGVuZEV2dDogZW5kRXZ0XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYmluZCBhbGwgZXZlbnQgaGFuZGxlciwgd2hlbiBvbiBQQywgZGlzYWJsZSBkcmFnIGV2ZW5044CCXG4gICAgICovXG4gICAgX2JpbmRIYW5kbGVyKCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyO1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5fZGV2aWNlKCk7XG4gICAgICAgIGlmICghZGV2aWNlLmhhc1RvdWNoKSB7XG4gICAgICAgICAgICBvdXRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICBvdXRlci5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLnN0YXJ0RXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2UubW92ZUV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLmVuZEV2dCwgdGhpcyk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBzaW1wbGUgZXZlbnQgZGVsZWdhdGUgbWV0aG9kXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfSAgIGV2dFR5cGUgICBldmVudCBuYW1lXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfSAgIHNlbGVjdG9yICB0aGUgc2ltcGxlIGNzcyBzZWxlY3RvciBsaWtlIGpRdWVyeVxuICAgICAqICBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayAgZXZlbnQgY2FsbGJhY2tcbiAgICAgKi9cbiAgICBiaW5kKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZSkge1xuICAgICAgICAgICAgbGV0IGV2dCA9IHdpbmRvdy5ldmVudCA/IHdpbmRvdy5ldmVudCA6IGU7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBlbGVBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWxlQXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZGVsZWdhdGUoZXZ0VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZShlKSB7XG4gICAgICAgICAgICBsZXQgZXZ0ID0gd2luZG93LmV2ZW50ID8gd2luZG93LmV2ZW50IDogZTtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGVsZUFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGVBcnJbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgcmVtb3ZlRXZlbnRMaXN0ZW5lciB0byByZWxlYXNlIHRoZSBtZW1vcnlcbiAgICAgKi9cbiAgICBkZXN0cm95ICgpIHtcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuX2RldmljZSgpO1xuXG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLnN0YXJ0RXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2UubW92ZUV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLmVuZEV2dCwgdGhpcyk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzKTtcbiAgICAgICAgdGhpcy53cmFwLmlubmVySFRNTCA9ICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICB1bmlmb3JtaXR5IGFkbWluIGV2ZW50XG4gICAgICogIEBwYXJhbSB7T2JqZWN0fSAgIGV2dCAgIGV2ZW50IG9ialxuICAgICAqL1xuICAgIGhhbmRsZUV2ZW50IChldnQpIHtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuX2RldmljZSgpO1xuICAgICAgICBzd2l0Y2ggKGV2dC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIGRldmljZS5zdGFydEV2dDpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SGFuZGxlcihldnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBkZXZpY2UubW92ZUV2dDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRldmljZS5lbmRFdnQ6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3VjaGNhbmNlbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvcmllbnRhdGlvbmNoYW5nZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2hzdGFydCBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge09iamVjdH0gICBldnQgICBldmVudCBvYmpcbiAgICAgKi9cbiAgICBzdGFydEhhbmRsZXIgKGV2dCkge1xuICAgICAgICBpZiAodGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgICAgIGlmICh0YXJnZXQudGFnTmFtZSAhPT0gJ1NFTEVDVCcgJiYgdGFyZ2V0LnRhZ05hbWUgIT09ICdJTlBVVCcgJiYgdGFyZ2V0LnRhZ05hbWUgIT09ICdURVhUQVJFQScpIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5fZGV2aWNlKCk7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMub25zbGlkZXN0YXJ0ICYmIHRoaXMub25zbGlkZXN0YXJ0KCk7XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDogYmVmb3Jlc2xpZGUnKTtcblxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICB0aGlzLnN0YXJ0WCA9IGRldmljZS5oYXNUb3VjaCA/IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZXZ0LnBhZ2VYO1xuICAgICAgICB0aGlzLnN0YXJ0WSA9IGRldmljZS5oYXNUb3VjaCA/IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZXZ0LnBhZ2VZO1xuICAgICAgICB0aGlzLl9zdGFydEhhbmRsZXIgJiYgdGhpcy5fc3RhcnRIYW5kbGVyKGV2dCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNobW92ZSBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge09iamVjdH0gICBldnQgICBldmVudCBvYmpcbiAgICAgKi9cbiAgICBtb3ZlSGFuZGxlciAoZXZ0KSB7XG4gICAgICAgIGlmICh0aGlzLmlzTW92aW5nKSB7XG4gICAgICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5fZGV2aWNlKCk7XG4gICAgICAgICAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBheGlzID0gdGhpcy5heGlzO1xuICAgICAgICAgICAgbGV0IHJldmVyc2VBeGlzID0gdGhpcy5yZXZlcnNlQXhpcztcbiAgICAgICAgICAgIGxldCBvZmZzZXQgPSB7XG4gICAgICAgICAgICAgICAgWDogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zdGFydFgpIDogKGV2dC5wYWdlWCAtIHRoaXMuc3RhcnRYKSxcbiAgICAgICAgICAgICAgICBZOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLnN0YXJ0WSkgOiAoZXZ0LnBhZ2VZIC0gdGhpcy5zdGFydFkpXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsZXQgcmVzID0gdGhpcy5fbW92ZUhhbmRsZXIgPyB0aGlzLl9tb3ZlSGFuZGxlcihldnQpIDogZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXJlcyAmJiBNYXRoLmFicyhvZmZzZXRbYXhpc10pIC0gTWF0aC5hYnMob2Zmc2V0W3JldmVyc2VBeGlzXSkgPiAxMCkge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vbnNsaWRlICYmIHRoaXMub25zbGlkZShvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdFdmVudDogb25zbGlkZScpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzTG9vcGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAob2Zmc2V0W2F4aXNdID4gMCAmJiB0aGlzLnNsaWRlSW5kZXggPT09IDAgfHwgb2Zmc2V0W2F4aXNdIDwgMCAmJiB0aGlzLnNsaWRlSW5kZXggPT09IGxlbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldFtheGlzXSA9IHRoaXMuX2RhbXBpbmcob2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpdGVtID0gdGhpcy5lbHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMHMnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyhpdGVtLCBheGlzLCB0aGlzLnNjYWxlLCBpLCBvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2hlbmQgY2FsbGJhY2tcbiAgICAgKiAgQHBhcmFtIHtPYmplY3R9ICAgZXZ0ICAgZXZlbnQgb2JqXG4gICAgICovXG4gICAgZW5kSGFuZGxlciAoZXZ0KSB7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuYXhpcztcbiAgICAgICAgbGV0IGJvdW5kYXJ5ID0gdGhpcy5zY2FsZSAvIDI7XG4gICAgICAgIGxldCBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gYSBxdWljayBzbGlkZSB0aW1lIG11c3QgdW5kZXIgMzAwbXNcbiAgICAgICAgLy8gYSBxdWljayBzbGlkZSBzaG91bGQgYWxzbyBzbGlkZSBhdCBsZWFzdCAxNCBweFxuICAgICAgICBib3VuZGFyeSA9IGVuZFRpbWUgLSB0aGlzLnN0YXJ0VGltZSA+IDMwMCA/IGJvdW5kYXJ5IDogMTQ7XG4gICAgICAgIGxldCByZXMgPSB0aGlzLl9lbmRIYW5kbGVyID8gdGhpcy5fZW5kSGFuZGxlcihldnQpIDogZmFsc2U7XG4gICAgICAgIGxldCBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXRbYXhpc10pO1xuICAgICAgICBsZXQgYWJzUmV2ZXJzZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldFt0aGlzLnJldmVyc2VBeGlzXSk7XG5cbiAgICAgICAgbGV0IGdldExpbmsgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwuaHJlZikge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IGVsLmhyZWZcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVsLmNsYXNzTmFtZSA9PT0gJ2lzbGlkZXItZG9tJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdldExpbmsoZWwucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlcyAmJiBvZmZzZXRbYXhpc10gPj0gYm91bmRhcnkgJiYgYWJzUmV2ZXJzZU9mZnNldCA8IGFic09mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCAtIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKCFyZXMgJiYgb2Zmc2V0W2F4aXNdIDwgLWJvdW5kYXJ5ICYmIGFic1JldmVyc2VPZmZzZXQgPCBhYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXggKyAxKTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVzKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0YXAgZXZlbnQgaWYgb2Zmc2V0IDwgMTBcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMub2Zmc2V0LlgpIDwgMTAgJiYgTWF0aC5hYnModGhpcy5vZmZzZXQuWSkgPCAxMCkge1xuICAgICAgICAgICAgdGhpcy50YXBFdnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgICAgIHRoaXMudGFwRXZ0LmluaXRFdmVudCgndGFwJywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5maXhQYWdlICYmIHRoaXMudHlwZSA9PT0gJ2RvbScpIHtcbiAgICAgICAgICAgICAgICBnZXRMaW5rKGV2dC50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFldnQudGFyZ2V0LmRpc3BhdGNoRXZlbnQodGhpcy50YXBFdnQpKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9mZnNldC5YID0gdGhpcy5vZmZzZXQuWSA9IDA7XG4gICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICAgICAgdGhpcy5vbnNsaWRlZW5kICYmIHRoaXMub25zbGlkZWVuZCh0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IGFmdGVyc2xpZGUnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgb3JpZW50YXRpb25jaGFuZ2UgY2FsbGJhY2tcbiAgICAgKi9cbiAgICBvcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5yZXNldCgpO1xuICAgICAgICAgICAgc2VsZi5sb2coJ0V2ZW50OiBvcmllbnRhdGlvbmNoYW5nZScpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc2V0ICYgcmVyZW5kZXJcbiAgICAgKi9cbiAgICByZXNldCAoKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZygpO1xuICAgICAgICB0aGlzLl9yZW5kZXJIVE1MKCk7XG4gICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWxvYWQgRGF0YSAmIHJlbmRlclxuICAgICAqL1xuICAgIGxvYWREYXRhIChkYXRhLCBpbml0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpbml0SW5kZXggfHwgMDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5fcmVuZGVySFRNTCgpO1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZW5hYmxlIGF1dG9wbGF5XG4gICAgICovXG4gICAgcGxheSAoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGR1cmF0aW9uID0gdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9QbGF5VGltZXIpO1xuICAgICAgICB0aGlzLmF1dG9QbGF5VGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnNsaWRlVG8oc2VsZi5zbGlkZUluZGV4ICsgMSk7XG4gICAgICAgIH0sIGR1cmF0aW9uKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXVzZSBhdXRvcGxheVxuICAgICAqL1xuICAgIHBhdXNlKCkge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1BsYXlUaW1lcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGx1Z2luIGV4dGVuZFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwbHVnaW4gbmVlZCB0byBiZSBzZXQgdXBcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbWFpbiBpU2xpZGVyIHByb3RvdHlwZVxuICAgICAqL1xuICAgIGV4dGVuZCAocGx1Z2luLCBtYWluKSB7XG4gICAgICAgIGlmICghbWFpbikge1xuICAgICAgICAgICAgbWFpbiA9IHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXMocGx1Z2luKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm9wZXJ0eSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG1haW4sIHByb3BlcnR5LCBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBsdWdpbiwgcHJvcGVydHkpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gaVNsaWRlckNvcmU7XG4iLCIvKlxuICogQGZpbGUgICBBbmltYXRpb24gTGlicmFyeVxuICogQGF1dGhvciB4aWV5dTMzMzMzXG4gKi9cblxuXG5sZXQgZXh0ZW5kQW5pbWF0aW9uID0ge1xuICAgICdyb3RhdGUnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IGJkQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLndyYXAucGFyZW50Tm9kZSwgbnVsbCkuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsgJ1xuICAgICAgICAgICAgKyAnYmFja2dyb3VuZC1jb2xvcjonICsgYmRDb2xvciArICc7IHBvc2l0aW9uOmFic29sdXRlOyc7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArIDkwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpICsgJ2RlZykgdHJhbnNsYXRlWignXG4gICAgICAgICAgICArICgwLjg4OCAqIHNjYWxlIC8gMikgKyAncHgpIHNjYWxlKDAuODg4KSc7XG4gICAgfSxcblxuICAgICdmbGlwJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIGxldCBiZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy53cmFwLnBhcmVudE5vZGUsIG51bGwpLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAncG9zaXRpb246YWJzb2x1dGU7IC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47IGJhY2tncm91bmQtY29sb3I6JyArIGJkQ29sb3IgKyAnOyc7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWignICsgKHNjYWxlIC8gMikgKyAncHgpIHJvdGF0ZScgKyByb3RhdGVEaXJlY3RcbiAgICAgICAgICAgICsgJygnICsgMTgwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpICsgJ2RlZykgc2NhbGUoMC44NzUpJztcbiAgICB9LFxuXG4gICAgJ2RlcHRoJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgem9vbVNjYWxlID0gKDQgLSBNYXRoLmFicyhpIC0gMSkpICogMC4xODtcbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgPT09IDEpID8gMTAwIDogKG9mZnNldCA+IDApID8gKDEgLSBpKSA6IChpIC0gMSk7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZSdcbiAgICAgICAgICAgICsgYXhpcyArICcoJyArIChvZmZzZXQgKyAxLjMgKiBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfSxcblxuICAgICdmbG93JzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIGxldCBkaXJlY3RBbWVuZCA9IChheGlzID09PSAnWCcpID8gMSA6IC0xO1xuICAgICAgICBsZXQgb2Zmc2V0UmF0aW8gPSBNYXRoLmFicyhvZmZzZXQgLyBzY2FsZSk7XG5cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDAuNywgMC43KSB0cmFuc2xhdGVaKCcgKyAob2Zmc2V0UmF0aW8gKiAxNTAgLSAxNTApICogTWF0aC5hYnMoaSAtIDEpICsgJ3B4KSdcbiAgICAgICAgICAgICsgJ3RyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJ1xuICAgICAgICAgICAgKyAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArIGRpcmVjdEFtZW5kICogKDMwIC0gb2Zmc2V0UmF0aW8gKiAzMCkgKiAoMSAtIGkpICsgJ2RlZyknO1xuICAgIH0sXG5cbiAgICAnY2FyZCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwIDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb20uY3VyICYmIGRvbS5jdXIgIT09IGkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSBudWxsO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1cikgPyAxIC0gMC4yICogTWF0aC5hYnMoaSAtIDEpIC0gTWF0aC5hYnMoMC4yICogb2Zmc2V0IC8gc2NhbGUpLnRvRml4ZWQoNikgOiAxO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpc1xuICAgICAgICAgICAgKyAnKCcgKyAoKDEgKyBNYXRoLmFicyhpIC0gMSkgKiAwLjIpICogb2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH1cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRBbmltYXRpb247XG4iLCIvKlxuICogQGZpbGUgICBUbyBjcmVhdGUgcmlnaHQmbGVmdCBib3R0b24gb24gaVNsaWRlclxuICogQGF1dGhvciB4aWV5dTMzMzMzXG4gKi9cblxuZnVuY3Rpb24gYWRkQnRuKCkge1xuICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIGxldCBidG5PdXRlciA9IFtdO1xuICAgICAgICBsZXQgYnRuSW5uZXIgPSBbXTtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgICAgICAgICAgYnRuT3V0ZXJbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJ0bk91dGVyW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWJ0bi1vdXRlcic7XG4gICAgICAgICAgICBidG5Jbm5lcltpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYnRuSW5uZXJbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItYnRuLWlubmVyJztcblxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgKz0gJyBsZWZ0JztcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5kaXIgPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgcmlnaHQnO1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ0bk91dGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBkaXIgPSBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnZGlyJyksIDEwKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlVG8oc2VsZi5zbGlkZUluZGV4ICsgZGlyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBidG5PdXRlcltpXS5hcHBlbmRDaGlsZChidG5Jbm5lcltpXSk7XG4gICAgICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQoYnRuT3V0ZXJbaV0sIHRoaXMud3JhcC5uZXh0U2libGluZyk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge2FkZEJ0bn07XG4iLCIvKlxuICogQGZpbGUgICBUbyBjcmVhdGUgZG90cyBpbmRleCBvbiBpU2xpZGVyXG4gKiBAYXV0aG9yIHhpZXl1MzMzMzNcbiAqL1xuXG5mdW5jdGlvbiBhZGREb3QoKSB7XG4gICAgaWYgKCF0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgbGV0IGRvdHMgPSBbXTtcbiAgICAgICAgbGV0IGRvdFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBkb3RXcmFwLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdC13cmFwJztcbiAgICAgICAgbGV0IGZyZWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRvdHNbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3QnO1xuICAgICAgICAgICAgZG90c1tpXS5zZXRBdHRyaWJ1dGUoJ2luZGV4JywgaSk7XG4gICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5zbGlkZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG90c1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUbyhpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZyZWdtZW50LmFwcGVuZENoaWxkKGRvdHNbaV0pO1xuICAgICAgICB9XG4gICAgICAgIGRvdFdyYXAuYXBwZW5kQ2hpbGQoZnJlZ21lbnQpO1xuICAgICAgICB0aGlzLndyYXAucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkb3RXcmFwKTtcblxuICAgICAgICB0aGlzLmRvdGNoYW5nZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90JztcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5zbGlkZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHthZGREb3R9O1xuIiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxpdWh1aTAxIG9uIDIwMTUvMS83LlxuICovXG5cbiAgICBsZXQgaGFzM2QgPSAoJ1dlYktpdENTU01hdHJpeCcgaW4gd2luZG93ICYmICdtMTEnIGluIG5ldyBXZWJLaXRDU1NNYXRyaXgoKSk7XG4gICAgbGV0IG1pblNjYWxlID0gMS8yO1xuICAgIGxldCB2aWV3U2NvcGUgPSB7fTtcblxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlVHJhbnNsYXRlKHgsIHksIHosIHNjYWxlKSB7XG4gICAgICAgIHJldHVybiBcInRyYW5zbGF0ZVwiICsgKGhhczNkID8gXCIzZChcIiA6IFwiKFwiKSArIHggKyBcInB4LFwiICsgeSArIChoYXMzZCA/IFwicHgsXCIgKyB6ICsgXCJweClcIiA6IFwicHgpXCIpICsgXCJzY2FsZShcIiArIHNjYWxlICsgXCIpXCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldERpc3RhbmNlKGEsYil7XG4gICAgICAgIGxldCB4LHk7XG4gICAgICAgIHg9IGEubGVmdCAtIGIubGVmdDtcbiAgICAgICAgeT0gYS50b3AgLSBiLnRvcDtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oeCwgeSkge1xuICAgICAgICByZXR1cm4geCArIFwicHggXCIgKyB5ICsgXCJweFwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRUb3VjaGVzKHRvdWNoZXMpe1xuICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodG91Y2hlcykubWFwKGZ1bmN0aW9uKHRvdWNoKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgbGVmdDogdG91Y2gucGFnZVgsXG4gICAgICAgICAgICAgICAgdG9wOiB0b3VjaC5wYWdlWVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2FsY3VsYXRlU2NhbGUoc3RhcnQsZW5kKXtcbiAgICAgICAgbGV0IHN0YXJ0RGlzdGFuY2U9Z2V0RGlzdGFuY2Uoc3RhcnRbMF0sc3RhcnRbMV0pO1xuICAgICAgICBsZXQgZW5kRGlzdGFuY2U9Z2V0RGlzdGFuY2UoZW5kWzBdLGVuZFsxXSk7XG4gICAgICAgIHJldHVybiBlbmREaXN0YW5jZS9zdGFydERpc3RhbmNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENvbXB1dGVkVHJhbnNsYXRlKG9iaikge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlWDogMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgICAgICAgICB0cmFuc2xhdGVaOiAwLFxuICAgICAgICAgICAgc2NhbGVYOiAxLFxuICAgICAgICAgICAgc2NhbGVZOiAxLFxuICAgICAgICAgICAgb2Zmc2V0WDogMCxcbiAgICAgICAgICAgIG9mZnNldFk6IDBcbiAgICAgICAgfTtcbiAgICAgICAgbGV0IG9mZnNldFggPSAwLCBvZmZzZXRZID0gMDtcbiAgICAgICAgaWYgKCF3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSB8fCAhb2JqKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICBsZXQgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShvYmopLCB0cmFuc2Zvcm0sIG9yaWdpbjtcbiAgICAgICAgdHJhbnNmb3JtID0gc3R5bGUud2Via2l0VHJhbnNmb3JtIHx8IHN0eWxlLm1velRyYW5zZm9ybTtcbiAgICAgICAgb3JpZ2luID0gc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luIHx8IHN0eWxlLm1velRyYW5zZm9ybU9yaWdpbjtcbiAgICAgICAgbGV0IHBhciA9IG9yaWdpbi5tYXRjaCgvKC4qKXB4XFxzKyguKilweC8pO1xuICAgICAgICBpZiAocGFyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIG9mZnNldFggPSBwYXJbMV0gLSAwO1xuICAgICAgICAgICAgb2Zmc2V0WSA9IHBhclsyXSAtIDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zZm9ybSA9PSBcIm5vbmVcIikgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgbGV0IG1hdDNkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICAgICAgICBsZXQgbWF0MmQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xuICAgICAgICBpZiAobWF0M2QpIHtcbiAgICAgICAgICAgIGxldCBzdHIgPSBtYXQzZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiBzdHJbMTJdIC0gMCxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVZOiBzdHJbMTNdIC0gMCxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVaOiBzdHJbMTRdIC0gMCxcbiAgICAgICAgICAgICAgICBvZmZzZXRYOiAgICBvZmZzZXRYIC0gMCxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiAgICBvZmZzZXRZIC0gMCxcbiAgICAgICAgICAgICAgICBzY2FsZVg6ICAgICBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgICAgIHNjYWxlWTogICAgIHN0cls1XSAtIDAsXG4gICAgICAgICAgICAgICAgc2NhbGVaOiAgICAgc3RyWzEwXSAtIDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAobWF0MmQpIHtcbiAgICAgICAgICAgIGxldCBzdHIgPSBtYXQyZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVYOiBzdHJbNF0gLSAwLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0cls1XSAtIDAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WDogICAgb2Zmc2V0WCAtIDAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WTogICAgb2Zmc2V0WSAtIDAsXG4gICAgICAgICAgICAgICAgc2NhbGVYOiAgICAgc3RyWzBdIC0gMCxcbiAgICAgICAgICAgICAgICBzY2FsZVk6ICAgICBzdHJbM10gLSAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q2VudGVyKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHg6IChhLnggKyBiLngpIC8gMixcbiAgICAgICAgICAgIHk6IChhLnkgKyBiLnkpIC8gMlxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy/liJ3lp4vljJbnvKnmlL7lj4LmlbDnrYlcbiAgICBmdW5jdGlvbiBpbml0Wm9vbShvcHRzKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFNjYWxlID0gMTtcbiAgICAgICAgdGhpcy56b29tRmFjdG9yID0gb3B0cy56b29tRmFjdG9yIHx8IDI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3RhcnRIYW5kbGVyKGV2dCkge1xuICAgICAgICBpZiAodGhpcy51c2Vab29tKSB7XG4gICAgICAgICAgICBsZXQgbm9kZSA9IHRoaXMuZWxzWzFdLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpO1xuICAgICAgICAgICAgbGV0IHRyYW5zZm9ybSA9IGdldENvbXB1dGVkVHJhbnNsYXRlKG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRvdWNoZXM9Z2V0VG91Y2hlcyhldnQudGFyZ2V0VG91Y2hlcyk7XG4gICAgICAgICAgICB0aGlzLl9zdGFydFggPSB0cmFuc2Zvcm0udHJhbnNsYXRlWCAtIDA7XG4gICAgICAgICAgICB0aGlzLl9zdGFydFkgPSB0cmFuc2Zvcm0udHJhbnNsYXRlWSAtIDA7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTY2FsZSA9IHRyYW5zZm9ybS5zY2FsZVg7XG4gICAgICAgICAgICB0aGlzLnpvb21Ob2RlID0gbm9kZTtcbiAgICAgICAgICAgIGxldCBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZ2VzdHVyZVwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RUb3VjaFN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsZXQgdG91Y2hlcyA9IGV2dC50b3VjaGVzO1xuICAgICAgICAgICAgICAgIGxldCB0b3VjaENlbnRlciA9IGdldENlbnRlcih7XG4gICAgICAgICAgICAgICAgICAgIHg6IHRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvdWNoZXNbMF0ucGFnZVlcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHRvdWNoZXNbMV0ucGFnZVgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHRvdWNoZXNbMV0ucGFnZVlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKHRvdWNoQ2VudGVyLnggLSBwb3MubGVmdCwgdG91Y2hDZW50ZXIueSAtIHBvcy50b3ApO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICBsZXQgdGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5nZXN0dXJlID0gMDtcbiAgICAgICAgICAgICAgICBpZiAodGltZSAtIHRoaXMubGFzdFRvdWNoU3RhcnQgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2VzdHVyZSA9IDM7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0VG91Y2hTdGFydCA9IHRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVIYW5kbGVyKGV2dCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gMCwgbm9kZSA9IHRoaXMuem9vbU5vZGU7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLl9kZXZpY2UoKTtcbiAgICAgICAgaWYgKGRldmljZS5oYXNUb3VjaCkge1xuICAgICAgICAgICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMiAmJiB0aGlzLnVzZVpvb20pIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjYWxlSW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMSAmJiB0aGlzLnVzZVpvb20gJiYgdGhpcy5jdXJyZW50U2NhbGUgPiAxKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tb3ZlSW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5nZXN0dXJlID0gcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlRG91YmxlVGFwKGV2dCkge1xuICAgICAgICBsZXQgem9vbUZhY3RvciA9IHRoaXMuem9vbUZhY3RvciB8fCAyO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuem9vbU5vZGU7XG4gICAgICAgIGxldCBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NhbGUgPSB0aGlzLmN1cnJlbnRTY2FsZSA9PSAxID8gem9vbUZhY3RvciA6IDE7XG4gICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgdGhpcy5jdXJyZW50U2NhbGUpO1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U2NhbGUgIT0gMSkgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gPSBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbihldnQudG91Y2hlc1swXS5wYWdlWCAtIHBvcy5sZWZ0LCBldnQudG91Y2hlc1swXS5wYWdlWSAtIHBvcy50b3ApO1xuXG4gICAgfVxuXG4gICAgLy/nvKnmlL7lm77niYdcbiAgICBmdW5jdGlvbiBzY2FsZUltYWdlKGV2dCkge1xuICAgICAgICBsZXQgbW92ZVRvdWNlcyA9IGdldFRvdWNoZXMoZXZ0LnRhcmdldFRvdWNoZXMpO1xuICAgICAgICBsZXQgc2NhbGUgPSBjYWxjdWxhdGVTY2FsZSh0aGlzLnN0YXJ0VG91Y2hlcyxtb3ZlVG91Y2VzKTtcbiAgICAgICAgZXZ0LnNjYWxlID0gZXZ0LnNjYWxlIHx8IHNjYWxlO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuem9vbU5vZGU7XG4gICAgICAgIHNjYWxlID0gdGhpcy5jdXJyZW50U2NhbGUgKiBldnQuc2NhbGUgPCBtaW5TY2FsZT9taW5TY2FsZTp0aGlzLmN1cnJlbnRTY2FsZSAqIGV2dC5zY2FsZTtcbiAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSgwLCAwLCAwLCBzY2FsZSk7XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlbmRIYW5kbGVyKGV2dCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICAgICAgaWYgKHRoaXMuZ2VzdHVyZSA9PT0gMikgey8v5Y+M5omL5oyHIHRvZG9cbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0SW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5nZXN0dXJlID09IDEpIHsvL+aUvuWkp+aLluaLvSB0b2RvXG4gICAgICAgICAgICB0aGlzLl9yZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ2VzdHVyZSA9PT0gMykgey8v5Y+M5Ye7XG4gICAgICAgICAgICB0aGlzLl9oYW5kbGVEb3VibGVUYXAoZXZ0KTtcbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0SW1hZ2UoZXZ0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLy/mi5bmi73lm77niYdcbiAgICBmdW5jdGlvbiBtb3ZlSW1hZ2UoZXZ0KSB7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy56b29tTm9kZTtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuX2RldmljZSgpO1xuICAgICAgICBsZXQgb2Zmc2V0ID0ge1xuICAgICAgICAgICAgWDogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zdGFydFgpIDogKGV2dC5wYWdlWCAtIHRoaXMuc3RhcnRYKSxcbiAgICAgICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tb3ZlT2Zmc2V0ID0ge1xuICAgICAgICAgICAgeDogdGhpcy5fc3RhcnRYICsgb2Zmc2V0LlggLSAwLFxuICAgICAgICAgICAgeTogdGhpcy5fc3RhcnRZICsgb2Zmc2V0LlkgLSAwXG4gICAgICAgIH07XG4gICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUodGhpcy5tb3ZlT2Zmc2V0LngsIHRoaXMubW92ZU9mZnNldC55LCAwLCB0aGlzLmN1cnJlbnRTY2FsZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgICAgICBsZXQgcG9zID0ge1wibGVmdFwiOiAwLCBcInRvcFwiOiAwfTtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgcG9zLnRvcCArPSBlbGVtZW50Lm9mZnNldFRvcCB8fCAwO1xuICAgICAgICAgICAgcG9zLmxlZnQgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gcG9zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgdmFsdWUsIHRhZykge1xuICAgICAgICBsZXQgbWluLCBtYXg7XG4gICAgICAgIGxldCBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICAgICAgdmlld1Njb3BlID0ge1xuICAgICAgICAgICAgc3RhcnQ6IHtsZWZ0OiBwb3MubGVmdCwgdG9wOiBwb3MudG9wfSxcbiAgICAgICAgICAgIGVuZDoge2xlZnQ6IHBvcy5sZWZ0ICsgbm9kZS5jbGllbnRXaWR0aCwgdG9wOiBwb3MudG9wICsgbm9kZS5jbGllbnRIZWlnaHR9XG4gICAgICAgIH07XG4gICAgICAgIGxldCBzdHIgPSB0YWcgPT0gMSA/IFwibGVmdFwiIDogXCJ0b3BcIjtcbiAgICAgICAgbWluID0gdmlld1Njb3BlLnN0YXJ0W3N0cl07XG4gICAgICAgIG1heCA9IHZpZXdTY29wZS5lbmRbc3RyXTtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSA+PSBtaW4gJiYgdmFsdWUgPD0gbWF4KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvdmVyRmxvdyhub2RlLCBvYmoxKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICBsZXQgaXNYMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LmxlZnQsIDEpO1xuICAgICAgICBsZXQgaXNYMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC5sZWZ0LCAxKTtcbiAgICAgICAgbGV0IGlzWTFJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5zdGFydC50b3AsIDApO1xuICAgICAgICBsZXQgaXNZMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC50b3AsIDApO1xuICAgICAgICBpZiAoKGlzWDFJbiAhPSBpc1gySW4pICYmIChpc1kxSW4gIT0gaXNZMkluKSkge1xuICAgICAgICAgICAgaWYgKGlzWDFJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1gxSW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNYMkluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoKGlzWDFJbiA9PSBpc1gySW4pKSB7XG4gICAgICAgICAgICBpZiAoIWlzWTFJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSA1O1xuICAgICAgICAgICAgfSBlbHNlIGlmICghaXNZMkluICYmIGlzWTFJbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDY7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmIChpc1kxSW4gPT0gaXNZMkluKSB7XG4gICAgICAgICAgICBpZiAoIWlzWDFJbiAmJiBpc1gySW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSA3O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1gxSW4gJiYgIWlzWDJJbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaXNZMUluID09IGlzWTJJbiA9PSBpc1gxSW4gPT0gaXNYMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzZXRJbWFnZShldnQpIHtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNjYWxlID09IDEpIHJldHVybjtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnpvb21Ob2RlLCBsZWZ0LCB0b3AsIHRyYW5zLCB3LCBoLCBwb3MsIHN0YXJ0LCBlbmQsIHBhcmVudCwgZmxvd1RhZztcbiAgICAgICAgdHJhbnMgPSBnZXRDb21wdXRlZFRyYW5zbGF0ZShub2RlKTtcbiAgICAgICAgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgICAgICB3ID0gbm9kZS5jbGllbnRXaWR0aCAqIHRyYW5zLnNjYWxlWDtcbiAgICAgICAgaCA9IG5vZGUuY2xpZW50SGVpZ2h0ICogdHJhbnMuc2NhbGVYO1xuICAgICAgICBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICAgICAgc3RhcnQgPSB7XG4gICAgICAgICAgICBsZWZ0OiAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRYICsgcG9zLmxlZnQgKyB0cmFucy50cmFuc2xhdGVYLFxuICAgICAgICAgICAgdG9wOiAgKDEgLSB0cmFucy5zY2FsZVgpICogdHJhbnMub2Zmc2V0WSArIHBvcy50b3AgKyB0cmFucy50cmFuc2xhdGVZXG4gICAgICAgIH07XG4gICAgICAgIGVuZCA9IHtcbiAgICAgICAgICAgIGxlZnQ6IHN0YXJ0LmxlZnQgKyB3LFxuICAgICAgICAgICAgdG9wOiAgc3RhcnQudG9wICsgaFxuICAgICAgICB9O1xuICAgICAgICBsZWZ0ID0gc3RhcnQubGVmdDtcbiAgICAgICAgdG9wID0gc3RhcnQudG9wO1xuXG4gICAgICAgIGZsb3dUYWcgPSBvdmVyRmxvdyhwYXJlbnQsIHtzdGFydDogc3RhcnQsIGVuZDogZW5kfSk7XG4gICAgICAgIHN3aXRjaCAoZmxvd1RhZykge1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICh3IDwgcGFyZW50LmNsaWVudFdpZHRoKSB7XG4gICAgICAgICAgICBsZWZ0ID0gcG9zLmxlZnQgLSAodHJhbnMuc2NhbGVYIC0gMSkgKiBub2RlLmNsaWVudFdpZHRoIC8gMjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaCA8IHBhcmVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgIHRvcCA9IHBvcy50b3AgLSAodHJhbnMuc2NhbGVYIC0gMSkgKiBub2RlLmNsaWVudEhlaWdodCAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjEwMG1zXCI7XG4gICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUodHJhbnMudHJhbnNsYXRlWCArIGxlZnQgLSBzdGFydC5sZWZ0LCB0cmFucy50cmFuc2xhdGVZICsgdG9wIC0gc3RhcnQudG9wLCAwLCB0cmFucy5zY2FsZVgpO1xuXG4gICAgfVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBfaW5pdFpvb206IGluaXRab29tLFxuICAgIF9zY2FsZUltYWdlOiBzY2FsZUltYWdlLFxuICAgIF9tb3ZlSW1hZ2U6IG1vdmVJbWFnZSxcbiAgICBfcmVzZXRJbWFnZTogcmVzZXRJbWFnZSxcbiAgICBfaGFuZGxlRG91YmxlVGFwOiBoYW5kbGVEb3VibGVUYXAsXG4gICAgX21vdmVIYW5kbGVyOiBtb3ZlSGFuZGxlcixcbiAgICBfZW5kSGFuZGxlcjogZW5kSGFuZGxlcixcbiAgICBfc3RhcnRIYW5kbGVyOiBzdGFydEhhbmRsZXJcbn07XG4iXX0=
