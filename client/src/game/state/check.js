import { CoordinateLow } from './constant.js';
import { GameState } from './game.js';

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