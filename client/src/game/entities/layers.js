import * as Pixi from 'pixi.js';

class LayersEntity {
    /**
     * @type {Pixi.Container}
     */
    areas;

    /**
     * @type {Pixi.Container}
     */
    tokens;

    constructor () {
        this.areas = new Pixi.Container({
            eventMode: 'static',
            zIndex: 0,
            label: 'areas'
        });

        this.tokens = new Pixi.Container({
            eventMode: 'static',
            zIndex: 0,
            label: 'tokens'
        });
    }
}

export {
    LayersEntity
};