import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { GameZone } from '../state/zone.js';

class InputSystem extends SystemBase {
    /**
     * @type {GameZone}
     */
    actor;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.actor = null;

        GameState.Iterator.all(
            this.state,
            (zone, x, y, state) => {
                zone.area.renderable
                .on('pointerdown', this.#on_pointer_down)
                .on('pointerleave', this.#on_pointer_leave)
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
        GameState.Iterator.all(
            this.state,
            (zone, x, y, state) => {
                zone.area.renderable
                .removeAllListeners('pointerdown')
                .removeAllListeners('pointerleave')
                .removeAllListeners('pointerenter');
            }
        );

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
     * @returns {void}
     */
    #on_pointer_enter = event => {
        return;
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {void}
     */
    #on_pointer_leave = event => {
        return;
    }

    /**
     * @note let's do the ownership checks here, as InputSystem is responsible
     * for zone.area checks
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {void}
     */
    #on_pointer_down = event => {
        // note: no need for a check, because the event is emitted by
        // zone, that has to have correct corrinates
        const zone = GameState.Query.point(
            this.state,
            event.target.x, event.target.y
        );

        // note: this will be done more systematicaly, not by checking the 0
        const area = zone.area;
        if(area.stats.ownership != 0) {
            console.log('InputSystem.#on_pointer_down', 'cannot act as enemy');

            return;
        }

        const token = zone.token;
        if(token == null) {
            console.log('InputSystem.#on_pointer_down', 'no action available');

            return;
        }
        
        this.events.emit(GameState.Event.DEV_INPUT, token.action);

        return;
    }

    /**
     * @private
     * @param {KeyboardEvent} event 
     * @returns {void}
     */
    #on_key_up = event => {
        if(event.key === 'Escape') {
            this.clear();

            return;
        }
    }
}

export {
    InputSystem
}