import { TheGame } from '../game.js'
import { SelectionModel } from './model.js';

/**
 * 
 * @this {TheGame} game 
 * @param {Number} x 
 * @param {Number} y 
 * @returns {SelectionModel|null}
 */
function target (x, y) {
    if(x < 0 || x >= this.width || y < 0 || y >= this.height) {
        return null;
    }

    return new SelectionModel(
        this.areas[y][x],
        this.tokens[y][x]
    );
}

export default target;