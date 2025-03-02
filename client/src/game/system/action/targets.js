import { BuffEntity } from '../../entities/buff.js';
import { TokenEntity } from '../../entities/token.js';
import { GameCommander } from '../../state/types/commander.js';
import { GameZone } from '../../state/types/zone.js';
import { ActionSystem } from '../action.js';
import { GameState } from '../base.js';

/**
 * @this {ActionSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone
 * @returns {ActionSystem} this
 */
function select_actor (commander, zone) {
    commander.targets.actor = zone;

    console.log('ActionSystem.select_actor', commander.targets);
}

/**
 * @this {ActionSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone
 * @returns {ActionSystem} this
 */
function select_target (commander, zone) {
    commander.targets.targets.push(zone);

    console.log('ActionSystem.select_target', commander.targets);
}

/**
 * @this {ActionSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone 
 * @returns {ActionSystem} this
 */
function accept_target (commander, zone) {
    console.log('ActionSystem.accept_target', commander.targets);

    commander.targets.actor = null;
    commander.targets.targets = [];
}

/**
 * @this {ActionSystem}
 * @public
 * @param {GameCommander} commander 
 * @param {GameZone} zone
 * @returns {ActionSystem} this
 */
function cancel_target (commander, zone) {
    console.log('ActionSystem.cancel_target', commander.targets);

    commander.targets.actor = null;
    commander.targets.targets = [];
}

export {
    select_actor,
    select_target,accept_target, cancel_target
};