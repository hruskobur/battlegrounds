import { SystemBase, EventEmitter, GameState } from './base.js';
import { TokenEntity } from '../entities/token.js';
import { ActionIdxIdle, ActionPhase } from '../state/constant.js';

class TokenSystem extends SystemBase {
    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @param {Object} actions
     * @returns {TokenSystem} this
     */
    create = (x, y, actions) => {
        // note: coordinates are outside of this map
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }
        
        // note: safe to access directly
        const zone = GameState.Query.coordinate(this.state, x, y);
        
        // note: cannot create token where another token already exist
        if(zone.token !== null) {
            return this;
        }

        // note: create new token
        // todo: token will be generated & factory will be used
        const token = new TokenEntity();
        token.renderable.x = token.renderable.width * x;
        token.renderable.y = token.renderable.height * y;

        this.action_factory(token, actions);

        zone.token = token;

        this.events.emit(GameState.Event.TokenCreated, token);

        return this;
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @returns {TokenSystem} this
     */
    destroy = (x, y) => {
        // note: coordinates are outside of this map
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }

        // note: safe to access directly
        const zone = GameState.Query.coordinate(this.state, x, y);

        // note: no token to destroy
        if(zone.token === null) {
            return this;
        }

        const token = zone.token;
        zone.token = null;

        // action reset
        const action = token.action;
        action.idx = ActionIdxIdle;
        action.phase = ActionPhase.Start;
        action.duration = 0;
        action.tick = 0;
        
        this.events.emit(GameState.Event.TokenDestroyed, token);

        return this;
    }

    /**
     * note: cancels token actio
     * @param {Number} x 
     * @param {Number} y 
     * @returns {TokenSystem} this
     */
    cancel = (x, y) => {
        // note: coordinates are outside of this map
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }

        // note: safe to access directly
        const zone = GameState.Query.coordinate(this.state, x, y);
         
        // note: no token to cancel
        const token = zone.token;
        if(token === null) {
            return this;
        }

        const stage = GameState.Query.action_stage(token);
        if(stage == null) {
            return this;
        }

        if(stage.cancelable === false) {
            // todo: inform user that action cannot be canceled at this stage
            // . . .
            return this;
        }

        const state = token.action_state;
        state.stage = ActionIdxIdle;
        state.phase = ActionPhase.Start;
        state.duration = 0;
        state.tick = 0;
        state.targets = [];

        return this;
    }

    /**
     * 
     * @param {TokenEntity} token 
     * @param {*} options 
     */
    action_factory = (token, options) => {
        token.action_rules.name = options.name;

        for(let s = 0; s < options.stages.length; ++s) {
            const stage_opt = options.stages[s];

            token.action_rules.stages.push(
                {
                    name: stage_opt.name,
                    duration: stage_opt.duration,
                    tick: stage_opt.tick,
                    cancelable: stage_opt.cancelable
                }
            );

            // note: action stage can have 'no targets'
            if(stage_opt.targets == null) {
                continue;
            }

            for(let t = 0; t < stage_opt.targets.length; ++t) {
                const target_opt = stage_opt.targets[t];

                token.action_rules.targets.push(
                    {
                        type: target_opt.type,
                        rule: target_opt.rule,
                        count: target_opt.count
                    }
                );
            };
        }

        console.log('TokenSystem.action_factory', token.action_rules);
    }
}

export {
    TokenSystem
};