import * as Pixi from 'pixi.js';

class SpriteComponent extends Pixi.Container {
    /**
     * 
     * @param {Pixi.ContainerOptions} options [default=null]
     */
    constructor (options=null) {
        super(options);
    }
}

export {
    SpriteComponent
};