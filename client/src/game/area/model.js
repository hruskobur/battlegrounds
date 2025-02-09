import { AreaPropertyPosition } from './position.js';
import { AreaPropertyOwnership } from './ownership.js';

class AreaModel {
    /**
     * @type {AreaPropertyPosition}
     */
    position;

    /**
     * @type {AreaPropertyOwnership}
     */
    ownership;

    constructor () {
        this.position = new AreaPropertyPosition();
        this.ownership = new AreaPropertyOwnership();
    }
}

export {
    AreaModel
};