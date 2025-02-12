class FactionComponent {
    /**
     * @type {Number}
     */
    id;

    /**
     * @type {String}
     */
    name;

    constructor () {
        this.id = Number.MIN_SAFE_INTEGER;
        this.name = '';
    }
}

export {
    FactionComponent
};