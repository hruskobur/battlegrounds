import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { TokenSystem } from '../game/system/token.js';
import { RenderSystem } from '../game/system/render.js';
import { PlayerInputSystem } from '../game/system/input.js';
import { ActionSystem } from '../game/system/action.js';

class BattlegroundsScene extends SceneBase {
    static Id = 'bg';

    /**
     * @type {GameState}
     */
    state;

    /**
     * @type {TokenSystem}
     */
    token;

    /**
     * @type {PlayerInputSystem}
     */
    input;

    /**
     * @type {RenderSystem}
     */
    render;

    /**
     * @type {ActionSystem}
     */
    action;

    /**
     * 
     * @param {Pixi.Application} app 
     * @param {EventEmitter} events 
     */
    constructor (app, events) {
        super(app, events);

        this.state = null;

        this.token = null;

        this.input = null;
        this.render = null;

        this.action = null;
    }

    /**
     * @protected
     * @override
     * @param {*} scenario 
     * @returns {BattlegroundsScene} this
    */
    on_create(scenario) {
        // base
        super.on_create();

        // systems
        this.state = new GameState(scenario);
        this.token = new TokenSystem(this.events, this.state);
        this.render = new RenderSystem(this.events, this.state, this.container);
        this.action = new ActionSystem(this.events, this.state);

        // note: player input
        this.input = new PlayerInputSystem(
            this.events, this.state,
            this.state.player
        );
       
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
            GameState.Event.ActionUpdate,
            this.action.execute,
            this.action
        );

        this.events.on(
            GameState.Event.ActionInfo,
            (commander, zone) => {
                console.log(GameState.Event.ActionInfo, commander, zone);
            }
        )

        console.log('BattlegroundsScene.events', this.events.eventNames());

        // gameloop
        this.app.ticker.add(this.on_update, this);

        // development
        // to make systems available via developer's console
        window.state = this.state;
        window.token = this.token;

        // scenario sim.
        this.token.create(
            0, 0,
            {
                name: 'fireball.dev',
                stages: [
                    {
                        name: 'cast',
                        duration: 3500,
                        tick: null,
                        cancelable: true,
                        targets: null
                    },
                    {
                        name: 'damage',
                        duration: 5000,
                        tick: 1000,
                        cancelable: false,
                        targets: [
                            {
                                type: 'enemy',
                                count: 3,
                                rule: 'relaxed'
                            }
                        ]
                    },
                    {
                        name: 'cooldown',
                        duration: 5000,
                        tick: null,
                        cancelable: false,
                        targets: null
                    }
                ]
            }
        );

        this.token.create(
            1, 1,
            {
                name: 'test.dev',
                stages: [
                    {
                        name: 'gold.dmg',
                        duration: 5000,
                        tick: 1000,
                        cancelable: true,
                        targets: [
                            {
                                type: 'enemy',
                                count: 3,
                                rule: 'relaxed'
                            },
                            {
                                type: 'player',
                                count: 3,
                                rule: 'relaxed'
                            }
                        ]
                    }
                ]
            }
        )

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
        this.events.removeAllListeners(GameState.Event.TokenCreated);
        this.events.removeAllListeners(GameState.Event.TokenDestroyed);
        this.events.removeAllListeners(GameState.Event.ActionUpdate);
        console.log('BattlegroundsScene.events', this.events.eventNames());

        // systems
        this.state = null;
        this.token = this.token.destructor();
        this.render = this.render.destructor();
        this.input = this.input.destructor();
        this.action = this.action.destructor();

        // base
        super.on_destroy();

        // dev
        delete window.state;
        delete window.token;
        
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