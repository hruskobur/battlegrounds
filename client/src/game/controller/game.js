import { TheGame } from '../game.js';
import { EntitySelection } from '../selection/selection.js';

class GameController {

    /**
     * @type {TheGame}
     */
    game;

    /**
     * Targets cache.
     * How many targets are needed depends on FIRST SELECTED target (token ON
     * area)
     * 
     * @type {Array<EntitySelection>}
     */
    targets;

    /**
     * How many targets we need to gather before we can execute token's action.
     * Defaults to 2 - a default, generate action.
     * @type {Number}
     */
    argc

    /**
     * @param {TheGame} game 
     */
    constructor (game) {
        this.game = game;

        this.targets = [];
        this.argc = TheGame.DefaultTokenActionArgc;
    }

    /**
     * 
     * @returns {null}
     */
    destructor () {
        return null;
    }

    /**
     * @returns {BattlegroundsControls} this
     */
    clear () {
        this.targets = [];
        this.argc = TheGame.DefaultTokenActionArgc;

        return this;
    }

    /**
     * @public
     * @virtual
     * @param {Number} x
     * @param {Number} y
     * @returns {BattlegroundsControls} this
     */
    target (x, y) {
        const target = this.game.target(x, y);
        if(target === null) {
            throw new Error();
        }
        
        // cache selected target
        this.targets.push(target);

        // only targer target has been selected so far
        if(this.targets.length === 1) {
            // and determine, how many targets are needed in order to
            // schedule an action

            // if first target doesn't contain a token, a default action
            // will be executed - meaning we need 2 targets...
            if(target.token == null) {
                this.argc = TheGame.DefaultTokenActionArgc;
            } 
            // if first target contains a token - that token determines how many
            // other targets are needed
            else {
                this.argc = target.token.argc;
            }
        }

        // argc could also be 1, or many...
        if(this.targets.length !== this.argc) {
            return this;
        }

        // we got everything that is needed for an action to be executed
        // . . .

        console.log('GameControl.execute', this.targets);

        return this.clear();
    }
}

export {
    GameController
};