import * as Pixi from 'pixi.js';
import { Emitter } from './emitter.js';
import { SceneBase } from './scene.js';

/**
 * @type {Pixi.Application}
 */
const PixiApp = new Pixi.Application();

/**
 * @type {Map<String, SceneBase>}
 */
const Scenes = new Map();

/**
 * @type {SceneBase}
 */
let ActiveScene = null;

/**
 * @public
 * @param {{
 *  scenes: Array<SceneBase>,
 *  parent: HTMLElement
 * }} cfg 
 * @returns {Promise<void>}
 */
async function init (cfg) {
    // pixi: init
    await PixiApp.init(
        {
            background: 0x203F75,
            // note: correct initial dimensions
            width: cfg.parent.clientWidth,
            height: cfg.parent.clientHeight,
            resizeTo: cfg.parent,
        }
    );
    PixiApp.ticker.stop();
    PixiApp.stage.label = 'scene.stage';

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
 * @param {...any} payload scene-relevant payload
 * @returns {SceneBase} 
 */
function scene (id, ...payload) {
    // checks: valid scene id
    if(Scenes.has(id) === false) {
        throw new Error();
    }

    // old scene: remove from stage & destroy
    if(ActiveScene != null) {
        PixiApp.ticker.stop();
        ActiveScene.container.visible = false;

        while(PixiApp.stage.children.length > 0) {
            PixiApp.stage.removeChildAt(0);
        }

        ActiveScene.on_destroy();
        ActiveScene = null;
    }

    // new scene: create & add to stage
    ActiveScene = new (Scenes.get(id))(
        PixiApp, Emitter
    ).on_create(...payload);
    
    PixiApp.stage.addChild(ActiveScene.container).visible = true;
    PixiApp.ticker.start();

    return ActiveScene;
}

export {
    PixiApp,
    init, 
    ActiveScene, scene
};