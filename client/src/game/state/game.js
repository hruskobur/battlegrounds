import { ScenarioEntity } from '../entities/scenario.js';
import { LayersEntity } from '../entities/layers.js';
import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';

import { CoordinateLow } from './constant.js';
import { PositionComponent } from '../components/position.js';

/**
 * @typedef {Object} GameStateZone
 * @property {AreaEntity} area
 * @property {TokenEntity|null} token
 */

/**
 * @typedef {Object} GameStateUpdateQueue
 * @property {Array<TokenEntity>} current
 * @property {Array<TokenEntity>} updated
 */

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
    static Event = Object.freeze({
        TokenCreated: 'token.created',
        TokenCancel: 'token.cancel',
        TokenDestroyed: 'token.destroyed'
    });

    /**
     * @type {ScenarioEntity}
     */
    scenario;

    /**
     * @type {Number}
     */
    width;

    /**
     * @type {Number}
     */
    height;

    /**
     * @type {Array<Array<GameStateZone>>}
     */
    zones;

    /**
     * @type {LayersEntity}
     */
    layer;

    /**
     * @type {GameStateUpdateQueue}
     */
    queue;

    /**
     * @param {ScenarioEntity} scenario 
     */
    constructor (scenario) {
        this.scenario = scenario;
        this.width = scenario.width;
        this.height = scenario.height;

        this.zones = [];
        {
            for(let y = 0; y < this.height; ++y) {
                const _zones = [];

                for(let x = 0; x < this.width; ++x) {
                    _zones.push(
                        {
                            area: null,
                            token: null
                        }
                    )
                }

                this.zones.push(_zones);
            }
        }

        this.layer = new LayersEntity();

        this.queue = {
            current: [],
            updated: []
        };
    }

    /**
     * @public
     * @param {PositionComponent} position
     * @returns {Boolean}
     */
    check (position) {
        const x = position.x;
        const y = position.y;

        return (
            x >= CoordinateLow
            && x < this.width
            && y >= CoordinateLow
            && y < this.height
        );
    }

    /**
     * @public
     * @param {PositionComponent} position
     * @returns {GameStateZone|null}
     */
    query (position) {
        const x = position.x;
        const y = position.y;

        if(x < CoordinateLow
           || x >= this.width
           || y < CoordinateLow
           || y >= this.height) {
            return null;
        }

        return this.zones[y][x];
    }

    /**
     * @public
     * @param {Function} cb GameStateZone, x, y, GameState
     */
    iterate (cb) {
        for (let y = CoordinateLow; y < this.height; ++y) {
            for (let x = CoordinateLow; x < this.width; ++x) {
                cb(
                    this.zones[y][x],
                    x, y,
                    this
                )
            }
        }
    }
}

export {
    GameState
};