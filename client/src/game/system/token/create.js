import { PositionComponent } from '../../components/position.js';
import { TokenEntity } from '../../entities/token.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';


/**
 * @this {TokenSystem}
 * @param {PositionComponent} position
 * @param {Object} options todo: create token options interface
 * @returns {TokenSystem} this
 */
function create (position, options) {
    if(this.state.check(position) === false) {
        // tode: relevant error handling
        // . . .
        return this;
    }

    const zone = this.state.query(position);
    if(zone.token !== null) {
        // tode: relevant error handling
        // . . .

        return this;
    }

    const token = new TokenEntity();
    token.description.name = options.name;
    token.description.text = options.text;
    token.renderable.x = token.renderable.width * position.x;
    token.renderable.y = token.renderable.width * position.y;

    // todo: factory?
    // token.stage_rule.push(...options.stage_rules);
    // token.target_rule.push(...options.target_rules);

    zone.token = token;

    this.events.emit(GameState.Event.TokenCreated, token);

    return this;
}

export default create;