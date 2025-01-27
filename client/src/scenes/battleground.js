import * as Pixi from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { Scene } from '../core/scene.js';
import { WorldModel } from '../model/world.js';
import { BattlegroundModel } from '../model/battleground.js';

class BattlegroundScene extends Scene {
    static Id = 'bg';

    /**
     * @type {BattlegroundModel}
     */
    bg;

    /**
     * 
     * @param {WorldModel} world 
     * @param {BattlegroundModel} id
     */
    constructor (world, bg) {
        super(world);

        this.bg = bg;
    }

    /**
     * @returns {WorldModel}
     */
    get model () {
        return this.model;
    }

    /**
     * @override
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
        this.container = new Viewport(
            {
                worldHeight: this.bg.height * 128 + 8 * (this.bg.height + 1),
                worldWidth: this.bg.width * 128 + 8 * (this.bg.width + 1),
                screenHeight: application.renderer.height,
                screenWidth: application.renderer.width,
                events: application.renderer.events
            }
        )
        .drag()
        .wheel();

        for(let y = 0; y < this.bg.height; ++y) {
            for(let x = 0; x < this.bg.width; ++x) {
                const area = new Pixi.Sprite(Pixi.Texture.WHITE);
                area.width = 128;
                area.height= 128;
                area.x = x * 128 + 8 * (x + 1);
                area.y = y * 128 + 8 * (y + 1);
                
                this.container.addChild(area);
            }
        }

        return this;
    }
}

export {
    BattlegroundScene
};