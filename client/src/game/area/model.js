import { PositionProperty } from '../property/position.js';
import { OwnershipProperty } from '../property/ownership.js';

class AreaModel {
    /**
     * @type {PositionProperty}
     */
    position;

    /**
     * @type {OwnershipProperty}
     */
    ownership;

    constructor () {
        this.position = new PositionProperty();
        this.ownership = new OwnershipProperty();
    }
}

export {
    AreaModel
};