import { SelectionType } from '../../state/constant.js';

class ActionTargetComponent {
    /**
     * @type {SelectionType}
     */
    type;

    /**
     * @type {CommanderType}
     */
    commander;

    /**
     * SelectionType.None:      0
     * 
     * SelectionType.Single:    1
     * 
     * SelectionType.Multiple:  select up to 'range' targets
     * 
     * SelectionType.Extend:    the extend of selection, total (n+1)^2
     * 
     * SelectionType.Path:      first 'range' targets of the overal path
     * @type {Number}
     */
    range;

    /**
     * 
     * @param {SelectionType} type 
     * @param {CommanderType} commander 
     * @param {Number} range 
     */
    constructor (type, commander, range) {
        this.type = type;
        this.commander = commander;
        this.range = range;
    }
}

export {
    ActionTargetComponent
};