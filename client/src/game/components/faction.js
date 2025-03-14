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
     * @type {Number|String}
     */
    color;

    /**
     * 
     * @param {Number} id
     * @param {String} name
     * @param {Number|String} color
     */    
    constructor (id, name, color) {
        this.id = id;
        this.name = name;
        this.color = color;
    }
}

export {
    FactionComponent
};