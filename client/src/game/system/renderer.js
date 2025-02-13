import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { GameState } from '../state/game.js';
import { RenderableComponent } from '../components/renderable.js';

/**
 * @class RendererSystem
 * 
 * @description
 * This class manages the scene presence of RenderableComponents.
 * 
 * The term "draw" represents adding a RenderableComponent to its 
 * designated layer (a specific PIXI.Container), and "erase" represents 
 * removing the RenderableComponent from that layer.
 * 
 * It is responsible for ensuring that entities are correctly 
 * displayed or removed from the scene based on their state.
 */
class RendererSystem {
    /**
     * @type {EventEmitter}
     */
    events;

    /**
     * @type {GameState}
     */
    state;

    /**
     * @type {Pixi.Container}
     */
    container;


    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     * @param {Pixi.Container} container
     */
    constructor (events, state, container) {
        this.events = events;
        this.state = state;

        this.container = container;
        this.container.addChild(
            this.state.renderer.background,
            this.state.renderer.foreground
        );
    }

    /**
     * Performs a full clean-up & redraw of the RendererEntity.
     * 
     * @public
     * @returns {RendererSystem} this
     */
    redraw () {
        const bg = this.state.renderer.background;
        const fg = this.state.renderer.foreground;

        // layers: clean-up
        while(bg.children.length > 0) {
            bg.removeChildAt(0);
        }

        while(fg.children.length > 0) {
            fg.removeChildren(0);
        }

        // layers: do the "drawing"
        for(let y = 0; y < this.state.height; ++y) {
            for(let x = 0; x < this.state.width; ++x) {
                // draw area
                const area = this.state.areas[y][x];
                this.draw(area.renderable)
                
                // draw token
                const token = this.state.tokens[y][x];
                if(token != null) {
                    this.draw(token.renderable);
                }
            }
        }

        // layers: center
        bg.x = fg.x = (this.container.width - bg.width) / 2;
        bg.y = fg.y = (this.container.height - bg.height) / 2;

        return this;
    }

    /**
     * @public
     * @param {RenderableComponent} renderable 
     * @returns {RendererSystem} this
     */
    draw (renderable) {
        this.state
        .renderer[renderable.layer]
        .addChild(renderable)

        return this;
    }

    /**
     * @public
     * @param {RenderableComponent} renderable 
     * @returns {RendererSystem} this
     */
    erase (renderable) {
        renderable.removeFromParent();

        return this;
    }

}

export {
    RendererSystem
};