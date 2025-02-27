import { GameZone } from '../state/zone.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { ActionPhase } from '../state/constant.js';

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
     * @param {ACtionS} phase 
     * @returns {ActionPhase} this
     */
    execute (zone, action, phase) {
        console.log(
            'ActionSystem.execute',
            action, phase,
            zone,
            performance.now()
        );
    }
}

export {
    ActionSystem
};