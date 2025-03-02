import { ActionInterfaceStage } from './interface/stage.js';
import { ActionInterfaceTarget } from './interface/target.js';

class ActionRulesComponent {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {Array<ActionInterfaceStage>}
     */
    stages;

    /**
     * @type {Array<ActionInterfaceTarget>}
     */
    targets;

    /**
     * 
     * @param {String} name 
     * @param {Array<ActionInterfaceStage>} stages 
     * @param {Array<ActionInterfaceTarget>} targets 
     */
    constructor (name, stages, targets) {
        this.name = name;
        this.stages = stages;
        this.targets = targets;
    }
}

export {
    ActionRulesComponent
};