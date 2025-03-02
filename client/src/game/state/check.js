import { TokenEntity } from '../entities/token.js';
import { ActionIdxIdle, ActionPhase, CoordinateLow } from './constant.js';
import { GameState } from './game.js';
import { GameZone } from '../state/types/zone.js';

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

export {
    coordinates
};