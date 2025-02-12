import { AreaEntity } from '../../../entities/area.js';
import { TokenEntity } from '../../../entities/token.js';

/**
 * Returns all AreaEntity and TokenEntity objects, iterated:
 * - from 0 to height
 * - from 0 to width
 * @this {SelectionSystem}
 * @return {Array<{area: AreaEntity, token: TokenEntity}>}
 */
function all () {
    const selections = [];

    for(let y = 0; y < this.bg.height; ++y) {
        for(let x = 0; x < this.bg.width; ++x) {
            selections.push(
                {
                    area: this.bg.areas[y][x],
                    token: this.bg.tokens[y][x]
                }
            )
        }
    }

    return selections;
}

export default all;