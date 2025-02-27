import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { GameZone } from '../state/zone.js';

class ScheduleSystem extends SystemBase {
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
     * @note let's do the token & token.state checks here, as ScheduleSystem
     * is solely responsible for scheduling and token.state management.
     * Do not do the checks on InputSystem.
     * 
     * @public
     * @param {GameZone} zone 
     * @returns {ScheduleSystem} this
     */
    schedule = (zone) => {
        // note: it is important check if zone has token; as it may be destroyed
        // at this point
        const token = zone.token;
        if(token == null) {
            console.log('ScheduleSystem.schedule', 'no token');

            return this;
        }

        if(token.state.idx != null) {
            console.log('ScheduleSystem.schedule', 'already scheduled');

            return this;
        }

        token.state.idx = 0;

        // note: yes, zone; not token
        // we want to keep a reference to the zone's token for cases,
        // where token is removed while still being processed
        this.queue.push(zone);

        console.log('ScheduleSystem.schedule', 'scheduled');

        return this;
    }

    /**
     * @public
     * @returns {ScheduleSystem} this
     */
    clear = () => {
        this.queue = [];

        return this;
    }

    
    /**
     * @private
     * @param {Pixi.Ticker} ticker
     * @returns {ScheduleSystem} this
     */
    #on_tick = (ticker) => {
        const dt = ticker.elapsedMS;

        const updated_queue = [];
    
        for (let q = 0; q < this.queue.length; ++q) {
            const zone = this.queue[q];

            // note: get the reference to the token; might be null if
            // it has been removed by now
            const token = zone.token;
            if(token == null) {
                continue;
            }

            const state = token.state;
            const effects = token.effects;

            // note: it makes no sense to have 0 effects in action,
            // but let's support this case for now
            const effects_total = effects.length;
            if(effects_total == 0) {
                state.idx = null;
                continue;
            }

            const effect = effects[state.idx];
            const duration = effect.duration;
    
            state.tick += dt;
            state.total += dt;
    
            if (state.total == dt) {
                // note: request execution only if effect exist
                if(effect.on_start != null) {
                    this.events.emit(
                        GameState.Event.ActionExecute,
                        effect.on_start, zone
                    );
                }
            }

            if(duration.tick != null && state.tick >= duration.tick) {
                // note: request execution only if effect exist
                if(effect.on_tick != null) {
                    this.events.emit(
                        GameState.Event.ActionExecute,
                        effect.on_tick, zone
                    );
                }

                state.tick = 0;
            }
    
            if (state.total >= duration.total) {
                // note: request execution only if effect exist
                if(effect.on_end != null) {
                    this.events.emit(
                        GameState.Event.ActionExecute,
                        effect.on_end, zone
                    );
                }
    
                state.tick = 0;
                state.total = 0;
                state.idx += 1;

                if(state.idx >= effects.length) {
                    state.idx = null;

                    continue;
                }
            }
    
            updated_queue.push(zone);
        }
    
        this.queue = updated_queue;

        return this;
    }
}

export {
    ScheduleSystem
};