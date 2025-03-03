import { Coordinate } from '../../types/coordinate.js';

class CommanderTargetComponent {
    /**
     * @type {Coordinate}
     */
    token;

    /**
     * @type {Array<Coordinate>}
     */
    zones;

    constructor () {
        this.token = null;
        this.zones = null;
    }
}

export {
    CommanderTargetComponent
};