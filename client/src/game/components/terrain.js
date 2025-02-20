class TerrainComponent {
    /**
     * Geography id points to specific sprite in the sprite atlas.
     * @note For visual uses only.
     * @type {String}
     */
    geography;
    
    /**
     * How difficult is to traverse this terrain?
     * @type {Number}
     */
    difficulty;

    /**
     * @param {String} geography 
     * @param {Number} difficulty 
     */
    constructor (geography, difficulty) {
        this.geography = geography;
        this.difficulty = difficulty;
    }
}

export {
    TerrainComponent
};