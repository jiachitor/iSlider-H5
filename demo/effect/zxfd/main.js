'use strict';

import iSlider from '../../../src/islider.js';
import '../../../src/ext/animate.js';
import '../../../src/plugins/button.js';
import '../../../src/plugins/dot.js';
import '../../../src/plugins/zoompic.js';

var list = [
    // picture
    {
        content: '../imgs/flip/0.jpg'
    },
    // picture
    {
        content: '../imgs/flip/1.jpg'
    },
    // picture
    {
        content: '../imgs/flip/2.jpg'
    },
    // picture
    {
        content: '../imgs/flip/3.jpg'
    },
    // HTML String
    {
        content: '<div style="font-size:4em;color:white;text-align: center">HTML String</div>'
    },
    // element
    {
        content: (function() {
            var dom = document.createElement('div');
            dom.innerHTML = 'Element';
            dom.style.cssText = 'font-size:3em;color:rgb(230, 230, 63);';
            return dom;
        })()
    },
    // fragment
    {
        content: (function() {
            var frag = document.createDocumentFragment();
            var img = new Image();
            var dom = document.createElement('div');
            dom.innerHTML = 'Fragment';
            dom.style.cssText = 'font-size:3em;color:rgb(230, 63, 230);';
            frag.appendChild(dom);
            return frag;
        })()
    },
    // dom
    {
        content: document.querySelector('#hidden-space > p')
    }
];

var S = new iSlider({
    dom: document.getElementById('iSlider-wrapper'),
    data: list,
    isVertical: true,
    isLooping: 1,
    isOverspread: 1,
    animateTime: 800,
    animateType: 'zxfd',
    plugins: [
        ['zoompic', {
            currentScale: 1,
            zoomFactor: 2
        }]
    ],
});