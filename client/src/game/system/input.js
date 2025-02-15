import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { GameState } from '../state/game.js';

class InputSystem {
    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        this.events = events;
        this.state = state;

        GameState.Query.iterator(
            this.state,
            (x, y) => {
                this.state.areas[y][x].renderable
                .on('pointerdown', this.#on_pointer_down)
                // dev: disabled until really needed
                // .on('pointerleave', this.#on_pointer_leave)
                // .on('pointerenter', this.#on_pointer_enter)
                ;
            }
        )
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_enter = event => {
        console.log('InputSystem.#on_pointer_enter', event.target);
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_leave = event => {
        console.log('InputSystem.#on_pointer_leave', event.target);
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_down = event => {
        // dev: just a workaround to finalize input-idea
        // will be queried through GameState.Query
        const x = Math.floor(event.target.x / 72);
        const y = Math.floor(event.target.y / 72);

        console.log('InputSystem.#on_pointer_down', this.state.areas[y][x]);

        this.events.emit('token.create', x, y);
    }
}

export {
    InputSystem
}