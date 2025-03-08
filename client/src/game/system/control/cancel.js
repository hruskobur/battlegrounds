import { IdleStage } from '../../state/constant.js';
import { GameState } from '../base.js';
import { PlayerControlSystem } from '../player.js';

/**
 * @public
 * @this {PlayerControlSystem}
 * @returns {PlayerControlSystem} this
 */
function cancel () {
    const zone = this.selection.target || this.selection.first;
    if(zone == null) {
        this.selection.reset();

        return this;
    }

    // check: target has to contain token
    const token = zone.token;
    if(token == null) {
        this.selection.reset();

        return this;
    }

    // todo: ownership check
    // . . .

    const stage = token.stage;
    if(stage == IdleStage) {
        this.selection.reset();

        return this;
    }

    if(stage.cancelable === false) {
        this.selection.reset();
        
        return this;
    }

    this.selection.reset();
    this.events.emit(GameState.Event.ActionCancel, zone);

    return this;
}

export default cancel;