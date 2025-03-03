import { AreaEntity } from '../entities/area.js';
import { EventEmitter, GameState, SystemBase } from './base.js';

class AreaSystem extends SystemBase {
    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        // todo: set functionality here
        // . . .

        // initialization
        const scenario = this.state.scenario; 
        this.state.iterate(
            (zone, x, y) => {
                // todo: set properties from scenario based on x,y OR create
                // defaults
                // for now, all defaults
                const area = new AreaEntity();
                area.terrain.difficulty = Math.floor(Math.random() * 100) + 1;
                area.terrain.geography = Math.floor(Math.random() * 5);
                area.renderable.x = x * area.renderable.width;
                area.renderable.y = y * area.renderable.height;
                area.renderable.terrain.alpha = (area.terrain.difficulty / 100);
                area.renderable.difficulty.text = area.terrain.difficulty;
                area.ownership.faction = Math.floor(Math.random() * 2);
                area.renderable.terrain.tint = (area.ownership.faction === 0)
                ? 'blue'
                : 'red';

                zone.area = area;
            }
        );
    }
}

export {
    AreaSystem
};