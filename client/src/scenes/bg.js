import { SceneBase, Pixi } from '../core/scene.js';
import { GameState } from '../game/state/game.js';
import { InputSystem } from '../game/system/input.js';
import { RenderSystem } from '../game/system/render.js';

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
     * 
     * @param {Pixi.Application} app 
     * @param {EventEmitter} events 
     */
    constructor (app, events) {
        super(app, events);

        this.state = null;
        
        this.render = null;
        this.input = null;
    }

    /**
     * @protected
     * @override
     * @param {*} scenario 
     * @returns {BattlegroundsScene} this
    */
    on_create(scenario) {
        super.on_create();

        this.state = new GameState(scenario)
        .init();

        this.render = new RenderSystem(this.events, this.state, this.container)
        .init();

        this.input = new InputSystem(this.events, this.state);
        
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

        super.on_destroy();
        
        return this;
    }
}

export {
    BattlegroundsScene
};