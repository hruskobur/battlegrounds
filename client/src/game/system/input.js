import * as Pixi from 'pixi.js';
import { Coordinate } from '../types/coordinate.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { CommanderEntity } from '../entities/commander.js';

/**
 * @class The input system for the player commander.
 * @note Bot input system will be implemented differently/
 */
class PlayerControlSystem extends SystemBase {
    /**
     * @type {CommanderEntity}
     */
    commander;

    /**
     * @type {[Coordinate, Coordinate]}
     */
    selection;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.commander = state.player;
        this.selection = [];

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
        this.selection = null;

        return super.destructor();
    }

    /**
     * @public
     * @param {Coordinate} position 
     * @returns {PlayerControlSystem} this
     */
    select = position => {
        const zone = this.state.query(position);
        if(zone == null) {
            console.log('zone == null');

            return this;
        }

        if(this.selection.length === 0) {
            this.selection.push(position);

            console.log('1st selection', zone);
            console.log('---------- show info', zone);
            
            return this;
        }

        if(this.selection.length === 1) {
            this.selection.push(position);

            if(Coordinate.Compare(this.selection[0],this.selection[1])===false){
                this.selection = [
                    this.selection[1]
                ];
    
                console.log('1st selection', zone);
                console.log('---------- show info', zone);
    
                return this;
            }
        }

        const targets = this.commander.targets;
        if(targets.zones == null) {
            console.log('2nd selection', zone);
            console.log('---------- show info', zone);

            if(zone.area.ownership.faction !==this.commander.ownership.faction){
                console.log('area.ownership !== commander.ownership');

                this.selection = [];

                return this;
            }

            if(zone.token == null) {
                console.log('zone.token == null');

                this.selection = [];

                return this;
            }
            
            targets.token = position;
            targets.zones = [];

            console.log('token!', targets);

            return this;
        }

        console.log('zone!');
        targets.zones.push(position);

        console.log('targets', targets);

        return this;
    }

    /**
     * @public
     * @returns {PlayerControlSystem} this
     */
    cancel = () => {
        console.log('cancel', this.commander.targets);

        this.selection = [];
        this.commander.targets.token = null;
        this.commander.targets.zones = null;

        return this;

    }

    /**
     * @public
     * @returns {PlayerControlSystem} this
     */
    accept = () => {
        console.log('accept', this.commander.targets);

        this.selection = [];
        this.commander.targets.token = null;
        this.commander.targets.zones = null;

        return this;
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {void}
     */
    #on_pointer_down = event => {
        this.select(
            new Coordinate(
                Math.floor(event.target.x / 72),
                Math.floor(event.target.y / 72)
            )
        );
    }

    
    /**
     * @private
     * @param {KeyboardEvent} event 
     * @returns {void}
     */
    #on_key_up = event => {
        switch(event.key) {
            case 'Escape': {
                this.cancel();

                return;
            }
            case 'Enter': {
                this.accept();

                return;
            }
            default: {
                return;
            }
        }
    }

}

export {
    PlayerControlSystem
}