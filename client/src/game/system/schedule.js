import { SystemBase, EventEmitter, GameState } from './base.js';
import { ActionIdxIdle, ActionIdxStart, ActionPhase } from '../state/constant.js';
import { ActionComponent } from '../components/action.js';

class ScheduleSystem extends SystemBase {

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
     * @param {ActionComponent} action 
     * @returns {ScheduleSystem} this
     */
    schedule = (action) => {
        if(action.idx !== ActionIdxIdle) {
            console.error(
                'ScheduleSystem.schedule',
                'action in progress'
            );

            return this;
        }

        action.idx = ActionIdxStart;
        this.state.queue.current.push(action);

        this.events.emit(GameState.Event.ActionScheduled, action);

        return this;
    }

    /**
     * @public
     * @param {ActionComponent} action 
     * @returns {UpdateSystem} this
     */
    cancel = (action) => {
        const stage = GameState.Query.action_stage(action);
        if(stage == null) {
            console.error(
                'ScheduleSystem.cancel',
                'stage == null'
            );
        }
        
        if(stage.cancelable === false) {
            console.error(
                'ScheduleSystem.cancel',
                'stage.cancelable === false'
            );

            return this;
        }

        // action reset
        action.idx = ActionIdxIdle;
        action.phase = ActionPhase.Start;
        action.duration = 0;
        action.tick = 0;

        this.events.emit(GameState.Event.ActionCanceled, action);
        
        return this;
    }
}

export {
    ScheduleSystem
};