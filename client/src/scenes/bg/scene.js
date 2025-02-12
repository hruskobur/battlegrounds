import { SceneBase, Pixi } from '../../core/scene.js';
import { GameSystem } from '../../game/system/game.js';

class BattlegroundsScene extends SceneBase {
    static Id = 'bg';

    /* systems ****************************************************************/
    /**
     * @type {GameSystem}
     */
    game;

    /* graphics ***************************************************************/
    /**
     * @type {Pixi.Container}
     */
    areas;

    /**
     * @type {Pixi.Container}
     */
    tokens;

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
     * @override
     * @param {*} scenario 
     * @returns {BattlegroundsScene} this
    */
    on_create(scenario) {
        super.on_create();
        
        this.game = new GameSystem(this.emitter, scenario);

        // graphics
        this.areas = new Pixi.Container(
            {
                label: 'scene.bg.areas',
                children: this.game.bg
                .all_areas()
                .map(a => a.sprite)
            }
        );
        this.areas.x = (this.container.width - this.areas.width) / 2;
        this.areas.y = (this.container.height - this.areas.height) / 2;
        this.container.addChild(this.areas);

        this.tokens = new Pixi.Container(
            {
                label: 'scene.bg.tokens',
                children: this.game.bg
                .all_tokens()
                .filter(Boolean)
                .map(t => t.sprite)
            }
        );
        this.tokens.x = this.areas.x;
        this.tokens.y = this.areas.y;
        this.container.addChild(this.tokens);

        // events
        this.emitter.on('game.pause', this.pause);
        this.app.ticker.add(this.#on_tick);

        return this;
    }

    /**
     * @override
     * @returns {BattlegroundsScene} this
     */
    on_destroy () {
        // events        
        this.app.ticker.remove(this.#on_tick);
        this.emitter.removeAllListeners('game.pause');

        // graphics
        super.on_destroy();

        // systems
        this.game = null;
        
        return this;
    }

    /**
     * @public
     */
    pause = () => {
        if(this.app.ticker.started === true) {
            console.log('BattlegroundsScene.pause', false);
    
            this.app.ticker.stop();
        } else {
            console.log('BattlegroundsScene.pause', true);
            
            this.app.ticker.start();
        }
    }

    /**
     * @private
     * @param {Pixi.Ticker} ticker 
     */
    #on_tick = ticker => {
        // console.log('BattlegroundsScene.#on_tick');
    }
}

export {
    BattlegroundsScene
};