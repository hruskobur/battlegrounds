import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { AreaSystem } from '../game/system/area.js';
import { TokenSystem } from '../game/system/token.js';
import { PlayerSystem } from '../game/system/player.js';
import { AbilitySystem } from '../game/system/ability.js';
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
     * @type {TokenSystem}
     */
    token;

    /**
     * @type {PlayerSystem}
     */
    player;

    /**
     * @type {AbilitySystem}
     */
    ability;
   
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
        this.token = null;
        this.player = null;
        this.ability = null;
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
        this.token = new TokenSystem(this.events, this.state);
        this.player = new PlayerSystem(this.events, this.state);
        this.ability = new AbilitySystem(this.events, this.state);
        this.render = new RenderSystem(this.events, this.state, this.container);
        
        // events
        this.events
        .on(
            GameState.Event.TokenCreated,
            e => {
                this.render.token_draw(e);
            }
        )
        .on(
            GameState.Event.TokenDestroyed,
            e => {
                this.render.token_erase(e);
            }
        )
        .on(
            GameState.Event.AbilitySchedule,
            (e, id) => {
                this.ability.schedule(e, id);
            }
        )
        .on(
            'DEV_INFO',
            (...e) => {
                console.log('DEV_INFO', ...e);
            }
        )
        console.log('BattlegroundsScene.events', this.events.eventNames());

        // gameloop
        this.app.ticker.add(this.on_update, this);

        // development
        // to make systems available via developer's console
        window.state = this.state;
        window.area = this.area;
        window.token = this.token;

        // sandbox
        this.token.create(
            this.state.query(0, 0)
        );

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
        this.token = this.token.destructor();
        this.player = this.player.destructor();
        this.render = this.render.destructor();

        // base
        super.on_destroy();

        // dev
        delete window.state;
        delete window.area;
        delete window.token;
        
        return this;
    }

    /**
     * @protected
     * @param {Pixi.Ticker} ticker 
     */
    on_update (ticker) {
        const dt = ticker.elapsedMS;

        this.ability.update(dt);
    }
}

export {
    BattlegroundsScene
};