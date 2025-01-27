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
     * @virtual
     * @param {Pixi.Application} application
     * @returns {Scene} this
     */
    on_create (application) {
        super.on_create(application);

        const SIZE = 10;
        this.container = new Viewport(
            {
                worldHeight: SIZE * 128 + 8 * (SIZE + 1),
                worldWidth: SIZE * 128 + 8 * (SIZE + 1),
                screenHeight: application.screen.width,
                screenWidth: application.screen.height,
                events: application.renderer.events,
            }
        )
        .drag().wheel();

        for(let y = 0; y < SIZE; ++y) {
            for(let x = 0; x < SIZE; ++x) {
                const area = new Pixi.Sprite(Pixi.Texture.WHITE);
                area.width = 128;
                area.height= 128;
                area.x = x * 128 + 8 * (x + 1);
                area.y = y * 128 + 8 * (y + 1);
                
                area._data = {
                    pos:{ x, y }
                };

                this.container.addChild(area);
            }
        }

        return this;
    }
}

export {
    BattlegroundScene
};