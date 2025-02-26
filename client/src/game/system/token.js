import { SystemBase, EventEmitter, GameState } from './base.js';
import { TokenEntity } from '../entities/token.js';

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
     * @returns {TokenSystem} this
     */
    create = (x, y) => {
        // note: coordinates are outside of this map
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }
        
        // note: safe to access directly
        const zone = GameState.Query.coordinate(x, y);
        
        // note: cannot create token where another token already exist
        if(zone.token !== null) {
            return this;
        }

        // note: create new token
        // todo: token will be generated & factory will be used
        const token = new TokenEntity();
        token.renderable.x = token.renderable.width * x;
        token.renderable.y = token.renderable.height * y;

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
        const zone = GameState.Query.coordinate(x, y);

        // note: no token to destroy
        if(zone.token === null) {
            return this;
        }

        const token = zone.token;
        zone.token = null;

        this.events.emit(GameState.Event.TokenDestroyed, token);

        return this;
    }
}

export {
    TokenSystem
};