import { TokenPhase, IdleStage } from '../../state/constant.js';
import { GameState } from '../base.js';
import { ActionSystem } from '../action.js';

/**
 * @public
 * @this {ActionSystem}
 * @param {Number} dt 
 * @returns {ActionSystem} this
*/
function update (dt) {
    const actions = this.state.queue;
    
    for(let e = 0; e < actions.current.length; ++e) {
        const zone = actions.current[e];
        
        const token = zone.token;
        if(token == null) {
            continue;
        }

        const stage = token.stage;
        if(stage == IdleStage) {
            continue;
        }

        const state = token.stage.state;

        state.tick += dt;
        state.duration += dt;

        if(state.duration == dt) {
            state.phase = TokenPhase.Start;

            this.events.emit(GameState.Event.ActionUpdated, zone);
        }

        if(stage.tick != null) {
            if(state.tick <= dt) {
                state.phase = TokenPhase.TickStart;

                this.events.emit(GameState.Event.ActionUpdated, zone);
            }

            if(state.tick >= stage.tick) {
                state.phase = TokenPhase.TickEnd;
                state.tick = 0;

                this.events.emit(GameState.Event.ActionUpdated, zone);
            }
        }

        if(state.duration >= stage.duration) {
            state.phase = TokenPhase.End;

            this.events.emit(GameState.Event.ActionUpdated, zone);

            state.duration = 0;
            state.tick = 0;
            state.targets = [];

            token.stage = token.stages.get(token.stage.next);
            if(token.stage == null) {
                this.events.emit(GameState.Event.ActionUnscheduled, zone);

                continue;
            }
        }

        actions.updated.push(zone);
    }

    actions.current = actions.updated;
    actions.updated = [];

    return this;
}

export default update;