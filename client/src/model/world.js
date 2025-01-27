import { BattlegroundModel } from './battleground.js';
import { CommanderModel } from './commander.js';

class WorldModel {
    /**
     * @type {CommanderModel}
     */
    commander;

    /**
     * @type {Array<BattlegroundModel>}
     */
    battlegrounds;

    constructor () {
        this.commander = new CommanderModel();
        this.battlegrounds = [];
    }
}

export {
    WorldModel
};