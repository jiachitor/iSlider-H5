import iSlider from '../../../src/islider.js';

let list = [
    {content: "../imgs/card/1.jpg"},
    {content: "../imgs/card/2.jpg"},
    {content: "../imgs/card/3.jpg"},
    {content: "../imgs/card/4.jpg"},
    {content: "../imgs/card/5.jpg"},
    {content: "../imgs/card/6.jpg"},
    {content: "../imgs/card/7.jpg"},
    {content: "../imgs/card/8.jpg"}];

let	islider = new iSlider({
    type: 'pic',
    data: list,
    dom: document.getElementById("iSlider-wrapper"),
    isVertical: true,
    isLooping: true,
    animateType: 'flip',
    onslidechange: function(idx) {

        if (this.isLooping === false) {
            if (idx === this.data.length - 1) {
                document.getElementById('iSlider-arrow').style.display = 'none';
            }
            else {
                document.getElementById('iSlider-arrow').style.display = 'block';
            }
        }
    }
});

let audio = document.getElementById('autoplay');
let controller = document.getElementById('musicBtn');
let controllerHint = document.getElementById('musicBtnTxt');

document.getElementById('musicBtn').addEventListener('touchstart', function() {

    controllerHint.style.display = '';
    if (audio.paused) {
        audio.play();
        controller.className = 'music-btn on';
        controllerHint.innerHTML = '¿ªÊ¼';
    } else {
        audio.pause();
        controller.className = 'music-btn';
        controllerHint.innerHTML = '¹Ø±Õ';
    }

    setTimeout(function() {
        controllerHint.style.display = 'none';
    }, 1000);

}, false);








