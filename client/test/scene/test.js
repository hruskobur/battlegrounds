import * as Pixi from 'pixi.js';

import { Messenger } from '../../src/core/messenger.js';
import { Scene } from '../../src/core/scene.js'

/**
 * This is the model instance, that holds all other sub-model instances.
 * There are two approaches:
 * - the whole model instance is passed to every scene
 * - only scene-relevant sub-model instance i passed
 * 
 * Note: the first one may be more suitable, becase World MAY NEED TO KNOW
 * details of every battleground and other way arond too...
 * @typedef {Object} TestModel
 * @property {Number} x
 * @property {String} a
 */

class TestScene extends Scene {
    static Events = Object.freeze({
        LoadBtn: 'test.load.btn'
    });

    /**
     * @type {TestModel}
     */
    data;

    /**
     * 
     * @param {TestModel} data 
     */
    constructor (data) {
        super('test');

        this.data = data;
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

        console.log('TestScene.on_build', this.data);
    }

    /**
     * @override
     * @param {Pixi.Container} stage 
     * @returns {TestModel} this
     */
    on_unload (stage) {
        // note: this is how to remove static events from derived class in the
        // base implementation of scene
        // assume that this code is in Scene (scene.js)
        // Object
        // .values(this.constructor.Events)
        // .forEach(
        //     event => {
        //         console.log('Scene.on_unload', 'event removed', event);
        //         Messenger.removeAllListeners(event);
        //     }
        // );

        // note: override is not needed; it is here just as an example
        return super.on_unload(stage);
    }
}

export {
    TestScene
};