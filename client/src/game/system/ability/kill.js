import { 
    AbilityStageId, AbilityStagePhase,
    AbilityComponent
} from '../../components/ability.js';
import { GameStateZone } from '../../state/zone.js';

/**
 * @param {GameStateZone} zone
 * @param {Number} id
 * @returns {void}
 */
function kill (zone, id) {
    const token = zone.token;
    if(token == null) {
        return;
    }

    const ability = token.abilities[id];
    if(ability == null) {
        return;
    }
    
    const stage = ability.stage;

    stage.id = AbilityStageId.Idle;
    stage.duration = 0;
    stage.tick = 0;
    stage.phase = AbilityStagePhase.Start;

    ability.target = [];

    console.log('kill', ability.name);
}

export default kill;