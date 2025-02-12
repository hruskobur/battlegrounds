import { SelectionSystem } from '../selection.js';
import { AreaEntity } from '../../../entities/area.js';
import { TokenEntity } from '../../../entities/token.js';

/**
 * @this {SelectionSystem}
 * @param {Number} x 
 * @param {Number} y 
 * @returns {{area: AreaEntity, token: TokenEntity}}
 */
function coordiante (x, y) {
    x = Math.floor(x / 72);
    y = Math.floor(y / 72);

    if(this.bg.check(x, y) === false) {
        return null;
    }

    return {
        area: this.bg.areas[y][x],
        token: this.bg.tokens[y][x]
    };
}

export {
    coordiante
};