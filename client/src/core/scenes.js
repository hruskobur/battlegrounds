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
            // note: default - correct dimensions
            width: cfg.parent.clientWidth,
            height: cfg.parent.clientHeight
        }
    );

    // observer: resize handler
    new ResizeObserver(
        (entries) => {
            console.info(
                'TODO: use ASPECT-PRESERVED SCALING here'
            );

            // note: let's rely on the fact, that only cfg.parent is observed
            const parent = entries[0].target;

            const width = parent.clientWidth;
            const height = parent.clientHeight;

            PixiApp.renderer.resize(width, height);

            if(ActiveScene != null) {
                ActiveScene.on_resize(width, height);
            }
        }
    ).observe(cfg.parent);

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
        ActiveScene.container.removeFromParent();
        ActiveScene.on_destroy(PixiApp.stage, PixiApp.renderer, PixiApp.ticker);
        
        ActiveScene = null;
    }

    // new scene: create & add to stage
    ActiveScene = new (Scenes.get(id))(data)
    .on_create(PixiApp.stage, PixiApp.renderer, PixiApp.ticker);
    
    PixiApp.stage.addChild(ActiveScene.container);

    return ActiveScene;
}

export {
    PixiApp,
    init, 
    scene
};