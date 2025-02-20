import { SystemBase, EventEmitter, GameState } from './base.js';
import { ActionEntity } from '../entities/action.js';

class ActionSystem extends SystemBase {
    /**
     * @type {Array<ActionEntity>}
     */
    queue;

    /**
     * 
     * @param {GameState} events 
     * @param {EventEmitter} state 
     */
    constructor (events, state) {
        super(events, state);

        this.queue = [];
    }

    /**
     * 
     * @param {Number} dt 
     * @returns {ActionSystem} this
     */
    update = (dt) => {
        return this;
    }

    /**
     * 
     * @param {ActionEntity} action 
     * @returns {ActionSystem} this
     */
    schedule = (action) => {
        return this;
    }

    /**
     * 
     * @returns {ActionSystem} this
     */
    clear = () => {
        this.queue = [];

        return this;
    }
}

export {
    ActionSystem
};