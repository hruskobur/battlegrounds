/* imports ********************************************************************/
// managers
import * as Events from '../src/core/emitter.js';
import * as Persistency from '../src/core/persistency.js';
import * as Scenes from '../src/core/scenes.js';

// models
import { Game } from '../src/game/game.js';
import { GameEditor } from '../src/game/editor.js';

// scenes
import { DevelopmentScene } from './development.js';
import { GameSelection } from '../src/game/selection.js';

/* the "main" function ********************************************************/

window.addEventListener(
    'load',
    async event => {
        const TheGame = new Game();
        const TheEditor = new GameEditor(TheGame);
        const TheSelection = new GameSelection(TheGame);

        // initialize: managers
        await Scenes.init(
            {
                scenes: [
                    DevelopmentScene
                ],
                parent: document.querySelector('#bg-app')
            }
        );

        const TheScene = Scenes.scene('dev', TheGame);

        // dev: debug stuff
        globalThis.__PIXI_APP__ = Scenes.PixiApp;

        window.Bgs = Object.freeze(
            {
                Persistency, Scenes,
                TheGame, TheEditor, TheSelection, TheScene
            }
        );

        console.log(
            TheGame, TheEditor, TheSelection, TheScene
        );
    }
);

/* logic **********************************************************************/
