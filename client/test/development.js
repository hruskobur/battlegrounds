import * as Pixi from 'pixi.js';
import { SceneBase } from '../src/core/scene.js';
import { Game } from '../src/game/game.js';

class DevelopmentScene extends SceneBase {
    static Id = 'dev';

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

        console.log(this.constructor.Id, this.game);
    }

    /**
     * @override
     * @param {Pixi.Application} application
     * @returns {DevelopmentScene} this
     */
    on_create (application) {
        super.on_create(application);
        
        const entity = new Pixi.Sprite(Pixi.Texture.WHITE);
        entity.x = 0;
        entity.y = 0;
        entity.width = 128;
        entity.height = 128;
        entity.eventMode = 'static';

        entity.on(
            'pointerup',
            e => {
                this.request(Game.Request.Enter, 'bg');
            }
        );

        this.container.addChild(entity);

        return this;
    }
}

export {
    DevelopmentScene
};