import { TargetType } from '../state/constant.js';
import { PositionComponent } from './position.js';

class TargetComponent {
    /**
     * @type {Array<TargetType>}
     */
    rules

    /**
     * @type {Set<PositionComponent>}
     */
    targets;

    /**
     * @param {Array<TargetType>} rules 
     */
    constructor (rules) {
        this.rules = rules;
        this.targets = new Set();
    }
}

export {
    TargetComponent
};