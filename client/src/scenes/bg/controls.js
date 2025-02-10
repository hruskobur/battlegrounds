import * as Pixi from 'pixi.js';
import { TheGame } from '../../game/game.js';
import { GameController } from '../../game/controller/game.js';
import { BattlegroundsScene } from './scene.js';

class PlayerControl extends GameController {
    // note: these may go somewhere else, like constants, etc...
    static #CoordinatesArgc = 2;

    /**
     * @type {BattlegroundsScene}
     */
    #scene;

    /**
     * Coordinates cache. 
     * We need to gather two numbers x-axis coordinate and y-axis coordinate
     * in order to determine full target.
     * @type {[Number, Number]}
     */
    #coordinates;

    /**
     * @param {BattlegroundsScene} scene 
     */
    constructor (scene) {
        super(scene.game);
        
        this.#coordinates = [];

        this.#scene = scene;
        this.#scene.areas.children
        .forEach(
            area => {
                area
                .on('pointerdown', this.#on_pointer_down)
                // dev: disabled until handling is needed & implemented
                // .on('pointerenter', this.#on_pointer_enter)
                // .on('pointerleave', this.#on_pointer_leave);
            }
        );

        window.addEventListener('keyup', this.#on_key_up);
    }

    /**
     * @override
     * @returns {null}
     */
    destructor () {
        this.#scene.areas.children
        .forEach(
            area => {
                area.removeAllListeners()
            }
        );

        window.removeEventListener('keyup', this.#on_key_up);

        return null;
    }

    /**
     * @returns {PlayerControl} this
     */
    clear () {
        super.clear();
       
        this.#coordinates = [];

        return this;
    }


    /**
     * @public
     * @param {Number} coordinate 
     * @returns {PlayerControl} this
     */
    #on_partial_target = (coordinate) => {
        // do nothing until we get 2 coordinates - full target
        if(this
            .#coordinates
            .push(coordinate) !== PlayerControl.#CoordinatesArgc
        ) {
            return this;
        }
        
        // target!
        this.target(
            this.#coordinates[0],
            this.#coordinates[1]
        );

        // targeting's done - clear the coordiantes cache
        this.#coordinates = [];
    }

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    #on_key_up = event => {
        let key = event.key;
        switch(key) {
            case 'Escape': {
                this.clear();
                break;
            }

            default: {
                key = Number(key);
                if(Number.isNaN(key) === true) {
                    break;
                }

                this.#on_partial_target(key);
                break;
            }
        }
        console.log('BattlegroundsControls.#on_key_up', event.key);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_down = event => {
        const pt = event.getLocalPosition(this.#scene.areas);

        this.target(
            Math.floor(pt.x / 72),
            Math.floor(pt.y / 72)
        );
        
        // console.log('PlayerControl.#on_pointer_down', event.target);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_enter = event => {
        //note: may serve only for the graphic-preview, not for the info display
        // . . .

        console.log('PlayerControl.#on_pointer_enter', event.target);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_leave = event => {
        //note: may serve only for the graphic-preview, not for the info display
        // . . .

        console.log('PlayerControl.#on_pointer_leave', event.target);
    }

}

export {
    PlayerControl
};