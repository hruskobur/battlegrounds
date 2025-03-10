class FactionComponent {
    /**
     * @type {Number}
     */
    id;

    /**
     * @type {String}
     */
    name;

    /**
     * 
     * @param {Number} id
     * @param {String} name
     */    
    constructor (id, name) {
        this.id = id;
        this.name = name;
    }
}

export {
    FactionComponent
};