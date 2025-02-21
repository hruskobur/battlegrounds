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
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }

        if(this.state.tokens[y][x] !== null) {
            return this;
        }

        const token = new TokenEntity();
        token.renderable.x = token.renderable.width * x;
        token.renderable.y = token.renderable.height * y;

        // todo: set other components
        // . . .

        this.state.tokens[y][x] = token;

        this.events.emit(GameState.Event.TokenCreate, token);

        return this;
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @returns {TokenSystem} this
     */
    destroy = (x, y) => {
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }

        const token = this.state.tokens[y][x];
        if(token === null) {
            return this;
        }

        this.state.tokens[y][x] = null;

        this.events.emit(GameState.Event.TokenDestroy, token);

        return this;
    }
}

export {
    TokenSystem
};