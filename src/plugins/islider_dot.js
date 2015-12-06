'use strict';
/*
 * @file   To create dots index on iSlider
 * @author xieyu33333
 */

//import iSlider from '../islider_core.js';

class iSlider_D extends iSlider {
    constructor(...opts) {
        //直接调用父类构造器进行初始化
        super(...opts);

        this && this.regPlugin('dot', function(opts) {
            let HANDLE = this;
            if (!HANDLE.isVertical) {
                let locate = (function(locate) {
                    if (locate === 'relative') {
                        return HANDLE.wrap;
                    } else if (Boolean(locate.nodeName) && Boolean(locate.nodeType)) {
                        return locate;
                    }
                    return HANDLE.wrap.parentNode;
                })(opts && opts.locate != null ? opts.locate : false);
                let data = HANDLE.data;
                let dots = [];
                let dotWrap = document.createElement('ul');
                dotWrap.className = 'islider-dot-wrap';

                let renderDots = function renderDots() {
                    let fregment = document.createDocumentFragment();
                    for (let i = 0; i < data.length; i++) {
                        dots[i] = document.createElement('li');
                        dots[i].className = 'islider-dot';
                        dots[i].setAttribute('index', i);
                        if (i === HANDLE.slideIndex) {
                            dots[i].className += ' active';
                        }
                        dots[i].onclick = function() {
                            HANDLE.slideTo(parseInt(this.getAttribute('index'), 10));
                        };
                        fregment.appendChild(dots[i]);
                    }
                    dotWrap.innerHTML = '';
                    dotWrap.appendChild(fregment);
                };

                renderDots();

                locate.appendChild(dotWrap);

                HANDLE.on('slideChange', function() {
                    if (!HANDLE.isVertical) {
                        for (let i = 0; i < data.length; i++) {
                            dots[i].className = 'islider-dot';
                            if (i === this.slideIndex) {
                                dots[i].className += ' active';
                            }
                        }
                    }
                });

                HANDLE.on('reloadData', function() {
                    data = this.data;
                    dots = [];
                    renderDots();
                });
            }
        });
    }
}



window['iSlider'] = iSlider_D;