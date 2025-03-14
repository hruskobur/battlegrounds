import { GameStateAbilityQueue } from '../../state/queue.js';
import { AbilityStageId, AbilityStagePhase } from '../../components/ability.js';
import { AbilitySystem } from '../ability.js';

/**
 * @public
 * @this {AbilitySystem}
 * @param {GameStateAbilityQueue} queue 
 * @param {Number} dt 
 * @returns {AbilitySystem}
 */
function update (dt) {
    const queue = this.state.queue;

    queue.removed = [];

    const current = queue.current;
    const updated = queue.updated;
    const removed = queue.removed;

    const length = current.length;

    for(let a = 0; a < length; ++a) {
        // get: cache resources
        const ability = current[a];
        const rules = ability.stage_rules;
        const stage = ability.stage;

        // check: idle stages are not updated any further
        if(stage.id == AbilityStageId.Idle) {
            continue;
        }

        // get: the current stage rule
        const rule = rules[
            Number(stage.id)
        ];

        if(stage.duration == 0) {
            stage.phase = AbilityStagePhase.Start;

            this.events.emit('DEV_ABILITY', ability);
        }

        if(rule.tick != null) {
            if(stage.tick == 0) {
                stage.phase = AbilityStagePhase.TickStart;

                this.events.emit('DEV_ABILITY', ability);
            }

            if(stage.tick >= rule.tick) {
                stage.phase = AbilityStagePhase.TickEnd;
            
                this.events.emit('DEV_ABILITY', ability);
            
                stage.tick = 0;

            } else {
                stage.tick += dt;
            }
        }

        if(stage.duration >= rule.duration) {
            stage.phase = AbilityStagePhase.End;
            
            this.events.emit('DEV_ABILITY', ability);

            stage.duration = 0;
            stage.tick = 0;
            
            
            stage.id += 1;
            if(stage.id >= rules.length) {
                stage.id = AbilityStageId.Idle;
                // stage.duration = 0;
                // stage.tick = 0;
                
                // console.log('finish');
                removed.push(ability);

                continue;
            }
        } else {
            stage.duration += dt;
        }
       
        // update: schedule this ability for next update
        updated.push(
            ability
        );
    }
    
    queue.current = updated;
    queue.updated = [];
}

export default update;