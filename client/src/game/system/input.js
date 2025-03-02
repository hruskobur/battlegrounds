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
     * @type {GameZone}
     */
    cache_actor;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     * @param {GameCommander} commander 
     */
    constructor (events, state, commander) {
        super(events, state);

        this.commander = commander;
        this.cache_actor = null;

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
        this.cache_actor = null;

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

        // step 1: select actor
        if(targets.actor === null) {
            // first click
            if(this.cache_actor === null) {
                this.cache_actor = zone;

                this.events.emit(
                    GameState.Event.ActionInfo,
                    this.commander, zone
                );

                return;
            }

            // second click
            if(this.cache_actor !== null) {
                // same zone: we have the actor
                if(this.cache_actor === zone) {
                    this.cache_actor = null;
                    targets.actor = zone;

                    this.events.emit(
                        GameState.Event.InputActorSelected,
                        this.commander, zone
                    );

                    return;
                }
                // different zone: reset
                else {
                    this.cache_actor = zone;

                    this.events.emit(
                        GameState.Event.ActionInfo,
                        this.commander, zone
                    );

                    return;
                }
            }
        } 
        // step 2: select targets
        else {
            this.events.emit(
                GameState.Event.InputTargetSelected,
                this.commander, zone
            );
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
                this.cache_actor = null;

                this.events.emit(
                    GameState.Event.InputCanceled,
                    this.commander, null
                );

                return;
            }
            case 'Enter': {
                this.cache_actor = null;

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