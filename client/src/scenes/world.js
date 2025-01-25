import * as Pixi from 'pixi.js';
import { Scene } from '../core/scene.js';

class WorldScene extends Scene {
    static Id = 'world';

    /**
     * 
     * @param {*} data 
     */
    constructor (data) {
        super(data);

        console.log('WorldScene.constructor', this.data);
    }

    /**
     * @returns {Viewport}
     */
    get container () {
        return this.container;
    }

    /**
     * @override
     * @param {Pixi.Container} stage 
     * @param {Pixi.Renderer} renderer 
     * @param {Pixi.Ticker} ticker 
     * @returns {Scene} this
     */
    on_create (stage, renderer, ticker) {
        this.container = new Pixi.Container();

        return super.on_create(stage, renderer, ticker);
    }
}

export {
    WorldScene
};