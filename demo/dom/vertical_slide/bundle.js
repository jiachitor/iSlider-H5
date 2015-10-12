(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcIsliderJs = require('../../../src/islider.js');

var _srcIsliderJs2 = _interopRequireDefault(_srcIsliderJs);

var list = [{
    'content': '<div class="content home"><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
}, {
    'content': '<div class="content page1"><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>'
}, {
    'content': '<div class="content page2"><h1>Page2</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p><div>'
}, {
    'content': '<div class="content page3"><h1>Page3</h1><h2>This is Page3</h2><p>Page3 is pretty awsome</p><div>'
}, {
    'content': '<div class="content page4"><h1>Page4</h1><h2>This is Page4</h2><p>Page4 is pretty awsome</p><div>'
}, {
    'content': '<div class="content page5"><h1>Page5</h1><h2>This is page5</h2><p>page5 is pretty awsome</p><div>'
}];
var islider = new _srcIsliderJs2['default']({
    data: list,
    type: 'dom',
    dom: document.getElementById("iSlider"),
    duration: 1000,
    isVertical: true
});

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvZGVtby9kb20vdmVydGljYWxfc2xpZGUvbWFpbi5qcyIsImQ6L2pvYkRldmVsb3BtZW50L1Byb2plY3QvaVNsaWRlci1INS9zcmMvaXNsaWRlci5qcyIsImQ6L2pvYkRldmVsb3BtZW50L1Byb2plY3QvaVNsaWRlci1INS9zcmMvaXNsaWRlcl9jb3JlLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfYW5pbWF0ZS5qcyIsImQ6L2pvYkRldmVsb3BtZW50L1Byb2plY3QvaVNsaWRlci1INS9zcmMvcGx1Z2lucy9pc2xpZGVyX2J1dHRvbi5qcyIsImQ6L2pvYkRldmVsb3BtZW50L1Byb2plY3QvaVNsaWRlci1INS9zcmMvcGx1Z2lucy9pc2xpZGVyX2RvdC5qcyIsImQ6L2pvYkRldmVsb3BtZW50L1Byb2plY3QvaVNsaWRlci1INS9zcmMvcGx1Z2lucy9pc2xpZGVyX3pvb20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OzRCQ0FvQix5QkFBeUI7Ozs7QUFFN0MsSUFBSSxJQUFJLEdBQUcsQ0FBQztBQUNSLGFBQVMsRUFBRyxvR0FBb0c7Q0FDbkgsRUFDRztBQUNJLGFBQVMsRUFBRyxtR0FBbUc7Q0FDbEgsRUFDRDtBQUNJLGFBQVMsRUFBRyxtR0FBbUc7Q0FDbEgsRUFDRDtBQUNJLGFBQVMsRUFBRyxtR0FBbUc7Q0FDbEgsRUFDRDtBQUNJLGFBQVMsRUFBRyxtR0FBbUc7Q0FDbEgsRUFDRDtBQUNJLGFBQVMsRUFBRyxtR0FBbUc7Q0FDbEgsQ0FBQyxDQUFDO0FBQ1AsSUFBSSxPQUFPLEdBQUcsOEJBQVk7QUFDdEIsUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUUsS0FBSztBQUNYLE9BQUcs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R0FBRyxDQUFDLEdBQUssQ0FBQyxHQUFHLENBQUMsR0FBSyxDQUFDLEdBQUcsQ0FBQyxBQUFDLENBQUM7QUFDdEUsV0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLEdBQUcsU0FBUyxHQUFHLDJCQUEyQixHQUMzRixJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLENBQUM7S0FDL0Q7O0FBRUQsVUFBTSxFQUFFLGNBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUMzQyxZQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLFlBQUksWUFBWSxHQUFHLEFBQUMsSUFBSSxLQUFLLEdBQUcsR0FBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQzlDLFlBQUksV0FBVyxHQUFHLEFBQUMsSUFBSSxLQUFLLEdBQUcsR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUMsWUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7O0FBRTNDLFlBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRTlDLFlBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNULGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUM7U0FDN0MsTUFBTTtBQUNILGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEFBQUMsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksY0FBYyxDQUFDO1NBQ3pGOztB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QUFNLENBQUMsT0FBTyxHQUFHO0FBQ2IsYUFBUyxFQUFFLFFBQVE7QUFDbkIsZUFBVyxFQUFFLFVBQVU7QUFDdkIsY0FBVSxFQUFFLFNBQVM7QUFDckIsZUFBVyxFQUFFLFVBQVU7QUFDdkIsb0JBQWdCLEVBQUUsZUFBZTtBQUNqQyxnQkFBWSxFQUFFLFdBQVc7QUFDekIsZUFBVyxFQUFFLFVBQVU7QUFDdkIsaUJBQWEsRUFBRSxZQUFZO0NBQzlCLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGlTbGlkZXIgZnJvbSAnLi4vLi4vLi4vc3JjL2lzbGlkZXIuanMnO1xuXG5sZXQgbGlzdCA9IFt7XG4gICAgJ2NvbnRlbnQnIDogJzxkaXYgY2xhc3M9XCJjb250ZW50IGhvbWVcIj48aDE+SG9tZTwvaDE+PGgyPlRoaXMgaXMgaG9tZSBwYWdlPC9oMj48cD5ob21lIGlzIHByZXR0eSBhd3NvbWU8L3A+PGRpdj4nXG59LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnIDogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2UxXCI+PGgxPlBhZ2UxPC9oMT48aDI+VGhpcyBpcyBwYWdlMTwvaDI+PHA+cGFnZTEgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnIDogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2UyXCI+PGgxPlBhZ2UyPC9oMT48aDI+VGhpcyBpcyBQYWdlMjwvaDI+PHA+UGFnZTIgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnIDogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2UzXCI+PGgxPlBhZ2UzPC9oMT48aDI+VGhpcyBpcyBQYWdlMzwvaDI+PHA+UGFnZTMgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnIDogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2U0XCI+PGgxPlBhZ2U0PC9oMT48aDI+VGhpcyBpcyBQYWdlNDwvaDI+PHA+UGFnZTQgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnIDogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2U1XCI+PGgxPlBhZ2U1PC9oMT48aDI+VGhpcyBpcyBwYWdlNTwvaDI+PHA+cGFnZTUgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9XTtcbmxldCBpc2xpZGVyID0gbmV3IGlTbGlkZXIoe1xuICAgIGRhdGE6IGxpc3QsXG4gICAgdHlwZTogJ2RvbScsXG4gICAgZG9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlTbGlkZXJcIiksXG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgaXNWZXJ0aWNhbDogdHJ1ZVxufSk7XG5cblxuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlTbGlkZXJDb3JlIGZyb20gJy4vaXNsaWRlcl9jb3JlLmpzJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfYnV0dG9uLmpzJztcbmltcG9ydCBEb3QgZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfZG90LmpzJztcblxuY2xhc3MgaVNsaWRlciBleHRlbmRzIGlTbGlkZXJDb3JlIHtcbiAgICBjb25zdHJ1Y3RvciguLi5vcHRzKSB7XG4gICAgICAgIC8v55u05o6l6LCD55So54i257G75p6E6YCg5Zmo6L+b6KGM5Yid5aeL5YyWXG4gICAgICAgIHN1cGVyKC4uLm9wdHMpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9hbmltYXRlRnVuY3MpXG4gICAgICAgIHRoaXMuZXh0ZW5kKEJ1dHRvbiwgdGhpcyk7XG4gICAgICAgIHRoaXMuZXh0ZW5kKERvdCwgdGhpcyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlTbGlkZXI7XG4iLCIvKipcbiAqIEBmaWxlICAgaVNsaWRlciwgYSBzaW1wbGUsIGVmZmljZW50IG1vYmlsZSBzbGlkZXIgc29sdXRpb25cbiAqXG4gKiBAYXV0aG9yIEJFRkVcbiAqIENvbnRhY3QgcWJhdHkucWlAZ21haWwuY29tXG4gKlxuICogTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL0JFLUZFL2lTbGlkZXIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRzICAgICAgICAgICAgICAgIOWPguaVsOmbhlxuICogQHBhcmFtIHtFbGVtZW50fSAgICAgb3B0cy5kb20gICAgICAgICAgICDlpJblsYLlhYPntKAgICAgICAgIE91dGVyIHdyYXBwZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdHMuZGF0YSAgICAgICAgICAg5pWw5o2u5YiX6KGoICAgICAgICBDb250ZW50IGRhdGFcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vcGx1Z2lucy9pc2xpZGVyX2FuaW1hdGUuanMnO1xuaW1wb3J0IFpvb20gZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfem9vbS5qcyc7XG5cbmNsYXNzIGlTbGlkZXJDb3JlIHtcbiAgICAvL0VTNuS4reaWsOWei+aehOmAoOWZqFxuICAgIGNvbnN0cnVjdG9yKG9wdHMpIHtcbiAgICAgICAgaWYgKCFvcHRzLmRvbSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdkb20gZWxlbWVudCBjYW4gbm90IGJlIGVtcHR5IScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRzLmRhdGEgfHwgIW9wdHMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGF0YSBtdXN0IGJlIGFuIGFycmF5IGFuZCBtdXN0IGhhdmUgbW9yZSB0aGFuIG9uZSBlbGVtZW50IScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHRlbmQoWm9vbSwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5fb3B0cyA9IG9wdHM7XG4gICAgICAgIHRoaXMuX3NldHRpbmcoKTtcbiAgICAgICAgdGhpcy5fcmVuZGVySFRNTCgpO1xuICAgICAgICB0aGlzLl9iaW5kSGFuZGxlcigpO1xuICAgIH1cblxuICAgIC8v5a6e5L6L5pa55rOVXG4gICAgX3NldHRpbmcoKSB7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5fb3B0cztcblxuICAgICAgICAvLyBkb20gZWxlbWVudCB3cmFwcGluZyBjb250ZW50XG4gICAgICAgIHRoaXMud3JhcCA9IG9wdHMuZG9tO1xuICAgICAgICAvLyB5b3VyIGRhdGFcbiAgICAgICAgdGhpcy5kYXRhID0gb3B0cy5kYXRhO1xuICAgICAgICAvLyBkZWZhdWx0IHR5cGVcbiAgICAgICAgdGhpcy50eXBlID0gb3B0cy50eXBlIHx8ICdwaWMnO1xuICAgICAgICAvLyBkZWZhdWx0IHNsaWRlIGRpcmVjdGlvblxuICAgICAgICB0aGlzLmlzVmVydGljYWwgPSBvcHRzLmlzVmVydGljYWwgfHwgZmFsc2U7XG4gICAgICAgIC8vIE92ZXJzcHJlYWQgbW9kZVxuICAgICAgICB0aGlzLmlzT3ZlcnNwcmVhZCA9IG9wdHMuaXNPdmVyc3ByZWFkIHx8IGZhbHNlO1xuICAgICAgICAvLyBQbGF5IHRpbWUgZ2FwXG4gICAgICAgIHRoaXMuZHVyYXRpb24gPSBvcHRzLmR1cmF0aW9uIHx8IDIwMDA7XG4gICAgICAgIC8vIHN0YXJ0IGZyb20gaW5pdEluZGV4IG9yIDBcbiAgICAgICAgdGhpcy5pbml0SW5kZXggPSBvcHRzLmluaXRJbmRleCB8fCAwO1xuICAgICAgICAvLyB0b3VjaHN0YXJ0IHByZXZlbnQgZGVmYXVsdCB0byBmaXhQYWdlXG4gICAgICAgIGlmIChvcHRzLmZpeFBhZ2UgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5maXhQYWdlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZml4UGFnZSA9IG9wdHMuZml4UGFnZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmluaXRJbmRleCA+IHRoaXMuZGF0YS5sZW5ndGggLSAxIHx8IHRoaXMuaW5pdEluZGV4IDwgMCkge1xuICAgICAgICAgICAgdGhpcy5pbml0SW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IHRoaXMuc2xpZGVJbmRleCB8fCB0aGlzLmluaXRJbmRleCB8fCAwO1xuXG4gICAgICAgIHRoaXMuYXhpcyA9IHRoaXMuaXNWZXJ0aWNhbCA/ICdZJyA6ICdYJztcbiAgICAgICAgdGhpcy5yZXZlcnNlQXhpcyA9IHRoaXMuYXhpcyA9PT0gJ1knID8gJ1gnIDogJ1knO1xuXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLndyYXAuY2xpZW50V2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53cmFwLmNsaWVudEhlaWdodDtcbiAgICAgICAgdGhpcy5yYXRpbyA9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcbiAgICAgICAgdGhpcy5zY2FsZSA9IG9wdHMuaXNWZXJ0aWNhbCA/IHRoaXMuaGVpZ2h0IDogdGhpcy53aWR0aDtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHlvdXIgZmluZ2VyIGlzIG1vdmluZ1xuICAgICAgICB0aGlzLm9uc2xpZGUgPSBvcHRzLm9uc2xpZGU7XG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgdG91Y2ggdGhlIHNjcmVlblxuICAgICAgICB0aGlzLm9uc2xpZGVzdGFydCA9IG9wdHMub25zbGlkZXN0YXJ0O1xuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBmaW5nZXIgbW92ZSBvdXQgb2YgdGhlIHNjcmVlblxuICAgICAgICB0aGlzLm9uc2xpZGVlbmQgPSBvcHRzLm9uc2xpZGVlbmQ7XG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGZpbmdlciBtb3ZlIG91dCBvZiB0aGUgc2NyZWVuXG4gICAgICAgIHRoaXMub25zbGlkZWNoYW5nZSA9IG9wdHMub25zbGlkZWNoYW5nZTtcblxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IG9wdHMuaXNMb2FkaW5nO1xuXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQgfHwge1g6IDAsIFk6IDB9O1xuICAgICAgICB0aGlzLnVzZVpvb20gPSBvcHRzLnVzZVpvb20gfHwgZmFsc2U7XG4gICAgICAgIC8vIGxvb3BpbmcgbG9naWMgYWRqdXN0XG4gICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgdGhpcy5pc0xvb3BpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNBdXRvUGxheSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5pc0xvb3BpbmcgPSBvcHRzLmlzTG9vcGluZyB8fCBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuaXNBdXRvcGxheSA9IG9wdHMuaXNBdXRvcGxheSB8fCBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGxpdHRsZSB0cmljayBzZXQsIHdoZW4geW91IGNob29jZSB0ZWFyICYgdmVydGljYWwgc2FtZSB0aW1lXG4gICAgICAgIC8vIGlTbGlkZXIgb3ZlcnNwcmVhZCBtb2RlIHdpbGwgYmUgc2V0IHRydWUgYXV0b21ldGljbHlcbiAgICAgICAgaWYgKG9wdHMuYW5pbWF0ZVR5cGUgPT09ICdjYXJkJyAmJiB0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF1dG9wbGF5IG1vZGVcbiAgICAgICAgaWYgKHRoaXMuaXNBdXRvcGxheSkge1xuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy51c2Vab29tKSB7XG4gICAgICAgICAgICB0aGlzLl9pbml0Wm9vbShvcHRzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRlYnVnIG1vZGVcbiAgICAgICAgdGhpcy5sb2cgPSBvcHRzLmlzRGVidWcgPyBmdW5jdGlvbiAoc3RyKSB7XG4gICAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coc3RyKTtcbiAgICAgICAgfSA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gc2V0IERhbXBpbmcgZnVuY3Rpb25cbiAgICAgICAgdGhpcy5fc2V0VXBEYW1waW5nKCk7XG4gICAgICAgIC8vIHN0b3AgYXV0b3BsYXkgd2hlbiB3aW5kb3cgYmx1clxuICAgICAgICB0aGlzLl9zZXRQbGF5V2hlbkZvY3VzKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFuaW1hdGlvbiBwYXJtYXM6XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gICAgICBkb20gICAgICAgICAgICAg5Zu+54mH55qE5aSW5bGCPGxpPuWuueWZqCAgICAgICBJbWcgd3JhcHBlclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgYXhpcyAgICAgICAgICAgIOWKqOeUu+aWueWQkSAgICAgICAgICAgICAgICBhbmltYXRlIGRpcmVjdGlvblxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgc2NhbGUgICAgICAgICAgIOWuueWZqOWuveW6piAgICAgICAgICAgICAgICBPdXRlciB3cmFwcGVyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICBpICAgICAgICAgICAgICAgPGxpPuWuueWZqGluZGV4ICAgICAgICAgIEltZyB3cmFwcGVyJ3MgaW5kZXhcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIG9mZnNldCAgICAgICAgICDmu5Hliqjot53nprsgICAgICAgICAgICAgICAgbW92ZSBkaXN0YW5jZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmNzID0ge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmV4dGVuZChBbmltYXRpb24sIHRoaXMuX2FuaW1hdGVGdW5jcyk7XG5cbiAgICAgICAgLy8gc2V0IGFuaW1hdGUgRnVuY3Rpb25cbiAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMgPSAob3B0cy5hbmltYXRlVHlwZSBpbiB0aGlzLl9hbmltYXRlRnVuY3MpXG4gICAgICAgICAgICA/IHRoaXMuX2FuaW1hdGVGdW5jc1tvcHRzLmFuaW1hdGVUeXBlXVxuICAgICAgICAgICAgOiB0aGlzLl9hbmltYXRlRnVuY3NbJ2RlZmF1bHQnXTtcbiAgICB9XG5cbiAgICAvLyBmaXhlZCBidWcgZm9yIGFuZHJvaWQgZGV2aWNlXG4gICAgX3NldFBsYXlXaGVuRm9jdXMoKSB7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIGVuYWJsZSBkYW1waW5nIHdoZW4gc2xpZGVyIG1lZXQgdGhlIGVkZ2VcbiAgICAgKi9cbiAgICBfc2V0VXBEYW1waW5nKCkge1xuICAgICAgICBsZXQgb25lSW4yID0gdGhpcy5zY2FsZSA+PiAxO1xuICAgICAgICBsZXQgb25lSW40ID0gb25lSW4yID4+IDE7XG4gICAgICAgIGxldCBvbmVJbjE2ID0gb25lSW40ID4+IDI7XG5cbiAgICAgICAgdGhpcy5fZGFtcGluZyA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IGRpcyA9IE1hdGguYWJzKGRpc3RhbmNlKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgIGlmIChkaXMgPCBvbmVJbjIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkaXMgPj4gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzIDwgb25lSW4yICsgb25lSW40KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgKChkaXMgLSBvbmVJbjIpID4+IDIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvbmVJbjQgKyBvbmVJbjE2ICsgKChkaXMgLSBvbmVJbjIgLSBvbmVJbjQpID4+IDMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGlzdGFuY2UgPiAwID8gcmVzdWx0IDogLXJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgc2luZ2xlIGl0ZW0gaHRtbCBieSBpZHhcbiAgICAgKiBAcGFyYW0ge2VsZW1lbnR9IGVsIC4uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9ICBpICAuLlxuICAgICAqL1xuICAgIF9yZW5kZXJJdGVtKGVsLCBpKSB7XG4gICAgICAgIGxldCBpdGVtO1xuICAgICAgICBsZXQgaHRtbDtcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBsZXQgaW5zZXJ0SW1nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaHRtbCA9IGl0ZW0uaGVpZ2h0IC8gaXRlbS53aWR0aCA+IHNlbGYucmF0aW9cbiAgICAgICAgICAgICAgICA/ICc8aW1nIGhlaWdodD1cIicgKyBzZWxmLmhlaWdodCArICdcIiBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiPidcbiAgICAgICAgICAgICAgICA6ICc8aW1nIHdpZHRoPVwiJyArIHNlbGYud2lkdGggKyAnXCIgc3JjPVwiJyArIGl0ZW0uY29udGVudCArICdcIj4nO1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyBnZXQgdGhlIHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgICAgICBpZiAoIXRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2ldIHx8IHtlbXB0eTogdHJ1ZX07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoaSA8IDApIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2xlbiArIGldO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID4gbGVuIC0gMSkge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbaSAtIGxlbl07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5lbXB0eSkge1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50eXBlID09PSAncGljJykge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzT3ZlcnNwcmVhZCkge1xuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhlaWdodCAmIGl0ZW0ud2lkdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0SW1nKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEltZy5zcmMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBjdXJyZW50SW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ud2lkdGggPSBjdXJyZW50SW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5zZXJ0SW1nKCk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgaXRlbS5jb250ZW50ICsgJykgNTAlIDUwJSBuby1yZXBlYXQnO1xuICAgICAgICAgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRTaXplID0gJ2NvdmVyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdkb20nKSB7XG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgbGlzdCBodG1sXG4gICAgICovXG4gICAgX3JlbmRlckhUTUwoKSB7XG4gICAgICAgIHRoaXMub3V0ZXIgJiYgKHRoaXMub3V0ZXIuaW5uZXJIVE1MID0gJycpO1xuICAgICAgICAvLyBpbml0YWlsIHVsIGVsZW1lbnRcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBvdXRlci5jbGFzc05hbWUgPSAnaXNsaWRlci1vdXRlcic7XG4gICAgICAgIG91dGVyLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyB0aGlzLmhlaWdodCArICdweDt3aWR0aDonICsgdGhpcy53aWR0aFxuICAgICAgICAgICAgKyAncHg7bWFyZ2luOjA7cGFkZGluZzowO2xpc3Qtc3R5bGU6bm9uZTsnO1xuXG4gICAgICAgIC8vbG9hZGluZ1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSAncGljJyAmJiAhdGhpcy5sb2FkZXIgJiYgdGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgICAgICAgIGxldCBsb2FkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGxvYWRlci5jbGFzc05hbWUgPSAnaXNsaWRlci1sb2FkZXInO1xuICAgICAgICAgICAgdGhpcy5sb2FkZXIgPSBsb2FkZXI7XG4gICAgICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQobG9hZGVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3JhZ2UgbGkgZWxlbWVudHMsIG9ubHkgc3RvcmUgMyBlbGVtZW50cyB0byByZWR1Y2UgbWVtb3J5IHVzYWdlXG4gICAgICAgIHRoaXMuZWxzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgbGkuY2xhc3NOYW1lID0gdGhpcy50eXBlID09PSAnZG9tJyA/ICdpc2xpZGVyLWRvbScgOiAnaXNsaWRlci1waWMnO1xuICAgICAgICAgICAgbGkuc3R5bGUuY3NzVGV4dCA9ICdoZWlnaHQ6JyArIHRoaXMuaGVpZ2h0ICsgJ3B4O3dpZHRoOicgKyB0aGlzLndpZHRoICsgJ3B4Oyc7XG4gICAgICAgICAgICB0aGlzLmVscy5wdXNoKGxpKTtcblxuICAgICAgICAgICAgLy8gcHJlcGFyZSBzdHlsZSBhbmltYXRpb25cbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGxpLCB0aGlzLmF4aXMsIHRoaXMuc2NhbGUsIGksIDApO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCAmJiAodGhpcy5fb3B0cy5hbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgdGhpcy5fb3B0cy5hbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obGksIDEgLSBpICsgdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShsaSwgaSAtIDEgKyB0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5faW5pdExvYWRJbWcoKTtcbiAgICAgICAgLy8gYXBwZW5kIHVsIHRvIGRpdiNjYW52YXNcbiAgICAgICAgaWYgKCF0aGlzLm91dGVyKSB7XG4gICAgICAgICAgICB0aGlzLm91dGVyID0gb3V0ZXI7XG4gICAgICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHByZWxvYWQgaW1nIHdoZW4gc2xpZGVDaGFuZ2VcbiAgICAgKiAgQHBhcmFtIHtudW1iZXJ9IGRhdGFJbmRleCBtZWFucyB3aGljaCBpbWFnZSB3aWxsIGJlIGxvYWRcbiAgICAgKi9cbiAgICBfcHJlbG9hZEltZyhkYXRhSW5kZXgpIHtcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgIGxldCBpZHggPSBkYXRhSW5kZXg7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGxvYWRJbWcgPSBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xICYmICFzZWxmLmRhdGFbaW5kZXhdLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgIGxldCBwcmVsb2FkSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgcHJlbG9hZEltZy5zcmMgPSBzZWxmLmRhdGFbaW5kZXhdLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgcHJlbG9hZEltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGF0YVtpbmRleF0ud2lkdGggPSBwcmVsb2FkSW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFbaW5kZXhdLmhlaWdodCA9IHByZWxvYWRJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgc2VsZi5kYXRhW2luZGV4XS5sb2FkZWQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzZWxmLnR5cGUgIT09ICdkb20nICYmIGxlbiA+IDMpIHtcbiAgICAgICAgICAgIGxldCBuZXh0SW5kZXggPSAoaWR4ICsgMiA+IGxlbiAtIDEpID8gKChpZHggKyAyKSAlIGxlbikgOiAoaWR4ICsgMik7XG4gICAgICAgICAgICBsZXQgcHJldkluZGV4ID0gKGlkeCAtIDIgPCAwKSA/IChsZW4gLSAyICsgaWR4KSA6IChpZHggLSAyKTtcbiAgICAgICAgICAgIGxvYWRJbWcobmV4dEluZGV4KTtcbiAgICAgICAgICAgIGxvYWRJbWcocHJldkluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuO1xuXG4gICAgLyoqXG4gICAgICogIGxvYWQgZXh0cmEgaW1ncyB3aGVuIHJlbmRlckhUTUxcbiAgICAgKi9cbiAgICBfaW5pdExvYWRJbWcoKSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICBsZXQgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIGxldCBpZHggPSB0aGlzLnNsaWRlSW5kZXg7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcblxuICAgICAgICBpZiAodGhpcy50eXBlICE9PSAnZG9tJyAmJiBsZW4gPiAzKSB7XG4gICAgICAgICAgICBsZXQgbmV4dEluZGV4ID0gKGlkeCArIDIgPiBsZW4pID8gKChpZHggKyAxKSAlIGxlbikgOiAoaWR4ICsgMSk7XG4gICAgICAgICAgICBsZXQgcHJldkluZGV4ID0gKGlkeCAtIDEgPCAwKSA/IChsZW4gLSAxICsgaWR4KSA6IChpZHggLSAxKTtcbiAgICAgICAgICAgIGRhdGFbaWR4XS5sb2FkZWQgPSAxO1xuICAgICAgICAgICAgZGF0YVtuZXh0SW5kZXhdLmxvYWRlZCA9IDE7XG4gICAgICAgICAgICBpZiAoc2VsZi5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgICAgICBkYXRhW3ByZXZJbmRleF0ubG9hZGVkID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fcHJlbG9hZEltZyhpZHgpO1xuICAgICAgICAgICAgfSwgMjAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBzbGlkZSBsb2dpY2FsLCBnb3RvIGRhdGEgaW5kZXhcbiAgICAgKiAgQHBhcmFtIHtudW1iZXJ9IGRhdGFJbmRleCB0aGUgZ290byBpbmRleFxuICAgICAqL1xuICAgIHNsaWRlVG8oZGF0YUluZGV4KSB7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICBsZXQgZWxzID0gdGhpcy5lbHM7XG4gICAgICAgIGxldCBpZHggPSBkYXRhSW5kZXg7XG4gICAgICAgIGxldCBuID0gZGF0YUluZGV4IC0gdGhpcy5zbGlkZUluZGV4O1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhuKSA+IDEpIHtcbiAgICAgICAgICAgIGxldCBuZXh0RWxzID0gbiA+IDAgPyB0aGlzLmVsc1syXSA6IHRoaXMuZWxzWzBdO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShuZXh0RWxzLCBpZHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJlbG9hZCB3aGVuIHNsaWRlXG4gICAgICAgIHRoaXMuX3ByZWxvYWRJbWcoaWR4KTtcblxuICAgICAgICAvLyBnZXQgcmlnaHQgaXRlbSBvZiBkYXRhXG4gICAgICAgIGlmIChkYXRhW2lkeF0pIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IGlkeDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9vcGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IG4gPiAwID8gMCA6IGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4O1xuICAgICAgICAgICAgICAgIG4gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2coJ3BpYyBpZHg6JyArIHRoaXMuc2xpZGVJbmRleCk7XG5cbiAgICAgICAgLy8ga2VlcCB0aGUgcmlnaHQgb3JkZXIgb2YgaXRlbXNcbiAgICAgICAgbGV0IHNFbGU7XG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwgJiYgKHRoaXMuX29wdHMuYW5pbWF0ZVR5cGUgPT09ICdyb3RhdGUnIHx8IHRoaXMuX29wdHMuYW5pbWF0ZVR5cGUgPT09ICdmbGlwJykpIHtcbiAgICAgICAgICAgIGlmIChuID4gMCkge1xuICAgICAgICAgICAgICAgIHNFbGUgPSBlbHMucG9wKCk7XG4gICAgICAgICAgICAgICAgZWxzLnVuc2hpZnQoc0VsZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPCAwKSB7XG4gICAgICAgICAgICAgICAgc0VsZSA9IGVscy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGVscy5wdXNoKHNFbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG4gPiAwKSB7XG4gICAgICAgICAgICAgICAgc0VsZSA9IGVscy5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIGVscy5wdXNoKHNFbGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuIDwgMCkge1xuICAgICAgICAgICAgICAgIHNFbGUgPSBlbHMucG9wKCk7XG4gICAgICAgICAgICAgICAgZWxzLnVuc2hpZnQoc0VsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzbGlkZWNoYW5nZSBzaG91bGQgcmVuZGVyIG5ldyBpdGVtXG4gICAgICAgIC8vIGFuZCBjaGFuZ2UgbmV3IGl0ZW0gc3R5bGUgdG8gZml0IGFuaW1hdGlvblxuICAgICAgICBpZiAobiAhPT0gMCkge1xuICAgICAgICAgICAgaWYgKE1hdGguYWJzKG4pID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0oZWxzWzBdLCBpZHggLSAxKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGVsc1syXSwgaWR4ICsgMSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKG4pID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShzRWxlLCBpZHggKyBuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNFbGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgICAgIHNFbGUuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzRWxlLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgICAgICB0aGlzLm9uc2xpZGVjaGFuZ2UgJiYgdGhpcy5vbnNsaWRlY2hhbmdlKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgICAgICB0aGlzLmRvdGNoYW5nZSAmJiB0aGlzLmRvdGNoYW5nZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG8gdGhlIHRyaWNrIGFuaW1hdGlvblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgaWYgKGVsc1tpXSAhPT0gc0VsZSkge1xuICAgICAgICAgICAgICAgIGVsc1tpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAuM3MgZWFzZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyhlbHNbaV0sIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9wIHBsYXlpbmcgd2hlbiBtZWV0IHRoZSBlbmQgb2YgZGF0YVxuICAgICAgICBpZiAodGhpcy5pc0F1dG9wbGF5ICYmICF0aGlzLmlzTG9vcGluZyAmJiB0aGlzLnNsaWRlSW5kZXggPT09IGRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIGp1ZGdlIHRoZSBkZXZpY2VcbiAgICAgKiAgQHJldHVybiB7T2JqZWN0fSB7fVxuICAgICAqL1xuICAgIF9kZXZpY2UoKSB7XG4gICAgICAgIGxldCBoYXNUb3VjaCA9ICEhKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpXG4gICAgICAgIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpO1xuICAgICAgICBsZXQgc3RhcnRFdnQgPSBoYXNUb3VjaCA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWRvd24nO1xuICAgICAgICBsZXQgbW92ZUV2dCA9IGhhc1RvdWNoID8gJ3RvdWNobW92ZScgOiAnbW91c2Vtb3ZlJztcbiAgICAgICAgbGV0IGVuZEV2dCA9IGhhc1RvdWNoID8gJ3RvdWNoZW5kJyA6ICdtb3VzZXVwJztcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhc1RvdWNoOiBoYXNUb3VjaCxcbiAgICAgICAgICAgIHN0YXJ0RXZ0OiBzdGFydEV2dCxcbiAgICAgICAgICAgIG1vdmVFdnQ6IG1vdmVFdnQsXG4gICAgICAgICAgICBlbmRFdnQ6IGVuZEV2dFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmQgYWxsIGV2ZW50IGhhbmRsZXIsIHdoZW4gb24gUEMsIGRpc2FibGUgZHJhZyBldmVudOOAglxuICAgICAqL1xuICAgIF9iaW5kSGFuZGxlcigpIHtcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuX2RldmljZSgpO1xuICAgICAgICBpZiAoIWRldmljZS5oYXNUb3VjaCkge1xuICAgICAgICAgICAgb3V0ZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICAgICAgb3V0ZXIub25kcmFnc3RhcnQgPSBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5lbmRFdnQsIHRoaXMpO1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgc2ltcGxlIGV2ZW50IGRlbGVnYXRlIG1ldGhvZFxuICAgICAqICBAcGFyYW0ge3N0cmluZ30gICBldnRUeXBlICAgZXZlbnQgbmFtZVxuICAgICAqICBAcGFyYW0ge3N0cmluZ30gICBzZWxlY3RvciAgdGhlIHNpbXBsZSBjc3Mgc2VsZWN0b3IgbGlrZSBqUXVlcnlcbiAgICAgKiAgQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgIGV2ZW50IGNhbGxiYWNrXG4gICAgICovXG4gICAgYmluZChldnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGUpIHtcbiAgICAgICAgICAgIGxldCBldnQgPSB3aW5kb3cuZXZlbnQgPyB3aW5kb3cuZXZlbnQgOiBlO1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgZWxlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZUFycltpXSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGRlbGVnYXRlKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZSkge1xuICAgICAgICAgICAgbGV0IGV2dCA9IHdpbmRvdy5ldmVudCA/IHdpbmRvdy5ldmVudCA6IGU7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBlbGVBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWxlQXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHJlbW92ZUV2ZW50TGlzdGVuZXIgdG8gcmVsZWFzZSB0aGUgbWVtb3J5XG4gICAgICovXG4gICAgZGVzdHJveSAoKSB7XG4gICAgICAgIGxldCBvdXRlciA9IHRoaXMub3V0ZXI7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLl9kZXZpY2UoKTtcblxuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5lbmRFdnQsIHRoaXMpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcyk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG4gICAgICAgIHRoaXMud3JhcC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdW5pZm9ybWl0eSBhZG1pbiBldmVudFxuICAgICAqICBAcGFyYW0ge09iamVjdH0gICBldnQgICBldmVudCBvYmpcbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudCAoZXZ0KSB7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLl9kZXZpY2UoKTtcbiAgICAgICAgc3dpdGNoIChldnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSBkZXZpY2Uuc3RhcnRFdnQ6XG4gICAgICAgICAgICAgICAgdGhpcy5zdGFydEhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZGV2aWNlLm1vdmVFdnQ6XG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlSGFuZGxlcihldnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBkZXZpY2UuZW5kRXZ0OlxuICAgICAgICAgICAgICAgIHRoaXMuZW5kSGFuZGxlcihldnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndG91Y2hjYW5jZWwnOlxuICAgICAgICAgICAgICAgIHRoaXMuZW5kSGFuZGxlcihldnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnb3JpZW50YXRpb25jaGFuZ2UnOlxuICAgICAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgICAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNoc3RhcnQgY2FsbGJhY2tcbiAgICAgKiAgQHBhcmFtIHtPYmplY3R9ICAgZXZ0ICAgZXZlbnQgb2JqXG4gICAgICovXG4gICAgc3RhcnRIYW5kbGVyIChldnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZml4UGFnZSkge1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LnRhZ05hbWUgIT09ICdTRUxFQ1QnICYmIHRhcmdldC50YWdOYW1lICE9PSAnSU5QVVQnICYmIHRhcmdldC50YWdOYW1lICE9PSAnVEVYVEFSRUEnKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuX2RldmljZSgpO1xuICAgICAgICB0aGlzLmlzTW92aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLm9uc2xpZGVzdGFydCAmJiB0aGlzLm9uc2xpZGVzdGFydCgpO1xuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IGJlZm9yZXNsaWRlJyk7XG5cbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zdGFydFggPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgICAgICAgdGhpcy5zdGFydFkgPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGV2dC5wYWdlWTtcbiAgICAgICAgdGhpcy5fc3RhcnRIYW5kbGVyICYmIHRoaXMuX3N0YXJ0SGFuZGxlcihldnQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICB0b3VjaG1vdmUgY2FsbGJhY2tcbiAgICAgKiAgQHBhcmFtIHtPYmplY3R9ICAgZXZ0ICAgZXZlbnQgb2JqXG4gICAgICovXG4gICAgbW92ZUhhbmRsZXIgKGV2dCkge1xuICAgICAgICBpZiAodGhpcy5pc01vdmluZykge1xuICAgICAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuX2RldmljZSgpO1xuICAgICAgICAgICAgbGV0IGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgYXhpcyA9IHRoaXMuYXhpcztcbiAgICAgICAgICAgIGxldCByZXZlcnNlQXhpcyA9IHRoaXMucmV2ZXJzZUF4aXM7XG4gICAgICAgICAgICBsZXQgb2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgIFg6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc3RhcnRYKSA6IChldnQucGFnZVggLSB0aGlzLnN0YXJ0WCksXG4gICAgICAgICAgICAgICAgWTogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5zdGFydFkpIDogKGV2dC5wYWdlWSAtIHRoaXMuc3RhcnRZKVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgbGV0IHJlcyA9IHRoaXMuX21vdmVIYW5kbGVyID8gdGhpcy5fbW92ZUhhbmRsZXIoZXZ0KSA6IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFyZXMgJiYgTWF0aC5hYnMob2Zmc2V0W2F4aXNdKSAtIE1hdGguYWJzKG9mZnNldFtyZXZlcnNlQXhpc10pID4gMTApIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25zbGlkZSAmJiB0aGlzLm9uc2xpZGUob2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IG9uc2xpZGUnKTtcblxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldFtheGlzXSA+IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSAwIHx8IG9mZnNldFtheGlzXSA8IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBsZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRbYXhpc10gPSB0aGlzLl9kYW1waW5nKG9mZnNldFtheGlzXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZWxzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDBzJztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMoaXRlbSwgYXhpcywgdGhpcy5zY2FsZSwgaSwgb2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNoZW5kIGNhbGxiYWNrXG4gICAgICogIEBwYXJhbSB7T2JqZWN0fSAgIGV2dCAgIGV2ZW50IG9ialxuICAgICAqL1xuICAgIGVuZEhhbmRsZXIgKGV2dCkge1xuICAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgICAgIGxldCBib3VuZGFyeSA9IHRoaXMuc2NhbGUgLyAyO1xuICAgICAgICBsZXQgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGEgcXVpY2sgc2xpZGUgdGltZSBtdXN0IHVuZGVyIDMwMG1zXG4gICAgICAgIC8vIGEgcXVpY2sgc2xpZGUgc2hvdWxkIGFsc28gc2xpZGUgYXQgbGVhc3QgMTQgcHhcbiAgICAgICAgYm91bmRhcnkgPSBlbmRUaW1lIC0gdGhpcy5zdGFydFRpbWUgPiAzMDAgPyBib3VuZGFyeSA6IDE0O1xuICAgICAgICBsZXQgcmVzID0gdGhpcy5fZW5kSGFuZGxlciA/IHRoaXMuX2VuZEhhbmRsZXIoZXZ0KSA6IGZhbHNlO1xuICAgICAgICBsZXQgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgbGV0IGFic1JldmVyc2VPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXRbdGhpcy5yZXZlcnNlQXhpc10pO1xuXG4gICAgICAgIGxldCBnZXRMaW5rID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgICAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICAgICAgaWYgKGVsLmhyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSBlbC5ocmVmXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChlbC5jbGFzc05hbWUgPT09ICdpc2xpZGVyLWRvbScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZXRMaW5rKGVsLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFyZXMgJiYgb2Zmc2V0W2F4aXNdID49IGJvdW5kYXJ5ICYmIGFic1JldmVyc2VPZmZzZXQgPCBhYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXggLSAxKTtcbiAgICAgICAgfSBlbHNlIGlmICghcmVzICYmIG9mZnNldFtheGlzXSA8IC1ib3VuZGFyeSAmJiBhYnNSZXZlcnNlT2Zmc2V0IDwgYWJzT2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4ICsgMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlcykge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGFwIGV2ZW50IGlmIG9mZnNldCA8IDEwXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLm9mZnNldC5YKSA8IDEwICYmIE1hdGguYWJzKHRoaXMub2Zmc2V0LlkpIDwgMTApIHtcbiAgICAgICAgICAgIHRoaXMudGFwRXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgICAgICB0aGlzLnRhcEV2dC5pbml0RXZlbnQoJ3RhcCcsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZml4UGFnZSAmJiB0aGlzLnR5cGUgPT09ICdkb20nKSB7XG4gICAgICAgICAgICAgICAgZ2V0TGluayhldnQudGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZXZ0LnRhcmdldC5kaXNwYXRjaEV2ZW50KHRoaXMudGFwRXZ0KSkge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vZmZzZXQuWCA9IHRoaXMub2Zmc2V0LlkgPSAwO1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG4gICAgICAgIHRoaXMub25zbGlkZWVuZCAmJiB0aGlzLm9uc2xpZGVlbmQodGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBhZnRlcnNsaWRlJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIG9yaWVudGF0aW9uY2hhbmdlIGNhbGxiYWNrXG4gICAgICovXG4gICAgb3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYucmVzZXQoKTtcbiAgICAgICAgICAgIHNlbGYubG9nKCdFdmVudDogb3JpZW50YXRpb25jaGFuZ2UnKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXNldCAmIHJlcmVuZGVyXG4gICAgICovXG4gICAgcmVzZXQgKCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3NldHRpbmcoKTtcbiAgICAgICAgdGhpcy5fcmVuZGVySFRNTCgpO1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVsb2FkIERhdGEgJiByZW5kZXJcbiAgICAgKi9cbiAgICBsb2FkRGF0YSAoZGF0YSwgaW5pdEluZGV4KSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gaW5pdEluZGV4IHx8IDA7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX3JlbmRlckhUTUwoKTtcbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGVuYWJsZSBhdXRvcGxheVxuICAgICAqL1xuICAgIHBsYXkgKCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBkdXJhdGlvbiA9IHRoaXMuZHVyYXRpb247XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUGxheVRpbWVyKTtcbiAgICAgICAgdGhpcy5hdXRvUGxheVRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5zbGlkZVRvKHNlbGYuc2xpZGVJbmRleCArIDEpO1xuICAgICAgICB9LCBkdXJhdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGF1c2UgYXV0b3BsYXlcbiAgICAgKi9cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmF1dG9QbGF5VGltZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBsdWdpbiBleHRlbmRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGx1Z2luIG5lZWQgdG8gYmUgc2V0IHVwXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG1haW4gaVNsaWRlciBwcm90b3R5cGVcbiAgICAgKi9cbiAgICBleHRlbmQgKHBsdWdpbiwgbWFpbikge1xuICAgICAgICBpZiAoIW1haW4pIHtcbiAgICAgICAgICAgIG1haW4gPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5rZXlzKHBsdWdpbikuZm9yRWFjaChmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtYWluLCBwcm9wZXJ0eSwgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwbHVnaW4sIHByb3BlcnR5KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlTbGlkZXJDb3JlO1xuIiwiLypcbiAqIEBmaWxlICAgQW5pbWF0aW9uIExpYnJhcnlcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cblxubGV0IGV4dGVuZEFuaW1hdGlvbiA9IHtcbiAgICAncm90YXRlJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGxldCBiZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy53cmFwLnBhcmVudE5vZGUsIG51bGwpLmJhY2tncm91bmRDb2xvcjtcblxuICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjsgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7ICdcbiAgICAgICAgICAgICsgJ2JhY2tncm91bmQtY29sb3I6JyArIGJkQ29sb3IgKyAnOyBwb3NpdGlvbjphYnNvbHV0ZTsnO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyA5MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSArICdkZWcpIHRyYW5zbGF0ZVooJ1xuICAgICAgICAgICAgKyAoMC44ODggKiBzY2FsZSAvIDIpICsgJ3B4KSBzY2FsZSgwLjg4OCknO1xuICAgIH0sXG5cbiAgICAnZmxpcCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICBsZXQgYmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMud3JhcC5wYXJlbnROb2RlLCBudWxsKS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJ3Bvc2l0aW9uOmFic29sdXRlOyAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyBiYWNrZ3JvdW5kLWNvbG9yOicgKyBiZENvbG9yICsgJzsnO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooJyArIChzY2FsZSAvIDIpICsgJ3B4KSByb3RhdGUnICsgcm90YXRlRGlyZWN0XG4gICAgICAgICAgICArICcoJyArIDE4MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSArICdkZWcpIHNjYWxlKDAuODc1KSc7XG4gICAgfSxcblxuICAgICdkZXB0aCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHpvb21TY2FsZSA9ICg0IC0gTWF0aC5hYnMoaSAtIDEpKSAqIDAuMTg7XG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcbiAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpID09PSAxKSA/IDEwMCA6IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgOiAoaSAtIDEpO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnXG4gICAgICAgICAgICArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgMS4zICogc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH0sXG5cbiAgICAnZmxvdyc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICBsZXQgZGlyZWN0QW1lbmQgPSAoYXhpcyA9PT0gJ1gnKSA/IDEgOiAtMTtcbiAgICAgICAgbGV0IG9mZnNldFJhdGlvID0gTWF0aC5hYnMob2Zmc2V0IC8gc2NhbGUpO1xuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0IDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgwLjcsIDAuNykgdHJhbnNsYXRlWignICsgKG9mZnNldFJhdGlvICogMTUwIC0gMTUwKSAqIE1hdGguYWJzKGkgLSAxKSArICdweCknXG4gICAgICAgICAgICArICd0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSdcbiAgICAgICAgICAgICsgJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyBkaXJlY3RBbWVuZCAqICgzMCAtIG9mZnNldFJhdGlvICogMzApICogKDEgLSBpKSArICdkZWcpJztcbiAgICB9LFxuXG4gICAgJ2NhcmQnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9tLmN1ciAmJiBkb20uY3VyICE9PSBpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gbnVsbDtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgem9vbVNjYWxlID0gKGRvbS5jdXIpID8gMSAtIDAuMiAqIE1hdGguYWJzKGkgLSAxKSAtIE1hdGguYWJzKDAuMiAqIG9mZnNldCAvIHNjYWxlKS50b0ZpeGVkKDYpIDogMTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXNcbiAgICAgICAgICAgICsgJygnICsgKCgxICsgTWF0aC5hYnMoaSAtIDEpICogMC4yKSAqIG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kQW5pbWF0aW9uO1xuIiwiLypcbiAqIEBmaWxlICAgVG8gY3JlYXRlIHJpZ2h0JmxlZnQgYm90dG9uIG9uIGlTbGlkZXJcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbmZ1bmN0aW9uIGFkZEJ0bigpIHtcbiAgICBpZiAoIXRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICBsZXQgYnRuT3V0ZXIgPSBbXTtcbiAgICAgICAgbGV0IGJ0bklubmVyID0gW107XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgICAgIGJ0bk91dGVyW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4tb3V0ZXInO1xuICAgICAgICAgICAgYnRuSW5uZXJbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJ0bklubmVyW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWJ0bi1pbm5lcic7XG5cbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgbGVmdCc7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gLTE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmNsYXNzTmFtZSArPSAnIHJpZ2h0JztcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5kaXIgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBidG5PdXRlcltpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBsZXQgZGlyID0gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2RpcicpLCAxMCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRvKHNlbGYuc2xpZGVJbmRleCArIGRpcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uYXBwZW5kQ2hpbGQoYnRuSW5uZXJbaV0pO1xuICAgICAgICAgICAgdGhpcy53cmFwLmFwcGVuZENoaWxkKGJ0bk91dGVyW2ldLCB0aGlzLndyYXAubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHthZGRCdG59O1xuIiwiLypcbiAqIEBmaWxlICAgVG8gY3JlYXRlIGRvdHMgaW5kZXggb24gaVNsaWRlclxuICogQGF1dGhvciB4aWV5dTMzMzMzXG4gKi9cblxuZnVuY3Rpb24gYWRkRG90KCkge1xuICAgIGlmICghdGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGxldCBkb3RzID0gW107XG4gICAgICAgIGxldCBkb3RXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgZG90V3JhcC5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3Qtd3JhcCc7XG4gICAgICAgIGxldCBmcmVnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkb3RzW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90JztcbiAgICAgICAgICAgIGRvdHNbaV0uc2V0QXR0cmlidXRlKCdpbmRleCcsIGkpO1xuICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMuc2xpZGVJbmRleCkge1xuICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvdHNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2luZGV4JyksIDEwKTtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlVG8oaW5kZXgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBmcmVnbWVudC5hcHBlbmRDaGlsZChkb3RzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBkb3RXcmFwLmFwcGVuZENoaWxkKGZyZWdtZW50KTtcbiAgICAgICAgdGhpcy53cmFwLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZG90V3JhcCk7XG5cbiAgICAgICAgdGhpcy5kb3RjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdCc7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMuc2xpZGVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7YWRkRG90fTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBsaXVodWkwMSBvbiAyMDE1LzEvNy5cbiAqL1xuXG4gICAgbGV0IGhhczNkID0gKCdXZWJLaXRDU1NNYXRyaXgnIGluIHdpbmRvdyAmJiAnbTExJyBpbiBuZXcgV2ViS2l0Q1NTTWF0cml4KCkpO1xuICAgIGxldCBtaW5TY2FsZSA9IDEvMjtcbiAgICBsZXQgdmlld1Njb3BlID0ge307XG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZVRyYW5zbGF0ZSh4LCB5LCB6LCBzY2FsZSkge1xuICAgICAgICByZXR1cm4gXCJ0cmFuc2xhdGVcIiArIChoYXMzZCA/IFwiM2QoXCIgOiBcIihcIikgKyB4ICsgXCJweCxcIiArIHkgKyAoaGFzM2QgPyBcInB4LFwiICsgeiArIFwicHgpXCIgOiBcInB4KVwiKSArIFwic2NhbGUoXCIgKyBzY2FsZSArIFwiKVwiO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXREaXN0YW5jZShhLGIpe1xuICAgICAgICBsZXQgeCx5O1xuICAgICAgICB4PSBhLmxlZnQgLSBiLmxlZnQ7XG4gICAgICAgIHk9IGEudG9wIC0gYi50b3A7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIHggKyBcInB4IFwiICsgeSArIFwicHhcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0VG91Y2hlcyh0b3VjaGVzKXtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvdWNoZXMpLm1hcChmdW5jdGlvbih0b3VjaCl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHRvcDogdG91Y2gucGFnZVlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0LGVuZCl7XG4gICAgICAgIGxldCBzdGFydERpc3RhbmNlPWdldERpc3RhbmNlKHN0YXJ0WzBdLHN0YXJ0WzFdKTtcbiAgICAgICAgbGV0IGVuZERpc3RhbmNlPWdldERpc3RhbmNlKGVuZFswXSxlbmRbMV0pO1xuICAgICAgICByZXR1cm4gZW5kRGlzdGFuY2Uvc3RhcnREaXN0YW5jZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDb21wdXRlZFRyYW5zbGF0ZShvYmopIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZVg6IDAsXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWjogMCxcbiAgICAgICAgICAgIHNjYWxlWDogMSxcbiAgICAgICAgICAgIHNjYWxlWTogMSxcbiAgICAgICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgICAgICBvZmZzZXRZOiAwXG4gICAgICAgIH07XG4gICAgICAgIGxldCBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDA7XG4gICAgICAgIGlmICghd2luZG93LmdldENvbXB1dGVkU3R5bGUgfHwgIW9iaikgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgbGV0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUob2JqKSwgdHJhbnNmb3JtLCBvcmlnaW47XG4gICAgICAgIHRyYW5zZm9ybSA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gICAgICAgIG9yaWdpbiA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiB8fCBzdHlsZS5tb3pUcmFuc2Zvcm1PcmlnaW47XG4gICAgICAgIGxldCBwYXIgPSBvcmlnaW4ubWF0Y2goLyguKilweFxccysoLiopcHgvKTtcbiAgICAgICAgaWYgKHBhci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBvZmZzZXRYID0gcGFyWzFdIC0gMDtcbiAgICAgICAgICAgIG9mZnNldFkgPSBwYXJbMl0gLSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2Zvcm0gPT0gXCJub25lXCIpIHJldHVybiByZXN1bHQ7XG4gICAgICAgIGxldCBtYXQzZCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeDNkXFwoKC4rKVxcKSQvKTtcbiAgICAgICAgbGV0IG1hdDJkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgICAgICAgaWYgKG1hdDNkKSB7XG4gICAgICAgICAgICBsZXQgc3RyID0gbWF0M2RbMV0uc3BsaXQoJywgJyk7XG4gICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWDogc3RyWzEyXSAtIDAsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWTogc3RyWzEzXSAtIDAsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWjogc3RyWzE0XSAtIDAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WDogICAgb2Zmc2V0WCAtIDAsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WTogICAgb2Zmc2V0WSAtIDAsXG4gICAgICAgICAgICAgICAgc2NhbGVYOiAgICAgc3RyWzBdIC0gMCxcbiAgICAgICAgICAgICAgICBzY2FsZVk6ICAgICBzdHJbNV0gLSAwLFxuICAgICAgICAgICAgICAgIHNjYWxlWjogICAgIHN0clsxMF0gLSAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2UgaWYgKG1hdDJkKSB7XG4gICAgICAgICAgICBsZXQgc3RyID0gbWF0MmRbMV0uc3BsaXQoJywgJyk7XG4gICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWDogc3RyWzRdIC0gMCxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVZOiBzdHJbNV0gLSAwLFxuICAgICAgICAgICAgICAgIG9mZnNldFg6ICAgIG9mZnNldFggLSAwLFxuICAgICAgICAgICAgICAgIG9mZnNldFk6ICAgIG9mZnNldFkgLSAwLFxuICAgICAgICAgICAgICAgIHNjYWxlWDogICAgIHN0clswXSAtIDAsXG4gICAgICAgICAgICAgICAgc2NhbGVZOiAgICAgc3RyWzNdIC0gMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldENlbnRlcihhLCBiKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4OiAoYS54ICsgYi54KSAvIDIsXG4gICAgICAgICAgICB5OiAoYS55ICsgYi55KSAvIDJcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8v5Yid5aeL5YyW57yp5pS+5Y+C5pWw562JXG4gICAgZnVuY3Rpb24gaW5pdFpvb20ob3B0cykge1xuICAgICAgICB0aGlzLmN1cnJlbnRTY2FsZSA9IDE7XG4gICAgICAgIHRoaXMuem9vbUZhY3RvciA9IG9wdHMuem9vbUZhY3RvciB8fCAyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0SGFuZGxlcihldnQpIHtcbiAgICAgICAgaWYgKHRoaXMudXNlWm9vbSkge1xuICAgICAgICAgICAgbGV0IG5vZGUgPSB0aGlzLmVsc1sxXS5xdWVyeVNlbGVjdG9yKCdpbWcnKTtcbiAgICAgICAgICAgIGxldCB0cmFuc2Zvcm0gPSBnZXRDb21wdXRlZFRyYW5zbGF0ZShub2RlKTtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRUb3VjaGVzPWdldFRvdWNoZXMoZXZ0LnRhcmdldFRvdWNoZXMpO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRYID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVggLSAwO1xuICAgICAgICAgICAgdGhpcy5fc3RhcnRZID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVkgLSAwO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U2NhbGUgPSB0cmFuc2Zvcm0uc2NhbGVYO1xuICAgICAgICAgICAgdGhpcy56b29tTm9kZSA9IG5vZGU7XG4gICAgICAgICAgICBsZXQgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImdlc3R1cmVcIik7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0VG91Y2hTdGFydCA9IG51bGw7XG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoZXMgPSBldnQudG91Y2hlcztcbiAgICAgICAgICAgICAgICBsZXQgdG91Y2hDZW50ZXIgPSBnZXRDZW50ZXIoe1xuICAgICAgICAgICAgICAgICAgICB4OiB0b3VjaGVzWzBdLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3VjaGVzWzBdLnBhZ2VZXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB4OiB0b3VjaGVzWzFdLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICB5OiB0b3VjaGVzWzFdLnBhZ2VZXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gPSBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbih0b3VjaENlbnRlci54IC0gcG9zLmxlZnQsIHRvdWNoQ2VudGVyLnkgLSBwb3MudG9wKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgbGV0IHRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZ2VzdHVyZSA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWUgLSB0aGlzLmxhc3RUb3VjaFN0YXJ0IDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmdlc3R1cmUgPSAzO1xuXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFRvdWNoU3RhcnQgPSB0aW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlSGFuZGxlcihldnQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDAsIG5vZGUgPSB0aGlzLnpvb21Ob2RlO1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5fZGV2aWNlKCk7XG4gICAgICAgIGlmIChkZXZpY2UuaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDIgJiYgdGhpcy51c2Vab29tKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2FsZUltYWdlKGV2dCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09IDEgJiYgdGhpcy51c2Vab29tICYmIHRoaXMuY3VycmVudFNjYWxlID4gMSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbW92ZUltYWdlKGV2dCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZ2VzdHVyZSA9IHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZURvdWJsZVRhcChldnQpIHtcbiAgICAgICAgbGV0IHpvb21GYWN0b3IgPSB0aGlzLnpvb21GYWN0b3IgfHwgMjtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnpvb21Ob2RlO1xuICAgICAgICBsZXQgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgICAgIHRoaXMuY3VycmVudFNjYWxlID0gdGhpcy5jdXJyZW50U2NhbGUgPT0gMSA/IHpvb21GYWN0b3IgOiAxO1xuICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKDAsIDAsIDAsIHRoaXMuY3VycmVudFNjYWxlKTtcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFNjYWxlICE9IDEpIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oZXZ0LnRvdWNoZXNbMF0ucGFnZVggLSBwb3MubGVmdCwgZXZ0LnRvdWNoZXNbMF0ucGFnZVkgLSBwb3MudG9wKTtcblxuICAgIH1cblxuICAgIC8v57yp5pS+5Zu+54mHXG4gICAgZnVuY3Rpb24gc2NhbGVJbWFnZShldnQpIHtcbiAgICAgICAgbGV0IG1vdmVUb3VjZXMgPSBnZXRUb3VjaGVzKGV2dC50YXJnZXRUb3VjaGVzKTtcbiAgICAgICAgbGV0IHNjYWxlID0gY2FsY3VsYXRlU2NhbGUodGhpcy5zdGFydFRvdWNoZXMsbW92ZVRvdWNlcyk7XG4gICAgICAgIGV2dC5zY2FsZSA9IGV2dC5zY2FsZSB8fCBzY2FsZTtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnpvb21Ob2RlO1xuICAgICAgICBzY2FsZSA9IHRoaXMuY3VycmVudFNjYWxlICogZXZ0LnNjYWxlIDwgbWluU2NhbGU/bWluU2NhbGU6dGhpcy5jdXJyZW50U2NhbGUgKiBldnQuc2NhbGU7XG4gICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgc2NhbGUpO1xuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW5kSGFuZGxlcihldnQpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGlmICh0aGlzLmdlc3R1cmUgPT09IDIpIHsvL+WPjOaJi+aMhyB0b2RvXG4gICAgICAgICAgICB0aGlzLl9yZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZ2VzdHVyZSA9PSAxKSB7Ly/mlL7lpKfmi5bmi70gdG9kb1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdlc3R1cmUgPT09IDMpIHsvL+WPjOWHu1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlRG91YmxlVGFwKGV2dCk7XG4gICAgICAgICAgICB0aGlzLl9yZXNldEltYWdlKGV2dCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIC8v5ouW5ou95Zu+54mHXG4gICAgZnVuY3Rpb24gbW92ZUltYWdlKGV2dCkge1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuem9vbU5vZGU7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLl9kZXZpY2UoKTtcbiAgICAgICAgbGV0IG9mZnNldCA9IHtcbiAgICAgICAgICAgIFg6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc3RhcnRYKSA6IChldnQucGFnZVggLSB0aGlzLnN0YXJ0WCksXG4gICAgICAgICAgICBZOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLnN0YXJ0WSkgOiAoZXZ0LnBhZ2VZIC0gdGhpcy5zdGFydFkpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubW92ZU9mZnNldCA9IHtcbiAgICAgICAgICAgIHg6IHRoaXMuX3N0YXJ0WCArIG9mZnNldC5YIC0gMCxcbiAgICAgICAgICAgIHk6IHRoaXMuX3N0YXJ0WSArIG9mZnNldC5ZIC0gMFxuICAgICAgICB9O1xuICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKHRoaXMubW92ZU9mZnNldC54LCB0aGlzLm1vdmVPZmZzZXQueSwgMCwgdGhpcy5jdXJyZW50U2NhbGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFBvc2l0aW9uKGVsZW1lbnQpIHtcbiAgICAgICAgbGV0IHBvcyA9IHtcImxlZnRcIjogMCwgXCJ0b3BcIjogMH07XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHBvcy50b3AgKz0gZWxlbWVudC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgICAgICAgIHBvcy5sZWZ0ICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlIChlbGVtZW50KTtcbiAgICAgICAgcmV0dXJuIHBvcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIHZhbHVlLCB0YWcpIHtcbiAgICAgICAgbGV0IG1pbiwgbWF4O1xuICAgICAgICBsZXQgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgICAgIHZpZXdTY29wZSA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiB7bGVmdDogcG9zLmxlZnQsIHRvcDogcG9zLnRvcH0sXG4gICAgICAgICAgICBlbmQ6IHtsZWZ0OiBwb3MubGVmdCArIG5vZGUuY2xpZW50V2lkdGgsIHRvcDogcG9zLnRvcCArIG5vZGUuY2xpZW50SGVpZ2h0fVxuICAgICAgICB9O1xuICAgICAgICBsZXQgc3RyID0gdGFnID09IDEgPyBcImxlZnRcIiA6IFwidG9wXCI7XG4gICAgICAgIG1pbiA9IHZpZXdTY29wZS5zdGFydFtzdHJdO1xuICAgICAgICBtYXggPSB2aWV3U2NvcGUuZW5kW3N0cl07XG4gICAgICAgIHJldHVybiAodmFsdWUgPj0gbWluICYmIHZhbHVlIDw9IG1heCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3ZlckZsb3cobm9kZSwgb2JqMSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gMDtcbiAgICAgICAgbGV0IGlzWDFJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5zdGFydC5sZWZ0LCAxKTtcbiAgICAgICAgbGV0IGlzWDJJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5lbmQubGVmdCwgMSk7XG4gICAgICAgIGxldCBpc1kxSW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuc3RhcnQudG9wLCAwKTtcbiAgICAgICAgbGV0IGlzWTJJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5lbmQudG9wLCAwKTtcbiAgICAgICAgaWYgKChpc1gxSW4gIT0gaXNYMkluKSAmJiAoaXNZMUluICE9IGlzWTJJbikpIHtcbiAgICAgICAgICAgIGlmIChpc1gxSW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNYMUluICYmIGlzWTFJbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzWDJJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAzO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSA0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKChpc1gxSW4gPT0gaXNYMkluKSkge1xuICAgICAgICAgICAgaWYgKCFpc1kxSW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gNTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWlzWTJJbiAmJiBpc1kxSW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSA2O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSBpZiAoaXNZMUluID09IGlzWTJJbikge1xuICAgICAgICAgICAgaWYgKCFpc1gxSW4gJiYgaXNYMkluKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gNztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNYMUluICYmICFpc1gySW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSA4O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4gPT0gaXNYMUluID09IGlzWDJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gOTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2V0SW1hZ2UoZXZ0KSB7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTY2FsZSA9PSAxKSByZXR1cm47XG4gICAgICAgIGxldCBub2RlID0gdGhpcy56b29tTm9kZSwgbGVmdCwgdG9wLCB0cmFucywgdywgaCwgcG9zLCBzdGFydCwgZW5kLCBwYXJlbnQsIGZsb3dUYWc7XG4gICAgICAgIHRyYW5zID0gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUobm9kZSk7XG4gICAgICAgIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgdyA9IG5vZGUuY2xpZW50V2lkdGggKiB0cmFucy5zY2FsZVg7XG4gICAgICAgIGggPSBub2RlLmNsaWVudEhlaWdodCAqIHRyYW5zLnNjYWxlWDtcbiAgICAgICAgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgICAgIHN0YXJ0ID0ge1xuICAgICAgICAgICAgbGVmdDogKDEgLSB0cmFucy5zY2FsZVgpICogdHJhbnMub2Zmc2V0WCArIHBvcy5sZWZ0ICsgdHJhbnMudHJhbnNsYXRlWCxcbiAgICAgICAgICAgIHRvcDogICgxIC0gdHJhbnMuc2NhbGVYKSAqIHRyYW5zLm9mZnNldFkgKyBwb3MudG9wICsgdHJhbnMudHJhbnNsYXRlWVxuICAgICAgICB9O1xuICAgICAgICBlbmQgPSB7XG4gICAgICAgICAgICBsZWZ0OiBzdGFydC5sZWZ0ICsgdyxcbiAgICAgICAgICAgIHRvcDogIHN0YXJ0LnRvcCArIGhcbiAgICAgICAgfTtcbiAgICAgICAgbGVmdCA9IHN0YXJ0LmxlZnQ7XG4gICAgICAgIHRvcCA9IHN0YXJ0LnRvcDtcblxuICAgICAgICBmbG93VGFnID0gb3ZlckZsb3cocGFyZW50LCB7c3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZH0pO1xuICAgICAgICBzd2l0Y2ggKGZsb3dUYWcpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAodyA8IHBhcmVudC5jbGllbnRXaWR0aCkge1xuICAgICAgICAgICAgbGVmdCA9IHBvcy5sZWZ0IC0gKHRyYW5zLnNjYWxlWCAtIDEpICogbm9kZS5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGggPCBwYXJlbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgICAgICB0b3AgPSBwb3MudG9wIC0gKHRyYW5zLnNjYWxlWCAtIDEpICogbm9kZS5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICB9XG4gICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIxMDBtc1wiO1xuICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKHRyYW5zLnRyYW5zbGF0ZVggKyBsZWZ0IC0gc3RhcnQubGVmdCwgdHJhbnMudHJhbnNsYXRlWSArIHRvcCAtIHN0YXJ0LnRvcCwgMCwgdHJhbnMuc2NhbGVYKTtcblxuICAgIH1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgX2luaXRab29tOiBpbml0Wm9vbSxcbiAgICBfc2NhbGVJbWFnZTogc2NhbGVJbWFnZSxcbiAgICBfbW92ZUltYWdlOiBtb3ZlSW1hZ2UsXG4gICAgX3Jlc2V0SW1hZ2U6IHJlc2V0SW1hZ2UsXG4gICAgX2hhbmRsZURvdWJsZVRhcDogaGFuZGxlRG91YmxlVGFwLFxuICAgIF9tb3ZlSGFuZGxlcjogbW92ZUhhbmRsZXIsXG4gICAgX2VuZEhhbmRsZXI6IGVuZEhhbmRsZXIsXG4gICAgX3N0YXJ0SGFuZGxlcjogc3RhcnRIYW5kbGVyXG59O1xuIl19
