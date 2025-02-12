import { GameEntity } from '../entities/game.js';
import { EntitySelection } from './selection.js';

/**
 * 
 * @this {TheGame} game 
 * @param {Number} x 
 * @param {Number} y 
 * @returns {EntitySelection|null}
 */
function target (x, y) {
    if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return null;
    }

    return new EntitySelection(
        this.areas[y][x],
        this.tokens[y][x]
    );
}

export default target;