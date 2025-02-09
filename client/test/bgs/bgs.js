/* imports ********************************************************************/

// managers
import * as Events from '../../src/core/emitter.js';
import * as Persistency from '../../src/core/persistency.js';
import * as Scenes from '../../src/core/scenes.js';
import { TokenModel } from '../../src/game/token/model.js';

// scenes
import { BattlegroundsScene } from '../../src/scenes/bg/scene.js';

// tests
import * as Tests from './tests.js';

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
                Persistency
            }
        );

        Scenes.scene('bg', {});

        Tests.token_argc();
    }
);