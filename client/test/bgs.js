/* imports ********************************************************************/
// managers
import * as Messages from '../src/core/messenger.js';
import * as Persistency from '../src/core/persistency.js';
import * as Scenes from '../src/core/scenes.js';

// scenes
import { WorldScene } from '../src/scenes/world.js';
import { BattlegroundScene } from '../src/scenes/battleground.js';

// development
import { DummyData } from '../src/model/dummy.js';

/* the "main" function ********************************************************/

// development: dummy data are defined here, just to demonstrate
// independent life-time & management    
const Game = new DummyData();

window.addEventListener(
    'load',
    async event => {


        // initialize: managers
        await Persistency.init()
        await Scenes.init(
            {
                scenes: [
                    WorldScene,
                    BattlegroundScene,
                ]
            }
        );

        // initialize: event handling & start the world (via emit)
        Messages.Emitter
        .on(Messages.Requests.SceneLoad, on_scene_load)
        .on(Messages.Requests.GameSave, on_game_save)
        .on(Messages.Requests.GameLoad, on_game_load)
        .emit(Messages.Requests.GameLoad);

        // development
        window.Battlegrounds = Object.freeze({
            Messages, Persistency, Scenes,
            Game
        });
    }
);

/* logic **********************************************************************/
function on_game_load () {
    // note: ... this will read the game data (dummy for now) from cache
    // aka load-the-game
    Game.fromJSON(
        Persistency.load()
    );

    // note: sends a request to load the (initial )world scene with loaded game
    // data
    // note: this operates on global game data
    Messages.Emitter.emit(
        Messages.Requests.SceneLoad,
        'world', Game
    );
}

/**
 * 
 */
function on_game_save () {
    // note: saves provided data to the cache
    Persistency.save(
        Game,
        Persistency.StorageStrategy.Cache
    );
}

/**
 * 
 * @param {String} id 
 */
function on_scene_load (id) {
    // note: loads requested scene
    Scenes.scene(id, Game);
}