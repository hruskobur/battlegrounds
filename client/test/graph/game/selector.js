import { AreaEntity } from './area.js';
import { Game } from './game.js';
import { PathEntity } from './path.js';

class GameSelector {
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
     * @param {Number} from 
     * @param {Number} to 
     * @returns {Array<AreaEntity>}
     */
    areas_in_shortest_path(from, to) {
        const area_from = this.game.areas.get(from);
        if (area_from == null) {
            return {
                distance: Infinity,
                path: []
            };
        }
        const area_to = this.game.areas.get(to);
        if (area_to == null) {
            return {
                distance: Infinity,
                path: []
            };
        }

        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set();

        for (const [id, area] of this.game.areas.entries()) {
            distances.set(id, Infinity);
            unvisited.add(area);
        }

        distances.set(from, 0);

        while (unvisited.size > 0) {
            let current = null;
            let distance_min = Infinity;

            for (const area of unvisited) {
                const d = distances.get(area.id);
                if (d < distance_min) {
                    distance_min = d;
                    current = area;
                }
            }

            if (distance_min === Infinity || current === null) {
                break;
            }

            if (current.id === to) {
                break;
            }

            unvisited.delete(current);

            const neighbours = this.game.paths.get(current.id);
            for (const [area_id, path] of neighbours.entries()) {
                const neighbor = this.game.areas.get(area_id);
                if (unvisited.has(neighbor) === false) {
                    continue;
                }

                const distance_alt = distances.get(current.id) + path.distance;
                if (distance_alt < distances.get(area_id)) {
                    distances.set(area_id, distance_alt);
                    previous.set(area_id, current);
                }
            }
        }

        const path = [];
        let area_it = area_to;
        while (area_it) {
            path.unshift(area_it);
            area_it = previous.get(area_it.id);
        }

        if (path.length === 0 || path[0].id !== from) {
            return {
                distance: Infinity,
                path: []
            };
        }

        return {
            distance: distances.get(to),
            path
        };
    }

    /**
     * @returns {Array<PathEntity>}
     */
    paths() {
        const traversed = new Set();

        for (const paths of this.game.paths.values()) {
            for (const path of paths.values()) {
                if (paths.has(path) === true) {
                    continue;
                }

                traversed.add(path);
            }
        }

        return Array.from(traversed);
    }

    /**
     * 
     * @param {Number} from 
     * @param {Number} range 
     * @returns {Array<AreaEntity>}
     */
    areas_in_range(from, range) {
        const area_from = this.game.areas.get(from);
        if (area_from == null) {
            return [];
        }

        const visited = new Set(
            [
                area_from.id
            ]
        );

        const result = new Set(
            [
                area_from
            ]
        );

        let current_level = [
            area_from
        ];

        for (let r = 1; r <= range; r++) {
            const next_level = [];

            for (const area of current_level) {
                const neighbour_paths = this.game.paths.get(area.id);
                if (!neighbour_paths) {
                    continue;
                }

                for (const [neighbour_id, path] of neighbour_paths.entries()) {
                    if (visited.has(neighbour_id) === true) {
                        continue;
                    }

                    visited.add(neighbour_id);

                    const neighbour_area = this.game.areas.get(neighbour_id);
                    if (neighbour_area != null) {
                        result.add(neighbour_area);
                        next_level.push(neighbour_area);
                    }
                }
            }

            if (next_level.length === 0) {
                break;
            }

            current_level = next_level;
        }

        return Array.from(result);
    }
}

export {
    GameSelector
};