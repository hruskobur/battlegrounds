import { AbilityEntity } from '../entities/ability.js';
import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';

class GameStateZone {
    /**
     * @type {AreaEntity}
     */
    area;

    /**
     * @type {TokenEntity}
     */
    token;

    /**
     * @type {AbilityEntity}
     */
    ability;

    constructor () {
        this.area = null;
        this.token = null;
        this.ability = null;
    }

    get position () {
        return this.area.position;
    }

    get commander () {
        return this.area.faction;
    }
}

export {
    GameStateZone
};