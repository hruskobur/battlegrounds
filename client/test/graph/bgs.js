/* imports ********************************************************************/
// modules
import * as Pixi from 'pixi.js';

// managers
import * as Events from '../../src/core/emitter.js';
import * as Persistency from '../../src/core/persistency.js';
import * as Scenes from '../../src/core/scenes.js';

// models
import { Game } from './game/game.js';
import { GameEditor } from './game/editor.js';
import { GameSelector } from './game/selector.js';

// scenes
import { DevelopmentScene } from './development.js';
import { SceneBase } from '../../src/core/scene.js';

// level-development
import * as Maps from './maps.js'

/* the "main" function ********************************************************/

window.addEventListener(
    'load',
    async event => {
        const TheGame = new Game();
        const TheEditor = new GameEditor(TheGame);
        const TheSelector = new GameSelector(TheGame);

        TheEditor.import(Maps.DevIslande);

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
                TheGame, 
                TheEditor,
                TheSelector,
                Maps
            }
        );
    }
);

/* sandbox ********************************************************************/
