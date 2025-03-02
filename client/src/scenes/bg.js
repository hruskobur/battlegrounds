import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { TokenSystem } from '../game/system/token.js';
import { RenderSystem } from '../game/system/render.js';
import { InputSystem } from '../game/system/input.js';
import { ActionSystem } from '../game/system/action/action.js';

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
     * @type {InputSystem}
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
        this.input = new InputSystem(this.events, this.state);
        this.render = new RenderSystem(this.events, this.state, this.container);
        this.action = new ActionSystem(this.events, this.state);
       
        // events
        this.events.on(GameState.Event.TokenCreated, this.render.draw);
        this.events.on(GameState.Event.TokenDestroyed, this.render.erase);
        this.events.on(GameState.Event.ActionUpdate, this.action.execute);
        this.events.on(GameState.Event.DEV_INPUT, this.action.schedule);
        console.log('BattlegroundsScene.on_create', this.events.eventNames());

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
                name: 'dev.spell',
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
        this.events.off(GameState.Event.TokenCreated, this.render.draw);
        this.events.off(GameState.Event.TokenDestroyed, this.render.erase);
        this.events.off(GameState.Event.ActionUpdate, this.action.execute);
        this.events.off(GameState.Event.DEV_INPUT, this.action.schedule);
        console.log('BattlegroundsScene.on_destroy', this.events.eventNames());

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