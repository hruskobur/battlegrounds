import * as Pixi from 'pixi.js';
import { AreaModel } from './model.js';

class AreaGraphics extends Pixi.Container {
    static Size = 64;

    /**
     * @type {AreaModel}
     */
    model;

    /**
     * @param {AreaModel} model 
     */
    constructor (model) {
        super();

        this.model = model;

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

        this.x = this.model.position.x * (AreaGraphics.Size + 8);
        this.y = this.model.position.y * (AreaGraphics.Size + 8);
        
        this.eventMode = 'static';
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