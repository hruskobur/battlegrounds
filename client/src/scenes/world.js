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
     * @virutal
     * @param {Pixi.Container} stage 
     * @param {Pixi.Renderer} renderer 
     * @param {Pixi.Ticker} ticker 
     * @returns {Scene} this
     */
    on_create (stage, renderer, ticker) {
        super.on_create(stage, renderer, ticker);

        // dev: scene-local button trigers app-wide event
        const sprite = new Pixi.Sprite(Pixi.Texture.WHITE);
        sprite.x = 256; sprite.y = 256;
        sprite.width = 128; sprite.height = 128;
        sprite.eventMode = 'static';
        sprite.on(
            'pointerup',
            e => this.message(Scene.Requests.SceneLoad, 'bg')
        );
        this.container.addChild(sprite);

        return this;
    }
}

export {
    WorldScene
};