import EventEmitter from 'eventemitter3';
import * as Pixi from 'pixi.js';
import { Viewport } from 'pixi-viewport';
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
        
        return this;
    }
}

export {
    DevelopmentScene
};