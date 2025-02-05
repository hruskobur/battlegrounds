import EventEmitter from 'eventemitter3';
import * as Pixi from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { SceneBase } from '../src/core/scene.js';
import { Game } from '../src/game/game.js';
import { DevEntity } from '../src/game/entity.js';


class DevelopmentScene extends SceneBase {
    static Id = 'dev';

    /**
     * @type {Game}
     */
    game;

    /**
     * @param {Game} game 
     */
    constructor(game) {
        super();

        this.game = game;
    }

    /**
     * @override
     * @param {Pixi.Application} applicaiton 
     * @param {EventEmitter} emitter 
     * @returns {DevelopmentScene} this
     */
    on_create (applicaiton, emitter) {
        this.container = new Viewport(
            {
                screenWidth: applicaiton.renderer.width,
                screenHeight: applicaiton.renderer.height,
                worldWidth: 1024,
                worldHeight: 1024,
                events: applicaiton.renderer.events,
                disableOnContextMenu: true
            }
        )
        .drag()
        .wheel();

        this.game.get_areas().forEach(this.#add_entity);
        this.game.get_paths().forEach(this.#add_entity);

        const entity = new DevEntity(0, 0);
        console.log(entity);
        this.#add_entity(entity);

        return this;
    }

    /**
     * development
     * @param {} entity 
     */
    #add_entity = (entity) => {
        this.container.addChild(entity.draw());
    }
}

export {
    DevelopmentScene
};