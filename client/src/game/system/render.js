import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';

import draw from './render/draw.js';
import erase from './render/erase.js';

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
     * @param {EventEmitter} events 
     * @param {GameState} state 
     * @param {Pixi.Container} container 
     */
    constructor(events, state, container) {
        super(events, state);

        this.draw = draw;
        this.erase = erase;

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
        tokens.boundsArea =
        new Pixi.Rectangle(
            0, 0,
            72 * state.width,
            72 * state.height
        );

        // layers: do the "drawing"
        this.state.iterate(
            (zone, x, y) => {
                const area = zone.area;
                if(area != null) {
                    this.draw(area)
                }

                const token = zone.token;
                if(token != null) {
                    this.draw(token);
                }
            }
        );

        // layers: center
        areas.x = tokens.x = (container.width - areas.width) / 2;
        areas.y = tokens.y = (container.height - areas.height) / 2;

        container.addChild(
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
        this.draw = null;
        this.erase = null;

        return super.destructor();
    }
}

export {
    RenderSystem
};