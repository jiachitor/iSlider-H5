import iSlider from '../../../src/islider.js';

let list = [
    {content: "../imgs/random/1.jpg"},
    {content: "../imgs/random/2.jpg"},
    {content: "../imgs/random/3.jpg"},
    {content: "../imgs/random/4.jpg"},
    {content: "../imgs/random/5.jpg"},
    {content: "../imgs/random/6.jpg"},
    {content: "../imgs/random/7.jpg"},
    {content: "../imgs/random/8.jpg"},
    {content: "../imgs/random/9.jpg"}
];

let islider = new iSlider({
    type: 'pic',
    data: list,
    dom: document.getElementById("iSlider-wrapper"),
    isLooping: true,
    animateType: 'default',
    useZoom: true,
    plugins: [['zoompic', {currentScale:1,zoomFactor: 2}]],
});







