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

        this.events.emit(GameState.Event.InitialisationReady);

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