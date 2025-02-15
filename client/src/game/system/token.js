import { SystemBase, EventEmitter, GameState } from './base.js';
import { TokenEntity } from '../entities/token.js';

class TokenSystem extends SystemBase {
    static Response = Object.freeze({
        Create: 'token.create.response',
        Destroy: 'token.destroy.response'
    });

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {TokenSystem} this
     */
    create = (x, y) => {
        const token = new TokenEntity();
        token.renderable.x = token.renderable.width * x;
        token.renderable.y = token.renderable.height * y;

        // todo: set other components
        // . . .

        this.state.tokens[y][x] = token;

        this.events.emit(TokenSystem.Response.Create, token);

        return this;
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {TokenSystem} this
     */
    destroy = (x, y) => {
        const token = this.state.tokens[y][x];

        this.state.tokens[y][x] = null;

        this.events.emit(TokenSystem.Response.Destroy, token);

        return this;
    }
}

export {
    TokenSystem
};