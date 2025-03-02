import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { GameCommander } from '../state/types/commander.js';
import { GameZone } from '../state/types/zone.js';

/**
 * @class The input system for the player commander.
 * @note Bot input system will be implemented differently/
 */
class InputSystem extends SystemBase {
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

        // todo: rework all this selection logic below to separate handler class
        const targets = this.commander.targets;

        // first click: actor == null & targets == null
        if(targets.actor === null) {
            this.events.emit(
                GameState.Event.ActionInfo,
                this.commander, zone
            );

            targets.actor = zone;
            targets.targets = null;

            return;
        }
        // second click
        else {
            // targets == null
            if(targets.targets == null) {
                // actor == zone -> we got our actor
                if(targets.actor === zone) {
                    // IMPORTANT: yes, reset here
                    // so far, these were used as a cache only
                    // now, they will be set correctly, and as for the selection
                    // only commadner and zone argumetns are needed
                    // (and we got them from the event here)
                    // do the (cache) reset and provide those instead
                    targets.actor = null;
                    targets.targets = null;

                    this.events.emit(
                        GameState.Event.InputActorSelected,
                        this.commander, zone
                    );
    
                    return;
                } 
                // actor != zone -> first selection again
                else {
                    this.events.emit(
                        GameState.Event.ActionInfo,
                        this.commander, zone
                    );
    
                    targets.actor = zone;
                    targets.targets = null;
    
                    return;
                }
            } 
            // targets != null
            else {
                this.events.emit(
                    GameState.Event.InputTargetSelected,
                    this.commander, zone
                );
            }
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
                this.events.emit(
                    GameState.Event.InputCanceled,
                    this.commander, null
                );

                return;
            }
            case 'Enter': {
                this.events.emit(
                    GameState.Event.InputAccepted,
                    this.commander, null
                );

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