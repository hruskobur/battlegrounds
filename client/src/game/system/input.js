import * as Pixi from 'pixi.js';
import { SystemBase, EventEmitter, GameState } from './base.js';
import { PositionComponent } from '../components/position.js';
import { TargetType } from '../state/constant.js';

class InputSystem extends SystemBase {
    /**
     * @type {PositionComponent}
     */
    actor;

    /**
     * @param {EventEmitter} events 
     * @param {GameState} state 
     */
    constructor (events, state) {
        super(events, state);

        this.actor = null;

        GameState.Query.iterator(
            this.state,
            (x, y, area, token, state) => {
                area.renderable
                .on('pointerdown', this.#on_pointer_down)
                // dev: disabled until really needed
                // .on('pointerleave', this.#on_pointer_leave)
                // .on('pointerenter', this.#on_pointer_enter)
                ;
            }
        )
    }

    /**
     * @public
     * @override
     * @returns {null}
     */
    destructor () {
        this.actor = null;

        return super.destructor();
    }

    /**
     * @public
     * @returns {InputSystem} this
     */
    clear () {
        // do nothing when there's no target
        if(this.actor == null) {
            return this;
        }

        // get targeted token and if there's no token, just clear actor
        const token = this.state.tokens[this.actor.y][this.actor.x];
        if(token == null) {
            this.actor = null;

            return this;
        }

        // clear actor and token's targets
        this.actor = null;
        token.targets.targets.clear();

        console.log('Inputsystem.clear');

        return this;
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_enter = event => {
        console.log('InputSystem.#on_pointer_enter', event.target);
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     */
    #on_pointer_leave = event => {
        console.log('InputSystem.#on_pointer_leave', event.target);
    }

    /**
     * @private
     * @param {Pixi.FederatedPointerEvent} event 
     * @returns {InputSystem} this
     */
    #on_pointer_down = event => {
        // dev: just a workaround to finalize input-idea
        // will be queried through GameState.Query
        const x = Math.floor(event.target.x / 72);
        const y = Math.floor(event.target.y / 72);

        // check: x,y has to be valid coordinate
        if(GameState.Check.coordinates(this.state, x, y) === false) {
            return this;
        }
        
        // actor (position component) has to be selected first
        if(this.actor == null) {
            this.actor = this.state.areas[y][x].position;

            // dev: below till the end of scope is dev for now
            const {token} = GameState.Query.by_position(this.state, this.actor);
            if(token == null) {
                return this;
            }
            
            // todo: need to emit event about WHAT needs to be selected
            // . . .

            console.log(
                'InputSystem.actor', 
                token.targets.rules
            );

            return this;
        }
        
        // actor's (token) availabilty has to be always re-checked
        const {token, area}=GameState.Query.by_position(this.state, this.actor);
        if(token == null) {
            return this.clear();
        }

        // todo: check stats for .moving property and if set to true
        // cancel selection
        // . . .

        // this is the target - always needed
        const target_area = this.state.areas[y][x];
        const target_position = target_area.position;

        // get actor's rules & currently selected targets
        const target_rules = token.targets.rules
        const target_targets = token.targets.targets;
        
        // idx of the next rule to check against the selected target
        const idx = target_targets.size;

        // do the checks; in general - if rule is not fulfilled, clear the
        // targets, otherwise push the selection to currently selected targets
        const current_rle = target_rules[idx];
        switch(current_rle) {
            case TargetType.Self: {
                if(area !== target_area) {
                    return this.clear();
                }

                target_targets.add(target_position);

                break;
            }
            case TargetType.Player: {
                if(target_area.stats.ownership !== 0) {
                    return this.clear();
                }

                // note: to prevent the selection of the same area
                if(target_targets.has(target_position) === true) {
                    return this;
                }

                target_targets.add(target_position);

                break;
            }
            case TargetType.Enemy: {
                if(target_area.stats.ownership !== 1) {
                    return this.clear();
                }

                // note: to prevent the selection of the same area
                if(target_targets.has(target_position) === true) {
                    return this;
                }

                target_targets.add(target_position);

                break;
            }
            default: {
                return this.clear();
            }
        }

        // if there's enough targets to fulfill the rules, we're done!

        if(target_targets.size === target_rules.length) {
            // todo: emit event
            // . . .

            console.log(token.targets.targets);

            return this.clear();
        }
    }
}

export {
    InputSystem
}