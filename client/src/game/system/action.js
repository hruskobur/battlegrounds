import { GameZone } from '../state/zone.js';
import { SystemBase, EventEmitter, GameState } from './base.js';

class ActionSystem extends SystemBase {
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
     * @param {String} action 
     * @param {GameZone} zone 
     * @returns {ActionSystem} this
     */
    execute (action, zone) {
        console.log('ActionSystem.execute', action, zone);
    }
}

export {
    ActionSystem
};