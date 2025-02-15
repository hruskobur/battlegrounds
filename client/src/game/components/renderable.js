import { 
    Container,
    Sprite, Texture, Text,
    Graphics,
    Rectangle
} from 'pixi.js';

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
     * @param {import('pixi.js').ContainerOptions} options 
     */
    constructor (options = null) {
        super(options);

        this.layer = RenderableComponent.LayerId.Undefined;
    }
}

export {
    RenderableComponent, 
    Container,
    Sprite, Texture, Text,
    Graphics,
    Rectangle
};