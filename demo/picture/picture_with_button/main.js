import '../../../src/islider.js';
import '../../../src/plugins/islider_button.js';
import '../../../src/plugins/islider_dot.js';
import '../../../src/plugins/islider_zoompic.js';

let list = [
    {content: "../imgs/high/1.jpg"},
    {content: "../imgs/high/2.jpg"},
    {content: "../imgs/high/3.jpg"},
    {content: "../imgs/high/4.jpg"},
    {content: "../imgs/high/5.jpg"},
    {content: "../imgs/high/6.jpg"},
    {content: "../imgs/high/7.jpg"},
    {content: "../imgs/high/8.jpg"},
    {content: "../imgs/high/9.jpg"}
];

let	islider = new iSlider({
    type: 'pic',
    data: list,
    dom: document.getElementById("iSlider-wrapper"),
    isLooping: true,
    plugins: ['button', ['zoompic', {currentScale:1,zoomFactor: 2}]],
});


islider.fire('initialize');
islider._renderWrapper();
islider._initPlugins();
islider._bindHandler();




