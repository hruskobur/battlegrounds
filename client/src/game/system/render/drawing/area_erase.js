import * as Pixi from 'pixi.js';
import { GameStateZone } from '../../../state/zone.js';
import { RenderSystem } from '../../render.js';
/**
 * Erases an existing AreaEntity.
 * 
 * @public
 * @this {RenderSystem}
 * @param {GameStateZone} zone 
 * @returns {RenderSystem} this
 */
function area_erase (zone) {
    const area = zone.area;
    if(area == null) {
        return this;
    }

    const renderable = area.renderable;

    renderable.removeFromParent();

    return this;
}

export default area_erase;