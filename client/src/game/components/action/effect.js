class ActionEffectComponent {
    /**
     * @type {String}
     */
    begin;

    /**
     * @type {String}
     */
    end;

    /**
     * 
     * @param {String} begin 
     * @param {String} end 
     */
    constructor (begin, end) {
        this.begin = begin;
        this.end = end;
    }
}

export {
    ActionEffectComponent
};