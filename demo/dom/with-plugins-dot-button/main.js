import iSlider from '../../../src/islider.js';

var list = [
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
        content: (function () {
            var dom = document.createElement('div');
            dom.innerHTML = 'Element';
            dom.style.cssText = 'font-size:3em;color:rgb(230, 230, 63);';
            return dom;
        })()
    },
    // fragment
    {
        content: (function () {
            var frag = document.createDocumentFragment();
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
    isLooping: 1,
    isOverspread: 1,
    animateTime: 800, // ms
    plugins: ['button',['zoompic', {currentScale:1,zoomFactor: 2}]],
});

S.regPlugin('dot');

S.regPlugin('others', function () {
    console.debug('Init Plugin "others"', arguments)
    this.on('slideChange', function () {
        alert('the plugin "others" on "slideChange"');
    });
}, 1, 2, 3);





