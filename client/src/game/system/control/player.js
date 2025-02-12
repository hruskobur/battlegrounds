import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { BattlegroundEntity } from '../../entities/battleground/bg.js';

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
     * 
     * @param {EventEmitter} emitter 
     * @param {BattlegroundEntity} bg 
     */
    constructor (emitter, bg) {
        this.emitter = emitter;
        this.bg = bg;

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
        const selection = this.bg.coordinate(
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
        const selection = this.bg.coordinate(
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
        const selection = this.bg.coordinate(
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