import { PositionComponent } from '../../components/position.js';
import { TokenStateIdx_Idle, TokenPhase } from '../../state/constant.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';

/**
 * @this {TokenSystem}
 * @param {PositionComponent} position
 * @returns {TokenSystem} this
 */
function cancel (position) {
    if(this.state.check(position) === false) {
        // todo: relevant info handling
        // . . .

        return this;
    }

    const zone = this.state.query(position);
    
    const token = zone.token;
    if(token === null) {
        // todo: relevant info handling
        // . . .

        return this;
    }

    const stage = token.stage;
    const idx = stage.idx;

    if(idx == TokenStateIdx_Idle) {
        // todo: relevant info handling
        // . . .

        return this;
    }

    if(token.stage_rule[idx].cancelable === false) {
        // todo: relevant info handling
        // . . .

        return this;
    }

    stage.idx = TokenStateIdx_Idle;
    stage.phase = TokenPhase.Start;
    stage.duration = 0;
    stage.tick = 0;

    token.target = [];

    this.events.emit(GameState.Event.TokenCancel, token);

    return this;
}

export default cancel;