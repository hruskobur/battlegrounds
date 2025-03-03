class DescriptionComponent {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {String}
     */
    text;

    /**
     * 
     * @param {String} name 
     * @param {String} text 
     */
    constructor (name, text) {
        this.name = name;
        this.text = text;
    }
}

export {
    DescriptionComponent
};