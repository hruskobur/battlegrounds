import { SystemBase, EventEmitter, GameState } from './base.js';
import { ActionPhase } from '../state/constant.js';
import { TokenEntity } from '../entities/token.js';
import { BuffEntity } from '../entities/buff.js';

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
     * @param {TokenEntity|BuffEntity} entity 
     * @returns {ActionPhase} this
     */
    execute (entity) {
        console.log(
            'ExecuteSystem.execute',
            performance.now(),
            entity.action_data
        );
    }
}

export {
    ExecuteSystem
};