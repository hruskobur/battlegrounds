import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { GameZone } from '../state/zone.js';
import { 
    ActionIdxIdle, ActionIdxStart, ActionPhase 
} from '../state/constant.js';
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

        const state = token.state;
        if(state.idx !== ActionIdxIdle) {
            console.error('ScheduleSystem.schedule', 'token already active');

            return this;
        }

        state.idx = ActionIdxStart;

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

        const action = GameState.Query.action(token);
        if(action === null) {
            console.error('ScheduleSystem.cancel', 'action === null');
            
            return this;
        }

        if(action.cancelable === false) {
            console.error(
                'ScheduleSystem.cancel',
                'action.cancelable === false'
            );

            return this;
        }

        const state = token.state;
        state.idx = ActionIdxIdle;
        state.duration = 0;
        state.tick = 0;

        this.events.emit(
            GameState.Event.ActionExecute,
            action.name, ActionPhase.Cancel,
            zone
        );
        
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

            // note: when token gets canceled, the token state's idx is set to
            // ActionIdxIdle - do not process such tokens any further
            const state = token.state;
            if(state.idx === ActionIdxIdle) {
                continue;
            }

            const actions = token.actions;
            
            // note: it makes no sense to have 0 action, but let's support this
            // case for now
            const actions_total = actions.length;
            if(actions_total == 0) {
                continue;
            }
            
            const action = actions[state.idx];

            // the very first update
            state.tick += dt;
            state.duration += dt;
             
            // first tick
            if(state.duration == dt) {
                this.events.emit(
                    GameState.Event.ActionExecute,
                    action.name, ActionPhase.Start,
                    zone
                );
            }

            // subsequent ticks
            if(action.tick != null) {
                if(state.tick <= dt) {
                    this.events.emit(
                        GameState.Event.ActionExecute,
                        action.name, ActionPhase.TickStart,
                        zone
                    );
                } 
                
                if(state.tick >= action.tick) {
                    state.tick = 0;

                    this.events.emit(
                        GameState.Event.ActionExecute,
                        action.name, ActionPhase.TickEnd,
                        zone
                    );
                }
            }

            // last tick
            if(state.duration >= action.duration) {
                // rule: ActionPhase.End has to be called ONCE per action
                this.events.emit(
                    GameState.Event.ActionExecute,
                    action.name, ActionPhase.End,
                    zone
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
}

export {
    ScheduleSystem
};