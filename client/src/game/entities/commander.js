class CommanderEntity {
    /**
     * @type {Number}
     */
    idx;

    /**
     * @todo component
     */
    bio;

    /**
     * @todo component
     */
    stats;

    constructor () {
        this.idx = 0;

        this.bio = {
            name: 'name',
            descr: 'descr'
        };

        this.stats = {}
    }
}

export {
    CommanderEntity
};