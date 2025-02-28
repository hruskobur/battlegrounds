import { ActionComponent } from '../components/action.js';
import { PositionComponent } from '../components/position.js';
import { ActionIdxIdle } from './constant.js';
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

    return state.zones[y][x];
}


/**
 * @public
 * @param {GameState} state 
 * @param {Number} x
 * @param {Number} y
 * @returns {GameZone}
 */
function coordinate (state, x, y) {
    return state.zones[y][x];
}

/**
 * @public
 * @unchecked
 * @param {GameState} state 
 * @param {PositionComponent} position 
 * @returns {GameSelection}
 */
function position (state, position) {
    return state.zones[position.y][position.x];
}

/**
 * 
 * @param {ActionComponent} action
 */
function action_stage (action) {
    if(action.idx == ActionIdxIdle) {
        return null;
    }

    return action.stages[action.idx];
}

export {
    point, coordinate, position,
    action_stage
};