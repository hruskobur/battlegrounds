/* imports ********************************************************************/

// managers
import * as Events from '../../src/core/emitter.js';
import * as Persistency from '../../src/core/persistency.js';
import * as Scenes from '../../src/core/scenes.js';

// scenes
import { BgScene } from '../../src/scenes/bg/scene.js';

/* the "main" function ********************************************************/

window.addEventListener(
    'load',
    async event => {
        // initialize: managers
        await Scenes.init(
            {
                scenes: [
                    BgScene
                ],
                parent: document.querySelector('#bg-app')
            }
        );

        // dev: debug stuff
        globalThis.__PIXI_APP__ = Scenes.PixiApp;

        window.Bgs = Object.freeze(
            {
                Events,
                Scenes,
                Persistency
            }
        );

        Scenes.scene('bg', {x:10});
    }
);

/* sandbox ********************************************************************/
