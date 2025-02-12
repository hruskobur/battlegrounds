import { AreaEntity } from '../area.js';
import { TokenEntity } from '../token.js';

import { all, all_areas, all_tokens } from './selection/all.js';
import { coordinate } from './selection/coordinate.js';

class BattlegroundEntity {
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

    /**
     * 
     * @param {*} scenario 
     */
    constructor (scenario) {
        this.all = all;
        this.all_areas = all_areas;
        this.all_tokens = all_tokens;
        this.coordinate = coordinate;
        
        this.width = 10;
        this.height = 10;

        this.areas = [];
        this.tokens = [];
        
        for(let y = 0; y < this.height; ++y) {
            const _areas = [];
            const _tokens = [];
            
            for(let x = 0; x < this.width; ++x) {
                const area = new AreaEntity().place(x, y);
                _areas.push(area);

                const token = null;
                _tokens.push(token);
            }

            this.areas.push(_areas);
            this.tokens.push(_tokens);
        }
    }

    /**
     * 
     * @param {Function} cb x, y, bg.areas[y][x], bg.tokens[y][x]
     * @returns {BattlegroundEntity} this
     */
    iterate = (cb) => {
        for(let y = 0; y < this.height; ++y) {
            for(let x = 0; x < this.width; ++x) {
                cb(
                    x, y,
                    this.areas[y][x], this.tokens[y][x]
                );
            }
        }
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Boolean}
     */
    check = (x, y) => {
        return (x >= 0 && x < this.width && y >= 0 && y < this.height);
    }
}

export {
    BattlegroundEntity
};