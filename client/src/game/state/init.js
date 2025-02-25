import { AreaEntity } from '../entities/area.js';
import { GameState } from './game.js';

/**
 * @public
 * @param {GameState} state
 * @returns {void}
 */
function scenario (state) {
    state.width = state.scenario.width;
    state.height = state.scenario.height;
}

/**
 * @public
 * @param {GameState} state
 * @returns {void}
 */
function areas (state) {
    state.areas = [];
    
    for(let y = 0; y < state.height; ++y) {
        const _areas = [];
        for(let x = 0; x < state.width; ++x) {
            const area = new AreaEntity();
            area.position.x = x;
            area.position.y = y;

            area.terrain.difficulty = 1;
            
            // dev: this is just to illustrate geography without 
            // existing sprites. A string-id will be used later.
            area.terrain.geography = area.terrain.difficulty;

            area.stats.hp = Math.floor(Math.random() * 100) + 1;
            area.stats.ownership = Math.floor(Math.random() *2);

            area.renderable.x = x * area.renderable.width;
            area.renderable.y = y * area.renderable.height;
            area.renderable.terrain.alpha = (area.stats.hp / 100);
            area.renderable.difficulty.text = area.stats.hp;
                
            // dev: this isn't the way ... setter has to be implemented
            // area.renderable.border
            // .clear()
            // .rect(8, 8, 56, 56)
            // .stroke({
            //     width: 2,
            //     color: area.stats.ownership === 0 ? 'blue' : 'red'
            // });
            // dev: this isn't the way either... 
            // but since i dont have terrain sprites for now, everything's 
            // white , and it looks confusing
            area.renderable.terrain.tint = area.stats.ownership === 0
            ? 'blue'
            : 'red';
            
            _areas.push(area);
        }

        state.areas.push(_areas);
    }
}

/**
 * @public
 * @param {GameState} state
 * @returns {void}
 */
function tokens (state) {
    state.tokens = [];
    for(let y = 0; y < state.height; ++y) {

        const _tokens = [];
        for(let x = 0; x < state.width; ++x) {
            _tokens.push(null);
        }

        state.tokens.push(_tokens);
    }

    return this;
}

export {
    scenario, 
    areas, tokens
};