import { SystemBase } from './base.js';

/**
 * @class System responsible for providin user-action-feedback & informations,
 * such as:
 * - data of selected zone
 * - which tragets have to be selected
 * - active action's relationship: a line from zone to target zone, representing
 * zones's dependency on that target, etc...
 * 
 * Will have own render layer.
 */
class InfoSystem extends SystemBase {
    constructor (events, state) {
        super(events, state)
    }
}