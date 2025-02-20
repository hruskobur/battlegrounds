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

/**
 * @note may refactor signature to take AreaEntity, instead of coordiantes
 * 
 * @param {GameState} state
 * @param {Number} o ownership
 * @param {Number} x 
 * @param {Number} y
 * @returns {Boolean}
 */
function walkable (state, o, x, y) {
    // rule: coordinates have to be valid
    if(
        x < CoordinateLow 
        || x >= state.width
        || y < CoordinateLow
        || y >= state.height) {
        return false;
    }

    // rule: can't walk over enemy's area
    if(state.areas[y][x].stats.ownership !== o) {
        return false;
    }

    // rule: can't walk ower another token
    if(state.tokens[y][x] !== null) {
        return false;
    }

    return true;
}

export {
    coordinates,
    walkable
};