import { 
    ActionPhase,
    ActionIdxIdle, ActionIdxStart
} from '../state/constant.js';

/**
 * @typedef {Object} ActionStage
 * @property {String} name
 * @property {Number} duration
 * @property {Number|null} tick
 * @property {Boolean} cancelable
 */

class ActionComponent {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {Array<ActionStage>}
     */
    stages;

    /**
     * @type {ActionIdxIdle|ActionIdxStart}
     */
    idx;

    /**
     * @type {ActionPhase}
     */
    phase;

    /**
     * @type {Number}
     */
    duration;

    /**
     * @type {Number}
     */
    tick;

    /**
     * 
     * @param {Array<ActionStage>} stages 
     */
    constructor (name, stages) {
        this.name = name;
        this.stages = stages;
        
        this.idx = ActionIdxIdle;
        this.phase = ActionPhase.Scheduled;
        this.duration = 0;
        this.tick = 0;
    }
};

export {
    ActionComponent
};