import * as Pixi from 'pixi.js';
import { Emitter, Requests } from '../core/messenger.js';

Pixi.Container.prototype.resize = function (width, height) {
    this.width = width;
    this.height = height;
}

class Scene {
    static Requests = Requests;

    /**
     * Scene unique identifier.
     */
    static Id = '';
  
    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     * @type {*}
     */
    data;

    /**
     * @param {*} data 
     */
    constructor (data) {
        this.data = data;
    }

    /**
     * @public
     * @param {Requests} request 
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
     * @returns {Scene} this
     */
    on_destroy (application) {
        this.container.destroy(
            {
                children: true
            }
        );
        this.container = null;
        
        this.data = null;

        return this;
    }

    /**
     * @virtual
     * @param {Pixi.Application} application
     * @returns {Scene} this
     */
    on_connect (application) {
        application.renderer.on(
            'resize',
            this.container.resize,
            this.container
        );

        return this;
    }
    
    /**
     * @virtual
     * @param {Pixi.Application} application
     * @returns {Scene} this
     */
    on_disconnect (application) {
        application.renderer.off(
            'resize',
            this.container.resize,
            this.container
        );
        
        return this;
    }
}

export {
    Scene
};
