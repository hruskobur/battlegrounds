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
    events;

    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     * 
     * @param {Pixi.Application} application 
     * @param {EventEmitter} events 
     */
    constructor (application, events) {
        this.app = application;
        this.events = events;
    }

    /**
     * @virtual
     * @param {...any} payload 
     * @returns {SceneBase} this
     */
    on_create (...payload) {
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
