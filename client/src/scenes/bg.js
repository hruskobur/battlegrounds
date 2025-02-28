import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { TokenSystem } from '../game/system/token.js';
import { RenderSystem } from '../game/system/render.js';
import { InputSystem } from '../game/system/input.js';
import { ExecuteSystem } from '../game/system/execute.js';
import { ScheduleSystem } from '../game/system/schedule.js';
import { UpdateSystem } from '../game/system/update.js';

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
     * @type {ScheduleSystem}
     */
    schedule;

    /**
     * @type {UpdateSystem}
     */
    update;
    
    /**
     * @type {ExecuteSystem}
     */
    execute;

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

        this.schedule = null;
        this.update = null;
        this.execute = null;
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
        this.schedule = new ScheduleSystem(this.events, this.state);
        this.update = new UpdateSystem(this.events, this.state);
        this.execute = new ExecuteSystem(this.events, this.state);
       
        // events
        this.events.on(GameState.Event.TokenCreated, this.render.draw);
        this.events.on(GameState.Event.TokenDestroyed, this.render.erase);
        this.events.on(GameState.Event.ActionUpdate, this.execute.execute);
        this.events.on(GameState.Event.DEV_INPUT, this.schedule.schedule);
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
                        cancelable: true
                    },
                    {
                        name: 'damage',
                        duration: 5000,
                        tick: 1000,
                        cancelable: false
                    },
                    {
                        name: 'cooldown',
                        duration: 5000,
                        tick: null,
                        cancelable: false
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
        this.events.off(GameState.Event.ActionUpdate, this.execute.execute);
        this.events.off(GameState.Event.DEV_INPUT, this.schedule);
        console.log('BattlegroundsScene.on_destroy', this.events.eventNames());

        // systems
        this.state = null;
        this.token = this.token.destructor();
        this.render = this.render.destructor();
        this.update = this.update.destructor();
        this.input = this.input.destructor();
        this.execute = this.execute.destructor();

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

        this.update.update(dt);
    }
}

export {
    BattlegroundsScene
};