import { EventEmitter, GameState, SystemBase } from './base.js';

import schedule from './action/schedule.js';
import update from './action/update.js';
import execute from './action/execute.js';

class ActionSystem extends SystemBase {
    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.update = update;
        this.schedule = schedule;
        this.execute = execute;
    }

    /**
     * @public
     * @override
     * @returns {null}
     */
    destructor () {
        this.update = null;
        this.schedule = null;
        this.execute = null;

        return super.destructor();
    }
}

export {
    ActionSystem
};