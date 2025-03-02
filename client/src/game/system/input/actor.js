import { GameCommander } from '../../state/types/commander.js';
import { GameZone } from '../../state/types/zone.js';
import { PlayerInputSystem } from '../input.js';

/**
 * @public
 * @this {PlayerInputSystem}
 * @param {GameCommander} commander 
 * @param {GameZone} zone
 * @returns {PlayerInputSystem} this
 */
function select_actor (commander, zone) {
    const targets = commander.targets;

    if(zone.area.ownership.faction !== commander.commander.ownership.faction) {
        targets.actor = null;
        targets.targets = null;

        console.error(
            'PlayerInputSystem.select_actor', 'faction area != commander'
        );
        
        return;
    }

    if(zone.token == null) {
        targets.actor = null;
        targets.targets = null;

        // todo: this error is dev-only
        // correct response is to do nothing
        console.error('PlayerInputSystem.select_actor', 'zone.token === null');

        return;
    }

    targets.actor = zone;
    targets.targets = [];


    console.log('PlayerInputSystem.select_actor', targets);
}

export default select_actor;