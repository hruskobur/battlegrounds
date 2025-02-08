import { SceneBase, Pixi } from '../core/scene.js';

import { TheGame } from '../game/game.js';
import { Target } from '../game/target.js';
import { AreaGraphics } from '../game/area/graphic.js';

import { BgSceneControls } from './controls.js';

class BgScene extends SceneBase {
    static Id = 'bg';

    /**
     * @type {TheGame}
     */
    game;

    /**
     * @type {Pixi.Container}
     */
    areas;

    /**
     * @type {BgSceneControls}
     */
    controls;

    /**
     * 
     * @param {Pixi.Application} application 
     * @param {EventEmitter} emitter 
     */
    constructor (application, emitter) {
        super(application, emitter);

        this.game = null;
        this.areas = null;
        this.controls = null;
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {AreaGraphics|null}
     */
    area (x, y) {
        //note: this belongs to the game, not here... for now, do the check here
        if(x < 0 || x >= this.game.width || y < 0 || y >= this.game.height) {
            return null;
        }

        return this.areas.children[
            this.game.areas[y][x].id
        ];
    }

    /**
     * @override
     * @returns {SceneBase} this
    */
    on_create() {
        super.on_create();
        
        this.game = new TheGame();

        this.areas = new Pixi.Container(
            {
                label: 'scene.bg.areas',
                x: (this.container.width - (this.game.width * 64)) / 2,
                y: (this.container.height - (this.game.height * 64)) / 2,
                visible: false
            }
        );

        this.container.addChild(this.areas);

        this.app.ticker.add(this.#on_tick).stop();

        this.emitter.on('game.pause', this.pause);

        this.#on_init();

        this.controls = new BgSceneControls(this);

        return this;
    }

    /**
     * @override
     * @returns {SceneBase} this
     */
    on_destroy () {
        super.on_destroy();

        this.controls = this.controls.destructor();

        this.app.ticker.remove(this.#on_tick);

        this.emitter.removeAllListeners('game.pause');
        
        return this;
    }

    /**
     * @public
     */
    pause = () => {
        if(this.app.ticker.started === true) {
            console.log('BgScene.pause', false);
    
            this.app.ticker.stop();
        } else {
            console.log('BgScene.pause', true);
            
            this.app.ticker.start();
        }
    }

    /**
     * @private
     * @param {Pixi.Ticker} ticker 
     */
    #on_tick = ticker => {
        // console.log('BgScene.#on_tick');
    }

    /**
     * @private
     */
    #on_init = () => {
        for(let y = 0; y < this.game.height; ++y) {
            for(let x = 0; x < this.game.width; ++x) {
                const model = this.game.areas[y][x];
                this.areas.addChild(
                    new AreaGraphics(
                        model.x, model.y,
                        model.id
                    )
                );
            }
        }

        // areas container: align to the center
        this.areas.x = (this.container.width - this.areas.width) / 2;
        this.areas.y = (this.container.height - this.areas.height) / 2;
        this.areas.visible = true;

        // otehr container: align to the center
        // . . .

        this.app.ticker.start();

        console.log('BgScene.#on_init', this.game);
    }
}

export {
    BgScene
};