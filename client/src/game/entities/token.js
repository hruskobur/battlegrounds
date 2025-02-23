import { TokenRenderableComponent } from '../components/renderable/token.js';

class TokenEntity {
    /**
     * @type {TokenRenderableComponent}
     */
    renderable;

    constructor () {
        this.renderable = new TokenRenderableComponent();
    }
}

export {
    TokenEntity
};