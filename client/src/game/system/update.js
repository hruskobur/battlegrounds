import { SystemBase, EventEmitter, GameState } from './base.js';
import { ActionIdxIdle, ActionPhase } from '../state/constant.js';
import { GameActionsQueue } from '../state/actions_queue.js';
import { ActionComponent } from '../components/action.js';

class UpdateSystem extends SystemBase {
    /**
     * @type {GameActionsQueue}
     */
    queue;

    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.queue = this.state.queue;
    }

    /**
     * @public
     * @override
     * @returns {null}
     */
    destructor () {
        this.queue = null;

        return super.destructor();
    }

    /**
     * @public
     * @param {Number} dt
     * @returns {UpdateSystem} this
     */
    update = (dt) => {
        for (let u = 0; u < this.queue.current.length; ++u) {
            const action = this.queue.current[u];

            // note: when action gets canceled, its idx is set to ActionIdxIdle
            // do not process actions with idle idx
            if(action.idx === ActionIdxIdle) {
                // reset duration & tick just to be sure
                action.phase = ActionPhase.Start;
                action.duration = 0;
                action.tick = 0;
                
                continue;
            }

            const stage = action.stages[action.idx];

            action.tick += dt;
            action.duration += dt;

            // first tick
            if(action.duration == dt) {
                action.phase = ActionPhase.Start;
                
                this.events.emit(GameState.Event.ActionUpdate, action);
            }

            // subsequent ticks
            if(stage.tick != null) {
                if(action.tick <= dt) {
                    action.phase = ActionPhase.TickStart;
                    
                    this.events.emit(GameState.Event.ActionUpdate, action);
                } 
                
                if(action.tick >= stage.tick) {
                    action.phase = ActionPhase.TickEnd;
                    action.tick = 0;

                    this.events.emit(GameState.Event.ActionUpdate, action);
                }
            }

            // last tick
            if(action.duration >= stage.duration) {
                action.phase = ActionPhase.End;

                this.events.emit(GameState.Event.ActionUpdate, action);

                action.duration = 0;
                action.tick = 0;
                
                action.idx += 1;
                if(action.idx >= action.stages.length) {
                    action.idx = ActionIdxIdle;
                    action.phase = ActionPhase.Start;

                    continue;
                }
            }
    
            this.queue.updated.push(action);
        }

        this.queue.current = this.queue.updated;
        this.queue.updated = [];

        return this;
    }
}

export {
    UpdateSystem
};