import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { GameZone } from '../state/zone.js';

class ActionSystem extends SystemBase {
    /**
     * The game-loop ticker.
     * @type {Pixi.Ticker}
     */
    ticker;

    /**
     * The queue of game zone objects, that are active and are being updated.
     * @type {Array<GameZone>}
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
        // note: ticker can be assigned here, start/stop is managed by 
        // Scenes manager.
        this.ticker = ticker.add(this.#on_tick);
        
        this.queue = [];
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
     * @param {GameZone} zone 
     * @returns {ActionSystem} this
     */
    schedule = (zone) => {
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

        const updated_queue = [];
    
        for (let q = 0; q < this.queue.length; ++q) {
            const zone = this.queue[q];

            const token = zone.token;
            if(token == null) {
                continue;
            }

            const state = token.state;
            const effects = token.effects;
            const effect = effects[state.active];
            const duration = effect.duration;
    
            state.tick += dt;
            state.total += dt;
    
            if (state.total == dt) {
                console.log('start', performance.now());
            }
    
            if (state.total >= duration.total) {
                console.log('end', performance.now());
    
                state.tick = 0;
                state.total = 0;
    
                continue;
            }
    
            updated_queue.push(zone);
           
        }
    
        this.queue = updated_queue;

        return this;
    }
}

export {
    ActionSystem
};