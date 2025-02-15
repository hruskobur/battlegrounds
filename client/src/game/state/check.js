import { GameState } from './game.js';

/**
 * Checks, whether provided coordinates are valid position inside of the game.
 * @param {GameState} state 
 * @param {Number} x 
 * @param {Number} y 
 * @returns {Boolean}
 */
function coordinates (state, x, y) {
    return (x >= 0 && x < state.width && y >= 0 && y < state.height);
}

/**
 * @note may refactor signature to take AreaEntity, instead of coordiantes
 * 
 * @param {GameState} state
 * @param {Number} x 
 * @param {Number} y
 * @returns {Boolean}
 */
function walkable (state, x, y) {
    // rule: coordinates have to be valid
    if(x < 0 || x >= state.width || y < 0 || y >= state.height) {
        return false;
    }

    // todo: rule: can't walk over enemy's area
    // . . .

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