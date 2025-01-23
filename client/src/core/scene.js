import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';

class Scene {
    static Id = '';

    static Events = {};

    /**
     * @type {Pixi.Container}
     */
    container;

    /**
     */
    constructor () {
        this.container = null;
    }

    /**
     * @virutal
     * @param {Pixi.Container} stage 
     * @param {Pixi.Renderer} renderer
     * @returns {Scene} this
     */
    on_create (stage, renderer) {
        stage.addChild(this.container);

        return this;
    }

    /**
     * @virtual
     * @param {Pixi.Container} stage 
     * @param {Pixi.Renderer} renderer 
     * @returns {Scene} this
     */
    on_destroy (stage, renderer) {
        this.container.removeFromParent();
        this.container.destroy(
            {
                children: true
            }
        );
        this.container = null;

        return this;
    }

    /**
     * @abstract
     * @param {EventEmitter} messenger 
     * @param {Pixi.Ticker} ticker
     * @returns {Scene} this
     */
    on_connect (messenger, ticker) {
        return this;
    }

    /**
     * @abstract
     * @param {EventEmitter} messenger 
     * @param {Pixi.Ticker} ticker
     * @returns {Scene} this
     */
    on_disconnect (messenger, ticker) {
        Object
        .values(this.constructor.Events)
        .forEach(event => {
            // dev
            console.log('on_disconnect', Scene.constructor.Id, event);

            messenger.removeAllListeners(event)
        });

        return this;
    }
}

export {
    Scene
};
