import { SystemBase, EventEmitter, GameState } from './base.js';

import create from './token/create.js';
import reset from './token/reset.js';
import destroy from './token/destroy.js';
import ability from './token/ability.js';

class TokenSystem extends SystemBase {
    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        // functionality
        this.create = create;
        this.reset = reset;
        this.destroy = destroy;
        this.ability = ability;

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