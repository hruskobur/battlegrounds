import * as Pixi from 'pixi.js';

import { Scene } from '../core/scene.js';

class WorldScene extends Scene {
    static Id = 'world';
    
    static Events = Object.freeze(
        {}
    );

    constructor () {
        super();
    }

    /**
     * @override
     * @param {Pixi.Container} stage 
     * @param {Pixi.Renderer} renderer
     * @returns {Scene} this
     */
    on_create (stage, renderer) {
        this.container = new Pixi.Container();

        return super.on_create(stage, renderer);
    }
}

export {
    WorldScene
};