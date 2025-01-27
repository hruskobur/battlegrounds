import * as Pixi from 'pixi.js';
import { Scene } from '../core/scene.js';
import { WorldModel } from '../model/world.js';

class WorldScene extends Scene {
    static Id = 'world';

    /**
     * 
     * @param {WorldModel} model 
     */
    constructor (model) {
        super(model);
    }

    /**
     * @returns {WorldModel}
     */
    get model () {
        return this.model;
    }

    /**
     * @override
     * @param {Pixi.Application} application
     * @returns {Scene} this
     */
    on_create (application) {
        super.on_create(application);

        // note: dev only
        this.model.battlegrounds
        .forEach(
            bg => {
                const entity = new Pixi.Sprite(Pixi.Texture.WHITE);
                entity.x = bg.world_x;
                entity.y = bg.world_y;
                entity.width = 128;
                entity.height = 128;
                entity.eventMode = 'static';

                entity.on(
                    'pointerup',
                    e => {
                        this.message(Scene.Requests.EnterBg, bg.name);
                    }
                );
                
                this.container.addChild(entity);
        });

        return this;
    }
}

export {
    WorldScene
};