/*
 * @file   To create dots index on iSlider
 * @author xieyu33333
 */

function addDot() {
    let HANDLE = this;
    if (!HANDLE.isVertical) {
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
                for (let i = 0; i < data.length; i++) {
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
}

module.exports = addDot;
