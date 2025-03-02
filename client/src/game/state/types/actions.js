import { BuffEntity } from '../../entities/buff.js';
import { TokenEntity } from '../../entities/token.js';

class GameActions {
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
    GameActions
};