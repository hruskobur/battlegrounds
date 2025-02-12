import { BattlegroundEntity } from '../entities/battleground.js';
import { BotControlSystem } from './control/bot.js';
import { PlayerControlSystem } from './control/player.js';
import { SelectionSystem } from './selection/selection.js';
import EventEmitter from 'eventemitter3';

class GameSystem {
    /**
     * @type {EventEmitter}
     */
    emitter;

    /**
     * @type {BattlegroundEntity}
     */
    bg;

    /**
     * @type {PlacementSystem}
     */
    placement;

    /**
     * @type {SelectionSystem}
     */
    selection;

    /**
     * 
     * @param {EventEmitter} emitter 
     * @param {*} scenario 
     */
    constructor (emitter, scenario) {
        this.emitter = emitter;

        this.bg = new BattlegroundEntity(scenario);
        this.selection = new SelectionSystem(emitter, this.bg);
        this.player = new PlayerControlSystem(emitter, this.bg, this.selection);
        this.bot = new BotControlSystem(emitter, this.bg, this.selection);
    }
    /**
     * @public
     * @param  {...any} payload 
     * @returns {GameSystem} this
     */
    execute = (...payload) => {
        console.log('GameSystem.execute', ...payload);

        return this;
    }

    /**
     * @public
     * @param {Number} dt 
     * @returns {GameSystem} this
     */
    tick = dt => {
        console.log('GameSystem.tick', dt);

        return this;
    }
}

export {
    GameSystem
};