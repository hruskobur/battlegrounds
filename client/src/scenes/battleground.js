import * as Pixi from 'pixi.js';
import { Viewport } from 'pixi-viewport';

import { Scene } from '../core/scene.js';

class BattlegroundScene extends Scene {
    static Id = 'bg';

    static Events = Object.freeze(
        {}
    );

    constructor () {
        super();
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
     * @returns {BattlegroundScene} this
     */
    on_create (stage, renderer) {
        this.container = new Viewport(
            {
                worldHeight: 2048,
                worldWidth: 2048,
                screenHeight: 1024,
                screenWidth: 1024,
                events: renderer.events
            }
        ).drag();

        const entity_dev = new Pixi.Sprite(Pixi.Texture.WHITE);
        entity_dev.width = entity_dev.height = 64;
        entity_dev.x = entity_dev.y = 128;

        this.container.addChild(entity_dev);

        return super.on_create(stage, renderer);
    }
}

export {
    BattlegroundScene
};