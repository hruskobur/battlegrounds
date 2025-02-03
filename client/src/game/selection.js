import { AreaEntity } from './area.js';
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
     * @param {Number} from 
     * @param {Number} to 
     * @returns {Array<AreaEntity>}
     */
    path(from, to) {
        const areas = this.game.areas;

        const area_from = areas.get(from);
        if(area_from == null) {
            return [];
        }
        
        const area_to = areas.get(to);
        if(area_to == null) {
            return [];
        }

        const distances = new Map();
        const previous = new Map();
        const unvisited = new Set();

        for (const [id, area] of areas) {
            distances.set(id, Infinity);
            unvisited.add(area);
        }

        distances.set(from, 0);

        while (unvisited.size > 0) {
            let current = null;
            let min_distance = Infinity;
            for (const area of unvisited) {
                const d = distances.get(area.id);
                if (d < min_distance) {
                    min_distance = d;
                    current = area;
                }
            }

            if (min_distance === Infinity || current === null) {
                break;
            }

            if (current.id === to) {
                break;
            }

            unvisited.delete(current);

            for (const [neighborId, path_entity] of current.paths) {
                const neighbor = areas.get(neighborId);
                if (!unvisited.has(neighbor)) {
                    continue;
                }

                const alt_distance = distances.get(current.id) + path_entity.distance;
                if (alt_distance < distances.get(neighborId)) {
                    distances.set(neighborId, alt_distance);
                    previous.set(neighborId, current);
                }
            }
        }

        const path = [];
        let currentArea = area_to;
        while (currentArea) {
            path.unshift(currentArea);
            currentArea = previous.get(currentArea.id);
        }

        if (path.length === 0 || path[0].id !== from) {
            return { distance: Infinity, path: [] };
        }

        return { distance: distances.get(to), path };
    }
}

export {
    GameSelection
};