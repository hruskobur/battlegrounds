import EventEmitter from 'eventemitter3';
import { GameState } from '../state/game.js';

class SystemBase {
    /**
     * @type {EventEmitter}
     */
    events;

    /**
     * @type {GameState}
     */
    state;

    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        this.events = events;
        this.state = state;
    }

    /**
     * @public
     * @virtual
     * @returns {null} 
     */
    destructor () {
        this.events = null;
        this.state = null;

        return null;
    }
}

export {
    SystemBase,
    EventEmitter, GameState
};