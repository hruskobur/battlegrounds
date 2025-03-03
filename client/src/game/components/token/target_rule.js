import { TargetType, TargetRule } from '../../state/constant.js';

class TokenTargetRuleComponent {
    /**
     * @type {TargetType}
     */
    type = TargetType.Self;

    /**
     * @type {TargetRule}
     */
    rule = TargetRule.Relaxed;

    /**
     * @type {Number}
     */
    count = 0;
}

export {
    TokenTargetRuleComponent
};