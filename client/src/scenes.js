import * as Pixi from 'pixi.js';
import { Messenger } from './messenger.js';
import { Scene } from './scene.js';

// dev!1
import { TestScene } from './scenes/test.js';

const Events = Object.freeze({
    Load: 'scenes.load'
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
 * @param {*} cfg 
 */
async function init (cfg) {
    console.info('todo: scene cfg');

    await Application.init(
        {
            width: 1024,
            height: 1024,
            background: 0x203F75
        }
    );

    document.body.appendChild(Application.canvas);

    // todo: create all scenes here!
    Scenes.set('test', new TestScene());
}

/**
 * 
 * @param {String} id 
 * @returns {Scene} 
 */
function scene (id) {
    if(Scenes.has(id) === false) {
        throw new Error();
    }

    if(ActiveScene !== null) {
        ActiveScene.on_unload(Stage);
    }

    ActiveScene = Scenes.get(id);
    ActiveScene.on_load(
        // note: i dont know how data will be provided for the scene
        // cache? fixed? will this even be needed?
        // for now: empty object, just as a demo
        {},
        Stage
    );

    Messenger.emit(Events.Load, ActiveScene);

    return ActiveScene;
}

export {
    init, Events,
    scene
};