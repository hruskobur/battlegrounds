import { TokenStageComponent } from '../../components/token/stage.js';
import { TokenEntity } from '../../entities/token.js';
import { FirstStage, IdleStage } from '../../state/constant.js';
import { GameStateZone } from '../../state/zone.js';
import { Coordinate } from '../../types/coordinate.js';

class PlayerControlSelection {
    /**
     * @type {GameStateZone}
     */
    #cache_1st;

    /**
     * @type {GameStateZone}
     */
    #cache_2nd;

    /**
     * @type {TokenStageComponent}
     */
    #cache_s;

    /**
     *@type {Number}
     */
    #cache_r;

    /**
     * @type {Object.<string, Array<Coordinate>}
     */
    #cache_targets;

    /**
     * @type {Object.<string, Set<Coordinate>}
     */
    #cache_selections;

    /**
     * @type {GameStateZone}
     */
    target;

    constructor () {
        this.#cache_1st = null;
        this.#cache_2nd = null;

        this.#cache_s = null;
        this.#cache_r = null;

        this.#cache_targets = null;
        this.#cache_selections = null;

        this.target = null;
    }

    get first () {
        return this.#cache_1st;
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
        this.#cache_1st = null;
        this.#cache_2nd = null;

        this.#cache_s = null;
        this.#cache_r = null;
        this.#cache_targets = null;
        this.#cache_selections = null;

        this.target = null;

        return this;
    }

    /**
     * 
     * @param {GameStateZone} zone 
     * @returns {Boolean} 
     */
    #select_token = (zone) => {
        if(this.#cache_1st == null || this.#cache_1st !== zone) {
            this.#cache_1st = zone;

            console.log('selected 1st', this.#cache_1st);

            return false;
        }

        this.#cache_2nd = zone;

        if(this.#cache_1st !== this.#cache_2nd) {
            this.reset();

            return false;
        }

        if(this.#cache_2nd.token == null) {
            this.reset();

            return false;
        }

        if(this.#cache_2nd.token.stage !== IdleStage) {
            this.reset();

            return false;
        }

        this.target = this.#cache_2nd;

        this.#initialize_cache(this.target.token);

        // note: dev info
        console.log(
            `NEXT_SELECTION [${this.#cache_s.name}]`,
            this.#cache_s.targets[this.#cache_r]
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

        // todo: do the checks!
        // for now, let's assume that all checks have passed
        // . . . 

        const cached_targets = this.#cache_targets[this.#cache_s.idx];
        this.#cache_r = cached_targets.push(zone.position);
        if(cached_targets.length >= this.#cache_s.targets.length) {
            this.#cache_s = token.stages.get(this.#cache_s.next);
            this.#cache_r = 0;
        }

        if(this.#cache_s != null) {
            // note: dev info
            console.log(
                `NEXT_SELECTION [${this.#cache_s.name}]`,
                this.#cache_s.targets[this.#cache_r]
            );

            return false;
        }

        // note: add cached targets to the token's real targets
        token.stages.forEach(stage => {
            stage.state.targets = this.#cache_targets[stage.idx];
        });
        
        return true;
    }

    /**
     * @private
     * @param {TokenEntity} token 
     * @returns {void}
     */
    #initialize_cache = token => {
        this.#cache_s = token.stages.get(FirstStage);
        this.#cache_r = FirstStage;

        this.#cache_targets = {};
        this.#cache_selections = {};

        token.stages.forEach(stage => {
            this.#cache_targets[stage.idx] = [];
            this.#cache_selections[stage.idx] = new Set();
        });
    }
}

export {
    PlayerControlSelection
};