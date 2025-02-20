import { PositionComponent } from '../components/position.js';
import { TerrainComponent } from '../components/terrain.js';
import { StatsComponent } from '../components/stats.js';
import { AreaRenderableComponent } from '../components/renderable/area.js';

class AreaEntity {
    /**
     * @type {PositionComponent}
     */
    position;

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
        this.position = new PositionComponent(
            Number.MIN_SAFE_INTEGER,
            Number.MIN_SAFE_INTEGER
        );

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