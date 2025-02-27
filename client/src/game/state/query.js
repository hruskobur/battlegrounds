import { ActionComponent } from '../components/action/action.js';
import { PositionComponent } from '../components/position.js';
import { TokenEntity } from '../entities/token.js';
import { ActionIdleIdx } from './constant.js';
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

/**
 * 
 * @param {TokenEntity} token 
 * @returns {ActionComponent|null}
 */
function action (token) {
    const idx = token.state.idx;
    if(idx == ActionIdleIdx) {
        return null;
    }

    return token.actions[idx];
}

export {
    point, coordinate, position,
    action
};