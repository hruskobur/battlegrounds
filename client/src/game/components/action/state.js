class ActionStateComponent {
    /**
     * @type {Number}
     */
    state;
    
    /**
     * @type {Number}
     */
    total;
    
    /**
     * @type {Number}
     */
    tick;

    /**
     */
    constructor () {
        this.state = null;
        this.total = 0;
        this.tick = 0;
    } 
}

export {
    ActionStateComponent
};