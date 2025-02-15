import { GameState } from './game.js';
import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';

// note: this will tightly couple the Check & Query modules
// but since they are just a readability-extensions in the first place,
// thats completly OK
import * as Check from './check.js';

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