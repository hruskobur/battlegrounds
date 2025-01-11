import { Messenger } from '../messenger.js';
import * as Pixi from 'pixi.js';
import { Scene } from '../scene.js';

class GameScene extends Scene {
    static Events = Object.freeze({
        Quit: 'game.quit'
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
     * 
     */
    quit () {
        Messenger.emit(GameScene.Events.Quit, this);
    }
}

export {
    GameScene
};