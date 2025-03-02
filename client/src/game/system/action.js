import { EventEmitter, GameState, SystemBase } from './base.js';

import { 
    select_actor,
    select_target, accept_target, cancel_target 
} from './action/targets.js';
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

        this.select_actor = select_actor;
        this.select_target = select_target;
        this.accept_target = accept_target;
        this.cancel_target = cancel_target;
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
        this.target = null;
        this.update = null;
        this.schedule = null;
        this.execute = null;

        return super.destructor();
    }
}

export {
    ActionSystem
};