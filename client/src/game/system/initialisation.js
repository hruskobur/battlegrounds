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

                area.renderable.x = x * area.renderable.width;
                area.renderable.y = y * area.renderable.height;

                // dev: somehow, i need to provide getter for specific
                // sprites of the renderable ... 
                // should this be a general fn of RenderableComponent or
                // AreaEntity specific fn?
                area.renderable.children[1].text = area.terrain.difficulty;

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