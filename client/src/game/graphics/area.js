import * as Pixi from 'pixi.js';
import { AreaModel } from '../models/area.js';

class AreaGraphics extends Pixi.Container {
    static Size = 64;

    /**
     * @type {AreaModel}
     */
    model;

    /**
     * 
     * @param {AreaModel} model 
     */
    constructor (model) {
        super();

        this.model = model;

        const face = new Pixi.Sprite(Pixi.Texture.WHITE);
        face.width = AreaGraphics.Size;
        face.height = AreaGraphics.Size;
        face.x = 0;
        face.y = 0;

        const border = new Pixi.Graphics()
        .rect(0, 0, AreaGraphics.Size, AreaGraphics.Size)
        .stroke({
            width: 1,
            color: 'black'
        });

        this.addChild(face);
        this.addChild(border);

        this.x = this.model.x * (AreaGraphics.Size + 8);
        
        this.y = this.model.y * (AreaGraphics.Size + 8);

        this.eventMode = 'static';
    }
}

export {
    AreaGraphics
};