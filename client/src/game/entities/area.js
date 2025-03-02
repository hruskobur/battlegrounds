import { TerrainComponent } from '../components/terrain.js';
import { AreaRenderableComponent } from '../components/renderable/area.js';

class AreaEntity {
    /**
     * @type {TerrainComponent}
     */
    terrain;

    /**
     * @type {AreaRenderableComponent}
     */
    renderable;

    /**
     */
    constructor () {
        this.terrain = new TerrainComponent(
            '',
            0
        );

        this.renderable = new AreaRenderableComponent();
    }
}

export {
    AreaEntity
};