import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { CommanderEntity } from '../entities/commander.js';
import { PlayerControlSelection } from './control/selection.js';
import cancel from './control/cancel.js';
/**
 * @class The input system for the player commander.
 * @note Bot input system will be implemented differently/
 */
class PlayerControlSystem extends SystemBase {
    /**
     * Commander controled by this control system.
     * @type {CommanderEntity}
     */
    commander;

    /**
     * @type {PlayerControlSelection}
     */
    selection;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.commander = state.player;
        
        this.selection = new PlayerControlSelection();
        
        this.cancel = cancel;

        this.state.iterate(
            (zone, x, y) => {
                zone.area.renderable
                .on('pointerdown', this.#on_pointer_down);
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
        
        this.state.iterate(
            (zone, x, y) => {
                zone.area.renderable
                .removeAllListeners('pointerdown', this.#on_pointer_down);
            }
        );

        this.commander = null;

        this.selection.reset();
        this.selection = null;

        this.cancel = null;

        return super.destructor();
    }


    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {void}
     */
    #on_pointer_down = event => {
        const zone = this.state.query(
            Math.floor(event.target.x / 72),
            Math.floor(event.target.y / 72)
        );
        
        if(zone == null) {
            return;
        }

        if(this.selection.select(zone) === true) {
            this.events.emit(
                GameState.Event.ActionSchedule,
                this.selection.target
            );
            
            this.selection.reset();
        }
    }

    
    /**
     * @private
     * @param {KeyboardEvent} event 
     * @returns {void}
     */
    #on_key_up = event => {
        switch(event.key) {
            case 'Escape': {
                this.cancel();

                return;
            }
            default: {
                return;
            }
        }
    }
}

export {
    PlayerControlSystem
}