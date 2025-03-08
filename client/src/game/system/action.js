import { EventEmitter, GameState, SystemBase } from './base.js';
import schedule from './action/schedule.js';
import update from './action/update.js';
import cancel from './action/cancel.js';
import execute from './action/execute.js';

class ActionSystem extends SystemBase {
    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.schedule = schedule;
        this.update = update;
        this.cancel = cancel;
        this.execute = execute;
    }

    /**
     * @public
     * @override
     * @returns {null}
     */
    destructor () {
        this.schedule = null;
        this.update = null;
        this.cancel = null;
        this.execute = null;

        return super.destructor();
    }
}

export {
    ActionSystem
};