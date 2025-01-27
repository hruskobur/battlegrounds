class BattlegroundModel {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {Number}
     */
    world_x;

    /**
     * @type {Number}
     */
    world_y;

    /**
     * @type {Number}
     */
    width;

    /**
     * @type {Number}
     */
    height;

    constructor () {
        this.name = '';
        this.world_x = 0;
        this.world_y = 0;
        this.width = 10;
        this.height = 10;
    }
}

export {
    BattlegroundModel
};