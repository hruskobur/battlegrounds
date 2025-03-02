import { ActionIdxIdle, ActionPhase } from '../../state/constant.js';
import { GameState } from '../base.js';
import { ActionSystem } from '../action.js';

/**
 * @this {ActionSystem}
 * @public
 * @param {Number} dt 
 * @returns {ActionSystem} this
*/
function update (dt) {
    const actions = this.state.actions;
    
    for(let e = 0; e < actions.current.length; ++e) {
        const entity = actions.current[e];
        
        const action_data = entity.action_state;
        const action_rules = entity.action_rules;
        const action_stage = action_rules.stages[action_data.stage];

        // note: do the reset when action is idle or when it has become
        // idle (for example it was canceled)
        // note: do not update further after reset!
        // note: should be reset function
        if(action_data.stage === ActionIdxIdle) {
            action_data.phase = ActionPhase.Start;
            action_data.duration = 0;
            action_data.tick = 0;
            action_data.targets = [];

            continue;
        }

        action_data.tick += dt;
        action_data.duration += dt;

        // the very first tick
        if(action_data.duration == dt) {
            action_data.phase = ActionPhase.Start;

            // todo: should emit data that explicitly specify what to do 
            this.events.emit(GameState.Event.ActionUpdate, entity);
        }

        // subsequent ticks
        if(action_stage.tick != null) {
            if(action_data.tick <= dt) {
                action_data.phase = ActionPhase.TickStart;
                
                // todo: should emit data that explicitly specify what to do 
                this.events.emit(GameState.Event.ActionUpdate, entity);
            }

            if(action_data.tick >= action_stage.tick) {
                action_data.phase = ActionPhase.TickEnd;
                action_data.tick = 0;

                // todo: should emit data that explicitly specify what to do 
                this.events.emit(GameState.Event.ActionUpdate, entity);
            }
        }

        // the very last tick
        if(action_data.duration >= action_stage.duration) {
            action_data.phase = ActionPhase.End;

            // todo: should emit data that explicitly specify what to do 
            this.events.emit(GameState.Event.ActionUpdate, entity);

            action_data.duration = 0;
            action_data.tick = 0;
            action_data.stage += 1;

            if(action_data.stage >= action_rules.stages.length) {
                action_data.stage = ActionIdxIdle;
                action_data.phase = ActionPhase.Start;
                action_data.targets = [];

                continue;
            }
        }

        actions.updated.push(entity);
    }

    actions.current = actions.updated;
    actions.updated = [];

    return this;
}

export default update;