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
function accept_target (commander, zone) {
    const targets = commander.targets;

    console.log('PlayerInputSystem.cancel_target', targets);

    targets.actor = null;
    targets.targets = [];
}

export default accept_target;