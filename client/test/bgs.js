/* imports ********************************************************************/
// managers
import { Messenger } from '../src/core/messenger.js';
import * as ScenesManager from '../src/core/scenes.js';

// scenes
import { WorldScene } from '../src/scenes/world.js';
import { BattlegroundScene } from '../src/scenes/battleground.js';

/* the "main" function ********************************************************/
window.addEventListener(
    'load',
    async event => {
        await ScenesManager.init(
            {
                scenes: [
                    // note: first here is first to load
                    new WorldScene(),
                    new BattlegroundScene(),
                ]
            }
        );

        // note: development
        DEVELOPMENT_scene_manager();
    }
);

/* sandbox / development ******************************************************/
function DEVELOPMENT_scene_manager () {
    window.scene = ScenesManager.scene;

    Messenger.on(
        ScenesManager.Events.Load,
        e => console.log(ScenesManager.Events.Load, e)
    );

    Messenger.on(
        ScenesManager.Events.Unload,
        e => console.log(ScenesManager.Events.Unload, e)
    );
}