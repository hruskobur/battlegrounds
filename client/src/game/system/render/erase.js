import { TokenEntity } from '../../entities/token.js';
import { RenderSystem } from '../render.js';

/**
 * @public
 * @this {RenderSystem}
 * @param {TokenEntity} entity 
 * @returns {RenderSystem} this
 */
function erase(entity) {
    const renderable = entity.renderable;

    while (renderable.children.length > 0) {
        renderable.removeChildAt(0);
    }

    renderable.removeFromParent();
}

export default erase;