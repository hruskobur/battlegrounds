import { GameStateZone } from '../../state/zone.js';
import { ActionSystem } from '../action.js';

/**
 * @public
 * @this {ActionSystem}
 * @param {GameStateZone} zone 
 * @returns {ActionSystem} this
 */
function execute (zone) {
    const token = zone.token;
    if(token == null) {
        return this;
    }

    console.log(
        'ActionSystem.execute',
        performance.now(),
        token.stage
    );

    return this;
}

export default execute;