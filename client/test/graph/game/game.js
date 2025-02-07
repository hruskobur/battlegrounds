import { AreaEntity } from './area.js';
import { PathEntity } from './path.js';

class Game {
    /**
     * @type {Map<Number, AreaEntity>}
     */
    areas;

    /**
     * @type {Map<Number, Map<Number, PathEntity>>}
     */
    paths;

    constructor () {
        this.areas = new Map();
        this.paths = new Map();
    }

    /**
     * 
     * @returns {Array<AreaEntity>}
     */
    get_areas () {
        return Array.from(this.areas.values());
    }

    /**
     * 
     * @returns {Array<PathEntity>}
     */
    get_paths () {
        const traversed = new Set();
        
        for (const paths of this.paths.values()) {
            for (const path of paths.values()) {
                if (paths.has(path) === true) {
                    continue;
                }
    
                traversed.add(path);
            }
        }

        return Array.from(traversed);
    }
}

export {
    Game
};