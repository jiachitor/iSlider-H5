import '../../../src/islider.js';
import '../../../src/plugins/islider_button.js';
import '../../../src/plugins/islider_dot.js';
import '../../../src/plugins/islider_zoompic.js';

let list = [{
    'content': '<a href="http://www.baidu.com"><div class="content home"><h1>Home</h1><h2>This is home page</h2><p>home is pretty awsome</p><div></a><div><input type="text"><input type="checkbox"></div>'
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
    dom: document.getElementById("iSlider-wrap"),
    duration: 1000,
    isLooping: true,
    isAutoPlay: true,
    fixPage: true,
    isDebug: true,
    plugins: [['zoompic', {currentScale:1,zoomFactor: 2}]],
});








