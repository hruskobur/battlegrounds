import { AreaModel } from '../area/model.js';
import { TokenModel } from '../token/model.js';

class TargetModel {
    /**
     * @type {AreaModel}
     */
    area;

    /**
     * @type {TokenModel}
     */
    token;

    /**
     * 
     * @param {AreaModel} area 
     * @param {TokenModel} token 
     */
    constructor (area, token) {
        this.area = area;
        this.token = token;
    }
}

export {
    TargetModel
};