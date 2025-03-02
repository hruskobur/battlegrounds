import { TerrainComponent } from '../components/terrain.js';
import { AreaRenderableComponent } from '../components/renderable/area.js';
import { OwnershipComponent } from '../components/ownership.js';

class AreaEntity {
    /**
     * @type {TerrainComponent}
     */
    terrain;

    /**
     * @type {OwnershipComponent}
     */
    ownership;

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

        this.ownership = new OwnershipComponent(
            Number.MIN_SAFE_INTEGER
        );

        this.renderable = new AreaRenderableComponent();
    }
}

export {
    AreaEntity
};