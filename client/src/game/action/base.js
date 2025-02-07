import { TheGame } from '../game.js';
import { ModelBase } from '../models/base.js';

/**
 * @typedef {Object} ActionSnapshot
 * @property {String} id action id
 * @property {...any} payload action snapshot payload
 */

class ActionBase {
    static Id = '';

    /**
     * @type {TheGame}
     */
    game;

    /**
     * @type {ModelBase}
     */
    model;

    /**
     * Is this action done yet or not?
     * @note may become enum...
     * @type {Boolean}
     */
    state;

    /**
     * @type {ActionSnapshot}
     */
    snapshot;

    /**
     * @type {*}
     */
    payload;

    /**
     * @param {TheGame} game 
     * @param {ModelBase} model 
     * @param {*} payload 
     */
    constructor (game, model, payload) {
        this.game = game;
        this.model = model;

        this.payload = payload;

        this.state = false;
        this.snapshot = null;
    }

    /**
     * @virtual
     * @param {Number} dt 
     * @returns {ActionBase} this
     */
    update (dt) {
        this.state = true;
        
        return this;
    }
}

export {
    ActionBase
};