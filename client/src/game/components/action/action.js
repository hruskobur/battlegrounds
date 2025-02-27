class ActionComponent {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {Number}
     */
    duration;

    /**
     * @type {Number}
     */
    tick;

    /**
     * @type {Boolean}
     */
    cancelable;

    /**
     * 
     * @param {String} name 
     * @param {Number} duration 
     * @param {Number|null} tick 
     * @param {Boolean} cancelable 
     */
    constructor (name, duration, tick, cancelable) {
        this.name = name;
        this.duration = duration;
        this.tick = tick;
        this.cancelable = cancelable;
    }
}

export {
    ActionComponent
};