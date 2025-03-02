import { GameTargets } from './targets.js';

class GameCommander {
    constructor () {
        this.stats = {};
        this.targets = new GameTargets();
    }
}

export {
    GameCommander
};