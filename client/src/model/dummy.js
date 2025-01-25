class DummyData {
    /**
     * @type {String}
     */
    name;

    /**
     * @type {Number}
     */
    gold;

    constructor () {
        this.name = '';
        this.gold = 0;
    }

    /**
     * @public
     * @param {Object} payload 
     * @returns {DummyData} this
     */
    fromJSON (payload) {
        this.name = payload.name || '';
        this.gold = payload.gold || 0;

        return this;
    }

    /**
     * @public
     * @returns {Object}
     */
    toJSON () {
        return {
            name: this.name,
            gold: this.gold
        }
    }
}

export {
    DummyData
};