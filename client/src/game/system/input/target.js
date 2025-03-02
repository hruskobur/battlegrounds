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
function select_target (commander, zone) {
    const targets = commander.targets;
    targets.targets.push(zone);

    console.log('PlayerInputSystem.select_target', targets);
}

export default select_target;