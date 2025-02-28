import { TokenRenderableComponent } from '../components/renderable/token.js';
import { ActionComponent } from '../components/action.js';

class TokenEntity {
    /**
     * @type {TokenRenderableComponent}
     */
    renderable;

    /**
     * @type {ActionComponent}
     */
    action;

    constructor () {
        this.renderable = new TokenRenderableComponent();
        
        this.action = new ActionComponent(
            '',
            []
        );
    }
}

export {
    TokenEntity
};
