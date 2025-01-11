import * as Pixi from 'pixi.js';

import { Messenger } from '../messenger.js';
import { Scene } from '../scene.js';

class TestScene extends Scene {
    static Events = Object.freeze({
        LoadBtn: 'test.load.btn'
    });

    constructor () {
        super('test');
    }

    /**
     * @override
     */
    on_build () {
        const load_btn = new Pixi.Sprite(Pixi.Texture.WHITE);
        load_btn.width = 64;
        load_btn.height = 256;

        this.container.addChild(
            load_btn
        );

        load_btn.eventMode = 'static';
        load_btn.on(
            'pointerdown',
            Messenger.emit.bind(Messenger, TestScene.Events.LoadBtn)
        );
    }
}

export {
    TestScene
};