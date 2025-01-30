import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { Viewport } from 'pixi-viewport';
import { SceneBase } from '../core/scene.js';
import { Game } from '../game/game.js';
import { AreaEntity } from '../game/area.js';
import * as Utils from '../core/utils.js';

class BattlegroundSceneController {
    constructor (game) {
        this.game = game;

        Utils.array_2d_iterate(
            this.game.areas,
            (x, y, area) => {
                area.sprite
                .on('pointerdown', this.select.bind(this, area))
                .on('pointerenter', this.info.bind(this, area))
                .on('pointerleave', this.info.bind(this, area));
            }
        );
    }

    info (area) {
        if(this.game.info != null && this.game.info != area) {
            this.game.info.set_over(false);
        }

        this.game.info = area;
        this.game.info.set_over(true);
    }

    select (area) {
        if(this.game.selected === area) {
            this.game.selected.set_selected(false);
            this.game.selected = null;

            return;
        }

        if(this.game.selected != null) {
            this.game.selected.set_selected(false);
            this.game.selected = null;
        }

        this.game.selected = area;
        this.game.selected.set_selected(true);
    }
}

class BattlegroundScene extends SceneBase {
    static Id = 'bg';

    /**
     * @type {Game}
     */
    game;

    /**
     * @type {BattlegroundSceneController}
     */
    controller;

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
        this.container = new Viewport({
            container: application.stage,
            worldHeight: this.game.wh,
            worldWidth: this.game.ww,
            screenHeight: application.renderer.height,
            screenWidth: application.renderer.width, 
            events: application.renderer.events,
            disableOnContextMenu: true
        }).drag({
            mouseButtons: 'right'
        }).wheel(
            {}
        );

        this.game.create();
        Utils.array_2d_iterate(
            this.game.areas,
            (x, y, area) => {
                this.container.addChild(area.sprite);
            }
        );

        this.controller = new BattlegroundSceneController(this.game);
        

        return this;
    }


}

export {
    BattlegroundScene
};