import * as Pixi from 'pixi.js';
import { TokenModel } from './model.js';

class TokenGraphics extends Pixi.Container {
    static Size = 16;

    /**
     * @type {TokenModel}
     */
    model;

    /**
     * @param {TokenModel} model 
     */
    constructor (model) {
        super();

        this.model = model;

        this.eventMode = 'passive';
    }
}

export {
    TokenGraphics
};