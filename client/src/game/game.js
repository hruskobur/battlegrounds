import { AreaModel } from './area/model.js';
import { TokenModel } from './token/model.js';
import { TargetModel } from './target/model.js';

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
     * @type {Array<Array<AreaModel>>}
     */
    areas;

    /**
     * @type {Array<Array<TokenModel>>}
     */
    tokens;

    /**
     */
    constructor () {
        this.width = 0;
        this.height = 0;
        this.areas = [];
        this.tokens = [];
    }

    /**
     * @public
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Boolean}
     */
    check (x, y) {
        return (x >= 0 && x < this.width && y >= 0 && y < this.height);
    }

    /**
     * @public
     * @param {Number} x x-axis coordinate
     * @param {Number} y y-axis coordinate
     * @returns {TargetModel|null}
     */
    target (x, y) {
        if(this.check(x, y) === false) {
            return null;
        }

        return new TargetModel(
            this.areas[y][x],
            this.tokens[y][x]
        );
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
                const area = new AreaModel();
                area.position.x = x;
                area.position.y = y;
                area.position.id = (y * this.width) + x;
                area.ownership = null;

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