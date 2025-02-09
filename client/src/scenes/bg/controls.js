import * as Pixi from 'pixi.js';

import { BgScene } from './scene.js';
import { AreaModel } from '../../game/area/model.js';

class BgControls {
    /**
     * @type {BgScene}
     */
    scene;

    /**
     * @param {BgScene} scene 
     */
    constructor (scene) {
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
        this.scene.areas.children
        .forEach(
            area => {
                area.removeAllListeners()
            }
        );

        window.removeEventListener('keyup', this.#on_key_up);

        return null;
    }

    /**
     * @returns {BgControls} this
     */
    clear () {}

    /**
     * 
     * @param {KeyboardEvent} event 
     */
    #on_key_up = event => {}

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_down = event => {}

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_enter = event => {}

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_leave = event => {}
}

export {
    BgControls
};