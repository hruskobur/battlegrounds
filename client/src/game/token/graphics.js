import * as Pixi from 'pixi.js';

class TokenGraphics extends Pixi.Container {
    static Size = 16;

    /**
     */
    constructor () {
        super();

        this.eventMode = 'passive';
    }
}

export {
    TokenGraphics
};