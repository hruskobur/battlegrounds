import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { GameState } from '../state/game.js';
import { AreaEntity } from '../entities/area.js';
import { RendererEntity } from '../entities/renderer.js';

class InitialisationSystem {
    /**
     * @param {Pixi.Container} container 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (container, events, state) {
        this.container = container;
        this.events = events;
        this.state = state;
    }

    /**
     * @public
     * @param {*} scenario 
     * @returns {InitialisationSystem} this
     */
    init (scenario) {
        this.state.width = 10;
        this.state.height = 10;

        this.container.addChild(
            this.state.renderer.areas,
            this.state.renderer.tokens
        );

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
                area.renderable.x = x * area.renderable.width;
                area.renderable.y = y * area.renderable.height;

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