import * as Pixi from 'pixi.js';
import { Scene } from './scene.js';

/**
 * @type {Pixi.Application}
 */
const PixiApp = new Pixi.Application();

/**
 * @type {Map<String, Scene>}
 */
const Scenes = new Map();

/**
 * @type {Scene}
 */
let ActiveScene = null;

/**
 * @public
 * @param {{
 *  scenes: Array<Scene>,
 *  initial: String
 * }} cfg 
 * @returns {Promise<void>}
 */
async function init (cfg) {
    // note: ref. to Application injection
    Scene.Application = PixiApp;

    // note: dev / debug
    globalThis.__PIXI_APP__ = PixiApp;

    // pixi: init
    await PixiApp.init(
        {
            width: 1024,
            height: 1024,
            background: 0x203F75
        }
    );

    document.body.appendChild(PixiApp.canvas);

    // scenes: scenes here are constructors, not instances
    cfg.scenes.forEach(scene => {
        Scenes.set(scene.Id, scene);
    });
}

/**
 * @public
 * @param {String} id id of the scene to load
 * @param {*} data scene-relevant data
 * @returns {Scene} 
 */
function scene (id, data) {
    // checks: valid scene id
    if(Scenes.has(id) === false) {
        throw new Error();
    }

    // check: prevent scene reloading
    if(ActiveScene != null && ActiveScene.constructor.Id === id) {
        throw new Error();
    }

    // destroy old scene
    if(ActiveScene != null) {
        ActiveScene
        .on_destroy(PixiApp.stage, PixiApp.renderer, PixiApp.ticker);
        
        ActiveScene = null;
    }

    // create new scene
    const CTOR = Scenes.get(id);

    ActiveScene = new CTOR(data)
    .on_create(PixiApp.stage, PixiApp.renderer, PixiApp.ticker);

    return ActiveScene;
}

export {
    init, 
    scene
};