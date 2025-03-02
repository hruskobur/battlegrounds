import { GameZone } from './zone.js';

class GameTargets {
    /**
     * @type {GameZone}
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