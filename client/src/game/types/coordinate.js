class Coordinate {
    /**
     * 
     * @param {Coordinate} ca 
     * @param {Coordinate} cb 
     * @returns {Boolean}
     */
    static Compare(ca, cb) {
        return (ca.x === cb.x && ca.y === cb.y);
    }

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
    Coordinate
};