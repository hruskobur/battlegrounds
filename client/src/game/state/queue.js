import { AbilityComponent } from '../components/ability.js';

class GameStateAbilityQueue {
    /**
     * @type {Array<AbilityComponent>}
     */
    current;

    /**
     * @type {Array<AbilityComponent>}
     */
    updated;

    /**
     * @type {Array<AbilityComponent>}
     */
    removed;

    constructor () {
        this.current = [];
        this.updated = [];
        this.removed = [];
    }
}

export {
    GameStateAbilityQueue
};