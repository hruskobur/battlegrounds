import { TokenEntity } from '../entities/token.js';

class TokenSystem {
    /**
     * @type {EventEmitter}
     */
    events;

    /**
     * @type {GameState}
     */
    state;

    constructor (events, state) {
        this.events = events;
        this.state = state;
    }

    create = (x, y) => {
        const token = new TokenEntity();
        
        token.renderable.x = x * token.renderable.width;
        token.renderable.y = y * token.renderable.height;

        this.events.emit('token.created', token.renderable);

        return this;
    }
}

export {
    TokenSystem
};