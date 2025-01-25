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
        const SIZE = 64;
        this.container = new Viewport(
            {
                worldHeight: SIZE * 64,
                worldWidth: SIZE * 64,
                screenHeight: 1000,
                screenWidth: 1000,
                events: renderer.events
            }
        ).drag();

        for(let y = 0; y < SIZE; ++y) {
            for(let x = 0; x < SIZE; ++x) {
                const area = new Pixi.Sprite(Pixi.Texture.WHITE);
                area.width = 128;
                area.height= 128;
                area.x = x * 128;
                area.y = y * 128;
                
                area._data = {
                    pos:{ x, y }
                };

                this.container.addChild(area);
            }
        }

        return super.on_create(stage, renderer, ticker);
    }
}

export {
    BattlegroundScene
};