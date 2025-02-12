import { BattlegroundEntity } from '../bg.js';
import { AreaEntity } from '../../../entities/area.js';
import { TokenEntity } from '../../../entities/token.js';

/**
 * @this {BattlegroundEntity}
 * @param {Number} x 
 * @param {Number} y 
 * @returns {{area: AreaEntity, token: TokenEntity}}
 */
function coordinate (x, y) {
    x = Math.floor(x / 72);
    y = Math.floor(y / 72);

    if(this.check(x, y) === false) {
        return null;
    }

    return {
        area: this.areas[y][x],
        token: this.tokens[y][x]
    };
}

export {
    coordinate
};