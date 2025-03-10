import { FactionComponent } from '../components/faction.js';
import { AreaTerrainComponent } from '../components/area/terrain.js';
import { AreaRenderableComponent } from '../components/area/renderable.js';

class AreaEntity {
    /**
     * @type {FactionComponent}
     */
    faction;

    /**
     * @type {AreaTerrainComponent}
     */
    terrain;

    /**
     * @type {AreaRenderableComponent}
     */
    renderable;

    /**
     */
    constructor () {

        this.faction = new FactionComponent(
            Number.MIN_SAFE_INTEGER,
            ''
        );

        this.terrain = new AreaTerrainComponent(
            '',
            0
        );

        this.renderable = new AreaRenderableComponent();
    }
}

export {
    AreaEntity
};