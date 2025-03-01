import { SystemBase, EventEmitter, GameState } from './base.js';
import { ActionIdxIdle, ActionPhase } from '../state/constant.js';
import { GameActionsQueue } from '../state/actions_queue.js';

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
        for(let e = 0; e < this.queue.current.length; ++e) {
            const entity = this.queue.current[e];
            
            const action_data = entity.action_data;
            const action_rules = entity.action_rules;
            const action_stage = action_rules.stages[action_data.stage];

            // note: do the reset when action is idle or when it has become
            // idle (for example it was canceled)
            // note: do not update further after reset!
            // note: should be reset function
            if(action_data.stage === ActionIdxIdle) {
                action_data.phase = ActionPhase.Start;
                action_data.duration = 0;
                action_data.tick = 0;
                action_data.targets = [];

                continue;
            }

            action_data.tick += dt;
            action_data.duration += dt;

            // the very first tick
            if(action_data.duration == dt) {
                action_data.phase = ActionPhase.Start;

                // todo: should emit data that explicitly specify what to do 
                this.events.emit(GameState.Event.ActionUpdate, entity);
            }

            // subsequent ticks
            if(action_stage.tick != null) {
                if(action_data.tick <= dt) {
                    action_data.phase = ActionPhase.TickStart;
                    
                    // todo: should emit data that explicitly specify what to do 
                    this.events.emit(GameState.Event.ActionUpdate, entity);
                }

                if(action_data.tick >= action_stage.tick) {
                    action_data.phase = ActionPhase.TickEnd;
                    action_data.tick = 0;

                    // todo: should emit data that explicitly specify what to do 
                    this.events.emit(GameState.Event.ActionUpdate, entity);
                }
            }

            // the very last tick
            if(action_data.duration >= action_stage.duration) {
                action_data.phase = ActionPhase.End;

                // todo: should emit data that explicitly specify what to do 
                this.events.emit(GameState.Event.ActionUpdate, entity);

                action_data.duration = 0;
                action_data.tick = 0;
                action_data.stage += 1;

                if(action_data.stage >= action_rules.stages.length) {
                    action_data.idx = ActionIdxIdle;
                    action_data.phase = ActionPhase.Start;
                    action_data.targets = [];

                    continue;
                }
            }

            this.queue.updated.push(entity);
        }

        this.queue.current = this.queue.updated;
        this.queue.updated = [];

        return this;
    }
}

export {
    UpdateSystem
};