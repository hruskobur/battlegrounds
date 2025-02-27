import { ActionIdleIdx } from '../../state/constant.js';

class ActionStateComponent {
    /**
     * @type {Number}
     */
    idx;
    
    /**
     * @type {Number}
     */
    duration;
    
    /**
     * @type {Number}
     */
    tick;

    /**
     */
    constructor () {
        this.idx = ActionIdleIdx;
        this.duration = 0;
        this.tick = 0;
    } 
}

export {
    ActionStateComponent
};