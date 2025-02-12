import EventEmitter from 'eventemitter3';
import { AreaEntity } from '../../entities/area.js';
import { TokenEntity } from '../../entities/token.js';
import { BattlegroundEntity } from '../../entities/battleground.js';

import { all, all_areas, all_tokens } from './strategy/all.js';
import { coordiante } from './strategy/coordinate.js';

class SelectionSystem {
    /**
     * @type {EventEmitter}
     */
    emitter;

    /**
     * @type {BattlegroundEntity}
     */
    bg;

    /**
     * @param {EventEmitter} emitter 
     * @param {BattlegroundEntity} bg 
     */
    constructor (emitter, bg) {
        this.emitter = emitter;
        this.bg = bg;

        this.all = all;
        this.all_areas = all_areas;
        this.all_tokens = all_tokens;
        this.coordinate = coordiante;
    }
}

export {
    SelectionSystem
};