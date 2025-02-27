import { TokenEntity } from '../entities/token.js';
import { ActionPhase, CoordinateLow } from './constant.js';
import { GameState } from './game.js';
import { GameZone } from './zone.js';

/**
 * Checks, whether provided coordinates are valid position inside of the game.
 * @param {GameState} state 
 * @param {Number} x 
 * @param {Number} y 
 * @returns {Boolean}
 */
function coordinates (state, x, y) {
    return (
        x >= CoordinateLow
        && x < state.width
        && y >= CoordinateLow
        && y < state.height
    );
}

/**
 * @public
 * @param {TokenEntity} token 
 * @returns {Boolean}
 */
function active (token) {
    return (token.state.idx > ActionPhase.Idle);
}

/**
 * @public
 * @param {TokenEntity} token 
 * @returns {Boolean}
 */
function cancelable (token) {
    const phase = token.state.idx;
    if(phase <= ActionPhase.Idle) {
        return false;
    }

    return (token.actions[phase].cancelable);
}

export {
    coordinates,
    active, cancelable
};