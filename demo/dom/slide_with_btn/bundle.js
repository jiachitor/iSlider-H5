(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

require('../../../src/islider.js');

require('../../../src/plugins/islider_button.js');

require('../../../src/plugins/islider_dot.js');

require('../../../src/plugins/islider_zoompic.js');

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

var opts = {
    data: list,
    type: 'dom',
    dom: document.getElementById("iSlider-wrapper"),
    duration: 1000,
    plugins: ['button', ['zoompic', { currentScale: 1, zoomFactor: 2 }]]
};

var islider = new iSlider(opts);

},{"../../../src/islider.js":3,"../../../src/plugins/islider_button.js":4,"../../../src/plugins/islider_dot.js":5,"../../../src/plugins/islider_zoompic.js":6}],2:[function(require,module,exports){
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

//import iSlider from '../islider_core.js';

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = {
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
module.exports = exports['default'];

},{}],3:[function(require,module,exports){
(function (global){
/**
 * A simple, efficent mobile slider solution
 * @file iSlider.js

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

var _extIslider_animateJs = require('./ext/islider_animate.js');

var _extIslider_animateJs2 = _interopRequireDefault(_extIslider_animateJs);

/**
 * Check in array
 * @param oElement
 * @param aSource
 * @returns {boolean}
 */
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

var iSlider = (function () {
    //ES6中新型构造器

    function iSlider() {
        _classCallCheck(this, iSlider);

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

        console.log(_extIslider_animateJs2['default']);

        // 扩展动画
        this.extend(this._animateFuncs, _extIslider_animateJs2['default']);

        console.log(this._animateFuncs);

        this._transitionEndEvent();
        this._setting();

        this.fire('initialize');
        this._renderWrapper();
        this._initPlugins();
        this._bindHandler();
    }

    /**
     * The empty function
     * @private
     */

    _createClass(iSlider, [{
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

        /**
         * setting parameters for slider
         * @private
         */
    }, {
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
            console.log(opts.animateType);
            console.log(opts.animateType in this._animateFuncs);
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
            } : this.EMPTY_FUNCTION;

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
            this.delay ? global.setTimeout(this._autoPlay.bind(this), this.delay) : this._autoPlay();
        }
    }, {
        key: '_initPlugins',

        /**
         * Init plugins
         * @private
         */
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
    }, {
        key: '_setUpDamping',

        /**
         * enable damping when slider meet the edge
         * @private
         */
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
    }, {
        key: '_itemType',

        /**
         * Get item type
         * @param {number} index
         * @returns {string}
         * @private
         */
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
    }, {
        key: '_renderItem',

        /**
         * render single item html by idx
         * @param {HTMLElement} el ..
         * @param {number} dataIndex  ..
         * @private
         */
        value: function _renderItem(el, dataIndex) {

            var item = undefined,
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
                        (function () {
                            var currentImg = new Image();
                            currentImg.src = item.content;
                            currentImg.onload = function () {
                                item.height = currentImg.height;
                                item.width = currentImg.width;
                                insertImg();
                                item.load = 2;
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

            this.fire('renderComplete');
        }
    }, {
        key: '_renderIntermediateScene',

        /**
         * Postponing the intermediate scene rendering
         * until the target scene is completely rendered (render in event slideChanged)
         * to avoid a jumpy feel when switching between scenes
         * given that the distance of sliding is more than 1.
         * e.g. ```this.slideTo(>+-1)```
         *
         * @private
         */
        value: function _renderIntermediateScene() {
            if (this._intermediateScene != null) {
                this._renderItem.apply(this, this._intermediateScene);
                this._intermediateScene = null;
            }
        }
    }, {
        key: '_changedStyles',

        /**
         * Apply styles on changed
         * @private
         */
        value: function _changedStyles() {
            var slideStyles = ['islider-prev', 'islider-active', 'islider-next'];
            this.els.forEach(function changeStypeEach(el, index) {
                removeClass(el, '(' + slideStyles.join('|') + ')');
                addClass(el, slideStyles[index]);
            });
        }
    }, {
        key: '_renderWrapper',

        /**
         * render list html
         * @private
         */
        value: function _renderWrapper() {
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
        }
    }, {
        key: '_preloadImg',

        /**
         * Preload img when slideChange
         * From current index +2, -2 scene
         * @param {number} dataIndex means which image will be load
         * @private
         */
        value: function _preloadImg(dataIndex) {
            var _this = this;

            if (this.data.length > 3) {
                (function () {
                    var data = _this.data;
                    var len = data.length;
                    var self = _this;
                    var loadImg = function preloadImgLoadingProcess(index) {
                        var item = data[index];
                        if (self._itemType(item) === 'pic' && !item.load) {
                            (function () {
                                var preloadImg = new Image();
                                preloadImg.src = item.content;
                                preloadImg.onload = function () {
                                    item.width = preloadImg.width;
                                    item.height = preloadImg.height;
                                    item.load = 2;
                                };
                                item.load = 1;
                            })();
                        }
                    };

                    loadImg((dataIndex + 2) % len);
                    loadImg((dataIndex - 2 + len) % len);
                })();
            }
        }
    }, {
        key: '_watchTransitionEnd',

        /**
         * Watch event transitionEnd
         * @private
         */
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
            };

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
    }, {
        key: '_bindHandler',

        /**
         * bind all event handler, when on PC, disable drag event
         * @private
         */
        value: function _bindHandler() {
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
        }
    }, {
        key: 'handleEvent',

        /**
         *  Uniformity admin event
         *  Event router
         *  @param {object} evt event object
         *  @protected
         */
        value: function handleEvent(evt) {
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
        }
    }, {
        key: 'startHandler',

        /**
         *  touchstart callback
         *  @param {object} evt event object
         *  @protected
         */
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
    }, {
        key: 'moveHandler',

        /**
         *  touchmove callback
         *  @param {object} evt event object
         *  @protected
         */
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
    }, {
        key: 'endHandler',

        /**
         *  touchend callback
         *  @param {Object} evt event object
         *  @protected
         */
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

            this._autoPlay();

            this.fire('slideEnd', evt, this);
        }
    }, {
        key: 'orientationchangeHandler',

        /**
         *  orientationchange callback
         *  @protected
         */
        value: function orientationchangeHandler() {
            global.setTimeout((function () {
                this.reset();
                this.log('Event: orientationchange');
            }).bind(this), 100);
        }
    }, {
        key: 'resizeHandler',

        /**
         * resize callback
         * @protected
         */
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
    }, {
        key: 'slideTo',

        /**
         *  slide logical, goto data index
         *  @param {number} dataIndex the goto index
         *  @public
         */
        value: function slideTo(dataIndex, opts) {
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
                    // Only applies to "transform"
                    els[i].style.webkitTransition = 'all ' + squeezeTime / 1000 + 's ' + this.animateEasing;
                }
                animateFunc.call(this, els[i], this.axis, this.scale, i, 0);
            }

            // If not looping, stop playing when meet the end of data
            if (this.isAutoplay && !this.isLooping && this.slideIndex === data.length - 1) {
                this.pause();
            }
        }
    }, {
        key: 'slideNext',

        /**
         * Slide to next scene
         * @public
         */
        value: function slideNext() {
            this.slideTo.apply(this, [this.slideIndex + 1].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: 'slidePrev',

        /**
         * Slide to previous scene
         * @public
         */
        value: function slidePrev() {
            this.slideTo.apply(this, [this.slideIndex - 1].concat(Array.prototype.slice.call(arguments)));
        }
    }, {
        key: 'bind',

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
         };*/

        /**
         *  simple event delegate method
         *  @param {string} evtType event name
         *  @param {string} selector the simple css selector like jQuery
         *  @param {function} callback event callback
         *  @public
         */
        value: function bind(evtType, selector, callback) {
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
        }
    }, {
        key: 'delegate',
        value: function delegate(evtType, selector, callback) {
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
        }
    }, {
        key: 'unbind',

        /**
         * remove event delegate from wrap
         *
         * @param {string} evtType event name
         * @param {string} selector the simple css selector like jQuery
         * @param {function} callback event callback
         * @public
         */
        value: function unbind(evtType, selector, callback) {
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
        }
    }, {
        key: 'unDelegate',
        value: function unDelegate(evtType, selector, callback) {
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
        }
    }, {
        key: 'destroy',

        /**
         * removeEventListener to release the memory
         * @public
         */
        value: function destroy() {
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
            for (var n in this._LSN) {
                this._LSN.hasOwnProperty(n) && this._LSN[n] && global.clearTimeout(this._LSN[n]);
            }this._LSN = null;

            this.wrap.innerHTML = '';
        }
    }, {
        key: 'on',

        /**
         * Register event callback
         * @param {string} eventName
         * @param {function} func
         * @public
         */
        value: function on(eventName, func, force) {
            if (inArray(eventName, this.EVENTS) && typeof func === 'function') {
                !(eventName in this.events) && (this.events[eventName] = []);
                if (!force) {
                    this.events[eventName].push(func);
                } else {
                    this.events[eventName].unshift(func);
                }
            }
        }
    }, {
        key: 'has',

        /**
         * Find callback function position
         * @param eventName
         * @param func
         * @returns {number}
         * @public
         */
        value: function has(eventName, func) {
            if (eventName in this.events) {
                return this.events[eventName].indexOf(func);
            }
            return -1;
        }
    }, {
        key: 'off',

        /**
         * Remove event callback
         * @param {string} eventName
         * @param {function} func
         * @public
         */

        value: function off(eventName, func) {
            var index = this.has(eventName, func);
            if (index > -1) {
                delete this.events[eventName][index];
            }
        }
    }, {
        key: 'fire',

        /**
         * Trigger event callbacks
         * @param {string} eventName
         * @param {*} args
         * @public
         */
        value: function fire(eventName) {
            this.log('[EVENT FIRE]:', eventName, arguments);
            if (eventName in this.events) {
                var funcs = this.events[eventName];
                for (var i = 0; i < funcs.length; i++) {
                    typeof funcs[i] === 'function' && funcs[i].apply && funcs[i].apply(this, Array.prototype.slice.call(arguments, 1));
                }
            }
        }
    }, {
        key: 'reset',

        /**
         * reset & rerender
         * @public
         */
        value: function reset() {
            this.pause();
            this._setting();
            this._renderWrapper();
            this.delay && global.setTimeout(this._autoPlay.bind(this), this.delay);
        }
    }, {
        key: 'loadData',

        /**
         * reload Data & render
         * @public
         */
        value: function loadData(data, initIndex) {
            this.pause();
            this.slideIndex = initIndex || 0;
            this.data = data;
            this._renderWrapper();
            this.fire('reloadData');
            this.delay && global.setTimeout(this._autoPlay.bind(this), this.delay);
        }
    }, {
        key: '_autoPlay',

        /**
         * auto check to play and bind events
         * @private
         */
        value: function _autoPlay() {
            // enable
            if (this.isAutoplay) {
                this.has('slideChanged', this.play) < 0 && this.on('slideChanged', this.play, 1);
                this.has('slideRestored', this.play) < 0 && this.on('slideRestored', this.play, 1);
                this.play();
            } else {
                this.off('slideChanged', this.play);
                this.off('slideRestored', this.play);
            }
        }
    }, {
        key: 'play',

        /**
         * Start autoplay
         * @public
         */
        value: function play() {
            this._LSN.autoPlay && global.clearTimeout(this._LSN.autoPlay);
            this._LSN.autoPlay = global.setTimeout(this.slideNext.bind(this), this.duration);
        }
    }, {
        key: 'pause',

        /**
         * pause autoplay
         * @public
         */
        value: function pause() {
            this._LSN.autoPlay && global.clearTimeout(this._LSN.autoPlay);
        }
    }, {
        key: 'hold',

        /**
         * Maintaining the current scene
         * Disable touch events, except for the native method.
         * @public
         */
        value: function hold() {
            this.holding = true;
        }
    }, {
        key: 'unhold',

        /**
         * Release current scene
         * unlock at same time
         * @public
         */
        value: function unhold() {
            this.holding = false;
            this.unlock();
        }
    }, {
        key: 'lock',

        /**
         * You can't do anything on this scene
         * lock native method calls
         * hold at same time
         * @public
         */
        value: function lock() {
            this.hold();
            this.locking = true;
        }
    }, {
        key: 'unlock',

        /**
         * unlock native method calls
         * @public
         */
        value: function unlock() {
            this.locking = false;
        }
    }]);

    return iSlider;
})();

window['iSlider'] = iSlider;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ext/islider_animate.js":2}],4:[function(require,module,exports){
'use strict';
/*
 * @file   To create right&left botton on iSlider
 * @author xieyu33333
 */

//import iSlider from '../islider_core.js';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iSlider_B = (function (_iSlider) {
    _inherits(iSlider_B, _iSlider);

    function iSlider_B() {
        _classCallCheck(this, iSlider_B);

        for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
            opts[_key] = arguments[_key];
        }

        //直接调用父类构造器进行初始化
        _get(Object.getPrototypeOf(iSlider_B.prototype), 'constructor', this).apply(this, opts);

        this && this.regPlugin('button', function () {
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
    }

    return iSlider_B;
})(iSlider);

window['iSlider'] = iSlider_B;

},{}],5:[function(require,module,exports){
'use strict';
/*
 * @file   To create dots index on iSlider
 * @author xieyu33333
 */

//import iSlider from '../islider_core.js';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iSlider_D = (function (_iSlider) {
    _inherits(iSlider_D, _iSlider);

    function iSlider_D() {
        for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
            opts[_key] = arguments[_key];
        }

        _classCallCheck(this, iSlider_D);

        //直接调用父类构造器进行初始化
        _get(Object.getPrototypeOf(iSlider_D.prototype), 'constructor', this).apply(this, opts);

        this && this.regPlugin('dot', function (opts) {
            var HANDLE = this;
            if (!HANDLE.isVertical) {
                (function () {
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
                })();
            }
        });
    }

    return iSlider_D;
})(iSlider);

