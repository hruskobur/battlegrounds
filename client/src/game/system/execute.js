import { SystemBase, EventEmitter, GameState } from './base.js';
import { ActionComponent } from '../components/action.js';
import { ActionPhase } from '../state/constant.js';

class ExecuteSystem extends SystemBase {
    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);
    }

    /**
     * 
     * @param {ActionComponent} action 
     * @returns {ActionPhase} this
     */
    execute (action) {
        console.log('ExecuteSystem.execute', action, performance.now());
    }
}

export {
    ExecuteSystem
};