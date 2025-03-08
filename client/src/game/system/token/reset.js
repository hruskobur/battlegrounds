import { TokenPhase } from '../../state/constant.js';
import { GameStateZone } from '../../state/zone.js';
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
        const state = stage.state;
        
        state.phase = TokenPhase.Start;
        state.targets = [];
        state.duration = 0;
        state.tick = 0;
    });

    token.stage = null;

    // dev: info
    console.log(GameState.Event.TokenReseted, zone);

    this.events.emit(GameState.Event.TokenReseted, zone);

    return this;
}

export default reset;