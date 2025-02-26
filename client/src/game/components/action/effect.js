/**
 * @typedef {Object} AreaEffectDuration
 * @property {Number} total
 * @property {Number|null} tick
 */

class ActionEffectComponent {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {AreaEffectDuration}
     */
    duration;

    /**
     * @type {String}
     */
    on_start;

    /**
     * @type {String}
     */
    on_tick;

    /**
     * @type {String}
     */
    on_end;

    /**
     * 
     * @param {String} name 
     * @param {Number} total 
     * @param {Number|null} tick 
     * @param {String} on_start 
     * @param {String} on_tick 
     * @param {String} on_end 
     */
    constructor (name, total, tick, on_start, on_tick, on_end) {
        this.name = name;
        this.duration = { total, tick };
        this.on_start = on_start;
        this.on_tick = on_tick;
        this.on_end = on_end;
    }
}

export {
    ActionEffectComponent
};