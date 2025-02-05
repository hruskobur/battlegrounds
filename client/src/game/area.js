import * as Pixi from 'pixi.js';

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
     * @type {Pixi.Container}
     */
    graphics;

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

        this.graphics = new Pixi.Container();
    }

    draw () {

    }
}

export {
    AreaEntity
};