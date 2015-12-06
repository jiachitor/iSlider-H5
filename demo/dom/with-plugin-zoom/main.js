import '../../../src/islider.js';
import '../../../src/plugins/islider_button.js';
import '../../../src/plugins/islider_dot.js';
import '../../../src/plugins/islider_zoompic.js';

var list = [
    // picture 1
    {
        content: '../imgs/random/3.jpg'
    },
    // HTML String
    {
        content: '<div style="font-size:4em;color:white;text-align: center">HTML String</div>'
    },
    // picture 2
    {
        content: '../imgs/random/1.jpg'
    },
    // element
    {
        content: (function () {
            var dom = document.createElement('div');
            dom.innerHTML = 'Element';
            dom.style.cssText = 'font-size:3em;color:rgb(230, 230, 63);';
            return dom;
        })()
    },
    // picture 3
    {
        content: '../imgs/random/2.jpg'
    }
];

var S = new iSlider({
    dom: document.getElementById('iSlider-wrapper'),
    data: list,
    isLooping: 1,
    isOverspread: false,
    animateTime: 800, // ms
    plugins: [['zoompic', {currentScale:1,zoomFactor: 3}]],
});





