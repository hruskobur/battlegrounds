import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { GameState } from '../state/game.js';

class RendererSystem {
    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     * @type {EventEmitter}
     */
    events;

    /**
     * @type {GameState}
     */
    state;

    /**
     * @param {Pixi.Container} container
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (container, events, state) {
        this.container = container
        this.events = events;
        this.state = state;
    }

    /**
     * @public
     * @returns {RendererSystem} this
     */
    redraw () {
        const areas = this.state.renderer.areas;
        const tokens = this.state.renderer.tokens;

        while(areas.children.length > 0) {
            this.areas.removeChildAt(0);
        }

        while(tokens.children.length > 0) {
            tokens.removeChildren(0);
        }

        for(let y = 0; y < this.state.height; ++y) {
            for(let x = 0; x < this.state.width; ++x) {
                const area = this.state.areas[y][x];
                const token = this.state.tokens[y][x]

                areas.addChild(area.renderable);

                if(token != null) {
                    tokens.addChild(token.renderable);
                }
            }
        }

        areas.x = tokens.x = (this.container.width - areas.width) / 2;
        areas.y = tokens.y = (this.container.height - areas.height) / 2;

        return this;
    }

}

export {
    RendererSystem
};