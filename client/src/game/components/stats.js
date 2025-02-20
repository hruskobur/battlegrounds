/**
 * @note For now, this single component is enough.
 * The plan is to provide more granular components later, for example standalone
 * resistance component, bonus component, etc...
 * 
 */
class StatsComponent {
    /**
     * @type {Number}
     */
    owner;

    /**
     * @type {Number}
     */
    owner;

    /**
     * @param {Number} owner 
     * @param {Number} hp 
     */
    constructor (owner, hp) {
        this.owner = owner;
        this.hp = hp;
    }
}

export {
    StatsComponent
};