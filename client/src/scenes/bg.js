import { SceneBase, Pixi } from '../core/scene.js';
import { TheGame } from '../game/game.js';
import { AreaGraphics } from '../game/graphics/area.js';
import { Targeting } from './targeting.js';

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
     * @type {Targeting}
     */
    targeting;

    /**
     * 
     * @param {Pixi.Application} application 
     * @param {EventEmitter} emitter 
     */
    constructor (application, emitter) {
        super(application, emitter);

        this.game = null;
        this.areas = null;
        this.targeting = new Targeting();
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

        this.app.ticker
        .add(this.#on_tick)
        .stop();

        this.emitter
        .on('game.pause', this.pause);

        this.#on_init();

        return this;
    }

    /**
     * @override
     * @returns {SceneBase} this
     */
    on_destroy () {
        super.on_destroy();

        this.app.ticker
        .remove(this.#on_tick);

        this.emitter
        .removeAllListeners('game.pause');
        
        return this;
    }

    /**
     * @public
     */
    pause = () => {
        if(this.app.ticker.started === true) {
            console.log('BgScene.#on_pause', false);
    
            this.app.ticker.stop();
        } else {
            console.log('BgScene.#on_pause', true);
            
            this.app.ticker.start();
        }
    }

    /**
     * @private
     * @param {Pixi.Ticker} ticker 
     */
    #on_tick = ticker => {
        const snapshots = this.game.tick(ticker.elapsedMS);
        const length = snapshots.length;

        for(let s = 0; s < length; ++s) {
            const snapshot = snapshots[s];

            console.log('BgScene.#on_tick', snapshot);
        }
    }

    /**
     * @private
     */
    #on_init = () => {
        for(let y = 0; y < this.game.height; ++y) {
            for(let x = 0; x < this.game.width; ++x) {
                const model = this.game.areas[y][x];
                
                const graph = new AreaGraphics(model)
                .on('pointerdown', this.#on_area_select)
                .on('pointerenter', this.#on_area_enter)
                .on('pointerleave', this.#on_area_leave);

                this.areas.addChild(graph);
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

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_area_select = event => {
        // console.log('BgScene.#on_area_select', event.target.model);

        const targets = this.targeting.target(event.target.model);
        if(targets == null) {
            return;
        }

        this.game.command(...targets);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_area_enter = event => {
        // console.log('BgScene.#on_area_enter', event.target.model);
    }

    /**
     * 
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_area_leave = event => {
        // console.log('BgScene.#on_area_leave', event.target.model);
    }
}

export {
    BgScene
};