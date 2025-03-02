import { SystemBase, EventEmitter, GameState } from './base.js';
import { TokenEntity } from '../entities/token.js';
import { ActionIdxIdle, ActionPhase } from '../state/constant.js';

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

        this.create = create;
        this.destroy = destroy;
        this.cancel = cancel;
    }
}

export {
    TokenSystem
};