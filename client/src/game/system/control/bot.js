import EventEmitter from 'eventemitter3';
import { BattlegroundEntity } from '../../entities/battleground/bg.js';

class BotControlSystem {
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
     * @param {BattlegroundEntity} bg 
     */
    constructor (emitter, bg) {
        this.emitter = emitter;
        this.bg = bg;
    }
}

export { 
    BotControlSystem
};