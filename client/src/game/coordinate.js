class Coordinate {
    static WX_MIN = 0;
    static WX_MAX = 0;
    static WY_MIN = 0;
    static WY_MAX = 0;
    static SU = 0;

    static set (w, h, u) {
        Coordinate.WX_MIN = 0;
        Coordinate.WX_MAX = w - 1;
        Coordinate.WY_MIN = 0;
        Coordinate.WY_MAX = h - 1;
        Coordinate.SU = u;
    }

    static check (x, y) {
        return (x >= Coordinate.WX_MIN
            && x <= Coordinate.WX_MAX 
            && y >= Coordinate.WY_MIN
            && y <= Coordinate.WY_MAX);
    }

    /**
     * 
     * @param {Number} wx 
     * @param {Number} wy 
     */
    constructor (wx, wy) {
        if(Coordinate.check(wx, wy) === false) {
            throw new Error(`coordinate [${wx},${wy}] is out of bound`);
        }

        this.wx = wx;
        this.wy = wy;

        this.id = this.wy * Coordinate.WX_MAX + this.wx;
    }

    get sx () {
        return this.wx * Coordinate.SU;
    }

    get sy () {
        return this.wy * Coordinate.SU;
    }
}

export {
    Coordinate
};