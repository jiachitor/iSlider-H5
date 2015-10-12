/*
 * @file   To create dots index on iSlider
 * @author xieyu33333
 */

function addDot() {
    if (!this.isVertical) {
        let self = this;
        let data = this.data;
        let dots = [];
        let dotWrap = document.createElement('ul');
        dotWrap.className = 'islider-dot-wrap';
        let fregment = document.createDocumentFragment();
        for (let i = 0; i < data.length; i++) {
            dots[i] = document.createElement('li');
            dots[i].className = 'islider-dot';
            dots[i].setAttribute('index', i);
            if (i === this.slideIndex) {
                dots[i].className += ' active';
            }
            dots[i].addEventListener('click', function () {
                let index = parseInt(this.getAttribute('index'), 10);
                self.slideTo(index);
            });
            fregment.appendChild(dots[i]);
        }
        dotWrap.appendChild(fregment);
        this.wrap.parentNode.appendChild(dotWrap);

        this.dotchange = function () {
            for (let i = 0; i < data.length; i++) {
                dots[i].className = 'islider-dot';
                if (i === this.slideIndex) {
                    dots[i].className += ' active';
                }
            }
        };
    }
}

module.exports = {addDot};
