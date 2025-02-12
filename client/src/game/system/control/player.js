import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { BattlegroundEntity } from '../../entities/battleground.js';
import { SelectionSystem } from '../selection/selection.js';

class PlayerControlSystem {
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

        this.bg.iterate(
            (x, y, area, token) => {
                area.sprite
                .on('pointerdown', this.#on_pointer_down)
                .on('pointerenter', this.#on_pointer_enter)
                .on('pointerleave', this.#on_pointer_leave);
            }
        )
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_enter = event => {
        const selection = this.selection.coordinate(
            event.target.x,
            event.target.y
        );

        // dev: just to demo the selection
        selection.area.select(true);

        console.log('PlayerSystem.#on_pointer_enter', selection);
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_leave = event => {
        const selection = this.selection.coordinate(
            event.target.x,
            event.target.y
        );

        // dev: just to demo the un-selection
        selection.area.select(false);

        console.log('PlayerSystem.#on_pointer_enter', selection);
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_down = event => {
        const selection = this.selection.coordinate(
            event.target.x,
            event.target.y
        );

        console.log('PlayerSystem.#on_pointer_enter', selection);
    }

    /**
     * @private
     * @param {KeyboardEvent} event 
     */
    #on_key_up = event => {

    }
}

export { 
    PlayerControlSystem
};