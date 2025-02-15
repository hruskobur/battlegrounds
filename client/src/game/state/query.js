import { GameState } from './game.js';
import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';

import * as Constant from './constant.js';

// note: this will tightly couple the Check & Query modules
// but since they are just a readability-extensions in the first place,
// thats completly OK
import * as Check from './check.js';

/**
 * Iterates over areas and tokens of the provided game state.
 * Note that this function REQUIRES already initialized game state.
 * @public
 * @param {GameState} state 
 * @param {Function} cb x, y, area, token, state
 */
function iterator(state, cb) {
    for (let y = 0; y < state.height; ++y) {
        for (let x = 0; x < state.width; ++x) {
            cb(
                x, y, 
                state.areas[y][x],
                state.tokens[y][x],
                state
            );
        }
    }
}

/**
 * @param {GameState} state 
 * @param {Number} fx
 * @param {Number} fy
 * @param {Number} tx
 * @param {Number} ty
 * @returns {Array<AreaEntity>}
 */
function path(state, fx, fy, tx, ty) {
    const from = state.areas[fy][fx];
    const to = state.areas[ty][tx];

    const predecessor = new Map();
    const visited = new Set( [from] );
    const queue = [from];

    while (queue.length > 0) {
        const current = queue.shift();
        if (current === to) {
            
            const path = [];
            
            let area = current;
            while (area) {
                path.push(area);
                area = predecessor.get(area) || null;
            }

            return path.reverse();
        }

        for(let d = 0; d < Constant.DirectionCoordinates.length; ++d) {
            const direction = Constant.DirectionCoordinates[d];

            const nx = current.position.x + direction.x;
            const ny = current.position.y + direction.y;

            if(Check.walkable(state, nx, ny) === false) {
                continue;
            }

            const neighbor = state.areas[ny][nx];

            if(visited.has(neighbor) === false) {
                predecessor.set(neighbor, current);
                visited.add(neighbor);
                queue.push(neighbor);
            }
        }
    }

    return [];
}

export {
    iterator,
    path
};