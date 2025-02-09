import * as Pixi from 'pixi.js';

class AreaGraphics extends Pixi.Container {
    static Size = 64;
    static Margin = 8;

    /**
     */
    constructor () {
        super();

        // back face (border)
        this.addChild(
            new Pixi.Sprite(
                {
                    width: AreaGraphics.Size + AreaGraphics.Margin,
                    height: AreaGraphics.Size + AreaGraphics.Margin,
                    x: 0,
                    y: 0,
                    eventMode: 'none'
                }
            )
        );

        // front face
        this.addChild(
            new Pixi.Sprite(
                {
                    width: AreaGraphics.Size,
                    height: AreaGraphics.Size,
                    x: (AreaGraphics.Size + AreaGraphics.Margin) / 2,
                    y: (AreaGraphics.Size + AreaGraphics.Margin) / 2,
                    texture: Pixi.Texture.WHITE,
                    anchor: 0.5,
                    eventMode: 'static'
                }
            )
        );

        this.eventMode = 'static';
    }

    /**
     * @public
     * @param {Boolean} is 
     * @returns {AreaGraphics} this
     */
    targeted (is) {
        this.children[0].tint = (is === true) ? 'red' : 'black';
    }
}

export {
    AreaGraphics
};