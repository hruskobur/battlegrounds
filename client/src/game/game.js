import { AreaEntity } from './area.js';

class Game {
    /**
     * @type {Map<Number, AreaEntity>}
     */
    areas;

    constructor () {
        this.areas = new Map();
    }
}

export {
    Game
};