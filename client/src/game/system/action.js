import { SystemBase, EventEmitter, GameState } from './base.js';

class ActionSystem extends SystemBase {
    /**
     * 
     * @param {GameState} events 
     * @param {EventEmitter} state 
     */
    constructor (events, state) {
        super(events, state);
    }
}

export {
    ActionSystem
};