/* imports ********************************************************************/
// managers
import * as Messages from '../src/core/messenger.js';
import * as Persistency from '../src/core/persistency.js';
import * as Scenes from '../src/core/scenes.js';

// scenes
import { WorldScene } from '../src/scenes/world.js';
import { BattlegroundScene } from '../src/scenes/battleground.js';

// models
import { WorldModel } from '../src/model/world.js';

/* the "main" function ********************************************************/
const World = new WorldModel();
World.battlegrounds.push(
    {
        name: 'Site Under Development',
        world_x: 256, world_y: 256,
        width: 10, height: 10
    }
);

window.addEventListener(
    'load',
    async event => {
        // initialize: managers
        await Persistency.init();
        await Scenes.init(
            {
                scenes: [
                    WorldScene,
                    BattlegroundScene,
                ],
                parent: document.querySelector('#bg-app')
            }
        );

        // initialize: event handling & start the world (via emit)
        Messages.Emitter
        .on(Messages.Requests.EnterBg, on_enter_bg)
        .on(Messages.Requests.EnterWorld, on_enter_world)
        .on(Messages.Requests.GameSave, on_game_save)
        .on(Messages.Requests.GameLoad, on_game_load)
        .emit(Messages.Requests.GameLoad);

        // development
        window.Battlegrounds = Object.freeze(
            {
                Messages, Persistency, Scenes,
                World
            }
        );
    }
);

/* logic **********************************************************************/
function on_game_load () {
    console.log('on_game_load');
    console.info('TODO', 'persistency.load');

    Messages.Emitter.emit(Messages.Requests.EnterWorld);
}

function on_game_save () {
    console.log('on_game_load');
    console.info('TODO', 'persistency.save');
}

function on_enter_world () {
    console.log('on_game_world');
    Scenes.scene('world', World);
}

/**
 * 
 * @param {String} id 
 */
function on_enter_bg (id) {
    console.log('on_game_bg');

    const bg = World.battlegrounds.find(bg => bg.name === id);
    if(bg == null) {
        throw new Error();
    }

    Scenes.scene('bg', World, bg);
}
