import { ActionComponent } from '../components/action.js';

class GameActionsQueue {
    /**
     * @type {Array<ActionComponent>}
     */
    current;

    /**
     * @type {Array<ActionComponent>}
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