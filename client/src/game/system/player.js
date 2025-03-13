import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { CommanderEntity } from '../entities/commander.js';
import { GameStateZone } from '../state/zone.js';
import { PlayerAbilityTargeter } from './player/targeter.js';

/**
 * @class The input system for the player commander.
 * @note Bot input system will be implemented differently/
 */
class PlayerSystem extends SystemBase {
    /**
     * @type {PlayerAbilityTargeter}
     */
    targeter;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.targeter = new PlayerAbilityTargeter(state.player);
        
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

        this.targeter = null;

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

        console.log('PlayerSystem.info', zone);

        const payload = this.targeter
        .set_zone(zone)
        .set_targets(zone)
        .payload();

        if(payload !== null) {
            this.targeter.reset();

            console.log('PlayerSystem.action', payload);
        }
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
                this.targeter.reset();

                return;
            }
            case 'Enter': {
                // todo: check , if it is possible to provide ability at this
                // state
                // . . .

                // dev: for now, just reset
                this.targeter.reset();

                return;
            }
            default: {
                input = Number(input);
                if(Number.isNaN(input) === true) {
                    return;
                }

                this.targeter.set_ability(input);

                return;
            }
        }
    }
}

export {
    PlayerSystem
}