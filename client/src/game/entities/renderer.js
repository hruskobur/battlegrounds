import * as Pixi from 'pixi.js';

class RendererEntity {
    /**
     * @type {Pixi.Container}
     */
    areas;

    /**
     * @type {Pixi.Container}
     */
    tokens;

    constructor () {
        this.areas = new Pixi.Container({
            label: 'renderer.layer.areas',
            eventMode: 'static',
            zIndex: 0
        });

        this.tokens = new Pixi.Container({
            label: 'renderer.layer.tokens',
            eventMode: 'none',
            zIndex: 1
        });
    }
}

export {
    RendererEntity
};