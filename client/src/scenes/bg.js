import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { AreaSystem } from '../game/system/area.js';
import { RenderSystem } from '../game/system/render.js';

class BattlegroundsScene extends SceneBase {
    static Id = 'bg';

    /**
     * @type {GameState}
     */
    state;

    /**
     * @type {AreaSystem}
     */
    area;

    /**
     * @type {RenderSystem}
     */
    render;

    /**
     * 
     * @param {Pixi.Application} app 
     * @param {EventEmitter} events 
     */
    constructor (app, events) {
        super(app, events);

        this.state = null;
        this.area = null;
        this.render = null;
    }

    /**
     * @protected
     * @override
     * @param {*} scenario 
     * @returns {BattlegroundsScene} this
    */
    on_create(scenario) {
        super.on_create();

        // systems
        // note: order matters!
        this.state = new GameState(scenario);
        this.area = new AreaSystem(this.events, this.state);
        this.render = new RenderSystem(this.events, this.state, this.container);

        // events
        this.events
        .on(
            GameState.Event.AreaFactionChanged,
            (zone) => {
                this.render.area_faction_change(zone);
            }
        )
        console.log('BattlegroundsScene.events', this.events.eventNames());

        // gameloop
        this.app.ticker.add(this.on_update, this);

        // development
        // to make systems available via developer's console
        window.state = this.state;
        window.area = this.area;

        return this;
    }

    /**
     * @protected
     * @override
     * @returns {BattlegroundsScene} this
     */
    on_destroy () {
        // gameloop
        this.app.ticker.remove(this.on_update, this);

        // events
        Object
        .keys(GameState.Event)
        .forEach(event => {
            this.events.removeAllListeners(event);
        });
        console.log('BattlegroundsScene.events', this.events.eventNames());

        // systems
        // note: order matters!
        this.state = null;
        this.area = this.area.destructor();
        this.render = this.render.destructor();

        // base
        super.on_destroy();

        // dev
        delete window.state;
        delete window.area;
        
        return this;
    }

    /**
     * @protected
     * @param {Pixi.Ticker} ticker 
     */
    on_update (ticker) {
        const dt = ticker.elapsedMS;

        // this.render.update(time);
    }
}

export {
    BattlegroundsScene
};