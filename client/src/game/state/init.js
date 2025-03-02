import { GameState } from './game.js';
import { GameScenario } from './types/scenario.js';
import { GameZone } from '../state/types/zone.js';

/**
 * @public
 * @param {GameState} state
 * @param {GameScenario} scenario 
 * @returns {void}
 */
function map (state, scenario) {
    state.width = scenario.width;
    state.height = scenario.height;
    state.zones = [];

    for(let y = 0; y < state.height; ++y) {
        const _map = [];
       
        for(let x = 0; x < state.width; ++x) {
            const zone = new GameZone();

            const position = zone.position;
            position.x = x;
            position.y = y;

            _map.push(zone);
        }

        state.zones.push(_map);
    }
}

/**
 * @public
 * @param {GameState} state
 * @param {GameScenario} scenario 
 * @returns {void}
 */
function areas (state, scenario) {
    for(let y = 0; y < state.height; ++y) {
        for(let x = 0; x < state.width; ++x) {
            const area = state.zones[y][x].area;

            // note: these will be set from scenario!
            area.terrain.difficulty = 1;
            area.terrain.geography = Math.floor(Math.random() * 5);
            area.stats.hp = Math.floor(Math.random() * 100) +1;
            area.stats.ownership = Math.floor(Math.random() * 2);
            
            // note: these are set here correctly
            area.renderable.x = x * area.renderable.width;
            area.renderable.y = y * area.renderable.height;

            // note: this will be set from scenario!
            // note: will be replaced by sprite id
            area.renderable.terrain.alpha = (area.stats.hp / 100);

            // note: dev only, won't be there
            area.renderable.difficulty.text = area.stats.hp;

            // dev: to differenciate between player & enemy; won't be like that
            area.renderable.terrain.tint = (area.stats.ownership === 0)
            ? 'blue'
            : 'red';
        }
    }
}

/**
 * @public
 * @param {GameState} state
 * @param {GameScenario} scenario 
 * @returns {void}
 */
function tokens (state, scenario) {
    // 1st: iterarate over scenario and create tokens
    // . . .
}

export {
    map, 
    areas, tokens
};