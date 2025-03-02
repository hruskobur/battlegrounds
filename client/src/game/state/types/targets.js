import { TokenEntity } from '../../entities/token.js';
import { GameZone } from './zone.js';

class GameTargets {
    /**
     * @type {TokenEntity}
     */
    actor;

    /**
     * @type {GameZone}
     */
    targets;

    constructor () {
        this.actor = null;
        this.targets = [];
    }
}

export {
    GameTargets
};