import { CoordinateLow, Coordinate } from '../types/coordinate.js';
import { ScenarioEntity } from '../entities/scenario.js';
import { LayersEntity } from '../entities/layers.js';
import { CommanderEntity } from '../entities/commander.js';
import { FactionComponent } from '../components/faction.js';
import { GameStateZone } from './zone.js';
import anime from 'animejs';
// import { GameStateAbilityQueue } from './queue.js';

/**
 * @callback GameStateZoneIterator
 * @param {GameStateZone} zone
 * @param {Number} x
 * @param {Number} y
 * @param {GameState} state
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
        AreaFactionChanged: 'area.faction'
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
     * @type {[FactionComponent, FactionComponent]}
     */
    factions;

    /**
     * @type {Array<Array<GameStateZone>>}
     */
    zones;

    /**
     * @type {LayersEntity}
     */
    layer;

    // /**
    //  * @type {GameStateAbilityQueue}
    //  */
    // queue;

    /**
     * @type {Array<anime.AnimeInstance>}
     */
    animations;

    /**
     * @type {CommanderEntity}
     */
    player;

    /**
     * @type {CommanderEntity}
     */
    bot;


    /**
     * @param {ScenarioEntity} scenario 
     */
    constructor (scenario) {
        // note: the "system" entities
        this.layer = new LayersEntity();
        // this.queue = new GameStateAbilityQueue();
        this.animations = [];

        // todo: belongs to the scenario entity
        this.scenario = scenario;
        this.width = scenario.width;
        this.height = scenario.height;
        this.factions = [
            new FactionComponent(0, 'good guys', 'blue'),
            new FactionComponent(1, 'bad guys', 'red')
        ];

        // note: the "model" entities
        this.zones = [];
        for(let y = 0; y < this.height; ++y) {
            const _zones = [];
            for(let x = 0; x < this.width; ++x) {
                _zones.push(new GameStateZone());
            }
            this.zones.push(
                _zones
            );
        }

        this.player = new CommanderEntity();
        this.player.faction = this.factions[0];
        this.player.description.name = 'player';

        this.bot = new CommanderEntity();
        this.bot.faction = this.factions[1];
        this.bot.description.name = 'bot';
    }

    /**
     * @public
     * @param {Number} x 
     * @param {Number} y
     * @returns {Boolean}
     */
    check (x, y) {
        return (
            x >= CoordinateLow
            && x < this.width
            && y >= CoordinateLow
            && y < this.height
        );
    }

    /**
     * @public
     * @param {Number} x 
     * @param {Number} y 
     * @returns {GameStateZone|null}
     */
    query (x, y) {
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
     * @param {GameStateZoneIterator} cb
     */
    iterate (cb) {
        for (let y = CoordinateLow; y < this.height; ++y) {
            for (let x = CoordinateLow; x < this.width; ++x) {
                cb(
                    this.zones[y][x],
                    x, y,
                    this
                );
            }
        }
    }
}

export {
    GameState
};