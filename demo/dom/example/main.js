'use strict';

import iSlider from '../../../src/islider.js';

let list = [];
for (let i = 1; i <= 3; i++)
    list.push({content: '../imgs/random/' + i + '.jpg'});


for (let i = 4; i <= 9; i++)
    list.push({
        content: '<div style="font-size:1.2em;color:white;"><img src="../imgs/random/' + i + '.jpg"/><br />TEXT' + i + '</div>'
    });

list.push({
    content: '<div style="font-size:2em;color:white;text-align: center">HTML<a href="http://baidu.com">Link</a></div>'
});

list.push({
    content: (function () {
        let dom = document.createElement('div');
        dom.innerHTML = 'Element';
        dom.style.cssText = 'font-size:2em;color:rgb(230, 230, 63);';
        return dom;
    })()
});

list.push({
    content: (function () {
        let frag = document.createDocumentFragment();
        let dom = document.createElement('div');
        dom.innerHTML = 'Fragment';
        dom.style.cssText = 'font-size:2em;color:rgb(230, 63, 230);';
        frag.appendChild(dom);
        return frag;
    })()
});



let islider = new iSlider(document.getElementById("iSlider"), list, {
        // data: list
        dom: document.getElementById("iSlider-wrapper"),
        // isVertical: true,
        isLooping: 1,
        isOverspread: 1,
        animateType: 'default',
        animateTime: 500,
        fixPage: 1,
        isDebug: 1,
        // isDebug: 0,
        // isLoading: true,
        // isAutoplay: true,
        // duration: 5000,
        plugins: ['dot', 'button', ['zoompic', {currentScale:1,zoomFactor: 2}]],
        onslide: function () {
            console.debug(arguments)
        },
        onslidechange: function () {
            console.debug(arguments, 'Change~ juse one time');
            //this.off('slideChange', arguments.callee);
        }
    }
);

islider.on('slideChange', function () {
    console.debug('Change event from method "on"', this, arguments);
});

islider.on('slideChanged', function () {
    console.debug('Change(d) event from method "on"', this, arguments);
});

islider.on('slideRestore', function () {
    console.debug('Restore event from method "on"', this, arguments);
});

islider.on('slideRestored', function () {
    console.debug('Restore(d) event from method "on"', this, arguments);
});





