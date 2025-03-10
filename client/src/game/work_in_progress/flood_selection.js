import { FactionComponent } from '../components/faction.js';
import { GameState } from '../state/game.js';
import { GameStateZone } from '../state/zone.js';
import { Coordinate } from '../types/coordinate.js';

import { DirectionCoordinates } from '../state/constant.js';

/**
 * 
 * @this {GameState} 
 * @param {GameStateZone} zone
 */
function flood_selection (zone) {
    const _s = performance.now();

    const faction = zone.area.faction;

    const result = [];
    const reach = [];
    const visited = new Set();

    /**
     * 
     * @param {GameStateZone} zone 
     */
    const _dfs = (zone) => {
        if(visited.has(zone) === true) {
            return;
        }

        visited.add(zone);

        if(zone.area.faction.id !== faction.id) {
            return;
        }

        result.push(zone);

        for(const { x, y } of DirectionCoordinates) {
            const _zone = this.query(
                zone.position.x + x,
                zone.position.y + y
            );
            
            if(_zone == null) {
                continue;
            }

            _dfs(_zone);
        }
    }

    /** 
     * @param {GameStateZone} zone
     * @param {Number} distance
     */
    const _reach = (zone, distance) => {
        const position = zone.position;

        const yf = position.y - distance;
        const yt = position.y + distance;
        const xf = position.x - distance;
        const xt = position.x + distance;

        for(let y = yf; y <= yt; ++y) {
            const _zone = this.query(position.x, y);
            if(_zone == null) {
                continue;
            }

            if(_zone.area.faction.id == zone.area.faction.id) {
                continue;
            }

            reach.push(_zone);
        }

        for(let x = xf; x <= xt; ++x) {
            const _zone = this.query(x, position.y);
            if(_zone == null) {
                continue;
            }

            if(_zone.area.faction.id == zone.area.faction.id) {
                continue
            }

            reach.push(_zone);
        }
    }

    // start flood fill
    _dfs(zone);

    // flood fill results
    result.forEach(zone => {
        const terrain = zone.area.renderable.terrain;
        terrain.tint = 'gray';
        terrain.alpha = 1;

    });
    
    // reach results
    result.forEach(zone => {
        _reach(zone, 1);
    });

    reach.forEach(zone => {
        const terrain = zone.area.renderable.terrain;
        terrain.tint = 'yellow';
        terrain.alpha = 1;
    });

    const _e = performance.now();
    console.log(_e-_s);
    

    return result;
}

export default flood_selection;