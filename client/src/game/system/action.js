import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { TokenEntity } from '../entities/token.js';

class ActionSystem extends SystemBase {
    /**
     * @type {Pixi.Ticker}
     */
    ticker;

    /**
     * @type {Array<TokenEntity>}
     */
    queue;

    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     * @param {Pixi.Ticker} ticker 
     */
    constructor (events, state, ticker) {
        super(events, state);

        this.queue = [];

        this.ticker = ticker.add(this.#on_tick);
    }

    /**
     * @public
     * @override
     */
    destructor () {
        this.ticker.remove(this.#on_tick);
        this.ticker = null;

        this.queue = null;
    }

    /**
     * @public
     * @param {TokenEntity} token 
     * @returns {ActionSystem} this
     */
    schedule = (token) => {
        return this;
    }

    /**
     * @public
     * @returns {ActionSystem} this
     */
    clear = () => {
        this.queue = [];

        return this;
    }

    
    /**
     * @private
     * @param {Pixi.Ticker} ticker
     * @returns {ActionSystem} this
     */
    #on_tick = (ticker) => {
        const dt = ticker.elapsedMS;

        return this;
    }
}

export {
    ActionSystem
};