import { TokenRenderableComponent } from '../components/renderable/token.js';
import { ActionRulesComponent } from '../components/action/rules.js';
import { ActionStateComponent } from '../components/action/state.js';

class TokenEntity {
    /**
     * @type {TokenRenderableComponent}
     */
    renderable;

    /**
     * @type {ActionRulesComponent}
     */
    action_rules;

    /**
     * @type {ActionStateComponent}
     */
    action_state;

    constructor () {
        this.renderable = new TokenRenderableComponent();

        this.action_rules = new ActionRulesComponent(
            '',
            [],
            []
        );

        this.action_state = new ActionStateComponent();
    }
}

export {
    TokenEntity
};
