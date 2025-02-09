import * as Pixi from 'pixi.js';
import { TheGame } from '../../game/game.js';
import { EntitySelection } from '../../game/selection/selection.js';
import { BattlegroundsScene } from './scene.js';

class BattlegroundsControls {
    // note: these may go somewhere else, like constants, etc...
    static #CoordinatesArgc = 2;

    /**
     * @type {BattlegroundsScene}
     */
    #scene;

    /**
     * @type {TheGame}
     */
    #game;

    /**
     * Coordinates cache. 
     * We need to gather two numbers x-axis coordinate and y-axis coordinate
     * in order to determine full target.
     * @type {[Number, Number]}
     */
    #coordinates;

    /**
     * Targets cache.
     * How many targets are needed depends on FIRST SELECTED target (token ON
     * area)
     * 
     * @type {Array<EntitySelection>}
     */
    #targets;

    /**
     * How many targets we need to gather before we can execute token's action.
     * Defaults to 2 - a default, generate action.
     * @type {Number}
     */
    #argc

    /**
     * @param {BattlegroundsScene} scene 
     */
    constructor (scene) {
        this.#scene = scene;
        this.#game = scene.game;

        this.#coordinates = [];
        this.#targets = [];
        this.#argc = TheGame.DefaultTokenActionArgc;
        
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
     * 
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
     * @returns {BattlegroundsControls} this
     */
    clear () {
        // dev: demonstration of graphical un-selection
        {
            this.#targets
            .forEach(target => {
                target.area.graphics.targeted(false);
            });
        }

        this.#coordinates = [];
        this.#targets = [];
        this.#argc = TheGame.DefaultTokenActionArgc;

        return this;
    }


    /**
     * @public
     * @param {Number} coordinate 
     * @returns {BattlegroundsControls} this
     */
    #on_partial_target = (coordinate) => {
        // do nothing until we get 2 coordinates - full target
        if(this
            .#coordinates
            .push(coordinate) !== BattlegroundsControls.#CoordinatesArgc
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
     * @param {Number} x
     * @param {Number} y
     * @returns {BattlegroundsControls} this
     */
    target = (x, y) => {
        const target = this.#game.target(x, y);
        if(target === null) {
            throw new Error();
        }
        
        // cache selected target
        this.#targets.push(target);

        // dev: demonstration of graphical selection
        {
            target.area.graphics.targeted(true);
        }

        // only targer target has been selected so far
        if(this.#targets.length === 1) {
            // and determine, how many targets are needed in order to
            // schedule an action

            // if first target doesn't contain a token, a default action
            // will be executed - meaning we need 2 targets...
            if(target.token == null) {
                this.#argc = TheGame.DefaultTokenActionArgc;
            } 
            // if first target contains a token - that token determines how many
            // other targets are needed
            else {
                this.#argc = target.token.argc;
            }
        }

        // argc could also be 1, or many...
        if(this.#targets.length !== this.#argc) {
            return this;
        }

        // we got everything that is needed for an action to be executed
        // . . .

        console.log('BattlegroundsControls.execute', this.#targets);

        return this.clear();
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
        
        // console.log('BattlegroundsControls.#on_pointer_down', event.target);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_enter = event => {
        //note: may serve only for the graphic-preview, not for the info display
        // . . .

        console.log('BattlegroundsControls.#on_pointer_enter', event.target);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_leave = event => {
        //note: may serve only for the graphic-preview, not for the info display
        // . . .

        console.log('BattlegroundsControls.#on_pointer_leave', event.target);
    }

}

export {
    BattlegroundsControls
};