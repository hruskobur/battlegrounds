import { PositionComponent } from '../components/position.js';
import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';

class GameZone {
    /**
     * @type {PositionComponent}
     */
    position;

    /**
     * @type {AreaEntity}
     */
    area;

    /**
     * @type {TokenEntity|null}
     */
    token;

    /**
     */
    constructor () {
        this.position = new PositionComponent(
            Number.MIN_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER
        );
        this.area = new AreaEntity();
        this.token = null;
    }
}

export {
    GameZone
};