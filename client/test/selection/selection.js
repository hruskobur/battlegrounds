import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';

class EntitySelection {
    /**
     * @type {AreaEntity}
     */
    area;

    /**
     * @type {TokenEntity}
     */
    token;

    /**
     * 
     * @param {AreaEntity} area 
     * @param {TokenEntity} token 
     */
    constructor (area, token) {
        this.area = area;
        this.token = token;
    }
}

export {
    EntitySelection
};