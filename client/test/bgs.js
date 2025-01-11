/* imports ********************************************************************/
import { Messenger } from '../src/messenger.js';

import {
    init as keyboard_init,
    Events as KeyboardEvents 
} from '../src/keyboard.js';

import {
    init as heartbeat_init, 
    Events as HeartbeatEvents,
    start as heartbeat_start,
    stop as heartbeat_stop
} from '../src/heartbeat.js';

import {
    init as scene_init,
    Events as SceneEvents,
    scene
} from '../src/scenes.js';

import { 
    TestScene
} from '../src/scenes/test.js';

/* the "main" function ********************************************************/
window.addEventListener(
    'load',
    async event => {
        await scene_init({});
        keyboard_init({});
        heartbeat_init({});

        test_heartbeat();
        test_scenes();
    }
);

/* tests & development *-******************************************************/
function test_heartbeat () {
    Messenger.on(
        HeartbeatEvents.Start, 
        e => console.log(HeartbeatEvents.Start)
    );

    Messenger.on(
        HeartbeatEvents.Stop,
        e => console.log(HeartbeatEvents.Stop)
    );
    
    window.start = heartbeat_start;
    window.stop = heartbeat_stop;
}

function test_scenes () {
    Messenger.on(
        TestScene.Events.LoadBtn,
        e => console.log('a button on TestScene has been clicked!')
    );

    window.scene = scene;
}