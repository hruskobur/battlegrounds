import { Coordinate } from '../types/coordinate.js';
import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';

class GameStateZone {
    /**
     * @type {Coordinate}
     */
    position;

    /**
     * @type {AreaEntity}
     */
    area;

    /**
     * @type {TokenEntity}
     */
    token;
}

export {
    GameStateZone
};