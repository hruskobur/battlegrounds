import { TokenRenderableComponent } from '../components/renderable/token.js';
import { ActionRulesComponent } from '../components/action/rules.js';
import { ActionDataComponent } from '../components/action/data.js';

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
     * @type {ActionDataComponent}
     */
    action_data;

    constructor () {
        this.renderable = new TokenRenderableComponent();

        this.action_rules = new ActionRulesComponent(
            '',
            [],
            []
        );

        this.action_data = new ActionDataComponent();
    }
}

export {
    TokenEntity
};
