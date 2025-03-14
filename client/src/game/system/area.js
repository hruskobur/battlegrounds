import { FactionComponent } from '../components/faction.js';
import { AreaEntity } from '../entities/area.js';
import { GameStateZone } from '../state/zone.js';
import { EventEmitter, GameState, SystemBase } from './base.js';

class AreaSystem extends SystemBase {
    /**
     * 
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        // initialization
        const scenario = this.state.scenario; 
        this.state.iterate(
            (zone, x, y) => {
                const area = new AreaEntity();
                area.position.x = x;
                area.position.y = y;

                area.faction = Math.floor(Math.random() * 2) === 0 
                ? this.state.factions[0]
                : this.state.factions[1];
                
                zone.area = area;
            }
        );
    }

    /**
     * 
     * @param {Number} cx coordinate x-axis
     * @param {Number} cy coordinate y-axis
     * @param {Number} fid faction id
     * @returns {AreaSystem} this
     */
    change_faction = (cx, cy, fid) => {
        const zone = this.state.query(cx, cy);
        if(zone == null) {
            return this;
        }

        const faction = this.state.factions[fid];
        if(faction == null) {
            return this;
        }

        if(zone.area.faction === faction) {
            return this;
        }

        zone.area.faction = faction;

        this.events.emit(
            GameState.Event.AreaFactionChanged,
            zone
        );

        return this;
    }
}

export {
    AreaSystem
}; 