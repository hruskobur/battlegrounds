import { ActionEffectComponent } from '../components/action/effect.js';
import { ActionTargetComponent } from '../components/action/target.js';
import { TokenRenderableComponent } from '../components/renderable/token.js';

class TokenEntity {
    /**
     * @type {TokenRenderableComponent}
     */
    renderable;

    /**
     * @type {Array<ActionTargetComponent>}
     */
    targets;

    /**
     * @type {Array<ActionEffectComponent>}
     */
    effects;

    /**
     * @type {Object}
     */
    properties;

    constructor () {
        this.renderable = new TokenRenderableComponent();
        
        this.targets = [];
        this.effects = [];
        this.properties = {};
    }
}

export {
    TokenEntity
};