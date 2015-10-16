import iSlider from '../../../src/islider.js';

let list = [{
    'content': '<div class="content home"><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div>'
},
    {
        'content': '<div class="content page1"><h1>Page1</h1><h2>This is page1</h2><p>page1 is pretty awsome</p><div>'
    },
    {
        'content': '<div class="content page2"><h1>Page2</h1><h2>This is Page2</h2><p>Page2 is pretty awsome</p><div>'
    },
    {
        'content': '<div class="content page3"><h1>Page3</h1><h2>This is Page3</h2><p>Page3 is pretty awsome</p><div>'
    },
    {
        'content': '<div class="content page4"><h1>Page4</h1><h2>This is Page4</h2><p>Page4 is pretty awsome</p><div>'
    },
    {
        'content': '<div class="content page5"><h1>Page5</h1><h2>This is page5</h2><p>page5 is pretty awsome</p><div>'
    }];

let islider = new iSlider({
    data: list,
    dom: document.getElementById("iSlider-wrapper"),
    duration: 1000,
    isVertical: true,
    plugins: [['zoompic', {currentScale:1,zoomFactor: 2}]],
});




