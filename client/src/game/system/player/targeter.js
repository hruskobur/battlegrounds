import { Coordinate } from '../../types/coordinate.js';
import { AbilityComponent, AbilityStageId } from '../../components/ability.js';
import { GameStateZone } from '../../state/zone.js';
import { CommanderEntity } from '../../entities/commander.js';
import EventEmitter from 'eventemitter3';

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
     * @param {EventEmitter} events 
     * @param {CommanderEntity} commander 
     */
    constructor (events, commander) {
        this.events = events;
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
    select_zone = zone => {
        this.events.emit('DEV_INFO', 'info: data', zone);

        if(this.ability !== null) {
            return this;
        }

        const token = zone.token;
        if(token == null) {
            this.events.emit('DEV_INFO', 'error: no token here', zone);

            return this.reset();
        }   

        this.zone = zone;

        this.events.emit('DEV_INFO', 'info: zone selected', zone);

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
            this.events.emit('DEV_INFO', 'error: no token here', id);

            return this.reset();
        }

        const abilities = token.abilities;
        const length = abilities.length;
        for(let a = 0; a < length; ++a) {
            const ability = abilities[a];

            if(ability.stage.id != AbilityStageId.Idle) {
                this.events.emit('DEV_INFO', 'error: already acting', id);

                return this.reset();
            }
        }

        if(id < 0 || id >= length) {
            this.events.emit('DEV_INFO', 'error: no such ability', id);
    
            return this.reset();
        }

        this.ability = abilities[id];
        this.id = id;
            
        this.events.emit('DEV_INFO', 'info: ability selected', id);

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
            this.events.emit('DEV_INFO', 'error: too much targetrs');

            return this.reset();
        }

        this.targets.push(target.position);
        if(this.targets.length === this.ability.target_rules.count) {
            this.ability.target = this.targets;

            this.events.emit('DEV_INFO', 'info: targets selected');
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

        this.events.emit('DEV_INFO', 'info: reset selected');

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