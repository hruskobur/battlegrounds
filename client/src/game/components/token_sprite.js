import * as Pixi from 'pixi.js';

class TokenSpriteComponent extends Pixi.Container {
    static Size = 16;

    /**
     */
    constructor () {
        super();

        this.eventMode = 'passive';
    }
}

export {
    TokenSpriteComponent
};