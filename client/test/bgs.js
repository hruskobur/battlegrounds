/* imports ********************************************************************/
// modules
import * as Pixi from 'pixi.js';

// managers
import * as Events from '../src/core/emitter.js';
import * as Persistency from '../src/core/persistency.js';
import * as Scenes from '../src/core/scenes.js';

// models
import { Game } from '../src/game/game.js';
import { GameEditor } from '../src/game/editor.js';
import { GameSelector } from '../src/game/selector.js';

// scenes
import { DevelopmentScene } from './development.js';
import { SceneBase } from '../src/core/scene.js';

// level-development
import * as Maps from './maps.js'

/* the "main" function ********************************************************/

window.addEventListener(
    'load',
    async event => {
        const TheGame = new Game();
        const TheEditor = new GameEditor(TheGame);
        const TheSelector = new GameSelector(TheGame);

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
                Maps,
                visualise: visualise.bind(null, TheGame, TheScene)
            }
        );
    }
);

/* logic **********************************************************************/
/**
 * @param {Game} game 
 * @param {SceneBase} scene 
 */
function visualise (game, scene) {
    const areas = game.areas;
    const container = scene.container;

    // purge
    while(container.children.length > 0) {
        container.removeChildAt(0);
    }

    // draw: areas
    for(const area of areas.values()) {
        const sprite = new Pixi.Sprite(Pixi.Texture.WHITE);
        sprite.width = 16;
        sprite.height = 16;
        sprite.x = area.x;
        sprite.y = area.y;

        container.addChild(sprite);
    }

    // draw: paths
    {
        const paths = window.Bgs.TheSelector.paths();
        for(const path of paths) {
            console.log('drawing!');
            
            const from = path.a;
            const to = path.b;

            const sprite = new Pixi.Graphics()
            .moveTo(from.x + 8, from.y + 8)
            .lineTo(to.x + 8, to.y + 8)
            .stroke({ width: 2, color: 'lightblue' });

            container.addChild(sprite);
        }
    }
    }
