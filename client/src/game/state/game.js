import { AreaEntity } from '../entities/area.js';
import { TokenEntity } from '../entities/token.js';
import { RendererEntity } from '../entities/renderer.js';

/**
 * @class GameState
 * 
 * @description 
 * This class serves as an "archetype entity container" and global state 
 * manager. 
 * It organizes entities into specialized containers based on fixed 
 * compositions, allowing various systems to access data directly without
 * performing runtime entity-type checks.
 *
 * This specialized implementation intentionally forgoes the full flexibility of 
 * a generic ECS entity-component system, which means that while it is more 
 * performant and simpler to work with for our use-case, it may not support 
 * dynamic component compositions.
 */
class GameState {
    /**
     * @type {Number}
     */
    width;

    /**
     * @type {Number}
     */
    height;

    /**
     * @type {RendererEntity}
     */
    renderer;

    /**
     * @type {Array<Array<AreaEntity>>}
     */
    areas;
    /**
     * @type {Array<Array<TokenEntity>>}
     */
    tokens;

    /**
     */
    constructor () {
        this.width = 0;
        this.height = 0;

        this.areas = [];
        this.tokens = [];

        this.renderer = new RendererEntity();
    }
}

export {
    GameState
};