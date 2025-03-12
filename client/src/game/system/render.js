import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';

import * as AreaRender from './render/area.js';
import * as TokenRender from './render/token.js';

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

        this.area_draw = AreaRender.draw;
        this.area_erase = AreaRender.erase;
        this.token_draw = TokenRender.draw;
        this.token_erase = TokenRender.erase;

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
        areas.boundsArea = tokens.boundsArea = new Pixi.Rectangle(
            0, 0,
            72 * state.width,
            72 * state.height
        );

        // layers: do the "drawing"
        this.state.iterate(
            (zone, x, y) => {
                this.area_draw(zone);
                this.token_draw(zone);
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
        this.area_draw = null;
        this.area_erase = null;
        this.token_draw = null;
        this.token_erase = null;

        return super.destructor();
    }
}

export {
    RenderSystem
};