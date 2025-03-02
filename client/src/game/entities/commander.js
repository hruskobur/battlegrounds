import { OwnershipComponent } from '../components/ownership.js';

class CommanderEntity {
    /**
     * @type {OwnershipComponent}
     */
    ownership;

    /**
     * @todo component
     */
    bio;

    /**
     * @todo component
     */
    stats;

    constructor () {
        this.ownership = new OwnershipComponent(
            Number.MIN_SAFE_INTEGER
        );

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