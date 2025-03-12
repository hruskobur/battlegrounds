import { GameStateZone } from '../../state/zone.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';

/**
 * @this {TokenSystem}
 * @param {GameStateZone} zone 
 * @returns {TokenSystem} this
 */
function destroy (zone) {
    const token = zone.token;
    if(token === null) {
        // todo: relevant info handling
        // . . .

        return this;
    }

    this.events.emit(GameState.Event.TokenDestroyed, zone);
    
    zone.token = null;

    return this;
}

export default destroy;