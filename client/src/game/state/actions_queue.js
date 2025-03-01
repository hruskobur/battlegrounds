import { BuffEntity } from '../entities/buff.js';
import { TokenEntity } from '../entities/token.js';

class GameActionsQueue {
    /**
     * @type {Array<TokenEntity|BuffEntity>}
     */
    current;

    /**
     * @type {Array<TokenEntity|BuffEntity>}
     */
    updated;

    constructor () {
        this.current = [];
        this.updated = [];
    }
}

export {
    GameActionsQueue
};