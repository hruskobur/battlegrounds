import { PositionComponent } from '../components/position.js';
import { GameState } from './game.js';
import { GameZone } from './zone.js';

/**
 * @public
 * @unchecked
 * @param {GameState} state 
 * @param {Number} x
 * @param {Number} y
 * @returns {GameZone}
 */
function point (state, x, y) {
    x = Math.floor(x / 72);
    y = Math.floor(y / 72);

    return state.map[y][x];
}


/**
 * @public
 * @param {GameState} state 
 * @param {Number} x
 * @param {Number} y
 * @returns {GameZone}
 */
function coordinate (state, x, y) {
    return state.map[y][x];
}

/**
 * @public
 * @unchecked
 * @param {GameState} state 
 * @param {PositionComponent} position 
 * @returns {GameSelection}
 */
function position (state, position) {
    return state.map[position.y][position.x];
}

export {
    point, coordinate, position
};