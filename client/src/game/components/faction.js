class FactionComponent {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {Number}
     */
    flag;
    
    constructor () {
        this.name = '';
        this.flag = 0xFFFFFF;
    }
}

export {
    FactionComponent
};