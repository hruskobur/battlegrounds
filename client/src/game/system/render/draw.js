import { BuffEntity } from '../../entities/buff.js';
import { TokenEntity } from '../../entities/token.js';
import { RenderSystem } from '../render.js';

/**
 * @this {RenderSystem}
 * @public
 * @param {TokenEntity|BuffEntity} entity 
 * @returns {RenderSystem} this
 */
function draw (entity) {
    const renderable = entity.renderable;

    // todo: something like this
    // switch(renderable.constructor.Layer) {
    //     case 'x': {
    //         return fn_draw_x(); // returns this
    //     }
    //     case 'y': {
    //         return fn_draw_y(); // returns this
    //     }
    //     default: {
    //         return this;
    //     }
    // }

    this.state
    .layer[renderable.constructor.Layer]
    .addChild(renderable);

    return this;
}

export default draw;