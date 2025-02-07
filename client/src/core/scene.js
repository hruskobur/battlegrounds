import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';

class SceneBase {
    /**
     * Scene unique identifier.
     */
    static Id = '';

    /**
     * @type {Pixi.Application}
     */
    app;

    /**
     * @type {EventEmitter}
     */
    emitter;

    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     * 
     * @param {Pixi.Application} application 
     * @param {EventEmitter} emitter 
     */
    constructor (application, emitter) {
        this.app = application;
        this.emitter = emitter;
    }

    /**
     * @virtual
     * @returns {SceneBase} this
     */
    on_create () {
        this.container = new Pixi.Container(
            {
                label: `scene.${this.constructor.Id}`,
                x: 0,
                y: 0,
                boundsArea: new Pixi.Rectangle(
                    0, 0,
                    this.app.renderer.width, this.app.renderer.height
                ),
                hitArea: new Pixi.Rectangle(
                    0, 0,
                    this.app.renderer.width, this.app.renderer.height
                )
            }
        );

        return this;
    }

    /**
     * @virtual
     * @returns {SceneBase} this
     */
    on_destroy () {
        this.container.destroy(
            {
                children: true
            }
        );
        this.container = null;
        
        return this;
    }
}

export {
    SceneBase, Pixi
};
