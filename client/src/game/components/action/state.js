import { ActionIdxIdle, ActionPhase } from '../../state/constant.js';
import { Coordinate } from '../../types/coordinate.js';

class ActionStateComponent {
    /**
     * @type {Number}
     */
    stage;

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
     * @type {Array<Coordinate>}
     */
    targets;

    constructor () {
        this.stage = ActionIdxIdle;
        this.phase = ActionPhase.Start;
        this.duration = 0;
        this.tick = 0;
        this.targets = [];
    }
}

export {
    ActionStateComponent
};