import { CommanderEntity } from '../../entities/commander.js';
import { GameTargets } from './targets.js';

class GameCommander {
    constructor () {
        this.commander = new CommanderEntity();
        this.targets = new GameTargets();
    }
}

export {
    GameCommander
};