import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { CommanderEntity } from '../entities/commander.js';
import { GameStateZone } from '../state/zone.js';
import { AbilityComponent } from '../components/ability.js';
import { Coordinate } from '../types/coordinate.js';

/**
 * @class The input system for the player commander.
 * @note Bot input system will be implemented differently/
 */
class PlayerSystem extends SystemBase {
    /**
     * Commander controled by this control system.
     * @type {CommanderEntity}
     */
    commander;

    /**
     * @type {GameStateZone}
     */
    zone;

    /**
     * @type {AbilityComponent}
     */
    ability;

    /**
     * @type {Array<Coordinate>}
     */
    targets;



    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        // note: who controls this system?
        this.commander = state.player;

        // targeting
        this.zone = null;
        this.ability = null;
        this.targets = [];
        
        this.state.iterate(
            (zone, x, y) => {
                zone.area.renderable
                .on('pointerdown', this.#on_pointer_down);
            }
        );

        window.addEventListener('keyup', this.#on_key_up);
    }

    /**
     * @public
     * @override
     * @returns {null}
     */
    destructor () {
        window.removeEventListener('keyup', this.#on_key_up);
        
        this.state.iterate(
            (zone, x, y) => {
                zone.area.renderable
                .removeAllListeners('pointerdown', this.#on_pointer_down);
            }
        );

        this.commander = null;

        this.zone = null;
        this.ability = null;
        this.targets = null;

        return super.destructor();
    }


    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {void}
     */
    #on_pointer_down = event => {
        const zone = this.state.query(
            Math.floor(event.target.x / 72),
            Math.floor(event.target.y / 72)
        );

        if(this.ability == null) {
            if(zone.token == null) {
                return;
            }

            this.clear();
            this.zone = zone;

            console.log('zone selected');

            return;
        }

        this.targets.push(zone.position);
        if(this.targets.length < 2) {
            return;
        }

        console.log('targets selected');

        console.log(
            'PlayerSystem.input',
            this.zone,
            this.ability,
            this.targets
        );

        this.clear();
    }

    clear = () => {
        this.zone = null;
        this.ability = null;
        this.targets = [];

        console.log('PlayerSystem.clear');
    }
    
    /**
     * @private
     * @param {KeyboardEvent} event 
     * @returns {void}
     */
    #on_key_up = event => {
        let input = event.key;

        switch(input) {
            case 'Escape': {
                this.clear();

                return;
            }
            default: {
                if(this.zone === null) {
                    return;
                }

                input = Number(input);
                if(Number.isNaN(input) === true) {
                    return;
                }

                const token = this.zone.token;
                if(token == null) {
                    this.clear();

                    return;
                }

                const ability = token.abilities[input];
                if(ability == null) {
                    this.clear();

                    return;
                }

                this.ability = ability;

                return;
            }
        }
    }
}

export {
    PlayerSystem
}