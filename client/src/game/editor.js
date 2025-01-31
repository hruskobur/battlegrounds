import { Coordinate } from './game.js';
import { Game } from './game.js';

class GameEditor {
    /**
     * @type {Game}
     */
    game;

    /**
     * 
     * @param {Game} game 
     */
    constructor (game) {
        this.game = game;
    }

    world_create() {
        for(let y = Coordinate.WY_MIN; y <= Coordinate.WY_MAX; ++y) {
            const areas = [];
            for(let x = Coordinate.WX_MIN; x <= Coordinate.WX_MAX; ++x) {
                areas.push(null);
            }
            this.game.areas.push(areas);
        }

        return this;
    }
    
    /**
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Game} this
     */
    area_create (x, y) {
        if(this.game.areas[y][x] != null) {
            throw new Error(`area [${x},${y}] already exists`);
        }

        this.game.areas[y][x] = new Coordinate(x, y);

        return this;
    }
}

export {
    GameEditor
};