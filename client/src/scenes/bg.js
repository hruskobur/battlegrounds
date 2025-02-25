import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { ActionSystem } from '../game/system/action.js';
import { InputSystem } from '../game/system/input.js';
import { RenderSystem } from '../game/system/render.js';
import { TokenSystem } from '../game/system/token.js';

class BattlegroundsScene extends SceneBase {
    static Id = 'bg';

    /**
     * @type {GameState}
     */
    state;

    /**
     * @type {RenderSystem}
     */
    render;

    /**
     * @type {InputSystem}
     */
    input;

    /**
     * @type {TokenSystem}
     */
    token;

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
        this.render = null;
        this.input = null;
        this.token = null;
        this.action = null;
    }

    /**
     * @protected
     * @override
     * @param {*} scenario 
     * @returns {BattlegroundsScene} this
    */
    on_create(scenario) {
        super.on_create();

        this.state = new GameState(scenario);
        this.render = new RenderSystem(this.events, this.state, this.container);
        this.input = new InputSystem(this.events, this.state);
        this.token = new TokenSystem(this.events, this.state);
        this.action = new ActionSystem(this.events, this.state,this.app.ticker);

        // events
        this.events.on(GameState.Event.TokenCreated, this.render.draw);
        this.events.on(GameState.Event.TokenDestroyed, this.render.erase);

        this.events.on(GameState.Event.InputSelected, e => {
            console.log('input selected', e);
        });
        this.events.on(GameState.Event.InputSucceed, e => {
            console.log('input succeed', e);
        });
        this.events.on(GameState.Event.InputCleared, e => {
            console.log('input cleared', e);
        })
        this.events.on(GameState.Event.InputFailed, e => {
            console.log('input failed', e);
        });

        // dev: to make systems available via developer's console
        window.state = this.state;
        window.tokens = this.token;
        window.actions = this.action;

        return this;
    }

    /**
     * @protected
     * @override
     * @returns {BattlegroundsScene} this
     */
    on_destroy () {
        this.state = null;
        this.input = this.input.destructor();
        this.render = this.render.destructor();
        this.token = this.token.destructor();
        this.action = this.action.destructor();

        super.on_destroy();
        
        return this;
    }
}

export {
    BattlegroundsScene
};