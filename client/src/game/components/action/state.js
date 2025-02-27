import { ActionIdxIdle } from '../../state/constant.js';

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
        this.idx = ActionIdxIdle;
        this.duration = 0;
        this.tick = 0;
    } 
}

export {
    ActionStateComponent
};