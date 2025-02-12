import { TokenEntity } from '../../../entities/token.js';
import { SelectionSystem } from '../selection.js';

/**
 * Returns all TokenEntity objects, iterated:
 * - from 0 to height
 * - from 0 to width
 * @this {SelectionSystem}
 * @returns {Array<TokenEntity|null>}
 */
function all_tokens () {
    const selections = [];

    for(let y = 0; y < this.bg.height; ++y) {
        for(let x = 0; x < this.bg.width; ++x) {
            selections.push(
                this.bg.tokens[y][x]
            );
        }
    }

    return selections;
}

export default all_tokens;