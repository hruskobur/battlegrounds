import * as Pixi from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Scene } from '../core/scene.js';

class BattlegroundScene extends Scene {
    static Id = 'bg';

    /**
     * 
     * @param {*} data 
     */
    constructor (data) {
        super(data);

        console.log('BattlegroundScene.constructor', this.data);
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
        const SIZE = 16;
        this.container = new Viewport(
            {
                worldHeight: SIZE * 64 + 8 + SIZE * 8,
                worldWidth: SIZE * 64 + 8 + SIZE * 8,
                screenHeight: renderer.width,
                screenWidth: renderer.height,
                events: renderer.events
            }
        )
        .drag().wheel();

        for(let y = 0; y < SIZE; ++y) {
            for(let x = 0; x < SIZE; ++x) {
                const area = new Pixi.Sprite(Pixi.Texture.WHITE);
                area.width = 128;
                area.height= 128;
                area.x = x * 128 + 8 + x * 8;
                area.y = y * 128 + 8 + y * 8;
                
                area._data = {
                    pos:{ x, y }
                };

                this.container.addChild(area);
            }
        }

        return this;
    }

    /**
     * @override
     * @param {Number} width 
     * @param {Number} height 
     */
    on_resize (width, height) {
        this.container.screenWidth = width;
        this.container.screenHeight = height;

        console.log(
            `${this.constructor.Id}.on_resize`,
            this.container.x, this.container.y,
            this.container.width, this.container.height,
            this.container.getVisibleBounds()
        );
    }
}

export {
    BattlegroundScene
};