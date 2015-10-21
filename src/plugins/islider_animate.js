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

let extendAnimation = {
    'rotate': function (dom, axis, scale, i, offset) {
        let rotateDirect = (axis === 'X') ? 'Y' : 'X';
        let absoluteOffset = Math.abs(offset);
        let bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;

        if (this.isVertical) {
            offset = -offset;
        }

        this.wrap.style.webkitPerspective = scale * 4;

        if (i === 1) {
            dom.style.zIndex = scale - absoluteOffset;
        } else {
            dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
        }

        dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; '
            + 'background-color:' + bdColor + '; position:absolute;';
        dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + 90 * (offset / scale + i - 1) + 'deg) translateZ('
            + (0.888 * scale / 2) + 'px) scale(0.888)';
    },

    'flip': function (dom, axis, scale, i, offset) {
        let rotateDirect = (axis === 'X') ? 'Y' : 'X';
        let bdColor = window.getComputedStyle(this.wrap.parentNode, null).backgroundColor;
        if (this.isVertical) {
            offset = -offset;
        }
        this.wrap.style.webkitPerspective = scale * 4;

        if (offset > 0) {
            dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
        } else {
            dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
        }

        dom.style.cssText += 'position:absolute; -webkit-backface-visibility:hidden; background-color:' + bdColor + ';';
        dom.style.webkitTransform = 'translateZ(' + (scale / 2) + 'px) rotate' + rotateDirect
            + '(' + 180 * (offset / scale + i - 1) + 'deg) scale(0.875)';
    },

    'depth': function (dom, axis, scale, i, offset) {
        let zoomScale = (4 - Math.abs(i - 1)) * 0.18;
        this.wrap.style.webkitPerspective = scale * 4;
        dom.style.zIndex = (i === 1) ? 100 : (offset > 0) ? (1 - i) : (i - 1);
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate'
            + axis + '(' + (offset + 1.3 * scale * (i - 1)) + 'px)';
    },

    'flow': function (dom, axis, scale, i, offset) {
        let absoluteOffset = Math.abs(offset);
        let rotateDirect = (axis === 'X') ? 'Y' : 'X';
        let directAmend = (axis === 'X') ? 1 : -1;
        let offsetRatio = Math.abs(offset / scale);

        this.wrap.style.webkitPerspective = scale * 4;

        if (i === 1) {
            dom.style.zIndex = scale - absoluteOffset;
        } else {
            dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset : (i - 1) * absoluteOffset;
        }

        dom.style.webkitTransform = 'scale(0.7, 0.7) translateZ(' + (offsetRatio * 150 - 150) * Math.abs(i - 1) + 'px)'
            + 'translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)'
            + 'rotate' + rotateDirect + '(' + directAmend * (30 - offsetRatio * 30) * (1 - i) + 'deg)';
    },

    'card': function (dom, axis, scale, i, offset) {
        let absoluteOffset = Math.abs(offset);

        if (i === 1) {
            dom.style.zIndex = scale - absoluteOffset;
            dom.cur = 1;
        } else {
            dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset * 1000 : (i - 1) * absoluteOffset * 1000;
        }

        if (dom.cur && dom.cur !== i) {
            setTimeout(function () {
                dom.cur = null;
            }, 300);
        }

        let zoomScale = (dom.cur) ? 1 - 0.2 * Math.abs(i - 1) - Math.abs(0.2 * offset / scale).toFixed(6) : 1;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis
            + '(' + ((1 + Math.abs(i - 1) * 0.2) * offset + scale * (i - 1)) + 'px)';
    },

    'fade': function fade(dom, axis, scale, i, offset) {
        if (offset > 0) {
            dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
        }
        else {
            dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
        }
        offset = Math.abs(offset);
        if (i === 1) {
            dom.style.opacity = 1 - (offset / scale);
        } else {
            dom.style.opacity = offset / scale;
        }
    },

    //晕染扩散
    'yrks': function fade(dom, axis, scale, i, offset, opposite) {
        dom.cur = 2;

        //正向
        function forward(){
            dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
            if (i === 1) {
                dom.cur = 1;
                dom.style.opacity = 1 + (offset / scale);
            } else {
                dom.style.opacity = - offset / scale;
            }
        }

        //反向
        function reverse(){
            dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
            if (i === 1) {
                dom.cur = 1;
                dom.style.opacity = 1 - (offset / scale);
            } else {
                dom.style.opacity = offset / scale;
            }
        }

        if (offset > 0) {
            reverse();
        }else {
            if(opposite){
                reverse();
            }else{
                forward();
            }
        }


        let zoomScale = (dom.cur === 1) ? 1 : 2;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0)';
    },

    //中心放大
    'zxfd': function fade(dom, axis, scale, i, offset, opposite) {
        let absoluteOffset = Math.abs(offset);
        dom.cur = 0.1;

        //正向
        function forward(){
            if(i == 1){
                dom.cur = 1;
                dom.style.visibility = 'visible';
                dom.style.zIndex = scale - absoluteOffset;
            }else if(i < 1){
                dom.cur = 1;
                dom.style.visibility = 'visible';
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }else{
                dom.style.visibility = 'hidden';
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
        }

        //反向
        function reverse(){
            if(i == 1){
                dom.cur = 1;
                dom.style.visibility = 'visible';
                dom.style.zIndex = scale - absoluteOffset;
            }else if(i > 1){
                dom.cur = 1;
                dom.style.visibility = 'hidden';
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }else{
                dom.style.visibility = 'hidden';
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
        }

        if (offset > 0) {
            reverse();
        }else {
            if(opposite){
                reverse();
            }else{
                forward();
            }
        }

        let zoomScale = (dom.cur === 1) ? 1 : 0.1;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0)';
    },

    //渐隐消失
    'jyxs': function fade(dom, axis, scale, i, offset, opposite) {
        let absoluteOffset = Math.abs(offset);

        //正向
        function forward(){
            dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
            if (i === 1) {
                dom.style.opacity = 1 - (offset / scale);
                dom.style.zIndex = scale - absoluteOffset;
            } else {
                dom.style.opacity = - offset / scale;
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
        }

        //反向
        function reverse(){
            dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
            if (i === 1) {//正要被显示的页面
                dom.style.opacity = 1 + (offset / scale);
                dom.style.zIndex = scale - absoluteOffset;
            } else if(i < 1) {
                dom.style.opacity = offset / scale;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            } else{
                dom.style.opacity = 1 - (offset / scale);
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
        }

        if (offset > 0) {
            reverse();
        }else {
            if(opposite){
                reverse();
                if(i == 1){
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }else if(i > 1){
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                }else{
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }
            }else{
                forward();
                if(i < 1){
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }else{
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                }
            }
        }
    },

    //平滑移出
    'phyc': function fade(dom, axis, scale, i, offset, opposite) {
        let absoluteOffset = Math.abs(offset);

        //正向
        function forward(){
            dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
            } else {
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
        }

        //反向
        function reverse(){
            dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
            if (i === 1) {//正要被显示的页面
                dom.style.zIndex = scale - absoluteOffset;
            } else if(i < 1) {
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
        }

        if (offset > 0) {
            reverse();
            if(i < 1){
                dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
            }
        }else {
            if(opposite){
                reverse();
                if(i == 1){
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }else if(i < 1){
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }else{
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                }
            }else{
                forward();
                if(i == 1){
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                }else if(i > 1){
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(' + (offset + scale * (i - 1)) + 'px)';
                }else{
                    dom.style.webkitTransform = 'translateZ(0) translate' + axis + '(0px)';
                }
            }
        }
    },

    //上下滑动
    'sxhd': function (dom, axis, scale, i, offset, opposite) {
        let absoluteOffset = Math.abs(offset);

        if (i === 1) {
            dom.style.zIndex = scale - absoluteOffset;
            dom.cur = 1;
        } else {
            dom.style.zIndex = (offset > 0) ? (1 - i) * absoluteOffset * 1000 : (i - 1) * absoluteOffset * 1000;
        }

        if (dom.cur && dom.cur !== i) {
            setTimeout(function () {
                dom.cur = null;
            }, 300);
        }

        let zoomScale = (dom.cur) ? 1 - 0.8 * Math.abs(i - 1) - Math.abs(0.8 * offset / scale).toFixed(6) : 1;
        dom.style.webkitTransform = 'scale(' + zoomScale + ', ' + zoomScale + ') translateZ(0) translate' + axis
            + '(' + ((1 + Math.abs(i - 1) * 0.2) * offset + scale * (i - 1)) + 'px)';
    },

    //卡片翻页
    'kpfy': function (dom, axis, scale, i, offset, opposite) {
        let absoluteOffset = Math.abs(offset);
        let rotateDirect, direction, forwardMoreCssText, reverseMoreCssText;
        if(axis === 'X'){
            rotateDirect = 'Y';
            direction = 1;
            forwardMoreCssText = '-webkit-transform-origin: right 50% 0px;';
            reverseMoreCssText = '-webkit-transform-origin: left 50% 0px;';
        }else{
            rotateDirect = 'X';
            direction = -1;
            forwardMoreCssText = '-webkit-transform-origin: 50% bottom 0px;';
            reverseMoreCssText = '-webkit-transform-origin: 50% top 0px;';
        }

        this.wrap.style.webkitPerspective = scale * 4;

        //正向
        function forward(){
            dom.style.visibility = (i < 1) ? 'hidden' : 'visible';
            if (i === 1) {
                dom.style.zIndex = scale - absoluteOffset;
            } else {
                dom.style.zIndex = (i - 1) * absoluteOffset * 1000;
            }
            dom.style.cssText += '-webkit-backface-visibility:hidden;-webkit-transform-style:preserve-3d; '
                + ' position:absolute;' + forwardMoreCssText;
        }

        //反向
        function reverse(){
            dom.style.visibility = (i > 1) ? 'hidden' : 'visible';
            if (i === 1) {//正要被显示的页面
                dom.style.zIndex = scale - absoluteOffset;
            } else if(i < 1) {
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
                dom.style.zIndex = (1 - i) * absoluteOffset * 1000;
            }
            dom.style.cssText += '-webkit-backface-visibility:hidden; -webkit-transform-style:preserve-3d; '
                + ' position:absolute;' + reverseMoreCssText;
        }

        if (offset > 0) {
            reverse();
            if(i < 1){
                dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + ( direction * 90 * (offset / scale + i - 1)) + 'deg)';
            }
        }else {
            if(opposite){
                reverse();
                if(i == 1){
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }else if(i < 1){
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + ( direction * 90 * (offset / scale + i - 1)) + 'deg)';
                }else{
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }
            }else{
                forward();
                if(i == 1){
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }else if(i > 1){
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(' + ( direction * 90 * (offset / scale + i - 1)) + 'deg)';
                }else{
                    dom.style.webkitTransform = 'rotate' + rotateDirect + '(0deg) ';
                }
            }
        }
    },
};


module.exports = extendAnimation;
