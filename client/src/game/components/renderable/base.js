import * as Pixi from 'pixi.js';

class BaseRenderableComponent extends Pixi.Container {
    static Layer = '';

    /**
     * 
     * @param {import('pixi.js').ContainerOptions} options 
     */
    constructor (options) {
        super(options);
    }
}

export {
    Pixi,
    BaseRenderableComponent
};