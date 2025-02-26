import { CoordinateLow } from './constant.js';
import { GameState } from './game.js';

/**
 * Iterates over areas and tokens of the provided game state.
 * Note that this function REQUIRES already initialized game state.
 * @public
 * @checked
 * @param {GameState} state 
 * @param {Function} cb x, y, area, token, state
 */
function all(state, cb) {
    for (let y = CoordinateLow; y < state.grid.height; ++y) {
        for (let x = CoordinateLow; x < state.grid.width; ++x) {
            cb(
                state.grid.positions[y][x],
                state.areas[y][x],
                state.tokens[y][x],
                state
            );
        }
    }
}

export {
    all
};