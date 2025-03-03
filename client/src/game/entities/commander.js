import { OwnershipComponent } from '../components/ownership.js';
import { DescriptionComponent } from '../components/description.js';
import { CommanderStatsComponent } from '../components/commander/stats.js';
import { CommanderTargetComponent } from '../components/commander/target.js';

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

    /**
     * @type {CommanderTargetComponent}
     */
    targets;

    constructor () {
        this.ownership = new OwnershipComponent(
            Number.MIN_SAFE_INTEGER
        );

        this.description = new DescriptionComponent(
            '',
            ''
        );

        this.stats = new CommanderStatsComponent();

        this.targets = new CommanderTargetComponent();
    }
}

export {
    CommanderEntity
};