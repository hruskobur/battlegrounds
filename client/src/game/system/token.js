import { SystemBase, EventEmitter, GameState } from './base.js';
import { ActionComponent } from '../components/action.js';
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
     * @param {Array<import('../components/action.js').ActionStage>} options
     * @returns {TokenSystem} this
     */
    create = (x, y, options) => {
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

        this.action_factory(token, options);

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
     * @param {TokenEntity} token 
     * @param {{name: String, stages: Array<*>}} options 
     * @returns {TokenSystem} this
     */
    action_factory (token, options) {
        const action = token.action;
        
        action.name = options.name;
        for(let s = 0; s < options.stages.length; ++s) {
            const stage_option = options.stages[s];

            const stage = {
                name: stage_option.name,
                duration: stage_option.duration,
                tick: stage_option.tick,
                cancelable: stage_option.cancelable
            }

            action.stages.push(stage);
        }

        return this;
    }
}

export {
    TokenSystem
};