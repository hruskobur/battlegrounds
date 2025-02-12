import { AreaEntity } from '../../../entities/area.js';
import { SelectionSystem } from '../selection.js';

/**
 * Returns all AreaEntity objects, iterated:
 * - from 0 to height
 * - from 0 to width
 * @this {SelectionSystem}
 * @returns {Array<AreaEntity>}
 */
function all_areas () {
    const selections = [];

    for(let y = 0; y < this.bg.height; ++y) {
        for(let x = 0; x < this.bg.width; ++x) {
            selections.push(
                this.bg.areas[y][x]
            );
        }
    }

    return selections;
}

export default all_areas;