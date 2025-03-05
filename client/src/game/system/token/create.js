import { GameStateZone } from '../../state/game_zone.js';
import { TokenEntity } from '../../entities/token.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';
import ability from './ability.js';

/**
 * @this {TokenSystem}
 * @param {GameStateZone} zone
 * @param {Object} options todo: create token options interface
 * @returns {TokenSystem} this
 */
function create (zone, options) {
    if(zone.token !== null) {
        // tode: relevant error handling
        // . . .

        return this;
    }

    const position = zone.position;

    const token = new TokenEntity();
    token.description.name = options.name;
    token.description.text = options.text;
    token.renderable.x = token.renderable.width * position.x;
    token.renderable.y = token.renderable.width * position.y;

    ability(token, options);

    zone.token = token;

    this.events.emit(GameState.Event.TokenCreated, token);

    return this;
}

export default create;