import { SceneBase, Pixi } from '../../core/scene.js';
import { GameState } from '../../game/state/game.js';
import { GameInstance } from './game.js';

class BattlegroundsScene extends SceneBase {
    static Id = 'bg';

    /**
     * @type {GameState}
     */
    state;

    /**
     * @type {GameInstance}
     */
    instance;

    /**
     * 
     * @param {Pixi.Application} application 
     * @param {EventEmitter} events 
     */
    constructor (application, events) {
        super(application, events);

        this.state = null;
        this.instance = null;
    }

    /**
     * @protected
     * @override
     * @param {*} scenario 
     * @returns {BattlegroundsScene} this
    */
    on_create(scenario) {
        super.on_create();

        this.state = new GameState();
        this.instance = new GameInstance(
            this.container, this.events,
            this.state, scenario
        );
        
        return this;
    }

    /**
     * @protected
     * @override
     * @returns {BattlegroundsScene} this
     */
    on_destroy () {
        super.on_destroy();

        this.instance.destructor();
        this.instance = null;
        
        return this;
    }
}

export {
    BattlegroundsScene
};