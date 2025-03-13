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
            // stage.id
            Number(stage.id)
        ];

        // update: update stage duration
        stage.duration += dt;
        stage.tick += dt;

        // stage: *the 1st* update
        if(stage.duration == dt) {
            stage.phase = AbilityStagePhase.Start;

            console.log(
                ability.name,
                stage.id,
                stage.phase,
                Date.now()
            );
        }

        // stage-tick: does this stage tick?
        if(rule.tick != null) {
            // stage-tick: *the 1st* tick-update
            if(stage.tick == dt) {
                stage.phase = AbilityStagePhase.TickStart;

                console.log(
                    ability.name,
                    stage.id,
                    stage.phase,
                    Date.now()
                );
            }

            // stage-tick: tick-update
            // "updates" happend here, but only these events are handled:
            // AbilityStagePhase.TickStart
            // AbilityStagePhase.TickEnd

            // stage-tick: *the last* tick-update
            if(stage.tick >= rule.tick) {
                stage.phase = AbilityStagePhase.TickEnd;
                stage.tick = 0;

                console.log(
                    ability.name,
                    stage.id,
                    stage.phase,
                    Date.now()
                );
            }
        }

        // stage: *the last* update
        if(stage.duration >= rule.duration) {
            stage.phase = AbilityStagePhase.End;
            stage.duration = 0;
            stage.tick = 0;

            console.log(
                ability.name,
                stage.id,
                stage.phase,
                Date.now()
            );

            // stage: progress to the next phase OR end
            stage.id += 1;
            if(stage.id >= rules.length) {
                stage.id = AbilityStageId.Idle;

                console.log(
                    ability,
                    'finished',
                    Date.now()
                );

                // update: this ability has reached its last stage - do not
                // schedule it for the next update
                removed.push(ability);

                continue;
            }
        }

        // stage: 
        // "updates" happend here, but only these events are handled:
        // AbilityStagePhase.Start
        // AbilityStagePhase.TickStart
        // AbilityStagePhase.TickEnd
        // AbilityStagePhase.End

        // update: schedule this ability for next update
        updated.push(
            ability
        );

        queue.current = updated;
        queue.updated = [];
    }
}

export default update;