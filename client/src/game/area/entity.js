import { AreaPosition } from './position.js';
import { AreaOwnership } from './ownership.js';
import { AreaGraphics } from './graphic.js';

class AreaEntity {
    /**
     * @type {AreaPosition}
     */
    position;

    /**
     * @type {AreaOwnership}
     */
    ownership;

    /**
     * @type {AreaGraphics} 
     */
    graphics;

    constructor () {
        this.position = new AreaPosition();
        this.ownership = new AreaOwnership();
        this.graphics = new AreaGraphics();
    }
}

export {
    AreaEntity,
    AreaPosition, AreaOwnership, AreaGraphics
};