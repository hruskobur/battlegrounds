import * as Pixi from 'pixi.js';

import { Messenger } from './messenger.js';
import { Scene } from './scene.js';

const Events = Object.freeze({
    Load: 'scenes.load',
    Unload: 'scene.unload'
});

/**
 * @type {Pixi.Application}
 */
const Application = new Pixi.Application();

/**
 * @type {Map<String, Scene>}
 */
const Scenes = new Map();

/**
 * @type {Scene}
 */
let ActiveScene = null;

/**
 * 
 * @param {{
 *  scenes: Array<Scene>
 * }} cfg 
 * @returns {Promise<void>}
 */
async function init (cfg) {
    // note: ref. to Application injection
    Scene.Application = Application;

    // note: dev / debug
    globalThis.__PIXI_APP__ = Application;

    // pixi: init
    await Application.init(
        {
            width: 1024,
            height: 1024,
            background: 0x203F75
        }
    );

    document.body.appendChild(Application.canvas);

    // scenes: create & load the initial one
    cfg.scenes.forEach(scene => {
        Scenes.set(scene.constructor.Id, scene);
    });

    this.scene(cfg.scenes[0].constructor.Id);
}

/**
 * 
 * @param {String} id 
 * @returns {Scene} 
 */
function scene (id) {
    // checks: valid scene id
    if(Scenes.has(id) === false) {
        throw new Error();
    }

    // check: prevent scene reloading
    if(ActiveScene != null && ActiveScene.constructor.Id === id) {
        throw new Error();
    }

    // unload
    if(ActiveScene != null) {
        ActiveScene
        .on_disconnect(Messenger, Application.ticker)
        .on_destroy(Application.stage, Application.renderer);
        
        Messenger.emit(Events.Unload, ActiveScene);
    }

    // load
    ActiveScene = Scenes
    .get(id)
    .on_create(Application.stage, Application.renderer)
    .on_connect(Messenger, Application.ticker);

    Messenger.emit(Events.Load, ActiveScene);

    return ActiveScene;
}

export {
    init, Events,
    scene
};