import { ModelBase } from '../game/models/base.js';

class Targeting {
    /**
     * @type {ModelBase}
     */
    a;

    /**
     * @type {ModelBase}
     */
    b;

    constructor () {
        this.a = null;
        this.b = null;
    }

    /**
     * @public
     * @param {ModelBase} model 
     * @returns {Targeting} this
     */
    target = (model) => {
        // first selected: selection is not completed
        if(this.a == null) {
            this.a = model;

            return null;
        }

        // second selected: selection is completed
        this.b = model;

        // cache targets
        const targets = [this.a, this.b];

        // reset targets
        this.a = null;
        this.b = null;

        // return targets
        return targets;
    }

    /**
     * @public
     */    
    clear = () => {
        this.a = null;
        this.b = null;
    }
}

export {
    Targeting
};