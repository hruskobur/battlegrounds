import { TargetType, TargetRule } from '../../../state/constant.js';

class ActionInterfaceTarget {
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
    ActionInterfaceTarget
};