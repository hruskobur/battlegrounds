import { TheGame } from '../game.js';
import { EntitySelection } from '../selection/selection.js';
import { FactionComponent } from '../components/faction.js';

class CommanderEntity {
    /**
     * @type {TheGame}
     */
    game;

    /**
     * Who issues the commands?
     * @type {FactionComponent}
     */
    faction;

    /**
     * The action-targets cache.
     * 
     * First EntitySelection is the "action-caller", the rest are "action-
     * arguments".
     * 
     * First EntitySelection may be null, if there's no token at selected
     * area. In this case, only one action is allowed - that is to generate
     * new token on selected area.
     * 
     * @type {Array<EntitySelection|null>}
     */
    targets;

    /**
     * @param {TheGame} game 
     * @param {FactionComponent} faction
     */
    constructor (game, faction) {
        this.game = game;
        this.faction = faction;

        this.targets = [];
    }

    /**
     * @public
     * @virtual
     * @returns {null}
     */
    destructor () {
        return null;
    }

    /**
     * @returns {CommanderEntity} this
     */
    clear () {
        this.targets = [];

        return this;
    }

    /**
     * @public
     * @virtual
     * @param {Number} x
     * @param {Number} y
     * @returns {EntitySelection} selected target
     */
    target (x, y) {
        const target = this.game.target(x, y);
        if(target === null) {
            throw new Error();
        }

        console.log('GameController.target', target);
        
        // cache selected target
        this.targets.push(target);

        // dev, fixed
        // note: token will determine, how many target it needs
        // OR if the "action-caller" is null token, 2 targets are needed, static
        if(this.targets.length !== 5) {
            return target;
        }

        // we got everything that is needed for an action to be executed
        // . . .
        console.log('TheGame.execute', this.targets);

        this.clear();

        return target;
    }
}

export {
    CommanderEntity
};