import { SystemBase, EventEmitter, GameState } from './base.js';
import { TokenEntity } from '../entities/token.js';
import { ActionEffectComponent } from '../components/action/effect.js';

class TokenSystem extends SystemBase {
    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @returns {TokenSystem} this
     */
    create = (x, y) => {
        // note: coordinates are outside of this map
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }
        
        // note: safe to access directly
        const zone = GameState.Query.coordinate(this.state, x, y);
        
        // note: cannot create token where another token already exist
        if(zone.token !== null) {
            return this;
        }

        // note: create new token
        // todo: token will be generated & factory will be used
        const token = new TokenEntity();
        token.renderable.x = token.renderable.width * x;
        token.renderable.y = token.renderable.height * y;

        token.effects = this.effect_factory();

        zone.token = token;

        this.events.emit(GameState.Event.TokenCreated, token);

        return this;
    }

    /**
     * @param {Number} x 
     * @param {Number} y 
     * @returns {TokenSystem} this
     */
    destroy = (x, y) => {
        // note: coordinates are outside of this map
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }

        // note: safe to access directly
        const zone = GameState.Query.coordinate(this.state, x, y);

        // note: no token to destroy
        if(zone.token === null) {
            return this;
        }

        const token = zone.token;
        zone.token = null;

        this.events.emit(GameState.Event.TokenDestroyed, token);

        return this;
    }

    /**
     * @param {*} options not implemented yet
     * @returns {Array<ActionEffectComponent>}
     */
    effect_factory (options) {
        const effect_count = Math.floor(Math.random() * 4);

        const effects = [];
        for(let e = 0; e < effect_count; ++e) {
            let name = `effect.id.${e}`;
            let total = (Math.floor(Math.random() * 10) * 1000) + 1000;
            let tick = (Math.random() > 0.5) ? null : 1000;
            let on_start = name + '.start';
            let on_tick = (tick !== null) ? name + '.tick' : null;
            let on_end = name + '.start';

            effects.push(
                new ActionEffectComponent(
                    name,
                    total, tick,
                    on_start, on_tick, on_end
                )
            );
        }

        console.log('TokenSystem.effect_factory', effects);

        return effects;
    }
}

export {
    TokenSystem
};