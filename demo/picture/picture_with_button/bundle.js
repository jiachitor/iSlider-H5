(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcIsliderJs = require('../../../src/islider.js');

var _srcIsliderJs2 = _interopRequireDefault(_srcIsliderJs);

require('../../../src/plugins/button.js');

require('../../../src/plugins/dot.js');

require('../../../src/plugins/zoompic.js');

var list = [{ content: "../imgs/high/1.jpg" }, { content: "../imgs/high/2.jpg" }, { content: "../imgs/high/3.jpg" }, { content: "../imgs/high/4.jpg" }, { content: "../imgs/high/5.jpg" }, { content: "../imgs/high/6.jpg" }, { content: "../imgs/high/7.jpg" }, { content: "../imgs/high/8.jpg" }, { content: "../imgs/high/9.jpg" }];

var islider = new _srcIsliderJs2['default']({
    type: 'pic',
    data: list,
    dom: document.getElementById("iSlider-wrapper"),
    isLooping: true,
    plugins: ['button', ['zoompic', { currentScale: 1, zoomFactor: 2 }]]
});

islider.fire('initialize');
islider._renderWrapper();
islider._initPlugins();
islider._bindHandler();

},{"../../../src/islider.js":2,"../../../src/plugins/button.js":3,"../../../src/plugins/dot.js":4,"../../../src/plugins/zoompic.js":5}],2:[function(require,module,exports){
(function (global){
/**
 * A simple, efficent mobile slider solution
 * @file iSlider.js
 * @author BE-FE Team
 *    qbaty qbaty.qi@gmail.com
 *    xieyu33333 xieyu33333@gmail.com
 *    shinate shine.wangrs@gmail.com
 *
 * @LICENSE https://github.com/BE-FE/iSlider/blob/master/LICENSE
 */

'use strict';

/**
 * Check in array
 * @param oElement
 * @param aSource
 * @returns {boolean}
 */
Object.defineProperty(exports, '__esModule', {
    value: true
});
function inArray(oElement, aSource) {
    return aSource.indexOf(oElement) > -1;
};

/**
 * Check is array
 * @param o
 * @returns {boolean}
 */
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
};

/**
 * @param obj
 * @param cls
 * @returns {Array|{index: number, input: string}}
 */
function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

/**
 * @param obj
 * @param cls
 */
function addClass(obj, cls) {
    if (!hasClass(obj, cls)) {
        obj.className += ' ' + cls;
    }
}

/**
 * @param obj
 * @param cls
 */
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        obj.className = obj.className.replace(RegExp('(\\s|^)' + cls + '(\\s|$)'), '');
    }
}

/**
 * Checck is url
 * @param {string} url
 * @returns {boolean}
 */
function isUrl(url) {
    if (/<\/?[^>]*>/g.test(url)) return false;

    var regex = '^' + '(((https|http|ftp|rtsp|mms):)?//)?' + '(([0-9a-z_!~*\'().&=+$%-]+: )?[0-9a-z_!~*\'().&=+$%-]+@)?' + '(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*\'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})?' + '(:[0-9]{1,4})?' + '([^\?#]+)?' + '(\\\?[^#]+)?' + '(#.+)?' + '$';
    return new RegExp(regex).test(url);
}

/**
 * @constructor
 *
 * iSlicer([[{Element} container,] {Array} datalist,] {object} options)
 *
 * @param {Element} container
 * @param {Array} datalist
 * @param {Object} options
 *
 * @description
 *  options.dom > container
 *  options.data > datalist
 */
var iSlider = function iSlider() {

    var args = Array.prototype.slice.call(arguments, 0, 3);
    if (!args.length) {
        throw new Error('Parameters required!');
    }

    var opts = Object.prototype.toString.call(args.slice(-1)[0]) === '[object Object]' ? args.pop() : {};

    switch (args.length) {
        case 2:
            opts.data = opts.data || args[1];
        case 1:
            opts.dom = opts.dom || args[0];
    }

    if (!opts.dom) {
        throw new Error('Container can not be empty!');
    }

    if (!opts.data || !opts.data.length) {
        throw new Error('Data must be an array and must have more than one element!');
    }

    /**
     * Options
     * @private
     */
    this._opts = opts;

    /**
     * listener
     * @type {{}}
     * @private
     */
    this._LSN = {};

    /**
     * Event handle
     * @type {{}}
     * @private
     */
    this._EventHandle = {};

    opts = args = null;

    this._setting();

    this.fire('initialize');
    this._renderWrapper();
    this._initPlugins();
    this._bindHandler();
};

/**
 * Event white list
 * @type {Array}
 * @protected
 */
iSlider.EVENTS = 'initialize slide slideStart slideEnd slideChange slideChanged slideRestore slideRestored reloadData reset destroy'.split(' ');

/**
 * Easing white list
 * @type [Array, RegExp[]]
 * @protected
 */
iSlider.EASING = ['linear ease ease-in ease-out ease-in-out'.split(' '), /cubic-bezier\(([^\d]*(\d+.?\d*)[^\,]*\,?){4}\)/];

/**
 * TAGS whitelist on fixpage mode
 * @type {Array}
 * @protected
 */
iSlider.FIX_PAGE_TAGS = 'SELECT INPUT TEXTAREA BUTTON LABEL'.split(' ');

/**
 * The empty function
 * @private
 */
iSlider.EMPTY_FUNCTION = function () {};

/**
 * Extend
 * @public
 */
iSlider.extend = function () {
    var main,
        extend,
        args = arguments;

    switch (args.length) {
        case 0:
            return;
        case 1:
            main = iSlider.prototype;
            extend = args[0];
            break;
        case 2:
            main = args[0];
            extend = args[1];
            break;
    }

    for (var property in extend) {
        if (extend.hasOwnProperty(property)) {
            main[property] = extend[property];
        }
    }
};

/**
 * Plugins
 * @type {{}}
 * @protected
 */
iSlider.plugins = {};

/**
 * @param name
 * @param plugin
 * @public
 */
iSlider.regPlugin = function (name, plugin) {
    iSlider.plugins[name] = iSlider.plugins[name] || plugin;
};

/**
 * animation parmas:
 *
 * @param {Element} dom 图片的外层<li>容器 Img wrapper
 * @param {String} axis 动画方向 animate direction
 * @param {Number} scale 容器宽度 Outer wrapper
 * @param {Number} i <li>容器index Img wrapper's index
 * @param {Number} offset 滑动距离 move distance
 * @protected
 */
iSlider._animateFuncs = {
    'default': function _default(dom, axis, scale, i, offset) {
        dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
    }
};

/**
 * @returns {string}
 * @private
 */
iSlider._transitionEndEvent = (function () {
    var evtName;
    return function () {
        if (evtName) {
            return evtName;
        }
        var el = document.createElement('fakeElement');
        var transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd'
        };
        for (var t in transitions) {
            if (transitions.hasOwnProperty(t) && el.style[t] !== undefined) {
                return evtName = transitions[t];
            }
        }
    };
})();

/**
 * This is a alias, conducive to compression
 * @type {Object}
 */
var iSliderPrototype = iSlider.prototype;

/**
 * & iSlider.extend
 * @public
 */
iSliderPrototype.extend = iSlider.extend;

/**
 * setting parameters for slider
 * @private
 */
iSliderPrototype._setting = function () {

    /**
     * The plugins
     * @type {Array|{}|*}
     * @private
     */
    this._plugins = iSlider.plugins;

    /**
     *
     * @type {{default: Function}|*}
     * @private
     */
    this._animateFuncs = iSlider._animateFuncs;

    /**
     * @type {boolean}
     * @private
     */
    this.holding = false;

    /**
     * @type {boolean}
     * @private
     */
    this.locking = false;

    // --------------------------------
    // - Set options
    // --------------------------------

    var opts = this._opts;

    /**
     * dom element wrapping content
     * @type {Element}
     * @public
     */
    this.wrap = opts.dom;

    /**
     * Data list
     * @type {Array}
     * @public
     */
    this.data = opts.data;

    /**
     * default slide direction
     * @type {boolean}
     * @public
     */
    this.isVertical = !!opts.isVertical;

    /**
     * Overspread mode
     * @type {boolean}
     * @public
     */
    this.isOverspread = !!opts.isOverspread;

    /**
     * Play time gap
     * @type {number}
     * @public
     */
    this.duration = opts.duration || 2000;

    /**
     * start from initIndex or 0
     * @type {number}
     * @public
     */
    this.initIndex = opts.initIndex > 0 && opts.initIndex < opts.data.length - 1 ? opts.initIndex : 0;

    /**
     * touchstart prevent default to fixPage
     * @type {boolean}
     * @public
     */
    this.fixPage = opts.fixPage == null ? true : !!opts.fixPage;

    /**
     * slideIndex
     * @type {number}
     * @private
     */
    this.slideIndex = this.slideIndex || this.initIndex || 0;

    /**
     * Axis
     * @type {string}
     * @public
     */
    this.axis = this.isVertical ? 'Y' : 'X';

    /**
     * reverseAxis
     * @type {string}
     * @private
     */
    this.reverseAxis = this.axis === 'Y' ? 'X' : 'Y';

    /**
     * Wrapper width
     * @type {number}
     * @private
     */
    this.width = this.wrap.clientWidth;

    /**
     * Wrapper height
     * @type {number}
     * @private
     */
    this.height = this.wrap.clientHeight;

    /**
     * Ratio height:width
     * @type {number}
     * @private
     */
    this.ratio = this.height / this.width;

    /**
     * Scale, size rule
     * @type {number}
     * @private
     */
    this.scale = this.isVertical ? this.height : this.width;

    /**
     * On slide offset position
     * @type {{X: number, Y: number}}
     * @private
     */
    this.offset = this.offset || {
        X: 0,
        Y: 0
    };

    /**
     * Enable/disable touch events
     * @type {boolean}
     * @private
     */
    this.isTouchable = opts.isTouchable == null ? true : !!opts.isTouchable;

    /**
     * looping logic adjust
     * @type {boolean}
     * @private
     */
    this.isLooping = opts.isLooping && this.data.length > 1 ? true : false;

    /**
     * AutoPlay waitting milsecond to start
     * @type {number}
     * @private
     */
    this.delay = opts.delay || 0;

    /**
     * autoplay logic adjust
     * @type {boolean}
     * @private
     */
    this.isAutoplay = opts.isAutoplay && this.data.length > 1 ? true : false;

    /**
     * Animate type
     * @type {string}
     * @private
     */
    this.animateType = opts.animateType in this._animateFuncs ? opts.animateType : 'default';

    /**
     * @protected
     */
    this._animateFunc = this._animateFuncs[this.animateType];

    // little trick set, when you chooce tear & vertical same time
    // iSlider overspread mode will be set true autometicly
    if (this.isVertical && this.animateType === 'card') {
        this.isOverspread = true;
    }

    /**
     * Debug mode
     * @type {function}
     * @private
     */
    this.log = opts.isDebug ? function () {
        global.console.log.apply(global.console, arguments);
    } : iSlider.EMPTY_FUNCTION;

    // set Damping function
    this._setUpDamping();

    // stop autoplay when window blur
    // this._setPlayWhenFocus();

    /**
     * animate process time (ms), default: 300ms
     * @type {number}
     * @public
     */
    this.animateTime = opts.animateTime != null && opts.animateTime > -1 ? opts.animateTime : 300;

    /**
     * animate effects, default: ease
     * @type {string}
     * @public
     */
    this.animateEasing = inArray(opts.animateEasing, iSlider.EASING[0]) || iSlider.EASING[1].test(opts.animateEasing) ? opts.animateEasing : 'ease';

    /**
     * In slide animation
     * @type {number}
     * @private
     */
    this.inAnimate = 0;

    /**
     * Fix touch/mouse events
     * @type {{hasTouch, startEvt, moveEvt, endEvt}}
     * @private
     */
    this.deviceEvents = (function () {
        var hasTouch = !!('ontouchstart' in global || global.DocumentTouch && document instanceof global.DocumentTouch);
        return {
            hasTouch: hasTouch,
            startEvt: hasTouch ? 'touchstart' : 'mousedown',
            moveEvt: hasTouch ? 'touchmove' : 'mousemove',
            endEvt: hasTouch ? 'touchend' : 'mouseup'
        };
    })();

    /**
     * Init events
     * @type {{}}
     * @private
     */
    this.events = {};

    // --------------------------------
    // - Register events
    // --------------------------------

    // Callback function when your finger is moving
    this.on('slide', opts.onslide, 1);

    // Callback function when your finger touch the screen
    this.on('slideStart', opts.onslidestart, 1);

    // Callback function when the finger move out of the screen
    this.on('slideEnd', opts.onslideend, 1);

    // Callback function when slide to next/prev scene
    this.on('slideChange', opts.onslidechange, 1);

    // Callback function when next/prev scene, while animation has completed
    this.on('slideChanged', opts.onslidechanged, 1);

    // Callback function when restore to the current scene
    this.on('slideRestore', opts.onsliderestore, 1);

    // Callback function when restore to the current scene, while animation has completed
    this.on('slideRestored', opts.onsliderestored, 1);

    // --------------------------------
    // - Plugins
    // --------------------------------

    /**
     * @type {object}
     * @private
     */
    this.pluginConfig = (function () {
        if (isArray(opts.plugins)) {
            var config = {};
            opts.plugins.forEach(function pluginConfigEach(plugin) {
                if (isArray(plugin)) {
                    config[plugin[0]] = plugin.slice(1);
                } else if (typeof plugin === 'string') {
                    config[plugin] = [];
                }
            });
            return config;
        } else {
            return {};
        }
    })();

    // Autoplay mode
    this.delay ? global.setTimeout(this._autoPlay.bind(this), this.delay) : this._autoPlay();
};

/**
 * Init plugins
 * @private
 */
iSliderPrototype._initPlugins = function () {
    var config = this.pluginConfig;
    var plugins = this._plugins;
    for (var i in config) {
        if (config.hasOwnProperty(i) && plugins.hasOwnProperty(i)) {
            this.log('[INIT PLUGIN]:', i, plugins[i]);
            plugins[i] && typeof plugins[i] === 'function' && typeof plugins[i].apply && plugins[i].apply(this, config[i]);
        }
    }
};

/**
 * enable damping when slider meet the edge
 * @private
 */
iSliderPrototype._setUpDamping = function () {
    var oneIn2 = this.scale >> 1;
    var oneIn4 = oneIn2 >> 1;
    var oneIn16 = oneIn4 >> 2;

    /**
     * init damping function
     * @param distance
     * @returns {*}
     * @private
     */
    this._damping = function (distance) {
        var dis = Math.abs(distance);
        var result;

        if (dis < oneIn2) {
            result = dis >> 1;
        } else if (dis < oneIn2 + oneIn4) {
            result = oneIn4 + (dis - oneIn2 >> 2);
        } else {
            result = oneIn4 + oneIn16 + (dis - oneIn2 - oneIn4 >> 3);
        }

        return distance > 0 ? result : -result;
    };
};

/**
 * Get item type
 * @param {number} index
 * @returns {string}
 * @private
 */
iSliderPrototype._itemType = function (item) {
    if (!isNaN(item)) {
        item = this.data[item];
    }
    if (item.hasOwnProperty('type')) {
        return item.type;
    }
    var content = item.content;
    var type;
    if (content == null) {
        type = 'empty';
    } else {
        if (Boolean(content.nodeName) && Boolean(content.nodeType)) {
            type = 'node';
        } else if (typeof content === 'string') {
            if (isUrl(content)) {
                type = 'pic';
            } else {
                type = 'html';
            }
        } else {
            type = 'unknown';
        }
    }

    item.type = type;

    return type;
};

/**
 * render single item html by idx
 * @param {HTMLElement} el ..
 * @param {number} dataIndex  ..
 * @private
 */
iSliderPrototype._renderItem = function (el, dataIndex) {

    var item,
        self = this,
        len = this.data.length;

    var insertImg = function renderItemInsertImg() {
        var simg = ' src="' + item.content + '"';
        // auto scale to full screen
        if (item.height / item.width > self.ratio) {
            simg += ' height="100%"';
        } else {
            simg += ' width="100%"';
        }
        if (self.isOverspread) {
            el.style.background = 'url(' + item.content + ') no-repeat 50% 50%/cover';
            simg += ' style="display:block;opacity:0;height:100%;width:100%;"';
        }
        // for right button, save picture
        el.innerHTML = '<img' + simg + ' />';
    };

    // clean scene
    el.innerHTML = '';
    el.style.background = '';

    // get the right item of data
    if (!this.isLooping && this.data[dataIndex] == null) {
        // Stop slide when item is empty
        return;
    } else {
        dataIndex = (len /* * Math.ceil(Math.abs(dataIndex / len))*/ + dataIndex) % len;
        item = this.data[dataIndex];
    }

    var type = this._itemType(item);

    this.log('[Render ITEM]:', type, dataIndex, item);

    el.className = 'islider-' + type;

    switch (type) {
        case 'pic':
            if (item.load === 2) {
                insertImg();
            } else {
                var currentImg = new Image();
                currentImg.src = item.content;
                currentImg.onload = function () {
                    item.height = currentImg.height;
                    item.width = currentImg.width;
                    insertImg();
                    item.load = 2;
                };
            }
            break;
        case 'dom':
        case 'html':
            el.innerHTML = item.content;
            break;
        case 'node':
        case 'element':
            // fragment, create container
            if (item.content.nodeType === 11) {
                var entity = document.createElement('div');
                entity.appendChild(item.content);
                item.content = entity;
            }
            el.appendChild(item.content);
            break;
        default:
            // do nothing
            break;
    }

    this.fire('renderComplete');
};

/**
 * Postponing the intermediate scene rendering
 * until the target scene is completely rendered (render in event slideChanged)
 * to avoid a jumpy feel when switching between scenes
 * given that the distance of sliding is more than 1.
 * e.g. ```this.slideTo(>+-1)```
 *
 * @private
 */
iSliderPrototype._renderIntermediateScene = function () {
    if (this._intermediateScene != null) {
        this._renderItem.apply(this, this._intermediateScene);
        this._intermediateScene = null;
    }
};

/**
 * Apply styles on changed
 * @private
 */
iSliderPrototype._changedStyles = function () {
    var slideStyles = ['islider-prev', 'islider-active', 'islider-next'];
    this.els.forEach(function changeStypeEach(el, index) {
        removeClass(el, '(' + slideStyles.join('|') + ')');
        addClass(el, slideStyles[index]);
    });
};

/**
 * render list html
 * @private
 */
iSliderPrototype._renderWrapper = function () {
    this.outer && (this.outer.innerHTML = '');
    // initail ul element
    var outer = this.outer || document.createElement('ul');
    outer.className = 'islider-outer';

    // storage li elements, only store 3 elements to reduce memory usage
    /**
     * Slider elements x3
     * @type {Array}
     * @public
     */
    this.els = [];

    for (var i = 0; i < 3; i++) {
        var li = document.createElement('li');
        this.els.push(li);

        // prepare style animation
        this._animateFunc(li, this.axis, this.scale, i, 0);

        // auto overflow in none fixPage mode
        if (!this.fixPage) {
            li.style.overflow = 'auto';
        }

        this.isVertical && (this.animateType === 'rotate' || this.animateType === 'flip') ? this._renderItem(li, 1 - i + this.slideIndex) : this._renderItem(li, i - 1 + this.slideIndex);

        outer.appendChild(li);
    }

    this._changedStyles();

    // Preload picture [ may be pic :) ]
    global.setTimeout((function () {
        this._preloadImg(this.slideIndex);
    }).bind(this), 200);

    // append ul to div#canvas
    if (!this.outer) {
        /**
         * @type {Element}
         * @public
         */
        this.outer = outer;
        this.wrap.appendChild(outer);
    }
};

/**
 * Preload img when slideChange
 * From current index +2, -2 scene
 * @param {number} dataIndex means which image will be load
 * @private
 */
iSliderPrototype._preloadImg = function (dataIndex) {
    if (this.data.length > 3) {
        var data = this.data;
        var len = data.length;
        var self = this;
        var loadImg = function preloadImgLoadingProcess(index) {
            var item = data[index];
            if (self._itemType(item) === 'pic' && !item.load) {
                var preloadImg = new Image();
                preloadImg.src = item.content;
                preloadImg.onload = function () {
                    item.width = preloadImg.width;
                    item.height = preloadImg.height;
                    item.load = 2;
                };
                item.load = 1;
            }
        };

        loadImg((dataIndex + 2) % len);
        loadImg((dataIndex - 2 + len) % len);
    }
};

/**
 * Watch event transitionEnd
 * @private
 */
iSliderPrototype._watchTransitionEnd = function (time, eventType) {

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    var lsn;
    this.log('Event:', 'watchTransitionEnd::stuck::pile', this.inAnimate);

    function handle(evt) {
        if (lsn) {
            global.clearTimeout(lsn);
        }
        self.inAnimate--;
        self.log('Event:', 'watchTransitionEnd::stuck::release', self.inAnimate);
        if (self.inAnimate === 0) {
            //self.inAnimate = 0;
            if (eventType === 'slideChanged') {
                self._changedStyles();
            }
            self.fire.apply(self, args);
            self._renderIntermediateScene();
        }
        unWatch();
    };

    function unWatch() {
        self.els.forEach(function translationEndUnwatchEach(el) {
            el.removeEventListener(iSlider._transitionEndEvent(), handle);
        });
        self.isAnimating = false;
    }

    if (time > 0) {
        self.els.forEach(function translationEndElsEach(el) {
            el.addEventListener(iSlider._transitionEndEvent(), handle);
        });
    }
    lsn = global.setTimeout(handle, time);
    self.inAnimate++;
};

/**
 * bind all event handler, when on PC, disable drag event
 * @private
 */
