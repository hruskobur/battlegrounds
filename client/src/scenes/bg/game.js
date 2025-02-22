import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { GameState } from '../../game/state/game.js';
import { InitialisationSystem } from '../../game/system/initialisation.js';
import { RendererSystem } from '../../game/system/renderer.js';
import { TokenSystem } from '../../game/system/token.js';
import { InputSystem } from '../../game/system/input.js';
import { ActionSystem } from '../../game/system/action.js';

class GameInstance {
    /**
     * @param {Pixi.Container} container
     * @param {Pixi.Ticker} ticker
     * @param {EventEmitter} events 
     * @param {GameState} state
     * @param {*} scenario 
     */
    constructor (container, ticker, events, state, scenario) {
        // systems
        // note: no need for caching this system
        new InitialisationSystem(events, state)
        .init(scenario);

        this.renderer = new RendererSystem(events, state, container)
        .init();

        this.tokens = new TokenSystem(events, state);
        this.input = new InputSystem(events, state);
        this.actions = new ActionSystem(events, state, ticker);

        // events
        events.on(GameState.Event.TokenCreate, this.renderer.draw);
        events.on(GameState.Event.TokenDestroy, this.renderer.erase);
        events.on('update', console.log);

        // dev: sandbox
        window.path = (o, fx, fy, tx, ty) => {
            GameState.Query.path(state, o, fx, fy, tx, ty)
            .forEach(a => {
                this.tokens.create(
                    a.position.x,
                    a.position.y
                );
            });
        }
        window.create = () => {
            this.tokens.create(0, 0);
        }
        window.cast = () => {
            this.actions.schedule(
                state.tokens[0][0]
            );
        }
    }

    /**
     * @public
     * @returns {GameInstance} this
     */
    destructor () {
        this.events = null;
        this.state = null;
        
        this.renderer.destructor();
        this.tokens.destructor();
        this.input.destructor();
        this.actions.destructor();

        return this;
    }
}

export {
    GameInstance
};