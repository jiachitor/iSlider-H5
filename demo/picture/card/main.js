'use strict';

import iSlider from '../../../src/islider.js';
import '../../../src/plugins/button.js';
import '../../../src/plugins/dot.js';
import '../../../src/plugins/zoompic.js';

let list = [
    {content: "../imgs/card/1.jpg"},
    {content: "../imgs/card/2.jpg"},
    {content: "../imgs/card/3.jpg"},
    {content: "../imgs/card/4.jpg"},
    {content: "../imgs/card/5.jpg"},
    {content: "../imgs/card/6.jpg"},
    {content: "../imgs/card/7.jpg"},
    {content: "../imgs/card/8.jpg"}];

var islider = new iSlider({
    type: 'pic',
    data: list,
    dom: document.getElementById("iSlider-wrapper"),
    isVertical: true,
    isLooping: true,
    animateType: 'card',
    plugins: [['zoompic', {currentScale:1,zoomFactor: 2}]],
    onslidechange: function (idx) {

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

var audio = document.getElementById('autoplay');
var controller = document.getElementById('musicBtn');
var controllerHint = document.getElementById('musicBtnTxt');

document.getElementById('musicBtn').addEventListener('touchstart', function () {

    controllerHint.style.display = '';
    if (audio.paused) {
        audio.play();
        controller.className = 'music-btn on';
        controllerHint.innerHTML = '��ʼ';
    } else {
        audio.pause();
        controller.className = 'music-btn';
        controllerHint.innerHTML = '�ر�';
    }

    setTimeout(function () {
        controllerHint.style.display = 'none';
    }, 1000);

}, false);








