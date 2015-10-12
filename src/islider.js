'use strict';

import iSliderCore from './islider_core.js';
import Button from './plugins/islider_button.js';
import Dot from './plugins/islider_dot.js';

class iSlider extends iSliderCore {
    constructor(...opts) {
        //直接调用父类构造器进行初始化
        super(...opts);
        console.log(this._animateFuncs)
        this.extend(Button, this);
        this.extend(Dot, this);
    }
}

module.exports = iSlider;
