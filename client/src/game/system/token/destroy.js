import { GameStateZone } from '../../state/game_zone.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';

/**
 * @this {TokenSystem}
 * @param {GameStateZone} zone 
 * @param {Number} y 
 * @returns {TokenSystem} this
 */
function destroy (zone) {
    const token = zone.token;
    if(token === null) {
        // todo: relevant info handling
        // . . .

        return this;
    }

    zone.token = null;

    this.events.emit(GameState.Event.TokenDestroyed, token);

    // return this;
}

export default destroy;