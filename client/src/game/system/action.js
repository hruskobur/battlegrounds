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
        // note: does this need a more safe check?
        const action = token.current;
        if(action.id !== null) {
            console.error('ActionSystem.schedule', token);

            return this;
        }

        
        // note: start acting - 1st. action; 0 counter;
        action.id = 0;
        action.counter = 0;
        
        this.queue.push(
            token
        );

        console.log('ActionSystem.schedule', token);

        return this;
    }

    /**
     * @public
     * @returns {ActionSystem} this
     */
    clear = () => {
        for(let a = 0; a < this.queue.length; ++a) {
            const action = this.queue[a];
            action.current.id = null;
            action.current.counter = null;
        }

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

        const updated = [];

        for(let q = 0; q < this.queue.length; ++q) {
            const token = this.queue[q];
            const current = token.current;
            const effect = token.actions[current.id];

            if(current.counter === 0) {
                console.log('ActionSystem.start', effect);
            }
            
            current.counter += dt;
            
            if(current.counter >= effect.duration) {
                console.log('ActionSystem.done', effect);

                current.id += 1;
                current.counter = 0;

                if(current.id >= token.actions.length) {
                    // note: stop acting
                    current.id = null;
                    current.counter = null;
                    
                    continue;
                }
            }

            updated.push(
                token
            );
        }

        this.queue = updated;

        return this;
    }
}

export {
    ActionSystem
};