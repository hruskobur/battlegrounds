/* imports ********************************************************************/

// managers
import * as Events from '../../src/core/emitter.js';
import * as Scenes from '../../src/core/scenes.js';

// scenes
import { BattlegroundsScene } from '../../src/scenes/bg.js';

// tests
// . . .

/* the "main" function ********************************************************/

window.addEventListener(
    'load',
    async event => {
        // initialize: managers
        await Scenes.init(
            {
                scenes: [
                    BattlegroundsScene
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
            }
        );

        // sandbox
        Scenes.scene(
            'bg',
            {
                width: 10,
                height: 10
            }
        );
    }
);