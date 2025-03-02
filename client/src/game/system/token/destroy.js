import { ActionIdxIdle, ActionPhase } from '../../state/constant.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';

/**
 * @param {Number} x 
 * @param {Number} y 
 * @returns {TokenSystem} this
 */
function destroy (x, y) {
    // note: coordinates are outside of this map
    if (GameState.Check.coordinates(this.state, x, y) === false) {
        return this;
    }

    // note: safe to access directly
    const zone = GameState.Query.coordinate(this.state, x, y);

    // note: no token to destroy
    if (zone.token === null) {
        return this;
    }

    const token = zone.token;
    zone.token = null;

    // action reset
    const action = token.action;
    action.idx = ActionIdxIdle;
    action.phase = ActionPhase.Start;
    action.duration = 0;
    action.tick = 0;

    this.events.emit(GameState.Event.TokenDestroyed, token);

    return this;
}

export default destroy;