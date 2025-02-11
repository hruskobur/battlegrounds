import { TokenSpriteComponent } from '../components/token_sprite.js';

class TokenEntity {
    /**
     * @type {TokenSpriteComponent}
     */
    graphics;
    
    /**
     */
    constructor () {
        this.graphics = new TokenSpriteComponent();
    }
}

export {
    TokenEntity
};