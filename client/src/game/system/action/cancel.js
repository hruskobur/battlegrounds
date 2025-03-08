import { GameStateZone } from '../../state/zone.js';
import { ActionSystem } from '../action.js';

/**
 * @public
 * @this {ActionSystem}
 * @param {GameStateZone} zone 
 * @returns {ActionSystem} this
 */
function cancel (zone) {
    const _s = performance.now();

    const token = zone.token;
    if(token == null) {
        return this;
    }

    const queue = this.state.queue.current;
    const idx = queue.indexOf(zone);
    if(idx == -1) {
        return this;
    }
    
    console.log(idx, queue.length);

    queue.splice(idx, 1);

    console.log(idx, queue.length);

    const _e = performance.now();

    console.log(
        'ActionSystem.cancel',
        (_e - _s)
    );
}

export default cancel;