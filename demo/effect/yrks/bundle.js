(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _srcIsliderJs = require('../../../src/islider.js');

var _srcIsliderJs2 = _interopRequireDefault(_srcIsliderJs);

require('../../../src/ext/animate.js');

require('../../../src/plugins/button.js');

require('../../../src/plugins/dot.js');

require('../../../src/plugins/zoompic.js');

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
    animateType: 'yrks',
    plugins: [['zoompic', { currentScale: 1, zoomFactor: 2 }]]
});

},{"../../../src/ext/animate.js":2,"../../../src/islider.js":3,"../../../src/plugins/button.js":4,"../../../src/plugins/dot.js":5,"../../../src/plugins/zoompic.js":6}],2:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _isliderJs = require('../islider.js');

var _isliderJs2 = _interopRequireDefault(_isliderJs);

'use strict';

_isliderJs2['default'] && _isliderJs2['default'].extend(_isliderJs2['default']._animateFuncs, {
    // rotate
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
    // flip
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
});

},{"../islider.js":3}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{"../islider.js":3}],5:[function(require,module,exports){
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

},{"../islider.js":3}],6:[function(require,module,exports){
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

},{"../islider.js":3}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L2RlbW8vZWZmZWN0L3lya3MvbWFpbi5qcyIsImQ6L2dpdGh1YkRldmVsb3BtZW50L2lTbGlkZXItSDUvc3JjL2V4dC9hbmltYXRlLmpzIiwiZDovZ2l0aHViRGV2ZWxvcG1lbnQvaVNsaWRlci1INS9zcmMvaXNsaWRlci5qcyIsImQ6L2dpdGh1YkRldmVsb3BtZW50L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvYnV0dG9uLmpzIiwiZDovZ2l0aHViRGV2ZWxvcG1lbnQvaVNsaWRlci1INS9zcmMvcGx1Z2lucy9kb3QuanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL3pvb21waWMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7NEJBRU8seUJBQXlCOzs7O1FBQ3RDLDZCQUE2Qjs7UUFDN0IsZ0NBQWdDOztRQUNoQyw2QkFBNkI7O1FBQzdCLGlDQUFpQzs7QUFFeEMsSUFBSSxJQUFJLEdBQUc7O0FBRVA7QUFDSSxXQUFPLEVBQUUsb0JBQW9CO0NBQ2hDOztBQUVEO0FBQ0ksV0FBTyxFQUFFLG9CQUFvQjtDQUNoQzs7QUFFRDtBQUNJLFdBQU8sRUFBRSxvQkFBb0I7Q0FDaEM7O0FBRUQ7QUFDSSxXQUFPLEVBQUUsb0JBQW9CO0NBQ2hDOztBQUVEO0FBQ0ksV0FBTyxFQUFFLDZFQUE2RTtDQUN6Rjs7QUFFRDtBQUNJLFdBQU8sRUFBRSxDQUFDLFlBQVk7QUFDbEIsWUFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxXQUFHLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMxQixXQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyx3Q0FBd0MsQ0FBQztBQUM3RCxlQUFPLEdBQUcsQ0FBQztLQUNkLENB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bnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyIGZyb20gJy4uLy4uLy4uL3NyYy9pc2xpZGVyLmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL2V4dC9hbmltYXRlLmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL3BsdWdpbnMvYnV0dG9uLmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL3BsdWdpbnMvZG90LmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL3BsdWdpbnMvem9vbXBpYy5qcyc7XG5cbnZhciBsaXN0ID0gW1xuICAgIC8vIHBpY3R1cmVcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6ICcuLi9pbWdzL2ZsaXAvMC5qcGcnXG4gICAgfSxcbiAgICAvLyBwaWN0dXJlXG4gICAge1xuICAgICAgICBjb250ZW50OiAnLi4vaW1ncy9mbGlwLzEuanBnJ1xuICAgIH0sXG4gICAgLy8gcGljdHVyZVxuICAgIHtcbiAgICAgICAgY29udGVudDogJy4uL2ltZ3MvZmxpcC8yLmpwZydcbiAgICB9LFxuICAgIC8vIHBpY3R1cmVcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6ICcuLi9pbWdzL2ZsaXAvMy5qcGcnXG4gICAgfSxcbiAgICAvLyBIVE1MIFN0cmluZ1xuICAgIHtcbiAgICAgICAgY29udGVudDogJzxkaXYgc3R5bGU9XCJmb250LXNpemU6NGVtO2NvbG9yOndoaXRlO3RleHQtYWxpZ246IGNlbnRlclwiPkhUTUwgU3RyaW5nPC9kaXY+J1xuICAgIH0sXG4gICAgLy8gZWxlbWVudFxuICAgIHtcbiAgICAgICAgY29udGVudDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRvbS5pbm5lckhUTUwgPSAnRWxlbWVudCc7XG4gICAgICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6M2VtO2NvbG9yOnJnYigyMzAsIDIzMCwgNjMpOyc7XG4gICAgICAgICAgICByZXR1cm4gZG9tO1xuICAgICAgICB9KSgpXG4gICAgfSxcbiAgICAvLyBmcmFnbWVudFxuICAgIHtcbiAgICAgICAgY29udGVudDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBmcmFnID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZG9tLmlubmVySFRNTCA9ICdGcmFnbWVudCc7XG4gICAgICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6M2VtO2NvbG9yOnJnYigyMzAsIDYzLCAyMzApOyc7XG4gICAgICAgICAgICBmcmFnLmFwcGVuZENoaWxkKGRvbSk7XG4gICAgICAgICAgICByZXR1cm4gZnJhZztcbiAgICAgICAgfSkoKVxuICAgIH0sXG4gICAgLy8gZG9tXG4gICAge1xuICAgICAgICBjb250ZW50OiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaGlkZGVuLXNwYWNlID4gcCcpXG4gICAgfVxuXTtcblxudmFyIFMgPSBuZXcgaVNsaWRlcih7XG4gICAgZG9tOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaVNsaWRlci13cmFwcGVyJyksXG4gICAgZGF0YTogbGlzdCxcbiAgICBpc1ZlcnRpY2FsOiB0cnVlLFxuICAgIGlzTG9vcGluZzogMSxcbiAgICBpc092ZXJzcHJlYWQ6IDEsXG4gICAgYW5pbWF0ZVRpbWU6IDgwMCxcbiAgICBhbmltYXRlVHlwZTogJ3lya3MnLFxuICAgIHBsdWdpbnM6IFtbJ3pvb21waWMnLCB7Y3VycmVudFNjYWxlOjEsem9vbUZhY3RvcjogMn1dXSxcbn0pO1xuXG5cblxuXG5cblxuIiwiLypcbiAqIEBmaWxlICAgQW5pbWF0aW9uIExpYnJhcnlcbiAqIEBhdXRob3IgeGlleXUzMzMzM1xuICovXG5cbi8qICDor7TmmI7vvJpcbi8vZG9tIOihqOekuuWKqOeUu+eahOWFg+e0oOiKgueCuVxuLy9heGlzIOihqOekuuWKqOeUu+aWueWQke+8jOWIhuWIq+S4uiBYIOWSjCBZIOaWueWQkVxuLy9zY2FsZSDlsY/luZXpq5jluqZcbi8vaSA9PSAwIOihqOekuiBpc2xpZGVyLXByZXYsIGkgPT0gMSDooajnpLogaXNsaWRlci1hY3RpdmUsIGkgPT0gMiDooajnpLogaXNsaWRlci1uZXh0LFxuLy9vZmZzZXQgPiAwIOihqOekuueahOaYr+WQkeS4iuaIluWQkeWPs+eahOa7keWKqOaWueWQke+8jG9mZnNldCA8IDAg6KGo56S655qE5piv5ZCR5LiL5oiW5ZCR5bem55qE5ruR5Yqo5pa55ZCRLm9mZnNldCDnmoTlgLzooajnpLrmiYvmjIflnKjlsY/luZXkuIrmu5HliqjnmoTot53nprvvvIznu53lr7nlgLzotorlpKfooajnpLrmu5HliqjnmoTot53nprvotorplb/jgIJcbi8vb3Bwb3NpdGUg5Yik5pat5piv5ZCm5Zyo5omn6KGMIOWQkeS4i+aIluWQkeW3pueahOmAhuaWueWQkea7keWKqFxuKiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyIGZyb20gJy4uL2lzbGlkZXIuanMnO1xuXG4ndXNlIHN0cmljdCc7XG5cbmlTbGlkZXIgJiYgaVNsaWRlci5leHRlbmQoaVNsaWRlci5fYW5pbWF0ZUZ1bmNzLCB7XG4gICAgLy8gcm90YXRlXG4gICAgJ3JvdGF0ZSc6IGZ1bmN0aW9uIHJvdGF0ZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICB2YXIgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICB2YXIgYmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMud3JhcC5wYXJlbnROb2RlLCBudWxsKS5iYWNrZ3JvdW5kQ29sb3I7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0IDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47IC13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOyAnICsgJ2JhY2tncm91bmQtY29sb3I6JyArIGJkQ29sb3IgKyAnOyBwb3NpdGlvbjphYnNvbHV0ZTsnO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyA5MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSArICdkZWcpIHRyYW5zbGF0ZVooJyArICgwLjg4OCAqIHNjYWxlIC8gMikgKyAncHgpIHNjYWxlKDAuODg4KSc7XG4gICAgfSxcbiAgICAvLyBmbGlwXG4gICAgJ2ZsaXAnOiBmdW5jdGlvbiBmbGlwKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICB2YXIgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIHZhciBiZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy53cmFwLnBhcmVudE5vZGUsIG51bGwpLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgb2Zmc2V0ID0gLW9mZnNldDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAncG9zaXRpb246YWJzb2x1dGU7IC13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eTpoaWRkZW47IGJhY2tncm91bmQtY29sb3I6JyArIGJkQ29sb3IgKyAnOyc7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWignICsgKHNjYWxlIC8gMikgKyAncHgpIHJvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyAxODAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkgKyAnZGVnKSBzY2FsZSgwLjg3NSknO1xuICAgIH0sXG4gICAgJ2RlcHRoJzogZnVuY3Rpb24gZGVwdGgoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciB6b29tU2NhbGUgPSAoNCAtIE1hdGguYWJzKGkgLSAxKSkgKiAwLjE4O1xuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG4gICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSA9PT0gMSkgPyAxMDAgOiAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpIDogKGkgLSAxKTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgMS4zICogc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH0sXG4gICAgJ2Zsb3cnOiBmdW5jdGlvbiBmbG93KGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICB2YXIgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICB2YXIgcm90YXRlRGlyZWN0ID0gKGF4aXMgPT09ICdYJykgPyAnWScgOiAnWCc7XG4gICAgICAgIHZhciBkaXJlY3RBbWVuZCA9IChheGlzID09PSAnWCcpID8gMSA6IC0xO1xuICAgICAgICB2YXIgb2Zmc2V0UmF0aW8gPSBNYXRoLmFicyhvZmZzZXQgLyBzY2FsZSk7XG5cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgOiAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKDAuNywgMC43KSB0cmFuc2xhdGVaKCcgKyAob2Zmc2V0UmF0aW8gKiAxNTAgLSAxNTApICogTWF0aC5hYnMoaSAtIDEpICsgJ3B4KScgKyAndHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknICsgJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyBkaXJlY3RBbWVuZCAqICgzMCAtIG9mZnNldFJhdGlvICogMzApICogKDEgLSBpKSArICdkZWcpJztcbiAgICB9LFxuICAgICdjYXJkJzogZnVuY3Rpb24gY2FyZChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwIDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb20uY3VyICYmIGRvbS5jdXIgIT09IGkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IG51bGw7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG4gICAgICAgIHZhciB6b29tU2NhbGUgPSAoZG9tLmN1cikgPyAxIC0gMC4yICogTWF0aC5hYnMoaSAtIDEpIC0gTWF0aC5hYnMoMC4yICogb2Zmc2V0IC8gc2NhbGUpLnRvRml4ZWQoNikgOiAxO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArICgoMSArIE1hdGguYWJzKGkgLSAxKSAqIDAuMikgKiBvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfSxcbiAgICAnZmFkZSc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSBvZmZzZXQgLyBzY2FsZTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+aZleafk+aJqeaVo1xuICAgICd5cmtzJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGRvbS5jdXIgPSAyO1xuXG4gICAgICAgIC8v5q2j5ZCRXG4gICAgICAgIGZ1bmN0aW9uIGZvcndhcmQoKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAxICsgKG9mZnNldCAvIHNjYWxlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAtb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+WPjeWQkVxuICAgICAgICBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wcG9zaXRlKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1ciA9PT0gMSkgPyAxIDogMjtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCknO1xuICAgIH0sXG5cbiAgICAvL+S4reW/g+aUvuWkp1xuICAgICd6eGZkJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGRvbS5jdXIgPSAwLjE7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y+N5ZCRXG4gICAgICAgIGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3Bwb3NpdGUpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1ciA9PT0gMSkgPyAxIDogMC4xO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSc7XG4gICAgfSxcblxuICAgIC8v5riQ6ZqQ5raI5aSxXG4gICAgJ2p5eHMnOiBmdW5jdGlvbiBmYWRlKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gLW9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsgLy/mraPopoHooqvmmL7npLrnmoTpobXpnaJcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgKyAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSAtIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wcG9zaXRlKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoMHB4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKDBweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvL+W5s+a7keenu+WHulxuICAgICdwaHljJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+WPjeWQkVxuICAgICAgICBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkgeyAvL+ato+imgeiiq+aYvuekuueahOmhtemdolxuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgIGlmIChpIDwgMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAob3Bwb3NpdGUpIHtcbiAgICAgICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKDBweCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/kuIrkuIvmu5HliqhcbiAgICAnc3hoZCc6IGZ1bmN0aW9uKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAob2Zmc2V0ID4gMCkgPyAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwIDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkb20uY3VyICYmIGRvbS5jdXIgIT09IGkpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IG51bGw7XG4gICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHpvb21TY2FsZSA9IChkb20uY3VyKSA/IDEgLSAwLjggKiBNYXRoLmFicyhpIC0gMSkgLSBNYXRoLmFicygwLjggKiBvZmZzZXQgLyBzY2FsZSkudG9GaXhlZCg2KSA6IDE7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKCgxICsgTWF0aC5hYnMoaSAtIDEpICogMC4yKSAqIG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9LFxuXG4gICAgLy/ljaHniYfnv7vpobVcbiAgICAna3BmeSc6IGZ1bmN0aW9uKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCwgb3Bwb3NpdGUpIHtcbiAgICAgICAgbGV0IGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgbGV0IHJvdGF0ZURpcmVjdCwgZGlyZWN0aW9uLCBmb3J3YXJkTW9yZUNzc1RleHQsIHJldmVyc2VNb3JlQ3NzVGV4dDtcbiAgICAgICAgaWYgKGF4aXMgPT09ICdYJykge1xuICAgICAgICAgICAgcm90YXRlRGlyZWN0ID0gJ1knO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgICAgIGZvcndhcmRNb3JlQ3NzVGV4dCA9ICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IHJpZ2h0IDUwJSAwcHg7JztcbiAgICAgICAgICAgIHJldmVyc2VNb3JlQ3NzVGV4dCA9ICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IGxlZnQgNTAlIDBweDsnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcm90YXRlRGlyZWN0ID0gJ1gnO1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgICBmb3J3YXJkTW9yZUNzc1RleHQgPSAnLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiA1MCUgYm90dG9tIDBweDsnO1xuICAgICAgICAgICAgcmV2ZXJzZU1vcmVDc3NUZXh0ID0gJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogNTAlIHRvcCAwcHg7JztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOy13ZWJraXQtdHJhbnNmb3JtLXN0eWxlOnByZXNlcnZlLTNkOyAnICsgJyBwb3NpdGlvbjphYnNvbHV0ZTsnICsgZm9yd2FyZE1vcmVDc3NUZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsgLy/mraPopoHooqvmmL7npLrnmoTpobXpnaJcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsgJyArICcgcG9zaXRpb246YWJzb2x1dGU7JyArIHJldmVyc2VNb3JlQ3NzVGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyAoZGlyZWN0aW9uICogOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wcG9zaXRlKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygwZGVnKSAnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgKGRpcmVjdGlvbiAqIDkwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpKSArICdkZWcpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKCcgKyAoZGlyZWN0aW9uICogOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkpICsgJ2RlZyknO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoMGRlZykgJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxufSk7IiwiLyoqXG4gKiBBIHNpbXBsZSwgZWZmaWNlbnQgbW9iaWxlIHNsaWRlciBzb2x1dGlvblxuICogQGZpbGUgaVNsaWRlci5qc1xuICogQGF1dGhvciBCRS1GRSBUZWFtXG4gKiAgICBxYmF0eSBxYmF0eS5xaUBnbWFpbC5jb21cbiAqICAgIHhpZXl1MzMzMzMgeGlleXUzMzMzM0BnbWFpbC5jb21cbiAqICAgIHNoaW5hdGUgc2hpbmUud2FuZ3JzQGdtYWlsLmNvbVxuICpcbiAqIEBMSUNFTlNFIGh0dHBzOi8vZ2l0aHViLmNvbS9CRS1GRS9pU2xpZGVyL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ2hlY2sgaW4gYXJyYXlcbiAqIEBwYXJhbSBvRWxlbWVudFxuICogQHBhcmFtIGFTb3VyY2VcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpbkFycmF5KG9FbGVtZW50LCBhU291cmNlKSB7XG4gICAgcmV0dXJuIGFTb3VyY2UuaW5kZXhPZihvRWxlbWVudCkgPiAtMTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaXMgYXJyYXlcbiAqIEBwYXJhbSBvXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNBcnJheShvKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbi8qKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGNsc1xuICogQHJldHVybnMge0FycmF5fHtpbmRleDogbnVtYmVyLCBpbnB1dDogc3RyaW5nfX1cbiAqL1xuZnVuY3Rpb24gaGFzQ2xhc3Mob2JqLCBjbHMpIHtcbiAgICByZXR1cm4gb2JqLmNsYXNzTmFtZS5tYXRjaChuZXcgUmVnRXhwKCcoXFxcXHN8XiknICsgY2xzICsgJyhcXFxcc3wkKScpKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY2xzXG4gKi9cbmZ1bmN0aW9uIGFkZENsYXNzKG9iaiwgY2xzKSB7XG4gICAgaWYgKCFoYXNDbGFzcyhvYmosIGNscykpIHtcbiAgICAgICAgb2JqLmNsYXNzTmFtZSArPSAnICcgKyBjbHM7XG4gICAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjbHNcbiAqL1xuZnVuY3Rpb24gcmVtb3ZlQ2xhc3Mob2JqLCBjbHMpIHtcbiAgICBpZiAoaGFzQ2xhc3Mob2JqLCBjbHMpKSB7XG4gICAgICAgIG9iai5jbGFzc05hbWUgPSBvYmouY2xhc3NOYW1lLnJlcGxhY2UoUmVnRXhwKCcoXFxcXHN8XiknICsgY2xzICsgJyhcXFxcc3wkKScpLCAnJyk7XG4gICAgfVxufVxuXG4vKipcbiAqIENoZWNjayBpcyB1cmxcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBpc1VybCh1cmwpIHtcbiAgICBpZiAoLzxcXC8/W14+XSo+L2cudGVzdCh1cmwpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgcmVnZXggPSAnXicgK1xuICAgICAgICAnKCgoaHR0cHN8aHR0cHxmdHB8cnRzcHxtbXMpOik/Ly8pPycgK1xuICAgICAgICAnKChbMC05YS16XyF+KlxcJygpLiY9KyQlLV0rOiApP1swLTlhLXpfIX4qXFwnKCkuJj0rJCUtXStAKT8nICtcbiAgICAgICAgJygoWzAtOV17MSwzfS4pezN9WzAtOV17MSwzfXwoWzAtOWEtel8hfipcXCcoKS1dKy4pKihbMC05YS16XVswLTlhLXotXXswLDYxfSk/WzAtOWEtel0uW2Etel17Miw2fSk/JyArXG4gICAgICAgICcoOlswLTldezEsNH0pPycgK1xuICAgICAgICAnKFteXFw/I10rKT8nICtcbiAgICAgICAgJyhcXFxcXFw/W14jXSspPycgK1xuICAgICAgICAnKCMuKyk/JyArXG4gICAgICAgICckJztcbiAgICByZXR1cm4gbmV3IFJlZ0V4cChyZWdleCkudGVzdCh1cmwpO1xufVxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICpcbiAqIGlTbGljZXIoW1t7RWxlbWVudH0gY29udGFpbmVyLF0ge0FycmF5fSBkYXRhbGlzdCxdIHtvYmplY3R9IG9wdGlvbnMpXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7QXJyYXl9IGRhdGFsaXN0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uc1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogIG9wdGlvbnMuZG9tID4gY29udGFpbmVyXG4gKiAgb3B0aW9ucy5kYXRhID4gZGF0YWxpc3RcbiAqL1xudmFyIGlTbGlkZXIgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAwLCAzKTtcbiAgICBpZiAoIWFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUGFyYW1ldGVycyByZXF1aXJlZCEnKTtcbiAgICB9XG5cbiAgICB2YXIgb3B0cyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmdzLnNsaWNlKC0xKVswXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gYXJncy5wb3AoKSA6IHt9O1xuXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBvcHRzLmRhdGEgPSBvcHRzLmRhdGEgfHwgYXJnc1sxXTtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgb3B0cy5kb20gPSBvcHRzLmRvbSB8fCBhcmdzWzBdO1xuICAgIH1cblxuICAgIGlmICghb3B0cy5kb20pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb250YWluZXIgY2FuIG5vdCBiZSBlbXB0eSEnKTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdHMuZGF0YSB8fCAhb3B0cy5kYXRhLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGEgbXVzdCBiZSBhbiBhcnJheSBhbmQgbXVzdCBoYXZlIG1vcmUgdGhhbiBvbmUgZWxlbWVudCEnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25zXG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9vcHRzID0gb3B0cztcblxuICAgIC8qKlxuICAgICAqIGxpc3RlbmVyXG4gICAgICogQHR5cGUge3t9fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fTFNOID0ge307XG5cbiAgICAvKipcbiAgICAgKiBFdmVudCBoYW5kbGVcbiAgICAgKiBAdHlwZSB7e319XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9FdmVudEhhbmRsZSA9IHt9O1xuXG4gICAgb3B0cyA9IGFyZ3MgPSBudWxsO1xuXG4gICAgdGhpcy5fc2V0dGluZygpO1xuXG4gICAgdGhpcy5maXJlKCdpbml0aWFsaXplJyk7XG4gICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgIHRoaXMuX2luaXRQbHVnaW5zKCk7XG4gICAgdGhpcy5fYmluZEhhbmRsZXIoKTtcbn07XG5cbi8qKlxuICogRXZlbnQgd2hpdGUgbGlzdFxuICogQHR5cGUge0FycmF5fVxuICogQHByb3RlY3RlZFxuICovXG5pU2xpZGVyLkVWRU5UUyA9ICdpbml0aWFsaXplIHNsaWRlIHNsaWRlU3RhcnQgc2xpZGVFbmQgc2xpZGVDaGFuZ2Ugc2xpZGVDaGFuZ2VkIHNsaWRlUmVzdG9yZSBzbGlkZVJlc3RvcmVkIHJlbG9hZERhdGEgcmVzZXQgZGVzdHJveScuc3BsaXQoJyAnKTtcblxuLyoqXG4gKiBFYXNpbmcgd2hpdGUgbGlzdFxuICogQHR5cGUgW0FycmF5LCBSZWdFeHBbXV1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlci5FQVNJTkcgPSBbXG4gICAgJ2xpbmVhciBlYXNlIGVhc2UtaW4gZWFzZS1vdXQgZWFzZS1pbi1vdXQnLnNwbGl0KCcgJyksXG4gICAgL2N1YmljLWJlemllclxcKChbXlxcZF0qKFxcZCsuP1xcZCopW15cXCxdKlxcLD8pezR9XFwpL1xuXTtcblxuLyoqXG4gKiBUQUdTIHdoaXRlbGlzdCBvbiBmaXhwYWdlIG1vZGVcbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlci5GSVhfUEFHRV9UQUdTID0gJ1NFTEVDVCBJTlBVVCBURVhUQVJFQSBCVVRUT04gTEFCRUwnLnNwbGl0KCcgJyk7XG5cbi8qKlxuICogVGhlIGVtcHR5IGZ1bmN0aW9uXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyLkVNUFRZX0ZVTkNUSU9OID0gZnVuY3Rpb24oKSB7fTtcblxuLyoqXG4gKiBFeHRlbmRcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlci5leHRlbmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWFpbiwgZXh0ZW5kLCBhcmdzID0gYXJndW1lbnRzO1xuXG4gICAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIG1haW4gPSBpU2xpZGVyLnByb3RvdHlwZTtcbiAgICAgICAgICAgIGV4dGVuZCA9IGFyZ3NbMF07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgbWFpbiA9IGFyZ3NbMF07XG4gICAgICAgICAgICBleHRlbmQgPSBhcmdzWzFdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gZXh0ZW5kKSB7XG4gICAgICAgIGlmIChleHRlbmQuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgICBtYWluW3Byb3BlcnR5XSA9IGV4dGVuZFtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIFBsdWdpbnNcbiAqIEB0eXBlIHt7fX1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlci5wbHVnaW5zID0ge307XG5cbi8qKlxuICogQHBhcmFtIG5hbWVcbiAqIEBwYXJhbSBwbHVnaW5cbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlci5yZWdQbHVnaW4gPSBmdW5jdGlvbihuYW1lLCBwbHVnaW4pIHtcbiAgICBpU2xpZGVyLnBsdWdpbnNbbmFtZV0gPSBpU2xpZGVyLnBsdWdpbnNbbmFtZV0gfHwgcGx1Z2luO1xufTtcblxuLyoqXG4gKiBhbmltYXRpb24gcGFybWFzOlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZG9tIOWbvueJh+eahOWkluWxgjxsaT7lrrnlmaggSW1nIHdyYXBwZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBheGlzIOWKqOeUu+aWueWQkSBhbmltYXRlIGRpcmVjdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxlIOWuueWZqOWuveW6piBPdXRlciB3cmFwcGVyXG4gKiBAcGFyYW0ge051bWJlcn0gaSA8bGk+5a655ZmoaW5kZXggSW1nIHdyYXBwZXIncyBpbmRleFxuICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldCDmu5Hliqjot53nprsgbW92ZSBkaXN0YW5jZVxuICogQHByb3RlY3RlZFxuICovXG5pU2xpZGVyLl9hbmltYXRlRnVuY3MgPSB7XG4gICAgJ2RlZmF1bHQnOiBmdW5jdGlvbihkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9XG59O1xuXG4vKipcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyLl90cmFuc2l0aW9uRW5kRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGV2dE5hbWU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoZXZ0TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIGV2dE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZUVsZW1lbnQnKTtcbiAgICAgICAgdmFyIHRyYW5zaXRpb25zID0ge1xuICAgICAgICAgICAgdHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICAgT1RyYW5zaXRpb246ICdvVHJhbnNpdGlvbkVuZCcsXG4gICAgICAgICAgICBNb3pUcmFuc2l0aW9uOiAndHJhbnNpdGlvbmVuZCcsXG4gICAgICAgICAgICBXZWJraXRUcmFuc2l0aW9uOiAnd2Via2l0VHJhbnNpdGlvbkVuZCdcbiAgICAgICAgfTtcbiAgICAgICAgZm9yICh2YXIgdCBpbiB0cmFuc2l0aW9ucykge1xuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb25zLmhhc093blByb3BlcnR5KHQpICYmIGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGV2dE5hbWUgPSB0cmFuc2l0aW9uc1t0XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xufSkoKTtcblxuLyoqXG4gKiBUaGlzIGlzIGEgYWxpYXMsIGNvbmR1Y2l2ZSB0byBjb21wcmVzc2lvblxuICogQHR5cGUge09iamVjdH1cbiAqL1xudmFyIGlTbGlkZXJQcm90b3R5cGUgPSBpU2xpZGVyLnByb3RvdHlwZTtcblxuLyoqXG4gKiAmIGlTbGlkZXIuZXh0ZW5kXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuZXh0ZW5kID0gaVNsaWRlci5leHRlbmQ7XG5cbi8qKlxuICogc2V0dGluZyBwYXJhbWV0ZXJzIGZvciBzbGlkZXJcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX3NldHRpbmcgPSBmdW5jdGlvbigpIHtcblxuICAgIC8qKlxuICAgICAqIFRoZSBwbHVnaW5zXG4gICAgICogQHR5cGUge0FycmF5fHt9fCp9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9wbHVnaW5zID0gaVNsaWRlci5wbHVnaW5zO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAdHlwZSB7e2RlZmF1bHQ6IEZ1bmN0aW9ufXwqfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fYW5pbWF0ZUZ1bmNzID0gaVNsaWRlci5fYW5pbWF0ZUZ1bmNzO1xuXG4gICAgLyoqXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5sb2NraW5nID0gZmFsc2U7XG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIC0gU2V0IG9wdGlvbnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRzO1xuXG4gICAgLyoqXG4gICAgICogZG9tIGVsZW1lbnQgd3JhcHBpbmcgY29udGVudFxuICAgICAqIEB0eXBlIHtFbGVtZW50fVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLndyYXAgPSBvcHRzLmRvbTtcblxuICAgIC8qKlxuICAgICAqIERhdGEgbGlzdFxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5kYXRhID0gb3B0cy5kYXRhO1xuXG4gICAgLyoqXG4gICAgICogZGVmYXVsdCBzbGlkZSBkaXJlY3Rpb25cbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5pc1ZlcnRpY2FsID0gISFvcHRzLmlzVmVydGljYWw7XG5cbiAgICAvKipcbiAgICAgKiBPdmVyc3ByZWFkIG1vZGVcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5pc092ZXJzcHJlYWQgPSAhIW9wdHMuaXNPdmVyc3ByZWFkO1xuXG4gICAgLyoqXG4gICAgICogUGxheSB0aW1lIGdhcFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuZHVyYXRpb24gPSBvcHRzLmR1cmF0aW9uIHx8IDIwMDA7XG5cbiAgICAvKipcbiAgICAgKiBzdGFydCBmcm9tIGluaXRJbmRleCBvciAwXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5pbml0SW5kZXggPSBvcHRzLmluaXRJbmRleCA+IDAgJiYgb3B0cy5pbml0SW5kZXggPCBvcHRzLmRhdGEubGVuZ3RoIC0gMSA/IG9wdHMuaW5pdEluZGV4IDogMDtcblxuICAgIC8qKlxuICAgICAqIHRvdWNoc3RhcnQgcHJldmVudCBkZWZhdWx0IHRvIGZpeFBhZ2VcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5maXhQYWdlID0gb3B0cy5maXhQYWdlID09IG51bGwgPyB0cnVlIDogISFvcHRzLmZpeFBhZ2U7XG5cbiAgICAvKipcbiAgICAgKiBzbGlkZUluZGV4XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuc2xpZGVJbmRleCA9IHRoaXMuc2xpZGVJbmRleCB8fCB0aGlzLmluaXRJbmRleCB8fCAwO1xuXG4gICAgLyoqXG4gICAgICogQXhpc1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuYXhpcyA9IHRoaXMuaXNWZXJ0aWNhbCA/ICdZJyA6ICdYJztcblxuICAgIC8qKlxuICAgICAqIHJldmVyc2VBeGlzXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMucmV2ZXJzZUF4aXMgPSB0aGlzLmF4aXMgPT09ICdZJyA/ICdYJyA6ICdZJztcblxuICAgIC8qKlxuICAgICAqIFdyYXBwZXIgd2lkdGhcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy53aWR0aCA9IHRoaXMud3JhcC5jbGllbnRXaWR0aDtcblxuICAgIC8qKlxuICAgICAqIFdyYXBwZXIgaGVpZ2h0XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuaGVpZ2h0ID0gdGhpcy53cmFwLmNsaWVudEhlaWdodDtcblxuICAgIC8qKlxuICAgICAqIFJhdGlvIGhlaWdodDp3aWR0aFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnJhdGlvID0gdGhpcy5oZWlnaHQgLyB0aGlzLndpZHRoO1xuXG4gICAgLyoqXG4gICAgICogU2NhbGUsIHNpemUgcnVsZVxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnNjYWxlID0gdGhpcy5pc1ZlcnRpY2FsID8gdGhpcy5oZWlnaHQgOiB0aGlzLndpZHRoO1xuXG4gICAgLyoqXG4gICAgICogT24gc2xpZGUgb2Zmc2V0IHBvc2l0aW9uXG4gICAgICogQHR5cGUge3tYOiBudW1iZXIsIFk6IG51bWJlcn19XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLm9mZnNldCA9IHRoaXMub2Zmc2V0IHx8IHtcbiAgICAgICAgWDogMCxcbiAgICAgICAgWTogMFxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUvZGlzYWJsZSB0b3VjaCBldmVudHNcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuaXNUb3VjaGFibGUgPSBvcHRzLmlzVG91Y2hhYmxlID09IG51bGwgPyB0cnVlIDogISFvcHRzLmlzVG91Y2hhYmxlO1xuXG4gICAgLyoqXG4gICAgICogbG9vcGluZyBsb2dpYyBhZGp1c3RcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuaXNMb29waW5nID0gb3B0cy5pc0xvb3BpbmcgJiYgdGhpcy5kYXRhLmxlbmd0aCA+IDEgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBBdXRvUGxheSB3YWl0dGluZyBtaWxzZWNvbmQgdG8gc3RhcnRcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5kZWxheSA9IG9wdHMuZGVsYXkgfHwgMDtcblxuICAgIC8qKlxuICAgICAqIGF1dG9wbGF5IGxvZ2ljIGFkanVzdFxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5pc0F1dG9wbGF5ID0gb3B0cy5pc0F1dG9wbGF5ICYmIHRoaXMuZGF0YS5sZW5ndGggPiAxID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQW5pbWF0ZSB0eXBlXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuYW5pbWF0ZVR5cGUgPSBvcHRzLmFuaW1hdGVUeXBlIGluIHRoaXMuX2FuaW1hdGVGdW5jcyA/IG9wdHMuYW5pbWF0ZVR5cGUgOiAnZGVmYXVsdCc7XG5cbiAgICAvKipcbiAgICAgKiBAcHJvdGVjdGVkXG4gICAgICovXG4gICAgdGhpcy5fYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuY3NbdGhpcy5hbmltYXRlVHlwZV07XG5cbiAgICAvLyBsaXR0bGUgdHJpY2sgc2V0LCB3aGVuIHlvdSBjaG9vY2UgdGVhciAmIHZlcnRpY2FsIHNhbWUgdGltZVxuICAgIC8vIGlTbGlkZXIgb3ZlcnNwcmVhZCBtb2RlIHdpbGwgYmUgc2V0IHRydWUgYXV0b21ldGljbHlcbiAgICBpZiAodGhpcy5pc1ZlcnRpY2FsICYmIHRoaXMuYW5pbWF0ZVR5cGUgPT09ICdjYXJkJykge1xuICAgICAgICB0aGlzLmlzT3ZlcnNwcmVhZCA9IHRydWU7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVidWcgbW9kZVxuICAgICAqIEB0eXBlIHtmdW5jdGlvbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubG9nID0gb3B0cy5pc0RlYnVnID8gZnVuY3Rpb24oKSB7XG4gICAgICAgIGdsb2JhbC5jb25zb2xlLmxvZy5hcHBseShnbG9iYWwuY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICB9IDogaVNsaWRlci5FTVBUWV9GVU5DVElPTjtcblxuICAgIC8vIHNldCBEYW1waW5nIGZ1bmN0aW9uXG4gICAgdGhpcy5fc2V0VXBEYW1waW5nKCk7XG5cbiAgICAvLyBzdG9wIGF1dG9wbGF5IHdoZW4gd2luZG93IGJsdXJcbiAgICAvLyB0aGlzLl9zZXRQbGF5V2hlbkZvY3VzKCk7XG5cbiAgICAvKipcbiAgICAgKiBhbmltYXRlIHByb2Nlc3MgdGltZSAobXMpLCBkZWZhdWx0OiAzMDBtc1xuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuYW5pbWF0ZVRpbWUgPSBvcHRzLmFuaW1hdGVUaW1lICE9IG51bGwgJiYgb3B0cy5hbmltYXRlVGltZSA+IC0xID8gb3B0cy5hbmltYXRlVGltZSA6IDMwMDtcblxuICAgIC8qKlxuICAgICAqIGFuaW1hdGUgZWZmZWN0cywgZGVmYXVsdDogZWFzZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuYW5pbWF0ZUVhc2luZyA9XG4gICAgICAgIGluQXJyYXkob3B0cy5hbmltYXRlRWFzaW5nLCBpU2xpZGVyLkVBU0lOR1swXSkgfHwgaVNsaWRlci5FQVNJTkdbMV0udGVzdChvcHRzLmFuaW1hdGVFYXNpbmcpID8gb3B0cy5hbmltYXRlRWFzaW5nIDogJ2Vhc2UnO1xuXG4gICAgLyoqXG4gICAgICogSW4gc2xpZGUgYW5pbWF0aW9uXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuaW5BbmltYXRlID0gMDtcblxuICAgIC8qKlxuICAgICAqIEZpeCB0b3VjaC9tb3VzZSBldmVudHNcbiAgICAgKiBAdHlwZSB7e2hhc1RvdWNoLCBzdGFydEV2dCwgbW92ZUV2dCwgZW5kRXZ0fX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZGV2aWNlRXZlbnRzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaGFzVG91Y2ggPSAhISgoJ29udG91Y2hzdGFydCcgaW4gZ2xvYmFsKSB8fCBnbG9iYWwuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIGdsb2JhbC5Eb2N1bWVudFRvdWNoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhc1RvdWNoOiBoYXNUb3VjaCxcbiAgICAgICAgICAgIHN0YXJ0RXZ0OiBoYXNUb3VjaCA/ICd0b3VjaHN0YXJ0JyA6ICdtb3VzZWRvd24nLFxuICAgICAgICAgICAgbW92ZUV2dDogaGFzVG91Y2ggPyAndG91Y2htb3ZlJyA6ICdtb3VzZW1vdmUnLFxuICAgICAgICAgICAgZW5kRXZ0OiBoYXNUb3VjaCA/ICd0b3VjaGVuZCcgOiAnbW91c2V1cCdcbiAgICAgICAgfTtcbiAgICB9KSgpO1xuXG4gICAgLyoqXG4gICAgICogSW5pdCBldmVudHNcbiAgICAgKiBAdHlwZSB7e319XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmV2ZW50cyA9IHt9O1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAtIFJlZ2lzdGVyIGV2ZW50c1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbiAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHlvdXIgZmluZ2VyIGlzIG1vdmluZ1xuICAgIHRoaXMub24oJ3NsaWRlJywgb3B0cy5vbnNsaWRlLCAxKTtcblxuICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4geW91ciBmaW5nZXIgdG91Y2ggdGhlIHNjcmVlblxuICAgIHRoaXMub24oJ3NsaWRlU3RhcnQnLCBvcHRzLm9uc2xpZGVzdGFydCwgMSk7XG5cbiAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBmaW5nZXIgbW92ZSBvdXQgb2YgdGhlIHNjcmVlblxuICAgIHRoaXMub24oJ3NsaWRlRW5kJywgb3B0cy5vbnNsaWRlZW5kLCAxKTtcblxuICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gc2xpZGUgdG8gbmV4dC9wcmV2IHNjZW5lXG4gICAgdGhpcy5vbignc2xpZGVDaGFuZ2UnLCBvcHRzLm9uc2xpZGVjaGFuZ2UsIDEpO1xuXG4gICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBuZXh0L3ByZXYgc2NlbmUsIHdoaWxlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgdGhpcy5vbignc2xpZGVDaGFuZ2VkJywgb3B0cy5vbnNsaWRlY2hhbmdlZCwgMSk7XG5cbiAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHJlc3RvcmUgdG8gdGhlIGN1cnJlbnQgc2NlbmVcbiAgICB0aGlzLm9uKCdzbGlkZVJlc3RvcmUnLCBvcHRzLm9uc2xpZGVyZXN0b3JlLCAxKTtcblxuICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gcmVzdG9yZSB0byB0aGUgY3VycmVudCBzY2VuZSwgd2hpbGUgYW5pbWF0aW9uIGhhcyBjb21wbGV0ZWRcbiAgICB0aGlzLm9uKCdzbGlkZVJlc3RvcmVkJywgb3B0cy5vbnNsaWRlcmVzdG9yZWQsIDEpO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAtIFBsdWdpbnNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLyoqXG4gICAgICogQHR5cGUge29iamVjdH1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMucGx1Z2luQ29uZmlnID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoaXNBcnJheShvcHRzLnBsdWdpbnMpKSB7XG4gICAgICAgICAgICB2YXIgY29uZmlnID0ge307XG4gICAgICAgICAgICBvcHRzLnBsdWdpbnMuZm9yRWFjaChmdW5jdGlvbiBwbHVnaW5Db25maWdFYWNoKHBsdWdpbikge1xuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5KHBsdWdpbikpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnW3BsdWdpblswXV0gPSBwbHVnaW4uc2xpY2UoMSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGx1Z2luID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBjb25maWdbcGx1Z2luXSA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB7fVxuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIC8vIEF1dG9wbGF5IG1vZGVcbiAgICB0aGlzLmRlbGF5ID8gZ2xvYmFsLnNldFRpbWVvdXQodGhpcy5fYXV0b1BsYXkuYmluZCh0aGlzKSwgdGhpcy5kZWxheSkgOiB0aGlzLl9hdXRvUGxheSgpO1xufTtcblxuLyoqXG4gKiBJbml0IHBsdWdpbnNcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX2luaXRQbHVnaW5zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbmZpZyA9IHRoaXMucGx1Z2luQ29uZmlnO1xuICAgIHZhciBwbHVnaW5zID0gdGhpcy5fcGx1Z2lucztcbiAgICBmb3IgKHZhciBpIGluIGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLmhhc093blByb3BlcnR5KGkpICYmIHBsdWdpbnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgIHRoaXMubG9nKCdbSU5JVCBQTFVHSU5dOicsIGksIHBsdWdpbnNbaV0pO1xuICAgICAgICAgICAgcGx1Z2luc1tpXSAmJiB0eXBlb2YgcGx1Z2luc1tpXSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgcGx1Z2luc1tpXS5hcHBseSAmJiBwbHVnaW5zW2ldLmFwcGx5KHRoaXMsIGNvbmZpZ1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIGVuYWJsZSBkYW1waW5nIHdoZW4gc2xpZGVyIG1lZXQgdGhlIGVkZ2VcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX3NldFVwRGFtcGluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbmVJbjIgPSB0aGlzLnNjYWxlID4+IDE7XG4gICAgdmFyIG9uZUluNCA9IG9uZUluMiA+PiAxO1xuICAgIHZhciBvbmVJbjE2ID0gb25lSW40ID4+IDI7XG5cbiAgICAvKipcbiAgICAgKiBpbml0IGRhbXBpbmcgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0gZGlzdGFuY2VcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX2RhbXBpbmcgPSBmdW5jdGlvbihkaXN0YW5jZSkge1xuICAgICAgICB2YXIgZGlzID0gTWF0aC5hYnMoZGlzdGFuY2UpO1xuICAgICAgICB2YXIgcmVzdWx0O1xuXG4gICAgICAgIGlmIChkaXMgPCBvbmVJbjIpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IGRpcyA+PiAxO1xuICAgICAgICB9IGVsc2UgaWYgKGRpcyA8IG9uZUluMiArIG9uZUluNCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgKChkaXMgLSBvbmVJbjIpID4+IDIpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0ID0gb25lSW40ICsgb25lSW4xNiArICgoZGlzIC0gb25lSW4yIC0gb25lSW40KSA+PiAzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkaXN0YW5jZSA+IDAgPyByZXN1bHQgOiAtcmVzdWx0O1xuICAgIH07XG59O1xuXG4vKipcbiAqIEdldCBpdGVtIHR5cGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleFxuICogQHJldHVybnMge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX2l0ZW1UeXBlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmICghaXNOYU4oaXRlbSkpIHtcbiAgICAgICAgaXRlbSA9IHRoaXMuZGF0YVtpdGVtXTtcbiAgICB9XG4gICAgaWYgKGl0ZW0uaGFzT3duUHJvcGVydHkoJ3R5cGUnKSkge1xuICAgICAgICByZXR1cm4gaXRlbS50eXBlO1xuICAgIH1cbiAgICB2YXIgY29udGVudCA9IGl0ZW0uY29udGVudDtcbiAgICB2YXIgdHlwZTtcbiAgICBpZiAoY29udGVudCA9PSBudWxsKSB7XG4gICAgICAgIHR5cGUgPSAnZW1wdHknO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChCb29sZWFuKGNvbnRlbnQubm9kZU5hbWUpICYmIEJvb2xlYW4oY29udGVudC5ub2RlVHlwZSkpIHtcbiAgICAgICAgICAgIHR5cGUgPSAnbm9kZSc7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBpZiAoaXNVcmwoY29udGVudCkpIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ3BpYyc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHR5cGUgPSAnaHRtbCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0eXBlID0gJ3Vua25vd24nO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXRlbS50eXBlID0gdHlwZTtcblxuICAgIHJldHVybiB0eXBlO1xufTtcblxuLyoqXG4gKiByZW5kZXIgc2luZ2xlIGl0ZW0gaHRtbCBieSBpZHhcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsIC4uXG4gKiBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4ICAuLlxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fcmVuZGVySXRlbSA9IGZ1bmN0aW9uKGVsLCBkYXRhSW5kZXgpIHtcblxuICAgIHZhciBpdGVtLFxuICAgICAgICBzZWxmID0gdGhpcyxcbiAgICAgICAgbGVuID0gdGhpcy5kYXRhLmxlbmd0aDtcblxuICAgIHZhciBpbnNlcnRJbWcgPSBmdW5jdGlvbiByZW5kZXJJdGVtSW5zZXJ0SW1nKCkge1xuICAgICAgICB2YXIgc2ltZyA9ICcgc3JjPVwiJyArIGl0ZW0uY29udGVudCArICdcIic7XG4gICAgICAgIC8vIGF1dG8gc2NhbGUgdG8gZnVsbCBzY3JlZW5cbiAgICAgICAgaWYgKGl0ZW0uaGVpZ2h0IC8gaXRlbS53aWR0aCA+IHNlbGYucmF0aW8pIHtcbiAgICAgICAgICAgIHNpbWcgKz0gJyBoZWlnaHQ9XCIxMDAlXCInO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2ltZyArPSAnIHdpZHRoPVwiMTAwJVwiJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2VsZi5pc092ZXJzcHJlYWQpIHtcbiAgICAgICAgICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAndXJsKCcgKyBpdGVtLmNvbnRlbnQgKyAnKSBuby1yZXBlYXQgNTAlIDUwJS9jb3Zlcic7XG4gICAgICAgICAgICBzaW1nICs9ICcgc3R5bGU9XCJkaXNwbGF5OmJsb2NrO29wYWNpdHk6MDtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlO1wiJ1xuICAgICAgICB9XG4gICAgICAgIC8vIGZvciByaWdodCBidXR0b24sIHNhdmUgcGljdHVyZVxuICAgICAgICBlbC5pbm5lckhUTUwgPSAnPGltZycgKyBzaW1nICsgJyAvPic7XG4gICAgfTtcblxuICAgIC8vIGNsZWFuIHNjZW5lXG4gICAgZWwuaW5uZXJIVE1MID0gJyc7XG4gICAgZWwuc3R5bGUuYmFja2dyb3VuZCA9ICcnO1xuXG4gICAgLy8gZ2V0IHRoZSByaWdodCBpdGVtIG9mIGRhdGFcbiAgICBpZiAoIXRoaXMuaXNMb29waW5nICYmIHRoaXMuZGF0YVtkYXRhSW5kZXhdID09IG51bGwpIHtcbiAgICAgICAgLy8gU3RvcCBzbGlkZSB3aGVuIGl0ZW0gaXMgZW1wdHlcbiAgICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFJbmRleCA9IChsZW4gLyogKiBNYXRoLmNlaWwoTWF0aC5hYnMoZGF0YUluZGV4IC8gbGVuKSkqLyArIGRhdGFJbmRleCkgJSBsZW47XG4gICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbZGF0YUluZGV4XTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHRoaXMuX2l0ZW1UeXBlKGl0ZW0pO1xuXG4gICAgdGhpcy5sb2coJ1tSZW5kZXIgSVRFTV06JywgdHlwZSwgZGF0YUluZGV4LCBpdGVtKTtcblxuICAgIGVsLmNsYXNzTmFtZSA9ICdpc2xpZGVyLScgKyB0eXBlO1xuXG4gICAgc3dpdGNoICh0eXBlKSB7XG4gICAgICAgIGNhc2UgJ3BpYyc6XG4gICAgICAgICAgICBpZiAoaXRlbS5sb2FkID09PSAyKSB7XG4gICAgICAgICAgICAgICAgaW5zZXJ0SW1nKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50SW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgY3VycmVudEltZy5zcmMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgY3VycmVudEltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5oZWlnaHQgPSBjdXJyZW50SW1nLmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS53aWR0aCA9IGN1cnJlbnRJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmxvYWQgPSAyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZG9tJzpcbiAgICAgICAgY2FzZSAnaHRtbCc6XG4gICAgICAgICAgICBlbC5pbm5lckhUTUwgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnbm9kZSc6XG4gICAgICAgIGNhc2UgJ2VsZW1lbnQnOlxuICAgICAgICAgICAgLy8gZnJhZ21lbnQsIGNyZWF0ZSBjb250YWluZXJcbiAgICAgICAgICAgIGlmIChpdGVtLmNvbnRlbnQubm9kZVR5cGUgPT09IDExKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVudGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIGVudGl0eS5hcHBlbmRDaGlsZChpdGVtLmNvbnRlbnQpO1xuICAgICAgICAgICAgICAgIGl0ZW0uY29udGVudCA9IGVudGl0eTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGl0ZW0uY29udGVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIGRvIG5vdGhpbmdcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIHRoaXMuZmlyZSgncmVuZGVyQ29tcGxldGUnKTtcbn07XG5cbi8qKlxuICogUG9zdHBvbmluZyB0aGUgaW50ZXJtZWRpYXRlIHNjZW5lIHJlbmRlcmluZ1xuICogdW50aWwgdGhlIHRhcmdldCBzY2VuZSBpcyBjb21wbGV0ZWx5IHJlbmRlcmVkIChyZW5kZXIgaW4gZXZlbnQgc2xpZGVDaGFuZ2VkKVxuICogdG8gYXZvaWQgYSBqdW1weSBmZWVsIHdoZW4gc3dpdGNoaW5nIGJldHdlZW4gc2NlbmVzXG4gKiBnaXZlbiB0aGF0IHRoZSBkaXN0YW5jZSBvZiBzbGlkaW5nIGlzIG1vcmUgdGhhbiAxLlxuICogZS5nLiBgYGB0aGlzLnNsaWRlVG8oPistMSlgYGBcbiAqXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9yZW5kZXJJbnRlcm1lZGlhdGVTY2VuZSA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbmRlckl0ZW0uYXBwbHkodGhpcywgdGhpcy5faW50ZXJtZWRpYXRlU2NlbmUpO1xuICAgICAgICB0aGlzLl9pbnRlcm1lZGlhdGVTY2VuZSA9IG51bGw7XG4gICAgfVxufTtcblxuLyoqXG4gKiBBcHBseSBzdHlsZXMgb24gY2hhbmdlZFxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fY2hhbmdlZFN0eWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzbGlkZVN0eWxlcyA9IFsnaXNsaWRlci1wcmV2JywgJ2lzbGlkZXItYWN0aXZlJywgJ2lzbGlkZXItbmV4dCddO1xuICAgIHRoaXMuZWxzLmZvckVhY2goZnVuY3Rpb24gY2hhbmdlU3R5cGVFYWNoKGVsLCBpbmRleCkge1xuICAgICAgICByZW1vdmVDbGFzcyhlbCwgJygnICsgc2xpZGVTdHlsZXMuam9pbignfCcpICsgJyknKTtcbiAgICAgICAgYWRkQ2xhc3MoZWwsIHNsaWRlU3R5bGVzW2luZGV4XSlcbiAgICB9KTtcbn07XG5cbi8qKlxuICogcmVuZGVyIGxpc3QgaHRtbFxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fcmVuZGVyV3JhcHBlciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMub3V0ZXIgJiYgKHRoaXMub3V0ZXIuaW5uZXJIVE1MID0gJycpO1xuICAgIC8vIGluaXRhaWwgdWwgZWxlbWVudFxuICAgIHZhciBvdXRlciA9IHRoaXMub3V0ZXIgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBvdXRlci5jbGFzc05hbWUgPSAnaXNsaWRlci1vdXRlcic7XG5cbiAgICAvLyBzdG9yYWdlIGxpIGVsZW1lbnRzLCBvbmx5IHN0b3JlIDMgZWxlbWVudHMgdG8gcmVkdWNlIG1lbW9yeSB1c2FnZVxuICAgIC8qKlxuICAgICAqIFNsaWRlciBlbGVtZW50cyB4M1xuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy5lbHMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgIHRoaXMuZWxzLnB1c2gobGkpO1xuXG4gICAgICAgIC8vIHByZXBhcmUgc3R5bGUgYW5pbWF0aW9uXG4gICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGxpLCB0aGlzLmF4aXMsIHRoaXMuc2NhbGUsIGksIDApO1xuXG4gICAgICAgIC8vIGF1dG8gb3ZlcmZsb3cgaW4gbm9uZSBmaXhQYWdlIG1vZGVcbiAgICAgICAgaWYgKCF0aGlzLmZpeFBhZ2UpIHtcbiAgICAgICAgICAgIGxpLnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pc1ZlcnRpY2FsICYmICh0aGlzLmFuaW1hdGVUeXBlID09PSAncm90YXRlJyB8fCB0aGlzLmFuaW1hdGVUeXBlID09PSAnZmxpcCcpID8gdGhpcy5fcmVuZGVySXRlbShsaSwgMSAtIGkgKyB0aGlzLnNsaWRlSW5kZXgpIDogdGhpcy5fcmVuZGVySXRlbShsaSwgaSAtIDEgKyB0aGlzLnNsaWRlSW5kZXgpO1xuXG4gICAgICAgIG91dGVyLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jaGFuZ2VkU3R5bGVzKCk7XG5cbiAgICAvLyBQcmVsb2FkIHBpY3R1cmUgWyBtYXkgYmUgcGljIDopIF1cbiAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5fcHJlbG9hZEltZyh0aGlzLnNsaWRlSW5kZXgpO1xuICAgIH0uYmluZCh0aGlzKSwgMjAwKTtcblxuICAgIC8vIGFwcGVuZCB1bCB0byBkaXYjY2FudmFzXG4gICAgaWYgKCF0aGlzLm91dGVyKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgICAgICogQHB1YmxpY1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5vdXRlciA9IG91dGVyO1xuICAgICAgICB0aGlzLndyYXAuYXBwZW5kQ2hpbGQob3V0ZXIpO1xuICAgIH1cbn07XG5cbi8qKlxuICogUHJlbG9hZCBpbWcgd2hlbiBzbGlkZUNoYW5nZVxuICogRnJvbSBjdXJyZW50IGluZGV4ICsyLCAtMiBzY2VuZVxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGFJbmRleCBtZWFucyB3aGljaCBpbWFnZSB3aWxsIGJlIGxvYWRcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX3ByZWxvYWRJbWcgPSBmdW5jdGlvbihkYXRhSW5kZXgpIHtcbiAgICBpZiAodGhpcy5kYXRhLmxlbmd0aCA+IDMpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIHZhciBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgbG9hZEltZyA9IGZ1bmN0aW9uIHByZWxvYWRJbWdMb2FkaW5nUHJvY2VzcyhpbmRleCkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkYXRhW2luZGV4XTtcbiAgICAgICAgICAgIGlmIChzZWxmLl9pdGVtVHlwZShpdGVtKSA9PT0gJ3BpYycgJiYgIWl0ZW0ubG9hZCkge1xuICAgICAgICAgICAgICAgIHZhciBwcmVsb2FkSW1nID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICAgICAgcHJlbG9hZEltZy5zcmMgPSBpdGVtLmNvbnRlbnQ7XG4gICAgICAgICAgICAgICAgcHJlbG9hZEltZy5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS53aWR0aCA9IHByZWxvYWRJbWcud2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gcHJlbG9hZEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ubG9hZCA9IDI7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpdGVtLmxvYWQgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGxvYWRJbWcoKGRhdGFJbmRleCArIDIpICUgbGVuKTtcbiAgICAgICAgbG9hZEltZygoZGF0YUluZGV4IC0gMiArIGxlbikgJSBsZW4pO1xuICAgIH1cbn07XG5cbi8qKlxuICogV2F0Y2ggZXZlbnQgdHJhbnNpdGlvbkVuZFxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fd2F0Y2hUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24odGltZSwgZXZlbnRUeXBlKSB7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIHZhciBsc247XG4gICAgdGhpcy5sb2coJ0V2ZW50OicsICd3YXRjaFRyYW5zaXRpb25FbmQ6OnN0dWNrOjpwaWxlJywgdGhpcy5pbkFuaW1hdGUpO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlKGV2dCkge1xuICAgICAgICBpZiAobHNuKSB7XG4gICAgICAgICAgICBnbG9iYWwuY2xlYXJUaW1lb3V0KGxzbik7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZi5pbkFuaW1hdGUtLTtcbiAgICAgICAgc2VsZi5sb2coJ0V2ZW50OicsICd3YXRjaFRyYW5zaXRpb25FbmQ6OnN0dWNrOjpyZWxlYXNlJywgc2VsZi5pbkFuaW1hdGUpO1xuICAgICAgICBpZiAoc2VsZi5pbkFuaW1hdGUgPT09IDApIHtcbiAgICAgICAgICAgIC8vc2VsZi5pbkFuaW1hdGUgPSAwO1xuICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ3NsaWRlQ2hhbmdlZCcpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9jaGFuZ2VkU3R5bGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmZpcmUuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgICAgICAgICBzZWxmLl9yZW5kZXJJbnRlcm1lZGlhdGVTY2VuZSgpO1xuICAgICAgICB9XG4gICAgICAgIHVuV2F0Y2goKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gdW5XYXRjaCgpIHtcbiAgICAgICAgc2VsZi5lbHMuZm9yRWFjaChmdW5jdGlvbiB0cmFuc2xhdGlvbkVuZFVud2F0Y2hFYWNoKGVsKSB7XG4gICAgICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKGlTbGlkZXIuX3RyYW5zaXRpb25FbmRFdmVudCgpLCBoYW5kbGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgc2VsZi5pc0FuaW1hdGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aW1lID4gMCkge1xuICAgICAgICBzZWxmLmVscy5mb3JFYWNoKGZ1bmN0aW9uIHRyYW5zbGF0aW9uRW5kRWxzRWFjaChlbCkge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihpU2xpZGVyLl90cmFuc2l0aW9uRW5kRXZlbnQoKSwgaGFuZGxlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxzbiA9IGdsb2JhbC5zZXRUaW1lb3V0KGhhbmRsZSwgdGltZSk7XG4gICAgc2VsZi5pbkFuaW1hdGUrKztcbn07XG5cbi8qKlxuICogYmluZCBhbGwgZXZlbnQgaGFuZGxlciwgd2hlbiBvbiBQQywgZGlzYWJsZSBkcmFnIGV2ZW50XG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9iaW5kSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXRlciA9IHRoaXMub3V0ZXI7XG5cbiAgICBpZiAodGhpcy5pc1RvdWNoYWJsZSkge1xuICAgICAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgICAgIGlmICghZGV2aWNlLmhhc1RvdWNoKSB7XG4gICAgICAgICAgICBvdXRlci5zdHlsZS5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgICAgICAvLyBkaXNhYmxlIGRyYWdcbiAgICAgICAgICAgIG91dGVyLm9uZHJhZ3N0YXJ0ID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2dCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5lbmRFdnQsIHRoaXMpO1xuICAgICAgICAhdGhpcy5kZXZpY2VFdmVudHMuaGFzVG91Y2ggJiYgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzKTtcbiAgICB9XG5cbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcyk7XG5cbiAgICAvLyBGaXggYW5kcm9pZCBkZXZpY2VcbiAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLCBmYWxzZSk7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzLCBmYWxzZSk7XG59O1xuXG4vKipcbiAqICBVbmlmb3JtaXR5IGFkbWluIGV2ZW50XG4gKiAgRXZlbnQgcm91dGVyXG4gKiAgQHBhcmFtIHtvYmplY3R9IGV2dCBldmVudCBvYmplY3RcbiAqICBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbihldnQpIHtcbiAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgc3dpdGNoIChldnQudHlwZSkge1xuICAgICAgICBjYXNlICdtb3VzZWRvd24nOlxuICAgICAgICAgICAgLy8gYmxvY2sgbW91c2UgYnV0dG9ucyBleGNlcHQgbGVmdFxuICAgICAgICAgICAgaWYgKGV2dC5idXR0b24gIT09IDApIGJyZWFrO1xuICAgICAgICBjYXNlICd0b3VjaHN0YXJ0JzpcbiAgICAgICAgICAgIHRoaXMuc3RhcnRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBkZXZpY2UubW92ZUV2dDpcbiAgICAgICAgICAgIHRoaXMubW92ZUhhbmRsZXIoZXZ0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIGRldmljZS5lbmRFdnQ6XG4gICAgICAgIGNhc2UgJ21vdXNlb3V0JzogLy8gbW91c2VvdXQgZXZlbnQsIHRyaWdnZXIgZW5kRXZlbnRcbiAgICAgICAgY2FzZSAndG91Y2hjYW5jZWwnOlxuICAgICAgICAgICAgdGhpcy5lbmRIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnb3JpZW50YXRpb25jaGFuZ2UnOlxuICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmb2N1cyc6XG4gICAgICAgICAgICB0aGlzLl9hdXRvUGxheSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2JsdXInOlxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3Jlc2l6ZSc6XG4gICAgICAgICAgICB0aGlzLnJlc2l6ZUhhbmRsZXIoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbn07XG5cbi8qKlxuICogIHRvdWNoc3RhcnQgY2FsbGJhY2tcbiAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICogIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5zdGFydEhhbmRsZXIgPSBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAodGhpcy5maXhQYWdlKSB7XG4gICAgICAgIGlmIChpU2xpZGVyLkZJWF9QQUdFX1RBR1MuaW5kZXhPZihldnQudGFyZ2V0LnRhZ05hbWUpIDwgMCkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRoaXMuaG9sZGluZyB8fCB0aGlzLmxvY2tpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgdGhpcy5pc01vdmluZyA9IHRydWU7XG4gICAgdGhpcy5wYXVzZSgpO1xuXG4gICAgdGhpcy5sb2coJ0V2ZW50OiBzdGFydCcpO1xuICAgIHRoaXMuZmlyZSgnc2xpZGVTdGFydCcsIGV2dCwgdGhpcyk7XG5cbiAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHRoaXMuc3RhcnRYID0gZGV2aWNlLmhhc1RvdWNoID8gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBldnQucGFnZVg7XG4gICAgdGhpcy5zdGFydFkgPSBkZXZpY2UuaGFzVG91Y2ggPyBldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGV2dC5wYWdlWTtcbn07XG5cbi8qKlxuICogIHRvdWNobW92ZSBjYWxsYmFja1xuICogIEBwYXJhbSB7b2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gKiAgQHByb3RlY3RlZFxuICovXG5pU2xpZGVyUHJvdG90eXBlLm1vdmVIYW5kbGVyID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmlzTW92aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5sb2coJ0V2ZW50OiBtb3ZpbmcnKTtcbiAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgdmFyIGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG4gICAgdmFyIGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgdmFyIHJldmVyc2VBeGlzID0gdGhpcy5yZXZlcnNlQXhpcztcbiAgICB2YXIgb2Zmc2V0ID0ge1xuICAgICAgICBYOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLnN0YXJ0WCkgOiAoZXZ0LnBhZ2VYIC0gdGhpcy5zdGFydFgpLFxuICAgICAgICBZOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLnN0YXJ0WSkgOiAoZXZ0LnBhZ2VZIC0gdGhpcy5zdGFydFkpXG4gICAgfTtcblxuICAgIHRoaXMub2Zmc2V0ID0gb2Zmc2V0O1xuXG4gICAgaWYgKE1hdGguYWJzKG9mZnNldFtheGlzXSkgLSBNYXRoLmFicyhvZmZzZXRbcmV2ZXJzZUF4aXNdKSA+IDEwKSB7XG5cbiAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdGhpcy5maXJlKCdzbGlkZScsIGV2dCwgdGhpcyk7XG5cbiAgICAgICAgaWYgKCF0aGlzLmlzTG9vcGluZykge1xuICAgICAgICAgICAgaWYgKG9mZnNldFtheGlzXSA+IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSAwIHx8IG9mZnNldFtheGlzXSA8IDAgJiYgdGhpcy5zbGlkZUluZGV4ID09PSBsZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0W2F4aXNdID0gdGhpcy5fZGFtcGluZyhvZmZzZXRbYXhpc10pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5lbHNbaV07XG4gICAgICAgICAgICBpdGVtLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSAnYWxsIDBzJztcbiAgICAgICAgICAgIHRoaXMuX2FuaW1hdGVGdW5jKGl0ZW0sIGF4aXMsIHRoaXMuc2NhbGUsIGksIG9mZnNldFtheGlzXSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqICB0b3VjaGVuZCBjYWxsYmFja1xuICogIEBwYXJhbSB7T2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gKiAgQHByb3RlY3RlZFxuICovXG5pU2xpZGVyUHJvdG90eXBlLmVuZEhhbmRsZXIgPSBmdW5jdGlvbihldnQpIHtcbiAgICBpZiAoIXRoaXMuaXNNb3ZpbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmxvZygnRXZlbnQ6IGVuZCcpO1xuICAgIHRoaXMuaXNNb3ZpbmcgPSBmYWxzZTtcbiAgICB2YXIgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdmFyIGF4aXMgPSB0aGlzLmF4aXM7XG4gICAgdmFyIGJvdW5kYXJ5ID0gdGhpcy5zY2FsZSAvIDI7XG4gICAgdmFyIGVuZFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgIC8vIGEgcXVpY2sgc2xpZGUgdGltZSBtdXN0IHVuZGVyIDMwMG1zXG4gICAgLy8gYSBxdWljayBzbGlkZSBzaG91bGQgYWxzbyBzbGlkZSBhdCBsZWFzdCAxNCBweFxuICAgIGJvdW5kYXJ5ID0gZW5kVGltZSAtIHRoaXMuc3RhcnRUaW1lID4gMzAwID8gYm91bmRhcnkgOiAxNDtcblxuICAgIHZhciBhYnNPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXRbYXhpc10pO1xuICAgIHZhciBhYnNSZXZlcnNlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0W3RoaXMucmV2ZXJzZUF4aXNdKTtcblxuICAgIHZhciBnZXRMaW5rID0gZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgaWYgKGVsLnRhZ05hbWUgPT09ICdBJykge1xuICAgICAgICAgICAgaWYgKGVsLmhyZWYpIHtcbiAgICAgICAgICAgICAgICBnbG9iYWwubG9jYXRpb24uaHJlZiA9IGVsLmhyZWZcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoZWwuY2xhc3NOYW1lICE9PSAnaXNsaWRlci1waWMnKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBnZXRMaW5rKGVsLnBhcmVudE5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5sb2coYm91bmRhcnksIG9mZnNldFtheGlzXSwgYWJzT2Zmc2V0LCBhYnNSZXZlcnNlT2Zmc2V0LCB0aGlzKTtcblxuICAgIGlmIChvZmZzZXRbYXhpc10gPj0gYm91bmRhcnkgJiYgYWJzUmV2ZXJzZU9mZnNldCA8IGFic09mZnNldCkge1xuICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4IC0gMSk7XG4gICAgfSBlbHNlIGlmIChvZmZzZXRbYXhpc10gPCAtYm91bmRhcnkgJiYgYWJzUmV2ZXJzZU9mZnNldCA8IGFic09mZnNldCkge1xuICAgICAgICB0aGlzLnNsaWRlVG8odGhpcy5zbGlkZUluZGV4ICsgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCk7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRlIHRhcCBldmVudCBpZiBvZmZzZXQgPCAxMFxuICAgIGlmIChNYXRoLmFicyh0aGlzLm9mZnNldC5YKSA8IDEwICYmIE1hdGguYWJzKHRoaXMub2Zmc2V0LlkpIDwgMTApIHtcbiAgICAgICAgdGhpcy50YXBFdnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgdGhpcy50YXBFdnQuaW5pdEV2ZW50KCd0YXAnLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgaWYgKHRoaXMuZml4UGFnZSkge1xuICAgICAgICAgICAgZXZ0LnRhcmdldCAmJiBnZXRMaW5rKGV2dC50YXJnZXQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXZ0LnRhcmdldC5kaXNwYXRjaEV2ZW50KHRoaXMudGFwRXZ0KSkge1xuICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLm9mZnNldC5YID0gdGhpcy5vZmZzZXQuWSA9IDA7XG5cbiAgICB0aGlzLl9hdXRvUGxheSgpO1xuXG4gICAgdGhpcy5maXJlKCdzbGlkZUVuZCcsIGV2dCwgdGhpcyk7XG59O1xuXG4vKipcbiAqICBvcmllbnRhdGlvbmNoYW5nZSBjYWxsYmFja1xuICogIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5vcmllbnRhdGlvbmNoYW5nZUhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5yZXNldCgpO1xuICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IG9yaWVudGF0aW9uY2hhbmdlJyk7XG4gICAgfS5iaW5kKHRoaXMpLCAxMDApO1xufTtcblxuLyoqXG4gKiByZXNpemUgY2FsbGJhY2tcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5yZXNpemVIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuaGVpZ2h0ICE9PSB0aGlzLndyYXAuY2xpZW50SGVpZ2h0IHx8IHRoaXMud2lkdGggIT09IHRoaXMud3JhcC5jbGllbnRXaWR0aCkge1xuICAgICAgICB0aGlzLl9MU04ucmVzaXplICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLnJlc2l6ZSk7XG4gICAgICAgIHRoaXMuX0xTTi5yZXNpemUgPSBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgICAgIHRoaXMubG9nKCdFdmVudDogcmVzaXplJyk7XG4gICAgICAgICAgICB0aGlzLl9MU04ucmVzaXplICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLnJlc2l6ZSk7XG4gICAgICAgIH0uYmluZCh0aGlzKSwgNTAwKTtcbiAgICB9XG59O1xuXG4vKipcbiAqICBzbGlkZSBsb2dpY2FsLCBnb3RvIGRhdGEgaW5kZXhcbiAqICBAcGFyYW0ge251bWJlcn0gZGF0YUluZGV4IHRoZSBnb3RvIGluZGV4XG4gKiAgQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnNsaWRlVG8gPSBmdW5jdGlvbihkYXRhSW5kZXgsIG9wdHMpIHtcbiAgICBpZiAodGhpcy5sb2NraW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy51bmhvbGQoKTtcbiAgICB2YXIgYW5pbWF0ZVRpbWUgPSB0aGlzLmFuaW1hdGVUaW1lO1xuICAgIHZhciBhbmltYXRlVHlwZSA9IHRoaXMuYW5pbWF0ZVR5cGU7XG4gICAgdmFyIGFuaW1hdGVGdW5jID0gdGhpcy5fYW5pbWF0ZUZ1bmM7XG4gICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgdmFyIGVscyA9IHRoaXMuZWxzO1xuICAgIHZhciBpZHggPSBkYXRhSW5kZXg7XG4gICAgdmFyIG4gPSBkYXRhSW5kZXggLSB0aGlzLnNsaWRlSW5kZXg7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBldmVudFR5cGU7XG5cbiAgICBpZiAodHlwZW9mIG9wdHMgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChvcHRzLmFuaW1hdGVUaW1lID4gLTEpIHtcbiAgICAgICAgICAgIGFuaW1hdGVUaW1lID0gb3B0cy5hbmltYXRlVGltZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIG9wdHMuYW5pbWF0ZVR5cGUgPT09ICdzdHJpbmcnICYmIG9wdHMuYW5pbWF0ZVR5cGUgaW4gdGhpcy5fYW5pbWF0ZUZ1bmNzKSB7XG4gICAgICAgICAgICBhbmltYXRlVHlwZSA9IG9wdHMuYW5pbWF0ZVR5cGU7XG4gICAgICAgICAgICBhbmltYXRlRnVuYyA9IHRoaXMuX2FuaW1hdGVGdW5jc1thbmltYXRlVHlwZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbiB0aGUgc2xpZGUgcHJvY2VzcywgYW5pbWF0ZSB0aW1lIGlzIHNxdWVlemVkXG4gICAgdmFyIHNxdWVlemVUaW1lID0gTWF0aC5hYnMob2Zmc2V0W3RoaXMuYXhpc10pIC8gdGhpcy5zY2FsZSAqIGFuaW1hdGVUaW1lO1xuXG4gICAgaWYgKE1hdGguYWJzKG4pID4gMSkge1xuICAgICAgICB0aGlzLl9yZW5kZXJJdGVtKG4gPiAwID8gdGhpcy5lbHNbMl0gOiB0aGlzLmVsc1swXSwgaWR4KTtcbiAgICB9XG5cbiAgICAvLyBwcmVsb2FkIHdoZW4gc2xpZGVcbiAgICB0aGlzLl9wcmVsb2FkSW1nKGlkeCk7XG5cbiAgICAvLyBnZXQgcmlnaHQgaXRlbSBvZiBkYXRhXG4gICAgaWYgKGRhdGFbaWR4XSkge1xuICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBpZHg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuaXNMb29waW5nKSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSBuID4gMCA/IDAgOiBkYXRhLmxlbmd0aCAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNsaWRlSW5kZXggPSB0aGlzLnNsaWRlSW5kZXg7XG4gICAgICAgICAgICBuID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubG9nKCdJbmRleDonICsgdGhpcy5zbGlkZUluZGV4KTtcblxuICAgIC8vIGtlZXAgdGhlIHJpZ2h0IG9yZGVyIG9mIGl0ZW1zXG4gICAgdmFyIGhlYWRFbCwgdGFpbEVsLCBzdGVwO1xuXG4gICAgLy8gc2xpZGVjaGFuZ2Ugc2hvdWxkIHJlbmRlciBuZXcgaXRlbVxuICAgIC8vIGFuZCBjaGFuZ2UgbmV3IGl0ZW0gc3R5bGUgdG8gZml0IGFuaW1hdGlvblxuICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgIC8vIFJlc3RvcmUgdG8gY3VycmVudCBzY2VuZVxuICAgICAgICBldmVudFR5cGUgPSAnc2xpZGVSZXN0b3JlJztcbiAgICB9IGVsc2Uge1xuXG4gICAgICAgIGlmICgodGhpcy5pc1ZlcnRpY2FsICYmIChhbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgYW5pbWF0ZVR5cGUgPT09ICdmbGlwJykpIF4gKG4gPiAwKSkge1xuICAgICAgICAgICAgZWxzLnB1c2goZWxzLnNoaWZ0KCkpO1xuICAgICAgICAgICAgaGVhZEVsID0gZWxzWzJdO1xuICAgICAgICAgICAgdGFpbEVsID0gZWxzWzBdO1xuICAgICAgICAgICAgc3RlcCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbHMudW5zaGlmdChlbHMucG9wKCkpO1xuICAgICAgICAgICAgaGVhZEVsID0gZWxzWzBdO1xuICAgICAgICAgICAgdGFpbEVsID0gZWxzWzJdO1xuICAgICAgICAgICAgc3RlcCA9IC0xO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE1hdGguYWJzKG4pID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJJbnRlcm1lZGlhdGVTY2VuZSgpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShoZWFkRWwsIGlkeCArIG4pO1xuICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKG4pID4gMSkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySXRlbShoZWFkRWwsIGlkeCArIHN0ZXApO1xuICAgICAgICAgICAgdGhpcy5faW50ZXJtZWRpYXRlU2NlbmUgPSBbdGFpbEVsLCBpZHggLSBzdGVwXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGhlYWRFbC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ25vbmUnO1xuICAgICAgICBoZWFkRWwuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuXG4gICAgICAgIGdsb2JhbC5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaGVhZEVsLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgIH0sIDIwMCk7XG5cbiAgICAgICAgLy8gTWludXMgc3F1ZWV6ZSB0aW1lXG4gICAgICAgIHNxdWVlemVUaW1lID0gYW5pbWF0ZVRpbWUgLSBzcXVlZXplVGltZTtcblxuICAgICAgICBldmVudFR5cGUgPSAnc2xpZGVDaGFuZ2UnO1xuICAgIH1cblxuICAgIHRoaXMuZmlyZShldmVudFR5cGUsIHRoaXMuc2xpZGVJbmRleCwgZWxzWzFdLCB0aGlzKTtcbiAgICB0aGlzLl93YXRjaFRyYW5zaXRpb25FbmQoc3F1ZWV6ZVRpbWUsIGV2ZW50VHlwZSArICdkJywgdGhpcy5zbGlkZUluZGV4LCBlbHNbMV0sIHRoaXMpO1xuXG4gICAgLy8gZG8gdGhlIHRyaWNrIGFuaW1hdGlvblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgIGlmIChlbHNbaV0gIT09IGhlYWRFbCkge1xuICAgICAgICAgICAgLy8gT25seSBhcHBsaWVzIHRvIFwidHJhbnNmb3JtXCJcbiAgICAgICAgICAgIGVsc1tpXS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAnICsgKHNxdWVlemVUaW1lIC8gMTAwMCkgKyAncyAnICsgdGhpcy5hbmltYXRlRWFzaW5nO1xuICAgICAgICB9XG4gICAgICAgIGFuaW1hdGVGdW5jLmNhbGwodGhpcywgZWxzW2ldLCB0aGlzLmF4aXMsIHRoaXMuc2NhbGUsIGksIDApO1xuICAgIH1cblxuICAgIC8vIElmIG5vdCBsb29waW5nLCBzdG9wIHBsYXlpbmcgd2hlbiBtZWV0IHRoZSBlbmQgb2YgZGF0YVxuICAgIGlmICh0aGlzLmlzQXV0b3BsYXkgJiYgIXRoaXMuaXNMb29waW5nICYmIHRoaXMuc2xpZGVJbmRleCA9PT0gZGF0YS5sZW5ndGggLSAxKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFNsaWRlIHRvIG5leHQgc2NlbmVcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5zbGlkZU5leHQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNsaWRlVG8uYXBwbHkodGhpcywgW3RoaXMuc2xpZGVJbmRleCArIDFdLmNvbmNhdChBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG59O1xuXG4vKipcbiAqIFNsaWRlIHRvIHByZXZpb3VzIHNjZW5lXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuc2xpZGVQcmV2ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zbGlkZVRvLmFwcGx5KHRoaXMsIFt0aGlzLnNsaWRlSW5kZXggLSAxXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlciBwbHVnaW4gKHJ1biB0aW1lIG1vZGUpXG4gKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gcGx1Z2luXG4gKiBAcGFyYW0gey4uLn1cbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5yZWdQbHVnaW4gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgdmFyIG5hbWUgPSBhcmdzLnNoaWZ0KCksXG4gICAgICAgIHBsdWdpbiA9IGFyZ3NbMF07XG5cbiAgICBpZiAoIXRoaXMuX3BsdWdpbnMuaGFzT3duUHJvcGVydHkobmFtZSkgJiYgdHlwZW9mIHBsdWdpbiAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGx1Z2luID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRoaXMuX3BsdWdpbnNbbmFtZV0gPSBwbHVnaW47XG4gICAgICAgIGFyZ3Muc2hpZnQoKTtcbiAgICB9XG5cbiAgICAvLyBBdXRvIGVuYWJsZSBhbmQgaW5pdCBwbHVnaW4gd2hlbiBhdCBydW4gdGltZVxuICAgIGlmICghaW5BcnJheShuYW1lLCB0aGlzLl9vcHRzLnBsdWdpbnMpKSB7XG4gICAgICAgIHRoaXMuX29wdHMucGx1Z2lucy5wdXNoKGFyZ3MubGVuZ3RoID8gW10uY29uY2F0KFtuYW1lXSwgYXJncykgOiBuYW1lKTtcbiAgICAgICAgdHlwZW9mIHRoaXMuX3BsdWdpbnNbbmFtZV0gPT09ICdmdW5jdGlvbicgJiYgdGhpcy5fcGx1Z2luc1tuYW1lXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICB9XG59O1xuXG4vKipcbiAqICBzaW1wbGUgZXZlbnQgZGVsZWdhdGUgbWV0aG9kXG4gKiAgQHBhcmFtIHtzdHJpbmd9IGV2dFR5cGUgZXZlbnQgbmFtZVxuICogIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciB0aGUgc2ltcGxlIGNzcyBzZWxlY3RvciBsaWtlIGpRdWVyeVxuICogIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIGV2ZW50IGNhbGxiYWNrXG4gKiAgQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLmJpbmQgPSBpU2xpZGVyUHJvdG90eXBlLmRlbGVnYXRlID0gZnVuY3Rpb24oZXZ0VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG5cbiAgICBmdW5jdGlvbiBkZWxlZ2F0ZWRFdmVudENhbGxiYWNrSGFuZGxlKGUpIHtcbiAgICAgICAgdmFyIGV2dCA9IGdsb2JhbC5ldmVudCA/IGdsb2JhbC5ldmVudCA6IGU7XG4gICAgICAgIHZhciB0YXJnZXQgPSBldnQudGFyZ2V0O1xuICAgICAgICB2YXIgZWxlQXJyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWxlQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGFyZ2V0ID09PSBlbGVBcnJbaV0pIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRhcmdldCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLndyYXAuYWRkRXZlbnRMaXN0ZW5lcihldnRUeXBlLCBkZWxlZ2F0ZWRFdmVudENhbGxiYWNrSGFuZGxlLCBmYWxzZSk7XG5cbiAgICB2YXIga2V5ID0gZXZ0VHlwZSArICc7JyArIHNlbGVjdG9yO1xuICAgIGlmICghdGhpcy5fRXZlbnRIYW5kbGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB0aGlzLl9FdmVudEhhbmRsZVtrZXldID0gW1xuICAgICAgICAgICAgW2NhbGxiYWNrXSxcbiAgICAgICAgICAgIFtkZWxlZ2F0ZWRFdmVudENhbGxiYWNrSGFuZGxlXVxuICAgICAgICBdXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVswXS5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVsxXS5wdXNoKGRlbGVnYXRlZEV2ZW50Q2FsbGJhY2tIYW5kbGUpO1xuICAgIH1cbn07XG5cbi8qKlxuICogcmVtb3ZlIGV2ZW50IGRlbGVnYXRlIGZyb20gd3JhcFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlIGV2ZW50IG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzZWxlY3RvciB0aGUgc2ltcGxlIGNzcyBzZWxlY3RvciBsaWtlIGpRdWVyeVxuICogQHBhcmFtIHtmdW5jdGlvbn0gY2FsbGJhY2sgZXZlbnQgY2FsbGJhY2tcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS51bmJpbmQgPSBpU2xpZGVyUHJvdG90eXBlLnVuRGVsZWdhdGUgPSBmdW5jdGlvbihldnRUeXBlLCBzZWxlY3RvciwgY2FsbGJhY2spIHtcbiAgICB2YXIga2V5ID0gZXZ0VHlwZSArICc7JyArIHNlbGVjdG9yO1xuICAgIGlmICh0aGlzLl9FdmVudEhhbmRsZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5fRXZlbnRIYW5kbGVba2V5XVswXS5pbmRleE9mKGNhbGxiYWNrKTtcbiAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy53cmFwLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVsxXVtpXSk7XG4gICAgICAgICAgICB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzBdW2ldID0gdGhpcy5fRXZlbnRIYW5kbGVba2V5XVsxXVtpXSA9IG51bGw7XG4gICAgICAgICAgICAvLyBkZWxldGUgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVswXVtpXTtcbiAgICAgICAgICAgIC8vIGRlbGV0ZSB0aGlzLl9FdmVudEhhbmRsZVtrZXldWzFdW2ldO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2Vcbn07XG5cbi8qKlxuICogcmVtb3ZlRXZlbnRMaXN0ZW5lciB0byByZWxlYXNlIHRoZSBtZW1vcnlcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG91dGVyID0gdGhpcy5vdXRlcjtcbiAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG5cbiAgICB0aGlzLmZpcmUoJ2Rlc3Ryb3knKTtcblxuICAgIC8vIENsZWFyIGV2ZW50c1xuICAgIGlmICh0aGlzLmlzVG91Y2hhYmxlKSB7XG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLnN0YXJ0RXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihkZXZpY2UubW92ZUV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLmVuZEV2dCwgdGhpcyk7XG4gICAgICAgICF0aGlzLmRldmljZUV2ZW50cy5oYXNUb3VjaCAmJiBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIHRoaXMpO1xuICAgIH1cbiAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzKTtcbiAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzKTtcbiAgICBnbG9iYWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignYmx1cicsIHRoaXMpO1xuXG4gICAgLy8gQ2xlYXIgZGVsZWdhdGUgZXZlbnRzXG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLl9FdmVudEhhbmRsZSkge1xuICAgICAgICB2YXIgaGFuZExpc3QgPSB0aGlzLl9FdmVudEhhbmRsZVtuXVsxXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoYW5kTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kTGlzdFtpXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKG4uc3Vic3RyKDAsIG4uaW5kZXhPZignOycpKSwgaGFuZExpc3RbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXMuX0V2ZW50SGFuZGxlID0gbnVsbDtcblxuICAgIC8vIENsZWFyIHRpbWVyXG4gICAgZm9yICh2YXIgbiBpbiB0aGlzLl9MU04pXG4gICAgICAgIHRoaXMuX0xTTi5oYXNPd25Qcm9wZXJ0eShuKSAmJiB0aGlzLl9MU05bbl0gJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU05bbl0pO1xuXG4gICAgdGhpcy5fTFNOID0gbnVsbDtcblxuICAgIHRoaXMud3JhcC5pbm5lckhUTUwgPSAnJztcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgZXZlbnQgY2FsbGJhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZnVuYywgZm9yY2UpIHtcbiAgICBpZiAoaW5BcnJheShldmVudE5hbWUsIGlTbGlkZXIuRVZFTlRTKSAmJiB0eXBlb2YgZnVuYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAhKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cykgJiYgKHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0gPSBbXSk7XG4gICAgICAgIGlmICghZm9yY2UpIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0ucHVzaChmdW5jKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0udW5zaGlmdChmdW5jKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogRmluZCBjYWxsYmFjayBmdW5jdGlvbiBwb3NpdGlvblxuICogQHBhcmFtIGV2ZW50TmFtZVxuICogQHBhcmFtIGZ1bmNcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuaGFzID0gZnVuY3Rpb24oZXZlbnROYW1lLCBmdW5jKSB7XG4gICAgaWYgKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cykge1xuICAgICAgICByZXR1cm4gdGhpcy5ldmVudHNbZXZlbnROYW1lXS5pbmRleE9mKGZ1bmMpO1xuICAgIH1cbiAgICByZXR1cm4gLTE7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBldmVudCBjYWxsYmFja1xuICogQHBhcmFtIHtzdHJpbmd9IGV2ZW50TmFtZVxuICogQHBhcmFtIHtmdW5jdGlvbn0gZnVuY1xuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZnVuYykge1xuICAgIHZhciBpbmRleCA9IHRoaXMuaGFzKGV2ZW50TmFtZSwgZnVuYyk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV1baW5kZXhdO1xuICAgIH1cbn07XG5cbi8qKlxuICogVHJpZ2dlciBldmVudCBjYWxsYmFja3NcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAqIEBwYXJhbSB7Kn0gYXJnc1xuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLmZpcmUgPSBmdW5jdGlvbihldmVudE5hbWUpIHtcbiAgICB0aGlzLmxvZygnW0VWRU5UIEZJUkVdOicsIGV2ZW50TmFtZSwgYXJndW1lbnRzKTtcbiAgICBpZiAoZXZlbnROYW1lIGluIHRoaXMuZXZlbnRzKSB7XG4gICAgICAgIHZhciBmdW5jcyA9IHRoaXMuZXZlbnRzW2V2ZW50TmFtZV07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZnVuY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHR5cGVvZiBmdW5jc1tpXSA9PT0gJ2Z1bmN0aW9uJyAmJiBmdW5jc1tpXS5hcHBseSAmJiBmdW5jc1tpXS5hcHBseSh0aGlzLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogcmVzZXQgJiByZXJlbmRlclxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wYXVzZSgpO1xuICAgIHRoaXMuX3NldHRpbmcoKTtcbiAgICB0aGlzLl9yZW5kZXJXcmFwcGVyKCk7XG4gICAgdGhpcy5kZWxheSAmJiBnbG9iYWwuc2V0VGltZW91dCh0aGlzLl9hdXRvUGxheS5iaW5kKHRoaXMpLCB0aGlzLmRlbGF5KTtcbn07XG5cbi8qKlxuICogcmVsb2FkIERhdGEgJiByZW5kZXJcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5sb2FkRGF0YSA9IGZ1bmN0aW9uKGRhdGEsIGluaXRJbmRleCkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICB0aGlzLnNsaWRlSW5kZXggPSBpbml0SW5kZXggfHwgMDtcbiAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgIHRoaXMuX3JlbmRlcldyYXBwZXIoKTtcbiAgICB0aGlzLmZpcmUoJ3JlbG9hZERhdGEnKTtcbiAgICB0aGlzLmRlbGF5ICYmIGdsb2JhbC5zZXRUaW1lb3V0KHRoaXMuX2F1dG9QbGF5LmJpbmQodGhpcyksIHRoaXMuZGVsYXkpO1xufTtcblxuLyoqXG4gKiBhdXRvIGNoZWNrIHRvIHBsYXkgYW5kIGJpbmQgZXZlbnRzXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9hdXRvUGxheSA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIGVuYWJsZVxuICAgIGlmICh0aGlzLmlzQXV0b3BsYXkpIHtcbiAgICAgICAgdGhpcy5oYXMoJ3NsaWRlQ2hhbmdlZCcsIHRoaXMucGxheSkgPCAwICYmIHRoaXMub24oJ3NsaWRlQ2hhbmdlZCcsIHRoaXMucGxheSwgMSk7XG4gICAgICAgIHRoaXMuaGFzKCdzbGlkZVJlc3RvcmVkJywgdGhpcy5wbGF5KSA8IDAgJiYgdGhpcy5vbignc2xpZGVSZXN0b3JlZCcsIHRoaXMucGxheSwgMSk7XG4gICAgICAgIHRoaXMucGxheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub2ZmKCdzbGlkZUNoYW5nZWQnLCB0aGlzLnBsYXkpO1xuICAgICAgICB0aGlzLm9mZignc2xpZGVSZXN0b3JlZCcsIHRoaXMucGxheSk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBTdGFydCBhdXRvcGxheVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLl9MU04uYXV0b1BsYXkgJiYgZ2xvYmFsLmNsZWFyVGltZW91dCh0aGlzLl9MU04uYXV0b1BsYXkpO1xuICAgIHRoaXMuX0xTTi5hdXRvUGxheSA9IGdsb2JhbC5zZXRUaW1lb3V0KHRoaXMuc2xpZGVOZXh0LmJpbmQodGhpcyksIHRoaXMuZHVyYXRpb24pO1xufTtcblxuLyoqXG4gKiBwYXVzZSBhdXRvcGxheVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fTFNOLmF1dG9QbGF5ICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLmF1dG9QbGF5KTtcbn07XG5cbi8qKlxuICogTWFpbnRhaW5pbmcgdGhlIGN1cnJlbnQgc2NlbmVcbiAqIERpc2FibGUgdG91Y2ggZXZlbnRzLCBleGNlcHQgZm9yIHRoZSBuYXRpdmUgbWV0aG9kLlxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLmhvbGQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmhvbGRpbmcgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBSZWxlYXNlIGN1cnJlbnQgc2NlbmVcbiAqIHVubG9jayBhdCBzYW1lIHRpbWVcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS51bmhvbGQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmhvbGRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnVubG9jaygpO1xufTtcblxuLyoqXG4gKiBZb3UgY2FuJ3QgZG8gYW55dGhpbmcgb24gdGhpcyBzY2VuZVxuICogbG9jayBuYXRpdmUgbWV0aG9kIGNhbGxzXG4gKiBob2xkIGF0IHNhbWUgdGltZVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLmxvY2sgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmhvbGQoKTtcbiAgICB0aGlzLmxvY2tpbmcgPSB0cnVlO1xufTtcblxuLyoqXG4gKiB1bmxvY2sgbmF0aXZlIG1ldGhvZCBjYWxsc1xuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnVubG9jayA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubG9ja2luZyA9IGZhbHNlO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgaVNsaWRlciIsIi8qKlxuICogVG8gY3JlYXRlIHJpZ2h0JmxlZnQgYm90dG9uIG9uIGlTbGlkZXJcbiAqXG4gKiBAZmlsZSBidXR0b24uanNcbiAqIEBhdXRob3IgQkUtRkUgVGVhbVxuICogICAgeGlleXUzMzMzMyB4aWV5dTMzMzMzQGdtYWlsLmNvbVxuICogICAgc2hpbmF0ZSBzaGluZS53YW5ncnNAZ21haWwuY29tXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlTbGlkZXIgZnJvbSAnLi4vaXNsaWRlci5qcyc7XG5cbmlTbGlkZXIgJiYgaVNsaWRlci5yZWdQbHVnaW4oJ2J1dHRvbicsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBIQU5ETEUgPSB0aGlzO1xuICAgIGlmICghSEFORExFLmlzVmVydGljYWwpIHtcbiAgICAgICAgdmFyIGJ0bk91dGVyID0gW107XG4gICAgICAgIHZhciBidG5Jbm5lciA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgICAgICAgICAgYnRuT3V0ZXJbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJ0bk91dGVyW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWJ0bi1vdXRlcic7XG4gICAgICAgICAgICBidG5Jbm5lcltpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgYnRuSW5uZXJbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItYnRuLWlubmVyJztcblxuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgKz0gJyBsZWZ0JztcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5kaXIgPSAtMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgcmlnaHQnO1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmRpciA9IDE7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ0bk91dGVyW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRpciA9IHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdkaXInKSwgMTApO1xuICAgICAgICAgICAgICAgIEhBTkRMRS5zbGlkZVRvKEhBTkRMRS5zbGlkZUluZGV4ICsgZGlyKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBidG5PdXRlcltpXS5hcHBlbmRDaGlsZChidG5Jbm5lcltpXSk7XG4gICAgICAgICAgICBIQU5ETEUud3JhcC5hcHBlbmRDaGlsZChidG5PdXRlcltpXSwgSEFORExFLndyYXAubmV4dFNpYmxpbmcpO1xuICAgICAgICB9XG4gICAgfVxufSkiLCIvKipcbiAqIFRvIGNyZWF0ZSBkb3RzIGluZGV4IG9uIGlTbGlkZXJcbiAqXG4gKiBAZmlsZSBkb3QuanNcbiAqIEBhdXRob3IgQkUtRkUgVGVhbVxuICogICAgeGlleXUzMzMzMyB4aWV5dTMzMzMzQGdtYWlsLmNvbVxuICogICAgc2hpbmF0ZSBzaGluZS53YW5ncnNAZ21haWwuY29tXG4gKiBASW5zdHJ1Y3Rpb25zXG4gKiAgICBhY3RpdmF0aW9uOlxuICogICAgICAgbmV3IGlTbGlkZXIoe1xuICogICAgICAgICAgLi4uXG4gKiAgICAgICAgICBwbHVnaW5zOiBbJ2RvdCddXG4gKiAgICAgICAgICAuLi5cbiAqICAgICAgIH0pO1xuICogICAgbW9yZSBvcHRpb25zOlxuICogICAgICAgbmV3IGlTbGlkZXIoe1xuICogICAgICAgICAgLi4uXG4gKiAgICAgICAgICBwbHVnaW5zOiBbWydkb3QnLCB7bG9jYXRlOidhYnNvdWx1dGUnfV1dXG4gKiAgICAgICAgICAuLi5cbiAqICAgICAgIH0pO1xuICogQG9wdGlvbnNcbiAqICAgIGxvY2F0ZSB7c3RyaW5nfEhUTUwgRWxlbWVudH0gdGhlIHdhcnBwZXIgb2YgZG90cyB2YWx1ZTogJ2Fic29sdXRlJywgJ3JlbGF0aXZlJyBvciBTcGVjaWZpZWQgZG9tLCBkZWZhdWx0OiAnYWJzb2x1dGUnXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlTbGlkZXIgZnJvbSAnLi4vaXNsaWRlci5qcyc7XG5cbmlTbGlkZXIgJiYgaVNsaWRlci5yZWdQbHVnaW4oJ2RvdCcsIGZ1bmN0aW9uKG9wdHMpIHtcbiAgICB2YXIgSEFORExFID0gdGhpcztcbiAgICBpZiAoIUhBTkRMRS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIHZhciBsb2NhdGUgPSAoZnVuY3Rpb24obG9jYXRlKSB7XG4gICAgICAgICAgICBpZiAobG9jYXRlID09PSAncmVsYXRpdmUnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEhBTkRMRS53cmFwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChCb29sZWFuKGxvY2F0ZS5ub2RlTmFtZSkgJiYgQm9vbGVhbihsb2NhdGUubm9kZVR5cGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxvY2F0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBIQU5ETEUud3JhcC5wYXJlbnROb2RlO1xuICAgICAgICB9KShvcHRzICYmIG9wdHMubG9jYXRlICE9IG51bGwgPyBvcHRzLmxvY2F0ZSA6IGZhbHNlKTtcbiAgICAgICAgdmFyIGRhdGEgPSBIQU5ETEUuZGF0YTtcbiAgICAgICAgdmFyIGRvdHMgPSBbXTtcbiAgICAgICAgdmFyIGRvdFdyYXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICAgICAgICBkb3RXcmFwLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdC13cmFwJztcblxuICAgICAgICB2YXIgcmVuZGVyRG90cyA9IGZ1bmN0aW9uIHJlbmRlckRvdHMoKSB7XG4gICAgICAgICAgICB2YXIgZnJlZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBkb3RzW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdCc7XG4gICAgICAgICAgICAgICAgZG90c1tpXS5zZXRBdHRyaWJ1dGUoJ2luZGV4JywgaSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPT09IEhBTkRMRS5zbGlkZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG90c1tpXS5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIEhBTkRMRS5zbGlkZVRvKHBhcnNlSW50KHRoaXMuZ2V0QXR0cmlidXRlKCdpbmRleCcpLCAxMCkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgZnJlZ21lbnQuYXBwZW5kQ2hpbGQoZG90c1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb3RXcmFwLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgICAgZG90V3JhcC5hcHBlbmRDaGlsZChmcmVnbWVudCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmVuZGVyRG90cygpO1xuXG4gICAgICAgIGxvY2F0ZS5hcHBlbmRDaGlsZChkb3RXcmFwKTtcblxuICAgICAgICBIQU5ETEUub24oJ3NsaWRlQ2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIUhBTkRMRS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lID0gJ2lzbGlkZXItZG90JztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IHRoaXMuc2xpZGVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgKz0gJyBhY3RpdmUnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBIQU5ETEUub24oJ3JlbG9hZERhdGEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICBkb3RzID0gW107XG4gICAgICAgICAgICByZW5kZXJEb3RzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbn0pOyIsIi8qKlxuICogQGZpbGUgem9vbXBpYy5qc1xuICogQGF1dGhvciBsaXVodWkwMSBvbiAyMDE1LzEvNy5cbiAqIEBtb2RpZnkgc2hpbmF0ZSBzaGluZS53YW5ncnNAZ21haWwuY29tXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IGlTbGlkZXIgZnJvbSAnLi4vaXNsaWRlci5qcyc7XG5cbnZhciBnbG9iYWwgPSB3aW5kb3c7XG5cbnZhciBzdGFydEhhbmRsZXJPcmlnaW5hbCA9IGlTbGlkZXIucHJvdG90eXBlLnN0YXJ0SGFuZGxlcjtcbnZhciBlbmRIYW5kbGVyT3JpZ2luYWwgPSBpU2xpZGVyLnByb3RvdHlwZS5lbmRIYW5kbGVyO1xudmFyIG1vdmVIYW5kbGVyT3JpZ2luYWwgPSBpU2xpZGVyLnByb3RvdHlwZS5tb3ZlSGFuZGxlcjtcblxuLyoqXG4gKiBTdXBwb3J0IDNEIG1hdHJpeCB0cmFuc2xhdGVcbiAqIEB0eXBlIHtib29sZWFufVxuICovXG52YXIgaGFzM2QgPSAoJ1dlYktpdENTU01hdHJpeCcgaW4gZ2xvYmFsICYmICdtMTEnIGluIG5ldyBXZWJLaXRDU1NNYXRyaXgoKSk7XG5cbi8qKlxuICogTWluIHNjYWxlXG4gKiBAdHlwZSB7bnVtYmVyfVxuICovXG52YXIgbWluU2NhbGUgPSAxIC8gMjtcblxuLyoqXG4gKiBTY2VuZSB2aWV3IHJhbmdlXG4gKiBAdHlwZSB7e319XG4gKi9cbnZhciB2aWV3U2NvcGUgPSB7fTtcblxudmFyIGN1cnJlbnRTY2FsZTtcblxudmFyIHpvb21GYWN0b3I7XG5cbnZhciB6b29tTm9kZTtcblxudmFyIHN0YXJ0VG91Y2hlcztcblxudmFyIHN0YXJ0WDtcblxudmFyIHN0YXJ0WTtcblxudmFyIGxhc3RUb3VjaFN0YXJ0O1xuXG52YXIgZ2VzdHVyZTtcblxudmFyIElOX1NDQUxFX01PREUgPSBmYWxzZTtcblxuLyoqXG4gKiBHZW5lcmF0ZSB0cmFuc2xhdGVcbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICogQHBhcmFtIHpcbiAqIEBwYXJhbSBzY2FsZVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUcmFuc2xhdGUoeCwgeSwgeiwgc2NhbGUpIHtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGVcIiArIChoYXMzZCA/IFwiM2QoXCIgOiBcIihcIikgKyB4ICsgXCJweCxcIiArIHkgKyAoaGFzM2QgPyBcInB4LFwiICsgeiArIFwicHgpXCIgOiBcInB4KVwiKSArIFwic2NhbGUoXCIgKyBzY2FsZSArIFwiKVwiO1xufVxuXG4vKipcbiAqIEdldCBkaXN0YW5jZVxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBnZXREaXN0YW5jZShhLCBiKSB7XG4gICAgdmFyIHgsIHk7XG4gICAgeCA9IGEubGVmdCAtIGIubGVmdDtcbiAgICB5ID0gYS50b3AgLSBiLnRvcDtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSB0byBzdHJpbmdcbiAqIEBwYXJhbSB4XG4gKiBAcGFyYW0geVxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oeCwgeSkge1xuICAgIHJldHVybiB4ICsgXCJweCBcIiArIHkgKyBcInB4XCI7XG59XG5cbi8qKlxuICogR2V0IHRvdWNoIHBvaW50ZXJcbiAqIEBwYXJhbSB0b3VjaGVzXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGdldFRvdWNoZXModG91Y2hlcykge1xuICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0b3VjaGVzKS5tYXAoZnVuY3Rpb24odG91Y2gpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IHRvdWNoLnBhZ2VYLFxuICAgICAgICAgICAgdG9wOiB0b3VjaC5wYWdlWVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbi8qKlxuICogR2V0IHNjYWxlXG4gKiBAcGFyYW0gc3RhcnRcbiAqIEBwYXJhbSBlbmRcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIGNhbGN1bGF0ZVNjYWxlKHN0YXJ0LCBlbmQpIHtcbiAgICB2YXIgc3RhcnREaXN0YW5jZSA9IGdldERpc3RhbmNlKHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgdmFyIGVuZERpc3RhbmNlID0gZ2V0RGlzdGFuY2UoZW5kWzBdLCBlbmRbMV0pO1xuICAgIHJldHVybiBlbmREaXN0YW5jZSAvIHN0YXJ0RGlzdGFuY2U7XG59XG5cbi8qKlxuICogR2V0IGNvbXB1dGVkIHRyYW5zbGF0ZVxuICogQHBhcmFtIG9ialxuICogQHJldHVybnMge3t0cmFuc2xhdGVYOiBudW1iZXIsIHRyYW5zbGF0ZVk6IG51bWJlciwgdHJhbnNsYXRlWjogbnVtYmVyLCBzY2FsZVg6IG51bWJlciwgc2NhbGVZOiBudW1iZXIsIG9mZnNldFg6IG51bWJlciwgb2Zmc2V0WTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUob2JqKSB7XG4gICAgdmFyIHJlc3VsdCA9IHtcbiAgICAgICAgdHJhbnNsYXRlWDogMCxcbiAgICAgICAgdHJhbnNsYXRlWTogMCxcbiAgICAgICAgdHJhbnNsYXRlWjogMCxcbiAgICAgICAgc2NhbGVYOiAxLFxuICAgICAgICBzY2FsZVk6IDEsXG4gICAgICAgIG9mZnNldFg6IDAsXG4gICAgICAgIG9mZnNldFk6IDBcbiAgICB9O1xuICAgIHZhciBvZmZzZXRYID0gMCxcbiAgICAgICAgb2Zmc2V0WSA9IDA7XG4gICAgaWYgKCFnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZSB8fCAhb2JqKSByZXR1cm4gcmVzdWx0O1xuICAgIHZhciBzdHlsZSA9IGdsb2JhbC5nZXRDb21wdXRlZFN0eWxlKG9iaiksXG4gICAgICAgIHRyYW5zZm9ybSwgb3JpZ2luO1xuICAgIHRyYW5zZm9ybSA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybSB8fCBzdHlsZS5tb3pUcmFuc2Zvcm07XG4gICAgb3JpZ2luID0gc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luIHx8IHN0eWxlLm1velRyYW5zZm9ybU9yaWdpbjtcbiAgICB2YXIgcGFyID0gb3JpZ2luLm1hdGNoKC8oLiopcHhcXHMrKC4qKXB4Lyk7XG4gICAgaWYgKHBhci5sZW5ndGggPiAxKSB7XG4gICAgICAgIG9mZnNldFggPSBwYXJbMV0gLSAwO1xuICAgICAgICBvZmZzZXRZID0gcGFyWzJdIC0gMDtcbiAgICB9XG4gICAgaWYgKHRyYW5zZm9ybSA9PSBcIm5vbmVcIikgcmV0dXJuIHJlc3VsdDtcbiAgICB2YXIgbWF0M2QgPSB0cmFuc2Zvcm0ubWF0Y2goL15tYXRyaXgzZFxcKCguKylcXCkkLyk7XG4gICAgdmFyIG1hdDJkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4XFwoKC4rKVxcKSQvKTtcbiAgICBpZiAobWF0M2QpIHtcbiAgICAgICAgdmFyIHN0ciA9IG1hdDNkWzFdLnNwbGl0KCcsICcpO1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYOiBzdHJbMTJdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0clsxM10gLSAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWjogc3RyWzE0XSAtIDAsXG4gICAgICAgICAgICBvZmZzZXRYOiBvZmZzZXRYIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFk6IG9mZnNldFkgLSAwLFxuICAgICAgICAgICAgc2NhbGVYOiBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgc2NhbGVZOiBzdHJbNV0gLSAwLFxuICAgICAgICAgICAgc2NhbGVaOiBzdHJbMTBdIC0gMFxuICAgICAgICB9O1xuICAgIH0gZWxzZSBpZiAobWF0MmQpIHtcbiAgICAgICAgdmFyIHN0ciA9IG1hdDJkWzFdLnNwbGl0KCcsICcpO1xuICAgICAgICByZXN1bHQgPSB7XG4gICAgICAgICAgICB0cmFuc2xhdGVYOiBzdHJbNF0gLSAwLFxuICAgICAgICAgICAgdHJhbnNsYXRlWTogc3RyWzVdIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFg6IG9mZnNldFggLSAwLFxuICAgICAgICAgICAgb2Zmc2V0WTogb2Zmc2V0WSAtIDAsXG4gICAgICAgICAgICBzY2FsZVg6IHN0clswXSAtIDAsXG4gICAgICAgICAgICBzY2FsZVk6IHN0clszXSAtIDBcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXQgY2VudGVyIHBvaW50XG4gKiBAcGFyYW0gYVxuICogQHBhcmFtIGJcbiAqIEByZXR1cm5zIHt7eDogbnVtYmVyLCB5OiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXRDZW50ZXIoYSwgYikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IChhLnggKyBiLngpIC8gMixcbiAgICAgICAgeTogKGEueSArIGIueSkgLyAyXG4gICAgfVxufVxuXG4vKipcbiAqIGluaXRcbiAqIEBwYXJhbSBvcHRzXG4gKi9cbmZ1bmN0aW9uIGluaXRab29tKG9wdHMpIHtcbiAgICBjdXJyZW50U2NhbGUgPSAxO1xuICAgIHpvb21GYWN0b3IgPSBvcHRzICYmIG9wdHMuem9vbUZhY3RvciB8fCAyO1xufVxuXG4vKipcbiAqIFN0YXJ0IGV2ZW50IGhhbmRsZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiBzdGFydEhhbmRsZXIoZXZ0KSB7XG4gICAgc3RhcnRIYW5kbGVyT3JpZ2luYWwuY2FsbCh0aGlzLCBldnQpO1xuICAgIC8vIG11c3QgYmUgYSBwaWN0dXJlLCBvbmx5IG9uZSBwaWN0dXJlISFcbiAgICB2YXIgbm9kZSA9IHRoaXMuZWxzWzFdLnF1ZXJ5U2VsZWN0b3IoJ2ltZzpmaXJzdC1jaGlsZCcpO1xuICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICBpZiAoZGV2aWNlLmhhc1RvdWNoICYmIG5vZGUgIT09IG51bGwpIHtcbiAgICAgICAgSU5fU0NBTEVfTU9ERSA9IHRydWU7XG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSBnZXRDb21wdXRlZFRyYW5zbGF0ZShub2RlKTtcbiAgICAgICAgc3RhcnRUb3VjaGVzID0gZ2V0VG91Y2hlcyhldnQudGFyZ2V0VG91Y2hlcyk7XG4gICAgICAgIHN0YXJ0WCA9IHRyYW5zZm9ybS50cmFuc2xhdGVYIC0gMDtcbiAgICAgICAgc3RhcnRZID0gdHJhbnNmb3JtLnRyYW5zbGF0ZVkgLSAwO1xuICAgICAgICBjdXJyZW50U2NhbGUgPSB0cmFuc2Zvcm0uc2NhbGVYO1xuICAgICAgICB6b29tTm9kZSA9IG5vZGU7XG4gICAgICAgIHZhciBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICAgICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICBsYXN0VG91Y2hTdGFydCA9IG51bGw7XG4gICAgICAgICAgICB2YXIgdG91Y2hlcyA9IGV2dC50b3VjaGVzO1xuICAgICAgICAgICAgdmFyIHRvdWNoQ2VudGVyID0gZ2V0Q2VudGVyKHtcbiAgICAgICAgICAgICAgICB4OiB0b3VjaGVzWzBdLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHk6IHRvdWNoZXNbMF0ucGFnZVlcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB4OiB0b3VjaGVzWzFdLnBhZ2VYLFxuICAgICAgICAgICAgICAgIHk6IHRvdWNoZXNbMV0ucGFnZVlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm1PcmlnaW4gPSBnZW5lcmF0ZVRyYW5zZm9ybU9yaWdpbih0b3VjaENlbnRlci54IC0gcG9zLmxlZnQsIHRvdWNoQ2VudGVyLnkgLSBwb3MudG9wKTtcbiAgICAgICAgfSBlbHNlIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIHZhciB0aW1lID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgICAgIGdlc3R1cmUgPSAwO1xuICAgICAgICAgICAgaWYgKHRpbWUgLSBsYXN0VG91Y2hTdGFydCA8IDMwMCkge1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGdlc3R1cmUgPSAzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdFRvdWNoU3RhcnQgPSB0aW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIE1vdmUgZXZlbnQgaGFuZGxlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBtb3ZlSGFuZGxlcihldnQpIHtcbiAgICBpZiAoSU5fU0NBTEVfTU9ERSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICAgICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgICAgICBpZiAoZGV2aWNlLmhhc1RvdWNoKSB7XG4gICAgICAgICAgICBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBzY2FsZUltYWdlKGV2dCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxICYmIGN1cnJlbnRTY2FsZSA+IDEpIHtcbiAgICAgICAgICAgICAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIG1vdmVJbWFnZS5jYWxsKHRoaXMsIGV2dCk7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGdlc3R1cmUgPSByZXN1bHQ7XG5cbiAgICAgICAgICAgIGlmIChyZXN1bHQgPiAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIG1vdmVIYW5kbGVyT3JpZ2luYWwuY2FsbCh0aGlzLCBldnQpO1xufVxuXG4vKipcbiAqIERvdWJsZSB0YW8gaGFuZGxlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIGhhbmRsZURvdWJsZVRhcChldnQpIHtcbiAgICB2YXIgem9vbUZhY3RvciA9IHpvb21GYWN0b3IgfHwgMjtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHZhciBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICBjdXJyZW50U2NhbGUgPSBjdXJyZW50U2NhbGUgPT0gMSA/IHpvb21GYWN0b3IgOiAxO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgY3VycmVudFNjYWxlKTtcbiAgICBpZiAoY3VycmVudFNjYWxlICE9IDEpIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4oZXZ0LnRvdWNoZXNbMF0ucGFnZVggLSBwb3MubGVmdCwgZXZ0LnRvdWNoZXNbMF0ucGFnZVkgLSBwb3MudG9wKTtcbn1cblxuLyoqXG4gKiBzY2FsZSBpbWFnZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiBzY2FsZUltYWdlKGV2dCkge1xuICAgIHZhciBtb3ZlVG91Y2VzID0gZ2V0VG91Y2hlcyhldnQudGFyZ2V0VG91Y2hlcyk7XG4gICAgdmFyIHNjYWxlID0gY2FsY3VsYXRlU2NhbGUoc3RhcnRUb3VjaGVzLCBtb3ZlVG91Y2VzKTtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHNjYWxlID0gY3VycmVudFNjYWxlICogc2NhbGUgPCBtaW5TY2FsZSA/IG1pblNjYWxlIDogY3VycmVudFNjYWxlICogc2NhbGU7XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZSgwLCAwLCAwLCBzY2FsZSk7XG59XG5cbi8qKlxuICogRW5kIGV2ZW50IGhhbmRsZVxuICogQHBhcmFtIGV2dFxuICovXG5mdW5jdGlvbiBlbmRIYW5kbGVyKGV2dCkge1xuICAgIGlmIChJTl9TQ0FMRV9NT0RFKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAwO1xuICAgICAgICBpZiAoZ2VzdHVyZSA9PT0gMikgeyAvL+WPjOaJi+aMh1xuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgcmVzdWx0ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmIChnZXN0dXJlID09IDEpIHsgLy/mlL7lpKfmi5bmi71cbiAgICAgICAgICAgIHJlc2V0SW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2VzdHVyZSA9PT0gMykgeyAvL+WPjOWHu1xuICAgICAgICAgICAgaGFuZGxlRG91YmxlVGFwKGV2dCk7XG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICBJTl9TQ0FMRV9NT0RFID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVuZEhhbmRsZXJPcmlnaW5hbC5jYWxsKHRoaXMsIGV2dCk7XG59XG5cbi8qKlxuICogRHJhZ21vdmUgaW1hZ2VcbiAqIEBwYXJhbSB7b3BqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gbW92ZUltYWdlKGV2dCkge1xuICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIHZhciBvZmZzZXQgPSB7XG4gICAgICAgIFg6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCAtIHRoaXMuc3RhcnRYKSA6IChldnQucGFnZVggLSB0aGlzLnN0YXJ0WCksXG4gICAgICAgIFk6IGRldmljZS5oYXNUb3VjaCA/IChldnQudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSAtIHRoaXMuc3RhcnRZKSA6IChldnQucGFnZVkgLSB0aGlzLnN0YXJ0WSlcbiAgICB9O1xuICAgIHZhciBtb3ZlT2Zmc2V0ID0ge1xuICAgICAgICB4OiBzdGFydFggKyBvZmZzZXQuWCAtIDAsXG4gICAgICAgIHk6IHN0YXJ0WSArIG9mZnNldC5ZIC0gMFxuICAgIH07XG4gICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBnZW5lcmF0ZVRyYW5zbGF0ZShtb3ZlT2Zmc2V0LngsIG1vdmVPZmZzZXQueSwgMCwgY3VycmVudFNjYWxlKTtcbn1cblxuLyoqXG4gKiBHZXQgcG9zaXRpb25cbiAqIEBwYXJhbSBlbGVtZW50XG4gKiBAcmV0dXJucyB7e2xlZnQ6IG51bWJlciwgdG9wOiBudW1iZXJ9fVxuICovXG5mdW5jdGlvbiBnZXRQb3NpdGlvbihlbGVtZW50KSB7XG4gICAgdmFyIHBvcyA9IHtcbiAgICAgICAgXCJsZWZ0XCI6IDAsXG4gICAgICAgIFwidG9wXCI6IDBcbiAgICB9O1xuICAgIGRvIHtcbiAgICAgICAgcG9zLnRvcCArPSBlbGVtZW50Lm9mZnNldFRvcCB8fCAwO1xuICAgICAgICBwb3MubGVmdCArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xuICAgIH1cbiAgICB3aGlsZSAoZWxlbWVudCk7XG4gICAgcmV0dXJuIHBvcztcbn1cblxuLyoqXG4gKiBDaGVjayB0YXJnZXQgaXMgaW4gcmFuZ2VcbiAqIEBwYXJhbSBub2RlXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSB0YWdcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIHZhbHVlLCB0YWcpIHtcbiAgICB2YXIgbWluLCBtYXg7XG4gICAgdmFyIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgIHZpZXdTY29wZSA9IHtcbiAgICAgICAgc3RhcnQ6IHtcbiAgICAgICAgICAgIGxlZnQ6IHBvcy5sZWZ0LFxuICAgICAgICAgICAgdG9wOiBwb3MudG9wXG4gICAgICAgIH0sXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgbGVmdDogcG9zLmxlZnQgKyBub2RlLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgdG9wOiBwb3MudG9wICsgbm9kZS5jbGllbnRIZWlnaHRcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIHN0ciA9IHRhZyA9PSAxID8gXCJsZWZ0XCIgOiBcInRvcFwiO1xuICAgIG1pbiA9IHZpZXdTY29wZS5zdGFydFtzdHJdO1xuICAgIG1heCA9IHZpZXdTY29wZS5lbmRbc3RyXTtcbiAgICByZXR1cm4gKHZhbHVlID49IG1pbiAmJiB2YWx1ZSA8PSBtYXgpO1xufVxuXG4vKipcbiAqXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIG9iajFcbiAqIEByZXR1cm5zIHtudW1iZXJ9XG4gKi9cbmZ1bmN0aW9uIG92ZXJGbG93KG5vZGUsIG9iajEpIHtcbiAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICB2YXIgaXNYMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LmxlZnQsIDEpO1xuICAgIHZhciBpc1gySW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuZW5kLmxlZnQsIDEpO1xuICAgIHZhciBpc1kxSW4gPSB2YWx1ZUluVmlld1Njb3BlKG5vZGUsIG9iajEuc3RhcnQudG9wLCAwKTtcbiAgICB2YXIgaXNZMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC50b3AsIDApO1xuICAgIGlmICgoaXNYMUluICE9IGlzWDJJbikgJiYgKGlzWTFJbiAhPSBpc1kySW4pKSB7XG4gICAgICAgIGlmIChpc1gxSW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiBpc1kxSW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNYMkluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDQ7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKChpc1gxSW4gPT0gaXNYMkluKSkge1xuICAgICAgICBpZiAoIWlzWTFJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDU7XG4gICAgICAgIH0gZWxzZSBpZiAoIWlzWTJJbiAmJiBpc1kxSW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDY7XG4gICAgICAgIH1cblxuICAgIH0gZWxzZSBpZiAoaXNZMUluID09IGlzWTJJbikge1xuICAgICAgICBpZiAoIWlzWDFJbiAmJiBpc1gySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDc7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNYMUluICYmICFpc1gySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDg7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4gPT0gaXNYMUluID09IGlzWDJJbikge1xuICAgICAgICByZXN1bHQgPSA5O1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFJlc2V0IGltYWdlXG4gKiBAcGFyYW0ge29iamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIHJlc2V0SW1hZ2UoZXZ0KSB7XG4gICAgaWYgKGN1cnJlbnRTY2FsZSA9PSAxKSByZXR1cm47XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZSxcbiAgICAgICAgbGVmdCwgdG9wLCB0cmFucywgdywgaCwgcG9zLCBzdGFydCwgZW5kLCBwYXJlbnQsIGZsb3dUYWc7XG4gICAgdHJhbnMgPSBnZXRDb21wdXRlZFRyYW5zbGF0ZShub2RlKTtcbiAgICBwYXJlbnQgPSBub2RlLnBhcmVudE5vZGU7XG4gICAgdyA9IG5vZGUuY2xpZW50V2lkdGggKiB0cmFucy5zY2FsZVg7XG4gICAgaCA9IG5vZGUuY2xpZW50SGVpZ2h0ICogdHJhbnMuc2NhbGVYO1xuICAgIHBvcyA9IGdldFBvc2l0aW9uKG5vZGUpO1xuICAgIHN0YXJ0ID0ge1xuICAgICAgICBsZWZ0OiAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRYICsgcG9zLmxlZnQgKyB0cmFucy50cmFuc2xhdGVYLFxuICAgICAgICB0b3A6ICgxIC0gdHJhbnMuc2NhbGVYKSAqIHRyYW5zLm9mZnNldFkgKyBwb3MudG9wICsgdHJhbnMudHJhbnNsYXRlWVxuICAgIH07XG4gICAgZW5kID0ge1xuICAgICAgICBsZWZ0OiBzdGFydC5sZWZ0ICsgdyxcbiAgICAgICAgdG9wOiBzdGFydC50b3AgKyBoXG4gICAgfTtcbiAgICBsZWZ0ID0gc3RhcnQubGVmdDtcbiAgICB0b3AgPSBzdGFydC50b3A7XG5cbiAgICBmbG93VGFnID0gb3ZlckZsb3cocGFyZW50LCB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgZW5kOiBlbmRcbiAgICB9KTtcbiAgICBzd2l0Y2ggKGZsb3dUYWcpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5zdGFydC5sZWZ0O1xuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5zdGFydC50b3A7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgbGVmdCA9IHZpZXdTY29wZS5lbmQubGVmdCAtIHc7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAodyA8IHBhcmVudC5jbGllbnRXaWR0aCkge1xuICAgICAgICBsZWZ0ID0gcG9zLmxlZnQgLSAodHJhbnMuc2NhbGVYIC0gMSkgKiBub2RlLmNsaWVudFdpZHRoIC8gMjtcbiAgICB9XG4gICAgaWYgKGggPCBwYXJlbnQuY2xpZW50SGVpZ2h0KSB7XG4gICAgICAgIHRvcCA9IHBvcy50b3AgLSAodHJhbnMuc2NhbGVYIC0gMSkgKiBub2RlLmNsaWVudEhlaWdodCAvIDI7XG4gICAgfVxuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIxMDBtc1wiO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUodHJhbnMudHJhbnNsYXRlWCArIGxlZnQgLSBzdGFydC5sZWZ0LCB0cmFucy50cmFuc2xhdGVZICsgdG9wIC0gc3RhcnQudG9wLCAwLCB0cmFucy5zY2FsZVgpO1xuXG59XG5cbmlTbGlkZXIuZXh0ZW5kKHtcbiAgICBzdGFydEhhbmRsZXI6IHN0YXJ0SGFuZGxlcixcbiAgICBtb3ZlSGFuZGxlcjogbW92ZUhhbmRsZXIsXG4gICAgZW5kSGFuZGxlcjogZW5kSGFuZGxlclxufSk7XG5cbmlTbGlkZXIucmVnUGx1Z2luKCd6b29tcGljJywgaW5pdFpvb20pOyJdfQ==
