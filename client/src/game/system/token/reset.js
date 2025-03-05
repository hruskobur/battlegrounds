import { GameStateZone } from '../../state/game_zone.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';

/**
 * @this {TokenSystem}
 * @param {GameStateZone} zone
 * @returns {TokenSystem} this
 */
function reset (zone) {
    const token = zone.token;
    if(token == null) {
        // tode: relevant error handling
        // . . .

        return this;
    }

    token.stages.forEach(stage => {
        stage.targeted = [];
    });
    token.stage = null;

    // dev: just an info
    console.log(GameState.Event.TokenReseted, token);

    this.events.emit(GameState.Event.TokenReseted, token);

    return this;
}

export default reset;