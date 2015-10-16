import iSlider from '../../../src/islider.js';

let list = [
    {content: "../imgs/long/1.jpg"},
    {content: "../imgs/long/2.jpg"},
    {content: "../imgs/long/3.jpg"},
    {content: "../imgs/long/4.jpg"},
    {content: "../imgs/long/5.jpg"},
    {content: "../imgs/long/6.jpg"},
    {content: "../imgs/long/7.jpg"},
    {content: "../imgs/long/8.jpg"},
    {content: "../imgs/long/9.jpg"},
];

let opts = {
    type: 'pic',
    data: list,
    dom: document.getElementById("iSlider-wrapper"),
    animateType: 'rotate',
    isLooping: true,
    plugins: ['dot',['zoompic', {currentScale:1,zoomFactor: 2}]],
};

let	islider = new iSlider(opts);







