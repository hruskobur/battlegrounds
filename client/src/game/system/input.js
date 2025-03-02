import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { InputCache } from './input/cache.js';
import { GameCommander } from '../state/types/commander.js';

class InputSystem extends SystemBase {
    /**
     * @type {InputCache}
     */
    cache;

    /**
     * @type {GameCommander}
     */
    commander;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     * @param {GameCommander} commander 
     */
    constructor (events, state, commander) {
        super(events, state);

        this.cache = new InputCache();
        this.commander = commander;

        GameState.Iterator.all(
            this.state,
            (zone, x, y, state) => {
                zone.area.renderable
                .on('pointerdown', this.#on_pointer_down)
                // .on('pointerleave', this.#on_pointer_leave)
                // .on('pointerenter', this.#on_pointer_enter)
                ;
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
                // .removeAllListeners('pointerdown')
                // .removeAllListeners('pointerleave')
                .removeAllListeners('pointerenter')
                ;
            }
        );

        this.cache = null;
        this.commander = null;

        return super.destructor();
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
        // note: no need for a coordinates check, because the event is emitted
        // by a zone, that has to have correct corrdinates
        const zone = GameState.Query.point(
            this.state,
            event.target.x, event.target.y
        );

        this.cache.selected = zone;

        this.events.emit(GameState.Event.InputSelected, zone, this.commander);

        return;
    }

    /**
     * @private
     * @param {KeyboardEvent} event 
     * @returns {void}
     */
    #on_key_up = event => {
        switch(event.key) {
            case 'Escape': {
                this.cache.selected = null;

                this.events.emit(GameState.Event.InputCanceled);

                return;
            }
            case 'Enter': {
                this.cache.selected = null;
                
                this.events.emit(GameState.Event.InputAccepted);

                return;
            }
            default: {
                return;
            }
        }
    }
}

export {
    InputSystem
}