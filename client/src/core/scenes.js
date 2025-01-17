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
 * @type {Pixi.Container}
 */
const Stage = Application.stage;

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
 */
async function init (cfg) {
    // pixi: init
    await Application.init(
        {
            width: 1024,
            height: 1024,
            background: 0x203F75
        }
    );

    document.body.appendChild(Application.canvas);

    // scenes: create
    cfg.scenes.forEach(scene => {
        Scenes.set(scene.id, scene)
    });

    // scenes: initial scene (this avoids the load/unload event)
    ActiveScene = Scenes.get('world');
    ActiveScene.on_load(Stage);
}

/**
 * 
 * @param {String} id 
 * @returns {Scene} 
 */
function scene (id) {
    // checks
    if(Scenes.has(id) === false) {
        throw new Error();
    }

    if(ActiveScene.id === id) {
        throw new Error();
    }

    // unload
    ActiveScene.on_unload(Stage);
    Messenger.emit(Events.Unload, ActiveScene);

    // load & build
    ActiveScene = Scenes.get(id);
    ActiveScene.on_load(Stage);
    Messenger.emit(Events.Load, ActiveScene);

    return ActiveScene;
}

export {
    init, Events,
    scene
};