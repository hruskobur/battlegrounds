import { ActionRulesComponent } from '../components/action/rules.js';
import { ActionStateComponent } from '../components/action/state.js';

class BuffEntity {
    /**
     * @type {ActionRulesComponent}
     */
    action_rules;

    /**
     * @type {ActionStateComponent}
     */
    action_state;

    constructor () {
        this.action_rules = new ActionRulesComponent(
            '',
            [],
            []
        );

        this.action_state = new ActionStateComponent();
    }
}

export {
    BuffEntity
};
