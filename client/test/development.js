import EventEmitter from 'eventemitter3';
import * as Pixi from 'pixi.js';
import { Viewport } from 'pixi-viewport';
import { SceneBase } from '../src/core/scene.js';
import { Coordinate, Game } from '../src/game/game.js';


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
                worldWidth: Coordinate.WX_MAX * Coordinate.SU,
                worldHeight: Coordinate.WY_MAX * Coordinate.SU,
                events: applicaiton.renderer.events,
                disableOnContextMenu: true
            }
        )
        .drag().wheel();
        
        return this;
    }

    /**
     * 
     * @returns {DevelopmentScene} this
     */
    visualise () {
        while(this.container.children.length > 0) {
            this.container.removeChildAt(0);
        }

        for(let y = Coordinate.WY_MIN; y < Coordinate.WY_MAX; ++y) {
            for(let x = Coordinate.WX_MIN; x < Coordinate.WX_MAX; ++x) {
                const c = new Coordinate(x, y);

                const pt = new Pixi.Graphics()
                .circle(c.sx, c.sy, 32, 32)
                .fill({
                    color: this.game.areas[y][x] != null ? 'lightblue' : 'white'
                });

                this.container.addChild(pt);
            }
        }

        return this;
    }
}

export {
    DevelopmentScene
};