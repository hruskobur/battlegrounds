import { Coordinate } from '../types/coordinate.js';

const AbilityStagePhase = Object.freeze({
    Start: 'phase.start',
    TickStart: 'phase.tick.start',
    TickEnd: 'phase.tick.end',
    End: 'phase.end'
});

const AbilityStageId = Object.freeze({
    Idle: null,
    Cast: 0,
    Progress: 1,
    Cooldown: 2
});

/**
 * @typedef {Object} AbilityStageRule
 * @property {Number} duration
 * @property {Number|null} tick
 */

/**
 * @typedef {Object} AbilityTargetRule
 * @property {Number} count
 */

/**
 * @typedef {Object} AbilityStage
 * @property {AbilityStageId} id
 * @property {AbilityStagePhase} phase
 * @property {Number} duration
 * @property {Number} tick
 */

class AbilityComponent {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {Array<AbilityStageRule>}
     */
    stage_rules;

    /**
     * @type {AbilityTargetRule}
     */
    target_rules;

    /**
     * @type {AbilityStage}
     */
    stage;

    /**
     * @type {Array<Coordinate>}
     */
    target;

    /**
     * @param {String} name 
     * @param {AbilityStageRule} cast 
     * @param {AbilityStageRule} progress 
     * @param {AbilityStageRule} cooldown 
     * @param {AbilityTargetRule} target 
     */
    constructor (name, cast, progress, cooldown, target) {
        this.name = name;

        this.stage_rules = [
            cast,
            progress,
            cooldown
        ];

        this.target_rules = target;

        this.stage = {
            id: AbilityStageId.Idle,
            phase: AbilityStagePhase.Start,
            duration: 0,
            tick: 0
        };

        this.target = [];
    }
}

export {
    AbilityStageId, AbilityStagePhase,
    AbilityComponent
};