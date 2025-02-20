import { SystemBase, EventEmitter, GameState } from './base.js';
import { AreaEntity } from '../entities/area.js';

class InitialisationSystem extends SystemBase {
    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);
    }

    /**
     * @public
     * @param {*} scenario 
     * @returns {InitialisationSystem} this
     */
    init = (scenario) => {
        this.state.width = 10;
        this.state.height = 10;

        this.#init_areas(scenario);
        this.#init_tokens(scenario);

        this.events.emit('initialisation.done');

        return this;
    }

    /**
     * @private
     * @param {*} scenario
     * @returns {InitialisationSystem} this
     */
    #init_areas (payload) {
        this.state.areas = [];
        for(let y = 0; y < this.state.height; ++y) {
            
            const _areas = [];
            for(let x = 0; x < this.state.width; ++x) {
                const area = new AreaEntity();
                area.position.x = x;
                area.position.y = y;

                area.terrain.difficulty = Math.floor(Math.random() * 100);
                // dev: this is just to illustrate geography without 
                // existing sprites. A string-id will be used later.
                area.terrain.geography = area.terrain.difficulty;

                // dev: for now, difficulty will determine hp of area
                // will be reworked later ...
                area.stats.hp = area.terrain.difficulty;
                area.stats.owner = Math.floor(Math.random() *2);

                area.renderable.x = x * area.renderable.width;
                area.renderable.y = y * area.renderable.height;
                area.renderable.terrain.alpha = area.terrain.geography / 100;
                area.renderable.difficulty.text = area.terrain.difficulty;
                
                // dev: this isn't the way ... setter has to be implemented
                area.renderable.border
                .clear()
                .rect(8, 8, 56, 56)
                .stroke({
                    width: 2,
                    color: area.stats.owner === 0 ? 'blue' : 'red'
                });

                _areas.push(area);
            }

            this.state.areas.push(_areas);
        }

        return this;
    }

    /**
     * @private
     * @param {*} scenario 
     * @returns {InitialisationSystem} this
     */
    #init_tokens (scenario) {
        this.state.tokens = [];
        for(let y = 0; y < this.state.height; ++y) {

            const _tokens = [];
            for(let x = 0; x < this.state.width; ++x) {
                _tokens.push(null);
            }

            this.state.tokens.push(_tokens);
        }

        return this;
    }
}

export {
    InitialisationSystem
};