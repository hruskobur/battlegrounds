const CoordinateLow = 0;

class Coordinate {
    /**
     * @type {Number}
     */
    x;

    /**
     * @type {Number}
     */
    y;

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor (x, y) {
        this.x = x;
        this.y = y;
    }
}

export {
    CoordinateLow,
    Coordinate
};