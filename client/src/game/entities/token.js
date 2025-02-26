import { ActionEffectComponent } from '../components/action/effect.js';
import { ActionStateComponent } from '../components/action/state.js';
import { TokenRenderableComponent } from '../components/renderable/token.js';

class TokenEntity {
    /**
     * @type {TokenRenderableComponent}
     */
    renderable;

    /**
     * @type {Array<ActionEffectComponent>}
     */
    effects;

    /**
     * @type {ActionStateComponent}
     */
    state;

    constructor () {
        this.renderable = new TokenRenderableComponent();
        
        this.effects = [];
        this.state = new ActionStateComponent();
    }
}

export {
    TokenEntity
};