import { EventEmitter, GameState, SystemBase } from '../base.js';

import schedule from './schedule.js';
import update from './update.js';
import execute from './execute.js';

class ActionSystem extends SystemBase {
    update = update.bind(this);
    schedule = schedule.bind(this);
    execute = execute.bind(this);

    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);
    }

    /**
     * @public
     * @override
     * @returns {null}
     */
    destructor () {
        return super.destructor();
    }
}

export {
    ActionSystem
};