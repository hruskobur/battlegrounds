import { GameStateZone } from '../../state/zone.js';
import { ActionSystem } from '../action.js';

/**
 * @public
 * @this {ActionSystem}
 * @param {GameStateZone} zone 
 * @returns {ActionSystem} this
 */
function cancel (zone) {
    const token = zone.token;
    if(token == null) {
        return this;
    }

    console.log(
        'ActionSystem.cancel',
        performance.now(),
        token
    );
}

export default cancel;