import { AreaEntity } from '../area/entity.js';
import { TokenEntity } from '../token/entity.js';

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