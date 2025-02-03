import { AreaEntity } from './area.js';

class PathEntity {
    /**
     * @param {AreaEntity} a 
     * @param {AreaEntity} b 
     * @param {Number} distance 
     */
    constructor (a, b, distance) {
        this.a = a;
        this.b = b;
        this.distance = distance;
    }
}

export {
    PathEntity
};