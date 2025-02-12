import { BattlegroundEntity } from '../bg.js';
import { AreaEntity } from '../../../entities/area.js';
import { TokenEntity } from '../../../entities/token.js';

/**
 * Returns all AreaEntity and TokenEntity objects, iterated:
 * - from 0 to height
 * - from 0 to width
 * @this {BattlegroundEntity}
 * @return {Array<{area: AreaEntity, token: TokenEntity}>}
 */
function all () {
    const selections = [];

    for(let y = 0; y < this.height; ++y) {
        for(let x = 0; x < this.width; ++x) {
            selections.push(
                {
                    area: this.areas[y][x],
                    token: this.tokens[y][x]
                }
            )
        }
    }

    return selections;
}

/**
 * Returns all AreaEntity objects, iterated:
 * - from 0 to height
 * - from 0 to width
 * @this {BattlegroundEntity}
 * @returns {Array<AreaEntity>}
 */
function all_areas () {
    const selections = [];

    for(let y = 0; y < this.height; ++y) {
        for(let x = 0; x < this.width; ++x) {
            selections.push(
                this.areas[y][x]
            );
        }
    }

    return selections;
}

/**
 * Returns all TokenEntity objects, iterated:
 * - from 0 to height
 * - from 0 to width
 * @this {BattlegroundEntity}
 * @returns {Array<TokenEntity|null>}
 */
function all_tokens () {
    const selections = [];

    for(let y = 0; y < this.height; ++y) {
        for(let x = 0; x < this.width; ++x) {
            selections.push(
                this.tokens[y][x]
            );
        }
    }

    return selections;
}

export {
    all,
    all_areas,
    all_tokens
};