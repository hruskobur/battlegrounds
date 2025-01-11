import * as Pixi from 'pixi.js';

import { Messenger } from '../messenger.js';
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