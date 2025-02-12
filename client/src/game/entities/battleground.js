import { AreaEntity } from './area.js';
import { TokenEntity } from './token.js';

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

    constructor () {
        this.width = 0;
        this.height = 0;
        this.areas = [];
        this.tokens = [];
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