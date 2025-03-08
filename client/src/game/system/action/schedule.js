import { GameState } from '../base.js';
import { ActionSystem } from '../action.js';
import { IdleStage, FirstStage } from '../../state/constant.js';
import { GameStateZone } from '../../state/zone.js';

/**
 * @public
 * @this {ActionSystem}
 * @param {GameStateZone} zone 
 * @returns {ActionSystem} this
 */
function schedule (zone) {
    const token = zone.token;
    if(token == null) {
        return this;
    }

    const stage = token.stage;
    if(stage !== IdleStage) {
        console.log('ActionSystem.schedule', 'stage !== IdleStage');

        return this;
    }

    token.stage = token.stages.get(FirstStage);

    this.state.queue.current.push(zone);

    // dev: info
    console.log(GameState.Event.ActionScheduled, zone);
    
    this.events.emit(GameState.Event.ActionScheduled, zone);

    return this;
}


export default schedule;