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

}

export {
    Coordinate,
    Game
};