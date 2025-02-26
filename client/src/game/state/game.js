import { RenderEntity } from '../entities/render.js';
import { GameScenario } from './scenario.js';
import { GameZone } from './zone.js';

import * as Iterator from './iterator.js';
import * as Query from './query.js';
import * as Check from './check.js';
import * as Event from './event.js';
import * as Init from './init.js';

/**
 * @class GameState
 * 
 * @description 
 * This class serves as an "archetype entity container" and global state 
 * manager. 
 * It organizes entities into specialized containers based on fixed 
 * compositions, allowing various systems to access data directly without
 * performing runtime entity-type checks.
 *
 * This specialized implementation intentionally forgoes the full flexibility of 
 * a generic ECS entity-component system, which means that while it is more 
 * performant and simpler to work with for our use-case, it may not support 
 * dynamic component compositions.
 */
class GameState {
    static Iterator = Iterator;
    static Query = Query;
    static Check = Check;
    static Event = Event.default;

    /**
     * @type {Number}
     */
    width;

    /**
     * @type {Number}
     */
    height;

    /**
     * @type {Array<Array<GameZone>>}
     */
    map;
  
    /**
     * @param {GameScenario} scenario 
     */
    constructor (scenario) {
        this.width = 0;
        this.height = 0;
        this.map = [];

        this.render = new RenderEntity();

        Init.map(this, scenario);
        Init.areas(this, scenario);
        Init.tokens(this, scenario);
    }
}

export {
    GameState
};