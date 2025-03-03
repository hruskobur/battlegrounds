import { Coordinate } from '../../types/coordinate.js';
import { TokenStateIdx_Idle, TokenPhase } from '../../state/constant.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';

/**
 * @this {TokenSystem}
 * @param {Coordinate} position 
 * @param {Number} y 
 * @returns {TokenSystem} this
 */
function destroy (position) {
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
    stage.idx = TokenStateIdx_Idle;
    stage.phase = TokenPhase.Start;
    stage.duration = 0;
    stage.tick = 0;

    token.target = [];

    zone.token = null;

    this.events.emit(GameState.Event.TokenDestroyed, token);

    // return this;
}

export default destroy;