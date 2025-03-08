import { 
    TargetOriginType, TokenPhase
} from '../../state/constant.js';
import { Coordinate } from '../../types/coordinate.js';

/**
 * @typedef {Object} TokenStageState
 * @property {TokenPhase} phase
 * @property {Number} duration
 * @property {Number} tick
 * @property {Array<Coordinate>} targets
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
     * @type {Array<TargetOriginType>}
     */
    targets = [];

    /**
     * @type {TokenStageState}
     */
    state;
}

export {
    TokenStageComponent
};