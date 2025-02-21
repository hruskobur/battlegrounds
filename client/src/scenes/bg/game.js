import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { GameState } from '../../game/state/game.js';
import { InitialisationSystem } from '../../game/system/initialisation.js';
import { RendererSystem } from '../../game/system/renderer.js';
import { TokenSystem } from '../../game/system/token.js';
import { InputSystem } from '../../game/system/input.js';

class GameInstance {
    /**
     * @param {Pixi.Container} container
     * @param {EventEmitter} events 
     * @param {GameState} state
     * @param {*} scenario 
     */
    constructor (container, events, state, scenario) {
        // note: no need for caching this system
        new InitialisationSystem(events, state)
        .init(scenario);

        // systems
        this.renderer = new RendererSystem(events, state, container)
        .init();

        this.tokens = new TokenSystem(events, state);
        this.input = new InputSystem(events, state);

        // events
        events.on(GameState.Event.TokenCreate, this.renderer.draw);
        events.on(GameState.Event.TokenDestroy, this.renderer.erase);

        window.path = (o, fx, fy, tx, ty) => {
            GameState.Query.path(state, o, fx, fy, tx, ty)
            .forEach(a => {
                this.tokens.create(
                    a.position.x,
                    a.position.y
                );
            });
        }
        window.tokens = this.tokens;
    }

    /**
     * @public
     * @returns {GameInstance} this
     */
    destructor () {
        this.events = null;
        this.state = null;
        
        this.renderer = null;
        this.tokens = null;
        this.input = null;

        return this;
    }
}

export {
    GameInstance
};