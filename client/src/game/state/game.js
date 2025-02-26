import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';
import { RenderEntity } from '../entities/render.js';

import * as Init from './init.js';
import * as Iterator from './iterator.js';
import * as Query from './query.js';
import * as Check from './check.js';
import Event from './event.js';
import { GridEntity } from '../entities/grid.js';

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
    static Event = Event;

    /**
     * @type {*}
     */
    scenario;
    
    /**
     * @type {GridEntity}
     */
    grid;

    /**
     * @type {Array<Array<AreaEntity>>}
     */
    areas;

    /**
     * @type {Array<Array<TokenEntity>>}
     */
    tokens;

    /**
     * @type {RenderEntity}
     */
    render;
    
    /**
     * @param {*} scenario 
     */
    constructor (scenario) {
        this.scenario = scenario;

        this.grid = new GridEntity();
        this.areas = [];
        this.tokens = [];

        this.render = new RenderEntity();

        Init.grid(this);
        Init.areas(this);
        Init.tokens(this);
    }
}

export {
    GameState
};