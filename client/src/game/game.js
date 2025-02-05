import { AreaEntity } from './area.js';
import { PathEntity } from './path.js';

class Game {
    /**
     * @type {Map<Number, AreaEntity>}
     */
    areas;

    /**
     * @type {Map<Number, Map<Number, PathEntity>>}
     */
    paths;

    constructor () {
        this.areas = new Map();
        this.paths = new Map();
    }
}

export {
    Game
};