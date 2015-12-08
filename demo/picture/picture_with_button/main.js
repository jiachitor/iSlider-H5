'use strict';

import iSlider from '../../../src/islider.js';
import '../../../src/plugins/button.js';
import '../../../src/plugins/dot.js';
import '../../../src/plugins/zoompic.js';

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




