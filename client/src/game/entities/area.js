import { PositionComponent } from '../components/position.js';
import { FactionComponent } from '../components/faction.js';
import { AreaSpriteComponent } from '../components/area_sprite.js';

class AreaEntity {
    /**
     * @type {PositionComponent}
     */
    position;

    /**
     * @type {FactionComponent}
     */
    faction;

    /**
     * @type {AreaSpriteComponent} 
     */
    graphics;

    constructor () {
        this.position = new PositionComponent();
        this.faction = new FactionComponent();
        this.graphics = new AreaSpriteComponent();
    }
}

export {
    AreaEntity
};