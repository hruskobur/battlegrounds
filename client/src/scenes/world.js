import * as Pixi from 'pixi.js';

import { Messenger } from '../core/messenger.js';
import { Scene } from '../core/scene.js';

class WorldScene extends Scene {
    static Events = Object.freeze({
    });

    constructor () {
        super('world');
    }
}

export {
    WorldScene
};