import { TokenEntity } from '../../entities/token.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';

import action_factory from './action.js';

/**
 * @this {TokenSystem}
 * @param {Number} x 
 * @param {Number} y 
 * @param {Object} actions
 * @returns {TokenSystem} this
 */
function create (x, y, actions) {
    // note: coordinates are outside of this map
    if (GameState.Check.coordinates(this.state, x, y) === false) {
        return this;
    }

    // note: safe to access directly
    const zone = GameState.Query.coordinate(this.state, x, y);

    // note: cannot create token where another token already exist
    if (zone.token !== null) {
        return this;
    }

    // note: create new token
    // todo: token will be generated & factory will be used
    const token = new TokenEntity();
    token.renderable.x = token.renderable.width * x;
    token.renderable.y = token.renderable.height * y;

    action_factory(token, actions);

    zone.token = token;

    this.events.emit(GameState.Event.TokenCreated, token);

    return this;
}

export default create;