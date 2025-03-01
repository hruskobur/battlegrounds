import { SystemBase, EventEmitter, GameState } from './base.js';
import { 
    ActionIdxIdle, ActionIdxStart,
    ActionPhase
} from '../state/constant.js';
import { TokenEntity } from '../entities/token.js';
import { BuffEntity } from '../entities/buff.js';

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
     * @param {TokenEntity|BuffEntity} entity 
     * @returns {ScheduleSystem} this
     */
    schedule = (entity) => {
        if(entity.action_data.stage !== ActionIdxIdle) {
            console.error(
                'ScheduleSystem.schedule',
                'action in progress'
            );

            return this;
        }

        entity.action_data.stage = ActionIdxStart;
        this.state.queue.current.push(entity);

        this.events.emit(GameState.Event.ActionScheduled, entity);

        return this;
    }

    /**
     * @public
     * @param {TokenEntity|BuffEntity} entity
     * @returns {UpdateSystem} this
     */
    cancel = (entity) => {
        const stage = GameState.Query.action_stage(entity);
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

        // todo: action reset function
        entity.action_data.stage = ActionIdxIdle;
        entity.action_data.phase = ActionPhase.Start;
        entity.action_data.duration = 0;
        entity.action_data.tick = 0;
        entity.action_data.targets = [];

        this.events.emit(GameState.Event.ActionCanceled, entity);
        
        return this;
    }
}

export {
    ScheduleSystem
};