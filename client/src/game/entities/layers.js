import { RenderableComponent } from '../components/renderable.js';

class LayersEntity {
    /**
     * @type {RenderableComponent}
     */
    areas;

    /**
     * @type {RenderableComponent}
     */
    tokens;

    constructor () {
        this.areas = new RenderableComponent({
            eventMode: 'static',
            zIndex: 0,
            label: 'areas'
        });

        this.tokens = new RenderableComponent({
            eventMode: 'static',
            zIndex: 0,
            label: 'tokens'
        });
    }
}

export {
    LayersEntity
};