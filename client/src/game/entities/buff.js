import { ActionComponent } from '../components/action.js';

class BuffEntity {
    /**
     * @type {ActionComponent}
     */
    action;

    constructor () {
        this.action = new ActionComponent([]);
    }
}

export {
    BuffEntity
};
