import { GameState } from '../base.js';
import { AbilitySystem } from '../ability.js';
import { GameStateZone } from '../../state/zone.js';
import { AbilityStageId } from '../../components/ability.js';

/**
 * @public
 * @this {AbilitySystem}
 * @param {GameStateZone} zone 
 * @param {Number} id ability id
 * @returns {AbilitySystem} this
 */
function schedule (zone, id) {
    const token = zone.token;
    if(token == null) {
        console.warn('AbilitySystem.schedule', 'no token');

        return this;
    }

    const ability = token.abilities[id];
    if(ability == null) {
        console.warn('AbilitySystem.schedule', 'no such ability');

        return this;
    }

    if(ability.stage.id !== AbilityStageId.Idle) {
        // todo: failure info
        console.warn('AbilitySystem.schedule', 'stage is not idle');

        return this;
    }

    ability.stage.id = AbilityStageId.Cast;
    this.state.queue.current.push(ability);

    // todo: scheduled event
    console.warn('AbilitySystem.schedule', 'okay');

    return this;
}


export default schedule;