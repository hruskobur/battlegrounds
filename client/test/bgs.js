/* imports ********************************************************************/
// managers
import { Messenger } from '../src/core/messenger.js';
import * as ScenesManager from '../src/core/scenes.js';

// scenes
import { WorldScene } from '../src/scenes/world.js';
import { TestScene } from './scene/test.js';

/* the "main" function ********************************************************/
window.addEventListener(
    'load',
    async event => {
        await ScenesManager.init(
            {
                scenes: [
                    new WorldScene(),
                    new TestScene(
                        {
                            a: 'model.a',
                            x: 1000000
                        }
                    )
                ]
            }
        );

        // note: development
        DEVELOPMENT_scene_manager();
        DEVELOPMENT_test_scene();
    }
);

/* development ****************************************************************/
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

function DEVELOPMENT_test_scene () {
    Messenger.on(
        TestScene.Events.LoadBtn,
        e => console.log(TestScene.Events.LoadBtn, 'event from scene!')
    );
}