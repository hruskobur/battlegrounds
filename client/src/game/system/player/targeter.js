import { Coordinate } from '../../types/coordinate.js';
import { AbilityComponent, AbilityStageId } from '../../components/ability.js';
import { GameStateZone } from '../../state/zone.js';
import { CommanderEntity } from '../../entities/commander.js';

class PlayerAbilityTargeter {
    /**
     * @type {CommanderEntity}
     */
    commander;

    /**
     * @type {GameStateZone|null}
     */
    zone;

    /**
     * @type {AbilityComponent|null}
     */
    ability;

    /**
     * @type {Number|null}
     */
    id;

    /**
     * @type {Array<Coordinate>|null}
     */
    targets;

    /**
     * 
     * @param {CommanderEntity} commander 
     */
    constructor (commander) {
        this.commadner = commander;

        this.zone = null;

        this.id = null;
        this.ability = null;

        this.targets = null;
    }

    /**
     * @public
     * @param {GameStateZone} zone 
     * @returns {PlayerAbilityTargeter} this
     */
    set_zone = zone => {
        // if(zone.area.faction !== this.commadner.faction) {
        //     console.log(`not a commander's zone!`);
        //     return this;
        // }

        if(this.ability !== null) {
            return this;
        }

        const token = zone.token;
        if(token == null) {
            console.log(`there's no token to act!`);

            return this.reset();
        }   

        this.zone = zone;

        console.log('PlayerAbilityTargeter.set_zone', this.zone);

        return this;
    }

    /**
     * @public
     * @param {Number} id
     * @returns {PlayerAbilityTargeter} this
     */
    set_ability = id => {
        const token = this.zone.token;
        if(token == null) {
            console.log(`there's no token to act!`);

            return this.reset();
        }

        const abilities = token.abilities;
        const length = abilities.length;
        for(let a = 0; a < length; ++a) {
            const ability = abilities[a];

            if(ability.stage.id != AbilityStageId.Idle) {
                console.log(`token's already acting!`);

                return this.reset();
            }
        }

        if(id < 0 || id >= length) {
            console.log(`there's no such ability!`);
    
            return this.reset();
        }

        this.ability = abilities[id];
        this.id = id;
            
        console.log('PlayerAbilityTargeter.set_ability', this.id);

        return this;
    }

    /**
     * @public
     * @param {GameStateZone} target 
     * @returns {PlayerAbilityTargeter} this
     */
    set_targets = target => {
        if(this.ability === null) {
            return this;
        }

        if(this.targets == null) {
            this.targets = [];
        }

        if(this.targets.length >= this.ability.target_rules.count) {
            console.log(`target's threshold crossed`);

            return this.reset();
        }

        this.targets.push(target.position);
        console.log('PlayerAbilityTargeter.set_target', target.position);

        if(this.targets.length === this.ability.target_rules.count) {
            this.ability.target = this.targets;
        }

        return this;
    }

    /**
     * @public
     * @returns {PlayerAbilityTargeter} this
     */
    reset = () => {
        this.zone = null;

        this.ability = null;
        this.id = null;

        this.targets = null;

        console.log('PlayerAbilityTargeter.reset');

        return this;
    }

    /**
     * @public
     * @returns {Object|null}
     */
    payload = () => {
        if(this.zone == null) {
            return null;
        }

        if(this.ability == null) {
            return null;
        }

        if(this.targets.length != this.ability.target_rules.count) {
            return null;
        }

        return {
            zone: this.zone,
            ability: this.id
        }
    }
}

export {
    PlayerAbilityTargeter
};