window['iSlider'] = iSlider_D;

},{}],6:[function(require,module,exports){
(function (global){
'use strict';
/**
 * Support 3D matrix translate
 * @type {boolean}
 */
//import iSlider from '../islider_core.js';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var iSlider_Z = (function (_iSlider) {
    _inherits(iSlider_Z, _iSlider);

    function iSlider_Z() {
        for (var _len = arguments.length, opts = Array(_len), _key = 0; _key < _len; _key++) {
            opts[_key] = arguments[_key];
        }

        _classCallCheck(this, iSlider_Z);

        //直接调用父类构造器进行初始化
        _get(Object.getPrototypeOf(iSlider_Z.prototype), 'constructor', this).apply(this, opts);

        var startHandlerOriginal = this.startHandler;
        var endHandlerOriginal = this.endHandler;
        var moveHandlerOriginal = this.moveHandler;

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

        this.extend({
            startHandler: startHandler,
            moveHandler: moveHandler,
            endHandler: endHandler
        });

        this.regPlugin('zoompic', initZoom);
    }

    return iSlider_Z;
})(iSlider);

window['iSlider'] = iSlider_Z;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L2RlbW8vZG9tL3NsaWRlX3dpdGhfYnRuL21haW4uanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L3NyYy9leHQvaXNsaWRlcl9hbmltYXRlLmpzIiwiZDovZ2l0aHViRGV2ZWxvcG1lbnQvaVNsaWRlci1INS9zcmMvaXNsaWRlci5qcyIsImQ6L2dpdGh1YkRldmVsb3BtZW50L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvaXNsaWRlcl9idXR0b24uanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2lzbGlkZXJfZG90LmpzIiwiZDovZ2l0aHViRGV2ZWxvcG1lbnQvaVNsaWRlci1INS9zcmMvcGx1Z2lucy9pc2xpZGVyX3pvb21waWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztRQ0FPLHlCQUF5Qjs7UUFDekIsd0NBQXdDOztRQUN4QyxxQ0FBcUM7O1FBQ3JDLHlDQUF5Qzs7QUFFaEQsSUFBSSxJQUFJLEdBQUcsQ0FBQztBQUNSLGFBQVMsRUFBRSxvR0FBb0c7Q0FDbEgsRUFDRztBQUNJLGFBQVMsRUFBRSxtR0FBbUc7Q0FDakgsRUFDRDtBQUNJLGFBQVMsRUFBRSxtR0FBbUc7Q0FDakgsRUFDRDtBQUNJLGFBQVMsRUFBRSxtR0FBbUc7Q0FDakgsRUFDRDtBQUNJLGFBQVMsRUFBRSxtR0FBbUc7Q0FDakgsRUFDRDtBQUNJLGFBQVMsRUFBRSxtR0FBbUc7Q0FDakgsQ0FBQyxDQUFDOztBQUVQLElBQUksSUFBSSxHQUFHO0FBQ1AsUUFBSSxFQUFFLElBQUk7QUFDVixRQUFJLEVBQUUsS0FBSztBQUNYLE9BQUcsRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLGlCQUFpQixDQUFDO0FBQy9DLFlBQVEsRUFBRSxJQUFJO0FBQ2QsV0FBTyxFQUFFLENBQUMsUUFBUSxF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QUM7QUFDOUMsWUFBSSxXQUFXLEdBQUcsQUFBQyxJQUFJLEtBQUssR0FBRyxHQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMxQyxZQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQzs7QUFFM0MsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzs7QUFFOUMsWUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1QsZUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQztTQUM3QyxNQUFNO0FBQ0gsZUFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQUFBQyxNQUFNLEdBQUcsQ0FBQyxHQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLENBQUM7U0FDekY7O0FBRUQsV0FBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsNkJBQTZCLEdBQUcsQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQSxHQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssR0FBRyxXQUFXLEdBQUcsSUFBSSxHQUFHLEdBQUcsSUFBSSxNQUFNLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxDQUFBLEFBQUMsR0FBRyxLQUFLLEdBQUcsUUFBUSxHQUFHLFlBQVksR0FBRyxHQUFHLEdBQUcsV0FBVyxJQUFJLEVBQUUsR0FBRyxXQUFXLEdBQUcsRUFBRSxDQUFBLEFBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsR0FBRyxNQUFNLENBQUM7S0FDOVE7O0FBRUQsVUFBTSxFQUFFLGNBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUMxQyxZQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV0QyxZQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCxlQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDO0FBQzFDLGVBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2YsTUFBTTtBQUNILGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEFBQUMsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDdkc7O0FBRUQsWUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFO0FBQzFCLHNCQUFVLENBQUMsWUFBVztBQUNsQixtQkFBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDbEIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYOztBQUVELFlBQUksU0FBUyxHQUFHLEFBQUMsR0FBRyxDQUFDLEdBQUcsR0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RHLFdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRywyQkFBMkIsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQSxHQUFJLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxHQUFHLEtBQUssQ0FBQztLQUNyTDs7QUFFRCxVQUFNLEVBQUUsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRTtBQUMvQyxZQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDWixlQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxBQUFDLENBQUMsR0FBRyxDQUFDLEdBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQztTQUN6RCxNQUFNO0FBQ0gsZUFBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7U0FDekQ7QUFDRCxjQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQixZQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCxlQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUksTUFBTSxHQUFHLEtBQUssQUFBQyxDQUFDO1NBQzVDLE1BQU07QUFDSCxlQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ3RDO0tBQ0o7OztBQUdELFVBQU0sRUFBRSxTQUFTLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUN6RCxXQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQzs7O0FBR1osaUJBQVMsT0FBTyxHQUFHO0FBQ2YsZUFBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDdEQsZ0JBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNULG1CQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNaLG1CQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUksTUFBTSxHQUFHLEtBQUssQUFBQyxDQUFDO2FBQzVDLE1BQU07QUFDSCxtQkFBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO2FBQ3ZDO1NBQ0o7OztBQUdELGlCQUFTLE9BQU8sR0FBRztBQUNmLGVBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEFBQUMsQ0FBQyxHQUFHLENBQUMsR0FBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQ3RELGdCQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCxtQkFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDWixtQkFBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFJLE1BQU0sR0FBRyxLQUFLLEFBQUMsQ0FBQzthQUM1QyxNQUFNO0FBQ0gsbUJBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7YUFDdEM7U0FDSjs7QUFFRCxZQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDWixtQkFBTyxFQUFFLENBQUM7U0FDYixNQUFNO0FBQ0gsZ0JBQUksUUFBUSxFQUFFO0FBQ1YsdUJBQU8sRUFBRSxDQUFDO2FBQ2IsTUFBTTtBQUNILHVCQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0o7O0FBR0QsWUFBSSxTQUFTLEdBQUcsQUFBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztLQUMzRjs7O0FBR0QsVUFBTSxFQUFFLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQ3pELFlBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEMsV0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7OztBQUdkLGlCQUFTLE9BQU8sR0FBRztBQUNmLGdCQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDUixtQkFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDWixtQkFBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0FBQ2pDLG1CQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDO2FBQzdDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2QsbUJBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ1osbUJBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUNqQyxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksY0FBYyxHQUFHLElBQUksQ0FBQzthQUN0RCxNQUFNO0FBQ0gsbUJBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQztBQUNoQyxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksY0FBYyxHQUFHLElBQUksQ0FBQzthQUN0RDtTQUNKOzs7QUFHRCxpQkFBUyxPQUFPLEdBQUc7QUFDZixnQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ1IsbUJBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ1osbUJBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztBQUNqQyxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQzthQUM3QyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNkLG1CQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUNaLG1CQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDaEMsbUJBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEQsTUFBTTtBQUNILG1CQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7QUFDaEMsbUJBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEQ7U0FDSjs7QUFFRCxZQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDWixtQkFBTyxFQUFFLENBQUM7U0FDYixNQUFNO0FBQ0gsZ0JBQUksUUFBUSxFQUFFO0FBQ1YsdUJBQU8sRUFBRSxDQUFDO2FBQ2IsTUFBTTtBQUNILHVCQUFPLEVBQUUsQ0FBQzthQUNiO1NBQ0o7O0FBRUQsWUFBSSxTQUFTLEdBQUcsQUFBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBSSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQzFDLFdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztLQUMzRjs7O0FBR0QsVUFBTSxFQUFFLFNBQVMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFO0FBQ3pELFlBQUksY0FBYyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7OztBQUd0QyxpQkFBUyxPQUFPLEdBQUc7QUFDZixlQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxBQUFDLENBQUMsR0FBRyxDQUFDLEdBQUksUUFBUSxHQUFHLFNBQVMsQ0FBQztBQUN0RCxnQkFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1QsbUJBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLENBQUMsR0FBSSxNQUFNLEdBQUcsS0FBSyxBQUFDLENBQUM7QUFDekMsbUJBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEtBQUssR0FBRyxjQUFjLENBQUM7YUFDN0MsTUFBTTtBQUNILG1CQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEMsbUJBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEQ7U0FDSjs7O0FBR0QsaUJBQVMsT0FBTyxHQUFHO0FBQ2YsZUFBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDdEQsZ0JBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7QUFDVCxtQkFBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFJLE1BQU0sR0FBRyxLQUFLLEFBQUMsQ0FBQztBQUN6QyxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQzthQUM3QyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNkLG1CQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQ25DLG1CQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3RELE1BQU07QUFDSCxtQkFBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFJLE1BQU0sR0FBRyxLQUFLLEFBQUMsQ0FBQztBQUN6QyxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBLEdBQUksY0FBYyxHQUFHLElBQUksQ0FBQzthQUN0RDtTQUNKOztBQUVELFlBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNaLG1CQUFPLEVBQUUsQ0FBQztTQUNiLE1BQU07QUFDSCxnQkFBSSxRQUFRLEVBQUU7QUFDVix1QkFBTyxFQUFFLENBQUM7QUFDVixvQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ1IsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMzRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNkLHVCQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx5QkFBeUIsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO2lCQUMxRSxNQUFNO0FBQ0gsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMzRzthQUNKLE1BQU07QUFDSCx1QkFBTyxFQUFFLENBQUM7QUFDVixvQkFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ1AsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMzRyxNQUFNO0FBQ0gsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7aUJBQzFFO2FBQ0o7U0FDSjtLQUNKOzs7QUFHRCxVQUFNLEVBQUUsU0FBUyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDekQsWUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7O0FBR3RDLGlCQUFTLE9BQU8sR0FBRztBQUNmLGVBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEFBQUMsQ0FBQyxHQUFHLENBQUMsR0FBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQ3RELGdCQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQzthQUM3QyxNQUFNO0FBQ0gsbUJBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEQ7U0FDSjs7O0FBR0QsaUJBQVMsT0FBTyxHQUFHO0FBQ2YsZUFBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDdEQsZ0JBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7QUFDVCxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQzthQUM3QyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNkLG1CQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQ25ELG1CQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3REO1NBQ0o7O0FBRUQsWUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ1osbUJBQU8sRUFBRSxDQUFDO0FBQ1YsZ0JBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNQLG1CQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx5QkFBeUIsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxHQUFHLEtBQUssQ0FBQzthQUMzRztTQUNKLE1BQU07QUFDSCxnQkFBSSxRQUFRLEVBQUU7QUFDVix1QkFBTyxFQUFFLENBQUM7QUFDVixvQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ1IsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMzRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNkLHVCQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx5QkFBeUIsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxHQUFHLEtBQUssQ0FBQztpQkFDM0csTUFBTTtBQUNILHVCQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx5QkFBeUIsR0FBRyxJQUFJLEdBQUcsT0FBTyxDQUFDO2lCQUMxRTthQUNKLE1BQU07QUFDSCx1QkFBTyxFQUFFLENBQUM7QUFDVixvQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ1IsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7aUJBQzFFLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2QsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxHQUFHLElBQUksTUFBTSxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBLEFBQUMsQ0FBQSxBQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUMzRyxNQUFNO0FBQ0gsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLHlCQUF5QixHQUFHLElBQUksR0FBRyxPQUFPLENBQUM7aUJBQzFFO2FBQ0o7U0FDSjtLQUNKOzs7QUFHRCxVQUFNLEVBQUUsY0FBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRTtBQUNwRCxZQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUV0QyxZQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCxlQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxLQUFLLEdBQUcsY0FBYyxDQUFDO0FBQzFDLGVBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2YsTUFBTTtBQUNILGVBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLEFBQUMsTUFBTSxHQUFHLENBQUMsR0FBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7U0FDdkc7O0FBRUQsWUFBSSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxFQUFFO0FBQzFCLHNCQUFVLENBQUMsWUFBVztBQUNsQixtQkFBRyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDbEIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNYOztBQUVELFlBQUksU0FBUyxHQUFHLEFBQUMsR0FBRyxDQUFDLEdBQUcsR0FBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RHLFdBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxTQUFTLEdBQUcsSUFBSSxHQUFHLFNBQVMsR0FBRywyQkFBMkIsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQSxHQUFJLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxHQUFHLEtBQUssQ0FBQztLQUNyTDs7O0FBR0QsVUFBTSxFQUFFLGNBQVMsR0FBRyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUU7QUFDcEQsWUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxZQUFJLFlBQVksWUFBQTtZQUFFLFNBQVMsWUFBQTtZQUFFLGtCQUFrQixZQUFBO1lBQUUsa0JBQWtCLFlBQUEsQ0FBQztBQUNwRSxZQUFJLElBQUksS0FBSyxHQUFHLEVBQUU7QUFDZCx3QkFBWSxHQUFHLEdBQUcsQ0FBQztBQUNuQixxQkFBUyxHQUFHLENBQUMsQ0FBQztBQUNkLDhCQUFrQixHQUFHLDBDQUEwQyxDQUFDO0FBQ2hFLDhCQUFrQixHQUFHLHlDQUF5QyxDQUFDO1NBQ2xFLE1BQU07QUFDSCx3QkFBWSxHQUFHLEdBQUcsQ0FBQztBQUNuQixxQkFBUyxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ2YsOEJBQWtCLEdBQUcsMkNBQTJDLENBQUM7QUFDakUsOEJBQWtCLEdBQUcsd0NBQXdDLENBQUM7U0FDakU7O0FBRUQsWUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQzs7O0FBRzlDLGlCQUFTLE9BQU8sR0FBRztBQUNmLGVBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEFBQUMsQ0FBQyxHQUFHLENBQUMsR0FBSSxRQUFRLEdBQUcsU0FBUyxDQUFDO0FBQ3RELGdCQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDVCxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQzthQUM3QyxNQUFNO0FBQ0gsbUJBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQSxHQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7YUFDdEQ7QUFDRCxlQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSwwRUFBMEUsR0FBRyxxQkFBcUIsR0FBRyxrQkFBa0IsQ0FBQztTQUNoSjs7O0FBR0QsaUJBQVMsT0FBTyxHQUFHO0FBQ2YsZUFBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFJLFFBQVEsR0FBRyxTQUFTLENBQUM7QUFDdEQsZ0JBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTs7QUFDVCxtQkFBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsS0FBSyxHQUFHLGNBQWMsQ0FBQzthQUM3QyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNkLG1CQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO0FBQ25ELG1CQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUEsR0FBSSxjQUFjLEdBQUcsSUFBSSxDQUFDO2FBQ3REO0FBQ0QsZUFBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksMkVBQTJFLEdBQUcscUJBQXFCLEdBQUcsa0JBQWtCLENBQUM7U0FDako7O0FBRUQsWUFBSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ1osbUJBQU8sRUFBRSxDQUFDO0FBQ1YsZ0JBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNQLG1CQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLEdBQUcsWUFBWSxHQUFHLEdBQUcsR0FBSSxTQUFTLEdBQUcsRUFBRSxJQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLEFBQUMsR0FBRyxNQUFNLENBQUM7YUFDcEg7U0FDSixNQUFNO0FBQ0gsZ0JBQUksUUFBUSxFQUFFO0FBQ1YsdUJBQU8sRUFBRSxDQUFDO0FBQ1Ysb0JBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtBQUNSLHVCQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLEdBQUcsWUFBWSxHQUFHLFNBQVMsQ0FBQztpQkFDbkUsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDZCx1QkFBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLFlBQVksR0FBRyxHQUFHLEdBQUksU0FBUyxHQUFHLEVBQUUsSUFBSSxNQUFNLEdBQUcsS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUEsQUFBQyxBQUFDLEdBQUcsTUFBTSxDQUFDO2lCQUNwSCxNQUFNO0FBQ0gsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxZQUFZLEdBQUcsU0FBUyxDQUFDO2lCQUNuRTthQUNKLE1BQU07QUFDSCx1QkFBTyxFQUFFLENBQUM7QUFDVixvQkFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO0FBQ1IsdUJBQUcsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLFFBQVEsR0FBRyxZQUFZLEdBQUcsU0FBUyxDQUFDO2lCQUNuRSxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNkLHVCQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxRQUFRLEdBQUcsWUFBWSxHQUFHLEdBQUcsR0FBSSxTQUFTLEdBQUcsRUFBRSxJQUFJLE1BQU0sR0FBRyxLQUFLLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLEFBQUMsR0FBRyxNQUFNLENBQUM7aUJBQ3BILE1BQU07QUFDSCx1QkFBRyxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsUUFBUSxHQUFHLFlBQVksR0FBRyxTQUFTLENBQUM7aUJBQ25FO2FBQ0o7U0FDSjtLQUNKO0NBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ3hZRCxZQUFZLENBQUM7Ozs7Ozs7O29DQUVjLDBCQUEwQjs7Ozs7Ozs7OztBQVFyRCxTQUFTLE9BQU8sQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFO0FBQ2hDLFdBQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztDQUN6QyxDQUFDOzs7Ozs7O0FBT0YsU0FBUyxPQUFPLENBQUMsQ0FBQyxFQUFFO0FBQ2hCLFdBQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLGdCQUFnQixDQUFDO0NBQ2pFLENBQUM7Ozs7Ozs7QUFPRixTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3hCLFdBQU8sR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsU0FBUyxHQUFHLEdBQUcsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO0NBQ3ZFOzs7Ozs7QUFNRCxTQUFTLFFBQVEsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3hCLFFBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQ3JCLFdBQUcsQ0FBQyxTQUFTLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQztLQUM5QjtDQUNKOzs7Ozs7QUFNRCxTQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQzNCLFFBQUksUUFBUSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtBQUNwQixXQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFNBQVMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQ2xGO0NBQ0o7Ozs7Ozs7QUFPRCxTQUFTLEtBQUssQ0FBQyxHQUFHLEVBQUU7QUFDaEIsUUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUN2QixPQUFPLEtBQUssQ0FBQzs7QUFFakIsUUFBSSxLQUFLLEdBQUcsR0FBRyxHQUNYLG9DQUFvQyxHQUNwQywyREFBMkQsR0FDM0QsbUdBQW1HLEdBQ25HLGdCQUFnQixHQUNoQixZQUFZLEdBQ1osY0FBYyxHQUNkLFFBQVEsR0FDUixHQUFHLENBQUM7QUFDUixXQUFPLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztDQUN0Qzs7Ozs7Ozs7Ozs7Ozs7OztJQWdCSyxPQUFPOzs7QUFFRSxhQUZULE9BQU8sR0FFSzs4QkFGWixPQUFPOztBQUlMLFlBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDOztBQUV2RCxZQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNkLGtCQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7U0FDM0M7O0FBRUQsWUFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLGlCQUFpQixHQUFHLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUM7O0FBRXJHLGdCQUFRLElBQUksQ0FBQyxNQUFNO0FBQ2YsaUJBQUssQ0FBQztBQUNGLG9CQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUEsQUFDckMsaUJBQUssQ0FBQztBQUNGLG9CQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQUEsU0FDdEM7O0FBRUQsWUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7QUFDWCxrQkFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO1NBQ2xEOztBQUVELFlBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDakMsa0JBQU0sSUFBSSxLQUFLLENBQUMsNERBQTRELENBQUMsQ0FBQztTQUNqRjs7Ozs7O0FBTUQsWUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7Ozs7Ozs7QUFPbEIsWUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7Ozs7Ozs7QUFPZixZQUFJLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQzs7QUFFdkIsWUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7Ozs7Ozs7QUFPbkIsWUFBSSxDQUFDLE1BQU0sR0FBRyw2R0FBNkcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7QUFPdkksWUFBSSxDQUFDLE1BQU0sR0FBRyxDQUNWLDBDQUEwQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFDckQsZ0RBQWdELENBQ25ELENBQUM7Ozs7Ozs7QUFPRixZQUFJLENBQUMsYUFBYSxHQUFHLG9DQUFvQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzs7Ozs7OztBQVFyRSxZQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzs7Ozs7Ozs7Ozs7O0FBWWxCLFlBQUksQ0FBQyxhQUFhLEdBQUc7QUFDakIscUJBQVMsRUFBRSxrQkFBUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFO0FBQzdDLG1CQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyx5QkFBeUIsR0FBRyxJQUFJLEdBQUcsR0FBRyxJQUFJLE1BQU0sR0FBRyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUEsQUFBQyxHQUFHLEtBQUssQ0FBQzthQUMzRztTQUNKLENBQUM7O0FBRUYsZUFBTyxDQUFDLEdBQUcsbUNBQWdCLENBQUE7OztBQUczQixZQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLG9DQUFpQixDQUFDOztBQUVoRCxlQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQTs7QUFFL0IsWUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7QUFDM0IsWUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDOztBQUVoQixZQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hCLFlBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN0QixZQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7QUFDcEIsWUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0tBQ3ZCOzs7Ozs7O2lCQS9HQyxPQUFPOztlQXFISywwQkFBRyxFQUVoQjs7Ozs7Ozs7ZUFNSyxrQkFBRztBQUNMLGdCQUFJLElBQUksWUFBQTtnQkFBRSxNQUFNLFlBQUE7Z0JBQUUsSUFBSSxHQUFHLFNBQVMsQ0FBQzs7QUFFbkMsb0JBQVEsSUFBSSxDQUFDLE1BQU07QUFDZixxQkFBSyxDQUFDO0FBQ0YsMkJBQU87QUFBQSxBQUNYLHFCQUFLLENBQUM7QUFDRix3QkFBSSxHQUFHLElBQUksQ0FBQztBQUNaLDBCQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pCLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxDQUFDO0FBQ0Ysd0JBQUksR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDZiwwQkFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqQiwwQkFBTTtBQUFBLGFBQ2I7O0FBRUQsaUJBQUssSUFBSSxRQUFRLElBQUksTUFBTSxFQUFFO0FBQ3pCLG9CQUFJLE1BQU0sQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDakMsd0JBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7aUJBQ3JDO2FBQ0o7U0FDSjs7Ozs7Ozs7O2VBT1EsbUJBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRTtBQUNwQixnQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQztTQUNyRDs7Ozs7Ozs7ZUFNa0IsK0JBQUc7QUFDbEIsZ0JBQUksT0FBTyxZQUFBLENBQUM7QUFDWixtQkFBTyxZQUFXO0FBQ2Qsb0JBQUksT0FBTyxFQUFFO0FBQ1QsMkJBQU8sT0FBTyxDQUFDO2lCQUNsQjtBQUNELG9CQUFJLEVBQUUsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBQy9DLG9CQUFJLFdBQVcsR0FBRztBQUNkLDhCQUFVLEVBQUUsZUFBZTtBQUMzQiwrQkFBVyxFQUFFLGdCQUFnQjtBQUM3QixpQ0FBYSxFQUFFLGVBQWU7QUFDOUIsb0NBQWdCLEVBQUUscUJBQXFCO2lCQUMxQyxDQUFDO0FBQ0YscUJBQUssSUFBSSxDQUFDLElBQUksV0FBVyxFQUFFO0FBQ3ZCLHdCQUFJLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7QUFDNUQsK0JBQVEsT0FBTyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBRTtxQkFDckM7aUJBQ0o7YUFDSixDQUFBO1NBQ0o7Ozs7Ozs7O2VBT08sb0JBQUc7Ozs7Ozs7QUFPUCxnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0FBTzdCLGdCQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7Ozs7OztBQU14QyxnQkFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Ozs7OztBQU1yQixnQkFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Ozs7OztBQU1yQixnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7OztBQU90QixnQkFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDOzs7Ozs7O0FBT3JCLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7QUFPdEIsZ0JBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Ozs7Ozs7QUFPcEMsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7QUFPeEMsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUM7Ozs7Ozs7QUFPdEMsZ0JBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7QUFPbEcsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDOzs7Ozs7O0FBTzVELGdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7Ozs7Ozs7QUFPekQsZ0JBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDOzs7Ozs7O0FBT3hDLGdCQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7Ozs7Ozs7QUFPakQsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7Ozs7Ozs7QUFPbkMsZ0JBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7Ozs7Ozs7QUFPckMsZ0JBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0FBT3RDLGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0FBT3hELGdCQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLElBQUk7QUFDekIsaUJBQUMsRUFBRSxDQUFDO0FBQ0osaUJBQUMsRUFBRSxDQUFDO2FBQ1AsQ0FBQzs7Ozs7OztBQU9GLGdCQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7Ozs7OztBQU94RSxnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsS0FBSyxDQUFDOzs7Ozs7O0FBT3ZFLGdCQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDOzs7Ozs7O0FBTzdCLGdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7Ozs7Ozs7QUFPekUsbUJBQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQzdCLG1CQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO0FBQ25ELGdCQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQzs7Ozs7QUFLekYsZ0JBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7Ozs7QUFJekQsZ0JBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFBRTtBQUNoRCxvQkFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDNUI7Ozs7Ozs7QUFPRCxnQkFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDakMsc0JBQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ3ZELEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQzs7O0FBR3hCLGdCQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Ozs7Ozs7Ozs7QUFVckIsZ0JBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxHQUFHLEdBQUcsQ0FBQzs7Ozs7OztBQU85RixnQkFBSSxDQUFDLGFBQWEsR0FDZCxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDOzs7Ozs7O0FBT3pILGdCQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzs7Ozs7OztBQU9uQixnQkFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLFlBQVc7QUFDNUIsb0JBQUksUUFBUSxHQUFHLENBQUMsRUFBRSxBQUFDLGNBQWMsSUFBSSxNQUFNLElBQUssTUFBTSxDQUFDLGFBQWEsSUFBSSxRQUFRLFlBQVksTUFBTSxDQUFDLGFBQWEsQ0FBQSxBQUFDLENBQUM7QUFDbEgsdUJBQU87QUFDSCw0QkFBUSxFQUFFLFFBQVE7QUFDbEIsNEJBQVEsRUFBRSxRQUFRLEdBQUcsWUFBWSxHQUFHLFdBQVc7QUFDL0MsMkJBQU8sRUFBRSxRQUFRLEdBQUcsV0FBVyxHQUFHLFdBQVc7QUFDN0MsMEJBQU0sRUFBRSxRQUFRLEdBQUcsVUFBVSxHQUFHLFNBQVM7aUJBQzVDLENBQUM7YUFDTCxDQUFBLEVBQUcsQ0FBQzs7Ozs7OztBQU9MLGdCQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzs7Ozs7OztBQU9qQixnQkFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzs7O0FBR2xDLGdCQUFJLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7QUFHNUMsZ0JBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztBQUd4QyxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O0FBRzlDLGdCQUFJLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDOzs7QUFHaEQsZ0JBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7OztBQUdoRCxnQkFBSSxDQUFDLEVBQUUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUMsQ0FBQzs7Ozs7Ozs7OztBQVVsRCxnQkFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLFlBQVc7QUFDNUIsb0JBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTs7QUFDdkIsNEJBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztBQUNoQiw0QkFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUU7QUFDbkQsZ0NBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ2pCLHNDQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDdkMsTUFBTSxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFBRTtBQUNuQyxzQ0FBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQzs2QkFDdkI7eUJBQ0osQ0FBQyxDQUFDO0FBQ0g7K0JBQU8sTUFBTTswQkFBQzs7OztpQkFDakIsTUFBTTtBQUNILDJCQUFPLEVBQUUsQ0FBQTtpQkFDWjthQUNKLENBQUEsRUFBRyxDQUFDOzs7QUFHTCxnQkFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDNUY7Ozs7Ozs7O2VBTVcsd0JBQUc7QUFDWCxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUMvQixnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztBQUM1QixpQkFBSyxJQUFJLENBQUMsSUFBSSxNQUFNLEVBQUU7QUFDbEIsb0JBQUksTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3ZELHdCQUFJLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUMxQywyQkFBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFBSSxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2xIO2FBQ0o7U0FDSjs7Ozs7Ozs7ZUFNWSx5QkFBRztBQUNaLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztBQUM3QixnQkFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQztBQUN6QixnQkFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsQ0FBQzs7Ozs7Ozs7QUFRMUIsZ0JBQUksQ0FBQyxRQUFRLEdBQUcsVUFBUyxRQUFRLEVBQUU7QUFDL0Isb0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDN0Isb0JBQUksTUFBTSxZQUFBLENBQUM7O0FBRVgsb0JBQUksR0FBRyxHQUFHLE1BQU0sRUFBRTtBQUNkLDBCQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDckIsTUFBTSxJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsTUFBTSxFQUFFO0FBQzlCLDBCQUFNLEdBQUcsTUFBTSxJQUFJLEFBQUMsR0FBRyxHQUFHLE1BQU0sSUFBSyxDQUFDLENBQUEsQUFBQyxDQUFDO2lCQUMzQyxNQUFNO0FBQ0gsMEJBQU0sR0FBRyxNQUFNLEdBQUcsT0FBTyxJQUFJLEFBQUMsR0FBRyxHQUFHLE1BQU0sR0FBRyxNQUFNLElBQUssQ0FBQyxDQUFBLEFBQUMsQ0FBQztpQkFDOUQ7O0FBRUQsdUJBQU8sUUFBUSxHQUFHLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUM7YUFDMUMsQ0FBQztTQUNMOzs7Ozs7Ozs7O2VBUVEsbUJBQUMsSUFBSSxFQUFFO0FBQ1osZ0JBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDZCxvQkFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUI7QUFDRCxnQkFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQzdCLHVCQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDcEI7QUFDRCxnQkFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUMzQixnQkFBSSxJQUFJLFlBQUEsQ0FBQztBQUNULGdCQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7QUFDakIsb0JBQUksR0FBRyxPQUFPLENBQUM7YUFDbEIsTUFBTTtBQUNILG9CQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUN4RCx3QkFBSSxHQUFHLE1BQU0sQ0FBQztpQkFDakIsTUFBTSxJQUFJLE9BQU8sT0FBTyxLQUFLLFFBQVEsRUFBRTtBQUNwQyx3QkFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7QUFDaEIsNEJBQUksR0FBRyxLQUFLLENBQUM7cUJBQ2hCLE1BQU07QUFDSCw0QkFBSSxHQUFHLE1BQU0sQ0FBQztxQkFDakI7aUJBQ0osTUFBTTtBQUNILHdCQUFJLEdBQUcsU0FBUyxDQUFDO2lCQUNwQjthQUNKOztBQUVELGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsbUJBQU8sSUFBSSxDQUFDO1NBQ2Y7Ozs7Ozs7Ozs7ZUFRVSxxQkFBQyxFQUFFLEVBQUUsU0FBUyxFQUFFOztBQUV2QixnQkFBSSxJQUFJLFlBQUE7Z0JBQ0osSUFBSSxHQUFHLElBQUk7Z0JBQ1gsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOztBQUUzQixnQkFBSSxTQUFTLEdBQUcsU0FBUyxtQkFBbUIsR0FBRztBQUMzQyxvQkFBSSxJQUFJLEdBQUcsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDOztBQUV6QyxvQkFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUN2Qyx3QkFBSSxJQUFJLGdCQUFnQixDQUFDO2lCQUM1QixNQUFNO0FBQ0gsd0JBQUksSUFBSSxlQUFlLENBQUM7aUJBQzNCO0FBQ0Qsb0JBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtBQUNuQixzQkFBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsMkJBQTJCLENBQUM7QUFDMUUsd0JBQUksSUFBSSwwREFBMEQsQ0FBQTtpQkFDckU7O0FBRUQsa0JBQUUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLElBQUksR0FBRyxLQUFLLENBQUM7YUFDeEMsQ0FBQzs7O0FBR0YsY0FBRSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDbEIsY0FBRSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDOzs7QUFHekIsZ0JBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFOztBQUVqRCx1QkFBTzthQUNWLE1BQU07QUFDSCx5QkFBUyxHQUFHLENBQUMsR0FBRywrQ0FBK0MsU0FBUyxDQUFBLEdBQUksR0FBRyxDQUFDO0FBQ2hGLG9CQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUMvQjs7QUFFRCxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFaEMsZ0JBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7QUFFbEQsY0FBRSxDQUFDLFNBQVMsR0FBRyxVQUFVLEdBQUcsSUFBSSxDQUFDOztBQUVqQyxvQkFBUSxJQUFJO0FBQ1IscUJBQUssS0FBSztBQUNOLHdCQUFJLElBQUksQ0FBQyxJQUFJLEtBQUssQ0FBQyxFQUFFO0FBQ2pCLGlDQUFTLEVBQUUsQ0FBQztxQkFDZixNQUFNOztBQUNILGdDQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQzdCLHNDQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDOUIsc0NBQVUsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUMzQixvQ0FBSSxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDO0FBQ2hDLG9DQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7QUFDOUIseUNBQVMsRUFBRSxDQUFDO0FBQ1osb0NBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDOzZCQUNqQixDQUFDOztxQkFDTDtBQUNELDBCQUFNO0FBQUEsQUFDVixxQkFBSyxLQUFLLENBQUM7QUFDWCxxQkFBSyxNQUFNO0FBQ1Asc0JBQUUsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztBQUM1QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssTUFBTSxDQUFDO0FBQ1oscUJBQUssU0FBUzs7QUFFVix3QkFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsS0FBSyxFQUFFLEVBQUU7QUFDOUIsNEJBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDM0MsOEJBQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pDLDRCQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztxQkFDekI7QUFDRCxzQkFBRSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsMEJBQU07QUFBQSxBQUNWOztBQUVJLDBCQUFNO0FBQUEsYUFDYjs7QUFFRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQy9COzs7Ozs7Ozs7Ozs7O2VBV3VCLG9DQUFHO0FBQ3ZCLGdCQUFJLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLEVBQUU7QUFDakMsb0JBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUN0RCxvQkFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQzthQUNsQztTQUNKOzs7Ozs7OztlQU1hLDBCQUFHO0FBQ2IsZ0JBQUksV0FBVyxHQUFHLENBQUMsY0FBYyxFQUFFLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3JFLGdCQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLGVBQWUsQ0FBQyxFQUFFLEVBQUUsS0FBSyxFQUFFO0FBQ2pELDJCQUFXLENBQUMsRUFBRSxFQUFFLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQ25ELHdCQUFRLENBQUMsRUFBRSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO2FBQ25DLENBQUMsQ0FBQztTQUNOOzs7Ozs7OztlQU1hLDBCQUFHO0FBQ2IsZ0JBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBLEFBQUMsQ0FBQzs7QUFFMUMsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2RCxpQkFBSyxDQUFDLFNBQVMsR0FBRyxlQUFlLENBQUM7Ozs7Ozs7O0FBUWxDLGdCQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7QUFFZCxpQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4QixvQkFBSSxFQUFFLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QyxvQkFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7OztBQUdsQixvQkFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzs7O0FBR25ELG9CQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNmLHNCQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUM7aUJBQzlCOztBQUVELG9CQUFJLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssTUFBTSxDQUFBLEFBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFbEwscUJBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDekI7O0FBRUQsZ0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7O0FBR3RCLGtCQUFNLENBQUMsVUFBVSxDQUFDLENBQUEsWUFBVztBQUN6QixvQkFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDckMsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0FBR25CLGdCQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTs7Ozs7QUFLYixvQkFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsb0JBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2hDO1NBQ0o7Ozs7Ozs7Ozs7ZUFRVSxxQkFBQyxTQUFTLEVBQUU7OztBQUNuQixnQkFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7O0FBQ3RCLHdCQUFJLElBQUksR0FBRyxNQUFLLElBQUksQ0FBQztBQUNyQix3QkFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUN0Qix3QkFBSSxJQUFJLFFBQU8sQ0FBQztBQUNoQix3QkFBSSxPQUFPLEdBQUcsU0FBUyx3QkFBd0IsQ0FBQyxLQUFLLEVBQUU7QUFDbkQsNEJBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN2Qiw0QkFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7O0FBQzlDLG9DQUFJLFVBQVUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0FBQzdCLDBDQUFVLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFDOUIsMENBQVUsQ0FBQyxNQUFNLEdBQUcsWUFBVztBQUMzQix3Q0FBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDO0FBQzlCLHdDQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxNQUFNLENBQUM7QUFDaEMsd0NBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO2lDQUNqQixDQUFDO0FBQ0Ysb0NBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDOzt5QkFDakI7cUJBQ0osQ0FBQzs7QUFFRiwyQkFBTyxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQSxHQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLDJCQUFPLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxHQUFHLEdBQUcsQ0FBQSxHQUFJLEdBQUcsQ0FBQyxDQUFDOzthQUN4QztTQUNKOzs7Ozs7OztlQU1rQiw2QkFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFOztBQUVqQyxnQkFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2hCLGdCQUFJLElBQUksR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3BELGdCQUFJLEdBQUcsWUFBQSxDQUFDO0FBQ1IsZ0JBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLGlDQUFpQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFdEUscUJBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRTtBQUNqQixvQkFBSSxHQUFHLEVBQUU7QUFDTCwwQkFBTSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDNUI7QUFDRCxvQkFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0FBQ2pCLG9CQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxvQ0FBb0MsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekUsb0JBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxDQUFDLEVBQUU7O0FBRXRCLHdCQUFJLFNBQVMsS0FBSyxjQUFjLEVBQUU7QUFDOUIsNEJBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztxQkFDekI7QUFDRCx3QkFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVCLHdCQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztpQkFDbkM7QUFDRCx1QkFBTyxFQUFFLENBQUM7YUFDYixDQUFDOztBQUVGLHFCQUFTLE9BQU8sR0FBRztBQUNmLG9CQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLHlCQUF5QixDQUFDLEVBQUUsRUFBRTtBQUNwRCxzQkFBRSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM5RCxDQUFDLENBQUM7QUFDSCxvQkFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7YUFDNUI7O0FBRUQsZ0JBQUksSUFBSSxHQUFHLENBQUMsRUFBRTtBQUNWLG9CQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLHFCQUFxQixDQUFDLEVBQUUsRUFBRTtBQUNoRCxzQkFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUMzRCxDQUFDLENBQUM7YUFDTjtBQUNELGVBQUcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0QyxnQkFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1NBQ3BCOzs7Ozs7OztlQU1XLHdCQUFHO0FBQ1gsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O0FBRXZCLGdCQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDbEIsb0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0Isb0JBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ2xCLHlCQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7O0FBRS9CLHlCQUFLLENBQUMsV0FBVyxHQUFHLFVBQVMsR0FBRyxFQUFFO0FBQzlCLDRCQUFJLEdBQUcsRUFBRTtBQUNMLG1DQUFPLEtBQUssQ0FBQzt5QkFDaEI7QUFDRCwrQkFBTyxJQUFJLENBQUM7cUJBQ2YsQ0FBQztpQkFDTDtBQUNELHFCQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUM5QyxxQkFBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDN0MscUJBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzVDLGlCQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDM0U7O0FBRUQsa0JBQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNuRCxrQkFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR3hDLGtCQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztBQUM5QyxrQkFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDaEQ7Ozs7Ozs7Ozs7ZUFRVSxxQkFBQyxHQUFHLEVBQUU7QUFDYixnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUMvQixvQkFBUSxHQUFHLENBQUMsSUFBSTtBQUNaLHFCQUFLLFdBQVc7O0FBRVosd0JBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUUsTUFBTTtBQUFBLEFBQ2hDLHFCQUFLLFlBQVk7QUFDYix3QkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN2QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssTUFBTSxDQUFDLE9BQU87QUFDZix3QkFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssTUFBTSxDQUFDLE1BQU0sQ0FBQztBQUNuQixxQkFBSyxVQUFVLENBQUM7QUFDaEIscUJBQUssYUFBYTtBQUNkLHdCQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxtQkFBbUI7QUFDcEIsd0JBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO0FBQ2hDLDBCQUFNO0FBQUEsQUFDVixxQkFBSyxPQUFPO0FBQ1Isd0JBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUNqQiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssTUFBTTtBQUNQLHdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDYiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssUUFBUTtBQUNULHdCQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7QUFDckIsMEJBQU07QUFBQSxhQUNiO1NBQ0o7Ozs7Ozs7OztlQU9XLHNCQUFDLEdBQUcsRUFBRTtBQUNkLGdCQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZCxvQkFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNwRCx1QkFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUN4QjthQUNKO0FBQ0QsZ0JBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO0FBQzlCLHVCQUFPO2FBQ1Y7QUFDRCxnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztBQUMvQixnQkFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7QUFDckIsZ0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzs7QUFFYixnQkFBSSxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUN6QixnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVuQyxnQkFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQ3RDLGdCQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUN2RSxnQkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDMUU7Ozs7Ozs7OztlQU9VLHFCQUFDLEdBQUcsRUFBRTtBQUNiLGdCQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtBQUNoQix1QkFBTzthQUNWO0FBQ0QsZ0JBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDMUIsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsZ0JBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQzNCLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JCLGdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ25DLGdCQUFJLE1BQU0sR0FBRztBQUNULGlCQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsR0FBSSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQUFBQztBQUMzRixpQkFBQyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEdBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBSyxHQUFHLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEFBQUM7YUFDOUYsQ0FBQzs7QUFFRixnQkFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7O0FBRXJCLGdCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O0FBRTdELG1CQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRXJCLG9CQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7O0FBRTlCLG9CQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNqQix3QkFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxVQUFVLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0FBQzlGLDhCQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDOUM7aUJBQ0o7O0FBRUQscUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDeEIsd0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsd0JBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO0FBQ3ZDLHdCQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7aUJBQzlEO2FBQ0o7U0FDSjs7Ozs7Ozs7O2VBT1Msb0JBQUMsR0FBRyxFQUFFO0FBQ1osZ0JBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2hCLHVCQUFPO2FBQ1Y7QUFDRCxnQkFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUN2QixnQkFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7QUFDdEIsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7QUFDekIsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDckIsZ0JBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLGdCQUFJLE9BQU8sR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDOzs7O0FBSW5DLG9CQUFRLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLFFBQVEsR0FBRyxFQUFFLENBQUM7O0FBRTFELGdCQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOztBQUUxRCxnQkFBSSxPQUFPLEdBQUcsU0FBVixPQUFPLENBQVksRUFBRSxFQUFFO0FBQ3ZCLG9CQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssR0FBRyxFQUFFO0FBQ3BCLHdCQUFJLEVBQUUsQ0FBQyxJQUFJLEVBQUU7QUFDVCw4QkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQTtBQUM5QiwrQkFBTyxLQUFLLENBQUM7cUJBQ2hCO2lCQUNKLE1BQU0sSUFBSSxFQUFFLENBQUMsU0FBUyxLQUFLLGFBQWEsRUFBRTtBQUN2QywyQkFBTyxLQUFLLENBQUM7aUJBQ2hCLE1BQU07QUFDSCwyQkFBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDMUI7YUFDSixDQUFBOztBQUVELGdCQUFJLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLGdCQUFnQixFQUFFLElBQUksQ0FBQyxDQUFDOztBQUVwRSxnQkFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksUUFBUSxJQUFJLGdCQUFnQixHQUFHLFNBQVMsRUFBRTtBQUMxRCxvQkFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3JDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLElBQUksZ0JBQWdCLEdBQUcsU0FBUyxFQUFFO0FBQ2pFLG9CQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDckMsTUFBTTtBQUNILG9CQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNqQzs7O0FBR0QsZ0JBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO0FBQzlELG9CQUFJLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDNUMsb0JBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekMsb0JBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUNkLHVCQUFHLENBQUMsTUFBTSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7aUJBQ3JDO0FBQ0Qsb0JBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDeEMsdUJBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDeEI7YUFDSjs7QUFFRCxnQkFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDOztBQUVsQyxnQkFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUVqQixnQkFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQ3BDOzs7Ozs7OztlQU11QixvQ0FBRztBQUN2QixrQkFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFBLFlBQVc7QUFDekIsb0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLG9CQUFJLENBQUMsR0FBRyxDQUFDLDBCQUEwQixDQUFDLENBQUM7YUFDeEMsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN0Qjs7Ozs7Ozs7ZUFNWSx5QkFBRztBQUNaLGdCQUFJLElBQUksQ0FBQyxNQUFNLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNoRixvQkFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFELG9CQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUEsWUFBVztBQUM1Qyx3QkFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0FBQ2Isd0JBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDMUIsd0JBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztpQkFDN0QsQ0FBQSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUN0QjtTQUNKOzs7Ozs7Ozs7ZUFPTSxpQkFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQ3JCLGdCQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDZCx1QkFBTzthQUNWO0FBQ0QsZ0JBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNkLGdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ25DLGdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO0FBQ25DLGdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDO0FBQ3BDLGdCQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBQ3JCLGdCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDO0FBQ25CLGdCQUFJLEdBQUcsR0FBRyxTQUFTLENBQUM7QUFDcEIsZ0JBQUksQ0FBQyxHQUFHLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3BDLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3pCLGdCQUFJLFNBQVMsWUFBQSxDQUFDOztBQUVkLGdCQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtBQUMxQixvQkFBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxFQUFFO0FBQ3ZCLCtCQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDbEM7QUFDRCxvQkFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUNoRiwrQkFBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDL0IsK0JBQVcsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUNqRDthQUNKOzs7QUFHRCxnQkFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUM7O0FBRXpFLGdCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ2pCLG9CQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQzVEOzs7QUFHRCxnQkFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O0FBR3RCLGdCQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNYLG9CQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQzthQUN6QixNQUFNO0FBQ0gsb0JBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNoQix3QkFBSSxDQUFDLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztpQkFDakQsTUFBTTtBQUNILHdCQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDbEMscUJBQUMsR0FBRyxDQUFDLENBQUM7aUJBQ1Q7YUFDSjs7QUFFRCxnQkFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDOzs7QUFHckMsZ0JBQUksTUFBTSxZQUFBO2dCQUFFLE1BQU0sWUFBQTtnQkFBRSxJQUFJLFlBQUEsQ0FBQzs7OztBQUl6QixnQkFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFOztBQUVULHlCQUFTLEdBQUcsY0FBYyxDQUFDO2FBQzlCLE1BQU07O0FBRUgsb0JBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxLQUFLLFdBQVcsS0FBSyxRQUFRLElBQUksV0FBVyxLQUFLLE1BQU0sQ0FBQSxDQUFDLEdBQUssQ0FBQyxHQUFHLENBQUMsQUFBQyxFQUFFO0FBQ3JGLHVCQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQ3RCLDBCQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLDBCQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2hCLHdCQUFJLEdBQUcsQ0FBQyxDQUFDO2lCQUNaLE1BQU07QUFDSCx1QkFBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztBQUN2QiwwQkFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQiwwQkFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNoQix3QkFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNiOztBQUVELG9CQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ25CLHdCQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztBQUNoQyx3QkFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUNyQyxNQUFNLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDeEIsd0JBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztBQUNyQyx3QkFBSSxDQUFDLGtCQUFrQixHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsQ0FBQztpQkFDbEQ7O0FBRUQsc0JBQU0sQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEdBQUcsTUFBTSxDQUFDO0FBQ3ZDLHNCQUFNLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7O0FBRW5DLHNCQUFNLENBQUMsVUFBVSxDQUFDLFlBQVc7QUFDekIsMEJBQU0sQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztpQkFDdkMsRUFBRSxHQUFHLENBQUMsQ0FBQzs7O0FBR1IsMkJBQVcsR0FBRyxXQUFXLEdBQUcsV0FBVyxDQUFDOztBQUV4Qyx5QkFBUyxHQUFHLGFBQWEsQ0FBQzthQUM3Qjs7QUFFRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDcEQsZ0JBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsU0FBUyxHQUFHLEdBQUcsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzs7O0FBR3RGLGlCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3hCLG9CQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7O0FBRW5CLHVCQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGdCQUFnQixHQUFHLE1BQU0sR0FBSSxXQUFXLEdBQUcsSUFBSSxBQUFDLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7aUJBQzdGO0FBQ0QsMkJBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQy9EOzs7QUFHRCxnQkFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsVUFBVSxLQUFLLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQzNFLG9CQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDaEI7U0FDSjs7Ozs7Ozs7ZUFNUSxxQkFBRztBQUNSLGdCQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2pHOzs7Ozs7OztlQU1RLHFCQUFHO0FBQ1IsZ0JBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakc7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztlQW9DRyxjQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0FBQzlCLHFCQUFTLDRCQUE0QixDQUFDLENBQUMsRUFBRTtBQUNyQyxvQkFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUMxQyxvQkFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQztBQUN4QixvQkFBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pELHFCQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwQyx3QkFBSSxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQ3RCLGdDQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ3RCLDhCQUFNO3FCQUNUO2lCQUNKO2FBQ0o7O0FBRUQsZ0JBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLDRCQUE0QixFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUV6RSxnQkFBSSxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7QUFDbkMsZ0JBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUN4QyxvQkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUNyQixDQUFDLFFBQVEsQ0FBQyxFQUNWLENBQUMsNEJBQTRCLENBQUMsQ0FDakMsQ0FBQTthQUNKLE1BQU07QUFDSCxvQkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDekMsb0JBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7YUFDaEU7U0FDSjs7O2VBRU8sa0JBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDbEMscUJBQVMsNEJBQTRCLENBQUMsQ0FBQyxFQUFFO0FBQ3JDLG9CQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLG9CQUFJLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0FBQ3hCLG9CQUFJLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakQscUJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BDLHdCQUFJLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDdEIsZ0NBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDdEIsOEJBQU07cUJBQ1Q7aUJBQ0o7YUFDSjs7QUFFRCxnQkFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRXpFLGdCQUFJLEdBQUcsR0FBRyxPQUFPLEdBQUcsR0FBRyxHQUFHLFFBQVEsQ0FBQztBQUNuQyxnQkFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3hDLG9CQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQ3JCLENBQUMsUUFBUSxDQUFDLEVBQ1YsQ0FBQyw0QkFBNEIsQ0FBQyxDQUNqQyxDQUFBO2FBQ0osTUFBTTtBQUNILG9CQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN6QyxvQkFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQzthQUNoRTtTQUNKOzs7Ozs7Ozs7Ozs7ZUFVSyxnQkFBQyxPQUFPLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRTtBQUNoQyxnQkFBSSxHQUFHLEdBQUcsT0FBTyxHQUFHLEdBQUcsR0FBRyxRQUFRLENBQUM7QUFDbkMsZ0JBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLEVBQUU7QUFDdkMsb0JBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELG9CQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNSLHdCQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDckUsd0JBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7OztBQUduRSwyQkFBTyxJQUFJLENBQUM7aUJBQ2Y7YUFDSjs7QUFFRCxtQkFBTyxLQUFLLENBQUE7U0FDZjs7O2VBRVMsb0JBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUU7QUFDcEMsZ0JBQUksR0FBRyxHQUFHLE9BQU8sR0FBRyxHQUFHLEdBQUcsUUFBUSxDQUFDO0FBQ25DLGdCQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZDLG9CQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNwRCxvQkFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7QUFDUix3QkFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLHdCQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDOzs7QUFHbkUsMkJBQU8sSUFBSSxDQUFDO2lCQUNmO2FBQ0o7O0FBRUQsbUJBQU8sS0FBSyxDQUFBO1NBQ2Y7Ozs7Ozs7O2VBTU0sbUJBQUc7QUFDTixnQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztBQUN2QixnQkFBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQzs7QUFFL0IsZ0JBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7OztBQUdyQixnQkFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ2xCLHFCQUFLLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNqRCxxQkFBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEQscUJBQUssQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQy9DLGlCQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDOUU7QUFDRCxrQkFBTSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RELGtCQUFNLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzFDLGtCQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDOzs7QUFHekMsaUJBQUssSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRTtBQUM3QixvQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUN2QyxxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDdEMsd0JBQUksT0FBTyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssVUFBVSxFQUFFO0FBQ25DLDRCQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDM0U7aUJBQ0o7YUFDSjtBQUNELGdCQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQzs7O0FBR3pCLGlCQUFLLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJO0FBQ25CLG9CQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQUEsQUFFckYsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLGdCQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7U0FDNUI7Ozs7Ozs7Ozs7ZUFRQyxZQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFO0FBQ3ZCLGdCQUFJLE9BQU8sQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLE9BQU8sSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUMvRCxrQkFBRSxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQSxBQUFDLEtBQUssSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDO0FBQzdELG9CQUFJLENBQUMsS0FBSyxFQUFFO0FBQ1Isd0JBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUNyQyxNQUFNO0FBQ0gsd0JBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUN4QzthQUNKO1NBQ0o7Ozs7Ozs7Ozs7O2VBU0UsYUFBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQ2pCLGdCQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQzFCLHVCQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQy9DO0FBQ0QsbUJBQU8sQ0FBQyxDQUFDLENBQUM7U0FDYjs7Ozs7Ozs7Ozs7ZUFTRSxhQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUU7QUFDakIsZ0JBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3RDLGdCQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNaLHVCQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEM7U0FDSjs7Ozs7Ozs7OztlQVFHLGNBQUMsU0FBUyxFQUFFO0FBQ1osZ0JBQUksQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztBQUNoRCxnQkFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUMxQixvQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuQyxxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsMkJBQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdEg7YUFDSjtTQUNKOzs7Ozs7OztlQU1JLGlCQUFHO0FBQ0osZ0JBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUNiLGdCQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDaEIsZ0JBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztBQUN0QixnQkFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxRTs7Ozs7Ozs7ZUFNTyxrQkFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO0FBQ3RCLGdCQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDYixnQkFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLElBQUksQ0FBQyxDQUFDO0FBQ2pDLGdCQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztBQUNqQixnQkFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3RCLGdCQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0FBQ3hCLGdCQUFJLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFFOzs7Ozs7OztlQU1RLHFCQUFHOztBQUVSLGdCQUFJLElBQUksQ0FBQyxVQUFVLEVBQUU7QUFDakIsb0JBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztBQUNqRixvQkFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ25GLG9CQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDZixNQUFNO0FBQ0gsb0JBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNwQyxvQkFBSSxDQUFDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3hDO1NBQ0o7Ozs7Ozs7O2VBTUcsZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzlELGdCQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwRjs7Ozs7Ozs7ZUFNSSxpQkFBRztBQUNKLGdCQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakU7Ozs7Ozs7OztlQU9HLGdCQUFHO0FBQ0gsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCOzs7Ozs7Ozs7ZUFPSyxrQkFBRztBQUNMLGdCQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztBQUNyQixnQkFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ2pCOzs7Ozs7Ozs7O2VBUUcsZ0JBQUc7QUFDSCxnQkFBSSxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1osZ0JBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1NBQ3ZCOzs7Ozs7OztlQU1LLGtCQUFHO0FBQ0wsZ0JBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1NBQ3hCOzs7V0FyOUNDLE9BQU87OztBQXk5Q2IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE9BQU8sQ0FBQzs7Ozs7QUMxakQ1QixZQUFZLENBQUM7Ozs7Ozs7Ozs7Ozs7O0lBUVAsU0FBUztjQUFULFNBQVM7O0FBQ0EsYUFEVCxTQUFTLEdBQ1U7OEJBRG5CLFNBQVM7OzBDQUNJLElBQUk7QUFBSixnQkFBSTs7OztBQUVmLG1DQUhGLFNBQVMsOENBR0UsSUFBSSxFQUFFOztBQUVmLFlBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxZQUFXO0FBQ3hDLGdCQUFJLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbEIsZ0JBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ3BCLG9CQUFJLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDbEIsb0JBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNsQixxQkFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN4Qiw0QkFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDNUMsNEJBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUcsbUJBQW1CLENBQUM7QUFDNUMsNEJBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQzVDLDRCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLG1CQUFtQixDQUFDOztBQUU1Qyx3QkFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ1QsZ0NBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDO0FBQ2pDLGdDQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDO3FCQUN4QixNQUFNO0FBQ0gsZ0NBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDO0FBQ2xDLGdDQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztxQkFDdkI7O0FBRUQsNEJBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBVztBQUM3Qyw0QkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDakQsOEJBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztxQkFDM0MsQ0FBQyxDQUFDOztBQUVILDRCQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3JDLDBCQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDakU7YUFDSjtTQUNKLENBQUMsQ0FBQztLQUNOOztXQWxDQyxTQUFTO0dBQVMsT0FBTzs7QUF1Qy9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7OztBQy9DOUIsWUFBWSxDQUFDOzs7Ozs7Ozs7Ozs7OztJQVFQLFNBQVM7Y0FBVCxTQUFTOztBQUNBLGFBRFQsU0FBUyxHQUNVOzBDQUFOLElBQUk7QUFBSixnQkFBSTs7OzhCQURqQixTQUFTOzs7QUFHUCxtQ0FIRixTQUFTLDhDQUdFLElBQUksRUFBRTs7QUFFZixZQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsVUFBUyxJQUFJLEVBQUU7QUFDekMsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQztBQUNsQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7O0FBQ3BCLHdCQUFJLE1BQU0sR0FBRyxDQUFDLFVBQVMsTUFBTSxFQUFFO0FBQzNCLDRCQUFJLE1BQU0sS0FBSyxVQUFVLEVBQUU7QUFDdkIsbUNBQU8sTUFBTSxDQUFDLElBQUksQ0FBQzt5QkFDdEIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUM3RCxtQ0FBTyxNQUFNLENBQUM7eUJBQ2pCO0FBQ0QsK0JBQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7cUJBQ2pDLENBQUEsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsQ0FBQztBQUN0RCx3QkFBSSxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQztBQUN2Qix3QkFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2Qsd0JBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDM0MsMkJBQU8sQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7O0FBRXZDLHdCQUFJLFVBQVUsR0FBRyxTQUFTLFVBQVUsR0FBRztBQUNuQyw0QkFBSSxRQUFRLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDakQsNkJBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xDLGdDQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN2QyxnQ0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7QUFDbEMsZ0NBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ2pDLGdDQUFJLENBQUMsS0FBSyxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ3pCLG9DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUFJLFNBQVMsQ0FBQzs2QkFDbEM7QUFDRCxnQ0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxZQUFXO0FBQ3pCLHNDQUFNLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7NkJBQzVELENBQUM7QUFDRixvQ0FBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDakM7QUFDRCwrQkFBTyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDdkIsK0JBQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ2pDLENBQUM7O0FBRUYsOEJBQVUsRUFBRSxDQUFDOztBQUViLDBCQUFNLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztBQUU1QiwwQkFBTSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEVBQUUsWUFBVztBQUNoQyw0QkFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7QUFDcEIsaUNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ2xDLG9DQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUNsQyxvQ0FBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFVBQVUsRUFBRTtBQUN2Qix3Q0FBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUM7aUNBQ2xDOzZCQUNKO3lCQUNKO3FCQUNKLENBQUMsQ0FBQzs7QUFFSCwwQkFBTSxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBVztBQUMvQiw0QkFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7QUFDakIsNEJBQUksR0FBRyxFQUFFLENBQUM7QUFDVixrQ0FBVSxFQUFFLENBQUM7cUJBQ2hCLENBQUMsQ0FBQzs7YUFDTjtTQUNKLENBQUMsQ0FBQztLQUNOOztXQTdEQyxTQUFTO0dBQVMsT0FBTzs7QUFrRS9CLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxTQUFTLENBQUM7Ozs7QUMxRTlCLFlBQVksQ0FBQzs7Ozs7Ozs7Ozs7OztJQU9QLFNBQVM7Y0FBVCxTQUFTOztBQUNBLGFBRFQsU0FBUyxHQUNVOzBDQUFOLElBQUk7QUFBSixnQkFBSTs7OzhCQURqQixTQUFTOzs7QUFHUCxtQ0FIRixTQUFTLDhDQUdFLElBQUksRUFBRTs7QUFFZixZQUFJLG9CQUFvQixHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDN0MsWUFBSSxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO0FBQ3pDLFlBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQzs7QUFFM0MsWUFBSSxLQUFLLEdBQUksaUJBQWlCLElBQUksTUFBTSxJQUFJLEtBQUssSUFBSSxJQUFJLGVBQWUsRUFBRSxBQUFDLENBQUM7Ozs7OztBQU01RSxZQUFJLFFBQVEsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7QUFNckIsWUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDOztBQUVuQixZQUFJLFlBQVksQ0FBQzs7QUFFakIsWUFBSSxVQUFVLENBQUM7O0FBRWYsWUFBSSxRQUFRLENBQUM7O0FBRWIsWUFBSSxZQUFZLENBQUM7O0FBRWpCLFlBQUksTUFBTSxDQUFDOztBQUVYLFlBQUksTUFBTSxDQUFDOztBQUVYLFlBQUksY0FBYyxDQUFDOztBQUVuQixZQUFJLE9BQU8sQ0FBQzs7QUFFWixZQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7Ozs7Ozs7Ozs7QUFVMUIsaUJBQVMsaUJBQWlCLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFO0FBQ3ZDLG1CQUFPLFdBQVcsSUFBSSxLQUFLLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQSxBQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsS0FBSyxHQUFHLEtBQUssQ0FBQSxBQUFDLEdBQUcsUUFBUSxHQUFHLEtBQUssR0FBRyxHQUFHLENBQUM7U0FDN0g7Ozs7Ozs7O0FBUUQsaUJBQVMsV0FBVyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdkIsZ0JBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNULGFBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDcEIsYUFBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQixtQkFBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ25DOzs7Ozs7OztBQVFELGlCQUFTLHVCQUF1QixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDbkMsbUJBQU8sQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQy9COzs7Ozs7O0FBT0QsaUJBQVMsVUFBVSxDQUFDLE9BQU8sRUFBRTtBQUN6QixtQkFBTyxLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQVMsS0FBSyxFQUFFO0FBQzNELHVCQUFPO0FBQ0gsd0JBQUksRUFBRSxLQUFLLENBQUMsS0FBSztBQUNqQix1QkFBRyxFQUFFLEtBQUssQ0FBQyxLQUFLO2lCQUNuQixDQUFBO2FBQ0osQ0FBQyxDQUFDO1NBQ047Ozs7Ozs7O0FBUUQsaUJBQVMsY0FBYyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUU7QUFDaEMsZ0JBQUksYUFBYSxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDcEQsZ0JBQUksV0FBVyxHQUFHLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDOUMsbUJBQU8sV0FBVyxHQUFHLGFBQWEsQ0FBQztTQUN0Qzs7Ozs7OztBQU9ELGlCQUFTLG9CQUFvQixDQUFDLEdBQUcsRUFBRTtBQUMvQixnQkFBSSxNQUFNLEdBQUc7QUFDVCwwQkFBVSxFQUFFLENBQUM7QUFDYiwwQkFBVSxFQUFFLENBQUM7QUFDYiwwQkFBVSxFQUFFLENBQUM7QUFDYixzQkFBTSxFQUFFLENBQUM7QUFDVCxzQkFBTSxFQUFFLENBQUM7QUFDVCx1QkFBTyxFQUFFLENBQUM7QUFDVix1QkFBTyxFQUFFLENBQUM7YUFDYixDQUFDO0FBQ0YsZ0JBQUksT0FBTyxHQUFHLENBQUM7Z0JBQ1gsT0FBTyxHQUFHLENBQUMsQ0FBQztBQUNoQixnQkFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxPQUFPLE1BQU0sQ0FBQztBQUNwRCxnQkFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztnQkFDcEMsU0FBUztnQkFBRSxNQUFNLENBQUM7QUFDdEIscUJBQVMsR0FBRyxLQUFLLENBQUMsZUFBZSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUM7QUFDeEQsa0JBQU0sR0FBRyxLQUFLLENBQUMscUJBQXFCLElBQUksS0FBSyxDQUFDLGtCQUFrQixDQUFDO0FBQ2pFLGdCQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDMUMsZ0JBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDaEIsdUJBQU8sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLHVCQUFPLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUN4QjtBQUNELGdCQUFJLFNBQVMsSUFBSSxNQUFNLEVBQUUsT0FBTyxNQUFNLENBQUM7QUFDdkMsZ0JBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNsRCxnQkFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0FBQ2hELGdCQUFJLEtBQUssRUFBRTtBQUNQLG9CQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQy9CLHNCQUFNLEdBQUc7QUFDTCw4QkFBVSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0FBQ3ZCLDhCQUFVLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7QUFDdkIsOEJBQVUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQztBQUN2QiwyQkFBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3BCLDJCQUFPLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDcEIsMEJBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQiwwQkFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ2xCLDBCQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUM7aUJBQ3RCLENBQUM7YUFDTCxNQUFNLElBQUksS0FBSyxFQUFFO0FBQ2Qsb0JBQUksR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDL0Isc0JBQU0sR0FBRztBQUNMLDhCQUFVLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUM7QUFDdEIsOEJBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUN0QiwyQkFBTyxFQUFFLE9BQU8sR0FBRyxDQUFDO0FBQ3BCLDJCQUFPLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDcEIsMEJBQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztBQUNsQiwwQkFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO2lCQUNyQixDQUFDO2FBQ0w7QUFDRCxtQkFBTyxNQUFNLENBQUM7U0FDakI7Ozs7Ozs7O0FBUUQsaUJBQVMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDckIsbUJBQU87QUFDSCxpQkFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUksQ0FBQztBQUNsQixpQkFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBLEdBQUksQ0FBQzthQUNyQixDQUFBO1NBQ0o7Ozs7OztBQU1ELGlCQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDcEIsd0JBQVksR0FBRyxDQUFDLENBQUM7QUFDakIsc0JBQVUsR0FBRyxJQUFJLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7U0FDN0M7Ozs7OztBQU1ELGlCQUFTLFlBQVksQ0FBQyxHQUFHLEVBQUU7QUFDdkIsZ0NBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQzs7QUFFckMsZ0JBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDeEQsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsZ0JBQUksTUFBTSxDQUFDLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO0FBQ2xDLDZCQUFhLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLG9CQUFJLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyw0QkFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDN0Msc0JBQU0sR0FBRyxTQUFTLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztBQUNsQyxzQkFBTSxHQUFHLFNBQVMsQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO0FBQ2xDLDRCQUFZLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUNoQyx3QkFBUSxHQUFHLElBQUksQ0FBQztBQUNoQixvQkFBSSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQzVCLG9CQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUMvQixrQ0FBYyxHQUFHLElBQUksQ0FBQztBQUN0Qix3QkFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztBQUMxQix3QkFBSSxXQUFXLEdBQUcsU0FBUyxDQUFDO0FBQ3hCLHlCQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDbkIseUJBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztxQkFDdEIsRUFBRTtBQUNDLHlCQUFDLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7QUFDbkIseUJBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztxQkFDdEIsQ0FBQyxDQUFDO0FBQ0gsd0JBQUksQ0FBQyxLQUFLLENBQUMscUJBQXFCLEdBQUcsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNqSCxNQUFNLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0FBQ3ZDLHdCQUFJLElBQUksR0FBRyxBQUFDLElBQUksSUFBSSxFQUFFLENBQUUsT0FBTyxFQUFFLENBQUM7QUFDbEMsMkJBQU8sR0FBRyxDQUFDLENBQUM7QUFDWix3QkFBSSxJQUFJLEdBQUcsY0FBYyxHQUFHLEdBQUcsRUFBRTtBQUM3QiwyQkFBRyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3JCLCtCQUFPLEdBQUcsQ0FBQyxDQUFDO3FCQUNmO0FBQ0Qsa0NBQWMsR0FBRyxJQUFJLENBQUM7aUJBQ3pCO2FBQ0o7U0FDSjs7Ozs7OztBQU9ELGlCQUFTLFdBQVcsQ0FBQyxHQUFHLEVBQUU7QUFDdEIsZ0JBQUksYUFBYSxFQUFFO0FBQ2Ysb0JBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUNmLG9CQUFJLElBQUksR0FBRyxRQUFRLENBQUM7QUFDcEIsb0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0Isb0JBQUksTUFBTSxDQUFDLFFBQVEsRUFBRTtBQUNqQix3QkFBSSxHQUFHLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7QUFDaEMsNEJBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBQzFDLDJCQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDckIsa0NBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQiw4QkFBTSxHQUFHLENBQUMsQ0FBQztxQkFDZCxNQUFNLElBQUksR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7QUFDM0QsNEJBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsR0FBRyxDQUFDO0FBQzFDLDJCQUFHLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDckIsaUNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLDhCQUFNLEdBQUcsQ0FBQyxDQUFDO3FCQUNkO0FBQ0QsMkJBQU8sR0FBRyxNQUFNLENBQUM7O0FBRWpCLHdCQUFJLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDWiwrQkFBTztxQkFDVjtpQkFDSjthQUNKO0FBQ0QsK0JBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUN2Qzs7Ozs7O0FBTUQsaUJBQVMsZUFBZSxDQUFDLEdBQUcsRUFBRTtBQUMxQixnQkFBSSxVQUFVLEdBQUcsVUFBVSxJQUFJLENBQUMsQ0FBQztBQUNqQyxnQkFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3BCLGdCQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUIsd0JBQVksR0FBRyxZQUFZLElBQUksQ0FBQyxHQUFHLFVBQVUsR0FBRyxDQUFDLENBQUM7QUFDbEQsZ0JBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLFlBQVksQ0FBQyxDQUFDO0FBQ3RFLGdCQUFJLFlBQVksSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyx1QkFBdUIsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0Sjs7Ozs7O0FBTUQsaUJBQVMsVUFBVSxDQUFDLEdBQUcsRUFBRTtBQUNyQixnQkFBSSxVQUFVLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMvQyxnQkFBSSxLQUFLLEdBQUcsY0FBYyxDQUFDLFlBQVksRUFBRSxVQUFVLENBQUMsQ0FBQztBQUNyRCxnQkFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDO0FBQ3BCLGlCQUFLLEdBQUcsWUFBWSxHQUFHLEtBQUssR0FBRyxRQUFRLEdBQUcsUUFBUSxHQUFHLFlBQVksR0FBRyxLQUFLLENBQUM7QUFDMUUsZ0JBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1NBQ2xFOzs7Ozs7QUFNRCxpQkFBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ3JCLGdCQUFJLGFBQWEsRUFBRTtBQUNmLG9CQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixvQkFBSSxPQUFPLEtBQUssQ0FBQyxFQUFFOztBQUNmLDhCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsMEJBQU0sR0FBRyxDQUFDLENBQUM7aUJBQ2QsTUFBTSxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUU7O0FBQ3JCLDhCQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDaEIsMEJBQU0sR0FBRyxDQUFDLENBQUM7aUJBQ2QsTUFBTSxJQUFJLE9BQU8sS0FBSyxDQUFDLEVBQUU7O0FBQ3RCLG1DQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsOEJBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNoQixpQ0FBYSxHQUFHLEtBQUssQ0FBQztpQkFDekI7O0FBRUQsb0JBQUksTUFBTSxHQUFHLENBQUMsRUFBRTtBQUNaLDJCQUFPO2lCQUNWO2FBQ0o7QUFDRCw4QkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDOzs7Ozs7QUFNRCxpQkFBUyxTQUFTLENBQUMsR0FBRyxFQUFFO0FBQ3BCLGdCQUFJLElBQUksR0FBRyxRQUFRLENBQUM7QUFDcEIsZ0JBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUM7QUFDL0IsZ0JBQUksTUFBTSxHQUFHO0FBQ1QsaUJBQUMsRUFBRSxNQUFNLENBQUMsUUFBUSxHQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUssR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxBQUFDO0FBQzNGLGlCQUFDLEVBQUUsTUFBTSxDQUFDLFFBQVEsR0FBSSxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxHQUFLLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQUFBQzthQUM5RixDQUFDO0FBQ0YsZ0JBQUksVUFBVSxHQUFHO0FBQ2IsaUJBQUMsRUFBRSxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDO0FBQ3hCLGlCQUFDLEVBQUUsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQzthQUMzQixDQUFDO0FBQ0YsZ0JBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDL0Y7Ozs7Ozs7QUFPRCxpQkFBUyxXQUFXLENBQUMsT0FBTyxFQUFFO0FBQzFCLGdCQUFJLEdBQUcsR0FBRztBQUNOLHNCQUFNLEVBQUUsQ0FBQztBQUNULHFCQUFLLEVBQUUsQ0FBQzthQUNYLENBQUM7QUFDRixlQUFHO0FBQ0MsbUJBQUcsQ0FBQyxHQUFHLElBQUksT0FBTyxDQUFDLFNBQVMsSUFBSSxDQUFDLENBQUM7QUFDbEMsbUJBQUcsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7QUFDcEMsdUJBQU8sR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ2xDLFFBQ00sT0FBTyxFQUFFO0FBQ2hCLG1CQUFPLEdBQUcsQ0FBQztTQUNkOzs7Ozs7Ozs7QUFTRCxpQkFBUyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRTtBQUN4QyxnQkFBSSxHQUFHLEVBQUUsR0FBRyxDQUFDO0FBQ2IsZ0JBQUksR0FBRyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUM1QixxQkFBUyxHQUFHO0FBQ1IscUJBQUssRUFBRTtBQUNILHdCQUFJLEVBQUUsR0FBRyxDQUFDLElBQUk7QUFDZCx1QkFBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHO2lCQUNmO0FBQ0QsbUJBQUcsRUFBRTtBQUNELHdCQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVztBQUNqQyx1QkFBRyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFlBQVk7aUJBQ25DO2FBQ0osQ0FBQztBQUNGLGdCQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLE1BQU0sR0FBRyxLQUFLLENBQUM7QUFDcEMsZUFBRyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsZUFBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDekIsbUJBQVEsS0FBSyxJQUFJLEdBQUcsSUFBSSxLQUFLLElBQUksR0FBRyxDQUFFO1NBQ3pDOzs7Ozs7OztBQVFELGlCQUFTLFFBQVEsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQzFCLGdCQUFJLE1BQU0sR0FBRyxDQUFDLENBQUM7QUFDZixnQkFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3hELGdCQUFJLE1BQU0sR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDdEQsZ0JBQUksTUFBTSxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN2RCxnQkFBSSxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3JELGdCQUFJLEFBQUMsTUFBTSxJQUFJLE1BQU0sSUFBTSxNQUFNLElBQUksTUFBTSxBQUFDLEVBQUU7QUFDMUMsb0JBQUksTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUNsQiwwQkFBTSxHQUFHLENBQUMsQ0FBQztpQkFDZCxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUN6QiwwQkFBTSxHQUFHLENBQUMsQ0FBQztpQkFDZCxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUN6QiwwQkFBTSxHQUFHLENBQUMsQ0FBQztpQkFDZCxNQUFNO0FBQ0gsMEJBQU0sR0FBRyxDQUFDLENBQUM7aUJBQ2Q7YUFDSixNQUFNLElBQUssTUFBTSxJQUFJLE1BQU0sRUFBRztBQUMzQixvQkFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQUU7QUFDbkIsMEJBQU0sR0FBRyxDQUFDLENBQUM7aUJBQ2QsTUFBTSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUMxQiwwQkFBTSxHQUFHLENBQUMsQ0FBQztpQkFDZDthQUVKLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxFQUFFO0FBQ3pCLG9CQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUNuQiwwQkFBTSxHQUFHLENBQUMsQ0FBQztpQkFDZCxNQUFNLElBQUksTUFBTSxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQzFCLDBCQUFNLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO2FBQ0osTUFBTSxJQUFJLE1BQU0sSUFBSSxNQUFNLElBQUksTUFBTSxJQUFJLE1BQU0sRUFBRTtBQUM3QyxzQkFBTSxHQUFHLENBQUMsQ0FBQzthQUNkO0FBQ0QsbUJBQU8sTUFBTSxDQUFDO1NBQ2pCOzs7Ozs7QUFNRCxpQkFBUyxVQUFVLENBQUMsR0FBRyxFQUFFO0FBQ3JCLGdCQUFJLFlBQVksSUFBSSxDQUFDLEVBQUUsT0FBTztBQUM5QixnQkFBSSxJQUFJLEdBQUcsUUFBUTtnQkFDZixJQUFJO2dCQUFFLEdBQUc7Z0JBQUUsS0FBSztnQkFBRSxDQUFDO2dCQUFFLENBQUM7Z0JBQUUsR0FBRztnQkFBRSxLQUFLO2dCQUFFLEdBQUc7Z0JBQUUsTUFBTTtnQkFBRSxPQUFPLENBQUM7QUFDN0QsaUJBQUssR0FBRyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxrQkFBTSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7QUFDekIsYUFBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztBQUNwQyxhQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDO0FBQ3JDLGVBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsaUJBQUssR0FBRztBQUNKLG9CQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQSxHQUFJLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsVUFBVTtBQUN0RSxtQkFBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUEsR0FBSSxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLFVBQVU7YUFDdkUsQ0FBQztBQUNGLGVBQUcsR0FBRztBQUNGLG9CQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDO0FBQ3BCLG1CQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ3JCLENBQUM7QUFDRixnQkFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDbEIsZUFBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUM7O0FBRWhCLG1CQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRTtBQUN2QixxQkFBSyxFQUFFLEtBQUs7QUFDWixtQkFBRyxFQUFFLEdBQUc7YUFDWCxDQUFDLENBQUM7QUFDSCxvQkFBUSxPQUFPO0FBQ1gscUJBQUssQ0FBQztBQUNGLHdCQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDNUIsdUJBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFDNUIsMEJBQU07QUFBQSxBQUNWLHFCQUFLLENBQUM7QUFDRix3QkFBSSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO0FBQzVCLHVCQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDMUIsMEJBQU07QUFBQSxBQUNWLHFCQUFLLENBQUM7QUFDRix3QkFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM5Qix1QkFBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssQ0FBQztBQUNGLHdCQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLHVCQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDMUIsMEJBQU07QUFBQSxBQUNWLHFCQUFLLENBQUM7QUFDRix1QkFBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUM1QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssQ0FBQztBQUNGLHVCQUFHLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDMUIsMEJBQU07QUFBQSxBQUNWLHFCQUFLLENBQUM7QUFDRix3QkFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztBQUM5QiwwQkFBTTtBQUFBLEFBQ1YscUJBQUssQ0FBQztBQUNGLHdCQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDNUIsMEJBQU07QUFBQSxhQUNiO0FBQ0QsZ0JBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLEVBQUU7QUFDeEIsb0JBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQzthQUMvRDtBQUNELGdCQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3pCLG1CQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLENBQUM7YUFDOUQ7QUFDRCxnQkFBSSxDQUFDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxPQUFPLENBQUM7QUFDOUMsZ0JBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBRTdJOztBQUVELFlBQUksQ0FBQyxNQUFNLENBQUM7QUFDUix3QkFBWSxFQUFFLFlBQVk7QUFDMUIsdUJBQVcsRUFBRSxXQUFXO0FBQ3hCLHNCQUFVLEVBQUUsVUFBVTtTQUN6QixDQUFDLENBQUM7O0FBRUgsWUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7S0FDdkM7O1dBcGVDLFNBQVM7R0FBUyxPQUFPOztBQXVlL0IsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgJy4uLy4uLy4uL3NyYy9pc2xpZGVyLmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL3BsdWdpbnMvaXNsaWRlcl9idXR0b24uanMnO1xuaW1wb3J0ICcuLi8uLi8uLi9zcmMvcGx1Z2lucy9pc2xpZGVyX2RvdC5qcyc7XG5pbXBvcnQgJy4uLy4uLy4uL3NyYy9wbHVnaW5zL2lzbGlkZXJfem9vbXBpYy5qcyc7XG5cbmxldCBsaXN0ID0gW3tcbiAgICAnY29udGVudCc6ICc8ZGl2IGNsYXNzPVwiY29udGVudCBob21lXCI+PGgxPkhvbWU8L2gxPjxoMj5UaGlzIGlzIGhvbWUgcGFnZTwvaDI+PHA+aG9tZSBpcyBwcmV0dHkgYXdzb21lPC9wPjxkaXY+J1xufSxcbiAgICB7XG4gICAgICAgICdjb250ZW50JzogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2UxXCI+PGgxPlBhZ2UxPC9oMT48aDI+VGhpcyBpcyBwYWdlMTwvaDI+PHA+cGFnZTEgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnOiAnPGRpdiBjbGFzcz1cImNvbnRlbnQgcGFnZTJcIj48aDE+UGFnZTI8L2gxPjxoMj5UaGlzIGlzIFBhZ2UyPC9oMj48cD5QYWdlMiBpcyBwcmV0dHkgYXdzb21lPC9wPjxkaXY+J1xuICAgIH0sXG4gICAge1xuICAgICAgICAnY29udGVudCc6ICc8ZGl2IGNsYXNzPVwiY29udGVudCBwYWdlM1wiPjxoMT5QYWdlMzwvaDE+PGgyPlRoaXMgaXMgUGFnZTM8L2gyPjxwPlBhZ2UzIGlzIHByZXR0eSBhd3NvbWU8L3A+PGRpdj4nXG4gICAgfSxcbiAgICB7XG4gICAgICAgICdjb250ZW50JzogJzxkaXYgY2xhc3M9XCJjb250ZW50IHBhZ2U0XCI+PGgxPlBhZ2U0PC9oMT48aDI+VGhpcyBpcyBQYWdlNDwvaDI+PHA+UGFnZTQgaXMgcHJldHR5IGF3c29tZTwvcD48ZGl2PidcbiAgICB9LFxuICAgIHtcbiAgICAgICAgJ2NvbnRlbnQnOiAnPGRpdiBjbGFzcz1cImNvbnRlbnQgcGFnZTVcIj48aDE+UGFnZTU8L2gxPjxoMj5UaGlzIGlzIHBhZ2U1PC9oMj48cD5wYWdlNSBpcyBwcmV0dHkgYXdzb21lPC9wPjxkaXY+J1xuICAgIH1dO1xuXG5sZXQgb3B0cyA9IHtcbiAgICBkYXRhOiBsaXN0LFxuICAgIHR5cGU6ICdkb20nLFxuICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpU2xpZGVyLXdyYXBwZXJcIiksXG4gICAgZHVyYXRpb246IDEwMDAsXG4gICAgcGx1Z2luczogWydidXR0b24nLFsnem9vbXBpYycsIHtjdXJyZW50U2NhbGU6MSx6b29tRmFjdG9yOiAyfV1dXG59O1xuXG5sZXQgaXNsaWRlciA9IG5ldyBpU2xpZGVyKG9wdHMpO1xuXG5cblxuIiwiLypcbiAqIEBmaWxlICAgQW5pbWF0aW9uIExpYnJhcnlcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbi8qICDor7TmmI7vvJpcbi8vZG9tIOihqOekuuWKqOeUu+eahOWFg+e0oOiKgueCuVxuLy9heGlzIOihqOekuuWKqOeUu+aWueWQke+8jOWIhuWIq+S4uiBYIOWSjCBZIOaWueWQkVxuLy9zY2FsZSDlsY/luZXpq5jluqZcbi8vaSA9PSAwIOihqOekuiBpc2xpZGVyLXByZXYsIGkgPT0gMSDooajnpLogaXNsaWRlci1hY3RpdmUsIGkgPT0gMiDooajnpLogaXNsaWRlci1uZXh0LFxuLy9vZmZzZXQgPiAwIOihqOekuueahOaYr+WQkeS4iuaIluWQkeWPs+eahOa7keWKqOaWueWQke+8jG9mZnNldCA8IDAg6KGo56S655qE5piv5ZCR5LiL5oiW5ZCR5bem55qE5ruR5Yqo5pa55ZCRLm9mZnNldCDnmoTlgLzooajnpLrmiYvmjIflnKjlsY/luZXkuIrmu5HliqjnmoTot53nprvvvIznu53lr7nlgLzotorlpKfooajnpLrmu5HliqjnmoTot53nprvotorplb/jgIJcbi8vb3Bwb3NpdGUg5Yik5pat5piv5ZCm5Zyo5omn6KGMIOWQkeS4i+aIluWQkeW3pueahOmAhuaWueWQkea7keWKqFxuKiAqL1xuXG4vL2ltcG9ydCBpU2xpZGVyIGZyb20gJy4uL2lzbGlkZXJfY29yZS5qcyc7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICAncm90YXRlJzogZnVuY3Rpb24oZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IGJkQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLndyYXAucGFyZW50Tm9kZSwgbnVsbCkuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsgJyArICdiYWNrZ3JvdW5kLWNvbG9yOicgKyBiZENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7JztcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkgKyAnZGVnKSB0cmFuc2xhdGVaKCcgKyAoMC44ODggKiBzY2FsZSAvIDIpICsgJ3B4KSBzY2FsZSgwLjg4OCknO1xuICAgIH0sXG5cbiAgICAnZmxpcCc6IGZ1bmN0aW9uKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIGxldCBiZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy53cmFwLnBhcmVudE5vZGUsIG51bGwpLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAncG9zaXRpb246YWJzb2x1dGU7IC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47IGJhY2tncm91bmQtY29sb3I6JyArIGJkQ29sb3IgKyAnOyc7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWignICsgKHNjYWxlIC8gMikgKyAncHgpIHJvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyAxODAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkgKyAnZGVnKSBzY2FsZSgwLjg3NSknO1xuICAgIH0sXG5cbiAgICAnZGVwdGgnOiBmdW5jdGlvbihkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgbGV0IHpvb21TY2FsZSA9ICg0IC0gTWF0aC5hYnMoaSAtIDEpKSAqIDAuMTg7XG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcbiAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpID09PSAxKSA/IDEwMCA6IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgOiAoaSAtIDEpO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyAxLjMgKiBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfSxcblxuICAgICdmbG93JzogZnVuY3Rpb24oZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgbGV0IGRpcmVjdEFtZW5kID0gKGF4aXMgPT09ICdYJykgPyAxIDogLTE7XG4gICAgICAgIGxldCBvZmZzZXRSYXRpbyA9IE1hdGguYWJzKG9mZnNldCAvIHNjYWxlKTtcblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoMC43LCAwLjcpIHRyYW5zbGF0ZVooJyArIChvZmZzZXRSYXRpbyAqIDE1MCAtIDE1MCkgKiBNYXRoLmFicyhpIC0gMSkgKyAncHgpJyArICd0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KScgKyAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArIGRpcmVjdEFtZW5kICogKDMwIC0gb2Zmc2V0UmF0aW8gKiAzMCkgKiAoMSAtIGkpICsgJ2RlZyknO1xuICAgIH0sXG5cbiAgICAnY2FyZCc6IGZ1bmN0aW9uKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDAgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRvbS5jdXIgJiYgZG9tLmN1ciAhPT0gaSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gbnVsbDtcbiAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgem9vbVNjYWxlID0gKGRvbS5jdXIpID8gMSAtIDAuMiAqIE1hdGguYWJzKGkgLSAxKSAtIE1hdGguYWJzKDAuMiAqIG9mZnNldCAvIHNjYWxlKS50b0ZpeGVkKDYpIDogMTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAoKDEgKyBNYXRoLmFicyhpIC0gMSkgKiAwLjIpICogb2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH0sXG5cbiAgICAnZmFkZSc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSBvZmZzZXQgLyBzY2FsZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+aZleafk+aJqeaVo1xuICAgICd5cmtzJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGRvbS5jdXIgPSAyO1xuXG4gICAgICAgIC8v5q2j5ZCRXG4gICAgICAgIGZ1bmN0aW9uIGZvcndhcmQoKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAxICsgKG9mZnNldCAvIHNjYWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAtb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+WPjeWQkVxuICAgICAgICBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wcG9zaXRlKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1ciA9PT0gMSkgPyAxIDogMjtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCknO1xuICAgIH0sXG5cbiAgICAvL+S4reW/g+aUvuWkp1xuICAgICd6eGZkJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGRvbS5jdXIgPSAwLjE7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y+N5ZCRXG4gICAgICAgIGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3Bwb3NpdGUpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1ciA9PT0gMSkgPyAxIDogMC4xO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSc7XG4gICAgfSxcblxuICAgIC8v5riQ6ZqQ5raI5aSxXG4gICAgJ2p5eHMnOiBmdW5jdGlvbiBmYWRlKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gLW9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsgLy/mraPopoHooqvmmL7npLrnmoTpobXpnaJcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgKyAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wcG9zaXRlKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoMHB4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKDBweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+W5s+a7keenu+WHulxuICAgICdwaHljJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+WPjeWQkVxuICAgICAgICBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkgeyAvL+ato+imgeiiq+aYvuekuueahOmhtemdolxuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgIGlmIChpIDwgMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3Bwb3NpdGUpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKDBweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/kuIrkuIvmu5HliqhcbiAgICAnc3hoZCc6IGZ1bmN0aW9uKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwIDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb20uY3VyICYmIGRvbS5jdXIgIT09IGkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IG51bGw7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHpvb21TY2FsZSA9IChkb20uY3VyKSA/IDEgLSAwLjggKiBNYXRoLmFicyhpIC0gMSkgLSBNYXRoLmFicygwLjggKiBvZmZzZXQgLyBzY2FsZSkudG9GaXhlZCg2KSA6IDE7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKCgxICsgTWF0aC5hYnMoaSAtIDEpICogMC4yKSAqIG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9LFxuXG4gICAgLy/ljaHniYfnv7vpobVcbiAgICAna3BmeSc6IGZ1bmN0aW9uKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCwgZGlyZWN0aW9uLCBmb3J3YXJkTW9yZUNzc1RleHQsIHJldmVyc2VNb3JlQ3NzVGV4dDtcbiAgICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgICAgICAgICAgcm90YXRlRGlyZWN0ID0gJ1knO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgIGZvcndhcmRNb3JlQ3NzVGV4dCA9ICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IDUwJSAwcHg7JztcbiAgICAgICAgICAgIHJldmVyc2VNb3JlQ3NzVGV4dCA9ICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGxlZnQgNTAlIDBweDsnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm90YXRlRGlyZWN0ID0gJ1gnO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgICBmb3J3YXJkTW9yZUNzc1RleHQgPSAnLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgYm90dG9tIDBweDsnO1xuICAgICAgICAgICAgcmV2ZXJzZU1vcmVDc3NUZXh0ID0gJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogNTAlIHRvcCAwcHg7JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOy13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOyAnICsgJyBwb3NpdGlvbjphYnNvbHV0ZTsnICsgZm9yd2FyZE1vcmVDc3NUZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsgLy/mraPopoHooqvmmL7npLrnmoTpobXpnaJcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsgJyArICcgcG9zaXRpb246YWJzb2x1dGU7JyArIHJldmVyc2VNb3JlQ3NzVGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyAoZGlyZWN0aW9uICogOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wcG9zaXRlKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygwZGVnKSAnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgKGRpcmVjdGlvbiAqIDkwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpKSArICdkZWcpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyAoZGlyZWN0aW9uICogOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoMGRlZykgJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufSIsIi8qKlxuICogQSBzaW1wbGUsIGVmZmljZW50IG1vYmlsZSBzbGlkZXIgc29sdXRpb25cbiAqIEBmaWxlIGlTbGlkZXIuanNcblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7T2JqZWN0fSAgICAgIG9wdHMgICAgICAgICAgICAgICAg5Y+C5pWw6ZuGXG4gKiBAcGFyYW0ge0VsZW1lbnR9ICAgICBvcHRzLmRvbSAgICAgICAgICAgIOWkluWxguWFg+e0oCAgICAgICAgT3V0ZXIgd3JhcHBlclxuICogQHBhcmFtIHtPYmplY3R9ICAgICAgb3B0cy5kYXRhICAgICAgICAgICDmlbDmja7liJfooaggICAgICAgIENvbnRlbnQgZGF0YVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpc2xpZGVyQW5pbWF0ZSBmcm9tICcuL2V4dC9pc2xpZGVyX2FuaW1hdGUuanMnO1xuXG4vKipcbiAqIENoZWNrIGluIGFycmF5XG4gKiBAcGFyYW0gb0VsZW1lbnRcbiAqIEBwYXJhbSBhU291cmNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaW5BcnJheShvRWxlbWVudCwgYVNvdXJjZSkge1xuICAgIHJldHVybiBhU291cmNlLmluZGV4T2Yob0VsZW1lbnQpID4gLTE7XG59O1xuXG4vKipcbiAqIENoZWNrIGlzIGFycmF5XG4gKiBAcGFyYW0gb1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkobykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG4vKipcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjbHNcbiAqIEByZXR1cm5zIHtBcnJheXx7aW5kZXg6IG51bWJlciwgaW5wdXQ6IHN0cmluZ319XG4gKi9cbmZ1bmN0aW9uIGhhc0NsYXNzKG9iaiwgY2xzKSB7XG4gICAgcmV0dXJuIG9iai5jbGFzc05hbWUubWF0Y2gobmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNscyArICcoXFxcXHN8JCknKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGNsc1xuICovXG5mdW5jdGlvbiBhZGRDbGFzcyhvYmosIGNscykge1xuICAgIGlmICghaGFzQ2xhc3Mob2JqLCBjbHMpKSB7XG4gICAgICAgIG9iai5jbGFzc05hbWUgKz0gJyAnICsgY2xzO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY2xzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKG9iaiwgY2xzKSB7XG4gICAgaWYgKGhhc0NsYXNzKG9iaiwgY2xzKSkge1xuICAgICAgICBvYmouY2xhc3NOYW1lID0gb2JqLmNsYXNzTmFtZS5yZXBsYWNlKFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNscyArICcoXFxcXHN8JCknKSwgJycpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDaGVjY2sgaXMgdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNVcmwodXJsKSB7XG4gICAgaWYgKC88XFwvP1tePl0qPi9nLnRlc3QodXJsKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgbGV0IHJlZ2V4ID0gJ14nICtcbiAgICAgICAgJygoKGh0dHBzfGh0dHB8ZnRwfHJ0c3B8bW1zKTopPy8vKT8nICtcbiAgICAgICAgJygoWzAtOWEtel8hfipcXCcoKS4mPSskJS1dKzogKT9bMC05YS16XyF+KlxcJygpLiY9KyQlLV0rQCk/JyArXG4gICAgICAgICcoKFswLTldezEsM30uKXszfVswLTldezEsM318KFswLTlhLXpfIX4qXFwnKCktXSsuKSooWzAtOWEtel1bMC05YS16LV17MCw2MX0pP1swLTlhLXpdLlthLXpdezIsNn0pPycgK1xuICAgICAgICAnKDpbMC05XXsxLDR9KT8nICtcbiAgICAgICAgJyhbXlxcPyNdKyk/JyArXG4gICAgICAgICcoXFxcXFxcP1teI10rKT8nICtcbiAgICAgICAgJygjLispPycgK1xuICAgICAgICAnJCc7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgpLnRlc3QodXJsKTtcbn1cblxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIGlTbGljZXIoW1t7RWxlbWVudH0gY29udGFpbmVyLF0ge0FycmF5fSBkYXRhbGlzdCxdIHtvYmplY3R9IG9wdGlvbnMpXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGFsaXN0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogIG9wdGlvbnMuZG9tID4gY29udGFpbmVyXG4gKiAgb3B0aW9ucy5kYXRhID4gZGF0YWxpc3RcbiAqL1xuY2xhc3MgaVNsaWRlciB7XG4gICAgLy9FUzbkuK3mlrDlnovmnoTpgKDlmahcbiAgICBjb25zdHJ1Y3RvcigpIHtcblxuICAgICAgICBsZXQgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgMyk7XG5cbiAgICAgICAgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQYXJhbWV0ZXJzIHJlcXVpcmVkIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG9wdHMgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJncy5zbGljZSgtMSlbMF0pID09PSAnW29iamVjdCBPYmplY3RdJyA/IGFyZ3MucG9wKCkgOiB7fTtcblxuICAgICAgICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgb3B0cy5kYXRhID0gb3B0cy5kYXRhIHx8IGFyZ3NbMV07XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgb3B0cy5kb20gPSBvcHRzLmRvbSB8fCBhcmdzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRzLmRvbSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgY2FuIG5vdCBiZSBlbXB0eSEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0cy5kYXRhIHx8ICFvcHRzLmRhdGEubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgbXVzdCBiZSBhbiBhcnJheSBhbmQgbXVzdCBoYXZlIG1vcmUgdGhhbiBvbmUgZWxlbWVudCEnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBPcHRpb25zXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9vcHRzID0gb3B0cztcblxuICAgICAgICAvKipcbiAgICAgICAgICogbGlzdGVuZXJcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fTFNOID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEV2ZW50IGhhbmRsZVxuICAgICAgICAgKiBAdHlwZSB7e319XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9FdmVudEhhbmRsZSA9IHt9O1xuXG4gICAgICAgIG9wdHMgPSBhcmdzID0gbnVsbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRXZlbnQgd2hpdGUgbGlzdFxuICAgICAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuRVZFTlRTID0gJ2luaXRpYWxpemUgc2xpZGUgc2xpZGVTdGFydCBzbGlkZUVuZCBzbGlkZUNoYW5nZSBzbGlkZUNoYW5nZWQgc2xpZGVSZXN0b3JlIHNsaWRlUmVzdG9yZWQgcmVsb2FkRGF0YSBkZXN0cm95Jy5zcGxpdCgnICcpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFYXNpbmcgd2hpdGUgbGlzdFxuICAgICAgICAgKiBAdHlwZSBbQXJyYXksIFJlZ0V4cFtdXVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkVBU0lORyA9IFtcbiAgICAgICAgICAgICdsaW5lYXIgZWFzZSBlYXNlLWluIGVhc2Utb3V0IGVhc2UtaW4tb3V0Jy5zcGxpdCgnICcpLFxuICAgICAgICAgICAgL2N1YmljLWJlemllclxcKChbXlxcZF0qKFxcZCsuP1xcZCopW15cXCxdKlxcLD8pezR9XFwpL1xuICAgICAgICBdO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUQUdTIHdoaXRlbGlzdCBvbiBmaXhwYWdlIG1vZGVcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLkZJWF9QQUdFX1RBR1MgPSAnU0VMRUNUIElOUFVUIFRFWFRBUkVBIEJVVFRPTiBMQUJFTCcuc3BsaXQoJyAnKTtcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQbHVnaW5zXG4gICAgICAgICAqIEB0eXBlIHt7fX1cbiAgICAgICAgICogQHByb3RlY3RlZFxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5wbHVnaW5zID0ge307XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFuaW1hdGlvbiBwYXJtYXM6XG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7RWxlbWVudH0gICAgICBkb20gICAgICAgICAgICAg5Zu+54mH55qE5aSW5bGCPGxpPuWuueWZqCAgICAgICBJbWcgd3JhcHBlclxuICAgICAgICAgKiBAcGFyYW0ge1N0cmluZ30gICAgICAgYXhpcyAgICAgICAgICAgIOWKqOeUu+aWueWQkSAgICAgICAgICAgICAgICBhbmltYXRlIGRpcmVjdGlvblxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gICAgICAgc2NhbGUgICAgICAgICAgIOWuueWZqOWuveW6piAgICAgICAgICAgICAgICBPdXRlciB3cmFwcGVyXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSAgICAgICBpICAgICAgICAgICAgICAgPGxpPuWuueWZqGluZGV4ICAgICAgICAgIEltZyB3cmFwcGVyJ3MgaW5kZXhcbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9ICAgICAgIG9mZnNldCAgICAgICAgICDmu5Hliqjot53nprsgICAgICAgICAgICAgICAgbW92ZSBkaXN0YW5jZVxuICAgICAgICAgKiBAcHJvdGVjdGVkXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9hbmltYXRlRnVuY3MgPSB7XG4gICAgICAgICAgICAnZGVmYXVsdCc6IGZ1bmN0aW9uKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc29sZS5sb2coaXNsaWRlckFuaW1hdGUpXG5cbiAgICAgICAgLy8g5omp5bGV5Yqo55S7XG4gICAgICAgIHRoaXMuZXh0ZW5kKHRoaXMuX2FuaW1hdGVGdW5jcywgaXNsaWRlckFuaW1hdGUpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2FuaW1hdGVGdW5jcylcblxuICAgICAgICB0aGlzLl90cmFuc2l0aW9uRW5kRXZlbnQoKTtcbiAgICAgICAgdGhpcy5fc2V0dGluZygpO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnaW5pdGlhbGl6ZScpO1xuICAgICAgICB0aGlzLl9yZW5kZXJXcmFwcGVyKCk7XG4gICAgICAgIHRoaXMuX2luaXRQbHVnaW5zKCk7XG4gICAgICAgIHRoaXMuX2JpbmRIYW5kbGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGVtcHR5IGZ1bmN0aW9uXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBFTVBUWV9GVU5DVElPTigpIHtcblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dGVuZFxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBleHRlbmQoKSB7XG4gICAgICAgIGxldCBtYWluLCBleHRlbmQsIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICBtYWluID0gdGhpcztcbiAgICAgICAgICAgICAgICBleHRlbmQgPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG1haW4gPSBhcmdzWzBdO1xuICAgICAgICAgICAgICAgIGV4dGVuZCA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBwcm9wZXJ0eSBpbiBleHRlbmQpIHtcbiAgICAgICAgICAgIGlmIChleHRlbmQuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgbWFpbltwcm9wZXJ0eV0gPSBleHRlbmRbcHJvcGVydHldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIG5hbWVcbiAgICAgKiBAcGFyYW0gcGx1Z2luXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHJlZ1BsdWdpbihuYW1lLCBwbHVnaW4pIHtcbiAgICAgICAgdGhpcy5wbHVnaW5zW25hbWVdID0gdGhpcy5wbHVnaW5zW25hbWVdIHx8IHBsdWdpbjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJucyB7c3RyaW5nfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3RyYW5zaXRpb25FbmRFdmVudCgpIHtcbiAgICAgICAgbGV0IGV2dE5hbWU7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChldnROYW1lKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGV2dE5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdmYWtlRWxlbWVudCcpO1xuICAgICAgICAgICAgbGV0IHRyYW5zaXRpb25zID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgICAgICBPVHJhbnNpdGlvbjogJ29UcmFuc2l0aW9uRW5kJyxcbiAgICAgICAgICAgICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgdCBpbiB0cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgICAgIGlmICh0cmFuc2l0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZXZ0TmFtZSA9IHRyYW5zaXRpb25zW3RdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIHNldHRpbmcgcGFyYW1ldGVycyBmb3Igc2xpZGVyXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfc2V0dGluZygpIHtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIHBsdWdpbnNcbiAgICAgICAgICogQHR5cGUge0FycmF5fHt9fCp9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLl9wbHVnaW5zID0gdGhpcy5wbHVnaW5zO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAdHlwZSB7e2RlZmF1bHQ6IEZ1bmN0aW9ufXwqfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmNzID0gdGhpcy5fYW5pbWF0ZUZ1bmNzO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuaG9sZGluZyA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubG9ja2luZyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0gU2V0IG9wdGlvbnNcbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgICAgICBsZXQgb3B0cyA9IHRoaXMuX29wdHM7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRvbSBlbGVtZW50IHdyYXBwaW5nIGNvbnRlbnRcbiAgICAgICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMud3JhcCA9IG9wdHMuZG9tO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEYXRhIGxpc3RcbiAgICAgICAgICogQHR5cGUge0FycmF5fVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRhdGEgPSBvcHRzLmRhdGE7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGRlZmF1bHQgc2xpZGUgZGlyZWN0aW9uXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzVmVydGljYWwgPSAhIW9wdHMuaXNWZXJ0aWNhbDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogT3ZlcnNwcmVhZCBtb2RlXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzT3ZlcnNwcmVhZCA9ICEhb3B0cy5pc092ZXJzcHJlYWQ7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBsYXkgdGltZSBnYXBcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5kdXJhdGlvbiA9IG9wdHMuZHVyYXRpb24gfHwgMjAwMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc3RhcnQgZnJvbSBpbml0SW5kZXggb3IgMFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluaXRJbmRleCA9IG9wdHMuaW5pdEluZGV4ID4gMCAmJiBvcHRzLmluaXRJbmRleCA8IG9wdHMuZGF0YS5sZW5ndGggLSAxID8gb3B0cy5pbml0SW5kZXggOiAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiB0b3VjaHN0YXJ0IHByZXZlbnQgZGVmYXVsdCB0byBmaXhQYWdlXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHVibGljXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmZpeFBhZ2UgPSBvcHRzLmZpeFBhZ2UgPT0gbnVsbCA/IHRydWUgOiAhIW9wdHMuZml4UGFnZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogc2xpZGVJbmRleFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4IHx8IHRoaXMuaW5pdEluZGV4IHx8IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEF4aXNcbiAgICAgICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5heGlzID0gdGhpcy5pc1ZlcnRpY2FsID8gJ1knIDogJ1gnO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiByZXZlcnNlQXhpc1xuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZXZlcnNlQXhpcyA9IHRoaXMuYXhpcyA9PT0gJ1knID8gJ1gnIDogJ1knO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcGVyIHdpZHRoXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLndpZHRoID0gdGhpcy53cmFwLmNsaWVudFdpZHRoO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBXcmFwcGVyIGhlaWdodFxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5oZWlnaHQgPSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0O1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSYXRpbyBoZWlnaHQ6d2lkdGhcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucmF0aW8gPSB0aGlzLmhlaWdodCAvIHRoaXMud2lkdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNjYWxlLCBzaXplIHJ1bGVcbiAgICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuc2NhbGUgPSB0aGlzLmlzVmVydGljYWwgPyB0aGlzLmhlaWdodCA6IHRoaXMud2lkdGg7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE9uIHNsaWRlIG9mZnNldCBwb3NpdGlvblxuICAgICAgICAgKiBAdHlwZSB7e1g6IG51bWJlciwgWTogbnVtYmVyfX1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub2Zmc2V0ID0gdGhpcy5vZmZzZXQgfHwge1xuICAgICAgICAgICAgWDogMCxcbiAgICAgICAgICAgIFk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW5hYmxlL2Rpc2FibGUgdG91Y2ggZXZlbnRzXG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc1RvdWNoYWJsZSA9IG9wdHMuaXNUb3VjaGFibGUgPT0gbnVsbCA/IHRydWUgOiAhIW9wdHMuaXNUb3VjaGFibGU7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGxvb3BpbmcgbG9naWMgYWRqdXN0XG4gICAgICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5pc0xvb3BpbmcgPSBvcHRzLmlzTG9vcGluZyAmJiB0aGlzLmRhdGEubGVuZ3RoID4gMSA/IHRydWUgOiBmYWxzZTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQXV0b1BsYXkgd2FpdHRpbmcgbWlsc2Vjb25kIHRvIHN0YXJ0XG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRlbGF5ID0gb3B0cy5kZWxheSB8fCAwO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBhdXRvcGxheSBsb2dpYyBhZGp1c3RcbiAgICAgICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlzQXV0b3BsYXkgPSBvcHRzLmlzQXV0b3BsYXkgJiYgdGhpcy5kYXRhLmxlbmd0aCA+IDEgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFuaW1hdGUgdHlwZVxuICAgICAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgY29uc29sZS5sb2cob3B0cy5hbmltYXRlVHlwZSlcbiAgICAgICAgY29uc29sZS5sb2cob3B0cy5hbmltYXRlVHlwZSBpbiB0aGlzLl9hbmltYXRlRnVuY3MpXG4gICAgICAgIHRoaXMuYW5pbWF0ZVR5cGUgPSBvcHRzLmFuaW1hdGVUeXBlIGluIHRoaXMuX2FuaW1hdGVGdW5jcyA/IG9wdHMuYW5pbWF0ZVR5cGUgOiAnZGVmYXVsdCc7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcm90ZWN0ZWRcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jID0gdGhpcy5fYW5pbWF0ZUZ1bmNzW3RoaXMuYW5pbWF0ZVR5cGVdO1xuXG4gICAgICAgIC8vIGxpdHRsZSB0cmljayBzZXQsIHdoZW4geW91IGNob29jZSB0ZWFyICYgdmVydGljYWwgc2FtZSB0aW1lXG4gICAgICAgIC8vIGlTbGlkZXIgb3ZlcnNwcmVhZCBtb2RlIHdpbGwgYmUgc2V0IHRydWUgYXV0b21ldGljbHlcbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCAmJiB0aGlzLmFuaW1hdGVUeXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWJ1ZyBtb2RlXG4gICAgICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubG9nID0gb3B0cy5pc0RlYnVnID8gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBnbG9iYWwuY29uc29sZS5sb2cuYXBwbHkoZ2xvYmFsLmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0gOiB0aGlzLkVNUFRZX0ZVTkNUSU9OO1xuXG4gICAgICAgIC8vIHNldCBEYW1waW5nIGZ1bmN0aW9uXG4gICAgICAgIHRoaXMuX3NldFVwRGFtcGluZygpO1xuXG4gICAgICAgIC8vIHN0b3AgYXV0b3BsYXkgd2hlbiB3aW5kb3cgYmx1clxuICAgICAgICAvLyB0aGlzLl9zZXRQbGF5V2hlbkZvY3VzKCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGFuaW1hdGUgcHJvY2VzcyB0aW1lIChtcyksIGRlZmF1bHQ6IDMwMG1zXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYW5pbWF0ZVRpbWUgPSBvcHRzLmFuaW1hdGVUaW1lICE9IG51bGwgJiYgb3B0cy5hbmltYXRlVGltZSA+IC0xID8gb3B0cy5hbmltYXRlVGltZSA6IDMwMDtcblxuICAgICAgICAvKipcbiAgICAgICAgICogYW5pbWF0ZSBlZmZlY3RzLCBkZWZhdWx0OiBlYXNlXG4gICAgICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuYW5pbWF0ZUVhc2luZyA9XG4gICAgICAgICAgICBpbkFycmF5KG9wdHMuYW5pbWF0ZUVhc2luZywgdGhpcy5FQVNJTkdbMF0pIHx8IHRoaXMuRUFTSU5HWzFdLnRlc3Qob3B0cy5hbmltYXRlRWFzaW5nKSA/IG9wdHMuYW5pbWF0ZUVhc2luZyA6ICdlYXNlJztcblxuICAgICAgICAvKipcbiAgICAgICAgICogSW4gc2xpZGUgYW5pbWF0aW9uXG4gICAgICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmluQW5pbWF0ZSA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEZpeCB0b3VjaC9tb3VzZSBldmVudHNcbiAgICAgICAgICogQHR5cGUge3toYXNUb3VjaCwgc3RhcnRFdnQsIG1vdmVFdnQsIGVuZEV2dH19XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmRldmljZUV2ZW50cyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGxldCBoYXNUb3VjaCA9ICEhKCgnb250b3VjaHN0YXJ0JyBpbiBnbG9iYWwpIHx8IGdsb2JhbC5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgZ2xvYmFsLkRvY3VtZW50VG91Y2gpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBoYXNUb3VjaDogaGFzVG91Y2gsXG4gICAgICAgICAgICAgICAgc3RhcnRFdnQ6IGhhc1RvdWNoID8gJ3RvdWNoc3RhcnQnIDogJ21vdXNlZG93bicsXG4gICAgICAgICAgICAgICAgbW92ZUV2dDogaGFzVG91Y2ggPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgICAgIGVuZEV2dDogaGFzVG91Y2ggPyAndG91Y2hlbmQnIDogJ21vdXNldXAnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbml0IGV2ZW50c1xuICAgICAgICAgKiBAdHlwZSB7e319XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmV2ZW50cyA9IHt9O1xuXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgICAgIC8vIC0gUmVnaXN0ZXIgZXZlbnRzXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB5b3VyIGZpbmdlciBpcyBtb3ZpbmdcbiAgICAgICAgdGhpcy5vbignc2xpZGUnLCBvcHRzLm9uc2xpZGUsIDEpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgdG91Y2ggdGhlIHNjcmVlblxuICAgICAgICB0aGlzLm9uKCdzbGlkZVN0YXJ0Jywgb3B0cy5vbnNsaWRlc3RhcnQsIDEpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gdGhlIGZpbmdlciBtb3ZlIG91dCBvZiB0aGUgc2NyZWVuXG4gICAgICAgIHRoaXMub24oJ3NsaWRlRW5kJywgb3B0cy5vbnNsaWRlZW5kLCAxKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHNsaWRlIHRvIG5leHQvcHJldiBzY2VuZVxuICAgICAgICB0aGlzLm9uKCdzbGlkZUNoYW5nZScsIG9wdHMub25zbGlkZWNoYW5nZSwgMSk7XG5cbiAgICAgICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBuZXh0L3ByZXYgc2NlbmUsIHdoaWxlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICAgIHRoaXMub24oJ3NsaWRlQ2hhbmdlZCcsIG9wdHMub25zbGlkZWNoYW5nZWQsIDEpO1xuXG4gICAgICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gcmVzdG9yZSB0byB0aGUgY3VycmVudCBzY2VuZVxuICAgICAgICB0aGlzLm9uKCdzbGlkZVJlc3RvcmUnLCBvcHRzLm9uc2xpZGVyZXN0b3JlLCAxKTtcblxuICAgICAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHJlc3RvcmUgdG8gdGhlIGN1cnJlbnQgc2NlbmUsIHdoaWxlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgICAgIHRoaXMub24oJ3NsaWRlUmVzdG9yZWQnLCBvcHRzLm9uc2xpZGVyZXN0b3JlZCwgMSk7XG5cbiAgICAgICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgLy8gLSBQbHVnaW5zXG4gICAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnBsdWdpbkNvbmZpZyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5KG9wdHMucGx1Z2lucykpIHtcbiAgICAgICAgICAgICAgICBsZXQgY29uZmlnID0ge307XG4gICAgICAgICAgICAgICAgb3B0cy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gcGx1Z2luQ29uZmlnRWFjaChwbHVnaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzQXJyYXkocGx1Z2luKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlnW3BsdWdpblswXV0gPSBwbHVnaW4uc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZ1twbHVnaW5dID0gW107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKTtcblxuICAgICAgICAvLyBBdXRvcGxheSBtb2RlXG4gICAgICAgIHRoaXMuZGVsYXkgPyBnbG9iYWwuc2V0VGltZW91dCh0aGlzLl9hdXRvUGxheS5iaW5kKHRoaXMpLCB0aGlzLmRlbGF5KSA6IHRoaXMuX2F1dG9QbGF5KCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluaXQgcGx1Z2luc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2luaXRQbHVnaW5zKCkge1xuICAgICAgICBsZXQgY29uZmlnID0gdGhpcy5wbHVnaW5Db25maWc7XG4gICAgICAgIGxldCBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcbiAgICAgICAgZm9yIChsZXQgaSBpbiBjb25maWcpIHtcbiAgICAgICAgICAgIGlmIChjb25maWcuaGFzT3duUHJvcGVydHkoaSkgJiYgcGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nKCdbSU5JVCBQTFVHSU5dOicsIGksIHBsdWdpbnNbaV0pO1xuICAgICAgICAgICAgICAgIHBsdWdpbnNbaV0gJiYgdHlwZW9mIHBsdWdpbnNbaV0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHBsdWdpbnNbaV0uYXBwbHkgJiYgcGx1Z2luc1tpXS5hcHBseSh0aGlzLCBjb25maWdbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGVuYWJsZSBkYW1waW5nIHdoZW4gc2xpZGVyIG1lZXQgdGhlIGVkZ2VcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9zZXRVcERhbXBpbmcoKSB7XG4gICAgICAgIGxldCBvbmVJbjIgPSB0aGlzLnNjYWxlID4+IDE7XG4gICAgICAgIGxldCBvbmVJbjQgPSBvbmVJbjIgPj4gMTtcbiAgICAgICAgbGV0IG9uZUluMTYgPSBvbmVJbjQgPj4gMjtcblxuICAgICAgICAvKipcbiAgICAgICAgICogaW5pdCBkYW1waW5nIGZ1bmN0aW9uXG4gICAgICAgICAqIEBwYXJhbSBkaXN0YW5jZVxuICAgICAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuX2RhbXBpbmcgPSBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICAgICAgbGV0IGRpcyA9IE1hdGguYWJzKGRpc3RhbmNlKTtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG5cbiAgICAgICAgICAgIGlmIChkaXMgPCBvbmVJbjIpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBkaXMgPj4gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZGlzIDwgb25lSW4yICsgb25lSW40KSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgKChkaXMgLSBvbmVJbjIpID4+IDIpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBvbmVJbjQgKyBvbmVJbjE2ICsgKChkaXMgLSBvbmVJbjIgLSBvbmVJbjQpID4+IDMpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZGlzdGFuY2UgPiAwID8gcmVzdWx0IDogLXJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IGl0ZW0gdHlwZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfaXRlbVR5cGUoaXRlbSkge1xuICAgICAgICBpZiAoIWlzTmFOKGl0ZW0pKSB7XG4gICAgICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2l0ZW1dO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLnR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNvbnRlbnQgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgIGxldCB0eXBlO1xuICAgICAgICBpZiAoY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgICAgICB0eXBlID0gJ2VtcHR5JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChCb29sZWFuKGNvbnRlbnQubm9kZU5hbWUpICYmIEJvb2xlYW4oY29udGVudC5ub2RlVHlwZSkpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ25vZGUnO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNVcmwoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZSA9ICdwaWMnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGUgPSAnaHRtbCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ3Vua25vd24nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaXRlbS50eXBlID0gdHlwZTtcblxuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogcmVuZGVyIHNpbmdsZSBpdGVtIGh0bWwgYnkgaWR4XG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWwgLi5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4ICAuLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlckl0ZW0oZWwsIGRhdGFJbmRleCkge1xuXG4gICAgICAgIGxldCBpdGVtLFxuICAgICAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgICAgICBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoO1xuXG4gICAgICAgIGxldCBpbnNlcnRJbWcgPSBmdW5jdGlvbiByZW5kZXJJdGVtSW5zZXJ0SW1nKCkge1xuICAgICAgICAgICAgbGV0IHNpbWcgPSAnIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCInO1xuICAgICAgICAgICAgLy8gYXV0byBzY2FsZSB0byBmdWxsIHNjcmVlblxuICAgICAgICAgICAgaWYgKGl0ZW0uaGVpZ2h0IC8gaXRlbS53aWR0aCA+IHNlbGYucmF0aW8pIHtcbiAgICAgICAgICAgICAgICBzaW1nICs9ICcgaGVpZ2h0PVwiMTAwJVwiJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2ltZyArPSAnIHdpZHRoPVwiMTAwJVwiJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzZWxmLmlzT3ZlcnNwcmVhZCkge1xuICAgICAgICAgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBpdGVtLmNvbnRlbnQgKyAnKSBuby1yZXBlYXQgNTAlIDUwJS9jb3Zlcic7XG4gICAgICAgICAgICAgICAgc2ltZyArPSAnIHN0eWxlPVwiZGlzcGxheTpibG9jaztvcGFjaXR5OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtcIidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvciByaWdodCBidXR0b24sIHNhdmUgcGljdHVyZVxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gJzxpbWcnICsgc2ltZyArICcgLz4nO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIGNsZWFuIHNjZW5lXG4gICAgICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJyc7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSByaWdodCBpdGVtIG9mIGRhdGFcbiAgICAgICAgaWYgKCF0aGlzLmlzTG9vcGluZyAmJiB0aGlzLmRhdGFbZGF0YUluZGV4XSA9PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBTdG9wIHNsaWRlIHdoZW4gaXRlbSBpcyBlbXB0eVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGF0YUluZGV4ID0gKGxlbiAvKiAqIE1hdGguY2VpbChNYXRoLmFicyhkYXRhSW5kZXggLyBsZW4pKSovICsgZGF0YUluZGV4KSAlIGxlbjtcbiAgICAgICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbZGF0YUluZGV4XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB0eXBlID0gdGhpcy5faXRlbVR5cGUoaXRlbSk7XG5cbiAgICAgICAgdGhpcy5sb2coJ1tSZW5kZXIgSVRFTV06JywgdHlwZSwgZGF0YUluZGV4LCBpdGVtKTtcblxuICAgICAgICBlbC5jbGFzc05hbWUgPSAnaXNsaWRlci0nICsgdHlwZTtcblxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3BpYyc6XG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ubG9hZCA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50SW1nLnNyYyA9IGl0ZW0uY29udGVudDtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudEltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gY3VycmVudEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gY3VycmVudEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5sb2FkID0gMjtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdkb20nOlxuICAgICAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gaXRlbS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnbm9kZSc6XG4gICAgICAgICAgICBjYXNlICdlbGVtZW50JzpcbiAgICAgICAgICAgICAgICAvLyBmcmFnbWVudCwgY3JlYXRlIGNvbnRhaW5lclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmNvbnRlbnQubm9kZVR5cGUgPT09IDExKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBlbnRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAgICAgZW50aXR5LmFwcGVuZENoaWxkKGl0ZW0uY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudCA9IGVudGl0eTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoaXRlbS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy8gZG8gbm90aGluZ1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5maXJlKCdyZW5kZXJDb21wbGV0ZScpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQb3N0cG9uaW5nIHRoZSBpbnRlcm1lZGlhdGUgc2NlbmUgcmVuZGVyaW5nXG4gICAgICogdW50aWwgdGhlIHRhcmdldCBzY2VuZSBpcyBjb21wbGV0ZWx5IHJlbmRlcmVkIChyZW5kZXIgaW4gZXZlbnQgc2xpZGVDaGFuZ2VkKVxuICAgICAqIHRvIGF2b2lkIGEganVtcHkgZmVlbCB3aGVuIHN3aXRjaGluZyBiZXR3ZWVuIHNjZW5lc1xuICAgICAqIGdpdmVuIHRoYXQgdGhlIGRpc3RhbmNlIG9mIHNsaWRpbmcgaXMgbW9yZSB0aGFuIDEuXG4gICAgICogZS5nLiBgYGB0aGlzLnNsaWRlVG8oPistMSlgYGBcbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX3JlbmRlckludGVybWVkaWF0ZVNjZW5lKCkge1xuICAgICAgICBpZiAodGhpcy5faW50ZXJtZWRpYXRlU2NlbmUgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbS5hcHBseSh0aGlzLCB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSk7XG4gICAgICAgICAgICB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQXBwbHkgc3R5bGVzIG9uIGNoYW5nZWRcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIF9jaGFuZ2VkU3R5bGVzKCkge1xuICAgICAgICBsZXQgc2xpZGVTdHlsZXMgPSBbJ2lzbGlkZXItcHJldicsICdpc2xpZGVyLWFjdGl2ZScsICdpc2xpZGVyLW5leHQnXTtcbiAgICAgICAgdGhpcy5lbHMuZm9yRWFjaChmdW5jdGlvbiBjaGFuZ2VTdHlwZUVhY2goZWwsIGluZGV4KSB7XG4gICAgICAgICAgICByZW1vdmVDbGFzcyhlbCwgJygnICsgc2xpZGVTdHlsZXMuam9pbignfCcpICsgJyknKTtcbiAgICAgICAgICAgIGFkZENsYXNzKGVsLCBzbGlkZVN0eWxlc1tpbmRleF0pXG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZW5kZXIgbGlzdCBodG1sXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcmVuZGVyV3JhcHBlcigpIHtcbiAgICAgICAgdGhpcy5vdXRlciAmJiAodGhpcy5vdXRlci5pbm5lckhUTUwgPSAnJyk7XG4gICAgICAgIC8vIGluaXRhaWwgdWwgZWxlbWVudFxuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgICAgIG91dGVyLmNsYXNzTmFtZSA9ICdpc2xpZGVyLW91dGVyJztcblxuICAgICAgICAvLyBzdG9yYWdlIGxpIGVsZW1lbnRzLCBvbmx5IHN0b3JlIDMgZWxlbWVudHMgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuICAgICAgICAvKipcbiAgICAgICAgICogU2xpZGVyIGVsZW1lbnRzIHgzXG4gICAgICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5lbHMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgIHRoaXMuZWxzLnB1c2gobGkpO1xuXG4gICAgICAgICAgICAvLyBwcmVwYXJlIHN0eWxlIGFuaW1hdGlvblxuICAgICAgICAgICAgdGhpcy5fYW5pbWF0ZUZ1bmMobGksIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCk7XG5cbiAgICAgICAgICAgIC8vIGF1dG8gb3ZlcmZsb3cgaW4gbm9uZSBmaXhQYWdlIG1vZGVcbiAgICAgICAgICAgIGlmICghdGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaXNWZXJ0aWNhbCAmJiAodGhpcy5hbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgdGhpcy5hbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSA/IHRoaXMuX3JlbmRlckl0ZW0obGksIDEgLSBpICsgdGhpcy5zbGlkZUluZGV4KSA6IHRoaXMuX3JlbmRlckl0ZW0obGksIGkgLSAxICsgdGhpcy5zbGlkZUluZGV4KTtcblxuICAgICAgICAgICAgb3V0ZXIuYXBwZW5kQ2hpbGQobGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fY2hhbmdlZFN0eWxlcygpO1xuXG4gICAgICAgIC8vIFByZWxvYWQgcGljdHVyZSBbIG1heSBiZSBwaWMgOikgXVxuICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZWxvYWRJbWcodGhpcy5zbGlkZUluZGV4KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCAyMDApO1xuXG4gICAgICAgIC8vIGFwcGVuZCB1bCB0byBkaXYjY2FudmFzXG4gICAgICAgIGlmICghdGhpcy5vdXRlcikge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5vdXRlciA9IG91dGVyO1xuICAgICAgICAgICAgdGhpcy53cmFwLmFwcGVuZENoaWxkKG91dGVyKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQcmVsb2FkIGltZyB3aGVuIHNsaWRlQ2hhbmdlXG4gICAgICogRnJvbSBjdXJyZW50IGluZGV4ICsyLCAtMiBzY2VuZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggbWVhbnMgd2hpY2ggaW1hZ2Ugd2lsbCBiZSBsb2FkXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfcHJlbG9hZEltZyhkYXRhSW5kZXgpIHtcbiAgICAgICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgICAgIGxldCBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGxldCBsb2FkSW1nID0gZnVuY3Rpb24gcHJlbG9hZEltZ0xvYWRpbmdQcm9jZXNzKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSBkYXRhW2luZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZi5faXRlbVR5cGUoaXRlbSkgPT09ICdwaWMnICYmICFpdGVtLmxvYWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHByZWxvYWRJbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgcHJlbG9hZEltZy5zcmMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHByZWxvYWRJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLndpZHRoID0gcHJlbG9hZEltZy53aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gcHJlbG9hZEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmxvYWQgPSAyO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmxvYWQgPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGxvYWRJbWcoKGRhdGFJbmRleCArIDIpICUgbGVuKTtcbiAgICAgICAgICAgIGxvYWRJbWcoKGRhdGFJbmRleCAtIDIgKyBsZW4pICUgbGVuKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBXYXRjaCBldmVudCB0cmFuc2l0aW9uRW5kXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICBfd2F0Y2hUcmFuc2l0aW9uRW5kKHRpbWUsIGV2ZW50VHlwZSkge1xuXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcbiAgICAgICAgbGV0IGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBsZXQgbHNuO1xuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6JywgJ3dhdGNoVHJhbnNpdGlvbkVuZDo6c3R1Y2s6OnBpbGUnLCB0aGlzLmluQW5pbWF0ZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGV2dCkge1xuICAgICAgICAgICAgaWYgKGxzbikge1xuICAgICAgICAgICAgICAgIGdsb2JhbC5jbGVhclRpbWVvdXQobHNuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuaW5BbmltYXRlLS07XG4gICAgICAgICAgICBzZWxmLmxvZygnRXZlbnQ6JywgJ3dhdGNoVHJhbnNpdGlvbkVuZDo6c3R1Y2s6OnJlbGVhc2UnLCBzZWxmLmluQW5pbWF0ZSk7XG4gICAgICAgICAgICBpZiAoc2VsZi5pbkFuaW1hdGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvL3NlbGYuaW5BbmltYXRlID0gMDtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnc2xpZGVDaGFuZ2VkJykge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9jaGFuZ2VkU3R5bGVzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZS5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgICAgICAgICAgICBzZWxmLl9yZW5kZXJJbnRlcm1lZGlhdGVTY2VuZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdW5XYXRjaCgpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIHVuV2F0Y2goKSB7XG4gICAgICAgICAgICBzZWxmLmVscy5mb3JFYWNoKGZ1bmN0aW9uIHRyYW5zbGF0aW9uRW5kVW53YXRjaEVhY2goZWwpIHtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHNlbGYuX3RyYW5zaXRpb25FbmRFdmVudCgpLCBoYW5kbGUpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzZWxmLmlzQW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgICAgIHNlbGYuZWxzLmZvckVhY2goZnVuY3Rpb24gdHJhbnNsYXRpb25FbmRFbHNFYWNoKGVsKSB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihzZWxmLl90cmFuc2l0aW9uRW5kRXZlbnQoKSwgaGFuZGxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGxzbiA9IGdsb2JhbC5zZXRUaW1lb3V0KGhhbmRsZSwgdGltZSk7XG4gICAgICAgIHNlbGYuaW5BbmltYXRlKys7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGJpbmQgYWxsIGV2ZW50IGhhbmRsZXIsIHdoZW4gb24gUEMsIGRpc2FibGUgZHJhZyBldmVudFxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2JpbmRIYW5kbGVyKCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2hhYmxlKSB7XG4gICAgICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgICAgICAgICBpZiAoIWRldmljZS5oYXNUb3VjaCkge1xuICAgICAgICAgICAgICAgIG91dGVyLnN0eWxlLmN1cnNvciA9ICdwb2ludGVyJztcbiAgICAgICAgICAgICAgICAvLyBkaXNhYmxlIGRyYWdcbiAgICAgICAgICAgICAgICBvdXRlci5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLnN0YXJ0RXZ0LCB0aGlzKTtcbiAgICAgICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2UuZW5kRXZ0LCB0aGlzKTtcbiAgICAgICAgICAgICF0aGlzLmRldmljZUV2ZW50cy5oYXNUb3VjaCAmJiBvdXRlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcyk7XG4gICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzKTtcblxuICAgICAgICAvLyBGaXggYW5kcm9pZCBkZXZpY2VcbiAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcywgZmFsc2UpO1xuICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMsIGZhbHNlKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIFVuaWZvcm1pdHkgYWRtaW4gZXZlbnRcbiAgICAgKiAgRXZlbnQgcm91dGVyXG4gICAgICogIEBwYXJhbSB7b2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gICAgICogIEBwcm90ZWN0ZWRcbiAgICAgKi9cbiAgICBoYW5kbGVFdmVudChldnQpIHtcbiAgICAgICAgbGV0IGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgICAgICBzd2l0Y2ggKGV2dC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgICAgIC8vIGJsb2NrIG1vdXNlIGJ1dHRvbnMgZXhjZXB0IGxlZnRcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LmJ1dHRvbiAhPT0gMCkgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0SGFuZGxlcihldnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBkZXZpY2UubW92ZUV2dDpcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIGRldmljZS5lbmRFdnQ6XG4gICAgICAgICAgICBjYXNlICdtb3VzZW91dCc6IC8vIG1vdXNlb3V0IGV2ZW50LCB0cmlnZ2VyIGVuZEV2ZW50XG4gICAgICAgICAgICBjYXNlICd0b3VjaGNhbmNlbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbmRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdvcmllbnRhdGlvbmNoYW5nZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2ZvY3VzJzpcbiAgICAgICAgICAgICAgICB0aGlzLl9hdXRvUGxheSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYmx1cic6XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmVzaXplJzpcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZUhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAgdG91Y2hzdGFydCBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgc3RhcnRIYW5kbGVyKGV2dCkge1xuICAgICAgICBpZiAodGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5GSVhfUEFHRV9UQUdTLmluZGV4T2YoZXZ0LnRhcmdldC50YWdOYW1lKSA8IDApIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5ob2xkaW5nIHx8IHRoaXMubG9ja2luZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcblxuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IHN0YXJ0Jyk7XG4gICAgICAgIHRoaXMuZmlyZSgnc2xpZGVTdGFydCcsIGV2dCwgdGhpcyk7XG5cbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgdGhpcy5zdGFydFggPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGV2dC5wYWdlWDtcbiAgICAgICAgdGhpcy5zdGFydFkgPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGV2dC5wYWdlWTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogIHRvdWNobW92ZSBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgbW92ZUhhbmRsZXIoZXZ0KSB7XG4gICAgICAgIGlmICghdGhpcy5pc01vdmluZykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nKCdFdmVudDogbW92aW5nJyk7XG4gICAgICAgIGxldCBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgbGV0IGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgICAgIGxldCBheGlzID0gdGhpcy5heGlzO1xuICAgICAgICBsZXQgcmV2ZXJzZUF4aXMgPSB0aGlzLnJldmVyc2VBeGlzO1xuICAgICAgICBsZXQgb2Zmc2V0ID0ge1xuICAgICAgICAgICAgWDogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zdGFydFgpIDogKGV2dC5wYWdlWCAtIHRoaXMuc3RhcnRYKSxcbiAgICAgICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgICAgICBpZiAoTWF0aC5hYnMob2Zmc2V0W2F4aXNdKSAtIE1hdGguYWJzKG9mZnNldFtyZXZlcnNlQXhpc10pID4gMTApIHtcblxuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHRoaXMuZmlyZSgnc2xpZGUnLCBldnQsIHRoaXMpO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9mZnNldFtheGlzXSA+IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSAwIHx8IG9mZnNldFtheGlzXSA8IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBsZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFtheGlzXSA9IHRoaXMuX2RhbXBpbmcob2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSB0aGlzLmVsc1tpXTtcbiAgICAgICAgICAgICAgICBpdGVtLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDBzJztcbiAgICAgICAgICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyhpdGVtLCBheGlzLCB0aGlzLnNjYWxlLCBpLCBvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqICB0b3VjaGVuZCBjYWxsYmFja1xuICAgICAqICBAcGFyYW0ge09iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgZW5kSGFuZGxlcihldnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzTW92aW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBlbmQnKTtcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xuICAgICAgICBsZXQgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgICAgIGxldCBheGlzID0gdGhpcy5heGlzO1xuICAgICAgICBsZXQgYm91bmRhcnkgPSB0aGlzLnNjYWxlIC8gMjtcbiAgICAgICAgbGV0IGVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAvLyBhIHF1aWNrIHNsaWRlIHRpbWUgbXVzdCB1bmRlciAzMDBtc1xuICAgICAgICAvLyBhIHF1aWNrIHNsaWRlIHNob3VsZCBhbHNvIHNsaWRlIGF0IGxlYXN0IDE0IHB4XG4gICAgICAgIGJvdW5kYXJ5ID0gZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lID4gMzAwID8gYm91bmRhcnkgOiAxNDtcblxuICAgICAgICBsZXQgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgbGV0IGFic1JldmVyc2VPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXRbdGhpcy5yZXZlcnNlQXhpc10pO1xuXG4gICAgICAgIGxldCBnZXRMaW5rID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgIGlmIChlbC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWwuaHJlZikge1xuICAgICAgICAgICAgICAgICAgICBnbG9iYWwubG9jYXRpb24uaHJlZiA9IGVsLmhyZWZcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZWwuY2xhc3NOYW1lICE9PSAnaXNsaWRlci1waWMnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBnZXRMaW5rKGVsLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sb2coYm91bmRhcnksIG9mZnNldFtheGlzXSwgYWJzT2Zmc2V0LCBhYnNSZXZlcnNlT2Zmc2V0LCB0aGlzKTtcblxuICAgICAgICBpZiAob2Zmc2V0W2F4aXNdID49IGJvdW5kYXJ5ICYmIGFic1JldmVyc2VPZmZzZXQgPCBhYnNPZmZzZXQpIHtcbiAgICAgICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXggLSAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChvZmZzZXRbYXhpc10gPCAtYm91bmRhcnkgJiYgYWJzUmV2ZXJzZU9mZnNldCA8IGFic09mZnNldCkge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCArIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjcmVhdGUgdGFwIGV2ZW50IGlmIG9mZnNldCA8IDEwXG4gICAgICAgIGlmIChNYXRoLmFicyh0aGlzLm9mZnNldC5YKSA8IDEwICYmIE1hdGguYWJzKHRoaXMub2Zmc2V0LlkpIDwgMTApIHtcbiAgICAgICAgICAgIHRoaXMudGFwRXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgICAgICB0aGlzLnRhcEV2dC5pbml0RXZlbnQoJ3RhcCcsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuZml4UGFnZSkge1xuICAgICAgICAgICAgICAgIGV2dC50YXJnZXQgJiYgZ2V0TGluayhldnQudGFyZ2V0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghZXZ0LnRhcmdldC5kaXNwYXRjaEV2ZW50KHRoaXMudGFwRXZ0KSkge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5vZmZzZXQuWCA9IHRoaXMub2Zmc2V0LlkgPSAwO1xuXG4gICAgICAgIHRoaXMuX2F1dG9QbGF5KCk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdzbGlkZUVuZCcsIGV2dCwgdGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqICBvcmllbnRhdGlvbmNoYW5nZSBjYWxsYmFja1xuICAgICAqICBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgb3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyKCkge1xuICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdFdmVudDogb3JpZW50YXRpb25jaGFuZ2UnKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpLCAxMDApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZXNpemUgY2FsbGJhY2tcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgcmVzaXplSGFuZGxlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0ICE9PSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0IHx8IHRoaXMud2lkdGggIT09IHRoaXMud3JhcC5jbGllbnRXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5yZXNpemUpO1xuICAgICAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSA9IGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IHJlc2l6ZScpO1xuICAgICAgICAgICAgICAgIHRoaXMuX0xTTi5yZXNpemUgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04ucmVzaXplKTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiAgc2xpZGUgbG9naWNhbCwgZ290byBkYXRhIGluZGV4XG4gICAgICogIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggdGhlIGdvdG8gaW5kZXhcbiAgICAgKiAgQHB1YmxpY1xuICAgICAqL1xuICAgIHNsaWRlVG8oZGF0YUluZGV4LCBvcHRzKSB7XG4gICAgICAgIGlmICh0aGlzLmxvY2tpbmcpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVuaG9sZCgpO1xuICAgICAgICBsZXQgYW5pbWF0ZVRpbWUgPSB0aGlzLmFuaW1hdGVUaW1lO1xuICAgICAgICBsZXQgYW5pbWF0ZVR5cGUgPSB0aGlzLmFuaW1hdGVUeXBlO1xuICAgICAgICBsZXQgYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuYztcbiAgICAgICAgbGV0IGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGxldCBlbHMgPSB0aGlzLmVscztcbiAgICAgICAgbGV0IGlkeCA9IGRhdGFJbmRleDtcbiAgICAgICAgbGV0IG4gPSBkYXRhSW5kZXggLSB0aGlzLnNsaWRlSW5kZXg7XG4gICAgICAgIGxldCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICAgICAgbGV0IGV2ZW50VHlwZTtcblxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAob3B0cy5hbmltYXRlVGltZSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0ZVRpbWUgPSBvcHRzLmFuaW1hdGVUaW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRzLmFuaW1hdGVUeXBlID09PSAnc3RyaW5nJyAmJiBvcHRzLmFuaW1hdGVUeXBlIGluIHRoaXMuX2FuaW1hdGVGdW5jcykge1xuICAgICAgICAgICAgICAgIGFuaW1hdGVUeXBlID0gb3B0cy5hbmltYXRlVHlwZTtcbiAgICAgICAgICAgICAgICBhbmltYXRlRnVuYyA9IHRoaXMuX2FuaW1hdGVGdW5jc1thbmltYXRlVHlwZV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbiB0aGUgc2xpZGUgcHJvY2VzcywgYW5pbWF0ZSB0aW1lIGlzIHNxdWVlemVkXG4gICAgICAgIGxldCBzcXVlZXplVGltZSA9IE1hdGguYWJzKG9mZnNldFt0aGlzLmF4aXNdKSAvIHRoaXMuc2NhbGUgKiBhbmltYXRlVGltZTtcblxuICAgICAgICBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKG4gPiAwID8gdGhpcy5lbHNbMl0gOiB0aGlzLmVsc1swXSwgaWR4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHByZWxvYWQgd2hlbiBzbGlkZVxuICAgICAgICB0aGlzLl9wcmVsb2FkSW1nKGlkeCk7XG5cbiAgICAgICAgLy8gZ2V0IHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgICAgICBpZiAoZGF0YVtpZHhdKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpZHg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBuID4gMCA/IDAgOiBkYXRhLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc2xpZGVJbmRleCA9IHRoaXMuc2xpZGVJbmRleDtcbiAgICAgICAgICAgICAgICBuID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubG9nKCdJbmRleDonICsgdGhpcy5zbGlkZUluZGV4KTtcblxuICAgICAgICAvLyBrZWVwIHRoZSByaWdodCBvcmRlciBvZiBpdGVtc1xuICAgICAgICBsZXQgaGVhZEVsLCB0YWlsRWwsIHN0ZXA7XG5cbiAgICAgICAgLy8gc2xpZGVjaGFuZ2Ugc2hvdWxkIHJlbmRlciBuZXcgaXRlbVxuICAgICAgICAvLyBhbmQgY2hhbmdlIG5ldyBpdGVtIHN0eWxlIHRvIGZpdCBhbmltYXRpb25cbiAgICAgICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgICAgIC8vIFJlc3RvcmUgdG8gY3VycmVudCBzY2VuZVxuICAgICAgICAgICAgZXZlbnRUeXBlID0gJ3NsaWRlUmVzdG9yZSc7XG4gICAgICAgIH0gZWxzZSB7XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5pc1ZlcnRpY2FsICYmIChhbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgYW5pbWF0ZVR5cGUgPT09ICdmbGlwJykpIF4gKG4gPiAwKSkge1xuICAgICAgICAgICAgICAgIGVscy5wdXNoKGVscy5zaGlmdCgpKTtcbiAgICAgICAgICAgICAgICBoZWFkRWwgPSBlbHNbMl07XG4gICAgICAgICAgICAgICAgdGFpbEVsID0gZWxzWzBdO1xuICAgICAgICAgICAgICAgIHN0ZXAgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbHMudW5zaGlmdChlbHMucG9wKCkpO1xuICAgICAgICAgICAgICAgIGhlYWRFbCA9IGVsc1swXTtcbiAgICAgICAgICAgICAgICB0YWlsRWwgPSBlbHNbMl07XG4gICAgICAgICAgICAgICAgc3RlcCA9IC0xO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoTWF0aC5hYnMobikgPT09IDEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW5kZXJJbnRlcm1lZGlhdGVTY2VuZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0oaGVhZEVsLCBpZHggKyBuKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMobikgPiAxKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShoZWFkRWwsIGlkeCArIHN0ZXApO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lID0gW3RhaWxFbCwgaWR4IC0gc3RlcF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGhlYWRFbC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICAgICAgaGVhZEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblxuICAgICAgICAgICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgaGVhZEVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgICAgICAvLyBNaW51cyBzcXVlZXplIHRpbWVcbiAgICAgICAgICAgIHNxdWVlemVUaW1lID0gYW5pbWF0ZVRpbWUgLSBzcXVlZXplVGltZTtcblxuICAgICAgICAgICAgZXZlbnRUeXBlID0gJ3NsaWRlQ2hhbmdlJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyZShldmVudFR5cGUsIHRoaXMuc2xpZGVJbmRleCwgZWxzWzFdLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fd2F0Y2hUcmFuc2l0aW9uRW5kKHNxdWVlemVUaW1lLCBldmVudFR5cGUgKyAnZCcsIHRoaXMuc2xpZGVJbmRleCwgZWxzWzFdLCB0aGlzKTtcblxuICAgICAgICAvLyBkbyB0aGUgdHJpY2sgYW5pbWF0aW9uXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoZWxzW2ldICE9PSBoZWFkRWwpIHtcbiAgICAgICAgICAgICAgICAvLyBPbmx5IGFwcGxpZXMgdG8gXCJ0cmFuc2Zvcm1cIlxuICAgICAgICAgICAgICAgIGVsc1tpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAnICsgKHNxdWVlemVUaW1lIC8gMTAwMCkgKyAncyAnICsgdGhpcy5hbmltYXRlRWFzaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYW5pbWF0ZUZ1bmMuY2FsbCh0aGlzLCBlbHNbaV0sIHRoaXMuYXhpcywgdGhpcy5zY2FsZSwgaSwgMCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBub3QgbG9vcGluZywgc3RvcCBwbGF5aW5nIHdoZW4gbWVldCB0aGUgZW5kIG9mIGRhdGFcbiAgICAgICAgaWYgKHRoaXMuaXNBdXRvcGxheSAmJiAhdGhpcy5pc0xvb3BpbmcgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBkYXRhLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTbGlkZSB0byBuZXh0IHNjZW5lXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHNsaWRlTmV4dCgpIHtcbiAgICAgICAgdGhpcy5zbGlkZVRvLmFwcGx5KHRoaXMsIFt0aGlzLnNsaWRlSW5kZXggKyAxXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTbGlkZSB0byBwcmV2aW91cyBzY2VuZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBzbGlkZVByZXYoKSB7XG4gICAgICAgIHRoaXMuc2xpZGVUby5hcHBseSh0aGlzLCBbdGhpcy5zbGlkZUluZGV4IC0gMV0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgcGx1Z2luIChydW4gdGltZSBtb2RlKVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gcGx1Z2luXG4gICAgICogQHBhcmFtIHsuLi59XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIC8qIHJlZ1BsdWdpbigpIHtcbiAgICAgICAgIGxldCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgIGxldCBuYW1lID0gYXJncy5zaGlmdCgpLFxuICAgICAgICAgICAgIHBsdWdpbiA9IGFyZ3NbMF07XG5cbiAgICAgICAgIGlmICghdGhpcy5fcGx1Z2lucy5oYXNPd25Qcm9wZXJ0eShuYW1lKSAmJiB0eXBlb2YgcGx1Z2luICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKHR5cGVvZiBwbHVnaW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICB0aGlzLl9wbHVnaW5zW25hbWVdID0gcGx1Z2luO1xuICAgICAgICAgICAgIGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgLy8gQXV0byBlbmFibGUgYW5kIGluaXQgcGx1Z2luIHdoZW4gYXQgcnVuIHRpbWVcbiAgICAgICAgIGlmICghaW5BcnJheShuYW1lLCB0aGlzLl9vcHRzLnBsdWdpbnMpKSB7XG4gICAgICAgICAgICAgdGhpcy5fb3B0cy5wbHVnaW5zLnB1c2goYXJncy5sZW5ndGggPyBbXS5jb25jYXQoW25hbWVdLCBhcmdzKSA6IG5hbWUpO1xuICAgICAgICAgICAgIHR5cGVvZiB0aGlzLl9wbHVnaW5zW25hbWVdID09PSAnZnVuY3Rpb24nICYmIHRoaXMuX3BsdWdpbnNbbmFtZV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICB9XG4gICAgIH07Ki9cblxuICAgIC8qKlxuICAgICAqICBzaW1wbGUgZXZlbnQgZGVsZWdhdGUgbWV0aG9kXG4gICAgICogIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlIGV2ZW50IG5hbWVcbiAgICAgKiAgQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIHRoZSBzaW1wbGUgY3NzIHNlbGVjdG9yIGxpa2UgalF1ZXJ5XG4gICAgICogIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIGV2ZW50IGNhbGxiYWNrXG4gICAgICogIEBwdWJsaWNcbiAgICAgKi9cbiAgICBiaW5kKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBmdW5jdGlvbiBkZWxlZ2F0ZWRFdmVudENhbGxiYWNrSGFuZGxlKGUpIHtcbiAgICAgICAgICAgIGxldCBldnQgPSBnbG9iYWwuZXZlbnQgPyBnbG9iYWwuZXZlbnQgOiBlO1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9IGV2dC50YXJnZXQ7XG4gICAgICAgICAgICBsZXQgZWxlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXQgPT09IGVsZUFycltpXSkge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5hZGRFdmVudExpc3RlbmVyKGV2dFR5cGUsIGRlbGVnYXRlZEV2ZW50Q2FsbGJhY2tIYW5kbGUsIGZhbHNlKTtcblxuICAgICAgICBsZXQga2V5ID0gZXZ0VHlwZSArICc7JyArIHNlbGVjdG9yO1xuICAgICAgICBpZiAoIXRoaXMuX0V2ZW50SGFuZGxlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV0gPSBbXG4gICAgICAgICAgICAgICAgW2NhbGxiYWNrXSxcbiAgICAgICAgICAgICAgICBbZGVsZWdhdGVkRXZlbnRDYWxsYmFja0hhbmRsZV1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMF0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgICAgICB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzFdLnB1c2goZGVsZWdhdGVkRXZlbnRDYWxsYmFja0hhbmRsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZGVsZWdhdGUoZXZ0VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGZ1bmN0aW9uIGRlbGVnYXRlZEV2ZW50Q2FsbGJhY2tIYW5kbGUoZSkge1xuICAgICAgICAgICAgbGV0IGV2dCA9IGdsb2JhbC5ldmVudCA/IGdsb2JhbC5ldmVudCA6IGU7XG4gICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgICAgIGxldCBlbGVBcnIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZWxlQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWxlQXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgZGVsZWdhdGVkRXZlbnRDYWxsYmFja0hhbmRsZSwgZmFsc2UpO1xuXG4gICAgICAgIGxldCBrZXkgPSBldnRUeXBlICsgJzsnICsgc2VsZWN0b3I7XG4gICAgICAgIGlmICghdGhpcy5fRXZlbnRIYW5kbGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdGhpcy5fRXZlbnRIYW5kbGVba2V5XSA9IFtcbiAgICAgICAgICAgICAgICBbY2FsbGJhY2tdLFxuICAgICAgICAgICAgICAgIFtkZWxlZ2F0ZWRFdmVudENhbGxiYWNrSGFuZGxlXVxuICAgICAgICAgICAgXVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVswXS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMV0ucHVzaChkZWxlZ2F0ZWRFdmVudENhbGxiYWNrSGFuZGxlKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmUgZXZlbnQgZGVsZWdhdGUgZnJvbSB3cmFwXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZSBldmVudCBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNlbGVjdG9yIHRoZSBzaW1wbGUgY3NzIHNlbGVjdG9yIGxpa2UgalF1ZXJ5XG4gICAgICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgZXZlbnQgY2FsbGJhY2tcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5iaW5kKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQga2V5ID0gZXZ0VHlwZSArICc7JyArIHNlbGVjdG9yO1xuICAgICAgICBpZiAodGhpcy5fRXZlbnRIYW5kbGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzBdLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMV1baV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMF1baV0gPSB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzFdW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVswXVtpXTtcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVsxXVtpXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH07XG5cbiAgICB1bkRlbGVnYXRlKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuICAgICAgICBsZXQga2V5ID0gZXZ0VHlwZSArICc7JyArIHNlbGVjdG9yO1xuICAgICAgICBpZiAodGhpcy5fRXZlbnRIYW5kbGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzBdLmluZGV4T2YoY2FsbGJhY2spO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMV1baV0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMF1baV0gPSB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzFdW2ldID0gbnVsbDtcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVswXVtpXTtcbiAgICAgICAgICAgICAgICAvLyBkZWxldGUgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVsxXVtpXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZW1vdmVFdmVudExpc3RlbmVyIHRvIHJlbGVhc2UgdGhlIG1lbW9yeVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBsZXQgb3V0ZXIgPSB0aGlzLm91dGVyO1xuICAgICAgICBsZXQgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG5cbiAgICAgICAgdGhpcy5maXJlKCdkZXN0cm95Jyk7XG5cbiAgICAgICAgLy8gQ2xlYXIgZXZlbnRzXG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2hhYmxlKSB7XG4gICAgICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5tb3ZlRXZ0LCB0aGlzKTtcbiAgICAgICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLmVuZEV2dCwgdGhpcyk7XG4gICAgICAgICAgICAhdGhpcy5kZXZpY2VFdmVudHMuaGFzVG91Y2ggJiYgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICAgICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcyk7XG4gICAgICAgIGdsb2JhbC5yZW1vdmVFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcyk7XG5cbiAgICAgICAgLy8gQ2xlYXIgZGVsZWdhdGUgZXZlbnRzXG4gICAgICAgIGZvciAobGV0IG4gaW4gdGhpcy5fRXZlbnRIYW5kbGUpIHtcbiAgICAgICAgICAgIGxldCBoYW5kTGlzdCA9IHRoaXMuX0V2ZW50SGFuZGxlW25dWzFdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoYW5kTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaGFuZExpc3RbaV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy53cmFwLnJlbW92ZUV2ZW50TGlzdGVuZXIobi5zdWJzdHIoMCwgbi5pbmRleE9mKCc7JykpLCBoYW5kTGlzdFtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlID0gbnVsbDtcblxuICAgICAgICAvLyBDbGVhciB0aW1lclxuICAgICAgICBmb3IgKGxldCBuIGluIHRoaXMuX0xTTilcbiAgICAgICAgICAgIHRoaXMuX0xTTi5oYXNPd25Qcm9wZXJ0eShuKSAmJiB0aGlzLl9MU05bbl0gJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU05bbl0pO1xuXG4gICAgICAgIHRoaXMuX0xTTiA9IG51bGw7XG5cbiAgICAgICAgdGhpcy53cmFwLmlubmVySFRNTCA9ICcnO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBldmVudCBjYWxsYmFja1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIG9uKGV2ZW50TmFtZSwgZnVuYywgZm9yY2UpIHtcbiAgICAgICAgaWYgKGluQXJyYXkoZXZlbnROYW1lLCB0aGlzLkVWRU5UUykgJiYgdHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICEoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSAmJiAodGhpcy5ldmVudHNbZXZlbnROYW1lXSA9IFtdKTtcbiAgICAgICAgICAgIGlmICghZm9yY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZnVuYyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0udW5zaGlmdChmdW5jKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBGaW5kIGNhbGxiYWNrIGZ1bmN0aW9uIHBvc2l0aW9uXG4gICAgICogQHBhcmFtIGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSBmdW5jXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgaGFzKGV2ZW50TmFtZSwgZnVuYykge1xuICAgICAgICBpZiAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5pbmRleE9mKGZ1bmMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGV2ZW50IGNhbGxiYWNrXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICAgICAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAgICAgKiBAcHVibGljXG4gICAgICovXG5cbiAgICBvZmYoZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuaGFzKGV2ZW50TmFtZSwgZnVuYyk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5ldmVudHNbZXZlbnROYW1lXVtpbmRleF07XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogVHJpZ2dlciBldmVudCBjYWxsYmFja3NcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gICAgICogQHBhcmFtIHsqfSBhcmdzXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGZpcmUoZXZlbnROYW1lKSB7XG4gICAgICAgIHRoaXMubG9nKCdbRVZFTlQgRklSRV06JywgZXZlbnROYW1lLCBhcmd1bWVudHMpO1xuICAgICAgICBpZiAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgICAgICBsZXQgZnVuY3MgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmdW5jcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHR5cGVvZiBmdW5jc1tpXSA9PT0gJ2Z1bmN0aW9uJyAmJiBmdW5jc1tpXS5hcHBseSAmJiBmdW5jc1tpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZXNldCAmIHJlcmVuZGVyXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHJlc2V0KCkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgICAgIHRoaXMuX3NldHRpbmcoKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgICAgICB0aGlzLmRlbGF5ICYmIGdsb2JhbC5zZXRUaW1lb3V0KHRoaXMuX2F1dG9QbGF5LmJpbmQodGhpcyksIHRoaXMuZGVsYXkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiByZWxvYWQgRGF0YSAmIHJlbmRlclxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBsb2FkRGF0YShkYXRhLCBpbml0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpbml0SW5kZXggfHwgMDtcbiAgICAgICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICAgICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgICAgICB0aGlzLmZpcmUoJ3JlbG9hZERhdGEnKTtcbiAgICAgICAgdGhpcy5kZWxheSAmJiBnbG9iYWwuc2V0VGltZW91dCh0aGlzLl9hdXRvUGxheS5iaW5kKHRoaXMpLCB0aGlzLmRlbGF5KTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogYXV0byBjaGVjayB0byBwbGF5IGFuZCBiaW5kIGV2ZW50c1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgX2F1dG9QbGF5KCkge1xuICAgICAgICAvLyBlbmFibGVcbiAgICAgICAgaWYgKHRoaXMuaXNBdXRvcGxheSkge1xuICAgICAgICAgICAgdGhpcy5oYXMoJ3NsaWRlQ2hhbmdlZCcsIHRoaXMucGxheSkgPCAwICYmIHRoaXMub24oJ3NsaWRlQ2hhbmdlZCcsIHRoaXMucGxheSwgMSk7XG4gICAgICAgICAgICB0aGlzLmhhcygnc2xpZGVSZXN0b3JlZCcsIHRoaXMucGxheSkgPCAwICYmIHRoaXMub24oJ3NsaWRlUmVzdG9yZWQnLCB0aGlzLnBsYXksIDEpO1xuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm9mZignc2xpZGVDaGFuZ2VkJywgdGhpcy5wbGF5KTtcbiAgICAgICAgICAgIHRoaXMub2ZmKCdzbGlkZVJlc3RvcmVkJywgdGhpcy5wbGF5KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBTdGFydCBhdXRvcGxheVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBwbGF5KCkge1xuICAgICAgICB0aGlzLl9MU04uYXV0b1BsYXkgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04uYXV0b1BsYXkpO1xuICAgICAgICB0aGlzLl9MU04uYXV0b1BsYXkgPSBnbG9iYWwuc2V0VGltZW91dCh0aGlzLnNsaWRlTmV4dC5iaW5kKHRoaXMpLCB0aGlzLmR1cmF0aW9uKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogcGF1c2UgYXV0b3BsYXlcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgcGF1c2UoKSB7XG4gICAgICAgIHRoaXMuX0xTTi5hdXRvUGxheSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5hdXRvUGxheSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE1haW50YWluaW5nIHRoZSBjdXJyZW50IHNjZW5lXG4gICAgICogRGlzYWJsZSB0b3VjaCBldmVudHMsIGV4Y2VwdCBmb3IgdGhlIG5hdGl2ZSBtZXRob2QuXG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIGhvbGQoKSB7XG4gICAgICAgIHRoaXMuaG9sZGluZyA9IHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbGVhc2UgY3VycmVudCBzY2VuZVxuICAgICAqIHVubG9jayBhdCBzYW1lIHRpbWVcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5ob2xkKCkge1xuICAgICAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy51bmxvY2soKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogWW91IGNhbid0IGRvIGFueXRoaW5nIG9uIHRoaXMgc2NlbmVcbiAgICAgKiBsb2NrIG5hdGl2ZSBtZXRob2QgY2FsbHNcbiAgICAgKiBob2xkIGF0IHNhbWUgdGltZVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICBsb2NrKCkge1xuICAgICAgICB0aGlzLmhvbGQoKTtcbiAgICAgICAgdGhpcy5sb2NraW5nID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdW5sb2NrIG5hdGl2ZSBtZXRob2QgY2FsbHNcbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdW5sb2NrKCkge1xuICAgICAgICB0aGlzLmxvY2tpbmcgPSBmYWxzZTtcbiAgICB9O1xuXG59XG5cbndpbmRvd1snaVNsaWRlciddID0gaVNsaWRlcjtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qXG4gKiBAZmlsZSAgIFRvIGNyZWF0ZSByaWdodCZsZWZ0IGJvdHRvbiBvbiBpU2xpZGVyXG4gKiBAYXV0aG9yIHhpZXl1MzMzMzNcbiAqL1xuXG4vL2ltcG9ydCBpU2xpZGVyIGZyb20gJy4uL2lzbGlkZXJfY29yZS5qcyc7XG5cbmNsYXNzIGlTbGlkZXJfQiBleHRlbmRzIGlTbGlkZXIge1xuICAgIGNvbnN0cnVjdG9yKC4uLm9wdHMpIHtcbiAgICAgICAgLy/nm7TmjqXosIPnlKjniLbnsbvmnoTpgKDlmajov5vooYzliJ3lp4vljJZcbiAgICAgICAgc3VwZXIoLi4ub3B0cyk7XG5cbiAgICAgICAgdGhpcyAmJiB0aGlzLnJlZ1BsdWdpbignYnV0dG9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBsZXQgSEFORExFID0gdGhpcztcbiAgICAgICAgICAgIGlmICghSEFORExFLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBsZXQgYnRuT3V0ZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBsZXQgYnRuSW5uZXIgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBidG5PdXRlcltpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4tb3V0ZXInO1xuICAgICAgICAgICAgICAgICAgICBidG5Jbm5lcltpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBidG5Jbm5lcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4taW5uZXInO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgKz0gJyBsZWZ0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgcmlnaHQnO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlyID0gcGFyc2VJbnQodGhpcy5nZXRBdHRyaWJ1dGUoJ2RpcicpLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBIQU5ETEUuc2xpZGVUbyhIQU5ETEUuc2xpZGVJbmRleCArIGRpcik7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmFwcGVuZENoaWxkKGJ0bklubmVyW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgSEFORExFLndyYXAuYXBwZW5kQ2hpbGQoYnRuT3V0ZXJbaV0sIEhBTkRMRS53cmFwLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuXG5cbndpbmRvd1snaVNsaWRlciddID0gaVNsaWRlcl9COyIsIid1c2Ugc3RyaWN0Jztcbi8qXG4gKiBAZmlsZSAgIFRvIGNyZWF0ZSBkb3RzIGluZGV4IG9uIGlTbGlkZXJcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbi8vaW1wb3J0IGlTbGlkZXIgZnJvbSAnLi4vaXNsaWRlcl9jb3JlLmpzJztcblxuY2xhc3MgaVNsaWRlcl9EIGV4dGVuZHMgaVNsaWRlciB7XG4gICAgY29uc3RydWN0b3IoLi4ub3B0cykge1xuICAgICAgICAvL+ebtOaOpeiwg+eUqOeItuexu+aehOmAoOWZqOi/m+ihjOWIneWni+WMllxuICAgICAgICBzdXBlciguLi5vcHRzKTtcblxuICAgICAgICB0aGlzICYmIHRoaXMucmVnUGx1Z2luKCdkb3QnLCBmdW5jdGlvbihvcHRzKSB7XG4gICAgICAgICAgICBsZXQgSEFORExFID0gdGhpcztcbiAgICAgICAgICAgIGlmICghSEFORExFLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICBsZXQgbG9jYXRlID0gKGZ1bmN0aW9uKGxvY2F0ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobG9jYXRlID09PSAncmVsYXRpdmUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gSEFORExFLndyYXA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoQm9vbGVhbihsb2NhdGUubm9kZU5hbWUpICYmIEJvb2xlYW4obG9jYXRlLm5vZGVUeXBlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxvY2F0ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gSEFORExFLndyYXAucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICB9KShvcHRzICYmIG9wdHMubG9jYXRlICE9IG51bGwgPyBvcHRzLmxvY2F0ZSA6IGZhbHNlKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IEhBTkRMRS5kYXRhO1xuICAgICAgICAgICAgICAgIGxldCBkb3RzID0gW107XG4gICAgICAgICAgICAgICAgbGV0IGRvdFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICAgICAgICAgIGRvdFdyYXAuY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90LXdyYXAnO1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlbmRlckRvdHMgPSBmdW5jdGlvbiByZW5kZXJEb3RzKCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZnJlZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90c1tpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLnNldEF0dHJpYnV0ZSgnaW5kZXgnLCBpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09PSBIQU5ETEUuc2xpZGVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHNbaV0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEhBTkRMRS5zbGlkZVRvKHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdpbmRleCcpLCAxMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZyZWdtZW50LmFwcGVuZENoaWxkKGRvdHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvdFdyYXAuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGRvdFdyYXAuYXBwZW5kQ2hpbGQoZnJlZ21lbnQpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICByZW5kZXJEb3RzKCk7XG5cbiAgICAgICAgICAgICAgICBsb2NhdGUuYXBwZW5kQ2hpbGQoZG90V3JhcCk7XG5cbiAgICAgICAgICAgICAgICBIQU5ETEUub24oJ3NsaWRlQ2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghSEFORExFLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdGhpcy5zbGlkZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIEhBTkRMRS5vbigncmVsb2FkRGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICAgICAgICAgICAgICBkb3RzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHJlbmRlckRvdHMoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuXG5cblxud2luZG93WydpU2xpZGVyJ10gPSBpU2xpZGVyX0Q7IiwiJ3VzZSBzdHJpY3QnO1xuLyoqXG4gKiBTdXBwb3J0IDNEIG1hdHJpeCB0cmFuc2xhdGVcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG4vL2ltcG9ydCBpU2xpZGVyIGZyb20gJy4uL2lzbGlkZXJfY29yZS5qcyc7XG5cbmNsYXNzIGlTbGlkZXJfWiBleHRlbmRzIGlTbGlkZXIge1xuICAgIGNvbnN0cnVjdG9yKC4uLm9wdHMpIHtcbiAgICAgICAgLy/nm7TmjqXosIPnlKjniLbnsbvmnoTpgKDlmajov5vooYzliJ3lp4vljJZcbiAgICAgICAgc3VwZXIoLi4ub3B0cyk7XG5cbiAgICAgICAgdmFyIHN0YXJ0SGFuZGxlck9yaWdpbmFsID0gdGhpcy5zdGFydEhhbmRsZXI7XG4gICAgICAgIHZhciBlbmRIYW5kbGVyT3JpZ2luYWwgPSB0aGlzLmVuZEhhbmRsZXI7XG4gICAgICAgIHZhciBtb3ZlSGFuZGxlck9yaWdpbmFsID0gdGhpcy5tb3ZlSGFuZGxlcjtcblxuICAgICAgICB2YXIgaGFzM2QgPSAoJ1dlYktpdENTU01hdHJpeCcgaW4gZ2xvYmFsICYmICdtMTEnIGluIG5ldyBXZWJLaXRDU1NNYXRyaXgoKSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1pbiBzY2FsZVxuICAgICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIG1pblNjYWxlID0gMSAvIDI7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNjZW5lIHZpZXcgcmFuZ2VcbiAgICAgICAgICogQHR5cGUge3t9fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHZpZXdTY29wZSA9IHt9O1xuXG4gICAgICAgIHZhciBjdXJyZW50U2NhbGU7XG5cbiAgICAgICAgdmFyIHpvb21GYWN0b3I7XG5cbiAgICAgICAgdmFyIHpvb21Ob2RlO1xuXG4gICAgICAgIHZhciBzdGFydFRvdWNoZXM7XG5cbiAgICAgICAgdmFyIHN0YXJ0WDtcblxuICAgICAgICB2YXIgc3RhcnRZO1xuXG4gICAgICAgIHZhciBsYXN0VG91Y2hTdGFydDtcblxuICAgICAgICB2YXIgZ2VzdHVyZTtcblxuICAgICAgICB2YXIgSU5fU0NBTEVfTU9ERSA9IGZhbHNlO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZW5lcmF0ZSB0cmFuc2xhdGVcbiAgICAgICAgICogQHBhcmFtIHhcbiAgICAgICAgICogQHBhcmFtIHlcbiAgICAgICAgICogQHBhcmFtIHpcbiAgICAgICAgICogQHBhcmFtIHNjYWxlXG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZVRyYW5zbGF0ZSh4LCB5LCB6LCBzY2FsZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwidHJhbnNsYXRlXCIgKyAoaGFzM2QgPyBcIjNkKFwiIDogXCIoXCIpICsgeCArIFwicHgsXCIgKyB5ICsgKGhhczNkID8gXCJweCxcIiArIHogKyBcInB4KVwiIDogXCJweClcIikgKyBcInNjYWxlKFwiICsgc2NhbGUgKyBcIilcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgZGlzdGFuY2VcbiAgICAgICAgICogQHBhcmFtIGFcbiAgICAgICAgICogQHBhcmFtIGJcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldERpc3RhbmNlKGEsIGIpIHtcbiAgICAgICAgICAgIHZhciB4LCB5O1xuICAgICAgICAgICAgeCA9IGEubGVmdCAtIGIubGVmdDtcbiAgICAgICAgICAgIHkgPSBhLnRvcCAtIGIudG9wO1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUcmFuc2Zvcm0gdG8gc3RyaW5nXG4gICAgICAgICAqIEBwYXJhbSB4XG4gICAgICAgICAqIEBwYXJhbSB5XG4gICAgICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbih4LCB5KSB7XG4gICAgICAgICAgICByZXR1cm4geCArIFwicHggXCIgKyB5ICsgXCJweFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0b3VjaCBwb2ludGVyXG4gICAgICAgICAqIEBwYXJhbSB0b3VjaGVzXG4gICAgICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGdldFRvdWNoZXModG91Y2hlcykge1xuICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRvdWNoZXMpLm1hcChmdW5jdGlvbih0b3VjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHRvdWNoLnBhZ2VZXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHNjYWxlXG4gICAgICAgICAqIEBwYXJhbSBzdGFydFxuICAgICAgICAgKiBAcGFyYW0gZW5kXG4gICAgICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBjYWxjdWxhdGVTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnREaXN0YW5jZSA9IGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICB2YXIgZW5kRGlzdGFuY2UgPSBnZXREaXN0YW5jZShlbmRbMF0sIGVuZFsxXSk7XG4gICAgICAgICAgICByZXR1cm4gZW5kRGlzdGFuY2UgLyBzdGFydERpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBjb21wdXRlZCB0cmFuc2xhdGVcbiAgICAgICAgICogQHBhcmFtIG9ialxuICAgICAgICAgKiBAcmV0dXJucyB7e3RyYW5zbGF0ZVg6IG51bWJlciwgdHJhbnNsYXRlWTogbnVtYmVyLCB0cmFuc2xhdGVaOiBudW1iZXIsIHNjYWxlWDogbnVtYmVyLCBzY2FsZVk6IG51bWJlciwgb2Zmc2V0WDogbnVtYmVyLCBvZmZzZXRZOiBudW1iZXJ9fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUob2JqKSB7XG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IDAsXG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlWTogMCxcbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVaOiAwLFxuICAgICAgICAgICAgICAgIHNjYWxlWDogMSxcbiAgICAgICAgICAgICAgICBzY2FsZVk6IDEsXG4gICAgICAgICAgICAgICAgb2Zmc2V0WDogMCxcbiAgICAgICAgICAgICAgICBvZmZzZXRZOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIG9mZnNldFggPSAwLFxuICAgICAgICAgICAgICAgIG9mZnNldFkgPSAwO1xuICAgICAgICAgICAgaWYgKCFnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZSB8fCAhb2JqKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUob2JqKSxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm0sIG9yaWdpbjtcbiAgICAgICAgICAgIHRyYW5zZm9ybSA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gICAgICAgICAgICBvcmlnaW4gPSBzdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gfHwgc3R5bGUubW96VHJhbnNmb3JtT3JpZ2luO1xuICAgICAgICAgICAgdmFyIHBhciA9IG9yaWdpbi5tYXRjaCgvKC4qKXB4XFxzKyguKilweC8pO1xuICAgICAgICAgICAgaWYgKHBhci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0WCA9IHBhclsxXSAtIDA7XG4gICAgICAgICAgICAgICAgb2Zmc2V0WSA9IHBhclsyXSAtIDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtID09IFwibm9uZVwiKSByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgdmFyIG1hdDNkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICAgICAgICAgICAgdmFyIG1hdDJkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgICAgICAgICAgIGlmIChtYXQzZCkge1xuICAgICAgICAgICAgICAgIHZhciBzdHIgPSBtYXQzZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IHN0clsxMl0gLSAwLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVZOiBzdHJbMTNdIC0gMCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWjogc3RyWzE0XSAtIDAsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFg6IG9mZnNldFggLSAwLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZOiBvZmZzZXRZIC0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVYOiBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZVk6IHN0cls1XSAtIDAsXG4gICAgICAgICAgICAgICAgICAgIHNjYWxlWjogc3RyWzEwXSAtIDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtYXQyZCkge1xuICAgICAgICAgICAgICAgIHZhciBzdHIgPSBtYXQyZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVg6IHN0cls0XSAtIDAsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0cls1XSAtIDAsXG4gICAgICAgICAgICAgICAgICAgIG9mZnNldFg6IG9mZnNldFggLSAwLFxuICAgICAgICAgICAgICAgICAgICBvZmZzZXRZOiBvZmZzZXRZIC0gMCxcbiAgICAgICAgICAgICAgICAgICAgc2NhbGVYOiBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZVk6IHN0clszXSAtIDBcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgY2VudGVyIHBvaW50XG4gICAgICAgICAqIEBwYXJhbSBhXG4gICAgICAgICAqIEBwYXJhbSBiXG4gICAgICAgICAqIEByZXR1cm5zIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0Q2VudGVyKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgeDogKGEueCArIGIueCkgLyAyLFxuICAgICAgICAgICAgICAgIHk6IChhLnkgKyBiLnkpIC8gMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIGluaXRcbiAgICAgICAgICogQHBhcmFtIG9wdHNcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGluaXRab29tKG9wdHMpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTY2FsZSA9IDE7XG4gICAgICAgICAgICB6b29tRmFjdG9yID0gb3B0cyAmJiBvcHRzLnpvb21GYWN0b3IgfHwgMjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdGFydCBldmVudCBoYW5kbGVcbiAgICAgICAgICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gc3RhcnRIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgc3RhcnRIYW5kbGVyT3JpZ2luYWwuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgLy8gbXVzdCBiZSBhIHBpY3R1cmUsIG9ubHkgb25lIHBpY3R1cmUhIVxuICAgICAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmVsc1sxXS5xdWVyeVNlbGVjdG9yKCdpbWc6Zmlyc3QtY2hpbGQnKTtcbiAgICAgICAgICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgICAgIGlmIChkZXZpY2UuaGFzVG91Y2ggJiYgbm9kZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIElOX1NDQUxFX01PREUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSBnZXRDb21wdXRlZFRyYW5zbGF0ZShub2RlKTtcbiAgICAgICAgICAgICAgICBzdGFydFRvdWNoZXMgPSBnZXRUb3VjaGVzKGV2dC50YXJnZXRUb3VjaGVzKTtcbiAgICAgICAgICAgICAgICBzdGFydFggPSB0cmFuc2Zvcm0udHJhbnNsYXRlWCAtIDA7XG4gICAgICAgICAgICAgICAgc3RhcnRZID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVkgLSAwO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTY2FsZSA9IHRyYW5zZm9ybS5zY2FsZVg7XG4gICAgICAgICAgICAgICAgem9vbU5vZGUgPSBub2RlO1xuICAgICAgICAgICAgICAgIHZhciBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFRvdWNoU3RhcnQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hlcyA9IGV2dC50b3VjaGVzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG91Y2hDZW50ZXIgPSBnZXRDZW50ZXIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogdG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRvdWNoZXNbMF0ucGFnZVlcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogdG91Y2hlc1sxXS5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHRvdWNoZXNbMV0ucGFnZVlcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4odG91Y2hDZW50ZXIueCAtIHBvcy5sZWZ0LCB0b3VjaENlbnRlci55IC0gcG9zLnRvcCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRpbWUgPSAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgICAgICBnZXN0dXJlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWUgLSBsYXN0VG91Y2hTdGFydCA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXN0dXJlID0gMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsYXN0VG91Y2hTdGFydCA9IHRpbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vdmUgZXZlbnQgaGFuZGxlXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAgICAgICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVIYW5kbGVyKGV2dCkge1xuICAgICAgICAgICAgaWYgKElOX1NDQUxFX01PREUpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgICAgICAgICAgICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgICAgICAgICBpZiAoZGV2aWNlLmhhc1RvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlSW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxICYmIGN1cnJlbnRTY2FsZSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vdmVJbWFnZS5jYWxsKHRoaXMsIGV2dCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGdlc3R1cmUgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vdmVIYW5kbGVyT3JpZ2luYWwuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERvdWJsZSB0YW8gaGFuZGxlXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZURvdWJsZVRhcChldnQpIHtcbiAgICAgICAgICAgIHZhciB6b29tRmFjdG9yID0gem9vbUZhY3RvciB8fCAyO1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICAgICAgICAgIHZhciBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICAgICAgICAgIGN1cnJlbnRTY2FsZSA9IGN1cnJlbnRTY2FsZSA9PSAxID8gem9vbUZhY3RvciA6IDE7XG4gICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKDAsIDAsIDAsIGN1cnJlbnRTY2FsZSk7XG4gICAgICAgICAgICBpZiAoY3VycmVudFNjYWxlICE9IDEpIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oZXZ0LnRvdWNoZXNbMF0ucGFnZVggLSBwb3MubGVmdCwgZXZ0LnRvdWNoZXNbMF0ucGFnZVkgLSBwb3MudG9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBzY2FsZSBpbWFnZVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBzY2FsZUltYWdlKGV2dCkge1xuICAgICAgICAgICAgdmFyIG1vdmVUb3VjZXMgPSBnZXRUb3VjaGVzKGV2dC50YXJnZXRUb3VjaGVzKTtcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IGNhbGN1bGF0ZVNjYWxlKHN0YXJ0VG91Y2hlcywgbW92ZVRvdWNlcyk7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgICAgICAgICAgc2NhbGUgPSBjdXJyZW50U2NhbGUgKiBzY2FsZSA8IG1pblNjYWxlID8gbWluU2NhbGUgOiBjdXJyZW50U2NhbGUgKiBzY2FsZTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgc2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVuZCBldmVudCBoYW5kbGVcbiAgICAgICAgICogQHBhcmFtIGV2dFxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZW5kSGFuZGxlcihldnQpIHtcbiAgICAgICAgICAgIGlmIChJTl9TQ0FMRV9NT0RFKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKGdlc3R1cmUgPT09IDIpIHsgLy/lj4zmiYvmjIdcbiAgICAgICAgICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZ2VzdHVyZSA9PSAxKSB7IC8v5pS+5aSn5ouW5ou9XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0SW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGdlc3R1cmUgPT09IDMpIHsgLy/lj4zlh7tcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRG91YmxlVGFwKGV2dCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc2V0SW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgSU5fU0NBTEVfTU9ERSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRIYW5kbGVyT3JpZ2luYWwuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERyYWdtb3ZlIGltYWdlXG4gICAgICAgICAqIEBwYXJhbSB7b3BqZWN0fSBldnRcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG1vdmVJbWFnZShldnQpIHtcbiAgICAgICAgICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgICAgICAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgIFg6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc3RhcnRYKSA6IChldnQucGFnZVggLSB0aGlzLnN0YXJ0WCksXG4gICAgICAgICAgICAgICAgWTogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5zdGFydFkpIDogKGV2dC5wYWdlWSAtIHRoaXMuc3RhcnRZKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBtb3ZlT2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgIHg6IHN0YXJ0WCArIG9mZnNldC5YIC0gMCxcbiAgICAgICAgICAgICAgICB5OiBzdGFydFkgKyBvZmZzZXQuWSAtIDBcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKG1vdmVPZmZzZXQueCwgbW92ZU9mZnNldC55LCAwLCBjdXJyZW50U2NhbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCBwb3NpdGlvblxuICAgICAgICAgKiBAcGFyYW0gZWxlbWVudFxuICAgICAgICAgKiBAcmV0dXJucyB7e2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9fVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHtcbiAgICAgICAgICAgICAgICBcImxlZnRcIjogMCxcbiAgICAgICAgICAgICAgICBcInRvcFwiOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgIHBvcy50b3AgKz0gZWxlbWVudC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgICAgICAgICAgICBwb3MubGVmdCArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5vZmZzZXRQYXJlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aGlsZSAoZWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gcG9zO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIHRhcmdldCBpcyBpbiByYW5nZVxuICAgICAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAgICAgKiBAcGFyYW0gdmFsdWVcbiAgICAgICAgICogQHBhcmFtIHRhZ1xuICAgICAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgdmFsdWUsIHRhZykge1xuICAgICAgICAgICAgdmFyIG1pbiwgbWF4O1xuICAgICAgICAgICAgdmFyIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgICAgICAgICAgdmlld1Njb3BlID0ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHBvcy5sZWZ0LFxuICAgICAgICAgICAgICAgICAgICB0b3A6IHBvcy50b3BcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGVuZDoge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0OiBwb3MubGVmdCArIG5vZGUuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHRvcDogcG9zLnRvcCArIG5vZGUuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBzdHIgPSB0YWcgPT0gMSA/IFwibGVmdFwiIDogXCJ0b3BcIjtcbiAgICAgICAgICAgIG1pbiA9IHZpZXdTY29wZS5zdGFydFtzdHJdO1xuICAgICAgICAgICAgbWF4ID0gdmlld1Njb3BlLmVuZFtzdHJdO1xuICAgICAgICAgICAgcmV0dXJuICh2YWx1ZSA+PSBtaW4gJiYgdmFsdWUgPD0gbWF4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0gbm9kZVxuICAgICAgICAgKiBAcGFyYW0gb2JqMVxuICAgICAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAgICAgKi9cbiAgICAgICAgZnVuY3Rpb24gb3ZlckZsb3cobm9kZSwgb2JqMSkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICB2YXIgaXNYMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LmxlZnQsIDEpO1xuICAgICAgICAgICAgdmFyIGlzWDJJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5lbmQubGVmdCwgMSk7XG4gICAgICAgICAgICB2YXIgaXNZMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LnRvcCwgMCk7XG4gICAgICAgICAgICB2YXIgaXNZMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC50b3AsIDApO1xuICAgICAgICAgICAgaWYgKChpc1gxSW4gIT0gaXNYMkluKSAmJiAoaXNZMUluICE9IGlzWTJJbikpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNYMUluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNYMUluICYmIGlzWTFJbikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNYMkluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAzO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICgoaXNYMUluID09IGlzWDJJbikpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzWTFJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gNTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpc1kySW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDY7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIWlzWDFJbiAmJiBpc1gySW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gNztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiAhaXNYMkluKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc1kxSW4gPT0gaXNZMkluID09IGlzWDFJbiA9PSBpc1gySW4pIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSA5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXNldCBpbWFnZVxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiByZXNldEltYWdlKGV2dCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTY2FsZSA9PSAxKSByZXR1cm47XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHpvb21Ob2RlLFxuICAgICAgICAgICAgICAgIGxlZnQsIHRvcCwgdHJhbnMsIHcsIGgsIHBvcywgc3RhcnQsIGVuZCwgcGFyZW50LCBmbG93VGFnO1xuICAgICAgICAgICAgdHJhbnMgPSBnZXRDb21wdXRlZFRyYW5zbGF0ZShub2RlKTtcbiAgICAgICAgICAgIHBhcmVudCA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICAgICAgICAgIHcgPSBub2RlLmNsaWVudFdpZHRoICogdHJhbnMuc2NhbGVYO1xuICAgICAgICAgICAgaCA9IG5vZGUuY2xpZW50SGVpZ2h0ICogdHJhbnMuc2NhbGVYO1xuICAgICAgICAgICAgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgICAgICAgICBzdGFydCA9IHtcbiAgICAgICAgICAgICAgICBsZWZ0OiAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRYICsgcG9zLmxlZnQgKyB0cmFucy50cmFuc2xhdGVYLFxuICAgICAgICAgICAgICAgIHRvcDogKDEgLSB0cmFucy5zY2FsZVgpICogdHJhbnMub2Zmc2V0WSArIHBvcy50b3AgKyB0cmFucy50cmFuc2xhdGVZXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZW5kID0ge1xuICAgICAgICAgICAgICAgIGxlZnQ6IHN0YXJ0LmxlZnQgKyB3LFxuICAgICAgICAgICAgICAgIHRvcDogc3RhcnQudG9wICsgaFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxlZnQgPSBzdGFydC5sZWZ0O1xuICAgICAgICAgICAgdG9wID0gc3RhcnQudG9wO1xuXG4gICAgICAgICAgICBmbG93VGFnID0gb3ZlckZsb3cocGFyZW50LCB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN3aXRjaCAoZmxvd1RhZykge1xuICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3IDwgcGFyZW50LmNsaWVudFdpZHRoKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IHBvcy5sZWZ0IC0gKHRyYW5zLnNjYWxlWCAtIDEpICogbm9kZS5jbGllbnRXaWR0aCAvIDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaCA8IHBhcmVudC5jbGllbnRIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0b3AgPSBwb3MudG9wIC0gKHRyYW5zLnNjYWxlWCAtIDEpICogbm9kZS5jbGllbnRIZWlnaHQgLyAyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjEwMG1zXCI7XG4gICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKHRyYW5zLnRyYW5zbGF0ZVggKyBsZWZ0IC0gc3RhcnQubGVmdCwgdHJhbnMudHJhbnNsYXRlWSArIHRvcCAtIHN0YXJ0LnRvcCwgMCwgdHJhbnMuc2NhbGVYKTtcblxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHRlbmQoe1xuICAgICAgICAgICAgc3RhcnRIYW5kbGVyOiBzdGFydEhhbmRsZXIsXG4gICAgICAgICAgICBtb3ZlSGFuZGxlcjogbW92ZUhhbmRsZXIsXG4gICAgICAgICAgICBlbmRIYW5kbGVyOiBlbmRIYW5kbGVyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVnUGx1Z2luKCd6b29tcGljJywgaW5pdFpvb20pO1xuICAgIH1cbn1cblxud2luZG93WydpU2xpZGVyJ10gPSBpU2xpZGVyX1o7XG5cbiJdfQ==
