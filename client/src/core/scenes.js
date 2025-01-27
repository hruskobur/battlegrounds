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
 *  parent: HTMLElement
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
            background: 0x203F75,
            // note: correct initial dimensions
            width: cfg.parent.clientWidth,
            height: cfg.parent.clientHeight,
            resizeTo: cfg.parent
        }
    );

    // note: dev / debug ?
    PixiApp.stage.label = 'stage';

    // scenes: scenes here are constructors, not instances
    cfg.scenes.forEach(scene => {
        Scenes.set(scene.Id, scene);
    });

    // pixi: "display" canvas
    cfg.parent.appendChild(PixiApp.canvas);
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

    // old scene: remove from stage & destroy
    if(ActiveScene != null) {
        while(PixiApp.stage.children.length > 0) {
            PixiApp.stage.removeChildAt(0);
        }

        ActiveScene
        .on_disconnect(PixiApp)
        .on_destroy(PixiApp);
        
        ActiveScene = null;
    }

    // new scene: create & add to stage
    ActiveScene = new (Scenes.get(id))(data)
    .on_create(PixiApp)
    .on_connect(PixiApp);
    
    PixiApp.stage.addChild(ActiveScene.container);

    return ActiveScene;
}

export {
    PixiApp,
    init, 
    scene
};