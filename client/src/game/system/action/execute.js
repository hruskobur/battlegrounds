import { BuffEntity } from '../../entities/buff.js';
import { TokenEntity } from '../../entities/token.js';
import { ActionSystem } from './action.js';

/**
 * @public
 * @this {ActionSystem}
 * @param {TokenEntity|BuffEntity} entity 
 * @returns {ActionSystem} this
 */
function execute (entity) {
    console.log(
        'ExecuteSystem.execute',
        performance.now(),
        entity.action_state
    );
}

export default execute;