import { BuffEntity } from '../../entities/buff.js';
import { TokenEntity } from '../../entities/token.js';
import { TokenStateIdx_Idle, TokenStateIdx_Start } from '../../state/constant.js';
import { GameState } from '../base.js';
import { ActionSystem } from '../action.js';

/**
 * @this {ActionSystem}
 * @public
 * @param {TokenEntity|BuffEntity} entity 
 * @returns {ActionSystem} this
 */
function schedule (entity) {
    if(entity.action_state.stage !== TokenStateIdx_Idle) {
        console.error(
            'ScheduleSystem.schedule',
            'action in progress'
        );

        return this;
    }

    entity.action_state.stage = TokenStateIdx_Start;
    this.state.actions.current.push(entity);

    this.events.emit(GameState.Event.ActionScheduled, entity);

    return this;
}

export default schedule;