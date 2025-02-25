import { ActionEffectComponent } from '../components/action/effect.js';
import { ActionTargetComponent } from '../components/action/target.js';
import { PositionComponent } from '../components/position.js';
import { TokenRenderableComponent } from '../components/renderable/token.js';

class TokenEntity {
    /**
     * @type {PositionComponent}
     */
    position;

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
        this.position = new PositionComponent(
            Number.MIN_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER
        );
        
        this.renderable = new TokenRenderableComponent();
        
        this.targets = [];
        this.effects = [];
        this.properties = {};
    }
}

export {
    TokenEntity
};