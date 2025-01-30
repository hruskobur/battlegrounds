/* imports ********************************************************************/
// managers
import * as Events from '../src/core/emitter.js';
import * as Persistency from '../src/core/persistency.js';
import * as Scenes from '../src/core/scenes.js';

// models
import { Game } from '../src/game/game.js';

// scenes
import { DevelopmentScene } from './development.js';
import { BattlegroundScene } from '../src/scenes/battleground.js';


/* the "main" function ********************************************************/

window.addEventListener(
    'load',
    async event => {
        const TheGame = new Game();

        // initialize: managers
        await Scenes.init(
            {
                scenes: [
                    DevelopmentScene,
                    BattlegroundScene
                ],
                parent: document.querySelector('#bg-app')
            }
        );

        // dev: debug stuff
        globalThis.__PIXI_APP__ = Scenes.PixiApp;

        window.Battlegrounds = Object.freeze(
            {
                Persistency, Scenes,
                Game: TheGame,
                enter
            }
        );

        Events.Emitter.on(Game.Request.Enter, enter)
        .emit(Game.Request.Enter, 'dev');
    }
);

/* logic **********************************************************************/
function enter (where, ...payload) {
    console.log('on_enter', ...payload);

    Scenes.scene(where, window.Battlegrounds.Game);
}
