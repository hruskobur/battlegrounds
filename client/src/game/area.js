import { PathEntity } from './path.js';

class AreaEntity {
    /**
     * @type {Number}
     */
    id;

    /**
     * @type {Number}
     */
    x;

    /**
     * @type {Number}
     */
    y;

    /**
     * @type {Map<Number, PathEntity>}
     */
    paths;

    /**
     * 
     * @param {Number} id 
     * @param {Number} x 
     * @param {Number} y 
     */
    constructor (id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;

        this.paths = new Map();
    }
}

export {
    AreaEntity
};