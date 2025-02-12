import { AreaEntity } from '../../entities/area.js';
import { TokenEntity } from '../../entities/token.js';
import { BattlegroundEntity } from '../../entities/battleground.js';

import all_areas from './strategy/all_areas.js';
import all_tokens from './strategy/all_tokens.js';
import all from './strategy/all.js';

class SelectionSystem {
    /**
     * @type {BattlegroundEntity}
     */
    bg;

    /**
     * 
     * @param {BattlegroundEntity} bg 
     */
    constructor (bg) {
        this.bg = bg;

        this.all = all;
        this.all_areas = all_areas;
        this.all_tokens = all_tokens;
    }
}

export {
    SelectionSystem
};