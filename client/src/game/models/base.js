import {  } from './base.js';

class ModelBase {
    /**
     * @type {Number}
     */
    x;

    /**
     * @type {Number}
     */
    y;

    /**
     * @type {Number}
     */
    id;

    /**
     * @type {Number}
     */
    owner;

    constructor () {
        this.x = 0;
        this.y = 0;
        this.id = 0;
        this.owner = null;
    }
}

export {
    ModelBase
};