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
    stop as heartbeat_stop,
    pause as heartbeat_pause
} from '../src/heartbeat.js';

import {
    init as scene_init,
    Events as SceneEvents,
    scene
} from '../src/scenes.js';

import { 
    TestScene
} from '../src/scenes/test.js';
import { GameScene } from '../src/scenes/game.js';

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
        e => {
            // note: just print event name, whenever heartbeat starts
            console.log(HeartbeatEvents.Start, e);
        }
    );

    Messenger.on(
        HeartbeatEvents.Stop,
        e => {
            // note: just print event name, whenever heartbeat stops
            console.log(HeartbeatEvents.Stop, e);
        }
    );
}

function test_scenes () {
    Messenger.on(
        TestScene.Events.LoadBtn,
        e => {
            // note: click on load button will:
            // - unload TestScene 
            // - load GameScene
            scene('game');
        }
    );

    Messenger.on(
        SceneEvents.Load,
        e => {
            console.log(SceneEvents.Load, e);

            // note: based on loaded scene's id, performs a specifc app-level
            // load-action
            switch(e.id) {
                case 'test': {
                    break;
                }
                case 'game': {
                    heartbeat_start();
                    
                    break;
                }
            }
        }
    );

    Messenger.on(
        SceneEvents.Unload,
        e => {
            console.log(SceneEvents.Load, e);

            // note: based on loaded scene's id, performs a specifc app-level
            // unload-action
            switch(e.id) {
                case 'test': {
                    break;
                }
                case 'game': {
                    heartbeat_stop();
                    
                    break;
                }
            }
        }
    );

    Messenger.on(
        GameScene.Events.Quit,
        e => {
            // note: calling quit from the GameScene will:
            // - unload GameScene
            // - load TestScene
            scene('test');
        }
    );

    Messenger.on(
        GameScene.Events.Pause,
        e => {
            // note: calling pause form the GameScene will
            // - pause/unpause heartbeat
            heartbeat_pause();
        }
    );

    window.scene = scene;
}