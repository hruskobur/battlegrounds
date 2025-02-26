import { TerrainComponent } from '../components/terrain.js';
import { StatsComponent } from '../components/stats.js';
import { AreaRenderableComponent } from '../components/renderable/area.js';

class AreaEntity {
    /**
     * @type {TerrainComponent}
     */
    terrain;

    /**
     * @type {StatsComponent}
     */
    stats;

    /**
     * @type {AreaRenderableComponent}
     */
    renderable;

    /**
     */
    constructor () {
        this.terrain = new TerrainComponent(
            '',
            Number.MIN_SAFE_INTEGER
        );

        this.stats = new StatsComponent(
            null,
            Number.MAX_SAFE_INTEGER
        );

        this.renderable = new AreaRenderableComponent();
    }
}

export {
    AreaEntity
};