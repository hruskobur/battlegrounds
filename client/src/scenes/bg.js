import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { TargetOriginType, FirstStage } from '../game/state/constant.js';
import { AreaSystem } from '../game/system/area.js';
import { TokenSystem } from '../game/system/token.js';
import { RenderSystem } from '../game/system/render.js';
import { PlayerControlSystem } from '../game/system/player.js';
import { ActionSystem } from '../game/system/action.js';

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
     * @type {PlayerControlSystem}
     */
    player;

    /**
     * @type {ActionSystem}
     */
    action;
   
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
        this.action = null;
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
        this.player = new PlayerControlSystem(this.events, this.state);
        this.action = new ActionSystem(this.events, this.state);
        this.render = new RenderSystem(this.events, this.state, this.container);
        
        // events
        this.events.on(
            GameState.Event.TokenCreated,
            this.render.draw,
            this.render
        );
     
        this.events.on(
            GameState.Event.TokenDestroyed,
            this.render.erase,
            this.render
        );

        this.events.on(
            GameState.Event.ActionSchedule,
            this.action.schedule,
            this.action
        );

        this.events.on(
            GameState.Event.ActionCancel,
            zone => {
                this.token.reset(zone);
                this.action.cancel(zone);
            }
        );

        this.events.on(
            GameState.Event.ActionUnscheduled,
            zone => {
                this.token.reset(zone);
            }
        )

        this.events.on(
            GameState.Event.ActionUpdated,
            this.action.execute,
            this.action
        );
        console.log('BattlegroundsScene.events', this.events.eventNames());

        // gameloop
        this.app.ticker.add(this.on_update, this);

        // development
        // to make systems available via developer's console
        window.state = this.state;
        window.area = this.area;
        window.token = this.token;
        window.player = this.player;

        // scenario sim.
        this.token.create(
            this.state.query(0, 0),
            {
                name: 'firebolt.name',
                text: 'firebolt.text',
                stages: [
                    {
                        name: 'name.0',
                        duration: 5000,
                        idx: FirstStage,
                        next: 1,
                        tick: null,
                        cancelable: false,
                        targets: [
                            TargetOriginType.Ally,
                            TargetOriginType.Ally,
                            TargetOriginType.Enemy,
                            TargetOriginType.Enemy
                        ]
                    },
                    {
                        name: 'name.1',
                        idx: 1,
                        next: null,
                        duration: 25000,
                        tick: 1000,
                        cancelable: true,
                        targets: [
                            TargetOriginType.Enemy,
                            TargetOriginType.Ally,
                            TargetOriginType.Enemy,
                            TargetOriginType.Ally
                        ]
                    }
                ]
            }
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
        Object.keys(GameState.Event).forEach(event => {
            this.events.removeAllListeners(event);
        });
        console.log('BattlegroundsScene.events', this.events.eventNames());

        // systems
        // note: order matters!
        this.state = null;
        this.token = this.token.destructor();
        this.area = this.area.destructor();
        this.player = this.player.destructor();
        this.action = this.action.destructor();
        this.render = this.render.destructor();

        // base
        super.on_destroy();

        // dev
        delete window.state;
        delete window.area;
        delete window.token;
        delete window.player;
        
        return this;
    }

    /**
     * @protected
     * @param {Pixi.Ticker} ticker 
     */
    on_update (ticker) {
        const dt = ticker.elapsedMS;

        this.action.update(dt);
    }
}

export {
    BattlegroundsScene
};