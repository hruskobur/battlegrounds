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
        this.container = new Pixi.Container(
            {
                x: 0,
                y: 0,
                boundsArea: new Pixi.Rectangle(
                    0, 0,
                    renderer.width, renderer.height
                ),
                hitArea: new Pixi.Rectangle(
                    0, 0,
                    renderer.width, renderer.height
                )
            }
        );

        // dev: to test correctness of container's dimensions
        // this.container.eventMode = 'static';
        // this.container.on('pointerdown', e => console.log(e));

        // dev: to test correct scaling
        // const sprite = new Pixi.Sprite(Pixi.Texture.WHITE);
        // sprite.x = 256; sprite.y = 256;
        // sprite.width = 128; sprite.height = 128;
        // this.container.addChild(sprite);

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
     * @param {Number} width 
     * @param {Number} height 
     */
    on_resize (width, height) {
        this.container.width = width;
        this.container.height = height;
        this.container.boundsArea = new Pixi.Rectangle(0, 0, width, height);

        // dev: resize debug
        // console.log(
        //     `${this.constructor.Id}.on_resize`,
        //     this.container.x, this.container.y,
        //     this.container.width, this.container.height,
        //     this.container.boundsArea
        // );
    }
}

export {
    Scene
};
