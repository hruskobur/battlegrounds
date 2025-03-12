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

                area.faction = Math.floor(Math.random() * 2) === 0 
                ? this.state.faction_a
                : this.state.faction_b;
                
                zone.area = area;
            }
        );
    }
}

export {
    AreaSystem
};