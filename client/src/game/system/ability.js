import { EventEmitter, GameState, SystemBase } from './base.js';
import schedule from './ability/schedule.js';
import update from './ability/update.js';
import cancel from './ability/cancel.js';

class AbilitySystem extends SystemBase {
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

        return super.destructor();
    }
}

export {
    AbilitySystem
};