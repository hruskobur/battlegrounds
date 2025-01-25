import * as Pixi from 'pixi.js';
import { Emitter, Requests } from '../core/messenger.js';

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
     * @virutal
     * @param {Pixi.Container} stage 
     * @param {Pixi.Renderer} renderer 
     * @param {Pixi.Ticker} ticker 
     * @returns {Scene} this
     */
    on_create (stage, renderer, ticker) {
        stage.addChild(this.container);

        return this;
    }

    /**
     * @virtual
     * @param {Pixi.Container} stage 
     * @param {Pixi.Renderer} renderer 
     * @param {Pixi.Ticker} ticker 
     * @returns {Scene} this
     */
    on_destroy (stage, renderer, ticker) {
        this.container.removeFromParent();
        this.container.destroy(
            {
                children: true
            }
        );
        this.container = null;
        
        this.data = null;

        return this;
    }
}

export {
    Scene
};
