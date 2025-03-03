import { SystemBase, EventEmitter, GameState } from './base.js';

import create from './token/create.js';
import destroy from './token/destroy.js';
import cancel from './token/cancel.js';

class TokenSystem extends SystemBase {
    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        // functionality
        this.create = create;
        this.destroy = destroy;
        this.cancel = cancel;

        // initialization
        const scenario = this.state.scenario;
        this.state.iterate(
            (zone, x, y) => {
                // todo: create tokens from scenario, based on x,y
                // for now, nothing
                // . . .
            }
        )
    }
}

export {
    TokenSystem
};