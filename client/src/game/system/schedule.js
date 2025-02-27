import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { GameZone } from '../state/zone.js';
import { ActionPhase } from '../state/constant.js';
import { TokenEntity } from '../entities/token.js';
import { ActionStateComponent } from '../components/action/state.js';
import { ActionComponent } from '../components/action/action.js';

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
        const token = zone.token;
        if(token == null) {
            console.error('ScheduleSystem.schedule', 'token is null');

            return this;
        }

        if(GameState.Check.active(token) === true) {
            console.error('ScheduleSystem.schedule', 'token already active');

            return this;
        }

        token.state.idx = 0;

        // note: yes, zone; not token
        // we want to keep a reference to the zone's token for cases,
        // where token is removed while still being processed
        this.queue.push(zone);

        console.log('ScheduleSystem.schedule', 'token scheduled');

        return this;
    }

    /**
     * 
     * @param {GameZone} zone 
     * @returns {ScheduleSystem} this
     */
    cancel = (zone) => {
        const token = zone.token;
        if(token == null) {
            console.error('ScheduleSystem.schedule', 'token is null');

            return this;
        }

        if(GameState.Check.cancelable(token) === false) {
            console.log('ScheduleSystem.cancel', 'action cannot be canceled');

            return this;
        }

        token.state.idx = ActionPhase.Cancel;

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

            const actions = token.actions;

            // note: it makes no sense to have 0 action, but let's support this
            // case for now
            const actions_total = actions.length;
            if(actions_total == 0) {
                continue;
            }

            const state = token.state;
            const action = actions[state.idx]
    
            state.tick += dt;
            state.duration += dt;

            if(state.duration == dt) {
                console.log(action.name, ActionPhase.Start, performance.now());
            }

            if(action.tick != null) {
                if(state.tick <= dt) {
                    console.log(
                        action.name, ActionPhase.TickStart,
                        performance.now()
                    );
                } 
                
                if(state.tick >= action.tick) {
                    state.tick = 0;

                    console.log(
                        action.name, ActionPhase.TickEnd,
                        performance.now()
                    );
                }
            }

            // update: the very last update
            if(state.duration >= action.duration) {
                // rule: ActionPhase.End has to be called ONCE per action
                console.log(
                    action.name, ActionPhase.End,
                    performance.now()
                );

                // rule: after action's end, reset counters
                state.duration = 0;
                state.tick = 0;

                // rule: after action's end, progress to the next phase
                // or if this is the last phase; reset phase to null
                // and do not schedule for next update
                state.idx += 1;
                if(state.idx >= token.actions.length) {
                    // note: setting state.phase makes this Token eligible
                    // for next scheduling
                    state.idx = null;
                    continue;
                }
            }
    
            updated_queue.push(zone);
        }
    
        this.queue = updated_queue;

        return this;
    }

    /**
     * 
     * @param {TokenEntity} token 
     * @param {ActionStateComponent} state 
     * @param {ActionComponent} action 
     */
    on_end = (token, state, action) => {

    }
}

export {
    ScheduleSystem
};