import { CoordinateLow } from './constant.js';
import { GameState } from './game.js';

/**
 * Iterates over areas and tokens of the provided game state.
 * Note that this function REQUIRES already initialized game state.
 * @public
 * @checked
 * @param {GameState} state 
 * @param {Function} cb zone, x, y, state
 */
function all(state, cb) {
    for (let y = CoordinateLow; y < state.height; ++y) {
        for (let x = CoordinateLow; x < state.width; ++x) {
            cb(
                state.map[y][x],
                x, y,
                state
            );
        }
    }
}

export {
    all
};