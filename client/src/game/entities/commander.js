import { OwnershipComponent } from '../components/ownership.js';
import { DescriptionComponent } from '../components/description.js';
import { CommanderStatsComponent } from '../components/commander/stats.js';

class CommanderEntity {
    /**
     * @type {DescriptionComponent}
     */
    description;

    /**
     * @type {OwnershipComponent}
     */
    ownership;

    /**
     * @type {CommanderStatsComponent}
     */
    stats;

    constructor () {
        this.ownership = new OwnershipComponent(
            Number.MIN_SAFE_INTEGER
        );

        this.description = new DescriptionComponent(
            '',
            ''
        );

        this.stats = new CommanderStatsComponent();
    }
}

export {
    CommanderEntity
};