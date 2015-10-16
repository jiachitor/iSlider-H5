'use strict';

import iSliderCore from './islider_core.js';
import Button from './plugins/islider_button.js';
import Dot from './plugins/islider_dot.js';
import Zoom from './plugins/islider_zoom.js';

class iSlider extends iSliderCore {
    constructor(...opts) {
        //直接调用父类构造器进行初始化
        super(...opts);

        //添加 zoom 插件，注意以下代码必须要
        var startHandlerOriginal = this.startHandler;
        var endHandlerOriginal = this.endHandler;
        var moveHandlerOriginal = this.moveHandler;

        //console.log(Button)
        //console.log(this.regPlugin)
        this.regPlugin('button',Button);
        this.regPlugin('dot',Dot);
        this.regPlugin('zoompic', function(zoomOpts){
            Zoom.initZoom({
                currentScale:zoomOpts.currentScale || 1,
                zoomFactor:zoomOpts.zoomFactor || 2,
                extendFunction:{
                    'startHandlerOriginal':startHandlerOriginal,
                    'endHandlerOriginal':endHandlerOriginal,
                    'moveHandlerOriginal':moveHandlerOriginal
                }
            });
        });

        this.fire('initialize');
        this._renderWrapper();
        this._initPlugins();
        this._bindHandler();

        this.extend({
            startHandler: Zoom.startHandler,
            moveHandler: Zoom.moveHandler,
            endHandler: Zoom.endHandler
        });
    }
}

module.exports = iSlider;
