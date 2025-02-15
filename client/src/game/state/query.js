import { GameState } from './game.js';
import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';

import { DirectionCoordinates, CoordinateLow} from './constant.js';

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
    for (let y = CoordinateLow; y < state.height; ++y) {
        for (let x = CoordinateLow; x < state.width; ++x) {
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

    const cost_total = new Map([
        // note: i am not decided yet, how to approach terrain-difficulty
        // counting:
        
        // ... when only journey to (closest) destination matters
        // [from, 0]

        // ... when also travelling through the starting area matters
        [from, from.terrain.difficulty]
    ]);
    const queue = [from];

    while (queue.length > 0) {
        queue.sort((a, b) => cost_total.get(a) - cost_total.get(b));
        
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

        for (let d = 0; d < DirectionCoordinates.length; ++d) {
            const direction = DirectionCoordinates[d];

            const nx = current.position.x + direction.x;
            const ny = current.position.y + direction.y;

            if (Check.walkable(state, nx, ny) === false) {
                continue;
            }

            const neighbor = state.areas[ny][nx];
            const nc = cost_total.get(current) + (neighbor.terrain.difficulty);

            if ((cost_total.has(neighbor) === true) 
            &&  (cost_total.get(neighbor) < nc)) {
                continue;
            }

            cost_total.set(neighbor, nc);
            predecessor.set(neighbor, current);
            
            if (queue.indexOf(neighbor) === -1) {
                queue.push(neighbor);
            }
        }
    }

    // Return an empty path if no route is found.
    return [];
}

export {
    iterator,
    path
};