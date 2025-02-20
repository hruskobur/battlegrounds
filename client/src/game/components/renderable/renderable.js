import { 
    Container,
    Sprite, Texture, Text,
    Graphics,
    Rectangle
} from 'pixi.js';

/**
 * @typedef {import('pixi.js').ContainerOptions 
 * & { layer: RenderableComponent.LayerId }} RenderableComponentOptions
 */

class RenderableComponent extends Container {
    static LayerId = Object.freeze({
        Undefined: null,
        Background: 'background',
        Foreground: 'foreground'
        // ui?
    });

    /**
     * @type {RenderableComponent.LayerId}
     */
    layer;

    /**
     * 
     * @param {RenderableComponentOptions} options 
     */
    constructor (options = null) {
        super(options);

        this.layer = options.layer || RenderableComponent.LayerId.Undefined;
    }
}

export {
    RenderableComponent, 
    Container,
    Sprite, Texture, Text,
    Graphics,
    Rectangle
};