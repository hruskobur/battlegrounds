import { Coordinate } from './coordinate.js';

class Game {
    static Request = Object.freeze({
        Enter: 'system.enter'
    });

    /**
     * @type {Array<Array<Coordinate>>}
     */
    areas;

    constructor () {
        Coordinate.set(10, 10, 128);

        this.areas = []; 
    }

    /**
     * 
     * @param {Function} cb (arg: Coordinate)
     */
    areas (cb) {
        for(let y = Coordinate.WY_MIN; y <= Coordinate.WY_MAX; ++y) {
            for(let x = Coordinate.WX_MIN; x <= Coordinate.WX_MAX; ++x) {
                cb(this.areas[y][x]);
            }
        }
    }

    /**
     * @returns {Game} this
     */
    clear () {
        this.areas.clear();

        return this;
    }
}

export {
    Coordinate,
    Game
};