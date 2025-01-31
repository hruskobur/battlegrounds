import { Coordinate } from './game.js';
import { Game } from './game.js';

class GameSelection {
    /**
     * @type {Game}
     */
    game;

    /**
     * 
     * @param {Game} game 
     */
    constructor(game) {
        this.game = game;
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} e
     * @returns {Array<Coordinate>}
     */
    extend(x, y, e) {
        let xf = x - e;
        if (xf < Coordinate.WX_MIN) xf = Coordinate.WX_MIN;

        let xt = x + e;
        if (xt > Coordinate.WX_MAX) xt = Coordinate.WX_MAX;

        let yf = y - e;
        if (yf < Coordinate.WY_MIN) yf = Coordinate.WY_MIN;

        let yt = y + e;
        if (yt > Coordinate.WY_MAX) yt = Coordinate.WY_MAX;

        const coordinates = [];

        for (let y = yf; y <= yt; ++y) {
            for (let x = xf; x <= xt; ++x) {
                coordinates.push(
                    new Coordinate(x, y)
                );
            }
        }

        return coordinates;
    }

    /**
     * 
     * @param {Number} xf 
     * @param {Number} yf 
     * @param {Number} xt 
     * @param {Number} yt 
     * @returns {Array<Coordinate>}
     */
    path(xf, yf, xt, yt) {
        if (Coordinate.check(xf, yf) === false) {
            throw new Error(`coordinate (start) [${xf},${yf}] is out of bound`);
        }

        if (Coordinate.check(xt, yt) === false) {
            throw new Error(`coordinate (start) [${xt},${yt}] is out of bound`);
        }

        const DIRECTIONS = [
            // N
            [0, -1],
            // NE
            [1, -1],
            // E
            [1, 0],
            // SE
            [1, 1],
            // S
            [0, 1],
            // SW
            [-1, 1],
            // W
            [-1, 0],
            // NW
            [-1, -1]
        ];

        // targets
        const start = this.game.areas[yf][xf];
        if (start == null) {
            return [];
        }

        const end = this.game.areas[yt][xt];
        if (end == null) {
            return [];
        }

        const from = new Map().set(start, null);
        const queue = [start];

        while (queue.length > 0) {
            const current = queue.shift();
            if (current == null) {
                continue;
            }

            if (current === end) {
                const _path = [];
                let _current = end;

                while (_current) {
                    _path.push(_current);
                    _current = from.get(_current);
                }

                // dev
                console.log('result', _path);

                return _path;
            }

            for (const [dx, dy] of DIRECTIONS) {
                const nx = current.wx + dx;
                const ny = current.wy + dy;

                if (Coordinate.check(nx, ny) === false) {
                    continue;
                }

                const neighbor = this.game.areas[ny][nx];
                if (from.has(neighbor) === false) {
                    from.set(neighbor, current);
                    queue.push(neighbor)
                }
            }
        }

        return []; // No path found
    }


    /**
     * Iterates over areas, calling callback on each iteration.
     * @param {Function} cb (arg: Coordinate)
     */
    iterate_areas(cb) {
        for (let y = Coordinate.WY_MIN; y <= Coordinate.WY_MAX; ++y) {
            for (let x = Coordinate.WX_MIN; x <= Coordinate.WX_MAX; ++x) {
                cb(this.game.areas[y][x]);
            }
        }
    }
}

export {
    GameSelection
};