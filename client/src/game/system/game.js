import { BattlegroundEntity } from '../entities/battleground/bg.js';
import { BotControlSystem } from './control/bot.js';
import { PlayerControlSystem } from './control/player.js';
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
     * 
     * @param {EventEmitter} emitter 
     * @param {*} scenario 
     */
    constructor (emitter, scenario) {
        this.emitter = emitter;

        // ok, not very ECS-y ... this is basicaly a model, not an entity.
        this.bg = new BattlegroundEntity(scenario);
        this.player = new PlayerControlSystem(emitter, this.bg);
        this.bot = new BotControlSystem(emitter, this.bg);
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