iSliderPrototype._bindHandler = function () {
    var outer = this.outer;

    if (this.isTouchable) {
        var device = this.deviceEvents;
        if (!device.hasTouch) {
            outer.style.cursor = 'pointer';
            // disable drag
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
        !this.deviceEvents.hasTouch && outer.addEventListener('mouseout', this);
    }

    global.addEventListener('orientationchange', this);
    global.addEventListener('resize', this);

    // Fix android device
    global.addEventListener('focus', this, false);
    global.addEventListener('blur', this, false);
};

/**
 *  Uniformity admin event
 *  Event router
 *  @param {object} evt event object
 *  @protected
 */
iSliderPrototype.handleEvent = function (evt) {
    var device = this.deviceEvents;
    switch (evt.type) {
        case 'mousedown':
            // block mouse buttons except left
            if (evt.button !== 0) break;
        case 'touchstart':
            this.startHandler(evt);
            break;
        case device.moveEvt:
            this.moveHandler(evt);
            break;
        case device.endEvt:
        case 'mouseout': // mouseout event, trigger endEvent
        case 'touchcancel':
            this.endHandler(evt);
            break;
        case 'orientationchange':
            this.orientationchangeHandler();
            break;
        case 'focus':
            this._autoPlay();
            break;
        case 'blur':
            this.pause();
            break;
        case 'resize':
            this.resizeHandler();
            break;
    }
};

/**
 *  touchstart callback
 *  @param {object} evt event object
 *  @protected
 */
iSliderPrototype.startHandler = function (evt) {
    if (this.fixPage) {
        if (iSlider.FIX_PAGE_TAGS.indexOf(evt.target.tagName) < 0) {
            evt.preventDefault();
        }
    }
    if (this.holding || this.locking) {
        return;
    }
    var device = this.deviceEvents;
    this.isMoving = true;
    this.pause();

    this.log('Event: start');
    this.fire('slideStart', evt, this);

    this.startTime = new Date().getTime();
    this.startX = device.hasTouch ? evt.targetTouches[0].pageX : evt.pageX;
    this.startY = device.hasTouch ? evt.targetTouches[0].pageY : evt.pageY;
};

/**
 *  touchmove callback
 *  @param {object} evt event object
 *  @protected
 */
iSliderPrototype.moveHandler = function (evt) {
    if (!this.isMoving) {
        return;
    }
    this.log('Event: moving');
    var device = this.deviceEvents;
    var len = this.data.length;
    var axis = this.axis;
    var reverseAxis = this.reverseAxis;
    var offset = {
        X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
        Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
    };

    this.offset = offset;

    if (Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {

        evt.preventDefault();

        this.fire('slide', evt, this);

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
};

/**
 *  touchend callback
 *  @param {Object} evt event object
 *  @protected
 */
iSliderPrototype.endHandler = function (evt) {
    if (!this.isMoving) {
        return;
    }
    this.log('Event: end');
    this.isMoving = false;
    var offset = this.offset;
    var axis = this.axis;
    var boundary = this.scale / 2;
    var endTime = new Date().getTime();

    // a quick slide time must under 300ms
    // a quick slide should also slide at least 14 px
    boundary = endTime - this.startTime > 300 ? boundary : 14;

    var absOffset = Math.abs(offset[axis]);
    var absReverseOffset = Math.abs(offset[this.reverseAxis]);

    var getLink = function getLink(el) {
        if (el.tagName === 'A') {
            if (el.href) {
                global.location.href = el.href;
                return false;
            }
        } else if (el.className !== 'islider-pic') {
            return false;
        } else {
            getLink(el.parentNode);
        }
    };

    this.log(boundary, offset[axis], absOffset, absReverseOffset, this);

    if (offset[axis] >= boundary && absReverseOffset < absOffset) {
        this.slideTo(this.slideIndex - 1);
    } else if (offset[axis] < -boundary && absReverseOffset < absOffset) {
        this.slideTo(this.slideIndex + 1);
    } else {
        this.slideTo(this.slideIndex);
    }

    // create tap event if offset < 10
    if (Math.abs(this.offset.X) < 10 && Math.abs(this.offset.Y) < 10) {
        this.tapEvt = document.createEvent('Event');
        this.tapEvt.initEvent('tap', true, true);
        if (this.fixPage) {
            evt.target && getLink(evt.target);
        }
        if (!evt.target.dispatchEvent(this.tapEvt)) {
            evt.preventDefault();
        }
    }

    this.offset.X = this.offset.Y = 0;

    this._autoPlay();

    this.fire('slideEnd', evt, this);
};

/**
 *  orientationchange callback
 *  @protected
 */
iSliderPrototype.orientationchangeHandler = function () {
    global.setTimeout((function () {
        this.reset();
        this.log('Event: orientationchange');
    }).bind(this), 100);
};

/**
 * resize callback
 * @protected
 */
iSliderPrototype.resizeHandler = function () {
    if (this.height !== this.wrap.clientHeight || this.width !== this.wrap.clientWidth) {
        this._LSN.resize && global.clearTimeout(this._LSN.resize);
        this._LSN.resize = global.setTimeout((function () {
            this.reset();
            this.log('Event: resize');
            this._LSN.resize && global.clearTimeout(this._LSN.resize);
        }).bind(this), 500);
    }
};

/**
 *  slide logical, goto data index
 *  @param {number} dataIndex the goto index
 *  @public
 */
iSliderPrototype.slideTo = function (dataIndex, opts) {
    if (this.locking) {
        return;
    }
    this.unhold();
    var animateTime = this.animateTime;
    var animateType = this.animateType;
    var animateFunc = this._animateFunc;
    var data = this.data;
    var els = this.els;
    var idx = dataIndex;
    var n = dataIndex - this.slideIndex;
    var offset = this.offset;
    var eventType;

    if (typeof opts === 'object') {
        if (opts.animateTime > -1) {
            animateTime = opts.animateTime;
        }
        if (typeof opts.animateType === 'string' && opts.animateType in this._animateFuncs) {
            animateType = opts.animateType;
            animateFunc = this._animateFuncs[animateType];
        }
    }

    // In the slide process, animate time is squeezed
    var squeezeTime = Math.abs(offset[this.axis]) / this.scale * animateTime;

    if (Math.abs(n) > 1) {
        this._renderItem(n > 0 ? this.els[2] : this.els[0], idx);
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

    this.log('Index:' + this.slideIndex);

    // keep the right order of items
    var headEl, tailEl, step;

    // slidechange should render new item
    // and change new item style to fit animation
    if (n === 0) {
        // Restore to current scene
        eventType = 'slideRestore';
    } else {

        if ((this.isVertical && (animateType === 'rotate' || animateType === 'flip')) ^ n > 0) {
            els.push(els.shift());
            headEl = els[2];
            tailEl = els[0];
            step = 1;
        } else {
            els.unshift(els.pop());
            headEl = els[0];
            tailEl = els[2];
            step = -1;
        }

        if (Math.abs(n) === 1) {
            this._renderIntermediateScene();
            this._renderItem(headEl, idx + n);
        } else if (Math.abs(n) > 1) {
            this._renderItem(headEl, idx + step);
            this._intermediateScene = [tailEl, idx - step];
        }

        headEl.style.webkitTransition = 'none';
        headEl.style.visibility = 'hidden';

        global.setTimeout(function () {
            headEl.style.visibility = 'visible';
        }, 200);

        // Minus squeeze time
        squeezeTime = animateTime - squeezeTime;

        eventType = 'slideChange';
    }

    this.fire(eventType, this.slideIndex, els[1], this);
    this._watchTransitionEnd(squeezeTime, eventType + 'd', this.slideIndex, els[1], this);

    // do the trick animation
    for (var i = 0; i < 3; i++) {
        if (els[i] !== headEl) {
            // Only applies to "transform"
            els[i].style.webkitTransition = 'all ' + squeezeTime / 1000 + 's ' + this.animateEasing;
        }
        animateFunc.call(this, els[i], this.axis, this.scale, i, 0);
    }

    // If not looping, stop playing when meet the end of data
    if (this.isAutoplay && !this.isLooping && this.slideIndex === data.length - 1) {
        this.pause();
    }
};

/**
 * Slide to next scene
 * @public
 */
iSliderPrototype.slideNext = function () {
    this.slideTo.apply(this, [this.slideIndex + 1].concat(Array.prototype.slice.call(arguments)));
};

/**
 * Slide to previous scene
 * @public
 */
iSliderPrototype.slidePrev = function () {
    this.slideTo.apply(this, [this.slideIndex - 1].concat(Array.prototype.slice.call(arguments)));
};

/**
 * Register plugin (run time mode)
 * @param {string} name
 * @param {function} plugin
 * @param {...}
 * @public
 */
iSliderPrototype.regPlugin = function () {
    var args = Array.prototype.slice.call(arguments);
    var name = args.shift(),
        plugin = args[0];

    if (!this._plugins.hasOwnProperty(name) && typeof plugin !== 'function') {
        return;
    }
    if (typeof plugin === 'function') {
        this._plugins[name] = plugin;
        args.shift();
    }

    // Auto enable and init plugin when at run time
    if (!inArray(name, this._opts.plugins)) {
        this._opts.plugins.push(args.length ? [].concat([name], args) : name);
        typeof this._plugins[name] === 'function' && this._plugins[name].apply(this, args);
    }
};

/**
 *  simple event delegate method
 *  @param {string} evtType event name
 *  @param {string} selector the simple css selector like jQuery
 *  @param {function} callback event callback
 *  @public
 */
iSliderPrototype.bind = iSliderPrototype.delegate = function (evtType, selector, callback) {

    function delegatedEventCallbackHandle(e) {
        var evt = global.event ? global.event : e;
        var target = evt.target;
        var eleArr = document.querySelectorAll(selector);
        for (var i = 0; i < eleArr.length; i++) {
            if (target === eleArr[i]) {
                callback.call(target);
                break;
            }
        }
    }

    this.wrap.addEventListener(evtType, delegatedEventCallbackHandle, false);

    var key = evtType + ';' + selector;
    if (!this._EventHandle.hasOwnProperty(key)) {
        this._EventHandle[key] = [[callback], [delegatedEventCallbackHandle]];
    } else {
        this._EventHandle[key][0].push(callback);
        this._EventHandle[key][1].push(delegatedEventCallbackHandle);
    }
};

/**
 * remove event delegate from wrap
 *
 * @param {string} evtType event name
 * @param {string} selector the simple css selector like jQuery
 * @param {function} callback event callback
 * @public
 */
iSliderPrototype.unbind = iSliderPrototype.unDelegate = function (evtType, selector, callback) {
    var key = evtType + ';' + selector;
    if (this._EventHandle.hasOwnProperty(key)) {
        var i = this._EventHandle[key][0].indexOf(callback);
        if (i > -1) {
            this.wrap.removeEventListener(evtType, this._EventHandle[key][1][i]);
            this._EventHandle[key][0][i] = this._EventHandle[key][1][i] = null;
            // delete this._EventHandle[key][0][i];
            // delete this._EventHandle[key][1][i];
            return true;
        }
    }

    return false;
};

/**
 * removeEventListener to release the memory
 * @public
 */
iSliderPrototype.destroy = function () {
    var outer = this.outer;
    var device = this.deviceEvents;

    this.fire('destroy');

    // Clear events
    if (this.isTouchable) {
        outer.removeEventListener(device.startEvt, this);
        outer.removeEventListener(device.moveEvt, this);
        outer.removeEventListener(device.endEvt, this);
        !this.deviceEvents.hasTouch && outer.removeEventListener('mouseout', this);
    }
    global.removeEventListener('orientationchange', this);
    global.removeEventListener('focus', this);
    global.removeEventListener('blur', this);

    // Clear delegate events
    for (var n in this._EventHandle) {
        var handList = this._EventHandle[n][1];
        for (var i = 0; i < handList.length; i++) {
            if (typeof handList[i] === 'function') {
                this.wrap.removeEventListener(n.substr(0, n.indexOf(';')), handList[i]);
            }
        }
    }
    this._EventHandle = null;

    // Clear timer
    for (var n in this._LSN) this._LSN.hasOwnProperty(n) && this._LSN[n] && global.clearTimeout(this._LSN[n]);

    this._LSN = null;

    this.wrap.innerHTML = '';
};

/**
 * Register event callback
 * @param {string} eventName
 * @param {function} func
 * @public
 */
iSliderPrototype.on = function (eventName, func, force) {
    if (inArray(eventName, iSlider.EVENTS) && typeof func === 'function') {
        !(eventName in this.events) && (this.events[eventName] = []);
        if (!force) {
            this.events[eventName].push(func);
        } else {
            this.events[eventName].unshift(func);
        }
    }
};

/**
 * Find callback function position
 * @param eventName
 * @param func
 * @returns {number}
 * @public
 */
iSliderPrototype.has = function (eventName, func) {
    if (eventName in this.events) {
        return this.events[eventName].indexOf(func);
    }
    return -1;
};

/**
 * Remove event callback
 * @param {string} eventName
 * @param {function} func
 * @public
 */
iSliderPrototype.off = function (eventName, func) {
    var index = this.has(eventName, func);
    if (index > -1) {
        delete this.events[eventName][index];
    }
};

/**
 * Trigger event callbacks
 * @param {string} eventName
 * @param {*} args
 * @public
 */
iSliderPrototype.fire = function (eventName) {
    this.log('[EVENT FIRE]:', eventName, arguments);
    if (eventName in this.events) {
        var funcs = this.events[eventName];
        for (var i = 0; i < funcs.length; i++) {
            typeof funcs[i] === 'function' && funcs[i].apply && funcs[i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
};

/**
 * reset & rerender
 * @public
 */
iSliderPrototype.reset = function () {
    this.pause();
    this._setting();
    this._renderWrapper();
    this.delay && global.setTimeout(this._autoPlay.bind(this), this.delay);
};

/**
 * reload Data & render
 * @public
 */
iSliderPrototype.loadData = function (data, initIndex) {
    this.pause();
    this.slideIndex = initIndex || 0;
    this.data = data;
    this._renderWrapper();
    this.fire('reloadData');
    this.delay && global.setTimeout(this._autoPlay.bind(this), this.delay);
};

/**
 * auto check to play and bind events
 * @private
 */
iSliderPrototype._autoPlay = function () {
    // enable
    if (this.isAutoplay) {
        this.has('slideChanged', this.play) < 0 && this.on('slideChanged', this.play, 1);
        this.has('slideRestored', this.play) < 0 && this.on('slideRestored', this.play, 1);
        this.play();
    } else {
        this.off('slideChanged', this.play);
        this.off('slideRestored', this.play);
    }
};

/**
 * Start autoplay
 * @public
 */
iSliderPrototype.play = function () {
    this._LSN.autoPlay && global.clearTimeout(this._LSN.autoPlay);
    this._LSN.autoPlay = global.setTimeout(this.slideNext.bind(this), this.duration);
};

/**
 * pause autoplay
 * @public
 */
iSliderPrototype.pause = function () {
    this._LSN.autoPlay && global.clearTimeout(this._LSN.autoPlay);
};

/**
 * Maintaining the current scene
 * Disable touch events, except for the native method.
 * @public
 */
iSliderPrototype.hold = function () {
    this.holding = true;
};

/**
 * Release current scene
 * unlock at same time
 * @public
 */
iSliderPrototype.unhold = function () {
    this.holding = false;
    this.unlock();
};

/**
 * You can't do anything on this scene
 * lock native method calls
 * hold at same time
 * @public
 */
iSliderPrototype.lock = function () {
    this.hold();
    this.locking = true;
};

/**
 * unlock native method calls
 * @public
 */
iSliderPrototype.unlock = function () {
    this.locking = false;
};

exports['default'] = iSlider;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
/**
 * To create right&left botton on iSlider
 *
 * @file button.js
 * @author BE-FE Team
 *    xieyu33333 xieyu33333@gmail.com
 *    shinate shine.wangrs@gmail.com
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isliderJs = require('../islider.js');

var _isliderJs2 = _interopRequireDefault(_isliderJs);

_isliderJs2['default'] && _isliderJs2['default'].regPlugin('button', function () {
    var HANDLE = this;
    if (!HANDLE.isVertical) {
        var btnOuter = [];
        var btnInner = [];
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
                HANDLE.slideTo(HANDLE.slideIndex + dir);
            });

            btnOuter[i].appendChild(btnInner[i]);
            HANDLE.wrap.appendChild(btnOuter[i], HANDLE.wrap.nextSibling);
        }
    }
});

},{"../islider.js":2}],4:[function(require,module,exports){
/**
 * To create dots index on iSlider
 *
 * @file dot.js
 * @author BE-FE Team
 *    xieyu33333 xieyu33333@gmail.com
 *    shinate shine.wangrs@gmail.com
 * @Instructions
 *    activation:
 *       new iSlider({
 *          ...
 *          plugins: ['dot']
 *          ...
 *       });
 *    more options:
 *       new iSlider({
 *          ...
 *          plugins: [['dot', {locate:'absoulute'}]]
 *          ...
 *       });
 * @options
 *    locate {string|HTML Element} the warpper of dots value: 'absolute', 'relative' or Specified dom, default: 'absolute'
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isliderJs = require('../islider.js');

var _isliderJs2 = _interopRequireDefault(_isliderJs);

_isliderJs2['default'] && _isliderJs2['default'].regPlugin('dot', function (opts) {
    var HANDLE = this;
    if (!HANDLE.isVertical) {
        var locate = (function (locate) {
            if (locate === 'relative') {
                return HANDLE.wrap;
            } else if (Boolean(locate.nodeName) && Boolean(locate.nodeType)) {
                return locate;
            }
            return HANDLE.wrap.parentNode;
        })(opts && opts.locate != null ? opts.locate : false);
        var data = HANDLE.data;
        var dots = [];
        var dotWrap = document.createElement('ul');
        dotWrap.className = 'islider-dot-wrap';

        var renderDots = function renderDots() {
            var fregment = document.createDocumentFragment();
            for (var i = 0; i < data.length; i++) {
                dots[i] = document.createElement('li');
                dots[i].className = 'islider-dot';
                dots[i].setAttribute('index', i);
                if (i === HANDLE.slideIndex) {
                    dots[i].className += ' active';
                }
                dots[i].onclick = function () {
                    HANDLE.slideTo(parseInt(this.getAttribute('index'), 10));
                };
                fregment.appendChild(dots[i]);
            }
            dotWrap.innerHTML = '';
            dotWrap.appendChild(fregment);
        };

        renderDots();

        locate.appendChild(dotWrap);

        HANDLE.on('slideChange', function () {
            if (!HANDLE.isVertical) {
                for (var i = 0; i < data.length; i++) {
                    dots[i].className = 'islider-dot';
                    if (i === this.slideIndex) {
                        dots[i].className += ' active';
                    }
                }
            }
        });

        HANDLE.on('reloadData', function () {
            data = this.data;
            dots = [];
            renderDots();
        });
    }
});

},{"../islider.js":2}],5:[function(require,module,exports){
/**
 * @file zoompic.js
 * @author liuhui01 on 2015/1/7.
 * @modify shinate shine.wangrs@gmail.com
 */
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isliderJs = require('../islider.js');

var _isliderJs2 = _interopRequireDefault(_isliderJs);

var global = window;

var startHandlerOriginal = _isliderJs2['default'].prototype.startHandler;
var endHandlerOriginal = _isliderJs2['default'].prototype.endHandler;
var moveHandlerOriginal = _isliderJs2['default'].prototype.moveHandler;

/**
 * Support 3D matrix translate
 * @type {boolean}
 */
var has3d = 'WebKitCSSMatrix' in global && 'm11' in new WebKitCSSMatrix();

/**
 * Min scale
 * @type {number}
 */
var minScale = 1 / 2;

/**
 * Scene view range
 * @type {{}}
 */
var viewScope = {};

var currentScale;

var zoomFactor;

var zoomNode;

var startTouches;

var startX;

var startY;

var lastTouchStart;

var gesture;

var IN_SCALE_MODE = false;

/**
 * Generate translate
 * @param x
 * @param y
 * @param z
 * @param scale
 * @returns {string}
 */
function generateTranslate(x, y, z, scale) {
    return "translate" + (has3d ? "3d(" : "(") + x + "px," + y + (has3d ? "px," + z + "px)" : "px)") + "scale(" + scale + ")";
}

/**
 * Get distance
 * @param a
 * @param b
 * @returns {number}
 */
function getDistance(a, b) {
    var x, y;
    x = a.left - b.left;
    y = a.top - b.top;
    return Math.sqrt(x * x + y * y);
}

/**
 * Transform to string
 * @param x
 * @param y
 * @returns {string}
 */
function generateTransformOrigin(x, y) {
    return x + "px " + y + "px";
}

/**
 * Get touch pointer
 * @param touches
 * @returns {Array}
 */
function getTouches(touches) {
    return Array.prototype.slice.call(touches).map(function (touch) {
        return {
            left: touch.pageX,
            top: touch.pageY
        };
    });
}

/**
 * Get scale
 * @param start
 * @param end
 * @returns {number}
 */
function calculateScale(start, end) {
    var startDistance = getDistance(start[0], start[1]);
    var endDistance = getDistance(end[0], end[1]);
    return endDistance / startDistance;
}

/**
 * Get computed translate
 * @param obj
 * @returns {{translateX: number, translateY: number, translateZ: number, scaleX: number, scaleY: number, offsetX: number, offsetY: number}}
 */
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
    if (!global.getComputedStyle || !obj) return result;
    var style = global.getComputedStyle(obj),
        transform,
        origin;
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

/**
 * Get center point
 * @param a
 * @param b
 * @returns {{x: number, y: number}}
 */
function getCenter(a, b) {
    return {
        x: (a.x + b.x) / 2,
        y: (a.y + b.y) / 2
    };
}

/**
 * init
 * @param opts
 */
function initZoom(opts) {
    currentScale = 1;
    zoomFactor = opts && opts.zoomFactor || 2;
}

/**
 * Start event handle
 * @param {object} evt
 */
function startHandler(evt) {
    startHandlerOriginal.call(this, evt);
    // must be a picture, only one picture!!
    var node = this.els[1].querySelector('img:first-child');
    var device = this.deviceEvents;
    if (device.hasTouch && node !== null) {
        IN_SCALE_MODE = true;
        var transform = getComputedTranslate(node);
        startTouches = getTouches(evt.targetTouches);
        startX = transform.translateX - 0;
        startY = transform.translateY - 0;
        currentScale = transform.scaleX;
        zoomNode = node;
        var pos = getPosition(node);
        if (evt.targetTouches.length == 2) {
            lastTouchStart = null;
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
            gesture = 0;
            if (time - lastTouchStart < 300) {
                evt.preventDefault();
                gesture = 3;
            }
            lastTouchStart = time;
        }
    }
}

/**
 * Move event handle
 * @param {object} evt
 * @returns {number}
 */
function moveHandler(evt) {
    if (IN_SCALE_MODE) {
        var result = 0;
        var node = zoomNode;
        var device = this.deviceEvents;
        if (device.hasTouch) {
            if (evt.targetTouches.length === 2) {
                node.style.webkitTransitionDuration = "0";
                evt.preventDefault();
                scaleImage(evt);
                result = 2;
            } else if (evt.targetTouches.length === 1 && currentScale > 1) {
                node.style.webkitTransitionDuration = "0";
                evt.preventDefault();
                moveImage.call(this, evt);
                result = 1;
            }
            gesture = result;

            if (result > 0) {
                return;
            }
        }
    }
    moveHandlerOriginal.call(this, evt);
}

/**
 * Double tao handle
 * @param {object} evt
 */
function handleDoubleTap(evt) {
    var zoomFactor = zoomFactor || 2;
    var node = zoomNode;
    var pos = getPosition(node);
    currentScale = currentScale == 1 ? zoomFactor : 1;
    node.style.webkitTransform = generateTranslate(0, 0, 0, currentScale);
    if (currentScale != 1) node.style.webkitTransformOrigin = generateTransformOrigin(evt.touches[0].pageX - pos.left, evt.touches[0].pageY - pos.top);
}

/**
 * scale image
 * @param {object} evt
 */
function scaleImage(evt) {
    var moveTouces = getTouches(evt.targetTouches);
    var scale = calculateScale(startTouches, moveTouces);
    var node = zoomNode;
    scale = currentScale * scale < minScale ? minScale : currentScale * scale;
    node.style.webkitTransform = generateTranslate(0, 0, 0, scale);
}

/**
 * End event handle
 * @param evt
 */
function endHandler(evt) {
    if (IN_SCALE_MODE) {
        var result = 0;
        if (gesture === 2) {
            //双手指
            resetImage(evt);
            result = 2;
        } else if (gesture == 1) {
            //放大拖拽
            resetImage(evt);
            result = 1;
        } else if (gesture === 3) {
            //双击
            handleDoubleTap(evt);
            resetImage(evt);
            IN_SCALE_MODE = false;
        }

        if (result > 0) {
            return;
        }
    }
    endHandlerOriginal.call(this, evt);
}

/**
 * Dragmove image
 * @param {opject} evt
 */
function moveImage(evt) {
    var node = zoomNode;
    var device = this.deviceEvents;
    var offset = {
        X: device.hasTouch ? evt.targetTouches[0].pageX - this.startX : evt.pageX - this.startX,
        Y: device.hasTouch ? evt.targetTouches[0].pageY - this.startY : evt.pageY - this.startY
    };
    var moveOffset = {
        x: startX + offset.X - 0,
        y: startY + offset.Y - 0
    };
    node.style.webkitTransform = generateTranslate(moveOffset.x, moveOffset.y, 0, currentScale);
}

/**
 * Get position
 * @param element
 * @returns {{left: number, top: number}}
 */
function getPosition(element) {
    var pos = {
        "left": 0,
        "top": 0
    };
    do {
        pos.top += element.offsetTop || 0;
        pos.left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while (element);
    return pos;
}

/**
 * Check target is in range
 * @param node
 * @param value
 * @param tag
 * @returns {boolean}
 */
function valueInViewScope(node, value, tag) {
    var min, max;
    var pos = getPosition(node);
    viewScope = {
        start: {
            left: pos.left,
            top: pos.top
        },
        end: {
            left: pos.left + node.clientWidth,
            top: pos.top + node.clientHeight
        }
    };
    var str = tag == 1 ? "left" : "top";
    min = viewScope.start[str];
    max = viewScope.end[str];
    return value >= min && value <= max;
}

/**
 *
 * @param node
 * @param obj1
 * @returns {number}
 */
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

/**
 * Reset image
 * @param {object} evt
 */
function resetImage(evt) {
    if (currentScale == 1) return;
    var node = zoomNode,
        left,
        top,
        trans,
        w,
        h,
        pos,
        start,
        end,
        parent,
        flowTag;
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

    flowTag = overFlow(parent, {
        start: start,
        end: end
    });
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

_isliderJs2['default'].extend({
    startHandler: startHandler,
    moveHandler: moveHandler,
    endHandler: endHandler
});

_isliderJs2['default'].regPlugin('zoompic', initZoom);

},{"../islider.js":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L2RlbW8vcGljdHVyZS9waWN0dXJlX3dpdGhfYnV0dG9uL21haW4uanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyLmpzIiwiZDovZ2l0aHViRGV2ZWxvcG1lbnQvaVNsaWRlci1INS9zcmMvcGx1Z2lucy9idXR0b24uanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2RvdC5qcyIsImQ6L2dpdGh1YkRldmVsb3BtZW50L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvem9vbXBpYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs0QkFFTyx5QkFBeUI7Ozs7UUFDdEMsZ0NBQWdDOztRQUNoQyw2QkFBNkI7O1FBQzdCLGlDQUFpQzs7QUFFeEMsSUFBSSxJQUFJLEdBQUcsQ0FDUCxFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxFQUMvQixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxFQUMvQixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxFQUMvQixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxFQUMvQixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxFQUMvQixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxFQUMvQixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxFQUMvQixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxFQUMvQixFQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBQyxDQUNsQyxDQUFDOztBQUVGLElBQUksT0FBTyxHQUFHLDhCQUFZO0FBQ3RCLFFBQUksRUFBRSxLQUFLO0FBQ1gsUUFBSSxFQUFFLElBQUk7QUFDVixPQUFHLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztBQUMvQyxhQUFTLEVBQUUsSUFBSTtBQUNmLFdBQU8sRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFDLFlBQVksRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFFLENBQUMsRUFBQyxDQUFDLENBQUM7Q0FDbkUsQ0FBQyxDQUFDOztBQUdILE9BQU8sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDM0IsT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3pCLE9BQU8sQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUN2QixPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ3BCdkIsWUFBWSxDQUFDOzs7Ozs7Ozs7OztBQVFiLFNBQVMsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUU7QUFDaEMsV0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ3pDLENBQUM7Ozs7Ozs7QUFPRixTQUFTLE9BQU8sQ0FBQyxDQUFDLEVBQUU7QUFDaEIsV0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssZ0JBQWdCLENBQUM7Q0FDakUsQ0FBQzs7Ozs7OztBQU9GLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEIsV0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7Q0FDdkU7Ozs7OztBQU1ELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDckIsV0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQzlCO0NBQ0o7Ozs7OztBQU1ELFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDM0IsUUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ3BCLFdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbEY7Q0FDSjs7Ozs7OztBQU9ELFNBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUNoQixRQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ3ZCLE9BQU8sS0FBSyxDQUFDOztBQUVqQixRQUFJLEtBQUssR0FBRyxHQUFHLEdBQ1gsb0NBQW9DLEdBQ3BDLDJEQUEyRCxHQUMzRCxtR0FBbUcsR0FDbkcsZ0JBQWdCLEdBQ2hCLFlBQVksR0FDWixjQUFjLEdBQ2QsUUFBUSxHQUNSLEdBQUcsQ0FBQztBQUNSLFdBQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7QUFlRCxJQUFJLE9BQU8sR0FBRyxTQUFWLE9BQU8sR0FBYzs7QUFFckIsUUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkQsUUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZCxjQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7S0FDM0M7O0FBRUQsUUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7O0FBRXJHLFlBQVEsSUFBSSxDQUFDLE1BQU07QUFDZixhQUFLLENBQUM7QUFDRixnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUFBLEFBQ3JDLGFBQUssQ0FBQztBQUNGLGdCQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUEsS0FDdEM7O0FBRUQsUUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDWCxjQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7S0FDbEQ7O0FBRUQsUUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNqQyxjQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7S0FDakY7Ozs7OztBQU1ELFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDOzs7Ozs7O0FBT2xCLFFBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDOzs7Ozs7O0FBT2YsUUFBSSxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUM7O0FBRXZCLFFBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVuQixRQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7O0FBRWhCLFFBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDeEIsUUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3RCLFFBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUNwQixRQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7Q0FDdkIsQ0FBQzs7Ozs7OztBQU9GLE9BQU8sQ0FBQyxNQUFNLEdBQUcsbUhBQW1ILENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O0FBT2hKLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FDYiwwQ0FBMEMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQ3JELGdEQUFnRCxDQUNuRCxDQUFDOzs7Ozs7O0FBT0YsT0FBTyxDQUFDLGFBQWEsR0FBRyxvQ0FBb0MsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7OztBQU14RSxPQUFPLENBQUMsY0FBYyxHQUFHLFlBQVcsRUFBRSxDQUFDOzs7Ozs7QUFNdkMsT0FBTyxDQUFDLE1BQU0sR0FBRyxZQUFXO0FBQ3hCLFFBQUksSUFBSTtRQUFFLE1BQU07UUFBRSxJQUFJLEdBQUcsU0FBUyxDQUFDOztBQUVuQyxZQUFRLElBQUksQ0FBQyxNQUFNO0FBQ2YsYUFBSyxDQUFDO0FBQ0YsbUJBQU87QUFBQSxBQUNYLGFBQUssQ0FBQztBQUNGLGdCQUFJLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUN6QixrQkFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxDQUFDO0FBQ0YsZ0JBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZixrQkFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQixrQkFBTTtBQUFBLEtBQ2I7O0FBRUQsU0FBSyxJQUFJLFFBQVEsSUFBSSxNQUFNLEVBQUU7QUFDekIsWUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ2pDLGdCQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO0tBQ0o7Q0FDSixDQUFDOzs7Ozs7O0FBT0YsT0FBTyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7Ozs7Ozs7QUFPckIsT0FBTyxDQUFDLFNBQVMsR0FBRyxVQUFTLElBQUksRUFBRSxNQUFNLEVBQUU7QUFDdkMsV0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQztDQUMzRCxDQUFDOzs7Ozs7Ozs7Ozs7QUFZRixPQUFPLENBQUMsYUFBYSxHQUFHO0FBQ3BCLGFBQVMsRUFBRSxrQkFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQzdDLFdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDO0tBQzNHO0NBQ0osQ0FBQzs7Ozs7O0FBTUYsT0FBTyxDQUFDLG1CQUFtQixHQUFHLENBQUMsWUFBVztBQUN0QyxRQUFJLE9BQU8sQ0FBQztBQUNaLFdBQU8sWUFBVztBQUNkLFlBQUksT0FBTyxFQUFFO0FBQ1QsbUJBQU8sT0FBTyxDQUFDO1NBQ2xCO0FBQ0QsWUFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMvQyxZQUFJLFdBQVcsR0FBRztBQUNkLHNCQUFVLEVBQUUsZUFBZTtBQUMzQix1QkFBVyxFQUFFLGdCQUFnQjtBQUM3Qix5QkFBYSxFQUFFLGVBQWU7QUFDOUIsNEJBQWdCLEVBQUUscUJBQXFCO1NBQzFDLENBQUM7QUFDRixhQUFLLElBQUksQ0FBQyxJQUFJLFdBQVcsRUFBRTtBQUN2QixnQkFBSSxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUFFO0FBQzVELHVCQUFRLE9BQU8sR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUU7YUFDckM7U0FDSjtLQUNKLENBQUM7Q0FDTCxDQUFBLEVBQUcsQ0FBQzs7Ozs7O0FBTUwsSUFBSSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDOzs7Ozs7QUFNekMsZ0JBQWdCLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUM7Ozs7OztBQU16QyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsWUFBVzs7Ozs7OztBQU9uQyxRQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7Ozs7Ozs7QUFPaEMsUUFBSSxDQUFDLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDOzs7Ozs7QUFNM0MsUUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Ozs7OztBQU1yQixRQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzs7Ozs7O0FBTXJCLFFBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7QUFPdEIsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDOzs7Ozs7O0FBT3JCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztBQU90QixRQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0FBT3BDLFFBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7QUFPeEMsUUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQzs7Ozs7OztBQU90QyxRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O0FBT2xHLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0FBTzVELFFBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQzs7Ozs7OztBQU96RCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztBQU94QyxRQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7QUFPakQsUUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztBQU9uQyxRQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDOzs7Ozs7O0FBT3JDLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0FBT3RDLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7QUFPeEQsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxJQUFJO0FBQ3pCLFNBQUMsRUFBRSxDQUFDO0FBQ0osU0FBQyxFQUFFLENBQUM7S0FDUCxDQUFDOzs7Ozs7O0FBT0YsUUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7QUFPeEUsUUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDOzs7Ozs7O0FBT3ZFLFFBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7Ozs7Ozs7QUFPN0IsUUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDOzs7Ozs7O0FBT3pFLFFBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDOzs7OztBQUt6RixRQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7O0FBSXpELFFBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTtBQUNoRCxZQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztLQUM1Qjs7Ozs7OztBQU9ELFFBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ2pDLGNBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0tBQ3ZELEdBQUcsT0FBTyxDQUFDLGNBQWMsQ0FBQzs7O0FBRzNCLFFBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7Ozs7OztBQVVyQixRQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7QUFPOUYsUUFBSSxDQUFDLGFBQWEsR0FDZCxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOzs7Ozs7O0FBTy9ILFFBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O0FBT25CLFFBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxZQUFXO0FBQzVCLFlBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxBQUFDLGNBQWMsSUFBSSxNQUFNLElBQUssTUFBTSxDQUFDLGFBQWEsSUFBSSxRQUFRLFlBQVksTUFBTSxDQUFDLGFBQWEsQ0FBQSxBQUFDLENBQUM7QUFDbEgsZUFBTztBQUNILG9CQUFRLEVBQUUsUUFBUTtBQUNsQixvQkFBUSxFQUFFLFFBQVEsR0FBRyxZQUFZLEdBQUcsV0FBVztBQUMvQyxtQkFBTyxFQUFFLFFBQVEsR0FBRyxXQUFXLEdBQUcsV0FBVztBQUM3QyxrQkFBTSxFQUFFLFFBQVEsR0FBRyxVQUFVLEdBQUcsU0FBUztTQUM1QyxDQUFDO0tBQ0wsQ0FBQSxFQUFHLENBQUM7Ozs7Ozs7QUFPTCxRQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7OztBQU9qQixRQUFJLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7QUFHbEMsUUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQzs7O0FBRzVDLFFBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztBQUd4QyxRQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7QUFHOUMsUUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O0FBR2hELFFBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztBQUdoRCxRQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0FBVWxELFFBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxZQUFXO0FBQzVCLFlBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUN2QixnQkFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDO0FBQ2hCLGdCQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtBQUNuRCxvQkFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDakIsMEJBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUN2QyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO0FBQ25DLDBCQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO2lCQUN2QjthQUNKLENBQUMsQ0FBQztBQUNILG1CQUFPLE1BQU0sQ0FBQztTQUNqQixNQUFNO0FBQ0gsbUJBQU8sRUFBRSxDQUFBO1NBQ1o7S0FDSixDQUFBLEVBQUcsQ0FBQzs7O0FBR0wsUUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Q0FDNUYsQ0FBQzs7Ozs7O0FBTUYsZ0JBQWdCLENBQUMsWUFBWSxHQUFHLFlBQVc7QUFDdkMsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUMvQixRQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO0FBQzVCLFNBQUssSUFBSSxDQUFDLElBQUksTUFBTSxFQUFFO0FBQ2xCLFlBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3ZELGdCQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQyxtQkFBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDbEg7S0FDSjtDQUNKLENBQUM7Ozs7OztBQU1GLGdCQUFnQixDQUFDLGFBQWEsR0FBRyxZQUFXO0FBQ3hDLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzdCLFFBQUksTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLENBQUM7QUFDekIsUUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7QUFRMUIsUUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFTLFFBQVEsRUFBRTtBQUMvQixZQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzdCLFlBQUksTUFBTSxDQUFDOztBQUVYLFlBQUksR0FBRyxHQUFHLE1BQU0sRUFBRTtBQUNkLGtCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztTQUNyQixNQUFNLElBQUksR0FBRyxHQUFHLE1BQU0sR0FBRyxNQUFNLEVBQUU7QUFDOUIsa0JBQU0sR0FBRyxNQUFNLElBQUksQUFBQyxHQUFHLEdBQUcsTUFBTSxJQUFLLENBQUMsQ0FBQSxBQUFDLENBQUM7U0FDM0MsTUFBTTtBQUNILGtCQUFNLEdBQUcsTUFBTSxHQUFHLE9BQU8sSUFBSSxBQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxJQUFLLENBQUMsQ0FBQSxBQUFDLENBQUM7U0FDOUQ7O0FBRUQsZUFBTyxRQUFRLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQztLQUMxQyxDQUFDO0NBQ0wsQ0FBQzs7Ozs7Ozs7QUFRRixnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsVUFBUyxJQUFJLEVBQUU7QUFDeEMsUUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNkLFlBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQzFCO0FBQ0QsUUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzdCLGVBQU8sSUFBSSxDQUFDLElBQUksQ0FBQztLQUNwQjtBQUNELFFBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDM0IsUUFBSSxJQUFJLENBQUM7QUFDVCxRQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFDakIsWUFBSSxHQUFHLE9BQU8sQ0FBQztLQUNsQixNQUFNO0FBQ0gsWUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDeEQsZ0JBQUksR0FBRyxNQUFNLENBQUM7U0FDakIsTUFBTSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUNwQyxnQkFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDaEIsb0JBQUksR0FBRyxLQUFLLENBQUM7YUFDaEIsTUFBTTtBQUNILG9CQUFJLEdBQUcsTUFBTSxDQUFDO2FBQ2pCO1NBQ0osTUFBTTtBQUNILGdCQUFJLEdBQUcsU0FBUyxDQUFDO1NBQ3BCO0tBQ0o7O0FBRUQsUUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLFdBQU8sSUFBSSxDQUFDO0NBQ2YsQ0FBQzs7Ozs7Ozs7QUFRRixnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsVUFBUyxFQUFFLEVBQUUsU0FBUyxFQUFFOztBQUVuRCxRQUFJLElBQUk7UUFDSixJQUFJLEdBQUcsSUFBSTtRQUNYLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7QUFFM0IsUUFBSSxTQUFTLEdBQUcsU0FBUyxtQkFBbUIsR0FBRztBQUMzQyxZQUFJLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7O0FBRXpDLFlBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDdkMsZ0JBQUksSUFBSSxnQkFBZ0IsQ0FBQztTQUM1QixNQUFNO0FBQ0gsZ0JBQUksSUFBSSxlQUFlLENBQUM7U0FDM0I7QUFDRCxZQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDbkIsY0FBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7QUFDMUUsZ0JBQUksSUFBSSwwREFBMEQsQ0FBQTtTQUNyRTs7QUFFRCxVQUFFLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO0tBQ3hDLENBQUM7OztBQUdGLE1BQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLE1BQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7O0FBR3pCLFFBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFOztBQUVqRCxlQUFPO0tBQ1YsTUFBTTtBQUNILGlCQUFTLEdBQUcsQ0FBQyxHQUFHLCtDQUErQyxTQUFTLENBQUEsR0FBSSxHQUFHLENBQUM7QUFDaEYsWUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDL0I7O0FBRUQsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFaEMsUUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVsRCxNQUFFLENBQUMsU0FBUyxHQUFHLFVBQVUsR0FBRyxJQUFJLENBQUM7O0FBRWpDLFlBQVEsSUFBSTtBQUNSLGFBQUssS0FBSztBQUNOLGdCQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ2pCLHlCQUFTLEVBQUUsQ0FBQzthQUNmLE1BQU07QUFDSCxvQkFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUM3QiwwQkFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzlCLDBCQUFVLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDM0Isd0JBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQztBQUNoQyx3QkFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0FBQzlCLDZCQUFTLEVBQUUsQ0FBQztBQUNaLHdCQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDakIsQ0FBQzthQUNMO0FBQ0Qsa0JBQU07QUFBQSxBQUNWLGFBQUssS0FBSyxDQUFDO0FBQ1gsYUFBSyxNQUFNO0FBQ1AsY0FBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzVCLGtCQUFNO0FBQUEsQUFDVixhQUFLLE1BQU0sQ0FBQztBQUNaLGFBQUssU0FBUzs7QUFFVixnQkFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUU7QUFDOUIsb0JBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0Msc0JBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLG9CQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzthQUN6QjtBQUNELGNBQUUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzdCLGtCQUFNO0FBQUEsQUFDVjs7QUFFSSxrQkFBTTtBQUFBLEtBQ2I7O0FBRUQsUUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0NBQy9CLENBQUM7Ozs7Ozs7Ozs7O0FBV0YsZ0JBQWdCLENBQUMsd0JBQXdCLEdBQUcsWUFBVztBQUNuRCxRQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLEVBQUU7QUFDakMsWUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3RELFlBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7S0FDbEM7Q0FDSixDQUFDOzs7Ozs7QUFNRixnQkFBZ0IsQ0FBQyxjQUFjLEdBQUcsWUFBVztBQUN6QyxRQUFJLFdBQVcsR0FBRyxDQUFDLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxjQUFjLENBQUMsQ0FBQztBQUNyRSxRQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFO0FBQ2pELG1CQUFXLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELGdCQUFRLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0tBQ25DLENBQUMsQ0FBQztDQUNOLENBQUM7Ozs7OztBQU1GLGdCQUFnQixDQUFDLGNBQWMsR0FBRyxZQUFXO0FBQ3pDLFFBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBLEFBQUMsQ0FBQzs7QUFFMUMsUUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZELFNBQUssQ0FBQyxTQUFTLEdBQUcsZUFBZSxDQUFDOzs7Ozs7OztBQVFsQyxRQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7QUFFZCxTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hCLFlBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEMsWUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7OztBQUdsQixZQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7QUFHbkQsWUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZixjQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7U0FDOUI7O0FBRUQsWUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQSxBQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7O0FBRWxMLGFBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDekI7O0FBRUQsUUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDOzs7QUFHdEIsVUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBLFlBQVc7QUFDekIsWUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDckMsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0FBR25CLFFBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFOzs7OztBQUtiLFlBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFlBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ2hDO0NBQ0osQ0FBQzs7Ozs7Ozs7QUFRRixnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsVUFBUyxTQUFTLEVBQUU7QUFDL0MsUUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDdEIsWUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNyQixZQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3RCLFlBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixZQUFJLE9BQU8sR0FBRyxTQUFTLHdCQUF3QixDQUFDLEtBQUssRUFBRTtBQUNuRCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZCLGdCQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtBQUM5QyxvQkFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztBQUM3QiwwQkFBVSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzlCLDBCQUFVLENBQUMsTUFBTSxHQUFHLFlBQVc7QUFDM0Isd0JBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUM5Qix3QkFBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0FBQ2hDLHdCQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztpQkFDakIsQ0FBQztBQUNGLG9CQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUNqQjtTQUNKLENBQUM7O0FBRUYsZUFBTyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQSxHQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLGVBQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFBLEdBQUksR0FBRyxDQUFDLENBQUM7S0FDeEM7Q0FDSixDQUFDOzs7Ozs7QUFNRixnQkFBZ0IsQ0FBQyxtQkFBbUIsR0FBRyxVQUFTLElBQUksRUFBRSxTQUFTLEVBQUU7O0FBRTdELFFBQUksSUFBSSxHQUFHLElBQUksQ0FBQztBQUNoQixRQUFJLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFFBQUksR0FBRyxDQUFDO0FBQ1IsUUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUV0RSxhQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUU7QUFDakIsWUFBSSxHQUFHLEVBQUU7QUFDTCxrQkFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUM1QjtBQUNELFlBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNqQixZQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxvQ0FBb0MsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekUsWUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRTs7QUFFdEIsZ0JBQUksU0FBUyxLQUFLLGNBQWMsRUFBRTtBQUM5QixvQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3pCO0FBQ0QsZ0JBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM1QixnQkFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7U0FDbkM7QUFDRCxlQUFPLEVBQUUsQ0FBQztLQUNiLENBQUM7O0FBRUYsYUFBUyxPQUFPLEdBQUc7QUFDZixZQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLHlCQUF5QixDQUFDLEVBQUUsRUFBRTtBQUNwRCxjQUFFLENBQUMsbUJBQW1CLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDakUsQ0FBQyxDQUFDO0FBQ0gsWUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7S0FDNUI7O0FBRUQsUUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFO0FBQ1YsWUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxxQkFBcUIsQ0FBQyxFQUFFLEVBQUU7QUFDaEQsY0FBRSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQzlELENBQUMsQ0FBQztLQUNOO0FBQ0QsT0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLFFBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztDQUNwQixDQUFDOzs7Ozs7QUFNRixnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsWUFBVztBQUN2QyxRQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztBQUV2QixRQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDbEIsWUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUMvQixZQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNsQixpQkFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDOztBQUUvQixpQkFBSyxDQUFDLFdBQVcsR0FBRyxVQUFTLEdBQUcsRUFBRTtBQUM5QixvQkFBSSxHQUFHLEVBQUU7QUFDTCwyQkFBTyxLQUFLLENBQUM7aUJBQ2hCO0FBQ0QsdUJBQU8sSUFBSSxDQUFDO2FBQ2YsQ0FBQztTQUNMO0FBQ0QsYUFBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDOUMsYUFBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0MsYUFBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUMsU0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzNFOztBQUVELFVBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRCxVQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7QUFHeEMsVUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUMsVUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7Q0FDaEQsQ0FBQzs7Ozs7Ozs7QUFRRixnQkFBZ0IsQ0FBQyxXQUFXLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDekMsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUMvQixZQUFRLEdBQUcsQ0FBQyxJQUFJO0FBQ1osYUFBSyxXQUFXOztBQUVaLGdCQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFLE1BQU07QUFBQSxBQUNoQyxhQUFLLFlBQVk7QUFDYixnQkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxNQUFNLENBQUMsT0FBTztBQUNmLGdCQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLGtCQUFNO0FBQUEsQUFDVixhQUFLLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDbkIsYUFBSyxVQUFVLENBQUM7QUFDaEIsYUFBSyxhQUFhO0FBQ2QsZ0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsa0JBQU07QUFBQSxBQUNWLGFBQUssbUJBQW1CO0FBQ3BCLGdCQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztBQUNoQyxrQkFBTTtBQUFBLEFBQ1YsYUFBSyxPQUFPO0FBQ1IsZ0JBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNqQixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxNQUFNO0FBQ1AsZ0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLGtCQUFNO0FBQUEsQUFDVixhQUFLLFFBQVE7QUFDVCxnQkFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3JCLGtCQUFNO0FBQUEsS0FDYjtDQUNKLENBQUM7Ozs7Ozs7QUFPRixnQkFBZ0IsQ0FBQyxZQUFZLEdBQUcsVUFBUyxHQUFHLEVBQUU7QUFDMUMsUUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2QsWUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN2RCxlQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7S0FDSjtBQUNELFFBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQzlCLGVBQU87S0FDVjtBQUNELFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsUUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsUUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDOztBQUViLFFBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDekIsUUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVuQyxRQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDdEMsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDdkUsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7Q0FDMUUsQ0FBQzs7Ozs7OztBQU9GLGdCQUFnQixDQUFDLFdBQVcsR0FBRyxVQUFTLEdBQUcsRUFBRTtBQUN6QyxRQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNoQixlQUFPO0tBQ1Y7QUFDRCxRQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzFCLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsUUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDM0IsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNyQixRQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ25DLFFBQUksTUFBTSxHQUFHO0FBQ1QsU0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEFBQUM7QUFDM0YsU0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEFBQUM7S0FDOUYsQ0FBQzs7QUFFRixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQzs7QUFFckIsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOztBQUU3RCxXQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRXJCLFlBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFOUIsWUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUU7QUFDakIsZ0JBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssR0FBRyxHQUFHLENBQUMsRUFBRTtBQUM5RixzQkFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDOUM7U0FDSjs7QUFFRCxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLGdCQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLFFBQVEsQ0FBQztBQUN2QyxnQkFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1NBQzlEO0tBQ0o7Q0FDSixDQUFDOzs7Ozs7O0FBT0YsZ0JBQWdCLENBQUMsVUFBVSxHQUFHLFVBQVMsR0FBRyxFQUFFO0FBQ3hDLFFBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2hCLGVBQU87S0FDVjtBQUNELFFBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkIsUUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdEIsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN6QixRQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JCLFFBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLFFBQUksT0FBTyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUM7Ozs7QUFJbkMsWUFBUSxHQUFHLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxRQUFRLEdBQUcsRUFBRSxDQUFDOztBQUUxRCxRQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLFFBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7O0FBRTFELFFBQUksT0FBTyxHQUFHLFNBQVYsT0FBTyxDQUFZLEVBQUUsRUFBRTtBQUN2QixZQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO0FBQ3BCLGdCQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUU7QUFDVCxzQkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTtBQUM5Qix1QkFBTyxLQUFLLENBQUM7YUFDaEI7U0FDSixNQUFNLElBQUksRUFBRSxDQUFDLFNBQVMsS0FBSyxhQUFhLEVBQUU7QUFDdkMsbUJBQU8sS0FBSyxDQUFDO1NBQ2hCLE1BQU07QUFDSCxtQkFBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUMxQjtLQUNKLENBQUE7O0FBRUQsUUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFcEUsUUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLGdCQUFnQixHQUFHLFNBQVMsRUFBRTtBQUMxRCxZQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7S0FDckMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxnQkFBZ0IsR0FBRyxTQUFTLEVBQUU7QUFDakUsWUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ3JDLE1BQU07QUFDSCxZQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNqQzs7O0FBR0QsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7QUFDOUQsWUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzVDLFlBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekMsWUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2QsZUFBRyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3JDO0FBQ0QsWUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUN4QyxlQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7U0FDeEI7S0FDSjs7QUFFRCxRQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7O0FBRWxDLFFBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7QUFFakIsUUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0NBQ3BDLENBQUM7Ozs7OztBQU1GLGdCQUFnQixDQUFDLHdCQUF3QixHQUFHLFlBQVc7QUFDbkQsVUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBLFlBQVc7QUFDekIsWUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2IsWUFBSSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0tBQ3hDLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDdEIsQ0FBQzs7Ozs7O0FBTUYsZ0JBQWdCLENBQUMsYUFBYSxHQUFHLFlBQVc7QUFDeEMsUUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDaEYsWUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFELFlBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQSxZQUFXO0FBQzVDLGdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDYixnQkFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMxQixnQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzdELENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7S0FDdEI7Q0FDSixDQUFDOzs7Ozs7O0FBT0YsZ0JBQWdCLENBQUMsT0FBTyxHQUFHLFVBQVMsU0FBUyxFQUFFLElBQUksRUFBRTtBQUNqRCxRQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZCxlQUFPO0tBQ1Y7QUFDRCxRQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDZCxRQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ25DLFFBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDbkMsUUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUNwQyxRQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JCLFFBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7QUFDbkIsUUFBSSxHQUFHLEdBQUcsU0FBUyxDQUFDO0FBQ3BCLFFBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3BDLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIsUUFBSSxTQUFTLENBQUM7O0FBRWQsUUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDMUIsWUFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3ZCLHVCQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztTQUNsQztBQUNELFlBQUksT0FBTyxJQUFJLENBQUMsV0FBVyxLQUFLLFFBQVEsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7QUFDaEYsdUJBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQy9CLHVCQUFXLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNqRDtLQUNKOzs7QUFHRCxRQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQzs7QUFFekUsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNqQixZQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzVEOzs7QUFHRCxRQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7QUFHdEIsUUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDWCxZQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztLQUN6QixNQUFNO0FBQ0gsWUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO0FBQ2hCLGdCQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2pELE1BQU07QUFDSCxnQkFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ2xDLGFBQUMsR0FBRyxDQUFDLENBQUM7U0FDVDtLQUNKOztBQUVELFFBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7O0FBR3JDLFFBQUksTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUM7Ozs7QUFJekIsUUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOztBQUVULGlCQUFTLEdBQUcsY0FBYyxDQUFDO0tBQzlCLE1BQU07O0FBRUgsWUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEtBQUssV0FBVyxLQUFLLFFBQVEsSUFBSSxXQUFXLEtBQUssTUFBTSxDQUFBLENBQUMsR0FBSyxDQUFDLEdBQUcsQ0FBQyxBQUFDLEVBQUU7QUFDckYsZUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztBQUN0QixrQkFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQixrQkFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQixnQkFBSSxHQUFHLENBQUMsQ0FBQztTQUNaLE1BQU07QUFDSCxlQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0FBQ3ZCLGtCQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLGtCQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLGdCQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDYjs7QUFFRCxZQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ25CLGdCQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztBQUNoQyxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JDLE1BQU0sSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN4QixnQkFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO0FBQ3JDLGdCQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ2xEOztBQUVELGNBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO0FBQ3ZDLGNBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQzs7QUFFbkMsY0FBTSxDQUFDLFVBQVUsQ0FBQyxZQUFXO0FBQ3pCLGtCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7U0FDdkMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0FBR1IsbUJBQVcsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUV4QyxpQkFBUyxHQUFHLGFBQWEsQ0FBQztLQUM3Qjs7QUFFRCxRQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNwRCxRQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxFQUFFLFNBQVMsR0FBRyxHQUFHLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUd0RixTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hCLFlBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRTs7QUFFbkIsZUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsR0FBRyxNQUFNLEdBQUksV0FBVyxHQUFHLElBQUksQUFBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1NBQzdGO0FBQ0QsbUJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQy9EOzs7QUFHRCxRQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDM0UsWUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ2hCO0NBQ0osQ0FBQzs7Ozs7O0FBTUYsZ0JBQWdCLENBQUMsU0FBUyxHQUFHLFlBQVc7QUFDcEMsUUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztDQUNqRyxDQUFDOzs7Ozs7QUFNRixnQkFBZ0IsQ0FBQyxTQUFTLEdBQUcsWUFBVztBQUNwQyxRQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO0NBQ2pHLENBQUM7Ozs7Ozs7OztBQVNGLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxZQUFXO0FBQ3BDLFFBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNqRCxRQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ25CLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXJCLFFBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7QUFDckUsZUFBTztLQUNWO0FBQ0QsUUFBSSxPQUFPLE1BQU0sS0FBSyxVQUFVLEVBQUU7QUFDOUIsWUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUM7QUFDN0IsWUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ2hCOzs7QUFHRCxRQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3BDLFlBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUN0RSxlQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssVUFBVSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUN0RjtDQUNKLENBQUM7Ozs7Ozs7OztBQVNGLGdCQUFnQixDQUFDLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsVUFBUyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTs7QUFFdEYsYUFBUyw0QkFBNEIsQ0FBQyxDQUFDLEVBQUU7QUFDckMsWUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUMxQyxZQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3hCLFlBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqRCxhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwQyxnQkFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3RCLHdCQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLHNCQUFNO2FBQ1Q7U0FDSjtLQUNKOztBQUVELFFBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUV6RSxRQUFJLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNuQyxRQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDeEMsWUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNyQixDQUFDLFFBQVEsQ0FBQyxFQUNWLENBQUMsNEJBQTRCLENBQUMsQ0FDakMsQ0FBQTtLQUNKLE1BQU07QUFDSCxZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxZQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO0tBQ2hFO0NBQ0osQ0FBQzs7Ozs7Ozs7OztBQVVGLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLEdBQUcsVUFBUyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtBQUMxRixRQUFJLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNuQyxRQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZDLFlBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELFlBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ1IsZ0JBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRSxnQkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQzs7O0FBR25FLG1CQUFPLElBQUksQ0FBQztTQUNmO0tBQ0o7O0FBRUQsV0FBTyxLQUFLLENBQUE7Q0FDZixDQUFDOzs7Ozs7QUFNRixnQkFBZ0IsQ0FBQyxPQUFPLEdBQUcsWUFBVztBQUNsQyxRQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O0FBRS9CLFFBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7OztBQUdyQixRQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDbEIsYUFBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDakQsYUFBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQsYUFBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDL0MsU0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzlFO0FBQ0QsVUFBTSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RELFVBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsVUFBTSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR3pDLFNBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtBQUM3QixZQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3RDLGdCQUFJLE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsRUFBRTtBQUNuQyxvQkFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0U7U0FDSjtLQUNKO0FBQ0QsUUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7OztBQUd6QixTQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7O0FBRXJGLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQixRQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7Q0FDNUIsQ0FBQzs7Ozs7Ozs7QUFRRixnQkFBZ0IsQ0FBQyxFQUFFLEdBQUcsVUFBUyxTQUFTLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRTtBQUNuRCxRQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUNsRSxVQUFFLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFBLEFBQUMsS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQSxBQUFDLENBQUM7QUFDN0QsWUFBSSxDQUFDLEtBQUssRUFBRTtBQUNSLGdCQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNyQyxNQUFNO0FBQ0gsZ0JBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hDO0tBQ0o7Q0FDSixDQUFDOzs7Ozs7Ozs7QUFTRixnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsVUFBUyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQzdDLFFBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDMUIsZUFBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUMvQztBQUNELFdBQU8sQ0FBQyxDQUFDLENBQUM7Q0FDYixDQUFDOzs7Ozs7OztBQVFGLGdCQUFnQixDQUFDLEdBQUcsR0FBRyxVQUFTLFNBQVMsRUFBRSxJQUFJLEVBQUU7QUFDN0MsUUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEMsUUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDWixlQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEM7Q0FDSixDQUFDOzs7Ozs7OztBQVFGLGdCQUFnQixDQUFDLElBQUksR0FBRyxVQUFTLFNBQVMsRUFBRTtBQUN4QyxRQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDaEQsUUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUMxQixZQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLG1CQUFPLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEg7S0FDSjtDQUNKLENBQUM7Ozs7OztBQU1GLGdCQUFnQixDQUFDLEtBQUssR0FBRyxZQUFXO0FBQ2hDLFFBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUNoQixRQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdEIsUUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztDQUMxRSxDQUFDOzs7Ozs7QUFNRixnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsVUFBUyxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ2xELFFBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLFFBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztBQUNqQyxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixRQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDdEIsUUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QixRQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0NBQzFFLENBQUM7Ozs7OztBQU1GLGdCQUFnQixDQUFDLFNBQVMsR0FBRyxZQUFXOztBQUVwQyxRQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDakIsWUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pGLFlBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNuRixZQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDZixNQUFNO0FBQ0gsWUFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3BDLFlBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4QztDQUNKLENBQUM7Ozs7OztBQU1GLGdCQUFnQixDQUFDLElBQUksR0FBRyxZQUFXO0FBQy9CLFFBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5RCxRQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNwRixDQUFDOzs7Ozs7QUFNRixnQkFBZ0IsQ0FBQyxLQUFLLEdBQUcsWUFBVztBQUNoQyxRQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDakUsQ0FBQzs7Ozs7OztBQU9GLGdCQUFnQixDQUFDLElBQUksR0FBRyxZQUFXO0FBQy9CLFFBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO0NBQ3ZCLENBQUM7Ozs7Ozs7QUFPRixnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUNqQyxRQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNyQixRQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Q0FDakIsQ0FBQzs7Ozs7Ozs7QUFRRixnQkFBZ0IsQ0FBQyxJQUFJLEdBQUcsWUFBVztBQUMvQixRQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWixRQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztDQUN2QixDQUFDOzs7Ozs7QUFNRixnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUNqQyxRQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztDQUN4QixDQUFDOztxQkFFYSxPQUFPOzs7Ozs7Ozs7Ozs7OztBQzkvQ3RCLFlBQVksQ0FBQzs7Ozt5QkFFTyxlQUFlOzs7O0FBRW5DLDBCQUFXLHVCQUFRLFNBQVMsQ0FBQyxRQUFRLEVBQUUsWUFBVztBQUM5QyxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbEIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7QUFDcEIsWUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFlBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hCLG9CQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxvQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztBQUM1QyxvQkFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUMsb0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7O0FBRTVDLGdCQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCx3QkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUM7QUFDakMsd0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEIsTUFBTTtBQUNILHdCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQztBQUNsQyx3QkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDdkI7O0FBRUQsb0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztBQUM3QyxvQkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDakQsc0JBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUMzQyxDQUFDLENBQUM7O0FBRUgsb0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsa0JBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pFO0tBQ0o7Q0FDSixDQUFDLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakJGLFlBQVksQ0FBQzs7Ozt5QkFFTyxlQUFlOzs7O0FBRW5DLDBCQUFXLHVCQUFRLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBUyxJQUFJLEVBQUU7QUFDL0MsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFFBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ3BCLFlBQUksTUFBTSxHQUFHLENBQUMsVUFBUyxNQUFNLEVBQUU7QUFDM0IsZ0JBQUksTUFBTSxLQUFLLFVBQVUsRUFBRTtBQUN2Qix1QkFBTyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ3RCLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDN0QsdUJBQU8sTUFBTSxDQUFDO2FBQ2pCO0FBQ0QsbUJBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7U0FDakMsQ0FBQSxDQUFFLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO0FBQ3RELFlBQUksSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7QUFDdkIsWUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsWUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxlQUFPLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDOztBQUV2QyxZQUFJLFVBQVUsR0FBRyxTQUFTLFVBQVUsR0FBRztBQUNuQyxnQkFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDakQsaUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xDLG9CQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxvQkFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFDbEMsb0JBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLG9CQUFJLENBQUMsS0FBSyxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ3pCLHdCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQztpQkFDbEM7QUFDRCxvQkFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ3pCLDBCQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQzVELENBQUM7QUFDRix3QkFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQztBQUNELG1CQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUN2QixtQkFBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNqQyxDQUFDOztBQUVGLGtCQUFVLEVBQUUsQ0FBQzs7QUFFYixjQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU1QixjQUFNLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFXO0FBQ2hDLGdCQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUNwQixxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbEMsd0JBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO0FBQ2xDLHdCQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ3ZCLDRCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQztxQkFDbEM7aUJBQ0o7YUFDSjtTQUNKLENBQUMsQ0FBQzs7QUFFSCxjQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFXO0FBQy9CLGdCQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNqQixnQkFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLHNCQUFVLEVBQUUsQ0FBQztTQUNoQixDQUFDLENBQUM7S0FDTjtDQUNKLENBQUMsQ0FBQzs7Ozs7Ozs7QUM3RUgsWUFBWSxDQUFDOzs7O3lCQUVPLGVBQWU7Ozs7QUFFbkMsSUFBSSxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVwQixJQUFJLG9CQUFvQixHQUFHLHVCQUFRLFNBQVMsQ0FBQyxZQUFZLENBQUM7QUFDMUQsSUFBSSxrQkFBa0IsR0FBRyx1QkFBUSxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQ3RELElBQUksbUJBQW1CLEdBQUcsdUJBQVEsU0FBUyxDQUFDLFdBQVcsQ0FBQzs7Ozs7O0FBTXhELElBQUksS0FBSyxHQUFJLGlCQUFpQixJQUFJLE1BQU0sSUFBSSxLQUFLLElBQUksSUFBSSxlQUFlLEVBQUUsQUFBQyxDQUFDOzs7Ozs7QUFNNUUsSUFBSSxRQUFRLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7O0FBTXJCLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsSUFBSSxZQUFZLENBQUM7O0FBRWpCLElBQUksVUFBVSxDQUFDOztBQUVmLElBQUksUUFBUSxDQUFDOztBQUViLElBQUksWUFBWSxDQUFDOztBQUVqQixJQUFJLE1BQU0sQ0FBQzs7QUFFWCxJQUFJLE1BQU0sQ0FBQzs7QUFFWCxJQUFJLGNBQWMsQ0FBQzs7QUFFbkIsSUFBSSxPQUFPLENBQUM7O0FBRVosSUFBSSxhQUFhLEdBQUcsS0FBSyxDQUFDOzs7Ozs7Ozs7O0FBVTFCLFNBQVMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO0FBQ3ZDLFdBQU8sV0FBVyxJQUFJLEtBQUssR0FBRyxLQUFLLEdBQUcsR0FBRyxDQUFBLEFBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEdBQUcsS0FBSyxDQUFBLEFBQUMsR0FBRyxRQUFRLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztDQUM3SDs7Ozs7Ozs7QUFRRCxTQUFTLFdBQVcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3ZCLFFBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNULEtBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEIsS0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQixXQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Q0FDbkM7Ozs7Ozs7O0FBUUQsU0FBUyx1QkFBdUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ25DLFdBQU8sQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO0NBQy9COzs7Ozs7O0FBT0QsU0FBUyxVQUFVLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFdBQU8sS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFTLEtBQUssRUFBRTtBQUMzRCxlQUFPO0FBQ0gsZ0JBQUksRUFBRSxLQUFLLENBQUMsS0FBSztBQUNqQixlQUFHLEVBQUUsS0FBSyxDQUFDLEtBQUs7U0FDbkIsQ0FBQTtLQUNKLENBQUMsQ0FBQztDQUNOOzs7Ozs7OztBQVFELFNBQVMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFDaEMsUUFBSSxhQUFhLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNwRCxRQUFJLFdBQVcsR0FBRyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQzlDLFdBQU8sV0FBVyxHQUFHLGFBQWEsQ0FBQztDQUN0Qzs7Ozs7OztBQU9ELFNBQVMsb0JBQW9CLENBQUMsR0FBRyxFQUFFO0FBQy9CLFFBQUksTUFBTSxHQUFHO0FBQ1Qsa0JBQVUsRUFBRSxDQUFDO0FBQ2Isa0JBQVUsRUFBRSxDQUFDO0FBQ2Isa0JBQVUsRUFBRSxDQUFDO0FBQ2IsY0FBTSxFQUFFLENBQUM7QUFDVCxjQUFNLEVBQUUsQ0FBQztBQUNULGVBQU8sRUFBRSxDQUFDO0FBQ1YsZUFBTyxFQUFFLENBQUM7S0FDYixDQUFDO0FBQ0YsUUFBSSxPQUFPLEdBQUcsQ0FBQztRQUNYLE9BQU8sR0FBRyxDQUFDLENBQUM7QUFDaEIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLE1BQU0sQ0FBQztBQUNwRCxRQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO1FBQ3BDLFNBQVM7UUFBRSxNQUFNLENBQUM7QUFDdEIsYUFBUyxHQUFHLEtBQUssQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN4RCxVQUFNLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztBQUNqRSxRQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDMUMsUUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNoQixlQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixlQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QjtBQUNELFFBQUksU0FBUyxJQUFJLE1BQU0sRUFBRSxPQUFPLE1BQU0sQ0FBQztBQUN2QyxRQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEQsUUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hELFFBQUksS0FBSyxFQUFFO0FBQ1AsWUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixjQUFNLEdBQUc7QUFDTCxzQkFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQ3ZCLHNCQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDdkIsc0JBQVUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztBQUN2QixtQkFBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3BCLG1CQUFPLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDcEIsa0JBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQixrQkFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2xCLGtCQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDdEIsQ0FBQztLQUNMLE1BQU0sSUFBSSxLQUFLLEVBQUU7QUFDZCxZQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLGNBQU0sR0FBRztBQUNMLHNCQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDdEIsc0JBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN0QixtQkFBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3BCLG1CQUFPLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDcEIsa0JBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQixrQkFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3JCLENBQUM7S0FDTDtBQUNELFdBQU8sTUFBTSxDQUFDO0NBQ2pCOzs7Ozs7OztBQVFELFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckIsV0FBTztBQUNILFNBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxHQUFJLENBQUM7QUFDbEIsU0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUksQ0FBQztLQUNyQixDQUFBO0NBQ0o7Ozs7OztBQU1ELFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRTtBQUNwQixnQkFBWSxHQUFHLENBQUMsQ0FBQztBQUNqQixjQUFVLEdBQUcsSUFBSSxJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxDQUFDO0NBQzdDOzs7Ozs7QUFNRCxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDdkIsd0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFckMsUUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUN4RCxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQy9CLFFBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ2xDLHFCQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLFlBQUksU0FBUyxHQUFHLG9CQUFvQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzNDLG9CQUFZLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUM3QyxjQUFNLEdBQUcsU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbEMsY0FBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLG9CQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNoQyxnQkFBUSxHQUFHLElBQUksQ0FBQztBQUNoQixZQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsWUFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUU7QUFDL0IsMEJBQWMsR0FBRyxJQUFJLENBQUM7QUFDdEIsZ0JBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDMUIsZ0JBQUksV0FBVyxHQUFHLFNBQVMsQ0FBQztBQUN4QixpQkFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO0FBQ25CLGlCQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7YUFDdEIsRUFBRTtBQUNDLGlCQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDbkIsaUJBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSzthQUN0QixDQUFDLENBQUM7QUFDSCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyx1QkFBdUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDakgsTUFBTSxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN2QyxnQkFBSSxJQUFJLEdBQUcsQUFBQyxJQUFJLElBQUksRUFBRSxDQUFFLE9BQU8sRUFBRSxDQUFDO0FBQ2xDLG1CQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQ1osZ0JBQUksSUFBSSxHQUFHLGNBQWMsR0FBRyxHQUFHLEVBQUU7QUFDN0IsbUJBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNyQix1QkFBTyxHQUFHLENBQUMsQ0FBQzthQUNmO0FBQ0QsMEJBQWMsR0FBRyxJQUFJLENBQUM7U0FDekI7S0FDSjtDQUNKOzs7Ozs7O0FBT0QsU0FBUyxXQUFXLENBQUMsR0FBRyxFQUFFO0FBQ3RCLFFBQUksYUFBYSxFQUFFO0FBQ2YsWUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsWUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3BCLFlBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsWUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ2pCLGdCQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNoQyxvQkFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLENBQUM7QUFDMUMsbUJBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUNyQiwwQkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hCLHNCQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ2QsTUFBTSxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxZQUFZLEdBQUcsQ0FBQyxFQUFFO0FBQzNELG9CQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBQztBQUMxQyxtQkFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3JCLHlCQUFTLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztBQUMxQixzQkFBTSxHQUFHLENBQUMsQ0FBQzthQUNkO0FBQ0QsbUJBQU8sR0FBRyxNQUFNLENBQUM7O0FBRWpCLGdCQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDWix1QkFBTzthQUNWO1NBQ0o7S0FDSjtBQUNELHVCQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7Q0FDdkM7Ozs7OztBQU1ELFNBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTtBQUMxQixRQUFJLFVBQVUsR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDO0FBQ2pDLFFBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUNwQixRQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsZ0JBQVksR0FBRyxZQUFZLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbEQsUUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDdEUsUUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDdEo7Ozs7OztBQU1ELFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUNyQixRQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQy9DLFFBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDckQsUUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3BCLFNBQUssR0FBRyxZQUFZLEdBQUcsS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxRSxRQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNsRTs7Ozs7O0FBTUQsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ3JCLFFBQUksYUFBYSxFQUFFO0FBQ2YsWUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsWUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFOztBQUNmLHNCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsa0JBQU0sR0FBRyxDQUFDLENBQUM7U0FDZCxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRTs7QUFDckIsc0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixrQkFBTSxHQUFHLENBQUMsQ0FBQztTQUNkLE1BQU0sSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFOztBQUN0QiwyQkFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLHNCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIseUJBQWEsR0FBRyxLQUFLLENBQUM7U0FDekI7O0FBRUQsWUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ1osbUJBQU87U0FDVjtLQUNKO0FBQ0Qsc0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztDQUN0Qzs7Ozs7O0FBTUQsU0FBUyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3BCLFFBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUNwQixRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQy9CLFFBQUksTUFBTSxHQUFHO0FBQ1QsU0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEFBQUM7QUFDM0YsU0FBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEFBQUM7S0FDOUYsQ0FBQztBQUNGLFFBQUksVUFBVSxHQUFHO0FBQ2IsU0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDeEIsU0FBQyxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUM7S0FDM0IsQ0FBQztBQUNGLFFBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7Q0FDL0Y7Ozs7Ozs7QUFPRCxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDMUIsUUFBSSxHQUFHLEdBQUc7QUFDTixjQUFNLEVBQUUsQ0FBQztBQUNULGFBQUssRUFBRSxDQUFDO0tBQ1gsQ0FBQztBQUNGLE9BQUc7QUFDQyxXQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7QUFDcEMsZUFBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7S0FDbEMsUUFDTSxPQUFPLEVBQUU7QUFDaEIsV0FBTyxHQUFHLENBQUM7Q0FDZDs7Ozs7Ozs7O0FBU0QsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtBQUN4QyxRQUFJLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDYixRQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsYUFBUyxHQUFHO0FBQ1IsYUFBSyxFQUFFO0FBQ0gsZ0JBQUksRUFBRSxHQUFHLENBQUMsSUFBSTtBQUNkLGVBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztTQUNmO0FBQ0QsV0FBRyxFQUFFO0FBQ0QsZ0JBQUksRUFBRSxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXO0FBQ2pDLGVBQUcsRUFBRSxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZO1NBQ25DO0tBQ0osQ0FBQztBQUNGLFFBQUksR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUNwQyxPQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixPQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN6QixXQUFRLEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBRTtDQUN6Qzs7Ozs7Ozs7QUFRRCxTQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQzFCLFFBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNmLFFBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4RCxRQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEQsUUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZELFFBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNyRCxRQUFJLEFBQUMsTUFBTSxJQUFJLE1BQU0sSUFBTSxNQUFNLElBQUksTUFBTSxBQUFDLEVBQUU7QUFDMUMsWUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO0FBQ2xCLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2QsTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDekIsa0JBQU0sR0FBRyxDQUFDLENBQUM7U0FDZCxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUN6QixrQkFBTSxHQUFHLENBQUMsQ0FBQztTQUNkLE1BQU07QUFDSCxrQkFBTSxHQUFHLENBQUMsQ0FBQztTQUNkO0tBQ0osTUFBTSxJQUFLLE1BQU0sSUFBSSxNQUFNLEVBQUc7QUFDM0IsWUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDbkIsa0JBQU0sR0FBRyxDQUFDLENBQUM7U0FDZCxNQUFNLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO0FBQzFCLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7S0FFSixNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUN6QixZQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUNuQixrQkFBTSxHQUFHLENBQUMsQ0FBQztTQUNkLE1BQU0sSUFBSSxNQUFNLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDMUIsa0JBQU0sR0FBRyxDQUFDLENBQUM7U0FDZDtLQUNKLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDN0MsY0FBTSxHQUFHLENBQUMsQ0FBQztLQUNkO0FBQ0QsV0FBTyxNQUFNLENBQUM7Q0FDakI7Ozs7OztBQU1ELFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUNyQixRQUFJLFlBQVksSUFBSSxDQUFDLEVBQUUsT0FBTztBQUM5QixRQUFJLElBQUksR0FBRyxRQUFRO1FBQ2YsSUFBSTtRQUFFLEdBQUc7UUFBRSxLQUFLO1FBQUUsQ0FBQztRQUFFLENBQUM7UUFBRSxHQUFHO1FBQUUsS0FBSztRQUFFLEdBQUc7UUFBRSxNQUFNO1FBQUUsT0FBTyxDQUFDO0FBQzdELFNBQUssR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxVQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztBQUN6QixLQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ3BDLEtBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7QUFDckMsT0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixTQUFLLEdBQUc7QUFDSixZQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQSxHQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVTtBQUN0RSxXQUFHLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQSxHQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsVUFBVTtLQUN2RSxDQUFDO0FBQ0YsT0FBRyxHQUFHO0FBQ0YsWUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQztBQUNwQixXQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO0tBQ3JCLENBQUM7QUFDRixRQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztBQUNsQixPQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQzs7QUFFaEIsV0FBTyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUU7QUFDdkIsYUFBSyxFQUFFLEtBQUs7QUFDWixXQUFHLEVBQUUsR0FBRztLQUNYLENBQUMsQ0FBQztBQUNILFlBQVEsT0FBTztBQUNYLGFBQUssQ0FBQztBQUNGLGdCQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDNUIsZUFBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1QixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxDQUFDO0FBQ0YsZ0JBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUM1QixlQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDMUIsa0JBQU07QUFBQSxBQUNWLGFBQUssQ0FBQztBQUNGLGdCQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLGVBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUIsa0JBQU07QUFBQSxBQUNWLGFBQUssQ0FBQztBQUNGLGdCQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLGVBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUMxQixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxDQUFDO0FBQ0YsZUFBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1QixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxDQUFDO0FBQ0YsZUFBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQzFCLGtCQUFNO0FBQUEsQUFDVixhQUFLLENBQUM7QUFDRixnQkFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM5QixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxDQUFDO0FBQ0YsZ0JBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUM1QixrQkFBTTtBQUFBLEtBQ2I7QUFDRCxRQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3hCLFlBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztLQUMvRDtBQUNELFFBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7QUFDekIsV0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxHQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0tBQzlEO0FBQ0QsUUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUM7QUFDOUMsUUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FFN0k7O0FBRUQsdUJBQVEsTUFBTSxDQUFDO0FBQ1gsZ0JBQVksRUFBRSxZQUFZO0FBQzFCLGVBQVcsRUFBRSxXQUFXO0FBQ3hCLGNBQVUsRUFBRSxVQUFVO0NBQ3pCLENBQUMsQ0FBQzs7QUFFSCx1QkFBUSxTQUFTLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlTbGlkZXIgZnJvbSAnLi4vLi4vLi4vc3JjL2lzbGlkZXIuanMnO1xuaW1wb3J0ICcuLi8uLi8uLi9zcmMvcGx1Z2lucy9idXR0b24uanMnO1xuaW1wb3J0ICcuLi8uLi8uLi9zcmMvcGx1Z2lucy9kb3QuanMnO1xuaW1wb3J0ICcuLi8uLi8uLi9zcmMvcGx1Z2lucy96b29tcGljLmpzJztcblxubGV0IGxpc3QgPSBbXG4gICAge2NvbnRlbnQ6IFwiLi4vaW1ncy9oaWdoLzEuanBnXCJ9LFxuICAgIHtjb250ZW50OiBcIi4uL2ltZ3MvaGlnaC8yLmpwZ1wifSxcbiAgICB7Y29udGVudDogXCIuLi9pbWdzL2hpZ2gvMy5qcGdcIn0sXG4gICAge2NvbnRlbnQ6IFwiLi4vaW1ncy9oaWdoLzQuanBnXCJ9LFxuICAgIHtjb250ZW50OiBcIi4uL2ltZ3MvaGlnaC81LmpwZ1wifSxcbiAgICB7Y29udGVudDogXCIuLi9pbWdzL2hpZ2gvNi5qcGdcIn0sXG4gICAge2NvbnRlbnQ6IFwiLi4vaW1ncy9oaWdoLzcuanBnXCJ9LFxuICAgIHtjb250ZW50OiBcIi4uL2ltZ3MvaGlnaC84LmpwZ1wifSxcbiAgICB7Y29udGVudDogXCIuLi9pbWdzL2hpZ2gvOS5qcGdcIn1cbl07XG5cbmxldFx0aXNsaWRlciA9IG5ldyBpU2xpZGVyKHtcbiAgICB0eXBlOiAncGljJyxcbiAgICBkYXRhOiBsaXN0LFxuICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpU2xpZGVyLXdyYXBwZXJcIiksXG4gICAgaXNMb29waW5nOiB0cnVlLFxuICAgIHBsdWdpbnM6IFsnYnV0dG9uJywgWyd6b29tcGljJywge2N1cnJlbnRTY2FsZToxLHpvb21GYWN0b3I6IDJ9XV0sXG59KTtcblxuXG5pc2xpZGVyLmZpcmUoJ2luaXRpYWxpemUnKTtcbmlzbGlkZXIuX3JlbmRlcldyYXBwZXIoKTtcbmlzbGlkZXIuX2luaXRQbHVnaW5zKCk7XG5pc2xpZGVyLl9iaW5kSGFuZGxlcigpO1xuXG5cblxuXG4iLCIvKipcbiAqIEEgc2ltcGxlLCBlZmZpY2VudCBtb2JpbGUgc2xpZGVyIHNvbHV0aW9uXG4gKiBAZmlsZSBpU2xpZGVyLmpzXG4gKiBAYXV0aG9yIEJFLUZFIFRlYW1cbiAqICAgIHFiYXR5IHFiYXR5LnFpQGdtYWlsLmNvbVxuICogICAgeGlleXUzMzMzMyB4aWV5dTMzMzMzQGdtYWlsLmNvbVxuICogICAgc2hpbmF0ZSBzaGluZS53YW5ncnNAZ21haWwuY29tXG4gKlxuICogQExJQ0VOU0UgaHR0cHM6Ly9naXRodWIuY29tL0JFLUZFL2lTbGlkZXIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVjayBpbiBhcnJheVxuICogQHBhcmFtIG9FbGVtZW50XG4gKiBAcGFyYW0gYVNvdXJjZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGluQXJyYXkob0VsZW1lbnQsIGFTb3VyY2UpIHtcbiAgICByZXR1cm4gYVNvdXJjZS5pbmRleE9mKG9FbGVtZW50KSA+IC0xO1xufTtcblxuLyoqXG4gKiBDaGVjayBpcyBhcnJheVxuICogQHBhcmFtIG9cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0FycmF5KG8pIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuLyoqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY2xzXG4gKiBAcmV0dXJucyB7QXJyYXl8e2luZGV4OiBudW1iZXIsIGlucHV0OiBzdHJpbmd9fVxuICovXG5mdW5jdGlvbiBoYXNDbGFzcyhvYmosIGNscykge1xuICAgIHJldHVybiBvYmouY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBjbHMgKyAnKFxcXFxzfCQpJykpO1xufVxuXG4vKipcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjbHNcbiAqL1xuZnVuY3Rpb24gYWRkQ2xhc3Mob2JqLCBjbHMpIHtcbiAgICBpZiAoIWhhc0NsYXNzKG9iaiwgY2xzKSkge1xuICAgICAgICBvYmouY2xhc3NOYW1lICs9ICcgJyArIGNscztcbiAgICB9XG59XG5cbi8qKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGNsc1xuICovXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhvYmosIGNscykge1xuICAgIGlmIChoYXNDbGFzcyhvYmosIGNscykpIHtcbiAgICAgICAgb2JqLmNsYXNzTmFtZSA9IG9iai5jbGFzc05hbWUucmVwbGFjZShSZWdFeHAoJyhcXFxcc3xeKScgKyBjbHMgKyAnKFxcXFxzfCQpJyksICcnKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2hlY2NrIGlzIHVybFxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVXJsKHVybCkge1xuICAgIGlmICgvPFxcLz9bXj5dKj4vZy50ZXN0KHVybCkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIHZhciByZWdleCA9ICdeJyArXG4gICAgICAgICcoKChodHRwc3xodHRwfGZ0cHxydHNwfG1tcyk6KT8vLyk/JyArXG4gICAgICAgICcoKFswLTlhLXpfIX4qXFwnKCkuJj0rJCUtXSs6ICk/WzAtOWEtel8hfipcXCcoKS4mPSskJS1dK0ApPycgK1xuICAgICAgICAnKChbMC05XXsxLDN9Lil7M31bMC05XXsxLDN9fChbMC05YS16XyF+KlxcJygpLV0rLikqKFswLTlhLXpdWzAtOWEtei1dezAsNjF9KT9bMC05YS16XS5bYS16XXsyLDZ9KT8nICtcbiAgICAgICAgJyg6WzAtOV17MSw0fSk/JyArXG4gICAgICAgICcoW15cXD8jXSspPycgK1xuICAgICAgICAnKFxcXFxcXD9bXiNdKyk/JyArXG4gICAgICAgICcoIy4rKT8nICtcbiAgICAgICAgJyQnO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4KS50ZXN0KHVybCk7XG59XG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogaVNsaWNlcihbW3tFbGVtZW50fSBjb250YWluZXIsXSB7QXJyYXl9IGRhdGFsaXN0LF0ge29iamVjdH0gb3B0aW9ucylcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lclxuICogQHBhcmFtIHtBcnJheX0gZGF0YWxpc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiAgb3B0aW9ucy5kb20gPiBjb250YWluZXJcbiAqICBvcHRpb25zLmRhdGEgPiBkYXRhbGlzdFxuICovXG52YXIgaVNsaWRlciA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIDMpO1xuICAgIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXJzIHJlcXVpcmVkIScpO1xuICAgIH1cblxuICAgIHZhciBvcHRzID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3Muc2xpY2UoLTEpWzBdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyBhcmdzLnBvcCgpIDoge307XG5cbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdHMuZGF0YSB8fCBhcmdzWzFdO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBvcHRzLmRvbSA9IG9wdHMuZG9tIHx8IGFyZ3NbMF07XG4gICAgfVxuXG4gICAgaWYgKCFvcHRzLmRvbSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRhaW5lciBjYW4gbm90IGJlIGVtcHR5IScpO1xuICAgIH1cblxuICAgIGlmICghb3B0cy5kYXRhIHx8ICFvcHRzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YSBtdXN0IGJlIGFuIGFycmF5IGFuZCBtdXN0IGhhdmUgbW9yZSB0aGFuIG9uZSBlbGVtZW50IScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE9wdGlvbnNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX29wdHMgPSBvcHRzO1xuXG4gICAgLyoqXG4gICAgICogbGlzdGVuZXJcbiAgICAgKiBAdHlwZSB7e319XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9MU04gPSB7fTtcblxuICAgIC8qKlxuICAgICAqIEV2ZW50IGhhbmRsZVxuICAgICAqIEB0eXBlIHt7fX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX0V2ZW50SGFuZGxlID0ge307XG5cbiAgICBvcHRzID0gYXJncyA9IG51bGw7XG5cbiAgICB0aGlzLl9zZXR0aW5nKCk7XG5cbiAgICB0aGlzLmZpcmUoJ2luaXRpYWxpemUnKTtcbiAgICB0aGlzLl9yZW5kZXJXcmFwcGVyKCk7XG4gICAgdGhpcy5faW5pdFBsdWdpbnMoKTtcbiAgICB0aGlzLl9iaW5kSGFuZGxlcigpO1xufTtcblxuLyoqXG4gKiBFdmVudCB3aGl0ZSBsaXN0XG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXIuRVZFTlRTID0gJ2luaXRpYWxpemUgc2xpZGUgc2xpZGVTdGFydCBzbGlkZUVuZCBzbGlkZUNoYW5nZSBzbGlkZUNoYW5nZWQgc2xpZGVSZXN0b3JlIHNsaWRlUmVzdG9yZWQgcmVsb2FkRGF0YSByZXNldCBkZXN0cm95Jy5zcGxpdCgnICcpO1xuXG4vKipcbiAqIEVhc2luZyB3aGl0ZSBsaXN0XG4gKiBAdHlwZSBbQXJyYXksIFJlZ0V4cFtdXVxuICogQHByb3RlY3RlZFxuICovXG5pU2xpZGVyLkVBU0lORyA9IFtcbiAgICAnbGluZWFyIGVhc2UgZWFzZS1pbiBlYXNlLW91dCBlYXNlLWluLW91dCcuc3BsaXQoJyAnKSxcbiAgICAvY3ViaWMtYmV6aWVyXFwoKFteXFxkXSooXFxkKy4/XFxkKilbXlxcLF0qXFwsPyl7NH1cXCkvXG5dO1xuXG4vKipcbiAqIFRBR1Mgd2hpdGVsaXN0IG9uIGZpeHBhZ2UgbW9kZVxuICogQHR5cGUge0FycmF5fVxuICogQHByb3RlY3RlZFxuICovXG5pU2xpZGVyLkZJWF9QQUdFX1RBR1MgPSAnU0VMRUNUIElOUFVUIFRFWFRBUkVBIEJVVFRPTiBMQUJFTCcuc3BsaXQoJyAnKTtcblxuLyoqXG4gKiBUaGUgZW1wdHkgZnVuY3Rpb25cbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXIuRU1QVFlfRlVOQ1RJT04gPSBmdW5jdGlvbigpIHt9O1xuXG4vKipcbiAqIEV4dGVuZFxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyLmV4dGVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtYWluLCBleHRlbmQsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgbWFpbiA9IGlTbGlkZXIucHJvdG90eXBlO1xuICAgICAgICAgICAgZXh0ZW5kID0gYXJnc1swXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBtYWluID0gYXJnc1swXTtcbiAgICAgICAgICAgIGV4dGVuZCA9IGFyZ3NbMV07XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBleHRlbmQpIHtcbiAgICAgICAgaWYgKGV4dGVuZC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgIG1haW5bcHJvcGVydHldID0gZXh0ZW5kW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogUGx1Z2luc1xuICogQHR5cGUge3t9fVxuICogQHByb3RlY3RlZFxuICovXG5pU2xpZGVyLnBsdWdpbnMgPSB7fTtcblxuLyoqXG4gKiBAcGFyYW0gbmFtZVxuICogQHBhcmFtIHBsdWdpblxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyLnJlZ1BsdWdpbiA9IGZ1bmN0aW9uKG5hbWUsIHBsdWdpbikge1xuICAgIGlTbGlkZXIucGx1Z2luc1tuYW1lXSA9IGlTbGlkZXIucGx1Z2luc1tuYW1lXSB8fCBwbHVnaW47XG59O1xuXG4vKipcbiAqIGFuaW1hdGlvbiBwYXJtYXM6XG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBkb20g5Zu+54mH55qE5aSW5bGCPGxpPuWuueWZqCBJbWcgd3JhcHBlclxuICogQHBhcmFtIHtTdHJpbmd9IGF4aXMg5Yqo55S75pa55ZCRIGFuaW1hdGUgZGlyZWN0aW9uXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGUg5a655Zmo5a695bqmIE91dGVyIHdyYXBwZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSBpIDxsaT7lrrnlmahpbmRleCBJbWcgd3JhcHBlcidzIGluZGV4XG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0IOa7keWKqOi3neemuyBtb3ZlIGRpc3RhbmNlXG4gKiBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXIuX2FuaW1hdGVGdW5jcyA9IHtcbiAgICAnZGVmYXVsdCc6IGZ1bmN0aW9uKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH1cbn07XG5cbi8qKlxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXIuX3RyYW5zaXRpb25FbmRFdmVudCA9IChmdW5jdGlvbigpIHtcbiAgICB2YXIgZXZ0TmFtZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChldnROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gZXZ0TmFtZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlRWxlbWVudCcpO1xuICAgICAgICB2YXIgdHJhbnNpdGlvbnMgPSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgICAgIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciB0IGluIHRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbnMuaGFzT3duUHJvcGVydHkodCkgJiYgZWwuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZXZ0TmFtZSA9IHRyYW5zaXRpb25zW3RdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59KSgpO1xuXG4vKipcbiAqIFRoaXMgaXMgYSBhbGlhcywgY29uZHVjaXZlIHRvIGNvbXByZXNzaW9uXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52YXIgaVNsaWRlclByb3RvdHlwZSA9IGlTbGlkZXIucHJvdG90eXBlO1xuXG4vKipcbiAqICYgaVNsaWRlci5leHRlbmRcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5leHRlbmQgPSBpU2xpZGVyLmV4dGVuZDtcblxuLyoqXG4gKiBzZXR0aW5nIHBhcmFtZXRlcnMgZm9yIHNsaWRlclxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fc2V0dGluZyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgLyoqXG4gICAgICogVGhlIHBsdWdpbnNcbiAgICAgKiBAdHlwZSB7QXJyYXl8e318Kn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX3BsdWdpbnMgPSBpU2xpZGVyLnBsdWdpbnM7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEB0eXBlIHt7ZGVmYXVsdDogRnVuY3Rpb259fCp9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9hbmltYXRlRnVuY3MgPSBpU2xpZGVyLl9hbmltYXRlRnVuY3M7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmxvY2tpbmcgPSBmYWxzZTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gLSBTZXQgb3B0aW9uc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICB2YXIgb3B0cyA9IHRoaXMuX29wdHM7XG5cbiAgICAvKipcbiAgICAgKiBkb20gZWxlbWVudCB3cmFwcGluZyBjb250ZW50XG4gICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMud3JhcCA9IG9wdHMuZG9tO1xuXG4gICAgLyoqXG4gICAgICogRGF0YSBsaXN0XG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmRhdGEgPSBvcHRzLmRhdGE7XG5cbiAgICAvKipcbiAgICAgKiBkZWZhdWx0IHNsaWRlIGRpcmVjdGlvblxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmlzVmVydGljYWwgPSAhIW9wdHMuaXNWZXJ0aWNhbDtcblxuICAgIC8qKlxuICAgICAqIE92ZXJzcHJlYWQgbW9kZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmlzT3ZlcnNwcmVhZCA9ICEhb3B0cy5pc092ZXJzcHJlYWQ7XG5cbiAgICAvKipcbiAgICAgKiBQbGF5IHRpbWUgZ2FwXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5kdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgMjAwMDtcblxuICAgIC8qKlxuICAgICAqIHN0YXJ0IGZyb20gaW5pdEluZGV4IG9yIDBcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmluaXRJbmRleCA9IG9wdHMuaW5pdEluZGV4ID4gMCAmJiBvcHRzLmluaXRJbmRleCA8IG9wdHMuZGF0YS5sZW5ndGggLSAxID8gb3B0cy5pbml0SW5kZXggOiAwO1xuXG4gICAgLyoqXG4gICAgICogdG91Y2hzdGFydCBwcmV2ZW50IGRlZmF1bHQgdG8gZml4UGFnZVxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmZpeFBhZ2UgPSBvcHRzLmZpeFBhZ2UgPT0gbnVsbCA/IHRydWUgOiAhIW9wdHMuZml4UGFnZTtcblxuICAgIC8qKlxuICAgICAqIHNsaWRlSW5kZXhcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4IHx8IHRoaXMuaW5pdEluZGV4IHx8IDA7XG5cbiAgICAvKipcbiAgICAgKiBBeGlzXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5heGlzID0gdGhpcy5pc1ZlcnRpY2FsID8gJ1knIDogJ1gnO1xuXG4gICAgLyoqXG4gICAgICogcmV2ZXJzZUF4aXNcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5yZXZlcnNlQXhpcyA9IHRoaXMuYXhpcyA9PT0gJ1knID8gJ1gnIDogJ1knO1xuXG4gICAgLyoqXG4gICAgICogV3JhcHBlciB3aWR0aFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLndpZHRoID0gdGhpcy53cmFwLmNsaWVudFdpZHRoO1xuXG4gICAgLyoqXG4gICAgICogV3JhcHBlciBoZWlnaHRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5oZWlnaHQgPSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0O1xuXG4gICAgLyoqXG4gICAgICogUmF0aW8gaGVpZ2h0OndpZHRoXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMucmF0aW8gPSB0aGlzLmhlaWdodCAvIHRoaXMud2lkdGg7XG5cbiAgICAvKipcbiAgICAgKiBTY2FsZSwgc2l6ZSBydWxlXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2NhbGUgPSB0aGlzLmlzVmVydGljYWwgPyB0aGlzLmhlaWdodCA6IHRoaXMud2lkdGg7XG5cbiAgICAvKipcbiAgICAgKiBPbiBzbGlkZSBvZmZzZXQgcG9zaXRpb25cbiAgICAgKiBAdHlwZSB7e1g6IG51bWJlciwgWTogbnVtYmVyfX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQgfHwge1xuICAgICAgICBYOiAwLFxuICAgICAgICBZOiAwXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZS9kaXNhYmxlIHRvdWNoIGV2ZW50c1xuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pc1RvdWNoYWJsZSA9IG9wdHMuaXNUb3VjaGFibGUgPT0gbnVsbCA/IHRydWUgOiAhIW9wdHMuaXNUb3VjaGFibGU7XG5cbiAgICAvKipcbiAgICAgKiBsb29waW5nIGxvZ2ljIGFkanVzdFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pc0xvb3BpbmcgPSBvcHRzLmlzTG9vcGluZyAmJiB0aGlzLmRhdGEubGVuZ3RoID4gMSA/IHRydWUgOiBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEF1dG9QbGF5IHdhaXR0aW5nIG1pbHNlY29uZCB0byBzdGFydFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmRlbGF5ID0gb3B0cy5kZWxheSB8fCAwO1xuXG4gICAgLyoqXG4gICAgICogYXV0b3BsYXkgbG9naWMgYWRqdXN0XG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmlzQXV0b3BsYXkgPSBvcHRzLmlzQXV0b3BsYXkgJiYgdGhpcy5kYXRhLmxlbmd0aCA+IDEgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBBbmltYXRlIHR5cGVcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5hbmltYXRlVHlwZSA9IG9wdHMuYW5pbWF0ZVR5cGUgaW4gdGhpcy5fYW5pbWF0ZUZ1bmNzID8gb3B0cy5hbmltYXRlVHlwZSA6ICdkZWZhdWx0JztcblxuICAgIC8qKlxuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICB0aGlzLl9hbmltYXRlRnVuYyA9IHRoaXMuX2FuaW1hdGVGdW5jc1t0aGlzLmFuaW1hdGVUeXBlXTtcblxuICAgIC8vIGxpdHRsZSB0cmljayBzZXQsIHdoZW4geW91IGNob29jZSB0ZWFyICYgdmVydGljYWwgc2FtZSB0aW1lXG4gICAgLy8gaVNsaWRlciBvdmVyc3ByZWFkIG1vZGUgd2lsbCBiZSBzZXQgdHJ1ZSBhdXRvbWV0aWNseVxuICAgIGlmICh0aGlzLmlzVmVydGljYWwgJiYgdGhpcy5hbmltYXRlVHlwZSA9PT0gJ2NhcmQnKSB7XG4gICAgICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWJ1ZyBtb2RlXG4gICAgICogQHR5cGUge2Z1bmN0aW9ufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5sb2cgPSBvcHRzLmlzRGVidWcgPyBmdW5jdGlvbigpIHtcbiAgICAgICAgZ2xvYmFsLmNvbnNvbGUubG9nLmFwcGx5KGdsb2JhbC5jb25zb2xlLCBhcmd1bWVudHMpO1xuICAgIH0gOiBpU2xpZGVyLkVNUFRZX0ZVTkNUSU9OO1xuXG4gICAgLy8gc2V0IERhbXBpbmcgZnVuY3Rpb25cbiAgICB0aGlzLl9zZXRVcERhbXBpbmcoKTtcblxuICAgIC8vIHN0b3AgYXV0b3BsYXkgd2hlbiB3aW5kb3cgYmx1clxuICAgIC8vIHRoaXMuX3NldFBsYXlXaGVuRm9jdXMoKTtcblxuICAgIC8qKlxuICAgICAqIGFuaW1hdGUgcHJvY2VzcyB0aW1lIChtcyksIGRlZmF1bHQ6IDMwMG1zXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5hbmltYXRlVGltZSA9IG9wdHMuYW5pbWF0ZVRpbWUgIT0gbnVsbCAmJiBvcHRzLmFuaW1hdGVUaW1lID4gLTEgPyBvcHRzLmFuaW1hdGVUaW1lIDogMzAwO1xuXG4gICAgLyoqXG4gICAgICogYW5pbWF0ZSBlZmZlY3RzLCBkZWZhdWx0OiBlYXNlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5hbmltYXRlRWFzaW5nID1cbiAgICAgICAgaW5BcnJheShvcHRzLmFuaW1hdGVFYXNpbmcsIGlTbGlkZXIuRUFTSU5HWzBdKSB8fCBpU2xpZGVyLkVBU0lOR1sxXS50ZXN0KG9wdHMuYW5pbWF0ZUVhc2luZykgPyBvcHRzLmFuaW1hdGVFYXNpbmcgOiAnZWFzZSc7XG5cbiAgICAvKipcbiAgICAgKiBJbiBzbGlkZSBhbmltYXRpb25cbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pbkFuaW1hdGUgPSAwO1xuXG4gICAgLyoqXG4gICAgICogRml4IHRvdWNoL21vdXNlIGV2ZW50c1xuICAgICAqIEB0eXBlIHt7aGFzVG91Y2gsIHN0YXJ0RXZ0LCBtb3ZlRXZ0LCBlbmRFdnR9fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5kZXZpY2VFdmVudHMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBoYXNUb3VjaCA9ICEhKCgnb250b3VjaHN0YXJ0JyBpbiBnbG9iYWwpIHx8IGdsb2JhbC5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgZ2xvYmFsLkRvY3VtZW50VG91Y2gpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFzVG91Y2g6IGhhc1RvdWNoLFxuICAgICAgICAgICAgc3RhcnRFdnQ6IGhhc1RvdWNoID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZG93bicsXG4gICAgICAgICAgICBtb3ZlRXZ0OiBoYXNUb3VjaCA/ICd0b3VjaG1vdmUnIDogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICBlbmRFdnQ6IGhhc1RvdWNoID8gJ3RvdWNoZW5kJyA6ICdtb3VzZXVwJ1xuICAgICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICAvKipcbiAgICAgKiBJbml0IGV2ZW50c1xuICAgICAqIEB0eXBlIHt7fX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZXZlbnRzID0ge307XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIC0gUmVnaXN0ZXIgZXZlbnRzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgaXMgbW92aW5nXG4gICAgdGhpcy5vbignc2xpZGUnLCBvcHRzLm9uc2xpZGUsIDEpO1xuXG4gICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB5b3VyIGZpbmdlciB0b3VjaCB0aGUgc2NyZWVuXG4gICAgdGhpcy5vbignc2xpZGVTdGFydCcsIG9wdHMub25zbGlkZXN0YXJ0LCAxKTtcblxuICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGZpbmdlciBtb3ZlIG91dCBvZiB0aGUgc2NyZWVuXG4gICAgdGhpcy5vbignc2xpZGVFbmQnLCBvcHRzLm9uc2xpZGVlbmQsIDEpO1xuXG4gICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBzbGlkZSB0byBuZXh0L3ByZXYgc2NlbmVcbiAgICB0aGlzLm9uKCdzbGlkZUNoYW5nZScsIG9wdHMub25zbGlkZWNoYW5nZSwgMSk7XG5cbiAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIG5leHQvcHJldiBzY2VuZSwgd2hpbGUgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWRcbiAgICB0aGlzLm9uKCdzbGlkZUNoYW5nZWQnLCBvcHRzLm9uc2xpZGVjaGFuZ2VkLCAxKTtcblxuICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gcmVzdG9yZSB0byB0aGUgY3VycmVudCBzY2VuZVxuICAgIHRoaXMub24oJ3NsaWRlUmVzdG9yZScsIG9wdHMub25zbGlkZXJlc3RvcmUsIDEpO1xuXG4gICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiByZXN0b3JlIHRvIHRoZSBjdXJyZW50IHNjZW5lLCB3aGlsZSBhbmltYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgIHRoaXMub24oJ3NsaWRlUmVzdG9yZWQnLCBvcHRzLm9uc2xpZGVyZXN0b3JlZCwgMSk7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIC0gUGx1Z2luc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5wbHVnaW5Db25maWcgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9wdHMucGx1Z2lucykpIHtcbiAgICAgICAgICAgIHZhciBjb25maWcgPSB7fTtcbiAgICAgICAgICAgIG9wdHMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIHBsdWdpbkNvbmZpZ0VhY2gocGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25maWdbcGx1Z2luWzBdXSA9IHBsdWdpbi5zbGljZSgxKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ1twbHVnaW5dID0gW107XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgIH1cbiAgICB9KSgpO1xuXG4gICAgLy8gQXV0b3BsYXkgbW9kZVxuICAgIHRoaXMuZGVsYXkgPyBnbG9iYWwuc2V0VGltZW91dCh0aGlzLl9hdXRvUGxheS5iaW5kKHRoaXMpLCB0aGlzLmRlbGF5KSA6IHRoaXMuX2F1dG9QbGF5KCk7XG59O1xuXG4vKipcbiAqIEluaXQgcGx1Z2luc1xuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5faW5pdFBsdWdpbnMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29uZmlnID0gdGhpcy5wbHVnaW5Db25maWc7XG4gICAgdmFyIHBsdWdpbnMgPSB0aGlzLl9wbHVnaW5zO1xuICAgIGZvciAodmFyIGkgaW4gY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkoaSkgJiYgcGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgdGhpcy5sb2coJ1tJTklUIFBMVUdJTl06JywgaSwgcGx1Z2luc1tpXSk7XG4gICAgICAgICAgICBwbHVnaW5zW2ldICYmIHR5cGVvZiBwbHVnaW5zW2ldID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBwbHVnaW5zW2ldLmFwcGx5ICYmIHBsdWdpbnNbaV0uYXBwbHkodGhpcywgY29uZmlnW2ldKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogZW5hYmxlIGRhbXBpbmcgd2hlbiBzbGlkZXIgbWVldCB0aGUgZWRnZVxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fc2V0VXBEYW1waW5nID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uZUluMiA9IHRoaXMuc2NhbGUgPj4gMTtcbiAgICB2YXIgb25lSW40ID0gb25lSW4yID4+IDE7XG4gICAgdmFyIG9uZUluMTYgPSBvbmVJbjQgPj4gMjtcblxuICAgIC8qKlxuICAgICAqIGluaXQgZGFtcGluZyBmdW5jdGlvblxuICAgICAqIEBwYXJhbSBkaXN0YW5jZVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fZGFtcGluZyA9IGZ1bmN0aW9uKGRpc3RhbmNlKSB7XG4gICAgICAgIHZhciBkaXMgPSBNYXRoLmFicyhkaXN0YW5jZSk7XG4gICAgICAgIHZhciByZXN1bHQ7XG5cbiAgICAgICAgaWYgKGRpcyA8IG9uZUluMikge1xuICAgICAgICAgICAgcmVzdWx0ID0gZGlzID4+IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZGlzIDwgb25lSW4yICsgb25lSW40KSB7XG4gICAgICAgICAgICByZXN1bHQgPSBvbmVJbjQgKyAoKGRpcyAtIG9uZUluMikgPj4gMik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBvbmVJbjQgKyBvbmVJbjE2ICsgKChkaXMgLSBvbmVJbjIgLSBvbmVJbjQpID4+IDMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRpc3RhbmNlID4gMCA/IHJlc3VsdCA6IC1yZXN1bHQ7XG4gICAgfTtcbn07XG5cbi8qKlxuICogR2V0IGl0ZW0gdHlwZVxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5faXRlbVR5cGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKCFpc05hTihpdGVtKSkge1xuICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2l0ZW1dO1xuICAgIH1cbiAgICBpZiAoaXRlbS5oYXNPd25Qcm9wZXJ0eSgndHlwZScpKSB7XG4gICAgICAgIHJldHVybiBpdGVtLnR5cGU7XG4gICAgfVxuICAgIHZhciBjb250ZW50ID0gaXRlbS5jb250ZW50O1xuICAgIHZhciB0eXBlO1xuICAgIGlmIChjb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgdHlwZSA9ICdlbXB0eSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKEJvb2xlYW4oY29udGVudC5ub2RlTmFtZSkgJiYgQm9vbGVhbihjb250ZW50Lm5vZGVUeXBlKSkge1xuICAgICAgICAgICAgdHlwZSA9ICdub2RlJztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGlmIChpc1VybChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAncGljJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9ICdodG1sJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHR5cGUgPSAndW5rbm93bic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpdGVtLnR5cGUgPSB0eXBlO1xuXG4gICAgcmV0dXJuIHR5cGU7XG59O1xuXG4vKipcbiAqIHJlbmRlciBzaW5nbGUgaXRlbSBodG1sIGJ5IGlkeFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggIC4uXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9yZW5kZXJJdGVtID0gZnVuY3Rpb24oZWwsIGRhdGFJbmRleCkge1xuXG4gICAgdmFyIGl0ZW0sXG4gICAgICAgIHNlbGYgPSB0aGlzLFxuICAgICAgICBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoO1xuXG4gICAgdmFyIGluc2VydEltZyA9IGZ1bmN0aW9uIHJlbmRlckl0ZW1JbnNlcnRJbWcoKSB7XG4gICAgICAgIHZhciBzaW1nID0gJyBzcmM9XCInICsgaXRlbS5jb250ZW50ICsgJ1wiJztcbiAgICAgICAgLy8gYXV0byBzY2FsZSB0byBmdWxsIHNjcmVlblxuICAgICAgICBpZiAoaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gc2VsZi5yYXRpbykge1xuICAgICAgICAgICAgc2ltZyArPSAnIGhlaWdodD1cIjEwMCVcIic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaW1nICs9ICcgd2lkdGg9XCIxMDAlXCInO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzZWxmLmlzT3ZlcnNwcmVhZCkge1xuICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoJyArIGl0ZW0uY29udGVudCArICcpIG5vLXJlcGVhdCA1MCUgNTAlL2NvdmVyJztcbiAgICAgICAgICAgIHNpbWcgKz0gJyBzdHlsZT1cImRpc3BsYXk6YmxvY2s7b3BhY2l0eTowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7XCInXG4gICAgICAgIH1cbiAgICAgICAgLy8gZm9yIHJpZ2h0IGJ1dHRvbiwgc2F2ZSBwaWN0dXJlXG4gICAgICAgIGVsLmlubmVySFRNTCA9ICc8aW1nJyArIHNpbWcgKyAnIC8+JztcbiAgICB9O1xuXG4gICAgLy8gY2xlYW4gc2NlbmVcbiAgICBlbC5pbm5lckhUTUwgPSAnJztcbiAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG5cbiAgICAvLyBnZXQgdGhlIHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgIGlmICghdGhpcy5pc0xvb3BpbmcgJiYgdGhpcy5kYXRhW2RhdGFJbmRleF0gPT0gbnVsbCkge1xuICAgICAgICAvLyBTdG9wIHNsaWRlIHdoZW4gaXRlbSBpcyBlbXB0eVxuICAgICAgICByZXR1cm47XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YUluZGV4ID0gKGxlbiAvKiAqIE1hdGguY2VpbChNYXRoLmFicyhkYXRhSW5kZXggLyBsZW4pKSovICsgZGF0YUluZGV4KSAlIGxlbjtcbiAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtkYXRhSW5kZXhdO1xuICAgIH1cblxuICAgIHZhciB0eXBlID0gdGhpcy5faXRlbVR5cGUoaXRlbSk7XG5cbiAgICB0aGlzLmxvZygnW1JlbmRlciBJVEVNXTonLCB0eXBlLCBkYXRhSW5kZXgsIGl0ZW0pO1xuXG4gICAgZWwuY2xhc3NOYW1lID0gJ2lzbGlkZXItJyArIHR5cGU7XG5cbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAncGljJzpcbiAgICAgICAgICAgIGlmIChpdGVtLmxvYWQgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50SW1nLnNyYyA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgICAgICBjdXJyZW50SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmhlaWdodCA9IGN1cnJlbnRJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gY3VycmVudEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgaW5zZXJ0SW1nKCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZCA9IDI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdkb20nOlxuICAgICAgICBjYXNlICdodG1sJzpcbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdub2RlJzpcbiAgICAgICAgY2FzZSAnZWxlbWVudCc6XG4gICAgICAgICAgICAvLyBmcmFnbWVudCwgY3JlYXRlIGNvbnRhaW5lclxuICAgICAgICAgICAgaWYgKGl0ZW0uY29udGVudC5ub2RlVHlwZSA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICB2YXIgZW50aXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgZW50aXR5LmFwcGVuZENoaWxkKGl0ZW0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgaXRlbS5jb250ZW50ID0gZW50aXR5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoaXRlbS5jb250ZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgdGhpcy5maXJlKCdyZW5kZXJDb21wbGV0ZScpO1xufTtcblxuLyoqXG4gKiBQb3N0cG9uaW5nIHRoZSBpbnRlcm1lZGlhdGUgc2NlbmUgcmVuZGVyaW5nXG4gKiB1bnRpbCB0aGUgdGFyZ2V0IHNjZW5lIGlzIGNvbXBsZXRlbHkgcmVuZGVyZWQgKHJlbmRlciBpbiBldmVudCBzbGlkZUNoYW5nZWQpXG4gKiB0byBhdm9pZCBhIGp1bXB5IGZlZWwgd2hlbiBzd2l0Y2hpbmcgYmV0d2VlbiBzY2VuZXNcbiAqIGdpdmVuIHRoYXQgdGhlIGRpc3RhbmNlIG9mIHNsaWRpbmcgaXMgbW9yZSB0aGFuIDEuXG4gKiBlLmcuIGBgYHRoaXMuc2xpZGVUbyg+Ky0xKWBgYFxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX3JlbmRlckludGVybWVkaWF0ZVNjZW5lID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVySXRlbS5hcHBseSh0aGlzLCB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSk7XG4gICAgICAgIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lID0gbnVsbDtcbiAgICB9XG59O1xuXG4vKipcbiAqIEFwcGx5IHN0eWxlcyBvbiBjaGFuZ2VkXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9jaGFuZ2VkU3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNsaWRlU3R5bGVzID0gWydpc2xpZGVyLXByZXYnLCAnaXNsaWRlci1hY3RpdmUnLCAnaXNsaWRlci1uZXh0J107XG4gICAgdGhpcy5lbHMuZm9yRWFjaChmdW5jdGlvbiBjaGFuZ2VTdHlwZUVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgIHJlbW92ZUNsYXNzKGVsLCAnKCcgKyBzbGlkZVN0eWxlcy5qb2luKCd8JykgKyAnKScpO1xuICAgICAgICBhZGRDbGFzcyhlbCwgc2xpZGVTdHlsZXNbaW5kZXhdKVxuICAgIH0pO1xufTtcblxuLyoqXG4gKiByZW5kZXIgbGlzdCBodG1sXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9yZW5kZXJXcmFwcGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5vdXRlciAmJiAodGhpcy5vdXRlci5pbm5lckhUTUwgPSAnJyk7XG4gICAgLy8gaW5pdGFpbCB1bCBlbGVtZW50XG4gICAgdmFyIG91dGVyID0gdGhpcy5vdXRlciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgIG91dGVyLmNsYXNzTmFtZSA9ICdpc2xpZGVyLW91dGVyJztcblxuICAgIC8vIHN0b3JhZ2UgbGkgZWxlbWVudHMsIG9ubHkgc3RvcmUgMyBlbGVtZW50cyB0byByZWR1Y2UgbWVtb3J5IHVzYWdlXG4gICAgLyoqXG4gICAgICogU2xpZGVyIGVsZW1lbnRzIHgzXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmVscyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgdGhpcy5lbHMucHVzaChsaSk7XG5cbiAgICAgICAgLy8gcHJlcGFyZSBzdHlsZSBhbmltYXRpb25cbiAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMobGksIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCk7XG5cbiAgICAgICAgLy8gYXV0byBvdmVyZmxvdyBpbiBub25lIGZpeFBhZ2UgbW9kZVxuICAgICAgICBpZiAoIXRoaXMuZml4UGFnZSkge1xuICAgICAgICAgICAgbGkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmlzVmVydGljYWwgJiYgKHRoaXMuYW5pbWF0ZVR5cGUgPT09ICdyb3RhdGUnIHx8IHRoaXMuYW5pbWF0ZVR5cGUgPT09ICdmbGlwJykgPyB0aGlzLl9yZW5kZXJJdGVtKGxpLCAxIC0gaSArIHRoaXMuc2xpZGVJbmRleCkgOiB0aGlzLl9yZW5kZXJJdGVtKGxpLCBpIC0gMSArIHRoaXMuc2xpZGVJbmRleCk7XG5cbiAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH1cblxuICAgIHRoaXMuX2NoYW5nZWRTdHlsZXMoKTtcblxuICAgIC8vIFByZWxvYWQgcGljdHVyZSBbIG1heSBiZSBwaWMgOikgXVxuICAgIGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLl9wcmVsb2FkSW1nKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgfS5iaW5kKHRoaXMpLCAyMDApO1xuXG4gICAgLy8gYXBwZW5kIHVsIHRvIGRpdiNjYW52YXNcbiAgICBpZiAoIXRoaXMub3V0ZXIpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm91dGVyID0gb3V0ZXI7XG4gICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBQcmVsb2FkIGltZyB3aGVuIHNsaWRlQ2hhbmdlXG4gKiBGcm9tIGN1cnJlbnQgaW5kZXggKzIsIC0yIHNjZW5lXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4IG1lYW5zIHdoaWNoIGltYWdlIHdpbGwgYmUgbG9hZFxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fcHJlbG9hZEltZyA9IGZ1bmN0aW9uKGRhdGFJbmRleCkge1xuICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMykge1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgdmFyIGxlbiA9IGRhdGEubGVuZ3RoO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBsb2FkSW1nID0gZnVuY3Rpb24gcHJlbG9hZEltZ0xvYWRpbmdQcm9jZXNzKGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRhdGFbaW5kZXhdO1xuICAgICAgICAgICAgaWYgKHNlbGYuX2l0ZW1UeXBlKGl0ZW0pID09PSAncGljJyAmJiAhaXRlbS5sb2FkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZWxvYWRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICBwcmVsb2FkSW1nLnNyYyA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgICAgICBwcmVsb2FkSW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gcHJlbG9hZEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBwcmVsb2FkSW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5sb2FkID0gMjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGl0ZW0ubG9hZCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgbG9hZEltZygoZGF0YUluZGV4ICsgMikgJSBsZW4pO1xuICAgICAgICBsb2FkSW1nKChkYXRhSW5kZXggLSAyICsgbGVuKSAlIGxlbik7XG4gICAgfVxufTtcblxuLyoqXG4gKiBXYXRjaCBldmVudCB0cmFuc2l0aW9uRW5kXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl93YXRjaFRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbih0aW1lLCBldmVudFR5cGUpIHtcblxuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgdmFyIGxzbjtcbiAgICB0aGlzLmxvZygnRXZlbnQ6JywgJ3dhdGNoVHJhbnNpdGlvbkVuZDo6c3R1Y2s6OnBpbGUnLCB0aGlzLmluQW5pbWF0ZSk7XG5cbiAgICBmdW5jdGlvbiBoYW5kbGUoZXZ0KSB7XG4gICAgICAgIGlmIChsc24pIHtcbiAgICAgICAgICAgIGdsb2JhbC5jbGVhclRpbWVvdXQobHNuKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxmLmluQW5pbWF0ZS0tO1xuICAgICAgICBzZWxmLmxvZygnRXZlbnQ6JywgJ3dhdGNoVHJhbnNpdGlvbkVuZDo6c3R1Y2s6OnJlbGVhc2UnLCBzZWxmLmluQW5pbWF0ZSk7XG4gICAgICAgIGlmIChzZWxmLmluQW5pbWF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgLy9zZWxmLmluQW5pbWF0ZSA9IDA7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnc2xpZGVDaGFuZ2VkJykge1xuICAgICAgICAgICAgICAgIHNlbGYuX2NoYW5nZWRTdHlsZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuZmlyZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgIHNlbGYuX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCk7XG4gICAgICAgIH1cbiAgICAgICAgdW5XYXRjaCgpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1bldhdGNoKCkge1xuICAgICAgICBzZWxmLmVscy5mb3JFYWNoKGZ1bmN0aW9uIHRyYW5zbGF0aW9uRW5kVW53YXRjaEVhY2goZWwpIHtcbiAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoaVNsaWRlci5fdHJhbnNpdGlvbkVuZEV2ZW50KCksIGhhbmRsZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzZWxmLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgIHNlbGYuZWxzLmZvckVhY2goZnVuY3Rpb24gdHJhbnNsYXRpb25FbmRFbHNFYWNoKGVsKSB7XG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKGlTbGlkZXIuX3RyYW5zaXRpb25FbmRFdmVudCgpLCBoYW5kbGUpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgbHNuID0gZ2xvYmFsLnNldFRpbWVvdXQoaGFuZGxlLCB0aW1lKTtcbiAgICBzZWxmLmluQW5pbWF0ZSsrO1xufTtcblxuLyoqXG4gKiBiaW5kIGFsbCBldmVudCBoYW5kbGVyLCB3aGVuIG9uIFBDLCBkaXNhYmxlIGRyYWcgZXZlbnRcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX2JpbmRIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dGVyID0gdGhpcy5vdXRlcjtcblxuICAgIGlmICh0aGlzLmlzVG91Y2hhYmxlKSB7XG4gICAgICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgaWYgKCFkZXZpY2UuaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIG91dGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIC8vIGRpc2FibGUgZHJhZ1xuICAgICAgICAgICAgb3V0ZXIub25kcmFnc3RhcnQgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLnN0YXJ0RXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2UubW92ZUV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLmVuZEV2dCwgdGhpcyk7XG4gICAgICAgICF0aGlzLmRldmljZUV2ZW50cy5oYXNUb3VjaCAmJiBvdXRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMpO1xuICAgIH1cblxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMpO1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzKTtcblxuICAgIC8vIEZpeCBhbmRyb2lkIGRldmljZVxuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMsIGZhbHNlKTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMsIGZhbHNlKTtcbn07XG5cbi8qKlxuICogIFVuaWZvcm1pdHkgYWRtaW4gZXZlbnRcbiAqICBFdmVudCByb3V0ZXJcbiAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICogIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICBzd2l0Y2ggKGV2dC50eXBlKSB7XG4gICAgICAgIGNhc2UgJ21vdXNlZG93bic6XG4gICAgICAgICAgICAvLyBibG9jayBtb3VzZSBidXR0b25zIGV4Y2VwdCBsZWZ0XG4gICAgICAgICAgICBpZiAoZXZ0LmJ1dHRvbiAhPT0gMCkgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgICAgICAgdGhpcy5zdGFydEhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGRldmljZS5tb3ZlRXZ0OlxuICAgICAgICAgICAgdGhpcy5tb3ZlSGFuZGxlcihldnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZGV2aWNlLmVuZEV2dDpcbiAgICAgICAgY2FzZSAnbW91c2VvdXQnOiAvLyBtb3VzZW91dCBldmVudCwgdHJpZ2dlciBlbmRFdmVudFxuICAgICAgICBjYXNlICd0b3VjaGNhbmNlbCc6XG4gICAgICAgICAgICB0aGlzLmVuZEhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdvcmllbnRhdGlvbmNoYW5nZSc6XG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uY2hhbmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgICAgIHRoaXMuX2F1dG9QbGF5KCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVzaXplJzpcbiAgICAgICAgICAgIHRoaXMucmVzaXplSGFuZGxlcigpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufTtcblxuLyoqXG4gKiAgdG91Y2hzdGFydCBjYWxsYmFja1xuICogIEBwYXJhbSB7b2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gKiAgQHByb3RlY3RlZFxuICovXG5pU2xpZGVyUHJvdG90eXBlLnN0YXJ0SGFuZGxlciA9IGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmICh0aGlzLmZpeFBhZ2UpIHtcbiAgICAgICAgaWYgKGlTbGlkZXIuRklYX1BBR0VfVEFHUy5pbmRleE9mKGV2dC50YXJnZXQudGFnTmFtZSkgPCAwKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5ob2xkaW5nIHx8IHRoaXMubG9ja2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICB0aGlzLmlzTW92aW5nID0gdHJ1ZTtcbiAgICB0aGlzLnBhdXNlKCk7XG5cbiAgICB0aGlzLmxvZygnRXZlbnQ6IHN0YXJ0Jyk7XG4gICAgdGhpcy5maXJlKCdzbGlkZVN0YXJ0JywgZXZ0LCB0aGlzKTtcblxuICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdGhpcy5zdGFydFggPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgICB0aGlzLnN0YXJ0WSA9IGRldmljZS5oYXNUb3VjaCA/IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZXZ0LnBhZ2VZO1xufTtcblxuLyoqXG4gKiAgdG91Y2htb3ZlIGNhbGxiYWNrXG4gKiAgQHBhcmFtIHtvYmplY3R9IGV2dCBldmVudCBvYmplY3RcbiAqICBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUubW92ZUhhbmRsZXIgPSBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoIXRoaXMuaXNNb3ZpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxvZygnRXZlbnQ6IG1vdmluZycpO1xuICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICB2YXIgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICB2YXIgYXhpcyA9IHRoaXMuYXhpcztcbiAgICB2YXIgcmV2ZXJzZUF4aXMgPSB0aGlzLnJldmVyc2VBeGlzO1xuICAgIHZhciBvZmZzZXQgPSB7XG4gICAgICAgIFg6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc3RhcnRYKSA6IChldnQucGFnZVggLSB0aGlzLnN0YXJ0WCksXG4gICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICB9O1xuXG4gICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICBpZiAoTWF0aC5hYnMob2Zmc2V0W2F4aXNdKSAtIE1hdGguYWJzKG9mZnNldFtyZXZlcnNlQXhpc10pID4gMTApIHtcblxuICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB0aGlzLmZpcmUoJ3NsaWRlJywgZXZ0LCB0aGlzKTtcblxuICAgICAgICBpZiAoIXRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICBpZiAob2Zmc2V0W2F4aXNdID4gMCAmJiB0aGlzLnNsaWRlSW5kZXggPT09IDAgfHwgb2Zmc2V0W2F4aXNdIDwgMCAmJiB0aGlzLnNsaWRlSW5kZXggPT09IGxlbiAtIDEpIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRbYXhpc10gPSB0aGlzLl9kYW1waW5nKG9mZnNldFtheGlzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmVsc1tpXTtcbiAgICAgICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMHMnO1xuICAgICAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMoaXRlbSwgYXhpcywgdGhpcy5zY2FsZSwgaSwgb2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogIHRvdWNoZW5kIGNhbGxiYWNrXG4gKiAgQHBhcmFtIHtPYmplY3R9IGV2dCBldmVudCBvYmplY3RcbiAqICBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuZW5kSGFuZGxlciA9IGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmICghdGhpcy5pc01vdmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubG9nKCdFdmVudDogZW5kJyk7XG4gICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB2YXIgYXhpcyA9IHRoaXMuYXhpcztcbiAgICB2YXIgYm91bmRhcnkgPSB0aGlzLnNjYWxlIC8gMjtcbiAgICB2YXIgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgLy8gYSBxdWljayBzbGlkZSB0aW1lIG11c3QgdW5kZXIgMzAwbXNcbiAgICAvLyBhIHF1aWNrIHNsaWRlIHNob3VsZCBhbHNvIHNsaWRlIGF0IGxlYXN0IDE0IHB4XG4gICAgYm91bmRhcnkgPSBlbmRUaW1lIC0gdGhpcy5zdGFydFRpbWUgPiAzMDAgPyBib3VuZGFyeSA6IDE0O1xuXG4gICAgdmFyIGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldFtheGlzXSk7XG4gICAgdmFyIGFic1JldmVyc2VPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXRbdGhpcy5yZXZlcnNlQXhpc10pO1xuXG4gICAgdmFyIGdldExpbmsgPSBmdW5jdGlvbihlbCkge1xuICAgICAgICBpZiAoZWwudGFnTmFtZSA9PT0gJ0EnKSB7XG4gICAgICAgICAgICBpZiAoZWwuaHJlZikge1xuICAgICAgICAgICAgICAgIGdsb2JhbC5sb2NhdGlvbi5ocmVmID0gZWwuaHJlZlxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChlbC5jbGFzc05hbWUgIT09ICdpc2xpZGVyLXBpYycpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGdldExpbmsoZWwucGFyZW50Tm9kZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmxvZyhib3VuZGFyeSwgb2Zmc2V0W2F4aXNdLCBhYnNPZmZzZXQsIGFic1JldmVyc2VPZmZzZXQsIHRoaXMpO1xuXG4gICAgaWYgKG9mZnNldFtheGlzXSA+PSBib3VuZGFyeSAmJiBhYnNSZXZlcnNlT2Zmc2V0IDwgYWJzT2Zmc2V0KSB7XG4gICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXggLSAxKTtcbiAgICB9IGVsc2UgaWYgKG9mZnNldFtheGlzXSA8IC1ib3VuZGFyeSAmJiBhYnNSZXZlcnNlT2Zmc2V0IDwgYWJzT2Zmc2V0KSB7XG4gICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXggKyAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4KTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGUgdGFwIGV2ZW50IGlmIG9mZnNldCA8IDEwXG4gICAgaWYgKE1hdGguYWJzKHRoaXMub2Zmc2V0LlgpIDwgMTAgJiYgTWF0aC5hYnModGhpcy5vZmZzZXQuWSkgPCAxMCkge1xuICAgICAgICB0aGlzLnRhcEV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICB0aGlzLnRhcEV2dC5pbml0RXZlbnQoJ3RhcCcsIHRydWUsIHRydWUpO1xuICAgICAgICBpZiAodGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICBldnQudGFyZ2V0ICYmIGdldExpbmsoZXZ0LnRhcmdldCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFldnQudGFyZ2V0LmRpc3BhdGNoRXZlbnQodGhpcy50YXBFdnQpKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMub2Zmc2V0LlggPSB0aGlzLm9mZnNldC5ZID0gMDtcblxuICAgIHRoaXMuX2F1dG9QbGF5KCk7XG5cbiAgICB0aGlzLmZpcmUoJ3NsaWRlRW5kJywgZXZ0LCB0aGlzKTtcbn07XG5cbi8qKlxuICogIG9yaWVudGF0aW9uY2hhbmdlIGNhbGxiYWNrXG4gKiAgQHByb3RlY3RlZFxuICovXG5pU2xpZGVyUHJvdG90eXBlLm9yaWVudGF0aW9uY2hhbmdlSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDogb3JpZW50YXRpb25jaGFuZ2UnKTtcbiAgICB9LmJpbmQodGhpcyksIDEwMCk7XG59O1xuXG4vKipcbiAqIHJlc2l6ZSBjYWxsYmFja1xuICogQHByb3RlY3RlZFxuICovXG5pU2xpZGVyUHJvdG90eXBlLnJlc2l6ZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5oZWlnaHQgIT09IHRoaXMud3JhcC5jbGllbnRIZWlnaHQgfHwgdGhpcy53aWR0aCAhPT0gdGhpcy53cmFwLmNsaWVudFdpZHRoKSB7XG4gICAgICAgIHRoaXMuX0xTTi5yZXNpemUgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04ucmVzaXplKTtcbiAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiByZXNpemUnKTtcbiAgICAgICAgICAgIHRoaXMuX0xTTi5yZXNpemUgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04ucmVzaXplKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCA1MDApO1xuICAgIH1cbn07XG5cbi8qKlxuICogIHNsaWRlIGxvZ2ljYWwsIGdvdG8gZGF0YSBpbmRleFxuICogIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggdGhlIGdvdG8gaW5kZXhcbiAqICBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuc2xpZGVUbyA9IGZ1bmN0aW9uKGRhdGFJbmRleCwgb3B0cykge1xuICAgIGlmICh0aGlzLmxvY2tpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnVuaG9sZCgpO1xuICAgIHZhciBhbmltYXRlVGltZSA9IHRoaXMuYW5pbWF0ZVRpbWU7XG4gICAgdmFyIGFuaW1hdGVUeXBlID0gdGhpcy5hbmltYXRlVHlwZTtcbiAgICB2YXIgYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuYztcbiAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICB2YXIgZWxzID0gdGhpcy5lbHM7XG4gICAgdmFyIGlkeCA9IGRhdGFJbmRleDtcbiAgICB2YXIgbiA9IGRhdGFJbmRleCAtIHRoaXMuc2xpZGVJbmRleDtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdmFyIGV2ZW50VHlwZTtcblxuICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKG9wdHMuYW5pbWF0ZVRpbWUgPiAtMSkge1xuICAgICAgICAgICAgYW5pbWF0ZVRpbWUgPSBvcHRzLmFuaW1hdGVUaW1lO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cy5hbmltYXRlVHlwZSA9PT0gJ3N0cmluZycgJiYgb3B0cy5hbmltYXRlVHlwZSBpbiB0aGlzLl9hbmltYXRlRnVuY3MpIHtcbiAgICAgICAgICAgIGFuaW1hdGVUeXBlID0gb3B0cy5hbmltYXRlVHlwZTtcbiAgICAgICAgICAgIGFuaW1hdGVGdW5jID0gdGhpcy5fYW5pbWF0ZUZ1bmNzW2FuaW1hdGVUeXBlXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluIHRoZSBzbGlkZSBwcm9jZXNzLCBhbmltYXRlIHRpbWUgaXMgc3F1ZWV6ZWRcbiAgICB2YXIgc3F1ZWV6ZVRpbWUgPSBNYXRoLmFicyhvZmZzZXRbdGhpcy5heGlzXSkgLyB0aGlzLnNjYWxlICogYW5pbWF0ZVRpbWU7XG5cbiAgICBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obiA+IDAgPyB0aGlzLmVsc1syXSA6IHRoaXMuZWxzWzBdLCBpZHgpO1xuICAgIH1cblxuICAgIC8vIHByZWxvYWQgd2hlbiBzbGlkZVxuICAgIHRoaXMuX3ByZWxvYWRJbWcoaWR4KTtcblxuICAgIC8vIGdldCByaWdodCBpdGVtIG9mIGRhdGFcbiAgICBpZiAoZGF0YVtpZHhdKSB7XG4gICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IGlkeDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IG4gPiAwID8gMCA6IGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IHRoaXMuc2xpZGVJbmRleDtcbiAgICAgICAgICAgIG4gPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5sb2coJ0luZGV4OicgKyB0aGlzLnNsaWRlSW5kZXgpO1xuXG4gICAgLy8ga2VlcCB0aGUgcmlnaHQgb3JkZXIgb2YgaXRlbXNcbiAgICB2YXIgaGVhZEVsLCB0YWlsRWwsIHN0ZXA7XG5cbiAgICAvLyBzbGlkZWNoYW5nZSBzaG91bGQgcmVuZGVyIG5ldyBpdGVtXG4gICAgLy8gYW5kIGNoYW5nZSBuZXcgaXRlbSBzdHlsZSB0byBmaXQgYW5pbWF0aW9uXG4gICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgLy8gUmVzdG9yZSB0byBjdXJyZW50IHNjZW5lXG4gICAgICAgIGV2ZW50VHlwZSA9ICdzbGlkZVJlc3RvcmUnO1xuICAgIH0gZWxzZSB7XG5cbiAgICAgICAgaWYgKCh0aGlzLmlzVmVydGljYWwgJiYgKGFuaW1hdGVUeXBlID09PSAncm90YXRlJyB8fCBhbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSkgXiAobiA+IDApKSB7XG4gICAgICAgICAgICBlbHMucHVzaChlbHMuc2hpZnQoKSk7XG4gICAgICAgICAgICBoZWFkRWwgPSBlbHNbMl07XG4gICAgICAgICAgICB0YWlsRWwgPSBlbHNbMF07XG4gICAgICAgICAgICBzdGVwID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVscy51bnNoaWZ0KGVscy5wb3AoKSk7XG4gICAgICAgICAgICBoZWFkRWwgPSBlbHNbMF07XG4gICAgICAgICAgICB0YWlsRWwgPSBlbHNbMl07XG4gICAgICAgICAgICBzdGVwID0gLTE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoTWF0aC5hYnMobikgPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCk7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGhlYWRFbCwgaWR4ICsgbik7XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGhlYWRFbCwgaWR4ICsgc3RlcCk7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSA9IFt0YWlsRWwsIGlkeCAtIHN0ZXBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaGVhZEVsLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgIGhlYWRFbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBoZWFkRWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICAvLyBNaW51cyBzcXVlZXplIHRpbWVcbiAgICAgICAgc3F1ZWV6ZVRpbWUgPSBhbmltYXRlVGltZSAtIHNxdWVlemVUaW1lO1xuXG4gICAgICAgIGV2ZW50VHlwZSA9ICdzbGlkZUNoYW5nZSc7XG4gICAgfVxuXG4gICAgdGhpcy5maXJlKGV2ZW50VHlwZSwgdGhpcy5zbGlkZUluZGV4LCBlbHNbMV0sIHRoaXMpO1xuICAgIHRoaXMuX3dhdGNoVHJhbnNpdGlvbkVuZChzcXVlZXplVGltZSwgZXZlbnRUeXBlICsgJ2QnLCB0aGlzLnNsaWRlSW5kZXgsIGVsc1sxXSwgdGhpcyk7XG5cbiAgICAvLyBkbyB0aGUgdHJpY2sgYW5pbWF0aW9uXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgaWYgKGVsc1tpXSAhPT0gaGVhZEVsKSB7XG4gICAgICAgICAgICAvLyBPbmx5IGFwcGxpZXMgdG8gXCJ0cmFuc2Zvcm1cIlxuICAgICAgICAgICAgZWxzW2ldLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsICcgKyAoc3F1ZWV6ZVRpbWUgLyAxMDAwKSArICdzICcgKyB0aGlzLmFuaW1hdGVFYXNpbmc7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0ZUZ1bmMuY2FsbCh0aGlzLCBlbHNbaV0sIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCk7XG4gICAgfVxuXG4gICAgLy8gSWYgbm90IGxvb3BpbmcsIHN0b3AgcGxheWluZyB3aGVuIG1lZXQgdGhlIGVuZCBvZiBkYXRhXG4gICAgaWYgKHRoaXMuaXNBdXRvcGxheSAmJiAhdGhpcy5pc0xvb3BpbmcgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBkYXRhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cbn07XG5cbi8qKlxuICogU2xpZGUgdG8gbmV4dCBzY2VuZVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnNsaWRlTmV4dCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2xpZGVUby5hcHBseSh0aGlzLCBbdGhpcy5zbGlkZUluZGV4ICsgMV0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbi8qKlxuICogU2xpZGUgdG8gcHJldmlvdXMgc2NlbmVcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5zbGlkZVByZXYgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNsaWRlVG8uYXBwbHkodGhpcywgW3RoaXMuc2xpZGVJbmRleCAtIDFdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVyIHBsdWdpbiAocnVuIHRpbWUgbW9kZSlcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBwbHVnaW5cbiAqIEBwYXJhbSB7Li4ufVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnJlZ1BsdWdpbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICB2YXIgbmFtZSA9IGFyZ3Muc2hpZnQoKSxcbiAgICAgICAgcGx1Z2luID0gYXJnc1swXTtcblxuICAgIGlmICghdGhpcy5fcGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiB0eXBlb2YgcGx1Z2luICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhpcy5fcGx1Z2luc1tuYW1lXSA9IHBsdWdpbjtcbiAgICAgICAgYXJncy5zaGlmdCgpO1xuICAgIH1cblxuICAgIC8vIEF1dG8gZW5hYmxlIGFuZCBpbml0IHBsdWdpbiB3aGVuIGF0IHJ1biB0aW1lXG4gICAgaWYgKCFpbkFycmF5KG5hbWUsIHRoaXMuX29wdHMucGx1Z2lucykpIHtcbiAgICAgICAgdGhpcy5fb3B0cy5wbHVnaW5zLnB1c2goYXJncy5sZW5ndGggPyBbXS5jb25jYXQoW25hbWVdLCBhcmdzKSA6IG5hbWUpO1xuICAgICAgICB0eXBlb2YgdGhpcy5fcGx1Z2luc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLl9wbHVnaW5zW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbn07XG5cbi8qKlxuICogIHNpbXBsZSBldmVudCBkZWxlZ2F0ZSBtZXRob2RcbiAqICBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZSBldmVudCBuYW1lXG4gKiAgQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIHRoZSBzaW1wbGUgY3NzIHNlbGVjdG9yIGxpa2UgalF1ZXJ5XG4gKiAgQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgZXZlbnQgY2FsbGJhY2tcbiAqICBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuYmluZCA9IGlTbGlkZXJQcm90b3R5cGUuZGVsZWdhdGUgPSBmdW5jdGlvbihldnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcblxuICAgIGZ1bmN0aW9uIGRlbGVnYXRlZEV2ZW50Q2FsbGJhY2tIYW5kbGUoZSkge1xuICAgICAgICB2YXIgZXZ0ID0gZ2xvYmFsLmV2ZW50ID8gZ2xvYmFsLmV2ZW50IDogZTtcbiAgICAgICAgdmFyIHRhcmdldCA9IGV2dC50YXJnZXQ7XG4gICAgICAgIHZhciBlbGVBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbGVBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZUFycltpXSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMud3JhcC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGRlbGVnYXRlZEV2ZW50Q2FsbGJhY2tIYW5kbGUsIGZhbHNlKTtcblxuICAgIHZhciBrZXkgPSBldnRUeXBlICsgJzsnICsgc2VsZWN0b3I7XG4gICAgaWYgKCF0aGlzLl9FdmVudEhhbmRsZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV0gPSBbXG4gICAgICAgICAgICBbY2FsbGJhY2tdLFxuICAgICAgICAgICAgW2RlbGVnYXRlZEV2ZW50Q2FsbGJhY2tIYW5kbGVdXG4gICAgICAgIF1cbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzBdLnB1c2goY2FsbGJhY2spO1xuICAgICAgICB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzFdLnB1c2goZGVsZWdhdGVkRXZlbnRDYWxsYmFja0hhbmRsZSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiByZW1vdmUgZXZlbnQgZGVsZWdhdGUgZnJvbSB3cmFwXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGUgZXZlbnQgbmFtZVxuICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIHRoZSBzaW1wbGUgY3NzIHNlbGVjdG9yIGxpa2UgalF1ZXJ5XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBldmVudCBjYWxsYmFja1xuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnVuYmluZCA9IGlTbGlkZXJQcm90b3R5cGUudW5EZWxlZ2F0ZSA9IGZ1bmN0aW9uKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgIHZhciBrZXkgPSBldnRUeXBlICsgJzsnICsgc2VsZWN0b3I7XG4gICAgaWYgKHRoaXMuX0V2ZW50SGFuZGxlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzBdLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLndyYXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihldnRUeXBlLCB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzFdW2ldKTtcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMF1baV0gPSB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzFdW2ldID0gbnVsbDtcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzBdW2ldO1xuICAgICAgICAgICAgLy8gZGVsZXRlIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMV1baV07XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZVxufTtcblxuLyoqXG4gKiByZW1vdmVFdmVudExpc3RlbmVyIHRvIHJlbGVhc2UgdGhlIG1lbW9yeVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ZXIgPSB0aGlzLm91dGVyO1xuICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcblxuICAgIHRoaXMuZmlyZSgnZGVzdHJveScpO1xuXG4gICAgLy8gQ2xlYXIgZXZlbnRzXG4gICAgaWYgKHRoaXMuaXNUb3VjaGFibGUpIHtcbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2Uuc3RhcnRFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5tb3ZlRXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2UuZW5kRXZ0LCB0aGlzKTtcbiAgICAgICAgIXRoaXMuZGV2aWNlRXZlbnRzLmhhc1RvdWNoICYmIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcyk7XG4gICAgfVxuICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMpO1xuICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMpO1xuICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG5cbiAgICAvLyBDbGVhciBkZWxlZ2F0ZSBldmVudHNcbiAgICBmb3IgKHZhciBuIGluIHRoaXMuX0V2ZW50SGFuZGxlKSB7XG4gICAgICAgIHZhciBoYW5kTGlzdCA9IHRoaXMuX0V2ZW50SGFuZGxlW25dWzFdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRMaXN0W2ldID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwLnJlbW92ZUV2ZW50TGlzdGVuZXIobi5zdWJzdHIoMCwgbi5pbmRleE9mKCc7JykpLCBoYW5kTGlzdFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fRXZlbnRIYW5kbGUgPSBudWxsO1xuXG4gICAgLy8gQ2xlYXIgdGltZXJcbiAgICBmb3IgKHZhciBuIGluIHRoaXMuX0xTTilcbiAgICAgICAgdGhpcy5fTFNOLmhhc093blByb3BlcnR5KG4pICYmIHRoaXMuX0xTTltuXSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTltuXSk7XG5cbiAgICB0aGlzLl9MU04gPSBudWxsO1xuXG4gICAgdGhpcy53cmFwLmlubmVySFRNTCA9ICcnO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlciBldmVudCBjYWxsYmFja1xuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLm9uID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmdW5jLCBmb3JjZSkge1xuICAgIGlmIChpbkFycmF5KGV2ZW50TmFtZSwgaVNsaWRlci5FVkVOVFMpICYmIHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICEoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSAmJiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdKTtcbiAgICAgICAgaWYgKCFmb3JjZSkge1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS5wdXNoKGZ1bmMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ldmVudHNbZXZlbnROYW1lXS51bnNoaWZ0KGZ1bmMpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBGaW5kIGNhbGxiYWNrIGZ1bmN0aW9uIHBvc2l0aW9uXG4gKiBAcGFyYW0gZXZlbnROYW1lXG4gKiBAcGFyYW0gZnVuY1xuICogQHJldHVybnMge251bWJlcn1cbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihldmVudE5hbWUsIGZ1bmMpIHtcbiAgICBpZiAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmV2ZW50c1tldmVudE5hbWVdLmluZGV4T2YoZnVuYyk7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGV2ZW50IGNhbGxiYWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUub2ZmID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgdmFyIGluZGV4ID0gdGhpcy5oYXMoZXZlbnROYW1lLCBmdW5jKTtcbiAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICBkZWxldGUgdGhpcy5ldmVudHNbZXZlbnROYW1lXVtpbmRleF07XG4gICAgfVxufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGV2ZW50IGNhbGxiYWNrc1xuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICogQHBhcmFtIHsqfSBhcmdzXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuZmlyZSA9IGZ1bmN0aW9uKGV2ZW50TmFtZSkge1xuICAgIHRoaXMubG9nKCdbRVZFTlQgRklSRV06JywgZXZlbnROYW1lLCBhcmd1bWVudHMpO1xuICAgIGlmIChldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpIHtcbiAgICAgICAgdmFyIGZ1bmNzID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHlwZW9mIGZ1bmNzW2ldID09PSAnZnVuY3Rpb24nICYmIGZ1bmNzW2ldLmFwcGx5ICYmIGZ1bmNzW2ldLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiByZXNldCAmIHJlcmVuZGVyXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gICAgdGhpcy5fc2V0dGluZygpO1xuICAgIHRoaXMuX3JlbmRlcldyYXBwZXIoKTtcbiAgICB0aGlzLmRlbGF5ICYmIGdsb2JhbC5zZXRUaW1lb3V0KHRoaXMuX2F1dG9QbGF5LmJpbmQodGhpcyksIHRoaXMuZGVsYXkpO1xufTtcblxuLyoqXG4gKiByZWxvYWQgRGF0YSAmIHJlbmRlclxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLmxvYWREYXRhID0gZnVuY3Rpb24oZGF0YSwgaW5pdEluZGV4KSB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIHRoaXMuc2xpZGVJbmRleCA9IGluaXRJbmRleCB8fCAwO1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgIHRoaXMuZmlyZSgncmVsb2FkRGF0YScpO1xuICAgIHRoaXMuZGVsYXkgJiYgZ2xvYmFsLnNldFRpbWVvdXQodGhpcy5fYXV0b1BsYXkuYmluZCh0aGlzKSwgdGhpcy5kZWxheSk7XG59O1xuXG4vKipcbiAqIGF1dG8gY2hlY2sgdG8gcGxheSBhbmQgYmluZCBldmVudHNcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX2F1dG9QbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gZW5hYmxlXG4gICAgaWYgKHRoaXMuaXNBdXRvcGxheSkge1xuICAgICAgICB0aGlzLmhhcygnc2xpZGVDaGFuZ2VkJywgdGhpcy5wbGF5KSA8IDAgJiYgdGhpcy5vbignc2xpZGVDaGFuZ2VkJywgdGhpcy5wbGF5LCAxKTtcbiAgICAgICAgdGhpcy5oYXMoJ3NsaWRlUmVzdG9yZWQnLCB0aGlzLnBsYXkpIDwgMCAmJiB0aGlzLm9uKCdzbGlkZVJlc3RvcmVkJywgdGhpcy5wbGF5LCAxKTtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vZmYoJ3NsaWRlQ2hhbmdlZCcsIHRoaXMucGxheSk7XG4gICAgICAgIHRoaXMub2ZmKCdzbGlkZVJlc3RvcmVkJywgdGhpcy5wbGF5KTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFN0YXJ0IGF1dG9wbGF5XG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX0xTTi5hdXRvUGxheSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5hdXRvUGxheSk7XG4gICAgdGhpcy5fTFNOLmF1dG9QbGF5ID0gZ2xvYmFsLnNldFRpbWVvdXQodGhpcy5zbGlkZU5leHQuYmluZCh0aGlzKSwgdGhpcy5kdXJhdGlvbik7XG59O1xuXG4vKipcbiAqIHBhdXNlIGF1dG9wbGF5XG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9MU04uYXV0b1BsYXkgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04uYXV0b1BsYXkpO1xufTtcblxuLyoqXG4gKiBNYWludGFpbmluZyB0aGUgY3VycmVudCBzY2VuZVxuICogRGlzYWJsZSB0b3VjaCBldmVudHMsIGV4Y2VwdCBmb3IgdGhlIG5hdGl2ZSBtZXRob2QuXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuaG9sZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaG9sZGluZyA9IHRydWU7XG59O1xuXG4vKipcbiAqIFJlbGVhc2UgY3VycmVudCBzY2VuZVxuICogdW5sb2NrIGF0IHNhbWUgdGltZVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnVuaG9sZCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgIHRoaXMudW5sb2NrKCk7XG59O1xuXG4vKipcbiAqIFlvdSBjYW4ndCBkbyBhbnl0aGluZyBvbiB0aGlzIHNjZW5lXG4gKiBsb2NrIG5hdGl2ZSBtZXRob2QgY2FsbHNcbiAqIGhvbGQgYXQgc2FtZSB0aW1lXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUubG9jayA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaG9sZCgpO1xuICAgIHRoaXMubG9ja2luZyA9IHRydWU7XG59O1xuXG4vKipcbiAqIHVubG9jayBuYXRpdmUgbWV0aG9kIGNhbGxzXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUudW5sb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5sb2NraW5nID0gZmFsc2U7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBpU2xpZGVyIiwiLyoqXG4gKiBUbyBjcmVhdGUgcmlnaHQmbGVmdCBib3R0b24gb24gaVNsaWRlclxuICpcbiAqIEBmaWxlIGJ1dHRvbi5qc1xuICogQGF1dGhvciBCRS1GRSBUZWFtXG4gKiAgICB4aWV5dTMzMzMzIHhpZXl1MzMzMzNAZ21haWwuY29tXG4gKiAgICBzaGluYXRlIHNoaW5lLndhbmdyc0BnbWFpbC5jb21cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaVNsaWRlciBmcm9tICcuLi9pc2xpZGVyLmpzJztcblxuaVNsaWRlciAmJiBpU2xpZGVyLnJlZ1BsdWdpbignYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgdmFyIEhBTkRMRSA9IHRoaXM7XG4gICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICB2YXIgYnRuT3V0ZXIgPSBbXTtcbiAgICAgICAgdmFyIGJ0bklubmVyID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICBidG5PdXRlcltpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItYnRuLW91dGVyJztcbiAgICAgICAgICAgIGJ0bklubmVyW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBidG5Jbm5lcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4taW5uZXInO1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmNsYXNzTmFtZSArPSAnIGxlZnQnO1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IC0xO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgKz0gJyByaWdodCc7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlyID0gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2RpcicpLCAxMCk7XG4gICAgICAgICAgICAgICAgSEFORExFLnNsaWRlVG8oSEFORExFLnNsaWRlSW5kZXggKyBkaXIpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGJ0bk91dGVyW2ldLmFwcGVuZENoaWxkKGJ0bklubmVyW2ldKTtcbiAgICAgICAgICAgIEhBTkRMRS53cmFwLmFwcGVuZENoaWxkKGJ0bk91dGVyW2ldLCBIQU5ETEUud3JhcC5uZXh0U2libGluZyk7XG4gICAgICAgIH1cbiAgICB9XG59KSIsIi8qKlxuICogVG8gY3JlYXRlIGRvdHMgaW5kZXggb24gaVNsaWRlclxuICpcbiAqIEBmaWxlIGRvdC5qc1xuICogQGF1dGhvciBCRS1GRSBUZWFtXG4gKiAgICB4aWV5dTMzMzMzIHhpZXl1MzMzMzNAZ21haWwuY29tXG4gKiAgICBzaGluYXRlIHNoaW5lLndhbmdyc0BnbWFpbC5jb21cbiAqIEBJbnN0cnVjdGlvbnNcbiAqICAgIGFjdGl2YXRpb246XG4gKiAgICAgICBuZXcgaVNsaWRlcih7XG4gKiAgICAgICAgICAuLi5cbiAqICAgICAgICAgIHBsdWdpbnM6IFsnZG90J11cbiAqICAgICAgICAgIC4uLlxuICogICAgICAgfSk7XG4gKiAgICBtb3JlIG9wdGlvbnM6XG4gKiAgICAgICBuZXcgaVNsaWRlcih7XG4gKiAgICAgICAgICAuLi5cbiAqICAgICAgICAgIHBsdWdpbnM6IFtbJ2RvdCcsIHtsb2NhdGU6J2Fic291bHV0ZSd9XV1cbiAqICAgICAgICAgIC4uLlxuICogICAgICAgfSk7XG4gKiBAb3B0aW9uc1xuICogICAgbG9jYXRlIHtzdHJpbmd8SFRNTCBFbGVtZW50fSB0aGUgd2FycHBlciBvZiBkb3RzIHZhbHVlOiAnYWJzb2x1dGUnLCAncmVsYXRpdmUnIG9yIFNwZWNpZmllZCBkb20sIGRlZmF1bHQ6ICdhYnNvbHV0ZSdcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaVNsaWRlciBmcm9tICcuLi9pc2xpZGVyLmpzJztcblxuaVNsaWRlciAmJiBpU2xpZGVyLnJlZ1BsdWdpbignZG90JywgZnVuY3Rpb24ob3B0cykge1xuICAgIHZhciBIQU5ETEUgPSB0aGlzO1xuICAgIGlmICghSEFORExFLmlzVmVydGljYWwpIHtcbiAgICAgICAgdmFyIGxvY2F0ZSA9IChmdW5jdGlvbihsb2NhdGUpIHtcbiAgICAgICAgICAgIGlmIChsb2NhdGUgPT09ICdyZWxhdGl2ZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSEFORExFLndyYXA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEJvb2xlYW4obG9jYXRlLm5vZGVOYW1lKSAmJiBCb29sZWFuKGxvY2F0ZS5ub2RlVHlwZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbG9jYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIEhBTkRMRS53cmFwLnBhcmVudE5vZGU7XG4gICAgICAgIH0pKG9wdHMgJiYgb3B0cy5sb2NhdGUgIT0gbnVsbCA/IG9wdHMubG9jYXRlIDogZmFsc2UpO1xuICAgICAgICB2YXIgZGF0YSA9IEhBTkRMRS5kYXRhO1xuICAgICAgICB2YXIgZG90cyA9IFtdO1xuICAgICAgICB2YXIgZG90V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGRvdFdyYXAuY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90LXdyYXAnO1xuXG4gICAgICAgIHZhciByZW5kZXJEb3RzID0gZnVuY3Rpb24gcmVuZGVyRG90cygpIHtcbiAgICAgICAgICAgIHZhciBmcmVnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRvdHNbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90JztcbiAgICAgICAgICAgICAgICBkb3RzW2ldLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gSEFORExFLnNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb3RzW2ldLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgSEFORExFLnNsaWRlVG8ocGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2luZGV4JyksIDEwKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmcmVnbWVudC5hcHBlbmRDaGlsZChkb3RzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvdFdyYXAuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBkb3RXcmFwLmFwcGVuZENoaWxkKGZyZWdtZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZW5kZXJEb3RzKCk7XG5cbiAgICAgICAgbG9jYXRlLmFwcGVuZENoaWxkKGRvdFdyYXApO1xuXG4gICAgICAgIEhBTkRMRS5vbignc2xpZGVDaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghSEFORExFLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3QnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5zbGlkZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEhBTkRMRS5vbigncmVsb2FkRGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGRvdHMgPSBbXTtcbiAgICAgICAgICAgIHJlbmRlckRvdHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufSk7IiwiLyoqXG4gKiBAZmlsZSB6b29tcGljLmpzXG4gKiBAYXV0aG9yIGxpdWh1aTAxIG9uIDIwMTUvMS83LlxuICogQG1vZGlmeSBzaGluYXRlIHNoaW5lLndhbmdyc0BnbWFpbC5jb21cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaVNsaWRlciBmcm9tICcuLi9pc2xpZGVyLmpzJztcblxudmFyIGdsb2JhbCA9IHdpbmRvdztcblxudmFyIHN0YXJ0SGFuZGxlck9yaWdpbmFsID0gaVNsaWRlci5wcm90b3R5cGUuc3RhcnRIYW5kbGVyO1xudmFyIGVuZEhhbmRsZXJPcmlnaW5hbCA9IGlTbGlkZXIucHJvdG90eXBlLmVuZEhhbmRsZXI7XG52YXIgbW92ZUhhbmRsZXJPcmlnaW5hbCA9IGlTbGlkZXIucHJvdG90eXBlLm1vdmVIYW5kbGVyO1xuXG4vKipcbiAqIFN1cHBvcnQgM0QgbWF0cml4IHRyYW5zbGF0ZVxuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbnZhciBoYXMzZCA9ICgnV2ViS2l0Q1NTTWF0cml4JyBpbiBnbG9iYWwgJiYgJ20xMScgaW4gbmV3IFdlYktpdENTU01hdHJpeCgpKTtcblxuLyoqXG4gKiBNaW4gc2NhbGVcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbnZhciBtaW5TY2FsZSA9IDEgLyAyO1xuXG4vKipcbiAqIFNjZW5lIHZpZXcgcmFuZ2VcbiAqIEB0eXBlIHt7fX1cbiAqL1xudmFyIHZpZXdTY29wZSA9IHt9O1xuXG52YXIgY3VycmVudFNjYWxlO1xuXG52YXIgem9vbUZhY3RvcjtcblxudmFyIHpvb21Ob2RlO1xuXG52YXIgc3RhcnRUb3VjaGVzO1xuXG52YXIgc3RhcnRYO1xuXG52YXIgc3RhcnRZO1xuXG52YXIgbGFzdFRvdWNoU3RhcnQ7XG5cbnZhciBnZXN0dXJlO1xuXG52YXIgSU5fU0NBTEVfTU9ERSA9IGZhbHNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIHRyYW5zbGF0ZVxuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKiBAcGFyYW0gelxuICogQHBhcmFtIHNjYWxlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRyYW5zbGF0ZSh4LCB5LCB6LCBzY2FsZSkge1xuICAgIHJldHVybiBcInRyYW5zbGF0ZVwiICsgKGhhczNkID8gXCIzZChcIiA6IFwiKFwiKSArIHggKyBcInB4LFwiICsgeSArIChoYXMzZCA/IFwicHgsXCIgKyB6ICsgXCJweClcIiA6IFwicHgpXCIpICsgXCJzY2FsZShcIiArIHNjYWxlICsgXCIpXCI7XG59XG5cbi8qKlxuICogR2V0IGRpc3RhbmNlXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldERpc3RhbmNlKGEsIGIpIHtcbiAgICB2YXIgeCwgeTtcbiAgICB4ID0gYS5sZWZ0IC0gYi5sZWZ0O1xuICAgIHkgPSBhLnRvcCAtIGIudG9wO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIHRvIHN0cmluZ1xuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbih4LCB5KSB7XG4gICAgcmV0dXJuIHggKyBcInB4IFwiICsgeSArIFwicHhcIjtcbn1cblxuLyoqXG4gKiBHZXQgdG91Y2ggcG9pbnRlclxuICogQHBhcmFtIHRvdWNoZXNcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gZ2V0VG91Y2hlcyh0b3VjaGVzKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvdWNoZXMpLm1hcChmdW5jdGlvbih0b3VjaCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbGVmdDogdG91Y2gucGFnZVgsXG4gICAgICAgICAgICB0b3A6IHRvdWNoLnBhZ2VZXG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgc2NhbGVcbiAqIEBwYXJhbSBzdGFydFxuICogQHBhcmFtIGVuZFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gY2FsY3VsYXRlU2NhbGUoc3RhcnQsIGVuZCkge1xuICAgIHZhciBzdGFydERpc3RhbmNlID0gZ2V0RGlzdGFuY2Uoc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICB2YXIgZW5kRGlzdGFuY2UgPSBnZXREaXN0YW5jZShlbmRbMF0sIGVuZFsxXSk7XG4gICAgcmV0dXJuIGVuZERpc3RhbmNlIC8gc3RhcnREaXN0YW5jZTtcbn1cblxuLyoqXG4gKiBHZXQgY29tcHV0ZWQgdHJhbnNsYXRlXG4gKiBAcGFyYW0gb2JqXG4gKiBAcmV0dXJucyB7e3RyYW5zbGF0ZVg6IG51bWJlciwgdHJhbnNsYXRlWTogbnVtYmVyLCB0cmFuc2xhdGVaOiBudW1iZXIsIHNjYWxlWDogbnVtYmVyLCBzY2FsZVk6IG51bWJlciwgb2Zmc2V0WDogbnVtYmVyLCBvZmZzZXRZOiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXRDb21wdXRlZFRyYW5zbGF0ZShvYmopIHtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICB0cmFuc2xhdGVYOiAwLFxuICAgICAgICB0cmFuc2xhdGVZOiAwLFxuICAgICAgICB0cmFuc2xhdGVaOiAwLFxuICAgICAgICBzY2FsZVg6IDEsXG4gICAgICAgIHNjYWxlWTogMSxcbiAgICAgICAgb2Zmc2V0WDogMCxcbiAgICAgICAgb2Zmc2V0WTogMFxuICAgIH07XG4gICAgdmFyIG9mZnNldFggPSAwLFxuICAgICAgICBvZmZzZXRZID0gMDtcbiAgICBpZiAoIWdsb2JhbC5nZXRDb21wdXRlZFN0eWxlIHx8ICFvYmopIHJldHVybiByZXN1bHQ7XG4gICAgdmFyIHN0eWxlID0gZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUob2JqKSxcbiAgICAgICAgdHJhbnNmb3JtLCBvcmlnaW47XG4gICAgdHJhbnNmb3JtID0gc3R5bGUud2Via2l0VHJhbnNmb3JtIHx8IHN0eWxlLm1velRyYW5zZm9ybTtcbiAgICBvcmlnaW4gPSBzdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gfHwgc3R5bGUubW96VHJhbnNmb3JtT3JpZ2luO1xuICAgIHZhciBwYXIgPSBvcmlnaW4ubWF0Y2goLyguKilweFxccysoLiopcHgvKTtcbiAgICBpZiAocGFyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgb2Zmc2V0WCA9IHBhclsxXSAtIDA7XG4gICAgICAgIG9mZnNldFkgPSBwYXJbMl0gLSAwO1xuICAgIH1cbiAgICBpZiAodHJhbnNmb3JtID09IFwibm9uZVwiKSByZXR1cm4gcmVzdWx0O1xuICAgIHZhciBtYXQzZCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeDNkXFwoKC4rKVxcKSQvKTtcbiAgICB2YXIgbWF0MmQgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXhcXCgoLispXFwpJC8pO1xuICAgIGlmIChtYXQzZCkge1xuICAgICAgICB2YXIgc3RyID0gbWF0M2RbMV0uc3BsaXQoJywgJyk7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZVg6IHN0clsxMl0gLSAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWTogc3RyWzEzXSAtIDAsXG4gICAgICAgICAgICB0cmFuc2xhdGVaOiBzdHJbMTRdIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFg6IG9mZnNldFggLSAwLFxuICAgICAgICAgICAgb2Zmc2V0WTogb2Zmc2V0WSAtIDAsXG4gICAgICAgICAgICBzY2FsZVg6IHN0clswXSAtIDAsXG4gICAgICAgICAgICBzY2FsZVk6IHN0cls1XSAtIDAsXG4gICAgICAgICAgICBzY2FsZVo6IHN0clsxMF0gLSAwXG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChtYXQyZCkge1xuICAgICAgICB2YXIgc3RyID0gbWF0MmRbMV0uc3BsaXQoJywgJyk7XG4gICAgICAgIHJlc3VsdCA9IHtcbiAgICAgICAgICAgIHRyYW5zbGF0ZVg6IHN0cls0XSAtIDAsXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiBzdHJbNV0gLSAwLFxuICAgICAgICAgICAgb2Zmc2V0WDogb2Zmc2V0WCAtIDAsXG4gICAgICAgICAgICBvZmZzZXRZOiBvZmZzZXRZIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWDogc3RyWzBdIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWTogc3RyWzNdIC0gMFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldCBjZW50ZXIgcG9pbnRcbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gYlxuICogQHJldHVybnMge3t4OiBudW1iZXIsIHk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldENlbnRlcihhLCBiKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogKGEueCArIGIueCkgLyAyLFxuICAgICAgICB5OiAoYS55ICsgYi55KSAvIDJcbiAgICB9XG59XG5cbi8qKlxuICogaW5pdFxuICogQHBhcmFtIG9wdHNcbiAqL1xuZnVuY3Rpb24gaW5pdFpvb20ob3B0cykge1xuICAgIGN1cnJlbnRTY2FsZSA9IDE7XG4gICAgem9vbUZhY3RvciA9IG9wdHMgJiYgb3B0cy56b29tRmFjdG9yIHx8IDI7XG59XG5cbi8qKlxuICogU3RhcnQgZXZlbnQgaGFuZGxlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIHN0YXJ0SGFuZGxlcihldnQpIHtcbiAgICBzdGFydEhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG4gICAgLy8gbXVzdCBiZSBhIHBpY3R1cmUsIG9ubHkgb25lIHBpY3R1cmUhIVxuICAgIHZhciBub2RlID0gdGhpcy5lbHNbMV0ucXVlcnlTZWxlY3RvcignaW1nOmZpcnN0LWNoaWxkJyk7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIGlmIChkZXZpY2UuaGFzVG91Y2ggJiYgbm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBJTl9TQ0FMRV9NT0RFID0gdHJ1ZTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IGdldENvbXB1dGVkVHJhbnNsYXRlKG5vZGUpO1xuICAgICAgICBzdGFydFRvdWNoZXMgPSBnZXRUb3VjaGVzKGV2dC50YXJnZXRUb3VjaGVzKTtcbiAgICAgICAgc3RhcnRYID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVggLSAwO1xuICAgICAgICBzdGFydFkgPSB0cmFuc2Zvcm0udHJhbnNsYXRlWSAtIDA7XG4gICAgICAgIGN1cnJlbnRTY2FsZSA9IHRyYW5zZm9ybS5zY2FsZVg7XG4gICAgICAgIHpvb21Ob2RlID0gbm9kZTtcbiAgICAgICAgdmFyIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgIGxhc3RUb3VjaFN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB0b3VjaGVzID0gZXZ0LnRvdWNoZXM7XG4gICAgICAgICAgICB2YXIgdG91Y2hDZW50ZXIgPSBnZXRDZW50ZXIoe1xuICAgICAgICAgICAgICAgIHg6IHRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogdG91Y2hlc1swXS5wYWdlWVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHg6IHRvdWNoZXNbMV0ucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogdG91Y2hlc1sxXS5wYWdlWVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKHRvdWNoQ2VudGVyLnggLSBwb3MubGVmdCwgdG91Y2hDZW50ZXIueSAtIHBvcy50b3ApO1xuICAgICAgICB9IGVsc2UgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdmFyIHRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgZ2VzdHVyZSA9IDA7XG4gICAgICAgICAgICBpZiAodGltZSAtIGxhc3RUb3VjaFN0YXJ0IDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0VG91Y2hTdGFydCA9IHRpbWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogTW92ZSBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG1vdmVIYW5kbGVyKGV2dCkge1xuICAgIGlmIChJTl9TQ0FMRV9NT0RFKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgICAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgICAgIGlmIChkZXZpY2UuaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNjYWxlSW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEgJiYgY3VycmVudFNjYWxlID4gMSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbW92ZUltYWdlLmNhbGwodGhpcywgZXZ0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VzdHVyZSA9IHJlc3VsdDtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgbW92ZUhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG59XG5cbi8qKlxuICogRG91YmxlIHRhbyBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gaGFuZGxlRG91YmxlVGFwKGV2dCkge1xuICAgIHZhciB6b29tRmFjdG9yID0gem9vbUZhY3RvciB8fCAyO1xuICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgdmFyIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgIGN1cnJlbnRTY2FsZSA9IGN1cnJlbnRTY2FsZSA9PSAxID8gem9vbUZhY3RvciA6IDE7XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSgwLCAwLCAwLCBjdXJyZW50U2NhbGUpO1xuICAgIGlmIChjdXJyZW50U2NhbGUgIT0gMSkgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gPSBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbihldnQudG91Y2hlc1swXS5wYWdlWCAtIHBvcy5sZWZ0LCBldnQudG91Y2hlc1swXS5wYWdlWSAtIHBvcy50b3ApO1xufVxuXG4vKipcbiAqIHNjYWxlIGltYWdlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIHNjYWxlSW1hZ2UoZXZ0KSB7XG4gICAgdmFyIG1vdmVUb3VjZXMgPSBnZXRUb3VjaGVzKGV2dC50YXJnZXRUb3VjaGVzKTtcbiAgICB2YXIgc2NhbGUgPSBjYWxjdWxhdGVTY2FsZShzdGFydFRvdWNoZXMsIG1vdmVUb3VjZXMpO1xuICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgc2NhbGUgPSBjdXJyZW50U2NhbGUgKiBzY2FsZSA8IG1pblNjYWxlID8gbWluU2NhbGUgOiBjdXJyZW50U2NhbGUgKiBzY2FsZTtcbiAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKDAsIDAsIDAsIHNjYWxlKTtcbn1cblxuLyoqXG4gKiBFbmQgZXZlbnQgaGFuZGxlXG4gKiBAcGFyYW0gZXZ0XG4gKi9cbmZ1bmN0aW9uIGVuZEhhbmRsZXIoZXZ0KSB7XG4gICAgaWYgKElOX1NDQUxFX01PREUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgIGlmIChnZXN0dXJlID09PSAyKSB7IC8v5Y+M5omL5oyHXG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKGdlc3R1cmUgPT0gMSkgeyAvL+aUvuWkp+aLluaLvVxuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChnZXN0dXJlID09PSAzKSB7IC8v5Y+M5Ye7XG4gICAgICAgICAgICBoYW5kbGVEb3VibGVUYXAoZXZ0KTtcbiAgICAgICAgICAgIHJlc2V0SW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgIElOX1NDQUxFX01PREUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgZW5kSGFuZGxlck9yaWdpbmFsLmNhbGwodGhpcywgZXZ0KTtcbn1cblxuLyoqXG4gKiBEcmFnbW92ZSBpbWFnZVxuICogQHBhcmFtIHtvcGplY3R9IGV2dFxuICovXG5mdW5jdGlvbiBtb3ZlSW1hZ2UoZXZ0KSB7XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgdmFyIG9mZnNldCA9IHtcbiAgICAgICAgWDogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zdGFydFgpIDogKGV2dC5wYWdlWCAtIHRoaXMuc3RhcnRYKSxcbiAgICAgICAgWTogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5zdGFydFkpIDogKGV2dC5wYWdlWSAtIHRoaXMuc3RhcnRZKVxuICAgIH07XG4gICAgdmFyIG1vdmVPZmZzZXQgPSB7XG4gICAgICAgIHg6IHN0YXJ0WCArIG9mZnNldC5YIC0gMCxcbiAgICAgICAgeTogc3RhcnRZICsgb2Zmc2V0LlkgLSAwXG4gICAgfTtcbiAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKG1vdmVPZmZzZXQueCwgbW92ZU9mZnNldC55LCAwLCBjdXJyZW50U2NhbGUpO1xufVxuXG4vKipcbiAqIEdldCBwb3NpdGlvblxuICogQHBhcmFtIGVsZW1lbnRcbiAqIEByZXR1cm5zIHt7bGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldFBvc2l0aW9uKGVsZW1lbnQpIHtcbiAgICB2YXIgcG9zID0ge1xuICAgICAgICBcImxlZnRcIjogMCxcbiAgICAgICAgXCJ0b3BcIjogMFxuICAgIH07XG4gICAgZG8ge1xuICAgICAgICBwb3MudG9wICs9IGVsZW1lbnQub2Zmc2V0VG9wIHx8IDA7XG4gICAgICAgIHBvcy5sZWZ0ICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuICAgIHdoaWxlIChlbGVtZW50KTtcbiAgICByZXR1cm4gcG9zO1xufVxuXG4vKipcbiAqIENoZWNrIHRhcmdldCBpcyBpbiByYW5nZVxuICogQHBhcmFtIG5vZGVcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHRhZ1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgdmFsdWUsIHRhZykge1xuICAgIHZhciBtaW4sIG1heDtcbiAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgdmlld1Njb3BlID0ge1xuICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgbGVmdDogcG9zLmxlZnQsXG4gICAgICAgICAgICB0b3A6IHBvcy50b3BcbiAgICAgICAgfSxcbiAgICAgICAgZW5kOiB7XG4gICAgICAgICAgICBsZWZ0OiBwb3MubGVmdCArIG5vZGUuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICB0b3A6IHBvcy50b3AgKyBub2RlLmNsaWVudEhlaWdodFxuICAgICAgICB9XG4gICAgfTtcbiAgICB2YXIgc3RyID0gdGFnID09IDEgPyBcImxlZnRcIiA6IFwidG9wXCI7XG4gICAgbWluID0gdmlld1Njb3BlLnN0YXJ0W3N0cl07XG4gICAgbWF4ID0gdmlld1Njb3BlLmVuZFtzdHJdO1xuICAgIHJldHVybiAodmFsdWUgPj0gbWluICYmIHZhbHVlIDw9IG1heCk7XG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSBub2RlXG4gKiBAcGFyYW0gb2JqMVxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gb3ZlckZsb3cobm9kZSwgb2JqMSkge1xuICAgIHZhciByZXN1bHQgPSAwO1xuICAgIHZhciBpc1gxSW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuc3RhcnQubGVmdCwgMSk7XG4gICAgdmFyIGlzWDJJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5lbmQubGVmdCwgMSk7XG4gICAgdmFyIGlzWTFJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5zdGFydC50b3AsIDApO1xuICAgIHZhciBpc1kySW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuZW5kLnRvcCwgMCk7XG4gICAgaWYgKChpc1gxSW4gIT0gaXNYMkluKSAmJiAoaXNZMUluICE9IGlzWTJJbikpIHtcbiAgICAgICAgaWYgKGlzWDFJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNYMUluICYmIGlzWTFJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChpc1gySW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAzO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gNDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKGlzWDFJbiA9PSBpc1gySW4pKSB7XG4gICAgICAgIGlmICghaXNZMUluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gNTtcbiAgICAgICAgfSBlbHNlIGlmICghaXNZMkluICYmIGlzWTFJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gNjtcbiAgICAgICAgfVxuXG4gICAgfSBlbHNlIGlmIChpc1kxSW4gPT0gaXNZMkluKSB7XG4gICAgICAgIGlmICghaXNYMUluICYmIGlzWDJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gNztcbiAgICAgICAgfSBlbHNlIGlmIChpc1gxSW4gJiYgIWlzWDJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gODtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXNZMUluID09IGlzWTJJbiA9PSBpc1gxSW4gPT0gaXNYMkluKSB7XG4gICAgICAgIHJlc3VsdCA9IDk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogUmVzZXQgaW1hZ2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gcmVzZXRJbWFnZShldnQpIHtcbiAgICBpZiAoY3VycmVudFNjYWxlID09IDEpIHJldHVybjtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlLFxuICAgICAgICBsZWZ0LCB0b3AsIHRyYW5zLCB3LCBoLCBwb3MsIHN0YXJ0LCBlbmQsIHBhcmVudCwgZmxvd1RhZztcbiAgICB0cmFucyA9IGdldENvbXB1dGVkVHJhbnNsYXRlKG5vZGUpO1xuICAgIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB3ID0gbm9kZS5jbGllbnRXaWR0aCAqIHRyYW5zLnNjYWxlWDtcbiAgICBoID0gbm9kZS5jbGllbnRIZWlnaHQgKiB0cmFucy5zY2FsZVg7XG4gICAgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgc3RhcnQgPSB7XG4gICAgICAgIGxlZnQ6ICgxIC0gdHJhbnMuc2NhbGVYKSAqIHRyYW5zLm9mZnNldFggKyBwb3MubGVmdCArIHRyYW5zLnRyYW5zbGF0ZVgsXG4gICAgICAgIHRvcDogKDEgLSB0cmFucy5zY2FsZVgpICogdHJhbnMub2Zmc2V0WSArIHBvcy50b3AgKyB0cmFucy50cmFuc2xhdGVZXG4gICAgfTtcbiAgICBlbmQgPSB7XG4gICAgICAgIGxlZnQ6IHN0YXJ0LmxlZnQgKyB3LFxuICAgICAgICB0b3A6IHN0YXJ0LnRvcCArIGhcbiAgICB9O1xuICAgIGxlZnQgPSBzdGFydC5sZWZ0O1xuICAgIHRvcCA9IHN0YXJ0LnRvcDtcblxuICAgIGZsb3dUYWcgPSBvdmVyRmxvdyhwYXJlbnQsIHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICBlbmQ6IGVuZFxuICAgIH0pO1xuICAgIHN3aXRjaCAoZmxvd1RhZykge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh3IDwgcGFyZW50LmNsaWVudFdpZHRoKSB7XG4gICAgICAgIGxlZnQgPSBwb3MubGVmdCAtICh0cmFucy5zY2FsZVggLSAxKSAqIG5vZGUuY2xpZW50V2lkdGggLyAyO1xuICAgIH1cbiAgICBpZiAoaCA8IHBhcmVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgdG9wID0gcG9zLnRvcCAtICh0cmFucy5zY2FsZVggLSAxKSAqIG5vZGUuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICB9XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjEwMG1zXCI7XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSh0cmFucy50cmFuc2xhdGVYICsgbGVmdCAtIHN0YXJ0LmxlZnQsIHRyYW5zLnRyYW5zbGF0ZVkgKyB0b3AgLSBzdGFydC50b3AsIDAsIHRyYW5zLnNjYWxlWCk7XG5cbn1cblxuaVNsaWRlci5leHRlbmQoe1xuICAgIHN0YXJ0SGFuZGxlcjogc3RhcnRIYW5kbGVyLFxuICAgIG1vdmVIYW5kbGVyOiBtb3ZlSGFuZGxlcixcbiAgICBlbmRIYW5kbGVyOiBlbmRIYW5kbGVyXG59KTtcblxuaVNsaWRlci5yZWdQbHVnaW4oJ3pvb21waWMnLCBpbml0Wm9vbSk7Il19
