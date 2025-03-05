import { 
    TargetOriginType
} from '../../state/constant.js';
import { Coordinate } from '../../types/coordinate.js';

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
     * @type {Array<Coordinate>}
     */
    targeted = [];
}

export {
    TokenStageComponent
};