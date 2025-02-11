import * as Pixi from 'pixi.js';

/**
 * @note A BIG NOTE about XYZSpriteComponent
 * There WILL be single SpriteComponent for all sprites, but only after
 * i decide, how to deal with spites/anitmations
 */

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