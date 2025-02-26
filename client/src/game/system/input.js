import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { GridEntity } from '../entities/grid.js';

class InputSystem extends SystemBase {
    /**
     * @type {GridEntity}
     */
    actor;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.actor = null;

        GameState.Query.iterator(
            this.state,
            (x, y, area, token, state) => {
                area.renderable
                .on('pointerdown', this.#on_pointer_down)
                .on('pointerd', this.#on_pointer_leave)
                .on('pointerenter', this.#on_pointer_enter);
            }
        );

        window.addEventListener('keyup', this.#on_key_up);
    }

    /**
     * @public
     * @override
     * @returns {null}
     */
    destructor () {
        window.removeEventListener('keyup', this.#on_key_up);

        this.actor = null;

        return super.destructor();
    }

    /**
     * @public
     * @returns {InputSystem} this
     */
    clear () {
        return this;
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {InputSystem} this
     */
    #on_pointer_enter = event => {
        return this;
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {InputSystem} this
     */
    #on_pointer_leave = event => {
        return this;
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {InputSystem} this
     */
    #on_pointer_down = event => {
        return this;
    }

    /**
     * @private
     * @param {KeyboardEvent} event 
     * @returns {InputSystem} this
     */
    #on_key_up = event => {
        if(event.key === 'Escape') {
            this.clear();
        }

        return this;
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {Boolean}
     */
    input_select_actor = (x, y) => {
        if(this.actor !== null) {
            return true;
        }

        return false;
    }
}

export {
    InputSystem
}