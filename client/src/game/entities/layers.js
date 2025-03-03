import { AreaRenderableComponent } from '../components/area/renderable.js';
import { TokenRenderableComponent } from '../components/token/renderable.js';

class LayersEntity {
    /**
     * @type {AreaRenderableComponent}
     */
    areas;

    /**
     * @type {TokenRenderableComponent}
     */
    tokens;

    constructor () {
        this.areas = new AreaRenderableComponent({
            eventMode: 'static',
            zIndex: 0,
            label: 'areas'
        });

        this.tokens = new TokenRenderableComponent({
            eventMode: 'static',
            zIndex: 0,
            label: 'tokens'
        });
    }
}

export {
    LayersEntity
};