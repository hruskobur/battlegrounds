import { TargetType, TargetRule } from '../../state/constant.js';


class ActionTargetInterface {
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
    ActionTargetInterface
};