import { GameCommander } from '../../state/types/commander.js';
import { GameZone } from '../../state/types/zone.js';
import { ActionSystem } from '../action.js';

/**
 * @this {ActionSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone
 * @returns {ActionSystem} this
 */
function select_actor (commander, zone) {
    const targets = commander.targets;

    if(zone.token == null) {
        targets.actor = null;
        targets.targets = null;

        // todo: this error is dev-only
        // correct response is to do nothing
        console.error('ActionSystem.select_actor', 'zone.token === null');

        return;
    }

    targets.actor = zone;
    targets.targets = [];


    console.log('ActionSystem.select_actor', targets);
}

/**
 * @this {ActionSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone
 * @returns {ActionSystem} this
 */
function select_target (commander, zone) {
    const targets = commander.targets;
    targets.targets.push(zone);

    console.log('ActionSystem.select_target', targets);
}

/**
 * @this {ActionSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone 
 * @returns {ActionSystem} this
 */
function accept_target (commander, zone) {
    const targets = commander.targets;

    console.log('ActionSystem.cancel_target', targets);

    targets.actor = null;
    targets.targets = [];
}

/**
 * @this {ActionSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone
 * @returns {ActionSystem} this
 */
function cancel_target (commander, zone) {
    const targets = commander.targets;

    console.log('ActionSystem.cancel_target', targets);

    targets.actor = null;
    targets.targets = [];
}

export {
    select_actor,
    select_target,accept_target, cancel_target
};