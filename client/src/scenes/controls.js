import * as Pixi from 'pixi.js';

import { BgScene } from './bg.js';
import { Target } from '../game/target.js';

class BgSceneControls {
    /**
     * In case of key-input, we need to get the coordinates first - which
     * area two numbers...
     * @type {[Number, Number]}
     */
    coordinates;

    /**
     * In order to perform an action, two targets have to be selected.
     * @type {[Target, Target]}
     */
    targets;
        
    /**
     * @type {BgScene}
     */
    scene;

    /**
     * @param {BgScene} scene 
     */
    constructor (scene) {
        this.coordinates = [];
        this.targets = [];

        this.scene = scene;
        this.scene.areas.children
        .forEach(
            area => {
                area
                .on('pointerdown', this.#on_pointer_down)
                .on('pointerenter', this.#on_pointer_enter)
                .on('pointerleave', this.#on_pointer_leave);
            }
        );

        window.addEventListener('keyup', this.#on_key_up);
    }

    /**
     * 
     * @returns {null}
     */
    destructor () {
        this.coordinates = [];

        window.removeEventListener('keyup', this.#on_key_up);
        
        this.scene.areas.children
        .forEach(
            area => {
                area.removeAllListeners()
            }
        );

        return null;
    }

    /**
     * @public
     * @param {Target} target 
     * @returns {BgSceneControls} this
     */
    target (target) {
        if(this.targets.push(target) !== 2) {

            this.scene.area(target.x, target.y).select(true);

            return this;
        }

        this.scene.game.command(
            this.targets[0],
            this.targets[1]
        );

        this.scene.area(this.targets[0].x, this.targets[0].y).select(false);

        this.clear();

        return this;
    }

    /**
     * @public
     * @param {Number} coordinate 
     * @returns {BgSceneControls} this
     */
    coordinate (coordinate) {
        if(this.coordinates.push(coordinate) !== 2) {
            return this;
        }

        this.target(
            new Target(
                this.coordinates[0],
                this.coordinates[1],
                null
            )
        );

        this.coordinates = [];

        return this;
    }

    /**
     * @returns {BgSceneControls} this
     */
    clear () {
        if(this.targets.length > 0) {
            this.scene.area(this.targets[0].x, this.targets[0].y).select(false);
        }

        this.targets = [];
        this.coordinates = [];

        return this;
    }

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    #on_key_up = event => {
        let key = event.key;

        if(key === 'Escape') {
            this.clear();

            return;
        }

        key = Number(key);
        if(Number.isNaN(key) === true) {
            return;
        }

        this.coordinate(key);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_down = event => {
        this.target(event.target.target);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_enter = event => {
        //console.log('BgSceneControls.#on_pointer_enter', event.target.target);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_leave = event => {
        //console.log('BgSceneControls.#on_pointer_leave', event.target.target);
    }
}

export {
    BgSceneControls
};