import { ActionBase } from './base.js';

class ActionProcessor {
    /**
     * @type {Array<ActionBase>}
     */
    #actions;

    constructor () {
        this.#actions = [];
    }

    get length () {
        return this.#actions.length;
    }

    /**
     * 
     * @returns {ActionProcessor} this
     */
    clear = () => {
        this.#actions = [];

        return this;
    }

    /**
     * 
     * @param {ActionBase} action 
     * @returns {ActionProcessor} this
     */
    schedule = action => {
        this.#actions.push(action);

        return this;
    }

    /**
     * @public
     * @param {Number} dt 
     * @returns {Array<import('./base.js').ActionSnapshot>}
     */
    tick = (dt) => {
        const snapshots = [];
        
        const actions = [];
        const actions_length = this.#actions.length;

        for(let a = 0; a < actions_length; ++a) {
            const action = this.#actions[a].update(dt);

            // does action have snapshot?
            // - if so, cache it for return
            // - if not, cache nothin
            const snapshot = action.snapshot;
            if(snapshot !== null) {
                snapshots.push(snapshot);
                action.snapshot = null;
            }

            // has action ended?
            // - if so, action will not be scheduled for next tick
            // - if not, action will be scheduled for next tick
            if(action.state === true) {
                continue;
            }

            actions.push(action);
        }

        this.#actions = actions;
        return snapshots;
    }
}

export {
    ActionProcessor
};