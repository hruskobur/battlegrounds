import { Coordinate } from '../types/coordinate.js';

class PositionComponent extends Coordinate {
    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor (x, y) {
        super(x, y);
    }
}

export {
    PositionComponent
};