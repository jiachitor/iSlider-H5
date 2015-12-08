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
    animateType: 'depth',
    plugins: [['zoompic', {
        currentScale: 1,
        zoomFactor: 2
    }]]
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L2RlbW8vZWZmZWN0L2RlcHRoL21haW4uanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L3NyYy9leHQvYW5pbWF0ZS5qcyIsImQ6L2dpdGh1YkRldmVsb3BtZW50L2lTbGlkZXItSDUvc3JjL2lzbGlkZXIuanMiLCJkOi9naXRodWJEZXZlbG9wbWVudC9pU2xpZGVyLUg1L3NyYy9wbHVnaW5zL2J1dHRvbi5qcyIsImQ6L2dpdGh1YkRldmVsb3BtZW50L2lTbGlkZXItSDUvc3JjL3BsdWdpbnMvZG90LmpzIiwiZDovZ2l0aHViRGV2ZWxvcG1lbnQvaVNsaWRlci1INS9zcmMvcGx1Z2lucy96b29tcGljLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOzs7OzRCQUVPLHlCQUF5Qjs7OztRQUN0Qyw2QkFBNkI7O1FBQzdCLGdDQUFnQzs7UUFDaEMsNkJBQTZCOztRQUM3QixpQ0FBaUM7O0FBRXhDLElBQUksSUFBSSxHQUFHOztBQUVQO0FBQ0ksV0FBTyxFQUFFLG9CQUFvQjtDQUNoQzs7QUFFRDtBQUNJLFdBQU8sRUFBRSw2RUFBNkU7Q0FDekY7O0FBRUQ7QUFDSSxXQUFPLEVBQUUsQ0FBQyxZQUFXO0FBQ2pCLFlBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDeEMsV0FBRyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7QUFDMUIsV0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsd0NBQXdDLENBQUM7QUFDN0QsZUFBTyxHQUFHLENBQUM7S0FDZCxDQUFBLEVBQUc7Q0FDUDs7QUFFRDtBQUNJLFdBQU8sRUFBRSxDQUFDLFlBQVc7QUFDakIsWUFBSSxJQUFJLEdBQUcsUUFBUSxDQUFDLHNCQUFzQixFQUFFLENBQUM7QUFDN0MsWUFB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LGdCQUFJLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDNUIsa0JBQU07QUFBQSxLQUNiO0FBQ0QsUUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUN4QixZQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBLEdBQUksSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7S0FDL0Q7QUFDRCxRQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFO0FBQ3pCLFdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUEsR0FBSSxJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztLQUM5RDtBQUNELFFBQUksQ0FBQyxLQUFLLENBQUMsd0JBQXdCLEdBQUcsT0FBTyxDQUFDO0FBQzlDLFFBQUksQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBRTdJOztBQUVELHVCQUFRLE1BQU0sQ0FBQztBQUNYLGdCQUFZLEVBQUUsWUFBWTtBQUMxQixlQUFXLEVBQUUsV0FBVztBQUN4QixjQUFVLEVBQUUsVUFBVTtDQUN6QixDQUFDLENBQUM7O0FBRUgsdUJBQVEsU0FBUyxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyIGZyb20gJy4uLy4uLy4uL3NyYy9pc2xpZGVyLmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL2V4dC9hbmltYXRlLmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL3BsdWdpbnMvYnV0dG9uLmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL3BsdWdpbnMvZG90LmpzJztcbmltcG9ydCAnLi4vLi4vLi4vc3JjL3BsdWdpbnMvem9vbXBpYy5qcyc7XG5cbnZhciBsaXN0ID0gW1xuICAgIC8vIHBpY3R1cmVcbiAgICB7XG4gICAgICAgIGNvbnRlbnQ6ICcuLi9pbWdzL2ZsaXAvMC5qcGcnXG4gICAgfSxcbiAgICAvLyBIVE1MIFN0cmluZ1xuICAgIHtcbiAgICAgICAgY29udGVudDogJzxkaXYgc3R5bGU9XCJmb250LXNpemU6NGVtO2NvbG9yOndoaXRlO3RleHQtYWxpZ246IGNlbnRlclwiPkhUTUwgU3RyaW5nPC9kaXY+J1xuICAgIH0sXG4gICAgLy8gZWxlbWVudFxuICAgIHtcbiAgICAgICAgY29udGVudDogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgZG9tLmlubmVySFRNTCA9ICdFbGVtZW50JztcbiAgICAgICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZTozZW07Y29sb3I6cmdiKDIzMCwgMjMwLCA2Myk7JztcbiAgICAgICAgICAgIHJldHVybiBkb207XG4gICAgICAgIH0pKClcbiAgICB9LFxuICAgIC8vIGZyYWdtZW50XG4gICAge1xuICAgICAgICBjb250ZW50OiAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZnJhZyA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcbiAgICAgICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcbiAgICAgICAgICAgIHZhciBkb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGRvbS5pbm5lckhUTUwgPSAnRnJhZ21lbnQnO1xuICAgICAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjNlbTtjb2xvcjpyZ2IoMjMwLCA2MywgMjMwKTsnO1xuICAgICAgICAgICAgZnJhZy5hcHBlbmRDaGlsZChkb20pO1xuICAgICAgICAgICAgcmV0dXJuIGZyYWc7XG4gICAgICAgIH0pKClcbiAgICB9LFxuICAgIC8vIGRvbVxuICAgIHtcbiAgICAgICAgY29udGVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hpZGRlbi1zcGFjZSA+IHAnKVxuICAgIH1cbl07XG5cbnZhciBTID0gbmV3IGlTbGlkZXIoe1xuICAgIGRvbTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lTbGlkZXItd3JhcHBlcicpLFxuICAgIGRhdGE6IGxpc3QsXG4gICAgaXNWZXJ0aWNhbDogdHJ1ZSxcbiAgICBpc0xvb3Bpbmc6IDEsXG4gICAgaXNPdmVyc3ByZWFkOiAxLFxuICAgIGFuaW1hdGVUaW1lOiA4MDAsXG4gICAgYW5pbWF0ZVR5cGU6ICdkZXB0aCcsXG4gICAgcGx1Z2luczogW1xuICAgICAgICBbJ3pvb21waWMnLCB7XG4gICAgICAgICAgICBjdXJyZW50U2NhbGU6IDEsXG4gICAgICAgICAgICB6b29tRmFjdG9yOiAyXG4gICAgICAgIH1dXG4gICAgXSxcbn0pOyIsIi8qXG4gKiBAZmlsZSAgIEFuaW1hdGlvbiBMaWJyYXJ5XG4gKiBAYXV0aG9yIHhpZXl1MzMzMzNcbiAqL1xuXG4vKiAg6K+05piO77yaXG4vL2RvbSDooajnpLrliqjnlLvnmoTlhYPntKDoioLngrlcbi8vYXhpcyDooajnpLrliqjnlLvmlrnlkJHvvIzliIbliKvkuLogWCDlkowgWSDmlrnlkJFcbi8vc2NhbGUg5bGP5bmV6auY5bqmXG4vL2kgPT0gMCDooajnpLogaXNsaWRlci1wcmV2LCBpID09IDEg6KGo56S6IGlzbGlkZXItYWN0aXZlLCBpID09IDIg6KGo56S6IGlzbGlkZXItbmV4dCxcbi8vb2Zmc2V0ID4gMCDooajnpLrnmoTmmK/lkJHkuIrmiJblkJHlj7PnmoTmu5HliqjmlrnlkJHvvIxvZmZzZXQgPCAwIOihqOekuueahOaYr+WQkeS4i+aIluWQkeW3pueahOa7keWKqOaWueWQkS5vZmZzZXQg55qE5YC86KGo56S65omL5oyH5Zyo5bGP5bmV5LiK5ruR5Yqo55qE6Led56a777yM57ud5a+55YC86LaK5aSn6KGo56S65ruR5Yqo55qE6Led56a76LaK6ZW/44CCXG4vL29wcG9zaXRlIOWIpOaWreaYr+WQpuWcqOaJp+ihjCDlkJHkuIvmiJblkJHlt6bnmoTpgIbmlrnlkJHmu5HliqhcbiogKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgaVNsaWRlciBmcm9tICcuLi9pc2xpZGVyLmpzJztcblxuJ3VzZSBzdHJpY3QnO1xuXG5pU2xpZGVyICYmIGlTbGlkZXIuZXh0ZW5kKGlTbGlkZXIuX2FuaW1hdGVGdW5jcywge1xuICAgIC8vIHJvdGF0ZVxuICAgICdyb3RhdGUnOiBmdW5jdGlvbiByb3RhdGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciByb3RhdGVEaXJlY3QgPSAoYXhpcyA9PT0gJ1gnKSA/ICdZJyA6ICdYJztcbiAgICAgICAgdmFyIGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgdmFyIGJkQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLndyYXAucGFyZW50Tm9kZSwgbnVsbCkuYmFja2dyb3VuZENvbG9yO1xuXG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChvZmZzZXQgPiAwKSA/ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5zdHlsZS5jc3NUZXh0ICs9ICctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyAtd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsgJyArICdiYWNrZ3JvdW5kLWNvbG9yOicgKyBiZENvbG9yICsgJzsgcG9zaXRpb246YWJzb2x1dGU7JztcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgOTAgKiAob2Zmc2V0IC8gc2NhbGUgKyBpIC0gMSkgKyAnZGVnKSB0cmFuc2xhdGVaKCcgKyAoMC44ODggKiBzY2FsZSAvIDIpICsgJ3B4KSBzY2FsZSgwLjg4OCknO1xuICAgIH0sXG4gICAgLy8gZmxpcFxuICAgICdmbGlwJzogZnVuY3Rpb24gZmxpcChkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICB2YXIgYmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMud3JhcC5wYXJlbnROb2RlLCBudWxsKS5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIGlmICh0aGlzLmlzVmVydGljYWwpIHtcbiAgICAgICAgICAgIG9mZnNldCA9IC1vZmZzZXQ7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLmNzc1RleHQgKz0gJ3Bvc2l0aW9uOmFic29sdXRlOyAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6aGlkZGVuOyBiYWNrZ3JvdW5kLWNvbG9yOicgKyBiZENvbG9yICsgJzsnO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooJyArIChzY2FsZSAvIDIpICsgJ3B4KSByb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgMTgwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpICsgJ2RlZykgc2NhbGUoMC44NzUpJztcbiAgICB9LFxuICAgICdkZXB0aCc6IGZ1bmN0aW9uIGRlcHRoKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICB2YXIgem9vbVNjYWxlID0gKDQgLSBNYXRoLmFicyhpIC0gMSkpICogMC4xODtcbiAgICAgICAgdGhpcy53cmFwLnN0eWxlLndlYmtpdFBlcnNwZWN0aXZlID0gc2NhbGUgKiA0O1xuICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgPT09IDEpID8gMTAwIDogKG9mZnNldCA+IDApID8gKDEgLSBpKSA6IChpIC0gMSk7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIDEuMyAqIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICB9LFxuICAgICdmbG93JzogZnVuY3Rpb24gZmxvdyhkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIGFic29sdXRlT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0KTtcbiAgICAgICAgdmFyIHJvdGF0ZURpcmVjdCA9IChheGlzID09PSAnWCcpID8gJ1knIDogJ1gnO1xuICAgICAgICB2YXIgZGlyZWN0QW1lbmQgPSAoYXhpcyA9PT0gJ1gnKSA/IDEgOiAtMTtcbiAgICAgICAgdmFyIG9mZnNldFJhdGlvID0gTWF0aC5hYnMob2Zmc2V0IC8gc2NhbGUpO1xuXG4gICAgICAgIHRoaXMud3JhcC5zdHlsZS53ZWJraXRQZXJzcGVjdGl2ZSA9IHNjYWxlICogNDtcblxuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0IDogKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICB9XG5cbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgwLjcsIDAuNykgdHJhbnNsYXRlWignICsgKG9mZnNldFJhdGlvICogMTUwIC0gMTUwKSAqIE1hdGguYWJzKGkgLSAxKSArICdweCknICsgJ3RyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJyArICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgZGlyZWN0QW1lbmQgKiAoMzAgLSBvZmZzZXRSYXRpbyAqIDMwKSAqICgxIC0gaSkgKyAnZGVnKSc7XG4gICAgfSxcbiAgICAnY2FyZCc6IGZ1bmN0aW9uIGNhcmQoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9tLmN1ciAmJiBkb20uY3VyICE9PSBpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSBudWxsO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgem9vbVNjYWxlID0gKGRvbS5jdXIpID8gMSAtIDAuMiAqIE1hdGguYWJzKGkgLSAxKSAtIE1hdGguYWJzKDAuMiAqIG9mZnNldCAvIHNjYWxlKS50b0ZpeGVkKDYpIDogMTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAoKDEgKyBNYXRoLmFicyhpIC0gMSkgKiAwLjIpICogb2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgIH0sXG4gICAgJ2ZhZGUnOiBmdW5jdGlvbiBmYWRlKGRvbSwgYXhpcywgc2NhbGUsIGksIG9mZnNldCkge1xuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA+IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgfVxuICAgICAgICBvZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAxIC0gKG9mZnNldCAvIHNjYWxlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0IC8gc2NhbGU7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/mmZXmn5PmianmlaNcbiAgICAneXJrcyc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0LCBvcHBvc2l0ZSkge1xuICAgICAgICBkb20uY3VyID0gMjtcblxuICAgICAgICAvL+ato+WQkVxuICAgICAgICBmdW5jdGlvbiBmb3J3YXJkKCkge1xuICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAoaSA8IDEpID8gJ2hpZGRlbicgOiAndmlzaWJsZSc7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gMSArIChvZmZzZXQgLyBzY2FsZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS5vcGFjaXR5ID0gLW9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uY3VyID0gMTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IG9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcHBvc2l0ZSkge1xuICAgICAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICBsZXQgem9vbVNjYWxlID0gKGRvbS5jdXIgPT09IDEpID8gMSA6IDI7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnc2NhbGUoJyArIHpvb21TY2FsZSArICcsICcgKyB6b29tU2NhbGUgKyAnKSB0cmFuc2xhdGVaKDApJztcbiAgICB9LFxuXG4gICAgLy/kuK3lv4PmlL7lpKdcbiAgICAnenhmZCc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0LCBvcHBvc2l0ZSkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuICAgICAgICBkb20uY3VyID0gMC4xO1xuXG4gICAgICAgIC8v5q2j5ZCRXG4gICAgICAgIGZ1bmN0aW9uIGZvcndhcmQoKSB7XG4gICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL+WPjeWQkVxuICAgICAgICBmdW5jdGlvbiByZXZlcnNlKCkge1xuICAgICAgICAgICAgaWYgKGkgPT0gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSAxO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wcG9zaXRlKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgem9vbVNjYWxlID0gKGRvbS5jdXIgPT09IDEpID8gMSA6IDAuMTtcbiAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdzY2FsZSgnICsgem9vbVNjYWxlICsgJywgJyArIHpvb21TY2FsZSArICcpIHRyYW5zbGF0ZVooMCknO1xuICAgIH0sXG5cbiAgICAvL+a4kOmakOa2iOWksVxuICAgICdqeXhzJzogZnVuY3Rpb24gZmFkZShkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IC1vZmZzZXQgLyBzY2FsZTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKGkgLSAxKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y+N5ZCRXG4gICAgICAgIGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7IC8v5q2j6KaB6KKr5pi+56S655qE6aG16Z2iXG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLm9wYWNpdHkgPSAxICsgKG9mZnNldCAvIHNjYWxlKTtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IG9mZnNldCAvIHNjYWxlO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUub3BhY2l0eSA9IDEgLSAob2Zmc2V0IC8gc2NhbGUpO1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoMSAtIGkpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG9mZnNldCA+IDApIHtcbiAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcHBvc2l0ZSkge1xuICAgICAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKDBweCknO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3J3YXJkKCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy/lubPmu5Hnp7vlh7pcbiAgICAncGh5Yyc6IGZ1bmN0aW9uIGZhZGUoZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0LCBvcHBvc2l0ZSkge1xuICAgICAgICBsZXQgYWJzb2x1dGVPZmZzZXQgPSBNYXRoLmFicyhvZmZzZXQpO1xuXG4gICAgICAgIC8v5q2j5ZCRXG4gICAgICAgIGZ1bmN0aW9uIGZvcndhcmQoKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpIDwgMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSAoaSAtIDEpICogYWJzb2x1dGVPZmZzZXQgKiAxMDAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy/lj43lkJFcbiAgICAgICAgZnVuY3Rpb24gcmV2ZXJzZSgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPiAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHsgLy/mraPopoHooqvmmL7npLrnmoTpobXpnaJcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChvZmZzZXQgPiAwKSB7XG4gICAgICAgICAgICByZXZlcnNlKCk7XG4gICAgICAgICAgICBpZiAoaSA8IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKG9wcG9zaXRlKSB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygnICsgKG9mZnNldCArIHNjYWxlICogKGkgLSAxKSkgKyAncHgpJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGVaKDApIHRyYW5zbGF0ZScgKyBheGlzICsgJygwcHgpJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvcndhcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoMHB4KSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZVooMCkgdHJhbnNsYXRlJyArIGF4aXMgKyAnKCcgKyAob2Zmc2V0ICsgc2NhbGUgKiAoaSAtIDEpKSArICdweCknO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoMHB4KSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8v5LiK5LiL5ruR5YqoXG4gICAgJ3N4aGQnOiBmdW5jdGlvbihkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG5cbiAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS56SW5kZXggPSBzY2FsZSAtIGFic29sdXRlT2Zmc2V0O1xuICAgICAgICAgICAgZG9tLmN1ciA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gKG9mZnNldCA+IDApID8gKDEgLSBpKSAqIGFic29sdXRlT2Zmc2V0ICogMTAwMCA6IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZG9tLmN1ciAmJiBkb20uY3VyICE9PSBpKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRvbS5jdXIgPSBudWxsO1xuICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCB6b29tU2NhbGUgPSAoZG9tLmN1cikgPyAxIC0gMC44ICogTWF0aC5hYnMoaSAtIDEpIC0gTWF0aC5hYnMoMC44ICogb2Zmc2V0IC8gc2NhbGUpLnRvRml4ZWQoNikgOiAxO1xuICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3NjYWxlKCcgKyB6b29tU2NhbGUgKyAnLCAnICsgem9vbVNjYWxlICsgJykgdHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArICgoMSArIE1hdGguYWJzKGkgLSAxKSAqIDAuMikgKiBvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfSxcblxuICAgIC8v5Y2h54mH57+76aG1XG4gICAgJ2twZnknOiBmdW5jdGlvbihkb20sIGF4aXMsIHNjYWxlLCBpLCBvZmZzZXQsIG9wcG9zaXRlKSB7XG4gICAgICAgIGxldCBhYnNvbHV0ZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldCk7XG4gICAgICAgIGxldCByb3RhdGVEaXJlY3QsIGRpcmVjdGlvbiwgZm9yd2FyZE1vcmVDc3NUZXh0LCByZXZlcnNlTW9yZUNzc1RleHQ7XG4gICAgICAgIGlmIChheGlzID09PSAnWCcpIHtcbiAgICAgICAgICAgIHJvdGF0ZURpcmVjdCA9ICdZJztcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IDE7XG4gICAgICAgICAgICBmb3J3YXJkTW9yZUNzc1RleHQgPSAnLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiByaWdodCA1MCUgMHB4Oyc7XG4gICAgICAgICAgICByZXZlcnNlTW9yZUNzc1RleHQgPSAnLXdlYmtpdC10cmFuc2Zvcm0tb3JpZ2luOiBsZWZ0IDUwJSAwcHg7JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJvdGF0ZURpcmVjdCA9ICdYJztcbiAgICAgICAgICAgIGRpcmVjdGlvbiA9IC0xO1xuICAgICAgICAgICAgZm9yd2FyZE1vcmVDc3NUZXh0ID0gJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbjogNTAlIGJvdHRvbSAwcHg7JztcbiAgICAgICAgICAgIHJldmVyc2VNb3JlQ3NzVGV4dCA9ICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW46IDUwJSB0b3AgMHB4Oyc7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndyYXAuc3R5bGUud2Via2l0UGVyc3BlY3RpdmUgPSBzY2FsZSAqIDQ7XG5cbiAgICAgICAgLy/mraPlkJFcbiAgICAgICAgZnVuY3Rpb24gZm9yd2FyZCgpIHtcbiAgICAgICAgICAgIGRvbS5zdHlsZS52aXNpYmlsaXR5ID0gKGkgPCAxKSA/ICdoaWRkZW4nIDogJ3Zpc2libGUnO1xuICAgICAgICAgICAgaWYgKGkgPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkb20uc3R5bGUuekluZGV4ID0gc2NhbGUgLSBhYnNvbHV0ZU9mZnNldDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IChpIC0gMSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjstd2Via2l0LXRyYW5zZm9ybS1zdHlsZTpwcmVzZXJ2ZS0zZDsgJyArICcgcG9zaXRpb246YWJzb2x1dGU7JyArIGZvcndhcmRNb3JlQ3NzVGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8v5Y+N5ZCRXG4gICAgICAgIGZ1bmN0aW9uIHJldmVyc2UoKSB7XG4gICAgICAgICAgICBkb20uc3R5bGUudmlzaWJpbGl0eSA9IChpID4gMSkgPyAnaGlkZGVuJyA6ICd2aXNpYmxlJztcbiAgICAgICAgICAgIGlmIChpID09PSAxKSB7IC8v5q2j6KaB6KKr5pi+56S655qE6aG16Z2iXG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9IHNjYWxlIC0gYWJzb2x1dGVPZmZzZXQ7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLnpJbmRleCA9ICgxIC0gaSkgKiBhYnNvbHV0ZU9mZnNldCAqIDEwMDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkb20uc3R5bGUuY3NzVGV4dCArPSAnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5OmhpZGRlbjsgLXdlYmtpdC10cmFuc2Zvcm0tc3R5bGU6cHJlc2VydmUtM2Q7ICcgKyAnIHBvc2l0aW9uOmFic29sdXRlOycgKyByZXZlcnNlTW9yZUNzc1RleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAob2Zmc2V0ID4gMCkge1xuICAgICAgICAgICAgcmV2ZXJzZSgpO1xuICAgICAgICAgICAgaWYgKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgKGRpcmVjdGlvbiAqIDkwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpKSArICdkZWcpJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChvcHBvc2l0ZSkge1xuICAgICAgICAgICAgICAgIHJldmVyc2UoKTtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoMGRlZykgJztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGkgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAncm90YXRlJyArIHJvdGF0ZURpcmVjdCArICcoJyArIChkaXJlY3Rpb24gKiA5MCAqIChvZmZzZXQgLyBzY2FsZSArIGkgLSAxKSkgKyAnZGVnKSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygwZGVnKSAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygwZGVnKSAnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdyb3RhdGUnICsgcm90YXRlRGlyZWN0ICsgJygnICsgKGRpcmVjdGlvbiAqIDkwICogKG9mZnNldCAvIHNjYWxlICsgaSAtIDEpKSArICdkZWcpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkb20uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ3JvdGF0ZScgKyByb3RhdGVEaXJlY3QgKyAnKDBkZWcpICc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcbn0pOyIsIi8qKlxuICogQSBzaW1wbGUsIGVmZmljZW50IG1vYmlsZSBzbGlkZXIgc29sdXRpb25cbiAqIEBmaWxlIGlTbGlkZXIuanNcbiAqIEBhdXRob3IgQkUtRkUgVGVhbVxuICogICAgcWJhdHkgcWJhdHkucWlAZ21haWwuY29tXG4gKiAgICB4aWV5dTMzMzMzIHhpZXl1MzMzMzNAZ21haWwuY29tXG4gKiAgICBzaGluYXRlIHNoaW5lLndhbmdyc0BnbWFpbC5jb21cbiAqXG4gKiBATElDRU5TRSBodHRwczovL2dpdGh1Yi5jb20vQkUtRkUvaVNsaWRlci9ibG9iL21hc3Rlci9MSUNFTlNFXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGluIGFycmF5XG4gKiBAcGFyYW0gb0VsZW1lbnRcbiAqIEBwYXJhbSBhU291cmNlXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaW5BcnJheShvRWxlbWVudCwgYVNvdXJjZSkge1xuICAgIHJldHVybiBhU291cmNlLmluZGV4T2Yob0VsZW1lbnQpID4gLTE7XG59O1xuXG4vKipcbiAqIENoZWNrIGlzIGFycmF5XG4gKiBAcGFyYW0gb1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXkobykge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykgPT09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG4vKipcbiAqIEBwYXJhbSBvYmpcbiAqIEBwYXJhbSBjbHNcbiAqIEByZXR1cm5zIHtBcnJheXx7aW5kZXg6IG51bWJlciwgaW5wdXQ6IHN0cmluZ319XG4gKi9cbmZ1bmN0aW9uIGhhc0NsYXNzKG9iaiwgY2xzKSB7XG4gICAgcmV0dXJuIG9iai5jbGFzc05hbWUubWF0Y2gobmV3IFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNscyArICcoXFxcXHN8JCknKSk7XG59XG5cbi8qKlxuICogQHBhcmFtIG9ialxuICogQHBhcmFtIGNsc1xuICovXG5mdW5jdGlvbiBhZGRDbGFzcyhvYmosIGNscykge1xuICAgIGlmICghaGFzQ2xhc3Mob2JqLCBjbHMpKSB7XG4gICAgICAgIG9iai5jbGFzc05hbWUgKz0gJyAnICsgY2xzO1xuICAgIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0gb2JqXG4gKiBAcGFyYW0gY2xzXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKG9iaiwgY2xzKSB7XG4gICAgaWYgKGhhc0NsYXNzKG9iaiwgY2xzKSkge1xuICAgICAgICBvYmouY2xhc3NOYW1lID0gb2JqLmNsYXNzTmFtZS5yZXBsYWNlKFJlZ0V4cCgnKFxcXFxzfF4pJyArIGNscyArICcoXFxcXHN8JCknKSwgJycpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBDaGVjY2sgaXMgdXJsXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNVcmwodXJsKSB7XG4gICAgaWYgKC88XFwvP1tePl0qPi9nLnRlc3QodXJsKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHJlZ2V4ID0gJ14nICtcbiAgICAgICAgJygoKGh0dHBzfGh0dHB8ZnRwfHJ0c3B8bW1zKTopPy8vKT8nICtcbiAgICAgICAgJygoWzAtOWEtel8hfipcXCcoKS4mPSskJS1dKzogKT9bMC05YS16XyF+KlxcJygpLiY9KyQlLV0rQCk/JyArXG4gICAgICAgICcoKFswLTldezEsM30uKXszfVswLTldezEsM318KFswLTlhLXpfIX4qXFwnKCktXSsuKSooWzAtOWEtel1bMC05YS16LV17MCw2MX0pP1swLTlhLXpdLlthLXpdezIsNn0pPycgK1xuICAgICAgICAnKDpbMC05XXsxLDR9KT8nICtcbiAgICAgICAgJyhbXlxcPyNdKyk/JyArXG4gICAgICAgICcoXFxcXFxcP1teI10rKT8nICtcbiAgICAgICAgJygjLispPycgK1xuICAgICAgICAnJCc7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAocmVnZXgpLnRlc3QodXJsKTtcbn1cblxuLyoqXG4gKiBAY29uc3RydWN0b3JcbiAqXG4gKiBpU2xpY2VyKFtbe0VsZW1lbnR9IGNvbnRhaW5lcixdIHtBcnJheX0gZGF0YWxpc3QsXSB7b2JqZWN0fSBvcHRpb25zKVxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGFpbmVyXG4gKiBAcGFyYW0ge0FycmF5fSBkYXRhbGlzdFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqICBvcHRpb25zLmRvbSA+IGNvbnRhaW5lclxuICogIG9wdGlvbnMuZGF0YSA+IGRhdGFsaXN0XG4gKi9cbnZhciBpU2xpZGVyID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCwgMyk7XG4gICAgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BhcmFtZXRlcnMgcmVxdWlyZWQhJyk7XG4gICAgfVxuXG4gICAgdmFyIG9wdHMgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJncy5zbGljZSgtMSlbMF0pID09PSAnW29iamVjdCBPYmplY3RdJyA/IGFyZ3MucG9wKCkgOiB7fTtcblxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgb3B0cy5kYXRhID0gb3B0cy5kYXRhIHx8IGFyZ3NbMV07XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIG9wdHMuZG9tID0gb3B0cy5kb20gfHwgYXJnc1swXTtcbiAgICB9XG5cbiAgICBpZiAoIW9wdHMuZG9tKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGNhbiBub3QgYmUgZW1wdHkhJyk7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRzLmRhdGEgfHwgIW9wdHMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEYXRhIG11c3QgYmUgYW4gYXJyYXkgYW5kIG11c3QgaGF2ZSBtb3JlIHRoYW4gb25lIGVsZW1lbnQhJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogT3B0aW9uc1xuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fb3B0cyA9IG9wdHM7XG5cbiAgICAvKipcbiAgICAgKiBsaXN0ZW5lclxuICAgICAqIEB0eXBlIHt7fX1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX0xTTiA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogRXZlbnQgaGFuZGxlXG4gICAgICogQHR5cGUge3t9fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fRXZlbnRIYW5kbGUgPSB7fTtcblxuICAgIG9wdHMgPSBhcmdzID0gbnVsbDtcblxuICAgIHRoaXMuX3NldHRpbmcoKTtcblxuICAgIHRoaXMuZmlyZSgnaW5pdGlhbGl6ZScpO1xuICAgIHRoaXMuX3JlbmRlcldyYXBwZXIoKTtcbiAgICB0aGlzLl9pbml0UGx1Z2lucygpO1xuICAgIHRoaXMuX2JpbmRIYW5kbGVyKCk7XG59O1xuXG4vKipcbiAqIEV2ZW50IHdoaXRlIGxpc3RcbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlci5FVkVOVFMgPSAnaW5pdGlhbGl6ZSBzbGlkZSBzbGlkZVN0YXJ0IHNsaWRlRW5kIHNsaWRlQ2hhbmdlIHNsaWRlQ2hhbmdlZCBzbGlkZVJlc3RvcmUgc2xpZGVSZXN0b3JlZCByZWxvYWREYXRhIHJlc2V0IGRlc3Ryb3knLnNwbGl0KCcgJyk7XG5cbi8qKlxuICogRWFzaW5nIHdoaXRlIGxpc3RcbiAqIEB0eXBlIFtBcnJheSwgUmVnRXhwW11dXG4gKiBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXIuRUFTSU5HID0gW1xuICAgICdsaW5lYXIgZWFzZSBlYXNlLWluIGVhc2Utb3V0IGVhc2UtaW4tb3V0Jy5zcGxpdCgnICcpLFxuICAgIC9jdWJpYy1iZXppZXJcXCgoW15cXGRdKihcXGQrLj9cXGQqKVteXFwsXSpcXCw/KXs0fVxcKS9cbl07XG5cbi8qKlxuICogVEFHUyB3aGl0ZWxpc3Qgb24gZml4cGFnZSBtb2RlXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXIuRklYX1BBR0VfVEFHUyA9ICdTRUxFQ1QgSU5QVVQgVEVYVEFSRUEgQlVUVE9OIExBQkVMJy5zcGxpdCgnICcpO1xuXG4vKipcbiAqIFRoZSBlbXB0eSBmdW5jdGlvblxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlci5FTVBUWV9GVU5DVElPTiA9IGZ1bmN0aW9uKCkge307XG5cbi8qKlxuICogRXh0ZW5kXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXIuZXh0ZW5kID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1haW4sIGV4dGVuZCwgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBtYWluID0gaVNsaWRlci5wcm90b3R5cGU7XG4gICAgICAgICAgICBleHRlbmQgPSBhcmdzWzBdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgIG1haW4gPSBhcmdzWzBdO1xuICAgICAgICAgICAgZXh0ZW5kID0gYXJnc1sxXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGZvciAodmFyIHByb3BlcnR5IGluIGV4dGVuZCkge1xuICAgICAgICBpZiAoZXh0ZW5kLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgICAgbWFpbltwcm9wZXJ0eV0gPSBleHRlbmRbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBQbHVnaW5zXG4gKiBAdHlwZSB7e319XG4gKiBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXIucGx1Z2lucyA9IHt9O1xuXG4vKipcbiAqIEBwYXJhbSBuYW1lXG4gKiBAcGFyYW0gcGx1Z2luXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXIucmVnUGx1Z2luID0gZnVuY3Rpb24obmFtZSwgcGx1Z2luKSB7XG4gICAgaVNsaWRlci5wbHVnaW5zW25hbWVdID0gaVNsaWRlci5wbHVnaW5zW25hbWVdIHx8IHBsdWdpbjtcbn07XG5cbi8qKlxuICogYW5pbWF0aW9uIHBhcm1hczpcbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGRvbSDlm77niYfnmoTlpJblsYI8bGk+5a655ZmoIEltZyB3cmFwcGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gYXhpcyDliqjnlLvmlrnlkJEgYW5pbWF0ZSBkaXJlY3Rpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsZSDlrrnlmajlrr3luqYgT3V0ZXIgd3JhcHBlclxuICogQHBhcmFtIHtOdW1iZXJ9IGkgPGxpPuWuueWZqGluZGV4IEltZyB3cmFwcGVyJ3MgaW5kZXhcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXQg5ruR5Yqo6Led56a7IG1vdmUgZGlzdGFuY2VcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlci5fYW5pbWF0ZUZ1bmNzID0ge1xuICAgICdkZWZhdWx0JzogZnVuY3Rpb24oZG9tLCBheGlzLCBzY2FsZSwgaSwgb2Zmc2V0KSB7XG4gICAgICAgIGRvbS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAndHJhbnNsYXRlWigwKSB0cmFuc2xhdGUnICsgYXhpcyArICcoJyArIChvZmZzZXQgKyBzY2FsZSAqIChpIC0gMSkpICsgJ3B4KSc7XG4gICAgfVxufTtcblxuLyoqXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlci5fdHJhbnNpdGlvbkVuZEV2ZW50ID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBldnROYW1lO1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGV2dE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiBldnROYW1lO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2Zha2VFbGVtZW50Jyk7XG4gICAgICAgIHZhciB0cmFuc2l0aW9ucyA9IHtcbiAgICAgICAgICAgIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgICAgICAgICAgIE9UcmFuc2l0aW9uOiAnb1RyYW5zaXRpb25FbmQnLFxuICAgICAgICAgICAgTW96VHJhbnNpdGlvbjogJ3RyYW5zaXRpb25lbmQnLFxuICAgICAgICAgICAgV2Via2l0VHJhbnNpdGlvbjogJ3dlYmtpdFRyYW5zaXRpb25FbmQnXG4gICAgICAgIH07XG4gICAgICAgIGZvciAodmFyIHQgaW4gdHJhbnNpdGlvbnMpIHtcbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9ucy5oYXNPd25Qcm9wZXJ0eSh0KSAmJiBlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChldnROYW1lID0gdHJhbnNpdGlvbnNbdF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbn0pKCk7XG5cbi8qKlxuICogVGhpcyBpcyBhIGFsaWFzLCBjb25kdWNpdmUgdG8gY29tcHJlc3Npb25cbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZhciBpU2xpZGVyUHJvdG90eXBlID0gaVNsaWRlci5wcm90b3R5cGU7XG5cbi8qKlxuICogJiBpU2xpZGVyLmV4dGVuZFxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLmV4dGVuZCA9IGlTbGlkZXIuZXh0ZW5kO1xuXG4vKipcbiAqIHNldHRpbmcgcGFyYW1ldGVycyBmb3Igc2xpZGVyXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9zZXR0aW5nID0gZnVuY3Rpb24oKSB7XG5cbiAgICAvKipcbiAgICAgKiBUaGUgcGx1Z2luc1xuICAgICAqIEB0eXBlIHtBcnJheXx7fXwqfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5fcGx1Z2lucyA9IGlTbGlkZXIucGx1Z2lucztcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHR5cGUge3tkZWZhdWx0OiBGdW5jdGlvbn18Kn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuX2FuaW1hdGVGdW5jcyA9IGlTbGlkZXIuX2FuaW1hdGVGdW5jcztcblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtib29sZWFufVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5ob2xkaW5nID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMubG9ja2luZyA9IGZhbHNlO1xuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyAtIFNldCBvcHRpb25zXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIHZhciBvcHRzID0gdGhpcy5fb3B0cztcblxuICAgIC8qKlxuICAgICAqIGRvbSBlbGVtZW50IHdyYXBwaW5nIGNvbnRlbnRcbiAgICAgKiBAdHlwZSB7RWxlbWVudH1cbiAgICAgKiBAcHVibGljXG4gICAgICovXG4gICAgdGhpcy53cmFwID0gb3B0cy5kb207XG5cbiAgICAvKipcbiAgICAgKiBEYXRhIGxpc3RcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuZGF0YSA9IG9wdHMuZGF0YTtcblxuICAgIC8qKlxuICAgICAqIGRlZmF1bHQgc2xpZGUgZGlyZWN0aW9uXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuaXNWZXJ0aWNhbCA9ICEhb3B0cy5pc1ZlcnRpY2FsO1xuXG4gICAgLyoqXG4gICAgICogT3ZlcnNwcmVhZCBtb2RlXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuaXNPdmVyc3ByZWFkID0gISFvcHRzLmlzT3ZlcnNwcmVhZDtcblxuICAgIC8qKlxuICAgICAqIFBsYXkgdGltZSBnYXBcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmR1cmF0aW9uID0gb3B0cy5kdXJhdGlvbiB8fCAyMDAwO1xuXG4gICAgLyoqXG4gICAgICogc3RhcnQgZnJvbSBpbml0SW5kZXggb3IgMFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuaW5pdEluZGV4ID0gb3B0cy5pbml0SW5kZXggPiAwICYmIG9wdHMuaW5pdEluZGV4IDwgb3B0cy5kYXRhLmxlbmd0aCAtIDEgPyBvcHRzLmluaXRJbmRleCA6IDA7XG5cbiAgICAvKipcbiAgICAgKiB0b3VjaHN0YXJ0IHByZXZlbnQgZGVmYXVsdCB0byBmaXhQYWdlXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuZml4UGFnZSA9IG9wdHMuZml4UGFnZSA9PSBudWxsID8gdHJ1ZSA6ICEhb3B0cy5maXhQYWdlO1xuXG4gICAgLyoqXG4gICAgICogc2xpZGVJbmRleFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnNsaWRlSW5kZXggPSB0aGlzLnNsaWRlSW5kZXggfHwgdGhpcy5pbml0SW5kZXggfHwgMDtcblxuICAgIC8qKlxuICAgICAqIEF4aXNcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmF4aXMgPSB0aGlzLmlzVmVydGljYWwgPyAnWScgOiAnWCc7XG5cbiAgICAvKipcbiAgICAgKiByZXZlcnNlQXhpc1xuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnJldmVyc2VBeGlzID0gdGhpcy5heGlzID09PSAnWScgPyAnWCcgOiAnWSc7XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcGVyIHdpZHRoXG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMud2lkdGggPSB0aGlzLndyYXAuY2xpZW50V2lkdGg7XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcGVyIGhlaWdodFxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmhlaWdodCA9IHRoaXMud3JhcC5jbGllbnRIZWlnaHQ7XG5cbiAgICAvKipcbiAgICAgKiBSYXRpbyBoZWlnaHQ6d2lkdGhcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5yYXRpbyA9IHRoaXMuaGVpZ2h0IC8gdGhpcy53aWR0aDtcblxuICAgIC8qKlxuICAgICAqIFNjYWxlLCBzaXplIHJ1bGVcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5zY2FsZSA9IHRoaXMuaXNWZXJ0aWNhbCA/IHRoaXMuaGVpZ2h0IDogdGhpcy53aWR0aDtcblxuICAgIC8qKlxuICAgICAqIE9uIHNsaWRlIG9mZnNldCBwb3NpdGlvblxuICAgICAqIEB0eXBlIHt7WDogbnVtYmVyLCBZOiBudW1iZXJ9fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5vZmZzZXQgPSB0aGlzLm9mZnNldCB8fCB7XG4gICAgICAgIFg6IDAsXG4gICAgICAgIFk6IDBcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlL2Rpc2FibGUgdG91Y2ggZXZlbnRzXG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmlzVG91Y2hhYmxlID0gb3B0cy5pc1RvdWNoYWJsZSA9PSBudWxsID8gdHJ1ZSA6ICEhb3B0cy5pc1RvdWNoYWJsZTtcblxuICAgIC8qKlxuICAgICAqIGxvb3BpbmcgbG9naWMgYWRqdXN0XG4gICAgICogQHR5cGUge2Jvb2xlYW59XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmlzTG9vcGluZyA9IG9wdHMuaXNMb29waW5nICYmIHRoaXMuZGF0YS5sZW5ndGggPiAxID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogQXV0b1BsYXkgd2FpdHRpbmcgbWlsc2Vjb25kIHRvIHN0YXJ0XG4gICAgICogQHR5cGUge251bWJlcn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuZGVsYXkgPSBvcHRzLmRlbGF5IHx8IDA7XG5cbiAgICAvKipcbiAgICAgKiBhdXRvcGxheSBsb2dpYyBhZGp1c3RcbiAgICAgKiBAdHlwZSB7Ym9vbGVhbn1cbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHRoaXMuaXNBdXRvcGxheSA9IG9wdHMuaXNBdXRvcGxheSAmJiB0aGlzLmRhdGEubGVuZ3RoID4gMSA/IHRydWUgOiBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIEFuaW1hdGUgdHlwZVxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmFuaW1hdGVUeXBlID0gb3B0cy5hbmltYXRlVHlwZSBpbiB0aGlzLl9hbmltYXRlRnVuY3MgPyBvcHRzLmFuaW1hdGVUeXBlIDogJ2RlZmF1bHQnO1xuXG4gICAgLyoqXG4gICAgICogQHByb3RlY3RlZFxuICAgICAqL1xuICAgIHRoaXMuX2FuaW1hdGVGdW5jID0gdGhpcy5fYW5pbWF0ZUZ1bmNzW3RoaXMuYW5pbWF0ZVR5cGVdO1xuXG4gICAgLy8gbGl0dGxlIHRyaWNrIHNldCwgd2hlbiB5b3UgY2hvb2NlIHRlYXIgJiB2ZXJ0aWNhbCBzYW1lIHRpbWVcbiAgICAvLyBpU2xpZGVyIG92ZXJzcHJlYWQgbW9kZSB3aWxsIGJlIHNldCB0cnVlIGF1dG9tZXRpY2x5XG4gICAgaWYgKHRoaXMuaXNWZXJ0aWNhbCAmJiB0aGlzLmFuaW1hdGVUeXBlID09PSAnY2FyZCcpIHtcbiAgICAgICAgdGhpcy5pc092ZXJzcHJlYWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlYnVnIG1vZGVcbiAgICAgKiBAdHlwZSB7ZnVuY3Rpb259XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmxvZyA9IG9wdHMuaXNEZWJ1ZyA/IGZ1bmN0aW9uKCkge1xuICAgICAgICBnbG9iYWwuY29uc29sZS5sb2cuYXBwbHkoZ2xvYmFsLmNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgfSA6IGlTbGlkZXIuRU1QVFlfRlVOQ1RJT047XG5cbiAgICAvLyBzZXQgRGFtcGluZyBmdW5jdGlvblxuICAgIHRoaXMuX3NldFVwRGFtcGluZygpO1xuXG4gICAgLy8gc3RvcCBhdXRvcGxheSB3aGVuIHdpbmRvdyBibHVyXG4gICAgLy8gdGhpcy5fc2V0UGxheVdoZW5Gb2N1cygpO1xuXG4gICAgLyoqXG4gICAgICogYW5pbWF0ZSBwcm9jZXNzIHRpbWUgKG1zKSwgZGVmYXVsdDogMzAwbXNcbiAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmFuaW1hdGVUaW1lID0gb3B0cy5hbmltYXRlVGltZSAhPSBudWxsICYmIG9wdHMuYW5pbWF0ZVRpbWUgPiAtMSA/IG9wdHMuYW5pbWF0ZVRpbWUgOiAzMDA7XG5cbiAgICAvKipcbiAgICAgKiBhbmltYXRlIGVmZmVjdHMsIGRlZmF1bHQ6IGVhc2VcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBwdWJsaWNcbiAgICAgKi9cbiAgICB0aGlzLmFuaW1hdGVFYXNpbmcgPVxuICAgICAgICBpbkFycmF5KG9wdHMuYW5pbWF0ZUVhc2luZywgaVNsaWRlci5FQVNJTkdbMF0pIHx8IGlTbGlkZXIuRUFTSU5HWzFdLnRlc3Qob3B0cy5hbmltYXRlRWFzaW5nKSA/IG9wdHMuYW5pbWF0ZUVhc2luZyA6ICdlYXNlJztcblxuICAgIC8qKlxuICAgICAqIEluIHNsaWRlIGFuaW1hdGlvblxuICAgICAqIEB0eXBlIHtudW1iZXJ9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmluQW5pbWF0ZSA9IDA7XG5cbiAgICAvKipcbiAgICAgKiBGaXggdG91Y2gvbW91c2UgZXZlbnRzXG4gICAgICogQHR5cGUge3toYXNUb3VjaCwgc3RhcnRFdnQsIG1vdmVFdnQsIGVuZEV2dH19XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLmRldmljZUV2ZW50cyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGhhc1RvdWNoID0gISEoKCdvbnRvdWNoc3RhcnQnIGluIGdsb2JhbCkgfHwgZ2xvYmFsLkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBnbG9iYWwuRG9jdW1lbnRUb3VjaCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYXNUb3VjaDogaGFzVG91Y2gsXG4gICAgICAgICAgICBzdGFydEV2dDogaGFzVG91Y2ggPyAndG91Y2hzdGFydCcgOiAnbW91c2Vkb3duJyxcbiAgICAgICAgICAgIG1vdmVFdnQ6IGhhc1RvdWNoID8gJ3RvdWNobW92ZScgOiAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgIGVuZEV2dDogaGFzVG91Y2ggPyAndG91Y2hlbmQnIDogJ21vdXNldXAnXG4gICAgICAgIH07XG4gICAgfSkoKTtcblxuICAgIC8qKlxuICAgICAqIEluaXQgZXZlbnRzXG4gICAgICogQHR5cGUge3t9fVxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG4gICAgdGhpcy5ldmVudHMgPSB7fTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gLSBSZWdpc3RlciBldmVudHNcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB5b3VyIGZpbmdlciBpcyBtb3ZpbmdcbiAgICB0aGlzLm9uKCdzbGlkZScsIG9wdHMub25zbGlkZSwgMSk7XG5cbiAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHlvdXIgZmluZ2VyIHRvdWNoIHRoZSBzY3JlZW5cbiAgICB0aGlzLm9uKCdzbGlkZVN0YXJ0Jywgb3B0cy5vbnNsaWRlc3RhcnQsIDEpO1xuXG4gICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgZmluZ2VyIG1vdmUgb3V0IG9mIHRoZSBzY3JlZW5cbiAgICB0aGlzLm9uKCdzbGlkZUVuZCcsIG9wdHMub25zbGlkZWVuZCwgMSk7XG5cbiAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHNsaWRlIHRvIG5leHQvcHJldiBzY2VuZVxuICAgIHRoaXMub24oJ3NsaWRlQ2hhbmdlJywgb3B0cy5vbnNsaWRlY2hhbmdlLCAxKTtcblxuICAgIC8vIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gbmV4dC9wcmV2IHNjZW5lLCB3aGlsZSBhbmltYXRpb24gaGFzIGNvbXBsZXRlZFxuICAgIHRoaXMub24oJ3NsaWRlQ2hhbmdlZCcsIG9wdHMub25zbGlkZWNoYW5nZWQsIDEpO1xuXG4gICAgLy8gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiByZXN0b3JlIHRvIHRoZSBjdXJyZW50IHNjZW5lXG4gICAgdGhpcy5vbignc2xpZGVSZXN0b3JlJywgb3B0cy5vbnNsaWRlcmVzdG9yZSwgMSk7XG5cbiAgICAvLyBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHJlc3RvcmUgdG8gdGhlIGN1cnJlbnQgc2NlbmUsIHdoaWxlIGFuaW1hdGlvbiBoYXMgY29tcGxldGVkXG4gICAgdGhpcy5vbignc2xpZGVSZXN0b3JlZCcsIG9wdHMub25zbGlkZXJlc3RvcmVkLCAxKTtcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gLSBQbHVnaW5zXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuICAgIC8qKlxuICAgICAqIEB0eXBlIHtvYmplY3R9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLnBsdWdpbkNvbmZpZyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkob3B0cy5wbHVnaW5zKSkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZyA9IHt9O1xuICAgICAgICAgICAgb3B0cy5wbHVnaW5zLmZvckVhY2goZnVuY3Rpb24gcGx1Z2luQ29uZmlnRWFjaChwbHVnaW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNBcnJheShwbHVnaW4pKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ1twbHVnaW5bMF1dID0gcGx1Z2luLnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnW3BsdWdpbl0gPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjb25maWc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4ge31cbiAgICAgICAgfVxuICAgIH0pKCk7XG5cbiAgICAvLyBBdXRvcGxheSBtb2RlXG4gICAgdGhpcy5kZWxheSA/IGdsb2JhbC5zZXRUaW1lb3V0KHRoaXMuX2F1dG9QbGF5LmJpbmQodGhpcyksIHRoaXMuZGVsYXkpIDogdGhpcy5fYXV0b1BsYXkoKTtcbn07XG5cbi8qKlxuICogSW5pdCBwbHVnaW5zXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9pbml0UGx1Z2lucyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb25maWcgPSB0aGlzLnBsdWdpbkNvbmZpZztcbiAgICB2YXIgcGx1Z2lucyA9IHRoaXMuX3BsdWdpbnM7XG4gICAgZm9yICh2YXIgaSBpbiBjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5oYXNPd25Qcm9wZXJ0eShpKSAmJiBwbHVnaW5zLmhhc093blByb3BlcnR5KGkpKSB7XG4gICAgICAgICAgICB0aGlzLmxvZygnW0lOSVQgUExVR0lOXTonLCBpLCBwbHVnaW5zW2ldKTtcbiAgICAgICAgICAgIHBsdWdpbnNbaV0gJiYgdHlwZW9mIHBsdWdpbnNbaV0gPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHBsdWdpbnNbaV0uYXBwbHkgJiYgcGx1Z2luc1tpXS5hcHBseSh0aGlzLCBjb25maWdbaV0pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiBlbmFibGUgZGFtcGluZyB3aGVuIHNsaWRlciBtZWV0IHRoZSBlZGdlXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9zZXRVcERhbXBpbmcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb25lSW4yID0gdGhpcy5zY2FsZSA+PiAxO1xuICAgIHZhciBvbmVJbjQgPSBvbmVJbjIgPj4gMTtcbiAgICB2YXIgb25lSW4xNiA9IG9uZUluNCA+PiAyO1xuXG4gICAgLyoqXG4gICAgICogaW5pdCBkYW1waW5nIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIGRpc3RhbmNlXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICogQHByaXZhdGVcbiAgICAgKi9cbiAgICB0aGlzLl9kYW1waW5nID0gZnVuY3Rpb24oZGlzdGFuY2UpIHtcbiAgICAgICAgdmFyIGRpcyA9IE1hdGguYWJzKGRpc3RhbmNlKTtcbiAgICAgICAgdmFyIHJlc3VsdDtcblxuICAgICAgICBpZiAoZGlzIDwgb25lSW4yKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBkaXMgPj4gMTtcbiAgICAgICAgfSBlbHNlIGlmIChkaXMgPCBvbmVJbjIgKyBvbmVJbjQpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArICgoZGlzIC0gb25lSW4yKSA+PiAyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IG9uZUluNCArIG9uZUluMTYgKyAoKGRpcyAtIG9uZUluMiAtIG9uZUluNCkgPj4gMyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGlzdGFuY2UgPiAwID8gcmVzdWx0IDogLXJlc3VsdDtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBHZXQgaXRlbSB0eXBlXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXhcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9pdGVtVHlwZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoIWlzTmFOKGl0ZW0pKSB7XG4gICAgICAgIGl0ZW0gPSB0aGlzLmRhdGFbaXRlbV07XG4gICAgfVxuICAgIGlmIChpdGVtLmhhc093blByb3BlcnR5KCd0eXBlJykpIHtcbiAgICAgICAgcmV0dXJuIGl0ZW0udHlwZTtcbiAgICB9XG4gICAgdmFyIGNvbnRlbnQgPSBpdGVtLmNvbnRlbnQ7XG4gICAgdmFyIHR5cGU7XG4gICAgaWYgKGNvbnRlbnQgPT0gbnVsbCkge1xuICAgICAgICB0eXBlID0gJ2VtcHR5JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoQm9vbGVhbihjb250ZW50Lm5vZGVOYW1lKSAmJiBCb29sZWFuKGNvbnRlbnQubm9kZVR5cGUpKSB7XG4gICAgICAgICAgICB0eXBlID0gJ25vZGUnO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgaWYgKGlzVXJsKGNvbnRlbnQpKSB7XG4gICAgICAgICAgICAgICAgdHlwZSA9ICdwaWMnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0eXBlID0gJ2h0bWwnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHlwZSA9ICd1bmtub3duJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGl0ZW0udHlwZSA9IHR5cGU7XG5cbiAgICByZXR1cm4gdHlwZTtcbn07XG5cbi8qKlxuICogcmVuZGVyIHNpbmdsZSBpdGVtIGh0bWwgYnkgaWR4XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbCAuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRhdGFJbmRleCAgLi5cbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX3JlbmRlckl0ZW0gPSBmdW5jdGlvbihlbCwgZGF0YUluZGV4KSB7XG5cbiAgICB2YXIgaXRlbSxcbiAgICAgICAgc2VsZiA9IHRoaXMsXG4gICAgICAgIGxlbiA9IHRoaXMuZGF0YS5sZW5ndGg7XG5cbiAgICB2YXIgaW5zZXJ0SW1nID0gZnVuY3Rpb24gcmVuZGVySXRlbUluc2VydEltZygpIHtcbiAgICAgICAgdmFyIHNpbWcgPSAnIHNyYz1cIicgKyBpdGVtLmNvbnRlbnQgKyAnXCInO1xuICAgICAgICAvLyBhdXRvIHNjYWxlIHRvIGZ1bGwgc2NyZWVuXG4gICAgICAgIGlmIChpdGVtLmhlaWdodCAvIGl0ZW0ud2lkdGggPiBzZWxmLnJhdGlvKSB7XG4gICAgICAgICAgICBzaW1nICs9ICcgaGVpZ2h0PVwiMTAwJVwiJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpbWcgKz0gJyB3aWR0aD1cIjEwMCVcIic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNlbGYuaXNPdmVyc3ByZWFkKSB7XG4gICAgICAgICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3VybCgnICsgaXRlbS5jb250ZW50ICsgJykgbm8tcmVwZWF0IDUwJSA1MCUvY292ZXInO1xuICAgICAgICAgICAgc2ltZyArPSAnIHN0eWxlPVwiZGlzcGxheTpibG9jaztvcGFjaXR5OjA7aGVpZ2h0OjEwMCU7d2lkdGg6MTAwJTtcIidcbiAgICAgICAgfVxuICAgICAgICAvLyBmb3IgcmlnaHQgYnV0dG9uLCBzYXZlIHBpY3R1cmVcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gJzxpbWcnICsgc2ltZyArICcgLz4nO1xuICAgIH07XG5cbiAgICAvLyBjbGVhbiBzY2VuZVxuICAgIGVsLmlubmVySFRNTCA9ICcnO1xuICAgIGVsLnN0eWxlLmJhY2tncm91bmQgPSAnJztcblxuICAgIC8vIGdldCB0aGUgcmlnaHQgaXRlbSBvZiBkYXRhXG4gICAgaWYgKCF0aGlzLmlzTG9vcGluZyAmJiB0aGlzLmRhdGFbZGF0YUluZGV4XSA9PSBudWxsKSB7XG4gICAgICAgIC8vIFN0b3Agc2xpZGUgd2hlbiBpdGVtIGlzIGVtcHR5XG4gICAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhSW5kZXggPSAobGVuIC8qICogTWF0aC5jZWlsKE1hdGguYWJzKGRhdGFJbmRleCAvIGxlbikpKi8gKyBkYXRhSW5kZXgpICUgbGVuO1xuICAgICAgICBpdGVtID0gdGhpcy5kYXRhW2RhdGFJbmRleF07XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSB0aGlzLl9pdGVtVHlwZShpdGVtKTtcblxuICAgIHRoaXMubG9nKCdbUmVuZGVyIElURU1dOicsIHR5cGUsIGRhdGFJbmRleCwgaXRlbSk7XG5cbiAgICBlbC5jbGFzc05hbWUgPSAnaXNsaWRlci0nICsgdHlwZTtcblxuICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICBjYXNlICdwaWMnOlxuICAgICAgICAgICAgaWYgKGl0ZW0ubG9hZCA9PT0gMikge1xuICAgICAgICAgICAgICAgIGluc2VydEltZygpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJbWcuc3JjID0gaXRlbS5jb250ZW50O1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uaGVpZ2h0ID0gY3VycmVudEltZy5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ud2lkdGggPSBjdXJyZW50SW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBpbnNlcnRJbWcoKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5sb2FkID0gMjtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2RvbSc6XG4gICAgICAgIGNhc2UgJ2h0bWwnOlxuICAgICAgICAgICAgZWwuaW5uZXJIVE1MID0gaXRlbS5jb250ZW50O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ25vZGUnOlxuICAgICAgICBjYXNlICdlbGVtZW50JzpcbiAgICAgICAgICAgIC8vIGZyYWdtZW50LCBjcmVhdGUgY29udGFpbmVyXG4gICAgICAgICAgICBpZiAoaXRlbS5jb250ZW50Lm5vZGVUeXBlID09PSAxMSkge1xuICAgICAgICAgICAgICAgIHZhciBlbnRpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBlbnRpdHkuYXBwZW5kQ2hpbGQoaXRlbS5jb250ZW50KTtcbiAgICAgICAgICAgICAgICBpdGVtLmNvbnRlbnQgPSBlbnRpdHk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChpdGVtLmNvbnRlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICB0aGlzLmZpcmUoJ3JlbmRlckNvbXBsZXRlJyk7XG59O1xuXG4vKipcbiAqIFBvc3Rwb25pbmcgdGhlIGludGVybWVkaWF0ZSBzY2VuZSByZW5kZXJpbmdcbiAqIHVudGlsIHRoZSB0YXJnZXQgc2NlbmUgaXMgY29tcGxldGVseSByZW5kZXJlZCAocmVuZGVyIGluIGV2ZW50IHNsaWRlQ2hhbmdlZClcbiAqIHRvIGF2b2lkIGEganVtcHkgZmVlbCB3aGVuIHN3aXRjaGluZyBiZXR3ZWVuIHNjZW5lc1xuICogZ2l2ZW4gdGhhdCB0aGUgZGlzdGFuY2Ugb2Ygc2xpZGluZyBpcyBtb3JlIHRoYW4gMS5cbiAqIGUuZy4gYGBgdGhpcy5zbGlkZVRvKD4rLTEpYGBgXG4gKlxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fcmVuZGVySW50ZXJtZWRpYXRlU2NlbmUgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy5faW50ZXJtZWRpYXRlU2NlbmUgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW5kZXJJdGVtLmFwcGx5KHRoaXMsIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lKTtcbiAgICAgICAgdGhpcy5faW50ZXJtZWRpYXRlU2NlbmUgPSBudWxsO1xuICAgIH1cbn07XG5cbi8qKlxuICogQXBwbHkgc3R5bGVzIG9uIGNoYW5nZWRcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX2NoYW5nZWRTdHlsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2xpZGVTdHlsZXMgPSBbJ2lzbGlkZXItcHJldicsICdpc2xpZGVyLWFjdGl2ZScsICdpc2xpZGVyLW5leHQnXTtcbiAgICB0aGlzLmVscy5mb3JFYWNoKGZ1bmN0aW9uIGNoYW5nZVN0eXBlRWFjaChlbCwgaW5kZXgpIHtcbiAgICAgICAgcmVtb3ZlQ2xhc3MoZWwsICcoJyArIHNsaWRlU3R5bGVzLmpvaW4oJ3wnKSArICcpJyk7XG4gICAgICAgIGFkZENsYXNzKGVsLCBzbGlkZVN0eWxlc1tpbmRleF0pXG4gICAgfSk7XG59O1xuXG4vKipcbiAqIHJlbmRlciBsaXN0IGh0bWxcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX3JlbmRlcldyYXBwZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLm91dGVyICYmICh0aGlzLm91dGVyLmlubmVySFRNTCA9ICcnKTtcbiAgICAvLyBpbml0YWlsIHVsIGVsZW1lbnRcbiAgICB2YXIgb3V0ZXIgPSB0aGlzLm91dGVyIHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgb3V0ZXIuY2xhc3NOYW1lID0gJ2lzbGlkZXItb3V0ZXInO1xuXG4gICAgLy8gc3RvcmFnZSBsaSBlbGVtZW50cywgb25seSBzdG9yZSAzIGVsZW1lbnRzIHRvIHJlZHVjZSBtZW1vcnkgdXNhZ2VcbiAgICAvKipcbiAgICAgKiBTbGlkZXIgZWxlbWVudHMgeDNcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICogQHB1YmxpY1xuICAgICAqL1xuICAgIHRoaXMuZWxzID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgICB0aGlzLmVscy5wdXNoKGxpKTtcblxuICAgICAgICAvLyBwcmVwYXJlIHN0eWxlIGFuaW1hdGlvblxuICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyhsaSwgdGhpcy5heGlzLCB0aGlzLnNjYWxlLCBpLCAwKTtcblxuICAgICAgICAvLyBhdXRvIG92ZXJmbG93IGluIG5vbmUgZml4UGFnZSBtb2RlXG4gICAgICAgIGlmICghdGhpcy5maXhQYWdlKSB7XG4gICAgICAgICAgICBsaS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuaXNWZXJ0aWNhbCAmJiAodGhpcy5hbmltYXRlVHlwZSA9PT0gJ3JvdGF0ZScgfHwgdGhpcy5hbmltYXRlVHlwZSA9PT0gJ2ZsaXAnKSA/IHRoaXMuX3JlbmRlckl0ZW0obGksIDEgLSBpICsgdGhpcy5zbGlkZUluZGV4KSA6IHRoaXMuX3JlbmRlckl0ZW0obGksIGkgLSAxICsgdGhpcy5zbGlkZUluZGV4KTtcblxuICAgICAgICBvdXRlci5hcHBlbmRDaGlsZChsaSk7XG4gICAgfVxuXG4gICAgdGhpcy5fY2hhbmdlZFN0eWxlcygpO1xuXG4gICAgLy8gUHJlbG9hZCBwaWN0dXJlIFsgbWF5IGJlIHBpYyA6KSBdXG4gICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuX3ByZWxvYWRJbWcodGhpcy5zbGlkZUluZGV4KTtcbiAgICB9LmJpbmQodGhpcyksIDIwMCk7XG5cbiAgICAvLyBhcHBlbmQgdWwgdG8gZGl2I2NhbnZhc1xuICAgIGlmICghdGhpcy5vdXRlcikge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge0VsZW1lbnR9XG4gICAgICAgICAqIEBwdWJsaWNcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub3V0ZXIgPSBvdXRlcjtcbiAgICAgICAgdGhpcy53cmFwLmFwcGVuZENoaWxkKG91dGVyKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFByZWxvYWQgaW1nIHdoZW4gc2xpZGVDaGFuZ2VcbiAqIEZyb20gY3VycmVudCBpbmRleCArMiwgLTIgc2NlbmVcbiAqIEBwYXJhbSB7bnVtYmVyfSBkYXRhSW5kZXggbWVhbnMgd2hpY2ggaW1hZ2Ugd2lsbCBiZSBsb2FkXG4gKiBAcHJpdmF0ZVxuICovXG5pU2xpZGVyUHJvdG90eXBlLl9wcmVsb2FkSW1nID0gZnVuY3Rpb24oZGF0YUluZGV4KSB7XG4gICAgaWYgKHRoaXMuZGF0YS5sZW5ndGggPiAzKSB7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICB2YXIgbGVuID0gZGF0YS5sZW5ndGg7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGxvYWRJbWcgPSBmdW5jdGlvbiBwcmVsb2FkSW1nTG9hZGluZ1Byb2Nlc3MoaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gZGF0YVtpbmRleF07XG4gICAgICAgICAgICBpZiAoc2VsZi5faXRlbVR5cGUoaXRlbSkgPT09ICdwaWMnICYmICFpdGVtLmxvYWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJlbG9hZEltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgICAgIHByZWxvYWRJbWcuc3JjID0gaXRlbS5jb250ZW50O1xuICAgICAgICAgICAgICAgIHByZWxvYWRJbWcub25sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ud2lkdGggPSBwcmVsb2FkSW1nLndpZHRoO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmhlaWdodCA9IHByZWxvYWRJbWcuaGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmxvYWQgPSAyO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaXRlbS5sb2FkID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBsb2FkSW1nKChkYXRhSW5kZXggKyAyKSAlIGxlbik7XG4gICAgICAgIGxvYWRJbWcoKGRhdGFJbmRleCAtIDIgKyBsZW4pICUgbGVuKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFdhdGNoIGV2ZW50IHRyYW5zaXRpb25FbmRcbiAqIEBwcml2YXRlXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuX3dhdGNoVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKHRpbWUsIGV2ZW50VHlwZSkge1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICB2YXIgbHNuO1xuICAgIHRoaXMubG9nKCdFdmVudDonLCAnd2F0Y2hUcmFuc2l0aW9uRW5kOjpzdHVjazo6cGlsZScsIHRoaXMuaW5BbmltYXRlKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZShldnQpIHtcbiAgICAgICAgaWYgKGxzbikge1xuICAgICAgICAgICAgZ2xvYmFsLmNsZWFyVGltZW91dChsc24pO1xuICAgICAgICB9XG4gICAgICAgIHNlbGYuaW5BbmltYXRlLS07XG4gICAgICAgIHNlbGYubG9nKCdFdmVudDonLCAnd2F0Y2hUcmFuc2l0aW9uRW5kOjpzdHVjazo6cmVsZWFzZScsIHNlbGYuaW5BbmltYXRlKTtcbiAgICAgICAgaWYgKHNlbGYuaW5BbmltYXRlID09PSAwKSB7XG4gICAgICAgICAgICAvL3NlbGYuaW5BbmltYXRlID0gMDtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdzbGlkZUNoYW5nZWQnKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fY2hhbmdlZFN0eWxlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5maXJlLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgICAgICAgICAgc2VsZi5fcmVuZGVySW50ZXJtZWRpYXRlU2NlbmUoKTtcbiAgICAgICAgfVxuICAgICAgICB1bldhdGNoKCk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVuV2F0Y2goKSB7XG4gICAgICAgIHNlbGYuZWxzLmZvckVhY2goZnVuY3Rpb24gdHJhbnNsYXRpb25FbmRVbndhdGNoRWFjaChlbCkge1xuICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihpU2xpZGVyLl90cmFuc2l0aW9uRW5kRXZlbnQoKSwgaGFuZGxlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHNlbGYuaXNBbmltYXRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGltZSA+IDApIHtcbiAgICAgICAgc2VsZi5lbHMuZm9yRWFjaChmdW5jdGlvbiB0cmFuc2xhdGlvbkVuZEVsc0VhY2goZWwpIHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoaVNsaWRlci5fdHJhbnNpdGlvbkVuZEV2ZW50KCksIGhhbmRsZSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBsc24gPSBnbG9iYWwuc2V0VGltZW91dChoYW5kbGUsIHRpbWUpO1xuICAgIHNlbGYuaW5BbmltYXRlKys7XG59O1xuXG4vKipcbiAqIGJpbmQgYWxsIGV2ZW50IGhhbmRsZXIsIHdoZW4gb24gUEMsIGRpc2FibGUgZHJhZyBldmVudFxuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fYmluZEhhbmRsZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3V0ZXIgPSB0aGlzLm91dGVyO1xuXG4gICAgaWYgKHRoaXMuaXNUb3VjaGFibGUpIHtcbiAgICAgICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgICAgICBpZiAoIWRldmljZS5oYXNUb3VjaCkge1xuICAgICAgICAgICAgb3V0ZXIuc3R5bGUuY3Vyc29yID0gJ3BvaW50ZXInO1xuICAgICAgICAgICAgLy8gZGlzYWJsZSBkcmFnXG4gICAgICAgICAgICBvdXRlci5vbmRyYWdzdGFydCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIGlmIChldnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2Uuc3RhcnRFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5hZGRFdmVudExpc3RlbmVyKGRldmljZS5tb3ZlRXZ0LCB0aGlzKTtcbiAgICAgICAgb3V0ZXIuYWRkRXZlbnRMaXN0ZW5lcihkZXZpY2UuZW5kRXZ0LCB0aGlzKTtcbiAgICAgICAgIXRoaXMuZGV2aWNlRXZlbnRzLmhhc1RvdWNoICYmIG91dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgdGhpcyk7XG4gICAgfVxuXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcyk7XG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMpO1xuXG4gICAgLy8gRml4IGFuZHJvaWQgZGV2aWNlXG4gICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcywgZmFsc2UpO1xuICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgdGhpcywgZmFsc2UpO1xufTtcblxuLyoqXG4gKiAgVW5pZm9ybWl0eSBhZG1pbiBldmVudFxuICogIEV2ZW50IHJvdXRlclxuICogIEBwYXJhbSB7b2JqZWN0fSBldnQgZXZlbnQgb2JqZWN0XG4gKiAgQHByb3RlY3RlZFxuICovXG5pU2xpZGVyUHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIHN3aXRjaCAoZXZ0LnR5cGUpIHtcbiAgICAgICAgY2FzZSAnbW91c2Vkb3duJzpcbiAgICAgICAgICAgIC8vIGJsb2NrIG1vdXNlIGJ1dHRvbnMgZXhjZXB0IGxlZnRcbiAgICAgICAgICAgIGlmIChldnQuYnV0dG9uICE9PSAwKSBicmVhaztcbiAgICAgICAgY2FzZSAndG91Y2hzdGFydCc6XG4gICAgICAgICAgICB0aGlzLnN0YXJ0SGFuZGxlcihldnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgZGV2aWNlLm1vdmVFdnQ6XG4gICAgICAgICAgICB0aGlzLm1vdmVIYW5kbGVyKGV2dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBkZXZpY2UuZW5kRXZ0OlxuICAgICAgICBjYXNlICdtb3VzZW91dCc6IC8vIG1vdXNlb3V0IGV2ZW50LCB0cmlnZ2VyIGVuZEV2ZW50XG4gICAgICAgIGNhc2UgJ3RvdWNoY2FuY2VsJzpcbiAgICAgICAgICAgIHRoaXMuZW5kSGFuZGxlcihldnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ29yaWVudGF0aW9uY2hhbmdlJzpcbiAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZm9jdXMnOlxuICAgICAgICAgICAgdGhpcy5fYXV0b1BsYXkoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdibHVyJzpcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdyZXNpemUnOlxuICAgICAgICAgICAgdGhpcy5yZXNpemVIYW5kbGVyKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG4vKipcbiAqICB0b3VjaHN0YXJ0IGNhbGxiYWNrXG4gKiAgQHBhcmFtIHtvYmplY3R9IGV2dCBldmVudCBvYmplY3RcbiAqICBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuc3RhcnRIYW5kbGVyID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKHRoaXMuZml4UGFnZSkge1xuICAgICAgICBpZiAoaVNsaWRlci5GSVhfUEFHRV9UQUdTLmluZGV4T2YoZXZ0LnRhcmdldC50YWdOYW1lKSA8IDApIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmhvbGRpbmcgfHwgdGhpcy5sb2NraW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIHRoaXMuaXNNb3ZpbmcgPSB0cnVlO1xuICAgIHRoaXMucGF1c2UoKTtcblxuICAgIHRoaXMubG9nKCdFdmVudDogc3RhcnQnKTtcbiAgICB0aGlzLmZpcmUoJ3NsaWRlU3RhcnQnLCBldnQsIHRoaXMpO1xuXG4gICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB0aGlzLnN0YXJ0WCA9IGRldmljZS5oYXNUb3VjaCA/IGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZXZ0LnBhZ2VYO1xuICAgIHRoaXMuc3RhcnRZID0gZGV2aWNlLmhhc1RvdWNoID8gZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBldnQucGFnZVk7XG59O1xuXG4vKipcbiAqICB0b3VjaG1vdmUgY2FsbGJhY2tcbiAqICBAcGFyYW0ge29iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICogIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5tb3ZlSGFuZGxlciA9IGZ1bmN0aW9uKGV2dCkge1xuICAgIGlmICghdGhpcy5pc01vdmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMubG9nKCdFdmVudDogbW92aW5nJyk7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuICAgIHZhciBsZW4gPSB0aGlzLmRhdGEubGVuZ3RoO1xuICAgIHZhciBheGlzID0gdGhpcy5heGlzO1xuICAgIHZhciByZXZlcnNlQXhpcyA9IHRoaXMucmV2ZXJzZUF4aXM7XG4gICAgdmFyIG9mZnNldCA9IHtcbiAgICAgICAgWDogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIC0gdGhpcy5zdGFydFgpIDogKGV2dC5wYWdlWCAtIHRoaXMuc3RhcnRYKSxcbiAgICAgICAgWTogZGV2aWNlLmhhc1RvdWNoID8gKGV2dC50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIC0gdGhpcy5zdGFydFkpIDogKGV2dC5wYWdlWSAtIHRoaXMuc3RhcnRZKVxuICAgIH07XG5cbiAgICB0aGlzLm9mZnNldCA9IG9mZnNldDtcblxuICAgIGlmIChNYXRoLmFicyhvZmZzZXRbYXhpc10pIC0gTWF0aC5hYnMob2Zmc2V0W3JldmVyc2VBeGlzXSkgPiAxMCkge1xuXG4gICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHRoaXMuZmlyZSgnc2xpZGUnLCBldnQsIHRoaXMpO1xuXG4gICAgICAgIGlmICghdGhpcy5pc0xvb3BpbmcpIHtcbiAgICAgICAgICAgIGlmIChvZmZzZXRbYXhpc10gPiAwICYmIHRoaXMuc2xpZGVJbmRleCA9PT0gMCB8fCBvZmZzZXRbYXhpc10gPCAwICYmIHRoaXMuc2xpZGVJbmRleCA9PT0gbGVuIC0gMSkge1xuICAgICAgICAgICAgICAgIG9mZnNldFtheGlzXSA9IHRoaXMuX2RhbXBpbmcob2Zmc2V0W2F4aXNdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMzsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMuZWxzW2ldO1xuICAgICAgICAgICAgaXRlbS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gJ2FsbCAwcyc7XG4gICAgICAgICAgICB0aGlzLl9hbmltYXRlRnVuYyhpdGVtLCBheGlzLCB0aGlzLnNjYWxlLCBpLCBvZmZzZXRbYXhpc10pO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLyoqXG4gKiAgdG91Y2hlbmQgY2FsbGJhY2tcbiAqICBAcGFyYW0ge09iamVjdH0gZXZ0IGV2ZW50IG9iamVjdFxuICogIEBwcm90ZWN0ZWRcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5lbmRIYW5kbGVyID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgaWYgKCF0aGlzLmlzTW92aW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5sb2coJ0V2ZW50OiBlbmQnKTtcbiAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHZhciBheGlzID0gdGhpcy5heGlzO1xuICAgIHZhciBib3VuZGFyeSA9IHRoaXMuc2NhbGUgLyAyO1xuICAgIHZhciBlbmRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgICAvLyBhIHF1aWNrIHNsaWRlIHRpbWUgbXVzdCB1bmRlciAzMDBtc1xuICAgIC8vIGEgcXVpY2sgc2xpZGUgc2hvdWxkIGFsc28gc2xpZGUgYXQgbGVhc3QgMTQgcHhcbiAgICBib3VuZGFyeSA9IGVuZFRpbWUgLSB0aGlzLnN0YXJ0VGltZSA+IDMwMCA/IGJvdW5kYXJ5IDogMTQ7XG5cbiAgICB2YXIgYWJzT2Zmc2V0ID0gTWF0aC5hYnMob2Zmc2V0W2F4aXNdKTtcbiAgICB2YXIgYWJzUmV2ZXJzZU9mZnNldCA9IE1hdGguYWJzKG9mZnNldFt0aGlzLnJldmVyc2VBeGlzXSk7XG5cbiAgICB2YXIgZ2V0TGluayA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgIGlmIChlbC50YWdOYW1lID09PSAnQScpIHtcbiAgICAgICAgICAgIGlmIChlbC5ocmVmKSB7XG4gICAgICAgICAgICAgICAgZ2xvYmFsLmxvY2F0aW9uLmhyZWYgPSBlbC5ocmVmXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGVsLmNsYXNzTmFtZSAhPT0gJ2lzbGlkZXItcGljJykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2V0TGluayhlbC5wYXJlbnROb2RlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMubG9nKGJvdW5kYXJ5LCBvZmZzZXRbYXhpc10sIGFic09mZnNldCwgYWJzUmV2ZXJzZU9mZnNldCwgdGhpcyk7XG5cbiAgICBpZiAob2Zmc2V0W2F4aXNdID49IGJvdW5kYXJ5ICYmIGFic1JldmVyc2VPZmZzZXQgPCBhYnNPZmZzZXQpIHtcbiAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCAtIDEpO1xuICAgIH0gZWxzZSBpZiAob2Zmc2V0W2F4aXNdIDwgLWJvdW5kYXJ5ICYmIGFic1JldmVyc2VPZmZzZXQgPCBhYnNPZmZzZXQpIHtcbiAgICAgICAgdGhpcy5zbGlkZVRvKHRoaXMuc2xpZGVJbmRleCArIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2xpZGVUbyh0aGlzLnNsaWRlSW5kZXgpO1xuICAgIH1cblxuICAgIC8vIGNyZWF0ZSB0YXAgZXZlbnQgaWYgb2Zmc2V0IDwgMTBcbiAgICBpZiAoTWF0aC5hYnModGhpcy5vZmZzZXQuWCkgPCAxMCAmJiBNYXRoLmFicyh0aGlzLm9mZnNldC5ZKSA8IDEwKSB7XG4gICAgICAgIHRoaXMudGFwRXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgIHRoaXMudGFwRXZ0LmluaXRFdmVudCgndGFwJywgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgIGlmICh0aGlzLmZpeFBhZ2UpIHtcbiAgICAgICAgICAgIGV2dC50YXJnZXQgJiYgZ2V0TGluayhldnQudGFyZ2V0KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWV2dC50YXJnZXQuZGlzcGF0Y2hFdmVudCh0aGlzLnRhcEV2dCkpIHtcbiAgICAgICAgICAgIGV2dC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5vZmZzZXQuWCA9IHRoaXMub2Zmc2V0LlkgPSAwO1xuXG4gICAgdGhpcy5fYXV0b1BsYXkoKTtcblxuICAgIHRoaXMuZmlyZSgnc2xpZGVFbmQnLCBldnQsIHRoaXMpO1xufTtcblxuLyoqXG4gKiAgb3JpZW50YXRpb25jaGFuZ2UgY2FsbGJhY2tcbiAqICBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUub3JpZW50YXRpb25jaGFuZ2VIYW5kbGVyID0gZnVuY3Rpb24oKSB7XG4gICAgZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgdGhpcy5sb2coJ0V2ZW50OiBvcmllbnRhdGlvbmNoYW5nZScpO1xuICAgIH0uYmluZCh0aGlzKSwgMTAwKTtcbn07XG5cbi8qKlxuICogcmVzaXplIGNhbGxiYWNrXG4gKiBAcHJvdGVjdGVkXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUucmVzaXplSGFuZGxlciA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLmhlaWdodCAhPT0gdGhpcy53cmFwLmNsaWVudEhlaWdodCB8fCB0aGlzLndpZHRoICE9PSB0aGlzLndyYXAuY2xpZW50V2lkdGgpIHtcbiAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5yZXNpemUpO1xuICAgICAgICB0aGlzLl9MU04ucmVzaXplID0gZ2xvYmFsLnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0KCk7XG4gICAgICAgICAgICB0aGlzLmxvZygnRXZlbnQ6IHJlc2l6ZScpO1xuICAgICAgICAgICAgdGhpcy5fTFNOLnJlc2l6ZSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5yZXNpemUpO1xuICAgICAgICB9LmJpbmQodGhpcyksIDUwMCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiAgc2xpZGUgbG9naWNhbCwgZ290byBkYXRhIGluZGV4XG4gKiAgQHBhcmFtIHtudW1iZXJ9IGRhdGFJbmRleCB0aGUgZ290byBpbmRleFxuICogIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5zbGlkZVRvID0gZnVuY3Rpb24oZGF0YUluZGV4LCBvcHRzKSB7XG4gICAgaWYgKHRoaXMubG9ja2luZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudW5ob2xkKCk7XG4gICAgdmFyIGFuaW1hdGVUaW1lID0gdGhpcy5hbmltYXRlVGltZTtcbiAgICB2YXIgYW5pbWF0ZVR5cGUgPSB0aGlzLmFuaW1hdGVUeXBlO1xuICAgIHZhciBhbmltYXRlRnVuYyA9IHRoaXMuX2FuaW1hdGVGdW5jO1xuICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xuICAgIHZhciBlbHMgPSB0aGlzLmVscztcbiAgICB2YXIgaWR4ID0gZGF0YUluZGV4O1xuICAgIHZhciBuID0gZGF0YUluZGV4IC0gdGhpcy5zbGlkZUluZGV4O1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB2YXIgZXZlbnRUeXBlO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRzID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAob3B0cy5hbmltYXRlVGltZSA+IC0xKSB7XG4gICAgICAgICAgICBhbmltYXRlVGltZSA9IG9wdHMuYW5pbWF0ZVRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzLmFuaW1hdGVUeXBlID09PSAnc3RyaW5nJyAmJiBvcHRzLmFuaW1hdGVUeXBlIGluIHRoaXMuX2FuaW1hdGVGdW5jcykge1xuICAgICAgICAgICAgYW5pbWF0ZVR5cGUgPSBvcHRzLmFuaW1hdGVUeXBlO1xuICAgICAgICAgICAgYW5pbWF0ZUZ1bmMgPSB0aGlzLl9hbmltYXRlRnVuY3NbYW5pbWF0ZVR5cGVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW4gdGhlIHNsaWRlIHByb2Nlc3MsIGFuaW1hdGUgdGltZSBpcyBzcXVlZXplZFxuICAgIHZhciBzcXVlZXplVGltZSA9IE1hdGguYWJzKG9mZnNldFt0aGlzLmF4aXNdKSAvIHRoaXMuc2NhbGUgKiBhbmltYXRlVGltZTtcblxuICAgIGlmIChNYXRoLmFicyhuKSA+IDEpIHtcbiAgICAgICAgdGhpcy5fcmVuZGVySXRlbShuID4gMCA/IHRoaXMuZWxzWzJdIDogdGhpcy5lbHNbMF0sIGlkeCk7XG4gICAgfVxuXG4gICAgLy8gcHJlbG9hZCB3aGVuIHNsaWRlXG4gICAgdGhpcy5fcHJlbG9hZEltZyhpZHgpO1xuXG4gICAgLy8gZ2V0IHJpZ2h0IGl0ZW0gb2YgZGF0YVxuICAgIGlmIChkYXRhW2lkeF0pIHtcbiAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gaWR4O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmlzTG9vcGluZykge1xuICAgICAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gbiA+IDAgPyAwIDogZGF0YS5sZW5ndGggLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zbGlkZUluZGV4ID0gdGhpcy5zbGlkZUluZGV4O1xuICAgICAgICAgICAgbiA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmxvZygnSW5kZXg6JyArIHRoaXMuc2xpZGVJbmRleCk7XG5cbiAgICAvLyBrZWVwIHRoZSByaWdodCBvcmRlciBvZiBpdGVtc1xuICAgIHZhciBoZWFkRWwsIHRhaWxFbCwgc3RlcDtcblxuICAgIC8vIHNsaWRlY2hhbmdlIHNob3VsZCByZW5kZXIgbmV3IGl0ZW1cbiAgICAvLyBhbmQgY2hhbmdlIG5ldyBpdGVtIHN0eWxlIHRvIGZpdCBhbmltYXRpb25cbiAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAvLyBSZXN0b3JlIHRvIGN1cnJlbnQgc2NlbmVcbiAgICAgICAgZXZlbnRUeXBlID0gJ3NsaWRlUmVzdG9yZSc7XG4gICAgfSBlbHNlIHtcblxuICAgICAgICBpZiAoKHRoaXMuaXNWZXJ0aWNhbCAmJiAoYW5pbWF0ZVR5cGUgPT09ICdyb3RhdGUnIHx8IGFuaW1hdGVUeXBlID09PSAnZmxpcCcpKSBeIChuID4gMCkpIHtcbiAgICAgICAgICAgIGVscy5wdXNoKGVscy5zaGlmdCgpKTtcbiAgICAgICAgICAgIGhlYWRFbCA9IGVsc1syXTtcbiAgICAgICAgICAgIHRhaWxFbCA9IGVsc1swXTtcbiAgICAgICAgICAgIHN0ZXAgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxzLnVuc2hpZnQoZWxzLnBvcCgpKTtcbiAgICAgICAgICAgIGhlYWRFbCA9IGVsc1swXTtcbiAgICAgICAgICAgIHRhaWxFbCA9IGVsc1syXTtcbiAgICAgICAgICAgIHN0ZXAgPSAtMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChNYXRoLmFicyhuKSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVySW50ZXJtZWRpYXRlU2NlbmUoKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0oaGVhZEVsLCBpZHggKyBuKTtcbiAgICAgICAgfSBlbHNlIGlmIChNYXRoLmFicyhuKSA+IDEpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlckl0ZW0oaGVhZEVsLCBpZHggKyBzdGVwKTtcbiAgICAgICAgICAgIHRoaXMuX2ludGVybWVkaWF0ZVNjZW5lID0gW3RhaWxFbCwgaWR4IC0gc3RlcF07XG4gICAgICAgIH1cblxuICAgICAgICBoZWFkRWwuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdub25lJztcbiAgICAgICAgaGVhZEVsLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcblxuICAgICAgICBnbG9iYWwuc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGhlYWRFbC5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgICB9LCAyMDApO1xuXG4gICAgICAgIC8vIE1pbnVzIHNxdWVlemUgdGltZVxuICAgICAgICBzcXVlZXplVGltZSA9IGFuaW1hdGVUaW1lIC0gc3F1ZWV6ZVRpbWU7XG5cbiAgICAgICAgZXZlbnRUeXBlID0gJ3NsaWRlQ2hhbmdlJztcbiAgICB9XG5cbiAgICB0aGlzLmZpcmUoZXZlbnRUeXBlLCB0aGlzLnNsaWRlSW5kZXgsIGVsc1sxXSwgdGhpcyk7XG4gICAgdGhpcy5fd2F0Y2hUcmFuc2l0aW9uRW5kKHNxdWVlemVUaW1lLCBldmVudFR5cGUgKyAnZCcsIHRoaXMuc2xpZGVJbmRleCwgZWxzWzFdLCB0aGlzKTtcblxuICAgIC8vIGRvIHRoZSB0cmljayBhbmltYXRpb25cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICBpZiAoZWxzW2ldICE9PSBoZWFkRWwpIHtcbiAgICAgICAgICAgIC8vIE9ubHkgYXBwbGllcyB0byBcInRyYW5zZm9ybVwiXG4gICAgICAgICAgICBlbHNbaV0uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICdhbGwgJyArIChzcXVlZXplVGltZSAvIDEwMDApICsgJ3MgJyArIHRoaXMuYW5pbWF0ZUVhc2luZztcbiAgICAgICAgfVxuICAgICAgICBhbmltYXRlRnVuYy5jYWxsKHRoaXMsIGVsc1tpXSwgdGhpcy5heGlzLCB0aGlzLnNjYWxlLCBpLCAwKTtcbiAgICB9XG5cbiAgICAvLyBJZiBub3QgbG9vcGluZywgc3RvcCBwbGF5aW5nIHdoZW4gbWVldCB0aGUgZW5kIG9mIGRhdGFcbiAgICBpZiAodGhpcy5pc0F1dG9wbGF5ICYmICF0aGlzLmlzTG9vcGluZyAmJiB0aGlzLnNsaWRlSW5kZXggPT09IGRhdGEubGVuZ3RoIC0gMSkge1xuICAgICAgICB0aGlzLnBhdXNlKCk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBTbGlkZSB0byBuZXh0IHNjZW5lXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuc2xpZGVOZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zbGlkZVRvLmFwcGx5KHRoaXMsIFt0aGlzLnNsaWRlSW5kZXggKyAxXS5jb25jYXQoQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xufTtcblxuLyoqXG4gKiBTbGlkZSB0byBwcmV2aW91cyBzY2VuZVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLnNsaWRlUHJldiA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2xpZGVUby5hcHBseSh0aGlzLCBbdGhpcy5zbGlkZUluZGV4IC0gMV0uY29uY2F0KEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgcGx1Z2luIChydW4gdGltZSBtb2RlKVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHBsdWdpblxuICogQHBhcmFtIHsuLi59XG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUucmVnUGx1Z2luID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgIHZhciBuYW1lID0gYXJncy5zaGlmdCgpLFxuICAgICAgICBwbHVnaW4gPSBhcmdzWzBdO1xuXG4gICAgaWYgKCF0aGlzLl9wbHVnaW5zLmhhc093blByb3BlcnR5KG5hbWUpICYmIHR5cGVvZiBwbHVnaW4gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHBsdWdpbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aGlzLl9wbHVnaW5zW25hbWVdID0gcGx1Z2luO1xuICAgICAgICBhcmdzLnNoaWZ0KCk7XG4gICAgfVxuXG4gICAgLy8gQXV0byBlbmFibGUgYW5kIGluaXQgcGx1Z2luIHdoZW4gYXQgcnVuIHRpbWVcbiAgICBpZiAoIWluQXJyYXkobmFtZSwgdGhpcy5fb3B0cy5wbHVnaW5zKSkge1xuICAgICAgICB0aGlzLl9vcHRzLnBsdWdpbnMucHVzaChhcmdzLmxlbmd0aCA/IFtdLmNvbmNhdChbbmFtZV0sIGFyZ3MpIDogbmFtZSk7XG4gICAgICAgIHR5cGVvZiB0aGlzLl9wbHVnaW5zW25hbWVdID09PSAnZnVuY3Rpb24nICYmIHRoaXMuX3BsdWdpbnNbbmFtZV0uYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxufTtcblxuLyoqXG4gKiAgc2ltcGxlIGV2ZW50IGRlbGVnYXRlIG1ldGhvZFxuICogIEBwYXJhbSB7c3RyaW5nfSBldnRUeXBlIGV2ZW50IG5hbWVcbiAqICBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgdGhlIHNpbXBsZSBjc3Mgc2VsZWN0b3IgbGlrZSBqUXVlcnlcbiAqICBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBldmVudCBjYWxsYmFja1xuICogIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5iaW5kID0gaVNsaWRlclByb3RvdHlwZS5kZWxlZ2F0ZSA9IGZ1bmN0aW9uKGV2dFR5cGUsIHNlbGVjdG9yLCBjYWxsYmFjaykge1xuXG4gICAgZnVuY3Rpb24gZGVsZWdhdGVkRXZlbnRDYWxsYmFja0hhbmRsZShlKSB7XG4gICAgICAgIHZhciBldnQgPSBnbG9iYWwuZXZlbnQgPyBnbG9iYWwuZXZlbnQgOiBlO1xuICAgICAgICB2YXIgdGFyZ2V0ID0gZXZ0LnRhcmdldDtcbiAgICAgICAgdmFyIGVsZUFyciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsZUFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRhcmdldCA9PT0gZWxlQXJyW2ldKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy53cmFwLmFkZEV2ZW50TGlzdGVuZXIoZXZ0VHlwZSwgZGVsZWdhdGVkRXZlbnRDYWxsYmFja0hhbmRsZSwgZmFsc2UpO1xuXG4gICAgdmFyIGtleSA9IGV2dFR5cGUgKyAnOycgKyBzZWxlY3RvcjtcbiAgICBpZiAoIXRoaXMuX0V2ZW50SGFuZGxlLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgdGhpcy5fRXZlbnRIYW5kbGVba2V5XSA9IFtcbiAgICAgICAgICAgIFtjYWxsYmFja10sXG4gICAgICAgICAgICBbZGVsZWdhdGVkRXZlbnRDYWxsYmFja0hhbmRsZV1cbiAgICAgICAgXVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMF0ucHVzaChjYWxsYmFjayk7XG4gICAgICAgIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMV0ucHVzaChkZWxlZ2F0ZWRFdmVudENhbGxiYWNrSGFuZGxlKTtcbiAgICB9XG59O1xuXG4vKipcbiAqIHJlbW92ZSBldmVudCBkZWxlZ2F0ZSBmcm9tIHdyYXBcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZ0VHlwZSBldmVudCBuYW1lXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3IgdGhlIHNpbXBsZSBjc3Mgc2VsZWN0b3IgbGlrZSBqUXVlcnlcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGNhbGxiYWNrIGV2ZW50IGNhbGxiYWNrXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUudW5iaW5kID0gaVNsaWRlclByb3RvdHlwZS51bkRlbGVnYXRlID0gZnVuY3Rpb24oZXZ0VHlwZSwgc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGtleSA9IGV2dFR5cGUgKyAnOycgKyBzZWxlY3RvcjtcbiAgICBpZiAodGhpcy5fRXZlbnRIYW5kbGUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgaSA9IHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMF0uaW5kZXhPZihjYWxsYmFjayk7XG4gICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMud3JhcC5yZW1vdmVFdmVudExpc3RlbmVyKGV2dFR5cGUsIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMV1baV0pO1xuICAgICAgICAgICAgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVswXVtpXSA9IHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMV1baV0gPSBudWxsO1xuICAgICAgICAgICAgLy8gZGVsZXRlIHRoaXMuX0V2ZW50SGFuZGxlW2tleV1bMF1baV07XG4gICAgICAgICAgICAvLyBkZWxldGUgdGhpcy5fRXZlbnRIYW5kbGVba2V5XVsxXVtpXTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlXG59O1xuXG4vKipcbiAqIHJlbW92ZUV2ZW50TGlzdGVuZXIgdG8gcmVsZWFzZSB0aGUgbWVtb3J5XG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvdXRlciA9IHRoaXMub3V0ZXI7XG4gICAgdmFyIGRldmljZSA9IHRoaXMuZGV2aWNlRXZlbnRzO1xuXG4gICAgdGhpcy5maXJlKCdkZXN0cm95Jyk7XG5cbiAgICAvLyBDbGVhciBldmVudHNcbiAgICBpZiAodGhpcy5pc1RvdWNoYWJsZSkge1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5zdGFydEV2dCwgdGhpcyk7XG4gICAgICAgIG91dGVyLnJlbW92ZUV2ZW50TGlzdGVuZXIoZGV2aWNlLm1vdmVFdnQsIHRoaXMpO1xuICAgICAgICBvdXRlci5yZW1vdmVFdmVudExpc3RlbmVyKGRldmljZS5lbmRFdnQsIHRoaXMpO1xuICAgICAgICAhdGhpcy5kZXZpY2VFdmVudHMuaGFzVG91Y2ggJiYgb3V0ZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzKTtcbiAgICB9XG4gICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcyk7XG4gICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcyk7XG4gICAgZ2xvYmFsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCB0aGlzKTtcblxuICAgIC8vIENsZWFyIGRlbGVnYXRlIGV2ZW50c1xuICAgIGZvciAodmFyIG4gaW4gdGhpcy5fRXZlbnRIYW5kbGUpIHtcbiAgICAgICAgdmFyIGhhbmRMaXN0ID0gdGhpcy5fRXZlbnRIYW5kbGVbbl1bMV07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaGFuZExpc3RbaV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihuLnN1YnN0cigwLCBuLmluZGV4T2YoJzsnKSksIGhhbmRMaXN0W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9FdmVudEhhbmRsZSA9IG51bGw7XG5cbiAgICAvLyBDbGVhciB0aW1lclxuICAgIGZvciAodmFyIG4gaW4gdGhpcy5fTFNOKVxuICAgICAgICB0aGlzLl9MU04uaGFzT3duUHJvcGVydHkobikgJiYgdGhpcy5fTFNOW25dICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOW25dKTtcblxuICAgIHRoaXMuX0xTTiA9IG51bGw7XG5cbiAgICB0aGlzLndyYXAuaW5uZXJIVE1MID0gJyc7XG59O1xuXG4vKipcbiAqIFJlZ2lzdGVyIGV2ZW50IGNhbGxiYWNrXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBmdW5jXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUub24gPSBmdW5jdGlvbihldmVudE5hbWUsIGZ1bmMsIGZvcmNlKSB7XG4gICAgaWYgKGluQXJyYXkoZXZlbnROYW1lLCBpU2xpZGVyLkVWRU5UUykgJiYgdHlwZW9mIGZ1bmMgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgIShldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpICYmICh0aGlzLmV2ZW50c1tldmVudE5hbWVdID0gW10pO1xuICAgICAgICBpZiAoIWZvcmNlKSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnB1c2goZnVuYyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmV2ZW50c1tldmVudE5hbWVdLnVuc2hpZnQoZnVuYyk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIEZpbmQgY2FsbGJhY2sgZnVuY3Rpb24gcG9zaXRpb25cbiAqIEBwYXJhbSBldmVudE5hbWVcbiAqIEBwYXJhbSBmdW5jXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICogQHB1YmxpY1xuICovXG5pU2xpZGVyUHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZnVuYykge1xuICAgIGlmIChldmVudE5hbWUgaW4gdGhpcy5ldmVudHMpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZXZlbnRzW2V2ZW50TmFtZV0uaW5kZXhPZihmdW5jKTtcbiAgICB9XG4gICAgcmV0dXJuIC0xO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgY2FsbGJhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBldmVudE5hbWVcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGZ1bmNcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbihldmVudE5hbWUsIGZ1bmMpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmhhcyhldmVudE5hbWUsIGZ1bmMpO1xuICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmV2ZW50c1tldmVudE5hbWVdW2luZGV4XTtcbiAgICB9XG59O1xuXG4vKipcbiAqIFRyaWdnZXIgZXZlbnQgY2FsbGJhY2tzXG4gKiBAcGFyYW0ge3N0cmluZ30gZXZlbnROYW1lXG4gKiBAcGFyYW0geyp9IGFyZ3NcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5maXJlID0gZnVuY3Rpb24oZXZlbnROYW1lKSB7XG4gICAgdGhpcy5sb2coJ1tFVkVOVCBGSVJFXTonLCBldmVudE5hbWUsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGV2ZW50TmFtZSBpbiB0aGlzLmV2ZW50cykge1xuICAgICAgICB2YXIgZnVuY3MgPSB0aGlzLmV2ZW50c1tldmVudE5hbWVdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZ1bmNzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0eXBlb2YgZnVuY3NbaV0gPT09ICdmdW5jdGlvbicgJiYgZnVuY3NbaV0uYXBwbHkgJiYgZnVuY3NbaV0uYXBwbHkodGhpcywgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIHJlc2V0ICYgcmVyZW5kZXJcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICB0aGlzLl9zZXR0aW5nKCk7XG4gICAgdGhpcy5fcmVuZGVyV3JhcHBlcigpO1xuICAgIHRoaXMuZGVsYXkgJiYgZ2xvYmFsLnNldFRpbWVvdXQodGhpcy5fYXV0b1BsYXkuYmluZCh0aGlzKSwgdGhpcy5kZWxheSk7XG59O1xuXG4vKipcbiAqIHJlbG9hZCBEYXRhICYgcmVuZGVyXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUubG9hZERhdGEgPSBmdW5jdGlvbihkYXRhLCBpbml0SW5kZXgpIHtcbiAgICB0aGlzLnBhdXNlKCk7XG4gICAgdGhpcy5zbGlkZUluZGV4ID0gaW5pdEluZGV4IHx8IDA7XG4gICAgdGhpcy5kYXRhID0gZGF0YTtcbiAgICB0aGlzLl9yZW5kZXJXcmFwcGVyKCk7XG4gICAgdGhpcy5maXJlKCdyZWxvYWREYXRhJyk7XG4gICAgdGhpcy5kZWxheSAmJiBnbG9iYWwuc2V0VGltZW91dCh0aGlzLl9hdXRvUGxheS5iaW5kKHRoaXMpLCB0aGlzLmRlbGF5KTtcbn07XG5cbi8qKlxuICogYXV0byBjaGVjayB0byBwbGF5IGFuZCBiaW5kIGV2ZW50c1xuICogQHByaXZhdGVcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5fYXV0b1BsYXkgPSBmdW5jdGlvbigpIHtcbiAgICAvLyBlbmFibGVcbiAgICBpZiAodGhpcy5pc0F1dG9wbGF5KSB7XG4gICAgICAgIHRoaXMuaGFzKCdzbGlkZUNoYW5nZWQnLCB0aGlzLnBsYXkpIDwgMCAmJiB0aGlzLm9uKCdzbGlkZUNoYW5nZWQnLCB0aGlzLnBsYXksIDEpO1xuICAgICAgICB0aGlzLmhhcygnc2xpZGVSZXN0b3JlZCcsIHRoaXMucGxheSkgPCAwICYmIHRoaXMub24oJ3NsaWRlUmVzdG9yZWQnLCB0aGlzLnBsYXksIDEpO1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9mZignc2xpZGVDaGFuZ2VkJywgdGhpcy5wbGF5KTtcbiAgICAgICAgdGhpcy5vZmYoJ3NsaWRlUmVzdG9yZWQnLCB0aGlzLnBsYXkpO1xuICAgIH1cbn07XG5cbi8qKlxuICogU3RhcnQgYXV0b3BsYXlcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5fTFNOLmF1dG9QbGF5ICYmIGdsb2JhbC5jbGVhclRpbWVvdXQodGhpcy5fTFNOLmF1dG9QbGF5KTtcbiAgICB0aGlzLl9MU04uYXV0b1BsYXkgPSBnbG9iYWwuc2V0VGltZW91dCh0aGlzLnNsaWRlTmV4dC5iaW5kKHRoaXMpLCB0aGlzLmR1cmF0aW9uKTtcbn07XG5cbi8qKlxuICogcGF1c2UgYXV0b3BsYXlcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuX0xTTi5hdXRvUGxheSAmJiBnbG9iYWwuY2xlYXJUaW1lb3V0KHRoaXMuX0xTTi5hdXRvUGxheSk7XG59O1xuXG4vKipcbiAqIE1haW50YWluaW5nIHRoZSBjdXJyZW50IHNjZW5lXG4gKiBEaXNhYmxlIHRvdWNoIGV2ZW50cywgZXhjZXB0IGZvciB0aGUgbmF0aXZlIG1ldGhvZC5cbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5ob2xkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ob2xkaW5nID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmVsZWFzZSBjdXJyZW50IHNjZW5lXG4gKiB1bmxvY2sgYXQgc2FtZSB0aW1lXG4gKiBAcHVibGljXG4gKi9cbmlTbGlkZXJQcm90b3R5cGUudW5ob2xkID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ob2xkaW5nID0gZmFsc2U7XG4gICAgdGhpcy51bmxvY2soKTtcbn07XG5cbi8qKlxuICogWW91IGNhbid0IGRvIGFueXRoaW5nIG9uIHRoaXMgc2NlbmVcbiAqIGxvY2sgbmF0aXZlIG1ldGhvZCBjYWxsc1xuICogaG9sZCBhdCBzYW1lIHRpbWVcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS5sb2NrID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5ob2xkKCk7XG4gICAgdGhpcy5sb2NraW5nID0gdHJ1ZTtcbn07XG5cbi8qKlxuICogdW5sb2NrIG5hdGl2ZSBtZXRob2QgY2FsbHNcbiAqIEBwdWJsaWNcbiAqL1xuaVNsaWRlclByb3RvdHlwZS51bmxvY2sgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxvY2tpbmcgPSBmYWxzZTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGlTbGlkZXIiLCIvKipcbiAqIFRvIGNyZWF0ZSByaWdodCZsZWZ0IGJvdHRvbiBvbiBpU2xpZGVyXG4gKlxuICogQGZpbGUgYnV0dG9uLmpzXG4gKiBAYXV0aG9yIEJFLUZFIFRlYW1cbiAqICAgIHhpZXl1MzMzMzMgeGlleXUzMzMzM0BnbWFpbC5jb21cbiAqICAgIHNoaW5hdGUgc2hpbmUud2FuZ3JzQGdtYWlsLmNvbVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyIGZyb20gJy4uL2lzbGlkZXIuanMnO1xuXG5pU2xpZGVyICYmIGlTbGlkZXIucmVnUGx1Z2luKCdidXR0b24nLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgSEFORExFID0gdGhpcztcbiAgICBpZiAoIUhBTkRMRS5pc1ZlcnRpY2FsKSB7XG4gICAgICAgIHZhciBidG5PdXRlciA9IFtdO1xuICAgICAgICB2YXIgYnRuSW5uZXIgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgICAgIGJ0bk91dGVyW2ldID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBidG5PdXRlcltpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1idG4tb3V0ZXInO1xuICAgICAgICAgICAgYnRuSW5uZXJbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGJ0bklubmVyW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWJ0bi1pbm5lcic7XG5cbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uY2xhc3NOYW1lICs9ICcgbGVmdCc7XG4gICAgICAgICAgICAgICAgYnRuT3V0ZXJbaV0uZGlyID0gLTE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ0bk91dGVyW2ldLmNsYXNzTmFtZSArPSAnIHJpZ2h0JztcbiAgICAgICAgICAgICAgICBidG5PdXRlcltpXS5kaXIgPSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBidG5PdXRlcltpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXIgPSBwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnZGlyJyksIDEwKTtcbiAgICAgICAgICAgICAgICBIQU5ETEUuc2xpZGVUbyhIQU5ETEUuc2xpZGVJbmRleCArIGRpcik7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgYnRuT3V0ZXJbaV0uYXBwZW5kQ2hpbGQoYnRuSW5uZXJbaV0pO1xuICAgICAgICAgICAgSEFORExFLndyYXAuYXBwZW5kQ2hpbGQoYnRuT3V0ZXJbaV0sIEhBTkRMRS53cmFwLm5leHRTaWJsaW5nKTtcbiAgICAgICAgfVxuICAgIH1cbn0pIiwiLyoqXG4gKiBUbyBjcmVhdGUgZG90cyBpbmRleCBvbiBpU2xpZGVyXG4gKlxuICogQGZpbGUgZG90LmpzXG4gKiBAYXV0aG9yIEJFLUZFIFRlYW1cbiAqICAgIHhpZXl1MzMzMzMgeGlleXUzMzMzM0BnbWFpbC5jb21cbiAqICAgIHNoaW5hdGUgc2hpbmUud2FuZ3JzQGdtYWlsLmNvbVxuICogQEluc3RydWN0aW9uc1xuICogICAgYWN0aXZhdGlvbjpcbiAqICAgICAgIG5ldyBpU2xpZGVyKHtcbiAqICAgICAgICAgIC4uLlxuICogICAgICAgICAgcGx1Z2luczogWydkb3QnXVxuICogICAgICAgICAgLi4uXG4gKiAgICAgICB9KTtcbiAqICAgIG1vcmUgb3B0aW9uczpcbiAqICAgICAgIG5ldyBpU2xpZGVyKHtcbiAqICAgICAgICAgIC4uLlxuICogICAgICAgICAgcGx1Z2luczogW1snZG90Jywge2xvY2F0ZTonYWJzb3VsdXRlJ31dXVxuICogICAgICAgICAgLi4uXG4gKiAgICAgICB9KTtcbiAqIEBvcHRpb25zXG4gKiAgICBsb2NhdGUge3N0cmluZ3xIVE1MIEVsZW1lbnR9IHRoZSB3YXJwcGVyIG9mIGRvdHMgdmFsdWU6ICdhYnNvbHV0ZScsICdyZWxhdGl2ZScgb3IgU3BlY2lmaWVkIGRvbSwgZGVmYXVsdDogJ2Fic29sdXRlJ1xuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyIGZyb20gJy4uL2lzbGlkZXIuanMnO1xuXG5pU2xpZGVyICYmIGlTbGlkZXIucmVnUGx1Z2luKCdkb3QnLCBmdW5jdGlvbihvcHRzKSB7XG4gICAgdmFyIEhBTkRMRSA9IHRoaXM7XG4gICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICB2YXIgbG9jYXRlID0gKGZ1bmN0aW9uKGxvY2F0ZSkge1xuICAgICAgICAgICAgaWYgKGxvY2F0ZSA9PT0gJ3JlbGF0aXZlJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBIQU5ETEUud3JhcDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQm9vbGVhbihsb2NhdGUubm9kZU5hbWUpICYmIEJvb2xlYW4obG9jYXRlLm5vZGVUeXBlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsb2NhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gSEFORExFLndyYXAucGFyZW50Tm9kZTtcbiAgICAgICAgfSkob3B0cyAmJiBvcHRzLmxvY2F0ZSAhPSBudWxsID8gb3B0cy5sb2NhdGUgOiBmYWxzZSk7XG4gICAgICAgIHZhciBkYXRhID0gSEFORExFLmRhdGE7XG4gICAgICAgIHZhciBkb3RzID0gW107XG4gICAgICAgIHZhciBkb3RXcmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICAgICAgZG90V3JhcC5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3Qtd3JhcCc7XG5cbiAgICAgICAgdmFyIHJlbmRlckRvdHMgPSBmdW5jdGlvbiByZW5kZXJEb3RzKCkge1xuICAgICAgICAgICAgdmFyIGZyZWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZG90c1tpXSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICAgICAgICAgICAgZG90c1tpXS5jbGFzc05hbWUgPSAnaXNsaWRlci1kb3QnO1xuICAgICAgICAgICAgICAgIGRvdHNbaV0uc2V0QXR0cmlidXRlKCdpbmRleCcsIGkpO1xuICAgICAgICAgICAgICAgIGlmIChpID09PSBIQU5ETEUuc2xpZGVJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSArPSAnIGFjdGl2ZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvdHNbaV0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBIQU5ETEUuc2xpZGVUbyhwYXJzZUludCh0aGlzLmdldEF0dHJpYnV0ZSgnaW5kZXgnKSwgMTApKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZyZWdtZW50LmFwcGVuZENoaWxkKGRvdHNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG90V3JhcC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGRvdFdyYXAuYXBwZW5kQ2hpbGQoZnJlZ21lbnQpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHJlbmRlckRvdHMoKTtcblxuICAgICAgICBsb2NhdGUuYXBwZW5kQ2hpbGQoZG90V3JhcCk7XG5cbiAgICAgICAgSEFORExFLm9uKCdzbGlkZUNoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFIQU5ETEUuaXNWZXJ0aWNhbCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBkb3RzW2ldLmNsYXNzTmFtZSA9ICdpc2xpZGVyLWRvdCc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSB0aGlzLnNsaWRlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvdHNbaV0uY2xhc3NOYW1lICs9ICcgYWN0aXZlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgSEFORExFLm9uKCdyZWxvYWREYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICAgICAgZG90cyA9IFtdO1xuICAgICAgICAgICAgcmVuZGVyRG90cygpO1xuICAgICAgICB9KTtcbiAgICB9XG59KTsiLCIvKipcbiAqIEBmaWxlIHpvb21waWMuanNcbiAqIEBhdXRob3IgbGl1aHVpMDEgb24gMjAxNS8xLzcuXG4gKiBAbW9kaWZ5IHNoaW5hdGUgc2hpbmUud2FuZ3JzQGdtYWlsLmNvbVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmltcG9ydCBpU2xpZGVyIGZyb20gJy4uL2lzbGlkZXIuanMnO1xuXG52YXIgZ2xvYmFsID0gd2luZG93O1xuXG52YXIgc3RhcnRIYW5kbGVyT3JpZ2luYWwgPSBpU2xpZGVyLnByb3RvdHlwZS5zdGFydEhhbmRsZXI7XG52YXIgZW5kSGFuZGxlck9yaWdpbmFsID0gaVNsaWRlci5wcm90b3R5cGUuZW5kSGFuZGxlcjtcbnZhciBtb3ZlSGFuZGxlck9yaWdpbmFsID0gaVNsaWRlci5wcm90b3R5cGUubW92ZUhhbmRsZXI7XG5cbi8qKlxuICogU3VwcG9ydCAzRCBtYXRyaXggdHJhbnNsYXRlXG4gKiBAdHlwZSB7Ym9vbGVhbn1cbiAqL1xudmFyIGhhczNkID0gKCdXZWJLaXRDU1NNYXRyaXgnIGluIGdsb2JhbCAmJiAnbTExJyBpbiBuZXcgV2ViS2l0Q1NTTWF0cml4KCkpO1xuXG4vKipcbiAqIE1pbiBzY2FsZVxuICogQHR5cGUge251bWJlcn1cbiAqL1xudmFyIG1pblNjYWxlID0gMSAvIDI7XG5cbi8qKlxuICogU2NlbmUgdmlldyByYW5nZVxuICogQHR5cGUge3t9fVxuICovXG52YXIgdmlld1Njb3BlID0ge307XG5cbnZhciBjdXJyZW50U2NhbGU7XG5cbnZhciB6b29tRmFjdG9yO1xuXG52YXIgem9vbU5vZGU7XG5cbnZhciBzdGFydFRvdWNoZXM7XG5cbnZhciBzdGFydFg7XG5cbnZhciBzdGFydFk7XG5cbnZhciBsYXN0VG91Y2hTdGFydDtcblxudmFyIGdlc3R1cmU7XG5cbnZhciBJTl9TQ0FMRV9NT0RFID0gZmFsc2U7XG5cbi8qKlxuICogR2VuZXJhdGUgdHJhbnNsYXRlXG4gKiBAcGFyYW0geFxuICogQHBhcmFtIHlcbiAqIEBwYXJhbSB6XG4gKiBAcGFyYW0gc2NhbGVcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlVHJhbnNsYXRlKHgsIHksIHosIHNjYWxlKSB7XG4gICAgcmV0dXJuIFwidHJhbnNsYXRlXCIgKyAoaGFzM2QgPyBcIjNkKFwiIDogXCIoXCIpICsgeCArIFwicHgsXCIgKyB5ICsgKGhhczNkID8gXCJweCxcIiArIHogKyBcInB4KVwiIDogXCJweClcIikgKyBcInNjYWxlKFwiICsgc2NhbGUgKyBcIilcIjtcbn1cblxuLyoqXG4gKiBHZXQgZGlzdGFuY2VcbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gYlxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gZ2V0RGlzdGFuY2UoYSwgYikge1xuICAgIHZhciB4LCB5O1xuICAgIHggPSBhLmxlZnQgLSBiLmxlZnQ7XG4gICAgeSA9IGEudG9wIC0gYi50b3A7XG4gICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gdG8gc3RyaW5nXG4gKiBAcGFyYW0geFxuICogQHBhcmFtIHlcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKHgsIHkpIHtcbiAgICByZXR1cm4geCArIFwicHggXCIgKyB5ICsgXCJweFwiO1xufVxuXG4vKipcbiAqIEdldCB0b3VjaCBwb2ludGVyXG4gKiBAcGFyYW0gdG91Y2hlc1xuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiBnZXRUb3VjaGVzKHRvdWNoZXMpIHtcbiAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodG91Y2hlcykubWFwKGZ1bmN0aW9uKHRvdWNoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBsZWZ0OiB0b3VjaC5wYWdlWCxcbiAgICAgICAgICAgIHRvcDogdG91Y2gucGFnZVlcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIEdldCBzY2FsZVxuICogQHBhcmFtIHN0YXJ0XG4gKiBAcGFyYW0gZW5kXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBjYWxjdWxhdGVTY2FsZShzdGFydCwgZW5kKSB7XG4gICAgdmFyIHN0YXJ0RGlzdGFuY2UgPSBnZXREaXN0YW5jZShzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgIHZhciBlbmREaXN0YW5jZSA9IGdldERpc3RhbmNlKGVuZFswXSwgZW5kWzFdKTtcbiAgICByZXR1cm4gZW5kRGlzdGFuY2UgLyBzdGFydERpc3RhbmNlO1xufVxuXG4vKipcbiAqIEdldCBjb21wdXRlZCB0cmFuc2xhdGVcbiAqIEBwYXJhbSBvYmpcbiAqIEByZXR1cm5zIHt7dHJhbnNsYXRlWDogbnVtYmVyLCB0cmFuc2xhdGVZOiBudW1iZXIsIHRyYW5zbGF0ZVo6IG51bWJlciwgc2NhbGVYOiBudW1iZXIsIHNjYWxlWTogbnVtYmVyLCBvZmZzZXRYOiBudW1iZXIsIG9mZnNldFk6IG51bWJlcn19XG4gKi9cbmZ1bmN0aW9uIGdldENvbXB1dGVkVHJhbnNsYXRlKG9iaikge1xuICAgIHZhciByZXN1bHQgPSB7XG4gICAgICAgIHRyYW5zbGF0ZVg6IDAsXG4gICAgICAgIHRyYW5zbGF0ZVk6IDAsXG4gICAgICAgIHRyYW5zbGF0ZVo6IDAsXG4gICAgICAgIHNjYWxlWDogMSxcbiAgICAgICAgc2NhbGVZOiAxLFxuICAgICAgICBvZmZzZXRYOiAwLFxuICAgICAgICBvZmZzZXRZOiAwXG4gICAgfTtcbiAgICB2YXIgb2Zmc2V0WCA9IDAsXG4gICAgICAgIG9mZnNldFkgPSAwO1xuICAgIGlmICghZ2xvYmFsLmdldENvbXB1dGVkU3R5bGUgfHwgIW9iaikgcmV0dXJuIHJlc3VsdDtcbiAgICB2YXIgc3R5bGUgPSBnbG9iYWwuZ2V0Q29tcHV0ZWRTdHlsZShvYmopLFxuICAgICAgICB0cmFuc2Zvcm0sIG9yaWdpbjtcbiAgICB0cmFuc2Zvcm0gPSBzdHlsZS53ZWJraXRUcmFuc2Zvcm0gfHwgc3R5bGUubW96VHJhbnNmb3JtO1xuICAgIG9yaWdpbiA9IHN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiB8fCBzdHlsZS5tb3pUcmFuc2Zvcm1PcmlnaW47XG4gICAgdmFyIHBhciA9IG9yaWdpbi5tYXRjaCgvKC4qKXB4XFxzKyguKilweC8pO1xuICAgIGlmIChwYXIubGVuZ3RoID4gMSkge1xuICAgICAgICBvZmZzZXRYID0gcGFyWzFdIC0gMDtcbiAgICAgICAgb2Zmc2V0WSA9IHBhclsyXSAtIDA7XG4gICAgfVxuICAgIGlmICh0cmFuc2Zvcm0gPT0gXCJub25lXCIpIHJldHVybiByZXN1bHQ7XG4gICAgdmFyIG1hdDNkID0gdHJhbnNmb3JtLm1hdGNoKC9ebWF0cml4M2RcXCgoLispXFwpJC8pO1xuICAgIHZhciBtYXQyZCA9IHRyYW5zZm9ybS5tYXRjaCgvXm1hdHJpeFxcKCguKylcXCkkLyk7XG4gICAgaWYgKG1hdDNkKSB7XG4gICAgICAgIHZhciBzdHIgPSBtYXQzZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlWDogc3RyWzEyXSAtIDAsXG4gICAgICAgICAgICB0cmFuc2xhdGVZOiBzdHJbMTNdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVo6IHN0clsxNF0gLSAwLFxuICAgICAgICAgICAgb2Zmc2V0WDogb2Zmc2V0WCAtIDAsXG4gICAgICAgICAgICBvZmZzZXRZOiBvZmZzZXRZIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWDogc3RyWzBdIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWTogc3RyWzVdIC0gMCxcbiAgICAgICAgICAgIHNjYWxlWjogc3RyWzEwXSAtIDBcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKG1hdDJkKSB7XG4gICAgICAgIHZhciBzdHIgPSBtYXQyZFsxXS5zcGxpdCgnLCAnKTtcbiAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgdHJhbnNsYXRlWDogc3RyWzRdIC0gMCxcbiAgICAgICAgICAgIHRyYW5zbGF0ZVk6IHN0cls1XSAtIDAsXG4gICAgICAgICAgICBvZmZzZXRYOiBvZmZzZXRYIC0gMCxcbiAgICAgICAgICAgIG9mZnNldFk6IG9mZnNldFkgLSAwLFxuICAgICAgICAgICAgc2NhbGVYOiBzdHJbMF0gLSAwLFxuICAgICAgICAgICAgc2NhbGVZOiBzdHJbM10gLSAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogR2V0IGNlbnRlciBwb2ludFxuICogQHBhcmFtIGFcbiAqIEBwYXJhbSBiXG4gKiBAcmV0dXJucyB7e3g6IG51bWJlciwgeTogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0Q2VudGVyKGEsIGIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiAoYS54ICsgYi54KSAvIDIsXG4gICAgICAgIHk6IChhLnkgKyBiLnkpIC8gMlxuICAgIH1cbn1cblxuLyoqXG4gKiBpbml0XG4gKiBAcGFyYW0gb3B0c1xuICovXG5mdW5jdGlvbiBpbml0Wm9vbShvcHRzKSB7XG4gICAgY3VycmVudFNjYWxlID0gMTtcbiAgICB6b29tRmFjdG9yID0gb3B0cyAmJiBvcHRzLnpvb21GYWN0b3IgfHwgMjtcbn1cblxuLyoqXG4gKiBTdGFydCBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gc3RhcnRIYW5kbGVyKGV2dCkge1xuICAgIHN0YXJ0SGFuZGxlck9yaWdpbmFsLmNhbGwodGhpcywgZXZ0KTtcbiAgICAvLyBtdXN0IGJlIGEgcGljdHVyZSwgb25seSBvbmUgcGljdHVyZSEhXG4gICAgdmFyIG5vZGUgPSB0aGlzLmVsc1sxXS5xdWVyeVNlbGVjdG9yKCdpbWc6Zmlyc3QtY2hpbGQnKTtcbiAgICB2YXIgZGV2aWNlID0gdGhpcy5kZXZpY2VFdmVudHM7XG4gICAgaWYgKGRldmljZS5oYXNUb3VjaCAmJiBub2RlICE9PSBudWxsKSB7XG4gICAgICAgIElOX1NDQUxFX01PREUgPSB0cnVlO1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUobm9kZSk7XG4gICAgICAgIHN0YXJ0VG91Y2hlcyA9IGdldFRvdWNoZXMoZXZ0LnRhcmdldFRvdWNoZXMpO1xuICAgICAgICBzdGFydFggPSB0cmFuc2Zvcm0udHJhbnNsYXRlWCAtIDA7XG4gICAgICAgIHN0YXJ0WSA9IHRyYW5zZm9ybS50cmFuc2xhdGVZIC0gMDtcbiAgICAgICAgY3VycmVudFNjYWxlID0gdHJhbnNmb3JtLnNjYWxlWDtcbiAgICAgICAgem9vbU5vZGUgPSBub2RlO1xuICAgICAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgICAgIGlmIChldnQudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgbGFzdFRvdWNoU3RhcnQgPSBudWxsO1xuICAgICAgICAgICAgdmFyIHRvdWNoZXMgPSBldnQudG91Y2hlcztcbiAgICAgICAgICAgIHZhciB0b3VjaENlbnRlciA9IGdldENlbnRlcih7XG4gICAgICAgICAgICAgICAgeDogdG91Y2hlc1swXS5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiB0b3VjaGVzWzBdLnBhZ2VZXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgeDogdG91Y2hlc1sxXS5wYWdlWCxcbiAgICAgICAgICAgICAgICB5OiB0b3VjaGVzWzFdLnBhZ2VZXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtT3JpZ2luID0gZ2VuZXJhdGVUcmFuc2Zvcm1PcmlnaW4odG91Y2hDZW50ZXIueCAtIHBvcy5sZWZ0LCB0b3VjaENlbnRlci55IC0gcG9zLnRvcCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZXZ0LnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB2YXIgdGltZSA9IChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICBnZXN0dXJlID0gMDtcbiAgICAgICAgICAgIGlmICh0aW1lIC0gbGFzdFRvdWNoU3RhcnQgPCAzMDApIHtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBnZXN0dXJlID0gMztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RUb3VjaFN0YXJ0ID0gdGltZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBNb3ZlIGV2ZW50IGhhbmRsZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICogQHJldHVybnMge251bWJlcn1cbiAqL1xuZnVuY3Rpb24gbW92ZUhhbmRsZXIoZXZ0KSB7XG4gICAgaWYgKElOX1NDQUxFX01PREUpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgICAgIHZhciBub2RlID0gem9vbU5vZGU7XG4gICAgICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICAgICAgaWYgKGRldmljZS5oYXNUb3VjaCkge1xuICAgICAgICAgICAgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gXCIwXCI7XG4gICAgICAgICAgICAgICAgZXZ0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgc2NhbGVJbWFnZShldnQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGV2dC50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSAmJiBjdXJyZW50U2NhbGUgPiAxKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBcIjBcIjtcbiAgICAgICAgICAgICAgICBldnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBtb3ZlSW1hZ2UuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBnZXN0dXJlID0gcmVzdWx0O1xuXG4gICAgICAgICAgICBpZiAocmVzdWx0ID4gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBtb3ZlSGFuZGxlck9yaWdpbmFsLmNhbGwodGhpcywgZXZ0KTtcbn1cblxuLyoqXG4gKiBEb3VibGUgdGFvIGhhbmRsZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiBoYW5kbGVEb3VibGVUYXAoZXZ0KSB7XG4gICAgdmFyIHpvb21GYWN0b3IgPSB6b29tRmFjdG9yIHx8IDI7XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICB2YXIgcG9zID0gZ2V0UG9zaXRpb24obm9kZSk7XG4gICAgY3VycmVudFNjYWxlID0gY3VycmVudFNjYWxlID09IDEgPyB6b29tRmFjdG9yIDogMTtcbiAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKDAsIDAsIDAsIGN1cnJlbnRTY2FsZSk7XG4gICAgaWYgKGN1cnJlbnRTY2FsZSAhPSAxKSBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybU9yaWdpbiA9IGdlbmVyYXRlVHJhbnNmb3JtT3JpZ2luKGV2dC50b3VjaGVzWzBdLnBhZ2VYIC0gcG9zLmxlZnQsIGV2dC50b3VjaGVzWzBdLnBhZ2VZIC0gcG9zLnRvcCk7XG59XG5cbi8qKlxuICogc2NhbGUgaW1hZ2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBldnRcbiAqL1xuZnVuY3Rpb24gc2NhbGVJbWFnZShldnQpIHtcbiAgICB2YXIgbW92ZVRvdWNlcyA9IGdldFRvdWNoZXMoZXZ0LnRhcmdldFRvdWNoZXMpO1xuICAgIHZhciBzY2FsZSA9IGNhbGN1bGF0ZVNjYWxlKHN0YXJ0VG91Y2hlcywgbW92ZVRvdWNlcyk7XG4gICAgdmFyIG5vZGUgPSB6b29tTm9kZTtcbiAgICBzY2FsZSA9IGN1cnJlbnRTY2FsZSAqIHNjYWxlIDwgbWluU2NhbGUgPyBtaW5TY2FsZSA6IGN1cnJlbnRTY2FsZSAqIHNjYWxlO1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUoMCwgMCwgMCwgc2NhbGUpO1xufVxuXG4vKipcbiAqIEVuZCBldmVudCBoYW5kbGVcbiAqIEBwYXJhbSBldnRcbiAqL1xuZnVuY3Rpb24gZW5kSGFuZGxlcihldnQpIHtcbiAgICBpZiAoSU5fU0NBTEVfTU9ERSkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gMDtcbiAgICAgICAgaWYgKGdlc3R1cmUgPT09IDIpIHsgLy/lj4zmiYvmjIdcbiAgICAgICAgICAgIHJlc2V0SW1hZ2UoZXZ0KTtcbiAgICAgICAgICAgIHJlc3VsdCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAoZ2VzdHVyZSA9PSAxKSB7IC8v5pS+5aSn5ouW5ou9XG4gICAgICAgICAgICByZXNldEltYWdlKGV2dCk7XG4gICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKGdlc3R1cmUgPT09IDMpIHsgLy/lj4zlh7tcbiAgICAgICAgICAgIGhhbmRsZURvdWJsZVRhcChldnQpO1xuICAgICAgICAgICAgcmVzZXRJbWFnZShldnQpO1xuICAgICAgICAgICAgSU5fU0NBTEVfTU9ERSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdCA+IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbmRIYW5kbGVyT3JpZ2luYWwuY2FsbCh0aGlzLCBldnQpO1xufVxuXG4vKipcbiAqIERyYWdtb3ZlIGltYWdlXG4gKiBAcGFyYW0ge29wamVjdH0gZXZ0XG4gKi9cbmZ1bmN0aW9uIG1vdmVJbWFnZShldnQpIHtcbiAgICB2YXIgbm9kZSA9IHpvb21Ob2RlO1xuICAgIHZhciBkZXZpY2UgPSB0aGlzLmRldmljZUV2ZW50cztcbiAgICB2YXIgb2Zmc2V0ID0ge1xuICAgICAgICBYOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVggLSB0aGlzLnN0YXJ0WCkgOiAoZXZ0LnBhZ2VYIC0gdGhpcy5zdGFydFgpLFxuICAgICAgICBZOiBkZXZpY2UuaGFzVG91Y2ggPyAoZXZ0LnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgLSB0aGlzLnN0YXJ0WSkgOiAoZXZ0LnBhZ2VZIC0gdGhpcy5zdGFydFkpXG4gICAgfTtcbiAgICB2YXIgbW92ZU9mZnNldCA9IHtcbiAgICAgICAgeDogc3RhcnRYICsgb2Zmc2V0LlggLSAwLFxuICAgICAgICB5OiBzdGFydFkgKyBvZmZzZXQuWSAtIDBcbiAgICB9O1xuICAgIG5vZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gZ2VuZXJhdGVUcmFuc2xhdGUobW92ZU9mZnNldC54LCBtb3ZlT2Zmc2V0LnksIDAsIGN1cnJlbnRTY2FsZSk7XG59XG5cbi8qKlxuICogR2V0IHBvc2l0aW9uXG4gKiBAcGFyYW0gZWxlbWVudFxuICogQHJldHVybnMge3tsZWZ0OiBudW1iZXIsIHRvcDogbnVtYmVyfX1cbiAqL1xuZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWxlbWVudCkge1xuICAgIHZhciBwb3MgPSB7XG4gICAgICAgIFwibGVmdFwiOiAwLFxuICAgICAgICBcInRvcFwiOiAwXG4gICAgfTtcbiAgICBkbyB7XG4gICAgICAgIHBvcy50b3AgKz0gZWxlbWVudC5vZmZzZXRUb3AgfHwgMDtcbiAgICAgICAgcG9zLmxlZnQgKz0gZWxlbWVudC5vZmZzZXRMZWZ0IHx8IDA7XG4gICAgICAgIGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcbiAgICB9XG4gICAgd2hpbGUgKGVsZW1lbnQpO1xuICAgIHJldHVybiBwb3M7XG59XG5cbi8qKlxuICogQ2hlY2sgdGFyZ2V0IGlzIGluIHJhbmdlXG4gKiBAcGFyYW0gbm9kZVxuICogQHBhcmFtIHZhbHVlXG4gKiBAcGFyYW0gdGFnXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gdmFsdWVJblZpZXdTY29wZShub2RlLCB2YWx1ZSwgdGFnKSB7XG4gICAgdmFyIG1pbiwgbWF4O1xuICAgIHZhciBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICB2aWV3U2NvcGUgPSB7XG4gICAgICAgIHN0YXJ0OiB7XG4gICAgICAgICAgICBsZWZ0OiBwb3MubGVmdCxcbiAgICAgICAgICAgIHRvcDogcG9zLnRvcFxuICAgICAgICB9LFxuICAgICAgICBlbmQ6IHtcbiAgICAgICAgICAgIGxlZnQ6IHBvcy5sZWZ0ICsgbm9kZS5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgIHRvcDogcG9zLnRvcCArIG5vZGUuY2xpZW50SGVpZ2h0XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzdHIgPSB0YWcgPT0gMSA/IFwibGVmdFwiIDogXCJ0b3BcIjtcbiAgICBtaW4gPSB2aWV3U2NvcGUuc3RhcnRbc3RyXTtcbiAgICBtYXggPSB2aWV3U2NvcGUuZW5kW3N0cl07XG4gICAgcmV0dXJuICh2YWx1ZSA+PSBtaW4gJiYgdmFsdWUgPD0gbWF4KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIG5vZGVcbiAqIEBwYXJhbSBvYmoxXG4gKiBAcmV0dXJucyB7bnVtYmVyfVxuICovXG5mdW5jdGlvbiBvdmVyRmxvdyhub2RlLCBvYmoxKSB7XG4gICAgdmFyIHJlc3VsdCA9IDA7XG4gICAgdmFyIGlzWDFJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5zdGFydC5sZWZ0LCAxKTtcbiAgICB2YXIgaXNYMkluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLmVuZC5sZWZ0LCAxKTtcbiAgICB2YXIgaXNZMUluID0gdmFsdWVJblZpZXdTY29wZShub2RlLCBvYmoxLnN0YXJ0LnRvcCwgMCk7XG4gICAgdmFyIGlzWTJJbiA9IHZhbHVlSW5WaWV3U2NvcGUobm9kZSwgb2JqMS5lbmQudG9wLCAwKTtcbiAgICBpZiAoKGlzWDFJbiAhPSBpc1gySW4pICYmIChpc1kxSW4gIT0gaXNZMkluKSkge1xuICAgICAgICBpZiAoaXNYMUluICYmIGlzWTJJbikge1xuICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmIChpc1gxSW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDJJbiAmJiBpc1kySW4pIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSA0O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmICgoaXNYMUluID09IGlzWDJJbikpIHtcbiAgICAgICAgaWYgKCFpc1kxSW4gJiYgaXNZMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA1O1xuICAgICAgICB9IGVsc2UgaWYgKCFpc1kySW4gJiYgaXNZMUluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA2O1xuICAgICAgICB9XG5cbiAgICB9IGVsc2UgaWYgKGlzWTFJbiA9PSBpc1kySW4pIHtcbiAgICAgICAgaWYgKCFpc1gxSW4gJiYgaXNYMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA3O1xuICAgICAgICB9IGVsc2UgaWYgKGlzWDFJbiAmJiAhaXNYMkluKSB7XG4gICAgICAgICAgICByZXN1bHQgPSA4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmIChpc1kxSW4gPT0gaXNZMkluID09IGlzWDFJbiA9PSBpc1gySW4pIHtcbiAgICAgICAgcmVzdWx0ID0gOTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBSZXNldCBpbWFnZVxuICogQHBhcmFtIHtvYmplY3R9IGV2dFxuICovXG5mdW5jdGlvbiByZXNldEltYWdlKGV2dCkge1xuICAgIGlmIChjdXJyZW50U2NhbGUgPT0gMSkgcmV0dXJuO1xuICAgIHZhciBub2RlID0gem9vbU5vZGUsXG4gICAgICAgIGxlZnQsIHRvcCwgdHJhbnMsIHcsIGgsIHBvcywgc3RhcnQsIGVuZCwgcGFyZW50LCBmbG93VGFnO1xuICAgIHRyYW5zID0gZ2V0Q29tcHV0ZWRUcmFuc2xhdGUobm9kZSk7XG4gICAgcGFyZW50ID0gbm9kZS5wYXJlbnROb2RlO1xuICAgIHcgPSBub2RlLmNsaWVudFdpZHRoICogdHJhbnMuc2NhbGVYO1xuICAgIGggPSBub2RlLmNsaWVudEhlaWdodCAqIHRyYW5zLnNjYWxlWDtcbiAgICBwb3MgPSBnZXRQb3NpdGlvbihub2RlKTtcbiAgICBzdGFydCA9IHtcbiAgICAgICAgbGVmdDogKDEgLSB0cmFucy5zY2FsZVgpICogdHJhbnMub2Zmc2V0WCArIHBvcy5sZWZ0ICsgdHJhbnMudHJhbnNsYXRlWCxcbiAgICAgICAgdG9wOiAoMSAtIHRyYW5zLnNjYWxlWCkgKiB0cmFucy5vZmZzZXRZICsgcG9zLnRvcCArIHRyYW5zLnRyYW5zbGF0ZVlcbiAgICB9O1xuICAgIGVuZCA9IHtcbiAgICAgICAgbGVmdDogc3RhcnQubGVmdCArIHcsXG4gICAgICAgIHRvcDogc3RhcnQudG9wICsgaFxuICAgIH07XG4gICAgbGVmdCA9IHN0YXJ0LmxlZnQ7XG4gICAgdG9wID0gc3RhcnQudG9wO1xuXG4gICAgZmxvd1RhZyA9IG92ZXJGbG93KHBhcmVudCwge1xuICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgIGVuZDogZW5kXG4gICAgfSk7XG4gICAgc3dpdGNoIChmbG93VGFnKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuc3RhcnQubGVmdDtcbiAgICAgICAgICAgIHRvcCA9IHZpZXdTY29wZS5lbmQudG9wIC0gaDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuc3RhcnQudG9wO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLmVuZC50b3AgLSBoO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgIGxlZnQgPSB2aWV3U2NvcGUuZW5kLmxlZnQgLSB3O1xuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICB0b3AgPSB2aWV3U2NvcGUuZW5kLnRvcCAtIGg7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgdG9wID0gdmlld1Njb3BlLnN0YXJ0LnRvcDtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLmVuZC5sZWZ0IC0gdztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICBsZWZ0ID0gdmlld1Njb3BlLnN0YXJ0LmxlZnQ7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHcgPCBwYXJlbnQuY2xpZW50V2lkdGgpIHtcbiAgICAgICAgbGVmdCA9IHBvcy5sZWZ0IC0gKHRyYW5zLnNjYWxlWCAtIDEpICogbm9kZS5jbGllbnRXaWR0aCAvIDI7XG4gICAgfVxuICAgIGlmIChoIDwgcGFyZW50LmNsaWVudEhlaWdodCkge1xuICAgICAgICB0b3AgPSBwb3MudG9wIC0gKHRyYW5zLnNjYWxlWCAtIDEpICogbm9kZS5jbGllbnRIZWlnaHQgLyAyO1xuICAgIH1cbiAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IFwiMTAwbXNcIjtcbiAgICBub2RlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGdlbmVyYXRlVHJhbnNsYXRlKHRyYW5zLnRyYW5zbGF0ZVggKyBsZWZ0IC0gc3RhcnQubGVmdCwgdHJhbnMudHJhbnNsYXRlWSArIHRvcCAtIHN0YXJ0LnRvcCwgMCwgdHJhbnMuc2NhbGVYKTtcblxufVxuXG5pU2xpZGVyLmV4dGVuZCh7XG4gICAgc3RhcnRIYW5kbGVyOiBzdGFydEhhbmRsZXIsXG4gICAgbW92ZUhhbmRsZXI6IG1vdmVIYW5kbGVyLFxuICAgIGVuZEhhbmRsZXI6IGVuZEhhbmRsZXJcbn0pO1xuXG5pU2xpZGVyLnJlZ1BsdWdpbignem9vbXBpYycsIGluaXRab29tKTsiXX0=
