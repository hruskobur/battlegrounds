import * as Pixi from 'pixi.js';
import { Target } from '../target.js'

class AreaGraphics extends Pixi.Container {
    static Size = 64;

    /**
     * @type {Target}
     */
    target;

    /**
     * @note I have decided to map model to graphics by just x,y and id,
     * not by the whole model.
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} id 
     */
    constructor (x, y, id) {
        super();

        // front face
        this.addChild(
            new Pixi.Sprite(
                {
                    width: AreaGraphics.Size,
                    height: AreaGraphics.Size,
                    x: 0,
                    y: 0,
                    texture: Pixi.Texture.WHITE
                }
            )
        );

        // border
        this.addChild(
            new Pixi.Graphics()
            .rect(
                0, 0,
                AreaGraphics.Size, AreaGraphics.Size
            ).stroke(
                {
                    width: 1,
                    color: 'black'
                }
            )
        );

        this.x = x * (AreaGraphics.Size + 8);
        this.y = y * (AreaGraphics.Size + 8);
        this.eventMode = 'static';
        this.target = new Target(x, y, id);
    }

    select (is) {
        const border = this.children[1];

        border
        .clear()
        .rect(0, 0, AreaGraphics.Size, AreaGraphics.Size)
        .stroke(
            {
                width: (is === true) ? 3 : 1,
                color: (is === true) ? 'red' : 'black'
            }
        );
    }
}

export {
    AreaGraphics
};