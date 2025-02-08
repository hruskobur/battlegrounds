class Target {
    /**
     * @type {Number}
     */
    x;

    /**
     * @type {Number}
     */
    y;

    /**
     * If this instance is used to trigger a game.command, id is not needed 
     * (null); however when bg scene receives a target, id is needed (number)
     * @type {Number|null}
     */
    id;

    /**
     * 
     * @param {Number} x 
     * @param {Number} y 
     * @param {Number} id 
     */
    constructor (x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }
}

export {
    Target
};