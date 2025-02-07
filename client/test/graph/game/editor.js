import * as Pixi from 'pixi.js';
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
     * @param {Pixi} scene 
     */
    constructor (game, scene) {
        this.game = game;
    }

    /**
     * 
     * @param {Number} id 
     * @param {Number} x_world 
     * @param {Number} y_world 
     * @return {GameEditor} this
     */
    area_add (id, x_world, y_world) {
        if(this.game.areas.has(id) === true) {
            throw new Error();
        }

        this.game.areas.set(
            id,
            new AreaEntity(id, x_world, y_world)
        );

        this.game.paths.set(
            id,
            new Map()
        );

        return this;
    }

    /**
     * 
     * @param {Number} id_area 
     * @returns {GameEditor} this
     */
    area_rem (id_area) {
        const area = this.game.areas.get(id_area);
        if(area == null) {
            throw new Error();
        }

        // remove paths: TO area
        for(const ids_to of this.game.paths.get(id_area).keys()) {
            this.game.paths.get(ids_to).delete(id_area);
        }

        // remove paths: FROM area
        this.game.paths.delete(id_area);
  
        // remove area
        this.game.areas.delete(id_area);

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
        if(id_area_a === id_area_b) {
            throw new Error();
        }

        const area_a = this.game.areas.get(id_area_a);
        if(area_a == null) {
            throw new Error();
        }

        const area_b = this.game.areas.get(id_area_b);
        if(area_b == null) {
            throw new Error();
        }

        const path = new PathEntity(area_a, area_b, distance);
        
        this.game.paths.get(id_area_a).set(id_area_b, path);
        this.game.paths.get(id_area_b).set(id_area_a, path);

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

        this.game.paths.get(id_area_a).delete(id_area_b);
        this.game.paths.get(id_area_b).delete(id_area_a);

        return this;
    }

    /**
     * 
     * @param {Object} payload 
     * @returns {GameEditor} this
     */
    export (payload) {
        payload.areas = [];
        payload.paths = [];

        // areas
        for(const area of this.game.areas.values()) {
            payload.areas.push(
                [
                    area.id, 
                    area.x, area.y
                ]
            );
        }

        // paths
        {
            const exported_paths_cache = new Set();

            for(const paths of this.game.paths.values()) {
                for(const path of paths.values()) {
                    if(exported_paths_cache.has(path) === true) {
                        continue;
                    }

                    payload.paths.push(
                        [
                            path.a.id, path.b.id,
                            path.distance
                        ]
                    );

                    exported_paths_cache.add(path);
                }
            }
        }

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
        this.game.paths.clear();

        // areas
        payload.areas.forEach(
            area => {
                this.area_add(...area);
            }
        );

        // paths
        payload.paths.forEach(
            path => {
                this.path_add(...path);
            }
        );

        return this;
    }
}

export {
    GameEditor
};