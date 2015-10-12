(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcIsliderJs = require('../../../src/islider.js');

var _srcIsliderJs2 = _interopRequireDefault(_srcIsliderJs);

var list = [{
    'content': '<a href="http://www.baidu.com"><div class="content page0"><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div></a><div><input type="text"><input type="checkbox"></div>'
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
    isVertical: false,
    animateType: 'rotate',
    isLooping: true,
    isAutoPlay: true,
    fixPage: true
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvZGVtby9kb20vZGVmYXVsdC9tYWluLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyX2NvcmUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl9hbmltYXRlLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfYnV0dG9uLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfZG90LmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfem9vbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7NEJDQW9CLHlCQUF5Qjs7OztBQUU3QyxJQUFJLElBQUksR0FBRyxDQUFDO0FBQ1IsYUFBUyxFQUFFLDZMQUE2TDtDQUN2TSxFQUNEO0FBQ0ksYUFBUyxFQUFFLG1HQUFtRztDQUNqSCxFQUNEO0FBQ0ksYUFBUyxFQUFFLG1HQUFtRztDQUNqSCxFQUNEO0FBQ0ksYUFBUyxFQUFFLG1HQUFtRztDQUNqSCxFQUNEO0FBQ0ksYUFBUyxFQUFFLG1HQUFtRztDQUNqSCxFQUNEO0FBQ0ksYUFBUyxFQUFFLG1HQUFtRztDQUNqSCxDQUFDLENBQUM7O0FBRVAsSUFBSSxPQUFPLEdBQUcsOEJBQVk7QUFDdEIsUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUUsS0FBSztBQUNYLE9BQUcsRUFBRSxR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QyxXQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxBQUFDLENBQUMsS0FBSyxDQUFDLEdBQUksR0FBRyxHQUFHLEFBQUMsTUFBTSxHQUFHLENBQUMsR0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFLLENBQUMsR0FBRyxDQUFDLEFBQUMsQ0FBQztBQUN0RSxXQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxTQUFTLEdBQUcsMkJBQTJCLEdBQzNGLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEdBQUcsR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxHQUFHLEtBQUssQ0FBQztLQUMvRDs7QUFFRCxVQUFNLEVBQUUsY0FBVSxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQzNDLFlBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsWUFBSSxZQUFZLEdBQUcsQUFBQyxJQUFJLEtBQUssR0FBRyxHQUFJLEdBQUcsR0FBRyxHQUFHLENBQUM7QUFDOUMsWUFBSSxXQUFXLEdBQUcsQUFBQyxJQUFJLEtBQUssR0FBRyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxQyxZQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQzs7QUFFM0MsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzs7QUFFOUMsWUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1QsZUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQztTQUM3QyxNQUFNO0FBQ0gsZUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQUFBQyxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxH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QUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTdJOztBQUVMLE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDYixhQUFTLEVBQUUsUUFBUTtBQUNuQixlQUFXLEVBQUUsVUFBVTtBQUN2QixjQUFVLEVBQUUsU0FBUztBQUNyQixlQUFXLEVBQUUsVUFBVTtBQUN2QixvQkFBZ0IsRUFBRSxlQUFlO0FBQ2pDLGdCQUFZLEVBQUUsV0FBVztBQUN6QixlQUFXLEVBQUUsVUFBVTtBQUN2QixpQkFBYSxFQUFFLFlBQVk7Q0FDOUIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgaVNsaWRlciBmcm9tICcuLi8uLi8uLi9zcmMvaXNsaWRlci5qcyc7XG5cbmxldCBsaXN0ID0gW3tcbiAgICAnY29udGVudCc6ICc8YSBocmVmPVwiaHR0cDovL3d3dy5iYWlkdS5jb21cIj48ZGl2IGNsYXNzPVwiY29udGVudCBwYWdlMFwiPjxoMT5Ib21lPC9oMT48aDI+VGhpcyBpcyBob21lIHBhZ2U8L2gyPjxwPmhvbWUgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PjwvYT48ZGl2PjxpbnB1dCB0eXBlPVwidGV4dFwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIj48L2Rpdj4nXG4gICAgfSxcbiAgICB7XG4gICAgICAgICdjb250ZW50JzogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2UxXCI+PGgxPlBhZ2UxPC9oMT48aDI+VGhpcyBpcyBwYWdlMTwvaDI+PHA+cGFnZTEgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnOiAnPGRpdiBjbGFzcz1cImNvbnRlbnQgcGFnZTJcIj48aDE+UGFnZTI8L2gxPjxoMj5UaGlzIGlzIFBhZ2UyPC9oMj48cD5QYWdlMiBpcyBwcmV0dHkgYXdzb21lPC9wPjxkaXY+J1xuICAgIH0sXG4gICAge1xuICAgICAgICAnY29udGVudCc6ICc8ZGl2IGNsYXNzPVwiY29udGVudCBwYWdlM1wiPjxoMT5QYWdlMzwvaDE+PGgyPlRoaXMgaXMgUGFnZTM8L2gyPjxwPlBhZ2UzIGlzIHByZXR0eSBhd3NvbWU8L3A+PGRpdj4nXG4gICAgfSxcbiAgICB7XG4gICAgICAgICdjb250ZW50JzogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2U0XCI+PGgxPlBhZ2U0PC9oMT48aDI+VGhpcyBpcyBQYWdlNDwvaDI+PHA+UGFnZTQgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnOiAnPGRpdiBjbGFzcz1cImNvbnRlbnQgcGFnZTVcIj48aDE+UGFnZTU8L2gxPjxoMj5UaGlzIGlzIHBhZ2U1PC9oMj48cD5wYWdlNSBpcyBwcmV0dHkgYXdzb21lPC9wPjxkaXY+J1xuICAgIH1dO1xuXG5sZXQgaXNsaWRlciA9IG5ldyBpU2xpZGVyKHtcbiAgICBkYXRhOiBsaXN0LFxuICAgIHR5cGU6ICdkb20nLFxuICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpU2xpZGVyXCIpLFxuICAgIGR1cmF0aW9uOiAxMDAwLFxuICAgIGlzVmVydGljYWw6IGZhbHNlLFxuICAgIGFuaW1hdGVUeXBlOiAncm90YXRlJyxcbiAgICBpc0xvb3Bpbmc6IHRydWUsXG4gICAgaXNBdXRvUGxheTogdHJ1ZSxcbiAgICBmaXhQYWdlOiB0cnVlXG59KTtcblxuXG5cblxuXG5cblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyQ29yZSBmcm9tICcuL2lzbGlkZXJfY29yZS5qcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vcGx1Z2lucy9pc2xpZGVyX2J1dHRvbi5qcyc7XG5pbXBvcnQgRG90IGZyb20gJy4vcGx1Z2lucy9pc2xpZGVyX2RvdC5qcyc7XG5cbmNsYXNzIGlTbGlkZXIgZXh0ZW5kcyBpU2xpZGVyQ29yZSB7XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgICAvL+ebtOaOpeiwg+eUqOeItuexu+aehOmAoOWZqOi/m+ihjOWIneWni+WMllxuICAgICAgICBzdXBlciguLi5vcHRzKTtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5fYW5pbWF0ZUZ1bmNzKVxuICAgICAgICB0aGlzLmV4dGVuZChCdXR0b24sIHRoaXMpO1xuICAgICAgICB0aGlzLmV4dGVuZChEb3QsIHRoaXMpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpU2xpZGVyO1xuIiwiLyoqXG4gKiBAZmlsZSAgIGlTbGlkZXIsIGEgc2ltcGxlLCBlZmZpY2VudCBtb2JpbGUgc2xpZGVyIHNvbHV0aW9uXG4gKlxuICogQGF1dGhvciBCRUZFXG4gKiBDb250YWN0IHFiYXR5LnFpQGdtYWlsLmNvbVxuICpcbiAqIExJQ0VOU0VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9CRS1GRS9pU2xpZGVyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0cyAgICAgICAgICAgICAgICDlj4LmlbDpm4ZcbiAqIEBwYXJhbSB7RWxlbWVudH0gICAgIG9wdHMuZG9tICAgICAgICAgICAg5aSW5bGC5YWD57SgICAgICAgICBPdXRlciB3cmFwcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRzLmRhdGEgICAgICAgICAgIOaVsOaNruWIl+ihqCAgICAgICAgQ29udGVudCBkYXRhXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl9hbmltYXRlLmpzJztcbmltcG9ydCBab29tIGZyb20gJy4vcGx1Z2lucy9pc2xpZGVyX3pvb20uanMnO1xuXG5jbGFzcyBpU2xpZGVyQ29yZSB7XG4gICAgLy9FUzbkuK3mlrDlnovmnoTpgKDlmahcbiAgICBjb25zdHJ1Y3RvcihvcHRzKSB7XG4gICAgICAgIGlmICghb3B0cy5kb20pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZG9tIGVsZW1lbnQgY2FuIG5vdCBiZSBlbXB0eSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0cy5kYXRhIHx8ICFvcHRzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2RhdGEgbXVzdCBiZSBhbiBhcnJheSBhbmQgbXVzdCBoYXZlIG1vcmUgdGhhbiBvbmUgZWxlbWVudCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXh0ZW5kKFpvb20sIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX29wdHMgPSBvcHRzO1xuICAgICAgICB0aGlzLl9zZXR0aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlckhUTUwoKTtcbiAgICAgICAgdGhpcy5fYmluZEhhbmRsZXIoKTtcbiAgICB9XG5cbiAgICAvL+WunuS+i+aWueazlVxuICAgIF9zZXR0aW5nKCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuX29wdHM7XG5cbiAgICAgICAgLy8gZG9tIGVsZW1lbnQgd3JhcHBpbmcgY29udGVudFxuICAgICAgICB0aGlzLndyYXAgPSBvcHRzLmRvbTtcbiAgICAgICAgLy8geW91ciBkYXRhXG4gICAgICAgIHRoaXMuZGF0YSA9IG9wdHMuZGF0YTtcbiAgICAgICAgLy8gZGVmYXVsdCB0eXBlXG4gICAgICAgIHRoaXMudHlwZSA9IG9wdHMudHlwZSB8fCAncGljJztcbiAgICAgICAgLy8gZGVmYXVsdCBzbGlkZSBkaXJlY3Rpb25cbiAgICAgICAgdGhpcy5pc1ZlcnRpY2FsID0gb3B0cy5pc1ZlcnRpY2FsIHx8IGZhbHNlO1xuICAgICAgICAvLyBPdmVyc3ByZWFkIG1vZGVcbiAgICAgICAgdGhpcy5pc092ZXJzcHJlYWQgPSBvcHRzLmlzT3ZlcnNwcmVhZCB8fCBmYWxzZTtcbiAgICAgICAgLy8gUGxheSB0aW1lIGdhcFxuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCAyMDAwO1xuICAgICAgICAvLyBzdGFydCBmcm9tIGluaXRJbmRleCBvciAwXG4gICAgICAgIHRoaXMuaW5pdEluZGV4ID0gb3B0cy5pbml0SW5kZXggfHwgMDtcbiAgICAgICAgLy8gdG91Y2hzdGFydCBwcmV2ZW50IGRlZmF1bHQgdG8gZml4UGFnZVxuICAgICAgICBpZiAob3B0cy5maXhQYWdlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZml4UGFnZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpeFBhZ2UgPSBvcHRzLmZpeFBhZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbml0SW5kZXggPiB0aGlzLmRhdGEubGVuZ3RoIC0gMSB8fCB0aGlzLmluaXRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSB0aGlzLnNsaWRlSW5kZXggfHwgdGhpcy5pbml0SW5kZXggfHwgMDtcblxuICAgICAgICB0aGlzLmF4aXMgPSB0aGlzLmlzVmVydGljYWwgPyAnWScgOiAnWCc7XG4gICAgICAgIHRoaXMucmV2ZXJzZUF4aXMgPSB0aGlzLmF4aXMgPT09ICdZJyA/ICdYJyA6ICdZJztcblxuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy53cmFwLmNsaWVudFdpZHRoO1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMud3JhcC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHRoaXMucmF0aW8gPSB0aGlzLmhlaWdodCAvIHRoaXMud2lkdGg7XG4gICAgICAgIHRoaXMuc2NhbGUgPSBvcHRzLmlzVmVydGljYWwgPyB0aGlzLmhlaWdodCA6IHRoaXMud2lkdGg7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB5b3VyIGZpbmdlciBpcyBtb3ZpbmdcbiAgICAgICAgdGhpcy5vbnNsaWRlID0gb3B0cy5vbnNsaWRlO1xuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHlvdXIgZmluZ2VyIHRvdWNoIHRoZSBzY3JlZW5cbiAgICAgICAgdGhpcy5vbnNsaWRlc3RhcnQgPSBvcHRzLm9uc2xpZGVzdGFydDtcbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgZmluZ2VyIG1vdmUgb3V0IG9mIHRoZSBzY3JlZW5cbiAgICAgICAgdGhpcy5vbnNsaWRlZW5kID0gb3B0cy5vbnNsaWRlZW5kO1xuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBmaW5nZXIgbW92ZSBvdXQgb2YgdGhlIHNjcmVlblxuICAgICAgICB0aGlzLm9uc2xpZGVjaGFuZ2UgPSBvcHRzLm9uc2xpZGVjaGFuZ2U7XG5cbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBvcHRzLmlzTG9hZGluZztcblxuICAgICAgICB0aGlzLm9mZnNldCA9IHRoaXMub2Zmc2V0IHx8IHtYOiAwLCBZOiAwfTtcbiAgICAgICAgdGhpcy51c2Vab29tID0gb3B0cy51c2Vab29tIHx8IGZhbHNlO1xuICAgICAgICAvLyBsb29waW5nIGxvZ2ljIGFkanVzdFxuICAgICAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb29waW5nID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzQXV0b1BsYXkgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuaXNMb29waW5nID0gb3B0cy5pc0xvb3BpbmcgfHwgZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmlzQXV0b3BsYXkgPSBvcHRzLmlzQXV0b3BsYXkgfHwgZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsaXR0bGUgdHJpY2sgc2V0LCB3aGVuIHlvdSBjaG9vY2UgdGVhciAmIHZlcnRpY2FsIHNhbWUgdGltZVxuICAgICAgICAvLyBpU2xpZGVyIG92ZXJzcHJlYWQgbW9kZSB3aWxsIGJlIHNldCB0cnVlIGF1dG9tZXRpY2x5XG4gICAgICAgIGlmIChvcHRzLmFuaW1hdGVUeXBlID09PSAnY2FyZCcgJiYgdGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICB0aGlzLmlzT3ZlcnNwcmVhZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdXRvcGxheSBtb2RlXG4gICAgICAgIGlmICh0aGlzLmlzQXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudXNlWm9vbSkge1xuICAgICAgICAgICAgdGhpcy5faW5pdFpvb20ob3B0cyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkZWJ1ZyBtb2RlXG4gICAgICAgIHRoaXMubG9nID0gb3B0cy5pc0RlYnVnID8gZnVuY3Rpb24gKHN0cikge1xuICAgICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKHN0cik7XG4gICAgICAgIH0gOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHNldCBEYW1waW5nIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX3NldFVwRGFtcGluZygpO1xuICAgICAgICAvLyBzdG9wIGF1dG9wbGF5IHdoZW4gd2luZG93IGJsdXJcbiAgICAgICAgdGhpcy5fc2V0UGxheVdoZW5Gb2N1cygpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbmltYXRpb24gcGFybWFzOlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9ICAgICAgZG9tICAgICAgICAgICAgIOWbvueJh+eahOWkluWxgjxsaT7lrrnlmaggICAgICAgSW1nIHdyYXBwZXJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgIGF4aXMgICAgICAgICAgICDliqjnlLvmlrnlkJEgICAgICAgICAgICAgICAgYW5pbWF0ZSBkaXJlY3Rpb25cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIHNjYWxlICAgICAgICAgICDlrrnlmajlrr3luqYgICAgICAgICAgICAgICAgT3V0ZXIgd3JhcHBlclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgaSAgICAgICAgICAgICAgIDxsaT7lrrnlmahpbmRleCAgICAgICAgICBJbWcgd3JhcHBlcidzIGluZGV4XG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICBvZmZzZXQgICAgICAgICAg5ruR5Yqo6Led56a7ICAgICAgICAgICAgICAgIG1vdmUgZGlzdGFuY2VcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jcyA9IHtcbiAgICAgICAgICAgICdkZWZhdWx0JzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5leHRlbmQoQW5pbWF0aW9uLCB0aGlzLl9hbmltYXRlRnVuY3MpO1xuXG4gICAgICAgIC8vIHNldCBhbmltYXRlIEZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jID0gKG9wdHMuYW5pbWF0ZVR5cGUgaW4gdGhpcy5fYW5pbWF0ZUZ1bmNzKVxuICAgICAgICAgICAgPyB0aGlzLl9hbmltYXRlRnVuY3Nbb3B0cy5hbmltYXRlVHlwZV1cbiAgICAgICAgICAgIDogdGhpcy5fYW5pbWF0ZUZ1bmNzWydkZWZhdWx0J107XG4gICAgfVxuXG4gICAgLy8gZml4ZWQgYnVnIGZvciBhbmRyb2lkIGRldmljZVxuICAgIF9zZXRQbGF5V2hlbkZvY3VzKCkge1xuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBlbmFibGUgZGFtcGluZyB3aGVuIHNsaWRlciBtZWV0IHRoZSBlZGdlXG4gICAgICovXG4gICAgX3NldFVwRGFtcGluZygpIHtcbiAgICAgICAgbGV0IG9uZUluMiA9IHRoaXMuc2NhbGUgPj4gMTtcbiAgICAgICAgbGV0IG9uZUluNCA9IG9uZUluMiA+PiAxO1xuICAgICAgICBsZXQgb25lSW4xNiA9IG9uZUluNCA+PiAyO1xuXG4gICAgICAgIHRoaXMuX2RhbXBpbmcgPSBmdW5jdGlvbiAoZGlzdGFuY2UpIHtcbiAgICAgICAgICAgIGxldCBkaXMgPSBNYXRoLmFicyhkaXN0YW5jZSk7XG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xuXG4gICAgICAgICAgICBpZiAoZGlzIDwgb25lSW4yKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gZGlzID4+IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGRpcyA8IG9uZUluMiArIG9uZUluNCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArICgoZGlzIC0gb25lSW4yKSA+PiAyKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgb25lSW4xNiArICgoZGlzIC0gb25lSW4yIC0gb25lSW40KSA+PiAzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlID4gMCA/IHJlc3VsdCA6IC1yZXN1bHQ7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIHNpbmdsZSBpdGVtIGh0bWwgYnkgaWR4XG4gICAgICogQHBhcmFtIHtlbGVtZW50fSBlbCAuLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSAgaSAgLi5cbiAgICAgKi9cbiAgICBfcmVuZGVySXRlbShlbCwgaSkge1xuICAgICAgICBsZXQgaXRlbTtcbiAgICAgICAgbGV0IGh0bWw7XG4gICAgICAgIGxldCBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgbGV0IGluc2VydEltZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGh0bWwgPSBpdGVtLmhlaWdodCAvIGl0ZW0ud2lkdGggPiBzZWxmLnJhdGlvXG4gICAgICAgICAgICAgICAgPyAnPGltZyBoZWlnaHQ9XCInICsgc2VsZi5oZWlnaHQgKyAnXCIgc3JjPVwiJyArIGl0ZW0uY29udGVudCArICdcIj4nXG4gICAgICAgICAgICAgICAgOiAnPGltZyB3aWR0aD1cIicgKyBzZWxmLndpZHRoICsgJ1wiIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCI+JztcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gZ2V0IHRoZSByaWdodCBpdGVtIG9mIGRhdGFcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9vcGluZykge1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtpXSB8fCB7ZW1wdHk6IHRydWV9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGkgPCAwKSB7XG4gICAgICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtsZW4gKyBpXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA+IGxlbiAtIDEpIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2kgLSBsZW5dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGl0ZW0uZW1wdHkpIHtcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3BpYycpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc092ZXJzcHJlYWQpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oZWlnaHQgJiBpdGVtLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWcuc3JjID0gaXRlbS5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gY3VycmVudEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gY3VycmVudEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoJyArIGl0ZW0uY29udGVudCArICcpIDUwJSA1MCUgbm8tcmVwZWF0JztcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9ICdjb3Zlcic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50eXBlID09PSAnZG9tJykge1xuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gaXRlbS5jb250ZW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGxpc3QgaHRtbFxuICAgICAqL1xuICAgIF9yZW5kZXJIVE1MKCkge1xuICAgICAgICB0aGlzLm91dGVyICYmICh0aGlzLm91dGVyLmlubmVySFRNTCA9ICcnKTtcbiAgICAgICAgLy8gaW5pdGFpbCB1bCBlbGVtZW50XG4gICAgICAgIGxldCBvdXRlciA9IHRoaXMub3V0ZXIgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgb3V0ZXIuY2xhc3NOYW1lID0gJ2lzbGlkZXItb3V0ZXInO1xuICAgICAgICBvdXRlci5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDonICsgdGhpcy5oZWlnaHQgKyAncHg7d2lkdGg6JyArIHRoaXMud2lkdGhcbiAgICAgICAgICAgICsgJ3B4O21hcmdpbjowO3BhZGRpbmc6MDtsaXN0LXN0eWxlOm5vbmU7JztcblxuICAgICAgICAvL2xvYWRpbmdcbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ3BpYycgJiYgIXRoaXMubG9hZGVyICYmIHRoaXMuaXNMb2FkaW5nKSB7XG4gICAgICAgICAgICBsZXQgbG9hZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBsb2FkZXIuY2xhc3NOYW1lID0gJ2lzbGlkZXItbG9hZGVyJztcbiAgICAgICAgICAgIHRoaXMubG9hZGVyID0gbG9hZGVyO1xuICAgICAgICAgICAgdGhpcy53cmFwLmFwcGVuZENoaWxkKGxvYWRlcik7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzdG9yYWdlIGxpIGVsZW1lbnRzLCBvbmx5IHN0b3JlIDMgZWxlbWVudHMgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuICAgICAgICB0aGlzLmVscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIGxpLmNsYXNzTmFtZSA9IHRoaXMudHlwZSA9PT0gJ2RvbScgPyAnaXNsaWRlci1kb20nIDogJ2lzbGlkZXItcGljJztcbiAgICAgICAgICAgIGxpLnN0eWxlLmNzc1RleHQgPSAnaGVpZ2h0OicgKyB0aGlzLmhlaWdodCArICdweDt3aWR0aDonICsgdGhpcy53aWR0aCArICdweDsnO1xuICAgICAgICAgICAgdGhpcy5lbHMucHVzaChsaSk7XG5cbiAgICAgICAgICAgIC8vIHByZXBhcmUgc3R5bGUgYW5pbWF0aW9uXG4gICAgICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyhsaSwgdGhpcy5heGlzLCB0aGlzLnNjYWxlLCBpLCAwKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwgJiYgKHRoaXMuX29wdHMuYW5pbWF0ZVR5cGUgPT09ICdyb3RhdGUnIHx8IHRoaXMuX29wdHMuYW5pbWF0ZVR5cGUgPT09ICdmbGlwJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGxpLCAxIC0gaSArIHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obGksIGkgLSAxICsgdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dGVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2luaXRMb2FkSW1nKCk7XG4gICAgICAgIC8vIGFwcGVuZCB1bCB0byBkaXYjY2FudmFzXG4gICAgICAgIGlmICghdGhpcy5vdXRlcikge1xuICAgICAgICAgICAgdGhpcy5vdXRlciA9IG91dGVyO1xuICAgICAgICAgICAgdGhpcy53cmFwLmFwcGVuZENoaWxkKG91dGVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBwcmVsb2FkIGltZyB3aGVuIHNsaWRlQ2hhbmdlXG4gICAgICogIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggbWVhbnMgd2hpY2ggaW1hZ2Ugd2lsbCBiZSBsb2FkXG4gICAgICovXG4gICAgX3ByZWxvYWRJbWcoZGF0YUluZGV4KSB7XG4gICAgICAgIGxldCBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoO1xuICAgICAgICBsZXQgaWR4ID0gZGF0YUluZGV4O1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBsb2FkSW1nID0gZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSAmJiAhc2VsZi5kYXRhW2luZGV4XS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICBsZXQgcHJlbG9hZEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIHByZWxvYWRJbWcuc3JjID0gc2VsZi5kYXRhW2luZGV4XS5jb250ZW50O1xuICAgICAgICAgICAgICAgIHByZWxvYWRJbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRhdGFbaW5kZXhdLndpZHRoID0gcHJlbG9hZEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kYXRhW2luZGV4XS5oZWlnaHQgPSBwcmVsb2FkSW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHNlbGYuZGF0YVtpbmRleF0ubG9hZGVkID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoc2VsZi50eXBlICE9PSAnZG9tJyAmJiBsZW4gPiAzKSB7XG4gICAgICAgICAgICBsZXQgbmV4dEluZGV4ID0gKGlkeCArIDIgPiBsZW4gLSAxKSA/ICgoaWR4ICsgMikgJSBsZW4pIDogKGlkeCArIDIpO1xuICAgICAgICAgICAgbGV0IHByZXZJbmRleCA9IChpZHggLSAyIDwgMCkgPyAobGVuIC0gMiArIGlkeCkgOiAoaWR4IC0gMik7XG4gICAgICAgICAgICBsb2FkSW1nKG5leHRJbmRleCk7XG4gICAgICAgICAgICBsb2FkSW1nKHByZXZJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbjtcblxuICAgIC8qKlxuICAgICAqICBsb2FkIGV4dHJhIGltZ3Mgd2hlbiByZW5kZXJIVE1MXG4gICAgICovXG4gICAgX2luaXRMb2FkSW1nKCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgbGV0IGxlbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgICBsZXQgaWR4ID0gdGhpcy5zbGlkZUluZGV4O1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPT0gJ2RvbScgJiYgbGVuID4gMykge1xuICAgICAgICAgICAgbGV0IG5leHRJbmRleCA9IChpZHggKyAyID4gbGVuKSA/ICgoaWR4ICsgMSkgJSBsZW4pIDogKGlkeCArIDEpO1xuICAgICAgICAgICAgbGV0IHByZXZJbmRleCA9IChpZHggLSAxIDwgMCkgPyAobGVuIC0gMSArIGlkeCkgOiAoaWR4IC0gMSk7XG4gICAgICAgICAgICBkYXRhW2lkeF0ubG9hZGVkID0gMTtcbiAgICAgICAgICAgIGRhdGFbbmV4dEluZGV4XS5sb2FkZWQgPSAxO1xuICAgICAgICAgICAgaWYgKHNlbGYuaXNMb29waW5nKSB7XG4gICAgICAgICAgICAgICAgZGF0YVtwcmV2SW5kZXhdLmxvYWRlZCA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX3ByZWxvYWRJbWcoaWR4KTtcbiAgICAgICAgICAgIH0sIDIwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgc2xpZGUgbG9naWNhbCwgZ290byBkYXRhIGluZGV4XG4gICAgICogIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggdGhlIGdvdG8gaW5kZXhcbiAgICAgKi9cbiAgICBzbGlkZVRvKGRhdGFJbmRleCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgbGV0IGVscyA9IHRoaXMuZWxzO1xuICAgICAgICBsZXQgaWR4ID0gZGF0YUluZGV4O1xuICAgICAgICBsZXQgbiA9IGRhdGFJbmRleCAtIHRoaXMuc2xpZGVJbmRleDtcblxuICAgICAgICBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgICAgICBsZXQgbmV4dEVscyA9IG4gPiAwID8gdGhpcy5lbHNbMl0gOiB0aGlzLmVsc1swXTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obmV4dEVscywgaWR4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZWxvYWQgd2hlbiBzbGlkZVxuICAgICAgICB0aGlzLl9wcmVsb2FkSW1nKGlkeCk7XG5cbiAgICAgICAgLy8gZ2V0IHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgICAgICBpZiAoZGF0YVtpZHhdKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpZHg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBuID4gMCA/IDAgOiBkYXRhLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IHRoaXMuc2xpZGVJbmRleDtcbiAgICAgICAgICAgICAgICBuID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nKCdwaWMgaWR4OicgKyB0aGlzLnNsaWRlSW5kZXgpO1xuXG4gICAgICAgIC8vIGtlZXAgdGhlIHJpZ2h0IG9yZGVyIG9mIGl0ZW1zXG4gICAgICAgIGxldCBzRWxlO1xuICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsICYmICh0aGlzLl9vcHRzLmFuaW1hdGVUeXBlID09PSAncm90YXRlJyB8fCB0aGlzLl9vcHRzLmFuaW1hdGVUeXBlID09PSAnZmxpcCcpKSB7XG4gICAgICAgICAgICBpZiAobiA+IDApIHtcbiAgICAgICAgICAgICAgICBzRWxlID0gZWxzLnBvcCgpO1xuICAgICAgICAgICAgICAgIGVscy51bnNoaWZ0KHNFbGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuIDwgMCkge1xuICAgICAgICAgICAgICAgIHNFbGUgPSBlbHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBlbHMucHVzaChzRWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChuID4gMCkge1xuICAgICAgICAgICAgICAgIHNFbGUgPSBlbHMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICBlbHMucHVzaChzRWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA8IDApIHtcbiAgICAgICAgICAgICAgICBzRWxlID0gZWxzLnBvcCgpO1xuICAgICAgICAgICAgICAgIGVscy51bnNoaWZ0KHNFbGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2xpZGVjaGFuZ2Ugc2hvdWxkIHJlbmRlciBuZXcgaXRlbVxuICAgICAgICAvLyBhbmQgY2hhbmdlIG5ldyBpdGVtIHN0eWxlIHRvIGZpdCBhbmltYXRpb25cbiAgICAgICAgaWYgKG4gIT09IDApIHtcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhuKSA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGVsc1swXSwgaWR4IC0gMSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShlbHNbMl0sIGlkeCArIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhuKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0oc0VsZSwgaWR4ICsgbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzRWxlLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICBzRWxlLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc0VsZS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICAgICAgdGhpcy5vbnNsaWRlY2hhbmdlICYmIHRoaXMub25zbGlkZWNoYW5nZSh0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5kb3RjaGFuZ2UgJiYgdGhpcy5kb3RjaGFuZ2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRvIHRoZSB0cmljayBhbmltYXRpb25cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlbHNbaV0gIT09IHNFbGUpIHtcbiAgICAgICAgICAgICAgICBlbHNbaV0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgLjNzIGVhc2UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMoZWxzW2ldLCB0aGlzLmF4aXMsIHRoaXMuc2NhbGUsIGksIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcCBwbGF5aW5nIHdoZW4gbWVldCB0aGUgZW5kIG9mIGRhdGFcbiAgICAgICAgaWYgKHRoaXMuaXNBdXRvcGxheSAmJiAhdGhpcy5pc0xvb3BpbmcgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBkYXRhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBqdWRnZSB0aGUgZGV2aWNlXG4gICAgICogIEByZXR1cm4ge09iamVjdH0ge31cbiAgICAgKi9cbiAgICBfZGV2aWNlKCkge1xuICAgICAgICBsZXQgaGFzVG91Y2ggPSAhISgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KVxuICAgICAgICB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKTtcbiAgICAgICAgbGV0IHN0YXJ0RXZ0ID0gaGFzVG91Y2ggPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJztcbiAgICAgICAgbGV0IG1vdmVFdnQgPSBoYXNUb3VjaCA/ICd0b3VjaG1vdmUnIDogJ21vdXNlbW92ZSc7XG4gICAgICAgIGxldCBlbmRFdnQgPSBoYXNUb3VjaCA/ICd0b3VjaGVuZCcgOiAnbW91c2V1cCc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYXNUb3VjaDogaGFzVG91Y2gsXG4gICAgICAgICAgICBzdGFydEV2dDogc3RhcnRFdnQsXG4gICAgICAgICAgICBtb3ZlRXZ0OiBtb3ZlRXZ0LFxuICAgICAgICAgICAgZW5kRXZ0OiBlbmRFdnRcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGFsbCBldmVudCBoYW5kbGVyLCB3aGVuIG9uIFBDLCBkaXNhYmxlIGRyYWcgZXZlbnTjgIJcbiAgICAgKi9cbiAgICBfYmluZEhhbmRsZXIoKSB7XG4gICAgICAgIGxldCBvdXRlciA9IHRoaXMub3V0ZXI7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLl9kZXZpY2UoKTtcbiAgICAgICAgaWYgKCFkZXZpY2UuaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIG91dGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIG91dGVyLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2Uuc3RhcnRFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5tb3ZlRXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2UuZW5kRXZ0LCB0aGlzKTtcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHNpbXBsZSBldmVudCBkZWxlZ2F0ZSBtZXRob2RcbiAgICAgKiAgQHBhcmFtIHtzdHJpbmd9ICAgZXZ0VHlwZSAgIGV2ZW50IG5hbWVcbiAgICAgKiAgQHBhcmFtIHtzdHJpbmd9ICAgc2VsZWN0b3IgIHRoZSBzaW1wbGUgY3NzIHNlbGVjdG9yIGxpa2UgalF1ZXJ5XG4gICAgICogIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICBldmVudCBjYWxsYmFja1xuICAgICAqL1xuICAgIGJpbmQoZXZ0VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZShlKSB7XG4gICAgICAgICAgICBsZXQgZXZ0ID0gd2luZG93LmV2ZW50ID8gd2luZG93LmV2ZW50IDogZTtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGVsZUFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGVBcnJbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBkZWxlZ2F0ZShldnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGUpIHtcbiAgICAgICAgICAgIGxldCBldnQgPSB3aW5kb3cuZXZlbnQgPyB3aW5kb3cuZXZlbnQgOiBlO1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgZWxlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZUFycltpXSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICByZW1vdmVFdmVudExpc3RlbmVyIHRvIHJlbGVhc2UgdGhlIG1lbW9yeVxuICAgICAqL1xuICAgIGRlc3Ryb3kgKCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyO1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5fZGV2aWNlKCk7XG5cbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2Uuc3RhcnRFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5tb3ZlRXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2UuZW5kRXZ0LCB0aGlzKTtcbiAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcyk7XG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMpO1xuICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMpO1xuICAgICAgICB0aGlzLndyYXAuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHVuaWZvcm1pdHkgYWRtaW4gZXZlbnRcbiAgICAgKiAgQHBhcmFtIHtPYmplY3R9ICAgZXZ0ICAgZXZlbnQgb2JqXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQgKGV2dCkge1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5fZGV2aWNlKCk7XG4gICAgICAgIHN3aXRjaCAoZXZ0LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgZGV2aWNlLnN0YXJ0RXZ0OlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRldmljZS5tb3ZlRXZ0OlxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZGV2aWNlLmVuZEV2dDpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZEhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoY2FuY2VsJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZEhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29yaWVudGF0aW9uY2hhbmdlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uY2hhbmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICB0b3VjaHN0YXJ0IGNhbGxiYWNrXG4gICAgICogIEBwYXJhbSB7T2JqZWN0fSAgIGV2dCAgIGV2ZW50IG9ialxuICAgICAqL1xuICAgIHN0YXJ0SGFuZGxlciAoZXZ0KSB7XG4gICAgICAgIGlmICh0aGlzLmZpeFBhZ2UpIHtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICAgICAgaWYgKHRhcmdldC50YWdOYW1lICE9PSAnU0VMRUNUJyAmJiB0YXJnZXQudGFnTmFtZSAhPT0gJ0lOUFVUJyAmJiB0YXJnZXQudGFnTmFtZSAhPT0gJ1RFWFRBUkVBJykge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLl9kZXZpY2UoKTtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5vbnNsaWRlc3RhcnQgJiYgdGhpcy5vbnNsaWRlc3RhcnQoKTtcbiAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBiZWZvcmVzbGlkZScpO1xuXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc3RhcnRYID0gZGV2aWNlLmhhc1RvdWNoID8gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBldnQucGFnZVg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gZGV2aWNlLmhhc1RvdWNoID8gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBldnQucGFnZVk7XG4gICAgICAgIHRoaXMuX3N0YXJ0SGFuZGxlciAmJiB0aGlzLl9zdGFydEhhbmRsZXIoZXZ0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2htb3ZlIGNhbGxiYWNrXG4gICAgICogIEBwYXJhbSB7T2JqZWN0fSAgIGV2dCAgIGV2ZW50IG9ialxuICAgICAqL1xuICAgIG1vdmVIYW5kbGVyIChldnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNNb3ZpbmcpIHtcbiAgICAgICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLl9kZXZpY2UoKTtcbiAgICAgICAgICAgIGxldCBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgICAgICAgICBsZXQgcmV2ZXJzZUF4aXMgPSB0aGlzLnJldmVyc2VBeGlzO1xuICAgICAgICAgICAgbGV0IG9mZnNldCA9IHtcbiAgICAgICAgICAgICAgICBYOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLnN0YXJ0WCkgOiAoZXZ0LnBhZ2VYIC0gdGhpcy5zdGFydFgpLFxuICAgICAgICAgICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxldCByZXMgPSB0aGlzLl9tb3ZlSGFuZGxlciA/IHRoaXMuX21vdmVIYW5kbGVyKGV2dCkgOiBmYWxzZTtcbiAgICAgICAgICAgIGlmICghcmVzICYmIE1hdGguYWJzKG9mZnNldFtheGlzXSkgLSBNYXRoLmFicyhvZmZzZXRbcmV2ZXJzZUF4aXNdKSA+IDEwKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLm9uc2xpZGUgJiYgdGhpcy5vbnNsaWRlKG9mZnNldFtheGlzXSk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBvbnNsaWRlJyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXRbYXhpc10gPiAwICYmIHRoaXMuc2xpZGVJbmRleCA9PT0gMCB8fCBvZmZzZXRbYXhpc10gPCAwICYmIHRoaXMuc2xpZGVJbmRleCA9PT0gbGVuIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0W2F4aXNdID0gdGhpcy5fZGFtcGluZyhvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmVsc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAwcyc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGl0ZW0sIGF4aXMsIHRoaXMuc2NhbGUsIGksIG9mZnNldFtheGlzXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICB0b3VjaGVuZCBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge09iamVjdH0gICBldnQgICBldmVudCBvYmpcbiAgICAgKi9cbiAgICBlbmRIYW5kbGVyIChldnQpIHtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGxldCBheGlzID0gdGhpcy5heGlzO1xuICAgICAgICBsZXQgYm91bmRhcnkgPSB0aGlzLnNjYWxlIC8gMjtcbiAgICAgICAgbGV0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBhIHF1aWNrIHNsaWRlIHRpbWUgbXVzdCB1bmRlciAzMDBtc1xuICAgICAgICAvLyBhIHF1aWNrIHNsaWRlIHNob3VsZCBhbHNvIHNsaWRlIGF0IGxlYXN0IDE0IHB4XG4gICAgICAgIGJvdW5kYXJ5ID0gZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lID4gMzAwID8gYm91bmRhcnkgOiAxNDtcbiAgICAgICAgbGV0IHJlcyA9IHRoaXMuX2VuZEhhbmRsZXIgPyB0aGlzLl9lbmRIYW5kbGVyKGV2dCkgOiBmYWxzZTtcbiAgICAgICAgbGV0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldFtheGlzXSk7XG4gICAgICAgIGxldCBhYnNSZXZlcnNlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0W3RoaXMucmV2ZXJzZUF4aXNdKTtcblxuICAgICAgICBsZXQgZ2V0TGluayA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICAgICAgICAgIGlmIChlbC5ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gZWwuaHJlZlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWwuY2xhc3NOYW1lID09PSAnaXNsaWRlci1kb20nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0TGluayhlbC5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVzICYmIG9mZnNldFtheGlzXSA+PSBib3VuZGFyeSAmJiBhYnNSZXZlcnNlT2Zmc2V0IDwgYWJzT2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4IC0gMSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXJlcyAmJiBvZmZzZXRbYXhpc10gPCAtYm91bmRhcnkgJiYgYWJzUmV2ZXJzZU9mZnNldCA8IGFic09mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCArIDEpO1xuICAgICAgICB9IGVsc2UgaWYgKCFyZXMpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIHRhcCBldmVudCBpZiBvZmZzZXQgPCAxMFxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5vZmZzZXQuWCkgPCAxMCAmJiBNYXRoLmFicyh0aGlzLm9mZnNldC5ZKSA8IDEwKSB7XG4gICAgICAgICAgICB0aGlzLnRhcEV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICAgICAgdGhpcy50YXBFdnQuaW5pdEV2ZW50KCd0YXAnLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpeFBhZ2UgJiYgdGhpcy50eXBlID09PSAnZG9tJykge1xuICAgICAgICAgICAgICAgIGdldExpbmsoZXZ0LnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWV2dC50YXJnZXQuZGlzcGF0Y2hFdmVudCh0aGlzLnRhcEV2dCkpIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub2Zmc2V0LlggPSB0aGlzLm9mZnNldC5ZID0gMDtcbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuICAgICAgICB0aGlzLm9uc2xpZGVlbmQgJiYgdGhpcy5vbnNsaWRlZW5kKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDogYWZ0ZXJzbGlkZScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBvcmllbnRhdGlvbmNoYW5nZSBjYWxsYmFja1xuICAgICAqL1xuICAgIG9yaWVudGF0aW9uY2hhbmdlSGFuZGxlciAoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLnJlc2V0KCk7XG4gICAgICAgICAgICBzZWxmLmxvZygnRXZlbnQ6IG9yaWVudGF0aW9uY2hhbmdlJyk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzZXQgJiByZXJlbmRlclxuICAgICAqL1xuICAgIHJlc2V0ICgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLl9zZXR0aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlckhUTUwoKTtcbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbG9hZCBEYXRhICYgcmVuZGVyXG4gICAgICovXG4gICAgbG9hZERhdGEgKGRhdGEsIGluaXRJbmRleCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IGluaXRJbmRleCB8fCAwO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLl9yZW5kZXJIVE1MKCk7XG4gICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBlbmFibGUgYXV0b3BsYXlcbiAgICAgKi9cbiAgICBwbGF5ICgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgZHVyYXRpb24gPSB0aGlzLmR1cmF0aW9uO1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuYXV0b1BsYXlUaW1lcik7XG4gICAgICAgIHRoaXMuYXV0b1BsYXlUaW1lciA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuc2xpZGVUbyhzZWxmLnNsaWRlSW5kZXggKyAxKTtcbiAgICAgICAgfSwgZHVyYXRpb24pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhdXNlIGF1dG9wbGF5XG4gICAgICovXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5hdXRvUGxheVRpbWVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwbHVnaW4gZXh0ZW5kXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBsdWdpbiBuZWVkIHRvIGJlIHNldCB1cFxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBtYWluIGlTbGlkZXIgcHJvdG90eXBlXG4gICAgICovXG4gICAgZXh0ZW5kIChwbHVnaW4sIG1haW4pIHtcbiAgICAgICAgaWYgKCFtYWluKSB7XG4gICAgICAgICAgICBtYWluID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICBPYmplY3Qua2V5cyhwbHVnaW4pLmZvckVhY2goZnVuY3Rpb24gKHByb3BlcnR5KSB7XG4gICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobWFpbiwgcHJvcGVydHksIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IocGx1Z2luLCBwcm9wZXJ0eSkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpU2xpZGVyQ29yZTtcbiIsIi8qXG4gKiBAZmlsZSAgIEFuaW1hdGlvbiBMaWJyYXJ5XG4gKiBAYXV0aG9yIHhpZXl1MzMzMzNcbiAqL1xuXG5cbmxldCBleHRlbmRBbmltYXRpb24gPSB7XG4gICAgJ3JvdGF0ZSc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBsZXQgYmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMud3JhcC5wYXJlbnROb2RlLCBudWxsKS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0IDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47IC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOyAnXG4gICAgICAgICAgICArICdiYWNrZ3JvdW5kLWNvbG9yOicgKyBiZENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7JztcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkgKyAnZGVnKSB0cmFuc2xhdGVaKCdcbiAgICAgICAgICAgICsgKDAuODg4ICogc2NhbGUgLyAyKSArICdweCkgc2NhbGUoMC44ODgpJztcbiAgICB9LFxuXG4gICAgJ2ZsaXAnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgbGV0IGJkQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLndyYXAucGFyZW50Tm9kZSwgbnVsbCkuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICdwb3NpdGlvbjphYnNvbHV0ZTsgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjsgYmFja2dyb3VuZC1jb2xvcjonICsgYmRDb2xvciArICc7JztcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKCcgKyAoc2NhbGUgLyAyKSArICdweCkgcm90YXRlJyArIHJvdGF0ZURpcmVjdFxuICAgICAgICAgICAgKyAnKCcgKyAxODAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkgKyAnZGVnKSBzY2FsZSgwLjg3NSknO1xuICAgIH0sXG5cbiAgICAnZGVwdGgnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoNCAtIE1hdGguYWJzKGkgLSAxKSkgKiAwLjE4O1xuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG4gICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSA9PT0gMSkgPyAxMDAgOiAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpIDogKGkgLSAxKTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJ1xuICAgICAgICAgICAgKyBheGlzICsgJygnICsgKG9mZnNldCArIDEuMyAqIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9LFxuXG4gICAgJ2Zsb3cnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgbGV0IGRpcmVjdEFtZW5kID0gKGF4aXMgPT09ICdYJykgPyAxIDogLTE7XG4gICAgICAgIGxldCBvZmZzZXRSYXRpbyA9IE1hdGguYWJzKG9mZnNldCAvIHNjYWxlKTtcblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMC43LCAwLjcpIHRyYW5zbGF0ZVooJyArIChvZmZzZXRSYXRpbyAqIDE1MCAtIDE1MCkgKiBNYXRoLmFicyhpIC0gMSkgKyAncHgpJ1xuICAgICAgICAgICAgKyAndHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknXG4gICAgICAgICAgICArICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgZGlyZWN0QW1lbmQgKiAoMzAgLSBvZmZzZXRSYXRpbyAqIDMwKSAqICgxIC0gaSkgKyAnZGVnKSc7XG4gICAgfSxcblxuICAgICdjYXJkJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDAgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvbS5jdXIgJiYgZG9tLmN1ciAhPT0gaSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IG51bGw7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHpvb21TY2FsZSA9IChkb20uY3VyKSA/IDEgLSAwLjIgKiBNYXRoLmFicyhpIC0gMSkgLSBNYXRoLmFicygwLjIgKiBvZmZzZXQgLyBzY2FsZSkudG9GaXhlZCg2KSA6IDE7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzXG4gICAgICAgICAgICArICcoJyArICgoMSArIE1hdGguYWJzKGkgLSAxKSAqIDAuMikgKiBvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfVxufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZEFuaW1hdGlvbjtcbiIsIi8qXG4gKiBAZmlsZSAgIFRvIGNyZWF0ZSByaWdodCZsZWZ0IGJvdHRvbiBvbiBpU2xpZGVyXG4gKiBAYXV0aG9yIHhpZXl1MzMzMzNcbiAqL1xuXG5mdW5jdGlvbiBhZGRCdG4oKSB7XG4gICAgaWYgKCF0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgbGV0IGJ0bk91dGVyID0gW107XG4gICAgICAgIGxldCBidG5Jbm5lciA9IFtdO1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICBidG5PdXRlcltpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItYnRuLW91dGVyJztcbiAgICAgICAgICAgIGJ0bklubmVyW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBidG5Jbm5lcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4taW5uZXInO1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmNsYXNzTmFtZSArPSAnIGxlZnQnO1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgKz0gJyByaWdodCc7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpciA9IHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdkaXInKSwgMTApO1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVUbyhzZWxmLnNsaWRlSW5kZXggKyBkaXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJ0bk91dGVyW2ldLmFwcGVuZENoaWxkKGJ0bklubmVyW2ldKTtcbiAgICAgICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZChidG5PdXRlcltpXSwgdGhpcy53cmFwLm5leHRTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7YWRkQnRufTtcbiIsIi8qXG4gKiBAZmlsZSAgIFRvIGNyZWF0ZSBkb3RzIGluZGV4IG9uIGlTbGlkZXJcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbmZ1bmN0aW9uIGFkZERvdCgpIHtcbiAgICBpZiAoIXRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICBsZXQgZG90cyA9IFtdO1xuICAgICAgICBsZXQgZG90V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGRvdFdyYXAuY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90LXdyYXAnO1xuICAgICAgICBsZXQgZnJlZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZG90c1tpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdCc7XG4gICAgICAgICAgICBkb3RzW2ldLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBpKTtcbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb3RzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdpbmRleCcpLCAxMCk7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZVRvKGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnJlZ21lbnQuYXBwZW5kQ2hpbGQoZG90c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgZG90V3JhcC5hcHBlbmRDaGlsZChmcmVnbWVudCk7XG4gICAgICAgIHRoaXMud3JhcC5wYXJlbnROb2RlLmFwcGVuZENoaWxkKGRvdFdyYXApO1xuXG4gICAgICAgIHRoaXMuZG90Y2hhbmdlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3QnO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge2FkZERvdH07XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkgbGl1aHVpMDEgb24gMjAxNS8xLzcuXG4gKi9cblxuICAgIGxldCBoYXMzZCA9ICgnV2ViS2l0Q1NTTWF0cml4JyBpbiB3aW5kb3cgJiYgJ20xMScgaW4gbmV3IFdlYktpdENTU01hdHJpeCgpKTtcbiAgICBsZXQgbWluU2NhbGUgPSAxLzI7XG4gICAgbGV0IHZpZXdTY29wZSA9IHt9O1xuXG4gICAgZnVuY3Rpb24gZ2VuZXJhdGVUcmFuc2xhdGUoeCwgeSwgeiwgc2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlXCIgKyAoaGFzM2QgPyBcIjNkKFwiIDogXCIoXCIpICsgeCArIFwicHgsXCIgKyB5ICsgKGhhczNkID8gXCJweCxcIiArIHogKyBcInB4KVwiIDogXCJweClcIikgKyBcInNjYWxlKFwiICsgc2NhbGUgKyBcIilcIjtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RGlzdGFuY2UoYSxiKXtcbiAgICAgICAgbGV0IHgseTtcbiAgICAgICAgeD0gYS5sZWZ0IC0gYi5sZWZ0O1xuICAgICAgICB5PSBhLnRvcCAtIGIudG9wO1xuICAgICAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbih4LCB5KSB7XG4gICAgICAgIHJldHVybiB4ICsgXCJweCBcIiArIHkgKyBcInB4XCI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFRvdWNoZXModG91Y2hlcyl7XG4gICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0b3VjaGVzKS5tYXAoZnVuY3Rpb24odG91Y2gpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBsZWZ0OiB0b3VjaC5wYWdlWCxcbiAgICAgICAgICAgICAgICB0b3A6IHRvdWNoLnBhZ2VZXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVTY2FsZShzdGFydCxlbmQpe1xuICAgICAgICBsZXQgc3RhcnREaXN0YW5jZT1nZXREaXN0YW5jZShzdGFydFswXSxzdGFydFsxXSk7XG4gICAgICAgIGxldCBlbmREaXN0YW5jZT1nZXREaXN0YW5jZShlbmRbMF0sZW5kWzFdKTtcbiAgICAgICAgcmV0dXJuIGVuZERpc3RhbmNlL3N0YXJ0RGlzdGFuY2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUob2JqKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYOiAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWTogMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVo6IDAsXG4gICAgICAgICAgICBzY2FsZVg6IDEsXG4gICAgICAgICAgICBzY2FsZVk6IDEsXG4gICAgICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICAgICAgb2Zmc2V0WTogMFxuICAgICAgICB9O1xuICAgICAgICBsZXQgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwO1xuICAgICAgICBpZiAoIXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIHx8ICFvYmopIHJldHVybiByZXN1bHQ7XG4gICAgICAgIGxldCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG9iaiksIHRyYW5zZm9ybSwgb3JpZ2luO1xuICAgICAgICB0cmFuc2Zvcm0gPSBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICAgICAgICBvcmlnaW4gPSBzdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gfHwgc3R5bGUubW96VHJhbnNmb3JtT3JpZ2luO1xuICAgICAgICBsZXQgcGFyID0gb3JpZ2luLm1hdGNoKC8oLiopcHhcXHMrKC4qKXB4Lyk7XG4gICAgICAgIGlmIChwYXIubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgb2Zmc2V0WCA9IHBhclsxXSAtIDA7XG4gICAgICAgICAgICBvZmZzZXRZID0gcGFyWzJdIC0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHJhbnNmb3JtID09IFwibm9uZVwiKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICBsZXQgbWF0M2QgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gICAgICAgIGxldCBtYXQyZCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeFxcKCguKylcXCkkLyk7XG4gICAgICAgIGlmIChtYXQzZCkge1xuICAgICAgICAgICAgbGV0IHN0ciA9IG1hdDNkWzFdLnNwbGl0KCcsICcpO1xuICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IHN0clsxMl0gLSAwLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0clsxM10gLSAwLFxuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVo6IHN0clsxNF0gLSAwLFxuICAgICAgICAgICAgICAgIG9mZnNldFg6ICAgIG9mZnNldFggLSAwLFxuICAgICAgICAgICAgICAgIG9mZnNldFk6ICAgIG9mZnNldFkgLSAwLFxuICAgICAgICAgICAgICAgIHNjYWxlWDogICAgIHN0clswXSAtIDAsXG4gICAgICAgICAgICAgICAgc2NhbGVZOiAgICAgc3RyWzVdIC0gMCxcbiAgICAgICAgICAgICAgICBzY2FsZVo6ICAgICBzdHJbMTBdIC0gMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIGlmIChtYXQyZCkge1xuICAgICAgICAgICAgbGV0IHN0ciA9IG1hdDJkWzFdLnNwbGl0KCcsICcpO1xuICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IHN0cls0XSAtIDAsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWTogc3RyWzVdIC0gMCxcbiAgICAgICAgICAgICAgICBvZmZzZXRYOiAgICBvZmZzZXRYIC0gMCxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiAgICBvZmZzZXRZIC0gMCxcbiAgICAgICAgICAgICAgICBzY2FsZVg6ICAgICBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgICAgIHNjYWxlWTogICAgIHN0clszXSAtIDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDZW50ZXIoYSwgYikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogKGEueCArIGIueCkgLyAyLFxuICAgICAgICAgICAgeTogKGEueSArIGIueSkgLyAyXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvL+WIneWni+WMlue8qeaUvuWPguaVsOetiVxuICAgIGZ1bmN0aW9uIGluaXRab29tKG9wdHMpIHtcbiAgICAgICAgdGhpcy5jdXJyZW50U2NhbGUgPSAxO1xuICAgICAgICB0aGlzLnpvb21GYWN0b3IgPSBvcHRzLnpvb21GYWN0b3IgfHwgMjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzdGFydEhhbmRsZXIoZXZ0KSB7XG4gICAgICAgIGlmICh0aGlzLnVzZVpvb20pIHtcbiAgICAgICAgICAgIGxldCBub2RlID0gdGhpcy5lbHNbMV0ucXVlcnlTZWxlY3RvcignaW1nJyk7XG4gICAgICAgICAgICBsZXQgdHJhbnNmb3JtID0gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUobm9kZSk7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0VG91Y2hlcz1nZXRUb3VjaGVzKGV2dC50YXJnZXRUb3VjaGVzKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0WCA9IHRyYW5zZm9ybS50cmFuc2xhdGVYIC0gMDtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0WSA9IHRyYW5zZm9ybS50cmFuc2xhdGVZIC0gMDtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFNjYWxlID0gdHJhbnNmb3JtLnNjYWxlWDtcbiAgICAgICAgICAgIHRoaXMuem9vbU5vZGUgPSBub2RlO1xuICAgICAgICAgICAgbGV0IHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgICAgICAgICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJnZXN0dXJlXCIpO1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdFRvdWNoU3RhcnQgPSBudWxsO1xuICAgICAgICAgICAgICAgIGxldCB0b3VjaGVzID0gZXZ0LnRvdWNoZXM7XG4gICAgICAgICAgICAgICAgbGV0IHRvdWNoQ2VudGVyID0gZ2V0Q2VudGVyKHtcbiAgICAgICAgICAgICAgICAgICAgeDogdG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG91Y2hlc1swXS5wYWdlWVxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgeDogdG91Y2hlc1sxXS5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgeTogdG91Y2hlc1sxXS5wYWdlWVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4odG91Y2hDZW50ZXIueCAtIHBvcy5sZWZ0LCB0b3VjaENlbnRlci55IC0gcG9zLnRvcCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGxldCB0aW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmdlc3R1cmUgPSAwO1xuICAgICAgICAgICAgICAgIGlmICh0aW1lIC0gdGhpcy5sYXN0VG91Y2hTdGFydCA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXN0dXJlID0gMztcblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RUb3VjaFN0YXJ0ID0gdGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZUhhbmRsZXIoZXZ0KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAwLCBub2RlID0gdGhpcy56b29tTm9kZTtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuX2RldmljZSgpO1xuICAgICAgICBpZiAoZGV2aWNlLmhhc1RvdWNoKSB7XG4gICAgICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAyICYmIHRoaXMudXNlWm9vbSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NhbGVJbWFnZShldnQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PSAxICYmIHRoaXMudXNlWm9vbSAmJiB0aGlzLmN1cnJlbnRTY2FsZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX21vdmVJbWFnZShldnQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmdlc3R1cmUgPSByZXN1bHQ7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVEb3VibGVUYXAoZXZ0KSB7XG4gICAgICAgIGxldCB6b29tRmFjdG9yID0gdGhpcy56b29tRmFjdG9yIHx8IDI7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy56b29tTm9kZTtcbiAgICAgICAgbGV0IHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgICAgICB0aGlzLmN1cnJlbnRTY2FsZSA9IHRoaXMuY3VycmVudFNjYWxlID09IDEgPyB6b29tRmFjdG9yIDogMTtcbiAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSgwLCAwLCAwLCB0aGlzLmN1cnJlbnRTY2FsZSk7XG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRTY2FsZSAhPSAxKSBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKGV2dC50b3VjaGVzWzBdLnBhZ2VYIC0gcG9zLmxlZnQsIGV2dC50b3VjaGVzWzBdLnBhZ2VZIC0gcG9zLnRvcCk7XG5cbiAgICB9XG5cbiAgICAvL+e8qeaUvuWbvueJh1xuICAgIGZ1bmN0aW9uIHNjYWxlSW1hZ2UoZXZ0KSB7XG4gICAgICAgIGxldCBtb3ZlVG91Y2VzID0gZ2V0VG91Y2hlcyhldnQudGFyZ2V0VG91Y2hlcyk7XG4gICAgICAgIGxldCBzY2FsZSA9IGNhbGN1bGF0ZVNjYWxlKHRoaXMuc3RhcnRUb3VjaGVzLG1vdmVUb3VjZXMpO1xuICAgICAgICBldnQuc2NhbGUgPSBldnQuc2NhbGUgfHwgc2NhbGU7XG4gICAgICAgIGxldCBub2RlID0gdGhpcy56b29tTm9kZTtcbiAgICAgICAgc2NhbGUgPSB0aGlzLmN1cnJlbnRTY2FsZSAqIGV2dC5zY2FsZSA8IG1pblNjYWxlP21pblNjYWxlOnRoaXMuY3VycmVudFNjYWxlICogZXZ0LnNjYWxlO1xuICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKDAsIDAsIDAsIHNjYWxlKTtcblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZEhhbmRsZXIoZXZ0KSB7XG4gICAgICAgIGxldCByZXN1bHQgPSAwO1xuICAgICAgICBpZiAodGhpcy5nZXN0dXJlID09PSAyKSB7Ly/lj4zmiYvmjIcgdG9kb1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmdlc3R1cmUgPT0gMSkgey8v5pS+5aSn5ouW5ou9IHRvZG9cbiAgICAgICAgICAgIHRoaXMuX3Jlc2V0SW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5nZXN0dXJlID09PSAzKSB7Ly/lj4zlh7tcbiAgICAgICAgICAgIHRoaXMuX2hhbmRsZURvdWJsZVRhcChldnQpO1xuICAgICAgICAgICAgdGhpcy5fcmVzZXRJbWFnZShldnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvL+aLluaLveWbvueJh1xuICAgIGZ1bmN0aW9uIG1vdmVJbWFnZShldnQpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnpvb21Ob2RlO1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5fZGV2aWNlKCk7XG4gICAgICAgIGxldCBvZmZzZXQgPSB7XG4gICAgICAgICAgICBYOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLnN0YXJ0WCkgOiAoZXZ0LnBhZ2VYIC0gdGhpcy5zdGFydFgpLFxuICAgICAgICAgICAgWTogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5zdGFydFkpIDogKGV2dC5wYWdlWSAtIHRoaXMuc3RhcnRZKVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1vdmVPZmZzZXQgPSB7XG4gICAgICAgICAgICB4OiB0aGlzLl9zdGFydFggKyBvZmZzZXQuWCAtIDAsXG4gICAgICAgICAgICB5OiB0aGlzLl9zdGFydFkgKyBvZmZzZXQuWSAtIDBcbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSh0aGlzLm1vdmVPZmZzZXQueCwgdGhpcy5tb3ZlT2Zmc2V0LnksIDAsIHRoaXMuY3VycmVudFNjYWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQb3NpdGlvbihlbGVtZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB7XCJsZWZ0XCI6IDAsIFwidG9wXCI6IDB9O1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICBwb3MudG9wICs9IGVsZW1lbnQub2Zmc2V0VG9wIHx8IDA7XG4gICAgICAgICAgICBwb3MubGVmdCArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZSAoZWxlbWVudCk7XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsdWVJblZpZXdTY29wZShub2RlLCB2YWx1ZSwgdGFnKSB7XG4gICAgICAgIGxldCBtaW4sIG1heDtcbiAgICAgICAgbGV0IHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgICAgICB2aWV3U2NvcGUgPSB7XG4gICAgICAgICAgICBzdGFydDoge2xlZnQ6IHBvcy5sZWZ0LCB0b3A6IHBvcy50b3B9LFxuICAgICAgICAgICAgZW5kOiB7bGVmdDogcG9zLmxlZnQgKyBub2RlLmNsaWVudFdpZHRoLCB0b3A6IHBvcy50b3AgKyBub2RlLmNsaWVudEhlaWdodH1cbiAgICAgICAgfTtcbiAgICAgICAgbGV0IHN0ciA9IHRhZyA9PSAxID8gXCJsZWZ0XCIgOiBcInRvcFwiO1xuICAgICAgICBtaW4gPSB2aWV3U2NvcGUuc3RhcnRbc3RyXTtcbiAgICAgICAgbWF4ID0gdmlld1Njb3BlLmVuZFtzdHJdO1xuICAgICAgICByZXR1cm4gKHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG92ZXJGbG93KG5vZGUsIG9iajEpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IDA7XG4gICAgICAgIGxldCBpc1gxSW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuc3RhcnQubGVmdCwgMSk7XG4gICAgICAgIGxldCBpc1gySW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuZW5kLmxlZnQsIDEpO1xuICAgICAgICBsZXQgaXNZMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LnRvcCwgMCk7XG4gICAgICAgIGxldCBpc1kySW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuZW5kLnRvcCwgMCk7XG4gICAgICAgIGlmICgoaXNYMUluICE9IGlzWDJJbikgJiYgKGlzWTFJbiAhPSBpc1kySW4pKSB7XG4gICAgICAgICAgICBpZiAoaXNYMUluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiBpc1kxSW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1gySW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICgoaXNYMUluID09IGlzWDJJbikpIHtcbiAgICAgICAgICAgIGlmICghaXNZMUluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFpc1kySW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gNjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4pIHtcbiAgICAgICAgICAgIGlmICghaXNYMUluICYmIGlzWDJJbikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiAhaXNYMkluKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gODtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpc1kxSW4gPT0gaXNZMkluID09IGlzWDFJbiA9PSBpc1gySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNldEltYWdlKGV2dCkge1xuICAgICAgICBpZiAodGhpcy5jdXJyZW50U2NhbGUgPT0gMSkgcmV0dXJuO1xuICAgICAgICBsZXQgbm9kZSA9IHRoaXMuem9vbU5vZGUsIGxlZnQsIHRvcCwgdHJhbnMsIHcsIGgsIHBvcywgc3RhcnQsIGVuZCwgcGFyZW50LCBmbG93VGFnO1xuICAgICAgICB0cmFucyA9IGdldENvbXB1dGVkVHJhbnNsYXRlKG5vZGUpO1xuICAgICAgICBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgICAgIHcgPSBub2RlLmNsaWVudFdpZHRoICogdHJhbnMuc2NhbGVYO1xuICAgICAgICBoID0gbm9kZS5jbGllbnRIZWlnaHQgKiB0cmFucy5zY2FsZVg7XG4gICAgICAgIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgICAgICBzdGFydCA9IHtcbiAgICAgICAgICAgIGxlZnQ6ICgxIC0gdHJhbnMuc2NhbGVYKSAqIHRyYW5zLm9mZnNldFggKyBwb3MubGVmdCArIHRyYW5zLnRyYW5zbGF0ZVgsXG4gICAgICAgICAgICB0b3A6ICAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRZICsgcG9zLnRvcCArIHRyYW5zLnRyYW5zbGF0ZVlcbiAgICAgICAgfTtcbiAgICAgICAgZW5kID0ge1xuICAgICAgICAgICAgbGVmdDogc3RhcnQubGVmdCArIHcsXG4gICAgICAgICAgICB0b3A6ICBzdGFydC50b3AgKyBoXG4gICAgICAgIH07XG4gICAgICAgIGxlZnQgPSBzdGFydC5sZWZ0O1xuICAgICAgICB0b3AgPSBzdGFydC50b3A7XG5cbiAgICAgICAgZmxvd1RhZyA9IG92ZXJGbG93KHBhcmVudCwge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9KTtcbiAgICAgICAgc3dpdGNoIChmbG93VGFnKSB7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHcgPCBwYXJlbnQuY2xpZW50V2lkdGgpIHtcbiAgICAgICAgICAgIGxlZnQgPSBwb3MubGVmdCAtICh0cmFucy5zY2FsZVggLSAxKSAqIG5vZGUuY2xpZW50V2lkdGggLyAyO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoIDwgcGFyZW50LmNsaWVudEhlaWdodCkge1xuICAgICAgICAgICAgdG9wID0gcG9zLnRvcCAtICh0cmFucy5zY2FsZVggLSAxKSAqIG5vZGUuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMTAwbXNcIjtcbiAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSh0cmFucy50cmFuc2xhdGVYICsgbGVmdCAtIHN0YXJ0LmxlZnQsIHRyYW5zLnRyYW5zbGF0ZVkgKyB0b3AgLSBzdGFydC50b3AsIDAsIHRyYW5zLnNjYWxlWCk7XG5cbiAgICB9XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIF9pbml0Wm9vbTogaW5pdFpvb20sXG4gICAgX3NjYWxlSW1hZ2U6IHNjYWxlSW1hZ2UsXG4gICAgX21vdmVJbWFnZTogbW92ZUltYWdlLFxuICAgIF9yZXNldEltYWdlOiByZXNldEltYWdlLFxuICAgIF9oYW5kbGVEb3VibGVUYXA6IGhhbmRsZURvdWJsZVRhcCxcbiAgICBfbW92ZUhhbmRsZXI6IG1vdmVIYW5kbGVyLFxuICAgIF9lbmRIYW5kbGVyOiBlbmRIYW5kbGVyLFxuICAgIF9zdGFydEhhbmRsZXI6IHN0YXJ0SGFuZGxlclxufTtcbiJdfQ==
