import { PositionComponent } from '../components/position.js';

class GridEntity {
    /**
     * @type {Number}
     */
    width;

    /**
     * @type {Number}
     */
    height;

    /**
     * @type {Array<Array<PositionComponent>>}
     */
    positions;

    /**
     * 
     */
    constructor () {
        this.width = 0;
        this.height = 0;

        this.positions = [];
    }
}

export {
    GridEntity
};