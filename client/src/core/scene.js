import { EventEmitter, message } from './emitter.js';
import * as Pixi from 'pixi.js';

class SceneBase {
    /**
     * Scene unique identifier.
     */
    static Id = '';

    /**
     * @type {Pixi.Container}
     */
    container;

    request = message;

    /**
     */
    constructor () {}

    /**
     * @virtual
     * @param {Pixi.Application} application
     * @param {EventEmitter} emitter 
     * @returns {SceneBase} this
     */
    on_create (application, emitter) {
        this.container = new Pixi.Container(
            {
                x: 0,
                y: 0,
                boundsArea: new Pixi.Rectangle(
                    0, 0,
                    application.renderer.width, application.renderer.height
                ),
                hitArea: new Pixi.Rectangle(
                    0, 0,
                    application.renderer.width, application.renderer.height
                )
            }
        );

        return this;
    }

    /**
     * @virtual
     * @param {Pixi.Application} application
     * @param {EventEmitter} emitter 
     * @returns {SceneBase} this
     */
    on_destroy (application, emitter) {
        this.container.destroy(
            {
                children: true
            }
        );
        this.container = null;
        
        this.model = null;

        return this;
    }
}

export {
    SceneBase
};
