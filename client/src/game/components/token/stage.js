import { 
    TargetOriginType,
    TargetSelectionType,
    TargetThresholdType
} from '../../state/constant.js';
import { Coordinate } from '../../types/coordinate.js';

/**
 * @typedef {Object} TokenStageZoneTargetRule
 * @property {TargetOriginType} origin
 * @property {TargetSelectionType} selection
 * @property {TargetThresholdType} threshold
 * @property {Number} count
 */

class TokenStageComponent {
    /**
     * @type {String}
     */
    name = '';

    /**
     * @type {Number}
     */
    idx = null;

    /**
     * @type {Number|null}
     */
    next = null;

    /**
     * @type {Number}
     */
    duration = 0;

    /**
     * @type {Number}
     */
    tick = 0;

    /**
     * @type {Boolean}
     */
    cancelable = false;

    /**
     * @type {Array<TokenStageZoneTargetRule>}
     */
    targets = [];

    /**
     * @type {Array<Coordinate>}
     */
    targeted = [];
}

export {
    TokenStageComponent
};