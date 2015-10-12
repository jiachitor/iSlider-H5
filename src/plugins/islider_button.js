/*
 * @file   To create right&left botton on iSlider
 * @author xieyu33333
 */

function addBtn() {
    if (!this.isVertical) {
        let btnOuter = [];
        let btnInner = [];
        let self = this;
        for (let i = 0; i < 2; i++) {
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
                let dir = parseInt(this.getAttribute('dir'), 10);
                self.slideTo(self.slideIndex + dir);
            });

            btnOuter[i].appendChild(btnInner[i]);
            this.wrap.appendChild(btnOuter[i], this.wrap.nextSibling);
        }
    }
}

module.exports = {addBtn};
