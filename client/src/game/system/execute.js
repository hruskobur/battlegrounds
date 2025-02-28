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
        console.table(
            {
                timestamp: performance.now(),
                action: action.name,
                idx: action.idx,
                phase: action.phase,
                duration: action.duration,
                tick: action.tick,
                stage_name: action.stages[action.idx].name ?? null,
                stage_duration: action.stages[action.idx].duration ?? null,
                stage_tick: action.stages[action.idx].tick ?? null,
                stage_cancelable: action.stages[action.idx].cancelable ?? null,
            }
        )
    }
}

export {
    ExecuteSystem
};