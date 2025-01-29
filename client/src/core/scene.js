import Emitter from './emitter.js';
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

    /**
     */
    constructor () {
    }

    /**
     * @public
     * @param {String} request 
     * @param  {...any} payload 
     */
    message (request, ...payload) {
        Emitter.emit(request, ...payload);
    }

    /**
     * @virtual
     * @param {Pixi.Application} application
     * @returns {Scene} this
     */
    on_create (application) {
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
     * @returns {SceneBase} this
     */
    on_destroy (application) {
        this.container.destroy(
            {
                children: true
            }
        );
        this.container = null;
        
        this.model = null;

        return this;
    }
    
    on_resize (w, h, r) {
        this.container.boundsArea = new Pixi.Rectangle(
            0, 0, w, h
        );
        this.container.hitArea = new Pixi.Rectangle(
            0, 0, w, h
        );
        this.container.scale.set(
            w / 1920,
            h / 1920
        );
    }
}

export {
    SceneBase
};
