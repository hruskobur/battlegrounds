import { GameStateZone } from '../../state/zone.js';
import { TokenEntity } from '../../entities/token.js';
import { GameState } from '../base.js';
import { TokenSystem } from '../token.js';
import { AbilityComponent } from '../../components/ability.js';

/**
 * @this {TokenSystem}
 * @param {GameStateZone} zone
 * @returns {TokenSystem} this
 */
function create (zone) {
    if(zone.token !== null) {
        // tode: relevant error handling
        // . . .

        return this;
    }

    const token = new TokenEntity();
    token.description.name = '';
    token.description.text = '';

    // dev: fixed ability
    token.abilities.push(
        new AbilityComponent(
            'ability.dev',
            {
                duration: 2000,
                tick: null,
                animation: 'animation.dev.once'
            },
            {
                duration: 2000,
                tick: 500,
                animation: null
            },
            {
                duration: 1000,
                tick: null,
                animation: 'animation.dev.tick'
            },
            {
                count: 2
            }
        )
    );

    zone.token = token;

    this.events.emit(GameState.Event.TokenCreated, zone);

    return this;
}

export default create;