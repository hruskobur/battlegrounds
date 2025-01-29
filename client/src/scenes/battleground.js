import * as Pixi from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { SceneBase } from '../core/scene.js';
import { Game } from '../model/game.js';

class BattlegroundScene extends SceneBase {
    static Id = 'bg';

    /**
     * @type {Game}
     */
    game;

    /**
     * @param {Game} game 
     */
    constructor (game) {
        super();

        this.game = game;
    }

    /**
     * @override
     * @param {Pixi.Application} application
     * @returns {BattlegroundScene} this
     */
    on_create (application) {
        const w = 32;
        const h = 32;

        this.container = new Viewport(
            {
                container: application.stage,
                worldHeight: w * 128 + 8 * (w + 1),
                worldWidth: h * 128 + 8 * (h + 1),
                screenHeight: application.renderer.height,
                screenWidth: application.renderer.width, 
                events: application.renderer.events
            }
        )
        .drag()
        .wheel();

        for(let y = 0; y < h; ++y) {
            for(let x = 0; x < w; ++x) {
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