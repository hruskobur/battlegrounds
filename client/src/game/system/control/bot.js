import EventEmitter from 'eventemitter3';
import { BattlegroundEntity } from '../../entities/battleground.js';
import { SelectionSystem } from '../selection/selection.js';

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
     * @type {SelectionSystem}
     */
    selection;
    
    /**
     * 
     * @param {EventEmitter} emitter 
     * @param {BattlegroundEntity} bg 
     * @param {SelectionSystem} selection
     */
    constructor (emitter, bg, selection) {
        this.emitter = emitter;
        this.bg = bg;
        this.selection = selection;
    }
}

export { 
    BotControlSystem
};