import { BuffEntity } from '../../entities/buff.js';
import { TokenEntity } from '../../entities/token.js';
import { ActionIdxIdle, ActionIdxStart } from '../../state/constant.js';
import { GameState } from '../base.js';
import { ActionSystem } from '../action.js';

/**
 * @this {ActionSystem}
 * @public
 * @param {TokenEntity|BuffEntity} entity 
 * @returns {ActionSystem} this
 */
function schedule (entity) {
    if(entity.action_state.stage !== ActionIdxIdle) {
        console.error(
            'ScheduleSystem.schedule',
            'action in progress'
        );

        return this;
    }

    entity.action_state.stage = ActionIdxStart;
    this.state.actions.current.push(entity);

    this.events.emit(GameState.Event.ActionScheduled, entity);

    return this;
}

export default schedule;