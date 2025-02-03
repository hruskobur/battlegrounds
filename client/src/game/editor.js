import { AreaEntity } from './area.js';
import { Game } from './game.js';
import { PathEntity } from './path.js';

class GameEditor {
    /**
     * @type {Game}
     */
    game;

    /**
     * 
     * @param {Game} game 
     */
    constructor (game) {
        this.game = game;
    }

    /**
     * 
     * @param {Number} id 
     * @param {Number} x 
     * @param {Number} y 
     * @return {GameEditor} this
     */
    area_add (id, x, y) {
        if(this.game.areas.has(id) === true) {
            throw new Error();
        }

        this.game.areas.set(
            id,
            new AreaEntity(id, x, y)
        );

        return this;
    }

    /**
     * 
     * @param {Number} id 
     * @returns {GameEditor} this
     */
    area_rem (id) {
        const area = this.game.areas.get(id);
        if(area == null) {
            throw new Error();
        }

        for(const path of area.paths.values()) {
            path.a.paths.delete(path.b.id);
            path.b.paths.delete(path.a.id);
        };

        this.game.areas.delete(id);

        return this;
    }

    /**
     * 
     * @param {Number} id_area_a 
     * @param {Number} id_area_b 
     * @param {Number} distance 
     * @returns {GameEditor} this
     */
    path_add (id_area_a, id_area_b, distance=1000) {
        const area_a = this.game.areas.get(id_area_a);
        if(area_a == null) {
            throw new Error();
        }

        const area_b = this.game.areas.get(id_area_b);
        if(area_b == null) {
            throw new Error();
        }

        const path = new PathEntity(area_a, area_b, distance);

        area_a.paths.set(id_area_b, path);
        area_b.paths.set(id_area_a, path);

        return this;
    }

    /**
     * 
     * @param {Number} id_area_a 
     * @param {Number} id_area_b 
     * @returns {GameEditor} this
     */
    path_rem (id_area_a, id_area_b) {
        const area_a = this.game.areas.get(id_area_a);
        if(area_a == null) {
            throw new Error();
        }

        const area_b = this.game.areas.get(id_area_b);
        if(area_b == null) {
            throw new Error();
        }

        area_a.paths.delete(id_area_b);
        area_b.paths.delete(id_area_a);

        return this;
    }

    /**
     * 
     * @param {Object} payload 
     * @returns {GameEditor} this
     */
    export (payload) {
        const areas = [];
        const paths = [];

        // areas
        for(const area of this.game.areas.values()) {
            areas.push(
                {
                    id: area.id,
                    x: area.x,
                    y: area.y
                }
            );
        }

        // paths
        {
            const exported_paths_cache = new Set();

            for(const area of this.game.areas.values()) {
                for(const path of area.paths.values()) {
                    paths.push(
                        {
                            a: path.a.id,
                            b: path.b.id,
                            distance: path.distance
                        }
                    );

                    exported_paths_cache.add(path);
                }
            }
        }

        // export
        payload.areas = areas;
        payload.paths = paths;

        return this;
    }

    /**
     * 
     * @param {Object} payload 
     * @returns {GameEditor} this
     */
    import (payload) {
        // clear
        this.game.areas.clear();

        // areas
        payload.areas.forEach(
            area => {
                this.area_add(
                    area.id, area.x, area.y
                );
            }
        );

        // paths
        payload.paths.forEach(
            path => {
                this.path_add(
                    path.a, path.b, path.distance
                );
            }
        );

        return this;
    }
}

export {
    GameEditor
};