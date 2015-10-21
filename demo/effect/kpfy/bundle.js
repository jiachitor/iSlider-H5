(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcIsliderJs = require('../../../src/islider.js');

var _srcIsliderJs2 = _interopRequireDefault(_srcIsliderJs);

var list = [
// picture
{
    content: '../imgs/flip/0.jpg'
},
// picture
{
    content: '../imgs/flip/1.jpg'
},
// picture
{
    content: '../imgs/flip/2.jpg'
},
// picture
{
    content: '../imgs/flip/3.jpg'
},
// HTML String
{
    content: '<div style="font-size:4em;color:white;text-align: center">HTML String</div>'
},
// element
{
    content: (function () {
        var dom = document.createElement('div');
        dom.innerHTML = 'Element';
        dom.style.cssText = 'font-size:3em;color:rgb(230, 230, 63);';
        return dom;
    })()
},
// fragment
{
    content: (function () {
        var frag = document.createDocumentFragment();
        var img = new Image();
        var dom = document.createElement('div');
        dom.innerHTML = 'Fragment';
        dom.style.cssText = 'font-size:3em;color:rgb(230, 63, 230);';
        frag.appendChild(dom);
        return frag;
    })()
},
// dom
{
    content: document.querySelector('#hidden-space > p')
}];

var S = new _srcIsliderJs2['default']({
    dom: document.getElementById('iSlider-wrapper'),
    data: list,
    isVertical: true,
    isLooping: 1,
    isOverspread: 1,
    animateTime: 800,
    animateType: 'kpfy',
    plugins: [['zoompic', { currentScale: 1, zoomFactor: 2 }]]
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

var _pluginsIslider_zoomJs = require('./plugins/islider_zoom.js');

var _pluginsIslider_zoomJs2 = _interopRequireDefault(_pluginsIslider_zoomJs);

var iSlider = (function (_iSliderCore) {
    _inherits(iSlider, _iSliderCore);

    function iSlider() {
        _classCallCheck(this, iSlider);

        for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
            opts[_key] = arguments[_key];
        }

        //直接调用父类构造器进行初始化
        _get(Object.getPrototypeOf(iSlider.prototype), 'constructor', this).apply(this, opts);

        //添加 zoom 插件，注意以下代码必须要
        var startHandlerOriginal = this.startHandler;
        var endHandlerOriginal = this.endHandler;
        var moveHandlerOriginal = this.moveHandler;

        this.regPlugin('button', _pluginsIslider_buttonJs2['default']);
        this.regPlugin('dot', _pluginsIslider_dotJs2['default']);
        this.regPlugin('zoompic', function (zoomOpts) {
            _pluginsIslider_zoomJs2['default'].initZoom({
                currentScale: zoomOpts.currentScale || 1,
                zoomFactor: zoomOpts.zoomFactor || 2,
                extendFunction: {
                    'startHandlerOriginal': startHandlerOriginal,
                    'endHandlerOriginal': endHandlerOriginal,
                    'moveHandlerOriginal': moveHandlerOriginal
                }
            });
        });

        this.fire('initialize');
        this._renderWrapper();
        this._initPlugins();
        this._bindHandler();

        this.extend({
            startHandler: _pluginsIslider_zoomJs2['default'].startHandler,
            moveHandler: _pluginsIslider_zoomJs2['default'].moveHandler,
            endHandler: _pluginsIslider_zoomJs2['default'].endHandler
        });
    }

    return iSlider;
})(_islider_coreJs2['default']);

module.exports = iSlider;

},{"./islider_core.js":3,"./plugins/islider_button.js":5,"./plugins/islider_dot.js":6,"./plugins/islider_zoom.js":7}],3:[function(require,module,exports){
(function (global){
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

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _pluginsIslider_animateJs = require('./plugins/islider_animate.js');

var _pluginsIslider_animateJs2 = _interopRequireDefault(_pluginsIslider_animateJs);

/**
 * Check in array
 * @param oElement
 * @param aSource
 * @returns {boolean}
 */
function inArray(oElement, aSource) {
    return aSource.indexOf(oElement) > -1;
}

/**
 * Check is array
 * @param o
 * @returns {boolean}
 */
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}

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

var iSliderCore = (function () {
    //ES6中新型构造器

    function iSliderCore() {
        _classCallCheck(this, iSliderCore);

        var args = Array.prototype.slice.call(arguments, 0, 3);
        if (!args.length) {
            throw new Error('Parameters required!');
        }
        var opts = args.pop();
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
         * Event white list
         * @type {Array}
         * @protected
         */
        this.EVENTS = 'initialize slide slideStart slideEnd slideChange slideChanged slideRestore slideRestored reloadData destroy'.split(' ');

        /**
         * Easing white list
         * @type [Array, RegExp[]]
         * @protected
         */
        this.EASING = ['linear ease ease-in ease-out ease-in-out'.split(' '), /cubic-bezier\(([^\d]*(\d+.?\d*)[^\,]*\,?){4}\)/];

        /**
         * TAGS whitelist on fixpage mode
         * @type {Array}
         * @protected
         */
        this.FIX_PAGE_TAGS = 'SELECT INPUT TEXTAREA BUTTON LABEL'.split(' ');

        /**
         * Plugins
         * @type {{}}
         * @protected
         */
        this.plugins = {};

        /**
         * Options
         * @private
         */
        this._opts = opts;
        opts = args = null;

        this._transitionEndEvent();
    }

    /**
     * The empty function
     * @private
     */

    _createClass(iSliderCore, [{
        key: 'EMPTY_FUNCTION',
        value: function EMPTY_FUNCTION() {}

        /**
         * Extend
         * @public
         */
    }, {
        key: 'extend',
        value: function extend() {
            var main = undefined,
                extend = undefined,
                args = arguments;

            switch (args.length) {
                case 0:
                    return;
                case 1:
                    main = this;
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
        }

        /**
         * @param name
         * @param plugin
         * @public
         */
    }, {
        key: 'regPlugin',
        value: function regPlugin(name, plugin) {
            this.plugins[name] = this.plugins[name] || plugin;
        }

        /**
         * @returns {string}
         * @private
         */
    }, {
        key: '_transitionEndEvent',
        value: function _transitionEndEvent() {
            var evtName = undefined;
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
        }
    }]);

    return iSliderCore;
})();

var iSliderPrototype = (function (_iSliderCore) {
    _inherits(iSliderPrototype, _iSliderCore);

    function iSliderPrototype() {
        _classCallCheck(this, iSliderPrototype);

        for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
            opts[_key] = arguments[_key];
        }

        //直接调用父类构造器进行初始化
        _get(Object.getPrototypeOf(iSliderPrototype.prototype), 'constructor', this).apply(this, opts);
        this._setting();
    }

    /**
     * setting parameters for slider
     * @private
     */

    _createClass(iSliderPrototype, [{
        key: '_setting',
        value: function _setting() {

            // 是否逆向执行
            this.opposite = false;

            /**
             * The plugins
             * @type {Array|{}|*}
             * @private
             */
            this._plugins = this.plugins;

            /**
             *
             * @type {{default: Function}|*}
             * @private
             */
            this._animateFuncs = this._animateFuncs;

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

            /**
             * listener
             * @type {{}}
             * @private
             */
            this._LSN = {};

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
            this.isVertical = opts.isVertical || false;

            /**
             * Overspread mode
             * @type {boolean}
             * @public
             */
            this.isOverspread = opts.isOverspread || false;

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
            this.fixPage = opts.fixPage || true;

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
            this.offset = this.offset || { X: 0, Y: 0 };

            /**
             * looping logic adjust
             * @type {boolean}
             * @private
             */
            this.isLooping = this.data.length > 1 && opts.isLooping ? true : false;

            /**
             * autoplay logic adjust
             * @type {boolean}
             * @private
             */
            this.isAutoplay = this.data.length > 1 && opts.isAutoplay ? true : false;

            // little trick set, when you chooce tear & vertical same time
            // iSlider overspread mode will be set true autometicly
            if (opts.animateType === 'card' && this.isVertical) {
                this.isOverspread = true;
            }

            /**
             * Debug mode
             * @type {function}
             * @private
             */
            this.log = opts.isDebug ? function () {
                global.console.log.apply(global.console, arguments);
            } : this.EMPTY_FUNCTION;

            // set Damping function
            this._setUpDamping();

            // stop autoplay when window blur
            // this._setPlayWhenFocus();

            /**
             * animation parmas:
             *
             * @param {Element}      dom             图片的外层<li>容器       Img wrapper
             * @param {String}       axis            动画方向                animate direction
             * @param {Number}       scale           容器宽度                Outer wrapper
             * @param {Number}       i               <li>容器index          Img wrapper's index
             * @param {Number}       offset          滑动距离                move distance
             * @protected
             */
            this._animateFuncs = {
                'default': function _default(dom, axis, scale, i, offset) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }
            };

            this.extend(this._animateFuncs, _pluginsIslider_animateJs2['default']);

            /**
             * @protected
             */
            this._animateFunc = this._animateFuncs[opts.animateType in this._animateFuncs ? opts.animateType : 'default'];

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
            this.animateEasing = inArray(opts.animateEasing, this.EASING[0]) || this.EASING[1].test(opts.animateEasing) ? opts.animateEasing : 'ease';

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
            this.on('slide', opts.onslide);

            // Callback function when your finger touch the screen
            this.on('slideStart', opts.onslidestart);

            // Callback function when the finger move out of the screen
            this.on('slideEnd', opts.onslideend);

            // Callback function when slide to next/prev scene
            this.on('slideChange', opts.onslidechange);

            // Callback function when next/prev scene, while animation has completed
            this.on('slideChanged', opts.onslidechanged);

            // Callback function when restore to the current scene
            this.on('slideRestore', opts.onsliderestore);

            // Callback function when restore to the current scene, while animation has completed
            this.on('slideRestored', opts.onsliderestored);

            // --------------------------------
            // - Plugins
            // --------------------------------

            /**
             * @type {object}
             * @private
             */
            this.pluginConfig = (function () {
                if (isArray(opts.plugins)) {
                    var _ret = (function () {
                        var config = {};
                        opts.plugins.forEach(function pluginConfigEach(plugin) {
                            if (isArray(plugin)) {
                                config[plugin[0]] = plugin.slice(1);
                            } else if (typeof plugin === 'string') {
                                config[plugin] = [];
                            }
                        });
                        return {
                            v: config
                        };
                    })();

                    if (typeof _ret === 'object') return _ret.v;
                } else {
                    return {};
                }
            })();

            // Autoplay mode
            if (this.isAutoplay) {
                this.play();
            }
        }

        /**
         * Init plugins
         * @private
         */
    }, {
        key: '_initPlugins',
        value: function _initPlugins() {
            var config = this.pluginConfig;
            var plugins = this._plugins;
            for (var i in config) {
                if (config.hasOwnProperty(i) && plugins.hasOwnProperty(i)) {
                    this.log('[INIT PLUGIN]:', i, plugins[i]);
                    plugins[i] && typeof plugins[i] === 'function' && typeof plugins[i].apply && plugins[i].apply(this, config[i]);
                }
            }
        }

        /**
         * enable damping when slider meet the edge
         * @private
         */
    }, {
        key: '_setUpDamping',
        value: function _setUpDamping() {
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
         * Get item type
         * @param {number} index
         * @returns {string}
         * @private
         */
    }, {
        key: '_itemType',
        value: function _itemType(item) {
            if (!isNaN(item)) {
                item = this.data[item];
            }
            if (item.hasOwnProperty('type')) {
                return item.type;
            }
            var content = item.content;
            var type = undefined;
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
        }

        /**
         * render single item html by idx
         * @param {HTMLElement} el ..
         * @param {number} dataIndex  ..
         * @private
         */
    }, {
        key: '_renderItem',
        value: function _renderItem(el, dataIndex) {

            var item = undefined,
                len = this.data.length;

            var insertImg = (function () {

                var simg = ' src="' + item.content + '"';

                if (item.height / item.width > this.ratio) {
                    simg += ' height="' + el.clientHeight + '"';
                } else {
                    simg += ' width="' + el.clientWidth + '"';
                }

                if (this.isOverspread) {
                    el.style.background = 'url(' + item.content + ') no-repeat 50% 50%/cover';
                    simg += ' style="display:block;opacity:0;height:100%;width:100%;"';
                }

                el.innerHTML = '<img' + simg + ' />';
            }).bind(this);

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
                    if (item.height && item.width) {
                        insertImg();
                    } else {
                        (function () {
                            var currentImg = new Image();
                            currentImg.src = item.content;
                            currentImg.onload = function () {
                                item.height = currentImg.height;
                                item.width = currentImg.width;
                                item.loaded = 1;
                                insertImg();
                            };
                        })();
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
        }

        /**
         * Postponing the intermediate scene rendering
         * until the target scene is completely rendered (render in event slideChanged)
         * to avoid a jumpy feel when switching between scenes
         * given that the distance of sliding is more than 1.
         * e.g. ```this.slideTo(>+-1)```
         *
         * @private
         */
    }, {
        key: '_renderIntermediateScene',
        value: function _renderIntermediateScene() {
            if (this._intermediateScene != null) {
                this._renderItem.apply(this, this._intermediateScene);
                this._intermediateScene = null;
            }
        }

        /**
         * Apply styles on changed
         * @private
         */
    }, {
        key: '_changedStyles',
        value: function _changedStyles() {
            var slideStyles = ['islider-prev', 'islider-active', 'islider-next'];
            this.els.forEach(function changeStypeEach(el, index) {
                removeClass(el, '(' + slideStyles.join('|') + ')');
                addClass(el, slideStyles[index]);
            });
        }

        /**
         * render list html
         * @private
         */
    }, {
        key: '_renderWrapper',
        value: function _renderWrapper() {
            this.outer && (this.outer.innerHTML = '');
            // initail ul element
            var outer = this.outer || document.createElement('ul');
            outer.className = 'islider-outer';

            // storage li elements, only store 3 elements to reduce memory usage
            this.els = [];
            for (var i = 0; i < 3; i++) {
                var li = document.createElement('li');
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

            this._changedStyles();

            // Preload picture [ may be pic :) ]
            global.setTimeout((function () {
                this._preloadImg(this.slideIndex);
            }).bind(this), 200);

            // append ul to div#canvas
            if (!this.outer) {
                this.outer = outer;
                this.wrap.appendChild(outer);
            }
        }

        /**
         * Preload img when slideChange
         * From current index +2, -2 scene
         * @param {number} dataIndex means which image will be load
         * @private
         */
    }, {
        key: '_preloadImg',
        value: function _preloadImg(dataIndex) {
            var _this = this;

            if (this.data.length > 3) {
                (function () {
                    var data = _this.data;
                    var len = data.length;
                    var self = _this;
                    var loadImg = function preloadImgLoadingProcess(index) {
                        var item = data[index];
                        if (self._itemType(item) === 'pic' && !item.loaded) {
                            (function () {
                                var preloadImg = new Image();
                                preloadImg.src = item.content;
                                preloadImg.onload = function () {
                                    item.width = preloadImg.width;
                                    item.height = preloadImg.height;
                                };
                                item.loaded = 1;
                            })();
                        }
                    };

                    loadImg((dataIndex + 2) % len);
                    loadImg((dataIndex - 2 + len) % len);
                })();
            }
        }

        /**
         * Watch event transitionEnd
         * @private
         */
    }, {
        key: '_watchTransitionEnd',
        value: function _watchTransitionEnd(time, eventType) {

            var self = this;
            var args = Array.prototype.slice.call(arguments, 1);
            var lsn = undefined;
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
            }

            function unWatch() {
                self.els.forEach(function translationEndUnwatchEach(el) {
                    el.removeEventListener(self._transitionEndEvent(), handle);
                });
                self.isAnimating = false;
            }

            if (time > 0) {
                self.els.forEach(function translationEndElsEach(el) {
                    el.addEventListener(self._transitionEndEvent(), handle);
                });
            }
            lsn = global.setTimeout(handle, time);
            self.inAnimate++;
        }

        /**
         * bind all event handler, when on PC, disable drag event
         * @private
         */
    }, {
        key: '_bindHandler',
        value: function _bindHandler() {
            var outer = this.outer;
            var device = this.deviceEvents;

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

            global.addEventListener('orientationchange', this);
            global.addEventListener('resize', this);

            // Fix android device
            global.addEventListener('focus', this, false);
            global.addEventListener('blur', this, false);
        }

        /**
         *  Uniformity admin event
         *  Event router
         *  @param {object} evt event object
         *  @protected
         */
    }, {
        key: 'handleEvent',
        value: function handleEvent(evt) {
            var device = this.deviceEvents;
            switch (evt.type) {
                case 'mousedown':
                    if (!(evt.button === 0 && evt.buttons === 1)) break;
                case 'touchstart':
                    this.startHandler(evt);
                    break;
                case device.moveEvt:
                    this.moveHandler(evt);
                    break;
                case device.endEvt:
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
                case 'resize':
                    this.resizeHandler();
                    break;
            }
        }

        /**
         *  touchstart callback
         *  @param {object} evt event object
         *  @protected
         */
    }, {
        key: 'startHandler',
        value: function startHandler(evt) {
            if (this.fixPage) {
                if (this.FIX_PAGE_TAGS.indexOf(evt.target.tagName) < 0) {
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
        }

        /**
         *  touchmove callback
         *  @param {object} evt event object
         *  @protected
         */
    }, {
        key: 'moveHandler',
        value: function moveHandler(evt) {
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
        }

        /**
         *  touchend callback
         *  @param {Object} evt event object
         *  @protected
         */
    }, {
        key: 'endHandler',
        value: function endHandler(evt) {
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
                this.opposite = true;
                this.slideTo(this.slideIndex - 1);
            } else if (offset[axis] < -boundary && absReverseOffset < absOffset) {
                this.opposite = false;
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

            this.isAutoplay && this.play();

            this.fire('slideEnd', evt, this);
        }

        /**
         *  orientationchange callback
         *  @protected
         */
    }, {
        key: 'orientationchangeHandler',
        value: function orientationchangeHandler() {
            global.setTimeout((function () {
                this.reset();
                this.log('Event: orientationchange');
            }).bind(this), 100);
        }

        /**
         * resize callback
         * @protected
         */
    }, {
        key: 'resizeHandler',
        value: function resizeHandler() {
            if (this.height !== this.wrap.clientHeight || this.width !== this.wrap.clientWidth) {
                this._LSN.resize && global.clearTimeout(this._LSN.resize);
                this._LSN.resize = global.setTimeout((function () {
                    this.reset();
                    this.log('Event: resize');
                    this._LSN.resize && global.clearTimeout(this._LSN.resize);
                }).bind(this), 500);
            }
        }

        /**
         *  slide logical, goto data index
         *  @param {number} dataIndex the goto index
         *  @public
         */
    }, {
        key: 'slideTo',
        value: function slideTo(dataIndex, opts) {
            if (this.locking) {
                return;
            }
            this.unhold();
            var animateTime = this.animateTime;
            var animateType = this._opts.animateType;
            var animateFunc = this._animateFunc;
            var data = this.data;
            var els = this.els;
            var idx = dataIndex;
            var n = dataIndex - this.slideIndex;
            var offset = this.offset;
            var eventType = undefined;

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
                    n = 0;
                }
            }

            this.log('Index:' + this.slideIndex);

            // keep the right order of items
            var headEl = undefined,
                tailEl = undefined,
                step = undefined;

            // slidechange should render new item
            // and change new item style to fit animation
            if (n === 0) {
                // Restore to current scene
                eventType = 'slideRestore';
            } else {

                //这一这里的代码，与动画效果挂钩
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
                    els[i].style.webkitTransition = 'all ' + squeezeTime / 1000 + 's ' + this.animateEasing;
                }
                if (this.opposite) {
                    animateFunc.call(this, els[i], this.axis, this.scale, i, 0, true);
                } else {
                    animateFunc.call(this, els[i], this.axis, this.scale, i, 0, false);
                }
            }

            // If not looping, stop playing when meet the end of data
            if (this.isAutoplay && !this.isLooping && this.slideIndex === data.length - 1) {
                this.pause();
            }
        }

        /**
         * Slide to next scene
         * @public
         */
    }, {
        key: 'slideNext',
        value: function slideNext() {
            this.slideTo.apply(this, [this.slideIndex + 1].concat(Array.prototype.slice.call(arguments)));
        }

        /**
         * Slide to previous scene
         * @public
         */
    }, {
        key: 'slidePrev',
        value: function slidePrev() {
            this.slideTo.apply(this, [this.slideIndex - 1].concat(Array.prototype.slice.call(arguments)));
        }

        /**
         * Register plugin (run time mode)
         * @param {string} name
         * @param {function} plugin
         * @param {...}
         * @public
         */
        /* regPlugin() {
             let args = Array.prototype.slice.call(arguments);
             let name = args.shift(),
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
         }*/

        /**
         *  simple event delegate method
         *  @param {string} evtType event name
         *  @param {string} selector the simple css selector like jQuery
         *  @param {function} callback event callback
         *  @public
         */
    }, {
        key: 'bind',
        value: function bind(evtType, selector, callback) {
            function handle(e) {
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

            this.wrap.addEventListener(evtType, handle, false);
        }
    }, {
        key: 'delegate',
        value: function delegate(evtType, selector, callback) {
            function handle(e) {
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

            this.wrap.addEventListener(evtType, handle, false);
        }

        /**
         * TODO unbind, unDelegate
         * remove event delegate from wrap
         * @public
         */
    }, {
        key: 'unbind',
        value: function unbind(eventType, selector, callback) {}
    }, {
        key: 'unDelegate',
        value: function unDelegate(eventType, selector, callback) {}

        /**
         * removeEventListener to release the memory
         * @public
         */
    }, {
        key: 'destroy',
        value: function destroy() {
            var outer = this.outer;
            var device = this.deviceEvents;

            this.fire('destroy');

            // Clear events
            outer.removeEventListener(device.startEvt, this);
            outer.removeEventListener(device.moveEvt, this);
            outer.removeEventListener(device.endEvt, this);
            global.removeEventListener('orientationchange', this);
            global.removeEventListener('focus', this);
            global.removeEventListener('blur', this);

            // Clear timer
            this._LSN.forEach(function clearTimerOnDestroy(timer) {
                timer && global.clearTimeout(timer);
            });

            this.wrap.innerHTML = '';
        }

        /**
         * Register event callback
         * @param {string} eventName
         * @param {function} func
         * @public
         */
    }, {
        key: 'on',
        value: function on(eventName, func) {
            if (inArray(eventName, this.EVENTS) && typeof func === 'function') {
                (eventName in this.events ? this.events[eventName] : this.events[eventName] = []).push(func);
            }
        }

        /**
         * Remove event callback
         * @param {string} eventName
         * @param {function} func
         * @public
         */
    }, {
        key: 'off',
        value: function off(eventName, func) {
            if (eventName in this.events) {
                var funcs = this.events[eventName];
                var index = funcs.indexOf(func);
                if (index > -1) {
                    delete funcs[index];
                }
            }
        }

        /**
         * Trigger event callbacks
         * @param {string} eventName
         * @param {*} args
         * @public
         */
    }, {
        key: 'fire',
        value: function fire(eventName) {
            this.log('[EVENT FIRE]:', eventName, arguments);
            if (eventName in this.events) {
                var funcs = this.events[eventName];
                for (var i = 0; i < funcs.length; i++) {
                    // TODO will support custom context, now context is instance of iSlider
                    typeof funcs[i] === 'function' && funcs[i].apply && funcs[i].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
        }

        /**
         * reset & rerender
         * @public
         */
    }, {
        key: 'reset',
        value: function reset() {
            this.pause();
            this._setting();
            this._renderWrapper();
            this.isAutoplay && this.play();
        }

        /**
         * reload Data & render
         * @public
         */
    }, {
        key: 'loadData',
        value: function loadData(data, initIndex) {
            this.pause();
            this.slideIndex = initIndex || 0;
            this.data = data;
            this._renderWrapper();
            this.fire('reloadData');
            this.isAutoplay && this.play();
        }

        /**
         * Start autoplay
         * @public
         */
    }, {
        key: 'play',
        value: function play() {
            var self = this;
            this._LSN.autoPlay && global.clearTimeout(this._LSN.autoPlay);

            function play() {
                self._LSN.autoPlay = setTimeout(function () {
                    self.slideNext();
                    play();
                }, self.duration);
            }

            play();
        }

        /**
         * pause autoplay
         * @public
         */
    }, {
        key: 'pause',
        value: function pause() {
            this._LSN.autoPlay && clearTimeout(this._LSN.autoPlay);
        }

        /**
         * Maintaining the current scene
         * Disable touch events, except for the native method.
         * @public
         */
    }, {
        key: 'hold',
        value: function hold() {
            this.holding = true;
        }

        /**
         * Release current scene
         * unlock at same time
         * @public
         */
    }, {
        key: 'unhold',
        value: function unhold() {
            this.holding = false;
            this.unlock();
        }

        /**
         * You can't do anything on this scene
         * lock native method calls
         * hold at same time
         * @public
         */
    }, {
        key: 'lock',
        value: function lock() {
            this.hold();
            this.locking = true;
        }

        /**
         * unlock native method calls
         * @public
         */
    }, {
        key: 'unlock',
        value: function unlock() {
            this.locking = false;
        }
    }]);

    return iSliderPrototype;
})(iSliderCore);

module.exports = iSliderPrototype;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./plugins/islider_animate.js":4}],4:[function(require,module,exports){
/*
 * @file   Animation Library
 * @author xieyu33333
 */

/*  说明：
//dom 表示动画的元素节点
//axis 表示动画方向，分别为 X 和 Y 方向
//scale 屏幕高度
//i == 0 表示 islider-prev, i == 1 表示 islider-active, i == 2 表示 islider-next,
//offset > 0 表示的是向上或向右的滑动方向，offset < 0 表示的是向下或向左的滑动方向.offset 的值表示手指在屏幕上滑动的距离，绝对值越大表示滑动的距离越长。
//opposite 判断是否在执行 向下或向左的逆方向滑动
* */

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
    },

    'fade': function fade(dom, axis, scale, i, offset) {
        if (offset > 0) {
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
        } else {
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
        }
        offset = Math.abs(offset);
        if (i === 1) {
            dom.style.opacity = 1 - offset / scale;
        } else {
            dom.style.opacity = offset / scale;
        }
    },

    //晕染扩散
    'yrks': function fade(dom, axis, scale, i, offset, opposite) {
        dom.cur = 2;

        //正向
        function forward() {
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.cur = 1;
                dom.style.opacity = 1 + offset / scale;
            } else {
                dom.style.opacity = -offset / scale;
            }
        }

        //反向
        function reverse() {
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.cur = 1;
                dom.style.opacity = 1 - offset / scale;
            } else {
                dom.style.opacity = offset / scale;
            }
        }

        if (offset > 0) {
            reverse();
        } else {
            if (opposite) {
                reverse();
            } else {
                forward();
            }
        }

        var zoomScale = dom.cur === 1 ? 1 : 2;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0)';
    },

    //中心放大
    'zxfd': function fade(dom, axis, scale, i, offset, opposite) {
        var absoluteOffset = Math.abs(offset);
        dom.cur = 0.1;

        //正向
        function forward() {
            if (i == 1) {
                dom.cur = 1;
                dom.style.visibility = 'visible';
                dom.style.zIndex = scale - absoluteOffset;
            } else if (i < 1) {
                dom.cur = 1;
                dom.style.visibility = 'visible';
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            } else {
                dom.style.visibility = 'hidden';
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
        }

        //反向
        function reverse() {
            if (i == 1) {
                dom.cur = 1;
                dom.style.visibility = 'visible';
                dom.style.zIndex = scale - absoluteOffset;
            } else if (i > 1) {
                dom.cur = 1;
                dom.style.visibility = 'hidden';
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            } else {
                dom.style.visibility = 'hidden';
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
        }

        if (offset > 0) {
            reverse();
        } else {
            if (opposite) {
                reverse();
            } else {
                forward();
            }
        }

        var zoomScale = dom.cur === 1 ? 1 : 0.1;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0)';
    },

    //渐隐消失
    'jyxs': function fade(dom, axis, scale, i, offset, opposite) {
        var absoluteOffset = Math.abs(offset);

        //正向
        function forward() {
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.style.opacity = 1 - offset / scale;
                dom.style.zIndex = scale - absoluteOffset;
            } else {
                dom.style.opacity = -offset / scale;
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
        }

        //反向
        function reverse() {
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
            if (i === 1) {
                //正要被显示的页面
                dom.style.opacity = 1 + offset / scale;
                dom.style.zIndex = scale - absoluteOffset;
            } else if (i < 1) {
                dom.style.opacity = offset / scale;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            } else {
                dom.style.opacity = 1 - offset / scale;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
        }

        if (offset > 0) {
            reverse();
        } else {
            if (opposite) {
                reverse();
                if (i == 1) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                } else if (i > 1) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                } else {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }
            } else {
                forward();
                if (i < 1) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                } else {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                }
            }
        }
    },

    //平滑移出
    'phyc': function fade(dom, axis, scale, i, offset, opposite) {
        var absoluteOffset = Math.abs(offset);

        //正向
        function forward() {
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
            } else {
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
        }

        //反向
        function reverse() {
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
            if (i === 1) {
                //正要被显示的页面
                dom.style.zIndex = scale - absoluteOffset;
            } else if (i < 1) {
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
        }

        if (offset > 0) {
            reverse();
            if (i < 1) {
                dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
            }
        } else {
            if (opposite) {
                reverse();
                if (i == 1) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                } else if (i < 1) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                } else {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                }
            } else {
                forward();
                if (i == 1) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                } else if (i > 1) {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                } else {
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                }
            }
        }
    },

    //上下滑动
    'sxhd': function sxhd(dom, axis, scale, i, offset, opposite) {
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

        var zoomScale = dom.cur ? 1 - 0.8 * Math.abs(i - 1) - Math.abs(0.8 * offset / scale).toFixed(6) : 1;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis + '(' + ((1 + Math.abs(i - 1) * 0.2) * offset + scale * (i - 1)) + 'px)';
    },

    //卡片翻页
    'kpfy': function kpfy(dom, axis, scale, i, offset, opposite) {
        var absoluteOffset = Math.abs(offset);
        var rotateDirect = undefined,
            direction = undefined,
            forwardMoreCssText = undefined,
            reverseMoreCssText = undefined;
        if (axis === 'X') {
            rotateDirect = 'Y';
            direction = 1;
            forwardMoreCssText = '-webkit-transform-origin: right 50% 0px;';
            reverseMoreCssText = '-webkit-transform-origin: left 50% 0px;';
        } else {
            rotateDirect = 'X';
            direction = -1;
            forwardMoreCssText = '-webkit-transform-origin: 50% bottom 0px;';
            reverseMoreCssText = '-webkit-transform-origin: 50% top 0px;';
        }

        this.wrap.style.webkitPerspective = scale * 4;

        //正向
        function forward() {
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
            } else {
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
            dom.style.cssText += '-webkit-backface-visibility:hidden;-webkit-transform-style:preserve-3d; ' + ' position:absolute;' + forwardMoreCssText;
        }

        //反向
        function reverse() {
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
            if (i === 1) {
                //正要被显示的页面
                dom.style.zIndex = scale - absoluteOffset;
            } else if (i < 1) {
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
            dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; ' + ' position:absolute;' + reverseMoreCssText;
        }

        if (offset > 0) {
            reverse();
            if (i < 1) {
                dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + direction * 90 * (offset / scale + i - 1) + 'deg)';
            }
        } else {
            if (opposite) {
                reverse();
                if (i == 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                } else if (i < 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + direction * 90 * (offset / scale + i - 1) + 'deg)';
                } else {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }
            } else {
                forward();
                if (i == 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                } else if (i > 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + direction * 90 * (offset / scale + i - 1) + 'deg)';
                } else {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }
            }
        }
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
    var HANDLE = this;
    console.log(HANDLE);
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
}

module.exports = addBtn;

},{}],6:[function(require,module,exports){
/*
 * @file   To create dots index on iSlider
 * @author xieyu33333
 */

'use strict';

function addDot() {
    var HANDLE = this;
    if (!HANDLE.isVertical) {
        (function () {
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

            HANDLE.wrap.parentNode.appendChild(dotWrap);

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
        })();
    }
}

module.exports = addDot;

},{}],7:[function(require,module,exports){
(function (global){
/**
 * Support 3D matrix translate
 * @type {boolean}
 */
'use strict';

var extendFunction = {}; //这个是我添加，用于扩展改模块的方法

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
    currentScale = opts.currentScale;
    zoomFactor = opts.zoomFactor;
    extendFunction = opts.extendFunction;
}

/**
 * Start event handle
 * @param {object} evt
 */
function startHandler(evt) {
    extendFunction.startHandlerOriginal.call(this, evt);
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
    extendFunction.moveHandlerOriginal.call(this, evt);
}

/**
 * Double tao handle
 * @param {object} evt
 */
function handleDoubleTap(evt) {
    console.log(zoomFactor);
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
    extendFunction.endHandlerOriginal.call(this, evt);
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
    var pos = { "left": 0, "top": 0 };
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
        start: { left: pos.left, top: pos.top },
        end: { left: pos.left + node.clientWidth, top: pos.top + node.clientHeight }
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
    startHandler: startHandler,
    moveHandler: moveHandler,
    endHandler: endHandler,
    initZoom: initZoom
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvZGVtby9lZmZlY3Qva3BmeS9tYWluLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyX2NvcmUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl9hbmltYXRlLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfYnV0dG9uLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfZG90LmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfem9vbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7NEJDQW9CLHlCQUF5Qjs7OztBQUU3QyxJQUFJLElBQUksR0FBRzs7QUFFUDtBQUNJLFdBQU8sRUFBRSxvQkFBb0I7Q0FDaEM7O0FBRUQ7QUFDSSxXQUFPLEVBQUUsb0JBQW9CO0NBQ2hDOztBQUVEO0FBQ0ksV0FBTyxFQUFFLG9CQUFvQjtDQUNoQzs7QUFFRDtBQUNJLFdBQU8sRUFBRSxvQkFBb0I7Q0FDaEM7O0FBRUQ7QUFDSSxXQUFPLEVBQUUsNkVBQTZFO0NBQ3pGOztBQUVEO0FBQ0ksV0FBTyxFQUFFLENBQUMsWUFBWTtBQUNsQixZQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFD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Q0FBQyxHQUFJLEdBQUcsR0FBRyxBQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUssQ0FBQyxHQUFHLENBQUMsR0FBSyxDQUFDLEdBQUcsQ0FBQyxBQUFDLENBQUM7QUFDdEUsV0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLEdBQUcsU0FBUyxHQUFHLDJCQUEyQixHQUMzRixJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLENBQUM7S0FDL0Q7O0FBRUQsVUFBTSxFQUFFLGNBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUMzQyxZQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLFlBQUksWUFBWSxHQUFHLEFBQUMsSUFBSSxLQUFLLEdBQUcsR0FBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQzlDLFlBQUksV0FBVyxHQUFHLEFBQUMsSUFBSSxLQUFLLEdBQUcsR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUMsWUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7O0FBRTNDLFlBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRTlDLFlBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNULGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUM7U0FDN0MsTUFBTTtBQUNILGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEFBQUMsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FB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RyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7S0FDL0Q7QUFDRCxRQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3pCLFdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztLQUM5RDtBQUNELFFBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDO0FBQzlDLFFBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTdJOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDYixnQkFBWSxFQUFFLFlBQVk7QUFDMUIsZUFBVyxFQUFFLFdBQVc7QUFDeEIsY0FBVSxFQUFFLFVBQVU7QUFDdEIsWUFBUSxFQUFDLFFBQVE7Q0FDcEIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgaVNsaWRlciBmcm9tICcuLi8uLi8uLi9zcmMvaXNsaWRlci5qcyc7XG5cbnZhciBsaXN0ID0gW1xuICAgIC8vIHBpY3R1cmVcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6ICcuLi9pbWdzL2ZsaXAvMC5qcGcnXG4gICAgfSxcbiAgICAvLyBwaWN0dXJlXG4gICAge1xuICAgICAgICBjb250ZW50OiAnLi4vaW1ncy9mbGlwLzEuanBnJ1xuICAgIH0sXG4gICAgLy8gcGljdHVyZVxuICAgIHtcbiAgICAgICAgY29udGVudDogJy4uL2ltZ3MvZmxpcC8yLmpwZydcbiAgICB9LFxuICAgIC8vIHBpY3R1cmVcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6ICcuLi9pbWdzL2ZsaXAvMy5qcGcnXG4gICAgfSxcbiAgICAvLyBIVE1MIFN0cmluZ1xuICAgIHtcbiAgICAgICAgY29udGVudDogJzxkaXYgc3R5bGU9XCJmb250LXNpemU6NGVtO2NvbG9yOndoaXRlO3RleHQtYWxpZ246IGNlbnRlclwiPkhUTUwgU3RyaW5nPC9kaXY+J1xuICAgIH0sXG4gICAgLy8gZWxlbWVudFxuICAgIHtcbiAgICAgICAgY29udGVudDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRvbS5pbm5lckhUTUwgPSAnRWxlbWVudCc7XG4gICAgICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6M2VtO2NvbG9yOnJnYigyMzAsIDIzMCwgNjMpOyc7XG4gICAgICAgICAgICByZXR1cm4gZG9tO1xuICAgICAgICB9KSgpXG4gICAgfSxcbiAgICAvLyBmcmFnbWVudFxuICAgIHtcbiAgICAgICAgY29udGVudDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZG9tLmlubmVySFRNTCA9ICdGcmFnbWVudCc7XG4gICAgICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6M2VtO2NvbG9yOnJnYigyMzAsIDYzLCAyMzApOyc7XG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgICAgICAgICByZXR1cm4gZnJhZztcbiAgICAgICAgfSkoKVxuICAgIH0sXG4gICAgLy8gZG9tXG4gICAge1xuICAgICAgICBjb250ZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGlkZGVuLXNwYWNlID4gcCcpXG4gICAgfVxuXTtcblxudmFyIFMgPSBuZXcgaVNsaWRlcih7XG4gICAgZG9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaVNsaWRlci13cmFwcGVyJyksXG4gICAgZGF0YTogbGlzdCxcbiAgICBpc1ZlcnRpY2FsOiB0cnVlLFxuICAgIGlzTG9vcGluZzogMSxcbiAgICBpc092ZXJzcHJlYWQ6IDEsXG4gICAgYW5pbWF0ZVRpbWU6IDgwMCxcbiAgICBhbmltYXRlVHlwZTogJ2twZnknLFxuICAgIHBsdWdpbnM6IFtbJ3pvb21waWMnLCB7Y3VycmVudFNjYWxlOjEsem9vbUZhY3RvcjogMn1dXSxcbn0pO1xuXG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaVNsaWRlckNvcmUgZnJvbSAnLi9pc2xpZGVyX2NvcmUuanMnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl9idXR0b24uanMnO1xuaW1wb3J0IERvdCBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl9kb3QuanMnO1xuaW1wb3J0IFpvb20gZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfem9vbS5qcyc7XG5cbmNsYXNzIGlTbGlkZXIgZXh0ZW5kcyBpU2xpZGVyQ29yZSB7XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgICAvL+ebtOaOpeiwg+eUqOeItuexu+aehOmAoOWZqOi/m+ihjOWIneWni+WMllxuICAgICAgICBzdXBlciguLi5vcHRzKTtcblxuICAgICAgICAvL+a3u+WKoCB6b29tIOaPkuS7tu+8jOazqOaEj+S7peS4i+S7o+eggeW/hemhu+imgVxuICAgICAgICB2YXIgc3RhcnRIYW5kbGVyT3JpZ2luYWwgPSB0aGlzLnN0YXJ0SGFuZGxlcjtcbiAgICAgICAgdmFyIGVuZEhhbmRsZXJPcmlnaW5hbCA9IHRoaXMuZW5kSGFuZGxlcjtcbiAgICAgICAgdmFyIG1vdmVIYW5kbGVyT3JpZ2luYWwgPSB0aGlzLm1vdmVIYW5kbGVyO1xuXG4gICAgICAgIHRoaXMucmVnUGx1Z2luKCdidXR0b24nLEJ1dHRvbik7XG4gICAgICAgIHRoaXMucmVnUGx1Z2luKCdkb3QnLERvdCk7XG4gICAgICAgIHRoaXMucmVnUGx1Z2luKCd6b29tcGljJywgZnVuY3Rpb24oem9vbU9wdHMpe1xuICAgICAgICAgICAgWm9vbS5pbml0Wm9vbSh7XG4gICAgICAgICAgICAgICAgY3VycmVudFNjYWxlOnpvb21PcHRzLmN1cnJlbnRTY2FsZSB8fCAxLFxuICAgICAgICAgICAgICAgIHpvb21GYWN0b3I6em9vbU9wdHMuem9vbUZhY3RvciB8fCAyLFxuICAgICAgICAgICAgICAgIGV4dGVuZEZ1bmN0aW9uOntcbiAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0SGFuZGxlck9yaWdpbmFsJzpzdGFydEhhbmRsZXJPcmlnaW5hbCxcbiAgICAgICAgICAgICAgICAgICAgJ2VuZEhhbmRsZXJPcmlnaW5hbCc6ZW5kSGFuZGxlck9yaWdpbmFsLFxuICAgICAgICAgICAgICAgICAgICAnbW92ZUhhbmRsZXJPcmlnaW5hbCc6bW92ZUhhbmRsZXJPcmlnaW5hbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZpcmUoJ2luaXRpYWxpemUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgICAgICB0aGlzLl9pbml0UGx1Z2lucygpO1xuICAgICAgICB0aGlzLl9iaW5kSGFuZGxlcigpO1xuXG4gICAgICAgIHRoaXMuZXh0ZW5kKHtcbiAgICAgICAgICAgIHN0YXJ0SGFuZGxlcjogWm9vbS5zdGFydEhhbmRsZXIsXG4gICAgICAgICAgICBtb3ZlSGFuZGxlcjogWm9vbS5tb3ZlSGFuZGxlcixcbiAgICAgICAgICAgIGVuZEhhbmRsZXI6IFpvb20uZW5kSGFuZGxlclxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaVNsaWRlcjtcbiIsIi8qKlxuICogQGZpbGUgICBpU2xpZGVyLCBhIHNpbXBsZSwgZWZmaWNlbnQgbW9iaWxlIHNsaWRlciBzb2x1dGlvblxuICpcbiAqIEBhdXRob3IgQkVGRVxuICogQ29udGFjdCBxYmF0eS5xaUBnbWFpbC5jb21cbiAqXG4gKiBMSUNFTlNFXG4gKiBodHRwczovL2dpdGh1Yi5jb20vQkUtRkUvaVNsaWRlci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdHMgICAgICAgICAgICAgICAg5Y+C5pWw6ZuGXG4gKiBAcGFyYW0ge0VsZW1lbnR9ICAgICBvcHRzLmRvbSAgICAgICAgICAgIOWkluWxguWFg+e0oCAgICAgICAgT3V0ZXIgd3JhcHBlclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0cy5kYXRhICAgICAgICAgICDmlbDmja7liJfooaggICAgICAgIENvbnRlbnQgZGF0YVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBbmltYXRpb24gZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfYW5pbWF0ZS5qcyc7XG5cbi8qKlxuICogQ2hlY2sgaW4gYXJyYXlcbiAqIEBwYXJhbSBvRWxlbWVudFxuICogQHBhcmFtIGFTb3VyY2VcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpbkFycmF5KG9FbGVtZW50LCBhU291cmNlKSB7XG4gICAgcmV0dXJuIGFTb3VyY2UuaW5kZXhPZihvRWxlbWVudCkgPiAtMTtcbn1cblxuLyoqXG4gKiBDaGVjayBpcyBhcnJheVxuICogQHBhcmFtIG9cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0FycmF5KG8pIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjbHNcbiAqIEByZXR1cm5zIHtBcnJheXx7aW5kZXg6IG51bWJlciwgaW5wdXQ6IHN0cmluZ319XG4gKi9cbmZ1bmN0aW9uIGhhc0NsYXNzKG9iaiwgY2xzKSB7XG4gICAgcmV0dXJuIG9iai5jbGFzc05hbWUubWF0Y2gobmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNscyArICcoXFxcXHN8JCknKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGNsc1xuICovXG5mdW5jdGlvbiBhZGRDbGFzcyhvYmosIGNscykge1xuICAgIGlmICghaGFzQ2xhc3Mob2JqLCBjbHMpKSB7XG4gICAgICAgIG9iai5jbGFzc05hbWUgKz0gJyAnICsgY2xzO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY2xzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKG9iaiwgY2xzKSB7XG4gICAgaWYgKGhhc0NsYXNzKG9iaiwgY2xzKSkge1xuICAgICAgICBvYmouY2xhc3NOYW1lID0gb2JqLmNsYXNzTmFtZS5yZXBsYWNlKFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNscyArICcoXFxcXHN8JCknKSwgJycpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDaGVjY2sgaXMgdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNVcmwodXJsKSB7XG4gICAgaWYgKC88XFwvP1tePl0qPi9nLnRlc3QodXJsKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IHJlZ2V4ID0gJ14nICtcbiAgICAgICAgJygoKGh0dHBzfGh0dHB8ZnRwfHJ0c3B8bW1zKTopPy8vKT8nICtcbiAgICAgICAgJygoWzAtOWEtel8hfipcXCcoKS4mPSskJS1dKzogKT9bMC05YS16XyF+KlxcJygpLiY9KyQlLV0rQCk/JyArXG4gICAgICAgICcoKFswLTldezEsM30uKXszfVswLTldezEsM318KFswLTlhLXpfIX4qXFwnKCktXSsuKSooWzAtOWEtel1bMC05YS16LV17MCw2MX0pP1swLTlhLXpdLlthLXpdezIsNn0pPycgK1xuICAgICAgICAnKDpbMC05XXsxLDR9KT8nICtcbiAgICAgICAgJyhbXlxcPyNdKyk/JyArXG4gICAgICAgICcoXFxcXFxcP1teI10rKT8nICtcbiAgICAgICAgJygjLispPycgK1xuICAgICAgICAnJCc7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgpLnRlc3QodXJsKTtcbn1cblxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIGlTbGljZXIoW1t7RWxlbWVudH0gY29udGFpbmVyLF0ge0FycmF5fSBkYXRhbGlzdCxdIHtvYmplY3R9IG9wdGlvbnMpXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGFsaXN0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogIG9wdGlvbnMuZG9tID4gY29udGFpbmVyXG4gKiAgb3B0aW9ucy5kYXRhID4gZGF0YWxpc3RcbiAqL1xuY2xhc3MgaVNsaWRlckNvcmUge1xuICAgIC8vRVM25Lit5paw5Z6L5p6E6YCg5ZmoXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCAzKTtcbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXJzIHJlcXVpcmVkIScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRzID0gYXJncy5wb3AoKTtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdHMuZGF0YSB8fCBhcmdzWzFdO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG9wdHMuZG9tID0gb3B0cy5kb20gfHwgYXJnc1swXTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRzLmRvbSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgY2FuIG5vdCBiZSBlbXB0eSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0cy5kYXRhIHx8ICFvcHRzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgbXVzdCBiZSBhbiBhcnJheSBhbmQgbXVzdCBoYXZlIG1vcmUgdGhhbiBvbmUgZWxlbWVudCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFdmVudCB3aGl0ZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5FVkVOVFMgPSAnaW5pdGlhbGl6ZSBzbGlkZSBzbGlkZVN0YXJ0IHNsaWRlRW5kIHNsaWRlQ2hhbmdlIHNsaWRlQ2hhbmdlZCBzbGlkZVJlc3RvcmUgc2xpZGVSZXN0b3JlZCByZWxvYWREYXRhIGRlc3Ryb3knLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVhc2luZyB3aGl0ZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIFtBcnJheSwgUmVnRXhwW11dXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuRUFTSU5HID0gW1xuICAgICAgICAgICAgJ2xpbmVhciBlYXNlIGVhc2UtaW4gZWFzZS1vdXQgZWFzZS1pbi1vdXQnLnNwbGl0KCcgJyksXG4gICAgICAgICAgICAvY3ViaWMtYmV6aWVyXFwoKFteXFxkXSooXFxkKy4/XFxkKilbXlxcLF0qXFwsPyl7NH1cXCkvXG4gICAgICAgIF07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRBR1Mgd2hpdGVsaXN0IG9uIGZpeHBhZ2UgbW9kZVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuRklYX1BBR0VfVEFHUyA9ICdTRUxFQ1QgSU5QVVQgVEVYVEFSRUEgQlVUVE9OIExBQkVMJy5zcGxpdCgnICcpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQbHVnaW5zXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wbHVnaW5zID0ge307XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogT3B0aW9uc1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb3B0cyA9IG9wdHM7XG4gICAgICAgIG9wdHMgPSBhcmdzID0gbnVsbDtcblxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uRW5kRXZlbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZW1wdHkgZnVuY3Rpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEVNUFRZX0ZVTkNUSU9OKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXh0ZW5kXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGV4dGVuZCgpIHtcbiAgICAgICAgbGV0IG1haW4sIGV4dGVuZCwgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1haW4gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGV4dGVuZCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbWFpbiA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgZXh0ZW5kID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5IGluIGV4dGVuZCkge1xuICAgICAgICAgICAgaWYgKGV4dGVuZC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBtYWluW3Byb3BlcnR5XSA9IGV4dGVuZFtwcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBwbHVnaW5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcmVnUGx1Z2luKG5hbWUsIHBsdWdpbikge1xuICAgICAgICB0aGlzLnBsdWdpbnNbbmFtZV0gPSB0aGlzLnBsdWdpbnNbbmFtZV0gfHwgcGx1Z2luO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdHJhbnNpdGlvbkVuZEV2ZW50KCkge1xuICAgICAgICBsZXQgZXZ0TmFtZTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChldnROYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2dE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlRWxlbWVudCcpO1xuICAgICAgICAgICAgbGV0IHRyYW5zaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgICAgICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgdCBpbiB0cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZXZ0TmFtZSA9IHRyYW5zaXRpb25zW3RdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuY2xhc3MgaVNsaWRlclByb3RvdHlwZSBleHRlbmRzIGlTbGlkZXJDb3JlIHtcbiAgICBjb25zdHJ1Y3RvciguLi5vcHRzKSB7XG4gICAgICAgIC8v55u05o6l6LCD55So54i257G75p6E6YCg5Zmo6L+b6KGM5Yid5aeL5YyWXG4gICAgICAgIHN1cGVyKC4uLm9wdHMpO1xuICAgICAgICB0aGlzLl9zZXR0aW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0dGluZyBwYXJhbWV0ZXJzIGZvciBzbGlkZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9zZXR0aW5nKCkge1xuXG4gICAgICAgIC8vIOaYr+WQpumAhuWQkeaJp+ihjFxuICAgICAgICB0aGlzLm9wcG9zaXRlID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwbHVnaW5zXG4gICAgICAgICAqIEB0eXBlIHtBcnJheXx7fXwqfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcGx1Z2lucyA9IHRoaXMucGx1Z2lucztcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge3tkZWZhdWx0OiBGdW5jdGlvbn18Kn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jcyA9IHRoaXMuX2FuaW1hdGVGdW5jcztcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogbGlzdGVuZXJcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fTFNOID0ge307XG5cbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gLSBTZXQgb3B0aW9uc1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuX29wdHM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvbSBlbGVtZW50IHdyYXBwaW5nIGNvbnRlbnRcbiAgICAgICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3JhcCA9IG9wdHMuZG9tO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEYXRhIGxpc3RcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRhdGEgPSBvcHRzLmRhdGE7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRlZmF1bHQgc2xpZGUgZGlyZWN0aW9uXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzVmVydGljYWwgPSBvcHRzLmlzVmVydGljYWwgfHwgZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE92ZXJzcHJlYWQgbW9kZVxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc092ZXJzcHJlYWQgPSBvcHRzLmlzT3ZlcnNwcmVhZCB8fCBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGxheSB0aW1lIGdhcFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCAyMDAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzdGFydCBmcm9tIGluaXRJbmRleCBvciAwXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5pdEluZGV4ID0gb3B0cy5pbml0SW5kZXggPiAwICYmIG9wdHMuaW5pdEluZGV4IDwgb3B0cy5kYXRhLmxlbmd0aCAtIDEgPyBvcHRzLmluaXRJbmRleCA6IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRvdWNoc3RhcnQgcHJldmVudCBkZWZhdWx0IHRvIGZpeFBhZ2VcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZml4UGFnZSA9IG9wdHMuZml4UGFnZSB8fCB0cnVlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzbGlkZUluZGV4XG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSB0aGlzLnNsaWRlSW5kZXggfHwgdGhpcy5pbml0SW5kZXggfHwgMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQXhpc1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmF4aXMgPSB0aGlzLmlzVmVydGljYWwgPyAnWScgOiAnWCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldmVyc2VBeGlzXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJldmVyc2VBeGlzID0gdGhpcy5heGlzID09PSAnWScgPyAnWCcgOiAnWSc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBwZXIgd2lkdGhcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLndyYXAuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBwZXIgaGVpZ2h0XG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMud3JhcC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJhdGlvIGhlaWdodDp3aWR0aFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yYXRpbyA9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2NhbGUsIHNpemUgcnVsZVxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuaXNWZXJ0aWNhbCA/IHRoaXMuaGVpZ2h0IDogdGhpcy53aWR0aDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT24gc2xpZGUgb2Zmc2V0IHBvc2l0aW9uXG4gICAgICAgICAqIEB0eXBlIHt7WDogbnVtYmVyLCBZOiBudW1iZXJ9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLm9mZnNldCB8fCB7WDogMCwgWTogMH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogbG9vcGluZyBsb2dpYyBhZGp1c3RcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzTG9vcGluZyA9IHRoaXMuZGF0YS5sZW5ndGggPiAxICYmIG9wdHMuaXNMb29waW5nID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhdXRvcGxheSBsb2dpYyBhZGp1c3RcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgPSB0aGlzLmRhdGEubGVuZ3RoID4gMSAmJiBvcHRzLmlzQXV0b3BsYXkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgLy8gbGl0dGxlIHRyaWNrIHNldCwgd2hlbiB5b3UgY2hvb2NlIHRlYXIgJiB2ZXJ0aWNhbCBzYW1lIHRpbWVcbiAgICAgICAgLy8gaVNsaWRlciBvdmVyc3ByZWFkIG1vZGUgd2lsbCBiZSBzZXQgdHJ1ZSBhdXRvbWV0aWNseVxuICAgICAgICBpZiAob3B0cy5hbmltYXRlVHlwZSA9PT0gJ2NhcmQnICYmIHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5pc092ZXJzcHJlYWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlYnVnIG1vZGVcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9ufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2cgPSBvcHRzLmlzRGVidWcgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnbG9iYWwuY29uc29sZS5sb2cuYXBwbHkoZ2xvYmFsLmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gOiB0aGlzLkVNUFRZX0ZVTkNUSU9OO1xuXG4gICAgICAgIC8vIHNldCBEYW1waW5nIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX3NldFVwRGFtcGluZygpO1xuXG4gICAgICAgIC8vIHN0b3AgYXV0b3BsYXkgd2hlbiB3aW5kb3cgYmx1clxuICAgICAgICAvLyB0aGlzLl9zZXRQbGF5V2hlbkZvY3VzKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFuaW1hdGlvbiBwYXJtYXM6XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gICAgICBkb20gICAgICAgICAgICAg5Zu+54mH55qE5aSW5bGCPGxpPuWuueWZqCAgICAgICBJbWcgd3JhcHBlclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgYXhpcyAgICAgICAgICAgIOWKqOeUu+aWueWQkSAgICAgICAgICAgICAgICBhbmltYXRlIGRpcmVjdGlvblxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgc2NhbGUgICAgICAgICAgIOWuueWZqOWuveW6piAgICAgICAgICAgICAgICBPdXRlciB3cmFwcGVyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICBpICAgICAgICAgICAgICAgPGxpPuWuueWZqGluZGV4ICAgICAgICAgIEltZyB3cmFwcGVyJ3MgaW5kZXhcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIG9mZnNldCAgICAgICAgICDmu5Hliqjot53nprsgICAgICAgICAgICAgICAgbW92ZSBkaXN0YW5jZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hbmltYXRlRnVuY3MgPSB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX2FuaW1hdGVGdW5jcywgQW5pbWF0aW9uKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuY3Nbb3B0cy5hbmltYXRlVHlwZSBpbiB0aGlzLl9hbmltYXRlRnVuY3MgPyBvcHRzLmFuaW1hdGVUeXBlIDogJ2RlZmF1bHQnXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW5pbWF0ZSBwcm9jZXNzIHRpbWUgKG1zKSwgZGVmYXVsdDogMzAwbXNcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hbmltYXRlVGltZSA9IG9wdHMuYW5pbWF0ZVRpbWUgIT0gbnVsbCAmJiBvcHRzLmFuaW1hdGVUaW1lID4gLTEgPyBvcHRzLmFuaW1hdGVUaW1lIDogMzAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbmltYXRlIGVmZmVjdHMsIGRlZmF1bHQ6IGVhc2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hbmltYXRlRWFzaW5nID1cbiAgICAgICAgICAgIGluQXJyYXkob3B0cy5hbmltYXRlRWFzaW5nLCB0aGlzLkVBU0lOR1swXSlcbiAgICAgICAgICAgIHx8IHRoaXMuRUFTSU5HWzFdLnRlc3Qob3B0cy5hbmltYXRlRWFzaW5nKVxuICAgICAgICAgICAgICAgID8gb3B0cy5hbmltYXRlRWFzaW5nXG4gICAgICAgICAgICAgICAgOiAnZWFzZSc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluIHNsaWRlIGFuaW1hdGlvblxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbkFuaW1hdGUgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXggdG91Y2gvbW91c2UgZXZlbnRzXG4gICAgICAgICAqIEB0eXBlIHt7aGFzVG91Y2gsIHN0YXJ0RXZ0LCBtb3ZlRXZ0LCBlbmRFdnR9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZXZpY2VFdmVudHMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGhhc1RvdWNoID0gISEoKCdvbnRvdWNoc3RhcnQnIGluIGdsb2JhbCkgfHwgZ2xvYmFsLkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBnbG9iYWwuRG9jdW1lbnRUb3VjaCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhhc1RvdWNoOiBoYXNUb3VjaCxcbiAgICAgICAgICAgICAgICBzdGFydEV2dDogaGFzVG91Y2ggPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgICAgICBtb3ZlRXZ0OiBoYXNUb3VjaCA/ICd0b3VjaG1vdmUnIDogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICAgICAgZW5kRXZ0OiBoYXNUb3VjaCA/ICd0b3VjaGVuZCcgOiAnbW91c2V1cCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdCBldmVudHNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fVxuXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0gUmVnaXN0ZXIgZXZlbnRzXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB5b3VyIGZpbmdlciBpcyBtb3ZpbmdcbiAgICAgICAgdGhpcy5vbignc2xpZGUnLCBvcHRzLm9uc2xpZGUpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgdG91Y2ggdGhlIHNjcmVlblxuICAgICAgICB0aGlzLm9uKCdzbGlkZVN0YXJ0Jywgb3B0cy5vbnNsaWRlc3RhcnQpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGZpbmdlciBtb3ZlIG91dCBvZiB0aGUgc2NyZWVuXG4gICAgICAgIHRoaXMub24oJ3NsaWRlRW5kJywgb3B0cy5vbnNsaWRlZW5kKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHNsaWRlIHRvIG5leHQvcHJldiBzY2VuZVxuICAgICAgICB0aGlzLm9uKCdzbGlkZUNoYW5nZScsIG9wdHMub25zbGlkZWNoYW5nZSk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBuZXh0L3ByZXYgc2NlbmUsIHdoaWxlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICAgIHRoaXMub24oJ3NsaWRlQ2hhbmdlZCcsIG9wdHMub25zbGlkZWNoYW5nZWQpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gcmVzdG9yZSB0byB0aGUgY3VycmVudCBzY2VuZVxuICAgICAgICB0aGlzLm9uKCdzbGlkZVJlc3RvcmUnLCBvcHRzLm9uc2xpZGVyZXN0b3JlKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHJlc3RvcmUgdG8gdGhlIGN1cnJlbnQgc2NlbmUsIHdoaWxlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICAgIHRoaXMub24oJ3NsaWRlUmVzdG9yZWQnLCBvcHRzLm9uc2xpZGVyZXN0b3JlZCk7XG5cbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gLSBQbHVnaW5zXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBsdWdpbkNvbmZpZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaXNBcnJheShvcHRzLnBsdWdpbnMpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHt9XG4gICAgICAgICAgICAgICAgb3B0cy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gcGx1Z2luQ29uZmlnRWFjaChwbHVnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnW3BsdWdpblswXV0gPSBwbHVnaW4uc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1twbHVnaW5dID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuICAgICAgICAvLyBBdXRvcGxheSBtb2RlXG4gICAgICAgIGlmICh0aGlzLmlzQXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCBwbHVnaW5zXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW5pdFBsdWdpbnMoKSB7XG4gICAgICAgIGxldCBjb25maWcgPSB0aGlzLnBsdWdpbkNvbmZpZztcbiAgICAgICAgbGV0IHBsdWdpbnMgPSB0aGlzLl9wbHVnaW5zO1xuICAgICAgICBmb3IgKGxldCBpIGluIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBwbHVnaW5zLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1tJTklUIFBMVUdJTl06JywgaSwgcGx1Z2luc1tpXSk7XG4gICAgICAgICAgICAgICAgcGx1Z2luc1tpXVxuICAgICAgICAgICAgICAgICYmIHR5cGVvZiBwbHVnaW5zW2ldID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mIHBsdWdpbnNbaV0uYXBwbHlcbiAgICAgICAgICAgICAgICAmJiBwbHVnaW5zW2ldLmFwcGx5KHRoaXMsIGNvbmZpZ1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBlbmFibGUgZGFtcGluZyB3aGVuIHNsaWRlciBtZWV0IHRoZSBlZGdlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2V0VXBEYW1waW5nKCkge1xuICAgICAgICBsZXQgb25lSW4yID0gdGhpcy5zY2FsZSA+PiAxO1xuICAgICAgICBsZXQgb25lSW40ID0gb25lSW4yID4+IDE7XG4gICAgICAgIGxldCBvbmVJbjE2ID0gb25lSW40ID4+IDI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXQgZGFtcGluZyBmdW5jdGlvblxuICAgICAgICAgKiBAcGFyYW0gZGlzdGFuY2VcbiAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9kYW1waW5nID0gZnVuY3Rpb24gKGRpc3RhbmNlKSB7XG4gICAgICAgICAgICBsZXQgZGlzID0gTWF0aC5hYnMoZGlzdGFuY2UpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgaWYgKGRpcyA8IG9uZUluMikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRpcyA+PiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzIDwgb25lSW4yICsgb25lSW40KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgKChkaXMgLSBvbmVJbjIpID4+IDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgb25lSW4xNiArICgoZGlzIC0gb25lSW4yIC0gb25lSW40KSA+PiAzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlID4gMCA/IHJlc3VsdCA6IC1yZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaXRlbSB0eXBlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pdGVtVHlwZShpdGVtKSB7XG4gICAgICAgIGlmICghaXNOYU4oaXRlbSkpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbaXRlbV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHlwZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29udGVudCA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgbGV0IHR5cGU7XG4gICAgICAgIGlmIChjb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnZW1wdHknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKEJvb2xlYW4oY29udGVudC5ub2RlTmFtZSkgJiYgQm9vbGVhbihjb250ZW50Lm5vZGVUeXBlKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAnbm9kZSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmIChpc1VybChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ3BpYyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdodG1sJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAndW5rbm93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBzaW5nbGUgaXRlbSBodG1sIGJ5IGlkeFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC4uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRhdGFJbmRleCAgLi5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZW5kZXJJdGVtKGVsLCBkYXRhSW5kZXgpIHtcblxuICAgICAgICBsZXQgaXRlbSwgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcblxuICAgICAgICBsZXQgaW5zZXJ0SW1nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBsZXQgc2ltZyA9ICcgc3JjPVwiJyArIGl0ZW0uY29udGVudCArICdcIic7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLmhlaWdodCAvIGl0ZW0ud2lkdGggPiB0aGlzLnJhdGlvKSB7XG4gICAgICAgICAgICAgICAgc2ltZyArPSAnIGhlaWdodD1cIicgKyBlbC5jbGllbnRIZWlnaHQgKyAnXCInO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaW1nICs9ICcgd2lkdGg9XCInICsgZWwuY2xpZW50V2lkdGggKyAnXCInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5pc092ZXJzcHJlYWQpIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgaXRlbS5jb250ZW50ICsgJykgbm8tcmVwZWF0IDUwJSA1MCUvY292ZXInO1xuICAgICAgICAgICAgICAgIHNpbWcgKz0gJyBzdHlsZT1cImRpc3BsYXk6YmxvY2s7b3BhY2l0eTowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7XCInXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9ICc8aW1nJyArIHNpbWcgKyAnIC8+JztcbiAgICAgICAgfVxuICAgICAgICAgICAgLlxuICAgICAgICAgICAgYmluZCh0aGlzKTtcblxuICAgICAgICAvLyBjbGVhbiBzY2VuZVxuICAgICAgICBlbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuXG4gICAgICAgIC8vIGdldCB0aGUgcmlnaHQgaXRlbSBvZiBkYXRhXG4gICAgICAgIGlmICghdGhpcy5pc0xvb3BpbmcgJiYgdGhpcy5kYXRhW2RhdGFJbmRleF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gU3RvcCBzbGlkZSB3aGVuIGl0ZW0gaXMgZW1wdHlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFJbmRleCA9IChsZW4gLyogKiBNYXRoLmNlaWwoTWF0aC5hYnMoZGF0YUluZGV4IC8gbGVuKSkqLyArIGRhdGFJbmRleCkgJSBsZW47XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2RhdGFJbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuX2l0ZW1UeXBlKGl0ZW0pO1xuXG4gICAgICAgIHRoaXMubG9nKCdbUmVuZGVyIElURU1dOicsIHR5cGUsIGRhdGFJbmRleCwgaXRlbSk7XG5cbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2lzbGlkZXItJyArIHR5cGU7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdwaWMnOlxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhlaWdodCAmJiBpdGVtLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEltZy5zcmMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWcub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gY3VycmVudEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gY3VycmVudEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGVkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG9tJzpcbiAgICAgICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25vZGUnOlxuICAgICAgICAgICAgY2FzZSAnZWxlbWVudCc6XG4gICAgICAgICAgICAgICAgLy8gZnJhZ21lbnQsIGNyZWF0ZSBjb250YWluZXJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jb250ZW50Lm5vZGVUeXBlID09PSAxMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5hcHBlbmRDaGlsZChpdGVtLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbnRlbnQgPSBlbnRpdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGl0ZW0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc3Rwb25pbmcgdGhlIGludGVybWVkaWF0ZSBzY2VuZSByZW5kZXJpbmdcbiAgICAgKiB1bnRpbCB0aGUgdGFyZ2V0IHNjZW5lIGlzIGNvbXBsZXRlbHkgcmVuZGVyZWQgKHJlbmRlciBpbiBldmVudCBzbGlkZUNoYW5nZWQpXG4gICAgICogdG8gYXZvaWQgYSBqdW1weSBmZWVsIHdoZW4gc3dpdGNoaW5nIGJldHdlZW4gc2NlbmVzXG4gICAgICogZ2l2ZW4gdGhhdCB0aGUgZGlzdGFuY2Ugb2Ygc2xpZGluZyBpcyBtb3JlIHRoYW4gMS5cbiAgICAgKiBlLmcuIGBgYHRoaXMuc2xpZGVUbyg+Ky0xKWBgYFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVuZGVySW50ZXJtZWRpYXRlU2NlbmUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtLmFwcGx5KHRoaXMsIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lKTtcbiAgICAgICAgICAgIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGx5IHN0eWxlcyBvbiBjaGFuZ2VkXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY2hhbmdlZFN0eWxlcygpIHtcbiAgICAgICAgbGV0IHNsaWRlU3R5bGVzID0gWydpc2xpZGVyLXByZXYnLCAnaXNsaWRlci1hY3RpdmUnLCAnaXNsaWRlci1uZXh0J107XG4gICAgICAgIHRoaXMuZWxzLmZvckVhY2goZnVuY3Rpb24gY2hhbmdlU3R5cGVFYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsICcoJyArIHNsaWRlU3R5bGVzLmpvaW4oJ3wnKSArICcpJyk7XG4gICAgICAgICAgICBhZGRDbGFzcyhlbCwgc2xpZGVTdHlsZXNbaW5kZXhdKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgbGlzdCBodG1sXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVuZGVyV3JhcHBlcigpIHtcbiAgICAgICAgdGhpcy5vdXRlciAmJiAodGhpcy5vdXRlci5pbm5lckhUTUwgPSAnJyk7XG4gICAgICAgIC8vIGluaXRhaWwgdWwgZWxlbWVudFxuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIG91dGVyLmNsYXNzTmFtZSA9ICdpc2xpZGVyLW91dGVyJztcblxuICAgICAgICAvLyBzdG9yYWdlIGxpIGVsZW1lbnRzLCBvbmx5IHN0b3JlIDMgZWxlbWVudHMgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuICAgICAgICB0aGlzLmVscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIHRoaXMuZWxzLnB1c2gobGkpO1xuXG4gICAgICAgICAgICAvLyBwcmVwYXJlIHN0eWxlIGFuaW1hdGlvblxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMobGksIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsICYmICh0aGlzLl9vcHRzLmFuaW1hdGVUeXBlID09PSAncm90YXRlJyB8fCB0aGlzLl9vcHRzLmFuaW1hdGVUeXBlID09PSAnZmxpcCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShsaSwgMSAtIGkgKyB0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShsaSwgaSAtIDEgKyB0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlZFN0eWxlcygpO1xuXG4gICAgICAgIC8vIFByZWxvYWQgcGljdHVyZSBbIG1heSBiZSBwaWMgOikgXVxuICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmVsb2FkSW1nKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgMjAwKTtcblxuICAgICAgICAvLyBhcHBlbmQgdWwgdG8gZGl2I2NhbnZhc1xuICAgICAgICBpZiAoIXRoaXMub3V0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIgPSBvdXRlcjtcbiAgICAgICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVsb2FkIGltZyB3aGVuIHNsaWRlQ2hhbmdlXG4gICAgICogRnJvbSBjdXJyZW50IGluZGV4ICsyLCAtMiBzY2VuZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggbWVhbnMgd2hpY2ggaW1hZ2Ugd2lsbCBiZSBsb2FkXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcHJlbG9hZEltZyhkYXRhSW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGxldCBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGxldCBsb2FkSW1nID0gZnVuY3Rpb24gcHJlbG9hZEltZ0xvYWRpbmdQcm9jZXNzKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkYXRhW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5faXRlbVR5cGUoaXRlbSkgPT09ICdwaWMnICYmICFpdGVtLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJlbG9hZEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkSW1nLnNyYyA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZEltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ud2lkdGggPSBwcmVsb2FkSW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBwcmVsb2FkSW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5sb2FkZWQgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxvYWRJbWcoKGRhdGFJbmRleCArIDIpICUgbGVuKTtcbiAgICAgICAgICAgIGxvYWRJbWcoKGRhdGFJbmRleCAtIDIgKyBsZW4pICUgbGVuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdhdGNoIGV2ZW50IHRyYW5zaXRpb25FbmRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF93YXRjaFRyYW5zaXRpb25FbmQodGltZSwgZXZlbnRUeXBlKSB7XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGxldCBsc247XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDonLCAnd2F0Y2hUcmFuc2l0aW9uRW5kOjpzdHVjazo6cGlsZScsIHRoaXMuaW5BbmltYXRlKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZXZ0KSB7XG4gICAgICAgICAgICBpZiAobHNuKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNsZWFyVGltZW91dChsc24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5pbkFuaW1hdGUtLTtcbiAgICAgICAgICAgIHNlbGYubG9nKCdFdmVudDonLCAnd2F0Y2hUcmFuc2l0aW9uRW5kOjpzdHVjazo6cmVsZWFzZScsIHNlbGYuaW5BbmltYXRlKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmluQW5pbWF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vc2VsZi5pbkFuaW1hdGUgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdzbGlkZUNoYW5nZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2NoYW5nZWRTdHlsZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5maXJlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHNlbGYuX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1bldhdGNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1bldhdGNoKCkge1xuICAgICAgICAgICAgc2VsZi5lbHMuZm9yRWFjaChmdW5jdGlvbiB0cmFuc2xhdGlvbkVuZFVud2F0Y2hFYWNoKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihzZWxmLl90cmFuc2l0aW9uRW5kRXZlbnQoKSwgaGFuZGxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgICAgICBzZWxmLmVscy5mb3JFYWNoKGZ1bmN0aW9uIHRyYW5zbGF0aW9uRW5kRWxzRWFjaChlbCkge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoc2VsZi5fdHJhbnNpdGlvbkVuZEV2ZW50KCksIGhhbmRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsc24gPSBnbG9iYWwuc2V0VGltZW91dChoYW5kbGUsIHRpbWUpO1xuICAgICAgICBzZWxmLmluQW5pbWF0ZSsrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmQgYWxsIGV2ZW50IGhhbmRsZXIsIHdoZW4gb24gUEMsIGRpc2FibGUgZHJhZyBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2JpbmRIYW5kbGVyKCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyO1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG5cbiAgICAgICAgaWYgKCFkZXZpY2UuaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIG91dGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIG91dGVyLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5lbmRFdnQsIHRoaXMpO1xuXG4gICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMpO1xuICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcyk7XG5cbiAgICAgICAgLy8gRml4IGFuZHJvaWQgZGV2aWNlXG4gICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFVuaWZvcm1pdHkgYWRtaW4gZXZlbnRcbiAgICAgKiAgRXZlbnQgcm91dGVyXG4gICAgICogIEBwYXJhbSB7b2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gICAgICogIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldnQpIHtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgICAgICBzd2l0Y2ggKGV2dC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgIGlmICghKGV2dC5idXR0b24gPT09IDAgJiYgZXZ0LmJ1dHRvbnMgPT09IDEpKSBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRldmljZS5tb3ZlRXZ0OlxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZGV2aWNlLmVuZEV2dDpcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoY2FuY2VsJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZEhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29yaWVudGF0aW9uY2hhbmdlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uY2hhbmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Jlc2l6ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2hzdGFydCBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhcnRIYW5kbGVyKGV2dCkge1xuICAgICAgICBpZiAodGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5GSVhfUEFHRV9UQUdTLmluZGV4T2YoZXZ0LnRhcmdldC50YWdOYW1lKSA8IDApIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ob2xkaW5nIHx8IHRoaXMubG9ja2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcblxuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IHN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuZmlyZSgnc2xpZGVTdGFydCcsIGV2dCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zdGFydFggPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgICAgICAgdGhpcy5zdGFydFkgPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGV2dC5wYWdlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2htb3ZlIGNhbGxiYWNrXG4gICAgICogIEBwYXJhbSB7b2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gICAgICogIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBtb3ZlSGFuZGxlcihldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW92aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBtb3ZpbmcnKTtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgICAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgICAgIGxldCByZXZlcnNlQXhpcyA9IHRoaXMucmV2ZXJzZUF4aXM7XG4gICAgICAgIGxldCBvZmZzZXQgPSB7XG4gICAgICAgICAgICBYOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLnN0YXJ0WCkgOiAoZXZ0LnBhZ2VYIC0gdGhpcy5zdGFydFgpLFxuICAgICAgICAgICAgWTogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5zdGFydFkpIDogKGV2dC5wYWdlWSAtIHRoaXMuc3RhcnRZKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKG9mZnNldFtheGlzXSkgLSBNYXRoLmFicyhvZmZzZXRbcmV2ZXJzZUF4aXNdKSA+IDEwKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5maXJlKCdzbGlkZScsIGV2dCwgdGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0W2F4aXNdID4gMCAmJiB0aGlzLnNsaWRlSW5kZXggPT09IDAgfHwgb2Zmc2V0W2F4aXNdIDwgMCAmJiB0aGlzLnNsaWRlSW5kZXggPT09IGxlbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0W2F4aXNdID0gdGhpcy5fZGFtcGluZyhvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZWxzW2ldO1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMHMnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGl0ZW0sIGF4aXMsIHRoaXMuc2NhbGUsIGksIG9mZnNldFtheGlzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2hlbmQgY2FsbGJhY2tcbiAgICAgKiAgQHBhcmFtIHtPYmplY3R9IGV2dCBldmVudCBvYmplY3RcbiAgICAgKiAgQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGVuZEhhbmRsZXIoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc01vdmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDogZW5kJyk7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuYXhpcztcbiAgICAgICAgbGV0IGJvdW5kYXJ5ID0gdGhpcy5zY2FsZSAvIDI7XG4gICAgICAgIGxldCBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gYSBxdWljayBzbGlkZSB0aW1lIG11c3QgdW5kZXIgMzAwbXNcbiAgICAgICAgLy8gYSBxdWljayBzbGlkZSBzaG91bGQgYWxzbyBzbGlkZSBhdCBsZWFzdCAxNCBweFxuICAgICAgICBib3VuZGFyeSA9IGVuZFRpbWUgLSB0aGlzLnN0YXJ0VGltZSA+IDMwMCA/IGJvdW5kYXJ5IDogMTQ7XG5cbiAgICAgICAgbGV0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldFtheGlzXSk7XG4gICAgICAgIGxldCBhYnNSZXZlcnNlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0W3RoaXMucmV2ZXJzZUF4aXNdKTtcblxuICAgICAgICBsZXQgZ2V0TGluayA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICAgICAgICAgIGlmIChlbC5ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5sb2NhdGlvbi5ocmVmID0gZWwuaHJlZlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWwuY2xhc3NOYW1lICE9PSAnaXNsaWRlci1waWMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0TGluayhlbC5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZyhib3VuZGFyeSwgb2Zmc2V0W2F4aXNdLCBhYnNPZmZzZXQsIGFic1JldmVyc2VPZmZzZXQsIHRoaXMpO1xuXG4gICAgICAgIGlmIChvZmZzZXRbYXhpc10gPj0gYm91bmRhcnkgJiYgYWJzUmV2ZXJzZU9mZnNldCA8IGFic09mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5vcHBvc2l0ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4IC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAob2Zmc2V0W2F4aXNdIDwgLWJvdW5kYXJ5ICYmIGFic1JldmVyc2VPZmZzZXQgPCBhYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMub3Bwb3NpdGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXggKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY3JlYXRlIHRhcCBldmVudCBpZiBvZmZzZXQgPCAxMFxuICAgICAgICBpZiAoTWF0aC5hYnModGhpcy5vZmZzZXQuWCkgPCAxMCAmJiBNYXRoLmFicyh0aGlzLm9mZnNldC5ZKSA8IDEwKSB7XG4gICAgICAgICAgICB0aGlzLnRhcEV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICAgICAgdGhpcy50YXBFdnQuaW5pdEV2ZW50KCd0YXAnLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpeFBhZ2UpIHtcbiAgICAgICAgICAgICAgICBldnQudGFyZ2V0ICYmIGdldExpbmsoZXZ0LnRhcmdldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWV2dC50YXJnZXQuZGlzcGF0Y2hFdmVudCh0aGlzLnRhcEV2dCkpIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub2Zmc2V0LlggPSB0aGlzLm9mZnNldC5ZID0gMDtcblxuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdzbGlkZUVuZCcsIGV2dCwgdGhpcyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIG9yaWVudGF0aW9uY2hhbmdlIGNhbGxiYWNrXG4gICAgICogIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBvcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIoKSB7XG4gICAgICAgIGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdFdmVudDogb3JpZW50YXRpb25jaGFuZ2UnKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc2l6ZSBjYWxsYmFja1xuICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICByZXNpemVIYW5kbGVyKCkge1xuICAgICAgICBpZiAodGhpcy5oZWlnaHQgIT09IHRoaXMud3JhcC5jbGllbnRIZWlnaHQgfHwgdGhpcy53aWR0aCAhPT0gdGhpcy53cmFwLmNsaWVudFdpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl9MU04ucmVzaXplICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLnJlc2l6ZSk7XG4gICAgICAgICAgICB0aGlzLl9MU04ucmVzaXplID0gZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IHJlc2l6ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX0xTTi5yZXNpemUgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04ucmVzaXplKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBzbGlkZSBsb2dpY2FsLCBnb3RvIGRhdGEgaW5kZXhcbiAgICAgKiAgQHBhcmFtIHtudW1iZXJ9IGRhdGFJbmRleCB0aGUgZ290byBpbmRleFxuICAgICAqICBAcHVibGljXG4gICAgICovXG4gICAgc2xpZGVUbyhkYXRhSW5kZXgsIG9wdHMpIHtcbiAgICAgICAgaWYgKHRoaXMubG9ja2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudW5ob2xkKCk7XG4gICAgICAgIGxldCBhbmltYXRlVGltZSA9IHRoaXMuYW5pbWF0ZVRpbWU7XG4gICAgICAgIGxldCBhbmltYXRlVHlwZSA9IHRoaXMuX29wdHMuYW5pbWF0ZVR5cGU7XG4gICAgICAgIGxldCBhbmltYXRlRnVuYyA9IHRoaXMuX2FuaW1hdGVGdW5jO1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgbGV0IGVscyA9IHRoaXMuZWxzO1xuICAgICAgICBsZXQgaWR4ID0gZGF0YUluZGV4O1xuICAgICAgICBsZXQgbiA9IGRhdGFJbmRleCAtIHRoaXMuc2xpZGVJbmRleDtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBsZXQgZXZlbnRUeXBlO1xuXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmIChvcHRzLmFuaW1hdGVUaW1lID4gLTEpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlVGltZSA9IG9wdHMuYW5pbWF0ZVRpbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdHMuYW5pbWF0ZVR5cGUgPT09ICdzdHJpbmcnICYmIG9wdHMuYW5pbWF0ZVR5cGUgaW4gdGhpcy5fYW5pbWF0ZUZ1bmNzKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZVR5cGUgPSBvcHRzLmFuaW1hdGVUeXBlO1xuICAgICAgICAgICAgICAgIGFuaW1hdGVGdW5jID0gdGhpcy5fYW5pbWF0ZUZ1bmNzW2FuaW1hdGVUeXBlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluIHRoZSBzbGlkZSBwcm9jZXNzLCBhbmltYXRlIHRpbWUgaXMgc3F1ZWV6ZWRcbiAgICAgICAgbGV0IHNxdWVlemVUaW1lID0gTWF0aC5hYnMob2Zmc2V0W3RoaXMuYXhpc10pIC8gdGhpcy5zY2FsZSAqIGFuaW1hdGVUaW1lO1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhuKSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obiA+IDAgPyB0aGlzLmVsc1syXSA6IHRoaXMuZWxzWzBdLCBpZHgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJlbG9hZCB3aGVuIHNsaWRlXG4gICAgICAgIHRoaXMuX3ByZWxvYWRJbWcoaWR4KTtcblxuICAgICAgICAvLyBnZXQgcmlnaHQgaXRlbSBvZiBkYXRhXG4gICAgICAgIGlmIChkYXRhW2lkeF0pIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IGlkeDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzTG9vcGluZykge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IG4gPiAwID8gMCA6IGRhdGEubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG4gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2coJ0luZGV4OicgKyB0aGlzLnNsaWRlSW5kZXgpO1xuXG4gICAgICAgIC8vIGtlZXAgdGhlIHJpZ2h0IG9yZGVyIG9mIGl0ZW1zXG4gICAgICAgIGxldCBoZWFkRWwsIHRhaWxFbCwgc3RlcDtcblxuXG4gICAgICAgIC8vIHNsaWRlY2hhbmdlIHNob3VsZCByZW5kZXIgbmV3IGl0ZW1cbiAgICAgICAgLy8gYW5kIGNoYW5nZSBuZXcgaXRlbSBzdHlsZSB0byBmaXQgYW5pbWF0aW9uXG4gICAgICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgICAgICAvLyBSZXN0b3JlIHRvIGN1cnJlbnQgc2NlbmVcbiAgICAgICAgICAgIGV2ZW50VHlwZSA9ICdzbGlkZVJlc3RvcmUnO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICAvL+i/meS4gOi/memHjOeahOS7o+egge+8jOS4juWKqOeUu+aViOaenOaMgumSqVxuICAgICAgICAgICAgaWYgKCh0aGlzLmlzVmVydGljYWwgJiYgKGFuaW1hdGVUeXBlID09PSAncm90YXRlJyB8fCBhbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSApIF4gKG4gPiAwKSkge1xuICAgICAgICAgICAgICAgIGVscy5wdXNoKGVscy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICBoZWFkRWwgPSBlbHNbMl07XG4gICAgICAgICAgICAgICAgdGFpbEVsID0gZWxzWzBdO1xuICAgICAgICAgICAgICAgIHN0ZXAgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxzLnVuc2hpZnQoZWxzLnBvcCgpKTtcbiAgICAgICAgICAgICAgICBoZWFkRWwgPSBlbHNbMF07XG4gICAgICAgICAgICAgICAgdGFpbEVsID0gZWxzWzJdO1xuICAgICAgICAgICAgICAgIHN0ZXAgPSAtMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKE1hdGguYWJzKG4pID09PSAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySW50ZXJtZWRpYXRlU2NlbmUoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGhlYWRFbCwgaWR4ICsgbik7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKG4pID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0oaGVhZEVsLCBpZHggKyBzdGVwKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSA9IFt0YWlsRWwsIGlkeCAtIHN0ZXBdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBoZWFkRWwuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgICAgIGhlYWRFbC5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG5cbiAgICAgICAgICAgIGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBoZWFkRWwuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgICAgIC8vIE1pbnVzIHNxdWVlemUgdGltZVxuICAgICAgICAgICAgc3F1ZWV6ZVRpbWUgPSBhbmltYXRlVGltZSAtIHNxdWVlemVUaW1lO1xuXG4gICAgICAgICAgICBldmVudFR5cGUgPSAnc2xpZGVDaGFuZ2UnO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKGV2ZW50VHlwZSwgdGhpcy5zbGlkZUluZGV4LCBlbHNbMV0sIHRoaXMpO1xuICAgICAgICB0aGlzLl93YXRjaFRyYW5zaXRpb25FbmQoc3F1ZWV6ZVRpbWUsIGV2ZW50VHlwZSArICdkJywgdGhpcy5zbGlkZUluZGV4LCBlbHNbMV0sIHRoaXMpO1xuXG4gICAgICAgIC8vIGRvIHRoZSB0cmljayBhbmltYXRpb25cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChlbHNbaV0gIT09IGhlYWRFbCkge1xuICAgICAgICAgICAgICAgIGVsc1tpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAnICsgKHNxdWVlemVUaW1lIC8gMTAwMCkgKyAncyAnICsgdGhpcy5hbmltYXRlRWFzaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGhpcy5vcHBvc2l0ZSl7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZUZ1bmMuY2FsbCh0aGlzLCBlbHNbaV0sIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCwgdHJ1ZSk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBhbmltYXRlRnVuYy5jYWxsKHRoaXMsIGVsc1tpXSwgdGhpcy5heGlzLCB0aGlzLnNjYWxlLCBpLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBub3QgbG9vcGluZywgc3RvcCBwbGF5aW5nIHdoZW4gbWVldCB0aGUgZW5kIG9mIGRhdGFcbiAgICAgICAgaWYgKHRoaXMuaXNBdXRvcGxheSAmJiAhdGhpcy5pc0xvb3BpbmcgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBkYXRhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNsaWRlIHRvIG5leHQgc2NlbmVcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2xpZGVOZXh0KCkge1xuICAgICAgICB0aGlzLnNsaWRlVG8uYXBwbHkodGhpcywgW3RoaXMuc2xpZGVJbmRleCArIDFdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2xpZGUgdG8gcHJldmlvdXMgc2NlbmVcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgc2xpZGVQcmV2KCkge1xuICAgICAgICB0aGlzLnNsaWRlVG8uYXBwbHkodGhpcywgW3RoaXMuc2xpZGVJbmRleCAtIDFdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgcGx1Z2luIChydW4gdGltZSBtb2RlKVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcGx1Z2luXG4gICAgICogQHBhcmFtIHsuLi59XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgLyogcmVnUGx1Z2luKCkge1xuICAgICAgICBsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIGxldCBuYW1lID0gYXJncy5zaGlmdCgpLFxuICAgICAgICAgICAgcGx1Z2luID0gYXJnc1swXTtcblxuICAgICAgICBpZiAoIXRoaXMuX3BsdWdpbnMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgdHlwZW9mIHBsdWdpbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLl9wbHVnaW5zW25hbWVdID0gcGx1Z2luO1xuICAgICAgICAgICAgYXJncy5zaGlmdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXV0byBlbmFibGUgYW5kIGluaXQgcGx1Z2luIHdoZW4gYXQgcnVuIHRpbWVcbiAgICAgICAgaWYgKCFpbkFycmF5KG5hbWUsIHRoaXMuX29wdHMucGx1Z2lucykpIHtcbiAgICAgICAgICAgIHRoaXMuX29wdHMucGx1Z2lucy5wdXNoKGFyZ3MubGVuZ3RoID8gW10uY29uY2F0KFtuYW1lXSwgYXJncykgOiBuYW1lKTtcbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9wbHVnaW5zW25hbWVdID09PSAnZnVuY3Rpb24nICYmIHRoaXMuX3BsdWdpbnNbbmFtZV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH1cbiAgICB9Ki9cblxuICAgIC8qKlxuICAgICAqICBzaW1wbGUgZXZlbnQgZGVsZWdhdGUgbWV0aG9kXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlIGV2ZW50IG5hbWVcbiAgICAgKiAgQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIHRoZSBzaW1wbGUgY3NzIHNlbGVjdG9yIGxpa2UgalF1ZXJ5XG4gICAgICogIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIGV2ZW50IGNhbGxiYWNrXG4gICAgICogIEBwdWJsaWNcbiAgICAgKi9cbiAgICBiaW5kKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZSkge1xuICAgICAgICAgICAgbGV0IGV2dCA9IGdsb2JhbC5ldmVudCA/IGdsb2JhbC5ldmVudCA6IGU7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBlbGVBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWxlQXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgZGVsZWdhdGUoZXZ0VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZShlKSB7XG4gICAgICAgICAgICBsZXQgZXZ0ID0gZ2xvYmFsLmV2ZW50ID8gZ2xvYmFsLmV2ZW50IDogZTtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGVsZUFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGVBcnJbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUT0RPIHVuYmluZCwgdW5EZWxlZ2F0ZVxuICAgICAqIHJlbW92ZSBldmVudCBkZWxlZ2F0ZSBmcm9tIHdyYXBcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5iaW5kKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG5cbiAgICB9XG5cbiAgICB1bkRlbGVnYXRlKGV2ZW50VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmVFdmVudExpc3RlbmVyIHRvIHJlbGVhc2UgdGhlIG1lbW9yeVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyO1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG5cbiAgICAgICAgdGhpcy5maXJlKCdkZXN0cm95Jyk7XG5cbiAgICAgICAgLy8gQ2xlYXIgZXZlbnRzXG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLnN0YXJ0RXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2UubW92ZUV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLmVuZEV2dCwgdGhpcyk7XG4gICAgICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMpO1xuICAgICAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzKTtcbiAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzKTtcblxuICAgICAgICAvLyBDbGVhciB0aW1lclxuICAgICAgICB0aGlzLl9MU04uZm9yRWFjaChmdW5jdGlvbiBjbGVhclRpbWVyT25EZXN0cm95KHRpbWVyKSB7XG4gICAgICAgICAgICB0aW1lciAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRpbWVyKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy53cmFwLmlubmVySFRNTCA9ICcnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGV2ZW50IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb24oZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICAgIGlmIChpbkFycmF5KGV2ZW50TmFtZSwgdGhpcy5FVkVOVFMpICYmIHR5cGVvZiBmdW5jID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzID8gdGhpcy5ldmVudHNbZXZlbnROYW1lXSA6IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSkucHVzaChmdW5jKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBldmVudCBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9mZihldmVudE5hbWUsIGZ1bmMpIHtcbiAgICAgICAgaWYgKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cykge1xuICAgICAgICAgICAgbGV0IGZ1bmNzID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IGZ1bmNzLmluZGV4T2YoZnVuYyk7XG4gICAgICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBmdW5jc1tpbmRleF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmlnZ2VyIGV2ZW50IGNhbGxiYWNrc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0geyp9IGFyZ3NcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZmlyZShldmVudE5hbWUpIHtcbiAgICAgICAgdGhpcy5sb2coJ1tFVkVOVCBGSVJFXTonLCBldmVudE5hbWUsIGFyZ3VtZW50cyk7XG4gICAgICAgIGlmIChldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpIHtcbiAgICAgICAgICAgIGxldCBmdW5jcyA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gVE9ETyB3aWxsIHN1cHBvcnQgY3VzdG9tIGNvbnRleHQsIG5vdyBjb250ZXh0IGlzIGluc3RhbmNlIG9mIGlTbGlkZXJcbiAgICAgICAgICAgICAgICB0eXBlb2YgZnVuY3NbaV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAmJiBmdW5jc1tpXS5hcHBseVxuICAgICAgICAgICAgICAgICYmIGZ1bmNzW2ldLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzZXQgJiByZXJlbmRlclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICByZXNldCgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLl9zZXR0aW5nKCk7XG4gICAgICAgIHRoaXMuX3JlbmRlcldyYXBwZXIoKTtcbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbG9hZCBEYXRhICYgcmVuZGVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGxvYWREYXRhKGRhdGEsIGluaXRJbmRleCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IGluaXRJbmRleCB8fCAwO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLl9yZW5kZXJXcmFwcGVyKCk7XG4gICAgICAgIHRoaXMuZmlyZSgncmVsb2FkRGF0YScpO1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3RhcnQgYXV0b3BsYXlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcGxheSgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9MU04uYXV0b1BsYXkgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04uYXV0b1BsYXkpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHBsYXkoKSB7XG4gICAgICAgICAgICBzZWxmLl9MU04uYXV0b1BsYXkgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNsaWRlTmV4dCgpO1xuICAgICAgICAgICAgICAgIHBsYXkoKTtcbiAgICAgICAgICAgIH0sIHNlbGYuZHVyYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgcGxheSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHBhdXNlIGF1dG9wbGF5XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHBhdXNlKCkge1xuICAgICAgICB0aGlzLl9MU04uYXV0b1BsYXkgJiYgY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5hdXRvUGxheSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFpbnRhaW5pbmcgdGhlIGN1cnJlbnQgc2NlbmVcbiAgICAgKiBEaXNhYmxlIHRvdWNoIGV2ZW50cywgZXhjZXB0IGZvciB0aGUgbmF0aXZlIG1ldGhvZC5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgaG9sZCgpIHtcbiAgICAgICAgdGhpcy5ob2xkaW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWxlYXNlIGN1cnJlbnQgc2NlbmVcbiAgICAgKiB1bmxvY2sgYXQgc2FtZSB0aW1lXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVuaG9sZCgpIHtcbiAgICAgICAgdGhpcy5ob2xkaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMudW5sb2NrKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogWW91IGNhbid0IGRvIGFueXRoaW5nIG9uIHRoaXMgc2NlbmVcbiAgICAgKiBsb2NrIG5hdGl2ZSBtZXRob2QgY2FsbHNcbiAgICAgKiBob2xkIGF0IHNhbWUgdGltZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBsb2NrKCkge1xuICAgICAgICB0aGlzLmhvbGQoKTtcbiAgICAgICAgdGhpcy5sb2NraW5nID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiB1bmxvY2sgbmF0aXZlIG1ldGhvZCBjYWxsc1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bmxvY2soKSB7XG4gICAgICAgIHRoaXMubG9ja2luZyA9IGZhbHNlO1xuICAgIH1cblxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gaVNsaWRlclByb3RvdHlwZTtcbiIsIi8qXG4gKiBAZmlsZSAgIEFuaW1hdGlvbiBMaWJyYXJ5XG4gKiBAYXV0aG9yIHhpZXl1MzMzMzNcbiAqL1xuXG4vKiAg6K+05piO77yaXG4vL2RvbSDooajnpLrliqjnlLvnmoTlhYPntKDoioLngrlcbi8vYXhpcyDooajnpLrliqjnlLvmlrnlkJHvvIzliIbliKvkuLogWCDlkowgWSDmlrnlkJFcbi8vc2NhbGUg5bGP5bmV6auY5bqmXG4vL2kgPT0gMCDooajnpLogaXNsaWRlci1wcmV2LCBpID09IDEg6KGo56S6IGlzbGlkZXItYWN0aXZlLCBpID09IDIg6KGo56S6IGlzbGlkZXItbmV4dCxcbi8vb2Zmc2V0ID4gMCDooajnpLrnmoTmmK/lkJHkuIrmiJblkJHlj7PnmoTmu5HliqjmlrnlkJHvvIxvZmZzZXQgPCAwIOihqOekuueahOaYr+WQkeS4i+aIluWQkeW3pueahOa7keWKqOaWueWQkS5vZmZzZXQg55qE5YC86KGo56S65omL5oyH5Zyo5bGP5bmV5LiK5ruR5Yqo55qE6Led56a777yM57ud5a+55YC86LaK5aSn6KGo56S65ruR5Yqo55qE6Led56a76LaK6ZW/44CCXG4vL29wcG9zaXRlIOWIpOaWreaYr+WQpuWcqOaJp+ihjCDlkJHkuIvmiJblkJHlt6bnmoTpgIbmlrnlkJHmu5HliqhcbiogKi9cblxubGV0IGV4dGVuZEFuaW1hdGlvbiA9IHtcbiAgICAncm90YXRlJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGxldCBiZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy53cmFwLnBhcmVudE5vZGUsIG51bGwpLmJhY2tncm91bmRDb2xvcjtcblxuICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjsgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7ICdcbiAgICAgICAgICAgICsgJ2JhY2tncm91bmQtY29sb3I6JyArIGJkQ29sb3IgKyAnOyBwb3NpdGlvbjphYnNvbHV0ZTsnO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyA5MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSArICdkZWcpIHRyYW5zbGF0ZVooJ1xuICAgICAgICAgICAgKyAoMC44ODggKiBzY2FsZSAvIDIpICsgJ3B4KSBzY2FsZSgwLjg4OCknO1xuICAgIH0sXG5cbiAgICAnZmxpcCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICBsZXQgYmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMud3JhcC5wYXJlbnROb2RlLCBudWxsKS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJ3Bvc2l0aW9uOmFic29sdXRlOyAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyBiYWNrZ3JvdW5kLWNvbG9yOicgKyBiZENvbG9yICsgJzsnO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooJyArIChzY2FsZSAvIDIpICsgJ3B4KSByb3RhdGUnICsgcm90YXRlRGlyZWN0XG4gICAgICAgICAgICArICcoJyArIDE4MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSArICdkZWcpIHNjYWxlKDAuODc1KSc7XG4gICAgfSxcblxuICAgICdkZXB0aCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHpvb21TY2FsZSA9ICg0IC0gTWF0aC5hYnMoaSAtIDEpKSAqIDAuMTg7XG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcbiAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpID09PSAxKSA/IDEwMCA6IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgOiAoaSAtIDEpO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnXG4gICAgICAgICAgICArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgMS4zICogc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH0sXG5cbiAgICAnZmxvdyc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICBsZXQgZGlyZWN0QW1lbmQgPSAoYXhpcyA9PT0gJ1gnKSA/IDEgOiAtMTtcbiAgICAgICAgbGV0IG9mZnNldFJhdGlvID0gTWF0aC5hYnMob2Zmc2V0IC8gc2NhbGUpO1xuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0IDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgwLjcsIDAuNykgdHJhbnNsYXRlWignICsgKG9mZnNldFJhdGlvICogMTUwIC0gMTUwKSAqIE1hdGguYWJzKGkgLSAxKSArICdweCknXG4gICAgICAgICAgICArICd0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSdcbiAgICAgICAgICAgICsgJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyBkaXJlY3RBbWVuZCAqICgzMCAtIG9mZnNldFJhdGlvICogMzApICogKDEgLSBpKSArICdkZWcpJztcbiAgICB9LFxuXG4gICAgJ2NhcmQnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9tLmN1ciAmJiBkb20uY3VyICE9PSBpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gbnVsbDtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgem9vbVNjYWxlID0gKGRvbS5jdXIpID8gMSAtIDAuMiAqIE1hdGguYWJzKGkgLSAxKSAtIE1hdGguYWJzKDAuMiAqIG9mZnNldCAvIHNjYWxlKS50b0ZpeGVkKDYpIDogMTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXNcbiAgICAgICAgICAgICsgJygnICsgKCgxICsgTWF0aC5hYnMoaSAtIDEpICogMC4yKSAqIG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9LFxuXG4gICAgJ2ZhZGUnOiBmdW5jdGlvbiBmYWRlKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAxIC0gKG9mZnNldCAvIHNjYWxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/mmZXmn5PmianmlaNcbiAgICAneXJrcyc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0LCBvcHBvc2l0ZSkge1xuICAgICAgICBkb20uY3VyID0gMjtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCl7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAxICsgKG9mZnNldCAvIHNjYWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAtIG9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpe1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBpZihvcHBvc2l0ZSl7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgem9vbVNjYWxlID0gKGRvbS5jdXIgPT09IDEpID8gMSA6IDI7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApJztcbiAgICB9LFxuXG4gICAgLy/kuK3lv4PmlL7lpKdcbiAgICAnenhmZCc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0LCBvcHBvc2l0ZSkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBkb20uY3VyID0gMC4xO1xuXG4gICAgICAgIC8v5q2j5ZCRXG4gICAgICAgIGZ1bmN0aW9uIGZvcndhcmQoKXtcbiAgICAgICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9ZWxzZSBpZihpIDwgMSl7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpe1xuICAgICAgICAgICAgaWYoaSA9PSAxKXtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH1lbHNlIGlmKGkgPiAxKXtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGlmKG9wcG9zaXRlKXtcbiAgICAgICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgem9vbVNjYWxlID0gKGRvbS5jdXIgPT09IDEpID8gMSA6IDAuMTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCknO1xuICAgIH0sXG5cbiAgICAvL+a4kOmakOa2iOWksVxuICAgICdqeXhzJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpe1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gLSBvZmZzZXQgLyBzY2FsZTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y+N5ZCRXG4gICAgICAgIGZ1bmN0aW9uIHJldmVyc2UoKXtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsvL+ato+imgeiiq+aYvuekuueahOmhtemdolxuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSArIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IG9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfSBlbHNle1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBpZihvcHBvc2l0ZSl7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaSA+IDEpe1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKDBweCknO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICAgICAgICBpZihpIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoMHB4KSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5bmz5ruR56e75Ye6XG4gICAgJ3BoeWMnOiBmdW5jdGlvbiBmYWRlKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCl7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpe1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkgey8v5q2j6KaB6KKr5pi+56S655qE6aG16Z2iXG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICBpZihpIDwgMSl7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgaWYob3Bwb3NpdGUpe1xuICAgICAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICBpZihpID09IDEpe1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGkgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICAgICAgaWYoaSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihpID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoMHB4KSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5LiK5LiL5ruR5YqoXG4gICAgJ3N4aGQnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0LCBvcHBvc2l0ZSkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDAgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvbS5jdXIgJiYgZG9tLmN1ciAhPT0gaSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IG51bGw7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHpvb21TY2FsZSA9IChkb20uY3VyKSA/IDEgLSAwLjggKiBNYXRoLmFicyhpIC0gMSkgLSBNYXRoLmFicygwLjggKiBvZmZzZXQgLyBzY2FsZSkudG9GaXhlZCg2KSA6IDE7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzXG4gICAgICAgICAgICArICcoJyArICgoMSArIE1hdGguYWJzKGkgLSAxKSAqIDAuMikgKiBvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfSxcblxuICAgIC8v5Y2h54mH57+76aG1XG4gICAgJ2twZnknOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0LCBvcHBvc2l0ZSkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0LCBkaXJlY3Rpb24sIGZvcndhcmRNb3JlQ3NzVGV4dCwgcmV2ZXJzZU1vcmVDc3NUZXh0O1xuICAgICAgICBpZihheGlzID09PSAnWCcpe1xuICAgICAgICAgICAgcm90YXRlRGlyZWN0ID0gJ1knO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgIGZvcndhcmRNb3JlQ3NzVGV4dCA9ICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IDUwJSAwcHg7JztcbiAgICAgICAgICAgIHJldmVyc2VNb3JlQ3NzVGV4dCA9ICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGxlZnQgNTAlIDBweDsnO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIHJvdGF0ZURpcmVjdCA9ICdYJztcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgZm9yd2FyZE1vcmVDc3NUZXh0ID0gJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogNTAlIGJvdHRvbSAwcHg7JztcbiAgICAgICAgICAgIHJldmVyc2VNb3JlQ3NzVGV4dCA9ICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSB0b3AgMHB4Oyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpe1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOy13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOyAnXG4gICAgICAgICAgICAgICAgKyAnIHBvc2l0aW9uOmFic29sdXRlOycgKyBmb3J3YXJkTW9yZUNzc1RleHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvL+WPjeWQkVxuICAgICAgICBmdW5jdGlvbiByZXZlcnNlKCl7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7Ly/mraPopoHooqvmmL7npLrnmoTpobXpnaJcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSBpZihpIDwgMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47IC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOyAnXG4gICAgICAgICAgICAgICAgKyAnIHBvc2l0aW9uOmFic29sdXRlOycgKyByZXZlcnNlTW9yZUNzc1RleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgaWYoaSA8IDEpe1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArICggZGlyZWN0aW9uICogOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBpZihvcHBvc2l0ZSl7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoMGRlZykgJztcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihpIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArICggZGlyZWN0aW9uICogOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoMGRlZykgJztcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihpID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArICggZGlyZWN0aW9uICogOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRBbmltYXRpb247XG4iLCIvKlxuICogQGZpbGUgICBUbyBjcmVhdGUgcmlnaHQmbGVmdCBib3R0b24gb24gaVNsaWRlclxuICogQGF1dGhvciB4aWV5dTMzMzMzXG4gKi9cblxuZnVuY3Rpb24gYWRkQnRuKCkge1xuICAgIGxldCBIQU5ETEUgPSB0aGlzO1xuICAgIGNvbnNvbGUubG9nKEhBTkRMRSlcbiAgICBpZiAoIUhBTkRMRS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIGxldCBidG5PdXRlciA9IFtdO1xuICAgICAgICBsZXQgYnRuSW5uZXIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgICAgIGJ0bk91dGVyW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4tb3V0ZXInO1xuICAgICAgICAgICAgYnRuSW5uZXJbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJ0bklubmVyW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWJ0bi1pbm5lcic7XG5cbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgbGVmdCc7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgKz0gJyByaWdodCc7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpciA9IHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdkaXInKSwgMTApO1xuICAgICAgICAgICAgICAgIEhBTkRMRS5zbGlkZVRvKEhBTkRMRS5zbGlkZUluZGV4ICsgZGlyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBidG5PdXRlcltpXS5hcHBlbmRDaGlsZChidG5Jbm5lcltpXSk7XG4gICAgICAgICAgICBIQU5ETEUud3JhcC5hcHBlbmRDaGlsZChidG5PdXRlcltpXSwgSEFORExFLndyYXAubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZEJ0bjtcbiIsIi8qXG4gKiBAZmlsZSAgIFRvIGNyZWF0ZSBkb3RzIGluZGV4IG9uIGlTbGlkZXJcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbmZ1bmN0aW9uIGFkZERvdCgpIHtcbiAgICBsZXQgSEFORExFID0gdGhpcztcbiAgICBpZiAoIUhBTkRMRS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIGxldCBkYXRhID0gSEFORExFLmRhdGE7XG4gICAgICAgIGxldCBkb3RzID0gW107XG4gICAgICAgIGxldCBkb3RXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgZG90V3JhcC5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3Qtd3JhcCc7XG5cbiAgICAgICAgbGV0IHJlbmRlckRvdHMgPSBmdW5jdGlvbiByZW5kZXJEb3RzKCkge1xuICAgICAgICAgICAgbGV0IGZyZWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZG90c1tpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3QnO1xuICAgICAgICAgICAgICAgIGRvdHNbaV0uc2V0QXR0cmlidXRlKCdpbmRleCcsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSBIQU5ETEUuc2xpZGVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvdHNbaV0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgSEFORExFLnNsaWRlVG8ocGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2luZGV4JyksIDEwKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmcmVnbWVudC5hcHBlbmRDaGlsZChkb3RzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvdFdyYXAuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBkb3RXcmFwLmFwcGVuZENoaWxkKGZyZWdtZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZW5kZXJEb3RzKCk7XG5cbiAgICAgICAgSEFORExFLndyYXAucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkb3RXcmFwKTtcblxuICAgICAgICBIQU5ETEUub24oJ3NsaWRlQ2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdCc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgSEFORExFLm9uKCdyZWxvYWREYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGRvdHMgPSBbXTtcbiAgICAgICAgICAgIHJlbmRlckRvdHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZERvdDtcbiIsIi8qKlxuICogU3VwcG9ydCAzRCBtYXRyaXggdHJhbnNsYXRlXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xudmFyIGV4dGVuZEZ1bmN0aW9uID0ge307IC8v6L+Z5Liq5piv5oiR5re75Yqg77yM55So5LqO5omp5bGV5pS55qih5Z2X55qE5pa55rOVXG5cbnZhciBoYXMzZCA9ICgnV2ViS2l0Q1NTTWF0cml4JyBpbiBnbG9iYWwgJiYgJ20xMScgaW4gbmV3IFdlYktpdENTU01hdHJpeCgpKTtcblxuLyoqXG4gKiBNaW4gc2NhbGVcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbnZhciBtaW5TY2FsZSA9IDEgLyAyO1xuXG4vKipcbiAqIFNjZW5lIHZpZXcgcmFuZ2VcbiAqIEB0eXBlIHt7fX1cbiAqL1xudmFyIHZpZXdTY29wZSA9IHt9O1xuXG52YXIgY3VycmVudFNjYWxlO1xuXG52YXIgem9vbUZhY3RvcjtcblxudmFyIHpvb21Ob2RlO1xuXG52YXIgc3RhcnRUb3VjaGVzO1xuXG52YXIgc3RhcnRYO1xuXG52YXIgc3RhcnRZO1xuXG52YXIgbGFzdFRvdWNoU3RhcnQ7XG5cbnZhciBnZXN0dXJlO1xuXG52YXIgSU5fU0NBTEVfTU9ERSA9IGZhbHNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIHRyYW5zbGF0ZVxuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKiBAcGFyYW0gelxuICogQHBhcmFtIHNjYWxlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRyYW5zbGF0ZSh4LCB5LCB6LCBzY2FsZSkge1xuICAgIHJldHVybiBcInRyYW5zbGF0ZVwiICsgKGhhczNkID8gXCIzZChcIiA6IFwiKFwiKSArIHggKyBcInB4LFwiICsgeSArIChoYXMzZCA/IFwicHgsXCIgKyB6ICsgXCJweClcIiA6IFwicHgpXCIpICsgXCJzY2FsZShcIiArIHNjYWxlICsgXCIpXCI7XG59XG5cbi8qKlxuICogR2V0IGRpc3RhbmNlXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldERpc3RhbmNlKGEsIGIpIHtcbiAgICB2YXIgeCwgeTtcbiAgICB4ID0gYS5sZWZ0IC0gYi5sZWZ0O1xuICAgIHkgPSBhLnRvcCAtIGIudG9wO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIHRvIHN0cmluZ1xuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbih4LCB5KSB7XG4gICAgcmV0dXJuIHggKyBcInB4IFwiICsgeSArIFwicHhcIjtcbn1cblxuLyoqXG4gKiBHZXQgdG91Y2ggcG9pbnRlclxuICogQHBhcmFtIHRvdWNoZXNcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gZ2V0VG91Y2hlcyh0b3VjaGVzKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvdWNoZXMpLm1hcChmdW5jdGlvbiAodG91Y2gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgdG9wOiB0b3VjaC5wYWdlWVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qKlxuICogR2V0IHNjYWxlXG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBlbmRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgc3RhcnREaXN0YW5jZSA9IGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgdmFyIGVuZERpc3RhbmNlID0gZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0pO1xuICAgIHJldHVybiBlbmREaXN0YW5jZSAvIHN0YXJ0RGlzdGFuY2U7XG59XG5cbi8qKlxuICogR2V0IGNvbXB1dGVkIHRyYW5zbGF0ZVxuICogQHBhcmFtIG9ialxuICogQHJldHVybnMge3t0cmFuc2xhdGVYOiBudW1iZXIsIHRyYW5zbGF0ZVk6IG51bWJlciwgdHJhbnNsYXRlWjogbnVtYmVyLCBzY2FsZVg6IG51bWJlciwgc2NhbGVZOiBudW1iZXIsIG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgdHJhbnNsYXRlWDogMCxcbiAgICAgICAgdHJhbnNsYXRlWTogMCxcbiAgICAgICAgdHJhbnNsYXRlWjogMCxcbiAgICAgICAgc2NhbGVYOiAxLFxuICAgICAgICBzY2FsZVk6IDEsXG4gICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgIG9mZnNldFk6IDBcbiAgICB9O1xuICAgIHZhciBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDA7XG4gICAgaWYgKCFnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZSB8fCAhb2JqKSByZXR1cm4gcmVzdWx0O1xuICAgIHZhciBzdHlsZSA9IGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlKG9iaiksIHRyYW5zZm9ybSwgb3JpZ2luO1xuICAgIHRyYW5zZm9ybSA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gICAgb3JpZ2luID0gc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luIHx8IHN0eWxlLm1velRyYW5zZm9ybU9yaWdpbjtcbiAgICB2YXIgcGFyID0gb3JpZ2luLm1hdGNoKC8oLiopcHhcXHMrKC4qKXB4Lyk7XG4gICAgaWYgKHBhci5sZW5ndGggPiAxKSB7XG4gICAgICAgIG9mZnNldFggPSBwYXJbMV0gLSAwO1xuICAgICAgICBvZmZzZXRZID0gcGFyWzJdIC0gMDtcbiAgICB9XG4gICAgaWYgKHRyYW5zZm9ybSA9PSBcIm5vbmVcIikgcmV0dXJuIHJlc3VsdDtcbiAgICB2YXIgbWF0M2QgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gICAgdmFyIG1hdDJkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgICBpZiAobWF0M2QpIHtcbiAgICAgICAgdmFyIHN0ciA9IG1hdDNkWzFdLnNwbGl0KCcsICcpO1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYOiBzdHJbMTJdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0clsxM10gLSAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWjogc3RyWzE0XSAtIDAsXG4gICAgICAgICAgICBvZmZzZXRYOiBvZmZzZXRYIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFk6IG9mZnNldFkgLSAwLFxuICAgICAgICAgICAgc2NhbGVYOiBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgc2NhbGVZOiBzdHJbNV0gLSAwLFxuICAgICAgICAgICAgc2NhbGVaOiBzdHJbMTBdIC0gMFxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAobWF0MmQpIHtcbiAgICAgICAgdmFyIHN0ciA9IG1hdDJkWzFdLnNwbGl0KCcsICcpO1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYOiBzdHJbNF0gLSAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWTogc3RyWzVdIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFg6IG9mZnNldFggLSAwLFxuICAgICAgICAgICAgb2Zmc2V0WTogb2Zmc2V0WSAtIDAsXG4gICAgICAgICAgICBzY2FsZVg6IHN0clswXSAtIDAsXG4gICAgICAgICAgICBzY2FsZVk6IHN0clszXSAtIDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXQgY2VudGVyIHBvaW50XG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEByZXR1cm5zIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXRDZW50ZXIoYSwgYikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IChhLnggKyBiLngpIC8gMixcbiAgICAgICAgeTogKGEueSArIGIueSkgLyAyXG4gICAgfVxufVxuXG4vKipcbiAqIGluaXRcbiAqIEBwYXJhbSBvcHRzXG4gKi9cbmZ1bmN0aW9uIGluaXRab29tKG9wdHMpIHtcbiAgICBjdXJyZW50U2NhbGUgPSBvcHRzLmN1cnJlbnRTY2FsZTtcbiAgICB6b29tRmFjdG9yID0gb3B0cy56b29tRmFjdG9yO1xuICAgIGV4dGVuZEZ1bmN0aW9uID0gb3B0cy5leHRlbmRGdW5jdGlvbjtcbn1cblxuLyoqXG4gKiBTdGFydCBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gc3RhcnRIYW5kbGVyKGV2dCkge1xuICAgIGV4dGVuZEZ1bmN0aW9uLnN0YXJ0SGFuZGxlck9yaWdpbmFsLmNhbGwodGhpcywgZXZ0KTtcbiAgICAvLyBtdXN0IGJlIGEgcGljdHVyZSwgb25seSBvbmUgcGljdHVyZSEhXG4gICAgdmFyIG5vZGUgPSB0aGlzLmVsc1sxXS5xdWVyeVNlbGVjdG9yKCdpbWc6Zmlyc3QtY2hpbGQnKTtcbiAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgaWYgKGRldmljZS5oYXNUb3VjaCAmJiBub2RlICE9PSBudWxsKSB7XG4gICAgICAgIElOX1NDQUxFX01PREUgPSB0cnVlO1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUobm9kZSk7XG4gICAgICAgIHN0YXJ0VG91Y2hlcyA9IGdldFRvdWNoZXMoZXZ0LnRhcmdldFRvdWNoZXMpO1xuICAgICAgICBzdGFydFggPSB0cmFuc2Zvcm0udHJhbnNsYXRlWCAtIDA7XG4gICAgICAgIHN0YXJ0WSA9IHRyYW5zZm9ybS50cmFuc2xhdGVZIC0gMDtcbiAgICAgICAgY3VycmVudFNjYWxlID0gdHJhbnNmb3JtLnNjYWxlWDtcbiAgICAgICAgem9vbU5vZGUgPSBub2RlO1xuICAgICAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgbGFzdFRvdWNoU3RhcnQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHRvdWNoZXMgPSBldnQudG91Y2hlcztcbiAgICAgICAgICAgIHZhciB0b3VjaENlbnRlciA9IGdldENlbnRlcih7XG4gICAgICAgICAgICAgICAgeDogdG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiB0b3VjaGVzWzBdLnBhZ2VZXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgeDogdG91Y2hlc1sxXS5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiB0b3VjaGVzWzFdLnBhZ2VZXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4odG91Y2hDZW50ZXIueCAtIHBvcy5sZWZ0LCB0b3VjaENlbnRlci55IC0gcG9zLnRvcCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB2YXIgdGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBnZXN0dXJlID0gMDtcbiAgICAgICAgICAgIGlmICh0aW1lIC0gbGFzdFRvdWNoU3RhcnQgPCAzMDApIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RUb3VjaFN0YXJ0ID0gdGltZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBNb3ZlIGV2ZW50IGhhbmRsZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gbW92ZUhhbmRsZXIoZXZ0KSB7XG4gICAgaWYgKElOX1NDQUxFX01PREUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgaWYgKGRldmljZS5oYXNUb3VjaCkge1xuICAgICAgICAgICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2NhbGVJbWFnZShldnQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSAmJiBjdXJyZW50U2NhbGUgPiAxKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBtb3ZlSW1hZ2UuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXN0dXJlID0gcmVzdWx0O1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBleHRlbmRGdW5jdGlvbi5tb3ZlSGFuZGxlck9yaWdpbmFsLmNhbGwodGhpcywgZXZ0KTtcbn1cblxuLyoqXG4gKiBEb3VibGUgdGFvIGhhbmRsZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiBoYW5kbGVEb3VibGVUYXAoZXZ0KSB7XG4gICAgY29uc29sZS5sb2coem9vbUZhY3RvcilcbiAgICB2YXIgem9vbUZhY3RvciA9IHpvb21GYWN0b3IgfHwgMjtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHZhciBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICBjdXJyZW50U2NhbGUgPSBjdXJyZW50U2NhbGUgPT0gMSA/IHpvb21GYWN0b3IgOiAxO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgY3VycmVudFNjYWxlKTtcbiAgICBpZiAoY3VycmVudFNjYWxlICE9IDEpIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oZXZ0LnRvdWNoZXNbMF0ucGFnZVggLSBwb3MubGVmdCwgZXZ0LnRvdWNoZXNbMF0ucGFnZVkgLSBwb3MudG9wKTtcbn1cblxuLyoqXG4gKiBzY2FsZSBpbWFnZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiBzY2FsZUltYWdlKGV2dCkge1xuICAgIHZhciBtb3ZlVG91Y2VzID0gZ2V0VG91Y2hlcyhldnQudGFyZ2V0VG91Y2hlcyk7XG4gICAgdmFyIHNjYWxlID0gY2FsY3VsYXRlU2NhbGUoc3RhcnRUb3VjaGVzLCBtb3ZlVG91Y2VzKTtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHNjYWxlID0gY3VycmVudFNjYWxlICogc2NhbGUgPCBtaW5TY2FsZSA/IG1pblNjYWxlIDogY3VycmVudFNjYWxlICogc2NhbGU7XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSgwLCAwLCAwLCBzY2FsZSk7XG59XG5cbi8qKlxuICogRW5kIGV2ZW50IGhhbmRsZVxuICogQHBhcmFtIGV2dFxuICovXG5mdW5jdGlvbiBlbmRIYW5kbGVyKGV2dCkge1xuICAgIGlmIChJTl9TQ0FMRV9NT0RFKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICBpZiAoZ2VzdHVyZSA9PT0gMikgey8v5Y+M5omL5oyHXG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKGdlc3R1cmUgPT0gMSkgey8v5pS+5aSn5ouW5ou9XG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGdlc3R1cmUgPT09IDMpIHsvL+WPjOWHu1xuICAgICAgICAgICAgaGFuZGxlRG91YmxlVGFwKGV2dCk7XG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICBJTl9TQ0FMRV9NT0RFID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4dGVuZEZ1bmN0aW9uLmVuZEhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG59XG5cbi8qKlxuICogRHJhZ21vdmUgaW1hZ2VcbiAqIEBwYXJhbSB7b3BqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gbW92ZUltYWdlKGV2dCkge1xuICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIHZhciBvZmZzZXQgPSB7XG4gICAgICAgIFg6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc3RhcnRYKSA6IChldnQucGFnZVggLSB0aGlzLnN0YXJ0WCksXG4gICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICB9O1xuICAgIHZhciBtb3ZlT2Zmc2V0ID0ge1xuICAgICAgICB4OiBzdGFydFggKyBvZmZzZXQuWCAtIDAsXG4gICAgICAgIHk6IHN0YXJ0WSArIG9mZnNldC5ZIC0gMFxuICAgIH07XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZShtb3ZlT2Zmc2V0LngsIG1vdmVPZmZzZXQueSwgMCwgY3VycmVudFNjYWxlKTtcbn1cblxuLyoqXG4gKiBHZXQgcG9zaXRpb25cbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcmV0dXJucyB7e2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXRQb3NpdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIHBvcyA9IHtcImxlZnRcIjogMCwgXCJ0b3BcIjogMH07XG4gICAgZG8ge1xuICAgICAgICBwb3MudG9wICs9IGVsZW1lbnQub2Zmc2V0VG9wIHx8IDA7XG4gICAgICAgIHBvcy5sZWZ0ICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuICAgIHdoaWxlIChlbGVtZW50KTtcbiAgICByZXR1cm4gcG9zO1xufVxuXG4vKipcbiAqIENoZWNrIHRhcmdldCBpcyBpbiByYW5nZVxuICogQHBhcmFtIG5vZGVcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHRhZ1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgdmFsdWUsIHRhZykge1xuICAgIHZhciBtaW4sIG1heDtcbiAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgdmlld1Njb3BlID0ge1xuICAgICAgICBzdGFydDoge2xlZnQ6IHBvcy5sZWZ0LCB0b3A6IHBvcy50b3B9LFxuICAgICAgICBlbmQ6IHtsZWZ0OiBwb3MubGVmdCArIG5vZGUuY2xpZW50V2lkdGgsIHRvcDogcG9zLnRvcCArIG5vZGUuY2xpZW50SGVpZ2h0fVxuICAgIH07XG4gICAgdmFyIHN0ciA9IHRhZyA9PSAxID8gXCJsZWZ0XCIgOiBcInRvcFwiO1xuICAgIG1pbiA9IHZpZXdTY29wZS5zdGFydFtzdHJdO1xuICAgIG1heCA9IHZpZXdTY29wZS5lbmRbc3RyXTtcbiAgICByZXR1cm4gKHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXgpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIG9iajFcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG92ZXJGbG93KG5vZGUsIG9iajEpIHtcbiAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICB2YXIgaXNYMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LmxlZnQsIDEpO1xuICAgIHZhciBpc1gySW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuZW5kLmxlZnQsIDEpO1xuICAgIHZhciBpc1kxSW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuc3RhcnQudG9wLCAwKTtcbiAgICB2YXIgaXNZMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC50b3AsIDApO1xuICAgIGlmICgoaXNYMUluICE9IGlzWDJJbikgJiYgKGlzWTFJbiAhPSBpc1kySW4pKSB7XG4gICAgICAgIGlmIChpc1gxSW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiBpc1kxSW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNYMkluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDQ7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKChpc1gxSW4gPT0gaXNYMkluKSkge1xuICAgICAgICBpZiAoIWlzWTFJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDU7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzWTJJbiAmJiBpc1kxSW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDY7XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoaXNZMUluID09IGlzWTJJbikge1xuICAgICAgICBpZiAoIWlzWDFJbiAmJiBpc1gySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNYMUluICYmICFpc1gySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDg7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4gPT0gaXNYMUluID09IGlzWDJJbikge1xuICAgICAgICByZXN1bHQgPSA5O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFJlc2V0IGltYWdlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIHJlc2V0SW1hZ2UoZXZ0KSB7XG4gICAgaWYgKGN1cnJlbnRTY2FsZSA9PSAxKSByZXR1cm47XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZSwgbGVmdCwgdG9wLCB0cmFucywgdywgaCwgcG9zLCBzdGFydCwgZW5kLCBwYXJlbnQsIGZsb3dUYWc7XG4gICAgdHJhbnMgPSBnZXRDb21wdXRlZFRyYW5zbGF0ZShub2RlKTtcbiAgICBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgdyA9IG5vZGUuY2xpZW50V2lkdGggKiB0cmFucy5zY2FsZVg7XG4gICAgaCA9IG5vZGUuY2xpZW50SGVpZ2h0ICogdHJhbnMuc2NhbGVYO1xuICAgIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgIHN0YXJ0ID0ge1xuICAgICAgICBsZWZ0OiAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRYICsgcG9zLmxlZnQgKyB0cmFucy50cmFuc2xhdGVYLFxuICAgICAgICB0b3A6ICgxIC0gdHJhbnMuc2NhbGVYKSAqIHRyYW5zLm9mZnNldFkgKyBwb3MudG9wICsgdHJhbnMudHJhbnNsYXRlWVxuICAgIH07XG4gICAgZW5kID0ge1xuICAgICAgICBsZWZ0OiBzdGFydC5sZWZ0ICsgdyxcbiAgICAgICAgdG9wOiBzdGFydC50b3AgKyBoXG4gICAgfTtcbiAgICBsZWZ0ID0gc3RhcnQubGVmdDtcbiAgICB0b3AgPSBzdGFydC50b3A7XG5cbiAgICBmbG93VGFnID0gb3ZlckZsb3cocGFyZW50LCB7c3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZH0pO1xuICAgIHN3aXRjaCAoZmxvd1RhZykge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh3IDwgcGFyZW50LmNsaWVudFdpZHRoKSB7XG4gICAgICAgIGxlZnQgPSBwb3MubGVmdCAtICh0cmFucy5zY2FsZVggLSAxKSAqIG5vZGUuY2xpZW50V2lkdGggLyAyO1xuICAgIH1cbiAgICBpZiAoaCA8IHBhcmVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgdG9wID0gcG9zLnRvcCAtICh0cmFucy5zY2FsZVggLSAxKSAqIG5vZGUuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICB9XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjEwMG1zXCI7XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSh0cmFucy50cmFuc2xhdGVYICsgbGVmdCAtIHN0YXJ0LmxlZnQsIHRyYW5zLnRyYW5zbGF0ZVkgKyB0b3AgLSBzdGFydC50b3AsIDAsIHRyYW5zLnNjYWxlWCk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnRIYW5kbGVyOiBzdGFydEhhbmRsZXIsXG4gICAgbW92ZUhhbmRsZXI6IG1vdmVIYW5kbGVyLFxuICAgIGVuZEhhbmRsZXI6IGVuZEhhbmRsZXIsXG4gICAgaW5pdFpvb206aW5pdFpvb21cbn07XG4iXX0=
