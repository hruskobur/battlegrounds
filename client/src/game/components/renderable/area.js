import { 
    RenderableComponent,
    Sprite, Text, Texture,
    Rectangle,
    Graphics
} from './renderable.js';

/**
 * @note The 64 & 72 will be refactored to some graphical-constants.
 * These constants will also be scaled, when the responsivnes is implemented.
 */
class AreaRenderableComponent extends RenderableComponent {
    constructor () {
        super({
            layer: RenderableComponent.LayerId.Background,
            eventMode: 'static',
            boundsArea: new Rectangle(0, 0, 72, 72),
            hitArea: new Rectangle(0, 0, 72, 72),
            children: [
                // terrain sprite
                new Sprite({
                    width: 64,
                    height: 64,
                    anchor: 0.5,
                    x: 72 / 2,
                    y: 72 / 2,
                    eventMode: 'none',
                    texture: Texture.WHITE,
                    zIndex: 0,
                    label: undefined
                }),
                // difficulty sprite
                new Text({
                    text: '',
                    eventMode: 'none',
                    anchor: 0.5,
                    x: 72 / 2,
                    y: 72 / 2,
                    label: undefined
                }),
                // // border sprite
                // new Graphics({})
                // .rect(8, 8, 56, 56)
                // .stroke({ width: 2, color: 'green'})
            ]
        });
    }

    get terrain () {
        return this.children[0];
    }

    /**
     * @note dev purposes only
     * @returns {Text}
     */
    get difficulty () {
        return this.children[1];
    }

    // /**
    //  * @note dev purposes only
    //  * @returns {Graphics}
    //  */
    // get border () {
    //     return this.children[2];
    // }
}

export {
    AreaRenderableComponent
};