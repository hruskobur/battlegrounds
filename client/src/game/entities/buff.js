import { ActionRulesComponent } from '../components/action/rules.js';
import { ActionDataComponent } from '../components/action/data.js';

class BuffEntity {
    /**
     * @type {ActionRulesComponent}
     */
    action_rules;

    /**
     * @type {ActionDataComponent}
     */
    action_data;

    constructor () {
        this.action_rules = new ActionRulesComponent(
            '',
            [],
            []
        );

        this.action_data = new ActionDataComponent();
    }
}

export {
    BuffEntity
};
