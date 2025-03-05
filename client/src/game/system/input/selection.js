import { TokenStageComponent } from '../../components/token/stage.js';
import { TokenEntity } from '../../entities/token.js';
import { TokenStageFirstIdx } from '../../state/constant.js';
import { GameStateZone } from '../../state/game_zone.js';

class PlayerControlSelection {
    /**
     * @type {GameStateZone}
     */
    #cache_a;

    /**
     * @type {GameStateZone}
     */
    #cache_b;

    /**
     * @type {TokenStageComponent}
     */
    #cache_s;

    /**
     * @type {GameStateZone}
     */
    target;

    constructor () {
        this.#cache_a = null;
        this.#cache_b = null;
        this.#cache_s = null;

        this.target = null;
    }

    /**
     * Utility getter. Returns a TokenEntity from SelectedZone
     */
    get token () {
        if(this.target == null) {
            return null;
        }

        return this.target.token;
    }

    /**
     * 
     * @param {GameStateZone} zone 
     * @returns {Boolean}
     */
    select = (zone) => {
        if(this.target == null) {
            this.#select_token(zone);

            return false;
        }
        
        return this.#select_target(zone);
    }

    /**
     * @returns {PlayerControlSelection} this
     */
    reset = () => {
        this.#cache_a = null;
        this.#cache_b = null;
        this.#cache_s = null;

        this.target = null;

        return this;
    }

    /**
     * 
     * @param {GameStateZone} zone 
     * @returns {Boolean} 
     */
    #select_token = (zone) => {
        if(this.#cache_a == null) {
            this.#cache_a = zone;

            return false;
        }

        this.#cache_b = zone;

        if(this.#cache_a !== this.#cache_b) {
            this.reset();

            return false;
        }

        if(this.#cache_b.token == null) {
            this.reset();

            return false;
        }

        this.target = this.#cache_b;
        this.#cache_s = this.target.token.stages.get(TokenStageFirstIdx);

        // note: no stages
        if(this.#cache_s == null) {
            this.reset();
        
            return false;
        }

        console.log(
            'target rule',
            this.#cache_s.targets[this.#cache_s.targeted.length]
        );

        return true;
    }

    /**
     * 
     * @param {GameStateZone} zone 
     * @returns {Boolean} 
     */
    #select_target = (zone) => {
        if(this.target == null) {
            this.reset();

            return false;
        }

        // note: we need to check for token existence every selection!
        // if token has been destoyed, while selection was in progress
        // we have to reset selection anew
        const token = this.target.token;
        if(token == null) {
            this.reset();

            return false;
        }

        const targets = this.#cache_s.targets;
        const targeted = this.#cache_s.targeted;
        
        // todo: do the checks!
        // const idx = this.#cache_s.targeted.length;
        // console.log('target comparison', targets[idx]);

        // todo: let's assume that all checks have passed
        // . . .

        // note: it is safe to add the target
        targeted.push(zone.position);

        // check: if we reached targeted limit
        if(targeted.length >= targets.length) { // note: if so, move to next stage
            const next_stage_idx = this.#cache_s.next;
            if(next_stage_idx === null) {
                return true;
            }

            this.#cache_s = token.stages.get(next_stage_idx);

            // todo: do the checks!
            console.log(
                'target rule',
                this.#cache_s.targets[this.#cache_s.targeted.length]
            );

            return false;
        }

        // todo: do the checks!
        console.log(
            'target rule',
            this.#cache_s.targets[this.#cache_s.targeted.length]
        );

        return this;
    }
}

export {
    PlayerControlSelection
};