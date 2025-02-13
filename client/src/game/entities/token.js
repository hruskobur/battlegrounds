import * as Pixi from 'pixi.js';

class TokenEntity {
    /**
     * @type {Pixi.Container}
     */
    renderable;

    constructor () {
        this.renderable = new Pixi.Container({
            eventMode: 'none'
        });
    }
}

export {
    TokenEntity
};