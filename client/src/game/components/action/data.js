import { ActionIdxIdle, ActionPhase } from '../../state/constant.js';
import { ActionSelectionInterface } from './selection.js';

class ActionDataComponent {
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
     * @type {Array<ActionSelectionInterface>}
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
    ActionDataComponent
};