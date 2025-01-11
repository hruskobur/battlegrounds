import { Messenger } from '../messenger.js';
import * as Pixi from 'pixi.js';
import { Scene } from '../scene.js';

class GameScene extends Scene {
    static Events = Object.freeze({
        Quit: 'game.quit',
        Pause: 'game.pause'
    });

    constructor () {
        super('game');
    }

    /**
     * @override
     */
    on_build () {
        console.log('build GameScene UI here!');
    }

    /**
     * @override
     * @param {Object} data 
     * @param {Pixi.Container} stage 
     * @returns {Scene} this
     */
    on_load (data, stage) {
        super.on_load(data, stage);

        return this;
    }

    /**
     * @virtual
     * @param {Pixi.Container} stage 
     * @returns {GameScene} this
     */
    on_unload (stage) {
        super.on_unload(stage);

        return this;
    }

    /**
     * @returns {GameScene} this
     */
    pause () {
        Messenger.emit(GameScene.Events.Pause, this);

        return this;
    }

    /**
     * @returns {GameScene} this
     */
    quit () {
        Messenger.emit(GameScene.Events.Quit, this);

        return this;
    }
}

export {
    GameScene
};