import { AreaEntity } from './entities/area.js';
import { TokenEntity } from './entities/token.js';
import target from './selection/target.js';
import extend from './selection/extend.js';
import path from './selection/path.js';

class TheGame {
    /**
     * @type {Number}
     */
    width;

    /**
     * @type {Number}
     */
    height;

    /**
     * @type {Array<Array<AreaEntity>>}
     */
    areas;

    /**
     * @type {Array<Array<TokenEntity>>}
     */
    tokens;

    // note: this looks dumb, but it allows two important uses
    // a) extending TheGame class with additional functionality in a modular way
    // b) allows intellisense to pick-up function description from the module
    target = target;
    extend = extend;
    path = path;

    /**
     */
    constructor () {
        this.width = 0;
        this.height = 0;
        this.areas = [];
        this.tokens = [];
    }

    /**
     * @param {*} scenario
     * @returns {TheGame}
     */
    initialize = (scenario) => {
        this.width = 10;
        this.height = 10;

        this.areas = [];
        this.tokens = [];

        for(let y = 0; y < this.height; ++y) {
            const _areas = [];
            const _tokens = [];
            
            for(let x = 0; x < this.width; ++x) {
                // note: these will be some fromJSON function, properties
                // aren't going to be set like that - payload will be used

                // area
                const area = new AreaEntity();
                area.position.x = x;
                area.position.y = y;
                area.position.id = (y * this.width) + x;

                area.faction.owner = null;

                // note: this is a graphic component; no "place" fn yet impl.
                area.graphics.x = x * area.graphics.width;
                area.graphics.y = y * area.graphics.height;

                _areas.push(area);

                // token
                _tokens.push(null);
            }

            // add
            this.areas.push(_areas);
            this.tokens.push(_tokens);
        }

        return this;
    }

    /**
     * @public
     * @param {Number} dt 
     * @return {Array<*>}
     */
    tick = (dt) => {}
}

export {
    TheGame
};