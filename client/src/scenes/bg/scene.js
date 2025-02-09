import { SceneBase, Pixi } from '../../core/scene.js';

import { TheGame } from '../../game/game.js';
import { AreaGraphics } from '../../game/area/graphic.js';

import { BgControls } from './controls.js';

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
     * @type {Pixi.Container}
     */
    tokens;

    /**
     * @type {BgControls}
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
        this.tokens = null;
    }

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @returns {AreaGraphics|null}
     */
    target (x, y) {
        const {area, token} = this.game.target(x, y);

        return {
            area:
            (area !== null) ? this.areas.children[area.position.id] : null,

            token:
            (token !== null) ? this.tokens.children[area.position.id] : null
        }
    }

    /**
     * @override
     * @param {*} scenario 
     * @returns {SceneBase} this
    */
    on_create(...scenario) {
        super.on_create(...scenario);
        
        // game model
        this.game = new TheGame().initialize(...scenario);

        // area graphics
        this.areas = new Pixi.Container(
            {
                label: 'scene.bg.areas'
            }
        );

        for(let y = 0; y < this.game.height; ++y) {
            for(let x = 0; x < this.game.width; ++x) {
                this.areas.addChild(
                    new AreaGraphics(
                        this.game.areas[y][x]
                    )
                );
            }
        }

        this.areas.x = (this.container.width - this.areas.width) / 2;
        this.areas.y = (this.container.height - this.areas.height) / 2;

        this.container.addChild(this.areas);

        // token graphics
        this.tokens = new Pixi.Container(
            {
                label: 'scene.bg.tokens'
            }
        );

        this.tokens.x = this.areas.x;
        this.tokens.y = this.areas.y;

        this.container.addChild(this.tokens);

        // controls
        this.controls = new BgControls(this);
        
        // events
        this.emitter.on('game.pause', this.pause);
        this.app.ticker.add(this.#on_tick);

        return this;
    }

    /**
     * @override
     * @returns {SceneBase} this
     */
    on_destroy () {
        super.on_destroy();

        // controls
        this.controls = this.controls.destructor();

        // events        
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
}

export {
    BgScene
};