import * as Pixi from 'pixi.js';
import EventEmitter from 'eventemitter3';
import { GameState } from '../../game/state/game.js';
import { RendererSystem } from '../../game/system/renderer.js';
import { InitialisationSystem } from '../../game/system/initialisation.js';

class GameInstance {
    /**
     * @param {Pixi.Container} container
     * @param {EventEmitter} events 
     * @param {GameState} state
     * @param {*} scenario 
     */
    constructor (container, events, state, scenario) {
        // systems
        this.renderer = new RendererSystem(container, events, state);

        // events
        // . . . 

        // note: no need for caching this system
        new InitialisationSystem(container, events, state)
        .init(scenario);

        // note: will be handled via events
        this.renderer.redraw();
    }

    /**
     * @public
     * @returns {GameInstance} this
     */
    destructor () {
        this.events = null;
        this.state = null;
        this.renderer = null;

        return this;
    }
}

export {
    GameInstance
};