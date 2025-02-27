import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { ScheduleSystem } from '../game/system/schedule.js';
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
     * @type {ActionSystem}
     */
    action;

    /**
     * @type {TokenSystem}
     */
    token;

    /**
     * @type {ScheduleSystem}
     */
    schedule;

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
        this.action = null;
        this.token = null;
        this.schedule = null;
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
        this.action = new ActionSystem(this.events, this.state);
        this.token = new TokenSystem(this.events, this.state);
        this.schedule = new ScheduleSystem(
            this.events, this.state, 
            this.app.ticker
        );

        // events
        this.events.on(GameState.Event.TokenCreated, this.render.draw);
        this.events.on(GameState.Event.TokenDestroyed, this.render.erase);
        this.events.on(GameState.Event.ActionExecute, this.action.execute);
        this.events.on(GameState.Event.DEV_INPUT, this.schedule.schedule);
        
        // dev: to make systems available via developer's console
        window.state = this.state;
        window.token = this.token;
        window.input = this.input;
        window.schedule = this.schedule;
        window.action = this.action;

        // dev: sandbox
        this.token.create(
            0, 0,
            [
                {
                    name: 'cast',
                    duration: 3500,
                    tick: null,
                    cancelable: true
                },
                {
                    name: 'damage',
                    duration: 0,
                    tick: null,
                    cancelable: false
                },
                {
                    name: 'cooldown',
                    duration: 5000,
                    tick: null,
                    cancelable: false
                },
            ]
        );

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
        this.action = this.action.destructor();
        this.render = this.render.destructor();
        this.token = this.token.destructor();
        this.schedule = this.schedule.destructor();

        super.on_destroy();
        
        return this;
    }
}

export {
    BattlegroundsScene
};