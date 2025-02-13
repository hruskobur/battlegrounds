import { GameState } from './game.js';

/**
 * Iterates over
 * @public
 * @param {GameState} state 
 * @param {Function} cb x, y, state
 */
function iterator(state, cb) {
    for (let y = 0; y < state.height; ++y) {
        for (let x = 0; x < state.width; ++x) {
            cb(x, y, state);
        }
    }
}

export {
    iterator
};