(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcIsliderJs = require('../../../src/islider.js');

var _srcIsliderJs2 = _interopRequireDefault(_srcIsliderJs);

var list = [];
for (var i = 1; i <= 3; i++) {
    list.push({ content: '../imgs/random/' + i + '.jpg' });
}for (var i = 4; i <= 9; i++) {
    list.push({
        content: '<div style="font-size:1.2em;color:white;"><img src="../imgs/random/' + i + '.jpg"/><br />TEXT' + i + '</div>'
    });
}list.push({
    content: '<div style="font-size:2em;color:white;text-align: center">HTML<a href="http://baidu.com">Link</a></div>'
});

list.push({
    content: (function () {
        var dom = document.createElement('div');
        dom.innerHTML = 'Element';
        dom.style.cssText = 'font-size:2em;color:rgb(230, 230, 63);';
        return dom;
    })()
});

list.push({
    content: (function () {
        var frag = document.createDocumentFragment();
        var dom = document.createElement('div');
        dom.innerHTML = 'Fragment';
        dom.style.cssText = 'font-size:2em;color:rgb(230, 63, 230);';
        frag.appendChild(dom);
        return frag;
    })()
});

var islider = new _srcIsliderJs2['default'](document.getElementById("iSlider"), list, {
    // data: list
    dom: document.getElementById("iSlider-wrapper"),
    // isVertical: true,
    isLooping: 1,
    isOverspread: 1,
    animateType: 'default',
    animateTime: 500,
    fixPage: 1,
    isDebug: 1,
    // isDebug: 0,
    // isLoading: true,
    // isAutoplay: true,
    // duration: 5000,
    plugins: ['dot', 'button', ['zoompic', { currentScale: 1, zoomFactor: 2 }]],
    onslide: function onslide() {
        console.debug(arguments);
    },
    onslidechange: function onslidechange() {
        console.debug(arguments, 'Change~ juse one time');
        //this.off('slideChange', arguments.callee);
    }
});

islider.on('slideChange', function () {
    console.debug('Change event from method "on"', this, arguments);
});

islider.on('slideChanged', function () {
    console.debug('Change(d) event from method "on"', this, arguments);
});

islider.on('slideRestore', function () {
    console.debug('Restore event from method "on"', this, arguments);
});

islider.on('slideRestored', function () {
    console.debug('Restore(d) event from method "on"', this, arguments);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvZGVtby9kb20vZXhhbXBsZS9tYWluLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9pc2xpZGVyX2NvcmUuanMiLCJkOi9qb2JEZXZlbG9wbWVudC9Qcm9qZWN0L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl9hbmltYXRlLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfYnV0dG9uLmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfZG90LmpzIiwiZDovam9iRGV2ZWxvcG1lbnQvUHJvamVjdC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfem9vbS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7Ozs0QkFFTyx5QkFBeUI7Ozs7QUFFN0MsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdkIsUUFBSSxDQUFDLElBQUksQ0FBQyxFQUFDLE9BQU8sRUFBRSxpQkFBaUIsR0FBRyxDQUFDLEdBQUcsTUFBTSxFQUFDLENBQUMsQ0FBQztDQUFBLEFBR3pELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ3ZCLFFBQUksQ0FBQyxJQUFJLENBQUM7QUFDTixlQUFPLEVBQUUscUVBQXFFLEdBQUcsQ0FBQyxHQUFHLG1CQUFtQixHQUFHLENBQUMsR0FBRyxRQUFRO0tBQzFILENBQUMsQ0FBQztDQUFBLEFBRVAsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNOLFdBQU8sRUFBRSx5R0FBeUc7Q0FDckgsQ0FBQyxDQUFDOztBQUVILElBQUksQ0FBQyxJQUFJLENBQUM7QUFDTixXQUFPLEVBQUUsQ0FBQyxZQUFZO0FBQ2xCLFlBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsV0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsV0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsd0NBQXdDLENBQUM7QUFDN0QsZUFBTyxHQUFHLENBQUM7S0FDZCxDQUFBLEVBQUc7Q0FDUCxDQUFDLENBQUM7O0FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNOLFdBQU8sRUFBRSxDQUFDLFlBQVk7QUFDbEIsWUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDN0MsWUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxXQUFHLENBQUMsU0FBUyxHQUFHLFVBQVUsQ0FBQztBQUMzQixXQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyx3Q0FBd0MsQ0FBQztBQUM3RCxZQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLGVBQU8sSUFBSSxDQUFDO0tBQ2YsQ0FBQSxFQUFHO0NBQ1AsQ0FBQyxDQUFDOztBQUlILElBQUksT0FBTyxHQUFHLDhCQUFZLFFBQVEsQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFOztBQUU1RCxPQUFHLEVBQUUsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQzs7QUFFL0MsYUFBUyxFQUFFLENBQUM7QUFDWixnQkFBWSxFQUFFLENBQUM7QUFDZixlQUFXLEVBQUUsU0FBUztBQUN0QixlQUFXLEVBQUUsR0FBRztBQUNoQixXQUFPLEVBQUUsQ0FBQztBQUNWLFdBQU8sRUFBRSxDQUFDOzs7OztBQUtWLFdBQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsQ0FBQyxTQUFTLEVBQUUsRUFBQyxZQUFZLEVBQUMsQ0FBQyxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUMsQ0FBQyxDQUFDO0FBQ3ZFLFdBQU8sRUFBRSxtQkFBWTtBQUNqQixlQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0tBQzNCO0FBQ0QsaUJBQWEsRUFBRSx5QkFBWTtBQUN2QixlQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxDQUFDOztLQUVyRDtDQUNKLENBQ0osQ0FBQzs7QUFFRixPQUFPLENBQUMsRUFBRSxDQUFDLGFBQWEsRUFBRSxZQUFZO0FBQ2xDLFdBQU8sQ0FBQyxLQUFLLENBQUMsK0JBQStCLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ25FLENBQUMsQ0FBQzs7QUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFZO0FBQ25DLFdBQU8sQ0FBQyxLQUFLLENBQUMsa0NBQWtDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3RFLENBQUMsQ0FBQzs7QUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxZQUFZO0FBQ25DLFdBQU8sQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3BFLENBQUMsQ0FBQzs7QUFFSCxPQUFPLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZO0FBQ3BDLFdBQU8sQ0FBQyxLQUFLLENBQUMsbUNBQW1DLEVBQUUsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0NBQ3ZFLENBQUMsQ0FBQzs7O0FDL0VILFlBQVksQ0FBQzs7Ozs7Ozs7Ozs4QkFFVyxtQkFBbUI7Ozs7dUNBQ3hCLDZCQUE2Qjs7OztvQ0FDaEMsMEJBQTBCOzs7O3FDQUN6QiwyQkFBMkI7Ozs7SUFFdEMsT0FBTztjQUFQLE9BQU87O0FBQ0UsYUFEVCxPQUFPLEdBQ1k7OEJBRG5CLE9BQU87OzBDQUNNLElBQUk7QUFBSixnQkFBSTs7OztBQUVmLG1DQUhGLE9BQU8sOENBR0ksSUFBSSxFQUFFOzs7QUFHZixZQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDN0MsWUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3pDLFlBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7QUFFM0MsWUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLHVDQUFRLENBQUM7QUFDaEMsWUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLG9DQUFLLENBQUM7QUFDMUIsWUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsVUFBUyxRQUFRLEVBQUM7QUFDeEMsK0NBQUssUUFBUSxDQUFDO0FBQ1YsNEJBQVksRUFBQyxRQUFRLENBQUMsWUFBWSxJQUFJLENBQUM7QUFDdkMsMEJBQVUsRUFBQyxRQUFRLENBQUMsVUFBVSxJQUFJLENBQUM7QUFDbkMsOEJBQWMsRUFBQztBQUNYLDBDQUFzQixFQUFDLG9CQUFvQjtBQUMzQyx3Q0FBb0IsRUFBQyxrQkFBa0I7QUFDdkMseUNBQXFCLEVBQUMsbUJBQW1CO2lCQUM1QzthQUNKLENBQUMsQ0FBQztTQUNOLENBQUMsQ0FBQzs7QUFFSCxZQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hCLFlBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN0QixZQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEIsWUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDOztBQUVwQixZQUFJLENBQUMsTUFBTSxDQUFDO0FBQ1Isd0JBQVksRUFBRSxtQ0FBSyxZQUFZO0FBQy9CLHVCQUFXLEVBQUUsbUNBQUssV0FBVztBQUM3QixzQkFBVSxFQUFFLG1DQUFLLFVBQVU7U0FDOUIsQ0FBQyxDQUFDO0tBQ047O1dBbENDLE9BQU87OztBQXFDYixNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1QnpCLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7O3dDQUVTLDhCQUE4Qjs7Ozs7Ozs7OztBQVFwRCxTQUFTLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ2hDLFdBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUN6Qzs7Ozs7OztBQU9ELFNBQVMsT0FBTyxDQUFDLENBQUMsRUFBRTtBQUNoQixXQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxnQkFBZ0IsQ0FBQztDQUNqRTs7Ozs7OztBQU9ELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEIsV0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7Q0FDdkU7Ozs7OztBQU1ELFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEIsUUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7QUFDckIsV0FBRyxDQUFDLFNBQVMsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDO0tBQzlCO0NBQ0o7Ozs7OztBQU1ELFNBQVMsV0FBVyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDM0IsUUFBSSxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ3BCLFdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxHQUFHLEdBQUcsU0FBUyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7S0FDbEY7Q0FDSjs7Ozs7OztBQU9ELFNBQVMsS0FBSyxDQUFDLEdBQUcsRUFBRTtBQUNoQixRQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ3ZCLE9BQU8sS0FBSyxDQUFDOztBQUVqQixRQUFJLEtBQUssR0FBRyxHQUFHLEdBQ1gsb0NBQW9DLEdBQ3BDLDJEQUEyRCxHQUMzRCxtR0FBbUcsR0FDbkcsZ0JBQWdCLEdBQ2hCLFlBQVksR0FDWixjQUFjLEdBQ2QsUUFBUSxHQUNSLEdBQUcsQ0FBQztBQUNSLFdBQU8sSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ3RDOzs7Ozs7Ozs7Ozs7Ozs7O0lBZ0JLLFdBQVc7OztBQUVGLGFBRlQsV0FBVyxHQUVDOzhCQUZaLFdBQVc7O0FBR1QsWUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdkQsWUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDZCxrQkFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQzNDO0FBQ0QsWUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ3RCLGdCQUFRLElBQUksQ0FBQyxNQUFNO0FBQ2YsaUJBQUssQ0FBQztBQUNGLG9CQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUEsQUFDckMsaUJBQUssQ0FBQztBQUNGLG9CQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztBQUFBLFNBRXRDOztBQUVELFlBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO0FBQ1gsa0JBQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztTQUNsRDs7QUFFRCxZQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQ2pDLGtCQUFNLElBQUksS0FBSyxDQUFDLDREQUE0RCxDQUFDLENBQUM7U0FDakY7Ozs7Ozs7QUFPRCxZQUFJLENBQUMsTUFBTSxHQUFHLDZHQUE2RyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7OztBQU92SSxZQUFJLENBQUMsTUFBTSxHQUFHLENBQ1YsMENBQTBDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUNyRCxnREFBZ0QsQ0FDbkQsQ0FBQzs7Ozs7OztBQU9GLFlBQUksQ0FBQyxhQUFhLEdBQUcsb0NBQW9DLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7O0FBT3JFLFlBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDOzs7Ozs7QUFPbEIsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7QUFDbEIsWUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRW5CLFlBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0tBQzlCOzs7Ozs7O2lCQWhFQyxXQUFXOztlQXNFQywwQkFBRyxFQUVoQjs7Ozs7Ozs7ZUFNSyxrQkFBRztBQUNMLGdCQUFJLElBQUksWUFBQTtnQkFBRSxNQUFNLFlBQUE7Z0JBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQzs7QUFFbkMsb0JBQVEsSUFBSSxDQUFDLE1BQU07QUFDZixxQkFBSyxDQUFDO0FBQ0YsMkJBQU87QUFBQSxBQUNYLHFCQUFLLENBQUM7QUFDRix3QkFBSSxHQUFHLElBQUksQ0FBQztBQUNaLDBCQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxDQUFDO0FBQ0Ysd0JBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZiwwQkFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQiwwQkFBTTtBQUFBLGFBQ2I7O0FBRUQsaUJBQUssSUFBSSxRQUFRLElBQUksTUFBTSxFQUFFO0FBQ3pCLG9CQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDakMsd0JBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7U0FDSjs7Ozs7Ozs7O2VBT1EsbUJBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNwQixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQztTQUNyRDs7Ozs7Ozs7ZUFNa0IsK0JBQUc7QUFDbEIsZ0JBQUksT0FBTyxZQUFBLENBQUM7QUFDWixtQkFBTyxZQUFZO0FBQ2Ysb0JBQUksT0FBTyxFQUFFO0FBQ1QsMkJBQU8sT0FBTyxDQUFDO2lCQUNsQjtBQUNELG9CQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQy9DLG9CQUFJLFdBQVcsR0FBRztBQUNkLDhCQUFVLEVBQUUsZUFBZTtBQUMzQiwrQkFBVyxFQUFFLGdCQUFnQjtBQUM3QixpQ0FBYSxFQUFFLGVBQWU7QUFDOUIsb0NBQWdCLEVBQUUscUJBQXFCO2lCQUMxQyxDQUFDO0FBQ0YscUJBQUssSUFBSSxDQUFDLElBQUksV0FBVyxFQUFFO0FBQ3ZCLHdCQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7QUFDNUQsK0JBQVEsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBRTtxQkFDckM7aUJBQ0o7YUFDSixDQUFBO1NBQ0o7OztXQXJJQyxXQUFXOzs7SUF5SVgsZ0JBQWdCO2NBQWhCLGdCQUFnQjs7QUFDUCxhQURULGdCQUFnQixHQUNHOzhCQURuQixnQkFBZ0I7OzBDQUNILElBQUk7QUFBSixnQkFBSTs7OztBQUVmLG1DQUhGLGdCQUFnQiw4Q0FHTCxJQUFJLEVBQUU7QUFDZixZQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbkI7Ozs7Ozs7aUJBTEMsZ0JBQWdCOztlQVdWLG9CQUFHOzs7Ozs7O0FBT1AsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQzs7Ozs7OztBQU83QixnQkFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDOzs7Ozs7QUFNeEMsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOzs7Ozs7QUFNckIsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDOzs7Ozs7O0FBT3JCLGdCQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQzs7Ozs7QUFLZixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztBQU90QixnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDOzs7Ozs7O0FBT3JCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7QUFPdEIsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUM7Ozs7Ozs7QUFPM0MsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksSUFBSSxLQUFLLENBQUM7Ozs7Ozs7QUFPL0MsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7Ozs7Ozs7QUFPdEMsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7QUFPbEcsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUM7Ozs7Ozs7QUFPcEMsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsQ0FBQzs7Ozs7OztBQU96RCxnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7QUFPeEMsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztBQU9qRCxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztBQU9uQyxnQkFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQzs7Ozs7OztBQU9yQyxnQkFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7QUFPdEMsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7QUFPeEQsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBQyxDQUFBOzs7Ozs7O0FBT3pDLGdCQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7Ozs7Ozs7QUFPdkUsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQzs7OztBQUl6RSxnQkFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFO0FBQ2hELG9CQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzthQUM1Qjs7Ozs7OztBQU9ELGdCQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsWUFBWTtBQUNsQyxzQkFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7YUFDdkQsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDOzs7QUFHeEIsZ0JBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FBZXJCLGdCQUFJLENBQUMsYUFBYSxHQUFHO0FBQ2pCLHlCQUFTLEVBQUUsa0JBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUM5Qyx1QkFBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcseUJBQXlCLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLENBQUM7aUJBQzNHO2FBQ0osQ0FBQzs7QUFFRixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSx3Q0FBWSxDQUFDOzs7OztBQUszQyxnQkFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7O0FBTzlHLGdCQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7QUFPOUYsZ0JBQUksQ0FBQyxhQUFhLEdBQ2QsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUN4QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQ2xCLE1BQU0sQ0FBQzs7Ozs7OztBQU9qQixnQkFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7QUFPbkIsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxZQUFZO0FBQzdCLG9CQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUUsQUFBQyxjQUFjLElBQUksTUFBTSxJQUFLLE1BQU0sQ0FBQyxhQUFhLElBQUksUUFBUSxZQUFZLE1BQU0sQ0FBQyxhQUFhLENBQUEsQUFBQyxDQUFDO0FBQ2xILHVCQUFPO0FBQ0gsNEJBQVEsRUFBRSxRQUFRO0FBQ2xCLDRCQUFRLEVBQUUsUUFBUSxHQUFHLFlBQVksR0FBRyxXQUFXO0FBQy9DLDJCQUFPLEVBQUUsUUFBUSxHQUFHLFdBQVcsR0FBRyxXQUFXO0FBQzdDLDBCQUFNLEVBQUUsUUFBUSxHQUFHLFVBQVUsR0FBRyxTQUFTO2lCQUM1QyxDQUFBO2FBQ0osQ0FBQSxFQUFHLENBQUM7Ozs7Ozs7QUFPTCxnQkFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUE7Ozs7Ozs7QUFPaEIsZ0JBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBRy9CLGdCQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7OztBQUd6QyxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7QUFHckMsZ0JBQUksQ0FBQyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzs7O0FBRzNDLGdCQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7OztBQUc3QyxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzs7QUFHN0MsZ0JBQUksQ0FBQyxFQUFFLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQVUvQyxnQkFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLFlBQVk7QUFDN0Isb0JBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs7QUFDdkIsNEJBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQTtBQUNmLDRCQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLGdCQUFnQixDQUFDLE1BQU0sRUFBRTtBQUNuRCxnQ0FBSSxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDakIsc0NBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUN2QyxNQUFNLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUFFO0FBQ25DLHNDQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDOzZCQUN2Qjt5QkFDSixDQUFDLENBQUM7QUFDSDsrQkFBTyxNQUFNOzBCQUFDOzs7O2lCQUNqQixNQUFNO0FBQ0gsMkJBQU8sRUFBRSxDQUFBO2lCQUNaO2FBQ0osQ0FBQSxFQUFHLENBQUM7OztBQUdMLGdCQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDakIsb0JBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNmO1NBQ0o7Ozs7Ozs7O2VBTVcsd0JBQUc7QUFDWCxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUMvQixnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM1QixpQkFBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUU7QUFDbEIsb0JBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3ZELHdCQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQywyQkFBTyxDQUFDLENBQUMsQ0FBQyxJQUNQLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFDaEMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUN2QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDeEM7YUFDSjtTQUNKOzs7Ozs7OztlQU1ZLHlCQUFHO0FBQ1osZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO0FBQzdCLGdCQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDO0FBQ3pCLGdCQUFJLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxDQUFDOzs7Ozs7OztBQVExQixnQkFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLFFBQVEsRUFBRTtBQUNoQyxvQkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM3QixvQkFBSSxNQUFNLFlBQUEsQ0FBQzs7QUFFWCxvQkFBSSxHQUFHLEdBQUcsTUFBTSxFQUFFO0FBQ2QsMEJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUNyQixNQUNJLElBQUksR0FBRyxHQUFHLE1BQU0sR0FBRyxNQUFNLEVBQUU7QUFDNUIsMEJBQU0sR0FBRyxNQUFNLElBQUksQUFBQyxHQUFHLEdBQUcsTUFBTSxJQUFLLENBQUMsQ0FBQSxBQUFDLENBQUM7aUJBQzNDLE1BQ0k7QUFDRCwwQkFBTSxHQUFHLE1BQU0sR0FBRyxPQUFPLElBQUksQUFBQyxHQUFHLEdBQUcsTUFBTSxHQUFHLE1BQU0sSUFBSyxDQUFDLENBQUEsQUFBQyxDQUFDO2lCQUM5RDs7QUFFRCx1QkFBTyxRQUFRLEdBQUcsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLE1BQU0sQ0FBQzthQUMxQyxDQUFBO1NBQ0o7Ozs7Ozs7Ozs7ZUFRUSxtQkFBQyxJQUFJLEVBQUU7QUFDWixnQkFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNkLG9CQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMxQjtBQUNELGdCQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDN0IsdUJBQU8sSUFBSSxDQUFDLElBQUksQ0FBQzthQUNwQjtBQUNELGdCQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzNCLGdCQUFJLElBQUksWUFBQSxDQUFDO0FBQ1QsZ0JBQUksT0FBTyxJQUFJLElBQUksRUFBRTtBQUNqQixvQkFBSSxHQUFHLE9BQU8sQ0FBQzthQUNsQixNQUFNO0FBQ0gsb0JBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ3hELHdCQUFJLEdBQUcsTUFBTSxDQUFDO2lCQUNqQixNQUFNLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQ3BDLHdCQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNoQiw0QkFBSSxHQUFHLEtBQUssQ0FBQztxQkFDaEIsTUFBTTtBQUNILDRCQUFJLEdBQUcsTUFBTSxDQUFDO3FCQUNqQjtpQkFDSixNQUFNO0FBQ0gsd0JBQUksR0FBRyxTQUFTLENBQUM7aUJBQ3BCO2FBQ0o7O0FBRUQsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVqQixtQkFBTyxJQUFJLENBQUM7U0FDZjs7Ozs7Ozs7OztlQVFVLHFCQUFDLEVBQUUsRUFBRSxTQUFTLEVBQUU7O0FBRXZCLGdCQUFJLElBQUksWUFBQTtnQkFBRSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7O0FBRWpDLGdCQUFJLFNBQVMsR0FBRyxDQUFBLFlBQVk7O0FBRXhCLG9CQUFJLElBQUksR0FBRyxRQUFRLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7O0FBRXpDLG9CQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ3ZDLHdCQUFJLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQyxZQUFZLEdBQUcsR0FBRyxDQUFDO2lCQUMvQyxNQUFNO0FBQ0gsd0JBQUksSUFBSSxVQUFVLEdBQUcsRUFBRSxDQUFDLFdBQVcsR0FBRyxHQUFHLENBQUM7aUJBQzdDOztBQUVELG9CQUFJLElBQUksQ0FBQyxZQUFZLEVBQUU7QUFDbkIsc0JBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLDJCQUEyQixDQUFDO0FBQzFFLHdCQUFJLElBQUksMERBQTBELENBQUE7aUJBQ3JFOztBQUVELGtCQUFFLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQ3hDLENBQUEsQ0FFRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdmLGNBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLGNBQUUsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQzs7O0FBR3pCLGdCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTs7QUFFakQsdUJBQU87YUFDVixNQUNJO0FBQ0QseUJBQVMsR0FBRyxDQUFDLEdBQUcsK0NBQStDLFNBQVMsQ0FBQSxHQUFJLEdBQUcsQ0FBQztBQUNoRixvQkFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDL0I7O0FBRUQsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWhDLGdCQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRWxELGNBQUUsQ0FBQyxTQUFTLEdBQUcsVUFBVSxHQUFHLElBQUksQ0FBQzs7QUFFakMsb0JBQVEsSUFBSTtBQUNSLHFCQUFLLEtBQUs7QUFDTix3QkFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDM0IsaUNBQVMsRUFBRSxDQUFDO3FCQUNmLE1BQ0k7O0FBQ0QsZ0NBQUksVUFBVSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7QUFDN0Isc0NBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM5QixzQ0FBVSxDQUFDLE1BQU0sR0FBRyxZQUFVO0FBQzFCLG9DQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7QUFDaEMsb0NBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztBQUM5QixvQ0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDaEIseUNBQVMsRUFBRSxDQUFDOzZCQUNmLENBQUE7O3FCQUNKO0FBQ0QsMEJBQU07QUFBQSxBQUNWLHFCQUFLLEtBQUssQ0FBQztBQUNYLHFCQUFLLE1BQU07QUFDUCxzQkFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO0FBQzVCLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxNQUFNLENBQUM7QUFDWixxQkFBSyxTQUFTOztBQUVWLHdCQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxLQUFLLEVBQUUsRUFBRTtBQUM5Qiw0QkFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUMzQyw4QkFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDakMsNEJBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO3FCQUN6QjtBQUNELHNCQUFFLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QiwwQkFBTTtBQUFBLEFBQ1Y7O0FBRUksMEJBQU07QUFBQSxhQUNiO1NBQ0o7Ozs7Ozs7Ozs7Ozs7ZUFXdUIsb0NBQUc7QUFDdkIsZ0JBQUksSUFBSSxDQUFDLGtCQUFrQixJQUFJLElBQUksRUFBRTtBQUNqQyxvQkFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ3RELG9CQUFJLENBQUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2FBQ2xDO1NBQ0o7Ozs7Ozs7O2VBTWEsMEJBQUc7QUFDYixnQkFBSSxXQUFXLEdBQUcsQ0FBQyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDckUsZ0JBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsZUFBZSxDQUFDLEVBQUUsRUFBRSxLQUFLLEVBQUU7QUFDakQsMkJBQVcsQ0FBQyxFQUFFLEVBQUUsR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDbkQsd0JBQVEsQ0FBQyxFQUFFLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7YUFDbkMsQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7O2VBTWEsMEJBQUc7QUFDYixnQkFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDOztBQUUxQyxnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZELGlCQUFLLENBQUMsU0FBUyxHQUFHLGVBQWUsQ0FBQzs7O0FBR2xDLGdCQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQztBQUNkLGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hCLG9CQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RDLG9CQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzs7O0FBR2xCLG9CQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25ELG9CQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxLQUFLLE1BQU0sQ0FBQSxBQUFDLEVBQUU7QUFDL0Ysd0JBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNqRCxNQUNJO0FBQ0Qsd0JBQUksQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2lCQUNqRDtBQUNELHFCQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO2FBQ3pCOztBQUVELGdCQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7OztBQUd0QixrQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBLFlBQVk7QUFDMUIsb0JBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO2FBQ3JDLENBQUEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7OztBQUduQixnQkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDYixvQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsb0JBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7Ozs7Ozs7Ozs7ZUFRVSxxQkFBQyxTQUFTLEVBQUU7OztBQUNuQixnQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O0FBQ3RCLHdCQUFJLElBQUksR0FBRyxNQUFLLElBQUksQ0FBQztBQUNyQix3QkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN0Qix3QkFBSSxJQUFJLFFBQU8sQ0FBQztBQUNoQix3QkFBSSxPQUFPLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUU7QUFDbkQsNEJBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2Qiw0QkFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7O0FBQ2hELG9DQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQzdCLDBDQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDOUIsMENBQVUsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUMzQix3Q0FBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0FBQzlCLHdDQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7aUNBQ25DLENBQUM7QUFDRixvQ0FBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7O3lCQUNuQjtxQkFDSixDQUFDOztBQUVGLDJCQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFBLEdBQUksR0FBRyxDQUFDLENBQUM7QUFDL0IsMkJBQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFBLEdBQUksR0FBRyxDQUFDLENBQUM7O2FBQ3hDO1NBQ0o7Ozs7Ozs7O2VBTWtCLDZCQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7O0FBRWpDLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUM7QUFDaEIsZ0JBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDcEQsZ0JBQUksR0FBRyxZQUFBLENBQUM7QUFDUixnQkFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsaUNBQWlDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUV0RSxxQkFBUyxNQUFNLENBQUMsR0FBRyxFQUFFO0FBQ2pCLG9CQUFJLEdBQUcsRUFBRTtBQUNMLDBCQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM1QjtBQUNELG9CQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDakIsb0JBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLG9DQUFvQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN6RSxvQkFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLENBQUMsRUFBRTs7QUFFdEIsd0JBQUksU0FBUyxLQUFLLGNBQWMsRUFBRTtBQUM5Qiw0QkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO3FCQUN6QjtBQUNELHdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDNUIsd0JBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO2lCQUNuQztBQUNELHVCQUFPLEVBQUUsQ0FBQzthQUNiOztBQUVELHFCQUFTLE9BQU8sR0FBRztBQUNmLG9CQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLHlCQUF5QixDQUFDLEVBQUUsRUFBRTtBQUNwRCxzQkFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM5RCxDQUFDLENBQUM7QUFDSCxvQkFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7YUFDNUI7O0FBRUQsZ0JBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtBQUNWLG9CQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLHFCQUFxQixDQUFDLEVBQUUsRUFBRTtBQUNoRCxzQkFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUMzRCxDQUFDLENBQUM7YUFDTjtBQUNELGVBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0QyxnQkFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCOzs7Ozs7OztlQU1XLHdCQUFHO0FBQ1gsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7QUFDdkIsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7O0FBRS9CLGdCQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNsQixxQkFBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0FBQy9CLHFCQUFLLENBQUMsV0FBVyxHQUFHLFVBQVUsR0FBRyxFQUFFO0FBQy9CLHdCQUFJLEdBQUcsRUFBRTtBQUNMLCtCQUFPLEtBQUssQ0FBQztxQkFDaEI7QUFDRCwyQkFBTyxJQUFJLENBQUM7aUJBQ2YsQ0FBQTthQUNKO0FBQ0QsaUJBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlDLGlCQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM3QyxpQkFBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRTVDLGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDbkQsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUd4QyxrQkFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFDOUMsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2hEOzs7Ozs7Ozs7O2VBUVUscUJBQUMsR0FBRyxFQUFFO0FBQ2IsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0Isb0JBQVEsR0FBRyxDQUFDLElBQUk7QUFDWixxQkFBSyxXQUFXO0FBQ1osd0JBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsT0FBTyxLQUFLLENBQUMsQ0FBQSxBQUFDLEVBQUUsTUFBTTtBQUFBLEFBQ3hELHFCQUFLLFlBQVk7QUFDYix3QkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssTUFBTSxDQUFDLE9BQU87QUFDZix3QkFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNuQixxQkFBSyxhQUFhO0FBQ2Qsd0JBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsMEJBQU07QUFBQSxBQUNWLHFCQUFLLG1CQUFtQjtBQUNwQix3QkFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7QUFDaEMsMEJBQU07QUFBQSxBQUNWLHFCQUFLLE9BQU87QUFDUix3QkFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDL0IsMEJBQU07QUFBQSxBQUNWLHFCQUFLLE1BQU07QUFDUCx3QkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2IsMEJBQU07QUFBQSxBQUNWLHFCQUFLLFFBQVE7QUFDVCx3QkFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO0FBQ3JCLDBCQUFNO0FBQUEsYUFDYjtTQUNKOzs7Ozs7Ozs7ZUFPVyxzQkFBQyxHQUFHLEVBQUU7QUFDZCxnQkFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQ2Qsb0JBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDcEQsdUJBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDeEI7YUFDSjtBQUNELGdCQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUM5Qix1QkFBTzthQUNWO0FBQ0QsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7O0FBRWIsZ0JBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDekIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFbkMsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN0QyxnQkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7QUFDdkUsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFFBQVEsR0FBRyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1NBQzFFOzs7Ozs7Ozs7ZUFPVSxxQkFBQyxHQUFHLEVBQUU7QUFDYixnQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDaEIsdUJBQU87YUFDVjtBQUNELGdCQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQzFCLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQy9CLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMzQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNyQixnQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztBQUNuQyxnQkFBSSxNQUFNLEdBQUc7QUFDVCxpQkFBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEFBQUM7QUFDM0YsaUJBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxHQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUssR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxBQUFDO2FBQzlGLENBQUE7O0FBRUQsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztBQUVyQixnQkFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0FBQzdELG1CQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRXJCLG9CQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRTlCLG9CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNqQix3QkFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0FBQzlGLDhCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDOUM7aUJBQ0o7O0FBRUQscUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEIsd0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsd0JBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0FBQ3ZDLHdCQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzlEO2FBQ0o7U0FDSjs7Ozs7Ozs7O2VBT1Msb0JBQUMsR0FBRyxFQUFFO0FBQ1osZ0JBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2hCLHVCQUFPO2FBQ1Y7QUFDRCxnQkFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdEIsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLGdCQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7O0FBSW5DLG9CQUFRLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRTFELGdCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztBQUUxRCxnQkFBSSxPQUFPLEdBQUcsU0FBVixPQUFPLENBQWEsRUFBRSxFQUFFO0FBQ3hCLG9CQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO0FBQ3BCLHdCQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUU7QUFDVCw4QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTtBQUM5QiwrQkFBTyxLQUFLLENBQUM7cUJBQ2hCO2lCQUNKLE1BQ0ksSUFBSSxFQUFFLENBQUMsU0FBUyxLQUFLLGFBQWEsRUFBRTtBQUNyQywyQkFBTyxLQUFLLENBQUM7aUJBQ2hCLE1BQ0k7QUFDRCwyQkFBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDMUI7YUFDSixDQUFDOztBQUVGLGdCQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVwRSxnQkFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLGdCQUFnQixHQUFHLFNBQVMsRUFBRTtBQUMxRCxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3JDLE1BQ0ksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksZ0JBQWdCLEdBQUcsU0FBUyxFQUFFO0FBQy9ELG9CQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDckMsTUFDSTtBQUNELG9CQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNqQzs7O0FBR0QsZ0JBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0FBQzlELG9CQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUMsb0JBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekMsb0JBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNkLHVCQUFHLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JDO0FBQ0Qsb0JBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDeEMsdUJBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDeEI7YUFDSjs7QUFFRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVsQyxnQkFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7O0FBRS9CLGdCQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7Ozs7Ozs7O2VBTXVCLG9DQUFHO0FBQ3ZCLGtCQUFNLENBQUMsVUFBVSxDQUFDLENBQUEsWUFBWTtBQUMxQixvQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2Isb0JBQUksQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUMsQ0FBQzthQUN4QyxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCOzs7Ozs7OztlQU1ZLHlCQUFHO0FBQ1osZ0JBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ2hGLG9CQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUQsb0JBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQSxZQUFZO0FBQzdDLHdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDYix3QkFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUMxQix3QkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lCQUM3RCxDQUFBLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ3RCO1NBQ0o7Ozs7Ozs7OztlQU9NLGlCQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUU7QUFDckIsZ0JBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNkLHVCQUFPO2FBQ1Y7QUFDRCxnQkFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ2QsZ0JBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDbkMsZ0JBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0FBQ3pDLGdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQ3BDLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JCLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ25CLGdCQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFDcEIsZ0JBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3BDLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3pCLGdCQUFJLFNBQVMsWUFBQSxDQUFDOztBQUVkLGdCQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUMxQixvQkFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3ZCLCtCQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDbEM7QUFDRCxvQkFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUNoRiwrQkFBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDL0IsK0JBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNqRDthQUNKOzs7QUFHRCxnQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7O0FBRXpFLGdCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2pCLG9CQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzVEOzs7QUFHRCxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O0FBR3RCLGdCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNYLG9CQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzthQUN6QixNQUNJO0FBQ0Qsb0JBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNoQix3QkFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDakQsTUFDSTtBQUNELHdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbEMscUJBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ1Q7YUFDSjs7QUFFRCxnQkFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7QUFHckMsZ0JBQUksTUFBTSxZQUFBO2dCQUFFLE1BQU0sWUFBQTtnQkFBRSxJQUFJLFlBQUEsQ0FBQzs7OztBQUl6QixnQkFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOztBQUVULHlCQUFTLEdBQUcsY0FBYyxDQUFDO2FBQzlCLE1BQU07O0FBRUgsb0JBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFdBQVcsS0FBSyxRQUFRLElBQUksV0FBVyxLQUFLLE1BQU0sQ0FBQSxDQUFDLEdBQUssQ0FBQyxHQUFHLENBQUMsQUFBQyxFQUFFO0FBQ3JGLHVCQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCLDBCQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLDBCQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLHdCQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNaLE1BQ0k7QUFDRCx1QkFBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN2QiwwQkFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQiwwQkFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQix3QkFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNiOztBQUVELG9CQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ25CLHdCQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztBQUNoQyx3QkFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDeEIsd0JBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNyQyx3QkFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDbEQ7O0FBRUQsc0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO0FBQ3ZDLHNCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7O0FBRW5DLHNCQUFNLENBQUMsVUFBVSxDQUFDLFlBQVk7QUFDMUIsMEJBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztpQkFDdkMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0FBR1IsMkJBQVcsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUV4Qyx5QkFBUyxHQUFHLGFBQWEsQ0FBQzthQUM3Qjs7QUFFRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEQsZ0JBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR3RGLGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hCLG9CQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7QUFDbkIsdUJBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxHQUFJLFdBQVcsR0FBRyxJQUFJLEFBQUMsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztpQkFDN0Y7QUFDRCwyQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDL0Q7OztBQUdELGdCQUFJLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDM0Usb0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNoQjtTQUNKOzs7Ozs7OztlQU1RLHFCQUFHO0FBQ1IsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakc7Ozs7Ozs7O2VBTVEscUJBQUc7QUFDUixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNqRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBb0NHLGNBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDOUIscUJBQVMsTUFBTSxDQUFDLENBQUMsRUFBRTtBQUNmLG9CQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLG9CQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3hCLG9CQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakQscUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BDLHdCQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdEIsZ0NBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsOEJBQU07cUJBQ1Q7aUJBQ0o7YUFDSjs7QUFFRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ3REOzs7ZUFFTyxrQkFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtBQUNsQyxxQkFBUyxNQUFNLENBQUMsQ0FBQyxFQUFFO0FBQ2Ysb0JBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDMUMsb0JBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUM7QUFDeEIsb0JBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqRCxxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDcEMsd0JBQUksTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN0QixnQ0FBUSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0Qiw4QkFBTTtxQkFDVDtpQkFDSjthQUNKOztBQUVELGdCQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDdEQ7Ozs7Ozs7OztlQU9LLGdCQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEVBRXJDOzs7ZUFFUyxvQkFBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUV6Qzs7Ozs7Ozs7ZUFNTSxtQkFBRztBQUNOLGdCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3ZCLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDOztBQUUvQixnQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7O0FBR3JCLGlCQUFLLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqRCxpQkFBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQsaUJBQUssQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDdEQsa0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDMUMsa0JBQU0sQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7OztBQUd6QyxnQkFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUU7QUFDbEQscUJBQUssSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3ZDLENBQUMsQ0FBQzs7QUFFSCxnQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1NBQzVCOzs7Ozs7Ozs7O2VBUUMsWUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQ2hCLGdCQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUMvRCxpQkFBQyxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFBLENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ2hHO1NBQ0o7Ozs7Ozs7Ozs7ZUFRRSxhQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUU7QUFDakIsZ0JBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDMUIsb0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMsb0JBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDaEMsb0JBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ1osMkJBQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN2QjthQUNKO1NBQ0o7Ozs7Ozs7Ozs7ZUFRRyxjQUFDLFNBQVMsRUFBRTtBQUNaLGdCQUFJLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDaEQsZ0JBQUksU0FBUyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDMUIsb0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbkMscUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFOztBQUVuQywyQkFBTyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxJQUMzQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUNkLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDckU7YUFDSjtTQUNKOzs7Ozs7OztlQU1JLGlCQUFHO0FBQ0osZ0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLGdCQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDaEIsZ0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN0QixnQkFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbEM7Ozs7Ozs7O2VBTU8sa0JBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtBQUN0QixnQkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2IsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxJQUFJLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7QUFDakIsZ0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN0QixnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN4QixnQkFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDbEM7Ozs7Ozs7O2VBTUcsZ0JBQUc7QUFDSCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGdCQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7O0FBRTlELHFCQUFTLElBQUksR0FBRztBQUNaLG9CQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsWUFBWTtBQUN4Qyx3QkFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLHdCQUFJLEVBQUUsQ0FBQztpQkFDVixFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNyQjs7QUFFRCxnQkFBSSxFQUFFLENBQUM7U0FDVjs7Ozs7Ozs7ZUFNSSxpQkFBRztBQUNKLGdCQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMxRDs7Ozs7Ozs7O2VBT0csZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDdkI7Ozs7Ozs7OztlQU9LLGtCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO0FBQ3JCLGdCQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDakI7Ozs7Ozs7Ozs7ZUFRRyxnQkFBRztBQUNILGdCQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDWixnQkFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7U0FDdkI7Ozs7Ozs7O2VBTUssa0JBQUc7QUFDTCxnQkFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7U0FDeEI7OztXQTVzQ0MsZ0JBQWdCO0dBQVMsV0FBVzs7QUFpdEMxQyxNQUFNLENBQUMsT0FBTyxHQUFHLGdCQUFnQixDQUFDOzs7Ozs7Ozs7Ozs7QUMzN0NsQyxJQUFJLGVBQWUsR0FBRztBQUNsQixZQUFRLEVBQUUsZ0JBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUM3QyxZQUFJLFlBQVksR0FBRyxBQUFDLElBQUksS0FBSyxHQUFHLEdBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUM5QyxZQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RDLFlBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsQ0FBQyxlQUFlLENBQUM7O0FBRWxGLFlBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNqQixrQkFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO1NBQ3BCOztBQUVELFlBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRTlDLFlBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNULGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUM7U0FDN0MsTUFBTTtBQUNILGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEFBQUMsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksY0FBYyxDQUFDO1NBQ3pGOztBQUVELFdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLDJFQUEyRSxHQUMxRixtQkFBbUIsR0FBRyxPQUFPLEdBQUcsc0JBQXNCLENBQUM7QUFDN0QsV0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLFlBQVksR0FBRyxHQUFHLEdBQUcsRUFBRSxJQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLEdBQUcsa0JBQWtCLEdBQ3ZHLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxBQUFDLEdBQUcsa0JBQWtCLENBQUM7S0FDbEQ7O0FBRUQsVUFBTSxFQUFFLGNBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUMzQyxZQUFJLFlBQVksR0FBRyxBQUFDLElBQUksS0FBSyxHQUFHLEdBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUM5QyxZQUFJLE9BQU8sR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUMsZUFBZSxDQUFDO0FBQ2xGLFlBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUNqQixrQkFBTSxHQUFHLENBQUMsTUFBTSxDQUFDO1NBQ3BCO0FBQ0QsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzs7QUFFOUMsWUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ1osZUFBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7U0FDekQsTUFBTTtBQUNILGVBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEFBQUMsQ0FBQyxHQUFHLENBQUMsR0FBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO1NBQ3pEOztBQUVELFdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUFJLDBFQUEwRSxHQUFHLE9BQU8sR0FBRyxHQUFHLENBQUM7QUFDaEgsV0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsYUFBYSxHQUFJLEtBQUssR0FBRyxDQUFDLEFBQUMsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUMvRSxHQUFHLEdBQUcsR0FBRyxJQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLEdBQUcsbUJBQW1CLENBQUM7S0FDcEU7O0FBRUQsV0FBTyxFQUFFLGVBQVUsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUM1QyxZQUFJLFNBQVMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxHQUFJLElBQUksQ0FBQztBQUM3QyxZQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzlDLFdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEFBQUMsQ0FBQyxLQUFLLENBQUMsR0FBSSxHQUFHLEdBQUcsQUFBQyxNQUFNLEdBQUcsQ0FBQyxHQUFLLENBQUMsR0FBRyxDQUFDLEdBQUssQ0FBQyxHQUFHLENBQUMsQUFBQyxDQUFDO0FBQ3RFLFdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRywyQkFBMkIsR0FDM0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLEdBQUcsR0FBRyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDO0tBQy9EOztBQUVELFVBQU0sRUFBRSxjQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUU7QUFDM0MsWUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxZQUFJLFlBQVksR0FBRyxBQUFDLElBQUksS0FBSyxHQUFHLEdBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztBQUM5QyxZQUFJLFdBQVcsR0FBRyxBQUFDLElBQUksS0FBSyxHQUFHLEdBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQzFDLFlBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDOztBQUUzQyxZQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxpQkFBaUIsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDOztBQUU5QyxZQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCxlQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDO1NBQzdDLE1BQU07QUFDSCxlQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxBQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksY0FBYyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsQ0FBQztTQUN6Rjs7QUFFRCxXQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyw2QkFBNkIsR0FBRyxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFBLEdBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUN6RyxXQUFXLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLEdBQzdELFFBQVEsR0FBRyxZQUFZLEdBQUcsR0FBRyxHQUFHLFdBQVcsSUFBSSxFQUFFLEdBQUcsV0FBVyxHQUFHLEVBQUUsQ0FBQSxBQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLEdBQUcsTUFBTSxDQUFDO0tBQ2xHOztBQUVELFVBQU0sRUFBRSxjQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUU7QUFDM0MsWUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7QUFFdEMsWUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1QsZUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQztBQUMxQyxlQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztTQUNmLE1BQU07QUFDSCxlQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxBQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksY0FBYyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQ3ZHOztBQUVELFlBQUksR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRTtBQUMxQixzQkFBVSxDQUFDLFlBQVk7QUFDbkIsbUJBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO2FBQ2xCLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDWDs7QUFFRCxZQUFJLFNBQVMsR0FBRyxBQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0RyxXQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLEdBQUcsU0FBUyxHQUFHLElBQUksR0FBRyxTQUFTLEdBQUcsMkJBQTJCLEdBQUcsSUFBSSxHQUNsRyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFBLEdBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDO0tBQ2hGOztBQUVELFVBQU0sRUFBRSxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQy9DLFlBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNaLGVBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEFBQUMsQ0FBQyxHQUFHLENBQUMsR0FBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO1NBQ3pELE1BQ0k7QUFDRCxlQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxBQUFDLENBQUMsR0FBRyxDQUFDLEdBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQztTQUN6RDtBQUNELGNBQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFCLFlBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNULGVBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBSSxNQUFNLEdBQUcsS0FBSyxBQUFDLENBQUM7U0FDNUMsTUFBTTtBQUNILGVBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7U0FDdEM7S0FDSjtDQUNKLENBQUM7O0FBR0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxlQUFlLENBQUM7Ozs7Ozs7Ozs7QUM3R2pDLFNBQVMsTUFBTSxHQUFHO0FBQ2QsUUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFdBQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7QUFDbkIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7QUFDcEIsWUFBSSxRQUFRLEdBQUcsRUFBRSxDQUFDO0FBQ2xCLFlBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixhQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hCLG9CQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxvQkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxtQkFBbUIsQ0FBQztBQUM1QyxvQkFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUMsb0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7O0FBRTVDLGdCQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCx3QkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxPQUFPLENBQUM7QUFDakMsd0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDeEIsTUFDSTtBQUNELHdCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQztBQUNsQyx3QkFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDdkI7O0FBRUQsb0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBWTtBQUM5QyxvQkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDakQsc0JBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQzthQUMzQyxDQUFDLENBQUM7O0FBRUgsb0JBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckMsa0JBQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQ2pFO0tBQ0o7Q0FDSjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQ2hDeEIsU0FBUyxNQUFNLEdBQUc7QUFDZCxRQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbEIsUUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7O0FBQ3BCLGdCQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDO0FBQ3ZCLGdCQUFJLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxnQkFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxtQkFBTyxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQzs7QUFFdkMsZ0JBQUksVUFBVSxHQUFHLFNBQVMsVUFBVSxHQUFHO0FBQ25DLG9CQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztBQUNqRCxxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbEMsd0JBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZDLHdCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUNsQyx3QkFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakMsd0JBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxVQUFVLEVBQUU7QUFDekIsNEJBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksU0FBUyxDQUFDO3FCQUNsQztBQUNELHdCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxHQUFHLFlBQVk7QUFDMUIsOEJBQU0sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztxQkFDNUQsQ0FBQztBQUNGLDRCQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNqQztBQUNELHVCQUFPLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUN2Qix1QkFBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUNqQyxDQUFDOztBQUVGLHNCQUFVLEVBQUUsQ0FBQzs7QUFFYixrQkFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU1QyxrQkFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBWTtBQUNqQyxvQkFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7QUFDcEIseUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xDLDRCQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUNsQyw0QkFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUN2QixnQ0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUM7eUJBQ2xDO3FCQUNKO2lCQUNKO2FBQ0osQ0FBQyxDQUFDOztBQUVILGtCQUFNLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxZQUFZO0FBQ2hDLG9CQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztBQUNqQixvQkFBSSxHQUFHLEVBQUUsQ0FBQztBQUNWLDBCQUFVLEVBQUUsQ0FBQzthQUNoQixDQUFDLENBQUM7O0tBQ047Q0FDSjs7QUFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQzs7Ozs7Ozs7OztBQ2xEeEIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFDOztBQUV4QixJQUFJLEtBQUssR0FBSSxpQkFBaUIsSUFBSSxNQUFNLElBQUksS0FBSyxJQUFJLElBQUksZUFBZSxFQUFFLEFBQUMsQ0FBQzs7Ozs7O0FBTTVFLElBQUksUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7OztBQU1yQixJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7O0FBRW5CLElBQUksWUFBWSxDQUFDOztBQUVqQixJQUFJLFVBQVUsQ0FBQzs7QUFFZixJQUFJLFFBQVEsQ0FBQzs7QUFFYixJQUFJLFlBQVksQ0FBQzs7QUFFakIsSUFBSSxNQUFNLENBQUM7O0FBRVgsSUFBSSxNQUFNLENBQUM7O0FBRVgsSUFBSSxjQUFjLENBQUM7O0FBRW5CLElBQUksT0FBTyxDQUFDOztBQUVaLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQzs7Ozs7Ozs7OztBQVUxQixTQUFTLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRTtBQUN2QyxXQUFPLFdBQVcsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQSxBQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQSxBQUFDLEdBQUcsUUFBUSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7Q0FDN0g7Ozs7Ozs7O0FBUUQsU0FBUyxXQUFXLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUN2QixRQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDVCxLQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO0FBQ3BCLEtBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDbEIsV0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0NBQ25DOzs7Ozs7OztBQVFELFNBQVMsdUJBQXVCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxXQUFPLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQztDQUMvQjs7Ozs7OztBQU9ELFNBQVMsVUFBVSxDQUFDLE9BQU8sRUFBRTtBQUN6QixXQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBVSxLQUFLLEVBQUU7QUFDNUQsZUFBTztBQUNILGdCQUFJLEVBQUUsS0FBSyxDQUFDLEtBQUs7QUFDakIsZUFBRyxFQUFFLEtBQUssQ0FBQyxLQUFLO1NBQ25CLENBQUE7S0FDSixDQUFDLENBQUM7Q0FDTjs7Ozs7Ozs7QUFRRCxTQUFTLGNBQWMsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFO0FBQ2hDLFFBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsUUFBSSxXQUFXLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QyxXQUFPLFdBQVcsR0FBRyxhQUFhLENBQUM7Q0FDdEM7Ozs7Ozs7QUFPRCxTQUFTLG9CQUFvQixDQUFDLEdBQUcsRUFBRTtBQUMvQixRQUFJLE1BQU0sR0FBRztBQUNULGtCQUFVLEVBQUUsQ0FBQztBQUNiLGtCQUFVLEVBQUUsQ0FBQztBQUNiLGtCQUFVLEVBQUUsQ0FBQztBQUNiLGNBQU0sRUFBRSxDQUFDO0FBQ1QsY0FBTSxFQUFFLENBQUM7QUFDVCxlQUFPLEVBQUUsQ0FBQztBQUNWLGVBQU8sRUFBRSxDQUFDO0tBQ2IsQ0FBQztBQUNGLFFBQUksT0FBTyxHQUFHLENBQUM7UUFBRSxPQUFPLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLFFBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLEVBQUUsT0FBTyxNQUFNLENBQUM7QUFDcEQsUUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztRQUFFLFNBQVM7UUFBRSxNQUFNLENBQUM7QUFDNUQsYUFBUyxHQUFHLEtBQUssQ0FBQyxlQUFlLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQztBQUN4RCxVQUFNLEdBQUcsS0FBSyxDQUFDLHFCQUFxQixJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQztBQUNqRSxRQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDMUMsUUFBSSxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNoQixlQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixlQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUN4QjtBQUNELFFBQUksU0FBUyxJQUFJLE1BQU0sRUFBRSxPQUFPLE1BQU0sQ0FBQztBQUN2QyxRQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbEQsUUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hELFFBQUksS0FBSyxFQUFFO0FBQ1AsWUFBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMvQixjQUFNLEdBQUc7QUFDTCxzQkFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQ3ZCLHNCQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDdkIsc0JBQVUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztBQUN2QixtQkFBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3BCLG1CQUFPLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDcEIsa0JBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQixrQkFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2xCLGtCQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDdEIsQ0FBQztLQUNMLE1BQU0sSUFBSSxLQUFLLEVBQUU7QUFDZCxZQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLGNBQU0sR0FBRztBQUNMLHNCQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDdEIsc0JBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN0QixtQkFBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3BCLG1CQUFPLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDcEIsa0JBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQixrQkFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1NBQ3JCLENBQUM7S0FDTDtBQUNELFdBQU8sTUFBTSxDQUFDO0NBQ2pCOzs7Ozs7OztBQVFELFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckIsV0FBTztBQUNILFNBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQSxHQUFJLENBQUM7QUFDbEIsU0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUksQ0FBQztLQUNyQixDQUFBO0NBQ0o7Ozs7OztBQU1ELFNBQVMsUUFBUSxDQUFDLElBQUksRUFBRTtBQUNwQixnQkFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDakMsY0FBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDN0Isa0JBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDO0NBQ3hDOzs7Ozs7QUFNRCxTQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDdkIsa0JBQWMsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDOztBQUVwRCxRQUFJLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0FBQ3hELFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsUUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7QUFDbEMscUJBQWEsR0FBRyxJQUFJLENBQUM7QUFDckIsWUFBSSxTQUFTLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0Msb0JBQVksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQzdDLGNBQU0sR0FBRyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNsQyxjQUFNLEdBQUcsU0FBUyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbEMsb0JBQVksR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ2hDLGdCQUFRLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLFlBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixZQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUMvQiwwQkFBYyxHQUFHLElBQUksQ0FBQztBQUN0QixnQkFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUMxQixnQkFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQ3hCLGlCQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDbkIsaUJBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSzthQUN0QixFQUFFO0FBQ0MsaUJBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztBQUNuQixpQkFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO2FBQ3RCLENBQUMsQ0FBQztBQUNILGdCQUFJLENBQUMsS0FBSyxDQUFDLHFCQUFxQixHQUFHLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNqSCxNQUFNLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3ZDLGdCQUFJLElBQUksR0FBRyxBQUFDLElBQUksSUFBSSxFQUFFLENBQUUsT0FBTyxFQUFFLENBQUM7QUFDbEMsbUJBQU8sR0FBRyxDQUFDLENBQUM7QUFDWixnQkFBSSxJQUFJLEdBQUcsY0FBYyxHQUFHLEdBQUcsRUFBRTtBQUM3QixtQkFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3JCLHVCQUFPLEdBQUcsQ0FBQyxDQUFDO2FBQ2Y7QUFDRCwwQkFBYyxHQUFHLElBQUksQ0FBQztTQUN6QjtLQUNKO0NBQ0o7Ozs7Ozs7QUFPRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDdEIsUUFBSSxhQUFhLEVBQUU7QUFDZixZQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixZQUFJLElBQUksR0FBRyxRQUFRLENBQUM7QUFDcEIsWUFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUMvQixZQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDakIsZ0JBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ2hDLG9CQUFJLENBQUMsS0FBSyxDQUFDLHdCQUF3QixHQUFHLEdBQUcsQ0FBQztBQUMxQyxtQkFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3JCLDBCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsc0JBQU0sR0FBRyxDQUFDLENBQUM7YUFDZCxNQUFNLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7QUFDM0Qsb0JBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBQzFDLG1CQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDckIseUJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLHNCQUFNLEdBQUcsQ0FBQyxDQUFDO2FBQ2Q7QUFDRCxtQkFBTyxHQUFHLE1BQU0sQ0FBQzs7QUFFakIsZ0JBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNaLHVCQUFPO2FBQ1Y7U0FDSjtLQUNKO0FBQ0Qsa0JBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ3REOzs7Ozs7QUFNRCxTQUFTLGVBQWUsQ0FBQyxHQUFHLEVBQUU7QUFDMUIsV0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUN2QixRQUFJLFVBQVUsR0FBRyxVQUFVLElBQUksQ0FBQyxDQUFDO0FBQ2pDLFFBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQztBQUNwQixRQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsZ0JBQVksR0FBRyxZQUFZLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbEQsUUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFDdEUsUUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsdUJBQXVCLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Q0FDdEo7Ozs7OztBQU1ELFNBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUNyQixRQUFJLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQy9DLFFBQUksS0FBSyxHQUFHLGNBQWMsQ0FBQyxZQUFZLEVBQUUsVUFBVSxDQUFDLENBQUM7QUFDckQsUUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3BCLFNBQUssR0FBRyxZQUFZLEdBQUcsS0FBSyxHQUFHLFFBQVEsR0FBRyxRQUFRLEdBQUcsWUFBWSxHQUFHLEtBQUssQ0FBQztBQUMxRSxRQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxpQkFBaUIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztDQUNsRTs7Ozs7O0FBTUQsU0FBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ3JCLFFBQUksYUFBYSxFQUFFO0FBQ2YsWUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsWUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFOztBQUNmLHNCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsa0JBQU0sR0FBRyxDQUFDLENBQUM7U0FDZCxNQUFNLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRTs7QUFDckIsc0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixrQkFBTSxHQUFHLENBQUMsQ0FBQztTQUNkLE1BQU0sSUFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFOztBQUN0QiwyQkFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLHNCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIseUJBQWEsR0FBRyxLQUFLLENBQUM7U0FDekI7O0FBRUQsWUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ1osbUJBQU87U0FDVjtLQUNKO0FBQ0Qsa0JBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0NBQ3JEOzs7Ozs7QUFNRCxTQUFTLFNBQVMsQ0FBQyxHQUFHLEVBQUU7QUFDcEIsUUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3BCLFFBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsUUFBSSxNQUFNLEdBQUc7QUFDVCxTQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsR0FBSSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQUFBQztBQUMzRixTQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsR0FBSSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQUFBQztLQUM5RixDQUFDO0FBQ0YsUUFBSSxVQUFVLEdBQUc7QUFDYixTQUFDLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN4QixTQUFDLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQztLQUMzQixDQUFDO0FBQ0YsUUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsRUFBRSxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxZQUFZLENBQUMsQ0FBQztDQUMvRjs7Ozs7OztBQU9ELFNBQVMsV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUMxQixRQUFJLEdBQUcsR0FBRyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBQyxDQUFDO0FBQ2hDLE9BQUc7QUFDQyxXQUFHLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ2xDLFdBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7QUFDcEMsZUFBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUM7S0FDbEMsUUFDTSxPQUFPLEVBQUU7QUFDaEIsV0FBTyxHQUFHLENBQUM7Q0FDZDs7Ozs7Ozs7O0FBU0QsU0FBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtBQUN4QyxRQUFJLEdBQUcsRUFBRSxHQUFHLENBQUM7QUFDYixRQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsYUFBUyxHQUFHO0FBQ1IsYUFBSyxFQUFFLEVBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUM7QUFDckMsV0FBRyxFQUFFLEVBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFDO0tBQzdFLENBQUM7QUFDRixRQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEMsT0FBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsT0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekIsV0FBUSxLQUFLLElBQUksR0FBRyxJQUFJLEtBQUssSUFBSSxHQUFHLENBQUU7Q0FDekM7Ozs7Ozs7O0FBUUQsU0FBUyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtBQUMxQixRQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixRQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDeEQsUUFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3RELFFBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2RCxRQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDckQsUUFBSSxBQUFDLE1BQU0sSUFBSSxNQUFNLElBQU0sTUFBTSxJQUFJLE1BQU0sQUFBQyxFQUFFO0FBQzFDLFlBQUksTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUNsQixrQkFBTSxHQUFHLENBQUMsQ0FBQztTQUNkLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO0FBQ3pCLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2QsTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDekIsa0JBQU0sR0FBRyxDQUFDLENBQUM7U0FDZCxNQUFNO0FBQ0gsa0JBQU0sR0FBRyxDQUFDLENBQUM7U0FDZDtLQUNKLE1BQU0sSUFBSyxNQUFNLElBQUksTUFBTSxFQUFHO0FBQzNCLFlBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFFO0FBQ25CLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2QsTUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUMxQixrQkFBTSxHQUFHLENBQUMsQ0FBQztTQUNkO0tBRUosTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDekIsWUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDbkIsa0JBQU0sR0FBRyxDQUFDLENBQUM7U0FDZCxNQUFNLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQzFCLGtCQUFNLEdBQUcsQ0FBQyxDQUFDO1NBQ2Q7S0FDSixNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO0FBQzdDLGNBQU0sR0FBRyxDQUFDLENBQUM7S0FDZDtBQUNELFdBQU8sTUFBTSxDQUFDO0NBQ2pCOzs7Ozs7QUFNRCxTQUFTLFVBQVUsQ0FBQyxHQUFHLEVBQUU7QUFDckIsUUFBSSxZQUFZLElBQUksQ0FBQyxFQUFFLE9BQU87QUFDOUIsUUFBSSxJQUFJLEdBQUcsUUFBUTtRQUFFLElBQUk7UUFBRSxHQUFHO1FBQUUsS0FBSztRQUFFLENBQUM7UUFBRSxDQUFDO1FBQUUsR0FBRztRQUFFLEtBQUs7UUFBRSxHQUFHO1FBQUUsTUFBTTtRQUFFLE9BQU8sQ0FBQztBQUM5RSxTQUFLLEdBQUcsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbkMsVUFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDekIsS0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNwQyxLQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ3JDLE9BQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsU0FBSyxHQUFHO0FBQ0osWUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUEsR0FBSSxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDLFVBQVU7QUFDdEUsV0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUEsR0FBSSxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLFVBQVU7S0FDdkUsQ0FBQztBQUNGLE9BQUcsR0FBRztBQUNGLFlBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUM7QUFDcEIsV0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQztLQUNyQixDQUFDO0FBQ0YsUUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDbEIsT0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7O0FBRWhCLFdBQU8sR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLENBQUMsQ0FBQztBQUNyRCxZQUFRLE9BQU87QUFDWCxhQUFLLENBQUM7QUFDRixnQkFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzVCLGVBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUIsa0JBQU07QUFBQSxBQUNWLGFBQUssQ0FBQztBQUNGLGdCQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDNUIsZUFBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO0FBQzFCLGtCQUFNO0FBQUEsQUFDVixhQUFLLENBQUM7QUFDRixnQkFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM5QixlQUFHLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLGtCQUFNO0FBQUEsQUFDVixhQUFLLENBQUM7QUFDRixnQkFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM5QixlQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDMUIsa0JBQU07QUFBQSxBQUNWLGFBQUssQ0FBQztBQUNGLGVBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUIsa0JBQU07QUFBQSxBQUNWLGFBQUssQ0FBQztBQUNGLGVBQUcsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQztBQUMxQixrQkFBTTtBQUFBLEFBQ1YsYUFBSyxDQUFDO0FBQ0YsZ0JBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7QUFDOUIsa0JBQU07QUFBQSxBQUNWLGFBQUssQ0FBQztBQUNGLGdCQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDNUIsa0JBQU07QUFBQSxLQUNiO0FBQ0QsUUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUN4QixZQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7S0FDL0Q7QUFDRCxRQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3pCLFdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztLQUM5RDtBQUNELFFBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDO0FBQzlDLFFBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTdJOztBQUVELE1BQU0sQ0FBQyxPQUFPLEdBQUc7QUFDYixnQkFBWSxFQUFFLFlBQVk7QUFDMUIsZUFBVyxFQUFFLFdBQVc7QUFDeEIsY0FBVSxFQUFFLFVBQVU7QUFDdEIsWUFBUSxFQUFDLFFBQVE7Q0FDcEIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyIGZyb20gJy4uLy4uLy4uL3NyYy9pc2xpZGVyLmpzJztcblxubGV0IGxpc3QgPSBbXTtcbmZvciAobGV0IGkgPSAxOyBpIDw9IDM7IGkrKylcbiAgICBsaXN0LnB1c2goe2NvbnRlbnQ6ICcuLi9pbWdzL3JhbmRvbS8nICsgaSArICcuanBnJ30pO1xuXG5cbmZvciAobGV0IGkgPSA0OyBpIDw9IDk7IGkrKylcbiAgICBsaXN0LnB1c2goe1xuICAgICAgICBjb250ZW50OiAnPGRpdiBzdHlsZT1cImZvbnQtc2l6ZToxLjJlbTtjb2xvcjp3aGl0ZTtcIj48aW1nIHNyYz1cIi4uL2ltZ3MvcmFuZG9tLycgKyBpICsgJy5qcGdcIi8+PGJyIC8+VEVYVCcgKyBpICsgJzwvZGl2PidcbiAgICB9KTtcblxubGlzdC5wdXNoKHtcbiAgICBjb250ZW50OiAnPGRpdiBzdHlsZT1cImZvbnQtc2l6ZToyZW07Y29sb3I6d2hpdGU7dGV4dC1hbGlnbjogY2VudGVyXCI+SFRNTDxhIGhyZWY9XCJodHRwOi8vYmFpZHUuY29tXCI+TGluazwvYT48L2Rpdj4nXG59KTtcblxubGlzdC5wdXNoKHtcbiAgICBjb250ZW50OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvbS5pbm5lckhUTUwgPSAnRWxlbWVudCc7XG4gICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToyZW07Y29sb3I6cmdiKDIzMCwgMjMwLCA2Myk7JztcbiAgICAgICAgcmV0dXJuIGRvbTtcbiAgICB9KSgpXG59KTtcblxubGlzdC5wdXNoKHtcbiAgICBjb250ZW50OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgbGV0IGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkb20uaW5uZXJIVE1MID0gJ0ZyYWdtZW50JztcbiAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjJlbTtjb2xvcjpyZ2IoMjMwLCA2MywgMjMwKTsnO1xuICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgICAgIHJldHVybiBmcmFnO1xuICAgIH0pKClcbn0pO1xuXG5cblxubGV0IGlzbGlkZXIgPSBuZXcgaVNsaWRlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlTbGlkZXJcIiksIGxpc3QsIHtcbiAgICAgICAgLy8gZGF0YTogbGlzdFxuICAgICAgICBkb206IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaVNsaWRlci13cmFwcGVyXCIpLFxuICAgICAgICAvLyBpc1ZlcnRpY2FsOiB0cnVlLFxuICAgICAgICBpc0xvb3Bpbmc6IDEsXG4gICAgICAgIGlzT3ZlcnNwcmVhZDogMSxcbiAgICAgICAgYW5pbWF0ZVR5cGU6ICdkZWZhdWx0JyxcbiAgICAgICAgYW5pbWF0ZVRpbWU6IDUwMCxcbiAgICAgICAgZml4UGFnZTogMSxcbiAgICAgICAgaXNEZWJ1ZzogMSxcbiAgICAgICAgLy8gaXNEZWJ1ZzogMCxcbiAgICAgICAgLy8gaXNMb2FkaW5nOiB0cnVlLFxuICAgICAgICAvLyBpc0F1dG9wbGF5OiB0cnVlLFxuICAgICAgICAvLyBkdXJhdGlvbjogNTAwMCxcbiAgICAgICAgcGx1Z2luczogWydkb3QnLCAnYnV0dG9uJywgWyd6b29tcGljJywge2N1cnJlbnRTY2FsZToxLHpvb21GYWN0b3I6IDJ9XV0sXG4gICAgICAgIG9uc2xpZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoYXJndW1lbnRzKVxuICAgICAgICB9LFxuICAgICAgICBvbnNsaWRlY2hhbmdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKGFyZ3VtZW50cywgJ0NoYW5nZX4ganVzZSBvbmUgdGltZScpO1xuICAgICAgICAgICAgLy90aGlzLm9mZignc2xpZGVDaGFuZ2UnLCBhcmd1bWVudHMuY2FsbGVlKTtcbiAgICAgICAgfVxuICAgIH1cbik7XG5cbmlzbGlkZXIub24oJ3NsaWRlQ2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUuZGVidWcoJ0NoYW5nZSBldmVudCBmcm9tIG1ldGhvZCBcIm9uXCInLCB0aGlzLCBhcmd1bWVudHMpO1xufSk7XG5cbmlzbGlkZXIub24oJ3NsaWRlQ2hhbmdlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmRlYnVnKCdDaGFuZ2UoZCkgZXZlbnQgZnJvbSBtZXRob2QgXCJvblwiJywgdGhpcywgYXJndW1lbnRzKTtcbn0pO1xuXG5pc2xpZGVyLm9uKCdzbGlkZVJlc3RvcmUnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnUmVzdG9yZSBldmVudCBmcm9tIG1ldGhvZCBcIm9uXCInLCB0aGlzLCBhcmd1bWVudHMpO1xufSk7XG5cbmlzbGlkZXIub24oJ3NsaWRlUmVzdG9yZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5kZWJ1ZygnUmVzdG9yZShkKSBldmVudCBmcm9tIG1ldGhvZCBcIm9uXCInLCB0aGlzLCBhcmd1bWVudHMpO1xufSk7XG5cblxuXG5cblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaVNsaWRlckNvcmUgZnJvbSAnLi9pc2xpZGVyX2NvcmUuanMnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl9idXR0b24uanMnO1xuaW1wb3J0IERvdCBmcm9tICcuL3BsdWdpbnMvaXNsaWRlcl9kb3QuanMnO1xuaW1wb3J0IFpvb20gZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfem9vbS5qcyc7XG5cbmNsYXNzIGlTbGlkZXIgZXh0ZW5kcyBpU2xpZGVyQ29yZSB7XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgICAvL+ebtOaOpeiwg+eUqOeItuexu+aehOmAoOWZqOi/m+ihjOWIneWni+WMllxuICAgICAgICBzdXBlciguLi5vcHRzKTtcblxuICAgICAgICAvL+a3u+WKoCB6b29tIOaPkuS7tu+8jOazqOaEj+S7peS4i+S7o+eggeW/hemhu+imgVxuICAgICAgICB2YXIgc3RhcnRIYW5kbGVyT3JpZ2luYWwgPSB0aGlzLnN0YXJ0SGFuZGxlcjtcbiAgICAgICAgdmFyIGVuZEhhbmRsZXJPcmlnaW5hbCA9IHRoaXMuZW5kSGFuZGxlcjtcbiAgICAgICAgdmFyIG1vdmVIYW5kbGVyT3JpZ2luYWwgPSB0aGlzLm1vdmVIYW5kbGVyO1xuXG4gICAgICAgIHRoaXMucmVnUGx1Z2luKCdidXR0b24nLEJ1dHRvbik7XG4gICAgICAgIHRoaXMucmVnUGx1Z2luKCdkb3QnLERvdCk7XG4gICAgICAgIHRoaXMucmVnUGx1Z2luKCd6b29tcGljJywgZnVuY3Rpb24oem9vbU9wdHMpe1xuICAgICAgICAgICAgWm9vbS5pbml0Wm9vbSh7XG4gICAgICAgICAgICAgICAgY3VycmVudFNjYWxlOnpvb21PcHRzLmN1cnJlbnRTY2FsZSB8fCAxLFxuICAgICAgICAgICAgICAgIHpvb21GYWN0b3I6em9vbU9wdHMuem9vbUZhY3RvciB8fCAyLFxuICAgICAgICAgICAgICAgIGV4dGVuZEZ1bmN0aW9uOntcbiAgICAgICAgICAgICAgICAgICAgJ3N0YXJ0SGFuZGxlck9yaWdpbmFsJzpzdGFydEhhbmRsZXJPcmlnaW5hbCxcbiAgICAgICAgICAgICAgICAgICAgJ2VuZEhhbmRsZXJPcmlnaW5hbCc6ZW5kSGFuZGxlck9yaWdpbmFsLFxuICAgICAgICAgICAgICAgICAgICAnbW92ZUhhbmRsZXJPcmlnaW5hbCc6bW92ZUhhbmRsZXJPcmlnaW5hbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLmZpcmUoJ2luaXRpYWxpemUnKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgICAgICB0aGlzLl9pbml0UGx1Z2lucygpO1xuICAgICAgICB0aGlzLl9iaW5kSGFuZGxlcigpO1xuXG4gICAgICAgIHRoaXMuZXh0ZW5kKHtcbiAgICAgICAgICAgIHN0YXJ0SGFuZGxlcjogWm9vbS5zdGFydEhhbmRsZXIsXG4gICAgICAgICAgICBtb3ZlSGFuZGxlcjogWm9vbS5tb3ZlSGFuZGxlcixcbiAgICAgICAgICAgIGVuZEhhbmRsZXI6IFpvb20uZW5kSGFuZGxlclxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaVNsaWRlcjtcbiIsIi8qKlxuICogQGZpbGUgICBpU2xpZGVyLCBhIHNpbXBsZSwgZWZmaWNlbnQgbW9iaWxlIHNsaWRlciBzb2x1dGlvblxuICpcbiAqIEBhdXRob3IgQkVGRVxuICogQ29udGFjdCBxYmF0eS5xaUBnbWFpbC5jb21cbiAqXG4gKiBMSUNFTlNFXG4gKiBodHRwczovL2dpdGh1Yi5jb20vQkUtRkUvaVNsaWRlci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdHMgICAgICAgICAgICAgICAg5Y+C5pWw6ZuGXG4gKiBAcGFyYW0ge0VsZW1lbnR9ICAgICBvcHRzLmRvbSAgICAgICAgICAgIOWkluWxguWFg+e0oCAgICAgICAgT3V0ZXIgd3JhcHBlclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0cy5kYXRhICAgICAgICAgICDmlbDmja7liJfooaggICAgICAgIENvbnRlbnQgZGF0YVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBBbmltYXRpb24gZnJvbSAnLi9wbHVnaW5zL2lzbGlkZXJfYW5pbWF0ZS5qcyc7XG5cbi8qKlxuICogQ2hlY2sgaW4gYXJyYXlcbiAqIEBwYXJhbSBvRWxlbWVudFxuICogQHBhcmFtIGFTb3VyY2VcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpbkFycmF5KG9FbGVtZW50LCBhU291cmNlKSB7XG4gICAgcmV0dXJuIGFTb3VyY2UuaW5kZXhPZihvRWxlbWVudCkgPiAtMTtcbn1cblxuLyoqXG4gKiBDaGVjayBpcyBhcnJheVxuICogQHBhcmFtIG9cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc0FycmF5KG8pIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjbHNcbiAqIEByZXR1cm5zIHtBcnJheXx7aW5kZXg6IG51bWJlciwgaW5wdXQ6IHN0cmluZ319XG4gKi9cbmZ1bmN0aW9uIGhhc0NsYXNzKG9iaiwgY2xzKSB7XG4gICAgcmV0dXJuIG9iai5jbGFzc05hbWUubWF0Y2gobmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNscyArICcoXFxcXHN8JCknKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGNsc1xuICovXG5mdW5jdGlvbiBhZGRDbGFzcyhvYmosIGNscykge1xuICAgIGlmICghaGFzQ2xhc3Mob2JqLCBjbHMpKSB7XG4gICAgICAgIG9iai5jbGFzc05hbWUgKz0gJyAnICsgY2xzO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY2xzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKG9iaiwgY2xzKSB7XG4gICAgaWYgKGhhc0NsYXNzKG9iaiwgY2xzKSkge1xuICAgICAgICBvYmouY2xhc3NOYW1lID0gb2JqLmNsYXNzTmFtZS5yZXBsYWNlKFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNscyArICcoXFxcXHN8JCknKSwgJycpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDaGVjY2sgaXMgdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNVcmwodXJsKSB7XG4gICAgaWYgKC88XFwvP1tePl0qPi9nLnRlc3QodXJsKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IHJlZ2V4ID0gJ14nICtcbiAgICAgICAgJygoKGh0dHBzfGh0dHB8ZnRwfHJ0c3B8bW1zKTopPy8vKT8nICtcbiAgICAgICAgJygoWzAtOWEtel8hfipcXCcoKS4mPSskJS1dKzogKT9bMC05YS16XyF+KlxcJygpLiY9KyQlLV0rQCk/JyArXG4gICAgICAgICcoKFswLTldezEsM30uKXszfVswLTldezEsM318KFswLTlhLXpfIX4qXFwnKCktXSsuKSooWzAtOWEtel1bMC05YS16LV17MCw2MX0pP1swLTlhLXpdLlthLXpdezIsNn0pPycgK1xuICAgICAgICAnKDpbMC05XXsxLDR9KT8nICtcbiAgICAgICAgJyhbXlxcPyNdKyk/JyArXG4gICAgICAgICcoXFxcXFxcP1teI10rKT8nICtcbiAgICAgICAgJygjLispPycgK1xuICAgICAgICAnJCc7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgpLnRlc3QodXJsKTtcbn1cblxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIGlTbGljZXIoW1t7RWxlbWVudH0gY29udGFpbmVyLF0ge0FycmF5fSBkYXRhbGlzdCxdIHtvYmplY3R9IG9wdGlvbnMpXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGFsaXN0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogIG9wdGlvbnMuZG9tID4gY29udGFpbmVyXG4gKiAgb3B0aW9ucy5kYXRhID4gZGF0YWxpc3RcbiAqL1xuY2xhc3MgaVNsaWRlckNvcmUge1xuICAgIC8vRVM25Lit5paw5Z6L5p6E6YCg5ZmoXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCAzKTtcbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXJzIHJlcXVpcmVkIScpO1xuICAgICAgICB9XG4gICAgICAgIGxldCBvcHRzID0gYXJncy5wb3AoKTtcbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG9wdHMuZGF0YSA9IG9wdHMuZGF0YSB8fCBhcmdzWzFdO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG9wdHMuZG9tID0gb3B0cy5kb20gfHwgYXJnc1swXTtcblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRzLmRvbSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgY2FuIG5vdCBiZSBlbXB0eSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0cy5kYXRhIHx8ICFvcHRzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgbXVzdCBiZSBhbiBhcnJheSBhbmQgbXVzdCBoYXZlIG1vcmUgdGhhbiBvbmUgZWxlbWVudCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFdmVudCB3aGl0ZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5FVkVOVFMgPSAnaW5pdGlhbGl6ZSBzbGlkZSBzbGlkZVN0YXJ0IHNsaWRlRW5kIHNsaWRlQ2hhbmdlIHNsaWRlQ2hhbmdlZCBzbGlkZVJlc3RvcmUgc2xpZGVSZXN0b3JlZCByZWxvYWREYXRhIGRlc3Ryb3knLnNwbGl0KCcgJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVhc2luZyB3aGl0ZSBsaXN0XG4gICAgICAgICAqIEB0eXBlIFtBcnJheSwgUmVnRXhwW11dXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuRUFTSU5HID0gW1xuICAgICAgICAgICAgJ2xpbmVhciBlYXNlIGVhc2UtaW4gZWFzZS1vdXQgZWFzZS1pbi1vdXQnLnNwbGl0KCcgJyksXG4gICAgICAgICAgICAvY3ViaWMtYmV6aWVyXFwoKFteXFxkXSooXFxkKy4/XFxkKilbXlxcLF0qXFwsPyl7NH1cXCkvXG4gICAgICAgIF07XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRBR1Mgd2hpdGVsaXN0IG9uIGZpeHBhZ2UgbW9kZVxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuRklYX1BBR0VfVEFHUyA9ICdTRUxFQ1QgSU5QVVQgVEVYVEFSRUEgQlVUVE9OIExBQkVMJy5zcGxpdCgnICcpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQbHVnaW5zXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wbHVnaW5zID0ge307XG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogT3B0aW9uc1xuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fb3B0cyA9IG9wdHM7XG4gICAgICAgIG9wdHMgPSBhcmdzID0gbnVsbDtcblxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uRW5kRXZlbnQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgZW1wdHkgZnVuY3Rpb25cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIEVNUFRZX0ZVTkNUSU9OKCkge1xuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXh0ZW5kXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGV4dGVuZCgpIHtcbiAgICAgICAgbGV0IG1haW4sIGV4dGVuZCwgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIG1haW4gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGV4dGVuZCA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgbWFpbiA9IGFyZ3NbMF07XG4gICAgICAgICAgICAgICAgZXh0ZW5kID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAobGV0IHByb3BlcnR5IGluIGV4dGVuZCkge1xuICAgICAgICAgICAgaWYgKGV4dGVuZC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBtYWluW3Byb3BlcnR5XSA9IGV4dGVuZFtwcm9wZXJ0eV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0gbmFtZVxuICAgICAqIEBwYXJhbSBwbHVnaW5cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcmVnUGx1Z2luKG5hbWUsIHBsdWdpbikge1xuICAgICAgICB0aGlzLnBsdWdpbnNbbmFtZV0gPSB0aGlzLnBsdWdpbnNbbmFtZV0gfHwgcGx1Z2luO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfdHJhbnNpdGlvbkVuZEV2ZW50KCkge1xuICAgICAgICBsZXQgZXZ0TmFtZTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChldnROYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2dE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlRWxlbWVudCcpO1xuICAgICAgICAgICAgbGV0IHRyYW5zaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgICAgICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgdCBpbiB0cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZXZ0TmFtZSA9IHRyYW5zaXRpb25zW3RdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuY2xhc3MgaVNsaWRlclByb3RvdHlwZSBleHRlbmRzIGlTbGlkZXJDb3JlIHtcbiAgICBjb25zdHJ1Y3RvciguLi5vcHRzKSB7XG4gICAgICAgIC8v55u05o6l6LCD55So54i257G75p6E6YCg5Zmo6L+b6KGM5Yid5aeL5YyWXG4gICAgICAgIHN1cGVyKC4uLm9wdHMpO1xuICAgICAgICB0aGlzLl9zZXR0aW5nKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogc2V0dGluZyBwYXJhbWV0ZXJzIGZvciBzbGlkZXJcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9zZXR0aW5nKCkge1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgcGx1Z2luc1xuICAgICAgICAgKiBAdHlwZSB7QXJyYXl8e318Kn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX3BsdWdpbnMgPSB0aGlzLnBsdWdpbnM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqXG4gICAgICAgICAqIEB0eXBlIHt7ZGVmYXVsdDogRnVuY3Rpb259fCp9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hbmltYXRlRnVuY3MgPSB0aGlzLl9hbmltYXRlRnVuY3M7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5ob2xkaW5nID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5sb2NraW5nID0gZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGxpc3RlbmVyXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX0xTTiA9IHt9O1xuXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0gU2V0IG9wdGlvbnNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLl9vcHRzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkb20gZWxlbWVudCB3cmFwcGluZyBjb250ZW50XG4gICAgICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndyYXAgPSBvcHRzLmRvbTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGF0YSBsaXN0XG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kYXRhID0gb3B0cy5kYXRhO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBkZWZhdWx0IHNsaWRlIGRpcmVjdGlvblxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc1ZlcnRpY2FsID0gb3B0cy5pc1ZlcnRpY2FsIHx8IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPdmVyc3ByZWFkIG1vZGVcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gb3B0cy5pc092ZXJzcHJlYWQgfHwgZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBsYXkgdGltZSBnYXBcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgMjAwMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc3RhcnQgZnJvbSBpbml0SW5kZXggb3IgMFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluaXRJbmRleCA9IG9wdHMuaW5pdEluZGV4ID4gMCAmJiBvcHRzLmluaXRJbmRleCA8IG9wdHMuZGF0YS5sZW5ndGggLSAxID8gb3B0cy5pbml0SW5kZXggOiAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0b3VjaHN0YXJ0IHByZXZlbnQgZGVmYXVsdCB0byBmaXhQYWdlXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpeFBhZ2UgPSBvcHRzLmZpeFBhZ2UgfHwgdHJ1ZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2xpZGVJbmRleFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4IHx8IHRoaXMuaW5pdEluZGV4IHx8IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF4aXNcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5heGlzID0gdGhpcy5pc1ZlcnRpY2FsID8gJ1knIDogJ1gnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXZlcnNlQXhpc1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZXZlcnNlQXhpcyA9IHRoaXMuYXhpcyA9PT0gJ1knID8gJ1gnIDogJ1knO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcGVyIHdpZHRoXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy53cmFwLmNsaWVudFdpZHRoO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcGVyIGhlaWdodFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSYXRpbyBoZWlnaHQ6d2lkdGhcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmF0aW8gPSB0aGlzLmhlaWdodCAvIHRoaXMud2lkdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNjYWxlLCBzaXplIHJ1bGVcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLmlzVmVydGljYWwgPyB0aGlzLmhlaWdodCA6IHRoaXMud2lkdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9uIHNsaWRlIG9mZnNldCBwb3NpdGlvblxuICAgICAgICAgKiBAdHlwZSB7e1g6IG51bWJlciwgWTogbnVtYmVyfX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQgfHwge1g6IDAsIFk6IDB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGxvb3BpbmcgbG9naWMgYWRqdXN0XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc0xvb3BpbmcgPSB0aGlzLmRhdGEubGVuZ3RoID4gMSAmJiBvcHRzLmlzTG9vcGluZyA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYXV0b3BsYXkgbG9naWMgYWRqdXN0XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc0F1dG9wbGF5ID0gdGhpcy5kYXRhLmxlbmd0aCA+IDEgJiYgb3B0cy5pc0F1dG9wbGF5ID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgICAgIC8vIGxpdHRsZSB0cmljayBzZXQsIHdoZW4geW91IGNob29jZSB0ZWFyICYgdmVydGljYWwgc2FtZSB0aW1lXG4gICAgICAgIC8vIGlTbGlkZXIgb3ZlcnNwcmVhZCBtb2RlIHdpbGwgYmUgc2V0IHRydWUgYXV0b21ldGljbHlcbiAgICAgICAgaWYgKG9wdHMuYW5pbWF0ZVR5cGUgPT09ICdjYXJkJyAmJiB0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWJ1ZyBtb2RlXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubG9nID0gb3B0cy5pc0RlYnVnID8gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZ2xvYmFsLmNvbnNvbGUubG9nLmFwcGx5KGdsb2JhbC5jb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgICB9IDogdGhpcy5FTVBUWV9GVU5DVElPTjtcblxuICAgICAgICAvLyBzZXQgRGFtcGluZyBmdW5jdGlvblxuICAgICAgICB0aGlzLl9zZXRVcERhbXBpbmcoKTtcblxuICAgICAgICAvLyBzdG9wIGF1dG9wbGF5IHdoZW4gd2luZG93IGJsdXJcbiAgICAgICAgLy8gdGhpcy5fc2V0UGxheVdoZW5Gb2N1cygpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhbmltYXRpb24gcGFybWFzOlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge0VsZW1lbnR9ICAgICAgZG9tICAgICAgICAgICAgIOWbvueJh+eahOWkluWxgjxsaT7lrrnlmaggICAgICAgSW1nIHdyYXBwZXJcbiAgICAgICAgICogQHBhcmFtIHtTdHJpbmd9ICAgICAgIGF4aXMgICAgICAgICAgICDliqjnlLvmlrnlkJEgICAgICAgICAgICAgICAgYW5pbWF0ZSBkaXJlY3Rpb25cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIHNjYWxlICAgICAgICAgICDlrrnlmajlrr3luqYgICAgICAgICAgICAgICAgT3V0ZXIgd3JhcHBlclxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgaSAgICAgICAgICAgICAgIDxsaT7lrrnlmahpbmRleCAgICAgICAgICBJbWcgd3JhcHBlcidzIGluZGV4XG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICBvZmZzZXQgICAgICAgICAg5ruR5Yqo6Led56a7ICAgICAgICAgICAgICAgIG1vdmUgZGlzdGFuY2VcbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmNzID0ge1xuICAgICAgICAgICAgJ2RlZmF1bHQnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmV4dGVuZCh0aGlzLl9hbmltYXRlRnVuY3MsIEFuaW1hdGlvbik7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jID0gdGhpcy5fYW5pbWF0ZUZ1bmNzW29wdHMuYW5pbWF0ZVR5cGUgaW4gdGhpcy5fYW5pbWF0ZUZ1bmNzID8gb3B0cy5hbmltYXRlVHlwZSA6ICdkZWZhdWx0J107XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFuaW1hdGUgcHJvY2VzcyB0aW1lIChtcyksIGRlZmF1bHQ6IDMwMG1zXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYW5pbWF0ZVRpbWUgPSBvcHRzLmFuaW1hdGVUaW1lICE9IG51bGwgJiYgb3B0cy5hbmltYXRlVGltZSA+IC0xID8gb3B0cy5hbmltYXRlVGltZSA6IDMwMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW5pbWF0ZSBlZmZlY3RzLCBkZWZhdWx0OiBlYXNlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYW5pbWF0ZUVhc2luZyA9XG4gICAgICAgICAgICBpbkFycmF5KG9wdHMuYW5pbWF0ZUVhc2luZywgdGhpcy5FQVNJTkdbMF0pXG4gICAgICAgICAgICB8fCB0aGlzLkVBU0lOR1sxXS50ZXN0KG9wdHMuYW5pbWF0ZUVhc2luZylcbiAgICAgICAgICAgICAgICA/IG9wdHMuYW5pbWF0ZUVhc2luZ1xuICAgICAgICAgICAgICAgIDogJ2Vhc2UnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbiBzbGlkZSBhbmltYXRpb25cbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaW5BbmltYXRlID0gMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRml4IHRvdWNoL21vdXNlIGV2ZW50c1xuICAgICAgICAgKiBAdHlwZSB7e2hhc1RvdWNoLCBzdGFydEV2dCwgbW92ZUV2dCwgZW5kRXZ0fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZGV2aWNlRXZlbnRzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxldCBoYXNUb3VjaCA9ICEhKCgnb250b3VjaHN0YXJ0JyBpbiBnbG9iYWwpIHx8IGdsb2JhbC5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgZ2xvYmFsLkRvY3VtZW50VG91Y2gpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoYXNUb3VjaDogaGFzVG91Y2gsXG4gICAgICAgICAgICAgICAgc3RhcnRFdnQ6IGhhc1RvdWNoID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZG93bicsXG4gICAgICAgICAgICAgICAgbW92ZUV2dDogaGFzVG91Y2ggPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgICAgIGVuZEV2dDogaGFzVG91Y2ggPyAndG91Y2hlbmQnIDogJ21vdXNldXAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluaXQgZXZlbnRzXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuZXZlbnRzID0ge31cblxuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgICAgICAvLyAtIFJlZ2lzdGVyIGV2ZW50c1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgaXMgbW92aW5nXG4gICAgICAgIHRoaXMub24oJ3NsaWRlJywgb3B0cy5vbnNsaWRlKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHlvdXIgZmluZ2VyIHRvdWNoIHRoZSBzY3JlZW5cbiAgICAgICAgdGhpcy5vbignc2xpZGVTdGFydCcsIG9wdHMub25zbGlkZXN0YXJ0KTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBmaW5nZXIgbW92ZSBvdXQgb2YgdGhlIHNjcmVlblxuICAgICAgICB0aGlzLm9uKCdzbGlkZUVuZCcsIG9wdHMub25zbGlkZWVuZCk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBzbGlkZSB0byBuZXh0L3ByZXYgc2NlbmVcbiAgICAgICAgdGhpcy5vbignc2xpZGVDaGFuZ2UnLCBvcHRzLm9uc2xpZGVjaGFuZ2UpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gbmV4dC9wcmV2IHNjZW5lLCB3aGlsZSBhbmltYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgICAgICB0aGlzLm9uKCdzbGlkZUNoYW5nZWQnLCBvcHRzLm9uc2xpZGVjaGFuZ2VkKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHJlc3RvcmUgdG8gdGhlIGN1cnJlbnQgc2NlbmVcbiAgICAgICAgdGhpcy5vbignc2xpZGVSZXN0b3JlJywgb3B0cy5vbnNsaWRlcmVzdG9yZSk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiByZXN0b3JlIHRvIHRoZSBjdXJyZW50IHNjZW5lLCB3aGlsZSBhbmltYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgICAgICB0aGlzLm9uKCdzbGlkZVJlc3RvcmVkJywgb3B0cy5vbnNsaWRlcmVzdG9yZWQpO1xuXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0gUGx1Z2luc1xuICAgICAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wbHVnaW5Db25maWcgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKGlzQXJyYXkob3B0cy5wbHVnaW5zKSkge1xuICAgICAgICAgICAgICAgIGxldCBjb25maWcgPSB7fVxuICAgICAgICAgICAgICAgIG9wdHMucGx1Z2lucy5mb3JFYWNoKGZ1bmN0aW9uIHBsdWdpbkNvbmZpZ0VhY2gocGx1Z2luKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1twbHVnaW5bMF1dID0gcGx1Z2luLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWdbcGx1Z2luXSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKCk7XG5cbiAgICAgICAgLy8gQXV0b3BsYXkgbW9kZVxuICAgICAgICBpZiAodGhpcy5pc0F1dG9wbGF5KSB7XG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluaXQgcGx1Z2luc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXRQbHVnaW5zKCkge1xuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5wbHVnaW5Db25maWc7XG4gICAgICAgIGxldCBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcbiAgICAgICAgZm9yIChsZXQgaSBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkoaSkgJiYgcGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdbSU5JVCBQTFVHSU5dOicsIGksIHBsdWdpbnNbaV0pO1xuICAgICAgICAgICAgICAgIHBsdWdpbnNbaV1cbiAgICAgICAgICAgICAgICAmJiB0eXBlb2YgcGx1Z2luc1tpXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICYmIHR5cGVvZiBwbHVnaW5zW2ldLmFwcGx5XG4gICAgICAgICAgICAgICAgJiYgcGx1Z2luc1tpXS5hcHBseSh0aGlzLCBjb25maWdbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZW5hYmxlIGRhbXBpbmcgd2hlbiBzbGlkZXIgbWVldCB0aGUgZWRnZVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3NldFVwRGFtcGluZygpIHtcbiAgICAgICAgbGV0IG9uZUluMiA9IHRoaXMuc2NhbGUgPj4gMTtcbiAgICAgICAgbGV0IG9uZUluNCA9IG9uZUluMiA+PiAxO1xuICAgICAgICBsZXQgb25lSW4xNiA9IG9uZUluNCA+PiAyO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBpbml0IGRhbXBpbmcgZnVuY3Rpb25cbiAgICAgICAgICogQHBhcmFtIGRpc3RhbmNlXG4gICAgICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fZGFtcGluZyA9IGZ1bmN0aW9uIChkaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IGRpcyA9IE1hdGguYWJzKGRpc3RhbmNlKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgIGlmIChkaXMgPCBvbmVJbjIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkaXMgPj4gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGRpcyA8IG9uZUluMiArIG9uZUluNCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArICgoZGlzIC0gb25lSW4yKSA+PiAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArIG9uZUluMTYgKyAoKGRpcyAtIG9uZUluMiAtIG9uZUluNCkgPj4gMyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZSA+IDAgPyByZXN1bHQgOiAtcmVzdWx0O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IGl0ZW0gdHlwZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXRlbVR5cGUoaXRlbSkge1xuICAgICAgICBpZiAoIWlzTmFOKGl0ZW0pKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2l0ZW1dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbnRlbnQgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgIGxldCB0eXBlO1xuICAgICAgICBpZiAoY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2VtcHR5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChCb29sZWFuKGNvbnRlbnQubm9kZU5hbWUpICYmIEJvb2xlYW4oY29udGVudC5ub2RlVHlwZSkpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ25vZGUnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNVcmwoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdwaWMnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnaHRtbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS50eXBlID0gdHlwZTtcblxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgc2luZ2xlIGl0ZW0gaHRtbCBieSBpZHhcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAuLlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggIC4uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVuZGVySXRlbShlbCwgZGF0YUluZGV4KSB7XG5cbiAgICAgICAgbGV0IGl0ZW0sIGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG5cbiAgICAgICAgbGV0IGluc2VydEltZyA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgICAgICAgbGV0IHNpbWcgPSAnIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCInO1xuXG4gICAgICAgICAgICBpZiAoaXRlbS5oZWlnaHQgLyBpdGVtLndpZHRoID4gdGhpcy5yYXRpbykge1xuICAgICAgICAgICAgICAgIHNpbWcgKz0gJyBoZWlnaHQ9XCInICsgZWwuY2xpZW50SGVpZ2h0ICsgJ1wiJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2ltZyArPSAnIHdpZHRoPVwiJyArIGVsLmNsaWVudFdpZHRoICsgJ1wiJztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNPdmVyc3ByZWFkKSB7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICd1cmwoJyArIGl0ZW0uY29udGVudCArICcpIG5vLXJlcGVhdCA1MCUgNTAlL2NvdmVyJztcbiAgICAgICAgICAgICAgICBzaW1nICs9ICcgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO29wYWNpdHk6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO1wiJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSAnPGltZycgKyBzaW1nICsgJyAvPic7XG4gICAgICAgIH1cbiAgICAgICAgICAgIC5cbiAgICAgICAgICAgIGJpbmQodGhpcyk7XG5cbiAgICAgICAgLy8gY2xlYW4gc2NlbmVcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAnJztcblxuICAgICAgICAvLyBnZXQgdGhlIHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgICAgICBpZiAoIXRoaXMuaXNMb29waW5nICYmIHRoaXMuZGF0YVtkYXRhSW5kZXhdID09IG51bGwpIHtcbiAgICAgICAgICAgIC8vIFN0b3Agc2xpZGUgd2hlbiBpdGVtIGlzIGVtcHR5XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhSW5kZXggPSAobGVuIC8qICogTWF0aC5jZWlsKE1hdGguYWJzKGRhdGFJbmRleCAvIGxlbikpKi8gKyBkYXRhSW5kZXgpICUgbGVuO1xuICAgICAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtkYXRhSW5kZXhdO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHR5cGUgPSB0aGlzLl9pdGVtVHlwZShpdGVtKTtcblxuICAgICAgICB0aGlzLmxvZygnW1JlbmRlciBJVEVNXTonLCB0eXBlLCBkYXRhSW5kZXgsIGl0ZW0pO1xuXG4gICAgICAgIGVsLmNsYXNzTmFtZSA9ICdpc2xpZGVyLScgKyB0eXBlO1xuXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgY2FzZSAncGljJzpcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5oZWlnaHQgJiYgaXRlbS53aWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRJbWcuc3JjID0gaXRlbS5jb250ZW50O1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW1nLm9ubG9hZCA9IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhlaWdodCA9IGN1cnJlbnRJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS53aWR0aCA9IGN1cnJlbnRJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxvYWRlZCA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RvbSc6XG4gICAgICAgICAgICBjYXNlICdodG1sJzpcbiAgICAgICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdub2RlJzpcbiAgICAgICAgICAgIGNhc2UgJ2VsZW1lbnQnOlxuICAgICAgICAgICAgICAgIC8vIGZyYWdtZW50LCBjcmVhdGUgY29udGFpbmVyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0uY29udGVudC5ub2RlVHlwZSA9PT0gMTEpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGVudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBlbnRpdHkuYXBwZW5kQ2hpbGQoaXRlbS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jb250ZW50ID0gZW50aXR5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChpdGVtLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQb3N0cG9uaW5nIHRoZSBpbnRlcm1lZGlhdGUgc2NlbmUgcmVuZGVyaW5nXG4gICAgICogdW50aWwgdGhlIHRhcmdldCBzY2VuZSBpcyBjb21wbGV0ZWx5IHJlbmRlcmVkIChyZW5kZXIgaW4gZXZlbnQgc2xpZGVDaGFuZ2VkKVxuICAgICAqIHRvIGF2b2lkIGEganVtcHkgZmVlbCB3aGVuIHN3aXRjaGluZyBiZXR3ZWVuIHNjZW5lc1xuICAgICAqIGdpdmVuIHRoYXQgdGhlIGRpc3RhbmNlIG9mIHNsaWRpbmcgaXMgbW9yZSB0aGFuIDEuXG4gICAgICogZS5nLiBgYGB0aGlzLnNsaWRlVG8oPistMSlgYGBcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCkge1xuICAgICAgICBpZiAodGhpcy5faW50ZXJtZWRpYXRlU2NlbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbS5hcHBseSh0aGlzLCB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSk7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBcHBseSBzdHlsZXMgb24gY2hhbmdlZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2NoYW5nZWRTdHlsZXMoKSB7XG4gICAgICAgIGxldCBzbGlkZVN0eWxlcyA9IFsnaXNsaWRlci1wcmV2JywgJ2lzbGlkZXItYWN0aXZlJywgJ2lzbGlkZXItbmV4dCddO1xuICAgICAgICB0aGlzLmVscy5mb3JFYWNoKGZ1bmN0aW9uIGNoYW5nZVN0eXBlRWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHJlbW92ZUNsYXNzKGVsLCAnKCcgKyBzbGlkZVN0eWxlcy5qb2luKCd8JykgKyAnKScpO1xuICAgICAgICAgICAgYWRkQ2xhc3MoZWwsIHNsaWRlU3R5bGVzW2luZGV4XSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIGxpc3QgaHRtbFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlcldyYXBwZXIoKSB7XG4gICAgICAgIHRoaXMub3V0ZXIgJiYgKHRoaXMub3V0ZXIuaW5uZXJIVE1MID0gJycpO1xuICAgICAgICAvLyBpbml0YWlsIHVsIGVsZW1lbnRcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlciB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBvdXRlci5jbGFzc05hbWUgPSAnaXNsaWRlci1vdXRlcic7XG5cbiAgICAgICAgLy8gc3RvcmFnZSBsaSBlbGVtZW50cywgb25seSBzdG9yZSAzIGVsZW1lbnRzIHRvIHJlZHVjZSBtZW1vcnkgdXNhZ2VcbiAgICAgICAgdGhpcy5lbHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICB0aGlzLmVscy5wdXNoKGxpKTtcblxuICAgICAgICAgICAgLy8gcHJlcGFyZSBzdHlsZSBhbmltYXRpb25cbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGxpLCB0aGlzLmF4aXMsIHRoaXMuc2NhbGUsIGksIDApO1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCAmJiAodGhpcy5fb3B0cy5hbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgdGhpcy5fb3B0cy5hbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obGksIDEgLSBpICsgdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0obGksIGkgLSAxICsgdGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dGVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX2NoYW5nZWRTdHlsZXMoKTtcblxuICAgICAgICAvLyBQcmVsb2FkIHBpY3R1cmUgWyBtYXkgYmUgcGljIDopIF1cbiAgICAgICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fcHJlbG9hZEltZyh0aGlzLnNsaWRlSW5kZXgpO1xuICAgICAgICB9LmJpbmQodGhpcyksIDIwMCk7XG5cbiAgICAgICAgLy8gYXBwZW5kIHVsIHRvIGRpdiNjYW52YXNcbiAgICAgICAgaWYgKCF0aGlzLm91dGVyKSB7XG4gICAgICAgICAgICB0aGlzLm91dGVyID0gb3V0ZXI7XG4gICAgICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJlbG9hZCBpbWcgd2hlbiBzbGlkZUNoYW5nZVxuICAgICAqIEZyb20gY3VycmVudCBpbmRleCArMiwgLTIgc2NlbmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4IG1lYW5zIHdoaWNoIGltYWdlIHdpbGwgYmUgbG9hZFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3ByZWxvYWRJbWcoZGF0YUluZGV4KSB7XG4gICAgICAgIGlmICh0aGlzLmRhdGEubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBsZXQgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBsZXQgbG9hZEltZyA9IGZ1bmN0aW9uIHByZWxvYWRJbWdMb2FkaW5nUHJvY2VzcyhpbmRleCkge1xuICAgICAgICAgICAgICAgIGxldCBpdGVtID0gZGF0YVtpbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKHNlbGYuX2l0ZW1UeXBlKGl0ZW0pID09PSAncGljJyAmJiAhaXRlbS5sb2FkZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZWxvYWRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZEltZy5zcmMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gcHJlbG9hZEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gcHJlbG9hZEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZGVkID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBsb2FkSW1nKChkYXRhSW5kZXggKyAyKSAlIGxlbik7XG4gICAgICAgICAgICBsb2FkSW1nKChkYXRhSW5kZXggLSAyICsgbGVuKSAlIGxlbik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBXYXRjaCBldmVudCB0cmFuc2l0aW9uRW5kXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfd2F0Y2hUcmFuc2l0aW9uRW5kKHRpbWUsIGV2ZW50VHlwZSkge1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBsZXQgbHNuO1xuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6JywgJ3dhdGNoVHJhbnNpdGlvbkVuZDo6c3R1Y2s6OnBpbGUnLCB0aGlzLmluQW5pbWF0ZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGV2dCkge1xuICAgICAgICAgICAgaWYgKGxzbikge1xuICAgICAgICAgICAgICAgIGdsb2JhbC5jbGVhclRpbWVvdXQobHNuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuaW5BbmltYXRlLS07XG4gICAgICAgICAgICBzZWxmLmxvZygnRXZlbnQ6JywgJ3dhdGNoVHJhbnNpdGlvbkVuZDo6c3R1Y2s6OnJlbGVhc2UnLCBzZWxmLmluQW5pbWF0ZSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5pbkFuaW1hdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvL3NlbGYuaW5BbmltYXRlID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnc2xpZGVDaGFuZ2VkJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9jaGFuZ2VkU3R5bGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9yZW5kZXJJbnRlcm1lZGlhdGVTY2VuZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdW5XYXRjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdW5XYXRjaCgpIHtcbiAgICAgICAgICAgIHNlbGYuZWxzLmZvckVhY2goZnVuY3Rpb24gdHJhbnNsYXRpb25FbmRVbndhdGNoRWFjaChlbCkge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoc2VsZi5fdHJhbnNpdGlvbkVuZEV2ZW50KCksIGhhbmRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICAgICAgc2VsZi5lbHMuZm9yRWFjaChmdW5jdGlvbiB0cmFuc2xhdGlvbkVuZEVsc0VhY2goZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKHNlbGYuX3RyYW5zaXRpb25FbmRFdmVudCgpLCBoYW5kbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgbHNuID0gZ2xvYmFsLnNldFRpbWVvdXQoaGFuZGxlLCB0aW1lKTtcbiAgICAgICAgc2VsZi5pbkFuaW1hdGUrKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBiaW5kIGFsbCBldmVudCBoYW5kbGVyLCB3aGVuIG9uIFBDLCBkaXNhYmxlIGRyYWcgZXZlbnRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9iaW5kSGFuZGxlcigpIHtcbiAgICAgICAgbGV0IG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuXG4gICAgICAgIGlmICghZGV2aWNlLmhhc1RvdWNoKSB7XG4gICAgICAgICAgICBvdXRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICBvdXRlci5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uIChldnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2Uuc3RhcnRFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5tb3ZlRXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2UuZW5kRXZ0LCB0aGlzKTtcblxuICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMpO1xuXG4gICAgICAgIC8vIEZpeCBhbmRyb2lkIGRldmljZVxuICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLCBmYWxzZSk7XG4gICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqICBVbmlmb3JtaXR5IGFkbWluIGV2ZW50XG4gICAgICogIEV2ZW50IHJvdXRlclxuICAgICAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgaGFuZGxlRXZlbnQoZXZ0KSB7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgc3dpdGNoIChldnQudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgICAgICBpZiAoIShldnQuYnV0dG9uID09PSAwICYmIGV2dC5idXR0b25zID09PSAxKSkgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SGFuZGxlcihldnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBkZXZpY2UubW92ZUV2dDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRldmljZS5lbmRFdnQ6XG4gICAgICAgICAgICBjYXNlICd0b3VjaGNhbmNlbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvcmllbnRhdGlvbmNoYW5nZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdyZXNpemUnOlxuICAgICAgICAgICAgICAgIHRoaXMucmVzaXplSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNoc3RhcnQgY2FsbGJhY2tcbiAgICAgKiAgQHBhcmFtIHtvYmplY3R9IGV2dCBldmVudCBvYmplY3RcbiAgICAgKiAgQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHN0YXJ0SGFuZGxlcihldnQpIHtcbiAgICAgICAgaWYgKHRoaXMuZml4UGFnZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuRklYX1BBR0VfVEFHUy5pbmRleE9mKGV2dC50YXJnZXQudGFnTmFtZSkgPCAwKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaG9sZGluZyB8fCB0aGlzLmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG5cbiAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBzdGFydCcpO1xuICAgICAgICB0aGlzLmZpcmUoJ3NsaWRlU3RhcnQnLCBldnQsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHRoaXMuc3RhcnRYID0gZGV2aWNlLmhhc1RvdWNoID8gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBldnQucGFnZVg7XG4gICAgICAgIHRoaXMuc3RhcnRZID0gZGV2aWNlLmhhc1RvdWNoID8gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBldnQucGFnZVk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNobW92ZSBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgbW92ZUhhbmRsZXIoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc01vdmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDogbW92aW5nJyk7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgIGxldCBheGlzID0gdGhpcy5heGlzO1xuICAgICAgICBsZXQgcmV2ZXJzZUF4aXMgPSB0aGlzLnJldmVyc2VBeGlzO1xuICAgICAgICBsZXQgb2Zmc2V0ID0ge1xuICAgICAgICAgICAgWDogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zdGFydFgpIDogKGV2dC5wYWdlWCAtIHRoaXMuc3RhcnRYKSxcbiAgICAgICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgICAgIGlmIChNYXRoLmFicyhvZmZzZXRbYXhpc10pIC0gTWF0aC5hYnMob2Zmc2V0W3JldmVyc2VBeGlzXSkgPiAxMCkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZmlyZSgnc2xpZGUnLCBldnQsIHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFtheGlzXSA+IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSAwIHx8IG9mZnNldFtheGlzXSA8IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBsZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFtheGlzXSA9IHRoaXMuX2RhbXBpbmcob2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmVsc1tpXTtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDBzJztcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyhpdGVtLCBheGlzLCB0aGlzLnNjYWxlLCBpLCBvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHRvdWNoZW5kIGNhbGxiYWNrXG4gICAgICogIEBwYXJhbSB7T2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gICAgICogIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBlbmRIYW5kbGVyKGV2dCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNNb3ZpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IGVuZCcpO1xuICAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgbGV0IGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgICAgIGxldCBib3VuZGFyeSA9IHRoaXMuc2NhbGUgLyAyO1xuICAgICAgICBsZXQgZW5kVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIC8vIGEgcXVpY2sgc2xpZGUgdGltZSBtdXN0IHVuZGVyIDMwMG1zXG4gICAgICAgIC8vIGEgcXVpY2sgc2xpZGUgc2hvdWxkIGFsc28gc2xpZGUgYXQgbGVhc3QgMTQgcHhcbiAgICAgICAgYm91bmRhcnkgPSBlbmRUaW1lIC0gdGhpcy5zdGFydFRpbWUgPiAzMDAgPyBib3VuZGFyeSA6IDE0O1xuXG4gICAgICAgIGxldCBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXRbYXhpc10pO1xuICAgICAgICBsZXQgYWJzUmV2ZXJzZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldFt0aGlzLnJldmVyc2VBeGlzXSk7XG5cbiAgICAgICAgbGV0IGdldExpbmsgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwuaHJlZikge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWwubG9jYXRpb24uaHJlZiA9IGVsLmhyZWZcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGVsLmNsYXNzTmFtZSAhPT0gJ2lzbGlkZXItcGljJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGdldExpbmsoZWwucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5sb2coYm91bmRhcnksIG9mZnNldFtheGlzXSwgYWJzT2Zmc2V0LCBhYnNSZXZlcnNlT2Zmc2V0LCB0aGlzKTtcblxuICAgICAgICBpZiAob2Zmc2V0W2F4aXNdID49IGJvdW5kYXJ5ICYmIGFic1JldmVyc2VPZmZzZXQgPCBhYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXggLSAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChvZmZzZXRbYXhpc10gPCAtYm91bmRhcnkgJiYgYWJzUmV2ZXJzZU9mZnNldCA8IGFic09mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGFwIGV2ZW50IGlmIG9mZnNldCA8IDEwXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLm9mZnNldC5YKSA8IDEwICYmIE1hdGguYWJzKHRoaXMub2Zmc2V0LlkpIDwgMTApIHtcbiAgICAgICAgICAgIHRoaXMudGFwRXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgICAgICB0aGlzLnRhcEV2dC5pbml0RXZlbnQoJ3RhcCcsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZml4UGFnZSkge1xuICAgICAgICAgICAgICAgIGV2dC50YXJnZXQgJiYgZ2V0TGluayhldnQudGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZXZ0LnRhcmdldC5kaXNwYXRjaEV2ZW50KHRoaXMudGFwRXZ0KSkge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vZmZzZXQuWCA9IHRoaXMub2Zmc2V0LlkgPSAwO1xuXG4gICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcblxuICAgICAgICB0aGlzLmZpcmUoJ3NsaWRlRW5kJywgZXZ0LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiAgb3JpZW50YXRpb25jaGFuZ2UgY2FsbGJhY2tcbiAgICAgKiAgQHByb3RlY3RlZFxuICAgICAqL1xuICAgIG9yaWVudGF0aW9uY2hhbmdlSGFuZGxlcigpIHtcbiAgICAgICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBvcmllbnRhdGlvbmNoYW5nZScpO1xuICAgICAgICB9LmJpbmQodGhpcyksIDEwMCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVzaXplIGNhbGxiYWNrXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmhlaWdodCAhPT0gdGhpcy53cmFwLmNsaWVudEhlaWdodCB8fCB0aGlzLndpZHRoICE9PSB0aGlzLndyYXAuY2xpZW50V2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX0xTTi5yZXNpemUgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04ucmVzaXplKTtcbiAgICAgICAgICAgIHRoaXMuX0xTTi5yZXNpemUgPSBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdFdmVudDogcmVzaXplJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5yZXNpemUpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCA1MDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogIHNsaWRlIGxvZ2ljYWwsIGdvdG8gZGF0YSBpbmRleFxuICAgICAqICBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4IHRoZSBnb3RvIGluZGV4XG4gICAgICogIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzbGlkZVRvKGRhdGFJbmRleCwgb3B0cykge1xuICAgICAgICBpZiAodGhpcy5sb2NraW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51bmhvbGQoKTtcbiAgICAgICAgbGV0IGFuaW1hdGVUaW1lID0gdGhpcy5hbmltYXRlVGltZTtcbiAgICAgICAgbGV0IGFuaW1hdGVUeXBlID0gdGhpcy5fb3B0cy5hbmltYXRlVHlwZTtcbiAgICAgICAgbGV0IGFuaW1hdGVGdW5jID0gdGhpcy5fYW5pbWF0ZUZ1bmM7XG4gICAgICAgIGxldCBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICBsZXQgZWxzID0gdGhpcy5lbHM7XG4gICAgICAgIGxldCBpZHggPSBkYXRhSW5kZXg7XG4gICAgICAgIGxldCBuID0gZGF0YUluZGV4IC0gdGhpcy5zbGlkZUluZGV4O1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGxldCBldmVudFR5cGU7XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG9wdHMuYW5pbWF0ZVRpbWUgPiAtMSkge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVUaW1lID0gb3B0cy5hbmltYXRlVGltZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0cy5hbmltYXRlVHlwZSA9PT0gJ3N0cmluZycgJiYgb3B0cy5hbmltYXRlVHlwZSBpbiB0aGlzLl9hbmltYXRlRnVuY3MpIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlVHlwZSA9IG9wdHMuYW5pbWF0ZVR5cGU7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuY3NbYW5pbWF0ZVR5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW4gdGhlIHNsaWRlIHByb2Nlc3MsIGFuaW1hdGUgdGltZSBpcyBzcXVlZXplZFxuICAgICAgICBsZXQgc3F1ZWV6ZVRpbWUgPSBNYXRoLmFicyhvZmZzZXRbdGhpcy5heGlzXSkgLyB0aGlzLnNjYWxlICogYW5pbWF0ZVRpbWU7XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKG4pID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShuID4gMCA/IHRoaXMuZWxzWzJdIDogdGhpcy5lbHNbMF0sIGlkeCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwcmVsb2FkIHdoZW4gc2xpZGVcbiAgICAgICAgdGhpcy5fcHJlbG9hZEltZyhpZHgpO1xuXG4gICAgICAgIC8vIGdldCByaWdodCBpdGVtIG9mIGRhdGFcbiAgICAgICAgaWYgKGRhdGFbaWR4XSkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gaWR4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gbiA+IDAgPyAwIDogZGF0YS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4O1xuICAgICAgICAgICAgICAgIG4gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2coJ0luZGV4OicgKyB0aGlzLnNsaWRlSW5kZXgpO1xuXG4gICAgICAgIC8vIGtlZXAgdGhlIHJpZ2h0IG9yZGVyIG9mIGl0ZW1zXG4gICAgICAgIGxldCBoZWFkRWwsIHRhaWxFbCwgc3RlcDtcblxuICAgICAgICAvLyBzbGlkZWNoYW5nZSBzaG91bGQgcmVuZGVyIG5ldyBpdGVtXG4gICAgICAgIC8vIGFuZCBjaGFuZ2UgbmV3IGl0ZW0gc3R5bGUgdG8gZml0IGFuaW1hdGlvblxuICAgICAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAgICAgLy8gUmVzdG9yZSB0byBjdXJyZW50IHNjZW5lXG4gICAgICAgICAgICBldmVudFR5cGUgPSAnc2xpZGVSZXN0b3JlJztcbiAgICAgICAgfSBlbHNlIHtcblxuICAgICAgICAgICAgaWYgKCh0aGlzLmlzVmVydGljYWwgJiYgKGFuaW1hdGVUeXBlID09PSAncm90YXRlJyB8fCBhbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSkgXiAobiA+IDApKSB7XG4gICAgICAgICAgICAgICAgZWxzLnB1c2goZWxzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgICAgIGhlYWRFbCA9IGVsc1syXTtcbiAgICAgICAgICAgICAgICB0YWlsRWwgPSBlbHNbMF07XG4gICAgICAgICAgICAgICAgc3RlcCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbHMudW5zaGlmdChlbHMucG9wKCkpO1xuICAgICAgICAgICAgICAgIGhlYWRFbCA9IGVsc1swXTtcbiAgICAgICAgICAgICAgICB0YWlsRWwgPSBlbHNbMl07XG4gICAgICAgICAgICAgICAgc3RlcCA9IC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMobikgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJbnRlcm1lZGlhdGVTY2VuZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0oaGVhZEVsLCBpZHggKyBuKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShoZWFkRWwsIGlkeCArIHN0ZXApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lID0gW3RhaWxFbCwgaWR4IC0gc3RlcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhlYWRFbC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgaGVhZEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGhlYWRFbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgfSwgMjAwKTtcblxuICAgICAgICAgICAgLy8gTWludXMgc3F1ZWV6ZSB0aW1lXG4gICAgICAgICAgICBzcXVlZXplVGltZSA9IGFuaW1hdGVUaW1lIC0gc3F1ZWV6ZVRpbWU7XG5cbiAgICAgICAgICAgIGV2ZW50VHlwZSA9ICdzbGlkZUNoYW5nZSc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpcmUoZXZlbnRUeXBlLCB0aGlzLnNsaWRlSW5kZXgsIGVsc1sxXSwgdGhpcyk7XG4gICAgICAgIHRoaXMuX3dhdGNoVHJhbnNpdGlvbkVuZChzcXVlZXplVGltZSwgZXZlbnRUeXBlICsgJ2QnLCB0aGlzLnNsaWRlSW5kZXgsIGVsc1sxXSwgdGhpcyk7XG5cbiAgICAgICAgLy8gZG8gdGhlIHRyaWNrIGFuaW1hdGlvblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgaWYgKGVsc1tpXSAhPT0gaGVhZEVsKSB7XG4gICAgICAgICAgICAgICAgZWxzW2ldLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsICcgKyAoc3F1ZWV6ZVRpbWUgLyAxMDAwKSArICdzICcgKyB0aGlzLmFuaW1hdGVFYXNpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbmltYXRlRnVuYy5jYWxsKHRoaXMsIGVsc1tpXSwgdGhpcy5heGlzLCB0aGlzLnNjYWxlLCBpLCAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIG5vdCBsb29waW5nLCBzdG9wIHBsYXlpbmcgd2hlbiBtZWV0IHRoZSBlbmQgb2YgZGF0YVxuICAgICAgICBpZiAodGhpcy5pc0F1dG9wbGF5ICYmICF0aGlzLmlzTG9vcGluZyAmJiB0aGlzLnNsaWRlSW5kZXggPT09IGRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2xpZGUgdG8gbmV4dCBzY2VuZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzbGlkZU5leHQoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVUby5hcHBseSh0aGlzLCBbdGhpcy5zbGlkZUluZGV4ICsgMV0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTbGlkZSB0byBwcmV2aW91cyBzY2VuZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzbGlkZVByZXYoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVUby5hcHBseSh0aGlzLCBbdGhpcy5zbGlkZUluZGV4IC0gMV0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBwbHVnaW4gKHJ1biB0aW1lIG1vZGUpXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBwbHVnaW5cbiAgICAgKiBAcGFyYW0gey4uLn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAvKiByZWdQbHVnaW4oKSB7XG4gICAgICAgIGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgbGV0IG5hbWUgPSBhcmdzLnNoaWZ0KCksXG4gICAgICAgICAgICBwbHVnaW4gPSBhcmdzWzBdO1xuXG4gICAgICAgIGlmICghdGhpcy5fcGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiB0eXBlb2YgcGx1Z2luICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHRoaXMuX3BsdWdpbnNbbmFtZV0gPSBwbHVnaW47XG4gICAgICAgICAgICBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdXRvIGVuYWJsZSBhbmQgaW5pdCBwbHVnaW4gd2hlbiBhdCBydW4gdGltZVxuICAgICAgICBpZiAoIWluQXJyYXkobmFtZSwgdGhpcy5fb3B0cy5wbHVnaW5zKSkge1xuICAgICAgICAgICAgdGhpcy5fb3B0cy5wbHVnaW5zLnB1c2goYXJncy5sZW5ndGggPyBbXS5jb25jYXQoW25hbWVdLCBhcmdzKSA6IG5hbWUpO1xuICAgICAgICAgICAgdHlwZW9mIHRoaXMuX3BsdWdpbnNbbmFtZV0gPT09ICdmdW5jdGlvbicgJiYgdGhpcy5fcGx1Z2luc1tuYW1lXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH0qL1xuXG4gICAgLyoqXG4gICAgICogIHNpbXBsZSBldmVudCBkZWxlZ2F0ZSBtZXRob2RcbiAgICAgKiAgQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGUgZXZlbnQgbmFtZVxuICAgICAqICBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgdGhlIHNpbXBsZSBjc3Mgc2VsZWN0b3IgbGlrZSBqUXVlcnlcbiAgICAgKiAgQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgZXZlbnQgY2FsbGJhY2tcbiAgICAgKiAgQHB1YmxpY1xuICAgICAqL1xuICAgIGJpbmQoZXZ0VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZShlKSB7XG4gICAgICAgICAgICBsZXQgZXZ0ID0gZ2xvYmFsLmV2ZW50ID8gZ2xvYmFsLmV2ZW50IDogZTtcbiAgICAgICAgICAgIGxldCB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICAgICAgbGV0IGVsZUFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBlbGVBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGVBcnJbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBoYW5kbGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBkZWxlZ2F0ZShldnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGUpIHtcbiAgICAgICAgICAgIGxldCBldnQgPSBnbG9iYWwuZXZlbnQgPyBnbG9iYWwuZXZlbnQgOiBlO1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgZWxlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZUFycltpXSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGhhbmRsZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRPRE8gdW5iaW5kLCB1bkRlbGVnYXRlXG4gICAgICogcmVtb3ZlIGV2ZW50IGRlbGVnYXRlIGZyb20gd3JhcFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB1bmJpbmQoZXZlbnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcblxuICAgIH1cblxuICAgIHVuRGVsZWdhdGUoZXZlbnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHJlbW92ZUV2ZW50TGlzdGVuZXIgdG8gcmVsZWFzZSB0aGUgbWVtb3J5XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGxldCBvdXRlciA9IHRoaXMub3V0ZXI7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcblxuICAgICAgICB0aGlzLmZpcmUoJ2Rlc3Ryb3knKTtcblxuICAgICAgICAvLyBDbGVhciBldmVudHNcbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2Uuc3RhcnRFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5tb3ZlRXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2UuZW5kRXZ0LCB0aGlzKTtcbiAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcyk7XG4gICAgICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMpO1xuICAgICAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMpO1xuXG4gICAgICAgIC8vIENsZWFyIHRpbWVyXG4gICAgICAgIHRoaXMuX0xTTi5mb3JFYWNoKGZ1bmN0aW9uIGNsZWFyVGltZXJPbkRlc3Ryb3kodGltZXIpIHtcbiAgICAgICAgICAgIHRpbWVyICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGltZXIpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLndyYXAuaW5uZXJIVE1MID0gJyc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgZXZlbnQgY2FsbGJhY2tcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBvbihldmVudE5hbWUsIGZ1bmMpIHtcbiAgICAgICAgaWYgKGluQXJyYXkoZXZlbnROYW1lLCB0aGlzLkVWRU5UUykgJiYgdHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIChldmVudE5hbWUgaW4gdGhpcy5ldmVudHMgPyB0aGlzLmV2ZW50c1tldmVudE5hbWVdIDogdGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdKS5wdXNoKGZ1bmMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGV2ZW50IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgb2ZmKGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgICBpZiAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgICAgICBsZXQgZnVuY3MgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gZnVuY3MuaW5kZXhPZihmdW5jKTtcbiAgICAgICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIGZ1bmNzW2luZGV4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyaWdnZXIgZXZlbnQgY2FsbGJhY2tzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gYXJnc1xuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBmaXJlKGV2ZW50TmFtZSkge1xuICAgICAgICB0aGlzLmxvZygnW0VWRU5UIEZJUkVdOicsIGV2ZW50TmFtZSwgYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cykge1xuICAgICAgICAgICAgbGV0IGZ1bmNzID0gdGhpcy5ldmVudHNbZXZlbnROYW1lXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPIHdpbGwgc3VwcG9ydCBjdXN0b20gY29udGV4dCwgbm93IGNvbnRleHQgaXMgaW5zdGFuY2Ugb2YgaVNsaWRlclxuICAgICAgICAgICAgICAgIHR5cGVvZiBmdW5jc1tpXSA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgICAgICYmIGZ1bmNzW2ldLmFwcGx5XG4gICAgICAgICAgICAgICAgJiYgZnVuY3NbaV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiByZXNldCAmIHJlcmVuZGVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3NldHRpbmcoKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgJiYgdGhpcy5wbGF5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcmVsb2FkIERhdGEgJiByZW5kZXJcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgbG9hZERhdGEoZGF0YSwgaW5pdEluZGV4KSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gaW5pdEluZGV4IHx8IDA7XG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuX3JlbmRlcldyYXBwZXIoKTtcbiAgICAgICAgdGhpcy5maXJlKCdyZWxvYWREYXRhJyk7XG4gICAgICAgIHRoaXMuaXNBdXRvcGxheSAmJiB0aGlzLnBsYXkoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBhdXRvcGxheVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwbGF5KCkge1xuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX0xTTi5hdXRvUGxheSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5hdXRvUGxheSk7XG5cbiAgICAgICAgZnVuY3Rpb24gcGxheSgpIHtcbiAgICAgICAgICAgIHNlbGYuX0xTTi5hdXRvUGxheSA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgcGxheSgpO1xuICAgICAgICAgICAgfSwgc2VsZi5kdXJhdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBwbGF5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogcGF1c2UgYXV0b3BsYXlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHRoaXMuX0xTTi5hdXRvUGxheSAmJiBjbGVhclRpbWVvdXQodGhpcy5fTFNOLmF1dG9QbGF5KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBNYWludGFpbmluZyB0aGUgY3VycmVudCBzY2VuZVxuICAgICAqIERpc2FibGUgdG91Y2ggZXZlbnRzLCBleGNlcHQgZm9yIHRoZSBuYXRpdmUgbWV0aG9kLlxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBob2xkKCkge1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbGVhc2UgY3VycmVudCBzY2VuZVxuICAgICAqIHVubG9jayBhdCBzYW1lIHRpbWVcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5ob2xkKCkge1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51bmxvY2soKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBZb3UgY2FuJ3QgZG8gYW55dGhpbmcgb24gdGhpcyBzY2VuZVxuICAgICAqIGxvY2sgbmF0aXZlIG1ldGhvZCBjYWxsc1xuICAgICAqIGhvbGQgYXQgc2FtZSB0aW1lXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGxvY2soKSB7XG4gICAgICAgIHRoaXMuaG9sZCgpO1xuICAgICAgICB0aGlzLmxvY2tpbmcgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIHVubG9jayBuYXRpdmUgbWV0aG9kIGNhbGxzXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHVubG9jaygpIHtcbiAgICAgICAgdGhpcy5sb2NraW5nID0gZmFsc2U7XG4gICAgfVxuXG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBpU2xpZGVyUHJvdG90eXBlO1xuIiwiLypcbiAqIEBmaWxlICAgQW5pbWF0aW9uIExpYnJhcnlcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cblxubGV0IGV4dGVuZEFuaW1hdGlvbiA9IHtcbiAgICAncm90YXRlJzogZnVuY3Rpb24gKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGxldCBiZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy53cmFwLnBhcmVudE5vZGUsIG51bGwpLmJhY2tncm91bmRDb2xvcjtcblxuICAgICAgICBpZiAodGhpcy5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSAtb2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjsgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7ICdcbiAgICAgICAgICAgICsgJ2JhY2tncm91bmQtY29sb3I6JyArIGJkQ29sb3IgKyAnOyBwb3NpdGlvbjphYnNvbHV0ZTsnO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyA5MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSArICdkZWcpIHRyYW5zbGF0ZVooJ1xuICAgICAgICAgICAgKyAoMC44ODggKiBzY2FsZSAvIDIpICsgJ3B4KSBzY2FsZSgwLjg4OCknO1xuICAgIH0sXG5cbiAgICAnZmxpcCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICBsZXQgYmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMud3JhcC5wYXJlbnROb2RlLCBudWxsKS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJ3Bvc2l0aW9uOmFic29sdXRlOyAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyBiYWNrZ3JvdW5kLWNvbG9yOicgKyBiZENvbG9yICsgJzsnO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooJyArIChzY2FsZSAvIDIpICsgJ3B4KSByb3RhdGUnICsgcm90YXRlRGlyZWN0XG4gICAgICAgICAgICArICcoJyArIDE4MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSArICdkZWcpIHNjYWxlKDAuODc1KSc7XG4gICAgfSxcblxuICAgICdkZXB0aCc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHpvb21TY2FsZSA9ICg0IC0gTWF0aC5hYnMoaSAtIDEpKSAqIDAuMTg7XG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcbiAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpID09PSAxKSA/IDEwMCA6IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgOiAoaSAtIDEpO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnXG4gICAgICAgICAgICArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgMS4zICogc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH0sXG5cbiAgICAnZmxvdyc6IGZ1bmN0aW9uIChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICBsZXQgZGlyZWN0QW1lbmQgPSAoYXhpcyA9PT0gJ1gnKSA/IDEgOiAtMTtcbiAgICAgICAgbGV0IG9mZnNldFJhdGlvID0gTWF0aC5hYnMob2Zmc2V0IC8gc2NhbGUpO1xuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0IDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgwLjcsIDAuNykgdHJhbnNsYXRlWignICsgKG9mZnNldFJhdGlvICogMTUwIC0gMTUwKSAqIE1hdGguYWJzKGkgLSAxKSArICdweCknXG4gICAgICAgICAgICArICd0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSdcbiAgICAgICAgICAgICsgJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyBkaXJlY3RBbWVuZCAqICgzMCAtIG9mZnNldFJhdGlvICogMzApICogKDEgLSBpKSArICdkZWcpJztcbiAgICB9LFxuXG4gICAgJ2NhcmQnOiBmdW5jdGlvbiAoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9tLmN1ciAmJiBkb20uY3VyICE9PSBpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gbnVsbDtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgem9vbVNjYWxlID0gKGRvbS5jdXIpID8gMSAtIDAuMiAqIE1hdGguYWJzKGkgLSAxKSAtIE1hdGguYWJzKDAuMiAqIG9mZnNldCAvIHNjYWxlKS50b0ZpeGVkKDYpIDogMTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXNcbiAgICAgICAgICAgICsgJygnICsgKCgxICsgTWF0aC5hYnMoaSAtIDEpICogMC4yKSAqIG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9LFxuXG4gICAgJ2ZhZGUnOiBmdW5jdGlvbiBmYWRlKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAxIC0gKG9mZnNldCAvIHNjYWxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kQW5pbWF0aW9uO1xuIiwiLypcbiAqIEBmaWxlICAgVG8gY3JlYXRlIHJpZ2h0JmxlZnQgYm90dG9uIG9uIGlTbGlkZXJcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbmZ1bmN0aW9uIGFkZEJ0bigpIHtcbiAgICBsZXQgSEFORExFID0gdGhpcztcbiAgICBjb25zb2xlLmxvZyhIQU5ETEUpXG4gICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICBsZXQgYnRuT3V0ZXIgPSBbXTtcbiAgICAgICAgbGV0IGJ0bklubmVyID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMjsgaSsrKSB7XG4gICAgICAgICAgICBidG5PdXRlcltpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItYnRuLW91dGVyJztcbiAgICAgICAgICAgIGJ0bklubmVyW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBidG5Jbm5lcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4taW5uZXInO1xuXG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmNsYXNzTmFtZSArPSAnIGxlZnQnO1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgcmlnaHQnO1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ0bk91dGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBkaXIgPSBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnZGlyJyksIDEwKTtcbiAgICAgICAgICAgICAgICBIQU5ETEUuc2xpZGVUbyhIQU5ETEUuc2xpZGVJbmRleCArIGRpcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uYXBwZW5kQ2hpbGQoYnRuSW5uZXJbaV0pO1xuICAgICAgICAgICAgSEFORExFLndyYXAuYXBwZW5kQ2hpbGQoYnRuT3V0ZXJbaV0sIEhBTkRMRS53cmFwLm5leHRTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRCdG47XG4iLCIvKlxuICogQGZpbGUgICBUbyBjcmVhdGUgZG90cyBpbmRleCBvbiBpU2xpZGVyXG4gKiBAYXV0aG9yIHhpZXl1MzMzMzNcbiAqL1xuXG5mdW5jdGlvbiBhZGREb3QoKSB7XG4gICAgbGV0IEhBTkRMRSA9IHRoaXM7XG4gICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICBsZXQgZGF0YSA9IEhBTkRMRS5kYXRhO1xuICAgICAgICBsZXQgZG90cyA9IFtdO1xuICAgICAgICBsZXQgZG90V3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIGRvdFdyYXAuY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90LXdyYXAnO1xuXG4gICAgICAgIGxldCByZW5kZXJEb3RzID0gZnVuY3Rpb24gcmVuZGVyRG90cygpIHtcbiAgICAgICAgICAgIGxldCBmcmVnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRvdHNbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90JztcbiAgICAgICAgICAgICAgICBkb3RzW2ldLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBpKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gSEFORExFLnNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb3RzW2ldLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIEhBTkRMRS5zbGlkZVRvKHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdpbmRleCcpLCAxMCkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZnJlZ21lbnQuYXBwZW5kQ2hpbGQoZG90c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb3RXcmFwLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgZG90V3JhcC5hcHBlbmRDaGlsZChmcmVnbWVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVuZGVyRG90cygpO1xuXG4gICAgICAgIEhBTkRMRS53cmFwLnBhcmVudE5vZGUuYXBwZW5kQ2hpbGQoZG90V3JhcCk7XG5cbiAgICAgICAgSEFORExFLm9uKCdzbGlkZUNoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghSEFORExFLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3QnO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5zbGlkZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIEhBTkRMRS5vbigncmVsb2FkRGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBkb3RzID0gW107XG4gICAgICAgICAgICByZW5kZXJEb3RzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGREb3Q7XG4iLCIvKipcbiAqIFN1cHBvcnQgM0QgbWF0cml4IHRyYW5zbGF0ZVxuICogQHR5cGUge2Jvb2xlYW59XG4gKi9cbnZhciBleHRlbmRGdW5jdGlvbiA9IHt9OyAvL+i/meS4quaYr+aIkea3u+WKoO+8jOeUqOS6juaJqeWxleaUueaooeWdl+eahOaWueazlVxuXG52YXIgaGFzM2QgPSAoJ1dlYktpdENTU01hdHJpeCcgaW4gZ2xvYmFsICYmICdtMTEnIGluIG5ldyBXZWJLaXRDU1NNYXRyaXgoKSk7XG5cbi8qKlxuICogTWluIHNjYWxlXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG52YXIgbWluU2NhbGUgPSAxIC8gMjtcblxuLyoqXG4gKiBTY2VuZSB2aWV3IHJhbmdlXG4gKiBAdHlwZSB7e319XG4gKi9cbnZhciB2aWV3U2NvcGUgPSB7fTtcblxudmFyIGN1cnJlbnRTY2FsZTtcblxudmFyIHpvb21GYWN0b3I7XG5cbnZhciB6b29tTm9kZTtcblxudmFyIHN0YXJ0VG91Y2hlcztcblxudmFyIHN0YXJ0WDtcblxudmFyIHN0YXJ0WTtcblxudmFyIGxhc3RUb3VjaFN0YXJ0O1xuXG52YXIgZ2VzdHVyZTtcblxudmFyIElOX1NDQUxFX01PREUgPSBmYWxzZTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0cmFuc2xhdGVcbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICogQHBhcmFtIHpcbiAqIEBwYXJhbSBzY2FsZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUcmFuc2xhdGUoeCwgeSwgeiwgc2NhbGUpIHtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGVcIiArIChoYXMzZCA/IFwiM2QoXCIgOiBcIihcIikgKyB4ICsgXCJweCxcIiArIHkgKyAoaGFzM2QgPyBcInB4LFwiICsgeiArIFwicHgpXCIgOiBcInB4KVwiKSArIFwic2NhbGUoXCIgKyBzY2FsZSArIFwiKVwiO1xufVxuXG4vKipcbiAqIEdldCBkaXN0YW5jZVxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXREaXN0YW5jZShhLCBiKSB7XG4gICAgdmFyIHgsIHk7XG4gICAgeCA9IGEubGVmdCAtIGIubGVmdDtcbiAgICB5ID0gYS50b3AgLSBiLnRvcDtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSB0byBzdHJpbmdcbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oeCwgeSkge1xuICAgIHJldHVybiB4ICsgXCJweCBcIiArIHkgKyBcInB4XCI7XG59XG5cbi8qKlxuICogR2V0IHRvdWNoIHBvaW50ZXJcbiAqIEBwYXJhbSB0b3VjaGVzXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGdldFRvdWNoZXModG91Y2hlcykge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0b3VjaGVzKS5tYXAoZnVuY3Rpb24gKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiB0b3VjaC5wYWdlWCxcbiAgICAgICAgICAgIHRvcDogdG91Y2gucGFnZVlcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIEdldCBzY2FsZVxuICogQHBhcmFtIHN0YXJ0XG4gKiBAcGFyYW0gZW5kXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBjYWxjdWxhdGVTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIHN0YXJ0RGlzdGFuY2UgPSBnZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgIHZhciBlbmREaXN0YW5jZSA9IGdldERpc3RhbmNlKGVuZFswXSwgZW5kWzFdKTtcbiAgICByZXR1cm4gZW5kRGlzdGFuY2UgLyBzdGFydERpc3RhbmNlO1xufVxuXG4vKipcbiAqIEdldCBjb21wdXRlZCB0cmFuc2xhdGVcbiAqIEBwYXJhbSBvYmpcbiAqIEByZXR1cm5zIHt7dHJhbnNsYXRlWDogbnVtYmVyLCB0cmFuc2xhdGVZOiBudW1iZXIsIHRyYW5zbGF0ZVo6IG51bWJlciwgc2NhbGVYOiBudW1iZXIsIHNjYWxlWTogbnVtYmVyLCBvZmZzZXRYOiBudW1iZXIsIG9mZnNldFk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldENvbXB1dGVkVHJhbnNsYXRlKG9iaikge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHRyYW5zbGF0ZVg6IDAsXG4gICAgICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgICAgIHRyYW5zbGF0ZVo6IDAsXG4gICAgICAgIHNjYWxlWDogMSxcbiAgICAgICAgc2NhbGVZOiAxLFxuICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICBvZmZzZXRZOiAwXG4gICAgfTtcbiAgICB2YXIgb2Zmc2V0WCA9IDAsIG9mZnNldFkgPSAwO1xuICAgIGlmICghZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUgfHwgIW9iaikgcmV0dXJuIHJlc3VsdDtcbiAgICB2YXIgc3R5bGUgPSBnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZShvYmopLCB0cmFuc2Zvcm0sIG9yaWdpbjtcbiAgICB0cmFuc2Zvcm0gPSBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICAgIG9yaWdpbiA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiB8fCBzdHlsZS5tb3pUcmFuc2Zvcm1PcmlnaW47XG4gICAgdmFyIHBhciA9IG9yaWdpbi5tYXRjaCgvKC4qKXB4XFxzKyguKilweC8pO1xuICAgIGlmIChwYXIubGVuZ3RoID4gMSkge1xuICAgICAgICBvZmZzZXRYID0gcGFyWzFdIC0gMDtcbiAgICAgICAgb2Zmc2V0WSA9IHBhclsyXSAtIDA7XG4gICAgfVxuICAgIGlmICh0cmFuc2Zvcm0gPT0gXCJub25lXCIpIHJldHVybiByZXN1bHQ7XG4gICAgdmFyIG1hdDNkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICAgIHZhciBtYXQyZCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeFxcKCguKylcXCkkLyk7XG4gICAgaWYgKG1hdDNkKSB7XG4gICAgICAgIHZhciBzdHIgPSBtYXQzZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlWDogc3RyWzEyXSAtIDAsXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiBzdHJbMTNdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVo6IHN0clsxNF0gLSAwLFxuICAgICAgICAgICAgb2Zmc2V0WDogb2Zmc2V0WCAtIDAsXG4gICAgICAgICAgICBvZmZzZXRZOiBvZmZzZXRZIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWDogc3RyWzBdIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWTogc3RyWzVdIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWjogc3RyWzEwXSAtIDBcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1hdDJkKSB7XG4gICAgICAgIHZhciBzdHIgPSBtYXQyZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlWDogc3RyWzRdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0cls1XSAtIDAsXG4gICAgICAgICAgICBvZmZzZXRYOiBvZmZzZXRYIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFk6IG9mZnNldFkgLSAwLFxuICAgICAgICAgICAgc2NhbGVYOiBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgc2NhbGVZOiBzdHJbM10gLSAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0IGNlbnRlciBwb2ludFxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudGVyKGEsIGIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiAoYS54ICsgYi54KSAvIDIsXG4gICAgICAgIHk6IChhLnkgKyBiLnkpIC8gMlxuICAgIH1cbn1cblxuLyoqXG4gKiBpbml0XG4gKiBAcGFyYW0gb3B0c1xuICovXG5mdW5jdGlvbiBpbml0Wm9vbShvcHRzKSB7XG4gICAgY3VycmVudFNjYWxlID0gb3B0cy5jdXJyZW50U2NhbGU7XG4gICAgem9vbUZhY3RvciA9IG9wdHMuem9vbUZhY3RvcjtcbiAgICBleHRlbmRGdW5jdGlvbiA9IG9wdHMuZXh0ZW5kRnVuY3Rpb247XG59XG5cbi8qKlxuICogU3RhcnQgZXZlbnQgaGFuZGxlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIHN0YXJ0SGFuZGxlcihldnQpIHtcbiAgICBleHRlbmRGdW5jdGlvbi5zdGFydEhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG4gICAgLy8gbXVzdCBiZSBhIHBpY3R1cmUsIG9ubHkgb25lIHBpY3R1cmUhIVxuICAgIHZhciBub2RlID0gdGhpcy5lbHNbMV0ucXVlcnlTZWxlY3RvcignaW1nOmZpcnN0LWNoaWxkJyk7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIGlmIChkZXZpY2UuaGFzVG91Y2ggJiYgbm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBJTl9TQ0FMRV9NT0RFID0gdHJ1ZTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IGdldENvbXB1dGVkVHJhbnNsYXRlKG5vZGUpO1xuICAgICAgICBzdGFydFRvdWNoZXMgPSBnZXRUb3VjaGVzKGV2dC50YXJnZXRUb3VjaGVzKTtcbiAgICAgICAgc3RhcnRYID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVggLSAwO1xuICAgICAgICBzdGFydFkgPSB0cmFuc2Zvcm0udHJhbnNsYXRlWSAtIDA7XG4gICAgICAgIGN1cnJlbnRTY2FsZSA9IHRyYW5zZm9ybS5zY2FsZVg7XG4gICAgICAgIHpvb21Ob2RlID0gbm9kZTtcbiAgICAgICAgdmFyIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgIGxhc3RUb3VjaFN0YXJ0ID0gbnVsbDtcbiAgICAgICAgICAgIHZhciB0b3VjaGVzID0gZXZ0LnRvdWNoZXM7XG4gICAgICAgICAgICB2YXIgdG91Y2hDZW50ZXIgPSBnZXRDZW50ZXIoe1xuICAgICAgICAgICAgICAgIHg6IHRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogdG91Y2hlc1swXS5wYWdlWVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHg6IHRvdWNoZXNbMV0ucGFnZVgsXG4gICAgICAgICAgICAgICAgeTogdG91Y2hlc1sxXS5wYWdlWVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKHRvdWNoQ2VudGVyLnggLSBwb3MubGVmdCwgdG91Y2hDZW50ZXIueSAtIHBvcy50b3ApO1xuICAgICAgICB9IGVsc2UgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdmFyIHRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgZ2VzdHVyZSA9IDA7XG4gICAgICAgICAgICBpZiAodGltZSAtIGxhc3RUb3VjaFN0YXJ0IDwgMzAwKSB7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZ2VzdHVyZSA9IDM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0VG91Y2hTdGFydCA9IHRpbWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogTW92ZSBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG1vdmVIYW5kbGVyKGV2dCkge1xuICAgIGlmIChJTl9TQ0FMRV9NT0RFKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgICAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgICAgIGlmIChkZXZpY2UuaGFzVG91Y2gpIHtcbiAgICAgICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIHNjYWxlSW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEgJiYgY3VycmVudFNjYWxlID4gMSkge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgbW92ZUltYWdlLmNhbGwodGhpcywgZXZ0KTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ2VzdHVyZSA9IHJlc3VsdDtcblxuICAgICAgICAgICAgaWYgKHJlc3VsdCA+IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZXh0ZW5kRnVuY3Rpb24ubW92ZUhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG59XG5cbi8qKlxuICogRG91YmxlIHRhbyBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gaGFuZGxlRG91YmxlVGFwKGV2dCkge1xuICAgIGNvbnNvbGUubG9nKHpvb21GYWN0b3IpXG4gICAgdmFyIHpvb21GYWN0b3IgPSB6b29tRmFjdG9yIHx8IDI7XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgY3VycmVudFNjYWxlID0gY3VycmVudFNjYWxlID09IDEgPyB6b29tRmFjdG9yIDogMTtcbiAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKDAsIDAsIDAsIGN1cnJlbnRTY2FsZSk7XG4gICAgaWYgKGN1cnJlbnRTY2FsZSAhPSAxKSBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKGV2dC50b3VjaGVzWzBdLnBhZ2VYIC0gcG9zLmxlZnQsIGV2dC50b3VjaGVzWzBdLnBhZ2VZIC0gcG9zLnRvcCk7XG59XG5cbi8qKlxuICogc2NhbGUgaW1hZ2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gc2NhbGVJbWFnZShldnQpIHtcbiAgICB2YXIgbW92ZVRvdWNlcyA9IGdldFRvdWNoZXMoZXZ0LnRhcmdldFRvdWNoZXMpO1xuICAgIHZhciBzY2FsZSA9IGNhbGN1bGF0ZVNjYWxlKHN0YXJ0VG91Y2hlcywgbW92ZVRvdWNlcyk7XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICBzY2FsZSA9IGN1cnJlbnRTY2FsZSAqIHNjYWxlIDwgbWluU2NhbGUgPyBtaW5TY2FsZSA6IGN1cnJlbnRTY2FsZSAqIHNjYWxlO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgc2NhbGUpO1xufVxuXG4vKipcbiAqIEVuZCBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSBldnRcbiAqL1xuZnVuY3Rpb24gZW5kSGFuZGxlcihldnQpIHtcbiAgICBpZiAoSU5fU0NBTEVfTU9ERSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgaWYgKGdlc3R1cmUgPT09IDIpIHsvL+WPjOaJi+aMh1xuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChnZXN0dXJlID09IDEpIHsvL+aUvuWkp+aLluaLvVxuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChnZXN0dXJlID09PSAzKSB7Ly/lj4zlh7tcbiAgICAgICAgICAgIGhhbmRsZURvdWJsZVRhcChldnQpO1xuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgSU5fU0NBTEVfTU9ERSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBleHRlbmRGdW5jdGlvbi5lbmRIYW5kbGVyT3JpZ2luYWwuY2FsbCh0aGlzLCBldnQpO1xufVxuXG4vKipcbiAqIERyYWdtb3ZlIGltYWdlXG4gKiBAcGFyYW0ge29wamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIG1vdmVJbWFnZShldnQpIHtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICB2YXIgb2Zmc2V0ID0ge1xuICAgICAgICBYOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLnN0YXJ0WCkgOiAoZXZ0LnBhZ2VYIC0gdGhpcy5zdGFydFgpLFxuICAgICAgICBZOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLnN0YXJ0WSkgOiAoZXZ0LnBhZ2VZIC0gdGhpcy5zdGFydFkpXG4gICAgfTtcbiAgICB2YXIgbW92ZU9mZnNldCA9IHtcbiAgICAgICAgeDogc3RhcnRYICsgb2Zmc2V0LlggLSAwLFxuICAgICAgICB5OiBzdGFydFkgKyBvZmZzZXQuWSAtIDBcbiAgICB9O1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUobW92ZU9mZnNldC54LCBtb3ZlT2Zmc2V0LnksIDAsIGN1cnJlbnRTY2FsZSk7XG59XG5cbi8qKlxuICogR2V0IHBvc2l0aW9uXG4gKiBAcGFyYW0gZWxlbWVudFxuICogQHJldHVybnMge3tsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgIHZhciBwb3MgPSB7XCJsZWZ0XCI6IDAsIFwidG9wXCI6IDB9O1xuICAgIGRvIHtcbiAgICAgICAgcG9zLnRvcCArPSBlbGVtZW50Lm9mZnNldFRvcCB8fCAwO1xuICAgICAgICBwb3MubGVmdCArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cbiAgICB3aGlsZSAoZWxlbWVudCk7XG4gICAgcmV0dXJuIHBvcztcbn1cblxuLyoqXG4gKiBDaGVjayB0YXJnZXQgaXMgaW4gcmFuZ2VcbiAqIEBwYXJhbSBub2RlXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSB0YWdcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIHZhbHVlLCB0YWcpIHtcbiAgICB2YXIgbWluLCBtYXg7XG4gICAgdmFyIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgIHZpZXdTY29wZSA9IHtcbiAgICAgICAgc3RhcnQ6IHtsZWZ0OiBwb3MubGVmdCwgdG9wOiBwb3MudG9wfSxcbiAgICAgICAgZW5kOiB7bGVmdDogcG9zLmxlZnQgKyBub2RlLmNsaWVudFdpZHRoLCB0b3A6IHBvcy50b3AgKyBub2RlLmNsaWVudEhlaWdodH1cbiAgICB9O1xuICAgIHZhciBzdHIgPSB0YWcgPT0gMSA/IFwibGVmdFwiIDogXCJ0b3BcIjtcbiAgICBtaW4gPSB2aWV3U2NvcGUuc3RhcnRbc3RyXTtcbiAgICBtYXggPSB2aWV3U2NvcGUuZW5kW3N0cl07XG4gICAgcmV0dXJuICh2YWx1ZSA+PSBtaW4gJiYgdmFsdWUgPD0gbWF4KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIG5vZGVcbiAqIEBwYXJhbSBvYmoxXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBvdmVyRmxvdyhub2RlLCBvYmoxKSB7XG4gICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgdmFyIGlzWDFJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5zdGFydC5sZWZ0LCAxKTtcbiAgICB2YXIgaXNYMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC5sZWZ0LCAxKTtcbiAgICB2YXIgaXNZMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LnRvcCwgMCk7XG4gICAgdmFyIGlzWTJJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5lbmQudG9wLCAwKTtcbiAgICBpZiAoKGlzWDFJbiAhPSBpc1gySW4pICYmIChpc1kxSW4gIT0gaXNZMkluKSkge1xuICAgICAgICBpZiAoaXNYMUluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1gxSW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDJJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSA0O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICgoaXNYMUluID09IGlzWDJJbikpIHtcbiAgICAgICAgaWYgKCFpc1kxSW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA1O1xuICAgICAgICB9IGVsc2UgaWYgKCFpc1kySW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA2O1xuICAgICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4pIHtcbiAgICAgICAgaWYgKCFpc1gxSW4gJiYgaXNYMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA3O1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiAhaXNYMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1kxSW4gPT0gaXNZMkluID09IGlzWDFJbiA9PSBpc1gySW4pIHtcbiAgICAgICAgcmVzdWx0ID0gOTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBSZXNldCBpbWFnZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiByZXNldEltYWdlKGV2dCkge1xuICAgIGlmIChjdXJyZW50U2NhbGUgPT0gMSkgcmV0dXJuO1xuICAgIHZhciBub2RlID0gem9vbU5vZGUsIGxlZnQsIHRvcCwgdHJhbnMsIHcsIGgsIHBvcywgc3RhcnQsIGVuZCwgcGFyZW50LCBmbG93VGFnO1xuICAgIHRyYW5zID0gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUobm9kZSk7XG4gICAgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIHcgPSBub2RlLmNsaWVudFdpZHRoICogdHJhbnMuc2NhbGVYO1xuICAgIGggPSBub2RlLmNsaWVudEhlaWdodCAqIHRyYW5zLnNjYWxlWDtcbiAgICBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICBzdGFydCA9IHtcbiAgICAgICAgbGVmdDogKDEgLSB0cmFucy5zY2FsZVgpICogdHJhbnMub2Zmc2V0WCArIHBvcy5sZWZ0ICsgdHJhbnMudHJhbnNsYXRlWCxcbiAgICAgICAgdG9wOiAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRZICsgcG9zLnRvcCArIHRyYW5zLnRyYW5zbGF0ZVlcbiAgICB9O1xuICAgIGVuZCA9IHtcbiAgICAgICAgbGVmdDogc3RhcnQubGVmdCArIHcsXG4gICAgICAgIHRvcDogc3RhcnQudG9wICsgaFxuICAgIH07XG4gICAgbGVmdCA9IHN0YXJ0LmxlZnQ7XG4gICAgdG9wID0gc3RhcnQudG9wO1xuXG4gICAgZmxvd1RhZyA9IG92ZXJGbG93KHBhcmVudCwge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9KTtcbiAgICBzd2l0Y2ggKGZsb3dUYWcpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodyA8IHBhcmVudC5jbGllbnRXaWR0aCkge1xuICAgICAgICBsZWZ0ID0gcG9zLmxlZnQgLSAodHJhbnMuc2NhbGVYIC0gMSkgKiBub2RlLmNsaWVudFdpZHRoIC8gMjtcbiAgICB9XG4gICAgaWYgKGggPCBwYXJlbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIHRvcCA9IHBvcy50b3AgLSAodHJhbnMuc2NhbGVYIC0gMSkgKiBub2RlLmNsaWVudEhlaWdodCAvIDI7XG4gICAgfVxuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIxMDBtc1wiO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUodHJhbnMudHJhbnNsYXRlWCArIGxlZnQgLSBzdGFydC5sZWZ0LCB0cmFucy50cmFuc2xhdGVZICsgdG9wIC0gc3RhcnQudG9wLCAwLCB0cmFucy5zY2FsZVgpO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0YXJ0SGFuZGxlcjogc3RhcnRIYW5kbGVyLFxuICAgIG1vdmVIYW5kbGVyOiBtb3ZlSGFuZGxlcixcbiAgICBlbmRIYW5kbGVyOiBlbmRIYW5kbGVyLFxuICAgIGluaXRab29tOmluaXRab29tXG59O1xuIl19
