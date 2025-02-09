import { TheGame } from '../game.js';
import { SelectionModel } from './model.js';

/**
 * @this {TheGame}
 * @param {Number} x 
 * @param {Number} y 
 * @param {Number} e 
 * @returns {Array<SelectionModel>}
 */
function extend (x, y, e) {
    let xf = x - e;
    if(xf < 0) xf = 0;

    let xt = x + e;
    if(xt >= this.width) xt = this.width - 1;

    let yf = y - e;
    if(yf < 0) yf = 0;

    let yt = y + e;
    if(yt >= this.height) yt = this.height - 1;

    const selections = [];

    for(let y = yf; y <= yt; ++y) {
        for(let x = xf; x <= xt; ++x) {
            selections.push(
                new SelectionModel(
                    this.areas[y][x],
                    this.tokens[y][x]
                )
            );
        }
    }

    return selections;
}

export default extend;