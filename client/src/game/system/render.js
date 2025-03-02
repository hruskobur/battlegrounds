import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { TokenEntity } from '../entities/token.js';
import { BuffEntity } from '../entities/buff.js';

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
        const areas = this.state.layer.areas;
        const tokens = this.state.layer.tokens;

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
                72 * state.width,
                72 * state.height
            );

        // layers: do the "drawing"
        GameState.Iterator.all(
            this.state,
            (zone, x, y, state) => {
                // draw area
                if(zone.area != null) {
                    this.draw(zone.area);
                }

                // draw token
                if(zone.token != null) {
                    this.draw(zone.token);
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
     * @param {TokenEntity|BuffEntity} entity 
     * @returns {RenderSystem} this
     */
    draw = (entity) => {
        const renderable = entity.renderable;

        // todo: something like this
        // switch(renderable.constructor.Layer) {
        //     case 'x': {
        //         return fn_draw_x(); // returns this
        //     }
        //     case 'y': {
        //         return fn_draw_y(); // returns this
        //     }
        //     default: {
        //         return this;
        //     }
        // }

        this.state
        .layer[renderable.constructor.Layer]
        .addChild(renderable);

        return this;
    }

    /**
     * @public
     * @param {TokenEntity|BuffEntity} entity 
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