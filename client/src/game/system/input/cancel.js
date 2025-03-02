import { GameCommander } from '../../state/types/commander.js';
import { GameZone } from '../../state/types/zone.js';
import { PlayerInputSystem } from '../input.js';


/**
 * @this {PlayerInputSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone
 * @returns {PlayerInputSystem} this
 */
function cancel_target (commander, zone) {
    const targets = commander.targets;

    console.log('PlayerInputSystem.cancel_target', targets);

    targets.actor = null;
    targets.targets = [];
}

export default cancel_target;