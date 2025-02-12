import * as Pixi from 'pixi.js';
import { SpriteComponent } from '../components/sprite.js';

class TokenEntity {
    /**
     * @type {SpriteComponent}
     */
    sprite;

    constructor () {
        this.sprite = new SpriteComponent({
            eventMode: 'none'
        });
    }
}

export {
    TokenEntity
};