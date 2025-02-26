import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { GridEntity } from '../entities/grid.js';

/**
 * @class RenderSystem
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
class RenderSystem extends SystemBase {
    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     * @param {Pixi.Container} container 
     */
    constructor(events, state, container) {
        super(events, state);

        this.container = container;

        // layers
        const areas = this.state.render.areas;
        const tokens = this.state.render.tokens;

        // layers: clean-up
        while (areas.children.length > 0) {
            areas.removeChildAt(0);
        }

        while (tokens.children.length > 0) {
            tokens.removeChildren(0);
        }

        // layers: size
        areas.boundsArea =
            tokens.boundsArea = new Pixi.Rectangle(
                0, 0,
                72 * state.grid.width,
                72 * state.grid.height
            );

        // layers: do the "drawing"
        GameState.Query.iterator(
            this.state,
            (x, y) => {
                // draw area
                const area = this.state.areas[y][x];
                this.draw(area);

                // draw token
                const token = this.state.tokens[y][x];
                if (token != null) {
                    this.draw(token);
                }
            }
        );

        // layers: center
        areas.x = tokens.x = (this.container.width - areas.width) / 2;
        areas.y = tokens.y = (this.container.height - areas.height) / 2;

        this.container.addChild(
            areas,
            tokens
        );

    }

    /**
     * @public
     * @override
     * @returns {null}
     */
    destructor() {
        this.container = null;

        return super.destructor();
    }

    /**
     * @public
     * @param {*} entity 
     * @returns {RenderSystem} this
     */
    draw = (entity) => {
        const renderable = entity.renderable;

        this.state
            .render[renderable.constructor.Layer]
            .addChild(renderable);

        return this;
    }

    /**
     * @public
     * @param {*} entity 
     * @returns {RenderSystem} this
     */
    erase = (entity) => {
        const renderable = entity.renderable;

        while (renderable.children.length > 0) {
            renderable.removeChildAt(0);
        }

        renderable.removeFromParent();

        return this;
    }
}

export {
    RenderSystem
};