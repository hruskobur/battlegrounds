import { TokenRenderableComponent } from '../components/renderable/token.js';
import { ActionComponent } from '../components/action/action.js';
import { CurrentActionComponent } from '../components/action/current.js';

class TokenEntity {
    /**
     * @type {TokenRenderableComponent}
     */
    renderable;

    /**
     * @type {Array<ActionComponent>}
     */
    actions;

    /**
     * @type {CurrentActionComponent}
     */
    current;

    constructor () {
        this.renderable = new TokenRenderableComponent();

        this.actions = [
            new ActionComponent('cast_and_generate', 1000),
            new ActionComponent('cast_and_generate', 1000),
            new ActionComponent('cast_and_generate', 1000),
            new ActionComponent('cast_and_generate', 1000),
            new ActionComponent('cast_and_generate', 1000),
            new ActionComponent('generate', 0),
            new ActionComponent('cooldown', 5000),
        ];
        this.current = new CurrentActionComponent();
    }
}

export {
    TokenEntity
};