'use strict';

import iSlider from '../../../src/islider.js';
import '../../../src/plugins/button.js';
import '../../../src/plugins/dot.js';
import '../../../src/plugins/zoompic.js';

let list = [
    // picture
    {
        content: '../imgs/random/1.jpg'
    },
    // HTML String
    {
        content: '<div style="font-size:4em;color:white;text-align: center">HTML String</div>'
    },
    // element
    {
        content: (function() {
            let dom = document.createElement('div');
            dom.innerHTML = 'Element';
            dom.style.cssText = 'font-size:3em;color:rgb(230, 230, 63);';
            return dom;
        })()
    },
    // fragment
    {
        content: (function() {
            let frag = document.createDocumentFragment();
            let dom = document.createElement('div');
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

let S = new iSlider({
    dom: document.getElementById('iSlider-wrapper'),
    data: list,
    isLooping: 1,
    isOverspread: 1,
    animateTime: 800, // ms
    plugins: [
        ['zoompic', {
            currentScale: 1,
            zoomFactor: 2
        }]
    ],
    onslidechanged: function(index) {
        console.log('[slideChanged] change to ' + index);
    }
});

S.on('slideRestored', function(index) {
    console.log('[slideRestored] no change, restore to ' + index);
});