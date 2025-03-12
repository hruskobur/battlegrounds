import { 
    AbilityStageId, AbilityStagePhase,
    AbilityComponent
} from '../../components/ability.js';
import { GameStateZone } from '../../state/zone.js';
import { AbilitySystem } from '../ability.js';

/**
 * @public
 * @this {AbilitySystem}
 * @param {GameStateZone} zone 
 * @param {Number} id ability id
 * @returns {AbilitySystem} this
 */
function cancel (zone, id) {
    const token = zone.token;
    if(token == null) {
        console.warn('AbilitySystem.schedule', 'no token');

        return this;
    }

    const ability = token.abilities[id];
    if(ability == null) {
        console.warn('AbilitySystem.cancel', 'no such ability');

        return this;
    }

    const stage = ability.stage;
    if(stage.id == AbilityStageId.Idle) {
        console.warn('AbilitySystem.cancel', 'stage == idle');

        return this;
    }

    if(stage.id == AbilityStageId.Cooldown) {
        console.warn('AbilitySystem.cancel', 'stage == cooldown');

        return this;
    }

    stage.id = AbilityStageId.Cooldown;
    stage.duration = 0;
    stage.tick = 0;
    stage.phase = AbilityStagePhase.Start;

    return this;
}

export default cancel;