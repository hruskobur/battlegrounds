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
    constructor(game) {
        this.game = game;
    }

    /**
     * 
     * @returns {GameEditor}
     */
    world_create () {
        for (let y = Coordinate.WY_MIN; y <= Coordinate.WY_MAX; ++y) {
            const areas = [];
            for (let x = Coordinate.WX_MIN; x <= Coordinate.WX_MAX; ++x) {
                areas.push(null);
            }
            this.game.areas.push(areas);
        }

        return this;
    }

    /**
     * @param {Array<[Number, Number]>} wxys world (x & y)s
     * @returns {GameEditor} this
     */
    areas_create (wxys) {
        wxys.forEach(wxy => {
            const [wx, wy] = wxy;

            if(Coordinate.check(wx, wy) === false) {
                throw new Error(`coordinate [${wx},${wy}] is out of bound`);
            }
            
            if(this.game.areas[wy][wx] != null) {
                throw new Error(`area [${wx},${wy}] already exists`);
            }

            this.game.areas[wy][wx] = new Coordinate(wx, wy);
        });


        return this;
    }

    
    /**
     * @returns {GameEditor} this
     */
    areas_clear () {
        this.areas.clear();

        return this;
    }
}

export {
    GameEditor
};