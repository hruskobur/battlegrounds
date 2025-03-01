import { ActionStageInterface } from './stage.js';
import { ActionTargetInterface } from './target.js';

class ActionRulesComponent {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {Array<ActionStageInterface>}
     */
    stages;

    /**
     * @type {Array<ActionTargetInterface>}
     */
    targets;

    /**
     * 
     * @param {String} name 
     * @param {Array<ActionStageInterface>} stages 
     * @param {Array<ActionTargetInterface>} targets 
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