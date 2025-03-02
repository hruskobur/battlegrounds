import { ActionInterfaceStage } from '../components/action/interface/stage.js';
import { PositionComponent } from '../components/position.js';
import { BuffEntity } from '../entities/buff.js';
import { TokenEntity } from '../entities/token.js';
import { ActionIdxIdle } from './constant.js';
import { GameState } from './game.js';
import { GameZone } from '../state/types/zone.js';

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
 * @param {TokenEntity|BuffEntity} entity
 * @return {ActionInterfaceStage}
 */
function action_stage (entity) {
    if(entity.action_state.stage == ActionIdxIdle) {
        return null;
    }

    return entity.action_rules.stages[entity.action_state.stage];
}

export {
    point, coordinate, position,
    action_stage
};