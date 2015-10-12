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

import Animation from './plugins/islider_animate.js';
import Zoom from './plugins/islider_zoom.js';

class iSliderCore {
    //ES6中新型构造器
    constructor(opts) {
        if (!opts.dom) {
            throw new Error('dom element can not be empty!');
        }

        if (!opts.data || !opts.data.length) {
            throw new Error('data must be an array and must have more than one element!');
        }

        this.extend(Zoom, this);

        this._opts = opts;
        this._setting();
        this._renderHTML();
        this._bindHandler();
    }

    //实例方法
    _setting() {
        let opts = this._opts;

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
        }
        else {
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

        this.offset = this.offset || {X: 0, Y: 0};
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
        } : function () {
        };
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
            'default': function (dom, axis, scale, i, offset) {
                dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
            }
        };

        this.extend(Animation, this._animateFuncs);

        // set animate Function
        this._animateFunc = (opts.animateType in this._animateFuncs)
            ? this._animateFuncs[opts.animateType]
            : this._animateFuncs['default'];
    }

    // fixed bug for android device
    _setPlayWhenFocus() {
        window.addEventListener('focus', this, false);
        window.addEventListener('blur', this, false);
    }

    /**
     *  enable damping when slider meet the edge
     */
    _setUpDamping() {
        let oneIn2 = this.scale >> 1;
        let oneIn4 = oneIn2 >> 1;
        let oneIn16 = oneIn4 >> 2;

        this._damping = function (distance) {
            let dis = Math.abs(distance);
            let result;

            if (dis < oneIn2) {
                result = dis >> 1;
            } else if (dis < oneIn2 + oneIn4) {
                result = oneIn4 + ((dis - oneIn2) >> 2);
            } else {
                result = oneIn4 + oneIn16 + ((dis - oneIn2 - oneIn4) >> 3);
            }

            return distance > 0 ? result : -result;
        };
    }

    /**
     * render single item html by idx
     * @param {element} el ..
     * @param {number}  i  ..
     */
    _renderItem(el, i) {
        let item;
        let html;
        let len = this.data.length;
        let self = this;

        let insertImg = function () {
            html = item.height / item.width > self.ratio
                ? '<img height="' + self.height + '" src="' + item.content + '">'
                : '<img width="' + self.width + '" src="' + item.content + '">';
            el.innerHTML = html;
        };

        // get the right item of data
        if (!this.isLooping) {
            item = this.data[i] || {empty: true};
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
                    let currentImg = new Image();
                    currentImg.src = item.content;
                    currentImg.onload = function () {
                        item.height = currentImg.height;
                        item.width = currentImg.width;
                        insertImg();
                    };
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
    _renderHTML() {
        this.outer && (this.outer.innerHTML = '');
        // initail ul element
        let outer = this.outer || document.createElement('ul');
        outer.className = 'islider-outer';
        outer.style.cssText = 'height:' + this.height + 'px;width:' + this.width
            + 'px;margin:0;padding:0;list-style:none;';

        //loading
        if (this.type === 'pic' && !this.loader && this.isLoading) {
            let loader = document.createElement('div');
            loader.className = 'islider-loader';
            this.loader = loader;
            this.wrap.appendChild(loader);
        }

        // storage li elements, only store 3 elements to reduce memory usage
        this.els = [];
        for (let i = 0; i < 3; i++) {
            let li = document.createElement('li');
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
    _preloadImg(dataIndex) {
        let len = this.data.length;
        let idx = dataIndex;
        let self = this;
        let loadImg = function (index) {
            if (index > -1 && !self.data[index].loaded) {
                let preloadImg = new Image();
                preloadImg.src = self.data[index].content;
                preloadImg.onload = function () {
                    self.data[index].width = preloadImg.width;
                    self.data[index].height = preloadImg.height;
                };
                self.data[index].loaded = 1;
            }
        };

        if (self.type !== 'dom' && len > 3) {
            let nextIndex = (idx + 2 > len - 1) ? ((idx + 2) % len) : (idx + 2);
            let prevIndex = (idx - 2 < 0) ? (len - 2 + idx) : (idx - 2);
            loadImg(nextIndex);
            loadImg(prevIndex);
        }
    }

;

    /**
     *  load extra imgs when renderHTML
     */
    _initLoadImg() {
        let data = this.data;
        let len = data.length;
        let idx = this.slideIndex;
        let self = this;

        if (this.type !== 'dom' && len > 3) {
            let nextIndex = (idx + 2 > len) ? ((idx + 1) % len) : (idx + 1);
            let prevIndex = (idx - 1 < 0) ? (len - 1 + idx) : (idx - 1);
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
    slideTo(dataIndex) {
        let data = this.data;
        let els = this.els;
        let idx = dataIndex;
        let n = dataIndex - this.slideIndex;

        if (Math.abs(n) > 1) {
            let nextEls = n > 0 ? this.els[2] : this.els[0];
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
        let sEle;
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
        for (let i = 0; i < 3; i++) {
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
    _device() {
        let hasTouch = !!(('ontouchstart' in window)
        || window.DocumentTouch && document instanceof window.DocumentTouch);
        let startEvt = hasTouch ? 'touchstart' : 'mousedown';
        let moveEvt = hasTouch ? 'touchmove' : 'mousemove';
        let endEvt = hasTouch ? 'touchend' : 'mouseup';
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
    _bindHandler() {
        let outer = this.outer;
        let device = this._device();
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
    bind(evtType, selector, callback) {
        function handle(e) {
            let evt = window.event ? window.event : e;
            let target = evt.target;
            let eleArr = document.querySelectorAll(selector);
            for (let i = 0; i < eleArr.length; i++) {
                if (target === eleArr[i]) {
                    callback.call(target);
                    break;
                }
            }
        }

        this.wrap.addEventListener(evtType, handle, false);
    }

    delegate(evtType, selector, callback) {
        function handle(e) {
            let evt = window.event ? window.event : e;
            let target = evt.target;
            let eleArr = document.querySelectorAll(selector);
            for (let i = 0; i < eleArr.length; i++) {
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
    destroy () {
        let outer = this.outer;
        let device = this._device();

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
    handleEvent (evt) {
        let device = this._device();
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
    startHandler (evt) {
        if (this.fixPage) {
            let target = evt.target;
            if (target.tagName !== 'SELECT' && target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
                evt.preventDefault();
            }
        }
        let device = this._device();
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
    moveHandler (evt) {
        if (this.isMoving) {
            let device = this._device();
            let len = this.data.length;
            let axis = this.axis;
            let reverseAxis = this.reverseAxis;
            let offset = {
                X: device.hasTouch ? (evt.targetTouches[0].pageX - this.startX) : (evt.pageX - this.startX),
                Y: device.hasTouch ? (evt.targetTouches[0].pageY - this.startY) : (evt.pageY - this.startY)
            };

            let res = this._moveHandler ? this._moveHandler(evt) : false;
            if (!res && Math.abs(offset[axis]) - Math.abs(offset[reverseAxis]) > 10) {
                evt.preventDefault();

                this.onslide && this.onslide(offset[axis]);
                this.log('Event: onslide');

                if (!this.isLooping) {
                    if (offset[axis] > 0 && this.slideIndex === 0 || offset[axis] < 0 && this.slideIndex === len - 1) {
                        offset[axis] = this._damping(offset[axis]);
                    }
                }

                for (let i = 0; i < 3; i++) {
                    let item = this.els[i];
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
    endHandler (evt) {
        this.isMoving = false;
        let offset = this.offset;
        let axis = this.axis;
        let boundary = this.scale / 2;
        let endTime = new Date().getTime();

        // a quick slide time must under 300ms
        // a quick slide should also slide at least 14 px
        boundary = endTime - this.startTime > 300 ? boundary : 14;
        let res = this._endHandler ? this._endHandler(evt) : false;
        let absOffset = Math.abs(offset[axis]);
        let absReverseOffset = Math.abs(offset[this.reverseAxis]);

        let getLink = function (el) {
            if (el.tagName === 'A') {
                if (el.href) {
                    window.location.href = el.href
                    return false;
                }
            }
            else if (el.className === 'islider-dom') {
                return false;
            }
            else {
                getLink(el.parentNode);
            }
        }

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
    orientationchangeHandler () {
        let self = this;
        setTimeout(function () {
            self.reset();
            self.log('Event: orientationchange');
        }, 100);
    }

    /**
     * reset & rerender
     */
    reset () {
        this.pause();
        this._setting();
        this._renderHTML();
        this.isAutoplay && this.play();
    }

    /**
     * reload Data & render
     */
    loadData (data, initIndex) {
        this.pause();
        this.slideIndex = initIndex || 0;
        this.data = data;
        this._renderHTML();
        this.isAutoplay && this.play();
    }

    /**
     * enable autoplay
     */
    play () {
        let self = this;
        let duration = this.duration;
        clearInterval(this.autoPlayTimer);
        this.autoPlayTimer = setInterval(function () {
            self.slideTo(self.slideIndex + 1);
        }, duration);
    }

    /**
     * pause autoplay
     */
    pause() {
        clearInterval(this.autoPlayTimer);
    }

    /**
     * plugin extend
     * @param {Object} plugin need to be set up
     * @param {Object} main iSlider prototype
     */
    extend (plugin, main) {
        if (!main) {
            main = this;
        }
        Object.keys(plugin).forEach(function (property) {
            Object.defineProperty(main, property, Object.getOwnPropertyDescriptor(plugin, property));
        });
    }

}

module.exports = iSliderCore;
