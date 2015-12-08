'use strict';

import iSlider from '../../../src/islider.js';
import '../../../src/plugins/button.js';
import '../../../src/plugins/dot.js';
import '../../../src/plugins/zoompic.js';

var list = [{
    'content': '<div class="page"><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome, home is pretty awsome, home is pretty awsome.</p><p>home is pretty awsome.home is pretty awsome, home is pretty awsome. home is pretty awsome home is pretty awsome.</p></div>'
}, {
    'content': '<div class="page"><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome,page1 is pretty awsome, page1 is pretty awsome .</p><p>page1 is pretty awsome,page1 is pretty awsome, page1 is pretty awsome .</p></div>'
}, {
    'content': '<div class="page"><h1>Page2</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p></div>'
}, {
    'content': '<div class="page"><h1>Page3</h1><h2>This is Page3</h2><p>Page3 is pretty awsome</p></div>'
}, {
    'content': '<div class="page"><h1>Page4</h1><h2>This is Page4</h2><p>Page4 is pretty awsome</p></div>'
}, {
    'content': '<div class="page"><h1>Page5</h1><h2>This is page5</h2><p>page5 is pretty awsome</p></div>'
}];


var tabs = document.getElementById('iSlider-nav').querySelectorAll('a');
var bg = document.getElementById('iSlider-nav').querySelector('span');
var scale = tabs[0].clientWidth;
bg.style.width = tabs[0].clientWidth + 'px';

var islider = new iSlider({
    data: list,
    dom: document.getElementById("iSlider-show"),
    duration: 2000,
    isLooping: true,
    isDebug: true,
    isAutoplay: false,
    fixPage: false,
    plugins: [
        ['zoompic', {
            currentScale: 1,
            zoomFactor: 2
        }]
    ],
    onslideend: function(idx) {
        bg.style.webkitTransition = 'left .3s ease';
        bg.style.width = tabs[idx].clientWidth + 'px';
        bg.style.left = tabs[idx].offsetLeft + 'px';
    },
    onslidechange: function(idx) {
        bg.style.webkitTransition = 'left .3s ease';
        bg.style.width = tabs[idx].clientWidth + 'px';
        bg.style.left = tabs[idx].offsetLeft + 'px';
    },
    onslide: function(offset) {
        bg.style.webkitTransition = 'none';
        bg.style.left = tabs[this.slideIndex].offsetLeft - (offset / this.scale * scale) + 'px';
    }
});

for (i = 0; i < tabs.length; i++) {
    tabs[i].id = i;
    tabs[i].addEventListener('click', function(e) {
        var idx = parseInt(e.target.id);
        islider.slideTo(idx);
    }, false);
}