import { GameScenario } from './types/scenario.js';
import { GameZone } from './types/zone.js';
import { GameLayers } from './types/layers.js';
import { GameActions } from './types/actions.js';
import { GameCommander } from './types/commander.js';

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
    zones;

    /**
     * @type {GameLayers}
     */
    layer;

    /**
     * @type {GameActions}
     */
    actions;

    /**
     * @type {GameCommander}
     */
    player;

    /**
     * @type {GameCommander}
     */
    bot;

    /**
     * @param {GameScenario} scenario 
     */
    constructor (scenario) {
        this.width = 0;
        this.height = 0;
        
        this.zones = [];
        this.layer = new GameLayers();
        this.actions = new GameActions();

        this.player = new GameCommander();
        this.bot = new GameCommander();

        Init.map(this, scenario);
        Init.areas(this, scenario);
        Init.tokens(this. scenario);
        Init.commanders(this, scenario);
    }
}

export {
    GameState
};