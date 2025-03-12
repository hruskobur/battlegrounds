import { 
    AbilityStageId, AbilityStagePhase,
    AbilityComponent
} from '../../components/ability.js';

/**
 * 
 * @param {AbilityComponent} ability 
 * @returns {void}
 */
function kill (ability) {
    const stage = ability.stage;

    stage.id = AbilityStageId.Idle;
    stage.duration = 0;
    stage.tick = 0;
    stage.phase = AbilityStagePhase.Start;

    ability.target = [];

    console.log('kill', ability.name);
}

export default kill;