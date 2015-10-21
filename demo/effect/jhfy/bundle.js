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
    animateType: 'jhfy',
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
        var rotateDirect = axis === 'X' ? 'Y' : 'X';

        this.wrap.style.webkitPerspective = scale * 4;

        //正向
        function forward() {
            console.log(1);
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
            } else {
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
            dom.style.cssText += '-webkit-backface-visibility:hidden;-webkit-transform-style:preserve-3d; ' + ' position:absolute;-webkit-transform-origin: 50% bottom 0px;';
        }

        //反向
        function reverse() {
            console.log(2);
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
            if (i === 1) {
                //正要被显示的页面
                dom.style.zIndex = scale - absoluteOffset;
            } else if (i < 1) {
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
            dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; ' + ' position:absolute;-webkit-transform-origin: 50% top 0px;';
        }

        if (offset > 0) {
            reverse();
            if (i < 1) {
                dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + -90 * (offset / scale + i - 1) + 'deg)';
            }
        } else {
            if (opposite) {
                reverse();
                if (i == 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                } else if (i < 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + -90 * (offset / scale + i - 1) + 'deg)';
                } else {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }
            } else {
                forward();
                if (i == 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                } else if (i > 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + -90 * (offset / scale + i - 1) + 'deg)';
                } else {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }
            }
        }
    },

    //交换翻页
    'jhfy': function jhfy(dom, axis, scale, i, offset, opposite) {
        var absoluteOffset = Math.abs(offset);
        var rotateDirect = axis === 'X' ? 'Y' : 'X';

        this.wrap.style.webkitPerspective = scale * 4;

        //正向
        function forward() {
            console.log(1);
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
            } else {
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
            dom.style.cssText += '-webkit-backface-visibility:hidden;-webkit-transform-style:preserve-3d; ' + ' position:absolute;-webkit-transform-origin: 50% bottom 0px;';
        }

        //反向
        function reverse() {
            console.log(2);
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
            if (i === 1) {
                //正要被显示的页面
                dom.style.zIndex = scale - absoluteOffset;
            } else if (i < 1) {
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
            dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; ' + ' position:absolute;-webkit-transform-origin: 50% top 0px;';
        }

        if (offset > 0) {
            reverse();
            if (i < 1) {
                dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + -90 * (offset / scale + i - 1) + 'deg)';
            }
        } else {
            if (opposite) {
                reverse();
                if (i == 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                } else if (i < 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + -90 * (offset / scale + i - 1) + 'deg)';
                } else {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }
            } else {
                forward();
                if (i == 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                } else if (i > 1) {
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + -90 * (offset / scale + i - 1) + 'deg)';
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvZGVtby9lZmZlY3QvamhmeS9tYWluLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyX2NvcmUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl9hbmltYXRlLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfYnV0dG9uLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfZG90LmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfem9vbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7NEJDQW9CLHlCQUF5Qjs7OztBQUU3QyxJQUFJLElBQUksR0FBRzs7QUFFUDtBQUNJLFdBQU8sRUFBRSxvQkFBb0I7Q0FDaEM7O0FBRUQ7QUFDSSxXQUFPLEVBQUUsb0JBQW9CO0NBQ2hDOztBQUVEO0FBQ0ksV0FBTyxFQUFFLG9CQUFvQjtDQUNoQzs7QUFFRDtBQUNJLFdBQU8sRUFBRSxvQkFBb0I7Q0FDaEM7O0FBRUQ7QUFDSSxXQUFPLEVBQUUsNkVBQTZFO0NBQ3pGOztBQUVEO0FBQ0ksV0FBTyxFQUFFLENBQUMsWUFBWTtBQUNsQixZQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFD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Q0FBQyxHQUFJLEdBQUcsR0FBRyxBQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUssQ0FBQyxHQUFHLENBQUMsR0FBSyxDQUFDLEdBQUcsQ0FBQyxBQUFDLENBQUM7QUFDdEUsV0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLFNBQVMsR0FBRyxJQUFJLEdBQUcsU0FBUyxHQUFHLDJCQUEyQixHQUMzRixJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sR0FBRyxHQUFHLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLENBQUM7S0FDL0Q7O0FBRUQsVUFBTSxFQUFFLGNBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUMzQyxZQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLFlBQUksWUFBWSxHQUFHLEFBQUMsSUFBSSxLQUFLLEdBQUcsR0FBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQzlDLFlBQUksV0FBVyxHQUFHLEFBQUMsSUFBSSxLQUFLLEdBQUcsR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDMUMsWUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7O0FBRTNDLFlBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRTlDLFlBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNULGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUM7U0FDN0MsTUFBTTtBQUNILGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEFBQUMsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FB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QUNGLGdCQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLGtCQUFNO0FBQUEsQUFDVixhQUFLLENBQUM7QUFDRixnQkFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzVCLGtCQUFNO0FBQUEsS0FDYjtBQUNELFFBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDeEIsWUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxHQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO0tBQy9EO0FBQ0QsUUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFlBQVksRUFBRTtBQUN6QixXQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7S0FDOUQ7QUFDRCxRQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLE9BQU8sQ0FBQztBQUM5QyxRQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQztDQUU3STs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHO0FBQ2IsZ0JBQVksRUFBRSxZQUFZO0FBQzFCLGVBQVcsRUFBRSxXQUFXO0FBQ3hCLGNBQVUsRUFBRSxVQUFVO0FBQ3RCLFlBQVEsRUFBQyxRQUFRO0NBQ3BCLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IGlTbGlkZXIgZnJvbSAnLi4vLi4vLi4vc3JjL2lzbGlkZXIuanMnO1xuXG52YXIgbGlzdCA9IFtcbiAgICAvLyBwaWN0dXJlXG4gICAge1xuICAgICAgICBjb250ZW50OiAnLi4vaW1ncy9mbGlwLzAuanBnJ1xuICAgIH0sXG4gICAgLy8gcGljdHVyZVxuICAgIHtcbiAgICAgICAgY29udGVudDogJy4uL2ltZ3MvZmxpcC8xLmpwZydcbiAgICB9LFxuICAgIC8vIHBpY3R1cmVcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6ICcuLi9pbWdzL2ZsaXAvMi5qcGcnXG4gICAgfSxcbiAgICAvLyBwaWN0dXJlXG4gICAge1xuICAgICAgICBjb250ZW50OiAnLi4vaW1ncy9mbGlwLzMuanBnJ1xuICAgIH0sXG4gICAgLy8gSFRNTCBTdHJpbmdcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6ICc8ZGl2IHN0eWxlPVwiZm9udC1zaXplOjRlbTtjb2xvcjp3aGl0ZTt0ZXh0LWFsaWduOiBjZW50ZXJcIj5IVE1MIFN0cmluZzwvZGl2PidcbiAgICB9LFxuICAgIC8vIGVsZW1lbnRcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkb20uaW5uZXJIVE1MID0gJ0VsZW1lbnQnO1xuICAgICAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjNlbTtjb2xvcjpyZ2IoMjMwLCAyMzAsIDYzKTsnO1xuICAgICAgICAgICAgcmV0dXJuIGRvbTtcbiAgICAgICAgfSkoKVxuICAgIH0sXG4gICAgLy8gZnJhZ21lbnRcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRvbS5pbm5lckhUTUwgPSAnRnJhZ21lbnQnO1xuICAgICAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjNlbTtjb2xvcjpyZ2IoMjMwLCA2MywgMjMwKTsnO1xuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChkb20pO1xuICAgICAgICAgICAgcmV0dXJuIGZyYWc7XG4gICAgICAgIH0pKClcbiAgICB9LFxuICAgIC8vIGRvbVxuICAgIHtcbiAgICAgICAgY29udGVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGRlbi1zcGFjZSA+IHAnKVxuICAgIH1cbl07XG5cbnZhciBTID0gbmV3IGlTbGlkZXIoe1xuICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lTbGlkZXItd3JhcHBlcicpLFxuICAgIGRhdGE6IGxpc3QsXG4gICAgaXNWZXJ0aWNhbDogdHJ1ZSxcbiAgICBpc0xvb3Bpbmc6IDEsXG4gICAgaXNPdmVyc3ByZWFkOiAxLFxuICAgIGFuaW1hdGVUaW1lOiA4MDAsXG4gICAgYW5pbWF0ZVR5cGU6ICdqaGZ5JyxcbiAgICBwbHVnaW5zOiBbWyd6b29tcGljJywge2N1cnJlbnRTY2FsZToxLHpvb21GYWN0b3I6IDJ9XV0sXG59KTtcblxuXG5cblxuXG5cbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlTbGlkZXJDb3JlIGZyb20gJy4vaXNsaWRlcl9jb3JlLmpzJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfYnV0dG9uLmpzJztcbmltcG9ydCBEb3QgZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfZG90LmpzJztcbmltcG9ydCBab29tIGZyb20gJy4vcGx1Z2lucy9pc2xpZGVyX3pvb20uanMnO1xuXG5jbGFzcyBpU2xpZGVyIGV4dGVuZHMgaVNsaWRlckNvcmUge1xuICAgIGNvbnN0cnVjdG9yKC4uLm9wdHMpIHtcbiAgICAgICAgLy/nm7TmjqXosIPnlKjniLbnsbvmnoTpgKDlmajov5vooYzliJ3lp4vljJZcbiAgICAgICAgc3VwZXIoLi4ub3B0cyk7XG5cbiAgICAgICAgLy/mt7vliqAgem9vbSDmj5Lku7bvvIzms6jmhI/ku6XkuIvku6PnoIHlv4XpobvopoFcbiAgICAgICAgdmFyIHN0YXJ0SGFuZGxlck9yaWdpbmFsID0gdGhpcy5zdGFydEhhbmRsZXI7XG4gICAgICAgIHZhciBlbmRIYW5kbGVyT3JpZ2luYWwgPSB0aGlzLmVuZEhhbmRsZXI7XG4gICAgICAgIHZhciBtb3ZlSGFuZGxlck9yaWdpbmFsID0gdGhpcy5tb3ZlSGFuZGxlcjtcblxuICAgICAgICB0aGlzLnJlZ1BsdWdpbignYnV0dG9uJyxCdXR0b24pO1xuICAgICAgICB0aGlzLnJlZ1BsdWdpbignZG90JyxEb3QpO1xuICAgICAgICB0aGlzLnJlZ1BsdWdpbignem9vbXBpYycsIGZ1bmN0aW9uKHpvb21PcHRzKXtcbiAgICAgICAgICAgIFpvb20uaW5pdFpvb20oe1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTY2FsZTp6b29tT3B0cy5jdXJyZW50U2NhbGUgfHwgMSxcbiAgICAgICAgICAgICAgICB6b29tRmFjdG9yOnpvb21PcHRzLnpvb21GYWN0b3IgfHwgMixcbiAgICAgICAgICAgICAgICBleHRlbmRGdW5jdGlvbjp7XG4gICAgICAgICAgICAgICAgICAgICdzdGFydEhhbmRsZXJPcmlnaW5hbCc6c3RhcnRIYW5kbGVyT3JpZ2luYWwsXG4gICAgICAgICAgICAgICAgICAgICdlbmRIYW5kbGVyT3JpZ2luYWwnOmVuZEhhbmRsZXJPcmlnaW5hbCxcbiAgICAgICAgICAgICAgICAgICAgJ21vdmVIYW5kbGVyT3JpZ2luYWwnOm1vdmVIYW5kbGVyT3JpZ2luYWxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdpbml0aWFsaXplJyk7XG4gICAgICAgIHRoaXMuX3JlbmRlcldyYXBwZXIoKTtcbiAgICAgICAgdGhpcy5faW5pdFBsdWdpbnMoKTtcbiAgICAgICAgdGhpcy5fYmluZEhhbmRsZXIoKTtcblxuICAgICAgICB0aGlzLmV4dGVuZCh7XG4gICAgICAgICAgICBzdGFydEhhbmRsZXI6IFpvb20uc3RhcnRIYW5kbGVyLFxuICAgICAgICAgICAgbW92ZUhhbmRsZXI6IFpvb20ubW92ZUhhbmRsZXIsXG4gICAgICAgICAgICBlbmRIYW5kbGVyOiBab29tLmVuZEhhbmRsZXJcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlTbGlkZXI7XG4iLCIvKipcbiAqIEBmaWxlICAgaVNsaWRlciwgYSBzaW1wbGUsIGVmZmljZW50IG1vYmlsZSBzbGlkZXIgc29sdXRpb25cbiAqXG4gKiBAYXV0aG9yIEJFRkVcbiAqIENvbnRhY3QgcWJhdHkucWlAZ21haWwuY29tXG4gKlxuICogTElDRU5TRVxuICogaHR0cHM6Ly9naXRodWIuY29tL0JFLUZFL2lTbGlkZXIvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICovXG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRzICAgICAgICAgICAgICAgIOWPguaVsOmbhlxuICogQHBhcmFtIHtFbGVtZW50fSAgICAgb3B0cy5kb20gICAgICAgICAgICDlpJblsYLlhYPntKAgICAgICAgIE91dGVyIHdyYXBwZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdHMuZGF0YSAgICAgICAgICAg5pWw5o2u5YiX6KGoICAgICAgICBDb250ZW50IGRhdGFcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQW5pbWF0aW9uIGZyb20gJy4vcGx1Z2lucy9pc2xpZGVyX2FuaW1hdGUuanMnO1xuXG4vKipcbiAqIENoZWNrIGluIGFycmF5XG4gKiBAcGFyYW0gb0VsZW1lbnRcbiAqIEBwYXJhbSBhU291cmNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaW5BcnJheShvRWxlbWVudCwgYVNvdXJjZSkge1xuICAgIHJldHVybiBhU291cmNlLmluZGV4T2Yob0VsZW1lbnQpID4gLTE7XG59XG5cbi8qKlxuICogQ2hlY2sgaXMgYXJyYXlcbiAqIEBwYXJhbSBvXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNBcnJheShvKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cblxuLyoqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY2xzXG4gKiBAcmV0dXJucyB7QXJyYXl8e2luZGV4OiBudW1iZXIsIGlucHV0OiBzdHJpbmd9fVxuICovXG5mdW5jdGlvbiBoYXNDbGFzcyhvYmosIGNscykge1xuICAgIHJldHVybiBvYmouY2xhc3NOYW1lLm1hdGNoKG5ldyBSZWdFeHAoJyhcXFxcc3xeKScgKyBjbHMgKyAnKFxcXFxzfCQpJykpO1xufVxuXG4vKipcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjbHNcbiAqL1xuZnVuY3Rpb24gYWRkQ2xhc3Mob2JqLCBjbHMpIHtcbiAgICBpZiAoIWhhc0NsYXNzKG9iaiwgY2xzKSkge1xuICAgICAgICBvYmouY2xhc3NOYW1lICs9ICcgJyArIGNscztcbiAgICB9XG59XG5cbi8qKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGNsc1xuICovXG5mdW5jdGlvbiByZW1vdmVDbGFzcyhvYmosIGNscykge1xuICAgIGlmIChoYXNDbGFzcyhvYmosIGNscykpIHtcbiAgICAgICAgb2JqLmNsYXNzTmFtZSA9IG9iai5jbGFzc05hbWUucmVwbGFjZShSZWdFeHAoJyhcXFxcc3xeKScgKyBjbHMgKyAnKFxcXFxzfCQpJyksICcnKTtcbiAgICB9XG59XG5cbi8qKlxuICogQ2hlY2NrIGlzIHVybFxuICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzVXJsKHVybCkge1xuICAgIGlmICgvPFxcLz9bXj5dKj4vZy50ZXN0KHVybCkpXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgIGxldCByZWdleCA9ICdeJyArXG4gICAgICAgICcoKChodHRwc3xodHRwfGZ0cHxydHNwfG1tcyk6KT8vLyk/JyArXG4gICAgICAgICcoKFswLTlhLXpfIX4qXFwnKCkuJj0rJCUtXSs6ICk/WzAtOWEtel8hfipcXCcoKS4mPSskJS1dK0ApPycgK1xuICAgICAgICAnKChbMC05XXsxLDN9Lil7M31bMC05XXsxLDN9fChbMC05YS16XyF+KlxcJygpLV0rLikqKFswLTlhLXpdWzAtOWEtei1dezAsNjF9KT9bMC05YS16XS5bYS16XXsyLDZ9KT8nICtcbiAgICAgICAgJyg6WzAtOV17MSw0fSk/JyArXG4gICAgICAgICcoW15cXD8jXSspPycgK1xuICAgICAgICAnKFxcXFxcXD9bXiNdKyk/JyArXG4gICAgICAgICcoIy4rKT8nICtcbiAgICAgICAgJyQnO1xuICAgIHJldHVybiBuZXcgUmVnRXhwKHJlZ2V4KS50ZXN0KHVybCk7XG59XG5cblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBpU2xpY2VyKFtbe0VsZW1lbnR9IGNvbnRhaW5lcixdIHtBcnJheX0gZGF0YWxpc3QsXSB7b2JqZWN0fSBvcHRpb25zKVxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhbGlzdFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqICBvcHRpb25zLmRvbSA+IGNvbnRhaW5lclxuICogIG9wdGlvbnMuZGF0YSA+IGRhdGFsaXN0XG4gKi9cbmNsYXNzIGlTbGlkZXJDb3JlIHtcbiAgICAvL0VTNuS4reaWsOWei+aehOmAoOWZqFxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgMyk7XG4gICAgICAgIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVycyByZXF1aXJlZCEnKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgb3B0cyA9IGFyZ3MucG9wKCk7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRzLmRhdGEgfHwgYXJnc1sxXTtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBvcHRzLmRvbSA9IG9wdHMuZG9tIHx8IGFyZ3NbMF07XG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0cy5kb20pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGNhbiBub3QgYmUgZW1wdHkhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdHMuZGF0YSB8fCAhb3B0cy5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIG11c3QgYmUgYW4gYXJyYXkgYW5kIG11c3QgaGF2ZSBtb3JlIHRoYW4gb25lIGVsZW1lbnQhJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogRXZlbnQgd2hpdGUgbGlzdFxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuRVZFTlRTID0gJ2luaXRpYWxpemUgc2xpZGUgc2xpZGVTdGFydCBzbGlkZUVuZCBzbGlkZUNoYW5nZSBzbGlkZUNoYW5nZWQgc2xpZGVSZXN0b3JlIHNsaWRlUmVzdG9yZWQgcmVsb2FkRGF0YSBkZXN0cm95Jy5zcGxpdCgnICcpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFYXNpbmcgd2hpdGUgbGlzdFxuICAgICAgICAgKiBAdHlwZSBbQXJyYXksIFJlZ0V4cFtdXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkVBU0lORyA9IFtcbiAgICAgICAgICAgICdsaW5lYXIgZWFzZSBlYXNlLWluIGVhc2Utb3V0IGVhc2UtaW4tb3V0Jy5zcGxpdCgnICcpLFxuICAgICAgICAgICAgL2N1YmljLWJlemllclxcKChbXlxcZF0qKFxcZCsuP1xcZCopW15cXCxdKlxcLD8pezR9XFwpL1xuICAgICAgICBdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUQUdTIHdoaXRlbGlzdCBvbiBmaXhwYWdlIG1vZGVcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkZJWF9QQUdFX1RBR1MgPSAnU0VMRUNUIElOUFVUIFRFWFRBUkVBIEJVVFRPTiBMQUJFTCcuc3BsaXQoJyAnKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGx1Z2luc1xuICAgICAgICAgKiBAdHlwZSB7e319XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGx1Z2lucyA9IHt9O1xuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9wdGlvbnNcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX29wdHMgPSBvcHRzO1xuICAgICAgICBvcHRzID0gYXJncyA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5fdHJhbnNpdGlvbkVuZEV2ZW50KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGVtcHR5IGZ1bmN0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBFTVBUWV9GVU5DVElPTigpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dGVuZFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBleHRlbmQoKSB7XG4gICAgICAgIGxldCBtYWluLCBleHRlbmQsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtYWluID0gdGhpcztcbiAgICAgICAgICAgICAgICBleHRlbmQgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1haW4gPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIGV4dGVuZCA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBpbiBleHRlbmQpIHtcbiAgICAgICAgICAgIGlmIChleHRlbmQuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgbWFpbltwcm9wZXJ0eV0gPSBleHRlbmRbcHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gcGx1Z2luXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHJlZ1BsdWdpbihuYW1lLCBwbHVnaW4pIHtcbiAgICAgICAgdGhpcy5wbHVnaW5zW25hbWVdID0gdGhpcy5wbHVnaW5zW25hbWVdIHx8IHBsdWdpbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyYW5zaXRpb25FbmRFdmVudCgpIHtcbiAgICAgICAgbGV0IGV2dE5hbWU7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoZXZ0TmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBldnROYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZUVsZW1lbnQnKTtcbiAgICAgICAgICAgIGxldCB0cmFuc2l0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgT1RyYW5zaXRpb246ICdvVHJhbnNpdGlvbkVuZCcsXG4gICAgICAgICAgICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICAgICAgIFdlYmtpdFRyYW5zaXRpb246ICd3ZWJraXRUcmFuc2l0aW9uRW5kJ1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IHQgaW4gdHJhbnNpdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHJhbnNpdGlvbnMuaGFzT3duUHJvcGVydHkodCkgJiYgZWwuc3R5bGVbdF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGV2dE5hbWUgPSB0cmFuc2l0aW9uc1t0XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmNsYXNzIGlTbGlkZXJQcm90b3R5cGUgZXh0ZW5kcyBpU2xpZGVyQ29yZSB7XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgICAvL+ebtOaOpeiwg+eUqOeItuexu+aehOmAoOWZqOi/m+ihjOWIneWni+WMllxuICAgICAgICBzdXBlciguLi5vcHRzKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHNldHRpbmcgcGFyYW1ldGVycyBmb3Igc2xpZGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2V0dGluZygpIHtcblxuICAgICAgICAvLyDmmK/lkKbpgIblkJHmiafooYxcbiAgICAgICAgdGhpcy5vcHBvc2l0ZSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcGx1Z2luc1xuICAgICAgICAgKiBAdHlwZSB7QXJyYXl8e318Kn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3BsdWdpbnMgPSB0aGlzLnBsdWdpbnM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHt7ZGVmYXVsdDogRnVuY3Rpb259fCp9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hbmltYXRlRnVuY3MgPSB0aGlzLl9hbmltYXRlRnVuY3M7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ob2xkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2NraW5nID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGxpc3RlbmVyXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX0xTTiA9IHt9O1xuXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0gU2V0IG9wdGlvbnNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLl9vcHRzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkb20gZWxlbWVudCB3cmFwcGluZyBjb250ZW50XG4gICAgICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndyYXAgPSBvcHRzLmRvbTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGF0YSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kYXRhID0gb3B0cy5kYXRhO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZWZhdWx0IHNsaWRlIGRpcmVjdGlvblxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc1ZlcnRpY2FsID0gb3B0cy5pc1ZlcnRpY2FsIHx8IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVyc3ByZWFkIG1vZGVcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gb3B0cy5pc092ZXJzcHJlYWQgfHwgZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBsYXkgdGltZSBnYXBcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgMjAwMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc3RhcnQgZnJvbSBpbml0SW5kZXggb3IgMFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluaXRJbmRleCA9IG9wdHMuaW5pdEluZGV4ID4gMCAmJiBvcHRzLmluaXRJbmRleCA8IG9wdHMuZGF0YS5sZW5ndGggLSAxID8gb3B0cy5pbml0SW5kZXggOiAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0b3VjaHN0YXJ0IHByZXZlbnQgZGVmYXVsdCB0byBmaXhQYWdlXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpeFBhZ2UgPSBvcHRzLmZpeFBhZ2UgfHwgdHJ1ZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2xpZGVJbmRleFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4IHx8IHRoaXMuaW5pdEluZGV4IHx8IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF4aXNcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5heGlzID0gdGhpcy5pc1ZlcnRpY2FsID8gJ1knIDogJ1gnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXZlcnNlQXhpc1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZXZlcnNlQXhpcyA9IHRoaXMuYXhpcyA9PT0gJ1knID8gJ1gnIDogJ1knO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcGVyIHdpZHRoXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy53cmFwLmNsaWVudFdpZHRoO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcGVyIGhlaWdodFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSYXRpbyBoZWlnaHQ6d2lkdGhcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmF0aW8gPSB0aGlzLmhlaWdodCAvIHRoaXMud2lkdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNjYWxlLCBzaXplIHJ1bGVcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLmlzVmVydGljYWwgPyB0aGlzLmhlaWdodCA6IHRoaXMud2lkdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9uIHNsaWRlIG9mZnNldCBwb3NpdGlvblxuICAgICAgICAgKiBAdHlwZSB7e1g6IG51bWJlciwgWTogbnVtYmVyfX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQgfHwge1g6IDAsIFk6IDB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGxvb3BpbmcgbG9naWMgYWRqdXN0XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc0xvb3BpbmcgPSB0aGlzLmRhdGEubGVuZ3RoID4gMSAmJiBvcHRzLmlzTG9vcGluZyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYXV0b3BsYXkgbG9naWMgYWRqdXN0XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ID0gdGhpcy5kYXRhLmxlbmd0aCA+IDEgJiYgb3B0cy5pc0F1dG9wbGF5ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIC8vIGxpdHRsZSB0cmljayBzZXQsIHdoZW4geW91IGNob29jZSB0ZWFyICYgdmVydGljYWwgc2FtZSB0aW1lXG4gICAgICAgIC8vIGlTbGlkZXIgb3ZlcnNwcmVhZCBtb2RlIHdpbGwgYmUgc2V0IHRydWUgYXV0b21ldGljbHlcbiAgICAgICAgaWYgKG9wdHMuYW5pbWF0ZVR5cGUgPT09ICdjYXJkJyAmJiB0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWJ1ZyBtb2RlXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubG9nID0gb3B0cy5pc0RlYnVnID8gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ2xvYmFsLmNvbnNvbGUubG9nLmFwcGx5KGdsb2JhbC5jb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICB9IDogdGhpcy5FTVBUWV9GVU5DVElPTjtcblxuICAgICAgICAvLyBzZXQgRGFtcGluZyBmdW5jdGlvblxuICAgICAgICB0aGlzLl9zZXRVcERhbXBpbmcoKTtcblxuICAgICAgICAvLyBzdG9wIGF1dG9wbGF5IHdoZW4gd2luZG93IGJsdXJcbiAgICAgICAgLy8gdGhpcy5fc2V0UGxheVdoZW5Gb2N1cygpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbmltYXRpb24gcGFybWFzOlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9ICAgICAgZG9tICAgICAgICAgICAgIOWbvueJh+eahOWkluWxgjxsaT7lrrnlmaggICAgICAgSW1nIHdyYXBwZXJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgIGF4aXMgICAgICAgICAgICDliqjnlLvmlrnlkJEgICAgICAgICAgICAgICAgYW5pbWF0ZSBkaXJlY3Rpb25cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIHNjYWxlICAgICAgICAgICDlrrnlmajlrr3luqYgICAgICAgICAgICAgICAgT3V0ZXIgd3JhcHBlclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgaSAgICAgICAgICAgICAgIDxsaT7lrrnlmahpbmRleCAgICAgICAgICBJbWcgd3JhcHBlcidzIGluZGV4XG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICBvZmZzZXQgICAgICAgICAg5ruR5Yqo6Led56a7ICAgICAgICAgICAgICAgIG1vdmUgZGlzdGFuY2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmNzID0ge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmV4dGVuZCh0aGlzLl9hbmltYXRlRnVuY3MsIEFuaW1hdGlvbik7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jID0gdGhpcy5fYW5pbWF0ZUZ1bmNzW29wdHMuYW5pbWF0ZVR5cGUgaW4gdGhpcy5fYW5pbWF0ZUZ1bmNzID8gb3B0cy5hbmltYXRlVHlwZSA6ICdkZWZhdWx0J107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFuaW1hdGUgcHJvY2VzcyB0aW1lIChtcyksIGRlZmF1bHQ6IDMwMG1zXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYW5pbWF0ZVRpbWUgPSBvcHRzLmFuaW1hdGVUaW1lICE9IG51bGwgJiYgb3B0cy5hbmltYXRlVGltZSA+IC0xID8gb3B0cy5hbmltYXRlVGltZSA6IDMwMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW5pbWF0ZSBlZmZlY3RzLCBkZWZhdWx0OiBlYXNlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYW5pbWF0ZUVhc2luZyA9XG4gICAgICAgICAgICBpbkFycmF5KG9wdHMuYW5pbWF0ZUVhc2luZywgdGhpcy5FQVNJTkdbMF0pXG4gICAgICAgICAgICB8fCB0aGlzLkVBU0lOR1sxXS50ZXN0KG9wdHMuYW5pbWF0ZUVhc2luZylcbiAgICAgICAgICAgICAgICA/IG9wdHMuYW5pbWF0ZUVhc2luZ1xuICAgICAgICAgICAgICAgIDogJ2Vhc2UnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbiBzbGlkZSBhbmltYXRpb25cbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5BbmltYXRlID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRml4IHRvdWNoL21vdXNlIGV2ZW50c1xuICAgICAgICAgKiBAdHlwZSB7e2hhc1RvdWNoLCBzdGFydEV2dCwgbW92ZUV2dCwgZW5kRXZ0fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGV2aWNlRXZlbnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBoYXNUb3VjaCA9ICEhKCgnb250b3VjaHN0YXJ0JyBpbiBnbG9iYWwpIHx8IGdsb2JhbC5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgZ2xvYmFsLkRvY3VtZW50VG91Y2gpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoYXNUb3VjaDogaGFzVG91Y2gsXG4gICAgICAgICAgICAgICAgc3RhcnRFdnQ6IGhhc1RvdWNoID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZG93bicsXG4gICAgICAgICAgICAgICAgbW92ZUV2dDogaGFzVG91Y2ggPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgICAgIGVuZEV2dDogaGFzVG91Y2ggPyAndG91Y2hlbmQnIDogJ21vdXNldXAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXQgZXZlbnRzXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0ge31cblxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyAtIFJlZ2lzdGVyIGV2ZW50c1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgaXMgbW92aW5nXG4gICAgICAgIHRoaXMub24oJ3NsaWRlJywgb3B0cy5vbnNsaWRlKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHlvdXIgZmluZ2VyIHRvdWNoIHRoZSBzY3JlZW5cbiAgICAgICAgdGhpcy5vbignc2xpZGVTdGFydCcsIG9wdHMub25zbGlkZXN0YXJ0KTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBmaW5nZXIgbW92ZSBvdXQgb2YgdGhlIHNjcmVlblxuICAgICAgICB0aGlzLm9uKCdzbGlkZUVuZCcsIG9wdHMub25zbGlkZWVuZCk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBzbGlkZSB0byBuZXh0L3ByZXYgc2NlbmVcbiAgICAgICAgdGhpcy5vbignc2xpZGVDaGFuZ2UnLCBvcHRzLm9uc2xpZGVjaGFuZ2UpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gbmV4dC9wcmV2IHNjZW5lLCB3aGlsZSBhbmltYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgICAgICB0aGlzLm9uKCdzbGlkZUNoYW5nZWQnLCBvcHRzLm9uc2xpZGVjaGFuZ2VkKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHJlc3RvcmUgdG8gdGhlIGN1cnJlbnQgc2NlbmVcbiAgICAgICAgdGhpcy5vbignc2xpZGVSZXN0b3JlJywgb3B0cy5vbnNsaWRlcmVzdG9yZSk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiByZXN0b3JlIHRvIHRoZSBjdXJyZW50IHNjZW5lLCB3aGlsZSBhbmltYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgICAgICB0aGlzLm9uKCdzbGlkZVJlc3RvcmVkJywgb3B0cy5vbnNsaWRlcmVzdG9yZWQpO1xuXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0gUGx1Z2luc1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wbHVnaW5Db25maWcgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkob3B0cy5wbHVnaW5zKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSB7fVxuICAgICAgICAgICAgICAgIG9wdHMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIHBsdWdpbkNvbmZpZ0VhY2gocGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1twbHVnaW5bMF1dID0gcGx1Z2luLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbcGx1Z2luXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgLy8gQXV0b3BsYXkgbW9kZVxuICAgICAgICBpZiAodGhpcy5pc0F1dG9wbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXQgcGx1Z2luc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXRQbHVnaW5zKCkge1xuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5wbHVnaW5Db25maWc7XG4gICAgICAgIGxldCBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcbiAgICAgICAgZm9yIChsZXQgaSBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkoaSkgJiYgcGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdbSU5JVCBQTFVHSU5dOicsIGksIHBsdWdpbnNbaV0pO1xuICAgICAgICAgICAgICAgIHBsdWdpbnNbaV1cbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgcGx1Z2luc1tpXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICYmIHR5cGVvZiBwbHVnaW5zW2ldLmFwcGx5XG4gICAgICAgICAgICAgICAgJiYgcGx1Z2luc1tpXS5hcHBseSh0aGlzLCBjb25maWdbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZW5hYmxlIGRhbXBpbmcgd2hlbiBzbGlkZXIgbWVldCB0aGUgZWRnZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NldFVwRGFtcGluZygpIHtcbiAgICAgICAgbGV0IG9uZUluMiA9IHRoaXMuc2NhbGUgPj4gMTtcbiAgICAgICAgbGV0IG9uZUluNCA9IG9uZUluMiA+PiAxO1xuICAgICAgICBsZXQgb25lSW4xNiA9IG9uZUluNCA+PiAyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0IGRhbXBpbmcgZnVuY3Rpb25cbiAgICAgICAgICogQHBhcmFtIGRpc3RhbmNlXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZGFtcGluZyA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IGRpcyA9IE1hdGguYWJzKGRpc3RhbmNlKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgIGlmIChkaXMgPCBvbmVJbjIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkaXMgPj4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcyA8IG9uZUluMiArIG9uZUluNCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArICgoZGlzIC0gb25lSW4yKSA+PiAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArIG9uZUluMTYgKyAoKGRpcyAtIG9uZUluMiAtIG9uZUluNCkgPj4gMyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSA+IDAgPyByZXN1bHQgOiAtcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGl0ZW0gdHlwZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXRlbVR5cGUoaXRlbSkge1xuICAgICAgICBpZiAoIWlzTmFOKGl0ZW0pKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2l0ZW1dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbnRlbnQgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgIGxldCB0eXBlO1xuICAgICAgICBpZiAoY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2VtcHR5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChCb29sZWFuKGNvbnRlbnQubm9kZU5hbWUpICYmIEJvb2xlYW4oY29udGVudC5ub2RlVHlwZSkpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ25vZGUnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNVcmwoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdwaWMnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnaHRtbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS50eXBlID0gdHlwZTtcblxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgc2luZ2xlIGl0ZW0gaHRtbCBieSBpZHhcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAuLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggIC4uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVuZGVySXRlbShlbCwgZGF0YUluZGV4KSB7XG5cbiAgICAgICAgbGV0IGl0ZW0sIGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgbGV0IGluc2VydEltZyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgbGV0IHNpbWcgPSAnIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCInO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gdGhpcy5yYXRpbykge1xuICAgICAgICAgICAgICAgIHNpbWcgKz0gJyBoZWlnaHQ9XCInICsgZWwuY2xpZW50SGVpZ2h0ICsgJ1wiJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2ltZyArPSAnIHdpZHRoPVwiJyArIGVsLmNsaWVudFdpZHRoICsgJ1wiJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdmVyc3ByZWFkKSB7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoJyArIGl0ZW0uY29udGVudCArICcpIG5vLXJlcGVhdCA1MCUgNTAlL2NvdmVyJztcbiAgICAgICAgICAgICAgICBzaW1nICs9ICcgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO29wYWNpdHk6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO1wiJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSAnPGltZycgKyBzaW1nICsgJyAvPic7XG4gICAgICAgIH1cbiAgICAgICAgICAgIC5cbiAgICAgICAgICAgIGJpbmQodGhpcyk7XG5cbiAgICAgICAgLy8gY2xlYW4gc2NlbmVcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAnJztcblxuICAgICAgICAvLyBnZXQgdGhlIHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgICAgICBpZiAoIXRoaXMuaXNMb29waW5nICYmIHRoaXMuZGF0YVtkYXRhSW5kZXhdID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFN0b3Agc2xpZGUgd2hlbiBpdGVtIGlzIGVtcHR5XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhSW5kZXggPSAobGVuIC8qICogTWF0aC5jZWlsKE1hdGguYWJzKGRhdGFJbmRleCAvIGxlbikpKi8gKyBkYXRhSW5kZXgpICUgbGVuO1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtkYXRhSW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLl9pdGVtVHlwZShpdGVtKTtcblxuICAgICAgICB0aGlzLmxvZygnW1JlbmRlciBJVEVNXTonLCB0eXBlLCBkYXRhSW5kZXgsIGl0ZW0pO1xuXG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICdpc2xpZGVyLScgKyB0eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAncGljJzpcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oZWlnaHQgJiYgaXRlbS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWcuc3JjID0gaXRlbS5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhlaWdodCA9IGN1cnJlbnRJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS53aWR0aCA9IGN1cnJlbnRJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxvYWRlZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RvbSc6XG4gICAgICAgICAgICBjYXNlICdodG1sJzpcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdub2RlJzpcbiAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnQnOlxuICAgICAgICAgICAgICAgIC8vIGZyYWdtZW50LCBjcmVhdGUgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29udGVudC5ub2RlVHlwZSA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuYXBwZW5kQ2hpbGQoaXRlbS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb250ZW50ID0gZW50aXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChpdGVtLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3N0cG9uaW5nIHRoZSBpbnRlcm1lZGlhdGUgc2NlbmUgcmVuZGVyaW5nXG4gICAgICogdW50aWwgdGhlIHRhcmdldCBzY2VuZSBpcyBjb21wbGV0ZWx5IHJlbmRlcmVkIChyZW5kZXIgaW4gZXZlbnQgc2xpZGVDaGFuZ2VkKVxuICAgICAqIHRvIGF2b2lkIGEganVtcHkgZmVlbCB3aGVuIHN3aXRjaGluZyBiZXR3ZWVuIHNjZW5lc1xuICAgICAqIGdpdmVuIHRoYXQgdGhlIGRpc3RhbmNlIG9mIHNsaWRpbmcgaXMgbW9yZSB0aGFuIDEuXG4gICAgICogZS5nLiBgYGB0aGlzLnNsaWRlVG8oPistMSlgYGBcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCkge1xuICAgICAgICBpZiAodGhpcy5faW50ZXJtZWRpYXRlU2NlbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbS5hcHBseSh0aGlzLCB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSk7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBseSBzdHlsZXMgb24gY2hhbmdlZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NoYW5nZWRTdHlsZXMoKSB7XG4gICAgICAgIGxldCBzbGlkZVN0eWxlcyA9IFsnaXNsaWRlci1wcmV2JywgJ2lzbGlkZXItYWN0aXZlJywgJ2lzbGlkZXItbmV4dCddO1xuICAgICAgICB0aGlzLmVscy5mb3JFYWNoKGZ1bmN0aW9uIGNoYW5nZVN0eXBlRWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKGVsLCAnKCcgKyBzbGlkZVN0eWxlcy5qb2luKCd8JykgKyAnKScpO1xuICAgICAgICAgICAgYWRkQ2xhc3MoZWwsIHNsaWRlU3R5bGVzW2luZGV4XSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGxpc3QgaHRtbFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlcldyYXBwZXIoKSB7XG4gICAgICAgIHRoaXMub3V0ZXIgJiYgKHRoaXMub3V0ZXIuaW5uZXJIVE1MID0gJycpO1xuICAgICAgICAvLyBpbml0YWlsIHVsIGVsZW1lbnRcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBvdXRlci5jbGFzc05hbWUgPSAnaXNsaWRlci1vdXRlcic7XG5cbiAgICAgICAgLy8gc3RvcmFnZSBsaSBlbGVtZW50cywgb25seSBzdG9yZSAzIGVsZW1lbnRzIHRvIHJlZHVjZSBtZW1vcnkgdXNhZ2VcbiAgICAgICAgdGhpcy5lbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICB0aGlzLmVscy5wdXNoKGxpKTtcblxuICAgICAgICAgICAgLy8gcHJlcGFyZSBzdHlsZSBhbmltYXRpb25cbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGxpLCB0aGlzLmF4aXMsIHRoaXMuc2NhbGUsIGksIDApO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCAmJiAodGhpcy5fb3B0cy5hbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgdGhpcy5fb3B0cy5hbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obGksIDEgLSBpICsgdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obGksIGkgLSAxICsgdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dGVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5nZWRTdHlsZXMoKTtcblxuICAgICAgICAvLyBQcmVsb2FkIHBpY3R1cmUgWyBtYXkgYmUgcGljIDopIF1cbiAgICAgICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fcHJlbG9hZEltZyh0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICB9LmJpbmQodGhpcyksIDIwMCk7XG5cbiAgICAgICAgLy8gYXBwZW5kIHVsIHRvIGRpdiNjYW52YXNcbiAgICAgICAgaWYgKCF0aGlzLm91dGVyKSB7XG4gICAgICAgICAgICB0aGlzLm91dGVyID0gb3V0ZXI7XG4gICAgICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlbG9hZCBpbWcgd2hlbiBzbGlkZUNoYW5nZVxuICAgICAqIEZyb20gY3VycmVudCBpbmRleCArMiwgLTIgc2NlbmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4IG1lYW5zIHdoaWNoIGltYWdlIHdpbGwgYmUgbG9hZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3ByZWxvYWRJbWcoZGF0YUluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBsZXQgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBsZXQgbG9hZEltZyA9IGZ1bmN0aW9uIHByZWxvYWRJbWdMb2FkaW5nUHJvY2VzcyhpbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZGF0YVtpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2l0ZW1UeXBlKGl0ZW0pID09PSAncGljJyAmJiAhaXRlbS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZWxvYWRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZEltZy5zcmMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gcHJlbG9hZEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gcHJlbG9hZEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGVkID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsb2FkSW1nKChkYXRhSW5kZXggKyAyKSAlIGxlbik7XG4gICAgICAgICAgICBsb2FkSW1nKChkYXRhSW5kZXggLSAyICsgbGVuKSAlIGxlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXYXRjaCBldmVudCB0cmFuc2l0aW9uRW5kXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfd2F0Y2hUcmFuc2l0aW9uRW5kKHRpbWUsIGV2ZW50VHlwZSkge1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBsZXQgbHNuO1xuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6JywgJ3dhdGNoVHJhbnNpdGlvbkVuZDo6c3R1Y2s6OnBpbGUnLCB0aGlzLmluQW5pbWF0ZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGV2dCkge1xuICAgICAgICAgICAgaWYgKGxzbikge1xuICAgICAgICAgICAgICAgIGdsb2JhbC5jbGVhclRpbWVvdXQobHNuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuaW5BbmltYXRlLS07XG4gICAgICAgICAgICBzZWxmLmxvZygnRXZlbnQ6JywgJ3dhdGNoVHJhbnNpdGlvbkVuZDo6c3R1Y2s6OnJlbGVhc2UnLCBzZWxmLmluQW5pbWF0ZSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5pbkFuaW1hdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvL3NlbGYuaW5BbmltYXRlID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnc2xpZGVDaGFuZ2VkJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9jaGFuZ2VkU3R5bGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9yZW5kZXJJbnRlcm1lZGlhdGVTY2VuZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdW5XYXRjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdW5XYXRjaCgpIHtcbiAgICAgICAgICAgIHNlbGYuZWxzLmZvckVhY2goZnVuY3Rpb24gdHJhbnNsYXRpb25FbmRVbndhdGNoRWFjaChlbCkge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoc2VsZi5fdHJhbnNpdGlvbkVuZEV2ZW50KCksIGhhbmRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgICAgc2VsZi5lbHMuZm9yRWFjaChmdW5jdGlvbiB0cmFuc2xhdGlvbkVuZEVsc0VhY2goZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHNlbGYuX3RyYW5zaXRpb25FbmRFdmVudCgpLCBoYW5kbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbHNuID0gZ2xvYmFsLnNldFRpbWVvdXQoaGFuZGxlLCB0aW1lKTtcbiAgICAgICAgc2VsZi5pbkFuaW1hdGUrKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGFsbCBldmVudCBoYW5kbGVyLCB3aGVuIG9uIFBDLCBkaXNhYmxlIGRyYWcgZXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9iaW5kSGFuZGxlcigpIHtcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuXG4gICAgICAgIGlmICghZGV2aWNlLmhhc1RvdWNoKSB7XG4gICAgICAgICAgICBvdXRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICBvdXRlci5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2Uuc3RhcnRFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5tb3ZlRXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2UuZW5kRXZ0LCB0aGlzKTtcblxuICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMpO1xuXG4gICAgICAgIC8vIEZpeCBhbmRyb2lkIGRldmljZVxuICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBVbmlmb3JtaXR5IGFkbWluIGV2ZW50XG4gICAgICogIEV2ZW50IHJvdXRlclxuICAgICAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZ0KSB7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgc3dpdGNoIChldnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgICAgICBpZiAoIShldnQuYnV0dG9uID09PSAwICYmIGV2dC5idXR0b25zID09PSAxKSkgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SGFuZGxlcihldnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBkZXZpY2UubW92ZUV2dDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRldmljZS5lbmRFdnQ6XG4gICAgICAgICAgICBjYXNlICd0b3VjaGNhbmNlbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvcmllbnRhdGlvbmNoYW5nZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZXNpemUnOlxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNoc3RhcnQgY2FsbGJhY2tcbiAgICAgKiAgQHBhcmFtIHtvYmplY3R9IGV2dCBldmVudCBvYmplY3RcbiAgICAgKiAgQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXJ0SGFuZGxlcihldnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZml4UGFnZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuRklYX1BBR0VfVEFHUy5pbmRleE9mKGV2dC50YXJnZXQudGFnTmFtZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaG9sZGluZyB8fCB0aGlzLmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG5cbiAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBzdGFydCcpO1xuICAgICAgICB0aGlzLmZpcmUoJ3NsaWRlU3RhcnQnLCBldnQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc3RhcnRYID0gZGV2aWNlLmhhc1RvdWNoID8gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBldnQucGFnZVg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gZGV2aWNlLmhhc1RvdWNoID8gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBldnQucGFnZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNobW92ZSBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgbW92ZUhhbmRsZXIoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc01vdmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDogbW92aW5nJyk7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgIGxldCBheGlzID0gdGhpcy5heGlzO1xuICAgICAgICBsZXQgcmV2ZXJzZUF4aXMgPSB0aGlzLnJldmVyc2VBeGlzO1xuICAgICAgICBsZXQgb2Zmc2V0ID0ge1xuICAgICAgICAgICAgWDogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zdGFydFgpIDogKGV2dC5wYWdlWCAtIHRoaXMuc3RhcnRYKSxcbiAgICAgICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhvZmZzZXRbYXhpc10pIC0gTWF0aC5hYnMob2Zmc2V0W3JldmVyc2VBeGlzXSkgPiAxMCkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZmlyZSgnc2xpZGUnLCBldnQsIHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFtheGlzXSA+IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSAwIHx8IG9mZnNldFtheGlzXSA8IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBsZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFtheGlzXSA9IHRoaXMuX2RhbXBpbmcob2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmVsc1tpXTtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDBzJztcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyhpdGVtLCBheGlzLCB0aGlzLnNjYWxlLCBpLCBvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNoZW5kIGNhbGxiYWNrXG4gICAgICogIEBwYXJhbSB7T2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gICAgICogIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBlbmRIYW5kbGVyKGV2dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNNb3ZpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IGVuZCcpO1xuICAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgICAgIGxldCBib3VuZGFyeSA9IHRoaXMuc2NhbGUgLyAyO1xuICAgICAgICBsZXQgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGEgcXVpY2sgc2xpZGUgdGltZSBtdXN0IHVuZGVyIDMwMG1zXG4gICAgICAgIC8vIGEgcXVpY2sgc2xpZGUgc2hvdWxkIGFsc28gc2xpZGUgYXQgbGVhc3QgMTQgcHhcbiAgICAgICAgYm91bmRhcnkgPSBlbmRUaW1lIC0gdGhpcy5zdGFydFRpbWUgPiAzMDAgPyBib3VuZGFyeSA6IDE0O1xuXG4gICAgICAgIGxldCBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXRbYXhpc10pO1xuICAgICAgICBsZXQgYWJzUmV2ZXJzZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldFt0aGlzLnJldmVyc2VBeGlzXSk7XG5cbiAgICAgICAgbGV0IGdldExpbmsgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwuaHJlZikge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWwubG9jYXRpb24uaHJlZiA9IGVsLmhyZWZcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVsLmNsYXNzTmFtZSAhPT0gJ2lzbGlkZXItcGljJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdldExpbmsoZWwucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2coYm91bmRhcnksIG9mZnNldFtheGlzXSwgYWJzT2Zmc2V0LCBhYnNSZXZlcnNlT2Zmc2V0LCB0aGlzKTtcblxuICAgICAgICBpZiAob2Zmc2V0W2F4aXNdID49IGJvdW5kYXJ5ICYmIGFic1JldmVyc2VPZmZzZXQgPCBhYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMub3Bwb3NpdGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9mZnNldFtheGlzXSA8IC1ib3VuZGFyeSAmJiBhYnNSZXZlcnNlT2Zmc2V0IDwgYWJzT2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLm9wcG9zaXRlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0YXAgZXZlbnQgaWYgb2Zmc2V0IDwgMTBcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMub2Zmc2V0LlgpIDwgMTAgJiYgTWF0aC5hYnModGhpcy5vZmZzZXQuWSkgPCAxMCkge1xuICAgICAgICAgICAgdGhpcy50YXBFdnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgICAgIHRoaXMudGFwRXZ0LmluaXRFdmVudCgndGFwJywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnRhcmdldCAmJiBnZXRMaW5rKGV2dC50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFldnQudGFyZ2V0LmRpc3BhdGNoRXZlbnQodGhpcy50YXBFdnQpKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9mZnNldC5YID0gdGhpcy5vZmZzZXQuWSA9IDA7XG5cbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnc2xpZGVFbmQnLCBldnQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBvcmllbnRhdGlvbmNoYW5nZSBjYWxsYmFja1xuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyKCkge1xuICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IG9yaWVudGF0aW9uY2hhbmdlJyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXNpemUgY2FsbGJhY2tcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0ICE9PSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0IHx8IHRoaXMud2lkdGggIT09IHRoaXMud3JhcC5jbGllbnRXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5yZXNpemUpO1xuICAgICAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiByZXNpemUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9MU04ucmVzaXplICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLnJlc2l6ZSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgc2xpZGUgbG9naWNhbCwgZ290byBkYXRhIGluZGV4XG4gICAgICogIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggdGhlIGdvdG8gaW5kZXhcbiAgICAgKiAgQHB1YmxpY1xuICAgICAqL1xuICAgIHNsaWRlVG8oZGF0YUluZGV4LCBvcHRzKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVuaG9sZCgpO1xuICAgICAgICBsZXQgYW5pbWF0ZVRpbWUgPSB0aGlzLmFuaW1hdGVUaW1lO1xuICAgICAgICBsZXQgYW5pbWF0ZVR5cGUgPSB0aGlzLl9vcHRzLmFuaW1hdGVUeXBlO1xuICAgICAgICBsZXQgYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuYztcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGxldCBlbHMgPSB0aGlzLmVscztcbiAgICAgICAgbGV0IGlkeCA9IGRhdGFJbmRleDtcbiAgICAgICAgbGV0IG4gPSBkYXRhSW5kZXggLSB0aGlzLnNsaWRlSW5kZXg7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgbGV0IGV2ZW50VHlwZTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5hbmltYXRlVGltZSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZVRpbWUgPSBvcHRzLmFuaW1hdGVUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRzLmFuaW1hdGVUeXBlID09PSAnc3RyaW5nJyAmJiBvcHRzLmFuaW1hdGVUeXBlIGluIHRoaXMuX2FuaW1hdGVGdW5jcykge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVUeXBlID0gb3B0cy5hbmltYXRlVHlwZTtcbiAgICAgICAgICAgICAgICBhbmltYXRlRnVuYyA9IHRoaXMuX2FuaW1hdGVGdW5jc1thbmltYXRlVHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbiB0aGUgc2xpZGUgcHJvY2VzcywgYW5pbWF0ZSB0aW1lIGlzIHNxdWVlemVkXG4gICAgICAgIGxldCBzcXVlZXplVGltZSA9IE1hdGguYWJzKG9mZnNldFt0aGlzLmF4aXNdKSAvIHRoaXMuc2NhbGUgKiBhbmltYXRlVGltZTtcblxuICAgICAgICBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKG4gPiAwID8gdGhpcy5lbHNbMl0gOiB0aGlzLmVsc1swXSwgaWR4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZWxvYWQgd2hlbiBzbGlkZVxuICAgICAgICB0aGlzLl9wcmVsb2FkSW1nKGlkeCk7XG5cbiAgICAgICAgLy8gZ2V0IHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgICAgICBpZiAoZGF0YVtpZHhdKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpZHg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBuID4gMCA/IDAgOiBkYXRhLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nKCdJbmRleDonICsgdGhpcy5zbGlkZUluZGV4KTtcblxuICAgICAgICAvLyBrZWVwIHRoZSByaWdodCBvcmRlciBvZiBpdGVtc1xuICAgICAgICBsZXQgaGVhZEVsLCB0YWlsRWwsIHN0ZXA7XG5cblxuICAgICAgICAvLyBzbGlkZWNoYW5nZSBzaG91bGQgcmVuZGVyIG5ldyBpdGVtXG4gICAgICAgIC8vIGFuZCBjaGFuZ2UgbmV3IGl0ZW0gc3R5bGUgdG8gZml0IGFuaW1hdGlvblxuICAgICAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAgICAgLy8gUmVzdG9yZSB0byBjdXJyZW50IHNjZW5lXG4gICAgICAgICAgICBldmVudFR5cGUgPSAnc2xpZGVSZXN0b3JlJztcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgLy/ov5nkuIDov5nph4znmoTku6PnoIHvvIzkuI7liqjnlLvmlYjmnpzmjILpkqlcbiAgICAgICAgICAgIGlmICgodGhpcy5pc1ZlcnRpY2FsICYmIChhbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgYW5pbWF0ZVR5cGUgPT09ICdmbGlwJykgKSBeIChuID4gMCkpIHtcbiAgICAgICAgICAgICAgICBlbHMucHVzaChlbHMuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgaGVhZEVsID0gZWxzWzJdO1xuICAgICAgICAgICAgICAgIHRhaWxFbCA9IGVsc1swXTtcbiAgICAgICAgICAgICAgICBzdGVwID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVscy51bnNoaWZ0KGVscy5wb3AoKSk7XG4gICAgICAgICAgICAgICAgaGVhZEVsID0gZWxzWzBdO1xuICAgICAgICAgICAgICAgIHRhaWxFbCA9IGVsc1syXTtcbiAgICAgICAgICAgICAgICBzdGVwID0gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhuKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShoZWFkRWwsIGlkeCArIG4pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhuKSA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGhlYWRFbCwgaWR4ICsgc3RlcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJtZWRpYXRlU2NlbmUgPSBbdGFpbEVsLCBpZHggLSBzdGVwXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVhZEVsLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICBoZWFkRWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaGVhZEVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgICAgICAvLyBNaW51cyBzcXVlZXplIHRpbWVcbiAgICAgICAgICAgIHNxdWVlemVUaW1lID0gYW5pbWF0ZVRpbWUgLSBzcXVlZXplVGltZTtcblxuICAgICAgICAgICAgZXZlbnRUeXBlID0gJ3NsaWRlQ2hhbmdlJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZShldmVudFR5cGUsIHRoaXMuc2xpZGVJbmRleCwgZWxzWzFdLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fd2F0Y2hUcmFuc2l0aW9uRW5kKHNxdWVlemVUaW1lLCBldmVudFR5cGUgKyAnZCcsIHRoaXMuc2xpZGVJbmRleCwgZWxzWzFdLCB0aGlzKTtcblxuICAgICAgICAvLyBkbyB0aGUgdHJpY2sgYW5pbWF0aW9uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZWxzW2ldICE9PSBoZWFkRWwpIHtcbiAgICAgICAgICAgICAgICBlbHNbaV0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgJyArIChzcXVlZXplVGltZSAvIDEwMDApICsgJ3MgJyArIHRoaXMuYW5pbWF0ZUVhc2luZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRoaXMub3Bwb3NpdGUpe1xuICAgICAgICAgICAgICAgIGFuaW1hdGVGdW5jLmNhbGwodGhpcywgZWxzW2ldLCB0aGlzLmF4aXMsIHRoaXMuc2NhbGUsIGksIDAsIHRydWUpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZUZ1bmMuY2FsbCh0aGlzLCBlbHNbaV0sIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbm90IGxvb3BpbmcsIHN0b3AgcGxheWluZyB3aGVuIG1lZXQgdGhlIGVuZCBvZiBkYXRhXG4gICAgICAgIGlmICh0aGlzLmlzQXV0b3BsYXkgJiYgIXRoaXMuaXNMb29waW5nICYmIHRoaXMuc2xpZGVJbmRleCA9PT0gZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbGlkZSB0byBuZXh0IHNjZW5lXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNsaWRlTmV4dCgpIHtcbiAgICAgICAgdGhpcy5zbGlkZVRvLmFwcGx5KHRoaXMsIFt0aGlzLnNsaWRlSW5kZXggKyAxXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNsaWRlIHRvIHByZXZpb3VzIHNjZW5lXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNsaWRlUHJldigpIHtcbiAgICAgICAgdGhpcy5zbGlkZVRvLmFwcGx5KHRoaXMsIFt0aGlzLnNsaWRlSW5kZXggLSAxXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHBsdWdpbiAocnVuIHRpbWUgbW9kZSlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHBsdWdpblxuICAgICAqIEBwYXJhbSB7Li4ufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgIC8qIHJlZ1BsdWdpbigpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBsZXQgbmFtZSA9IGFyZ3Muc2hpZnQoKSxcbiAgICAgICAgICAgIHBsdWdpbiA9IGFyZ3NbMF07XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wbHVnaW5zLmhhc093blByb3BlcnR5KG5hbWUpICYmIHR5cGVvZiBwbHVnaW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5fcGx1Z2luc1tuYW1lXSA9IHBsdWdpbjtcbiAgICAgICAgICAgIGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF1dG8gZW5hYmxlIGFuZCBpbml0IHBsdWdpbiB3aGVuIGF0IHJ1biB0aW1lXG4gICAgICAgIGlmICghaW5BcnJheShuYW1lLCB0aGlzLl9vcHRzLnBsdWdpbnMpKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRzLnBsdWdpbnMucHVzaChhcmdzLmxlbmd0aCA/IFtdLmNvbmNhdChbbmFtZV0sIGFyZ3MpIDogbmFtZSk7XG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5fcGx1Z2luc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLl9wbHVnaW5zW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSovXG5cbiAgICAvKipcbiAgICAgKiAgc2ltcGxlIGV2ZW50IGRlbGVnYXRlIG1ldGhvZFxuICAgICAqICBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZSBldmVudCBuYW1lXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciB0aGUgc2ltcGxlIGNzcyBzZWxlY3RvciBsaWtlIGpRdWVyeVxuICAgICAqICBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBldmVudCBjYWxsYmFja1xuICAgICAqICBAcHVibGljXG4gICAgICovXG4gICAgYmluZChldnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGUpIHtcbiAgICAgICAgICAgIGxldCBldnQgPSBnbG9iYWwuZXZlbnQgPyBnbG9iYWwuZXZlbnQgOiBlO1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgZWxlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZUFycltpXSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGRlbGVnYXRlKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZSkge1xuICAgICAgICAgICAgbGV0IGV2dCA9IGdsb2JhbC5ldmVudCA/IGdsb2JhbC5ldmVudCA6IGU7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBlbGVBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWxlQXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVE9ETyB1bmJpbmQsIHVuRGVsZWdhdGVcbiAgICAgKiByZW1vdmUgZXZlbnQgZGVsZWdhdGUgZnJvbSB3cmFwXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVuYmluZChldmVudFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuXG4gICAgfVxuXG4gICAgdW5EZWxlZ2F0ZShldmVudFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlRXZlbnRMaXN0ZW5lciB0byByZWxlYXNlIHRoZSBtZW1vcnlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnZGVzdHJveScpO1xuXG4gICAgICAgIC8vIENsZWFyIGV2ZW50c1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5lbmRFdnQsIHRoaXMpO1xuICAgICAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcyk7XG4gICAgICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG5cbiAgICAgICAgLy8gQ2xlYXIgdGltZXJcbiAgICAgICAgdGhpcy5fTFNOLmZvckVhY2goZnVuY3Rpb24gY2xlYXJUaW1lck9uRGVzdHJveSh0aW1lcikge1xuICAgICAgICAgICAgdGltZXIgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMud3JhcC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBldmVudCBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9uKGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgICBpZiAoaW5BcnJheShldmVudE5hbWUsIHRoaXMuRVZFTlRTKSAmJiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cyA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gOiB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW10pLnB1c2goZnVuYyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZXZlbnQgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvZmYoZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICAgIGlmIChldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpIHtcbiAgICAgICAgICAgIGxldCBmdW5jcyA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBmdW5jcy5pbmRleE9mKGZ1bmMpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZnVuY3NbaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBldmVudCBjYWxsYmFja3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGZpcmUoZXZlbnROYW1lKSB7XG4gICAgICAgIHRoaXMubG9nKCdbRVZFTlQgRklSRV06JywgZXZlbnROYW1lLCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgICAgICBsZXQgZnVuY3MgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIFRPRE8gd2lsbCBzdXBwb3J0IGN1c3RvbSBjb250ZXh0LCBub3cgY29udGV4dCBpcyBpbnN0YW5jZSBvZiBpU2xpZGVyXG4gICAgICAgICAgICAgICAgdHlwZW9mIGZ1bmNzW2ldID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgJiYgZnVuY3NbaV0uYXBwbHlcbiAgICAgICAgICAgICAgICAmJiBmdW5jc1tpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc2V0ICYgcmVyZW5kZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZygpO1xuICAgICAgICB0aGlzLl9yZW5kZXJXcmFwcGVyKCk7XG4gICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWxvYWQgRGF0YSAmIHJlbmRlclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBsb2FkRGF0YShkYXRhLCBpbml0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpbml0SW5kZXggfHwgMDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgICAgICB0aGlzLmZpcmUoJ3JlbG9hZERhdGEnKTtcbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGF1dG9wbGF5XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHBsYXkoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fTFNOLmF1dG9QbGF5ICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLmF1dG9QbGF5KTtcblxuICAgICAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICAgICAgc2VsZi5fTFNOLmF1dG9QbGF5ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICBwbGF5KCk7XG4gICAgICAgICAgICB9LCBzZWxmLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXVzZSBhdXRvcGxheVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5fTFNOLmF1dG9QbGF5ICYmIGNsZWFyVGltZW91dCh0aGlzLl9MU04uYXV0b1BsYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1haW50YWluaW5nIHRoZSBjdXJyZW50IHNjZW5lXG4gICAgICogRGlzYWJsZSB0b3VjaCBldmVudHMsIGV4Y2VwdCBmb3IgdGhlIG5hdGl2ZSBtZXRob2QuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGhvbGQoKSB7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZSBjdXJyZW50IHNjZW5lXG4gICAgICogdW5sb2NrIGF0IHNhbWUgdGltZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bmhvbGQoKSB7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVubG9jaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFlvdSBjYW4ndCBkbyBhbnl0aGluZyBvbiB0aGlzIHNjZW5lXG4gICAgICogbG9jayBuYXRpdmUgbWV0aG9kIGNhbGxzXG4gICAgICogaG9sZCBhdCBzYW1lIHRpbWVcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbG9jaygpIHtcbiAgICAgICAgdGhpcy5ob2xkKCk7XG4gICAgICAgIHRoaXMubG9ja2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdW5sb2NrIG5hdGl2ZSBtZXRob2QgY2FsbHNcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5sb2NrKCkge1xuICAgICAgICB0aGlzLmxvY2tpbmcgPSBmYWxzZTtcbiAgICB9XG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGlTbGlkZXJQcm90b3R5cGU7XG4iLCIvKlxuICogQGZpbGUgICBBbmltYXRpb24gTGlicmFyeVxuICogQGF1dGhvciB4aWV5dTMzMzMzXG4gKi9cblxuLyogIOivtOaYju+8mlxuLy9kb20g6KGo56S65Yqo55S755qE5YWD57Sg6IqC54K5XG4vL2F4aXMg6KGo56S65Yqo55S75pa55ZCR77yM5YiG5Yir5Li6IFgg5ZKMIFkg5pa55ZCRXG4vL3NjYWxlIOWxj+W5lemrmOW6plxuLy9pID09IDAg6KGo56S6IGlzbGlkZXItcHJldiwgaSA9PSAxIOihqOekuiBpc2xpZGVyLWFjdGl2ZSwgaSA9PSAyIOihqOekuiBpc2xpZGVyLW5leHQsXG4vL29mZnNldCA+IDAg6KGo56S655qE5piv5ZCR5LiK5oiW5ZCR5Y+z55qE5ruR5Yqo5pa55ZCR77yMb2Zmc2V0IDwgMCDooajnpLrnmoTmmK/lkJHkuIvmiJblkJHlt6bnmoTmu5HliqjmlrnlkJEub2Zmc2V0IOeahOWAvOihqOekuuaJi+aMh+WcqOWxj+W5leS4iua7keWKqOeahOi3neemu++8jOe7neWvueWAvOi2iuWkp+ihqOekuua7keWKqOeahOi3neemu+i2iumVv+OAglxuLy9vcHBvc2l0ZSDliKTmlq3mmK/lkKblnKjmiafooYwg5ZCR5LiL5oiW5ZCR5bem55qE6YCG5pa55ZCR5ruR5YqoXG4qICovXG5cbmxldCBleHRlbmRBbmltYXRpb24gPSB7XG4gICAgJ3JvdGF0ZSc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBsZXQgYmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMud3JhcC5wYXJlbnROb2RlLCBudWxsKS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0IDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47IC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOyAnXG4gICAgICAgICAgICArICdiYWNrZ3JvdW5kLWNvbG9yOicgKyBiZENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7JztcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkgKyAnZGVnKSB0cmFuc2xhdGVaKCdcbiAgICAgICAgICAgICsgKDAuODg4ICogc2NhbGUgLyAyKSArICdweCkgc2NhbGUoMC44ODgpJztcbiAgICB9LFxuXG4gICAgJ2ZsaXAnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgbGV0IGJkQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLndyYXAucGFyZW50Tm9kZSwgbnVsbCkuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICdwb3NpdGlvbjphYnNvbHV0ZTsgLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjsgYmFja2dyb3VuZC1jb2xvcjonICsgYmRDb2xvciArICc7JztcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKCcgKyAoc2NhbGUgLyAyKSArICdweCkgcm90YXRlJyArIHJvdGF0ZURpcmVjdFxuICAgICAgICAgICAgKyAnKCcgKyAxODAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkgKyAnZGVnKSBzY2FsZSgwLjg3NSknO1xuICAgIH0sXG5cbiAgICAnZGVwdGgnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoNCAtIE1hdGguYWJzKGkgLSAxKSkgKiAwLjE4O1xuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG4gICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSA9PT0gMSkgPyAxMDAgOiAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpIDogKGkgLSAxKTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJ1xuICAgICAgICAgICAgKyBheGlzICsgJygnICsgKG9mZnNldCArIDEuMyAqIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9LFxuXG4gICAgJ2Zsb3cnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgbGV0IGRpcmVjdEFtZW5kID0gKGF4aXMgPT09ICdYJykgPyAxIDogLTE7XG4gICAgICAgIGxldCBvZmZzZXRSYXRpbyA9IE1hdGguYWJzKG9mZnNldCAvIHNjYWxlKTtcblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMC43LCAwLjcpIHRyYW5zbGF0ZVooJyArIChvZmZzZXRSYXRpbyAqIDE1MCAtIDE1MCkgKiBNYXRoLmFicyhpIC0gMSkgKyAncHgpJ1xuICAgICAgICAgICAgKyAndHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknXG4gICAgICAgICAgICArICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgZGlyZWN0QW1lbmQgKiAoMzAgLSBvZmZzZXRSYXRpbyAqIDMwKSAqICgxIC0gaSkgKyAnZGVnKSc7XG4gICAgfSxcblxuICAgICdjYXJkJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDAgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvbS5jdXIgJiYgZG9tLmN1ciAhPT0gaSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IG51bGw7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHpvb21TY2FsZSA9IChkb20uY3VyKSA/IDEgLSAwLjIgKiBNYXRoLmFicyhpIC0gMSkgLSBNYXRoLmFicygwLjIgKiBvZmZzZXQgLyBzY2FsZSkudG9GaXhlZCg2KSA6IDE7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzXG4gICAgICAgICAgICArICcoJyArICgoMSArIE1hdGguYWJzKGkgLSAxKSAqIDAuMikgKiBvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfSxcblxuICAgICdmYWRlJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH1cbiAgICAgICAgb2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IG9mZnNldCAvIHNjYWxlO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5pmV5p+T5omp5pWjXG4gICAgJ3lya3MnOiBmdW5jdGlvbiBmYWRlKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgZG9tLmN1ciA9IDI7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpe1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSArIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gLSBvZmZzZXQgLyBzY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y+N5ZCRXG4gICAgICAgIGZ1bmN0aW9uIHJldmVyc2UoKXtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IG9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgaWYob3Bwb3NpdGUpe1xuICAgICAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG5cbiAgICAgICAgbGV0IHpvb21TY2FsZSA9IChkb20uY3VyID09PSAxKSA/IDEgOiAyO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSc7XG4gICAgfSxcblxuICAgIC8v5Lit5b+D5pS+5aSnXG4gICAgJ3p4ZmQnOiBmdW5jdGlvbiBmYWRlKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgZG9tLmN1ciA9IDAuMTtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCl7XG4gICAgICAgICAgICBpZihpID09IDEpe1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfWVsc2UgaWYoaSA8IDEpe1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y+N5ZCRXG4gICAgICAgIGZ1bmN0aW9uIHJldmVyc2UoKXtcbiAgICAgICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9ZWxzZSBpZihpID4gMSl7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICB9ZWxzZSB7XG4gICAgICAgICAgICBpZihvcHBvc2l0ZSl7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHpvb21TY2FsZSA9IChkb20uY3VyID09PSAxKSA/IDEgOiAwLjE7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApJztcbiAgICB9LFxuXG4gICAgLy/muJDpmpDmtojlpLFcbiAgICAnanl4cyc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0LCBvcHBvc2l0ZSkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuXG4gICAgICAgIC8v5q2j5ZCRXG4gICAgICAgIGZ1bmN0aW9uIGZvcndhcmQoKXtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IC0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+WPjeWQkVxuICAgICAgICBmdW5jdGlvbiByZXZlcnNlKCl7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7Ly/mraPopoHooqvmmL7npLrnmoTpobXpnaJcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgKyAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSBvZmZzZXQgLyBzY2FsZTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH0gZWxzZXtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgaWYob3Bwb3NpdGUpe1xuICAgICAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICBpZihpID09IDEpe1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGkgPiAxKXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICAgICAgaWYoaSA8IDEpe1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKDBweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+W5s+a7keenu+WHulxuICAgICdwaHljJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpe1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y+N5ZCRXG4gICAgICAgIGZ1bmN0aW9uIHJldmVyc2UoKXtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsvL+ato+imgeiiq+aYvuekuueahOmhtemdolxuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgaWYoaSA8IDEpe1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGlmKG9wcG9zaXRlKXtcbiAgICAgICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgaWYoaSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihpIDwgMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoMHB4KSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoMHB4KSc7XG4gICAgICAgICAgICAgICAgfWVsc2UgaWYoaSA+IDEpe1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKDBweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+S4iuS4i+a7keWKqFxuICAgICdzeGhkJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwIDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb20uY3VyICYmIGRvbS5jdXIgIT09IGkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSBudWxsO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1cikgPyAxIC0gMC44ICogTWF0aC5hYnMoaSAtIDEpIC0gTWF0aC5hYnMoMC44ICogb2Zmc2V0IC8gc2NhbGUpLnRvRml4ZWQoNikgOiAxO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpc1xuICAgICAgICAgICAgKyAnKCcgKyAoKDEgKyBNYXRoLmFicyhpIC0gMSkgKiAwLjIpICogb2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH0sXG5cbiAgICAvL+WNoeeJh+e/u+mhtVxuICAgICdrcGZ5JzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCl7IGNvbnNvbGUubG9nKDEpXG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47LXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7ICdcbiAgICAgICAgICAgICAgICArICcgcG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgYm90dG9tIDBweDsnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpeyAgY29uc29sZS5sb2coMilcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsvL+ato+imgeiiq+aYvuekuueahOmhtemdolxuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjsgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7ICdcbiAgICAgICAgICAgICAgICArICcgcG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgdG9wIDBweDsnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgIGlmKGkgPCAxKXtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyAoIC05MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSkgKyAnZGVnKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGlmKG9wcG9zaXRlKXtcbiAgICAgICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgaWYoaSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygwZGVnKSAnO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGkgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgKCAtOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoMGRlZykgJztcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihpID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArICggLTkwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpKSArICdkZWcpJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygwZGVnKSAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+S6pOaNoue/u+mhtVxuICAgICdqaGZ5JzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCl7IGNvbnNvbGUubG9nKDEpXG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47LXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7ICdcbiAgICAgICAgICAgICAgICArICcgcG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgYm90dG9tIDBweDsnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpeyAgY29uc29sZS5sb2coMilcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsvL+ato+imgeiiq+aYvuekuueahOmhtemdolxuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjsgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7ICdcbiAgICAgICAgICAgICAgICArICcgcG9zaXRpb246YWJzb2x1dGU7LXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgdG9wIDBweDsnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgIGlmKGkgPCAxKXtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyAoIC05MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSkgKyAnZGVnKSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgIGlmKG9wcG9zaXRlKXtcbiAgICAgICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgaWYoaSA9PSAxKXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygwZGVnKSAnO1xuICAgICAgICAgICAgICAgIH1lbHNlIGlmKGkgPCAxKXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgKCAtOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgIGlmKGkgPT0gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoMGRlZykgJztcbiAgICAgICAgICAgICAgICB9ZWxzZSBpZihpID4gMSl7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArICggLTkwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpKSArICdkZWcpJztcbiAgICAgICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygwZGVnKSAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kQW5pbWF0aW9uO1xuIiwiLypcbiAqIEBmaWxlICAgVG8gY3JlYXRlIHJpZ2h0JmxlZnQgYm90dG9uIG9uIGlTbGlkZXJcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbmZ1bmN0aW9uIGFkZEJ0bigpIHtcbiAgICBsZXQgSEFORExFID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyhIQU5ETEUpXG4gICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICBsZXQgYnRuT3V0ZXIgPSBbXTtcbiAgICAgICAgbGV0IGJ0bklubmVyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICBidG5PdXRlcltpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItYnRuLW91dGVyJztcbiAgICAgICAgICAgIGJ0bklubmVyW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBidG5Jbm5lcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4taW5uZXInO1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmNsYXNzTmFtZSArPSAnIGxlZnQnO1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgcmlnaHQnO1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ0bk91dGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBkaXIgPSBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnZGlyJyksIDEwKTtcbiAgICAgICAgICAgICAgICBIQU5ETEUuc2xpZGVUbyhIQU5ETEUuc2xpZGVJbmRleCArIGRpcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uYXBwZW5kQ2hpbGQoYnRuSW5uZXJbaV0pO1xuICAgICAgICAgICAgSEFORExFLndyYXAuYXBwZW5kQ2hpbGQoYnRuT3V0ZXJbaV0sIEhBTkRMRS53cmFwLm5leHRTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRCdG47XG4iLCIvKlxuICogQGZpbGUgICBUbyBjcmVhdGUgZG90cyBpbmRleCBvbiBpU2xpZGVyXG4gKiBAYXV0aG9yIHhpZXl1MzMzMzNcbiAqL1xuXG5mdW5jdGlvbiBhZGREb3QoKSB7XG4gICAgbGV0IEhBTkRMRSA9IHRoaXM7XG4gICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICBsZXQgZGF0YSA9IEhBTkRMRS5kYXRhO1xuICAgICAgICBsZXQgZG90cyA9IFtdO1xuICAgICAgICBsZXQgZG90V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGRvdFdyYXAuY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90LXdyYXAnO1xuXG4gICAgICAgIGxldCByZW5kZXJEb3RzID0gZnVuY3Rpb24gcmVuZGVyRG90cygpIHtcbiAgICAgICAgICAgIGxldCBmcmVnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRvdHNbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90JztcbiAgICAgICAgICAgICAgICBkb3RzW2ldLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gSEFORExFLnNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb3RzW2ldLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIEhBTkRMRS5zbGlkZVRvKHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdpbmRleCcpLCAxMCkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZnJlZ21lbnQuYXBwZW5kQ2hpbGQoZG90c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb3RXcmFwLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgZG90V3JhcC5hcHBlbmRDaGlsZChmcmVnbWVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVuZGVyRG90cygpO1xuXG4gICAgICAgIEhBTkRMRS53cmFwLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZG90V3JhcCk7XG5cbiAgICAgICAgSEFORExFLm9uKCdzbGlkZUNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghSEFORExFLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3QnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5zbGlkZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEhBTkRMRS5vbigncmVsb2FkRGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBkb3RzID0gW107XG4gICAgICAgICAgICByZW5kZXJEb3RzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGREb3Q7XG4iLCIvKipcbiAqIFN1cHBvcnQgM0QgbWF0cml4IHRyYW5zbGF0ZVxuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbnZhciBleHRlbmRGdW5jdGlvbiA9IHt9OyAvL+i/meS4quaYr+aIkea3u+WKoO+8jOeUqOS6juaJqeWxleaUueaooeWdl+eahOaWueazlVxuXG52YXIgaGFzM2QgPSAoJ1dlYktpdENTU01hdHJpeCcgaW4gZ2xvYmFsICYmICdtMTEnIGluIG5ldyBXZWJLaXRDU1NNYXRyaXgoKSk7XG5cbi8qKlxuICogTWluIHNjYWxlXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG52YXIgbWluU2NhbGUgPSAxIC8gMjtcblxuLyoqXG4gKiBTY2VuZSB2aWV3IHJhbmdlXG4gKiBAdHlwZSB7e319XG4gKi9cbnZhciB2aWV3U2NvcGUgPSB7fTtcblxudmFyIGN1cnJlbnRTY2FsZTtcblxudmFyIHpvb21GYWN0b3I7XG5cbnZhciB6b29tTm9kZTtcblxudmFyIHN0YXJ0VG91Y2hlcztcblxudmFyIHN0YXJ0WDtcblxudmFyIHN0YXJ0WTtcblxudmFyIGxhc3RUb3VjaFN0YXJ0O1xuXG52YXIgZ2VzdHVyZTtcblxudmFyIElOX1NDQUxFX01PREUgPSBmYWxzZTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0cmFuc2xhdGVcbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICogQHBhcmFtIHpcbiAqIEBwYXJhbSBzY2FsZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUcmFuc2xhdGUoeCwgeSwgeiwgc2NhbGUpIHtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGVcIiArIChoYXMzZCA/IFwiM2QoXCIgOiBcIihcIikgKyB4ICsgXCJweCxcIiArIHkgKyAoaGFzM2QgPyBcInB4LFwiICsgeiArIFwicHgpXCIgOiBcInB4KVwiKSArIFwic2NhbGUoXCIgKyBzY2FsZSArIFwiKVwiO1xufVxuXG4vKipcbiAqIEdldCBkaXN0YW5jZVxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXREaXN0YW5jZShhLCBiKSB7XG4gICAgdmFyIHgsIHk7XG4gICAgeCA9IGEubGVmdCAtIGIubGVmdDtcbiAgICB5ID0gYS50b3AgLSBiLnRvcDtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSB0byBzdHJpbmdcbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oeCwgeSkge1xuICAgIHJldHVybiB4ICsgXCJweCBcIiArIHkgKyBcInB4XCI7XG59XG5cbi8qKlxuICogR2V0IHRvdWNoIHBvaW50ZXJcbiAqIEBwYXJhbSB0b3VjaGVzXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGdldFRvdWNoZXModG91Y2hlcykge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0b3VjaGVzKS5tYXAoZnVuY3Rpb24gKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiB0b3VjaC5wYWdlWCxcbiAgICAgICAgICAgIHRvcDogdG91Y2gucGFnZVlcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIEdldCBzY2FsZVxuICogQHBhcmFtIHN0YXJ0XG4gKiBAcGFyYW0gZW5kXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBjYWxjdWxhdGVTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIHN0YXJ0RGlzdGFuY2UgPSBnZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgIHZhciBlbmREaXN0YW5jZSA9IGdldERpc3RhbmNlKGVuZFswXSwgZW5kWzFdKTtcbiAgICByZXR1cm4gZW5kRGlzdGFuY2UgLyBzdGFydERpc3RhbmNlO1xufVxuXG4vKipcbiAqIEdldCBjb21wdXRlZCB0cmFuc2xhdGVcbiAqIEBwYXJhbSBvYmpcbiAqIEByZXR1cm5zIHt7dHJhbnNsYXRlWDogbnVtYmVyLCB0cmFuc2xhdGVZOiBudW1iZXIsIHRyYW5zbGF0ZVo6IG51bWJlciwgc2NhbGVYOiBudW1iZXIsIHNjYWxlWTogbnVtYmVyLCBvZmZzZXRYOiBudW1iZXIsIG9mZnNldFk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldENvbXB1dGVkVHJhbnNsYXRlKG9iaikge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHRyYW5zbGF0ZVg6IDAsXG4gICAgICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgICAgIHRyYW5zbGF0ZVo6IDAsXG4gICAgICAgIHNjYWxlWDogMSxcbiAgICAgICAgc2NhbGVZOiAxLFxuICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICBvZmZzZXRZOiAwXG4gICAgfTtcbiAgICB2YXIgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwO1xuICAgIGlmICghZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUgfHwgIW9iaikgcmV0dXJuIHJlc3VsdDtcbiAgICB2YXIgc3R5bGUgPSBnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZShvYmopLCB0cmFuc2Zvcm0sIG9yaWdpbjtcbiAgICB0cmFuc2Zvcm0gPSBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICAgIG9yaWdpbiA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiB8fCBzdHlsZS5tb3pUcmFuc2Zvcm1PcmlnaW47XG4gICAgdmFyIHBhciA9IG9yaWdpbi5tYXRjaCgvKC4qKXB4XFxzKyguKilweC8pO1xuICAgIGlmIChwYXIubGVuZ3RoID4gMSkge1xuICAgICAgICBvZmZzZXRYID0gcGFyWzFdIC0gMDtcbiAgICAgICAgb2Zmc2V0WSA9IHBhclsyXSAtIDA7XG4gICAgfVxuICAgIGlmICh0cmFuc2Zvcm0gPT0gXCJub25lXCIpIHJldHVybiByZXN1bHQ7XG4gICAgdmFyIG1hdDNkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICAgIHZhciBtYXQyZCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeFxcKCguKylcXCkkLyk7XG4gICAgaWYgKG1hdDNkKSB7XG4gICAgICAgIHZhciBzdHIgPSBtYXQzZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlWDogc3RyWzEyXSAtIDAsXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiBzdHJbMTNdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVo6IHN0clsxNF0gLSAwLFxuICAgICAgICAgICAgb2Zmc2V0WDogb2Zmc2V0WCAtIDAsXG4gICAgICAgICAgICBvZmZzZXRZOiBvZmZzZXRZIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWDogc3RyWzBdIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWTogc3RyWzVdIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWjogc3RyWzEwXSAtIDBcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1hdDJkKSB7XG4gICAgICAgIHZhciBzdHIgPSBtYXQyZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlWDogc3RyWzRdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0cls1XSAtIDAsXG4gICAgICAgICAgICBvZmZzZXRYOiBvZmZzZXRYIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFk6IG9mZnNldFkgLSAwLFxuICAgICAgICAgICAgc2NhbGVYOiBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgc2NhbGVZOiBzdHJbM10gLSAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0IGNlbnRlciBwb2ludFxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudGVyKGEsIGIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiAoYS54ICsgYi54KSAvIDIsXG4gICAgICAgIHk6IChhLnkgKyBiLnkpIC8gMlxuICAgIH1cbn1cblxuLyoqXG4gKiBpbml0XG4gKiBAcGFyYW0gb3B0c1xuICovXG5mdW5jdGlvbiBpbml0Wm9vbShvcHRzKSB7XG4gICAgY3VycmVudFNjYWxlID0gb3B0cy5jdXJyZW50U2NhbGU7XG4gICAgem9vbUZhY3RvciA9IG9wdHMuem9vbUZhY3RvcjtcbiAgICBleHRlbmRGdW5jdGlvbiA9IG9wdHMuZXh0ZW5kRnVuY3Rpb247XG59XG5cbi8qKlxuICogU3RhcnQgZXZlbnQgaGFuZGxlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIHN0YXJ0SGFuZGxlcihldnQpIHtcbiAgICBleHRlbmRGdW5jdGlvbi5zdGFydEhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG4gICAgLy8gbXVzdCBiZSBhIHBpY3R1cmUsIG9ubHkgb25lIHBpY3R1cmUhIVxuICAgIHZhciBub2RlID0gdGhpcy5lbHNbMV0ucXVlcnlTZWxlY3RvcignaW1nOmZpcnN0LWNoaWxkJyk7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIGlmIChkZXZpY2UuaGFzVG91Y2ggJiYgbm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBJTl9TQ0FMRV9NT0RFID0gdHJ1ZTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IGdldENvbXB1dGVkVHJhbnNsYXRlKG5vZGUpO1xuICAgICAgICBzdGFydFRvdWNoZXMgPSBnZXRUb3VjaGVzKGV2dC50YXJnZXRUb3VjaGVzKTtcbiAgICAgICAgc3RhcnRYID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVggLSAwO1xuICAgICAgICBzdGFydFkgPSB0cmFuc2Zvcm0udHJhbnNsYXRlWSAtIDA7XG4gICAgICAgIGN1cnJlbnRTY2FsZSA9IHRyYW5zZm9ybS5zY2FsZVg7XG4gICAgICAgIHpvb21Ob2RlID0gbm9kZTtcbiAgICAgICAgdmFyIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgIGxhc3RUb3VjaFN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB0b3VjaGVzID0gZXZ0LnRvdWNoZXM7XG4gICAgICAgICAgICB2YXIgdG91Y2hDZW50ZXIgPSBnZXRDZW50ZXIoe1xuICAgICAgICAgICAgICAgIHg6IHRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogdG91Y2hlc1swXS5wYWdlWVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHg6IHRvdWNoZXNbMV0ucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogdG91Y2hlc1sxXS5wYWdlWVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKHRvdWNoQ2VudGVyLnggLSBwb3MubGVmdCwgdG91Y2hDZW50ZXIueSAtIHBvcy50b3ApO1xuICAgICAgICB9IGVsc2UgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdmFyIHRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgZ2VzdHVyZSA9IDA7XG4gICAgICAgICAgICBpZiAodGltZSAtIGxhc3RUb3VjaFN0YXJ0IDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0VG91Y2hTdGFydCA9IHRpbWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogTW92ZSBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG1vdmVIYW5kbGVyKGV2dCkge1xuICAgIGlmIChJTl9TQ0FMRV9NT0RFKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgICAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgICAgIGlmIChkZXZpY2UuaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNjYWxlSW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEgJiYgY3VycmVudFNjYWxlID4gMSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbW92ZUltYWdlLmNhbGwodGhpcywgZXZ0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VzdHVyZSA9IHJlc3VsdDtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXh0ZW5kRnVuY3Rpb24ubW92ZUhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG59XG5cbi8qKlxuICogRG91YmxlIHRhbyBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gaGFuZGxlRG91YmxlVGFwKGV2dCkge1xuICAgIGNvbnNvbGUubG9nKHpvb21GYWN0b3IpXG4gICAgdmFyIHpvb21GYWN0b3IgPSB6b29tRmFjdG9yIHx8IDI7XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgY3VycmVudFNjYWxlID0gY3VycmVudFNjYWxlID09IDEgPyB6b29tRmFjdG9yIDogMTtcbiAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKDAsIDAsIDAsIGN1cnJlbnRTY2FsZSk7XG4gICAgaWYgKGN1cnJlbnRTY2FsZSAhPSAxKSBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKGV2dC50b3VjaGVzWzBdLnBhZ2VYIC0gcG9zLmxlZnQsIGV2dC50b3VjaGVzWzBdLnBhZ2VZIC0gcG9zLnRvcCk7XG59XG5cbi8qKlxuICogc2NhbGUgaW1hZ2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gc2NhbGVJbWFnZShldnQpIHtcbiAgICB2YXIgbW92ZVRvdWNlcyA9IGdldFRvdWNoZXMoZXZ0LnRhcmdldFRvdWNoZXMpO1xuICAgIHZhciBzY2FsZSA9IGNhbGN1bGF0ZVNjYWxlKHN0YXJ0VG91Y2hlcywgbW92ZVRvdWNlcyk7XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICBzY2FsZSA9IGN1cnJlbnRTY2FsZSAqIHNjYWxlIDwgbWluU2NhbGUgPyBtaW5TY2FsZSA6IGN1cnJlbnRTY2FsZSAqIHNjYWxlO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgc2NhbGUpO1xufVxuXG4vKipcbiAqIEVuZCBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSBldnRcbiAqL1xuZnVuY3Rpb24gZW5kSGFuZGxlcihldnQpIHtcbiAgICBpZiAoSU5fU0NBTEVfTU9ERSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgaWYgKGdlc3R1cmUgPT09IDIpIHsvL+WPjOaJi+aMh1xuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChnZXN0dXJlID09IDEpIHsvL+aUvuWkp+aLluaLvVxuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChnZXN0dXJlID09PSAzKSB7Ly/lj4zlh7tcbiAgICAgICAgICAgIGhhbmRsZURvdWJsZVRhcChldnQpO1xuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgSU5fU0NBTEVfTU9ERSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHRlbmRGdW5jdGlvbi5lbmRIYW5kbGVyT3JpZ2luYWwuY2FsbCh0aGlzLCBldnQpO1xufVxuXG4vKipcbiAqIERyYWdtb3ZlIGltYWdlXG4gKiBAcGFyYW0ge29wamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIG1vdmVJbWFnZShldnQpIHtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICB2YXIgb2Zmc2V0ID0ge1xuICAgICAgICBYOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLnN0YXJ0WCkgOiAoZXZ0LnBhZ2VYIC0gdGhpcy5zdGFydFgpLFxuICAgICAgICBZOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLnN0YXJ0WSkgOiAoZXZ0LnBhZ2VZIC0gdGhpcy5zdGFydFkpXG4gICAgfTtcbiAgICB2YXIgbW92ZU9mZnNldCA9IHtcbiAgICAgICAgeDogc3RhcnRYICsgb2Zmc2V0LlggLSAwLFxuICAgICAgICB5OiBzdGFydFkgKyBvZmZzZXQuWSAtIDBcbiAgICB9O1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUobW92ZU9mZnNldC54LCBtb3ZlT2Zmc2V0LnksIDAsIGN1cnJlbnRTY2FsZSk7XG59XG5cbi8qKlxuICogR2V0IHBvc2l0aW9uXG4gKiBAcGFyYW0gZWxlbWVudFxuICogQHJldHVybnMge3tsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgIHZhciBwb3MgPSB7XCJsZWZ0XCI6IDAsIFwidG9wXCI6IDB9O1xuICAgIGRvIHtcbiAgICAgICAgcG9zLnRvcCArPSBlbGVtZW50Lm9mZnNldFRvcCB8fCAwO1xuICAgICAgICBwb3MubGVmdCArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cbiAgICB3aGlsZSAoZWxlbWVudCk7XG4gICAgcmV0dXJuIHBvcztcbn1cblxuLyoqXG4gKiBDaGVjayB0YXJnZXQgaXMgaW4gcmFuZ2VcbiAqIEBwYXJhbSBub2RlXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSB0YWdcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIHZhbHVlLCB0YWcpIHtcbiAgICB2YXIgbWluLCBtYXg7XG4gICAgdmFyIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgIHZpZXdTY29wZSA9IHtcbiAgICAgICAgc3RhcnQ6IHtsZWZ0OiBwb3MubGVmdCwgdG9wOiBwb3MudG9wfSxcbiAgICAgICAgZW5kOiB7bGVmdDogcG9zLmxlZnQgKyBub2RlLmNsaWVudFdpZHRoLCB0b3A6IHBvcy50b3AgKyBub2RlLmNsaWVudEhlaWdodH1cbiAgICB9O1xuICAgIHZhciBzdHIgPSB0YWcgPT0gMSA/IFwibGVmdFwiIDogXCJ0b3BcIjtcbiAgICBtaW4gPSB2aWV3U2NvcGUuc3RhcnRbc3RyXTtcbiAgICBtYXggPSB2aWV3U2NvcGUuZW5kW3N0cl07XG4gICAgcmV0dXJuICh2YWx1ZSA+PSBtaW4gJiYgdmFsdWUgPD0gbWF4KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIG5vZGVcbiAqIEBwYXJhbSBvYmoxXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBvdmVyRmxvdyhub2RlLCBvYmoxKSB7XG4gICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgdmFyIGlzWDFJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5zdGFydC5sZWZ0LCAxKTtcbiAgICB2YXIgaXNYMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC5sZWZ0LCAxKTtcbiAgICB2YXIgaXNZMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LnRvcCwgMCk7XG4gICAgdmFyIGlzWTJJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5lbmQudG9wLCAwKTtcbiAgICBpZiAoKGlzWDFJbiAhPSBpc1gySW4pICYmIChpc1kxSW4gIT0gaXNZMkluKSkge1xuICAgICAgICBpZiAoaXNYMUluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1gxSW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDJJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSA0O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICgoaXNYMUluID09IGlzWDJJbikpIHtcbiAgICAgICAgaWYgKCFpc1kxSW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA1O1xuICAgICAgICB9IGVsc2UgaWYgKCFpc1kySW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA2O1xuICAgICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4pIHtcbiAgICAgICAgaWYgKCFpc1gxSW4gJiYgaXNYMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA3O1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiAhaXNYMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1kxSW4gPT0gaXNZMkluID09IGlzWDFJbiA9PSBpc1gySW4pIHtcbiAgICAgICAgcmVzdWx0ID0gOTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBSZXNldCBpbWFnZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiByZXNldEltYWdlKGV2dCkge1xuICAgIGlmIChjdXJyZW50U2NhbGUgPT0gMSkgcmV0dXJuO1xuICAgIHZhciBub2RlID0gem9vbU5vZGUsIGxlZnQsIHRvcCwgdHJhbnMsIHcsIGgsIHBvcywgc3RhcnQsIGVuZCwgcGFyZW50LCBmbG93VGFnO1xuICAgIHRyYW5zID0gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUobm9kZSk7XG4gICAgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIHcgPSBub2RlLmNsaWVudFdpZHRoICogdHJhbnMuc2NhbGVYO1xuICAgIGggPSBub2RlLmNsaWVudEhlaWdodCAqIHRyYW5zLnNjYWxlWDtcbiAgICBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICBzdGFydCA9IHtcbiAgICAgICAgbGVmdDogKDEgLSB0cmFucy5zY2FsZVgpICogdHJhbnMub2Zmc2V0WCArIHBvcy5sZWZ0ICsgdHJhbnMudHJhbnNsYXRlWCxcbiAgICAgICAgdG9wOiAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRZICsgcG9zLnRvcCArIHRyYW5zLnRyYW5zbGF0ZVlcbiAgICB9O1xuICAgIGVuZCA9IHtcbiAgICAgICAgbGVmdDogc3RhcnQubGVmdCArIHcsXG4gICAgICAgIHRvcDogc3RhcnQudG9wICsgaFxuICAgIH07XG4gICAgbGVmdCA9IHN0YXJ0LmxlZnQ7XG4gICAgdG9wID0gc3RhcnQudG9wO1xuXG4gICAgZmxvd1RhZyA9IG92ZXJGbG93KHBhcmVudCwge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9KTtcbiAgICBzd2l0Y2ggKGZsb3dUYWcpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodyA8IHBhcmVudC5jbGllbnRXaWR0aCkge1xuICAgICAgICBsZWZ0ID0gcG9zLmxlZnQgLSAodHJhbnMuc2NhbGVYIC0gMSkgKiBub2RlLmNsaWVudFdpZHRoIC8gMjtcbiAgICB9XG4gICAgaWYgKGggPCBwYXJlbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIHRvcCA9IHBvcy50b3AgLSAodHJhbnMuc2NhbGVYIC0gMSkgKiBub2RlLmNsaWVudEhlaWdodCAvIDI7XG4gICAgfVxuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIxMDBtc1wiO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUodHJhbnMudHJhbnNsYXRlWCArIGxlZnQgLSBzdGFydC5sZWZ0LCB0cmFucy50cmFuc2xhdGVZICsgdG9wIC0gc3RhcnQudG9wLCAwLCB0cmFucy5zY2FsZVgpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0SGFuZGxlcjogc3RhcnRIYW5kbGVyLFxuICAgIG1vdmVIYW5kbGVyOiBtb3ZlSGFuZGxlcixcbiAgICBlbmRIYW5kbGVyOiBlbmRIYW5kbGVyLFxuICAgIGluaXRab29tOmluaXRab29tXG59O1xuIl19
