class Phase {
    /**
     * 
     * @param {Number} duration 
     */
    constructor (duration) {
        this.duration = duration;
        this.counter = 0;
    }

    /**
     * 
     * @param {Number} dt 
     * @returns {Boolean}
     */
    update (dt) {
        this.on_tick(dt);        

        if(this.counter >= this.duration) {
            return this.on_duration();
        }

        return false;
    }

    /**
     * @virtual
     * @returns {Boolean}
     */
    on_duration () {
        this.counter = 0;

        return true;
    }

    /**
     * @virtual
     * @param {Number} dt 
     */
    on_tick (dt) {
        this.counter += dt;
    }
}

