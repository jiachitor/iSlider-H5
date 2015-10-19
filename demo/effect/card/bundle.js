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
    animateType: 'card',
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
                    this.slideIndex = this.slideIndex;
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
                animateFunc.call(this, els[i], this.axis, this.scale, i, 0);
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
    'yrks': function fade(dom, axis, scale, i, offset) {
        dom.cur = 2;

        if (offset > 0) {
            dom.style.visibility = i > 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.cur = 1;
                dom.style.opacity = 1 - offset / scale;
            } else {
                dom.style.opacity = offset / scale;
            }
        } else {
            dom.style.visibility = i < 1 ? 'hidden' : 'visible';
            if (i === 1) {
                dom.cur = 1;
                dom.style.opacity = 1 + offset / scale;
            } else {
                dom.style.opacity = -offset / scale;
            }
        }

        var zoomScale = dom.cur === 1 ? 1 : 2;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0)';
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvZGVtby9lZmZlY3QvY2FyZC9tYWluLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyX2NvcmUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl9hbmltYXRlLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfYnV0dG9uLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfZG90LmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfem9vbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7NEJDQW9CLHlCQUF5Qjs7OztBQUU3QyxJQUFJLElBQUksR0FBRzs7QUFFUDtBQUNJLFdBQU8sRUFBRSxvQkFBb0I7Q0FDaEM7O0FBRUQ7QUFDSSxXQUFPLEVBQUUsNkVBQTZFO0NBQ3pGOztBQUVEO0FBQ0ksV0FBTyxFQUFFLENBQUMsWUFBWTtBQUNsQixZQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0FBQzFCLFdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLHdDQUF3QyxDQUFDO0FBQzdELGVBQU8sR0FBRyxDQUFDO0tBQ2QsQ0FBQSxFQUFHO0NBQ1A7O0FBRUQ7QUFDSSxX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QUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM5QixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxDQUFDO0FBQ0YsZ0JBQUksR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztBQUM1QixrQkFBTTtBQUFBLEtBQ2I7QUFDRCxRQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3hCLFlBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztLQUMvRDtBQUNELFFBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUU7QUFDekIsV0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQSxHQUFJLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO0tBQzlEO0FBQ0QsUUFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUM7QUFDOUMsUUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FFN0k7O0FBRUQsTUFBTSxDQUFDLE9BQU8sR0FBRztBQUNiLGdCQUFZLEVBQUUsWUFBWTtBQUMxQixlQUFXLEVBQUUsV0FBVztBQUN4QixjQUFVLEVBQUUsVUFBVTtBQUN0QixZQUFRLEVBQUMsUUFBUTtDQUNwQixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCBpU2xpZGVyIGZyb20gJy4uLy4uLy4uL3NyYy9pc2xpZGVyLmpzJztcblxudmFyIGxpc3QgPSBbXG4gICAgLy8gcGljdHVyZVxuICAgIHtcbiAgICAgICAgY29udGVudDogJy4uL2ltZ3MvZmxpcC8wLmpwZydcbiAgICB9LFxuICAgIC8vIEhUTUwgU3RyaW5nXG4gICAge1xuICAgICAgICBjb250ZW50OiAnPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTo0ZW07Y29sb3I6d2hpdGU7dGV4dC1hbGlnbjogY2VudGVyXCI+SFRNTCBTdHJpbmc8L2Rpdj4nXG4gICAgfSxcbiAgICAvLyBlbGVtZW50XG4gICAge1xuICAgICAgICBjb250ZW50OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZG9tLmlubmVySFRNTCA9ICdFbGVtZW50JztcbiAgICAgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZTozZW07Y29sb3I6cmdiKDIzMCwgMjMwLCA2Myk7JztcbiAgICAgICAgICAgIHJldHVybiBkb207XG4gICAgICAgIH0pKClcbiAgICB9LFxuICAgIC8vIGZyYWdtZW50XG4gICAge1xuICAgICAgICBjb250ZW50OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICB2YXIgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBkb20uaW5uZXJIVE1MID0gJ0ZyYWdtZW50JztcbiAgICAgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZTozZW07Y29sb3I6cmdiKDIzMCwgNjMsIDIzMCk7JztcbiAgICAgICAgICAgIGZyYWcuYXBwZW5kQ2hpbGQoZG9tKTtcbiAgICAgICAgICAgIHJldHVybiBmcmFnO1xuICAgICAgICB9KSgpXG4gICAgfSxcbiAgICAvLyBkb21cbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoaWRkZW4tc3BhY2UgPiBwJylcbiAgICB9XG5dO1xuXG52YXIgUyA9IG5ldyBpU2xpZGVyKHtcbiAgICBkb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpU2xpZGVyLXdyYXBwZXInKSxcbiAgICBkYXRhOiBsaXN0LFxuICAgIGlzVmVydGljYWw6IHRydWUsXG4gICAgaXNMb29waW5nOiAxLFxuICAgIGlzT3ZlcnNwcmVhZDogMSxcbiAgICBhbmltYXRlVGltZTogODAwLFxuICAgIGFuaW1hdGVUeXBlOiAnY2FyZCcsXG4gICAgcGx1Z2luczogW1snem9vbXBpYycsIHtjdXJyZW50U2NhbGU6MSx6b29tRmFjdG9yOiAyfV1dLFxufSk7XG5cblxuXG5cblxuXG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyQ29yZSBmcm9tICcuL2lzbGlkZXJfY29yZS5qcyc7XG5pbXBvcnQgQnV0dG9uIGZyb20gJy4vcGx1Z2lucy9pc2xpZGVyX2J1dHRvbi5qcyc7XG5pbXBvcnQgRG90IGZyb20gJy4vcGx1Z2lucy9pc2xpZGVyX2RvdC5qcyc7XG5pbXBvcnQgWm9vbSBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl96b29tLmpzJztcblxuY2xhc3MgaVNsaWRlciBleHRlbmRzIGlTbGlkZXJDb3JlIHtcbiAgICBjb25zdHJ1Y3RvciguLi5vcHRzKSB7XG4gICAgICAgIC8v55u05o6l6LCD55So54i257G75p6E6YCg5Zmo6L+b6KGM5Yid5aeL5YyWXG4gICAgICAgIHN1cGVyKC4uLm9wdHMpO1xuXG4gICAgICAgIC8v5re75YqgIHpvb20g5o+S5Lu277yM5rOo5oSP5Lul5LiL5Luj56CB5b+F6aG76KaBXG4gICAgICAgIHZhciBzdGFydEhhbmRsZXJPcmlnaW5hbCA9IHRoaXMuc3RhcnRIYW5kbGVyO1xuICAgICAgICB2YXIgZW5kSGFuZGxlck9yaWdpbmFsID0gdGhpcy5lbmRIYW5kbGVyO1xuICAgICAgICB2YXIgbW92ZUhhbmRsZXJPcmlnaW5hbCA9IHRoaXMubW92ZUhhbmRsZXI7XG5cbiAgICAgICAgdGhpcy5yZWdQbHVnaW4oJ2J1dHRvbicsQnV0dG9uKTtcbiAgICAgICAgdGhpcy5yZWdQbHVnaW4oJ2RvdCcsRG90KTtcbiAgICAgICAgdGhpcy5yZWdQbHVnaW4oJ3pvb21waWMnLCBmdW5jdGlvbih6b29tT3B0cyl7XG4gICAgICAgICAgICBab29tLmluaXRab29tKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50U2NhbGU6em9vbU9wdHMuY3VycmVudFNjYWxlIHx8IDEsXG4gICAgICAgICAgICAgICAgem9vbUZhY3Rvcjp6b29tT3B0cy56b29tRmFjdG9yIHx8IDIsXG4gICAgICAgICAgICAgICAgZXh0ZW5kRnVuY3Rpb246e1xuICAgICAgICAgICAgICAgICAgICAnc3RhcnRIYW5kbGVyT3JpZ2luYWwnOnN0YXJ0SGFuZGxlck9yaWdpbmFsLFxuICAgICAgICAgICAgICAgICAgICAnZW5kSGFuZGxlck9yaWdpbmFsJzplbmRIYW5kbGVyT3JpZ2luYWwsXG4gICAgICAgICAgICAgICAgICAgICdtb3ZlSGFuZGxlck9yaWdpbmFsJzptb3ZlSGFuZGxlck9yaWdpbmFsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnaW5pdGlhbGl6ZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJXcmFwcGVyKCk7XG4gICAgICAgIHRoaXMuX2luaXRQbHVnaW5zKCk7XG4gICAgICAgIHRoaXMuX2JpbmRIYW5kbGVyKCk7XG5cbiAgICAgICAgdGhpcy5leHRlbmQoe1xuICAgICAgICAgICAgc3RhcnRIYW5kbGVyOiBab29tLnN0YXJ0SGFuZGxlcixcbiAgICAgICAgICAgIG1vdmVIYW5kbGVyOiBab29tLm1vdmVIYW5kbGVyLFxuICAgICAgICAgICAgZW5kSGFuZGxlcjogWm9vbS5lbmRIYW5kbGVyXG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpU2xpZGVyO1xuIiwiLyoqXG4gKiBAZmlsZSAgIGlTbGlkZXIsIGEgc2ltcGxlLCBlZmZpY2VudCBtb2JpbGUgc2xpZGVyIHNvbHV0aW9uXG4gKlxuICogQGF1dGhvciBCRUZFXG4gKiBDb250YWN0IHFiYXR5LnFpQGdtYWlsLmNvbVxuICpcbiAqIExJQ0VOU0VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9CRS1GRS9pU2xpZGVyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0cyAgICAgICAgICAgICAgICDlj4LmlbDpm4ZcbiAqIEBwYXJhbSB7RWxlbWVudH0gICAgIG9wdHMuZG9tICAgICAgICAgICAg5aSW5bGC5YWD57SgICAgICAgICBPdXRlciB3cmFwcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gICAgICBvcHRzLmRhdGEgICAgICAgICAgIOaVsOaNruWIl+ihqCAgICAgICAgQ29udGVudCBkYXRhXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IEFuaW1hdGlvbiBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl9hbmltYXRlLmpzJztcblxuLyoqXG4gKiBDaGVjayBpbiBhcnJheVxuICogQHBhcmFtIG9FbGVtZW50XG4gKiBAcGFyYW0gYVNvdXJjZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGluQXJyYXkob0VsZW1lbnQsIGFTb3VyY2UpIHtcbiAgICByZXR1cm4gYVNvdXJjZS5pbmRleE9mKG9FbGVtZW50KSA+IC0xO1xufVxuXG4vKipcbiAqIENoZWNrIGlzIGFycmF5XG4gKiBAcGFyYW0gb1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkobykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59XG5cbi8qKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGNsc1xuICogQHJldHVybnMge0FycmF5fHtpbmRleDogbnVtYmVyLCBpbnB1dDogc3RyaW5nfX1cbiAqL1xuZnVuY3Rpb24gaGFzQ2xhc3Mob2JqLCBjbHMpIHtcbiAgICByZXR1cm4gb2JqLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgY2xzICsgJyhcXFxcc3wkKScpKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY2xzXG4gKi9cbmZ1bmN0aW9uIGFkZENsYXNzKG9iaiwgY2xzKSB7XG4gICAgaWYgKCFoYXNDbGFzcyhvYmosIGNscykpIHtcbiAgICAgICAgb2JqLmNsYXNzTmFtZSArPSAnICcgKyBjbHM7XG4gICAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjbHNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQ2xhc3Mob2JqLCBjbHMpIHtcbiAgICBpZiAoaGFzQ2xhc3Mob2JqLCBjbHMpKSB7XG4gICAgICAgIG9iai5jbGFzc05hbWUgPSBvYmouY2xhc3NOYW1lLnJlcGxhY2UoUmVnRXhwKCcoXFxcXHN8XiknICsgY2xzICsgJyhcXFxcc3wkKScpLCAnJyk7XG4gICAgfVxufVxuXG4vKipcbiAqIENoZWNjayBpcyB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1VybCh1cmwpIHtcbiAgICBpZiAoLzxcXC8/W14+XSo+L2cudGVzdCh1cmwpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBsZXQgcmVnZXggPSAnXicgK1xuICAgICAgICAnKCgoaHR0cHN8aHR0cHxmdHB8cnRzcHxtbXMpOik/Ly8pPycgK1xuICAgICAgICAnKChbMC05YS16XyF+KlxcJygpLiY9KyQlLV0rOiApP1swLTlhLXpfIX4qXFwnKCkuJj0rJCUtXStAKT8nICtcbiAgICAgICAgJygoWzAtOV17MSwzfS4pezN9WzAtOV17MSwzfXwoWzAtOWEtel8hfipcXCcoKS1dKy4pKihbMC05YS16XVswLTlhLXotXXswLDYxfSk/WzAtOWEtel0uW2Etel17Miw2fSk/JyArXG4gICAgICAgICcoOlswLTldezEsNH0pPycgK1xuICAgICAgICAnKFteXFw/I10rKT8nICtcbiAgICAgICAgJyhcXFxcXFw/W14jXSspPycgK1xuICAgICAgICAnKCMuKyk/JyArXG4gICAgICAgICckJztcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCkudGVzdCh1cmwpO1xufVxuXG5cbi8qKlxuICogQGNvbnN0cnVjdG9yXG4gKlxuICogaVNsaWNlcihbW3tFbGVtZW50fSBjb250YWluZXIsXSB7QXJyYXl9IGRhdGFsaXN0LF0ge29iamVjdH0gb3B0aW9ucylcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lclxuICogQHBhcmFtIHtBcnJheX0gZGF0YWxpc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiAgb3B0aW9ucy5kb20gPiBjb250YWluZXJcbiAqICBvcHRpb25zLmRhdGEgPiBkYXRhbGlzdFxuICovXG5jbGFzcyBpU2xpZGVyQ29yZSB7XG4gICAgLy9FUzbkuK3mlrDlnovmnoTpgKDlmahcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIDMpO1xuICAgICAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlcnMgcmVxdWlyZWQhJyk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IG9wdHMgPSBhcmdzLnBvcCgpO1xuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgb3B0cy5kYXRhID0gb3B0cy5kYXRhIHx8IGFyZ3NbMV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgb3B0cy5kb20gPSBvcHRzLmRvbSB8fCBhcmdzWzBdO1xuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdHMuZG9tKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRhaW5lciBjYW4gbm90IGJlIGVtcHR5IScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRzLmRhdGEgfHwgIW9wdHMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGF0YSBtdXN0IGJlIGFuIGFycmF5IGFuZCBtdXN0IGhhdmUgbW9yZSB0aGFuIG9uZSBlbGVtZW50IScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV2ZW50IHdoaXRlIGxpc3RcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkVWRU5UUyA9ICdpbml0aWFsaXplIHNsaWRlIHNsaWRlU3RhcnQgc2xpZGVFbmQgc2xpZGVDaGFuZ2Ugc2xpZGVDaGFuZ2VkIHNsaWRlUmVzdG9yZSBzbGlkZVJlc3RvcmVkIHJlbG9hZERhdGEgZGVzdHJveScuc3BsaXQoJyAnKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRWFzaW5nIHdoaXRlIGxpc3RcbiAgICAgICAgICogQHR5cGUgW0FycmF5LCBSZWdFeHBbXV1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5FQVNJTkcgPSBbXG4gICAgICAgICAgICAnbGluZWFyIGVhc2UgZWFzZS1pbiBlYXNlLW91dCBlYXNlLWluLW91dCcuc3BsaXQoJyAnKSxcbiAgICAgICAgICAgIC9jdWJpYy1iZXppZXJcXCgoW15cXGRdKihcXGQrLj9cXGQqKVteXFwsXSpcXCw/KXs0fVxcKS9cbiAgICAgICAgXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVEFHUyB3aGl0ZWxpc3Qgb24gZml4cGFnZSBtb2RlXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5GSVhfUEFHRV9UQUdTID0gJ1NFTEVDVCBJTlBVVCBURVhUQVJFQSBCVVRUT04gTEFCRUwnLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBsdWdpbnNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSB7fTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcHRpb25zXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vcHRzID0gb3B0cztcbiAgICAgICAgb3B0cyA9IGFyZ3MgPSBudWxsO1xuXG4gICAgICAgIHRoaXMuX3RyYW5zaXRpb25FbmRFdmVudCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBlbXB0eSBmdW5jdGlvblxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgRU1QVFlfRlVOQ1RJT04oKSB7XG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRlbmRcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZXh0ZW5kKCkge1xuICAgICAgICBsZXQgbWFpbiwgZXh0ZW5kLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbWFpbiA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZXh0ZW5kID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICBtYWluID0gYXJnc1swXTtcbiAgICAgICAgICAgICAgICBleHRlbmQgPSBhcmdzWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChsZXQgcHJvcGVydHkgaW4gZXh0ZW5kKSB7XG4gICAgICAgICAgICBpZiAoZXh0ZW5kLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIG1haW5bcHJvcGVydHldID0gZXh0ZW5kW3Byb3BlcnR5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSBuYW1lXG4gICAgICogQHBhcmFtIHBsdWdpblxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICByZWdQbHVnaW4obmFtZSwgcGx1Z2luKSB7XG4gICAgICAgIHRoaXMucGx1Z2luc1tuYW1lXSA9IHRoaXMucGx1Z2luc1tuYW1lXSB8fCBwbHVnaW47XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF90cmFuc2l0aW9uRW5kRXZlbnQoKSB7XG4gICAgICAgIGxldCBldnROYW1lO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGV2dE5hbWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZXZ0TmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VFbGVtZW50Jyk7XG4gICAgICAgICAgICBsZXQgdHJhbnNpdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICAgICAgIE9UcmFuc2l0aW9uOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICAgICAgICAgICAgIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICBXZWJraXRUcmFuc2l0aW9uOiAnd2Via2l0VHJhbnNpdGlvbkVuZCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCB0IGluIHRyYW5zaXRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25zLmhhc093blByb3BlcnR5KHQpICYmIGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChldnROYW1lID0gdHJhbnNpdGlvbnNbdF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5jbGFzcyBpU2xpZGVyUHJvdG90eXBlIGV4dGVuZHMgaVNsaWRlckNvcmUge1xuICAgIGNvbnN0cnVjdG9yKC4uLm9wdHMpIHtcbiAgICAgICAgLy/nm7TmjqXosIPnlKjniLbnsbvmnoTpgKDlmajov5vooYzliJ3lp4vljJZcbiAgICAgICAgc3VwZXIoLi4ub3B0cyk7XG4gICAgICAgIHRoaXMuX3NldHRpbmcoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBzZXR0aW5nIHBhcmFtZXRlcnMgZm9yIHNsaWRlclxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NldHRpbmcoKSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBwbHVnaW5zXG4gICAgICAgICAqIEB0eXBlIHtBcnJheXx7fXwqfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fcGx1Z2lucyA9IHRoaXMucGx1Z2lucztcblxuICAgICAgICAvKipcbiAgICAgICAgICpcbiAgICAgICAgICogQHR5cGUge3tkZWZhdWx0OiBGdW5jdGlvbn18Kn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jcyA9IHRoaXMuX2FuaW1hdGVGdW5jcztcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmxvY2tpbmcgPSBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogbGlzdGVuZXJcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fTFNOID0ge307XG5cbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gLSBTZXQgb3B0aW9uc1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuX29wdHM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvbSBlbGVtZW50IHdyYXBwaW5nIGNvbnRlbnRcbiAgICAgICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3JhcCA9IG9wdHMuZG9tO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEYXRhIGxpc3RcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRhdGEgPSBvcHRzLmRhdGE7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRlZmF1bHQgc2xpZGUgZGlyZWN0aW9uXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzVmVydGljYWwgPSBvcHRzLmlzVmVydGljYWwgfHwgZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE92ZXJzcHJlYWQgbW9kZVxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc092ZXJzcHJlYWQgPSBvcHRzLmlzT3ZlcnNwcmVhZCB8fCBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogUGxheSB0aW1lIGdhcFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCAyMDAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzdGFydCBmcm9tIGluaXRJbmRleCBvciAwXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5pdEluZGV4ID0gb3B0cy5pbml0SW5kZXggPiAwICYmIG9wdHMuaW5pdEluZGV4IDwgb3B0cy5kYXRhLmxlbmd0aCAtIDEgPyBvcHRzLmluaXRJbmRleCA6IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHRvdWNoc3RhcnQgcHJldmVudCBkZWZhdWx0IHRvIGZpeFBhZ2VcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZml4UGFnZSA9IG9wdHMuZml4UGFnZSB8fCB0cnVlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzbGlkZUluZGV4XG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSB0aGlzLnNsaWRlSW5kZXggfHwgdGhpcy5pbml0SW5kZXggfHwgMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQXhpc1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmF4aXMgPSB0aGlzLmlzVmVydGljYWwgPyAnWScgOiAnWCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJldmVyc2VBeGlzXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnJldmVyc2VBeGlzID0gdGhpcy5heGlzID09PSAnWScgPyAnWCcgOiAnWSc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBwZXIgd2lkdGhcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud2lkdGggPSB0aGlzLndyYXAuY2xpZW50V2lkdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFdyYXBwZXIgaGVpZ2h0XG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmhlaWdodCA9IHRoaXMud3JhcC5jbGllbnRIZWlnaHQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJhdGlvIGhlaWdodDp3aWR0aFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yYXRpbyA9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2NhbGUsIHNpemUgcnVsZVxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zY2FsZSA9IHRoaXMuaXNWZXJ0aWNhbCA/IHRoaXMuaGVpZ2h0IDogdGhpcy53aWR0aDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT24gc2xpZGUgb2Zmc2V0IHBvc2l0aW9uXG4gICAgICAgICAqIEB0eXBlIHt7WDogbnVtYmVyLCBZOiBudW1iZXJ9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vZmZzZXQgPSB0aGlzLm9mZnNldCB8fCB7WDogMCwgWTogMH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogbG9vcGluZyBsb2dpYyBhZGp1c3RcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzTG9vcGluZyA9IHRoaXMuZGF0YS5sZW5ndGggPiAxICYmIG9wdHMuaXNMb29waW5nID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhdXRvcGxheSBsb2dpYyBhZGp1c3RcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgPSB0aGlzLmRhdGEubGVuZ3RoID4gMSAmJiBvcHRzLmlzQXV0b3BsYXkgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgLy8gbGl0dGxlIHRyaWNrIHNldCwgd2hlbiB5b3UgY2hvb2NlIHRlYXIgJiB2ZXJ0aWNhbCBzYW1lIHRpbWVcbiAgICAgICAgLy8gaVNsaWRlciBvdmVyc3ByZWFkIG1vZGUgd2lsbCBiZSBzZXQgdHJ1ZSBhdXRvbWV0aWNseVxuICAgICAgICBpZiAob3B0cy5hbmltYXRlVHlwZSA9PT0gJ2NhcmQnICYmIHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgdGhpcy5pc092ZXJzcHJlYWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlYnVnIG1vZGVcbiAgICAgICAgICogQHR5cGUge2Z1bmN0aW9ufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2cgPSBvcHRzLmlzRGVidWcgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBnbG9iYWwuY29uc29sZS5sb2cuYXBwbHkoZ2xvYmFsLmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gOiB0aGlzLkVNUFRZX0ZVTkNUSU9OO1xuXG4gICAgICAgIC8vIHNldCBEYW1waW5nIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX3NldFVwRGFtcGluZygpO1xuXG4gICAgICAgIC8vIHN0b3AgYXV0b3BsYXkgd2hlbiB3aW5kb3cgYmx1clxuICAgICAgICAvLyB0aGlzLl9zZXRQbGF5V2hlbkZvY3VzKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFuaW1hdGlvbiBwYXJtYXM6XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gICAgICBkb20gICAgICAgICAgICAg5Zu+54mH55qE5aSW5bGCPGxpPuWuueWZqCAgICAgICBJbWcgd3JhcHBlclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgYXhpcyAgICAgICAgICAgIOWKqOeUu+aWueWQkSAgICAgICAgICAgICAgICBhbmltYXRlIGRpcmVjdGlvblxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgc2NhbGUgICAgICAgICAgIOWuueWZqOWuveW6piAgICAgICAgICAgICAgICBPdXRlciB3cmFwcGVyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICBpICAgICAgICAgICAgICAgPGxpPuWuueWZqGluZGV4ICAgICAgICAgIEltZyB3cmFwcGVyJ3MgaW5kZXhcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIG9mZnNldCAgICAgICAgICDmu5Hliqjot53nprsgICAgICAgICAgICAgICAgbW92ZSBkaXN0YW5jZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hbmltYXRlRnVuY3MgPSB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX2FuaW1hdGVGdW5jcywgQW5pbWF0aW9uKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuY3Nbb3B0cy5hbmltYXRlVHlwZSBpbiB0aGlzLl9hbmltYXRlRnVuY3MgPyBvcHRzLmFuaW1hdGVUeXBlIDogJ2RlZmF1bHQnXTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW5pbWF0ZSBwcm9jZXNzIHRpbWUgKG1zKSwgZGVmYXVsdDogMzAwbXNcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hbmltYXRlVGltZSA9IG9wdHMuYW5pbWF0ZVRpbWUgIT0gbnVsbCAmJiBvcHRzLmFuaW1hdGVUaW1lID4gLTEgPyBvcHRzLmFuaW1hdGVUaW1lIDogMzAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbmltYXRlIGVmZmVjdHMsIGRlZmF1bHQ6IGVhc2VcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5hbmltYXRlRWFzaW5nID1cbiAgICAgICAgICAgIGluQXJyYXkob3B0cy5hbmltYXRlRWFzaW5nLCB0aGlzLkVBU0lOR1swXSlcbiAgICAgICAgICAgIHx8IHRoaXMuRUFTSU5HWzFdLnRlc3Qob3B0cy5hbmltYXRlRWFzaW5nKVxuICAgICAgICAgICAgICAgID8gb3B0cy5hbmltYXRlRWFzaW5nXG4gICAgICAgICAgICAgICAgOiAnZWFzZSc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluIHNsaWRlIGFuaW1hdGlvblxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pbkFuaW1hdGUgPSAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBGaXggdG91Y2gvbW91c2UgZXZlbnRzXG4gICAgICAgICAqIEB0eXBlIHt7aGFzVG91Y2gsIHN0YXJ0RXZ0LCBtb3ZlRXZ0LCBlbmRFdnR9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kZXZpY2VFdmVudHMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgbGV0IGhhc1RvdWNoID0gISEoKCdvbnRvdWNoc3RhcnQnIGluIGdsb2JhbCkgfHwgZ2xvYmFsLkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBnbG9iYWwuRG9jdW1lbnRUb3VjaCk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGhhc1RvdWNoOiBoYXNUb3VjaCxcbiAgICAgICAgICAgICAgICBzdGFydEV2dDogaGFzVG91Y2ggPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgICAgICBtb3ZlRXZ0OiBoYXNUb3VjaCA/ICd0b3VjaG1vdmUnIDogJ21vdXNlbW92ZScsXG4gICAgICAgICAgICAgICAgZW5kRXZ0OiBoYXNUb3VjaCA/ICd0b3VjaGVuZCcgOiAnbW91c2V1cCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5pdCBldmVudHNcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ldmVudHMgPSB7fVxuXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0gUmVnaXN0ZXIgZXZlbnRzXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB5b3VyIGZpbmdlciBpcyBtb3ZpbmdcbiAgICAgICAgdGhpcy5vbignc2xpZGUnLCBvcHRzLm9uc2xpZGUpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgdG91Y2ggdGhlIHNjcmVlblxuICAgICAgICB0aGlzLm9uKCdzbGlkZVN0YXJ0Jywgb3B0cy5vbnNsaWRlc3RhcnQpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGZpbmdlciBtb3ZlIG91dCBvZiB0aGUgc2NyZWVuXG4gICAgICAgIHRoaXMub24oJ3NsaWRlRW5kJywgb3B0cy5vbnNsaWRlZW5kKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHNsaWRlIHRvIG5leHQvcHJldiBzY2VuZVxuICAgICAgICB0aGlzLm9uKCdzbGlkZUNoYW5nZScsIG9wdHMub25zbGlkZWNoYW5nZSk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBuZXh0L3ByZXYgc2NlbmUsIHdoaWxlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICAgIHRoaXMub24oJ3NsaWRlQ2hhbmdlZCcsIG9wdHMub25zbGlkZWNoYW5nZWQpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gcmVzdG9yZSB0byB0aGUgY3VycmVudCBzY2VuZVxuICAgICAgICB0aGlzLm9uKCdzbGlkZVJlc3RvcmUnLCBvcHRzLm9uc2xpZGVyZXN0b3JlKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHJlc3RvcmUgdG8gdGhlIGN1cnJlbnQgc2NlbmUsIHdoaWxlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICAgIHRoaXMub24oJ3NsaWRlUmVzdG9yZWQnLCBvcHRzLm9uc2xpZGVyZXN0b3JlZCk7XG5cbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gLSBQbHVnaW5zXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBsdWdpbkNvbmZpZyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoaXNBcnJheShvcHRzLnBsdWdpbnMpKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNvbmZpZyA9IHt9XG4gICAgICAgICAgICAgICAgb3B0cy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gcGx1Z2luQ29uZmlnRWFjaChwbHVnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnW3BsdWdpblswXV0gPSBwbHVnaW4uc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1twbHVnaW5dID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuICAgICAgICAvLyBBdXRvcGxheSBtb2RlXG4gICAgICAgIGlmICh0aGlzLmlzQXV0b3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5pdCBwbHVnaW5zXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaW5pdFBsdWdpbnMoKSB7XG4gICAgICAgIGxldCBjb25maWcgPSB0aGlzLnBsdWdpbkNvbmZpZztcbiAgICAgICAgbGV0IHBsdWdpbnMgPSB0aGlzLl9wbHVnaW5zO1xuICAgICAgICBmb3IgKGxldCBpIGluIGNvbmZpZykge1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBwbHVnaW5zLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ1tJTklUIFBMVUdJTl06JywgaSwgcGx1Z2luc1tpXSk7XG4gICAgICAgICAgICAgICAgcGx1Z2luc1tpXVxuICAgICAgICAgICAgICAgICYmIHR5cGVvZiBwbHVnaW5zW2ldID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgJiYgdHlwZW9mIHBsdWdpbnNbaV0uYXBwbHlcbiAgICAgICAgICAgICAgICAmJiBwbHVnaW5zW2ldLmFwcGx5KHRoaXMsIGNvbmZpZ1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBlbmFibGUgZGFtcGluZyB3aGVuIHNsaWRlciBtZWV0IHRoZSBlZGdlXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2V0VXBEYW1waW5nKCkge1xuICAgICAgICBsZXQgb25lSW4yID0gdGhpcy5zY2FsZSA+PiAxO1xuICAgICAgICBsZXQgb25lSW40ID0gb25lSW4yID4+IDE7XG4gICAgICAgIGxldCBvbmVJbjE2ID0gb25lSW40ID4+IDI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXQgZGFtcGluZyBmdW5jdGlvblxuICAgICAgICAgKiBAcGFyYW0gZGlzdGFuY2VcbiAgICAgICAgICogQHJldHVybnMgeyp9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9kYW1waW5nID0gZnVuY3Rpb24gKGRpc3RhbmNlKSB7XG4gICAgICAgICAgICBsZXQgZGlzID0gTWF0aC5hYnMoZGlzdGFuY2UpO1xuICAgICAgICAgICAgbGV0IHJlc3VsdDtcblxuICAgICAgICAgICAgaWYgKGRpcyA8IG9uZUluMikge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRpcyA+PiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlzIDwgb25lSW4yICsgb25lSW40KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgKChkaXMgLSBvbmVJbjIpID4+IDIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgb25lSW4xNiArICgoZGlzIC0gb25lSW4yIC0gb25lSW40KSA+PiAzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGRpc3RhbmNlID4gMCA/IHJlc3VsdCA6IC1yZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgaXRlbSB0eXBlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGluZGV4XG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9pdGVtVHlwZShpdGVtKSB7XG4gICAgICAgIGlmICghaXNOYU4oaXRlbSkpIHtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbaXRlbV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0udHlwZTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY29udGVudCA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgbGV0IHR5cGU7XG4gICAgICAgIGlmIChjb250ZW50ID09IG51bGwpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnZW1wdHknO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKEJvb2xlYW4oY29udGVudC5ub2RlTmFtZSkgJiYgQm9vbGVhbihjb250ZW50Lm5vZGVUeXBlKSkge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAnbm9kZSc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmIChpc1VybChjb250ZW50KSkge1xuICAgICAgICAgICAgICAgICAgICB0eXBlID0gJ3BpYyc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdodG1sJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAndW5rbm93bic7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLnR5cGUgPSB0eXBlO1xuXG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbmRlciBzaW5nbGUgaXRlbSBodG1sIGJ5IGlkeFxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC4uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGRhdGFJbmRleCAgLi5cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9yZW5kZXJJdGVtKGVsLCBkYXRhSW5kZXgpIHtcblxuICAgICAgICBsZXQgaXRlbSwgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcblxuICAgICAgICBsZXQgaW5zZXJ0SW1nID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAgICAgICBsZXQgc2ltZyA9ICcgc3JjPVwiJyArIGl0ZW0uY29udGVudCArICdcIic7XG5cbiAgICAgICAgICAgIGlmIChpdGVtLmhlaWdodCAvIGl0ZW0ud2lkdGggPiB0aGlzLnJhdGlvKSB7XG4gICAgICAgICAgICAgICAgc2ltZyArPSAnIGhlaWdodD1cIicgKyBlbC5jbGllbnRIZWlnaHQgKyAnXCInO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzaW1nICs9ICcgd2lkdGg9XCInICsgZWwuY2xpZW50V2lkdGggKyAnXCInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5pc092ZXJzcHJlYWQpIHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgaXRlbS5jb250ZW50ICsgJykgbm8tcmVwZWF0IDUwJSA1MCUvY292ZXInO1xuICAgICAgICAgICAgICAgIHNpbWcgKz0gJyBzdHlsZT1cImRpc3BsYXk6YmxvY2s7b3BhY2l0eTowO2hlaWdodDoxMDAlO3dpZHRoOjEwMCU7XCInXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGVsLmlubmVySFRNTCA9ICc8aW1nJyArIHNpbWcgKyAnIC8+JztcbiAgICAgICAgfVxuICAgICAgICAgICAgLlxuICAgICAgICAgICAgYmluZCh0aGlzKTtcblxuICAgICAgICAvLyBjbGVhbiBzY2VuZVxuICAgICAgICBlbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuXG4gICAgICAgIC8vIGdldCB0aGUgcmlnaHQgaXRlbSBvZiBkYXRhXG4gICAgICAgIGlmICghdGhpcy5pc0xvb3BpbmcgJiYgdGhpcy5kYXRhW2RhdGFJbmRleF0gPT0gbnVsbCkge1xuICAgICAgICAgICAgLy8gU3RvcCBzbGlkZSB3aGVuIGl0ZW0gaXMgZW1wdHlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGFJbmRleCA9IChsZW4gLyogKiBNYXRoLmNlaWwoTWF0aC5hYnMoZGF0YUluZGV4IC8gbGVuKSkqLyArIGRhdGFJbmRleCkgJSBsZW47XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2RhdGFJbmRleF07XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdHlwZSA9IHRoaXMuX2l0ZW1UeXBlKGl0ZW0pO1xuXG4gICAgICAgIHRoaXMubG9nKCdbUmVuZGVyIElURU1dOicsIHR5cGUsIGRhdGFJbmRleCwgaXRlbSk7XG5cbiAgICAgICAgZWwuY2xhc3NOYW1lID0gJ2lzbGlkZXItJyArIHR5cGU7XG5cbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdwaWMnOlxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmhlaWdodCAmJiBpdGVtLndpZHRoKSB7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEltZy5zcmMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWcub25sb2FkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gY3VycmVudEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gY3VycmVudEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGVkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZG9tJzpcbiAgICAgICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgICAgICAgIGVsLmlubmVySFRNTCA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ25vZGUnOlxuICAgICAgICAgICAgY2FzZSAnZWxlbWVudCc6XG4gICAgICAgICAgICAgICAgLy8gZnJhZ21lbnQsIGNyZWF0ZSBjb250YWluZXJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5jb250ZW50Lm5vZGVUeXBlID09PSAxMSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW50aXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGVudGl0eS5hcHBlbmRDaGlsZChpdGVtLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNvbnRlbnQgPSBlbnRpdHk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGl0ZW0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvc3Rwb25pbmcgdGhlIGludGVybWVkaWF0ZSBzY2VuZSByZW5kZXJpbmdcbiAgICAgKiB1bnRpbCB0aGUgdGFyZ2V0IHNjZW5lIGlzIGNvbXBsZXRlbHkgcmVuZGVyZWQgKHJlbmRlciBpbiBldmVudCBzbGlkZUNoYW5nZWQpXG4gICAgICogdG8gYXZvaWQgYSBqdW1weSBmZWVsIHdoZW4gc3dpdGNoaW5nIGJldHdlZW4gc2NlbmVzXG4gICAgICogZ2l2ZW4gdGhhdCB0aGUgZGlzdGFuY2Ugb2Ygc2xpZGluZyBpcyBtb3JlIHRoYW4gMS5cbiAgICAgKiBlLmcuIGBgYHRoaXMuc2xpZGVUbyg+Ky0xKWBgYFxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVuZGVySW50ZXJtZWRpYXRlU2NlbmUoKSB7XG4gICAgICAgIGlmICh0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtLmFwcGx5KHRoaXMsIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lKTtcbiAgICAgICAgICAgIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFwcGx5IHN0eWxlcyBvbiBjaGFuZ2VkXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfY2hhbmdlZFN0eWxlcygpIHtcbiAgICAgICAgbGV0IHNsaWRlU3R5bGVzID0gWydpc2xpZGVyLXByZXYnLCAnaXNsaWRlci1hY3RpdmUnLCAnaXNsaWRlci1uZXh0J107XG4gICAgICAgIHRoaXMuZWxzLmZvckVhY2goZnVuY3Rpb24gY2hhbmdlU3R5cGVFYWNoKGVsLCBpbmRleCkge1xuICAgICAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsICcoJyArIHNsaWRlU3R5bGVzLmpvaW4oJ3wnKSArICcpJyk7XG4gICAgICAgICAgICBhZGRDbGFzcyhlbCwgc2xpZGVTdHlsZXNbaW5kZXhdKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgbGlzdCBodG1sXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVuZGVyV3JhcHBlcigpIHtcbiAgICAgICAgdGhpcy5vdXRlciAmJiAodGhpcy5vdXRlci5pbm5lckhUTUwgPSAnJyk7XG4gICAgICAgIC8vIGluaXRhaWwgdWwgZWxlbWVudFxuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIG91dGVyLmNsYXNzTmFtZSA9ICdpc2xpZGVyLW91dGVyJztcblxuICAgICAgICAvLyBzdG9yYWdlIGxpIGVsZW1lbnRzLCBvbmx5IHN0b3JlIDMgZWxlbWVudHMgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuICAgICAgICB0aGlzLmVscyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIHRoaXMuZWxzLnB1c2gobGkpO1xuXG4gICAgICAgICAgICAvLyBwcmVwYXJlIHN0eWxlIGFuaW1hdGlvblxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMobGksIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCk7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsICYmICh0aGlzLl9vcHRzLmFuaW1hdGVUeXBlID09PSAncm90YXRlJyB8fCB0aGlzLl9vcHRzLmFuaW1hdGVUeXBlID09PSAnZmxpcCcpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShsaSwgMSAtIGkgKyB0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShsaSwgaSAtIDEgKyB0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlZFN0eWxlcygpO1xuXG4gICAgICAgIC8vIFByZWxvYWQgcGljdHVyZSBbIG1heSBiZSBwaWMgOikgXVxuICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9wcmVsb2FkSW1nKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgMjAwKTtcblxuICAgICAgICAvLyBhcHBlbmQgdWwgdG8gZGl2I2NhbnZhc1xuICAgICAgICBpZiAoIXRoaXMub3V0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMub3V0ZXIgPSBvdXRlcjtcbiAgICAgICAgICAgIHRoaXMud3JhcC5hcHBlbmRDaGlsZChvdXRlcik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcmVsb2FkIGltZyB3aGVuIHNsaWRlQ2hhbmdlXG4gICAgICogRnJvbSBjdXJyZW50IGluZGV4ICsyLCAtMiBzY2VuZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggbWVhbnMgd2hpY2ggaW1hZ2Ugd2lsbCBiZSBsb2FkXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcHJlbG9hZEltZyhkYXRhSW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGxldCBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGxldCBsb2FkSW1nID0gZnVuY3Rpb24gcHJlbG9hZEltZ0xvYWRpbmdQcm9jZXNzKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkYXRhW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5faXRlbVR5cGUoaXRlbSkgPT09ICdwaWMnICYmICFpdGVtLmxvYWRlZCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgcHJlbG9hZEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICBwcmVsb2FkSW1nLnNyYyA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZEltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0ud2lkdGggPSBwcmVsb2FkSW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBwcmVsb2FkSW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5sb2FkZWQgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxvYWRJbWcoKGRhdGFJbmRleCArIDIpICUgbGVuKTtcbiAgICAgICAgICAgIGxvYWRJbWcoKGRhdGFJbmRleCAtIDIgKyBsZW4pICUgbGVuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdhdGNoIGV2ZW50IHRyYW5zaXRpb25FbmRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF93YXRjaFRyYW5zaXRpb25FbmQodGltZSwgZXZlbnRUeXBlKSB7XG5cbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuICAgICAgICBsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGxldCBsc247XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDonLCAnd2F0Y2hUcmFuc2l0aW9uRW5kOjpzdHVjazo6cGlsZScsIHRoaXMuaW5BbmltYXRlKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZXZ0KSB7XG4gICAgICAgICAgICBpZiAobHNuKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsLmNsZWFyVGltZW91dChsc24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5pbkFuaW1hdGUtLTtcbiAgICAgICAgICAgIHNlbGYubG9nKCdFdmVudDonLCAnd2F0Y2hUcmFuc2l0aW9uRW5kOjpzdHVjazo6cmVsZWFzZScsIHNlbGYuaW5BbmltYXRlKTtcbiAgICAgICAgICAgIGlmIChzZWxmLmluQW5pbWF0ZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIC8vc2VsZi5pbkFuaW1hdGUgPSAwO1xuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdzbGlkZUNoYW5nZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2NoYW5nZWRTdHlsZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2VsZi5maXJlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHNlbGYuX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1bldhdGNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB1bldhdGNoKCkge1xuICAgICAgICAgICAgc2VsZi5lbHMuZm9yRWFjaChmdW5jdGlvbiB0cmFuc2xhdGlvbkVuZFVud2F0Y2hFYWNoKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihzZWxmLl90cmFuc2l0aW9uRW5kRXZlbnQoKSwgaGFuZGxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgc2VsZi5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRpbWUgPiAwKSB7XG4gICAgICAgICAgICBzZWxmLmVscy5mb3JFYWNoKGZ1bmN0aW9uIHRyYW5zbGF0aW9uRW5kRWxzRWFjaChlbCkge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoc2VsZi5fdHJhbnNpdGlvbkVuZEV2ZW50KCksIGhhbmRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsc24gPSBnbG9iYWwuc2V0VGltZW91dChoYW5kbGUsIHRpbWUpO1xuICAgICAgICBzZWxmLmluQW5pbWF0ZSsrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGJpbmQgYWxsIGV2ZW50IGhhbmRsZXIsIHdoZW4gb24gUEMsIGRpc2FibGUgZHJhZyBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2JpbmRIYW5kbGVyKCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyO1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG5cbiAgICAgICAgaWYgKCFkZXZpY2UuaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIG91dGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgIG91dGVyLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24gKGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5lbmRFdnQsIHRoaXMpO1xuXG4gICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMpO1xuICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcyk7XG5cbiAgICAgICAgLy8gRml4IGFuZHJvaWQgZGV2aWNlXG4gICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMsIGZhbHNlKTtcbiAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIFVuaWZvcm1pdHkgYWRtaW4gZXZlbnRcbiAgICAgKiAgRXZlbnQgcm91dGVyXG4gICAgICogIEBwYXJhbSB7b2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gICAgICogIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldnQpIHtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgICAgICBzd2l0Y2ggKGV2dC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgIGlmICghKGV2dC5idXR0b24gPT09IDAgJiYgZXZ0LmJ1dHRvbnMgPT09IDEpKSBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoc3RhcnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRldmljZS5tb3ZlRXZ0OlxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgZGV2aWNlLmVuZEV2dDpcbiAgICAgICAgICAgIGNhc2UgJ3RvdWNoY2FuY2VsJzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZEhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ29yaWVudGF0aW9uY2hhbmdlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uY2hhbmdlSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3Jlc2l6ZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2hzdGFydCBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhcnRIYW5kbGVyKGV2dCkge1xuICAgICAgICBpZiAodGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5GSVhfUEFHRV9UQUdTLmluZGV4T2YoZXZ0LnRhcmdldC50YWdOYW1lKSA8IDApIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ob2xkaW5nIHx8IHRoaXMubG9ja2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcblxuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IHN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuZmlyZSgnc2xpZGVTdGFydCcsIGV2dCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zdGFydFggPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgICAgICAgdGhpcy5zdGFydFkgPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGV2dC5wYWdlWTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2htb3ZlIGNhbGxiYWNrXG4gICAgICogIEBwYXJhbSB7b2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gICAgICogIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBtb3ZlSGFuZGxlcihldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW92aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBtb3ZpbmcnKTtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgICAgICBsZXQgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgICAgIGxldCByZXZlcnNlQXhpcyA9IHRoaXMucmV2ZXJzZUF4aXM7XG4gICAgICAgIGxldCBvZmZzZXQgPSB7XG4gICAgICAgICAgICBYOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLnN0YXJ0WCkgOiAoZXZ0LnBhZ2VYIC0gdGhpcy5zdGFydFgpLFxuICAgICAgICAgICAgWTogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5zdGFydFkpIDogKGV2dC5wYWdlWSAtIHRoaXMuc3RhcnRZKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vZmZzZXQgPSBvZmZzZXQ7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKG9mZnNldFtheGlzXSkgLSBNYXRoLmFicyhvZmZzZXRbcmV2ZXJzZUF4aXNdKSA+IDEwKSB7XG4gICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgdGhpcy5maXJlKCdzbGlkZScsIGV2dCwgdGhpcyk7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgICAgICBpZiAob2Zmc2V0W2F4aXNdID4gMCAmJiB0aGlzLnNsaWRlSW5kZXggPT09IDAgfHwgb2Zmc2V0W2F4aXNdIDwgMCAmJiB0aGlzLnNsaWRlSW5kZXggPT09IGxlbiAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgb2Zmc2V0W2F4aXNdID0gdGhpcy5fZGFtcGluZyhvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgaXRlbSA9IHRoaXMuZWxzW2ldO1xuICAgICAgICAgICAgICAgIGl0ZW0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgMHMnO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGl0ZW0sIGF4aXMsIHRoaXMuc2NhbGUsIGksIG9mZnNldFtheGlzXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2hlbmQgY2FsbGJhY2tcbiAgICAgKiAgQHBhcmFtIHtPYmplY3R9IGV2dCBldmVudCBvYmplY3RcbiAgICAgKiAgQHByb3RlY3RlZFxuICAgICAqL1xuICAgIGVuZEhhbmRsZXIoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc01vdmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDogZW5kJyk7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICAgICAgbGV0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgICAgICBsZXQgYXhpcyA9IHRoaXMuYXhpcztcbiAgICAgICAgbGV0IGJvdW5kYXJ5ID0gdGhpcy5zY2FsZSAvIDI7XG4gICAgICAgIGxldCBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAgICAgLy8gYSBxdWljayBzbGlkZSB0aW1lIG11c3QgdW5kZXIgMzAwbXNcbiAgICAgICAgLy8gYSBxdWljayBzbGlkZSBzaG91bGQgYWxzbyBzbGlkZSBhdCBsZWFzdCAxNCBweFxuICAgICAgICBib3VuZGFyeSA9IGVuZFRpbWUgLSB0aGlzLnN0YXJ0VGltZSA+IDMwMCA/IGJvdW5kYXJ5IDogMTQ7XG5cbiAgICAgICAgbGV0IGFic09mZnNldCA9IE1hdGguYWJzKG9mZnNldFtheGlzXSk7XG4gICAgICAgIGxldCBhYnNSZXZlcnNlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0W3RoaXMucmV2ZXJzZUF4aXNdKTtcblxuICAgICAgICBsZXQgZ2V0TGluayA9IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICAgICAgICAgIGlmIChlbC5ocmVmKSB7XG4gICAgICAgICAgICAgICAgICAgIGdsb2JhbC5sb2NhdGlvbi5ocmVmID0gZWwuaHJlZlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZWwuY2xhc3NOYW1lICE9PSAnaXNsaWRlci1waWMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZ2V0TGluayhlbC5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmxvZyhib3VuZGFyeSwgb2Zmc2V0W2F4aXNdLCBhYnNPZmZzZXQsIGFic1JldmVyc2VPZmZzZXQsIHRoaXMpO1xuXG4gICAgICAgIGlmIChvZmZzZXRbYXhpc10gPj0gYm91bmRhcnkgJiYgYWJzUmV2ZXJzZU9mZnNldCA8IGFic09mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG9mZnNldFtheGlzXSA8IC1ib3VuZGFyeSAmJiBhYnNSZXZlcnNlT2Zmc2V0IDwgYWJzT2Zmc2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSB0YXAgZXZlbnQgaWYgb2Zmc2V0IDwgMTBcbiAgICAgICAgaWYgKE1hdGguYWJzKHRoaXMub2Zmc2V0LlgpIDwgMTAgJiYgTWF0aC5hYnModGhpcy5vZmZzZXQuWSkgPCAxMCkge1xuICAgICAgICAgICAgdGhpcy50YXBFdnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgICAgIHRoaXMudGFwRXZ0LmluaXRFdmVudCgndGFwJywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnRhcmdldCAmJiBnZXRMaW5rKGV2dC50YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFldnQudGFyZ2V0LmRpc3BhdGNoRXZlbnQodGhpcy50YXBFdnQpKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9mZnNldC5YID0gdGhpcy5vZmZzZXQuWSA9IDA7XG5cbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnc2xpZGVFbmQnLCBldnQsIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBvcmllbnRhdGlvbmNoYW5nZSBjYWxsYmFja1xuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyKCkge1xuICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IG9yaWVudGF0aW9uY2hhbmdlJyk7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgMTAwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXNpemUgY2FsbGJhY2tcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0ICE9PSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0IHx8IHRoaXMud2lkdGggIT09IHRoaXMud3JhcC5jbGllbnRXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5yZXNpemUpO1xuICAgICAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiByZXNpemUnKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9MU04ucmVzaXplICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLnJlc2l6ZSk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIDUwMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgc2xpZGUgbG9naWNhbCwgZ290byBkYXRhIGluZGV4XG4gICAgICogIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggdGhlIGdvdG8gaW5kZXhcbiAgICAgKiAgQHB1YmxpY1xuICAgICAqL1xuICAgIHNsaWRlVG8oZGF0YUluZGV4LCBvcHRzKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVuaG9sZCgpO1xuICAgICAgICBsZXQgYW5pbWF0ZVRpbWUgPSB0aGlzLmFuaW1hdGVUaW1lO1xuICAgICAgICBsZXQgYW5pbWF0ZVR5cGUgPSB0aGlzLl9vcHRzLmFuaW1hdGVUeXBlO1xuICAgICAgICBsZXQgYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuYztcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGxldCBlbHMgPSB0aGlzLmVscztcbiAgICAgICAgbGV0IGlkeCA9IGRhdGFJbmRleDtcbiAgICAgICAgbGV0IG4gPSBkYXRhSW5kZXggLSB0aGlzLnNsaWRlSW5kZXg7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgbGV0IGV2ZW50VHlwZTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5hbmltYXRlVGltZSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZVRpbWUgPSBvcHRzLmFuaW1hdGVUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRzLmFuaW1hdGVUeXBlID09PSAnc3RyaW5nJyAmJiBvcHRzLmFuaW1hdGVUeXBlIGluIHRoaXMuX2FuaW1hdGVGdW5jcykge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVUeXBlID0gb3B0cy5hbmltYXRlVHlwZTtcbiAgICAgICAgICAgICAgICBhbmltYXRlRnVuYyA9IHRoaXMuX2FuaW1hdGVGdW5jc1thbmltYXRlVHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbiB0aGUgc2xpZGUgcHJvY2VzcywgYW5pbWF0ZSB0aW1lIGlzIHNxdWVlemVkXG4gICAgICAgIGxldCBzcXVlZXplVGltZSA9IE1hdGguYWJzKG9mZnNldFt0aGlzLmF4aXNdKSAvIHRoaXMuc2NhbGUgKiBhbmltYXRlVGltZTtcblxuICAgICAgICBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKG4gPiAwID8gdGhpcy5lbHNbMl0gOiB0aGlzLmVsc1swXSwgaWR4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZWxvYWQgd2hlbiBzbGlkZVxuICAgICAgICB0aGlzLl9wcmVsb2FkSW1nKGlkeCk7XG5cbiAgICAgICAgLy8gZ2V0IHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgICAgICBpZiAoZGF0YVtpZHhdKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpZHg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBuID4gMCA/IDAgOiBkYXRhLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSB0aGlzLnNsaWRlSW5kZXg7XG4gICAgICAgICAgICAgICAgbiA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxvZygnSW5kZXg6JyArIHRoaXMuc2xpZGVJbmRleCk7XG5cbiAgICAgICAgLy8ga2VlcCB0aGUgcmlnaHQgb3JkZXIgb2YgaXRlbXNcbiAgICAgICAgbGV0IGhlYWRFbCwgdGFpbEVsLCBzdGVwO1xuXG4gICAgICAgIC8vIHNsaWRlY2hhbmdlIHNob3VsZCByZW5kZXIgbmV3IGl0ZW1cbiAgICAgICAgLy8gYW5kIGNoYW5nZSBuZXcgaXRlbSBzdHlsZSB0byBmaXQgYW5pbWF0aW9uXG4gICAgICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgICAgICAvLyBSZXN0b3JlIHRvIGN1cnJlbnQgc2NlbmVcbiAgICAgICAgICAgIGV2ZW50VHlwZSA9ICdzbGlkZVJlc3RvcmUnO1xuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgICBpZiAoKHRoaXMuaXNWZXJ0aWNhbCAmJiAoYW5pbWF0ZVR5cGUgPT09ICdyb3RhdGUnIHx8IGFuaW1hdGVUeXBlID09PSAnZmxpcCcpKSBeIChuID4gMCkpIHtcbiAgICAgICAgICAgICAgICBlbHMucHVzaChlbHMuc2hpZnQoKSk7XG4gICAgICAgICAgICAgICAgaGVhZEVsID0gZWxzWzJdO1xuICAgICAgICAgICAgICAgIHRhaWxFbCA9IGVsc1swXTtcbiAgICAgICAgICAgICAgICBzdGVwID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVscy51bnNoaWZ0KGVscy5wb3AoKSk7XG4gICAgICAgICAgICAgICAgaGVhZEVsID0gZWxzWzBdO1xuICAgICAgICAgICAgICAgIHRhaWxFbCA9IGVsc1syXTtcbiAgICAgICAgICAgICAgICBzdGVwID0gLTE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChNYXRoLmFicyhuKSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShoZWFkRWwsIGlkeCArIG4pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhuKSA+IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKGhlYWRFbCwgaWR4ICsgc3RlcCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faW50ZXJtZWRpYXRlU2NlbmUgPSBbdGFpbEVsLCBpZHggLSBzdGVwXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGVhZEVsLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnbm9uZSc7XG4gICAgICAgICAgICBoZWFkRWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaGVhZEVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgICAgICAvLyBNaW51cyBzcXVlZXplIHRpbWVcbiAgICAgICAgICAgIHNxdWVlemVUaW1lID0gYW5pbWF0ZVRpbWUgLSBzcXVlZXplVGltZTtcblxuICAgICAgICAgICAgZXZlbnRUeXBlID0gJ3NsaWRlQ2hhbmdlJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZShldmVudFR5cGUsIHRoaXMuc2xpZGVJbmRleCwgZWxzWzFdLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fd2F0Y2hUcmFuc2l0aW9uRW5kKHNxdWVlemVUaW1lLCBldmVudFR5cGUgKyAnZCcsIHRoaXMuc2xpZGVJbmRleCwgZWxzWzFdLCB0aGlzKTtcblxuICAgICAgICAvLyBkbyB0aGUgdHJpY2sgYW5pbWF0aW9uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZWxzW2ldICE9PSBoZWFkRWwpIHtcbiAgICAgICAgICAgICAgICBlbHNbaV0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgJyArIChzcXVlZXplVGltZSAvIDEwMDApICsgJ3MgJyArIHRoaXMuYW5pbWF0ZUVhc2luZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFuaW1hdGVGdW5jLmNhbGwodGhpcywgZWxzW2ldLCB0aGlzLmF4aXMsIHRoaXMuc2NhbGUsIGksIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgbm90IGxvb3BpbmcsIHN0b3AgcGxheWluZyB3aGVuIG1lZXQgdGhlIGVuZCBvZiBkYXRhXG4gICAgICAgIGlmICh0aGlzLmlzQXV0b3BsYXkgJiYgIXRoaXMuaXNMb29waW5nICYmIHRoaXMuc2xpZGVJbmRleCA9PT0gZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbGlkZSB0byBuZXh0IHNjZW5lXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNsaWRlTmV4dCgpIHtcbiAgICAgICAgdGhpcy5zbGlkZVRvLmFwcGx5KHRoaXMsIFt0aGlzLnNsaWRlSW5kZXggKyAxXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNsaWRlIHRvIHByZXZpb3VzIHNjZW5lXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNsaWRlUHJldigpIHtcbiAgICAgICAgdGhpcy5zbGlkZVRvLmFwcGx5KHRoaXMsIFt0aGlzLnNsaWRlSW5kZXggLSAxXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIHBsdWdpbiAocnVuIHRpbWUgbW9kZSlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IHBsdWdpblxuICAgICAqIEBwYXJhbSB7Li4ufVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgIC8qIHJlZ1BsdWdpbigpIHtcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBsZXQgbmFtZSA9IGFyZ3Muc2hpZnQoKSxcbiAgICAgICAgICAgIHBsdWdpbiA9IGFyZ3NbMF07XG5cbiAgICAgICAgaWYgKCF0aGlzLl9wbHVnaW5zLmhhc093blByb3BlcnR5KG5hbWUpICYmIHR5cGVvZiBwbHVnaW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdGhpcy5fcGx1Z2luc1tuYW1lXSA9IHBsdWdpbjtcbiAgICAgICAgICAgIGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF1dG8gZW5hYmxlIGFuZCBpbml0IHBsdWdpbiB3aGVuIGF0IHJ1biB0aW1lXG4gICAgICAgIGlmICghaW5BcnJheShuYW1lLCB0aGlzLl9vcHRzLnBsdWdpbnMpKSB7XG4gICAgICAgICAgICB0aGlzLl9vcHRzLnBsdWdpbnMucHVzaChhcmdzLmxlbmd0aCA/IFtdLmNvbmNhdChbbmFtZV0sIGFyZ3MpIDogbmFtZSk7XG4gICAgICAgICAgICB0eXBlb2YgdGhpcy5fcGx1Z2luc1tuYW1lXSA9PT0gJ2Z1bmN0aW9uJyAmJiB0aGlzLl9wbHVnaW5zW25hbWVdLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgfSovXG5cbiAgICAvKipcbiAgICAgKiAgc2ltcGxlIGV2ZW50IGRlbGVnYXRlIG1ldGhvZFxuICAgICAqICBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZSBldmVudCBuYW1lXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciB0aGUgc2ltcGxlIGNzcyBzZWxlY3RvciBsaWtlIGpRdWVyeVxuICAgICAqICBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBldmVudCBjYWxsYmFja1xuICAgICAqICBAcHVibGljXG4gICAgICovXG4gICAgYmluZChldnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGUpIHtcbiAgICAgICAgICAgIGxldCBldnQgPSBnbG9iYWwuZXZlbnQgPyBnbG9iYWwuZXZlbnQgOiBlO1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgZWxlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZUFycltpXSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGRlbGVnYXRlKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGUoZSkge1xuICAgICAgICAgICAgbGV0IGV2dCA9IGdsb2JhbC5ldmVudCA/IGdsb2JhbC5ldmVudCA6IGU7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBlbGVBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWxlQXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgaGFuZGxlLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVE9ETyB1bmJpbmQsIHVuRGVsZWdhdGVcbiAgICAgKiByZW1vdmUgZXZlbnQgZGVsZWdhdGUgZnJvbSB3cmFwXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVuYmluZChldmVudFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuXG4gICAgfVxuXG4gICAgdW5EZWxlZ2F0ZShldmVudFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVtb3ZlRXZlbnRMaXN0ZW5lciB0byByZWxlYXNlIHRoZSBtZW1vcnlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnZGVzdHJveScpO1xuXG4gICAgICAgIC8vIENsZWFyIGV2ZW50c1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5lbmRFdnQsIHRoaXMpO1xuICAgICAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcyk7XG4gICAgICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG5cbiAgICAgICAgLy8gQ2xlYXIgdGltZXJcbiAgICAgICAgdGhpcy5fTFNOLmZvckVhY2goZnVuY3Rpb24gY2xlYXJUaW1lck9uRGVzdHJveSh0aW1lcikge1xuICAgICAgICAgICAgdGltZXIgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMud3JhcC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBldmVudCBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9uKGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgICBpZiAoaW5BcnJheShldmVudE5hbWUsIHRoaXMuRVZFTlRTKSAmJiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cyA/IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gOiB0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW10pLnB1c2goZnVuYyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgZXZlbnQgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvZmYoZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICAgIGlmIChldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpIHtcbiAgICAgICAgICAgIGxldCBmdW5jcyA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBmdW5jcy5pbmRleE9mKGZ1bmMpO1xuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgZnVuY3NbaW5kZXhdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBldmVudCBjYWxsYmFja3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGZpcmUoZXZlbnROYW1lKSB7XG4gICAgICAgIHRoaXMubG9nKCdbRVZFTlQgRklSRV06JywgZXZlbnROYW1lLCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgICAgICBsZXQgZnVuY3MgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIC8vIFRPRE8gd2lsbCBzdXBwb3J0IGN1c3RvbSBjb250ZXh0LCBub3cgY29udGV4dCBpcyBpbnN0YW5jZSBvZiBpU2xpZGVyXG4gICAgICAgICAgICAgICAgdHlwZW9mIGZ1bmNzW2ldID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgJiYgZnVuY3NbaV0uYXBwbHlcbiAgICAgICAgICAgICAgICAmJiBmdW5jc1tpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlc2V0ICYgcmVyZW5kZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZygpO1xuICAgICAgICB0aGlzLl9yZW5kZXJXcmFwcGVyKCk7XG4gICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZWxvYWQgRGF0YSAmIHJlbmRlclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBsb2FkRGF0YShkYXRhLCBpbml0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpbml0SW5kZXggfHwgMDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgICAgICB0aGlzLmZpcmUoJ3JlbG9hZERhdGEnKTtcbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ICYmIHRoaXMucGxheSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFN0YXJ0IGF1dG9wbGF5XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHBsYXkoKSB7XG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fTFNOLmF1dG9QbGF5ICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLmF1dG9QbGF5KTtcblxuICAgICAgICBmdW5jdGlvbiBwbGF5KCkge1xuICAgICAgICAgICAgc2VsZi5fTFNOLmF1dG9QbGF5ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICBwbGF5KCk7XG4gICAgICAgICAgICB9LCBzZWxmLmR1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBwYXVzZSBhdXRvcGxheVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwYXVzZSgpIHtcbiAgICAgICAgdGhpcy5fTFNOLmF1dG9QbGF5ICYmIGNsZWFyVGltZW91dCh0aGlzLl9MU04uYXV0b1BsYXkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1haW50YWluaW5nIHRoZSBjdXJyZW50IHNjZW5lXG4gICAgICogRGlzYWJsZSB0b3VjaCBldmVudHMsIGV4Y2VwdCBmb3IgdGhlIG5hdGl2ZSBtZXRob2QuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGhvbGQoKSB7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVsZWFzZSBjdXJyZW50IHNjZW5lXG4gICAgICogdW5sb2NrIGF0IHNhbWUgdGltZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bmhvbGQoKSB7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLnVubG9jaygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFlvdSBjYW4ndCBkbyBhbnl0aGluZyBvbiB0aGlzIHNjZW5lXG4gICAgICogbG9jayBuYXRpdmUgbWV0aG9kIGNhbGxzXG4gICAgICogaG9sZCBhdCBzYW1lIHRpbWVcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbG9jaygpIHtcbiAgICAgICAgdGhpcy5ob2xkKCk7XG4gICAgICAgIHRoaXMubG9ja2luZyA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogdW5sb2NrIG5hdGl2ZSBtZXRob2QgY2FsbHNcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5sb2NrKCkge1xuICAgICAgICB0aGlzLmxvY2tpbmcgPSBmYWxzZTtcbiAgICB9XG5cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IGlTbGlkZXJQcm90b3R5cGU7XG4iLCIvKlxuICogQGZpbGUgICBBbmltYXRpb24gTGlicmFyeVxuICogQGF1dGhvciB4aWV5dTMzMzMzXG4gKi9cblxuLyogIOivtOaYju+8mlxuLy9kb20g6KGo56S65Yqo55S755qE5YWD57Sg6IqC54K5XG4vL2F4aXMg6KGo56S65Yqo55S75pa55ZCR77yM5YiG5Yir5Li6IFgg5ZKMIFkg5pa55ZCRXG4vL3NjYWxlIOWxj+W5lemrmOW6plxuLy9pID09IDAg6KGo56S6IGlzbGlkZXItcHJldiwgaSA9PSAxIOihqOekuiBpc2xpZGVyLWFjdGl2ZSwgaSA9PSAyIOihqOekuiBpc2xpZGVyLW5leHQsXG4vL29mZnNldCA+IDAg6KGo56S655qE5piv5ZCR5LiK5oiW5ZCR5Y+z55qE5ruR5Yqo5pa55ZCR77yMb2Zmc2V0IDwgMCDooajnpLrnmoTmmK/lkJHkuIvmiJblkJHlt6bnmoTmu5HliqjmlrnlkJEub2Zmc2V0IOeahOWAvOihqOekuuaJi+aMh+WcqOWxj+W5leS4iua7keWKqOeahOi3neemu++8jOe7neWvueWAvOi2iuWkp+ihqOekuua7keWKqOeahOi3neemu+i2iumVv+OAglxuKiAqL1xuXG5sZXQgZXh0ZW5kQW5pbWF0aW9uID0ge1xuICAgICdyb3RhdGUnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IGJkQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLndyYXAucGFyZW50Tm9kZSwgbnVsbCkuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsgJ1xuICAgICAgICAgICAgKyAnYmFja2dyb3VuZC1jb2xvcjonICsgYmRDb2xvciArICc7IHBvc2l0aW9uOmFic29sdXRlOyc7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArIDkwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpICsgJ2RlZykgdHJhbnNsYXRlWignXG4gICAgICAgICAgICArICgwLjg4OCAqIHNjYWxlIC8gMikgKyAncHgpIHNjYWxlKDAuODg4KSc7XG4gICAgfSxcblxuICAgICdmbGlwJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIGxldCBiZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy53cmFwLnBhcmVudE5vZGUsIG51bGwpLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAncG9zaXRpb246YWJzb2x1dGU7IC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47IGJhY2tncm91bmQtY29sb3I6JyArIGJkQ29sb3IgKyAnOyc7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWignICsgKHNjYWxlIC8gMikgKyAncHgpIHJvdGF0ZScgKyByb3RhdGVEaXJlY3RcbiAgICAgICAgICAgICsgJygnICsgMTgwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpICsgJ2RlZykgc2NhbGUoMC44NzUpJztcbiAgICB9LFxuXG4gICAgJ2RlcHRoJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgem9vbVNjYWxlID0gKDQgLSBNYXRoLmFicyhpIC0gMSkpICogMC4xODtcbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgPT09IDEpID8gMTAwIDogKG9mZnNldCA+IDApID8gKDEgLSBpKSA6IChpIC0gMSk7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZSdcbiAgICAgICAgICAgICsgYXhpcyArICcoJyArIChvZmZzZXQgKyAxLjMgKiBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfSxcblxuICAgICdmbG93JzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIGxldCBkaXJlY3RBbWVuZCA9IChheGlzID09PSAnWCcpID8gMSA6IC0xO1xuICAgICAgICBsZXQgb2Zmc2V0UmF0aW8gPSBNYXRoLmFicyhvZmZzZXQgLyBzY2FsZSk7XG5cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDAuNywgMC43KSB0cmFuc2xhdGVaKCcgKyAob2Zmc2V0UmF0aW8gKiAxNTAgLSAxNTApICogTWF0aC5hYnMoaSAtIDEpICsgJ3B4KSdcbiAgICAgICAgICAgICsgJ3RyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJ1xuICAgICAgICAgICAgKyAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArIGRpcmVjdEFtZW5kICogKDMwIC0gb2Zmc2V0UmF0aW8gKiAzMCkgKiAoMSAtIGkpICsgJ2RlZyknO1xuICAgIH0sXG5cbiAgICAnY2FyZCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwIDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb20uY3VyICYmIGRvbS5jdXIgIT09IGkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSBudWxsO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1cikgPyAxIC0gMC4yICogTWF0aC5hYnMoaSAtIDEpIC0gTWF0aC5hYnMoMC4yICogb2Zmc2V0IC8gc2NhbGUpLnRvRml4ZWQoNikgOiAxO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpc1xuICAgICAgICAgICAgKyAnKCcgKyAoKDEgKyBNYXRoLmFicyhpIC0gMSkgKiAwLjIpICogb2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH0sXG5cbiAgICAnZmFkZSc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSBvZmZzZXQgLyBzY2FsZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+aZleafk+aJqeaVo1xuICAgICd5cmtzJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgZG9tLmN1ciA9IDI7XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IG9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSArIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gLSBvZmZzZXQgLyBzY2FsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1ciA9PT0gMSkgPyAxIDogMjtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCknO1xuICAgIH1cbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRBbmltYXRpb247XG4iLCIvKlxuICogQGZpbGUgICBUbyBjcmVhdGUgcmlnaHQmbGVmdCBib3R0b24gb24gaVNsaWRlclxuICogQGF1dGhvciB4aWV5dTMzMzMzXG4gKi9cblxuZnVuY3Rpb24gYWRkQnRuKCkge1xuICAgIGxldCBIQU5ETEUgPSB0aGlzO1xuICAgIGNvbnNvbGUubG9nKEhBTkRMRSlcbiAgICBpZiAoIUhBTkRMRS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIGxldCBidG5PdXRlciA9IFtdO1xuICAgICAgICBsZXQgYnRuSW5uZXIgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgICAgIGJ0bk91dGVyW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4tb3V0ZXInO1xuICAgICAgICAgICAgYnRuSW5uZXJbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJ0bklubmVyW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWJ0bi1pbm5lcic7XG5cbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgbGVmdCc7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgKz0gJyByaWdodCc7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGV0IGRpciA9IHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdkaXInKSwgMTApO1xuICAgICAgICAgICAgICAgIEhBTkRMRS5zbGlkZVRvKEhBTkRMRS5zbGlkZUluZGV4ICsgZGlyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBidG5PdXRlcltpXS5hcHBlbmRDaGlsZChidG5Jbm5lcltpXSk7XG4gICAgICAgICAgICBIQU5ETEUud3JhcC5hcHBlbmRDaGlsZChidG5PdXRlcltpXSwgSEFORExFLndyYXAubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZEJ0bjtcbiIsIi8qXG4gKiBAZmlsZSAgIFRvIGNyZWF0ZSBkb3RzIGluZGV4IG9uIGlTbGlkZXJcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbmZ1bmN0aW9uIGFkZERvdCgpIHtcbiAgICBsZXQgSEFORExFID0gdGhpcztcbiAgICBpZiAoIUhBTkRMRS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIGxldCBkYXRhID0gSEFORExFLmRhdGE7XG4gICAgICAgIGxldCBkb3RzID0gW107XG4gICAgICAgIGxldCBkb3RXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgZG90V3JhcC5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3Qtd3JhcCc7XG5cbiAgICAgICAgbGV0IHJlbmRlckRvdHMgPSBmdW5jdGlvbiByZW5kZXJEb3RzKCkge1xuICAgICAgICAgICAgbGV0IGZyZWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZG90c1tpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3QnO1xuICAgICAgICAgICAgICAgIGRvdHNbaV0uc2V0QXR0cmlidXRlKCdpbmRleCcsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSBIQU5ETEUuc2xpZGVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvdHNbaV0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgSEFORExFLnNsaWRlVG8ocGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2luZGV4JyksIDEwKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmcmVnbWVudC5hcHBlbmRDaGlsZChkb3RzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvdFdyYXAuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICBkb3RXcmFwLmFwcGVuZENoaWxkKGZyZWdtZW50KTtcbiAgICAgICAgfTtcblxuICAgICAgICByZW5kZXJEb3RzKCk7XG5cbiAgICAgICAgSEFORExFLndyYXAucGFyZW50Tm9kZS5hcHBlbmRDaGlsZChkb3RXcmFwKTtcblxuICAgICAgICBIQU5ETEUub24oJ3NsaWRlQ2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdCc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgSEFORExFLm9uKCdyZWxvYWREYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGRvdHMgPSBbXTtcbiAgICAgICAgICAgIHJlbmRlckRvdHMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZERvdDtcbiIsIi8qKlxuICogU3VwcG9ydCAzRCBtYXRyaXggdHJhbnNsYXRlXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xudmFyIGV4dGVuZEZ1bmN0aW9uID0ge307IC8v6L+Z5Liq5piv5oiR5re75Yqg77yM55So5LqO5omp5bGV5pS55qih5Z2X55qE5pa55rOVXG5cbnZhciBoYXMzZCA9ICgnV2ViS2l0Q1NTTWF0cml4JyBpbiBnbG9iYWwgJiYgJ20xMScgaW4gbmV3IFdlYktpdENTU01hdHJpeCgpKTtcblxuLyoqXG4gKiBNaW4gc2NhbGVcbiAqIEB0eXBlIHtudW1iZXJ9XG4gKi9cbnZhciBtaW5TY2FsZSA9IDEgLyAyO1xuXG4vKipcbiAqIFNjZW5lIHZpZXcgcmFuZ2VcbiAqIEB0eXBlIHt7fX1cbiAqL1xudmFyIHZpZXdTY29wZSA9IHt9O1xuXG52YXIgY3VycmVudFNjYWxlO1xuXG52YXIgem9vbUZhY3RvcjtcblxudmFyIHpvb21Ob2RlO1xuXG52YXIgc3RhcnRUb3VjaGVzO1xuXG52YXIgc3RhcnRYO1xuXG52YXIgc3RhcnRZO1xuXG52YXIgbGFzdFRvdWNoU3RhcnQ7XG5cbnZhciBnZXN0dXJlO1xuXG52YXIgSU5fU0NBTEVfTU9ERSA9IGZhbHNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIHRyYW5zbGF0ZVxuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKiBAcGFyYW0gelxuICogQHBhcmFtIHNjYWxlXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRyYW5zbGF0ZSh4LCB5LCB6LCBzY2FsZSkge1xuICAgIHJldHVybiBcInRyYW5zbGF0ZVwiICsgKGhhczNkID8gXCIzZChcIiA6IFwiKFwiKSArIHggKyBcInB4LFwiICsgeSArIChoYXMzZCA/IFwicHgsXCIgKyB6ICsgXCJweClcIiA6IFwicHgpXCIpICsgXCJzY2FsZShcIiArIHNjYWxlICsgXCIpXCI7XG59XG5cbi8qKlxuICogR2V0IGRpc3RhbmNlXG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGdldERpc3RhbmNlKGEsIGIpIHtcbiAgICB2YXIgeCwgeTtcbiAgICB4ID0gYS5sZWZ0IC0gYi5sZWZ0O1xuICAgIHkgPSBhLnRvcCAtIGIudG9wO1xuICAgIHJldHVybiBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG59XG5cbi8qKlxuICogVHJhbnNmb3JtIHRvIHN0cmluZ1xuICogQHBhcmFtIHhcbiAqIEBwYXJhbSB5XG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbih4LCB5KSB7XG4gICAgcmV0dXJuIHggKyBcInB4IFwiICsgeSArIFwicHhcIjtcbn1cblxuLyoqXG4gKiBHZXQgdG91Y2ggcG9pbnRlclxuICogQHBhcmFtIHRvdWNoZXNcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gZ2V0VG91Y2hlcyh0b3VjaGVzKSB7XG4gICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvdWNoZXMpLm1hcChmdW5jdGlvbiAodG91Y2gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgdG9wOiB0b3VjaC5wYWdlWVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qKlxuICogR2V0IHNjYWxlXG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBlbmRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgc3RhcnREaXN0YW5jZSA9IGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgdmFyIGVuZERpc3RhbmNlID0gZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0pO1xuICAgIHJldHVybiBlbmREaXN0YW5jZSAvIHN0YXJ0RGlzdGFuY2U7XG59XG5cbi8qKlxuICogR2V0IGNvbXB1dGVkIHRyYW5zbGF0ZVxuICogQHBhcmFtIG9ialxuICogQHJldHVybnMge3t0cmFuc2xhdGVYOiBudW1iZXIsIHRyYW5zbGF0ZVk6IG51bWJlciwgdHJhbnNsYXRlWjogbnVtYmVyLCBzY2FsZVg6IG51bWJlciwgc2NhbGVZOiBudW1iZXIsIG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgdHJhbnNsYXRlWDogMCxcbiAgICAgICAgdHJhbnNsYXRlWTogMCxcbiAgICAgICAgdHJhbnNsYXRlWjogMCxcbiAgICAgICAgc2NhbGVYOiAxLFxuICAgICAgICBzY2FsZVk6IDEsXG4gICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgIG9mZnNldFk6IDBcbiAgICB9O1xuICAgIHZhciBvZmZzZXRYID0gMCwgb2Zmc2V0WSA9IDA7XG4gICAgaWYgKCFnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZSB8fCAhb2JqKSByZXR1cm4gcmVzdWx0O1xuICAgIHZhciBzdHlsZSA9IGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlKG9iaiksIHRyYW5zZm9ybSwgb3JpZ2luO1xuICAgIHRyYW5zZm9ybSA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gICAgb3JpZ2luID0gc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luIHx8IHN0eWxlLm1velRyYW5zZm9ybU9yaWdpbjtcbiAgICB2YXIgcGFyID0gb3JpZ2luLm1hdGNoKC8oLiopcHhcXHMrKC4qKXB4Lyk7XG4gICAgaWYgKHBhci5sZW5ndGggPiAxKSB7XG4gICAgICAgIG9mZnNldFggPSBwYXJbMV0gLSAwO1xuICAgICAgICBvZmZzZXRZID0gcGFyWzJdIC0gMDtcbiAgICB9XG4gICAgaWYgKHRyYW5zZm9ybSA9PSBcIm5vbmVcIikgcmV0dXJuIHJlc3VsdDtcbiAgICB2YXIgbWF0M2QgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gICAgdmFyIG1hdDJkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgICBpZiAobWF0M2QpIHtcbiAgICAgICAgdmFyIHN0ciA9IG1hdDNkWzFdLnNwbGl0KCcsICcpO1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYOiBzdHJbMTJdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0clsxM10gLSAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWjogc3RyWzE0XSAtIDAsXG4gICAgICAgICAgICBvZmZzZXRYOiBvZmZzZXRYIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFk6IG9mZnNldFkgLSAwLFxuICAgICAgICAgICAgc2NhbGVYOiBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgc2NhbGVZOiBzdHJbNV0gLSAwLFxuICAgICAgICAgICAgc2NhbGVaOiBzdHJbMTBdIC0gMFxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAobWF0MmQpIHtcbiAgICAgICAgdmFyIHN0ciA9IG1hdDJkWzFdLnNwbGl0KCcsICcpO1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYOiBzdHJbNF0gLSAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWTogc3RyWzVdIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFg6IG9mZnNldFggLSAwLFxuICAgICAgICAgICAgb2Zmc2V0WTogb2Zmc2V0WSAtIDAsXG4gICAgICAgICAgICBzY2FsZVg6IHN0clswXSAtIDAsXG4gICAgICAgICAgICBzY2FsZVk6IHN0clszXSAtIDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXQgY2VudGVyIHBvaW50XG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEByZXR1cm5zIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXRDZW50ZXIoYSwgYikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IChhLnggKyBiLngpIC8gMixcbiAgICAgICAgeTogKGEueSArIGIueSkgLyAyXG4gICAgfVxufVxuXG4vKipcbiAqIGluaXRcbiAqIEBwYXJhbSBvcHRzXG4gKi9cbmZ1bmN0aW9uIGluaXRab29tKG9wdHMpIHtcbiAgICBjdXJyZW50U2NhbGUgPSBvcHRzLmN1cnJlbnRTY2FsZTtcbiAgICB6b29tRmFjdG9yID0gb3B0cy56b29tRmFjdG9yO1xuICAgIGV4dGVuZEZ1bmN0aW9uID0gb3B0cy5leHRlbmRGdW5jdGlvbjtcbn1cblxuLyoqXG4gKiBTdGFydCBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gc3RhcnRIYW5kbGVyKGV2dCkge1xuICAgIGV4dGVuZEZ1bmN0aW9uLnN0YXJ0SGFuZGxlck9yaWdpbmFsLmNhbGwodGhpcywgZXZ0KTtcbiAgICAvLyBtdXN0IGJlIGEgcGljdHVyZSwgb25seSBvbmUgcGljdHVyZSEhXG4gICAgdmFyIG5vZGUgPSB0aGlzLmVsc1sxXS5xdWVyeVNlbGVjdG9yKCdpbWc6Zmlyc3QtY2hpbGQnKTtcbiAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgaWYgKGRldmljZS5oYXNUb3VjaCAmJiBub2RlICE9PSBudWxsKSB7XG4gICAgICAgIElOX1NDQUxFX01PREUgPSB0cnVlO1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUobm9kZSk7XG4gICAgICAgIHN0YXJ0VG91Y2hlcyA9IGdldFRvdWNoZXMoZXZ0LnRhcmdldFRvdWNoZXMpO1xuICAgICAgICBzdGFydFggPSB0cmFuc2Zvcm0udHJhbnNsYXRlWCAtIDA7XG4gICAgICAgIHN0YXJ0WSA9IHRyYW5zZm9ybS50cmFuc2xhdGVZIC0gMDtcbiAgICAgICAgY3VycmVudFNjYWxlID0gdHJhbnNmb3JtLnNjYWxlWDtcbiAgICAgICAgem9vbU5vZGUgPSBub2RlO1xuICAgICAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgbGFzdFRvdWNoU3RhcnQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHRvdWNoZXMgPSBldnQudG91Y2hlcztcbiAgICAgICAgICAgIHZhciB0b3VjaENlbnRlciA9IGdldENlbnRlcih7XG4gICAgICAgICAgICAgICAgeDogdG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiB0b3VjaGVzWzBdLnBhZ2VZXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgeDogdG91Y2hlc1sxXS5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiB0b3VjaGVzWzFdLnBhZ2VZXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4odG91Y2hDZW50ZXIueCAtIHBvcy5sZWZ0LCB0b3VjaENlbnRlci55IC0gcG9zLnRvcCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB2YXIgdGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBnZXN0dXJlID0gMDtcbiAgICAgICAgICAgIGlmICh0aW1lIC0gbGFzdFRvdWNoU3RhcnQgPCAzMDApIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RUb3VjaFN0YXJ0ID0gdGltZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBNb3ZlIGV2ZW50IGhhbmRsZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gbW92ZUhhbmRsZXIoZXZ0KSB7XG4gICAgaWYgKElOX1NDQUxFX01PREUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgaWYgKGRldmljZS5oYXNUb3VjaCkge1xuICAgICAgICAgICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2NhbGVJbWFnZShldnQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSAmJiBjdXJyZW50U2NhbGUgPiAxKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBtb3ZlSW1hZ2UuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXN0dXJlID0gcmVzdWx0O1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBleHRlbmRGdW5jdGlvbi5tb3ZlSGFuZGxlck9yaWdpbmFsLmNhbGwodGhpcywgZXZ0KTtcbn1cblxuLyoqXG4gKiBEb3VibGUgdGFvIGhhbmRsZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiBoYW5kbGVEb3VibGVUYXAoZXZ0KSB7XG4gICAgY29uc29sZS5sb2coem9vbUZhY3RvcilcbiAgICB2YXIgem9vbUZhY3RvciA9IHpvb21GYWN0b3IgfHwgMjtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHZhciBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICBjdXJyZW50U2NhbGUgPSBjdXJyZW50U2NhbGUgPT0gMSA/IHpvb21GYWN0b3IgOiAxO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgY3VycmVudFNjYWxlKTtcbiAgICBpZiAoY3VycmVudFNjYWxlICE9IDEpIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oZXZ0LnRvdWNoZXNbMF0ucGFnZVggLSBwb3MubGVmdCwgZXZ0LnRvdWNoZXNbMF0ucGFnZVkgLSBwb3MudG9wKTtcbn1cblxuLyoqXG4gKiBzY2FsZSBpbWFnZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiBzY2FsZUltYWdlKGV2dCkge1xuICAgIHZhciBtb3ZlVG91Y2VzID0gZ2V0VG91Y2hlcyhldnQudGFyZ2V0VG91Y2hlcyk7XG4gICAgdmFyIHNjYWxlID0gY2FsY3VsYXRlU2NhbGUoc3RhcnRUb3VjaGVzLCBtb3ZlVG91Y2VzKTtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHNjYWxlID0gY3VycmVudFNjYWxlICogc2NhbGUgPCBtaW5TY2FsZSA/IG1pblNjYWxlIDogY3VycmVudFNjYWxlICogc2NhbGU7XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSgwLCAwLCAwLCBzY2FsZSk7XG59XG5cbi8qKlxuICogRW5kIGV2ZW50IGhhbmRsZVxuICogQHBhcmFtIGV2dFxuICovXG5mdW5jdGlvbiBlbmRIYW5kbGVyKGV2dCkge1xuICAgIGlmIChJTl9TQ0FMRV9NT0RFKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICBpZiAoZ2VzdHVyZSA9PT0gMikgey8v5Y+M5omL5oyHXG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKGdlc3R1cmUgPT0gMSkgey8v5pS+5aSn5ouW5ou9XG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGdlc3R1cmUgPT09IDMpIHsvL+WPjOWHu1xuICAgICAgICAgICAgaGFuZGxlRG91YmxlVGFwKGV2dCk7XG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICBJTl9TQ0FMRV9NT0RFID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGV4dGVuZEZ1bmN0aW9uLmVuZEhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG59XG5cbi8qKlxuICogRHJhZ21vdmUgaW1hZ2VcbiAqIEBwYXJhbSB7b3BqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gbW92ZUltYWdlKGV2dCkge1xuICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIHZhciBvZmZzZXQgPSB7XG4gICAgICAgIFg6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc3RhcnRYKSA6IChldnQucGFnZVggLSB0aGlzLnN0YXJ0WCksXG4gICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICB9O1xuICAgIHZhciBtb3ZlT2Zmc2V0ID0ge1xuICAgICAgICB4OiBzdGFydFggKyBvZmZzZXQuWCAtIDAsXG4gICAgICAgIHk6IHN0YXJ0WSArIG9mZnNldC5ZIC0gMFxuICAgIH07XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZShtb3ZlT2Zmc2V0LngsIG1vdmVPZmZzZXQueSwgMCwgY3VycmVudFNjYWxlKTtcbn1cblxuLyoqXG4gKiBHZXQgcG9zaXRpb25cbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcmV0dXJucyB7e2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXRQb3NpdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIHBvcyA9IHtcImxlZnRcIjogMCwgXCJ0b3BcIjogMH07XG4gICAgZG8ge1xuICAgICAgICBwb3MudG9wICs9IGVsZW1lbnQub2Zmc2V0VG9wIHx8IDA7XG4gICAgICAgIHBvcy5sZWZ0ICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgfVxuICAgIHdoaWxlIChlbGVtZW50KTtcbiAgICByZXR1cm4gcG9zO1xufVxuXG4vKipcbiAqIENoZWNrIHRhcmdldCBpcyBpbiByYW5nZVxuICogQHBhcmFtIG5vZGVcbiAqIEBwYXJhbSB2YWx1ZVxuICogQHBhcmFtIHRhZ1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgdmFsdWUsIHRhZykge1xuICAgIHZhciBtaW4sIG1heDtcbiAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgdmlld1Njb3BlID0ge1xuICAgICAgICBzdGFydDoge2xlZnQ6IHBvcy5sZWZ0LCB0b3A6IHBvcy50b3B9LFxuICAgICAgICBlbmQ6IHtsZWZ0OiBwb3MubGVmdCArIG5vZGUuY2xpZW50V2lkdGgsIHRvcDogcG9zLnRvcCArIG5vZGUuY2xpZW50SGVpZ2h0fVxuICAgIH07XG4gICAgdmFyIHN0ciA9IHRhZyA9PSAxID8gXCJsZWZ0XCIgOiBcInRvcFwiO1xuICAgIG1pbiA9IHZpZXdTY29wZS5zdGFydFtzdHJdO1xuICAgIG1heCA9IHZpZXdTY29wZS5lbmRbc3RyXTtcbiAgICByZXR1cm4gKHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXgpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIG9iajFcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG92ZXJGbG93KG5vZGUsIG9iajEpIHtcbiAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICB2YXIgaXNYMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LmxlZnQsIDEpO1xuICAgIHZhciBpc1gySW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuZW5kLmxlZnQsIDEpO1xuICAgIHZhciBpc1kxSW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuc3RhcnQudG9wLCAwKTtcbiAgICB2YXIgaXNZMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC50b3AsIDApO1xuICAgIGlmICgoaXNYMUluICE9IGlzWDJJbikgJiYgKGlzWTFJbiAhPSBpc1kySW4pKSB7XG4gICAgICAgIGlmIChpc1gxSW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiBpc1kxSW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNYMkluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDQ7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKChpc1gxSW4gPT0gaXNYMkluKSkge1xuICAgICAgICBpZiAoIWlzWTFJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDU7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzWTJJbiAmJiBpc1kxSW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDY7XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoaXNZMUluID09IGlzWTJJbikge1xuICAgICAgICBpZiAoIWlzWDFJbiAmJiBpc1gySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNYMUluICYmICFpc1gySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDg7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4gPT0gaXNYMUluID09IGlzWDJJbikge1xuICAgICAgICByZXN1bHQgPSA5O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFJlc2V0IGltYWdlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIHJlc2V0SW1hZ2UoZXZ0KSB7XG4gICAgaWYgKGN1cnJlbnRTY2FsZSA9PSAxKSByZXR1cm47XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZSwgbGVmdCwgdG9wLCB0cmFucywgdywgaCwgcG9zLCBzdGFydCwgZW5kLCBwYXJlbnQsIGZsb3dUYWc7XG4gICAgdHJhbnMgPSBnZXRDb21wdXRlZFRyYW5zbGF0ZShub2RlKTtcbiAgICBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgdyA9IG5vZGUuY2xpZW50V2lkdGggKiB0cmFucy5zY2FsZVg7XG4gICAgaCA9IG5vZGUuY2xpZW50SGVpZ2h0ICogdHJhbnMuc2NhbGVYO1xuICAgIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgIHN0YXJ0ID0ge1xuICAgICAgICBsZWZ0OiAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRYICsgcG9zLmxlZnQgKyB0cmFucy50cmFuc2xhdGVYLFxuICAgICAgICB0b3A6ICgxIC0gdHJhbnMuc2NhbGVYKSAqIHRyYW5zLm9mZnNldFkgKyBwb3MudG9wICsgdHJhbnMudHJhbnNsYXRlWVxuICAgIH07XG4gICAgZW5kID0ge1xuICAgICAgICBsZWZ0OiBzdGFydC5sZWZ0ICsgdyxcbiAgICAgICAgdG9wOiBzdGFydC50b3AgKyBoXG4gICAgfTtcbiAgICBsZWZ0ID0gc3RhcnQubGVmdDtcbiAgICB0b3AgPSBzdGFydC50b3A7XG5cbiAgICBmbG93VGFnID0gb3ZlckZsb3cocGFyZW50LCB7c3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZH0pO1xuICAgIHN3aXRjaCAoZmxvd1RhZykge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNjpcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA3OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh3IDwgcGFyZW50LmNsaWVudFdpZHRoKSB7XG4gICAgICAgIGxlZnQgPSBwb3MubGVmdCAtICh0cmFucy5zY2FsZVggLSAxKSAqIG5vZGUuY2xpZW50V2lkdGggLyAyO1xuICAgIH1cbiAgICBpZiAoaCA8IHBhcmVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgdG9wID0gcG9zLnRvcCAtICh0cmFucy5zY2FsZVggLSAxKSAqIG5vZGUuY2xpZW50SGVpZ2h0IC8gMjtcbiAgICB9XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjEwMG1zXCI7XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSh0cmFucy50cmFuc2xhdGVYICsgbGVmdCAtIHN0YXJ0LmxlZnQsIHRyYW5zLnRyYW5zbGF0ZVkgKyB0b3AgLSBzdGFydC50b3AsIDAsIHRyYW5zLnNjYWxlWCk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3RhcnRIYW5kbGVyOiBzdGFydEhhbmRsZXIsXG4gICAgbW92ZUhhbmRsZXI6IG1vdmVIYW5kbGVyLFxuICAgIGVuZEhhbmRsZXI6IGVuZEhhbmRsZXIsXG4gICAgaW5pdFpvb206aW5pdFpvb21cbn07XG4iXX0=
