import { GameZone } from '../../state/types/zone.js';

class InputCache {
    /**
     * @type {GameZone|null}
     */
    selected;

    /**
     * @ignore
     * Partial coordinate: x-axis
     * @type {Number}
     */
    partial_x;
    
    /**
    * @ignore
    * Partial coordinate: y-axis
    * @type {Number} 
    */
   partial_y;

    constructor () {
        this.selected = null;
        this.partial_x = null;
        this.partial_y = null;
    }
}

export {
    InputCache
};