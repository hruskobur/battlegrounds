import { AreaModel } from './area/model.js';
import { TokenModel } from './token/model.js';

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
     * @type {Array<Array<AreaModel>>}
     */
    areas;

    /**
     * @type {Array<Array<TokenModel>>}
     */
    tokens;

    // dev: seems that they are not needed here; that even binding in CTOR
    // keeps the signature intact ... let's see
    // target = Target.target;
    // check = Target.check;

    /**
     */
    constructor () {
        this.width = 0;
        this.height = 0;
        this.areas = [];
        this.tokens = [];

        this.target = target.bind(this);
        this.extend = extend.bind(this);
        this.path = path.bind(this);
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