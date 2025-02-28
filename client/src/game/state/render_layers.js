import { BaseRenderableComponent } from '../components/renderable/base.js';

/**
 * @typedef {Object} RenderableInterface
 * @property {BaseRenderableComponent} renderable
 */

class GameRenderLayers {
    /**
     * @type {BaseRenderableComponent}
     */
    areas;

    /**
     * @type {BaseRenderableComponent}
     */
    tokens;

    constructor () {
        this.areas = new BaseRenderableComponent({
            eventMode: 'static',
            zIndex: 0,
            label: 'areas'
        });

        this.tokens = new BaseRenderableComponent({
            eventMode: 'static',
            zIndex: 0,
            label: 'tokens'
        });
    }
}

export {
    GameRenderLayers
};