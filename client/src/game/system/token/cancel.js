import { ActionIdxIdle, ActionPhase } from '../../state/constant.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';

/**
 * @this {TokenSystem}
 * @param {Number} x 
 * @param {Number} y 
 * @returns {TokenSystem} this
 */
function cancel (x, y) {
    // note: coordinates are outside of this map
    if (GameState.Check.coordinates(this.state, x, y) === false) {
        return this;
    }

    // note: safe to access directly
    const zone = GameState.Query.coordinate(this.state, x, y);

    // note: no token to cancel
    const token = zone.token;
    if (token === null) {
        return this;
    }

    const stage = GameState.Query.action_stage(token);
    if (stage == null) {
        return this;
    }

    if (stage.cancelable === false) {
        // todo: inform user that action cannot be canceled at this stage
        // . . .
        return this;
    }

    const state = token.action_state;
    state.stage = ActionIdxIdle;
    state.phase = ActionPhase.Start;
    state.duration = 0;
    state.tick = 0;
    state.targets = [];

    return this;
}

export default cancel;